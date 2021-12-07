import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Seeder } from "nestjs-seeder";
import { UserRepository } from "./user.repository";
import * as bcrypt from 'bcrypt';
import { Role } from "src/auth/enums/role.enum";

@Injectable()
export class DevUserSeeder implements Seeder {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) { }

  async seed(): Promise<any> {
    try {
      const users = []; //

      await this.userRepository.createQueryBuilder("users")
                                .delete()
                                .where("id > :id", {id: 15}).execute();

      for (let month_index = 1; month_index <= 12; month_index++) {
        const randomNumber = Math.random();
        const monthAmount = Math.ceil(randomNumber * 10);

        for (let index = 1; index <= monthAmount; index++) {
          const user_ = {
            id: null,
            name: `usuario ${index}`,
            role: Role.Stocker,
            email: `usuario${index}@gmail.com`,
            password: `usuario${index}`,
            profile_path: `aaaaa`,
            created_at: new Date(`2021-${month_index}-10`),
          };

          users.push(user_);
        }
      }

      return await this.userRepository.insertMany(users);
    } catch (error) {
      console.log(error)
    }
  }

  async drop(): Promise<any> {
    try {
      const user = await this.userRepository.find();
      await this.userRepository.remove(user);
    } catch (error) { }
  }
}