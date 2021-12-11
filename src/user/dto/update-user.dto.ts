import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Role } from 'src/auth/enums/role.enum';

export class UpdateUserDTO {
  @IsNotEmpty({
    message: 'informe o id do usuário'
  })
  id: string;
  
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  email?: string;

  @IsString()
  @IsNotEmpty()
  role?: Role;

  @IsString()
  @IsOptional()
  profile_path?: string;

  @IsString()
  @IsOptional()
  password?: string;
}