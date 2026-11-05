'use client';

import type { ComponentProps } from 'react';
import { useCallback } from 'react';
import type { PropsWithChildren } from 'react';
import { createContext, use } from 'react';

import { cn } from 'cn';
import { useFormState } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';
import type { FieldValues, useForm } from 'react-hook-form';

interface JFormCtxProps {
    fields: { type: string; name?: string; label?: string }[];
}

const useCtxValue = ({ fields }: JFormCtxProps) => {
    const { errors } = useFormState();

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

    return { getFieldConfig, getFieldError };
};

const JFormContext = createContext<ReturnType<typeof useCtxValue> | null>(null);

export const useJFormContext = () => {
    const context = use(JFormContext);
    if (!context) throw new Error('useJForm should be used within <JFormProvider>');

    return context;
};

function JFormProvider({ children, ...props }: PropsWithChildren<JFormCtxProps>) {
    const value = useCtxValue(props);

    return <JFormContext.Provider value={value}>{children}</JFormContext.Provider>;
}

interface JFormProps<TFieldValues extends FieldValues = FieldValues> extends ComponentProps<'form'> {
    form: ReturnType<typeof useForm<TFieldValues>>;
    fields: JFormCtxProps['fields'];
}

const JForm = <TFieldValues extends FieldValues = FieldValues>({
    form,
    fields,
    className,
    ...formProps
}: JFormProps<TFieldValues>) => {
    return (
        <FormProvider {...form}>
            <JFormProvider fields={fields}>
                <form id="adminForm" {...formProps} className={cn('space-y-6', className)} />
            </JFormProvider>
        </FormProvider>
    );
};

export default JForm;
