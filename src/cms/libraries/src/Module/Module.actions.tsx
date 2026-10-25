export const getModuleLayout = async (clientId: number, moduleName: string, layout: string) => {
    try {
        return clientId === 1
            ? await import(`@/cms/administrator/modules/${moduleName}/tmpl/${layout}`).catch(() => () => null)
            : await import(`@/cms/modules/${moduleName}/tmpl/${layout}`).catch(() => () => null);
    } catch {
        return () => null;
    }
};
