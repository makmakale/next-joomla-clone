import orderBy from 'lodash/orderBy';

import meta_enGB from './en-GB/langmetadata.json';
import meta_ruRU from './ru-RU/langmetadata.json';

export const instlLangConfig = {
    'ru-RU': meta_ruRU,
    'en-GB': meta_enGB,
} as const;

export type InstLangTag = keyof typeof instlLangConfig;

const languagesList = Object.keys(instlLangConfig).map(langTag => ({
    value: langTag,
    label: `${instlLangConfig[langTag as InstLangTag].metadata.name} | ${instlLangConfig[langTag as InstLangTag].metadata.nativeName}`,
}));

export const languages = orderBy(languagesList, 'value', 'asc');
