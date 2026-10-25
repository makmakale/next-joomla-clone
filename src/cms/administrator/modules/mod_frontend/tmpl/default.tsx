import { useLanguage } from '@/libraries/src/Language/Language';
import { Button } from '@/libraries/shared/shadcn/ui/button';
import { useDispatcher } from '../src/Dispatcher/Dispatcher';
import JIcon from '@/libraries/shared/components/Icon';
import { truncate } from 'lodash';
import Link from 'next/link';

export default () => {
    const { siteName } = useDispatcher();
    const { t } = useLanguage();

    return (
        <Button
            variant="secondary"
            nativeButton={false}
            render={
                <Link href="/" title={t('MOD_FRONTEND_PREVIEW', { siteName })} target="_blank">
                    <div className="bg-foreground rounded-full size-6 flex justify-center items-center text-background ">
                        <JIcon icon="external-link" />
                    </div>
                    {truncate(siteName, { length: 28 })}
                </Link>
            }
            className="rounded-full"
        />
    );
};
