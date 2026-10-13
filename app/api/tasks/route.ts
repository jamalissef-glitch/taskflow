import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Task from "@/models/Task";
import User from "@/models/User";
import { auth } from "@/lib/auth";

// GET: Soo qaado dhammaan task-yada
export async function GET() {
  try {
    await connectToDatabase();
    const session = await auth();

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const currentUser = await User.findOne({ email: session.user.email });
    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const tasks = await Task.find({ userId: currentUser._id }).sort({ createdAt: -1 });
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST: Abuur task cusub
export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const session = await auth();

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const currentUser = await User.findOne({ email: session.user.email });
    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await request.json();

    const newTask = await Task.create({
      title: body.title,
      description: body.description,
      status: body.status || "todo",
      priority: body.priority || "medium",
      userId: currentUser._id,
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}