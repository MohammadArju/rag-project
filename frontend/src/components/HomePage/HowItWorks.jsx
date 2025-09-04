import { FaCloudUploadAlt, FaLightbulb, FaRegQuestionCircle, FaBolt } from "react-icons/fa";

const steps = [
  {
    id: "01",
    title: "Upload Your Content",
    desc: "Start by uploading files, pasting website URLs, or adding YouTube links. Our platform supports multiple formats and sources.",
    icon: <FaCloudUploadAlt className="text-blue-500 text-3xl" />,
  },
  {
    id: "02",
    title: "AI Processing",
    desc: "Our advanced AI analyzes your content, extracts key information, and creates a comprehensive understanding of your materials.",
    icon: <FaLightbulb className="text-blue-500 text-3xl" />,
  },
  {
    id: "03",
    title: "Ask Questions",
    desc: "Interact with your content through natural language. Ask any question and get intelligent, context-aware answers.",
    icon: <FaRegQuestionCircle className="text-blue-500 text-3xl" />,
  },
  {
    id: "04",
    title: "Get Insights",
    desc: "Discover connections, patterns, and insights you might have missed. Our AI helps you understand your content better.",
    icon: <FaBolt className="text-blue-500 text-3xl" />,
  },
];

export default function HowItWorks() {
  return (
   <section className="py-16 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-800">
  <div>
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold dark:text-white">
        How It{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
          Works
        </span>
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl mx-auto">
        Getting started with Nooto is simple. Follow these four easy steps to unlock the power
        of AI-powered content analysis.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center max-w-6xl mx-auto">
      {steps.map((step) => (
        <div key={step.id} className="flex flex-col items-center">
          {/* Step Number */}
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
            {step.id}
          </div>

          {/* Icon */}
          <div className="mt-6 w-16 h-16 flex items-center justify-center rounded-xl bg-white dark:bg-gray-700 shadow-lg">
            {step.icon}
          </div>

          {/* Title & Description */}
          <h3 className="mt-4 font-semibold text-lg dark:text-white">{step.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 px-4 ">
            {step.desc}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

  );
}

