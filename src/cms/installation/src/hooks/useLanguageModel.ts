'use client';

import { useEffect, useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useForm, useWatch } from 'react-hook-form';

import type { LanguageSchema } from '@/cms/installation/forms';
import { langSchema } from '@/cms/installation/forms';
import {
    getInstalledLangsAdministrator,
    getInstalledLangsFrontend,
} from '@/cms/installation/src/controller/LanguageController';

import { useLanguageContext } from '@/libraries/src/Language';

export const useLanguageModel = () => {
    const { locale, changeLang } = useLanguageContext();
    const [open, setOpen] = useState(false);

    const languageForm = useForm<LanguageSchema>({
        defaultValues: {
            language: locale,
        },
        resolver: zodResolver(langSchema),
    });

    const langWatch = useWatch({ control: languageForm.control, name: 'language' });
    const langWatchRef = useRef(locale);

    useEffect(() => {
        if (langWatch !== langWatchRef.current) {
            changeLang(langWatch);
            langWatchRef.current = langWatch;
            setOpen(false);
        }
    }, [langWatch]);

    const { data: adminLanguages } = useQuery({
        queryKey: ['GET_INSTALLED_LANGUAGES_ADMINISTRATOR'],
        queryFn: () => getInstalledLangsAdministrator(),
    });

    const { data: siteLanguages } = useQuery({
        queryKey: ['GET_INSTALLED_LANGUAGES_SITE'],
        queryFn: () => getInstalledLangsFrontend(),
    });

    return {
        languageForm,
        open,
        setOpen,
        installedLanguages: {
            administrator: adminLanguages,
            frontend: siteLanguages,
        },
    };
};
