import brandLarge from '@/cms/administrator/templates/atum/images/logos/brand-large.svg';
import brandSmall from '@/cms/administrator/templates/atum/images/logos/brand-small.svg';
import JIcon from '@/libraries/shared/components/Icon';
import JLink from '@/libraries/shared/components/Link';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    useSidebar,
} from '@/libraries/shared/shadcn/ui/sidebar';
import { cn } from '@/libraries/shared/shadcn/utils';
import { useTemplate } from '@/libraries/src/Templates/Template';
import Image from 'next/image';
import type { PropsWithChildren } from 'react';
import './css/atum.css';
import { useLanguage } from '@/libraries/src/Language/Language';

function Atum({ children }: PropsWithChildren) {
    const { open, toggleSidebar } = useSidebar();
    const { hiddenMenu, cpanel } = useTemplate();
    const { t } = useLanguage();

    return (
        <>
            <Sidebar variant="inset" collapsible="icon">
                <SidebarHeader className="h-16">
                    <div className={cn('flex h-full items-center', { 'justify-center': !open })}>
                        {hiddenMenu || cpanel ? (
                            <Image
                                src={open ? brandLarge : brandSmall}
                                alt={t('TPL_ATUM_BACK_TO_CONTROL_PANEL')}
                                loading="eager"
                                decoding="async"
                                className={`${!open ? 'logo-collapsed' : ''}`}
                            />
                        ) : (
                            <JLink href="/">
                                <Image
                                    src={open ? brandLarge : brandSmall}
                                    alt={t('TPL_ATUM_BACK_TO_CONTROL_PANEL')}
                                    loading="eager"
                                    decoding="async"
                                    className={`${!open ? 'logo-collapsed' : ''}`}
                                />
                            </JLink>
                        )}
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton onClick={toggleSidebar}>
                                    <JIcon icon={open ? 'toggle-on' : 'toggle-off'} />
                                    {t('JTOGGLE_SIDEBAR_MENU')}
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>

                        {/* TODO: <JInclude type="modules" name="menu" />*/}
                    </SidebarGroup>
                    <SidebarGroup />
                </SidebarContent>
            </Sidebar>

            <SidebarInset>
                <div className="flex h-16 shrink-0 items-center border-b transition-[width,height] ease-linear">
                    <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                        {/* TODO: {!hiddenMenu && <JInclude type="modules" name="title" />}*/}

                        <div className="ml-auto flex items-center gap-2">
                            {/*< TODO: JInclude type="modules" name="status" />*/}
                        </div>
                    </div>
                </div>

                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:px-6 md:py-6">
                            {/* TODO: <JInclude type="message" />*/}
                            {children}
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </>
    );
}

export default ({ children }: PropsWithChildren) => {
    return (
        <SidebarProvider
            style={
                {
                    '--sidebar-width': '18rem',
                } as React.CSSProperties
            }
        >
            <Atum>{children}</Atum>
        </SidebarProvider>
    );
};
