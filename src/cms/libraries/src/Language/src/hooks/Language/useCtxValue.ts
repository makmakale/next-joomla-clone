'use client';

import { useLayoutEffect } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';

import { useApplication } from '@/libraries/src/Application';
import { getLocale, setLocale } from '@/libraries/src/Language/src/Actions/ServerAction';

export const useLanguageContextValue = () => {
    const { name: clientName } = useApplication();

    const { data: locale } = useQuery({
        queryKey: ['GET_LANGUAGE', clientName],
        queryFn: () => getLocale(clientName),
    });

    const { mutate } = useMutation({
        mutationFn: (lang: string) => setLocale(clientName, lang),
    });

    useLayoutEffect(() => {
        if (!locale) return;

        if (!document.documentElement.lang) {
            document.documentElement.lang = locale.toLowerCase();
            document.cookie = `web.locale.${clientName}=${locale}; path=/; max-age=31560000`;
        }
    }, [clientName, locale]);

    const changeLang = (lang: string) => {
        mutate(lang);
        document.documentElement.lang = lang.toLowerCase();
    };

    return { locale, changeLang };
};
