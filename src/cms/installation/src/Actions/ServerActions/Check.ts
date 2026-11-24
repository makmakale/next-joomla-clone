'use server';

import { db, updatesTable } from '@/libraries/services/database';

export async function getUpdates() {
    return db.select().from(updatesTable);
}
