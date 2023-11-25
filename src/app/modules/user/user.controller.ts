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

export const UserControllers = {
    createUser,
    getAllUsers,
    getSingleUser,
    deleteUserFromDB
};