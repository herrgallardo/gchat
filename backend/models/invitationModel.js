const mongoose = require('mongoose');

const invitationModel = mongoose.Schema(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
  },
  {
    timestamps: true,
  }
);

const Invitation = mongoose.model('Invitation', invitationModel);

module.exports = Invitation;
