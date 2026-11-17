'use client';

import { useInstallationContext } from '@/cms/installation';
import langFieldsConfig from '@/cms/installation/forms/language.json';
import { Installation } from '@/cms/installation/template/ui/installation';

import JIcon from '@/libraries/shared/components/Icon';
import JText from '@/libraries/shared/components/Text';
import { Button } from '@/libraries/shared/shadcn/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/libraries/shared/shadcn/ui/dialog';
import { FieldGroup, FieldLegend } from '@/libraries/shared/shadcn/ui/field';
import JForm from '@/libraries/src/Form/Form';
import FormField from '@/libraries/src/Form/FormField';
import { useLanguageContext } from '@/libraries/src/Language';

const LanguageSelect = () => {
    const {
        languageOptions,
        languageModel: { languageForm, open, setOpen },
    } = useInstallationContext();
    const { metadata } = useLanguageContext();

    return (
        <JForm id="languageForm" form={languageForm} fields={langFieldsConfig}>
            <Installation.Step>
                <FieldGroup>
                    <div className="flex items-center gap-2">
                        <div>
                            <JIcon icon="globe" className="me-1" />
                            <JText text="INSTL_SELECTED_INSTALL_LANGUAGE" />
                        </div>
                        <div className="font-bold">
                            {metadata?.name} | {metadata?.nativeName}
                        </div>
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
                                        <FormField name="language" params={{ items: languageOptions }} />
                                    </FieldGroup>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                </FieldGroup>
            </Installation.Step>
        </JForm>
    );
};

export default LanguageSelect;
