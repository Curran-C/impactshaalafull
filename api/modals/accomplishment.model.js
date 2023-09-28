import { Schema, model } from "mongoose";

const projectAccomplishmentSchema = new Schema({
  companyId: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },
  projectName: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  beneficiaries: {
    type: String,
    required: true,
  },
  projectLocation: {
    type: String,
    required: true,
  },
  attachments: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  benefitStudents: {
    type: String,
    required: true,
  },
  enhanceEducation: {
    type: String,
    required: true,
  },
  alignmentGoals: {
    type: String,
    required: true,
  },
  impactData: {
    type: String,
    required: true,
  },
});

export const ProjectAccomplishmentModel = model(
  "ProjectAccomplishment",
  projectAccomplishmentSchema
);
