import Chat from "../modals/chat.modal.js";

//*Create Chat
export const createChat = async (req, res) => {
  const newChat = new Chat({
    members: [req.id, req.params.userId],
  });

  try {
    await newChat.save();
    res.send({ data: newChat });
  } catch (err) {
    res.status(500).send(err);
  }
};

// *Get all Chats
export const userChats = async (req, res) => {
  try {
    console.log("userrr",req.id);
    const chat = await Chat.find({
      members: { $in: [req.id] },
    }).sort({ _id: -1 });
    res.send({ data: chat });
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
    res.send(chat);
  } catch (err) {
    res.status(500).json(err);
  }
};
