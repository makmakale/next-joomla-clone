'use server';

import { cookies } from 'next/headers';

import * as p from 'drizzle-orm';

import { db, extensionsTable } from '@/libraries/services/database';

// export const getItems = async () => {
//     let list = [];
//
//     const [extId] = await db
//         .select({ extensionId: extensionsTable.extensionId })
//         .from(extensionsTable)
//         .where(
//             p.and(
//                 p.eq(extensionsTable.type, 'package'),
//                 p.eq(extensionsTable.element, 'pkg_en-GB'),
//                 p.eq(extensionsTable.clientId, 0),
//             ),
//         );
//
//     if (extId?.extensionId) {
//         list = await db
//             .select({
//                 updateId: updatesTable.updateId,
//                 name: updatesTable.name,
//                 element: updatesTable.element,
//                 version: updatesTable.version,
//             })
//             .from(updatesTable)
//             /*
//              * The following function call uses the extension_id of the en-GB package.
//              * In #__update_sites_extensions you should have this extension_id linked
//              * to the Accredited Translations Repo.
//              */
//             .where(p.eq(updatesTable.extensionId, extId.extensionId))
//             .orderBy(updatesTable.name);
//     }
//
//     return list;
// };

export const getLanguageList = async (clientId = 1) => {
    return db
        .select({ element: extensionsTable.element, name: extensionsTable.name })
        .from(extensionsTable)
        .where(
            p.and(
                p.eq(extensionsTable.type, 'language'),
                p.eq(extensionsTable.state, 0),
                p.eq(extensionsTable.enabled, true),
                p.eq(extensionsTable.clientId, clientId),
            ),
        );
};

export async function getInstalledLangsAdministrator() {
    return getInstalledLangs('administrator');
}

export async function getInstalledLangsFrontend() {
    return getInstalledLangs('site');
}

export async function getInstalledLangs(clientName = 'administrator') {
    const clientId = clientName === 'administrator' ? 1 : 0;
    const langlist = await getLanguageList(clientId);
    const clientLang = await getClientLocale(clientName);

    const data = [];

    for (const lang of langlist) {
        const file = `@/cms/installation/language/${lang.element}/langmetadata.json`;
        try {
            const json = (await import(file))?.default ?? {};
            const { metadata = {} } = json;

            data.push({ language: lang.element, ...metadata, published: clientLang === lang.element });
        } catch (e) {
            console.error(e);
        }
    }

    return data;
}

async function getClientLocale(clientName: string) {
    const cookie = (await cookies()).get(`joomla.${clientName}.locale`);

    return cookie?.value ?? 'en-GB';
}
