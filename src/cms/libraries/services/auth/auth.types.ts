import { z } from 'zod';

export const authCredentialsSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(3),
});

export const adminLoginSchema = z.object({
    ...authCredentialsSchema.shape,
    language: z.string().optional(),
    option: z.string(),
    task: z.string(),
    returnUrl: z.string().optional(),
});

export type AuthCredentialsSchema = z.infer<typeof authCredentialsSchema>;
export type AdminLoginSchema = z.infer<typeof adminLoginSchema>;
