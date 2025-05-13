"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Slider } from "./ui/slider";
import { Task } from "@/app/page";

interface TaskFormProps {
  task?: Task | null;
  onClose: () => void;
  onSave: (task: Task) => void;
}

export default function TaskForm({ task, onClose, onSave }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [progress, setProgress] = useState(task?.progress || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: task?.id || Date.now(),
      title,
      description,
      progress,
      createdAt: task?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="bg-[#f1f1f1] border-[#dbdbdb]">
        <DialogHeader>
          <DialogTitle className="text-[#8c0327]">
            {task ? "Edit Task" : "Create New Task"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="text-sm font-medium text-[#8c0327]">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 border-[#dbdbdb] focus-visible:ring-[#8c0327]"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="text-sm font-medium text-[#8c0327]">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 border-[#dbdbdb] focus-visible:ring-[#8c0327]"
              required
            />
          </div>
          <div>
            <label htmlFor="progress" className="text-sm font-medium text-[#8c0327]">
              Progress: {progress}%
            </label>
            <Slider
              id="progress"
              value={[progress]}
              onValueChange={(value) => setProgress(value[0])}
              max={100}
              step={1}
              className="mt-2"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-[#8c0327] text-[#8c0327] hover:bg-[#8c0327] hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#8c0327] text-white hover:bg-[#8c0327]/90"
            >
              {task ? "Save Changes" : "Create Task"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
