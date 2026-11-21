'use server';

import { genSalt, hash } from 'bcrypt-ts';

import type { SetupSchema } from '@/cms/installation/forms';

import { db, usersTable } from '@/libraries/services/database';

import isEmpty from 'lodash/isEmpty';

export const setSuperAdminUser = async (data?: SetupSchema) => {
    if (isEmpty(data)) return { success: false, message: 'No data to install' };

    try {
        const salt = await genSalt(10);
        const hashPassword = await hash(data.admin_password, salt);

        await db
            .insert(usersTable)
            .values({
                name: data.admin_user,
                username: data.admin_username,
                email: data.admin_email,
                password: hashPassword,
                registerDate: new Date(),
            })
            .onConflictDoNothing();

        return { success: true };
    } catch (error) {
        return { success: false, message: error instanceof Error ? error.message : String(error) };
    }
};
