import type { InstallationStep } from '@/cms/installation';
import type { SetupSchema } from '@/cms/installation/forms';
import { clearInstallationData } from '@/cms/installation/sql/clear';
import { setGlobalConfig } from '@/cms/installation/sql/config';
import { seedAssets } from '@/cms/installation/sql/postgres/base/assets';
import { seedExtensions } from '@/cms/installation/sql/postgres/base/extensions';
import { seedLanguages } from '@/cms/installation/sql/postgres/base/languages';
import { seedMenu } from '@/cms/installation/sql/postgres/base/menu';
import { seedMenuTypes } from '@/cms/installation/sql/postgres/base/menuTypes';
import { seedModules } from '@/cms/installation/sql/postgres/base/modules';
import { seedModulesMenu } from '@/cms/installation/sql/postgres/base/modulesMenu';
import { seedTags } from '@/cms/installation/sql/postgres/base/tags';
import { seedTemplateStyles } from '@/cms/installation/sql/postgres/base/templateStyles';
import { seedTufMetadata } from '@/cms/installation/sql/postgres/base/tufMetadata';
import { seedUpdateSites } from '@/cms/installation/sql/postgres/base/updateSites';
import { seedUpdateSitesExtensions } from '@/cms/installation/sql/postgres/base/updateSitesExtensions';
import { loadUpdates } from '@/cms/installation/sql/postgres/base/updates';
import { seedUserGroups } from '@/cms/installation/sql/postgres/base/userGroups';
import { seedViewLevels } from '@/cms/installation/sql/postgres/base/viewLevels';
import { seedWorkflowStages } from '@/cms/installation/sql/postgres/base/workflowStages';
import { seedWorkflowTransitions } from '@/cms/installation/sql/postgres/base/workflowTransitions';
import { seedWorkflows } from '@/cms/installation/sql/postgres/base/workflows';
import { setSuperAdminUser } from '@/cms/installation/sql/users';

export const getInstallSteps = (data?: SetupSchema): InstallationStep[] => [
    { id: 'clear', label: 'Очистка данных предыдущей установки', run: clearInstallationData },
    { id: 'checkUpdates', label: 'Проверка обновлений', run: loadUpdates },
    { id: 'config', label: 'Конфигурация сайта', run: () => setGlobalConfig(data?.site_name) },
    { id: 'user', label: 'Создание администратора', run: () => setSuperAdminUser(data) },
    { id: 'assets', label: 'Дерево прав доступа (ACL)', run: seedAssets },
    { id: 'extensions', label: 'Регистрация расширений', run: seedExtensions },
    { id: 'languages', label: 'Языки', run: seedLanguages },
    { id: 'menu', label: 'Пункты меню', run: seedMenu },
    { id: 'menuTypes', label: 'Типы меню', run: seedMenuTypes },
    { id: 'modules', label: 'Модули', run: seedModules },
    { id: 'modulesMenu', label: 'Привязка модулей к страницам', run: seedModulesMenu },
    { id: 'tags', label: 'Корневой тег', run: seedTags },
    { id: 'templateStyles', label: 'Стили шаблонов', run: seedTemplateStyles },
    { id: 'tufMetadata', label: 'Метаданные безопасных обновлений (TUF)', run: seedTufMetadata },
    { id: 'updateSites', label: 'Сайты обновлений', run: seedUpdateSites },
    { id: 'updateSitesExtensions', label: 'Привязка расширений к сайтам обновлений', run: seedUpdateSitesExtensions },
    { id: 'userGroups', label: 'Группы пользователей', run: seedUserGroups },
    { id: 'viewLevels', label: 'Уровни доступа', run: seedViewLevels },
    { id: 'workflows', label: 'Рабочие процессы', run: seedWorkflows },
    { id: 'workflowStages', label: 'Этапы рабочих процессов', run: seedWorkflowStages },
    { id: 'workflowTransitions', label: 'Переходы рабочих процессов', run: seedWorkflowTransitions },
];
