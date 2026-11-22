'use client';

import { useLanguageContext } from '@/libraries/src/Language';

const Demo = () => {
    const { changeLang } = useLanguageContext();

    return (
        <div>
            <h1>Site</h1>

            <button onClick={() => changeLang('en-GB')}>change</button>
        </div>
    );
};

export default Demo;
