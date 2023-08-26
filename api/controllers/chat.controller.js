import Chat from "../modals/chat.modal.js";

//*Create Chat
export const createChat = async (req, res) => {
  const newChat = new Chat({
    members: [req.body.senderId, req.body.recieverId],
  });

  try {
    await newChat.save();
    res.status(200).send(newChat);
  } catch (err) {
    res.status(500).send(err);
  }
};

// *Get all Chats
export const userChats = async (req, res) => {
  try {
    const chat = await Chat.find({
      members: { $in: [req.params.userId] }, //finds all chats that includes the params.in in members
    });
    res.status(200).json(chat);
  } catch (err) {
    res.status(500).send(err);
  }
};

// *Find a single Chat
export const findChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json(err);
  }
};
