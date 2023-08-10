import mongoose from "mongoose";

const { Schema } = mongoose;

const notificationSchema = new Schema(
  {
    fromId: {
      type: String,
    },
    toId: {
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