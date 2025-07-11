// const mongoose = require("mongoose");

// const chatRoomSchema = new mongoose.Schema({
//   roomId: { type: String, required: true, unique: true },
//   participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//   messages: [{
//     sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     text: String,
//     timestamp: { type: Date, default: Date.now }
//   }]
// });

// module.exports = mongoose.model("ChatRoom", chatRoomSchema);
const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  messages: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      encryptedMessage: { type: String, required: true }, // AES encrypted message
      encryptedKeys: {
        type: Map,
        of: String, // Each value is the AES key encrypted with a participant's public key
      },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("ChatRoom", chatRoomSchema);
