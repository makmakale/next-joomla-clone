import { ModuleNotFound } from '@/libraries/src/Module/ui';

export const getModuleLayout = (clientId: number, moduleName: string, layout: string) => {
    try {
        return clientId === 1
            ? import(`@/cms/administrator/modules/${moduleName}/tmpl/${layout}`).catch(() => () => (
                  <ModuleNotFound moduleName={moduleName} layout={layout} />
              ))
            : import(`@/cms/modules/${moduleName}/tmpl/${layout}`).catch(() => () => (
                  <ModuleNotFound moduleName={moduleName} layout={layout} />
              ));
    } catch {
        return Promise.resolve();
    }
};
