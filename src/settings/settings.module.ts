import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { SettingController } from './settings.controller';
import { SettingRepository } from './settings.repository';
import { SettingService } from './settings.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SettingRepository, UserRepository]),
    AuthModule
  ], 
  controllers: [SettingController],
  providers: [SettingService, UserService, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  }]
})
export class SettingModule {}
