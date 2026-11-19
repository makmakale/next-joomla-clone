import type { Update } from '@/libraries/services/database';

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

export enum RemoveSteps {
    Congrat = 'installCongrat',
    Languages = 'installLanguages',
}

export type RemoveStepName = (typeof RemoveSteps)[keyof typeof RemoveSteps];

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

export type UpdateLanguageType = {
    [K in 'updateId' | 'name' | 'element' | 'version']: NonNullable<Update[K]>;
};

export type InstallationStep = {
    id: string;
    label: string;
    run: () => Promise<{
        success: boolean;
        message?: string;
    }>;
};
