import { Repository, EntityRepository } from 'typeorm';
import { Storage } from './storages.entity';
import { StorageDTO } from './dto/storages.dto';
import { User } from 'src/user/user.entity';
import { Role } from 'src/auth/enums/role.enum';

@EntityRepository(Storage)
export class StorageRepository extends Repository<Storage> {

  public async saveStorage(
    dto: StorageDTO,
  ): Promise<Storage> {
    const { id, stocker, product, amount } = dto;

    const storages = this.create();
    storages.id = id ? id : null;
    storages.stocker = stocker;
    storages.product = product;
    storages.amount = amount;
    return await storages.save();
  }

  public async getAll(user: User): Promise<Storage[]> {
    const { role } = user;

    if (role == Role.Admin || role == Role.StockerAdmin)
      return await this.getByAuthor(user);

    if (role == Role.Stocker)
      return await this.getByStocker(user);

    return await this.find({
      relations: ['product', 'product.author', 'stocker'],
      where: { product: { status: true } }
    })
  }

  public async getByStocker(user: User): Promise<Storage[]> {
    return await this.find({
      relations: ['product', 'stocker'],
      where: {
        stocker: user,
        product: {
          status: true
        }
      }
    });
  }

  public async getByAuthor(user: User): Promise<Storage[]> {
    return await this.find({
      relations: ['product', 'product.author', 'stocker'],
      where: {
        product: {
          author: user,
          status: true
        }
      }
    });
  }
}