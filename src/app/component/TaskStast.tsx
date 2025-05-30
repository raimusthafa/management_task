"use client";

import { Card } from "./ui/card";
import { Task } from "@/app/page";

interface TaskStatsProps {
  tasks: Task[];
}

export default function TaskStats({ tasks }: TaskStatsProps) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.progress === 100).length;
  const averageProgress = tasks.length > 0
    ? Math.round(tasks.reduce((acc, task) => acc + task.progress, 0) / tasks.length)
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-6 bg-white border-[#dbdbdb]">
        <div className="inline-flex py-1 rounde text-[#8c0327] mb-4">
          Total Tasks
        </div>
        <div className="flex flex-col">
          <span className="text-4xl font-bold text-[#8c0327]">{totalTasks}</span>
          <span className="text-sm text-gray-500">Total number of tasks created</span>
        </div>
      </Card>

      <Card className="p-6 bg-white border-[#dbdbdb]">
        <div className="inline-flex py-1 rounded-full text-[#499380] mb-4">
          Completed Tasks
        </div>
        <div className="flex flex-col">
          <span className="text-4xl font-bold text-[#499380]">{completedTasks}</span>
          <span className="text-sm text-gray-500">Tasks with 100% progress</span>
        </div>
      </Card>

      <Card className="p-6 bg-white border-[#dbdbdb]">
        <div className="inline-flex py-1 rounded-full text-[#e97f17] mb-4">
          Average Progress
        </div>
        <div className="flex flex-col">
          <span className="text-4xl font-bold text-[#e97f17]">{averageProgress}%</span>
          <span className="text-sm text-gray-500">Average completion rate</span>
        </div>
      </Card>
    </div>
  );
}
