import { Repository, EntityRepository } from 'typeorm';
import { Product } from './product.entity';
import { ProductDTO } from './dto/product.dto';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {

  public async saveProduct(
    productDto: ProductDTO,
  ): Promise<any> {
    const { id, title, unitPrice, description } = productDto;
    
    // 
  }

  public async getAll() {
    // return all products
  }

  public async getFiltered() {
    
  }

}