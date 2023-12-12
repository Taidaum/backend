/* eslint-disable @typescript-eslint/no-explicit-any */
import { join } from 'path';
import * as http from 'http';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import basicAuth from 'express-basic-auth';
import helmet from 'helmet';
import express from 'express';
import { Logger } from 'nestjs-pino';
import { Server as socketio } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import { AppModule } from './app.module';
import { API_VERSION_HEADER, IGNORED_SENTRY_ERRORS } from './utils/consts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const verifyTokenMiddleware = async (socket, next: (err?: any) => void) => {
    const token = socket.handshake.auth.token; // Obtém o token do handshake
    const key = process.env.JWT_KEY;

    try {
      // Verifica o token usando a mesma lógica de verificação usada no servidor HTTP
      jwt.verify(token, key);
      next(); // Chama o próximo middleware ou rota
    } catch (error) {
      next(new Error('Token inválido')); // Retorna um erro caso o token seja inválido
    }
  };

  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());

  app.enableCors({
    methods: '*',
    origin: '*',
  });

  app.use('/public', express.static(join(__dirname, '..', 'public')));

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({
        app: app.getHttpServer(),
      }),
      new Tracing.Integrations.Mysql(),
    ],
    tracesSampleRate: 0.85,
    environment: process.env.SENTRY_ENV,
    ignoreErrors: IGNORED_SENTRY_ERRORS,
  });

  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
  app.use(Sentry.Handlers.errorHandler());


  const server = http.createServer(app.getHttpAdapter().getInstance());
  
  const io = new socketio(server, {
    cors: {
      origin: '*',
    },
  });
  // const io = new Server();

  io.use(verifyTokenMiddleware); // Usa o middleware para verificar o token

  io.on('connection', (socket) => {
    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
    // A partir daqui, o token do usuário já foi verificado

    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id);
    });

    socket.on('userCreate', () => {
    console.log('CreateCreateCreateCreateCreateCreateCreateCreateCreate')
      io.emit('userCreate');
    });

    socket.on('userDelete', () => {
    console.log('DeleteDeleteDeleteDeleteDeleteDeleteDeleteDeleteDelete')
      io.emit('userDelete');
    });
  });

  const port = process.env.PORT || 8000;
  await app.listen(port);

  const socketPort = process.env.SOCKET_PORT || 8080;
  server.listen(socketPort, async () => {
    console.log(`Started with env ${process.env.port} at http://localhost:${port}`);
  });
}

bootstrap();
