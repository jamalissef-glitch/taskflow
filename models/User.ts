import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUserModel extends Document {
  name: string;
  email: string;
  image?: string;
}

const UserSchema = new Schema<IUserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
  },
  { timestamps: true }
);

const User: Model<IUserModel> =
  mongoose.models.User || mongoose.model<IUserModel>('User', UserSchema);

export default User;