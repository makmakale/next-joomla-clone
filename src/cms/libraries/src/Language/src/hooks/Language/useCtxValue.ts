'use client';

import { useCallback, useLayoutEffect, useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';

import { useApplication } from '@/libraries/src/Application';
import type { InstallProps, Messages } from '@/libraries/src/Language';
import { loadLangMessages } from '@/libraries/src/Language';
import { getLanguageMetadata } from '@/libraries/src/Language';
import { getLocale, setLocale as setLocaleAsync } from '@/libraries/src/Language';

export const useCtxValue = ({ initialMessages = {} }: InstallProps) => {
    const { name: clientName } = useApplication();
    const [messages, setMessages] = useState<Messages>({});

    const { data: locale } = useQuery({
        queryKey: ['GET_LANGUAGE', clientName],
        queryFn: () => getLocale(clientName),
    });

    const { data: joomlaMessages } = useQuery({
        queryKey: ['GET_TRANSLATIONS', clientName, locale],
        queryFn: () => loadLangMessages('joomla', clientName),
        enabled: !!locale,
    });

    const { mutate } = useMutation({
        mutationFn: (lang: string) => setLocaleAsync(clientName, lang),
    });

    useLayoutEffect(() => {
        if (!locale) return;

        if (!document.documentElement.lang) {
            mutate(locale);
            document.documentElement.lang = locale.toLowerCase();
        }
    }, [clientName, locale]);

    const changeLang = useCallback(
        (lang: string) => {
            mutate(lang);
            document.documentElement.lang = lang.toLowerCase();
        },
        [mutate],
    );

    const mergeMessages = useCallback((newMessages: Messages) => {
        setMessages(prev => ({ ...prev, ...newMessages }));
    }, []);

    const { data: languageMeta } = useQuery({
        queryKey: ['metadata'],
        queryFn: () => getLanguageMetadata(clientName, locale!),
        enabled: !!locale,
    });

    return { locale, changeLang, messages: { ...joomlaMessages }, mergeMessages, languageMeta };
};
