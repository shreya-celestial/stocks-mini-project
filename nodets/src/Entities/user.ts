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

  @Column({nullable: true, unique:true,})
  token: string;
}