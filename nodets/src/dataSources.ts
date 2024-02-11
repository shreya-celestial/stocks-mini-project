import { DataSource } from "typeorm";
import { User } from "./Entities/user";
import { UserOtp } from "./Entities/userotps";
import { Stocks } from "./Entities/stocks";
import { Prices } from "./Entities/prices";
import { Notifications } from "./Entities/notifications";

const AppDataSource = new DataSource({
  type:'postgres',
  host:'localhost',
  port: 5432,
  username:'postgres',
  password:'password',
  database: 'NStocksE',
  entities: [User, UserOtp, Stocks, Prices, Notifications],
  synchronize: true,
  logging: true
});

export default AppDataSource

