'use client';

import { useEffect, useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';

import type { LanguageSchema } from '@/cms/installation/forms';
import { langSchema } from '@/cms/installation/forms';

import { useHTMLDocument } from '@/libraries/src/HTML/HTMLDocument';

export const useLanguageModel = () => {
    const { locale, changeLanguage } = useHTMLDocument();
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
            changeLanguage(langWatch);
            langWatchRef.current = langWatch;
            setOpen(false);
        }
    }, [langWatch]);

    return {
        languageForm,
        open,
        setOpen,
    };
};
