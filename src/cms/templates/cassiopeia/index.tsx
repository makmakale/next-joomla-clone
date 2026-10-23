import JConfig from '@/configuration';
import JInclude from '@/libraries/shared/components/include';
import JLink from '@/libraries/shared/components/Link';
import { useLanguage } from '@/libraries/src/Language/Language';
import { useModuleHelper } from '@/libraries/src/Module/ModuleHelper';
import { useTemplate } from '@/libraries/src/Templates/Template';
import Image from 'next/image';
import type { PropsWithChildren } from 'react';
import logoSvg from './images/logo.svg';

import './css/template.css';

const Cassiopeia = ({ children }: PropsWithChildren) => {
    const { params } = useTemplate();
    const { t } = useLanguage();

    const logo = params.get('siteTitle') ? (
        <span title={JConfig.siteName}>{params.get('siteTitle')}</span>
    ) : (
        <Image src={logoSvg} alt="" loading="eager" decoding="async" className="logo inline-block" />
    );

    const { countModules } = useModuleHelper();

    return (
        <>
            <header className="header container-header w-full">
                {countModules('topbar') && (
                    <div className="container-topbar">
                        <JInclude type="modules" name="topbar" style="none" />
                    </div>
                )}

                {countModules('below-top') && (
                    <div className="grid-child container-below-top">
                        <JInclude type="modules" name="below-top" style="none" />
                    </div>
                )}

                {!!params.get('brand', 1) && (
                    <div className="grid-child">
                        <div className="navbar-brand">
                            <JLink className="brand-logo" href="/">
                                {logo}
                            </JLink>
                            {!!params.get('siteDescription') && (
                                <div className="site-description">{params.get('siteDescription')}</div>
                            )}
                        </div>
                    </div>
                )}

                {(countModules('menu', true) || countModules('search', true)) && (
                    <div className="grid-child container-nav">
                        {countModules('menu', true) && <JInclude type="modules" name="menu" style="none" />}
                        {countModules('search', true) && (
                            <div className="container-search">
                                <JInclude type="modules" name="search" style="none" />
                            </div>
                        )}
                    </div>
                )}
            </header>

            <div className="site-grid">
                {countModules('banner', true) && (
                    <div className="container-banner w-full">
                        <JInclude type="modules" name="banner" style="none" />
                    </div>
                )}

                {countModules('top-a', true) && (
                    <div className="grid-child container-top-a">
                        <JInclude type="modules" name="banner" style="none" />
                    </div>
                )}

                {countModules('top-b', true) && (
                    <div className="grid-child container-top-b">
                        <JInclude type="modules" name="banner" style="none" />
                    </div>
                )}

                {countModules('sidebar-left', true) && (
                    <div className="grid-child container-sidebar-left">
                        <JInclude type="modules" name="banner" style="none" />
                    </div>
                )}

                <div className="grid-child container-component">
                    <JInclude type="modules" name="breadcrumbs" style="none" />
                    <JInclude type="modules" name="main-top" style="card" />
                    <JInclude type="message" />
                    <main>{children}</main>
                    <JInclude type="modules" name="main-bottom" style="card" />
                </div>

                {countModules('sidebar-right', true) && (
                    <div className="grid-child container-sidebar-right">
                        <JInclude type="modules" name="sidebar-right" style="card" />
                    </div>
                )}

                {countModules('bottom-a', true) && (
                    <div className="grid-child container-bottom-a">
                        <JInclude type="modules" name="bottom-a" style="card" />
                    </div>
                )}

                {countModules('bottom-b', true) && (
                    <div className="grid-child container-bottom-b">
                        <JInclude type="modules" name="bottom-b" style="card" />
                    </div>
                )}
            </div>

            {countModules('footer', true) && (
                <footer className="container-footer footer w-full">
                    <div className="grid-child">
                        <JInclude type="modules" name="footer" style="none" />
                    </div>
                </footer>
            )}

            {!!params.get('backTop') && (
                <a href="#top" id="back-top" className="back-to-top-link" aria-label={t('TPL_CASSIOPEIA_BACKTOTOP')}>
                    <span className="icon-arrow-up icon-fw" aria-hidden="true"></span>
                </a>
            )}

            <JInclude type="modules" name="debug" style="none" />
        </>
    );
};

export default Cassiopeia;
