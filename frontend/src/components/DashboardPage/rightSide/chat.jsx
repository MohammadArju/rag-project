// Chat.jsx
import { IoCopyOutline } from "react-icons/io5";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

const Chat = ({ text, time, role }) => {
  const isUser = role === "user"; // check role

  return (
    <div className="py-2 px-4 dark:text-white">
      <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
        <div
          className={`p-3 rounded-lg max-w-[80%] prose prose-sm dark:prose-invert
            ${isUser ? "bg-blue-600 text-white prose-invert" : "bg-gray-100 border dark:bg-gray-800"}`}
        >
          {/* अब text Markdown के रूप में render होगा */}
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {text}
          </ReactMarkdown>
        </div>
      </div>

      {/* Time + Copy button */}
      <div
        className={`flex mt-2 ${
          isUser ? "justify-end" : "justify-start"
        } items-center`}
      >
        <p className="text-gray-400 text-[0.7rem] mr-1">{time}</p>
        <button
          className="flex gap-1 items-center text-[0.7rem] text-gray-400 hover:bg-gray-200 px-1 rounded hover:text-gray-500"
          onClick={() => navigator.clipboard.writeText(text)}
        >
          <IoCopyOutline />
          copy
        </button>
      </div>
    </div>
  );
};

export default Chat;
