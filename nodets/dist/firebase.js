"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("firebase-admin/app");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
process.env.GOOGLE_APPLICATION_CREDENTIALS;
(0, app_1.initializeApp)({
    credential: (0, app_1.applicationDefault)()
});
