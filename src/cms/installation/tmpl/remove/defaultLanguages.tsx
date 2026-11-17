'use client';

import { useInstallationContext } from '@/cms/installation';

import JText from '@/libraries/shared/components/Text';
import { Button } from '@/libraries/shared/shadcn/ui/button';
import { Input } from '@/libraries/shared/shadcn/ui/input';
import { Label } from '@/libraries/shared/shadcn/ui/label';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/libraries/shared/shadcn/ui/table';

const InstlDefaultLanguages = () => {
    const {
        languageModel: { installedLanguages },
    } = useInstallationContext();

    return (
        <div className="flex flex-col gap-4">
            <Table>
                <TableCaption>
                    <JText text="INSTL_DEFAULTLANGUAGE_DESC" />
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <JText text="INSTL_DEFAULTLANGUAGE_COLUMN_HEADER_SELECT" />
                        </TableHead>
                        <TableHead>
                            <JText text="INSTL_DEFAULTLANGUAGE_COLUMN_HEADER_LANGUAGE" />
                        </TableHead>
                        <TableHead>
                            <JText text="INSTL_DEFAULTLANGUAGE_COLUMN_HEADER_TAG" />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {installedLanguages.administrator?.map((lang, i) => (
                        <TableRow key={`admin-language-${lang.name}`}>
                            <TableCell>
                                <Input
                                    type="radio"
                                    name="administratorlang"
                                    id={`admin-language-cb${i}`}
                                    value={lang.language}
                                    className="size-4"
                                    checked={lang.published}
                                />
                            </TableCell>
                            <TableCell>
                                <Label htmlFor={`admin-language-cb${i}`}>{lang.name}</Label>
                            </TableCell>
                            <TableCell>{lang.language}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Table>
                <TableCaption>
                    <JText text="INSTL_DEFAULTLANGUAGE_DESC_FRONTEND" />
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <JText text="INSTL_DEFAULTLANGUAGE_COLUMN_HEADER_SELECT" />
                        </TableHead>
                        <TableHead>
                            <JText text="INSTL_DEFAULTLANGUAGE_COLUMN_HEADER_LANGUAGE" />
                        </TableHead>
                        <TableHead>
                            <JText text="INSTL_DEFAULTLANGUAGE_COLUMN_HEADER_TAG" />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {installedLanguages.administrator?.map((lang, i) => (
                        <TableRow key={`site-language-${lang.name}`}>
                            <TableCell>
                                <Input
                                    type="radio"
                                    name="frontendlang"
                                    id={`site-language-cb${i}`}
                                    value={lang.language}
                                    className="size-4"
                                    checked={lang.published}
                                />
                            </TableCell>
                            <TableCell>
                                <Label htmlFor={`site-language-cb${i}`}>{lang.name}</Label>
                            </TableCell>
                            <TableCell>{lang.language}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Button>
                <JText text="INSTL_DEFAULTLANGUAGE_SET_DEFAULT_LANGUAGE" />
            </Button>
        </div>
    );
};

export default InstlDefaultLanguages;
