import { Exclude } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { Role } from 'src/auth/enums/role.enum';

export class UserDTO {
  @IsOptional()
  id: number;
  
  @IsString({
    message: 'nome deve ser de tipo textual!'
  })
  name: string;

  @IsString({
    message: 'email deve ser de tipo textual!'
  })
  email: string;

  @IsString({
    message: 'papel deve ser de tipo textual!'
  })
  role: Role;

  @IsString({
    message: 'perfil deve ser de tipo textual!'
  })
  @IsOptional()
  profile_path: string;

  @IsString({
    message: 'senha deve ser de tipo textual!'
  })
  @IsOptional()
  password?: string;
}