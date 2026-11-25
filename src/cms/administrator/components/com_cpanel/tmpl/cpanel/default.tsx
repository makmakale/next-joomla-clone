'use client';

import { useApplication } from '@/libraries/src/Application';

const Default = () => {
    const { getInput } = useApplication();

    const input = getInput();
    const option = input.get('option') ?? '';
    const view = input.get('view') ?? '';
    const layout = input.get('layout') ?? 'default';

    return (
        <div>
            <h1>Cpanel</h1>

            <div>
                <pre>{JSON.stringify({ option, view, layout }, null, 2)}</pre>
            </div>
        </div>
    );
};

export default Default;
