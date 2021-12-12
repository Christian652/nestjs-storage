import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Storage } from './storages.entity';
import { StorageDTO } from './dto/storages.dto';
import { StorageRepository } from './storages.repository';

@Injectable()
export class StorageService {
  constructor(
    @InjectRepository(StorageRepository)
    private StorageRepository: StorageRepository,
  ) { }

  public async getAll(): Promise<Storage[]> {
    return await this.getAll();
  }

  public async save(
    dto: StorageDTO,
  ): Promise<Storage> {
    try {
      return await this.StorageRepository.save(dto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getOne(id: string): Promise<any> {
    const storages = await this.StorageRepository.findOne(id);
    if (!storages) throw new HttpException(`não foi encontrado nenhuma configuração com o id ${id}`, HttpStatus.NOT_FOUND);
    return storages;
  }

  public async getByKey(key: string): Promise<any> {
    const storages = await this.StorageRepository.findOne({
      where: { key }
    });
    if (!storages) throw new HttpException(`não foi encontrado nenhuma configuração ${key}`, HttpStatus.NOT_FOUND);
    return storages;
  }

  public async delete(id: string): Promise<void> {
    try {
      await this.StorageRepository.delete(id)
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}