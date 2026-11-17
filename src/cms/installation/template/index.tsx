import Image from 'next/image';

import logo from '@/cms/installation/template/images/logo.svg';

import JIcon from '@/libraries/shared/components/Icon';
import JText from '@/libraries/shared/components/Text';
import JInclude from '@/libraries/shared/components/include';
import { Button } from '@/libraries/shared/shadcn/ui/button';

const InstallWizard = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <header className="bg-foreground text-background w-full rounded-none">
                <div className="mx-auto flex items-center p-2">
                    <div className="min-w-[150px]">
                        <Image src={logo} alt="logo" width={150} />
                    </div>
                    <div className="flex w-full flex-wrap items-center justify-center md:pr-40">
                        <h2 className="mx-1 mt-2 flex items-baseline text-3xl leading-snug font-bold">
                            <JIcon icon="cogs" className="mx-2 hidden items-center md:block" />
                            <JText text="INSTL_PAGE_TITLE" />
                        </h2>
                        <span className="mx-1 text-xs">Joomla! 6.0.3</span>
                    </div>
                    <div className="m-2 flex items-center justify-end">
                        <Button
                            nativeButton={false}
                            className="w-fit"
                            render={
                                <a href="https://docs.joomla.org/Special:MyLanguage/J4.x:Installing_Joomla" target="_blank">
                                    <JIcon icon="question" />
                                    <span className="hidden">
                                        <JText text="INSTL_HELP_LINK" />
                                    </span>
                                </a>
                            }
                        />
                    </div>
                </div>
            </header>

            <div className="flex w-full flex-1 flex-col items-center justify-center">
                <main className="w-full max-w-160 flex-1 space-y-6 py-4">
                    <JInclude type="component" />
                </main>

                <footer className="flex w-full items-center justify-center gap-1 py-3 text-sm shadow-[0_0_1px_1px_#00000040]">
                    <a href="https://www.joomla.org">Joomla!</a> is Free Software released under the GNU General Public License.
                </footer>
            </div>
        </div>
    );
};

export default InstallWizard;
