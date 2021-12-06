import { IsOptional, IsString } from "class-validator";

export class GetProductFilterDTO {

  @IsOptional()
  @IsString()
  orderBy: string;

  @IsOptional()
  @IsString()
  sort: 'ASC' | 'DESC';

  @IsOptional()
  @IsString()
  like: string;

  @IsOptional()
  @IsString()
  select: string;

}