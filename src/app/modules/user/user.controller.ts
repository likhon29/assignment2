import { Request, Response } from 'express';
import { userServices } from "./user.service";
import userValidationSchema from "./user.validation";

const createUser = async (req: Request, res: Response) => {
    try {
        const { user: userData } = req.body;
        const zodParsedData = userValidationSchema.parse(userData);
        const result = await userServices.createUserIntoDB(zodParsedData);

        res.status(200).json({
            success: true,
            message: 'User is created succesfully',
            data: {
                userId: result?.userId,

                username: result?.username,

                fullName: result?.fullName,
                age: result?.age,
                email: result?.email,
                isActive: result?.isActive,
                hobbies: result?.hobbies,
                address: result?.address

            },
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
};


const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getAllUsersFromDB();

        res.status(200).json({
            success: true,
            message: 'Users are retrieved succesfully',
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
};

const getSingleUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const result = await userServices.getSingleUserFromDB(Number(userId));

        res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
};

const updateUserInfo = async (req: Request, res: Response) => {
    try {

        const userId = Number(req.params.userId);
        const { user } = req.body;
        const result = await userServices.updateUserIntoDB(userId, user);
        res.status(200).json({
            success: true,
            message: 'User updated successfully!',
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something wrong',
            error: err,
        });
    }
};

const deleteUserFromDB = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        await userServices.deleteUserFromDB(Number(userId));

        res.status(200).json({
            success: true,
            message: "User deleted successfully!",
            data: null,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'User not found',
            error: err,
        });
    }
};
const addProductsToUserOrders = async (req: Request, res: Response) => {
    try {
        const { order } = req.body;
        const userId = Number(req.params.userId);
        await userServices.addProductsToUserOrders(userId, order);
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: null,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
};
const getAllOrdersOfUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const result = await userServices.getAllOrdersOfUser(Number(userId));
        res.status(200).json({
            success: true,
            message: 'Orders fetched successfully!',
            data: { orders: result?.orders },
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
};

const getTotalPriceOfOrders = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const result = await userServices.getTotalPriceOfOrders(Number(userId));
        res.status(200).json({
            success: true,
            message: 'Total price calculated successfully!',
            data: { totalPrice: result },
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
};


export const UserControllers = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUserInfo,
    deleteUserFromDB,
    addProductsToUserOrders,
    getAllOrdersOfUser,
    getTotalPriceOfOrders,
};