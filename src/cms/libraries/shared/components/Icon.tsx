import { cn } from '@/libraries/shared/shadcn/utils';

export type JIconProps = {
    icon: string | undefined;
    type?: 'solid' | 'regular';
    className?: string;
};

export default function JIcon({ icon, type = 'solid', className }: JIconProps) {
    const regex = new RegExp(/(fa-[a-z]+)\s(fa-[a-z]+)/);
    const _icon = !!icon && regex.test(icon) ? icon : `fa-${type} fa-${icon}`;

    if (!icon) return null;

    return (
        <div className="float-left aspect-square min-w-4 text-center">
            <i className={cn(_icon, 'leading-[inherit]', className)} aria-hidden="true" />
        </div>
    );
}
