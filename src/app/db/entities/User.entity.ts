import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Check
} from 'typeorm';
import {UserStatus} from "@db/types/enams";
import {enumToStrings} from "@db/util/transformer";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    username?: string;

    @Column('text')
    preferences?: string;

    @Column('text')
    @Check(`status IN (${enumToStrings(UserStatus)})`)
    status: string;

    @CreateDateColumn({type: 'date'})
    createdAt?: Date;

    @UpdateDateColumn({type: 'date'})
    updatedAt?: Date;

    @DeleteDateColumn({type: 'date'})
    deletedAt?: Date;

    constructor(username?:string, status?: UserStatus, preferences?: string) {
        if (username) this.username = username;
        if (status) this.status = status;
        this.preferences = preferences;
    }
}