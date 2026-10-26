'use client';

import Image from 'next/image';

import JConfig from '@/configuration';
import { cn } from 'cn';

import brandLarge from '@/cms/administrator/templates/atum/images/logos/brand-large.svg';
import brandSmall from '@/cms/administrator/templates/atum/images/logos/brand-small.svg';
import loginLogo from '@/cms/administrator/templates/atum/images/logos/login.svg';

import JInclude from '@/libraries/shared/components/include';
import { Card, CardContent, CardHeader } from '@/libraries/shared/shadcn/ui/card';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarInset,
    SidebarProvider,
    useSidebar,
} from '@/libraries/shared/shadcn/ui/sidebar';
import { useLanguage } from '@/libraries/src/Language/Language';

function AtumLogin() {
    const { open } = useSidebar();
    const { t } = useLanguage();

    return (
        <>
            <Sidebar variant="inset">
                <SidebarHeader className="h-16">
                    <div className={cn('flex h-full items-center', { 'justify-center': !open })}>
                        <Image
                            src={open ? brandLarge : brandSmall}
                            alt={t('TPL_ATUM_BACK_TO_CONTROL_PANEL')}
                            loading="eager"
                            decoding="async"
                        />
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <div className="mbs-25 flex-auto text-center">
                            <h1>{JConfig.siteName}</h1>
                            <h2>{t('TPL_ATUM_BACKEND_LOGIN')}</h2>
                        </div>
                    </SidebarGroup>
                    <SidebarGroup />
                </SidebarContent>
                <SidebarFooter>
                    <JInclude type="modules" name="sidebar" style="body" />
                </SidebarFooter>
            </Sidebar>

            <SidebarInset className="overflow-hidden">
                <div className="flex h-16 shrink-0 items-center border-b transition-[width,height] ease-linear">
                    <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                        <JInclude type="modules" name="title" />

                        <div className="ml-auto flex items-center gap-2">
                            <JInclude type="modules" name="status" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col items-center justify-center gap-2">
                        <div className="flex w-full max-w-md flex-col gap-4 px-4 py-4 md:gap-6 md:px-6 md:py-6">
                            <Card>
                                <CardHeader>
                                    <div className="flex justify-center">
                                        <Image src={loginLogo} alt="" loading="eager" decoding="async" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="login_message">
                                        <JInclude type="message" />
                                    </div>
                                    <div className="flex justify-center items-center h-full">
                                        <div className="login w-full">
                                            <JInclude type="component" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </>
    );
}

export default () => {
    return (
        <SidebarProvider
            style={
                {
                    '--sidebar-width': '400px',
                } as React.CSSProperties
            }
        >
            <AtumLogin />
        </SidebarProvider>
    );
};
