"use client";

import { useState } from "react";
import { Button } from "./component/ui/button";
import { Card } from "./component/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./component/ui/tabs";
import toast from "react-hot-toast";
import TaskHistory from "./component/taskHistory";
import { useTasks } from "./hooks/use-tasks";
import TaskStats from "./component/TaskStast";
import TaskChart from "./component/TaskChart";
import TaskCard from "./component/TaskCard";
import TaskTable from "./component/TaskTable";
import TaskCalendar from "./component/TaskCalendar";
import TaskForm from "./component/taskForm";
import { DeleteConfirmDialog } from "./component/DeteleConfirmDialog";

export type Task = {
  id: number;
  title: string;
  description: string;
  progress: number;
  createdAt: string;
  updatedAt: string;
};

export default function Home() {
  const { tasks, history, addTask, editTask, deleteTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const startEditing = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSave = (task: Task) => {
    if (editingTask) {
      editTask(task);
      toast.success("Task updated successfully");
    } else {
      addTask(task);
      toast.success("Task added successfully");
    }
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const confirmDelete = (task: Task) => {
    setTaskToDelete(task);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
      toast.success("Task deleted successfully");
    }
    setDeleteDialogOpen(false);
    setTaskToDelete(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Task Management</h1>
        <Button onClick={() => { setEditingTask(null); setIsModalOpen(true); }}>
          Add New Task
        </Button>
      </div>

      <TaskStats tasks={tasks} />
      <TaskChart tasks={tasks} />

      <Tabs defaultValue="card" className="w-full">
        <TabsList>
          <TabsTrigger value="card">Card View</TabsTrigger>
          <TabsTrigger value="table">Table View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        <TabsContent value="card">
          <TaskCard tasks={tasks} onEdit={startEditing} onDelete={confirmDelete} />
        </TabsContent>

        <TabsContent value="table">
          <TaskTable tasks={tasks} onEdit={startEditing} onDelete={confirmDelete} />
        </TabsContent>

        <TabsContent value="calendar">
          <TaskCalendar tasks={tasks} />
        </TabsContent>
      </Tabs>

      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Task History</h2>
        <TaskHistory history={history} tasks={tasks} />
      </Card>

      {isModalOpen && (
        <TaskForm
          task={editingTask}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTask(null);
          }}
          onSave={handleSave}
        />
      )}

      <DeleteConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        taskTitle={taskToDelete?.title || ""}
      />
    </div>
  );
}
