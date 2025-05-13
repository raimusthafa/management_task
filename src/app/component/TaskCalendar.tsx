"use client";

import { useState } from "react";
import { Task } from "@/app/page";
import { Calendar } from "./ui/calendar";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";

type CalendarValue = Date | [Date | null, Date | null] | null;

interface TaskCalendarProps {
  tasks: Task[];
}

export default function TaskCalendar({ tasks }: TaskCalendarProps) {
  const [date, setDate] = useState<CalendarValue>(new Date());

  const getTasksForDate = (date: Date) => {
    return tasks.filter((task) => {
      const taskDate = new Date(task.createdAt);
      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return "bg-green-500";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Handle date being Date or range tuple
  const selectedDateTasks = Array.isArray(date)
    ? []
    : date
    ? getTasksForDate(date)
    : [];

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-4">
      <div>
        <Calendar
          value={date}
          onChange={(value: CalendarValue) => setDate(value)}
          className="rounded-md border shadow"
        />
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          Tasks for{" "}
          {Array.isArray(date)
            ? `${date[0]?.toLocaleDateString("en-US")} - ${date[1]?.toLocaleDateString("en-US")}`
            : date?.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
        </h3>
        {selectedDateTasks.length === 0 ? (
          <p className="text-gray-500">No tasks for this date.</p>
        ) : (
          selectedDateTasks.map((task) => (
            <Card key={task.id} className="shadow-sm">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">{task.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{task.progress}%</span>
                  </div>
                  <Progress
                    value={task.progress}
                    className={`h-2 ${getProgressColor(task.progress)}`}
                  />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
