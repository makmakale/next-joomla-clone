import { useState } from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import JIcon from '@/libraries/shared/components/Icon';
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from '@/libraries/shared/shadcn/ui/field';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/libraries/shared/shadcn/ui/input-group';
import { useJFormContext } from '@/libraries/src/Form/Form';
import type { PasswordFieldProps } from '@/libraries/src/Form/FormField.types';
import { useLanguage } from '@/libraries/src/Language/Language';

const TextField = ({ name, label, description, className, required, ...props }: PasswordFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);

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
                        {!!description && <FieldDescription>{t(description)}</FieldDescription>}
                        {fieldState.invalid && !!errorMsg && <FieldError>{t(errorMsg)}</FieldError>}
                    </FieldContent>

                    <InputGroup>
                        <InputGroupInput
                            {...field}
                            id={name}
                            {...props}
                            type={showPassword ? 'text' : 'password'}
                            aria-invalid={fieldState.invalid}
                            className={className}
                        />
                        <InputGroupAddon align="inline-end">
                            <InputGroupButton onClick={() => setShowPassword(prev => !prev)}>
                                <JIcon icon={showPassword ? 'eye' : 'eye-slash'} className="me-0 pt-1" />
                            </InputGroupButton>
                        </InputGroupAddon>
                    </InputGroup>
                </Field>
            )}
        />
    );
};

export default TextField;
