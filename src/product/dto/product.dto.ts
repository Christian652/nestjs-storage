import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDTO {

    id: number;

    title: string;

    description: string;

    unitPrice: number;

}