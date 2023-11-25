"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
const zod_1 = require("zod");
const userNameSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .min(1)
        .max(20)
        .refine((value) => /^[A-Z]/.test(value), {
        message: 'First Name must start with a capital letter',
    }),
    lastName: zod_1.z.string(),
});
const userAddressSchema = zod_1.z.object({
    street: zod_1.z.string(),
    city: zod_1.z.string(),
    country: zod_1.z.string()
});
const userOrderSchema = zod_1.z.object({
    productName: zod_1.z.string(),
    price: zod_1.z.number().min(1),
    quantity: zod_1.z.number().min(1)
});
exports.userValidationSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    username: zod_1.z.string(),
    password: zod_1.z.string().max(20),
    fullName: userNameSchema,
    age: zod_1.z.number(),
    email: zod_1.z.string().email(),
    hobbies: zod_1.z.array(zod_1.z.string()),
    isActive: zod_1.z.boolean(),
    address: userAddressSchema,
    orders: userOrderSchema.array().optional()
});
exports.default = exports.userValidationSchema;
