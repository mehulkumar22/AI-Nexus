import { Link } from 'react-router-dom';
import { Github, Linkedin, Instagram, Cpu } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900/95 via-black/95 to-gray-900/95 border-t border-cyan-500/20 shadow-lg shadow-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Brand and Social Icons */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg shadow-lg shadow-cyan-500/25">
                <Cpu className="h-6 w-6 text-black" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                AI Nexus
              </span>
            </div>
            <p className="text-gray-400 text-sm max-w-md">
              Powerful AI tools for content moderation, image generation, and more.
            </p>
            <div className="flex items-center space-x-4 mt-6">
              <a href="https://github.com/mehulkumar22" target="_blank" rel="noopener noreferrer"
                className="p-2 bg-gray-800/50 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/70 transition-all duration-200">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/mehulkumar22" target="_blank" rel="noopener noreferrer"
                className="p-2 bg-gray-800/50 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/70 transition-all duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/_mehulmehta_" target="_blank" rel="noopener noreferrer"
                className="p-2 bg-gray-800/50 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/70 transition-all duration-200">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-left">
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href='#' className="text-gray-400 hover:text-white transition duration-200 text-sm">Home</a></li>
              <li><Link to="/login" className="text-gray-400 hover:text-white transition duration-200 text-sm">Login</Link></li>
              <li><Link to="/signup" className="text-gray-400 hover:text-white transition duration-200 text-sm">SignUp</Link></li>
            </ul>
          </div>

          {/* AI Tools */}
          <div className="text-left">
            <h3 className="text-white font-semibold mb-4">AI Tools</h3>
            <ul className="space-y-2">
              <li><Link to="/nude-detector" className="text-gray-400 hover:text-white transition duration-200 text-sm">NudeDetector</Link></li>
              <li><Link to="/text-to-image" className="text-gray-400 hover:text-white transition duration-200 text-sm">Text To Image</Link></li>
              <li><a href='#' className="text-gray-400 hover:text-white transition duration-200 text-sm">More Coming</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 AI Nexus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;