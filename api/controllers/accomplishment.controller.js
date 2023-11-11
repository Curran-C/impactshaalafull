import { ProjectAccomplishmentModel } from "../modals/accomplishment.model.js";
import { upload } from "../utils/upload.js";

export const createAccomplishment = async (req, res) => {
  try {
    if (req.body?.attachments) {
      const attachmentUrl = await upload(req.body.attachments, true);
      req.body.attachments = attachmentUrl;
    }
    const newAccomplishment = new ProjectAccomplishmentModel({
      companyId: req.id,
      ...req.body,
    });
    await newAccomplishment.save();
    res.send({
      message: "New accomplishment added",
      data: newAccomplishment,
    });
  } catch (error) {
    console.log("Error creating accomplishment: ", error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

export const getAccomplishments = async (req, res) => {
  try {
    const { companyId } = req.params;
    const accomplishmentsByCompany = await ProjectAccomplishmentModel.find({
      companyId,
    }).sort({
      _id: -1,
    });
    res.send({
      data: accomplishmentsByCompany,
    });
  } catch (error) {
    console.log("Error creating accomplishment: ", error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};
