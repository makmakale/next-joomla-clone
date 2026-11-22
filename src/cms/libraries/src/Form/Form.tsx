'use client';

import { useId } from 'react';
import { useCallback } from 'react';
import type { ComponentProps, PropsWithChildren } from 'react';
import { createContext, use } from 'react';

import { cn } from 'cn';
import { FormProvider, useFormState } from 'react-hook-form';
import type { FieldValues, useForm } from 'react-hook-form';

import { useApplication } from '@/libraries/src/Application';

import { useQuery } from '@tanstack/react-query';

const useCtxValue = () => {
    const { errors } = useFormState();
    const formId = useId();
    const { name, getInput } = useApplication();
    const input = getInput();

    const { isFetching, data: fields = [] } = useQuery<{ name: string }[]>({
        queryKey: ['GET_FORM_FIELDS', formId],
        queryFn: () => loadFormFields(name, input),
    });

    const getFieldConfig = useCallback(
        (fieldName: string) => {
            return fields.find(f => f.name === fieldName);
        },
        [fields],
    );

    const getFieldError = useCallback(
        (fieldName: string) => {
            return errors[fieldName]?.message ? String(errors[fieldName]?.message) : '';
        },
        [errors],
    );

    return { loading: isFetching, getFieldConfig, getFieldError };
};

const JFormContext = createContext<ReturnType<typeof useCtxValue> | null>(null);

export const useJFormContext = () => {
    const context = use(JFormContext);
    if (!context) throw new Error('useJForm should be used within <JFormProvider>');

    return context;
};

function JFormProvider({ children }: PropsWithChildren) {
    const value = useCtxValue();

    if (value.loading) return null;

    return <JFormContext.Provider value={value}>{children}</JFormContext.Provider>;
}

interface JFormProps<TFieldValues extends FieldValues = FieldValues> extends ComponentProps<'form'> {
    form: ReturnType<typeof useForm<TFieldValues>>;
}

const JForm = <TFieldValues extends FieldValues = FieldValues>({
    id,
    form,
    className,
    ...formProps
}: JFormProps<TFieldValues>) => {
    return (
        <FormProvider {...form}>
            <JFormProvider>
                <form id={id ?? 'adminForm'} {...formProps} className={cn('space-y-6', className)} />
            </JFormProvider>
        </FormProvider>
    );
};

async function loadFormFields(clientName: string, input: Map<string, string>, externalName?: string) {
    const option = input.get('option');
    const view = externalName ?? input.get('view');

    const paths = {
        site: `@/cms/${option}/forms/${view}`,
        administrator: `@/cms/administrator/${option}/forms/${view}`,
        installation: `@/cms/installation/forms/${view}`,
    } as const;

    try {
        const res = await import(paths[clientName as keyof typeof paths]);

        return res?.default;
    } catch {
        return [];
    }
}

export default JForm;
