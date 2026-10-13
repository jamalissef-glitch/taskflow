"use client";

import { ITask } from "@/types";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import TaskColumn from "./TaskColumn";

interface TaskBoardProps {
  tasks: ITask[];
  onDelete: (id: string) => void;
  onEdit: (task: ITask) => void;
  onStatusChange: (id: string, newStatus: "todo" | "in-progress" | "completed") => void;
}

export default function TaskBoard({
  tasks,
  onDelete,
  onEdit,
  onStatusChange,
}: TaskBoardProps) {
  const columns: { title: string; status: "todo" | "in-progress" | "completed" }[] = [
    { title: "To Do", status: "todo" },
    { title: "In Progress", status: "in-progress" },
    { title: "Completed", status: "completed" },
  ];

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newStatus = destination.droppableId as "todo" | "in-progress" | "completed";
    onStatusChange(draggableId, newStatus);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => {
          const columnTasks = tasks.filter((t) => t.status === col.status);

          return (
            <TaskColumn
              key={col.status}
              title={col.title}
              status={col.status}
              tasks={columnTasks}
              onDelete={onDelete}
              onEdit={onEdit}
              onStatusChange={onStatusChange}
            />
          );
        })}
      </div>
    </DragDropContext>
  );
}