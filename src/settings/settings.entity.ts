import { PrimaryGeneratedColumn, BaseEntity, Column, Entity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';

@Entity({ name: "settings" })
export class Setting extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true, update: false })
  key: string;

  @Column({ nullable: false })
  value: string;

  @CreateDateColumn()
  created_at: Date;
}