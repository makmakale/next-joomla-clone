'use client';

import type { ComponentProps, ComponentType } from 'react';
import { useMemo } from 'react';

import type { Controller } from 'react-hook-form';

import PasswordField from '@/libraries/src/Form/Field/PasswordField';
import SelectField from '@/libraries/src/Form/Field/SelectField';
import TextField from '@/libraries/src/Form/Field/TextField';
import { useJFormContext } from '@/libraries/src/Form/Form';

type ControllerProps = ComponentProps<typeof Controller>;

interface FormFieldProps {
    name: ControllerProps['name'];
    params?: object;
}

const fields = {
    text: TextField,
    password: PasswordField,
    email: TextField,
    select: SelectField,
} as const;
type FormFieldTypes = keyof typeof fields;
type RenderComponentPropsType = ComponentProps<(typeof fields)[FormFieldTypes]>;
type RenderComponentType = ComponentType<RenderComponentPropsType>;

const FormField = ({ name, params }: FormFieldProps) => {
    const { getFieldConfig } = useJFormContext();

    const fieldConfig = useMemo(() => getFieldConfig(name), [name]) as RenderComponentPropsType;

    if (!fieldConfig) {
        return `Config for ${name} not found `;
    }

    const RenderField = fields[fieldConfig.type as FormFieldTypes] as RenderComponentType;

    if (!RenderField) {
        return `Component for ${fieldConfig.type} not found `;
    }

    return <RenderField {...fieldConfig} {...params} />;
};

export default FormField;
