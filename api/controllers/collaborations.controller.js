import Collaboration from "../modals/collaboration.modal.js";
import Company from "../modals/company.modal.js";

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

//Admin

//get all collabs
export const getCollabs = async (req, res) => {
  try {
    const { dateFilter, status, from, to, stakeholder } = req.query;
    let query = {};
    if (dateFilter) {
      let startDate, endDate;
      const currentDate = new Date();
      if (dateFilter === 'thisMonth') {
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      } else if (dateFilter === 'lastMonth') {
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
      } else if (dateFilter === 'lastThreeMonths') {
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, 1);
        endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      }
      query.createdAt = {
        $gt: startDate,
        $lt: endDate,
      };
    }
    if (status) {
      query.completed = status;
    }
    if (from && to) {
      query.createdAt = {
        $gt: from,
        $lt: to,
      };
    }
    if (stakeholder) {
      const companies = await Company.find({ stakeholder });
      const companyIds = companies.map(company => company._id);
      query.$or = [{ toId: { $in: companyIds } }, { fromId: { $in: companyIds } }];
    }

    const collab = await Collaboration.find(query);
    res.status(200).send(collab);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const isCollabSent = async (req, res) => {
  try {
    const fromId = req.params.fromId;
    const toId = req.params.toId;
    const postId = req.params.postId;
    const existingCollab = await Collaboration.findOne({
      fromId: fromId,
      toId: toId,
      postId: postId
    });
    const isSent = !!existingCollab;

    res.status(200).send({
      isSent: isSent,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

export const getAllOngoingCompletedCollabs = async (req, res) => {
  try {
    const ongoingCompletedCollabs = await Collaboration.find({
      completed: { $in: ['ongoing', 'completed'] }
    });
    const ongoingCompletedCollabsIds = ongoingCompletedCollabs.map(collab => collab.postId);
    res.status(200).send(ongoingCompletedCollabsIds);
  } catch (err) {
    res.status(500).send(err);
  }
};
