"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Task } from "@/app/page";

interface TaskCardProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export default function TaskCard({ tasks, onEdit, onDelete }: TaskCardProps) {
  const getProgressColor = (progress: number) => {
    if (progress === 100) return "bg-[#499380]";
    if (progress >= 50) return "bg-[#e97f17]";
    return "bg-[#d40014]";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {tasks.map((task) => (
        <Card key={task.id} className="shadow-lg bg-white border-[#dbdbdb]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-[#8c0327]">{task.title}</CardTitle>
            <p className="text-sm text-[#d85251]">
              Created: {formatDate(task.createdAt)}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {task.description}
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#8c0327]">Progress</span>
                <span className="text-[#d85251]">{task.progress}%</span>
              </div>
              <Progress 
                value={task.progress} 
                className={`h-2 ${getProgressColor(task.progress)}`} 
              />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                className="w-20 border-[#8c0327] text-[#8c0327] hover:bg-[#8c0327] hover:text-white"
                onClick={() => onEdit(task)}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="w-20 bg-[#d40014] hover:bg-[#d40014]/90"
                onClick={() => onDelete(task)}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      {tasks.length === 0 && (
        <div className="col-span-full text-center py-8 text-[#8c0327]">
          No tasks available. Click Add New Task to create one.
        </div>
      )}
    </div>
  );
}



