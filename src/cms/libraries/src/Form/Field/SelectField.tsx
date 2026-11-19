import type { ComponentProps } from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldContent, FieldError, FieldLabel } from '@/libraries/shared/shadcn/ui/field';
import type { Select } from '@/libraries/shared/shadcn/ui/select';
import { useJFormContext } from '@/libraries/src/Form/Form';
import type { SelectFieldProps } from '@/libraries/src/Form/FormField.types';
import HTMLHelper from '@/libraries/src/HTML/HTMLHelper';
import { useTranslations } from '@/libraries/src/Language';

const SelectField = (props: SelectFieldProps) => {
    const { name, label, items, className, labelClassName, onChange } = props;

    const { control } = useFormContext();
    const t = useTranslations();

    const { getFieldError } = useJFormContext();
    const errorMsg = getFieldError(name);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => {
                const handleChange: ComponentProps<typeof Select>['onValueChange'] = val => {
                    field.onChange(val);
                    onChange?.(val);
                };

                return (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldContent>
                            {!!label && (
                                <FieldLabel htmlFor={name} className={labelClassName}>
                                    {t(label)}
                                </FieldLabel>
                            )}
                            {!!errorMsg && <FieldError>{t(errorMsg)}</FieldError>}
                        </FieldContent>

                        <HTMLHelper.Select
                            name={name}
                            value={field.value}
                            invalid={fieldState.invalid}
                            items={items}
                            onChange={handleChange}
                            className={className}
                        />
                    </Field>
                );
            }}
        />
    );
};

export default SelectField;
