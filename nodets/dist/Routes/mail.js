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
const mailgun_js_1 = __importDefault(require("mailgun.js"));
const form_data_1 = __importDefault(require("form-data"));
const dotenv_1 = __importDefault(require("dotenv"));
const globalUtils_1 = require("./Controllers/globalUtils");
const dataSources_1 = __importDefault(require("../dataSources"));
const user_1 = require("../Entities/user");
const userotps_1 = require("../Entities/userotps");
dotenv_1.default.config();
const router = express_1.default.Router();
const mailgun = new mailgun_js_1.default(form_data_1.default);
const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere'
});
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    if (email && typeof email === 'string') {
        const userRepo = dataSources_1.default.getRepository(user_1.User);
        const user = yield userRepo.findOne({ where: {
                email
            } });
        if (user) {
            const otpRepo = dataSources_1.default.getRepository(userotps_1.UserOtp);
            const otp = (0, globalUtils_1.getOtp)();
            const userOtp = new userotps_1.UserOtp();
            userOtp.otp = otp;
            userOtp.user = user;
            const mail = yield mg.messages.create('sandbox25831f98c4e440e8b22b5b1260291735.mailgun.org', {
                from: "NStocksE <postmaster@sandbox25831f98c4e440e8b22b5b1260291735.mailgun.org>",
                to: [email],
                subject: "OTP for NStocksE Password Reset",
                text: ``,
                html: `<div>
          <p>Hi! User,</p>
          <p>Your One Time Password (OTP) for resetting your account password is:</p>
          <h3 style="text-align:center">${otp}</h3>
          <p>Thanks!</p>
          <br />
          <div>
            <p>In your service,</p>
            <p>NStocksE Team</p>
          </div>
        </div>`
            });
            if (mail.status === 200) {
                const otpInserted = yield otpRepo.save(userOtp);
                return res.status(200).json({ status: 'success', msg: 'OTP sent!', otp, email });
            }
            return res.status(400).json({ status: 'error', msg: 'Mail cannot be sent at this moment' });
        }
        return res.status(404).json({ status: 'error', msg: 'Email not found!' });
    }
    return res.json({ msg: "Enter a valid email" });
}));
router.get('/verifyOtp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.query;
    if (email && typeof email === 'string') {
        const otpRepo = dataSources_1.default.getRepository(userotps_1.UserOtp);
        const userOtp = yield otpRepo.findOne({
            where: {
                user: { email }
            },
            order: {
                id: "DESC"
            }
        });
        if (userOtp) {
            if (otp && +otp === (userOtp === null || userOtp === void 0 ? void 0 : userOtp.otp))
                return res.status(200).json({ status: 'success', msg: "OTP verified!" });
            else
                return res.status(400).json({ status: 'error', msg: 'Invalid otp' });
        }
        return res.status(404).json({ status: 'error', msg: 'Record requested not found' });
    }
    res.status(400).json({ status: 'error', msg: "Invalid email" });
}));
exports.default = router;
