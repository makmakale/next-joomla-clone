import Image from 'next/image';

import logo from '@/cms/installation/template/images/logo.svg';

import JIcon from '@/libraries/shared/components/Icon';
import JText from '@/libraries/shared/components/Text';
import JInclude from '@/libraries/shared/components/include';
import { Button } from '@/libraries/shared/shadcn/ui/button';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/libraries/shared/shadcn/ui/card';

const InstallWizard = () => {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-r from-indigo-400 to-cyan-400 p-6">
            <Card className="mx-auto min-h-[60vh] w-full max-w-7xl py-0">
                <CardHeader className="bg-foreground p-4">
                    <CardTitle>
                        <Image src={logo} alt="logo" width={150} />
                    </CardTitle>
                    <CardDescription className="justify-center">
                        <div className="text-background flex w-full flex-wrap items-baseline justify-center">
                            <h2 className="text-2xl font-bold">
                                <JText text="INSTL_PAGE_TITLE" />
                            </h2>
                            <span className="mx-1 text-xs">Joomla! {process.env.APP_VERSION}</span>
                        </div>
                    </CardDescription>
                    <CardAction>
                        <Button
                            nativeButton={false}
                            render={
                                <a href="https://docs.joomla.org/Special:MyLanguage/J4.x:Installing_Joomla" target="_blank">
                                    <JIcon icon="question" />
                                    <span className="hidden">
                                        <JText text="INSTL_HELP_LINK" />
                                    </span>
                                </a>
                            }
                        />
                    </CardAction>
                </CardHeader>

                <CardContent className="flex-1">
                    <div className="flex w-full flex-1 flex-col items-center justify-center">
                        <main className="w-full max-w-160 flex-1 space-y-6 py-4">
                            <JInclude type="component" />
                        </main>
                    </div>
                </CardContent>

                <CardFooter className="justify-center">
                    <a href="https://www.joomla.org">Joomla!</a> is Free Software released under the GNU General Public License.
                </CardFooter>
            </Card>
        </div>
    );
};

export default InstallWizard;
