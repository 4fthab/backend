import mongoose, { Schema } from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: { type: Schema.Types.ObjectId, require: true },
    receiverId: { type: Schema.Types.ObjectId, require: true },
    message: { type: String, require: true },
  },
  { timestamps: true }
);

export const messageModel = mongoose.model("messages", messageSchema);
