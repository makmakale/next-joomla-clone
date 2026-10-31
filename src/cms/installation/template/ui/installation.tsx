import type { ComponentProps } from 'react';

import Image from 'next/image';

import { cn } from 'cn';

import logo from '@/cms/installation/template/images/logo.svg';

import JIcon from '@/libraries/shared/components/Icon';
import { useLanguage } from '@/libraries/src/Language/Language';

const InstallationBody = ({ className, ...props }: ComponentProps<'div'>) => {
    return <div className={cn('flex min-h-screen flex-col items-center justify-center', className)} {...props} />;
};

const InstallationContent = ({ className, ...props }: ComponentProps<'div'>) => {
    return <div className={cn('w-full max-w-160 flex-1 space-y-6 py-4', className)} {...props} />;
};

const InstallationCard = ({ className, ...props }: ComponentProps<'div'>) => {
    return <div className={cn('rounded-md border p-4 shadow-lg', className)} {...props} />;
};

const InstallationHeader = () => {
    const { t } = useLanguage();

    return (
        <div className="bg-foreground text-background w-full rounded-none">
            <div className="mx-auto flex items-center p-2">
                <div className="min-w-[150px]">
                    <Image src={logo} alt="logo" width={150} />
                </div>
                <div className="flex w-full flex-wrap items-center justify-center md:pr-40">
                    <h2 className="mx-1 mt-2 flex items-baseline text-3xl leading-snug font-bold">
                        <JIcon icon="cogs" className="mx-2 hidden items-center md:block" />
                        {t('INSTL_PAGE_TITLE')}
                    </h2>
                    <span className="mx-1 text-xs">Joomla! 6.0.3</span>
                </div>
                <div>help</div>
            </div>
        </div>
    );
};

export const Installation = {
    Body: InstallationBody,
    Header: InstallationHeader,
    Content: InstallationContent,
    Card: InstallationCard,
};
