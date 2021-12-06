import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductRepository, UserRepository]),
    AuthModule
  ], 
  controllers: [ProductController],
  providers: [ProductService, UserService, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  }]
})
export class ProductModule {}
