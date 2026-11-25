import JInclude from '@/libraries/shared/components/include';
import { Card, CardContent, CardHeader, CardTitle } from '@/libraries/shared/shadcn/ui/card';

const Atum = () => {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-r from-indigo-400 to-cyan-400 p-6">
            <Card className="w-full flex-1 py-0">
                <CardHeader>
                    <CardTitle>Cpanel</CardTitle>
                </CardHeader>

                <CardContent className="flex-1">
                    <div className="flex w-full flex-1 flex-col items-center justify-center">
                        <main className="w-full max-w-160 flex-1 space-y-6 py-4">
                            <JInclude type="component" />
                        </main>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Atum;
