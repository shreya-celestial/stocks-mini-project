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
exports.googleRequest = exports.clientRequest = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const google_auth_library_1 = require("google-auth-library");
const globalUtils_1 = require("./globalUtils");
dotenv_1.default.config();
const SCOPES = [
    'https://www.googleapis.com/auth/userinfo.email openid ',
    'https://www.googleapis.com/auth/userinfo.profile openid ',
];
const clientRequest = (req, res) => {
    const redirectUrl = 'http://localhost:8080/oauth';
    const oAuth2Client = new google_auth_library_1.OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET, redirectUrl);
    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        prompt: 'consent'
    });
    res.status(200).json({ url: authorizeUrl });
};
exports.clientRequest = clientRequest;
const getUserData = (access_token) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
    const data = yield response.json();
    return data;
});
const googleRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query.code;
    try {
        const redirectURL = "http://localhost:8080/oauth";
        const oAuth2Client = new google_auth_library_1.OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET, redirectURL);
        const token = yield oAuth2Client.getToken(code);
        yield oAuth2Client.setCredentials(token.tokens);
        const user = oAuth2Client.credentials;
        const data = yield getUserData(oAuth2Client.credentials.access_token);
        data["token"] = user === null || user === void 0 ? void 0 : user.id_token;
        (0, globalUtils_1.gdataInTable)(data);
        return res.cookie('token', user === null || user === void 0 ? void 0 : user.id_token).redirect(303, 'http://localhost:3000/login/user');
    }
    catch (err) {
        console.log('Error logging in with OAuth2 user', err);
    }
    res.clearCookie('token').redirect(303, 'http://localhost:3000/login/user');
});
exports.googleRequest = googleRequest;
