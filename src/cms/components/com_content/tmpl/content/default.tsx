import { Card, CardContent, CardHeader, CardTitle } from '@/libraries/shared/shadcn/ui/card';

export default function Home() {
    return (
        <div className="space-y-4 py-6">
            <Card>
                <CardHeader>
                    <CardTitle>Aemeath — Let the Hands Reach Again | Wuthering Waves</CardTitle>
                </CardHeader>
                <CardContent>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/3-CLwrav8ic?si=R665L6QG-FlqUqaV"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                </CardContent>
            </Card>
        </div>
    );
}
