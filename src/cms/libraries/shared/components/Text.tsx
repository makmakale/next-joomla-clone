'use client';

import { useLanguage } from '@/libraries/src/Language/Language';
import type { JTextProps } from '@/libraries/src/Language/Language.types';

const JText = ({ text, params }: JTextProps) => {
    const { t } = useLanguage();

    return t(text, params);
};

export default JText;
