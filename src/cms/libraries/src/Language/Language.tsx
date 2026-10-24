'use client';

import { loadLanguageFile } from '@/libraries/src/Language/Language.actionsServer';
import { useApplication } from '@/libraries/src/Application/Application';
import type { LocaleParams } from './Language.types';
import { replaceParams } from './Language.utils';
import { useEffect, useState } from 'react';
import get from 'lodash/get';

export const useLanguage = () => {
    const { clientId, locale } = useApplication();
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
