const mongoose =require ("mongoose");
const ChatRoom =require("../models/chatRoom");

exports.postMessage= async(req,res)=>{
 const { roomId, sender, receiver, text, timestamp } = req.body;
   // Find or create chat room, then push message
   if(!sender){
      return res.status(400).json({ error: "Sender is required" });
   }
   const chatRoom = await ChatRoom.findOneAndUpdate(
     { roomId },
     {
       $push: {
         messages: { sender, text, timestamp }
       },
       $addToSet: { participants: { $each: [sender, receiver] } }
     },
     { upsert: true, new: true }
   );
   res.json({ success: true });
};

exports.postMessage= async(req,res)=>{
 const { user1, user2 } = req.query;

  if (!user1 || !user2) {
    return res.status(400).json({ error: "Missing user IDs" });
  }

  try {
    const roomId = [user1, user2].sort().join("_");

    const chat = await ChatRoom.findOne({ roomId }).populate("messages.sender", "name");

    if (!chat) return res.json({ messages: [] });

    res.json({ messages: chat.messages });
  } catch (err) {
    console.error("Chat history error:", err);
    res.status(500).json({ error: "Server error" });
  }
};