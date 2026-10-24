import { Alert, AlertDescription, AlertTitle } from '@/libraries/shared/shadcn/ui/alert';
import { AlertCircleIcon } from 'lucide-react';

export const TemplateNoFound = () => {
    return (
        <div className="container mx-auto flex h-screen grow items-center justify-center px-4 py-8">
            <Alert variant="destructive" className="max-w-md">
                <AlertCircleIcon />
                <AlertTitle>Not Found</AlertTitle>
                <AlertDescription>Template not found</AlertDescription>
            </Alert>
        </div>
    );
};
