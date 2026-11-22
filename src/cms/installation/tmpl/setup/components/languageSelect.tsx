'use client';

import { useState } from 'react';

import { useInstallationContext } from '@/cms/installation';

import JIcon from '@/libraries/shared/components/Icon';
import JText from '@/libraries/shared/components/Text';
import { Button } from '@/libraries/shared/shadcn/ui/button';
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '@/libraries/shared/shadcn/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/libraries/shared/shadcn/ui/dialog';
import { FieldGroup, FieldLegend } from '@/libraries/shared/shadcn/ui/field';
import FormField from '@/libraries/src/Form/FormField';
import { useLanguageContext } from '@/libraries/src/Language';

const LanguageSelect = () => {
    const { languageOptions } = useInstallationContext();
    const { changeLang } = useLanguageContext();
    const { metadata } = useLanguageContext();

    const [open, setOpen] = useState(false);

    const onChange = (lang: string) => {
        changeLang(lang);
        setOpen(false);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <JIcon icon="globe" className="me-1" />
                    <JText text="INSTL_SELECTED_INSTALL_LANGUAGE" />
                </CardTitle>

                {metadata ? (
                    <CardDescription>
                        <div className="font-bold">
                            {metadata?.name} | {metadata?.nativeName}
                        </div>
                    </CardDescription>
                ) : null}

                <CardAction>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger
                            render={
                                <Button size="sm">
                                    <JIcon icon="repeat" />
                                    <JText text="INSTL_CHANGE_INSTALL_LANG_SHORT" />
                                </Button>
                            }
                        />
                        <DialogContent>
                            <DialogHeader>
                                <FieldLegend>
                                    <JIcon icon="language" className="me-1" />
                                    <JText text="INSTL_SELECT_INSTALL_LANG" />
                                </FieldLegend>
                                <FieldGroup>
                                    <FormField name="language" params={{ items: languageOptions, onChange }} />
                                </FieldGroup>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </CardAction>
            </CardHeader>
        </Card>
    );
};

export default LanguageSelect;
