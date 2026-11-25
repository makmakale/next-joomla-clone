'use client';

import { useApplication } from '@/libraries/src/Application';

export const useModuleHelper = () => {
    const { modules } = useApplication();

    function getModules(position: string) {
        position = position.toLowerCase();

        return modules.filter(m => m.position === position);
    }

    return {
        getModules,
    };
};
