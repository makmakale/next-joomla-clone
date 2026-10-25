import { useLanguage } from '@/libraries/src/Language/Language';

export const useLoginHelper = () => {
    const { locale } = useLanguage();

    const getLanguages = () => {
        return [
            { value: 'ru-RU', label: 'Русский', selected: locale === 'ru-RU' },
            { value: 'en-GB', label: 'English', selected: locale === 'en-GB' },
        ];
    };

    return {
        getLanguages,
    };
};
