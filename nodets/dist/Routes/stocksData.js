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
const stocks_1 = require("../Entities/stocks");
const typeorm_1 = require("typeorm");
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size } = req.query;
    const stocksRepo = dataSources_1.default.getRepository(stocks_1.Stocks);
    const stocksData = yield stocksRepo.find();
    if (page && size) {
        const lowerLim = +size * (+page - 1);
        const upperLim = +size * +page;
        const pages = Math.round(stocksData.length / +size);
        const data = yield stocksRepo.find({ where: {
                id: (0, typeorm_1.And)((0, typeorm_1.MoreThan)(lowerLim), (0, typeorm_1.LessThanOrEqual)(upperLim))
            } });
        return res.status(200).json({ data, records: stocksData.length, pages });
    }
    if (page) {
        const lowerLim = 10 * (+page - 1);
        const upperLim = 10 * +page;
        const pages = Math.round(stocksData.length / 10);
        const data = yield stocksRepo.find({ where: {
                id: (0, typeorm_1.And)((0, typeorm_1.MoreThan)(lowerLim), (0, typeorm_1.LessThanOrEqual)(upperLim))
            } });
        return res.status(200).json({ data, records: stocksData.length, pages });
    }
    if (size) {
        const lowerLim = +size * (1 - 1);
        const upperLim = +size * 1;
        const pages = Math.round(stocksData.length / +size);
        const data = yield stocksRepo.find({ where: {
                id: (0, typeorm_1.And)((0, typeorm_1.MoreThan)(lowerLim), (0, typeorm_1.LessThanOrEqual)(upperLim))
            } });
        return res.status(200).json({ data, records: stocksData.length, pages });
    }
    return res.status(200).json({ data: stocksData, records: stocksData.length, pages: 1 });
}));
exports.default = router;
// const data= [
//   {
//     name: "TCS",
//     ticker: "TCS:NSE",
//   },
//   {
//     name: "Wipro Ltd",
//     ticker: "WIPRO:NSE",
//   },
//   {
//     name: "Infosys Ltd",
//     ticker: "INFY:NSE",
//   },
//   {
//     name: "Just Dial Ltd",
//     ticker: "JUSTDIAL:NSE",
//   },
//   {
//     name: "Titan Company Ltd",
//     ticker: "TITAN:NSE",
//   },
//   {
//     name: "Reliance Industries Ltd",
//     ticker: "RELIANCE:NSE",
//   },
//   {
//     name: "HDFC Bank Ltd",
//     ticker: "HDFCBANK:NSE",
//   },
//   {
//     name: "ICICI Bank Ltd",
//     ticker: "ICICIBANK:NSE",
//   },
//   {
//     name: "Bharti Airtel Ltd",
//     ticker: "BHARTIARTL:NSE",
//   },
//   {
//     name: "Life Insurance Corporation of India",
//     ticker: "LICI:NSE",
//   },
//   {
//     name: "State Bank of India",
//     ticker: "SBIN:NSE",
//   },
//   {
//     name: "Hindustan Unilever Ltd",
//     ticker: "HINDUNILVR:NSE",
//   },
//   {
//     name: "ITC Ltd",
//     ticker: "ITC:NSE",
//   },
//   {
//     name: "Larsen and Toubro Ltd",
//     ticker: "LT:NSE",
//   },
//   {
//     name: "HCL Technologies Ltd",
//     ticker: "HCLTECH:NSE",
//   },
//   {
//     name: "Bajaj Finance Ltd",
//     ticker: "BAJFINANCE:NSE",
//   },
//   {
//     name: "Kotak Mahindra Bank Ltd Fully Paid Ord. Shrs",
//     ticker: "KOTAKBANK:NSE",
//   },
//   {
//     name: "Adani Enterprises Ltd",
//     ticker: "ADANIENT:NSE",
//   },
//   {
//     name: "Sun Pharmaceutical Industries Ltd",
//     ticker: "SUNPHARMA:NSE",
//   },
//   {
//     name: "Maruti Suzuki India Ltd",
//     ticker: "MARUTI:NSE",
//   },
//   {
//     name: "Axis Bank Ltd",
//     ticker: "AXISBANK:NSE",
//   },
//   {
//     name: "Oil and Natural Gas Corporation Ltd",
//     ticker: "ONGC:NSE",
//   },
//   {
//     name: "NTPC Ltd",
//     ticker: "NTPC:NSE",
//   },
//   {
//     name: "Tata Motors Ltd Fully Paid Ord. Shrs",
//     ticker: "TATAMOTORS:NSE",
//   },
//   {
//     name: "UltraTech Cement Ltd",
//     ticker: "ULTRACEMCO:NSE",
//   },
// ];
// router.post('/', async(req,res)=>{
//   const stocksRepo = AppDataSource.getRepository(Stocks);
//   await stocksRepo.save(data)
//   res.send('hi')
// })
