import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductDTO } from './dto/product.dto';
import { ProductRepository } from './product.repository';
import { GetProductFilterDTO } from './dto/getProducts.filter.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private ProductRepository: ProductRepository,
  ) { }

  public async save(
    ProductDTO: ProductDTO,
  ): Promise<any> {
    // save product
  }

  public async getAll(): Promise<any[]> {
    // return all products and add query param to get only 
    // active products or not
    return [];
  }

  public async getOne(id: number): Promise<any> {
    // get some product based on id , if not found throw NotFoundException
  }

  public async delete(ProductId: number): Promise<void> {
    // delete product based on id
  }

}