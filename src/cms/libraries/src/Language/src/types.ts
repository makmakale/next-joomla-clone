export type Locale = string;
export type Messages = Record<string, string>;
export type LocaleMetadata = {
    name: string;
    nativeName?: string;
    tag: Locale;
    rtl: number;
};
export interface LanguageProps {
    locale: Locale;
    metadata: LocaleMetadata | undefined;
    messages: Messages;
}
