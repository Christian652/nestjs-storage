import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpStatus } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { Product } from '../product.entity';

@Injectable()
export class ActiveProductPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { id } = value.product;
    const product = await getRepository(Product).findOne({
      where: {
        id,
        status: true
      }
    }); 

    if (!product) throw new HttpException(`O Produto Informado Não Existe ou Está Inativo!`, HttpStatus.NOT_ACCEPTABLE);
  
    return value;
  }
}