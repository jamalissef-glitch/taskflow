"use server";

import { connectToDatabase } from "@/lib/db";
import Task from "@/models/Task";
import User from "@/models/User";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export async function createTaskAction(formData: {
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "completed";
}) {
  await connectToDatabase();
  const session = await auth();

  if (!session || !session.user?.email) {
    throw new Error("Unauthorized");
  }

  const currentUser = await User.findOne({ email: session.user.email });
  if (!currentUser) throw new Error("User not found");

  const newTask = await Task.create({
    ...formData,
    userId: currentUser._id,
  });

  revalidatePath("/dashboard");
  return JSON.parse(JSON.stringify(newTask));
}

export async function deleteTaskAction(id: string) {
  await connectToDatabase();
  const session = await auth();

  if (!session || !session.user?.email) {
    throw new Error("Unauthorized");
  }

  const currentUser = await User.findOne({ email: session.user.email });
  if (!currentUser) throw new Error("User not found");

  await Task.findOneAndDelete({ _id: id, userId: currentUser._id });
  revalidatePath("/dashboard");
  return { success: true };
}

export async function updateTaskStatusAction(
  id: string,
  status: "todo" | "in-progress" | "completed"
) {
  await connectToDatabase();
  const session = await auth();

  if (!session || !session.user?.email) {
    throw new Error("Unauthorized");
  }

  const currentUser = await User.findOne({ email: session.user.email });
  if (!currentUser) throw new Error("User not found");

  const updatedTask = await Task.findOneAndUpdate(
    { _id: id, userId: currentUser._id },
    { $set: { status } },
    { new: true }
  );

  revalidatePath("/dashboard");
  return JSON.parse(JSON.stringify(updatedTask));
}