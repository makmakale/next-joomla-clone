'use server';

import { db, workflowsTable } from '@/libraries/services/database';

import { resetSerial } from '../../resetSerial';

export const seedWorkflows = async () => {
    try {
        const now = new Date();

        await db.insert(workflowsTable).values({
            id: 1,
            assetId: 56,
            published: 1,
            title: 'COM_WORKFLOW_BASIC_WORKFLOW',
            description: '',
            extension: 'com_content.article',
            default: true,
            ordering: 1,
            created: now,
            createdBy: 42,
            modified: now,
            modifiedBy: 42,
        });
        await resetSerial('workflows', 'id');

        return { success: true };
    } catch (error) {
        return { success: false, message: error instanceof Error ? error.message : String(error) };
    }
};
