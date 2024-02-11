import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Stocks } from "./stocks";
import { User } from "./user";

@Entity()
export class Prices{
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  price: string;

  @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP', type:'date' })
  created: Date;

  @ManyToOne(()=>Stocks, (stock)=>stock.prices, {eager:true,onDelete:"CASCADE"})
  stock: Stocks

  @ManyToOne(()=>User, (user)=>user.stockprice, {onDelete:"CASCADE"})
  user: User
}