import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { RolesGuard } from 'src/auth/roles.guard';
import { ProductModule } from 'src/product/product.module';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { StorageController } from './storages.controller';
import { StorageRepository } from './storages.repository';
import { StorageService } from './storages.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StorageRepository, UserRepository]),
    AuthModule, ProductModule
  ], 
  controllers: [StorageController],
  providers: [StorageService, UserService, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  }]
})
export class StorageModule {}
