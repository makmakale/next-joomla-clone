import type { getTemplates } from '@/libraries/src/Templates/Template.actionsServer';

export type ClientActiveTemplate = Awaited<ReturnType<typeof getTemplates>>;

