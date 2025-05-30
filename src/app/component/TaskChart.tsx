"use client";

import { Card } from "./ui/card";
import ReactECharts from "echarts-for-react";
import { Task } from "@/app/page";
import { useState } from "react";
import { Label } from "./ui/label";

interface TaskChartProps {
  tasks: Task[];
}

const progressRanges = [
  { name: "Just Started", range: [0, 25], value: 0 },
  { name: "Making Progress", range: [26, 50], value: 0 },
  { name: "Halfway There", range: [51, 75], value: 0 },
  { name: "Nearly Done", range: [76, 99], value: 0 },
  { name: "All Done!", range: [100, 100], value: 0 },
];

const colors = [
  { color: "#ef4444", name: "Just Started" },
  { color: "#f97316", name: "Making Progress" },
  { color: "#eab308", name: "Halfway There" },
  { color: "#10b981", name: "Nearly Done" },
  { color: "#3b82f6", name: "All Done!" },
];

export default function TaskChart({ tasks }: TaskChartProps) {
  const [chartType, setChartType] = useState("donut");

  const updatedRanges = progressRanges.map((range) => {
    const value = tasks.filter(
      (task) => task.progress >= range.range[0] && task.progress <= range.range[1]
    ).length;
    const color = colors.find((c) => c.name === range.name)?.color || "#999";
    return { ...range, value, itemStyle: { color } };
  });

  const totalTasks = updatedRanges.reduce((acc, cur) => acc + cur.value, 0);

  const chartOptions: Record<string, object> = {
    donut: {
      title: {
        text: totalTasks > 0 ? "Task Progress" : "No Task Data",
        left: "center",
        top: 10,
        textStyle: { fontSize: 16, fontWeight: 600, color: "#1f2937" },
      },
      tooltip: {
        trigger: "item",
        formatter: (params: { name: string; value: number; percent: number }) => `
          <strong>${params.name}</strong><br/>Tasks: ${params.value}<br/>Progress: ${params.percent}%`
      },
      legend: {
        orient: "horizontal",
        bottom: 0,
        textStyle: { fontSize: 12, color: "#6b7280" },
      },
      series: [
        {
          name: "Progress",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: { borderRadius: 10, borderColor: "#fff", borderWidth: 2 },
          label: { show: true, formatter: "{b} ({d}%)", fontSize: 12 },
          emphasis: { label: { show: true, fontSize: 16, fontWeight: "bold" } },
          animationEasing: "cubicOut",
          animationDuration: 800,
          data: updatedRanges,
        },
      ],
    },
    bar: {
      title: { text: "Tasks by Progress", left: "center", top: 10 },
      xAxis: {
        type: "category",
        data: updatedRanges.map((d) => d.name),
        axisLabel: { rotate: 20 },
      },
      yAxis: { type: "value" },
      tooltip: {},
      series: [
        {
          data: updatedRanges.map((d) => ({ value: d.value, itemStyle: d.itemStyle })),
          type: "bar",
          barWidth: 40,
        },
      ],
    },
    line: {
      title: { text: "Progress Trend", left: "center", top: 10 },
      tooltip: { trigger: "axis" },
      xAxis: {
        type: "category",
        data: updatedRanges.map((d) => d.name),
      },
      yAxis: { type: "value" },
      series: [
        {
          data: updatedRanges.map((d) => d.value),
          type: "line",
          smooth: true,
          symbol: "circle",
          itemStyle: { color: "#6366f1" },
          areaStyle: {},
        },
      ],
    },
    radar: {
      tooltip: {},
      radar: {
        indicator: updatedRanges.map((d) => ({ name: d.name, max: Math.max(...updatedRanges.map(r => r.value)) + 1 })),
      },
      series: [
        {
          name: "Progress Radar",
          type: "radar",
          data: [
            {
              value: updatedRanges.map((d) => d.value),
              name: "Tasks",
              areaStyle: { color: "rgba(59, 130, 246, 0.4)" },
              itemStyle: { color: "#3b82f6" },
            },
          ],
        },
      ],
    },
    treemap: {
      tooltip: {},
      series: [
        {
          type: "treemap",
          data: updatedRanges.map((d) => ({ name: d.name, value: d.value, itemStyle: d.itemStyle })),
          roam: false,
          label: {
            show: true,
            formatter: "{b}: {c}",
          },
        },
      ],
    },
  };

  return (
    <Card className="p-6 bg-white border-[#e5e7eb] shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#1f2937]">Task Progress Overview</h3>
        <div className="flex items-center gap-2">
          <Label htmlFor="chartType" className="text-sm text-gray-700">Chart</Label>
          <select
            id="chartType"
            className="border border-gray-300 rounded-md px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
          >
            <option value="donut">Donut</option>
            <option value="bar">Bar</option>
            <option value="line">Line</option>
            <option value="radar">Radar</option>
            <option value="treemap">Treemap</option>
          </select>
        </div>
      </div>
      <div className="h-[320px] w-full">
        <ReactECharts
          option={chartOptions[chartType]}
          style={{ height: "100%", width: "100%" }}
          notMerge={true}
          lazyUpdate={true}
          theme="default"
        />
      </div>
    </Card>
  );
}
