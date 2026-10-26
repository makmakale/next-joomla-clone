'use client';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import type { AdminLoginSchema, AuthCredentialsSchema } from '@/libraries/services/auth/auth.types';
import { adminLoginSchema } from '@/libraries/services/auth/auth.types';
import { setLocale } from '@/libraries/services/language';
import { useApplication } from '@/libraries/src/Application/Application';
import { useLanguage } from '@/libraries/src/Language/Language';
import { useModule } from '@/libraries/src/Module/Module';

import { useLoginHelper } from './useLoginHelper';

export const useDispatcher = () => {
    const data = useModule().getLayoutData();
    const { login } = useApplication();
    const { locale } = useLanguage();
    const { getLanguages, getReturnUriString } = useLoginHelper();
    const router = useRouter();

    const form = useForm({
        defaultValues: {
            username: '',
            password: '',
            language: locale,
            option: 'com_login',
            task: 'login',
            returnUrl: getReturnUriString(),
        },
        resolver: zodResolver(adminLoginSchema),
    });

    const onSubmit = async (data: AdminLoginSchema) => {
        const { username, password, returnUrl, language } = data;

        const credentials: AuthCredentialsSchema = { username, password };
        const res = await login(credentials, { action: 'core.login.admin', group: 'Public Backend' });

        if (res.success) {
            await setLocale(language || 'en-GB');
            const redirectUrl = returnUrl ? atob(returnUrl) : '/index';
            router.push(redirectUrl);
        }
    };

    return {
        ...data,
        languages: getLanguages(),
        form,
        onSubmit,
    };
};
