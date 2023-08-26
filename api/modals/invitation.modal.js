import mongoose from "mongoose";

const { Schema } = mongoose;

const invitationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    recipientType: {
      type: String, // values = all, stakeholder, user(for single user)
      required: true,
    },
    recipientId: {
      type: String,
    },
    stakeholderType: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Invitation", invitationSchema);