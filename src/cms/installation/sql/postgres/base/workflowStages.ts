'use server';

import { db, workflowStagesTable } from '@/libraries/services/database';

import { resetSerial } from '../../resetSerial';

export const seedWorkflowStages = async () => {
    try {
        await db.insert(workflowStagesTable).values({
            id: 1,
            assetId: 57,
            ordering: 1,
            workflowId: 1,
            published: 1,
            title: 'COM_WORKFLOW_BASIC_STAGE',
            description: '',
            default: true,
        });
        await resetSerial('workflow_stages', 'id');

        return { success: true };
    } catch (error) {
        return { success: false, message: error instanceof Error ? error.message : String(error) };
    }
};
