import { TUser } from "./user.interface";
import { User } from "./user.model";

//  new user 
const createUserIntoDB = async (userData: TUser) => {
    if (await User.isUserExists(userData.userId)) {
        throw new Error('User already exists!');
    }
    const result = await User.create(userData);
    return result;
};

//  get all users
const getAllUsersFromDB = async () => {
    const result = await User.aggregate([{ $match: {} }]).project({ _id: 0, password: 0, orders: 0, userId: 0, isActive: 0, hobbies: 0 })
    return result;
};

//get single user
const getSingleUserFromDB = async (userId: number) => {
    const result = await User.aggregate([{ $match: { userId } }]).project({ _id: 0, password: 0,orders:0 });
    if (!(await User.isUserExists(userId))) {
        const error = new Error('User not found');
        (error as any).code = 404;
        (error as any).description = 'User not found!';
        throw error;
    }
    return result;
};

//update user infomation into database
const updateUserIntoDB = async (userId: number, updatedData: TUser) => {
    //using static method check user existence
    if (!(await User.isUserExists(userId))) {
        const error = new Error('User not found');
        (error as any).code = 404;
        (error as any).description = 'User not found!';
        throw error;
    }

    await User.updateOne({ userId }, updatedData);
    const userInfo = await User.aggregate([{ $match: { userId } }]).project({ _id: 0, password: 0 ,orders:0});
    return userInfo;
};


const deleteUserFromDB = async (userId: number) => {
    if (!(await User.isUserExists(userId))) {
        const error = new Error('User not found');
        (error as any).code = 404;
        (error as any).description = 'User not found!';
        throw error;
    }
    const result = await User.deleteOne({ userId: userId });
    return result;
};


//New products add into user order
const addProductsToUserOrders = async (userId: number, order: TUser) => {
    const result = await User.findOneAndUpdate(
        { userId: userId },
        { $push: { orders: order } },
        { new: true },
    );
    //using static method check user existence
    if (!(await User.isUserExists(userId))) {
        const error = new Error('User not found');
        (error as any).code = 404;
        (error as any).description = 'User not found!';
        throw error;
    }
    return result;
};

//Retrieve all orders for specific user
const getAllOrdersOfUser = async (userId: number) => {
    const result = await User.findOne({ userId });
    if (!(await User.isUserExists(userId))) {
        const error = new Error('User not found');
        (error as any).code = 404;
        (error as any).description = 'User not found!';
        throw error;
    }
    return result;
};

//calculate total price of user orders
const getTotalPriceOfOrders = async (userId: number) => {
    const user = await User.findOne({ userId });

    //using static method check user existence
    if (!(await User.isUserExists(userId))) {
        const error = new Error('User not found');
        (error as any).code = 404;
        (error as any).description = 'User not found!';
        throw error;
    }

    const totalPrice = user?.orders?.reduce((total, order) => {
        return total + order.price * order.quantity;
    }, 0);
    return totalPrice;
};

export const userServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateUserIntoDB,
    deleteUserFromDB,
    addProductsToUserOrders,
    getAllOrdersOfUser,
    getTotalPriceOfOrders
}

