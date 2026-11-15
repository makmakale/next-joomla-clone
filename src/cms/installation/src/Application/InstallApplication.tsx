'use client';

import type { PropsWithChildren } from 'react';
import { useLayoutEffect } from 'react';

import { Application } from '@/libraries/src/Application';
import { useAppInput } from '@/libraries/src/Application';
import { ThemeProvider } from '@/libraries/vendor/wrappers';

export function InstallApplication({ children }: PropsWithChildren) {
    const input = useAppInput();

    useLayoutEffect(() => {
        document.cookie = `web.locale.installation=${navigator.language}; path=/; max-age=3600`;
        document.documentElement.lang = navigator.language.toLowerCase();
        document.body.classList.add('install');
    }, [input]);

    return (
        <Application clientId={2} name="installation">
            <ThemeProvider storageKey="web.theme.installation" defaultTheme="light">
                {children}
            </ThemeProvider>
        </Application>
    );
}
