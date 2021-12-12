import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Setting } from './settings.entity';
import { SettingDTO } from './dto/settings.dto';
import { SettingRepository } from './settings.repository';

@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(SettingRepository)
    private SettingRepository: SettingRepository,
  ) { }

  public async getAll(): Promise<Setting[]> {
    return await this.SettingRepository.getAll();
  }

  public async save(
    dto: SettingDTO,
  ): Promise<Setting> {
    try {
      return await this.SettingRepository.saveSetting(dto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getOne(id: string): Promise<Setting> {
    const settings = await this.SettingRepository.findOne(id);
    if (!settings) throw new HttpException(`não foi encontrado nenhuma configuração com o id ${id}`, HttpStatus.NOT_FOUND);
    return settings;
  }

  public async getByKey(key: string): Promise<Setting> {
    const settings = await this.SettingRepository.findOne({
      where: { key }
    });
    if (!settings) throw new HttpException(`não foi encontrado nenhuma configuração ${key}`, HttpStatus.NOT_FOUND);
    return settings;
  }

  public async delete(id: string): Promise<void> {
    try {
      await this.SettingRepository.delete(id)
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}