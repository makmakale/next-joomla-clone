import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldContent, FieldError, FieldLabel } from '@/libraries/shared/shadcn/ui/field';
import { useJFormContext } from '@/libraries/src/Form/Form';
import type { SelectFieldProps } from '@/libraries/src/Form/FormField.types';
import HTMLHelper from '@/libraries/src/HTML/HTMLHelper';
import { useLanguage } from '@/libraries/src/Language/Language';

const SelectField = (props: SelectFieldProps) => {
    const { name, label, items, className, labelClassName, onChange } = props;

    const { control } = useFormContext();
    const { t } = useLanguage();

    const { getFieldError } = useJFormContext();
    const errorMsg = getFieldError(name);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
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
                        onChange={(val, e) => (onChange ? onChange(val, e) : field.onChange(val))}
                        className={className}
                    />
                </Field>
            )}
        />
    );
};

export default SelectField;
