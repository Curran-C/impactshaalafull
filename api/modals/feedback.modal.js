import mongoose from "mongoose";

const { Schema } = mongoose;

const feedbackSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    adminReplies: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Feedback", feedbackSchema);