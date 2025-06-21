import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/Components/ui/chart';

export function BarChartCustom({ title, year, chartData }) {
    const chartConfig = {
        pemasukan: {
            label: 'pemasukan',
            color: 'hsl(var(--chart-1))',
        },
        pengeluaran: {
            label: 'pengeluaran',
            color: 'hsl(var(--chart-2))',
        },
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>Periode Januari - Desember {year}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                        <Bar dataKey="pemasukan" fill="var(--color-pemasukan)" radius={10} />
                        <Bar dataKey="pengeluaran" fill="var(--color-pengeluaran)" radius={10} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
