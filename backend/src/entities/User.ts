import { AfterLoad, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import bcrypt from 'bcrypt';

@Entity('users')
export class User {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({ select: false })
    password: string;

    @Column()
    is_validated: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    private tempPassword: string;

    @AfterLoad()
    private loadTempPassword(): void {
        this.tempPassword = this.password;
    }

    @BeforeInsert()
    @BeforeUpdate()
    private encryptPassword(): void {
        if (this.tempPassword !== this.password) {
            this.password = bcrypt.hashSync(this.password, 8);
        }
    }    
}
