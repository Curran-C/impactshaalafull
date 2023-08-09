import mongoose from "mongoose";

const { Schema } = mongoose;

const collaborationSchema = new Schema(
  {
    fromId: {
      type: String,
    },
    toId: {
      type: String,
    },
    postId: {
      type: String,
    },
    completed: {
      type: String,
      default: "requested",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Collaboration", collaborationSchema);
