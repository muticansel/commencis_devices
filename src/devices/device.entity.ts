import { AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "../users/user.entity";

@Entity()
export class Device {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: false })
    approved: boolean;

    @Column()
    name: string;

    @Column()
    possessionDate: Date;

    @ManyToOne(() => User, (user) => user.devices)
    user: User;

    @AfterInsert()
    logInsert() {
        console.log('Inserted Device with id', this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('Updated Device with id', this.id);
    }

    @AfterRemove()
    logRemove() {
        console.log('Removed Device with id', this.id);
    }
}