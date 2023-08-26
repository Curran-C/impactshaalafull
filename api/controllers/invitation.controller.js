import Invitation from "../modals/invitation.modal.js";
import Company from "../modals/company.modal.js";

//create invitations
export const createInvitation = async (req, res) => {
  try {
    const invitation = new Invitation({
      ...req.body,
    });
    await invitation.save();
    res.status(200).send(invitation);
  } catch (err) {
    res.status(500).send(err);
  }
};

//get all Invitation
export const getAllInvitation = async (req, res) => {
  try {
    const invitation = await Invitation.find();
    res.status(200).send(invitation);
  } catch (err) {
    res.status(500).send(err);
  }
};

//get invitation by user
export const getInvitationByUser = async (req, res) => {
  try {
    const user = await Company.findById(req.params.id);
    console.log(user.stakeholder);
    const invitation = await Invitation.find({
      $or: [
        { recipientType: 'all' },
        { recipientType: 'stakeholder', stakeholderType: user.stakeholder },
        { recipientType: 'user', recipientId: req.params.id },
      ],
    });
    res.status(200).send(invitation);
  } catch (err) {
    res.status(500).send(err);
  }
};