'use client';

import { useCMSApplication } from '@/libraries/src/Application/CMSApplication';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ComponentProps } from 'react';

const ThemeProvider = (props: ComponentProps<typeof NextThemesProvider>) => {
    const { name } = useCMSApplication();

    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            storageKey={`joomla.${name}.theme`}
            enableSystem
            disableTransitionOnChange
            {...props}
        />
    );
};

export default ThemeProvider;
