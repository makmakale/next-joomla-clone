import { useLanguage } from '@/libraries/src/Language/Language';
import { useModule } from '@/libraries/src/Module/Module';

export const useDispatcher = () => {
    const data = useModule().getLayoutData();
    const { t } = useLanguage();

    return {
        ...data,
        title: data.params.get('automatic_title') ? t('MOD_LOGINSUPPORT_TITLE') : data.module.title,
    };
};
