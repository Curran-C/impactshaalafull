import Message from "../modals/message.modal.js";

export const addMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  const message = new Message({
    chatId,
    senderId,
    text,
  });

  try {
    await message.save();
    res.status(200).send(message);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getMessages = async (req, res) => {
  const { chatId } = req.params;

  try {
    const chats = await Message.find({ chatId }); //find all chats with chatId
    res.status(200).send(chats);
  } catch (err) {
    res.status(500).send(err);
  }
};
