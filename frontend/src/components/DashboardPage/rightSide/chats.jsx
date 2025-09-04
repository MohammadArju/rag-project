// Chats.jsx
import { useEffect, useRef } from "react";
import Chat from "./chat";

const Chats = ({ messages }) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    // हर बार messages update होंगे तो नीचे scroll करेगा
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {messages.map((msg) => (
        <Chat
          key={msg.id}
          text={msg.text}
          time={msg.time}
          role={msg.role}
        />
      ))}
      {/* 👇 यह dummy div last message के बाद रखा है */}
      <div ref={chatEndRef} />
    </>
  );
};

export default Chats;
