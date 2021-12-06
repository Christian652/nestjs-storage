import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDTO {

    id: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    unitPrice: number;

}