"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dataSources_1 = __importDefault(require("../dataSources"));
const user_1 = require("../Entities/user");
const stocks_1 = require("../Entities/stocks");
const prices_1 = require("../Entities/prices");
const typeorm_1 = require("typeorm");
const router = express_1.default.Router();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ticker, price: bodyPrice, email } = req.body;
    if (email && typeof ticker === "string") {
        const userRepo = dataSources_1.default.getRepository(user_1.User);
        const user = yield userRepo.findOne({ where: {
                email
            } });
        if (user) {
            if (ticker && typeof ticker === "string") {
                const stocksRepo = dataSources_1.default.getRepository(stocks_1.Stocks);
                const stock = yield stocksRepo.findOne({ where: {
                        ticker
                    } });
                if (stock) {
                    const pricesRepo = dataSources_1.default.getRepository(prices_1.Prices);
                    const price = new prices_1.Prices();
                    price.price = bodyPrice;
                    price.stock = stock;
                    price.user = user;
                    const priceInserted = yield pricesRepo.save(price);
                    if (priceInserted) {
                        return res.status(200).json({ status: 'success', msg: 'Prices saved successfully!' });
                    }
                    return res.status(400).json({ status: 'error', msg: 'Prices cannot be saved at this moment. Please try again later!' });
                }
                return res.status(404).json({ status: 'error', msg: 'Stock you are trying to save is not found!' });
            }
            return res.status(400).json({ status: 'error', msg: 'Stock you are trying to save is not valid!' });
        }
        return res.status(404).json({ status: 'error', msg: 'User not found!' });
    }
    return res.status(400).json({ status: 'error', msg: 'Invalid Request' });
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, start: startDate, end: endDate } = req.query;
    if (email && typeof email === 'string') {
        const userRepo = dataSources_1.default.getRepository(user_1.User);
        const user = yield userRepo.findOne({ where: { email } });
        if (user) {
            const pricesRepo = dataSources_1.default.getRepository(prices_1.Prices);
            if (startDate && typeof startDate === 'string') {
                const start = new Date(startDate);
                if (endDate && typeof endDate === 'string') {
                    const end = new Date(endDate);
                    const data = yield pricesRepo.find({ where: {
                            created: (0, typeorm_1.And)((0, typeorm_1.MoreThanOrEqual)(start), (0, typeorm_1.LessThanOrEqual)(end)),
                            user
                        },
                        order: {
                            id: 'ASC',
                            stock: {
                                name: 'DESC'
                            }
                        }
                    });
                    return res.status(200).json({ status: 'success', msg: 'Data successfully fetched', data });
                }
                const data = yield pricesRepo.find({ where: {
                        created: (0, typeorm_1.MoreThanOrEqual)(start),
                        user
                    },
                    order: {
                        id: 'ASC',
                        stock: {
                            name: 'DESC'
                        }
                    }
                });
                return res.status(200).json({ status: 'success', msg: 'Data successfully fetched', data });
            }
            if (endDate && typeof endDate === 'string') {
                const end = new Date(endDate);
                const data = yield pricesRepo.find({ where: {
                        created: (0, typeorm_1.LessThanOrEqual)(end),
                        user
                    },
                    order: {
                        id: 'ASC',
                        stock: {
                            name: 'DESC'
                        }
                    }
                });
                return res.status(200).json({ status: 'success', msg: 'Data successfully fetched', data });
            }
            const data = yield pricesRepo.find({ where: {
                    user
                },
                order: {
                    id: 'ASC',
                    stock: {
                        name: 'DESC'
                    }
                }
            });
            return res.status(200).json({ status: 'success', msg: 'Data successfully fetched', data });
        }
        return res.status(404).json({ status: 'error', msg: 'User not found' });
    }
    return res.status(400).json({ status: 'error', msg: 'Invalid request' });
}));
exports.default = router;
