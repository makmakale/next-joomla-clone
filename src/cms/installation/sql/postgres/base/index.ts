import type { InstallationStep } from '@/cms/installation';

import { seedAssets } from './assets';
import { seedExtensions } from './extensions';
import { seedLanguages } from './languages';
import { seedMenu } from './menu';
import { seedMenuTypes } from './menuTypes';
import { seedModules } from './modules';
import { seedModulesMenu } from './modulesMenu';
import { seedTags } from './tags';
import { seedTemplateStyles } from './templateStyles';
import { seedTufMetadata } from './tufMetadata';
import { seedUpdateSites } from './updateSites';
import { seedUpdateSitesExtensions } from './updateSitesExtensions';
import { seedUserGroups } from './userGroups';
import { seedViewLevels } from './viewLevels';
import { seedWorkflowStages } from './workflowStages';
import { seedWorkflowTransitions } from './workflowTransitions';
import { seedWorkflows } from './workflows';

export const BASE_STEPS: InstallationStep[] = [
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
