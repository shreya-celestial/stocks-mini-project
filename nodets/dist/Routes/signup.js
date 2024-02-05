"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signup_1 = require("./Controllers/signup");
const router = express_1.default.Router();
router.post('/signup', signup_1.signup);
router.get('/login', signup_1.login);
exports.default = router;
