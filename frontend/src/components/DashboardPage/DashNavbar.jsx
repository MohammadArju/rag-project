import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { HiOutlineUser } from "react-icons/hi";

const DashNavbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
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
    <div className="sticky top-0   bg-white dark:bg-gray-800 border-b border-gray-200/60">
      <div className="dark:bg-gray-800 navbar bg-base-100 md:w-[95%] m-auto flex justify-between">
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

          <div className="dropdown dropdown-bottom dropdown-end ">
            <div
              tabIndex={0}
              role="button"
              className="bg-gradient-to-r from-blue-500 to-purple-500 btn text-2xl rounded-full w-12 h-12"
            >
              U
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52  shadow-lg"
            >
              <li>
                <a>
                  {" "}
                  <HiOutlineUser /> Profil
                </a>
              </li>
              <li>
                <a>
                  {" "}
                  <HiOutlineLogout /> Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashNavbar;
