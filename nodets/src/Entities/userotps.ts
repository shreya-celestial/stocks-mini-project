import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user";

@Entity()
export class UserOtp {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  otp:number;

  @ManyToOne(()=>User, (user)=>user.otps, {onDelete:"CASCADE"})
  user: User
}