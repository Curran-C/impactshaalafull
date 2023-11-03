import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    createdById: {
      type: String,
      // required: true,
    },

    location: {
      type: String,
      // required: true,
    },
    timeline: {
      type: String,
    },
    keywords: {
      type: Array,
    },
    collaborateWith: {
      type: String,
    },
    objective: {
      type: String,
    },
    description: {
      type: String,
    },
    beneficiaries: {
      type: String,
    },
    resources: {
      type: String,
    },
    tenure: {
      type: String,
    },
    attachments: {
      type: String,
    },
    fromDate: {
      type: Date,
    },
    toDate: {
      type: Date,
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", postSchema);
