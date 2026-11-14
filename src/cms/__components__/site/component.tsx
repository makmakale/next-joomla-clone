'use client';

import JText from '@/libraries/shared/components/Text';
import { Button } from '@/libraries/shared/shadcn/ui/button';
import { useApplication } from '@/libraries/src/Application/provider/ApplicationProvider';
import { useLanguage } from '@/libraries/src/Language';
import { useSessionContext } from '@/libraries/src/Session';

const SiteComponent = () => {
    const { name } = useApplication();
    const { locale, changeLanguage } = useLanguage();
    const { fakeLogOut } = useSessionContext();

    return (
        <div className="flex flex-col items-center justify-center gap-4 text-7xl font-bold">
            <JText text="JTEST_MESSAGE" />
            <div>
                {name}:{locale}
            </div>
            <Button onClick={() => changeLanguage('en-GB')}>Switch to en</Button>
            <Button onClick={() => changeLanguage('ru-RU')}>Switch to ru</Button>
            <Button onClick={() => fakeLogOut()}>Log out</Button>
        </div>
    );
};

export default SiteComponent;
