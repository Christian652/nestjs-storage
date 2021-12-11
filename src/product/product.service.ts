import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductDTO } from './dto/product.dto';
import { ProductRepository } from './product.repository';
import { User } from 'src/user/user.entity';
import { Role } from 'src/auth/enums/role.enum';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private ProductRepository: ProductRepository,
  ) { }

  public async getProducts(user: User): Promise<Product[]> {
    const { role } = user;
    if (role == Role.Admin || role == Role.StockerAdmin)
      return await this.getByAuthor(user)

    if (role == Role.Master)
      return await this.getAll()

    if (role == Role.Stocker)
      return await this.getByStocker(user)
  }

  public async save(
    dto: ProductDTO,
  ): Promise<Product> {
    try {
      return await this.ProductRepository.save(dto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getAll(onlyActives?: boolean): Promise<Product[]> {
    try {
      return await this.ProductRepository.getAll(onlyActives);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getOne(id: number): Promise<any> {
    const product = await this.ProductRepository.findOne(id);
    if (!product) throw new HttpException(`não foi encontrado nenhum produto com o id: ${id}`, HttpStatus.NOT_FOUND);
    return product;
  }

  public async getByStocker(user: User): Promise<Product[]> {
    return await this.ProductRepository.getByStocker(user);
  }

  public async getByAuthor(user: User): Promise<Product[]> {
    return await this.ProductRepository.getByAuthor(user);
  }

  public async delete(id: number): Promise<void> {
    try {
      await this.ProductRepository.delete(id)
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}