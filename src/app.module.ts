import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { configService } from './config/orm'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { RolesModule } from './roles/role.module';
import { LoggerMiddleware } from './operationLogs/logger.middleware';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';
import { OperationLogsModule } from './operationLogs/operationLogs.module';
import { ProductController } from './product/product.controller';

@Module({
  imports: [ TypeOrmModule.forRoot(configService.getTypeOrmData()), UserModule, AuthModule, ProductModule, RolesModule, OperationLogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: '/users/(.*)', method: RequestMethod.GET},
        { path: '/users', method: RequestMethod.GET }, 
        { path: '/products/(.*)', method: RequestMethod.GET},
        { path: '/products', method: RequestMethod.GET }, 
      )
      .forRoutes(UserController, AuthController, ProductController)
  }
}


