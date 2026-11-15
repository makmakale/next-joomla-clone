'use client';

import type { PropsWithChildren } from 'react';
import { useLayoutEffect } from 'react';

import { Application } from '@/libraries/src/Application';
import { useAppInput } from '@/libraries/src/Application';
import { ThemeProvider } from '@/libraries/vendor/wrappers';

export function AdministratorApplication({ children }: PropsWithChildren) {
    const input = useAppInput();

    useLayoutEffect(() => {
        document.cookie = `web.locale.administrator=${navigator.language}; path=/; max-age=31560000`;
        document.documentElement.lang = navigator.language.toLowerCase();
        document.body.classList.add('admin');

        if (!input.queryData.option) {
            input.set('option', 'com_cpanel');
        }

        if (!input.queryData.view) {
            input.set('view', 'cpanel');
        }
    }, [input]);

    return (
        <Application clientId={1} name="administrator">
            <ThemeProvider storageKey="web.theme.administrator" defaultTheme="dark">
                {children}
            </ThemeProvider>
        </Application>
    );
}
