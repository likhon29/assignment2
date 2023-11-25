import { z } from 'zod';


const userNameSchema = z.object({
    firstName: z
        .string()
        .min(1)
        .max(20)
        .refine((value) => /^[A-Z]/.test(value), {
            message: 'First Name must start with a capital letter',
        }),
    lastName: z.string(),
});

const userAddressSchema = z.object({
    street: z.string(),
    city: z.string(),
    country: z.string()
})

const userOrderSchema = z.object({
    productName: z.string(),
    price: z.number().min(1),
    quantity: z.number().min(1)
})
export const userValidationSchema = z.object({
    userId: z.number(),
    username: z.string(),
    password: z.string().max(20),
    fullName: userNameSchema,
    age: z.number(),
    email: z.string().email(),

    hobbies: z.array(z.string()),
    isActive: z.boolean(),
    address: userAddressSchema,
    orders: z.array(userOrderSchema).optional().default([]),

});

export default userValidationSchema;