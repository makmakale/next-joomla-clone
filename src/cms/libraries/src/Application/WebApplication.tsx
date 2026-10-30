'use client';

import type { PropsWithChildren } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@/libraries/shared/shadcn/globals.css';
import AlertProvider from '@/libraries/src/Alert/Alert';
import ThemeProvider from '@/libraries/src/Styles/ThemeProvider';

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
    if (typeof window === 'undefined') return new QueryClient();
    browserQueryClient ??= new QueryClient();

    return browserQueryClient;
}

const WebApplication = ({ children }: PropsWithChildren) => {
    return (
        <ThemeProvider>
            <QueryClientProvider client={getQueryClient()}>
                <AlertProvider>{children}</AlertProvider>
            </QueryClientProvider>
        </ThemeProvider>
    );
};

export default WebApplication;
