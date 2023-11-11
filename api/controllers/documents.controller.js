import Document from "../modals/documents.modal.js";

export const upload = async (req, res) => {
  try {
    const newDocument = new Document({
      ...req.body,
    });
    await newDocument.save();
    res.status(200).send(newDocument);
  } catch (err) {
    res.status(500).send(err);
  }
};
