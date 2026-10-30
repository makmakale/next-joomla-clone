'use client';

import JConfig from '@/configuration';

import { useModule } from '@/libraries/src/Module/Module';

export const useDispatcher = () => {
    const data = useModule().getLayoutData();

    return {
        ...data,
        siteName: JConfig.siteName!,
    };
};
