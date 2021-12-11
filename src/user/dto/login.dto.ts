import { IsString , IsInt } from 'class-validator';

export class LoginDTO {

  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  role: string;


}