import Notification from "../modals/notification.modal.js";

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
};

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
      const notification = await Notification.find({ toId: req.params.id })
        .populate("fromId", "name stakeholder pfp")
        .sort({ createdAt: -1 });
      res.status(200).send(notification);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
};

export const markAsReadNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      {
        status: "read",
      },
      {
        new: true,
      }
    );
    res.status(200).send(notification);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const getNotificationCount = async (req, res) => {
  try {
    const { userId } = req.params;
    const notificationCount = await Notification.countDocuments({
      toId: userId,
      status: "unread",
    });
    res.status(200).send({ count: notificationCount });
  } catch (error) {
    console.log(err);
    res.status(500).send(err);
  }
};
