'use client';

import { useEffect, useRef, useState } from 'react';

import { useForm, useWatch } from 'react-hook-form';

import type { UpdateLanguageType } from '@/cms/installation';
import { getItems } from '@/cms/installation';
import type { LanguageSchema } from '@/cms/installation/forms';
import { langSchema } from '@/cms/installation/forms';

import { useLanguageContext } from '@/libraries/src/Language';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';

export const useInstallationLanguage = () => {
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

    const { data: additionalLanguages = [] } = useQuery({
        queryKey: ['additional_langs'],
        queryFn: getItems,
    });

    return {
        languageForm,
        open,
        setOpen,
        items: additionalLanguages as UpdateLanguageType[],
    };
};
