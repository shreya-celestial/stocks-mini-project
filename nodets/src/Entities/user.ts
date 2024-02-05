import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";

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

  @Column()
  password: string;

  @Column()
  pincode: number;

  @Column()
  country: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  adress1: string;

  @Column()
  address2: string;
}