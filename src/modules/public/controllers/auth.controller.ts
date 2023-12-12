import { Body, Controller, Inject, Ip, Post } from '@nestjs/common';
import { AuthLoginResponse } from '../../../types/classes/auth.class';
import { LoginAuthDto } from '../../../types/dtos/auth.dto';
import { API_VERSIONS } from '../../../utils/consts';
import { AuthService } from '../services/auth.service';
import { MonitoringService } from '../../monitoring/monitoring.service';

@Controller({
  path: 'auth',
  version: API_VERSIONS,
})
export class AuthController {
  constructor(
    @Inject(MonitoringService)
    private readonly monitoringService: MonitoringService,
    private authService: AuthService,
  ) {}

  @Post("")
  async login(@Body() model: LoginAuthDto, @Ip() ip: string): Promise<AuthLoginResponse> {
    const authUser = await this.authService.login(model);
    const token = await this.authService.createJwtToken(authUser, ip);
    // return { id: authUser.id, token };

    this.monitoringService.log('ERRO no auth');

    return { id: authUser.id, token };
  }
}
