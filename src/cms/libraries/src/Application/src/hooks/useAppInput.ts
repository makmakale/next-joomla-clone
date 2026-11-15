'use client';

import { useState } from 'react';

import { useSearchParams } from 'next/navigation';

type AppInputType = {
    option?: string;
    view?: string;
    task?: string;
    layout?: string;
};

export const useAppInput = () => {
    const searchParams = useSearchParams();
    const [queryData, setQueryData] = useState<AppInputType>(Object.fromEntries(searchParams.entries()));

    const set = (key: string, val: unknown) => {
        setQueryData(prev => ({ ...prev, [key]: val }));
    };

    return { queryData, set };
};
