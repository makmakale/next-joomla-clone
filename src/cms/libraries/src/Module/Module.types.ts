import type { getModuleList } from './Module.actionsServer';

export type JModuleType = Awaited<ReturnType<typeof getModuleList>>[0];
export type JModuleProps = { module: JModuleType };
