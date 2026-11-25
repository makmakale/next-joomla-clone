'use client';

import { RenderModule } from '@/libraries/src/Module';

import { useComLoginContext } from '../../services/provider';

export default () => {
    const { loginModule, modules } = useComLoginContext();

    return (
        <>
            <RenderModule module={loginModule} />

            {modules.map(mod => mod.module !== 'mod_login' && <RenderModule key={mod.id} module={mod} />)}
        </>
    );
};
