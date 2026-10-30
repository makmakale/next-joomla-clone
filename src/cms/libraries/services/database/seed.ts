import 'dotenv/config';

import { and, eq, sql } from 'drizzle-orm';

import {
    assetsTable,
    cmsConfigTable,
    db,
    extensionsTable,
    templateStyles,
    userGroupsTable,
    viewLevelsTable,
} from '@/libraries/services/database';

const ROOT_ASSET_RULES = {
    'core.login.site': { '6': 1, '2': 1 },
    'core.login.admin': { '6': 1 },
    'core.login.api': { '8': 1 },
    'core.login.offline': { '6': 1 },
    'core.admin': { '8': 1 },
    'core.manage': { '7': 1 },
    'core.create': { '6': 1, '3': 1 },
    'core.delete': { '6': 1 },
    'core.edit': { '6': 1, '4': 1 },
    'core.edit.state': { '6': 1, '5': 1 },
    'core.edit.own': { '6': 1, '3': 1 },
};

const USER_GROUPS = [
    { id: 1, parentId: 0, lft: 1, rgt: 18, title: 'Public' },
    { id: 2, parentId: 1, lft: 8, rgt: 15, title: 'Registered' },
    { id: 3, parentId: 2, lft: 9, rgt: 14, title: 'Author' },
    { id: 4, parentId: 3, lft: 10, rgt: 13, title: 'Editor' },
    { id: 5, parentId: 4, lft: 11, rgt: 12, title: 'Publisher' },
    { id: 6, parentId: 1, lft: 4, rgt: 7, title: 'Manager' },
    { id: 7, parentId: 6, lft: 5, rgt: 6, title: 'Administrator' },
    { id: 8, parentId: 1, lft: 16, rgt: 17, title: 'Super Users' },
    { id: 9, parentId: 1, lft: 2, rgt: 3, title: 'Guest' },
];

const VIEW_LEVELS = [
    { id: 1, title: 'Public', ordering: 0, rules: [1] },
    { id: 2, title: 'Registered', ordering: 2, rules: [6, 2, 8] },
    { id: 3, title: 'Special', ordering: 3, rules: [6, 3, 8] },
    { id: 5, title: 'Guest', ordering: 1, rules: [9] },
    { id: 6, title: 'Super Users', ordering: 4, rules: [8] },
];

const TEMPLATE_STYLES = [
    {
        id: 10,
        template: 'atum',
        clientId: 1,
        home: '1',
        title: 'Atum - Default',
        inheritable: 1,
        parent: '',
        params: {
            hue: 'hsl(214, 63%, 20%)',
            'bg-light': '#f0f4fb',
            'text-dark': '#495057',
            'text-light': '#ffffff',
            'link-color': '#2a69b8',
            'special-color': '#001b4c',
            colorScheme: 'os',
            monochrome: '0',
        },
    },
    {
        id: 11,
        template: 'cassiopeia',
        clientId: 0,
        home: '1',
        title: 'Cassiopeia - Default',
        inheritable: 1,
        parent: '',
        params: {
            brand: '1',
            useFontScheme: '0',
            colorName: 'colors_standard',
            fluidContainer: '0',
            stickyHeader: 0,
            backTop: 0,
        },
    },
];

type ExtensionSeed = {
    name: string;
    type: string;
    element: string;
    clientId: number;
    enabled: boolean;
    access: number;
    protected: boolean;
    locked: boolean;
    params?: Record<string, unknown>;
};

// Only the extensions that actually exist under src/cms — not the full stock Joomla registry.
const EXTENSIONS: ExtensionSeed[] = [
    {
        name: 'com_content',
        type: 'component',
        element: 'com_content',
        clientId: 1,
        enabled: true,
        access: 0,
        protected: true,
        locked: true,
    },
    {
        name: 'com_login',
        type: 'component',
        element: 'com_login',
        clientId: 1,
        enabled: true,
        access: 1,
        protected: true,
        locked: true,
    },
    {
        name: 'com_cpanel',
        type: 'component',
        element: 'com_cpanel',
        clientId: 1,
        enabled: true,
        access: 1,
        protected: true,
        locked: true,
    },
    {
        name: 'com_templates',
        type: 'component',
        element: 'com_templates',
        clientId: 1,
        enabled: true,
        access: 1,
        protected: true,
        locked: true,
    },
    {
        name: 'mod_login',
        type: 'module',
        element: 'mod_login',
        clientId: 0,
        enabled: true,
        access: 1,
        protected: false,
        locked: true,
    },
    {
        name: 'mod_login',
        type: 'module',
        element: 'mod_login',
        clientId: 1,
        enabled: true,
        access: 1,
        protected: false,
        locked: true,
    },
    {
        name: 'mod_frontend',
        type: 'module',
        element: 'mod_frontend',
        clientId: 1,
        enabled: true,
        access: 1,
        protected: false,
        locked: true,
    },
    {
        name: 'mod_loginsupport',
        type: 'module',
        element: 'mod_loginsupport',
        clientId: 1,
        enabled: true,
        access: 1,
        protected: false,
        locked: true,
    },
    {
        name: 'mod_version',
        type: 'module',
        element: 'mod_version',
        clientId: 1,
        enabled: true,
        access: 1,
        protected: false,
        locked: true,
        params: { cache: '0' },
    },
    { name: 'atum', type: 'template', element: 'atum', clientId: 1, enabled: true, access: 1, protected: false, locked: true },
    {
        name: 'cassiopeia',
        type: 'template',
        element: 'cassiopeia',
        clientId: 0,
        enabled: true,
        access: 1,
        protected: false,
        locked: true,
        params: {
            brand: '1',
            useFontScheme: '0',
            colorName: 'colors_standard',
            fluidContainer: '0',
            stickyHeader: 0,
            backTop: 0,
        },
    },
];

async function resetSerial(table: 'assets' | 'usergroups' | 'viewlevels' | 'template_styles', column: string) {
    await db.execute(
        sql`select setval(pg_get_serial_sequence(${table}, ${column}), coalesce((select max(${sql.identifier(column)}) from ${sql.identifier(table)}), 1))`,
    );
}

async function seedExtensions() {
    for (const extension of EXTENSIONS) {
        const [existing] = await db
            .select({ extensionId: extensionsTable.extensionId })
            .from(extensionsTable)
            .where(
                and(
                    eq(extensionsTable.element, extension.element),
                    eq(extensionsTable.type, extension.type),
                    eq(extensionsTable.clientId, extension.clientId),
                ),
            );

        if (existing) continue;

        await db.insert(extensionsTable).values({
            name: extension.name,
            type: extension.type,
            element: extension.element,
            folder: '',
            clientId: extension.clientId,
            enabled: extension.enabled,
            access: extension.access,
            protected: extension.protected,
            locked: extension.locked,
            params: extension.params ?? {},
            customData: '',
        });
    }
}

async function seed() {
    await db
        .insert(assetsTable)
        .values({ id: 1, parentId: 0, lft: 1, rgt: 2, level: 0, name: 'root.1', title: 'Root Asset', rules: ROOT_ASSET_RULES })
        .onConflictDoNothing({ target: assetsTable.id });
    await resetSerial('assets', 'id');

    await db.insert(userGroupsTable).values(USER_GROUPS).onConflictDoNothing({ target: userGroupsTable.id });
    await resetSerial('usergroups', 'id');

    await db.insert(viewLevelsTable).values(VIEW_LEVELS).onConflictDoNothing({ target: viewLevelsTable.id });
    await resetSerial('viewlevels', 'id');

    await db.insert(templateStyles).values(TEMPLATE_STYLES).onConflictDoNothing({ target: templateStyles.id });
    await resetSerial('template_styles', 'id');

    await seedExtensions();

    // Left empty on purpose — the installer fills this in and that's what flips the "is installed" check.
    await db
        .insert(cmsConfigTable)
        .values({ key: 'global-config', params: {} })
        .onConflictDoNothing({ target: cmsConfigTable.key });

    console.log('Seed complete');
}

seed()
    .then(() => process.exit(0))
    .catch(err => {
        console.error('[seed] failed', err);
        process.exit(1);
    });
