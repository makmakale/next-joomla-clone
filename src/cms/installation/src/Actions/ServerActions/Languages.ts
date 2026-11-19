'use server';

import * as p from 'drizzle-orm';
import { promises as fs } from 'node:fs';
import path from 'node:path';

import { db, extensionsTable, updatesTable } from '@/libraries/services/database';
import { getLocale } from '@/libraries/src/Language';

import isEmpty from 'lodash/isEmpty';

/**
 * Get languages list from language folder.
 *
 * @return  array  The language select options.
 */
export async function getLanguageOptions() {
    const localesDir = path.join(process.cwd(), 'src/cms/installation/language');
    const entries = await fs.readdir(localesDir, { withFileTypes: true });
    const locales = entries.filter(entry => entry.isDirectory()).map(entry => entry.name);

    const list = await Promise.all(
        locales.map(async locale => {
            const filePath = path.join(localesDir, locale, 'langmetadata.json');

            try {
                const fileContent = await fs.readFile(filePath, 'utf-8');
                const data = JSON.parse(fileContent);

                return { value: locale, label: `${data.metadata.name} | ${data.metadata.nativeName}` };
            } catch {
                return null;
            }
        }),
    );

    return list.filter(item => !!item);
}

/**
 * Get installed languages data.
 *
 * @param   clientId  The client ID to retrieve data for.
 *
 * @return  array  The language data.
 */
export async function getLanguageList(clientId = 1) {
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
}

/**
 *
 * Get Languages item data for the Administrator.
 */
export async function getInstalledLangsAdministrator() {
    return getInstalledLangs('administrator');
}

/**
 *
 * Get Languages item data for the Frontend.
 */
export async function getInstalledLangsFrontend() {
    return getInstalledLangs('site');
}

/**
 *
 *  * Get Languages item data.
 *
 @param clientName The client Name to retrieve data for.
 */
export async function getInstalledLangs(clientName = 'administrator') {
    const clientId = clientName === 'administrator' ? 1 : 0;
    const langlist = await getLanguageList(clientId);
    const clientLang = await getLocale(clientName);

    const data = [];

    for (const lang of langlist) {
        const file = `@/cms/installation/language/${lang.element}/langmetadata.json`;
        try {
            const info = (await import(file))?.default;

            if (isEmpty(info)) {
                continue;
            }

            data.push({ language: lang.element, name: info.metadata?.name, published: clientLang === lang.element });
        } catch {}
    }

    return data;
}

/**
 *
 * Generate a list of language choices to install in the Joomla CMS.
 */
export async function getItems() {
    let list: {
        updateId: number;
        name: string | null;
        element: string | null;
        version: string | null;
    }[] = [];

    const [extId] = await db
        .select({ extensionId: extensionsTable.extensionId })
        .from(extensionsTable)
        .where(
            p.and(
                p.eq(extensionsTable.type, 'package'),
                p.eq(extensionsTable.element, 'pkg_en-GB'),
                p.eq(extensionsTable.clientId, 0),
            ),
        );

    if (extId?.extensionId) {
        try {
            list = await db
                .select({
                    updateId: updatesTable.updateId,
                    name: updatesTable.name,
                    element: updatesTable.element,
                    version: updatesTable.version,
                })
                .from(updatesTable)
                .orderBy(updatesTable.name);
        } catch {
            list = [];
        }
    } else {
        list = [];
    }

    return list;
}

/**
 * Set the default language.
 *
 * @param  language    The language to be set as default.
 * @param  clientName  The name of the CMS client.
 */
export async function setDefault(language: string, clientName: string = 'administrator'): Promise<boolean> {
    // TODO
    return true;
}
