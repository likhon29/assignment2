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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const user_model_1 = require("./user.model");
const createUserIntoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExists(userData.userId)) {
        throw new Error('User already exists!');
    }
    const result = yield user_model_1.User.create(userData);
    return result;
});
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.aggregate([{ $match: {} }]).project({ _id: 0, password: 0, orders: 0, userId: 0, isActive: 0, hobbies: 0 });
    return result;
});
const getSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.aggregate([{ $match: { userId } }]).project({ _id: 0, password: 0 });
    return result;
});
const deleteUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExists(userId)) {
        throw new Error('User not found!');
    }
    const result = yield user_model_1.User.deleteOne({ userId: userId });
    return result;
});
exports.userServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    deleteUserFromDB
};
