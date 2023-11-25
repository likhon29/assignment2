import { Schema, model } from "mongoose";
import { TAddress, TFullName, TOrder, TUser, UserModel } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

const userFullNameSchema = new Schema<TFullName>(
    {
        firstName: {
            type: String,
            required: [true, 'First Name is required'],
            trim: true,
            maxlength: [20, 'Name can not be more than 20 characters'],
        },
        lastName: {
            type: String,
            trim: true,
            required: [true, 'Last Name is required'],
            maxlength: [20, 'Name can not be more than 20 characters'],
        },
    }
)

const userAddressSchema = new Schema<TAddress>({
    street: { type: String, required: [true, "street is required"] },
    city: { type: String, required: [true, "city is required"] },
    country: { type: String, required: [true, "country is required"] },
})


const userOrderSchema = new Schema<TOrder>({
    productName: { type: String, required: true },
    price: { type: Number, required: true, min: 1 },
    quantity: { type: Number, required: true, min: 1 },
})

const userSchema = new Schema<TUser, UserModel>({
    userId: {
        type: Number,
        required: [true, 'user id is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        maxlength: [20, 'Password can not be more than 20 characters'],
    },
    username: { type: String, required: [true, 'username is required'], unique: true, trim: true },
    fullName: {
        type: userFullNameSchema,
        required: [true, 'Name is required']
    },
    age: {
        type: Number,
        required: [true, "Age is required"]
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    isActive: {
        type: Boolean,
        required: [true, 'account status is required'],
    },
    hobbies: { type: [String], required: [true, 'hobbies is required'] },
    address: {
        type: userAddressSchema,
        required: [true, "address is required"]
    },
    orders: [userOrderSchema]
})

// pre save middleware/ hook : will work on create()  save()
userSchema.pre('save', async function (next) {
    // console.log(this, 'pre hook : we will save  data');
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this; // doc
    // hashing password and save into DB
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds),
    );
    next();
});


//creating a custom static method
userSchema.statics.isUserExists = async function (userId: number) {
    const existingUser = await User.findOne({ userId });
    return existingUser;
};

// post save middleware / hook
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});


export const User = model<TUser, UserModel>('User', userSchema)