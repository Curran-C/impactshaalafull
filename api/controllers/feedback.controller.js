import Feedback from "../modals/feedback.modal.js";
import jwt from "jsonwebtoken";

//create feedback
export const createFeedback = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token)
    res.status(401).send({
      message: "You are not authenticated",
    });
  else {
    const { id } = jwt.decode(token);
    try {
      const feedback = new Feedback({
        ...req.body,
      });
      await feedback.save();
      res.status(200).send(feedback);
    } catch (err) {
      res.status(500).send(err);
    }
  }
};

//get all feedback
export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).send(feedbacks);
  } catch (err) {
    res.status(500).send(err);
  }
};

//get feedback by id
export const getSingleFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    res.status(200).send(feedback);
  } catch (err) {
    res.status(500).send(err);
  }
};

//send Admin replay to feedback
export const sendAdminReplay = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    feedback.adminReplies.push(req.body.replay);
    await feedback.save();
    res.status(200).send(feedback);
  } catch (err) {
    res.status(500).send(err);
  }
};

//delete feedback
export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    res.status(200).send(feedback);
  } catch (err) {
    res.status(500).send(err);
  }
};
