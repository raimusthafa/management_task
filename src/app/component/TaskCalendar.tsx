"use client";

import { useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // klik tanggal
import { Task } from "@/app/page";

interface TaskCalendarProps {
  tasks: Task[];
}

export default function TaskCalendar({ tasks }: TaskCalendarProps) {
  const events = useMemo(() => {
    return tasks.map((task) => ({
      id: task.id.toString(),
      title: `${task.title} (${task.progress}%)`,
      date: new Date(task.createdAt).toISOString().split("T")[0], // YYYY-MM-DD
      backgroundColor:
        task.progress === 100
          ? "#22c55e" // green-500
          : task.progress >= 50
          ? "#eab308" // yellow-500
          : "#ef4444", // red-500
      textColor: "#fff",
    }));
  }, [tasks]);

  return (
    <div className="mt-4 overflow-x-auto">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
        headerToolbar={{
          left: "today",
          center: "title",
          right: "prev,next",
        }}
        eventDisplay="block"
        dayMaxEvents={3} // Max 3 tasks per day, sisanya jadi +more
        aspectRatio={1.5} // Responsif secara proporsional
        contentHeight="auto"
      />
    </div>
  );
}
