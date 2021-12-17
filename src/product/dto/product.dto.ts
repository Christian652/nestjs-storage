import { IsNotEmpty, isNumber, IsNumber, IsString } from 'class-validator';

export class ProductDTO {

    @IsNumber()
    id: number;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    unitPrice: number;

}