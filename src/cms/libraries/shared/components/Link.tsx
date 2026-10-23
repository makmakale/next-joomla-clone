'use client';

import { useApplication } from '@/libraries/src/Application/Application';
import Link from 'next/link';

type JLinkProps = Omit<React.ComponentProps<typeof Link>, 'href'> & {
    href: string;
};

const JLink = ({ href, ...props }: JLinkProps) => {
    const { clientId } = useApplication();
    const rootPath = clientId === 1 ? `/administrator` : '/';
    const link = `${rootPath}/${href}`.replace(/\/{2,}/, '/');

    return <Link href={link} {...props} />;
};

export default JLink;
