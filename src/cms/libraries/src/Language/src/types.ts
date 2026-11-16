export type Locale = string;
export type Messages = Record<string, string>;
export interface InstallProps {
    initialMessages?: Messages;
}
