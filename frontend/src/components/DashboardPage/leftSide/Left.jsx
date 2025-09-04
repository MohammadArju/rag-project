import { useState, useEffect } from "react";
import axios from "axios";
import Parent from "./parents";
import { IoMdClose } from "react-icons/io";

const Left = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Files");
  const [text, setText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    file: null,
    text: "",
    website: "",
    youtube: "",
  });
  const [document, setDocument] = useState([]);

  const menuItems = ["Files", "Websites", "YouTube", "Text"];

  useEffect(() => {
    const storedDocument = localStorage.getItem("document");
    if (storedDocument) {
      setDocument(JSON.parse(storedDocument));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("document", JSON.stringify(document));
  }, [document]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const apiMap = {
    Files: "/api/store/file",
    Text: "/api/store/text",
    Websites: "/api/store/website",
    YouTube: "/api/store/youtube",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Only append the active tab field
    switch (activeTab) {
      case "Files":
        if (formData.file) data.append("file", formData.file);
        setText("file");
        break;
      case "Text":
        if (formData.text) data.append("text", formData.text);
        setText("text");
        break;
      case "Websites":
        if (formData.website) data.append("website", formData.website);
        setText("websites");
        break;
      case "YouTube":
        if (formData.youtube) data.append("youtube", formData.youtube);
        setText("youtube");
        break;
    }

    const apiUrl = `http://localhost:3000${apiMap[activeTab]}`;

    try {
      setLoading(true);
      const response = await axios.post(apiUrl, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setLoading(false);
      setIsVisible(true);
      setDocument((prev) => [
        ...prev,
        {
          id: response.data.sourceId,
          text: response.data.extraData,
          type: response.data.type,
          time: new Date().toLocaleString(),
        },
      ]);
      (document);
      setTimeout(() => setIsVisible(false), 3000);
      setFormData({
        file: null,
        text: "",
        website: "",
        youtube: "",
      });
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error); // UI पर दिखाओ
      } else if (error.request) {
        // Request गया लेकिन response नहीं आया
        alert("Server not responding, please try again.");
      } else {
        // Axios config या कुछ और issue
        alert("Unexpected error: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsVisible(!isVisible);
  };

  const handleId = (id) => {
    ("Child se mila ID:", id);
    setDocument(document.filter((doc) => doc.id !== id));
  };

  const handleNewChat = () => {
    localStorage.removeItem("messages");
    window.location.reload();
  };

  return (
    <>
      <div className="w-1/3 md:w-[50%] border-r border-gray-200 dark:border-gray-700">
        <div className="pb-3 border-b border-gray-200 dark:border-gray-700">
          <div className="p-6">
            {/* Heading */}
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
              Sources
            </h2>

            {/* Top bar */}
            <div className="p-4 rounded-lg shadow-sm bg-gray-100 dark:bg-gray-800">
              <div className="flex justify-between items-center text-sm font-medium text-gray-600 dark:text-gray-400">
                {/* Left menu (desktop) */}
                <div className="hidden md:flex gap-4">
                  {menuItems.map((item) => (
                    <button
                      key={item}
                      onClick={() => setActiveTab(item)}
                      className={`px-2 py-1 rounded transition ${
                        activeTab === item
                          ? "bg-purple-600 text-white"
                          : "hover:text-purple-500 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                {/* Hamburger (mobile) */}
                <button
                  className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={() => setOpen(!open)}
                >
                  ☰
                </button>

                {/* Right side button */}
                <div>
                  <button
                    onClick={handleNewChat}
                    className="py-2 px-4 rounded-lg font-medium bg-gray-300 dark:bg-gray-700 hover:bg-purple-600 hover:text-white transition"
                  >
                    New Chat
                  </button>
                </div>
              </div>

              {/* Dropdown menu (mobile) */}
              {open && (
                <div className="flex flex-col gap-2 mt-3 md:hidden">
                  {menuItems.map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setActiveTab(item);
                        setOpen(false);
                      }}
                      className={`p-2 rounded transition ${
                        activeTab === item
                          ? "bg-purple-600 text-white"
                          : "hover:text-purple-500 dark:text-gray-400 dark:hover:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Dynamic Form Section */}
          <form onSubmit={handleSubmit} className="p-3 space-y-4">
            {activeTab === "Files" && (
              <div className="flex items-center justify-center w-full ">
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full max-w-xs md:max-w-[95%] h-48 md:h-32 border-2 border-dashed rounded-2xl cursor-pointer dark:text-gray-200 border-gray-600 hover:border-purple-400
    hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:border-purple-400 transition p-4"
                >
                  <svg
                    className="w-12 h-12 mb-2 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5.978 
           5.978 0 0112 4c1.657 0 3.156.672 
           4.243 1.757A5.978 5.978 0 0120 
           10a4 4 0 01-1 7.874M15 13l-3-3m0 
           0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <h1 className="text-lg md:text-xl font-medium text-gray-600 dark:text-gray-200 text-center">
                    Click to upload
                  </h1>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-200 text-center mt-1">
                    PNG, JPEG, PDF up to 5MB
                  </p>
                  <input
                    id="file-upload"
                    type="file"
                    name="file"
                    className="hidden"
                    onChange={handleChange}
                  />
                </label>
              </div>
            )}

            {activeTab === "Text" && (
              <textarea
                name="text"
                rows="4"
                className="border dark:border-none p-2 rounded w-full dark:bg-gray-700 dark:text-white"
                placeholder="Type your text here"
                value={formData.text}
                onChange={handleChange}
              />
            )}

            {activeTab === "Websites" && (
              <input
                type="url"
                name="website"
                className="border dark:border-none p-2 rounded w-full dark:bg-gray-700 dark:text-white"
                placeholder="Enter website URL"
                value={formData.website}
                onChange={handleChange}
              />
            )}

            {activeTab === "YouTube" && (
              <input
                type="url"
                name="youtube"
                className="border dark:border-none p-2 rounded w-full dark:bg-gray-700 dark:text-white"
                placeholder="Enter YouTube URL"
                value={formData.youtube}
                onChange={handleChange}
              />
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
            >
              Submit
            </button>
          </form>

          {/* Processing Section */}
          <div className="m-3">
            <div
              className={` ${
                loading ? "block" : "hidden"
              } bg-blue-500 w-full border border-blue-500 dark:bg-blue-900 p-3 rounded-lg text-white font-semibold text-sm md:text-lg flex items-center gap-2`}
            >
              <span className="animate-spin h-4 w-4 border-2 border-t-transparent border-white rounded-full text-sm md:text-lg "></span>
              Processing<span className="ml-1">{text}...</span>
            </div>
            <div
              role="status"
              aria-live="polite"
              className={`${
                isVisible ? "block" : "hidden"
              } max-w-xl mx-auto mt-4 bg-green-200 dark:bg-[#1D3C34] border border-[#22C55E] text-green-800 rounded-lg shadow-sm flex items-center gap-3 p-3`}
            >
              <div className="flex-shrink-0 p-2 bg-green-200 rounded-full">
                {/* Check icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 00-1.414-1.414L8 11.172 4.707 7.879A1 1 0 103.293 9.293l4 4a1 1 0 001.414 0l8-8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <div className="flex-1 text-sm font-medium"></div>

              <button
                onClick={handleClose}
                aria-label="Close notification"
                className="flex-shrink-0 rounded hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                <IoMdClose className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        {/* Bottom Section */}
        <div className="h-[60vh] overflow-y-scroll">
          <Parent documents={document} sendDataToParent={handleId} />
        </div>
      </div>
    </>
  );
};

export default Left;
