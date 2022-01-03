import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity({name: "settings"})

export class settings extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 205 })
    key: string;

    @Column({ length: 45 })
    value: string;
}