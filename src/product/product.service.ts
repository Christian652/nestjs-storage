import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductDTO } from './dto/product.dto';
import { ProductRepository } from './product.repository';
import { GetProductFilterDTO } from './dto/getProducts.filter.dto';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);
  
  constructor(
    @InjectRepository(ProductRepository)
    private ProductRepository: ProductRepository,
  ) { }

  public async save(
    ProductDTO: ProductDTO,
  ): Promise<Product> {
    try {
      this.logger.log(` Saving ${ProductDTO.name} Product`);
      return await this.ProductRepository.saveProduct(ProductDTO);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getAll(parameters: GetProductFilterDTO): Promise<Product[]> {
    return await this.ProductRepository.getAll(parameters);
  }

  public async getOne(id: number): Promise<Product> {

    const foundProduct = await this.ProductRepository.findOne(id);
    if (!foundProduct) {
      this.logger.warn(` Can't Found Product With Id : ${id} `);
      throw new NotFoundException(`Não Existe Produto Com o Id: ${id}`);
    }
    return foundProduct;
  }

  public async delete(ProductId: number): Promise<void> {
    try {
      this.logger.log(` Deleting Product : ${ProductId} `);
      await this.ProductRepository.delete(ProductId);
    } catch (e) {
      throw new HttpException(e.code, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}