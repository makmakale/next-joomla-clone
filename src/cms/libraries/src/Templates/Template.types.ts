import type { getAdminTemplate } from '@/cms/administrator/com_templates/src/Model/StyleModel';

export type ClientActiveTemplate = Awaited<ReturnType<typeof getAdminTemplate>>;
