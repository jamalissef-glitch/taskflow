"use client";

import { useEffect, useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import TaskBoard from "@/components/TaskBoard";
import TaskModal from "@/components/TaskModal";
import { ITask } from "@/types";

export default function DashboardPage() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<ITask | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch("/api/tasks");
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleSaveTask = async (data: {
    title: string;
    description: string;
    status: "todo" | "in-progress" | "completed";
    priority: "low" | "medium" | "high";
  }) => {
    try {
      if (editingTask) {
        // Edit Operation
        const res = await fetch(`/api/tasks/${editingTask._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (res.ok) {
          const updated = await res.json();
          setTasks((prev) =>
            prev.map((t) => (t._id === editingTask._id ? updated : t)),
          );
        }
      } else {
        // Add Operation
        const res = await fetch("/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (res.ok) {
          fetchTasks();
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setEditingTask(null);
    }
  };

  const handleOpenEdit = (task: ITask) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleStatusChange = async (
    id: string,
    newStatus: "todo" | "in-progress" | "completed",
  ) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setTasks((prev) =>
          prev.map((t) => (t._id === id ? { ...t, status: newStatus } : t)),
        );
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
      if (res.ok) {
        setTasks((prev) => prev.filter((t) => t._id !== id));
      }
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-gray-50"
      suppressHydrationWarning
    >
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto p-6 space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Your Tasks</h2>
          <button
            onClick={() => {
              setEditingTask(null);
              setIsModalOpen(true);
            }}
            className="bg-rose-600 hover:bg-rose-500 text-white font-semibold py-2 px-5 rounded-xl text-sm transition shadow-sm"
          >
            + Add Task
          </button>
        </div>

        {loading ? (
          <p className="text-sm text-gray-500">Loading tasks...</p>
        ) : (
          <TaskBoard
            tasks={tasks}
            onDelete={handleDeleteTask}
            onEdit={handleOpenEdit}
            onStatusChange={handleStatusChange}
          />
        )}
      </main>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleSaveTask}
        initialData={editingTask}
      />
    </div>
  );
}
