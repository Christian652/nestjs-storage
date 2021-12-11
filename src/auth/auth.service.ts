import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserDTO } from '../user/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { SmtpService } from 'src/smtp/smtp.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Injectable()
export class AuthService {

  private crypto = require('crypto');

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly smtpService: SmtpService,
  ) { }


  async login(userDto: UserDTO) {

    const login = await this.userService.findByLogin(userDto.email, userDto.password);

    if (login) {
      //auth ok
      const id = login.id;
      const token = this._createToken(id);

      return ({ id: id, user: login.name, ...token });
    }

    throw new HttpException('Login inválido!', HttpStatus.UNAUTHORIZED)


  }

  async validateUser(id): Promise<UserDTO> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private _createToken(id) {
    const expiresIn = process.env.EXPIRESIN;
    const auth = true;

    const accessToken = this.jwtService.sign({ id: id });
    return {
      auth,
      expiresIn,
      accessToken,
    };
  }

  public async sendConfirmationMail(user: User) {
    const token = this.crypto.randomBytes(15).toString("hex");
    user.confirmation_token = token;;
    await user.save();

    const url = `${process.env.APP_URL}/users/confirmate/${token}`
    await this.smtpService.sendRawEmail({
      to: [user.email],
      from: 'products@gmail.com',
      subject: 'Confirmação da Conta',
      template: './email-confirmation',
      context: { url },
    });
  }
}