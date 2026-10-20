import { Alert, AlertDescription, AlertTitle } from '@/libraries/shared/shadcn/ui/alert';
import { useCMSApplication } from '@/libraries/src/Application/CMSApplication';
import { AlertCircleIcon } from 'lucide-react';

export const TemplateNoFound = () => {
    const { name, template } = useCMSApplication();

    return (
        <div className="container mx-auto flex h-screen grow items-center justify-center px-4 py-8">
            <Alert variant="destructive" className="max-w-md">
                <AlertCircleIcon />
                <AlertTitle>Not Found</AlertTitle>
                <AlertDescription>
                    {template ? (
                        <>
                            Template <code>{template.template}</code> was not found in{' '}
                            <code>
                                {name}/templates/{template.template}
                            </code>{' '}
                            folder
                        </>
                    ) : (
                        'No template were found'
                    )}
                </AlertDescription>
            </Alert>
        </div>
    );
};
