'use client';

import type { PropsWithChildren } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
    if (typeof window === 'undefined') return new QueryClient();
    browserQueryClient ??= new QueryClient();

    return browserQueryClient;
}

export const TanstackQuery = ({ children }: PropsWithChildren) => {
    return <QueryClientProvider client={getQueryClient()}>{children}</QueryClientProvider>;
};
