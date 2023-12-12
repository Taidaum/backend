/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { generatePasswordToken } from '../../../helpers/auth.helper';
import { UpdateUserDto } from '../../../types/dtos/user.dto';
import ERRORS from '../../../utils/errors';
import { PrismaService } from '../../external/services/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async findOne(params: any): Promise<any> {
    return this.prisma.user.findUnique({
      ...params,
    });
  }

  async find(params: Prisma.UserFindManyArgs): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      ...params,
    });
    return users;
  }

  async count() {
    return this.prisma.user.count();
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async createProfile(model: UpdateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: model.email },
    });

    if (existingUser) {
      throw new HttpException(ERRORS.AUTH.ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
    }

    const encryptedPw = await generatePasswordToken(model.password);

    const saved = await this.prisma.user.create({
      data: {
        email: model.email.toLowerCase(),
        password: encryptedPw,
        phone: model.phone,
        isActive: true,
      },
    });

    delete saved.password;
    return saved;
  }

  async update(model: UpdateUserDto, userId: number) {
    const existingUser = await this.find({
      where: {
        OR: [{ email: model.email }, { phone: model.phone }],
        NOT: {
          email: undefined,
          phone: undefined,
        },
      },
    });

    if (existingUser.length > 1) {
      throw new HttpException(ERRORS.USER.EMAIL_OR_PHONE_USED, HttpStatus.BAD_REQUEST);
    }

    const user = existingUser[0];
    if (user && user.id !== userId) {
      throw new HttpException(ERRORS.USER.EMAIL_OR_PHONE_USED, HttpStatus.BAD_REQUEST);
    }

    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...(model.email ? { email: model.email } : {}),
        ...(model.phone ? { phone: model.phone.replace(/\D/gi, '') } : {}),
      },
    });
  }

  async updateStatus(model: UpdateUserDto, userId: number) {
    const existingUser = await this.find({
      where: {
        id: userId,
      },
    });

    if (existingUser.length > 1) {
      throw new HttpException(ERRORS.USER.EMAIL_OR_PHONE_USED, HttpStatus.BAD_REQUEST);
    }

    const user = existingUser[0];
    if (user && user.id !== userId) {
      throw new HttpException(ERRORS.USER.EMAIL_OR_PHONE_USED, HttpStatus.BAD_REQUEST);
    }

    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isActive: model.isActive,
      },
    });
  }

  async delete(where: Prisma.UserWhereUniqueInput, userId: number) {
    return this.prisma.user.delete({
      where,
    });
  }
}
