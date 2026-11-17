'use client';

import { useState } from 'react';

import { useInstallationContext } from '@/cms/installation';

import JIcon from '@/libraries/shared/components/Icon';
import JText from '@/libraries/shared/components/Text';
import { Badge } from '@/libraries/shared/shadcn/ui/badge';
import { Button } from '@/libraries/shared/shadcn/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/libraries/shared/shadcn/ui/dialog';
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
import { Tooltip, TooltipContent, TooltipTrigger } from '@/libraries/shared/shadcn/ui/tooltip';

const InstallAdditionalLanguages = () => {
    const [open, setOpen] = useState(false);
    const {
        languageModel: { items },
    } = useInstallationContext();

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={
                    <Button>
                        <JText text="INSTL_COMPLETE_ADD_EXTRA_LANGUAGE" />
                    </Button>
                }
            />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <JIcon icon="comment-dots" className="me-1" />
                        <JText text="INSTL_LANGUAGES" />
                    </DialogTitle>
                </DialogHeader>

                {!items.length ? (
                    <>
                        <p>
                            <JText text="INSTL_LANGUAGES_WARNING_NO_INTERNET" />
                        </p>
                        <p>
                            <Button onClick={() => setOpen(false)}>
                                <JIcon icon="arrow-left" className="me-1" />
                                <JText text="INSTL_LANGUAGES_WARNING_BACK_BUTTON" />
                            </Button>
                        </p>
                        <p>
                            <JText text="INSTL_LANGUAGES_WARNING_NO_INTERNET2" />
                        </p>
                    </>
                ) : (
                    <Table>
                        <TableCaption>
                            <JText text="INSTL_LANGUAGES_DESC" />
                        </TableCaption>

                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    <JText text="INSTL_LANGUAGES_COLUMN_HEADER_LANGUAGE_SELECT" />
                                </TableHead>
                                <TableHead>
                                    <JText text="INSTL_LANGUAGES_COLUMN_HEADER_LANGUAGE" />
                                </TableHead>
                                <TableHead>
                                    <JText text="INSTL_LANGUAGES_COLUMN_HEADER_LANGUAGE_TAG" />
                                </TableHead>
                                <TableHead>
                                    <JText text="INSTL_LANGUAGES_COLUMN_HEADER_VERSION" />
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {items
                                .filter(item => new RegExp(/^pkg_([a-z]{2,3}-[A-Z]{2})$/).test(item.element))
                                .map((language, i) => {
                                    const langCode = language.element.replace('pkg_', '');

                                    const MAJOR_VERSION = 6;
                                    const MINOR_VERSION = 0;
                                    const currentShortVersion = '6.0.3';

                                    const isNotPlatform =
                                        language.version.substring(0, 3) !== `${MAJOR_VERSION}.${MINOR_VERSION}` ||
                                        language.version.substring(0, 5) !== currentShortVersion;

                                    return (
                                        <TableRow key={i}>
                                            <TableCell>
                                                <Input
                                                    type="checkbox"
                                                    name="cid[]"
                                                    id={`cb${i}`}
                                                    value={language.updateId}
                                                    className="size-4"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Label htmlFor={`cb${i}`}>{language.name}</Label>
                                            </TableCell>
                                            <TableCell>{langCode}</TableCell>
                                            <TableCell className="text-center">
                                                {isNotPlatform ? (
                                                    <Tooltip>
                                                        <TooltipTrigger render={<Badge>{language.version}</Badge>} />
                                                        <TooltipContent>
                                                            <JText text="JGLOBAL_LANGUAGE_VERSION_NOT_PLATFORM" />
                                                        </TooltipContent>
                                                    </Tooltip>
                                                ) : (
                                                    <Badge>{language.version}</Badge>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                )}
                <div className="mt-4 mb-3 grid gap-2">
                    <Button id="installLanguagesButton">
                        <JText text="INSTL_LANGUAGES_SELECTED" />
                    </Button>
                    <Button id="skipLanguages" variant="secondary">
                        <JText text="JSKIP" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default InstallAdditionalLanguages;
