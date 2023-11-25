import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (userData: TUser) => {
    if (await User.isUserExists(userData.userId)) {
        throw new Error('User already exists!');
    }
    const result = await User.create(userData);
    return result;
};


const getAllUsersFromDB = async () => {
    const result = await User.aggregate([{ $match: {} }]).project({ _id: 0, password: 0, orders: 0, userId: 0, isActive: 0, hobbies: 0 })
    return result;
};


const getSingleUserFromDB = async (userId: number) => {
    const result = await User.aggregate([{ $match: { userId } }]).project({ _id: 0, password: 0 });
    return result;
};

const deleteUserFromDB = async (userId: number) => {
    if (await User.isUserExists(userId)) {
        throw new Error('User not found!');
    }
    const result = await User.deleteOne({ userId: userId });
    return result;
};

export const userServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    deleteUserFromDB
}