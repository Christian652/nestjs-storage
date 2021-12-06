
import { PrimaryGeneratedColumn, BaseEntity, Column, Entity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
@Entity()
export class Log extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  operation_type: string;

  @Column()
  object_type: string;

  @Column({ type: 'simple-json' })
  data: JSON;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}