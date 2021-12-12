import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Seeder } from "nestjs-seeder";
import { SettingRepository } from "./settings.repository";

@Injectable()
export class SettingSeeder implements Seeder {
  constructor(
    @InjectRepository(SettingRepository)
    private settingRepository: SettingRepository
  ) { }

  async seed(): Promise<any> {
    try {
      return await this.settingRepository.insertMany([
        {
          key: 'max_storages_per_day_by_stocker',
          value: '10'
        },
        {
          key: 'max_storages_per_product',
          value: '1000'
        },
        {
          key: 'lunch_time_start',
          value: '12:00'
        },
        {
          key: 'lunch_time_end',
          value: '13:00'
        },
        {
          key: 'office_hour_start',
          value: '8:00'
        },
        {
          key: 'office_hour_end',
          value: '18:00'
        },
      ]);  
    } catch (error) {
      console.log(error)
    }
  }

  async drop(): Promise<any> {
    try {
      const setting = await this.settingRepository.find();
      await this.settingRepository.remove(setting);
    } catch (error) {}
  }
}