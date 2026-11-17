'use client';

import { useCallback, useLayoutEffect } from 'react';

import { useApplication } from '@/libraries/src/Application';
import type { LanguageProps } from '@/libraries/src/Language';
import { setLocaleAsync } from '@/libraries/src/Language';

export const useCtxValue = ({ locale, messages, metadata }: LanguageProps) => {
    const { name } = useApplication();

    useLayoutEffect(() => {
        if (!locale) return;

        if (!document.documentElement.lang) {
            document.documentElement.lang = locale.toLowerCase();
        }
    }, [locale]);

    const changeLang = useCallback(
        (lang: string) => {
            document.documentElement.lang = lang.toLowerCase();
            setLocaleAsync(name, lang);
        },
        [name],
    );

    return { locale, changeLang, messages, metadata };
};
