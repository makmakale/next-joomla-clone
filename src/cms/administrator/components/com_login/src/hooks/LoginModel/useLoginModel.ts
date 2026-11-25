'use client';

import { _load } from '../../actions/serverActions';
import { useQuery } from '@tanstack/react-query';

export const useLoginModel = () => {
    const { data: modules = [] } = useQuery({
        queryKey: ['get_login_modules'],
        queryFn: () => _load('mod_login'),
    });

    function getLoginModule(name: string = 'mod_login', title?: string) {
        let result = null;

        for (const $module of modules) {
            if (!title || $module.title === title) {
                result = $module;
                break;
            }
        }

        if (result === null && name.startsWith('mod_')) {
            result = {
                id: 0,
                title: '',
                module: name,
                position: '',
                showTitle: false,
                params: {},
            };
        }

        return result;
    }

    return {
        getLoginModule,
    };
};
