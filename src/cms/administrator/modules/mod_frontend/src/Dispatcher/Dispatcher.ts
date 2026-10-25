import { useModule } from '@/libraries/src/Module/Module';
import JConfig from '@/configuration';

export const useDispatcher = () => {
    const data = useModule().getLayoutData();

    return {
        ...data,
        siteName: JConfig.siteName!,
    };
};
