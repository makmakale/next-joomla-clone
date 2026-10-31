import { z } from 'zod';

export const langSchema = z.object({
    language: z.string(),
});

export type LanguageSchema = z.infer<typeof langSchema>;

export const setupSchema = z.object({
    site_name: z.string().min(1, 'JLIB_FORM_FIELD_REQUIRED_VALUE').max(30),
    admin_user: z.string().min(1, 'JLIB_FORM_FIELD_REQUIRED_VALUE'),
    admin_username: z.string().min(1, 'JLIB_FORM_FIELD_REQUIRED_VALUE'),
    admin_password: z.string().min(12, 'INSTL_ADMIN_PASSWORD_LENGTH'),
    admin_email: z.email(),
});

export type SetupSchema = z.infer<typeof setupSchema>;

export const formSteps = [
    { fields: ['site_name'] as const, schema: setupSchema.pick({ site_name: true }) },
    {
        fields: ['admin_user', 'admin_username', 'admin_password', 'admin_email'] as const,
        schema: setupSchema.omit({ admin_user: true }),
    },
];
