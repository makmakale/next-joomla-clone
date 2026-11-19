'use client';

import { cn } from 'cn';

import { useInstallationContext } from '@/cms/installation';
import { InstallationView, SetupSteps } from '@/cms/installation';

import JIcon from '@/libraries/shared/components/Icon';
import JText from '@/libraries/shared/components/Text';
import { Button } from '@/libraries/shared/shadcn/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/libraries/shared/shadcn/ui/card';
import { Progress, ProgressLabel, ProgressValue } from '@/libraries/shared/shadcn/ui/progress';
import { useApplication } from '@/libraries/src/Application';
import JForm from '@/libraries/src/Form/Form';
import FormField from '@/libraries/src/Form/FormField';

import LanguageSelect from './components/languageSelect';

const Setup = () => {
    const {
        setupModel: { stepsForm, onSubmit, step, goToStep, progressBar },
    } = useInstallationContext();
    const { getInput } = useApplication();

    const input = getInput();
    const view = input.get('view');

    return (
        <div className={cn({ hidden: view !== InstallationView.Setup })}>
            <JForm form={stepsForm} onSubmit={stepsForm.handleSubmit(onSubmit)}>
                <div className={cn('space-y-6', { hidden: step !== SetupSteps.Step1 })}>
                    <LanguageSelect />

                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <JIcon icon="cog" className="me-1" />
                                <JText text="INSTL_SETUP_SITE_NAME" />
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <FormField name="site_name" />
                        </CardContent>

                        <CardFooter>
                            <Button size="lg" className="w-full" onClick={() => goToStep(SetupSteps.Step2)}>
                                <JText text="INSTL_SETUP_LOGIN_DATA" />
                                <JIcon icon="chevron-right" />
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                <Card className={cn({ hidden: step !== SetupSteps.Step2 })}>
                    <CardHeader>
                        <CardTitle>
                            <JIcon icon="lock" className="me-1" />
                            <JText text="INSTL_LOGIN_DATA" />
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <FormField name="admin_user" />
                        <FormField name="admin_username" />
                        <FormField name="admin_password" />
                        <FormField name="admin_email" />
                    </CardContent>

                    <CardFooter>
                        <Button type="submit" size="lg" className="w-full">
                            <JText text="INSTL_INSTALL_JOOMLA" />
                            <JIcon icon="chevron-right" />
                        </Button>
                    </CardFooter>
                </Card>

                <Card className={cn({ hidden: step !== SetupSteps.Install })}>
                    <CardHeader>
                        <CardTitle>
                            <JIcon icon="cogs" className="me-1" />
                            <JText text="INSTL_PROGRESS" />
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <Progress {...progressBar} className="w-full">
                            <ProgressLabel>
                                <JText text="INSTL_IN_PROGRESS" />
                            </ProgressLabel>
                            <ProgressValue />
                        </Progress>
                    </CardContent>
                </Card>
            </JForm>
        </div>
    );
};

export default Setup;
