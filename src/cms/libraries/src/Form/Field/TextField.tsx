import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldContent, FieldError, FieldLabel } from '@/libraries/shared/shadcn/ui/field';
import { Input } from '@/libraries/shared/shadcn/ui/input';
import { useJFormContext } from '@/libraries/src/Form/Form';
import type { TextFieldProps } from '@/libraries/src/Form/FormField.types';
import { useLanguage } from '@/libraries/src/Language/Language';

const TextField = ({ name, label, className, required, ...props }: TextFieldProps) => {
    const { control } = useFormContext();
    const { t } = useLanguage();

    const { getFieldError } = useJFormContext();
    const errorMsg = getFieldError(name);

    return (
        <Controller
            name={name}
            control={control}
            rules={{
                required,
            }}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldContent>
                        {!!label && <FieldLabel htmlFor={name}>{t(label)}</FieldLabel>}
                        {!!errorMsg && <FieldError>{t(errorMsg)}</FieldError>}
                    </FieldContent>
                    <Input {...field} id={name} {...props} aria-invalid={fieldState.invalid} className={className} />
                </Field>
            )}
        />
    );
};

export default TextField;
