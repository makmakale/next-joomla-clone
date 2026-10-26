'use client';

import { useCallback } from 'react';

import { useQuery } from '@tanstack/react-query';

import { useApplication } from '@/libraries/src/Application/Application';
import { useLanguage } from '@/libraries/src/Language/Language';
import { createLanguageList } from '@/libraries/src/Language/Language.actionsServer';

export const useLoginHelper = () => {
    const { clientId } = useApplication();
    const { t } = useLanguage();

    const { data: langs = [] } = useQuery({
        queryKey: ['createLanguageList'],
        queryFn: () => createLanguageList(clientId, false, true),
    });

    const getLanguages = useCallback(
        () => (langs?.length <= 1 ? [] : [{ value: '', label: t('JDEFAULTLANGUAGE') }, ...langs]),
        [langs],
    );

    const getReturnUriString = useCallback(() => {
        const url = new URL(window.location.href);

        return btoa(`${url.pathname.replace('/index', '')}/index${url.search}`);
    }, []);

    return {
        getLanguages,
        getReturnUriString,
    };
};
