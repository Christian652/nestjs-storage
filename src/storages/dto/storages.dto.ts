import { User } from 'src/user/user.entity';
import { Product } from './../../product/product.entity';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsOptional, Length, IsInt } from 'class-validator';

export class StorageDTO {
    @IsOptional()
    id?: string;

    @IsNotEmpty({ message: `infome a quantidade!` })
    @IsInt({ message: `a quantidade deve ser numero inteiro!` })
    amount: number;

    @Type(() => Product)
    @IsNotEmpty({ message: `informe o produto desse armazenamento` })
    product: Product;

    @Type(() => User)
    @IsNotEmpty({ message: `informe o repositor desse armazenamento` })
    stocker: User;
}