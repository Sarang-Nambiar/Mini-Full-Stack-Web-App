
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 25, default: 'John Doe' })
    fullName: string;

    @Column('date', { nullable: true }) 
    birthday:Date;

    @Column({ length: 30})
    email: string;
}
