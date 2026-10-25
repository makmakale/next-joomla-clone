'use client';

import type { JIncludeComponentType } from './include-component';
import type { JIncludeModulesType } from './include-modules';
import type { JIncludeMessageType } from './include-message';
import { JIncludeComponent } from './include-component';
import { JIncludeModules } from './include-modules';
import { JIncludeMessage } from './include-message';
import type { ComponentType } from 'react';

type JInclude = JIncludeMessageType | JIncludeComponentType | JIncludeModulesType;

const map = {
    message: JIncludeMessage,
    component: JIncludeComponent,
    modules: JIncludeModules,
};

export default function JInclude(props: JInclude) {
    const Component = map[props.type as keyof typeof map] as ComponentType<JInclude>;

    if (!Component) return;

    return <Component {...props} />;
}
