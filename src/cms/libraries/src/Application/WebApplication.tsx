import type { PropsWithChildren } from 'react';

import AlertProvider from '@/libraries/src/Alert/Alert';
import { ThemeProvider } from '@/libraries/vendor/wrappers';

const WebApplication = ({ children }: PropsWithChildren) => {
    return (
        <ThemeProvider>
            <AlertProvider>{children}</AlertProvider>
        </ThemeProvider>
    );
};

export default WebApplication;
