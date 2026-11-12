'use client';

import type { ComponentProps } from 'react';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

import { useApplication } from '@/libraries/src/Application/Application';

type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>;

export const ThemeProvider = (props: ThemeProviderProps) => {
    const { name } = useApplication();

    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme={name === 'administrator' ? 'dark' : 'light'}
            storageKey={`web.theme.${name}`}
            enableSystem
            disableTransitionOnChange
            {...props}
        />
    );
};
