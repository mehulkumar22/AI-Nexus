import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Cpu, Shield, Image, Sparkles } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const tools = [
    {
      name: 'NudeDetector',
      path: '/nude-detector',
      icon: Shield,
      description: 'AI-powered content moderation',
      color: 'from-cyan-400 to-blue-500',
    },
    {
      name: 'Text-to-Image',
      path: '/text-to-image',
      icon: Image,
      description: 'Generate images from text',
      color: 'from-purple-400 to-pink-500',
    },
  ];

  return (
    <nav className="relative bg-gradient-to-r from-gray-900/95 via-black/95 to-gray-900/95 backdrop-blur-xl border-b border-cyan-500/20 z-50 shadow-lg shadow-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Cpu className="h-6 w-6 text-black" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Nexus
              </span>
              <span className="text-xs text-cyan-400/70 font-medium">One Platform. Infinite AI Power</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-all duration-300 hover:text-cyan-400 hover:glow-cyan ${
                isActive('/') ? 'text-cyan-400 glow-cyan' : 'text-gray-300'
              }`}
            >
              Home
            </Link>

            {/* Tools Dropdown */}
            <div className="relative">
              <button
                className="flex items-center space-x-2 text-sm font-medium text-gray-300 hover:text-cyan-400 transition-all duration-300"
                onMouseEnter={() => setIsToolsOpen(true)}
                onMouseLeave={() => setIsToolsOpen(false)}
                onClick={() => setIsToolsOpen(!isToolsOpen)}
              >
                <Sparkles className="h-4 w-4" />
                <span className="glow-cyan">AI Tools</span>
              </button>

              <AnimatePresence>
                {isToolsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-80 bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-900/95 backdrop-blur-xl rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 overflow-hidden z-50"
                    onMouseEnter={() => setIsToolsOpen(true)}
                    onMouseLeave={() => setIsToolsOpen(false)}
                  >
                    <div className="p-2">
                      {tools.map((tool) => (
                        <Link
                          key={tool.path}
                          to={tool.path}
                          className="flex items-center space-x-4 px-4 py-4 hover:bg-gray-800/50 transition-all duration-300 group rounded-xl border border-transparent hover:border-cyan-500/20"
                          onClick={() => setIsToolsOpen(false)}
                        >
                          <div
                            className={`p-3 bg-gradient-to-r ${tool.color} rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                          >
                            <tool.icon className="h-5 w-5 text-black" />
                          </div>
                          <div className="flex-1">
                            <div className="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors duration-300">
                              {tool.name}
                            </div>
                            <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                              {tool.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-sm font-medium text-gray-300 hover:text-cyan-400 hover:glow-purple transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="relative group px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-black text-sm font-bold rounded-xl hover:from-cyan-400 hover:to-purple-400 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                <span className="relative">Get Started</span>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl bg-gray-800/50 text-gray-300 hover:text-white hover:bg-gray-800/70 transition-all duration-300 border border-cyan-500/30"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-900/95 backdrop-blur-xl border-t border-cyan-500/20"
          >
            <div className="px-4 py-4 space-y-4">
              <Link
                to="/"
                className={`block text-sm font-medium transition-colors duration-200 hover:text-cyan-400 py-2 ${
                  isActive('/') ? 'text-cyan-400' : 'text-gray-300'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>

              {tools.map((tool) => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className="flex items-center space-x-3 py-3 px-3 hover:bg-gray-800/50 rounded-xl transition-all duration-300 border border-transparent hover:border-cyan-500/20"
                  onClick={() => setIsOpen(false)}
                >
                  <div className={`p-2 bg-gradient-to-r ${tool.color} rounded-lg`}>
                    <tool.icon className="h-4 w-4 text-black" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">{tool.name}</div>
                    <div className="text-xs text-gray-400">{tool.description}</div>
                  </div>
                </Link>
              ))}

              <Link
                to="/pricing"
                className={`block text-sm font-medium transition-colors duration-200 hover:text-purple-400 py-2 ${
                  isActive('/pricing') ? 'text-purple-400' : 'text-gray-300'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>

              <div className="pt-4 border-t border-gray-800 space-y-2">
                <Link
                  to="/login"
                  className="block w-full text-left text-sm font-medium text-gray-300 hover:text-purple-400 hover:glow-purple transition-colors duration-200 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="block w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-black text-sm font-bold rounded-xl hover:from-cyan-400 hover:to-purple-400 transition-all duration-200 text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .glow-cyan {
          text-shadow: 0 0 10px rgba(34, 211, 238, 0.5);
        }
        .glow-purple {
          text-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;