import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Query
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDTO } from './dto/product.dto';
import { Product } from './product.entity';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator'
import { RolesGuard } from 'src/auth/roles.guard';
import { GetProductFilterDTO } from './dto/getProducts.filter.dto';

@UseGuards(AuthGuard(), RolesGuard)
@Controller('products')
export class ProductController {
  constructor(
    private productService: ProductService
  ) { }

  @Post()
  @Roles(Role.Admin)
  @UsePipes(ValidationPipe)
  public async create(
    @Body() productDTO: ProductDTO,
  ): Promise<Product> {
    try {
      const product = await this.productService.save(productDTO);
      return product;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put()
  @Roles(Role.Admin)
  @UsePipes(ValidationPipe)
  public async update(
    @Body() productDTO: ProductDTO,
  ): Promise<Product> {
    try {
      const product = await this.productService.save(productDTO);
      return product;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  public async getAll(@Query() parameters: GetProductFilterDTO): Promise<Product[]> {
    try {
      const product = await this.productService.getAll(parameters);
      return product;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  public async getOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
      const product = await this.productService.getOne(id);
      return product;
  }

  @Delete(':id')
  @Roles(Role.Admin)
  public async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      const deletedProduct = await this.productService.delete(id);
      return deletedProduct
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}