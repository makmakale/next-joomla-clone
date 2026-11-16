'use client';

import { useMemo } from 'react';

import { createTranslator, useLanguageContext } from '@/libraries/src/Language';

export function useTranslations() {
    const { messages } = useLanguageContext();

    return useMemo(() => createTranslator(messages), [messages]);
}
