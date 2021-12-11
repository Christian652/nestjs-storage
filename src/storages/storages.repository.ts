import { Repository, EntityRepository } from 'typeorm';
import { Storage } from './storages.entity';
import { StorageDTO } from './dto/storages.dto';

@EntityRepository(Storage)
export class StorageRepository extends Repository<Storage> {

  public async saveStorage(
    dto: StorageDTO,
  ): Promise<Storage> {
    const {id, stocker, product, amount} = dto;
    
    const storages = this.create();
    storages.id = id ? id : null;
    storages.stocker = stocker;
    storages.product = product;
    storages.amount = amount;
    return await storages.save();
  }

  public async getAll(): Promise<Storage[]> {
    return await this.find({
      relations: ['product', 'stocker']
    })
  }
}