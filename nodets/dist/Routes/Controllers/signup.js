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
exports.glogout = exports.gdata = exports.login = exports.signup = void 0;
const user_1 = require("../../Entities/user");
const dataSources_1 = __importDefault(require("../../dataSources"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fname, lname, email, password, pin, country, state, city, address1, address2 } = req.body;
    const userRepo = dataSources_1.default.getRepository(user_1.User);
    const check = yield userRepo.findOne({ where: {
            email
        } });
    if (!check) {
        const user = new user_1.User();
        user.firstname = fname;
        user.lastname = lname;
        user.email = email;
        user.password = password;
        user.pincode = pin;
        user.country = country;
        user.state = state;
        user.city = city;
        user.address2 = address2;
        user.adress1 = address1;
        const userInserted = yield userRepo.save(user);
        return res.status(200).json({ msg: 'User signed up successfully!', status: 'success', data: userInserted });
    }
    return res.status(400).json({ msg: 'Email already exists!', status: 'error' });
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.query;
    const userRepo = dataSources_1.default.getRepository(user_1.User);
    const checkedUser = yield userRepo.findOne({ where: {
            email, password
        } });
    if (checkedUser) {
        return res.status(200).json({ status: 'success', msg: 'User logged in successfully', data: checkedUser });
    }
    return res.status(400).json({ msg: 'Authentication failed.. Please try again!', status: 'error' });
});
exports.login = login;
const gdata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.cookies;
    if (token && token !== 'logged out') {
        const userRepo = dataSources_1.default.getRepository(user_1.User);
        const checkedUser = yield userRepo.findOne({ where: {
                token
            } });
        return res.status(200).json({ status: 'success', msg: 'User logged in successfully', data: checkedUser });
    }
    return res.status(400).json({ msg: 'Authentication failed.. Please try again!', status: 'error' });
});
exports.gdata = gdata;
const glogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const token = (_b = req === null || req === void 0 ? void 0 : req.headers) === null || _b === void 0 ? void 0 : _b.cookies;
    if (token && token !== 'logged out') {
        const userRepo = dataSources_1.default.getRepository(user_1.User);
        const check = yield userRepo.findOne({ where: {
                token
            } });
        if (check) {
            const updated = yield userRepo.update(check.id, {
                token: 'logged out'
            });
            return res.status(200).json({ status: 'success', msg: 'successfully logged out!' });
        }
        return res.status(404).json({ status: 'error', msg: 'Not Found!' });
    }
    return res.status(400).json({ status: 'error', msg: 'Please provide a valid token!' });
});
exports.glogout = glogout;
