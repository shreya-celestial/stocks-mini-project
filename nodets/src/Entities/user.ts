import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { UserOtp } from "./userotps";
import { Prices } from "./prices";
import { Notifications } from "./notifications";

@Entity()
export class User{
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column({nullable: true,})
  password: string;

  @Column({nullable: true,})
  pincode: number;

  @Column({nullable: true,})
  country: string;

  @Column({nullable: true,})
  state: string;

  @Column({nullable: true,})
  city: string;

  @Column({nullable: true,})
  adress1: string;

  @Column({nullable: true,})
  address2: string;

  @Column({nullable: true,})
  pictureUrl: string;

  @Column({nullable: true, unique:true,})
  authId: string;

  @Column({nullable: true,})
  token: string;

  @Column({nullable: true,})
  deviceToken: string

  @OneToMany(()=>UserOtp, (otp)=>otp.user)
  otps:UserOtp[]

  @OneToMany(()=>Prices, (price)=>price.user)
  stockprice: Prices[]

  @OneToMany(()=>Notifications, (notify)=>notify.user)
  messages: Notification[]
}