import { Repository, EntityRepository } from 'typeorm';
import { Product } from './product.entity';
import { ProductDTO } from './dto/product.dto';
import { GetProductFilterDTO } from './dto/getProducts.filter.dto';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {

  public async saveProduct(
    productDto: ProductDTO,
  ): Promise<Product> {
    const { id, name, unitPrice, description } = productDto;

    const Product_ = new Product();
    Product_.id = id ? id : null;
    Product_.name = name;
    Product_.description = description;
    Product_.unitPrice = unitPrice;

    return await Product_.save();
  }

  public async getAll(parameters: GetProductFilterDTO) {
    const { orderBy, sort, like } = parameters;

    const query = this.createQueryBuilder('products');

    if (like) 
      query.andWhere(
        'products.name LIKE :like OR products.description LIKE :like OR products.unitPrice LIKE :like', 
        {like: `%${like}%`}
      );

    if (orderBy) 
      if (sort) {
        query.orderBy(orderBy, sort);
      } else {
        query.orderBy(orderBy)
      }

    return await query.getMany();
  }

}