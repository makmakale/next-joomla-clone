import { AlertTriangleIcon, InfoIcon } from 'lucide-react';

import { Alert, AlertAction, AlertDescription, AlertTitle } from '@/libraries/shared/shadcn/ui/alert';
import { Button } from '@/libraries/shared/shadcn/ui/button';
import { useAlert } from '@/libraries/src/Alert/Alert';

export interface JIncludeMessageType {
    type: 'message';
}

export function JIncludeMessage() {
    const { message, clearMessage } = useAlert();

    if (!message) return null;

    return (
        <Alert variant={message.type}>
            {message.type === 'info' && <InfoIcon />}
            {message.type === 'warning' && <AlertTriangleIcon />}
            {message.type === 'error' && <AlertTriangleIcon />}

            <AlertTitle>{message.title}</AlertTitle>

            {Array.isArray(message.description) ? (
                <ul>
                    {message.description.map((m, i) => (
                        <li key={i}>{m}</li>
                    ))}
                </ul>
            ) : (
                <AlertDescription>{message.description}</AlertDescription>
            )}

            <AlertAction>
                <Button variant="ghost" size="icon" onClick={clearMessage}>
                    <i className="fa-solid fa-xmark" />
                </Button>
            </AlertAction>
        </Alert>
    );
}
