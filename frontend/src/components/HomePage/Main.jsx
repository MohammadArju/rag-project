
import Cards from "./Cards";
const Main = () => {
  return (
    <div className="w-full  pb-[4rem] dark:bg-gray-900">
      <div className="px-8 pt-14 flex text-center md:w-[85%] m-auto">
        <div>
          <h1 className="dark:text-white text-5xl md:text-6xl text-gray-900  font-bold mb-6">
            Powerful Features for{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
              Intelligent Analysis
            </span>
          </h1>
          <p className=" dark:text-white md:text-2xl text-xl text-gray-600 mb-6">
            Upload files, websites, and YouTube links. Ask questions and get
            intelligent answers based on your content. Transform how you
            interact with information.
          </p>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 place-items-center">
           <Cards />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
