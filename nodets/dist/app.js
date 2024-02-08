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
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const nocache_1 = __importDefault(require("nocache"));
const cors_1 = __importDefault(require("cors"));
const serpapi_1 = require("serpapi");
const dataSources_1 = __importDefault(require("./dataSources"));
const signup_1 = __importDefault(require("./Routes/signup"));
const googleOauth_1 = __importDefault(require("./Routes/googleOauth"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, nocache_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use('/user', signup_1.default);
app.use('/oauth', googleOauth_1.default);
app.get('/market', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { stock } = req.query;
    try {
        const gbodyFinance = {
            engine: "google_finance",
            q: stock,
            api_key: process.env.GOOGLE_API_KEY,
        };
        const gresFin = yield (0, serpapi_1.getJson)(gbodyFinance);
        return res.status(200).json(gresFin);
    }
    catch (err) {
        return res.status(400).json({ error: err });
    }
}));
dataSources_1.default.initialize().then(() => {
    console.log('db connected!');
    app.listen(8080, () => {
        console.log('Listening on http://localhost:8080/');
    });
}).catch((err) => {
    console.log(err);
});
