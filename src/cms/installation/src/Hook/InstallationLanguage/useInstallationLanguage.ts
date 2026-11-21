'use client';

import type { UpdateLanguageType } from '@/cms/installation';
import { install } from '@/cms/installation';
import { getItems } from '@/cms/installation';

import { useMutation, useQuery } from '@tanstack/react-query';

export const useInstallationLanguage = () => {
    const { data: additionalLanguages = [] } = useQuery({
        queryKey: ['additional_langs'],
        queryFn: getItems,
    });

    const { isPending, mutate } = useMutation({
        mutationFn: (ids: number[]) => install(ids),
    });

    return {
        items: additionalLanguages as UpdateLanguageType[],
        installLanguages: mutate,
    };
};
