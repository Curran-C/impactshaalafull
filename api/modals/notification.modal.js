import mongoose from "mongoose";

const { Schema } = mongoose;

const notificationSchema = new Schema(
  {
    fromId: {
      type:  Schema.Types.ObjectId,
      ref: "Company",
    },
    toId: {
      type:  Schema.Types.ObjectId,
      ref: "Company",
    },
    title: {
      type: String,
    },
    message: {
      type: String,
    },
    status: {
      type: String,
      default: 'unread',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Notification", notificationSchema);