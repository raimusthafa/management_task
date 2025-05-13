"use client";

import { useState, useEffect } from "react";
import { Task } from "@/app/page";

interface TaskHistory {
  taskId: number;
  action: string;
  progress?: number;
  timestamp: string;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [history, setHistory] = useState<TaskHistory[]>([]);

  // Load tasks and history from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    const savedHistory = localStorage.getItem('taskHistory');
    
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('taskHistory', JSON.stringify(history));
  }, [history]);

  const addTask = (newTask: Task) => {
    const taskWithDates = {
      ...newTask,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setTasks(prev => [...prev, taskWithDates]);
    setHistory(prev => [...prev, {
      taskId: taskWithDates.id,
      action: "created",
      timestamp: new Date().toISOString(),
    }]);
  };

  const editTask = (updatedTask: Task) => {
    setTasks(prev => 
      prev.map(task =>
        task.id === updatedTask.id
          ? { ...updatedTask, updatedAt: new Date().toISOString() }
          : task
      )
    );
    
    setHistory(prev => [...prev, {
      taskId: updatedTask.id,
      action: "updated",
      progress: updatedTask.progress,
      timestamp: new Date().toISOString(),
    }]);
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    setHistory(prev => [...prev, {
      taskId: id,
      action: "deleted",
      timestamp: new Date().toISOString(),
    }]);
  };

  return {
    tasks,
    history,
    addTask,
    editTask,
    deleteTask,
  };
}
