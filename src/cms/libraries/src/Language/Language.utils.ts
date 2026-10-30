import isEmpty from 'lodash/isEmpty';

import type { LocaleParams } from './Language.types';

export function replaceParams(str: string, params?: LocaleParams) {
    if (!isEmpty(params)) {
        for (const [name, value] of Object.entries(params)) {
            str = str.replace(`{${name}}`, `${value}`);
        }
    }

    return str;
}
