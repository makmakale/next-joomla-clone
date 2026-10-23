'use client';

import { useApplication } from '@/libraries/src/Application/Application';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ComponentProps } from 'react';

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
