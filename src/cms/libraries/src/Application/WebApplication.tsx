import type { PropsWithChildren } from 'react';

import AlertProvider from '@/libraries/src/Alert/Alert';
import LanguageProvider from '@/libraries/src/Language/Language';
import { ThemeProvider } from '@/libraries/vendor/wrappers';

const WebApplication = ({ children }: PropsWithChildren) => {
    return (
        <ThemeProvider>
            <LanguageProvider>
                <AlertProvider>{children}</AlertProvider>
            </LanguageProvider>
        </ThemeProvider>
    );
};

export default WebApplication;
