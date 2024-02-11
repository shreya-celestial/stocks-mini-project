"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_1 = require("./Entities/user");
const userotps_1 = require("./Entities/userotps");
const stocks_1 = require("./Entities/stocks");
const prices_1 = require("./Entities/prices");
const notifications_1 = require("./Entities/notifications");
const AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'NStocksE',
    entities: [user_1.User, userotps_1.UserOtp, stocks_1.Stocks, prices_1.Prices, notifications_1.Notifications],
    synchronize: true,
    logging: true
});
exports.default = AppDataSource;
