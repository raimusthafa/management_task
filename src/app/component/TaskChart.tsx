"use client";

import { Card } from "./ui/card";
import { Task } from "@/app/page";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

interface TaskChartProps {
  tasks: Task[];
}

export default function TaskChart({ tasks }: TaskChartProps) {
  const progressRanges = [
    { name: "0-25%", range: [0, 25], count: 0 },
    { name: "26-50%", range: [26, 50], count: 0 },
    { name: "51-75%", range: [51, 75], count: 0 },
    { name: "76-99%", range: [76, 99], count: 0 },
    { name: "100%", range: [100, 100], count: 0 },
  ];

  tasks.forEach((task) => {
    const range = progressRanges.find(
      (r) => task.progress >= r.range[0] && task.progress <= r.range[1]
    );
    if (range) {
      range.count++;
    }
  });

  const chartData = progressRanges.map((range) => ({
    name: range.name,
    tasks: range.count,
  }));

  return (
    <Card className="p-6 bg-white border-[#dbdbdb]">
      <h3 className="text-lg font-semibold mb-4 text-[#8c0327]">Tasks by Progress Range</h3>
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis
              dataKey="name"
              stroke="#8c0327"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#8c0327"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f1f1f1",
                border: "1px solid #dbdbdb",
                borderRadius: "4px",
              }}
              labelStyle={{ color: "#8c0327" }}
            />
            <Bar
              dataKey="tasks"
              fill="#d85251"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
