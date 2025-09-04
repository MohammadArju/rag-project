import { IoCloudDownloadOutline } from "react-icons/io5";
const Card = ({card}) => {
  return (
    <div className="border border-gray-200 rounded-2xl p-4">
      <div className="mb-4">
        <div class="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-3xl w-[4rem] flex items-center justify-center">
          {card.image}
        </div>

      </div>
      <div className="">
        <h2 className=" dark:text-white card-title">{card.title}</h2>
        <p className="text-gray-600 text-left dark:text-gray-400">
          {card.description}
        </p>
      </div>
    </div>
  );
};

export default Card;
