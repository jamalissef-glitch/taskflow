"use client";

import { ITask } from "@/types";

interface TaskCardProps {
  task: ITask;
  onDelete: (id: string) => void;
  onEdit: (task: ITask) => void;
  onStatusChange: (id: string, newStatus: "todo" | "in-progress" | "completed") => void;
}

export default function TaskCard({
  task,
  onDelete,
  onEdit,
  onStatusChange,
}: TaskCardProps) {
  const getPriorityBadge = (priority?: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "low":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 space-y-3 hover:shadow-md transition">
      <div className="flex justify-between items-start gap-2">
        <h4 className="font-semibold text-gray-900 leading-snug">{task.title}</h4>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            Edit
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={() => onDelete(task._id)}
            className="text-xs text-red-500 hover:text-red-700 font-medium"
          >
            Delete
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 leading-relaxed">{task.description}</p>
      )}

      <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-100">
        <span
          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wider ${getPriorityBadge(
            task.priority
          )}`}
        >
          {task.priority || "medium"}
        </span>

        <div className="flex items-center gap-2">
          <select
            value={task.status}
            onChange={(e) =>
              onStatusChange(
                task._id,
                e.target.value as "todo" | "in-progress" | "completed"
              )
            }
            className="text-xs border border-gray-300 rounded-md p-1 bg-gray-50 focus:outline-none"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
}