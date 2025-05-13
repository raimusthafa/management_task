"use client";

import { Task } from "@/app/page";
import { ScrollArea } from "./ui/scroll-area";

interface HistoryEntry {
  taskId: number;
  action: string;
  progress?: number;
  timestamp: string;
}

interface TaskHistoryProps {
  history: HistoryEntry[];
  tasks: Task[];
}

export default function TaskHistory({ history, tasks }: TaskHistoryProps) {
  const getTaskTitle = (taskId: number) => {
    const task = tasks.find((t) => t.id === taskId);
    return task?.title || "Unknown Task";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActionDescription = (entry: HistoryEntry) => {
    switch (entry.action) {
      case "created":
        return "was created";
      case "updated":
        return `progress was updated to ${entry.progress}%`;
      case "deleted":
        return "was deleted";
      default:
        return entry.action;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "created":
        return "text-green-600";
      case "updated":
        return "text-blue-600";
      case "deleted":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <ScrollArea className="h-[400px] rounded-md border p-4">
      {history.length === 0 ? (
        <p className="text-center text-gray-500">No history available.</p>
      ) : (
        <div className="space-y-4">
          {history.map((entry, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 border-b border-gray-100 pb-4"
            >
              <div className={`w-2 h-2 mt-2 rounded-full ${getActionColor(entry.action)}`} />
              <div className="flex-1 space-y-1">
                <p className="text-sm">
                  <span className="font-medium">{getTaskTitle(entry.taskId)}</span>{" "}
                  <span className={getActionColor(entry.action)}>
                    {getActionDescription(entry)}
                  </span>
                </p>
                <p className="text-xs text-gray-500">
                  {formatDate(entry.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </ScrollArea>
  );
}
