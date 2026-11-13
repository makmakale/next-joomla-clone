'use server';

export async function getSiteTemplate() {
    return {
        template: 'cassiopeia',
        params: {},
    };
}

export async function getAdminTemplate() {
    return {
        template: 'atum',
        params: {},
    };
}
