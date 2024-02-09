import { DataSource } from "typeorm";
import { User } from "./Entities/user";
import { UserOtp } from "./Entities/userotps";

const AppDataSource = new DataSource({
  type:'postgres',
  host:'localhost',
  port: 5432,
  username:'postgres',
  password:'password',
  database: 'NStocksE',
  entities: [User, UserOtp],
  synchronize: true,
  logging: true
});

export default AppDataSource

