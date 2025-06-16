
import React from "react";
import { Bar, BarChart, CartesianGrid, ReferenceLine, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";

const braceGoal = 18; // User's bracing goal - hardcoded for now

const chartData = [
  { day: "Mon", hours: 14 },
  { day: "Tue", hours: 15 },
  { day: "Wed", hours: 18 },
  { day: "Thu", hours: 18 },
  { day: "Fri", hours: 17 },
  { day: "Sat", hours: 16 },
  { day: "Sun", hours: 19 },
].map(item => {
  let fill;
  if (item.hours >= braceGoal) {
    fill = "var(--color-goal-met)";
  } else if (item.hours >= braceGoal - 2) {
    fill = "var(--color-close)";
  } else {
    fill = "var(--color-below)";
  }
  return { ...item, fill };
});

const chartConfig = {
  hours: {
    label: "Hours",
  },
  "goal-met": {
    label: "Goal Met",
    color: "#6BAFB2",
  },
  close: {
    label: "Close",
    color: "#F5E2AE",
  },
  below: {
    label: "Below Goal",
    color: "#DCC1BA",
  },
  goal: {
    label: "Goal",
    color: "#3166A3",
  },
} satisfies ChartConfig;

const CustomLegend = () => (
  <div className="flex justify-center items-center gap-x-3 sm:gap-x-6 mt-3 sm:mt-4 text-xs sm:text-sm flex-wrap">
    {Object.entries(chartConfig)
      .filter((entry): entry is [string, { label: string; color: string }] => 'color' in entry[1])
      .map(([key, config]) => {
        const isGoal = key === 'goal';

        return (
          <div key={key} className="flex items-center gap-1 sm:gap-1.5">
            {isGoal ? (
              <div className="w-2 sm:w-3 border-t-2 border-dashed" style={{ borderColor: config.color }} />
            ) : (
              <div
                className="w-2 h-2 sm:w-2.5 sm:h-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: config.color }}
              />
            )}
            <span className="text-muted-foreground">{config.label}</span>
          </div>
        );
      })}
  </div>
);

const BraceTimeChart = () => {
  const totalHours = chartData.reduce((acc, item) => acc + item.hours, 0);
  const averageHours = (totalHours / chartData.length).toFixed(1);

  return (
    <React.Fragment>
      <div className="flex flex-row items-baseline gap-2 mb-3 sm:mb-4">
        <p className="text-2xl sm:text-3xl font-bold tracking-tight">{averageHours}</p>
        <p className="text-xs sm:text-sm text-muted-foreground">average hours/day</p>
      </div>
      <ChartContainer config={chartConfig} className="min-h-[200px] sm:min-h-[250px] w-full">
        <BarChart accessibilityLayer data={chartData} margin={{ top: 20, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            tickMargin={8}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
            fontSize={12}
          />
          <YAxis
            dataKey="hours"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            domain={[0, 24]}
            ticks={[0, 6, 12, 18, 24]}
            fontSize={12}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <ReferenceLine
            y={braceGoal}
            stroke="#3166A3"
            strokeDasharray="3 3"
          />
          <Bar dataKey="hours" radius={[6, 6, 0, 0]} maxBarSize={24} />
        </BarChart>
      </ChartContainer>
      <CustomLegend />
    </React.Fragment>
  );
};

export default BraceTimeChart;
