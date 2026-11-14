'use client';

import type { PropsWithChildren } from 'react';

import { TanstackQuery } from '@/libraries/vendor/wrappers';

const Wrapper = ({ children }: PropsWithChildren) => {
    return <TanstackQuery>{children}</TanstackQuery>;
};

export default Wrapper;
