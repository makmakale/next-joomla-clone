import type { ComponentProps } from 'react';

import type { Controller } from 'react-hook-form';

import type { Input } from '@/libraries/shared/shadcn/ui/input';
import type { Select } from '@/libraries/shared/shadcn/ui/select';

type ControllerProps = ComponentProps<typeof Controller>;

interface FormFieldWithName {
    name: ControllerProps['name'];
}
interface FormFieldWithNameAndLabel extends FormFieldWithName {
    label?: string;
}

export type TextFieldProps = FormFieldWithNameAndLabel & ComponentProps<typeof Input>;

export type PasswordFieldProps = FormFieldWithNameAndLabel &
    ComponentProps<typeof Input> & {
        type: 'password';
        description?: string;
    };

export type SelectFieldProps = FormFieldWithNameAndLabel &
    Omit<ComponentProps<typeof Select>, 'onValueChange'> & {
        type: 'select';
        items: Record<'value' | 'label', string>[];
        className?: string;
        labelClassName?: string;
        onChange: ComponentProps<typeof Select>['onValueChange'];
    };
