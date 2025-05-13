"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Task } from "@/app/page";

interface TaskTableProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export default function TaskTable({ tasks, onEdit, onDelete }: TaskTableProps) {
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
    <div className="rounded-md border border-[#dbdbdb] bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#f1f1f1] hover:bg-[#f1f1f1]">
            <TableHead className="text-[#8c0327]">Title</TableHead>
            <TableHead className="text-[#8c0327]">Description</TableHead>
            <TableHead className="text-[#8c0327]">Progress</TableHead>
            <TableHead className="text-[#8c0327]">Created</TableHead>
            <TableHead className="text-[#8c0327]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id} className="hover:bg-[#f1f1f1]/50">
              <TableCell className="font-medium text-[#8c0327]">{task.title}</TableCell>
              <TableCell className="text-[#d85251]">{task.description}</TableCell>
              <TableCell className="w-[200px]">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#8c0327]">{task.progress}%</span>
                  </div>
                  <Progress 
                    value={task.progress} 
                    className={`h-2 ${getProgressColor(task.progress)}`} 
                  />
                </div>
              </TableCell>
              <TableCell className="text-[#d85251]">{formatDate(task.createdAt)}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#8c0327] text-[#8c0327] hover:bg-[#8c0327] hover:text-white"
                    onClick={() => onEdit(task)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="bg-[#d40014] hover:bg-[#d40014]/90"
                    onClick={() => onDelete(task)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {tasks.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-[#8c0327]">
                No tasks available. Click Add New Task to create one.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
