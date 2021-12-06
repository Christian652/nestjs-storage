import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
  UseGuards,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { IsUserLoggedEqualsGuard } from './guards/isUserLoggedEquals.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) { }

  @Post()
  @UsePipes(ValidationPipe)
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  @UseInterceptors(FileInterceptor("profile_pic", { dest: './uploads/profiles' }))
  public async create(
    @UploadedFile() profile_pic,
    @Body() userDto: UserDTO,
  ) {
    try {
      if (profile_pic?.path) {
        userDto.profile_path = profile_pic.path.split('/')[2];
      }
      userDto.id = parseInt(userDto.id);
      const user = await this.userService.save(userDto);

      return user;
    } catch (error) {
      console.log(error)
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('profile/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './uploads/profiles' });
  }

  @Patch()
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthGuard(), RolesGuard, IsUserLoggedEqualsGuard)
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor("profile_pic", { dest: './uploads/profiles' }))
  public async update(
    @UploadedFile() profile_pic,
    @Body() userDto: UpdateUserDTO
  ): Promise<User> {
    try {
      if (profile_pic && profile_pic.path) {
        userDto.profile_path = profile_pic.path.split('/')[2];
      }
      userDto.id = parseInt(userDto.id);
      const user = await this.userService.update(userDto);

      return user;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard())
  @Get()
  public async getAll(): Promise<User[]> {
    try {
      const users = await this.userService.getAll();
      return users;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  public async getOne(@Param('id', ParseIntPipe) id): Promise<User> {
    try {
      const user = await this.userService.getOne(id);
      return user;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  public async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      const deletedUser = await this.userService.delete(id);
      return deletedUser;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}