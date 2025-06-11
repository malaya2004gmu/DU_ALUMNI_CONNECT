import React from "react";
import { ArrowLeft } from "lucide-react";

const ChatWindow = ({
  messages,
  message,
  setMessage,
  sendMessage,
  currentUserId,
  onBack,
  chatUser,
}) => (
  <div className="p-4 max-w-xl mx-auto h-[90vh] flex flex-col bg-blue-300 border rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
    
    {/* Header */}
    <div className="flex items-center justify-between border-b pb-3 mb-3 bg-gradient-to-r from-blue-100 to-blue-50 rounded-t-2xl px-4 py-2">
      <div className="flex items-center gap-3">
        <button
          className="text-blue-700 hover:text-blue-900 transition flex items-center gap-1"
          onClick={onBack}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </button>
        <div className="ml-4">
          <div className="text-lg font-semibold text-blue-900">
            {chatUser?.name || "User"}
          </div>
          <div className="text-sm text-gray-600">{chatUser?.email}</div>
        </div>
      </div>
    </div>

    {/* Messages */}
    <div className="flex-1 overflow-y-auto mb-4 px-3 py-2 space-y-2 bg-gradient-to-b from-white to-blue-50 rounded-lg shadow-inner scroll-smooth">
      {messages.map((msg, i) => {
        const senderId =
          typeof msg.sender === "object" && msg.sender !== null
            ? msg.sender._id
            : msg.sender;
        const isCurrentUser = senderId === currentUserId;

        return (
          <div
            key={i}
            className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} animate-fade-in`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-xl text-sm shadow-md ${
                isCurrentUser
                  ? "bg-gradient-to-br from-blue-400 to-blue-300 text-white rounded-br-none"
                  : "bg-gradient-to-br from-gray-200 to-gray-100 text-gray-900 border rounded-bl-none"
              }`}
            >
              {msg.text}
              <div className="text-[10px] text-gray-600 mt-1 text-right">
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>

    {/* Input */}
    <div className="flex gap-2 items-center px-1">
      <input
        className="border border-gray-300 rounded-full px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-full shadow hover:scale-105 transition-all duration-200"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  </div>
);

export default ChatWindow;
