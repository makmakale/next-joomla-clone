import { LoadMessages, loadMessages } from '@/libraries/src/Language';

export default async () => {
    const messages = await loadMessages('tpl_cassiopeia');

    return <LoadMessages messages={messages} />;
};
