'use client';

import { useState } from 'react';

import { useDispatcher } from '@/cms/administrator/modules/mod_login/src/Dispatcher/Dispatcher';

import JIcon from '@/libraries/shared/components/Icon';
import JLink from '@/libraries/shared/components/Link';
import { Button } from '@/libraries/shared/shadcn/ui/button';
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/libraries/shared/shadcn/ui/field';
import { Input } from '@/libraries/shared/shadcn/ui/input';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/libraries/shared/shadcn/ui/input-group';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/libraries/shared/shadcn/ui/select';
import { signIn } from '@/libraries/src/Authentication';
import { useLanguage } from '@/libraries/src/Language/Language';

export default () => {
    const { t, locale } = useLanguage();
    const [showPassword, setShowPassword] = useState(false);
    const { langs } = useDispatcher();

    return (
        <>
            <form id="form-login">
                <FieldSet>
                    <FieldLegend className="hidden">{t('MOD_LOGIN')}</FieldLegend>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="mod-login-username">{t('JGLOBAL_USERNAME')}</FieldLabel>
                            <Input id="mod-login-username" autoComplete="username" autoFocus required />
                        </Field>
                    </FieldGroup>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="mod-login-password">{t('JGLOBAL_PASSWORD')}</FieldLabel>
                            <InputGroup>
                                <InputGroupInput
                                    type="password"
                                    id="mod-login-password"
                                    autoComplete="current-password"
                                    required
                                />
                                <InputGroupAddon align="inline-end">
                                    <InputGroupButton onClick={() => setShowPassword(prev => !prev)}>
                                        <JIcon icon={showPassword ? 'eye' : 'eye-slash'} className="me-0 pt-1" />
                                    </InputGroupButton>
                                </InputGroupAddon>
                            </InputGroup>
                        </Field>
                    </FieldGroup>
                </FieldSet>
                <div className="mt-4">
                    {langs.length > 0 && (
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="lang">{t('MOD_LOGIN_LANGUAGE')}</FieldLabel>
                                <Select items={langs} defaultValue={locale}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {langs.map(item => (
                                                <SelectItem key={item.value} value={item.value}>
                                                    {item.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </Field>
                        </FieldGroup>
                    )}
                </div>
                <FieldGroup>
                    <Button variant="outline" className="mt-4 h-10" onClick={() => signIn('administrator')}>
                        {t('JLOGIN')}
                    </Button>
                    <input type="hidden" name="option" value="com_login" />
                    <input type="hidden" name="task" value="login" />
                    <input type="hidden" name="return" value="<?php echo $return; ?>" />
                </FieldGroup>
            </form>
            <div className="mt-4 text-center">
                <JLink href="#" target="_blank" rel="noopener nofollow">
                    {t('MOD_LOGIN_CREDENTIALS')}
                </JLink>
            </div>
        </>
    );
};
