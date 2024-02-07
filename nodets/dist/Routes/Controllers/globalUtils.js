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
exports.gdataInTable = void 0;
const user_1 = require("../../Entities/user");
const dataSources_1 = __importDefault(require("../../dataSources"));
const gdataInTable = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = dataSources_1.default.getRepository(user_1.User);
    const check = yield userRepo.findOne({ where: {
            authId: data.sub
        } });
    if (check) {
        const updated = yield userRepo.update(check.id, {
            token: data.token
        });
        return;
    }
    const user = new user_1.User();
    user.firstname = data === null || data === void 0 ? void 0 : data.given_name;
    user.lastname = data === null || data === void 0 ? void 0 : data.family_name;
    user.email = data === null || data === void 0 ? void 0 : data.email;
    user.pictureUrl = data === null || data === void 0 ? void 0 : data.picture;
    user.authId = data === null || data === void 0 ? void 0 : data.sub;
    user.token = data === null || data === void 0 ? void 0 : data.token;
    const userInserted = yield userRepo.save(user);
    return;
});
exports.gdataInTable = gdataInTable;
