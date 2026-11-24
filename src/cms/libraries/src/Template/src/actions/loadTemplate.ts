export const loadTemplate = (clientId: number, template: string, session: unknown) => {
    return clientId === 1
        ? import(`@/cms/administrator/templates/${template}${!session ? '/login' : ''}`).catch(() => fallbackTemplate(template))
        : import(`@/cms/templates/${template}`).catch(() => fallbackTemplate(template));
};

function fallbackTemplate(template: string) {
    throw new Error(`Template "${template}" not found`);
}
