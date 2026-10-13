import mongoose, { Schema, Document } from "mongoose";

export interface ITaskSchema extends Document {
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  userId: mongoose.Types.ObjectId;
}

const TaskSchema = new Schema<ITaskSchema>(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["todo", "in-progress", "completed"],
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Task || mongoose.model<ITaskSchema>("Task", TaskSchema);