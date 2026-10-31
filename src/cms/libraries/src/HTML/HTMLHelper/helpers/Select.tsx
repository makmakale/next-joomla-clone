'use client';

import { cn } from 'cn';

import {
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Select as UISelect,
} from '@/libraries/shared/shadcn/ui/select';

type SelectProps = {
    items: React.ComponentProps<typeof UISelect>['items'];
    name: string;
    value?: string;
    onChange: React.ComponentProps<typeof UISelect>['onValueChange'];
    invalid?: boolean;
    className?: string;
};

const Select = ({ items, name, value, onChange, invalid, className }: SelectProps) => {
    return (
        <UISelect items={items} name={name} defaultValue={value} value={value} onValueChange={onChange}>
            <SelectTrigger id={name} className={cn('w-full', className)} aria-invalid={invalid}>
                <SelectValue />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
                <SelectGroup>
                    {Array.isArray(items) &&
                        items.map(item => (
                            <SelectItem key={item.value} value={item.value.toString()}>
                                {item.label}
                            </SelectItem>
                        ))}
                </SelectGroup>
            </SelectContent>
        </UISelect>
    );
};

export default Select;
