import mongoose from "mongoose";

const { Schema } = mongoose;

const chatSchema = new Schema(
  {
    members: {
      type: Array, //stores the ID of the users
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Chat", chatSchema);
