'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ThemeProvider from '@/libraries/src/Styles/ThemeProvider';
import AlertProvider from '@/libraries/src/Alert/Alert';

import '@/libraries/shared/shadcn/globals.css';
import type { PropsWithChildren } from 'react';

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
