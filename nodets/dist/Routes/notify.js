"use strict";
//  $env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\shreya.garg\Desktop\All\Assigned Projects\Git Repos\Stocks react node ts app\nodets\nstockse-firebase-adminsdk-pg15l-6b4b24e2e8.json"
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
const user_1 = require("../Entities/user");
const notifications_1 = require("../Entities/notifications");
const app_1 = require("firebase-admin/app");
const messaging_1 = require("firebase-admin/messaging");
const typeorm_1 = require("typeorm");
const router = express_1.default.Router();
const app = (0, app_1.initializeApp)({
    credential: (0, app_1.applicationDefault)(),
});
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, message } = req.body;
    const userRepo = dataSources_1.default.getRepository(user_1.User);
    const user = yield userRepo.findOne({ where: { email } });
    if (user) {
        const notification = new notifications_1.Notifications();
        notification.message = message;
        notification.user = user;
        const notiRepo = dataSources_1.default.getRepository(notifications_1.Notifications);
        const notiInserted = yield notiRepo.save(notification);
        if (notiInserted) {
            const allUsers = yield userRepo.find({
                select: {
                    deviceToken: true
                }
            });
            const deviceTokens = allUsers.map((item) => item.deviceToken);
            const fbMessage = {
                notification: { title: user === null || user === void 0 ? void 0 : user.email, body: message },
                tokens: deviceTokens,
            };
            const msgs = yield (0, messaging_1.getMessaging)().sendMulticast(fbMessage);
            if (msgs.successCount) {
                return res.status(200).json({ status: 'success', msg: 'Notification sent!' });
            }
            return res.status(400).json({ status: 'error', msg: 'Notification cannot be sent at the moment' });
        }
        return res.status(400).json({ status: 'error', msg: 'Something went wrong, Please try again!' });
    }
    return res.status(404).json({ status: 'error', msg: 'User not found!' });
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    if (email && typeof email === "string") {
        const userRepo = dataSources_1.default.getRepository(user_1.User);
        const user = yield userRepo.findOne({ where: {
                email
            } });
        if (user) {
            const notiRepo = dataSources_1.default.getRepository(notifications_1.Notifications);
            const notifications = yield notiRepo.find({
                where: {
                    user: {
                        id: (0, typeorm_1.Not)(user.id)
                    }
                },
                order: {
                    id: 'DESC'
                }
            });
            if (notifications) {
                return res.status(200).json({ status: 'success', msg: 'Notifications received', data: notifications });
            }
            return res.status(400).json({ status: 'error', msg: 'Cannot get notifications at the moment' });
        }
        return res.status(400).json({ status: 'error', msg: 'Invalid user!' });
    }
    return res.status(400).json({ status: 'error', msg: 'Invalid request' });
}));
exports.default = router;
