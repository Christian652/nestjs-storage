import { IsNumber, IsOptional, IsString } from "class-validator";

export class LogFiltersDto {
  
  @IsString()
  @IsOptional()
  object_type: string;

  @IsString()
  @IsOptional()
  operation_type: string;

  @IsNumber()
  @IsOptional()
  object_id: number;
}