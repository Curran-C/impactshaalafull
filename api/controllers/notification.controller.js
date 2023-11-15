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
    console.log(req.id);
    const notification = await Notification.find({ toId: req.id }).sort({
      status: "desc",
      time: "desc",
    });
    res.status(200).send({ data: notification });
  } catch (err) {
    res.status(500).send(err);
  }
};

//get notification by user
export const getNotificationByUser = async (req, res) => {
  try {
    const notification = await Notification.find({ toId: req.id })
      .populate("fromId")
      .sort({ createdAt: -1 });
    res.status(200).send(notification);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
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
    console.log(error);
    res.status(500).send(error);
  }
};
