'use client';

import { Fragment } from 'react';

import { useModuleHelper } from '@/libraries/src/Module/ModuleHelper';
import { RenderModule } from '@/libraries/src/Module/ui';

export default () => {
    const { getLoginModule } = useModuleHelper();
    const loginModule = getLoginModule('mod_login');

    return loginModule.map(mod => (
        <Fragment key={mod.id}>
            <RenderModule module={mod} />
        </Fragment>
    ));
};
