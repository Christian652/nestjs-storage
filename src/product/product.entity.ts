import { Storage } from 'src/storages/storages.entity';
import { User } from 'src/user/user.entity';
import { PrimaryGeneratedColumn, BaseEntity, Column, Entity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity({ name: "products" })
export class Product extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 100, nullable: true })
  thumbnail: string;

  @Column({ type: 'boolean', default: 1, nullable: false })
  status: boolean;

  @Column({ type: 'text', nullable: true})
  description: string;

  @Column("decimal", { precision: 5, scale: 2, nullable: false })
  unitPrice: number;
  
  @Column({ type: 'simple-json', nullable: false })
  details: JSON;

  @ManyToOne(
    () => User,
    user => user.productsICreated,
    { cascade: true, onDelete: "SET NULL", nullable: true}
  )
  author: User;

  @OneToMany(
    () => Storage,
    storage => storage.product
  )
  storages: Storage[];

  @ManyToMany(() => User)
  @JoinTable()
  stockers: User[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}