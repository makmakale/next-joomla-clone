'use client';

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
};

const Select = ({ items, name, value, onChange, invalid }: SelectProps) => {
    return (
        <UISelect items={items} name={name} value={value} onValueChange={onChange}>
            <SelectTrigger id={name} className="w-full" aria-invalid={invalid}>
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
