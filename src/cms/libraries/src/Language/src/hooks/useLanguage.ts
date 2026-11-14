'use client';

import { use } from 'react';

import { LanguageContext } from '@/libraries/src/Language';

export const useLanguage = () => {
    const context = use(LanguageContext);
    if (!context) throw new Error('useLanguage should be used within <LanguageProvider>');

    return context;
};
