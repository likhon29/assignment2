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
//  new user 
const createUserIntoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExists(userData.userId)) {
        throw new Error('User already exists!');
    }
    const result = yield user_model_1.User.create(userData);
    return result;
});
//  get all users
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.aggregate([{ $match: {} }]).project({ _id: 0, password: 0, orders: 0, userId: 0, isActive: 0, hobbies: 0 });
    return result;
});
//get single user
const getSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.aggregate([{ $match: { userId } }]).project({ _id: 0, password: 0, orders: 0 });
    if (!(yield user_model_1.User.isUserExists(userId))) {
        const error = new Error('User not found');
        error.code = 404;
        error.description = 'User not found!';
        throw error;
    }
    return result;
});
//update user infomation into database
const updateUserIntoDB = (userId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    //using static method check user existence
    if (!(yield user_model_1.User.isUserExists(userId))) {
        const error = new Error('User not found');
        error.code = 404;
        error.description = 'User not found!';
        throw error;
    }
    yield user_model_1.User.updateOne({ userId }, updatedData);
    const userInfo = yield user_model_1.User.aggregate([{ $match: { userId } }]).project({ _id: 0, password: 0, orders: 0 });
    return userInfo;
});
const deleteUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.User.isUserExists(userId))) {
        const error = new Error('User not found');
        error.code = 404;
        error.description = 'User not found!';
        throw error;
    }
    const result = yield user_model_1.User.deleteOne({ userId: userId });
    return result;
});
//New products add into user order
const addProductsToUserOrders = (userId, order) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOneAndUpdate({ userId: userId }, { $push: { orders: order } }, { new: true });
    //using static method check user existence
    if (!(yield user_model_1.User.isUserExists(userId))) {
        const error = new Error('User not found');
        error.code = 404;
        error.description = 'User not found!';
        throw error;
    }
    return result;
});
//Retrieve all orders for specific user
const getAllOrdersOfUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ userId });
    if (!(yield user_model_1.User.isUserExists(userId))) {
        const error = new Error('User not found');
        error.code = 404;
        error.description = 'User not found!';
        throw error;
    }
    return result;
});
//calculate total price of user orders
const getTotalPriceOfOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield user_model_1.User.findOne({ userId });
    //using static method check user existence
    if (!(yield user_model_1.User.isUserExists(userId))) {
        const error = new Error('User not found');
        error.code = 404;
        error.description = 'User not found!';
        throw error;
    }
    const totalPrice = (_a = user === null || user === void 0 ? void 0 : user.orders) === null || _a === void 0 ? void 0 : _a.reduce((total, order) => {
        return total + order.price * order.quantity;
    }, 0);
    return totalPrice;
});
exports.userServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateUserIntoDB,
    deleteUserFromDB,
    addProductsToUserOrders,
    getAllOrdersOfUser,
    getTotalPriceOfOrders
};
