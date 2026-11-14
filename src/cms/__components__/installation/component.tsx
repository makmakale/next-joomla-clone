'use client';

import JText from '@/libraries/shared/components/Text';
import { Button } from '@/libraries/shared/shadcn/ui/button';
import { useApplication } from '@/libraries/src/Application/provider/ApplicationProvider';
import { useLanguage } from '@/libraries/src/Language';

const InstlComponent = () => {
    const { name } = useApplication();
    const { locale, changeLanguage } = useLanguage();

    return (
        <div className="flex flex-col items-center justify-center gap-4 text-7xl font-bold">
            <JText text="INSTL" />
            <div>
                {name}:{locale}
            </div>
            <Button onClick={() => changeLanguage('en-GB')}>Switch to en</Button>
            <Button onClick={() => changeLanguage('ru-RU')}>Switch to ru</Button>
        </div>
    );
};

export default InstlComponent;
