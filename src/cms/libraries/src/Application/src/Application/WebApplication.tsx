import type { PropsWithChildren } from 'react';

import AlertProvider from '@/libraries/src/Alert/Alert';
import Wrapper from '@/libraries/src/Wrapper';
import { ThemeProvider } from '@/libraries/vendor/wrappers';

export const WebApplication = ({ children }: PropsWithChildren) => {
    return (
        <ThemeProvider>
            <Wrapper>
                <AlertProvider>{children}</AlertProvider>
            </Wrapper>
        </ThemeProvider>
    );
};
