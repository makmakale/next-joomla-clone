import langFieldsConfig from '@/cms/installation/forms/language.json';
import { languages } from '@/cms/installation/language';
import { useInstTemplate } from '@/cms/installation/src/context/InstallationContext';
import { Installation } from '@/cms/installation/template/ui/installation';

import JIcon from '@/libraries/shared/components/Icon';
import { Button } from '@/libraries/shared/shadcn/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/libraries/shared/shadcn/ui/dialog';
import { FieldGroup, FieldLegend } from '@/libraries/shared/shadcn/ui/field';
import JForm from '@/libraries/src/Form/Form';
import FormField from '@/libraries/src/Form/FormField';
import { useLanguage } from '@/libraries/src/Language/Language';

export const LanguageForm = () => {
    const { languageForm, languageMeta, open, setOpen } = useInstTemplate();
    const { t } = useLanguage();

    return (
        <JForm id="languageForm" form={languageForm} fields={langFieldsConfig}>
            <Installation.Card>
                <FieldGroup>
                    <div className="flex items-center gap-2">
                        <div>
                            <JIcon icon="globe" className="me-1" />
                            {t('INSTL_SELECTED_INSTALL_LANGUAGE')}
                        </div>
                        <div className="font-bold">
                            {languageMeta.name} | {languageMeta.nativeName}
                        </div>
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger
                                render={
                                    <Button size="sm">
                                        <JIcon icon="repeat" />
                                        {t('INSTL_CHANGE_INSTALL_LANG_SHORT')}
                                    </Button>
                                }
                            />
                            <DialogContent>
                                <DialogHeader>
                                    <FieldLegend>
                                        <JIcon icon="language" className="me-1" />
                                        {t('INSTL_SELECT_INSTALL_LANG')}
                                    </FieldLegend>
                                    <FieldGroup>
                                        <FormField name="language" params={{ items: languages }} />
                                    </FieldGroup>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                </FieldGroup>
            </Installation.Card>
        </JForm>
    );
};
