'use client';

import dynamic from 'next/dynamic';

import { useApplication } from '@/libraries/src/Application/Application';
import type { AppInput } from '@/libraries/src/Application/Application.types';

export interface JIncludeComponentType {
    type: 'component';
}

export function JIncludeComponent() {
    const { clientId, getInput } = useApplication();
    const $input = getInput();

    const option = $input.get('option');
    const view = $input.get('view');
    const layout = $input.get('layout');

    const params = { option, view, layout } as AppInput;
    const RenderComponent = dynamic(() => getComponent(clientId, params));

    return <RenderComponent />;
}

export const getComponent = async (clientId: number, params: AppInput) => {
    const { option, view, layout } = params;

    try {
        return clientId === 1
            ? await import(`@/cms/administrator/components/${option}/tmpl/${view}/${layout}`)
            : await import(`@/cms/components/${option}/tmpl/${view}/${layout}`);
    } catch {
        return () => fallback(params);
    }
};

function fallback(params: AppInput) {
    const { option, view, layout } = params;

    return `${option}/tmpl/${view}/${layout} not found`;
}
