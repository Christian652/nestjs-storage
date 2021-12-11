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
import { SettingService } from './settings.service';
import { SettingDTO } from './dto/settings.dto';
import { Setting } from './settings.entity';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator'
import { RolesGuard } from 'src/auth/roles.guard';

@UseGuards(AuthGuard(), RolesGuard)
@Controller('settings')
export class SettingController {
  constructor(
    private settingsService: SettingService
  ) { }

  @Post()
  @Roles(Role.Admin, Role.Master)
  @UsePipes(ValidationPipe)
  public async create(
    @Body() dto: SettingDTO,
  ): Promise<any> {
    try {
      return await this.settingsService.save(dto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @Roles(Role.Admin, Role.Master)
  public async getAll(@Req() req): Promise<Setting[]> {
    try {
      return await this.settingsService.getSettings(req.user);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(":id")
  @Roles(Role.Admin, Role.Master)
  public async getOne(@Param("id") id: number): Promise<any> {
    try {
      return await this.settingsService.getOne(id);
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
      return await this.settingsService.delete(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}