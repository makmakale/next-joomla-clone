import { AlertCircleIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/libraries/shared/shadcn/ui/alert';

export const ModuleNotFound = ({ moduleName, layout }: { moduleName: string; layout: string }) => {
    return (
        <Alert variant="destructive" className="dark:bg-card bg-red-50">
            <AlertCircleIcon />
            <AlertTitle>Not Found</AlertTitle>
            <AlertDescription>
                <code>
                    {moduleName}/tmpl/{layout}.tsx
                </code>
            </AlertDescription>
        </Alert>
    );
};
