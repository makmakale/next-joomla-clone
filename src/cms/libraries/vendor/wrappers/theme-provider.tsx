'use client';

import type { ComponentProps } from 'react';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>;

export const ThemeProvider = (props: ThemeProviderProps) => {
    return <NextThemesProvider attribute="class" enableSystem disableTransitionOnChange {...props} />;
};
