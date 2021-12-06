import {
  Controller,
  Get,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RolesService } from './role.service';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator'
import { RolesGuard } from 'src/auth/roles.guard';

@UseGuards(AuthGuard())
@Controller('roles')
export class RolesController {
  constructor(
    private rolesService: RolesService
  ) { }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  public async getAll(): Promise<Role[]> {
    try {
      const roles = await this.rolesService.getAll();
      return roles;
    } catch (error) {
      throw new HttpException('Algo Deu Errado! Contate o Suporte!', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}