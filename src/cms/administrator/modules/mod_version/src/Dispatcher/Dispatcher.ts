import { useModule } from '@/libraries/src/Module/Module';

export const useDispatcher = () => {
    const data = useModule().getLayoutData();

    return {
        ...data,
        version: process.env.APP_VERSION || '',
    };
};
