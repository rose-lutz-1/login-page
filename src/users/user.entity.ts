/* file to declare the structure of the user entity. Each user has a number, email, passowrd,
created at date, updated at date, and their hashed and validated passwords. 
*/

import { Entity, PrimaryGeneratedColumn, Column, 
    CreateDateColumn, UpdateDateColumn, BeforeInsert, BaseEntity} from 'typeorm';


import * as bcrypt from 'bcryptjs';

@Entity() //sql table == 'user'
export class User extends BaseEntity {
    @PrimaryGeneratedColumn() //first column generates automatically
    id: number;
  
    @Column({ unique: true }) //no two users can have the same email.
    email: string;
  
    @Column()
    password: string;
  
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
  
    @BeforeInsert()
    async hashPassword() {
      this.password = await bcrypt.hash(this.password, 8);
    }
  
    async validatePassword(password: string): Promise<boolean> {
      return bcrypt.compare(password, this.password);
    }
  }