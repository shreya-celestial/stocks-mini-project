import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

@Entity()
export class Notifications {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  message: string;

  @ManyToOne(()=>User, (user)=>user.messages, {onDelete:"CASCADE", eager:true})
  user: User
}