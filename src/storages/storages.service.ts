import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Storage } from './storages.entity';
import { StorageDTO } from './dto/storages.dto';
import { StorageRepository } from './storages.repository';
import { User } from 'src/user/user.entity';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class StorageService {
  constructor(
    @InjectRepository(StorageRepository)
    private repository: StorageRepository,
    private readonly productService: ProductService
  ) { }

  public async getAll(user: User): Promise<Storage[]> {
    return await this.repository.getAll(user);
  }

  public async save(
    dto: StorageDTO,
  ): Promise<Storage> {
    try {
      return await this.repository.saveStorage(dto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getOne(id: string): Promise<Storage> {
    const storages = await this.repository.findOne(id, {
      relations: ['product', 'stocker']
    });
    if (!storages) throw new HttpException(`não foi encontrado nenhuma transação de estoque com o id ${id}`, HttpStatus.NOT_FOUND);
    return storages;
  }

  public async softDelete(id: string): Promise<void> {
    try {
      const storage = await this.getOne(id);
      storage.deleted_at = new Date();
      await storage.save();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}