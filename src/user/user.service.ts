import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { LoginDTO } from './dto/login.dto';
import { UserDTO } from './dto/user.dto';
import { UserRepository } from './user.repository';
import { UpdateUserDTO } from './dto/update-user.dto';
import { OperationLogsService } from 'src/operationLogs/operationLogs.service';
import { getRepository } from 'typeorm';
import { Log } from 'src/operationLogs/log.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) { }

  public async save(
    userDto: UserDTO,
  ) {
    
    const user = await this.userRepository.saveUser(userDto);
    const reloadedUser = await this.getOne(user.id);

    // const data = { ...reloadedUser };
    // const log = getRepository(Log).create();
    // log.data = data;

    return user;

  }

  public async update(
    userDto: UpdateUserDTO,
  ) {
    try {
      return await this.userRepository.updateUser(userDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }


  public async getOne(id: number): Promise<User> {
    const foundUser = await this.userRepository.findOne(id);
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    return foundUser;
  }


  public async findByLogin(email: string, password: string): Promise<LoginDTO> {
    const user = await this.userRepository
      .createQueryBuilder("users")
      .where("users.email = :email", { email: email })
      .getOne();

    const login = await user.validatePassword(password);

    return login ? { id: user.id, name: user.name, role: user.role } : null;
  }

  async findById({ id }: any): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  public async delete(userId: number): Promise<void> {
    await this.userRepository.delete(userId);
  }


}


