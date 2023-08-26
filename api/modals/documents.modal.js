import mongoose from "mongoose";

const { Schema } = mongoose;

const documentSchema = new Schema({
  collaborationId: {
    type: String,
  },
  document: {
    type: String,
  },
});

export default mongoose.model("Document", documentSchema);
