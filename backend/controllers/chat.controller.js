const mongoose = require("mongoose");
const ChatRoom =require("../models/chatRoom");

// exports.postMessage= async(req,res)=>{
//  const { roomId, sender, receiver, text, timestamp } = req.body;
//    // Find or create chat room, then push message
//    if(!sender){
//       return res.status(400).json({ error: "Sender is required" });
//    }
//    const chatRoom = await ChatRoom.findOneAndUpdate(
//      { roomId },
//      {
//        $push: {
//          messages: { sender, text, timestamp }
//        },
//        $addToSet: { participants: { $each: [sender, receiver] } }
//      },
//      { upsert: true, new: true }
//    );
//    res.json({ success: true });
// };
exports.postMessage = async (req, res) => {
  const { roomId, sender, receiver, encryptedMessage, encryptedKeys, timestamp } = req.body;

  if (!sender || !encryptedMessage || !encryptedKeys) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const chatRoom = await ChatRoom.findOneAndUpdate(
      { roomId },
      {
        $push: {
          messages: {
            sender,
            encryptedMessage,
            encryptedKeys,
            timestamp,
          }
        },
        $addToSet: {
          participants: { $each: [sender, receiver] }
        }
      },
      { upsert: true, new: true }
    );

    res.json({ success: true });
  } catch (err) {
    console.error("Failed to store message:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// exports.getMessage= async(req,res)=>{
//  const { user1, user2 } = req.query;

//   if (!user1 || !user2) {
//     return res.status(400).json({ error: "Missing user IDs" });
//   }

//   try {
//     const roomId = [user1, user2].sort().join("_");

//     const chat = await ChatRoom.findOne({ roomId }).populate("messages.sender", "name");

//     if (!chat) return res.json({ messages: [] });

//     res.json({ messages: chat.messages });
//   } catch (err) {
//     console.error("Chat history error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// };
exports.getMessage = async (req, res) => {
  const { user1, user2 } = req.query;

  if (!user1 || !user2) {
    return res.status(400).json({ error: "Missing user IDs" });
  }

  try {
    const roomId = [user1, user2].sort().join("_");

    const chat = await ChatRoom.findOne({ roomId }).populate("messages.sender","name");

    if (!chat) return res.json({ messages: [] });

    // Only return necessary fields for decryption + sender id
    const filteredMessages = chat.messages.map(msg => ({
      sender: msg.sender,
      encryptedMessage: msg.encryptedMessage,
      encryptedKeys: msg.encryptedKeys,
      timestamp: msg.timestamp,
    }));

    res.json({ messages: filteredMessages });
  } catch (err) {
    console.error("Chat history error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
