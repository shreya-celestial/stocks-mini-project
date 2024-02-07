"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const oauth_1 = require("./Controllers/oauth");
const router = express_1.default.Router();
router.get('/', oauth_1.googleRequest);
exports.default = router;
