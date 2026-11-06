'use client';

import FatalError from '@/cms/templates/system/fatal-error';

import HTMLDocument from '@/libraries/src/HTML/HTMLDocument';

export default function GlobalError({ error }: { error: Error; retry: () => void }) {
    let message = error?.message ?? '';

    if (message.startsWith('Failed query: select')) {
        message = 'DB_ERROR';
    }

    return (
        <HTMLDocument>
            <FatalError message={message} />
        </HTMLDocument>
    );
}
