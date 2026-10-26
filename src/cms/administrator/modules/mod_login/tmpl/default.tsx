'use client';

import { useState } from 'react';

import { Controller } from 'react-hook-form';

import JIcon from '@/libraries/shared/components/Icon';
import JLink from '@/libraries/shared/components/Link';
import { Button } from '@/libraries/shared/shadcn/ui/button';
import {
    Field,
    FieldContent,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from '@/libraries/shared/shadcn/ui/field';
import { Input } from '@/libraries/shared/shadcn/ui/input';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/libraries/shared/shadcn/ui/input-group';
import HTMLHelper from '@/libraries/src/HTML/HTMLHelper';
import { useLanguage } from '@/libraries/src/Language/Language';

import { useDispatcher } from '../src/hooks';

export default () => {
    const [showPassword, setShowPassword] = useState(false);
    const { t } = useLanguage();
    const { form, onSubmit, languages } = useDispatcher();

    return (
        <>
            <form id="form-login" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldSet>
                    <FieldLegend className="hidden">{t('MOD_LOGIN')}</FieldLegend>

                    <FieldGroup>
                        <Controller
                            name="username"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="mod-login-username">{t('JGLOBAL_USERNAME')}</FieldLabel>
                                    <Input
                                        {...field}
                                        id="mod-login-username"
                                        aria-invalid={fieldState.invalid}
                                        autoComplete="username"
                                        autoFocus
                                        required
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                    </FieldGroup>

                    <FieldGroup>
                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="mod-login-password">{t('JGLOBAL_PASSWORD')}</FieldLabel>
                                    <InputGroup>
                                        <InputGroupInput
                                            {...field}
                                            id="mod-login-password"
                                            type={showPassword ? 'text' : 'password'}
                                            aria-invalid={fieldState.invalid}
                                            autoComplete="current-password"
                                            required
                                        />
                                        <InputGroupAddon align="inline-end">
                                            <InputGroupButton type="button" onClick={() => setShowPassword(prev => !prev)}>
                                                <JIcon icon={showPassword ? 'eye' : 'eye-slash'} className="me-0 pt-1" />
                                            </InputGroupButton>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </FieldSet>

                {languages?.length > 0 && (
                    <div className="mt-4">
                        <Controller
                            name="language"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field orientation="responsive" data-invalid={fieldState.invalid}>
                                    <FieldContent>
                                        <FieldLabel htmlFor="language">{t('MOD_LOGIN_LANGUAGE')}</FieldLabel>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </FieldContent>

                                    <HTMLHelper.Select
                                        items={languages}
                                        name="language"
                                        value={field.value}
                                        onChange={field.onChange}
                                        invalid={fieldState.invalid}
                                    />
                                </Field>
                            )}
                        />
                    </div>
                )}

                <FieldGroup>
                    <Button variant="outline" className="mt-4" type="submit">
                        {t('JLOGIN')}
                    </Button>
                </FieldGroup>
            </form>

            <div className="text-center mt-4">
                <JLink href="#" target="_blank" rel="noopener nofollow">
                    {t('MOD_LOGIN_CREDENTIALS')}
                </JLink>
            </div>
        </>
    );
};
