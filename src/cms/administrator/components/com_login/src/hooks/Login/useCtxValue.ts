'use client';

import { useModuleHelper } from '@/libraries/src/Module';

import { useLoginModel } from '../LoginModel/useLoginModel';

export const useCtxValue = () => {
    const { getModules } = useModuleHelper();

    const loginModel = useLoginModel();

    const loginModule = loginModel.getLoginModule('mod_login');
    const modules = getModules('login');

    return {
        loginModule,
        modules,
    };
};
