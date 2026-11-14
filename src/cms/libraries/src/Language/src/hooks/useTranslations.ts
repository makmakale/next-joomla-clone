'use client';

import { useMemo } from 'react';

import { createTranslator, useLanguage } from '@/libraries/src/Language';

export function useTranslations() {
    const { messages } = useLanguage();

    return useMemo(() => createTranslator(messages), [messages]);
}
