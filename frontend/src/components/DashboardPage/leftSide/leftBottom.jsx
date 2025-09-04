import { IoDocumentTextOutline } from "react-icons/io5";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { IoEarthOutline, IoClose } from "react-icons/io5";
import axios from "axios";

const LeftBottom = ({ document, sendDataToParent }) => {
  const deleteDocument = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/delete/${document.id}`
      );
      ("arju");

      if (response.status === 200) {
        sendData();
        ("Document deleted successfully");
      } else {
        console.error("Failed to delete document");
      }
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const sendData = () => {
    sendDataToParent(document.id);
  };
  return (
    <div
      key={document.id}
      className="m-4 dark:text-white w-[80%] md:w-[90%] border dark:border-none rounded-2xl p-3 dark:bg-gray-700 bg-gray-100 flex justify-between items-center text-gray-600"
    >
      {/* Left Side (icon + text) */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="p-2 rounded-lg dark:bg-purple-900 text-purple-700 bg-purple-300 dark:text-white shrink-0">
          {document.type === "text" ? (
            <IoDocumentTextOutline />
          ) : document.type === "website" ? (
            <IoEarthOutline />
          ) : (
            <HiOutlineEmojiHappy />
          )}
        </div>

        {/* 👇 Text wrapper with truncate */}
        <div className="flex-1 min-w-0">
          <h1 className="font-bold text-[0.8rem] md:text-[0.9rem] truncate">
            {document.text}
          </h1>
          <p className="text-[0.7rem] text-gray-400">
            Uploaded: <span>{document.time}</span>
          </p>
        </div>
      </div>

      {/* Close Button */}
      <div className="shrink-0">
        <button
          onClick={deleteDocument}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          <IoClose size={22} />
        </button>
      </div>
    </div>
  );
};

export default LeftBottom;
