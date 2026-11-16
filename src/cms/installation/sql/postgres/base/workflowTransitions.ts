'use server';

import { db, workflowTransitionsTable } from '@/libraries/services/database';

import { resetSerial } from '../../resetSerial';

export const seedWorkflowTransitions = async () => {
    const WORKFLOW_TRANSITIONS = [
        {
            id: 1,
            assetId: 58,
            published: 1,
            ordering: 1,
            workflowId: 1,
            title: 'UNPUBLISH',
            description: '',
            fromStageId: -1,
            toStageId: 1,
            options: { publishing: '0' },
        },
        {
            id: 2,
            assetId: 59,
            published: 1,
            ordering: 2,
            workflowId: 1,
            title: 'PUBLISH',
            description: '',
            fromStageId: -1,
            toStageId: 1,
            options: { publishing: '1' },
        },
        {
            id: 3,
            assetId: 60,
            published: 1,
            ordering: 3,
            workflowId: 1,
            title: 'TRASH',
            description: '',
            fromStageId: -1,
            toStageId: 1,
            options: { publishing: '-2' },
        },
        {
            id: 4,
            assetId: 61,
            published: 1,
            ordering: 4,
            workflowId: 1,
            title: 'ARCHIVE',
            description: '',
            fromStageId: -1,
            toStageId: 1,
            options: { publishing: '2' },
        },
        {
            id: 5,
            assetId: 62,
            published: 1,
            ordering: 5,
            workflowId: 1,
            title: 'FEATURE',
            description: '',
            fromStageId: -1,
            toStageId: 1,
            options: { featuring: '1' },
        },
        {
            id: 6,
            assetId: 63,
            published: 1,
            ordering: 6,
            workflowId: 1,
            title: 'UNFEATURE',
            description: '',
            fromStageId: -1,
            toStageId: 1,
            options: { featuring: '0' },
        },
        {
            id: 7,
            assetId: 64,
            published: 1,
            ordering: 7,
            workflowId: 1,
            title: 'PUBLISH_AND_FEATURE',
            description: '',
            fromStageId: -1,
            toStageId: 1,
            options: { publishing: '1', featuring: '1' },
        },
    ];

    try {
        await db.insert(workflowTransitionsTable).values(WORKFLOW_TRANSITIONS);
        await resetSerial('workflow_transitions', 'id');

        return { success: true };
    } catch (error) {
        return { success: false, message: error instanceof Error ? error.message : String(error) };
    }
};
