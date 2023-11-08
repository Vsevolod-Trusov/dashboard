import { z } from 'zod';

export const signUpSchema =  z.object({
    name: z.string(),
    lastname: z.string(),
    password: z.string(),
    companyName: z.string(),
    department: z.string(),
    email: z.string().email(),
    role: z.enum(['manager', 'user']),
    isHeader: z.boolean()
})

export const removeUserSchema = z.object({
    email: z.string().email()
})