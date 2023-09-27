import mongoose from "mongoose";

const { Schema } = mongoose;

const feedbackSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    target: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
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
