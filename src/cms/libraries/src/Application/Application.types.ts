import type { ClientActiveTemplate } from '@/libraries/src/Templates/Template.types';
import type { PropsWithChildren } from 'react';

export type ApplicationClientProps = PropsWithChildren<{ locale: string; template: ClientActiveTemplate }>;
