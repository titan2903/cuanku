import { LabelList, Pie, PieChart } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/Components/ui/chart';

export function PieChartCustom({ title, year, budgets, chartConfig }) {
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>{title}</CardTitle>
                <CardDescription>Periode Januari - Desember {year}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer config={chartConfig} className="mx-auto aspect-square">
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent nameKey="type" hideLabel />} />
                        <Pie data={budgets} dataKey="nominals" fontSize={12} nameKey="type">
                            <LabelList dataKey="type" className="fill-background" stroke="none" fontSize={12} />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
