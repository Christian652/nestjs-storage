import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Seeder } from "nestjs-seeder";
import { UserRepository } from "./user.repository";
import * as bcrypt from 'bcrypt';
import { Role } from "src/auth/enums/role.enum";

@Injectable()
export class UserSeeder implements Seeder {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) { }

  async seed(): Promise<any> {
    try {
      const rawadminpassword = 'admin';

      const adminsalt = await bcrypt.genSalt(10);
      const adminpassword = await bcrypt.hash(rawadminpassword, adminsalt);
    

      const rawmasterpassword = 'master';

      const mastersalt = await bcrypt.genSalt(10);
      const masterpassword = await bcrypt.hash(rawmasterpassword, mastersalt);
    
      return await this.userRepository.insertMany([
        {
          name: 'admin user',
          email: 'admin@gmail.com',
          role: Role.Admin,
          profile_path: 'aaaa',
          confirmated: true,
          password: adminpassword,
        },
        {
          name: 'master user',
          email: 'master@gmail.com',
          role: Role.Master,
          profile_path: 'aaaa',
          confirmated: true,
          password: masterpassword,
        },
      ]);  
    } catch (error) {
      console.log(error)
    }
  }

  async drop(): Promise<any> {
    try {
      const user = await this.userRepository.find();
      await this.userRepository.remove(user);
    } catch (error) {}
  }
}