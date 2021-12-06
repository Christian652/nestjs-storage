import { PrimaryGeneratedColumn, BaseEntity, Column, Entity } from 'typeorm';

@Entity({ name: "products" })
export class Product extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text'})
  description: string;

  @Column("decimal", { precision: 5, scale: 2 })
  unitPrice: number;
}