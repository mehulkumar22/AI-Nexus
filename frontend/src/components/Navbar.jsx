import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Cpu, Shield, Image, Sparkles, LogOut, User, Star } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const { setShowLogin, user, credit, logout } = useContext(AppContext);

  const [isOpen, setIsOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
              className={`text-sm font-medium transition-all duration-300 hover:text-cyan-400 ${isActive('/') ? 'text-cyan-400' : 'text-gray-300'}`}
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
                <span>AI Tools</span>
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
                          <div className={`p-3 bg-gradient-to-r ${tool.color} rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
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

            {/* Pricing button only when not logged in */}
            {!user && (
              <p
                onClick={() => navigate('/buy')}
                className="cursor-pointer text-sm font-medium text-gray-300 hover:text-cyan-400 transition-all duration-300"
              >
                Pricing
              </p>
            )}

            {/* Credits button only when logged in */}
            {user && (

            <button
              onClick={() => navigate('/buy')}
              className="flex items-center gap-1 bg-gradient-to-r from-purple-400 to-cyan-500 px-3 py-2 rounded-full shadow hover:shadow-md transform hover:scale-105 transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-yellow-400 fill-current drop-shadow-sm" viewBox="0 0 24 24">
                <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.909 1.528 8.285L12 18.896l-7.464 4.604 1.528-8.285-6.064-5.909 8.332-1.151z"/>
              </svg>
              <p className="text-xs font-semibold text-white-900">Credits: {credit}</p>
            </button>

            )}

            {/* User Dropdown */}
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-1 text-sm text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                >
                  <User className="h-5 w-5" />
                  <span>{user?.name || 'User'}</span>
                </button>
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 15, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="absolute right-0 top-full mt-4 w-72 z-50"
                    >
                      {/* Gradient Border Wrapper */}
                      <div className="p-[1px] rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 shadow-2xl shadow-black/40">
                        <div className="bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-900/95 backdrop-blur-lg rounded-2xl">
                          <div className="px-5 py-4 space-y-2">
                            <div className="flex items-center space-x-2">
                              <User className="h-5 w-5 text-cyan-400" />
                              <span className="text-sm font-semibold text-white">{user?.name || 'User'}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-cyan-400">Email:</span>
                              <span className="text-sm text-gray-300 break-words">{user?.email || 'Not available'}</span>
                            </div>
                          </div>

                          <div className="border-t border-gray-700"></div>

                          <button
                            onClick={() => {
                              handleLogout();
                              setIsUserMenuOpen(false);
                            }}
                            className="w-full text-left px-5 py-3 text-sm text-gray-300 hover:bg-gray-800/70 hover:text-red-400 rounded-b-2xl transition-all duration-200"
                          >
                            <LogOut className="inline h-4 w-4 mr-2" />
                            Logout
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>


              </div>
            ) : (

          /* Mobile menu button */
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowLogin(true)}
              className="relative inline-flex items-center justify-center px-8 py-2 sm:px-10 sm:py-2 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              <span className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full blur opacity-25 group-hover:opacity-40 transition"></span>
              <span className="relative">Login</span>
            </button>
          </div>

            )}
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4 pb-4 rounded-b-2xl border-t border-cyan-500/30 shadow-inner space-y-4"
          >
            {/* User Info */}
            {user && (
              <div className="flex flex-col items-center space-y-1 border-b border-gray-700 pb-3">
                {/* Gradient Border Wrapper */}
            <div className="w-full px-2 my-4">
              <div className="flex items-center space-x-2 justify-center">
                <User className="h-5 w-5 text-cyan-400" />
                <span className="text-sm font-semibold text-white">{user?.name || 'User'}</span>
              </div>
              <div className="flex items-center space-x-2 justify-center mt-2">
                <span className="text-xs text-cyan-400">Email:</span>
                <span className="text-sm text-gray-300 break-words text-center">{user?.email || 'Not available'}</span>
              </div>
            </div>
          </div>
            )}


      {/* Credits button only when logged in */}
      {user && (
      <button
        onClick={() => { navigate('/buy'); setIsOpen(false); }}
        className="w-full flex items-center justify-center gap-1 bg-gradient-to-r from-purple-400 to-cyan-500 px-3 py-2 rounded-full shadow hover:shadow-md transform hover:scale-105 transition-all duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-yellow-400 fill-current drop-shadow-sm" viewBox="0 0 24 24">
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.909 1.528 8.285L12 18.896l-7.464 4.604 1.528-8.285-6.064-5.909 8.332-1.151z"/>
        </svg>
        <p className="text-xs font-semibold text-black">Credits: {credit}</p>
      </button>
      )}

      {/* AI Tools */}
      <div>
        <p className="text-xs uppercase tracking-widest text-cyan-400/70 mb-1">AI Tools</p>
        {tools.map((tool) => (
          <Link
            key={tool.path}
            to={tool.path}
            className="block px-2 py-2 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-cyan-400 transition-all duration-300"
            onClick={() => setIsOpen(false)}
          >
            {tool.name}
          </Link>
        ))}
      </div>

      {/* Account Section */}
      <div>
        <p className="text-xs uppercase tracking-widest text-cyan-400/70 mb-1">Account</p>
        {user ? (
          <button
            onClick={() => { handleLogout(); setIsOpen(false); }}
            className="w-full text-left px-2 py-2 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-red-400 transition-all duration-300"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => { setShowLogin(true); setIsOpen(false); }}
            className="w-full text-left px-2 py-2 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-cyan-400 transition-all duration-300"
          >
            Login
          </button>
        )}
      </div>
    </motion.div>
  )}
</AnimatePresence>


    </nav>
  );
};

export default Navbar;
