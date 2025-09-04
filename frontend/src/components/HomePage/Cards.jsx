import Card from "./Card";
import { IoEarth } from "react-icons/io5";
import { FaRegFaceSmile } from "react-icons/fa6";
import { FaRegQuestionCircle } from "react-icons/fa";
import { BsLightningCharge } from "react-icons/bs";
import { MdOutlinePrivacyTip } from "react-icons/md";

const Cards = () => {
  const cardData = [
    {
      title: "Upload Any File",
      description:
        "Support for PDFs, Word documents, images, and more. Our AI processes and understands your content instantly.",
      image: <IoEarth />,
    },
    {
      title: "Website Analysis",
      description:
        "Paste any website URL and our AI will analyze the content, extract key information, and answer your questions.",
      image: <FaRegFaceSmile />,
    },
    {
      title: "YouTube Integration",
      description:
        "Link YouTube videos and get AI-powered summaries, transcript analysis, and answer questions about the content.",
      image: <FaRegQuestionCircle />,
    },
    {
      title: "Intelligent Q&A",
      description:
        "Ask any question about your uploaded content and receive accurate, context-aware answers powered by advanced AI.",
      image: <BsLightningCharge />,
    },
    {
      title: "Upload Any File",
      description:
        "Support for PDFs, Word documents, images, and more. Our AI processes and understands your content instantly.",
      image: <MdOutlinePrivacyTip />,
    },
    {
      title: "Lightning Fast",
      description:
        "Get instant responses with our optimized AI processing. No waiting, no delays - just quick, accurate answers.",
      image: <MdOutlinePrivacyTip />,
    },
   
  ];
  return (
    <>
      {cardData.map((card, index) => (
        <Card
          key={index}
          card = {card}
        />
      ))}
    </>
  );
};

export default Cards;
