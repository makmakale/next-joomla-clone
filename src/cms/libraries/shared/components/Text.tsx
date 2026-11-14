'use client';

import { useTranslations } from '@/libraries/src/Language';

interface JTextProps {
    text: string;
    params?: Record<string, unknown>;
    fallback?: string;
}

const JText = ({ text, params, fallback }: JTextProps) => {
    const t = useTranslations();

    return t(text, params, fallback);
};

export default JText;
