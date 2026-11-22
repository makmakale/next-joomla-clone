'use client';

import { useMemo, useState } from 'react';

import { cn } from 'cn';

import { RemoveSteps, useInstallationContext } from '@/cms/installation';

import JIcon from '@/libraries/shared/components/Icon';
import JText from '@/libraries/shared/components/Text';
import { Badge } from '@/libraries/shared/shadcn/ui/badge';
import { Button } from '@/libraries/shared/shadcn/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/libraries/shared/shadcn/ui/card';
import { Checkbox } from '@/libraries/shared/shadcn/ui/checkbox';
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
import Version from '@/libraries/src/Version';

import { NoInternet } from './noInternet';

const InstallAdditionalLanguages = () => {
    const {
        removeModel: { step, goToStep },
        languageModel: { items, installLanguages },
    } = useInstallationContext();

    const rows = useMemo(() => items.filter(item => new RegExp(/^pkg_([a-z]{2,3}-[A-Z]{2})$/).test(item.element)), [items]);

    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

    const handleSelectRow = (id: number, checked: boolean) => {
        const newSelected = new Set(selectedRows);
        if (checked) {
            newSelected.add(id);
        } else {
            newSelected.delete(id);
        }
        setSelectedRows(newSelected);
    };

    return (
        <Card className={cn({ hidden: step !== RemoveSteps.Languages })}>
            <CardHeader>
                <CardTitle>
                    <JIcon icon="comment-dots" className="me-1" />
                    <JText text="INSTL_LANGUAGES" />
                </CardTitle>
            </CardHeader>

            <CardContent>
                {!items.length ? (
                    <NoInternet />
                ) : (
                    <Table className="caption-top">
                        <TableCaption className="text-left">
                            <JText text="INSTL_LANGUAGES_DESC" />
                        </TableCaption>

                        <TableHeader>
                            <TableRow>
                                <TableHead className="invisible max-w-0 overflow-hidden">
                                    <JText text="INSTL_LANGUAGES_COLUMN_HEADER_LANGUAGE_SELECT" />
                                </TableHead>
                                <TableHead>
                                    <JText text="INSTL_LANGUAGES_COLUMN_HEADER_LANGUAGE" />
                                </TableHead>
                                <TableHead>
                                    <JText text="INSTL_LANGUAGES_COLUMN_HEADER_LANGUAGE_TAG" />
                                </TableHead>
                                <TableHead className="text-center">
                                    <JText text="INSTL_LANGUAGES_COLUMN_HEADER_VERSION" />
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {rows.map(language => {
                                const langCode = language.element.replace('pkg_', '');

                                const version = new Version();
                                const currentShortVersion = version.getShortVersion().replace(/^([\d.]+)(|.*)$/, '$1');

                                const isNotPlatform =
                                    language.version.substring(0, 3) !== `${version.MAJOR_VERSION}.${version.MINOR_VERSION}` ||
                                    language.version.substring(0, 5) !== currentShortVersion;

                                return (
                                    <TableRow key={language.updateId}>
                                        <TableCell>
                                            <Checkbox
                                                id={`cb${language.updateId}`}
                                                checked={selectedRows.has(language.updateId)}
                                                onCheckedChange={checked => handleSelectRow(language.updateId, checked)}
                                                disabled={selectedRows.size === 3 && !selectedRows.has(language.updateId)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Label htmlFor={`cb${language.updateId}`}>{language.name}</Label>
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
            </CardContent>

            <CardFooter>
                <div className="grid w-full gap-2">
                    <Button id="installLanguagesButton" disabled onClick={() => installLanguages(Array.from(selectedRows))}>
                        TODO:
                        <JText text="INSTL_LANGUAGES_SELECTED" />
                    </Button>
                    <Button
                        id="skipLanguages"
                        variant="secondary"
                        onClick={() => {
                            setSelectedRows(new Set());
                            goToStep(RemoveSteps.Congrat);
                        }}
                    >
                        <JText text="JSKIP" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default InstallAdditionalLanguages;
