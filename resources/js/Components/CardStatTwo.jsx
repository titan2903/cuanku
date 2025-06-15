import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { cn } from '@/lib/utils';

export default function CardStatTwo({ data, children }) {
    const { title, description, background, className = '', icon: Icon, iconClassName = '' } = data;
    return (
        <Card className={cn(background, className)}>
            <CardHeader>
                <div className="flex flex-row items-start justify-start gap-4 space-y-0">
                    {Icon && <Icon className={cn('size-8', iconClassName)} />}
                    <div className="flex flex-col">
                        <CardTitle className="line-clamp-1 text-wrap text-xl font-semibold">{title}</CardTitle>
                        <CardDescription className="line-clamp-2 text-sm leading-relaxed text-white">
                            {description}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    );
}
