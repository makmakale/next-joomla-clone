'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ComponentProps } from 'react';

const ThemeProvider = ({ name, ...props }: ComponentProps<typeof NextThemesProvider> & { name: string }) => {
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
