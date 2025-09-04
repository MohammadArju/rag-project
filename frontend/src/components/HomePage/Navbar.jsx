import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    if(darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };
  return (
    <div className="sticky top-0   bg-white dark:bg-gray-800">
      <div className="dark:bg-gray-800 navbar bg-base-100 md:w-[80%] m-auto flex justify-between">
        <a className="btn btn-ghost text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          Nooto
        </a>
        <div className=" flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="text-2xl bg-gray-300 p-2 rounded-lg"
          >
            {darkMode ? <IoMoonOutline /> : <IoSunnyOutline />}
          </button>
          <a href="dashboard"
            className="px-6 py-2 rounded-lg text-white font-semibold 
  bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transition duration-300 ease-in-out hover:cursor-pointer"
          >
            Try Nooto
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
