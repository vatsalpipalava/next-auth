import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string | null;
  verifyCodeExpiry: Date | null;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required."],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    match: [/.+\@.+\..+/, "Please, provide valid email."],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  verifyCode: {
    type: String,
    required: false,
  },
  verifyCodeExpiry: {
    type: Date,
    required: false,
  },
  isVerified: {
    type: Boolean,
    required: false,
  },
  isAcceptingMessage: {
    type: Boolean,
    required: true,
  },
  messages: [MessageSchema],
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
