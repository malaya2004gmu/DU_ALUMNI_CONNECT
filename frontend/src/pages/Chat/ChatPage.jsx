import React, { useEffect, useState, useCallback } from "react";
import { useChat } from "../../context/ChatContext";
import UserList from "../Chat/helperpages/UserList";
import ChatWindow from "../Chat/helperpages/ChatWindow";
import { authFetch } from "../../utils/authFetch"; // Adjust the import path as necessary
//for message encryption and decryption
import * as openpgp from "openpgp"; // Ensure this is correctly imported

const ChatPage = ({ currentUserId }) => {
  const { socket } = useChat();
  const [users, setUsers] = useState([]);
  const [chatWithUserId, setChatWithUserId] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [receiverPublicKey, setReceiverPublicKey] = useState(null);
  const [myPrivateKey, setMyPrivateKey] = useState(null);
  const [myPublicKey, setMyPublicKey] = useState(null);
  const roomId = chatWithUserId
    ? [currentUserId, chatWithUserId._id].sort().join("_")
    : null;

  // Fetch users except current user
  useEffect(() => {
    authFetch("https://du-alumni-connect.onrender.com/api/admin/alluser")
      .then((res) => res.json())
      .then((data) =>
        setUsers(data.filter((u) => String(u._id) !== String(currentUserId)))
      );
  }, [currentUserId]);

  //fetch chat with user public key and my private key
  useEffect(() => {
    if (!chatWithUserId) return;
    setReceiverPublicKey(chatWithUserId.publicKey);
    const localKey = localStorage.getItem("privateKey");
    const publicKey = localStorage.getItem("publicKey");
    setMyPublicKey(publicKey);
    setMyPrivateKey(localKey);
  }, [chatWithUserId]);

  //decrypt message
  const decryptMessages = useCallback(
    async (msgs) => {
      if (!myPrivateKey) return msgs;

      const privateKeyObj = await openpgp.readPrivateKey({
        armoredKey: myPrivateKey,
      });

      const decryptedMsgs = await Promise.all(
        msgs.map(async (msg) => {
          try {
            const encryptedKeyForMe = msg.encryptedKeys[currentUserId];
            const keyMessage = await openpgp.readMessage({
              armoredMessage: encryptedKeyForMe,
            });

            const { data: decryptedAESKey } = await openpgp.decrypt({
              message: keyMessage,
              decryptionKeys: privateKeyObj,
            });

            const messageObj = await openpgp.readMessage({
              armoredMessage: msg.encryptedMessage,
            });

            const { data: decryptedText } = await openpgp.decrypt({
              message: messageObj,
              passwords: [decryptedAESKey],
            });

            return { ...msg, text: decryptedText };
          } catch (err) {
            console.error("Decryption error:", err.message);
            return { ...msg, text: "[Encrypted]" };
          }
        })
      );

      return decryptedMsgs;
    },
    [myPrivateKey, currentUserId]
  );

  //fetch chat history
  useEffect(() => {
    const fetchChatHistory = async () => {
      if (!chatWithUserId) return;
      const res = await authFetch(
        `https://du-alumni-connect.onrender.com/api/chat/history?user1=${currentUserId}&user2=${chatWithUserId._id}`
      );
      const data = await res.json();
      const decrypted = await decryptMessages(data.messages);
      setMessages(decrypted);
    };
    fetchChatHistory();
  }, [chatWithUserId, myPrivateKey, decryptMessages]);

  // Socket logic
  useEffect(() => {
    if (!socket || !roomId) return;

    socket.emit("joinRoom", roomId);

    const handleReceive = async (msg) => {
      const decryptedMsgs = await decryptMessages([msg]);
      setMessages((prev) => [...prev, ...decryptedMsgs]);
    };

    socket.on("receiveMessage", handleReceive);

    return () => {
      socket.emit("leaveRoom", roomId);
      socket.off("receiveMessage", handleReceive);
    };
  }, [socket, roomId, decryptMessages]);

 const sendMessage = async () => {
  if (!socket || !message.trim() || !receiverPublicKey || !myPublicKey) return;

  try {
    // Step 1: Generate AES key
    const aesKey = await generateAESKey();

    // Step 2: Encrypt message with AES key
    const encryptedMessage = await encryptMessageWithAES(message, aesKey);

    // Step 3: Encrypt AES key for receiver and sender
    const encryptedKeyForReceiver = await encryptAESKeyForUser(aesKey, receiverPublicKey);
    const encryptedKeyForMe = await encryptAESKeyForUser(aesKey, myPublicKey);

    // Step 4: Construct final message object
    const msgObj = {
      sender: currentUserId,
      receiver: chatWithUserId._id,
      roomId,
      encryptedMessage,
      encryptedKeys: {
        [currentUserId]: encryptedKeyForMe,
        [chatWithUserId._id]: encryptedKeyForReceiver,
      },
      timestamp: new Date(),
    };

    // Step 5: Send to backend and emit to socket
    await authFetch("https://du-alumni-connect.onrender.com/api/chat/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(msgObj),
    });

    socket.emit("sendMessage", { roomId, message: msgObj });
    setMessage("");

  } catch (err) {
    console.error("Failed to send message:", err);
  }
};


  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white">
      <header className="bg-blue-600 text-white py-4 shadow">
        <h1 className="text-center text-2xl font-semibold">Alumni Chat</h1>
      </header>

      <main className="flex-grow overflow-y-auto">
        {!chatWithUserId ? (
          <UserList users={users} onSelect={setChatWithUserId} />
        ) : !myPrivateKey || !receiverPublicKey ? (
          <div className="text-center p-6">Loading encryption keys...</div>
        ) : (
          <ChatWindow
            messages={messages}
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
            currentUserId={currentUserId}
            onBack={() => {
              setChatWithUserId(null);
              setMessages([]);
            }}
            chatUser={chatWithUserId}
          />
        )}
      </main>

      <footer className="text-center py-4 text-sm text-gray-500 border-t">
        &copy; {new Date().getFullYear()} Alumni Connect
      </footer>
    </div>
  );
};

export default ChatPage;

// generate random AES key
const generateAESKey = async () => {
  const rawKey = window.crypto.getRandomValues(new Uint8Array(32)); // 256-bit key
  const base64Key = btoa(String.fromCharCode(...rawKey)); // convert to string format
  return base64Key;
};



// encrypt message with AES key
const encryptMessageWithAES = async (text, aesKey) => {
  const encrypted = await openpgp.encrypt({
    message: await openpgp.createMessage({ text }),
    passwords: [aesKey],
    format: "armored",
  });
  return encrypted;
};


// encrypt AES key with a user's public key
const encryptAESKeyForUser = async (aesKey, armoredPublicKey) => {
  const publicKey = await openpgp.readKey({ armoredKey: armoredPublicKey });
  const encrypted = await openpgp.encrypt({
    message: await openpgp.createMessage({ text: aesKey }),
    encryptionKeys: publicKey,
    format: "armored",
  });
  return encrypted;
};
