
import { PrimaryGeneratedColumn, BaseEntity, Column, Entity, CreateDateColumn} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Role } from 'src/auth/enums/role.enum';


@Entity({name: "users"})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  role: Role;

  @Column({ nullable: true})
  profile_path: string;

  @Column({ nullable: true})
  password_reset_token: string;

  @Column({ type: 'timestamp', nullable: true})
  password_reset_expires: Date;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @CreateDateColumn()
  created_at: Date;
  
  async validatePassword(password: string) {
    return await bcrypt.compare(password,  this.password);
  }

 
}