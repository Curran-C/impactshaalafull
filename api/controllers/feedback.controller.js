import Feedback from "../modals/feedback.modal.js";

//create feedback
export const createFeedback = async (req, res) => {
  try {
    const feedback = new Feedback({ author: req.id, ...req.body });
    await feedback.save();
    res.status(200).send({ message: "New Feedback added" });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

//get all feedback
export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({
      target: req.params.id,
    })
      .populate({
        path: "author",
        select: "name pfp -_id stakeholder",
      })
      .sort({ _id: -1 });
    res.status(200).send({ data: feedbacks });
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


//get all feedback admin
export const getAll = async (req, res) => {
  try {
    const filterStakeholder = req.query.stakeholder;
    console.log(filterStakeholder);
    const feedbacks = await Feedback.find()
      .populate('author')
      .populate('target')
      .sort({ _id: -1 });
    let filteredFeedbacks = feedbacks;
    if (filterStakeholder !== "" && filterStakeholder !== null && filterStakeholder !== "null" && filterStakeholder != undefined) {
      filteredFeedbacks = feedbacks.filter(feedback =>
        feedback.author.stakeholder === filterStakeholder ||
        feedback.target.stakeholder === filterStakeholder
      );
    }
    res.status(200).send({ data: filteredFeedbacks });
  } catch (err) {
    res.status(500).send(err);
  }
};

