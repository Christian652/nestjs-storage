
import { PrimaryGeneratedColumn, BaseEntity, Column, Entity, CreateDateColumn, OneToMany, ManyToMany, UpdateDateColumn} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Role } from 'src/auth/enums/role.enum';
import { Product } from 'src/product/product.entity';
import { Storage } from 'src/storages/storages.entity';


@Entity({name: "users"})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Column({ nullable: true})
  confirmation_token: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  confirmated: boolean;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @OneToMany(
    () => Product,
    product => product.author
  )
  productsICreated: Product[];

  @OneToMany(
    () => Storage,
    storage => storage.stocker
  )
  storages: Storage[];

  @ManyToMany(
    () => Product,
    product => product.stockers,
    { cascade: true, onDelete:"SET NULL", nullable: true}
  )
  productsIStock: Product[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
  
  async validatePassword(password: string) {
    return await bcrypt.compare(password,  this.password);
  }

 
}