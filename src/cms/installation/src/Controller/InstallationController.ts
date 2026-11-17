import type { SetupSchema } from '@/cms/installation/forms';
import { clearInstallationData } from '@/cms/installation/sql/clear';
import { setGlobalConfig } from '@/cms/installation/sql/config';
import { BASE_STEPS } from '@/cms/installation/sql/postgres/base';

export type InstallStep = {
    id: string;
    label: string;
    run: () => Promise<{
        success: boolean;
        message?: string;
    }>;
};

export const getInstallSteps = (data?: SetupSchema): InstallStep[] => [
    { id: 'clear', label: 'Очистка данных предыдущей установки', run: clearInstallationData },
    { id: 'config', label: 'Конфигурация сайта', run: () => setGlobalConfig(data?.site_name) },
    ...BASE_STEPS,
];

export const INSTALL_STEPS: InstallStep[] = getInstallSteps();
