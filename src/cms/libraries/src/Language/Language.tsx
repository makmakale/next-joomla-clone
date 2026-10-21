'use client';

import type { PropsWithChildren } from 'react';
import { createContext, use, useEffect, useState } from 'react';
import { useCMSApplication } from '@/libraries/src/Application/CMSApplication';
import get from 'lodash/get';
import { replaceParams } from './Language.utils';
import type { LanguageProps, LocaleParams } from './Language.types';

const useContextValue = ({ locale }: LanguageProps) => {
    const { clientId } = useCMSApplication();
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

    return { locale, t };
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
