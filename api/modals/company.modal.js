import mongoose from "mongoose";

const { Schema } = mongoose;

const companySchema = new Schema(
  {
    name: {
      type: String,
      // required: true,
      // default: "",
    },
    email: {
      type: String,
      // required: true,
      // default: "",
    },
    password: {
      type: String,
      // required: true,
      // default: "",
    },
    companyName: {
      type: String,
      // required: true,
      // default: "",
    },
    website: {
      type: String,
    },
    phNum: {
      type: String,
      // required: true,
      // default: "",
    },
    stakeholder: {
      type: String,
      // required: true,
      // default: "",
    },
    type: {
      type: String,
      // required: true,
      // default: "",
    },
    tagline: {
      type: String,
      // required: true,
      // default: "",
    },
    tags: {
      type: Array,
    },
    description: {
      type: String,
      // required: true,
      // default: "",
    },
    pfp: {
      type: String,
      // required: true,
    },
    coverPic: {
      type: String,
      // required: true,
    },
    addressOne: {
      type: String,
      // required: true,
      // default: "",
    },
    addressTwo: {
      type: String,
      // required: true,
      // default: "",
    },
    pinCode: {
      type: Number,
      // required: true,
      // default: "",
    },
    city: {
      type: String,
      // required: true,
      // default: "",
    },
    state: {
      type: String,
      // required: true,
      // default: "",
    },
    bookmarkedPosts: {
      type: Array,
      default: [],
    },
    feedbacksGiven: {
      type: Array,
      default: [],
    },
    feedbacksRecieved: {
      type: Array,
      default: [],
    },
    sector: {
      type: String,
    },
    collaborationIds: {
      type: Array,
      default: [],
    },
    collaborationIdsAccepted: {
      type: Array,
      default: [],
    },
    collaborationIdsDeclined: {
      type: Array,
      default: [],
    },
    status: {
      type: String,
      default: 'active'
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Company", companySchema);
