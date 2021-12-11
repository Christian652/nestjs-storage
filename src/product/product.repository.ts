import { Repository, EntityRepository } from 'typeorm';
import { Product } from './product.entity';
import { ProductDTO } from './dto/product.dto';
import { User } from 'src/user/user.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {

  public async saveProduct(
    dto: ProductDTO,
  ): Promise<Product> {
    const {
      id, title, unitPrice, description, details,
      status, stockers, author, thumbnail
    } = dto;
    
    const product = this.create();
    product.id = id ? id : null;
    product.stockers = stockers;
    product.status = status ? status : true;
    product.thumbnail = thumbnail;
    product.title = title;
    product.unitPrice = unitPrice;
    product.details = details;
    product.description = description;
    product.author = author;
    return await product.save();
  }

  public async getAll(onlyActives?: boolean): Promise<Product[]> {
    if (onlyActives) {
      return await this.find({
        where: { status: true },
        relations: ['author', 'stockers']
      })
    }
    return await this.find({ relations: ['author', 'stockers'] })
  }

  public async getByAuthor(author: User): Promise<Product[]> {
    const products = await this.getAll(true);

    return products.filter(product => product.author == author);
  }

  public async getByStocker(user: User): Promise<Product[]> {
    const products = await this.getAll(true);

    return products.filter(product => product.stockers.includes(user))
  }


}