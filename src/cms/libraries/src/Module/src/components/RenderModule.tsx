import { Card, CardContent, CardHeader, CardTitle } from '@/libraries/shared/shadcn/ui/card';

export const RenderModule = <
    T extends
        | {
              id: number;
              title: string;
              module: string;
              position: string;
              content?: string | null;
              showTitle: boolean;
              params: unknown;
          }
        | null
        | undefined,
>({
    module,
}: {
    module: T;
}) => {
    if (!module) return null;

    const { title, showTitle } = module;

    return (
        <Card>
            {showTitle && (
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
            )}
            <CardContent>
                <div>
                    <pre>{JSON.stringify(module, null, 2)}</pre>
                </div>
            </CardContent>
        </Card>
    );
};
