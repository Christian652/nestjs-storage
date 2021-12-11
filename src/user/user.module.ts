import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { RolesGuard } from 'src/auth/roles.guard';
import { OperationLogsModule } from 'src/operationLogs/operationLogs.module';
import { SmtpModule } from 'src/smtp/smtp.module';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]), AuthModule, OperationLogsModule,
  ],
  controllers: [UserController],
  providers: [
    UserService, {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
  exports: [
    UserService
  ]
})
export class UserModule { }
