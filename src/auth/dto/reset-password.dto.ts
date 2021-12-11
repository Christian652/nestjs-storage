import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ResetPasswordDto {

  @IsString({ message: 'email deve ser uma string!'})
  @IsNotEmpty({ message: 'email é obrigatorio!'})
  email: string;

  @IsString({ message: 'nova senha deve ser uma string!'})  
  @IsNotEmpty({ message: 'nova senha é obrigatorio!'})
  new_password: string;

  @IsString({ message: 'token deve ser uma string!'})
  @IsNotEmpty({ message: 'token é obrigatorio!'})
  token: string;

  @IsOptional()
  @IsString()
  recaptcha_token?: string;

}