'use client';

import type { ComponentProps } from 'react';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

import { useApplication } from '@/libraries/src/Application/Application';

const ThemeProvider = (props: ComponentProps<typeof NextThemesProvider>) => {
    const { name } = useApplication();

    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme={name === 'administrator' ? 'dark' : 'light'}
            storageKey={`joomla.${name}.theme`}
            enableSystem
            disableTransitionOnChange
            {...props}
        />
    );
};

export default ThemeProvider;
