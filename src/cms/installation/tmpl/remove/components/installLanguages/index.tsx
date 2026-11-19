'use client';

import { cn } from 'cn';

import { RemoveSteps, useInstallationContext } from '@/cms/installation';

import JIcon from '@/libraries/shared/components/Icon';
import JText from '@/libraries/shared/components/Text';
import { Badge } from '@/libraries/shared/shadcn/ui/badge';
import { Button } from '@/libraries/shared/shadcn/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/libraries/shared/shadcn/ui/card';
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

import { NoInternet } from './noInternet';

const InstallAdditionalLanguages = () => {
    const {
        setupModel: { step },
        languageModel: { items },
    } = useInstallationContext();

    return (
        <Card className={cn({ hidden: step !== RemoveSteps.Languages })}>
            <CardHeader>
                <CardTitle>
                    <JIcon icon="comment-dots" className="me-1" />
                    <JText text="INSTL_LANGUAGES" />
                </CardTitle>
            </CardHeader>

            <CardContent className="pt-6">
                {!items.length ? (
                    <NoInternet />
                ) : (
                    <Table className="caption-top">
                        <TableCaption className="text-left">
                            <JText text="INSTL_LANGUAGES_DESC" />
                        </TableCaption>

                        <TableHeader>
                            <TableRow>
                                <TableHead className="invisible w-0">
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
            </CardContent>

            <CardFooter>
                <div className="grid w-full gap-2">
                    <Button id="installLanguagesButton">
                        <JText text="INSTL_LANGUAGES_SELECTED" />
                    </Button>
                    <Button id="skipLanguages" variant="secondary">
                        <JText text="JSKIP" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default InstallAdditionalLanguages;
