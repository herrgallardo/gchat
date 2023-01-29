const asyncHandler = require('express-async-handler');
const Invitation = require('../models/invitationModel');
const User = require('../models/userModel');
const Chat = require('../models/chatModel');

const invite = asyncHandler(async (req, res) => {
  const senderId = req.body.senderId;
  const receiverId = req.body.receiverId;
  const chatId = req.body.chatId;

  if (senderId === receiverId) {
    console.log("you can't invite yourself");
    return res.status(409).send("you can't invite yourself");
  }

  const targetUser = await User.findOne({ _id: receiverId });
  const targetChat = await Chat.findOne({ _id: chatId });

  if (!targetUser) {
    return res.status(404).send(`user with id : ${targetUser} not found`);
  }

  if (!targetChat) {
    return res.status(404).send(`chat with id : ${targetChat} not found`);
  }

  const InvitationHasAlreadyBeenSent = await Invitation.findOne({
    senderId: senderId,
    receiverId: receiverId,
    chatId: chatId,
  });

  if (InvitationHasAlreadyBeenSent) {
    console.log('invitation has already been sent');

    return res.status(409).send('invitation has already been sent');
  }

  const newInvitation = await Invitation.create({
    senderId: senderId,
    receiverId: receiverId,
    chatId: chatId,
  });
  console.log('newInvitation');

  return res.status(201).send('invitation has been sent');
});

const accept = asyncHandler(async (req, res) => {
  try {
    const invitationId = req.body.invitationId;
    const invitationExist = await Invitation.findById(invitationId);
    if (!invitationExist) {
      return res.status(404).send('error, please try again');
    }
    const { receiverId, chatId } = invitationExist;

    const chat = await Chat.findById(chatId);
    chat.users = [...chat.users, receiverId];

    await chat.save();

    await Invitation.findByIdAndDelete(invitationId);

    return res.status(200).send('invitation accepted');
  } catch (err) {
    console.log(err);
    return res.status(200).send('something wrong , try again ' + err);
  }
});

const reject = asyncHandler(async (req, res) => {
  try {
    const invitationId = req.body.invitationId;
    const invitationExist = await Invitation.findById(invitationId);
    if (!invitationExist) {
      return res.status(404).send('error, please try again');
    }
    if (invitationExist) {
      await Invitation.findByIdAndDelete(invitationId);
    }

    return res.status(200).send('invitation rejected');
  } catch (error) {
    console.log(error);
    return res.status(500).send('something wrong , try again' + error);
  }
});

module.exports = {
  invite,
  accept,
  reject,
};
