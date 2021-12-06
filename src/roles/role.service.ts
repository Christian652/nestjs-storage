import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/auth/enums/role.enum';

@Injectable()
export class RolesService {
  private readonly logger = new Logger(RolesService.name);

  public async getAll(): Promise<Role[]> {
    const roles = [
      Role.Admin,
      Role.User
    ];

    return roles;
  }
}