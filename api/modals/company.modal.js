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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Company", companySchema);
