import Image from 'next/image';

import logo from '@/cms/installation/template/images/logo.svg';
import Remove from '@/cms/installation/tmpl/remove';
import Setup from '@/cms/installation/tmpl/setup';

import JIcon from '@/libraries/shared/components/Icon';
import JText from '@/libraries/shared/components/Text';

const InstallWizard = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <div className="bg-foreground text-background w-full rounded-none">
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
                    <div>help</div>
                </div>
            </div>

            <div className="w-full max-w-160 flex-1 space-y-6 py-4">
                <Setup />
                <Remove />
            </div>

            <div className="flex w-full items-center justify-center gap-1 py-3 text-sm shadow-[0_0_1px_1px_#00000040]">
                <a href="https://www.joomla.org">Joomla!</a> is Free Software released under the GNU General Public License.
            </div>
        </div>
    );
};

export default InstallWizard;
