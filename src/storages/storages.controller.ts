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
  Req,
  ParseUUIDPipe
} from '@nestjs/common';
import { StorageService } from './storages.service';
import { StorageDTO } from './dto/storages.dto';
import { Storage } from './storages.entity';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator'
import { RolesGuard } from 'src/auth/roles.guard';
import { ActiveProductPipe } from 'src/product/pipes/ActiveProductPipe.pipe';

@UseGuards(AuthGuard(), RolesGuard)
@Controller('storages')
export class StorageController {
  constructor(
    private service: StorageService
  ) { }

  @Post()
  @Roles(Role.Admin, Role.Master, Role.Stocker, Role.StockerAdmin)
  @UsePipes(ValidationPipe, ActiveProductPipe)
  public async create(
    @Body() dto: StorageDTO,
  ): Promise<Storage> {
    try {
      return await this.service.save(dto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @Roles(Role.Admin, Role.Master, Role.Stocker, Role.StockerAdmin)
  public async getAll(@Req() req): Promise<Storage[]> {
    try {
      return await this.service.getAll(req.user);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(":id")
  @Roles(Role.Admin, Role.Master, Role.Stocker, Role.StockerAdmin)
  public async getOne(@Param("id", ParseUUIDPipe) id: string): Promise<Storage> {
    try {
      return await this.service.getOne(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete()
  @Roles(Role.Master)
  public async delete(
    @Param("id", ParseUUIDPipe) id: string
  ): Promise<void> {
    try {
      return await this.service.softDelete(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}