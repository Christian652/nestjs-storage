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
  Query,
  Req,
  ParseUUIDPipe
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDTO } from './dto/product.dto';
import { Product } from './product.entity';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator'
import { RolesGuard } from 'src/auth/roles.guard';

@UseGuards(AuthGuard(), RolesGuard)
@Controller('products')
export class ProductController {
  constructor(
    private productService: ProductService
  ) { }

  @Post()
  @Roles(Role.Admin, Role.StockerAdmin)
  @UsePipes(ValidationPipe)
  public async create(
    @Body() productDTO: ProductDTO,
  ): Promise<any> {
    try {
      return await this.productService.save(productDTO);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @Roles(Role.Admin, Role.StockerAdmin, Role.Master, Role.Stocker)
  public async getAll(@Req() req): Promise<Product[]> {
    try {
      return await this.productService.getProducts(req.user);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(":id")
  @Roles(Role.Admin, Role.StockerAdmin, Role.Stocker, Role.Master)
  public async getOne(@Param("id", ParseUUIDPipe) id: string): Promise<any> {
    try {
      return await this.productService.getOne(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete()
  @Roles(Role.Admin, Role.StockerAdmin)
  public async delete(
    @Param("id", ParseUUIDPipe) id: string
  ): Promise<any> {
    try {
      return await this.productService.delete(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}