import get from 'lodash/get';

import type { Messages } from '@/libraries/src/Language';

function interpolate(template: string, params?: Record<string, unknown>): string {
    if (!params) return template;

    return template.replace(/\{(\w+)\}/g, (_, key) => (params[key] !== undefined ? String(params[key]) : `{${key}}`));
}

export function createTranslator(messages: Messages) {
    return function t(key: string, params?: Record<string, unknown>, fallback?: string): string {
        const raw = get(messages, key);

        if (raw === undefined) {
            if (process.env.NODE_ENV !== 'production') {
                console.warn(`[i18n] Missing translation: "${key}"`);
            }

            return fallback ?? key;
        }

        return interpolate(raw, params);
    };
}
