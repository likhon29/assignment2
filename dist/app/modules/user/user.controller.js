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
exports.UserControllers = void 0;
const user_service_1 = require("./user.service");
const user_validation_1 = __importDefault(require("./user.validation"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { user: userData } = req.body;
        const zodParsedData = user_validation_1.default.parse(req.body);
        const result = yield user_service_1.userServices.createUserIntoDB(zodParsedData);
        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: {
                userId: result === null || result === void 0 ? void 0 : result.userId,
                username: result === null || result === void 0 ? void 0 : result.username,
                fullName: result === null || result === void 0 ? void 0 : result.fullName,
                age: result === null || result === void 0 ? void 0 : result.age,
                email: result === null || result === void 0 ? void 0 : result.email,
                isActive: result === null || result === void 0 ? void 0 : result.isActive,
                hobbies: result === null || result === void 0 ? void 0 : result.hobbies,
                address: result === null || result === void 0 ? void 0 : result.address
            },
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userServices.getAllUsersFromDB();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.userServices.getSingleUserFromDB(Number(userId));
        res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
});
const updateUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const result = yield user_service_1.userServices.updateUserIntoDB(userId, req.body);
        res.status(200).json({
            success: true,
            message: 'User updated successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something wrong',
            error: err,
        });
    }
});
const deleteUserFromDB = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        yield user_service_1.userServices.deleteUserFromDB(Number(userId));
        res.status(200).json({
            success: true,
            message: "User deleted successfully!",
            data: null,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'User not found',
            error: err,
        });
    }
});
const addProductsToUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        yield user_service_1.userServices.addProductsToUserOrders(userId, req.body);
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: null,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
const getAllOrdersOfUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.userServices.getAllOrdersOfUser(Number(userId));
        res.status(200).json({
            success: true,
            message: 'Order fetched successfully!',
            data: { orders: result === null || result === void 0 ? void 0 : result.orders },
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
const getTotalPriceOfOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.userServices.getTotalPriceOfOrders(Number(userId));
        res.status(200).json({
            success: true,
            message: 'Total price calculated successfully!',
            data: { totalPrice: result },
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
exports.UserControllers = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUserInfo,
    deleteUserFromDB,
    addProductsToUserOrders,
    getAllOrdersOfUser,
    getTotalPriceOfOrders,
};
