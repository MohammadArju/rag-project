import { FaRegFileAlt } from "react-icons/fa";
import { BiShareAlt } from "react-icons/bi";
import { HiOutlineLightBulb } from "react-icons/hi";
const Hero = () => {
  return (
    <div className="w-full bg-blue-50 pb-[4rem] dark:bg-gray-800">
      <div className="px-8 pt-14 flex text-center md:w-[85%] m-auto">
        <div>
          <h1 className=" dark:text-white text-5xl md:text-6xl text-gray-900  font-bold mb-6">
            Your AI-Powered{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
              NoteBook
            </span>
          </h1>
          <p className=" dark:text-white md:text-2xl text-xl text-gray-600 mb-6">
            Upload files, websites, and YouTube links. Ask questions and get
            intelligent answers based on your content. Transform how you
            interact with information.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transition duration-300 ease-in-out py-3 px-6 rounded-lg text-white text-xl ">
              Get started Free
            </button>
            <button className="py-3 px-6 rounded-lg text-blue-700 border border-blue-700 text-xl">
              Watch Demo
            </button>
          </div>
          <div class=" dark:bg-gray-700 flex flex-col items-center justify-center gap-5 md:flex-row md:justify-between w-full bg-white rounded-2xl shadow-lg p-8">
            <div className="flex flex-col items-center ">
              <div class="p-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white text-3xl w-[6rem] flex items-center justify-center">
                <FaRegFileAlt />
              </div>
              <h1 className="font-bold text-gray-800 dark:text-white">Upload File</h1>
              <p className="text-gray-600 dark:text-gray-400">PDT, docs, images</p>
            </div>
            <div className="flex flex-col items-center">
              <div class="p-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-3xl w-[6rem] flex items-center justify-center">
                <BiShareAlt />
              </div>
              <h1 className="font-bold text-gray-800 dark:text-white">Ask Questions</h1>
              <p className="text-gray-600 dark:text-gray-400">Get AI-powered answers</p>
            </div>
            <div className="flex flex-col items-center">
              <div class="p-4 rounded-xl bg-purple-600 text-white text-3xl w-[6rem] flex items-center justify-center">
                <HiOutlineLightBulb />
              </div>
              <h1 className="font-bold text-gray-800 dark:text-white">Smart Insights</h1>
              <p className="text-gray-600 dark:text-gray-400">Discover connections</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
