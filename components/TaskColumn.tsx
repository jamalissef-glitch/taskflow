"use client";

import { ITask } from "@/types";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

interface TaskColumnProps {
  title: string;
  status: "todo" | "in-progress" | "completed";
  tasks: ITask[];
  onDelete: (id: string) => void;
  onEdit: (task: ITask) => void;
  onStatusChange: (id: string, newStatus: "todo" | "in-progress" | "completed") => void;
}

export default function TaskColumn({
  title,
  status,
  tasks,
  onDelete,
  onEdit,
  onStatusChange,
}: TaskColumnProps) {
  return (
    <div className="bg-gray-100/70 p-4 rounded-2xl space-y-4 border border-gray-200/60 flex flex-col">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-gray-700 uppercase tracking-wider text-xs">
          {title}
        </h3>
        <span className="bg-white px-2 py-0.5 rounded-full text-xs font-semibold text-gray-600 shadow-sm border border-gray-200">
          {tasks.length}
        </span>
      </div>

      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`space-y-3 flex-1 min-h-[200px] transition-colors rounded-xl p-1 ${
              snapshot.isDraggingOver ? "bg-blue-50/50" : ""
            }`}
          >
            {tasks.map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{ ...provided.draggableProps.style }}
                    className={`${snapshot.isDragging ? "opacity-75 rotate-1" : ""}`}
                  >
                    <TaskCard
                      task={task}
                      onDelete={onDelete}
                      onEdit={onEdit}
                      onStatusChange={onStatusChange}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}