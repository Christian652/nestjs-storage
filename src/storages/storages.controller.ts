import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Query,
  Req
} from '@nestjs/common';
import { StorageService } from './storages.service';
import { StorageDTO } from './dto/storages.dto';
import { Storage } from './storages.entity';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator'
import { RolesGuard } from 'src/auth/roles.guard';

@UseGuards(AuthGuard(), RolesGuard)
@Controller('storages')
export class StorageController {
  constructor(
    private storagesService: StorageService
  ) { }

  @Post()
  @Roles(Role.Admin, Role.Master)
  @UsePipes(ValidationPipe)
  public async create(
    @Body() dto: StorageDTO,
  ): Promise<any> {
    try {
      return await this.storagesService.save(dto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @Roles(Role.Admin, Role.Master)
  public async getAll(): Promise<Storage[]> {
    try {
      return await this.storagesService.getAll();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(":id")
  @Roles(Role.Admin, Role.Master)
  public async getOne(@Param("id") id: number): Promise<any> {
    try {
      return await this.storagesService.getOne(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete()
  @Roles(Role.Master)
  public async delete(
    @Param("id", ParseIntPipe) id: number
  ): Promise<any> {
    try {
      return await this.storagesService.delete(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}