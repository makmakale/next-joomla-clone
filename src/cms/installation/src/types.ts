export enum InstallationView {
    Setup = 'setup',
    Remove = 'remove',
}

export enum SetupSteps {
    Step1 = 'installStep1',
    Step2 = 'installStep2',
    Install = 'installStep3',
}

export type SetupStepName = (typeof SetupSteps)[keyof typeof SetupSteps];

export type InstallLanguageMetadata = {
    language: string;
    name: string;
    published: boolean;
};

export type InstallApplicationProps = {
    languageOptions: { value: string; label: string }[];
    installedLanguages: {
        frontend: InstallLanguageMetadata[];
        administrator: InstallLanguageMetadata[];
    };
};
