'use client';

import FatalError from '@/cms/templates/system/fatal-error';

export default function GlobalError({ error }: { error: Error & { digest?: string }; retry: () => void }) {
    return (
        <html>
            <body>
                <FatalError statusText={error.message} />
            </body>
        </html>
    );
}
