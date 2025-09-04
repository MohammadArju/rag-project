// Right.jsx
import { useState, useEffect } from "react";
import Chats from "./chats";
import axios from "axios";

const Right = () => {
  const [messages, setMessages] = useState([]); // messages state
  const [input, setInput] = useState(""); // input state

  useEffect(() => {
    const storedMessages = localStorage.getItem("messages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const newMsg = {
      id: Date.now(),
      text: input,
      time: new Date().toLocaleString(),
      role: "user", // user msg
    };

    setMessages((prev) => [...prev, newMsg]);

    try {
      const res = await axios.post("http://localhost:3000/api/chats", {
        text: input,
      });

      res.data;

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: res.data.answer, // 👈 सही तरीका
          time: new Date().toLocaleString(),
          role: "assistant",
        },
      ]);
    } catch (error) {
      error;
    }

    setInput("");
  };

  return (
    <div className="w-full">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 ">
        <h1 className="font-semibold text-xl dark:text-white">Chat</h1>
        <p className="text-sm mt-1 dark:text-white">
          Ask questions about your uploaded sources
        </p>
      </div>

      {/* Chats area */}
      <div className="h-[80%] overflow-y-scroll pb-32 ">
        <Chats messages={messages} />
      </div>

      {/* Input area */}
      <div className="p-6 fixed bottom-0 w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-2 ">
          <input
            className="dark:bg-gray-700 md:w-[58%] p-2 rounded-lg border border-gray-200 dark:border-gray-700 dark:text-white 
             focus:border-blue-500 focus:ring-1 focus:ring-blue-900"
            type="text"
            placeholder="Ask a question about your uploaded sources..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()} // Enter key support
          />

          <button
            onClick={handleSend}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transition duration-300 ease-in-out py-3 px-6 rounded-lg text-white"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Right;
