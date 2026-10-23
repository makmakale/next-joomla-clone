'use client';

import { useApplication } from '@/libraries/src/Application/Application';
import { loadLanguageFile } from '@/libraries/src/Language/Language.actionsServer';
import get from 'lodash/get';
import type { PropsWithChildren } from 'react';
import { createContext, use, useEffect, useState } from 'react';
import type { LanguageProps, LocaleParams } from './Language.types';
import { replaceParams } from './Language.utils';

const useContextValue = ({ locale }: LanguageProps) => {
    const { clientId } = useApplication();
    const [messages, setMessages] = useState({});

    useEffect(() => {
        const loadMessages = async () => {
            try {
                const joomla =
                    clientId === 1
                        ? (await import(`@/cms/administrator/language/${locale}/joomla.json`))?.default
                        : (await import(`@/cms/language/${locale}/joomla.json`))?.default;

                if (joomla) {
                    setMessages(joomla);
                }
            } catch (e) {
                console.error(e);
            }
        };

        loadMessages();
    }, [clientId, locale]);

    function t(text: string, params?: LocaleParams) {
        const translatedStr = get(messages, text, text);

        return replaceParams(translatedStr, params);
    }

    async function load(langPath: string | string[]) {
        const pathArr = Array.isArray(langPath) ? langPath : [langPath];

        for (const _langPath of pathArr) {
            const res = await loadLanguageFile(clientId, locale, _langPath);
            setMessages(prev => ({ ...prev, ...res }));
        }
    }

    return { locale, t, load };
};

const LanguageContext = createContext<ReturnType<typeof useContextValue> | null>(null);

export const useLanguage = () => {
    const context = use(LanguageContext);
    if (!context) throw new Error('useLanguage should be used within <LanguageProvider>');

    return context;
};

export default function LanguageProvider({ children, ...props }: PropsWithChildren<LanguageProps>) {
    const value = useContextValue(props);

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
