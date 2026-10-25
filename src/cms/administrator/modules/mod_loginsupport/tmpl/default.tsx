import { Card, CardContent, CardHeader, CardTitle } from '@/libraries/shared/shadcn/ui/card';
import { useLanguage } from '@/libraries/src/Language/Language';
import { useDispatcher } from '../src/Dispatcher/Dispatcher';
import HTMLHelper from '@/libraries/src/HTML/HTMLHelper';
import JIcon from '@/libraries/shared/components/Icon';

export default () => {
    const { params } = useDispatcher();
    const { t } = useLanguage();

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm text-center bg-secondary py-2">{t('MOD_LOGINSUPPORT_HEADLINE')}</CardTitle>
            </CardHeader>
            <CardContent className="text-xs">
                <ul className="space-y-3 [&>li]:justify-center">
                    <li className="flex items-center gap-2">
                        <HTMLHelper.Link
                            href={params.get('forum_url')!}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={t('JBROWSERTARGET_NEW_TITLE', { title: t('MOD_LOGINSUPPORT_FORUM') })}
                        >
                            <JIcon icon="external-link" className="me-1" />
                            {t('MOD_LOGINSUPPORT_FORUM')}
                        </HTMLHelper.Link>
                    </li>
                    <li className="flex items-center gap-2">
                        <HTMLHelper.Link
                            href={params.get('documentation_url')!}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={t('JBROWSERTARGET_NEW_TITLE', { title: t('MOD_LOGINSUPPORT_DOCUMENTATION') })}
                        >
                            <JIcon icon="external-link" className="me-1" />
                            {t('MOD_LOGINSUPPORT_DOCUMENTATION')}
                        </HTMLHelper.Link>
                    </li>
                    <li className="flex items-center gap-2">
                        <HTMLHelper.Link
                            href={params.get('news_url')!}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={t('JBROWSERTARGET_NEW_TITLE', { title: t('MOD_LOGINSUPPORT_NEWS') })}
                        >
                            <JIcon icon="external-link" className="me-1" />
                            {t('MOD_LOGINSUPPORT_NEWS')}
                        </HTMLHelper.Link>
                    </li>
                </ul>
            </CardContent>
        </Card>
    );
};
