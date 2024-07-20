import mongoose, { Schema } from "mongoose";

const convoSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "user",
      },
    ],
    messages: [{ type: Schema.Types.ObjectId, default: [], ref: "messages" }],
  },
  { timestamps: true }
);

export const convoModel = mongoose.model("conversations", convoSchema);
