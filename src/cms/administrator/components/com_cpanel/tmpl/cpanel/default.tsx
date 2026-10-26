'use client';

import { signOut } from '@/libraries/services/auth/auth';
import { Button } from '@/libraries/shared/shadcn/ui/button';
import { useLanguage } from '@/libraries/src/Language/Language';

export default () => {
    const { t } = useLanguage();

    return (
        <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex w-full max-w-3xl flex-col items-center justify-between gap-6 bg-white px-16 py-32 sm:items-start dark:bg-black">
                <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
                    <h1 className="max-w-xs text-3xl leading-10 font-semibold tracking-tight text-black dark:text-zinc-50">
                        Administrator - Next.js Joomla Clone
                    </h1>

                    <h3 className="max-w-xs text-xl leading-10 font-semibold tracking-tight text-black dark:text-zinc-50">
                        {t('JTEST_MESSAGE')}
                    </h3>
                </div>

                <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
                    <a
                        className="bg-foreground text-background flex h-12 w-full items-center justify-center gap-2 rounded-full px-5 transition-colors hover:bg-[#383838] md:w-[158px] dark:hover:bg-[#ccc]"
                        href="/public"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Back to Site
                    </a>

                    <Button onClick={() => signOut('administrator')}>Log out</Button>
                </div>
            </main>
        </div>
    );
};
