'use server';

import * as p from 'drizzle-orm';
import { promises as fs } from 'node:fs';
import path from 'node:path';

import { getUpdates } from '@/cms/installation';

import { db, extensionsTable, updatesTable } from '@/libraries/services/database';
import { getTranslations } from '@/libraries/src/Language';

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

    const data = [];

    for (const lang of langlist) {
        const file = `@/cms/installation/language/${lang.element}/langmetadata.json`;
        try {
            const info = (await import(file))?.default;

            if (isEmpty(info)) {
                continue;
            }

            data.push({ language: lang.element, name: info.metadata?.name, published: lang.element === 'en-GB' });
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

/**
 * Method that installs in Joomla! the selected languages in the Languages View of the installer.
 *
 * @param  ids  List of the update_id value of the languages to install.
 */
export async function install(ids: number[]) {
    const updates = await getUpdates();
    const t = await getTranslations();

    for (const id of ids) {
        const language = updates.find(upd => upd.updateId === id)!;
        const remoteManifest = language.detailsurl;

        if (!remoteManifest) {
            // TODO: add to list of alerts
            const msg =
                t('INSTL_DEFAULTLANGUAGE_COULD_NOT_INSTALL_LANGUAGE', { name: language.name }) +
                ' ' +
                t('INSTL_DEFAULTLANGUAGE_TRY_LATER');
            throw new Error(msg);
        }

        const packageUrl = await getPackageUrl(remoteManifest);
        if (!packageUrl) {
            // TODO: add to list of alerts
            const msg =
                t('INSTL_DEFAULTLANGUAGE_COULD_NOT_INSTALL_LANGUAGE', { name: language.name }) +
                ' ' +
                t('INSTL_DEFAULTLANGUAGE_TRY_LATER');
            throw new Error(msg);
        }

        // TODO: Download the package to the tmp folder. downloadPackage(packageUrl);
        // TODO: Install the package.
        // detailsurl - e.g. https://update.joomla.org/language/details6/ru-RU_details.xml
        // add language to languagesTable - seedLanguages
        // add language to extensionsTable - uploadLanguages
        // move files from zip to lang folders

        // TODO: Delete the installed language from the list.
        // db.delete(updatesTable).where(eq(updatesTable.updateId, id));
    }
}

// TODO: create downloads server
async function getPackageUrl(remoteManifest: string) {
    const example = {
        updates: {
            update: [
                {
                    name: 'Joomla! 6 - Russian',
                    description: 'This is the Russian Language Pack for Joomla! 6.2.0',
                    element: 'pkg_ru-RU',
                    type: 'package',
                    version: '6.2.0.1',
                    downloads: {
                        downloadurl: {
                            _type: 'full',
                            _format: 'zip',
                            __text: 'https://downloads.joomla.org/language-packs/translations-joomla6/downloads/joomla6-russian/6-2-0-1/ru-ru_joomla_lang_full_6-2-0v1-zip?format=zip',
                        },
                    },
                    sha256: 'aecf3497a19bcd0e71e0d110493f9fedbbb2b6b77d4f40a9d14f274bbc887aeb',
                    sha384: 'b41a83d97cf2e14402637707d794881927a6225eb8c0f713aadc78fbaf28460062dc469966987acd0798a8d635143f62',
                    sha512: 'ce4fc345cc2339ef3fabc890327b97ff7510532f9cc4f1985bbdd5b71f2f540617d0fa656961f78ea8cec41c73b642e2caa8c37b2679a83b8d35a8b8473250ba',
                    targetplatform: {
                        _name: 'joomla',
                        _version: '6.[01234]',
                    },
                },
            ],
        },
    };

    // TODO: fetch language by remoteManifest url
    return example.updates.update[0].downloads.downloadurl.__text;
}
