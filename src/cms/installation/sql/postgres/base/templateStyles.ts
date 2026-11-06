'use server';

import { db, templateStyles } from '@/libraries/services/database';

import { resetSerial } from '../../resetSerial';

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
            loginLogo: '',
            loginLogoAlt: '',
            logoBrandLarge: '',
            logoBrandLargeAlt: '',
            logoBrandSmall: '',
            logoBrandSmallAlt: '',
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
            logoFile: '',
            siteTitle: '',
            siteDescription: '',
            useFontScheme: '0',
            colorName: 'colors_standard',
            fluidContainer: '0',
            stickyHeader: 0,
            backTop: 0,
        },
    },
    {
        id: 12,
        template: 'cassiopeia_extended',
        clientId: 0,
        home: '0',
        title: 'Cassiopeia Extended - Default',
        inheritable: 0,
        parent: 'cassiopeia',
        params: {
            brand: '1',
            logoFile: '',
            siteTitle: '',
            siteDescription: '',
            useFontScheme: '0',
            systemFontBody: '',
            systemFontHeading: '',
            colorName: 'colors_standard',
            fluidContainer: '0',
            stickyHeader: '0',
            backTop: '0',
            colorSettings: '0',
            headerbg: 'rgb(193, 205, 207)',
            headercolor: 'rgb(23, 23, 23)',
            bodybg: 'rgb(254, 254, 254)',
            bodycolor: 'rgb(23, 23, 23)',
            linkcolor: 'rgb(29, 121, 137)',
            linkcolorh: 'rgb(14, 59, 67)',
            btnbg: 'rgb(206, 60, 55)',
            btnbgh: 'rgb(131, 35, 32)',
            btncolor: 'rgb(254, 254, 254)',
            btncolorh: 'rgb(254, 254, 254)',
            footerbg: 'rgb(29, 121, 137)',
            footercolor: 'rgb(254, 254, 254)',
            fontSettings: '0',
            bodysize: '1',
            h1size: '2',
            h2size: '1.7',
            h3size: '1.5',
        },
    },
];

export const seedTemplateStyles = async () => {
    try {
        await db.insert(templateStyles).values(TEMPLATE_STYLES);
        await resetSerial('template_styles', 'id');

        return { success: true };
    } catch (error) {
        return { success: false, message: error instanceof Error ? error.message : String(error) };
    }
};
