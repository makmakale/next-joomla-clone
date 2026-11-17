'use client';

import type { ComponentProps } from 'react';

import { cn } from 'cn';

const JInstallStep = ({ className, ...props }: ComponentProps<'div'>) => {
    return <div className={cn('rounded-md border p-4 shadow-lg', className)} {...props} />;
};

export const Installation = {
    Step: JInstallStep,
};
