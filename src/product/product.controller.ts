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

// @UseGuards(AuthGuard(), RolesGuard)
@Controller('products')
export class ProductController {
  constructor(
    private productService: ProductService
  ) { }

  @Post()
  // @Roles(Role.Admin)
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
}