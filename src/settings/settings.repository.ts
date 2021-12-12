import { Repository, EntityRepository } from 'typeorm';
import { Setting } from './settings.entity';
import { SettingDTO } from './dto/settings.dto';

@EntityRepository(Setting)
export class SettingRepository extends Repository<Setting> {

  public async saveSetting(
    dto: SettingDTO,
  ): Promise<Setting> {
    const { id, key, value } = dto;

    const settings = this.create();
    settings.id = id ? id : null;
    settings.key = key;
    settings.value = value;
    return await settings.save();
  }

  public async getAll(): Promise<Setting[]> {
    return await this.find()
  }

  public async insertMany(settings) {
    await this.createQueryBuilder('settings')
      .insert()
      .values(settings)
      .execute();
  }
}