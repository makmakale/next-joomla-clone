import { DrizzleQueryError } from 'drizzle-orm';

export const dbErrorHandler = (err: unknown) => {
    if (err instanceof DrizzleQueryError) {
        const pgError = err.cause as { code?: string; message?: string };

        if (pgError?.code === '42P01') {
            throw new Error(`42P01: ${err.cause}`);
        }
    }

    throw err;
};
