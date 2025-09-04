import { FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-700 pb-8">
        {/* Left - Company Info */}
        <div>
          <h2 className="text-xl font-bold text-blue-400">Nooto</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-400">
            Transform how you work with information. Our AI-powered
            platform helps you analyze documents, websites, and videos to
            get intelligent insights and answers.
          </p>
          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-white text-xl">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-xl">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-xl">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Middle - Product */}
        <div>
          <h3 className="font-semibold text-white">Product</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Features</a></li>
            <li><a href="#" className="hover:text-white">Pricing</a></li>
            <li><a href="#" className="hover:text-white">API</a></li>
            <li><a href="#" className="hover:text-white">Documentation</a></li>
          </ul>
        </div>

        {/* Right - Company */}
        <div>
          <h3 className="font-semibold text-white">Company</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">About</a></li>
            <li><a href="#" className="hover:text-white">Blog</a></li>
            <li><a href="#" className="hover:text-white">Careers</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-gray-400">
        <p>© 2025 Nooto. All rights reserved.</p>
        <div className="flex gap-6 mt-2 md:mt-0">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}
