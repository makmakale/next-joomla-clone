'use client';

import type { ComponentType } from 'react';

import type { JIncludeComponentType } from './include-component';
import { JIncludeComponent } from './include-component';
import type { JIncludeMessageType } from './include-message';
import { JIncludeMessage } from './include-message';
import type { JIncludeModulesType } from './include-modules';
import { JIncludeModules } from './include-modules';

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
