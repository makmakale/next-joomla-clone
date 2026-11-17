'use client';

import { useCallback, useLayoutEffect } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useApplication } from '@/libraries/src/Application';
import { loadLangMessages } from '@/libraries/src/Language';
import { getLanguageMetadata } from '@/libraries/src/Language';
import { getLocale, setLocale as setLocaleAsync } from '@/libraries/src/Language';

export const useCtxValue = () => {
    const { name: clientName } = useApplication();
    const queryClient = useQueryClient();

    const { isFetching: localeLoading, data: locale } = useQuery({
        queryKey: ['GET_LANGUAGE', clientName],
        queryFn: () => getLocale(clientName),
    });

    const { isFetching: joomlaMessagesLoading, data: joomlaMessages } = useQuery({
        queryKey: ['GET_TRANSLATIONS', clientName, locale],
        queryFn: () => loadLangMessages('joomla', clientName, locale),
        enabled: !!locale,
    });

    const { mutate } = useMutation({
        mutationFn: (lang: string) => setLocaleAsync(clientName, lang),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['GET_LANGUAGE'] });
            queryClient.invalidateQueries({ queryKey: ['GET_TRANSLATIONS'] });
            queryClient.invalidateQueries({ queryKey: ['GET_LANGUAGE_METADATA'] });
        },
    });

    useLayoutEffect(() => {
        if (!locale) return;

        if (!document.documentElement.lang) {
            document.documentElement.lang = locale.toLowerCase();
        }
    }, [locale]);

    const changeLang = useCallback((lang: string) => {
        document.documentElement.lang = lang.toLowerCase();
        mutate(lang);
    }, []);

    const { isFetching: metaDataLoading, data: languageMeta } = useQuery({
        queryKey: ['GET_LANGUAGE_METADATA', locale],
        queryFn: () => getLanguageMetadata(clientName, locale!),
        enabled: !!locale,
    });

    const isLoading = [localeLoading, joomlaMessagesLoading, metaDataLoading].some(Boolean);

    return { isLoading, locale, changeLang, messages: { ...joomlaMessages }, languageMeta };
};
