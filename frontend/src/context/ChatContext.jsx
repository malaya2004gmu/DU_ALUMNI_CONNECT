import React, { createContext, useContext, useRef, useEffect } from "react";
import io from "socket.io-client";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("https://du-alumni-connect.onrender.com");

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return (
    <ChatContext.Provider value={{ socket: socketRef.current }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);