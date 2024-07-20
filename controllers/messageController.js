import { convoModel } from "../model/conversationModel.js";
import { messageModel } from "../model/messageModel.js";

// SEND MESSAGE--------------------------
export const sendMessage = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const senderId = req.userId;
    const { message } = req.body;

    let conversation = await convoModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await convoModel.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new messageModel({ receiverId, senderId, message });

    conversation.messages.push(newMessage._id);

    // await newMessage.save();
    // await conversation.save();

    Promise.all[(newMessage.save(), conversation.save())];

    // Socket.io functionality---------------------------------------------
    
    res.status(200).send("msg sent 👍");
  } catch (error) {
    res.status(400).send({ err: "somthing went wrong", errMsg: error.message });
  }
};

// GET MESSAGE-----------------------------
export const getMessage = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const senderId = req.userId;
    const conversation = await convoModel
      .findOne(
        {
          participants: { $all: [senderId, receiverId] },
        },
        { messages: 1, _id: 0 }
      )
      .populate("messages");
    res.status(200).send({ messages: conversation.messages });
  } catch (error) {
    res.status(400).send({ err: "somthing went wrong", errMsg: error.message });
  }
};
