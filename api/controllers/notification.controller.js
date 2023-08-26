import Notification from "../modals/notification.modal.js"

//create notification
export const createNotification = async (req, res) => {
  try {
    const notification = new Notification({
      ...req.body,
    });
    await notification.save();
    res.status(200).send(notification);
  } catch (err) {
    res.status(500).send(err);
  }
}

//get all notification
export const getAllNotification = async (req, res) => {
  try {
    const notification = await Notification.find();
    res.status(200).send(notification);
  } catch (err) {
    res.status(500).send(err);
  }
};

//get notification by user
export const getNotificationByUser = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) res.status(401).send("You are not authenticated");
  else {
    try {
      const notification = await Notification.find({ toId: req.params.id, status: 'unread' });
      res.status(200).send(notification);
    } catch (err) {
      res.status(500).send(err);
    }
  }
};