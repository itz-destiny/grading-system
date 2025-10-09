'use client';

import {Bar, BarChart, CartesianGrid, XAxis, YAxis} from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface ClassPerformanceChartProps {
  data: {
    name: string;
    average: number;
  }[];
}

const chartConfig = {
  average: {
    label: 'Class Average',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function ClassPerformanceChart({data}: ClassPerformanceChartProps) {
  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <BarChart
        accessibilityLayer
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value: string) => value.slice(0, 10) + '...'}
        />
        <YAxis
          tickFormatter={value => `${value}%`}
          domain={[0, 100]}
          width={30}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Bar dataKey="average" fill="var(--color-average)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
