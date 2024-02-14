"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("./Controllers/user");
const oauth_1 = require("./Controllers/oauth");
const router = express_1.default.Router();
router.post('/signup', user_1.signup);
router.get('/login', user_1.login);
router.get('/googleRequest', oauth_1.clientRequest);
router.get('/getmygoogledata', user_1.gdata);
router.get('/logoutgoogle/:id', user_1.glogout);
router.put('/checkUser', user_1.checkUser);
router.put('/password', user_1.resetPassword);
router.put('/device', user_1.addDevice);
router.get('/checkPass', user_1.verifyPass);
exports.default = router;
