'use client';

import { useLayoutEffect } from 'react';

import { useApplication } from '@/libraries/src/Application';
import { useSessionContext } from '@/libraries/src/Session';

export default function () {
    const { getInput, changeInput } = useApplication();
    const { session } = useSessionContext();

    const input = getInput();
    const option = input.get('option') ?? 'com_cpanel';

    useLayoutEffect(() => {
        if (!session) {
            changeInput('option', 'com_login');
            changeInput('view', 'login');
        }
    }, [option]);

    return null;
}
