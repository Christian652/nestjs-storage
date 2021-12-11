// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');


import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,

} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from '../user/dto/user.dto';
import { getRepository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { SmtpService } from 'src/smtp/smtp.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {

  private crypto = require('crypto');

  constructor(
    private authService: AuthService,
    private readonly smtpService: SmtpService,
  ) { }

  @Post('login')
  public async jwtGenerate(
    @Body() userDto: UserDTO
  ) {
    return await this.authService.login(userDto);
  }

  @Post('password-forgot')
  public async passwordForgot(@Body("email") email: string) {
    try {
      const user = await getRepository(User).findOne({ email });
      const token = this.crypto.randomBytes(15).toString("hex");
      const now = new Date();
      now.setHours(now.getMinutes() + 5);

      if (!user)
        throw new HttpException(`Usuário Inexistente!`, HttpStatus.UNAUTHORIZED);

      user.password_reset_expires = now;
      user.password_reset_token = token;
      await user.save();

      return await this.smtpService.sendPasswordRecoveryMail({
        to: [user.email],
        subject: `Token de Recuperação de Senha`,
        token
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('password-reset')
  @UsePipes(ValidationPipe)
  public async passwordReset(@Body() reset_body: ResetPasswordDto) {
    const { token, new_password, email } = reset_body;
    
    const user = await getRepository(User).findOne({ email });
    const now = new Date();
    const expiresIn = new Date(user.password_reset_expires);

    if (!user.id)
      throw new HttpException(`Usuário Inexistente!`, HttpStatus.UNAUTHORIZED);

    if (now.getTime() > expiresIn.getTime())
      throw new HttpException(`o tempo de recuperação de senha expirou!`, HttpStatus.UNAUTHORIZED);

    if (user.password_reset_token !== token)
      throw new HttpException(`token invalido!`, HttpStatus.UNAUTHORIZED);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(new_password, salt);
    return await user.save();
  }
}
