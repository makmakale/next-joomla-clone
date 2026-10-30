import type { Extension } from '@/libraries/services/database';

export interface LanguageProps {
    locale: string;
}

export type LocaleParams = Record<string, string | number>;

export type InstalledLanguage = {
    element: Extension['element'];
    name: Extension['name'];
    clientId: Extension['clientId'];
    extensionId: Extension['extensionId'];
};

export type LanguageMetadata = {
    tag: string;
    name: string;
    nativeName?: string;
};
export type InstalledLanguageWithMetadata = InstalledLanguage & {
    metadata: LanguageMetadata;
};
