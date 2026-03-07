import {z} from "zod";

export const createProductSchema = z.object({
    name: z.string().min(2),
    description:z.string().min(5),
    price:z.number().min(0),
    stock:z.number().min(0),
    category:z.string().optional(),

});