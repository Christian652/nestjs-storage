import { seeder } from "nestjs-seeder";
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/orm'
import { UserSeeder } from "./user/user.seeder";
import { UserRepository } from "./user/user.repository";
import { SettingRepository } from "./settings/settings.repository";
import { SettingSeeder } from "./settings/settings.seeder";

seeder({
  imports: [ 
    TypeOrmModule.forRoot(configService.getTypeOrmData()),
    TypeOrmModule.forFeature([UserRepository, SettingRepository]),
  ],
}).run([SettingSeeder, UserSeeder]);