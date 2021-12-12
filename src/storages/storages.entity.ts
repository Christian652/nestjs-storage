import { Product } from './../product/product.entity';
import { User } from './../user/user.entity';
import { PrimaryGeneratedColumn, BaseEntity, Column, Entity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';

@Entity({ name: "storages" })
export class Storage extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'integer', nullable: false })
  amount: number;

  @ManyToOne(
    () => User,
    user => user.storages,
    { cascade: true, onDelete: 'SET NULL' }
  )
  stocker: User;

  @ManyToOne(
    () => Product,
    product => product.storages,
    { cascade: true, onDelete: 'SET NULL' }
  )
  product: Product;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
  
  @DeleteDateColumn()
  deleted_at: Date;
}