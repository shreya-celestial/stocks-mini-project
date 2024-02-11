import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Prices } from "./prices";

@Entity()
export class Stocks{
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  name: string;

  @Column()
  ticker: string;

  @OneToMany(()=>Prices, (price)=>price.stock)
  prices: Prices[]
}