import React, { useEffect, useState } from "react";
import { useChat } from "../../context/ChatContext";
import UserList from "../Chat/helperpages/UserList";
import ChatWindow from "../Chat/helperpages/ChatWindow";
import { authFetch } from "../../utils/authFetch"; // Adjust the import path as necessary
const ChatPage = ({ currentUserId }) => {
  const { socket } = useChat();
  const [users, setUsers] = useState([]);
  const [chatWithUserId, setChatWithUserId] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

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

  // Fetch chat history
  useEffect(() => {
    const fetchChatHistory = async () => {
      if (!chatWithUserId) return;
      const res = await authFetch(
        `https://du-alumni-connect.onrender.com/api/chat/history?user1=${currentUserId}&user2=${chatWithUserId._id}`
      );
      const data = await res.json();
      setMessages(data.messages);
    };
    fetchChatHistory();
  }, [chatWithUserId, currentUserId]);

  // Socket logic
  useEffect(() => {
    if (!socket || !roomId) return;

    socket.emit("joinRoom", roomId);

    const handleReceive = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("receiveMessage", handleReceive);

    return () => {
      socket.emit("leaveRoom", roomId);
      socket.off("receiveMessage", handleReceive);
    };
  }, [socket, roomId]);

  const sendMessage = async () => {
    if (!socket || !message.trim()) return;

    const msgObj = {
      sender: currentUserId,
      receiver: chatWithUserId._id,
      roomId,
      text: message,
      timestamp: new Date(),
    };

    try {
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
