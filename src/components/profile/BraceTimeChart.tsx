
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
    label: "Close to Goal",
    color: "#F5E2AE",
  },
  below: {
    label: "Below Goal",
    color: "#DCC1BA",
  },
} satisfies ChartConfig;

const BraceTimeChart = () => {
  return (
    <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
      <BarChart accessibilityLayer data={chartData} margin={{ top: 20, right: 10, left: -10, bottom: 5 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          dataKey="hours"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          domain={[0, 24]}
          ticks={[0, 6, 12, 18, 24]}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <ReferenceLine
          y={braceGoal}
          label={{ value: 'Goal', position: 'insideTopRight', fill: 'hsl(var(--muted-foreground))', fontSize: 12, dy: -5 }}
          stroke="hsl(var(--border))"
          strokeDasharray="3 3"
        />
        <Bar dataKey="hours" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
};

export default BraceTimeChart;
