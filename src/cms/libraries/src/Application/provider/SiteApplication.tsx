'use client';

import type { PropsWithChildren } from 'react';
import { useLayoutEffect } from 'react';

import { Application } from '@/libraries/src/Application';
import { useAppInput } from '@/libraries/src/Application';
import { ThemeProvider } from '@/libraries/vendor/wrappers';

export function SiteApplication({ children }: PropsWithChildren) {
    const input = useAppInput();

    useLayoutEffect(() => {
        document.cookie = `web.locale.site=${navigator.language}; path=/; max-age=31560000`;
        document.documentElement.lang = navigator.language.toLowerCase();
        document.body.classList.add('site');

        if (!input.queryData.option) {
            input.set('option', 'com_content');
        }

        if (!input.queryData.view) {
            input.set('view', 'articles');
        }
    }, [input]);

    return (
        <Application clientId={0} name="site">
            <ThemeProvider storageKey="web.theme.site" defaultTheme="light">
                {children}
            </ThemeProvider>
        </Application>
    );
}
