import Collaboration from "../modals/collaboration.modal.js";

//*Create collab
export const createCollab = async (req, res) => {
  const newCollab = new Collaboration({
    ...req.body,
  });

  try {
    await newCollab.save();
    res.status(200).send(newCollab);
  } catch (err) {
    res.status(500).send(err);
  }
};

//*Update collab
export const updateCollab = async (req, res) => {
  try {
    const updateCollab = await Collaboration.findByIdAndUpdate(req.params.id, {
      ...req.body,
    });
    res.status(200).send(updateCollab);
  } catch (err) {
    res.status(500).send(err);
  }
};

//*get all collab
export const getAllCollab = async (req, res) => {
  try {
    const collabs = await Collaboration.find();
    res.status(200).send(collabs);
  } catch (err) {
    res.status(500).send(err);
  }
};

//*get single collab
export const getSingleCollab = async (req, res) => {
  try {
    const collab = await Collaboration.findById(req.params.id);
    res.status(200).send(collab);
  } catch (err) {
    res.status(500).send(err);
  }
};

//*get all collab from toId
export const getCollabWithToId = async (req, res) => {
  try {
    const collabs = await Collaboration.find({ toId: req.params.id });
    res.status(200).send(collabs);
  } catch (err) {
    res.status(500).send(err);
  }
};

//*get all collab from fromId
export const getCollabWithFromId = async (req, res) => {
  try {
    const collabs = await Collaboration.find({ fromId: req.params.id });
    res.status(200).send(collabs);
  } catch (err) {
    res.status(500).send(err);
  }
};
