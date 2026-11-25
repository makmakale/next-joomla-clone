'use server';

import {
    assetsTable,
    cmsConfigTable,
    db,
    extensionsTable,
    languagesTable,
    menuTable,
    menuTypesTable,
    modulesMenuTable,
    modulesTable,
    tagsTable,
    templateStyles,
    tufMetadataTable,
    updateSitesExtensionsTable,
    updateSitesTable,
    updatesTable,
    userGroupsTable,
    viewLevelsTable,
    workflowStagesTable,
    workflowTransitionsTable,
    workflowsTable,
} from '@/libraries/services/database';

export const clearInstallationData = async () => {
    try {
        await db.delete(updatesTable);
        await db.delete(cmsConfigTable);
        await db.delete(assetsTable);
        await db.delete(extensionsTable);
        await db.delete(languagesTable);
        await db.delete(menuTable);
        await db.delete(menuTypesTable);
        await db.delete(modulesTable);
        await db.delete(modulesMenuTable);
        await db.delete(tagsTable);
        await db.delete(templateStyles);
        await db.delete(tufMetadataTable);
        await db.delete(updateSitesTable);
        await db.delete(updateSitesExtensionsTable);
        await db.delete(userGroupsTable);
        await db.delete(viewLevelsTable);
        await db.delete(workflowsTable);
        await db.delete(workflowStagesTable);
        await db.delete(workflowTransitionsTable);

        return { success: true };
    } catch (error) {
        return { success: false, message: error instanceof Error ? error.message : String(error) };
    }
};
