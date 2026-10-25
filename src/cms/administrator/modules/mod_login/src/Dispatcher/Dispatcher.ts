import { useLoginHelper } from '@/cms/administrator/modules/mod_login/src/Helper/LoginHelper';
import { useModule } from '@/libraries/src/Module/Module';

export const useDispatcher = () => {
    const data = useModule();
    const loginHelper = useLoginHelper();

    const langs = loginHelper.getLanguages();

    return { ...data, langs };
};
