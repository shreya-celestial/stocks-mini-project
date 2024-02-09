"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signup_1 = require("./Controllers/signup");
const oauth_1 = require("./Controllers/oauth");
const router = express_1.default.Router();
router.post('/signup', signup_1.signup);
router.get('/login', signup_1.login);
router.get('/googleRequest', oauth_1.clientRequest);
router.get('/getmygoogledata', signup_1.gdata);
router.get('/logoutgoogle/:id', signup_1.glogout);
router.put('/checkUser', signup_1.checkUser);
router.put('/password', signup_1.resetPassword);
exports.default = router;
