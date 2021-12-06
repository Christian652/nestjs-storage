import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO {
  @IsNotEmpty({
    message: 'informe o id do usuário'
  })
  id: number;
  
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  email?: string;

  @IsString()
  @IsNotEmpty()
  role?: string;

  @IsString()
  @IsOptional()
  profile_path?: string;

  @IsString()
  @IsOptional()
  password?: string;
}