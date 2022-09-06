import { AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Device {
    @PrimaryGeneratedColumn()
    id: number; // test

    @Column()
    name: string;

    @Column()
    possessionDate: Date;

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