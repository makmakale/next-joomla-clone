import JIcon from '@/libraries/shared/components/Icon';
import { useLanguage } from '@/libraries/src/Language/Language';

import { useDispatcher } from '../src/hooks';

export default () => {
    const { version } = useDispatcher();
    const { t } = useLanguage();

    return (
        <div className="text-xs flex gap-1 me-2">
            <JIcon icon="hashtag" />
            <span className="hidden">{t('MOD_VERSION_CURRENT_VERSION_TEXT', { version })}</span>
            <span aria-hidden="true">{version}</span>
        </div>
    );
};
