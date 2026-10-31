'use server';

const loaders = {
    0: (locale: string, langPath: string) => import(`@/cms/language/${locale}/${langPath}.json`),
    1: (locale: string, langPath: string) => import(`@/cms/administrator/language/${locale}/${langPath}.json`),
    2: (locale: string, langPath: string) => import(`@/cms/installation/language/${locale}/${langPath}.json`),
} as const;

export const loadLanguageFile = async (clientId: number, locale: string, langPath: string) => {
    try {
        const loader = loaders[clientId as keyof typeof loaders];
        if (!loader) return undefined;
        const res = await loader(locale, langPath);

        return res?.default;
    } catch {
        return undefined;
    }
};
