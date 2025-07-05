import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Download, RefreshCw, Sparkles, Settings, Palette, AlertTriangle, Copy, Image } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const Result = () => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('realistic');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  
  const { generateImage } = useContext(AppContext);

  const styles = [
    { value: 'realistic', label: 'Realistic', description: 'Photorealistic', gradient: 'from-blue-400 to-cyan-500', bgColor: 'bg-blue-500/20', textColor: 'text-blue-300' },
    { value: 'artistic', label: 'Artistic', description: 'Stylized art', gradient: 'from-purple-400 to-pink-500', bgColor: 'bg-purple-500/20', textColor: 'text-purple-300' },
    { value: 'anime', label: 'Anime', description: 'Anime style', gradient: 'from-pink-400 to-red-500', bgColor: 'bg-pink-500/20', textColor: 'text-pink-300' },
    { value: 'abstract', label: 'Abstract', description: 'Abstract art', gradient: 'from-green-400 to-teal-500', bgColor: 'bg-green-500/20', textColor: 'text-green-300' },
    { value: 'vintage', label: 'Vintage', description: 'Retro style', gradient: 'from-yellow-400 to-orange-500', bgColor: 'bg-yellow-500/20', textColor: 'text-yellow-300' },
    { value: 'futuristic', label: 'Futuristic', description: 'Sci-fi themed', gradient: 'from-cyan-400 to-purple-500', bgColor: 'bg-cyan-500/20', textColor: 'text-cyan-300' }
  ];

  const examplePrompts = [
    "Floating castle in the clouds",
    "Spaceship above alien ocean",
    "Smiling ghost with tiny hat",
    "Girl in flowy beach dress"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setIsLoading(true);
    setError('');
    setCopied(false);

    try {
      const imageUrl = await generateImage(prompt, style);
      setGeneratedImage(imageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `ai-generated-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = () => {
    if (!generatedImage) return;
    
    navigator.clipboard.writeText(generatedImage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetForm = () => {
    setGeneratedImage(null);
    setPrompt('');
    setError('');
  };

  return (
    <div className="min-h-screen py-4 md:py-8 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Animated Background - Desktop only */}
      <div className="hidden md:block fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 md:mb-8"
        >
          <div className="inline-flex p-2 md:p-3 rounded-xl md:rounded-2xl bg-gradient-to-r from-purple-400 to-pink-500 mb-3 md:mb-4 shadow-lg shadow-purple-500/25">
            <Image className="h-6 w-6 md:h-8 md:w-8 text-black" />
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-3">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Text-to-Image Generator
            </span>
          </h1>
          <p className="text-sm md:text-lg text-gray-300 max-w-2xl mx-auto px-2">
            Transform your ideas into stunning visual art with advanced AI
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/5 backdrop-blur-sm md:backdrop-blur-xl rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10 sticky top-4 md:top-8 shadow-lg md:shadow-2xl h-fit">
              <h2 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 flex items-center">
                <Settings className="mr-2 h-4 w-4 md:h-5 md:w-5 text-purple-400" />
                Generation Settings
              </h2>

              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                {/* Prompt Input */}
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1 md:mb-2">
                    Creative Prompt
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the image you want to create..."
                    rows={4}
                    className="w-full px-3 py-2 text-xs md:text-sm bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                  />
                </div>

                {/* Style Selection */}
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-300 mb-2 md:mb-3">
                    <Palette className="inline mr-1 h-3 w-3 md:h-4 md:w-4" />
                    Art Style
                  </label>
                  <div className="grid grid-cols-2 gap-1 md:gap-2">
                    {styles.map((styleOption) => (
                      <button
                        key={styleOption.value}
                        type="button"
                        onClick={() => setStyle(styleOption.value)}
                        className={`p-2 md:p-3 rounded-lg border text-left transition-all duration-200 ${
                          style === styleOption.value
                            ? `${styleOption.bgColor} border-purple-500 ${styleOption.textColor}`
                            : 'bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-800/70 hover:border-gray-500'
                        }`}
                      >
                        <div className="font-medium text-xs md:text-sm">{styleOption.label}</div>
                        <div className="text-xs opacity-80">{styleOption.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  type="submit"
                  disabled={isLoading || !prompt.trim()}
                  className="w-full flex items-center justify-center px-3 py-2 md:px-4 md:py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-black font-bold rounded-lg hover:from-purple-400 hover:to-pink-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg shadow-purple-500/25 text-xs md:text-sm"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-3 w-3 md:h-4 md:w-4 border-b-2 border-black mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                      Generate Image
                    </>
                  )}
                </button>
              </form>

              {/* Example Prompts */}
              <div className="mt-4 md:mt-6">
                <h3 className="text-xs md:text-sm font-semibold text-white mb-2 md:mb-3 flex items-center">
                  <Sparkles className="mr-1 h-3 w-3 md:h-4 md:w-4 text-purple-400" />
                  Example Prompts
                </h3>
                <div className="space-y-1 md:space-y-2">
                  {examplePrompts.map((examplePrompt, index) => (
                    <button
                      key={index}
                      onClick={() => setPrompt(examplePrompt)}
                      className="w-full text-left p-2 bg-gray-800/30 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-800/50 hover:border-purple-500/30 transition-all duration-200 text-xs"
                    >
                      {examplePrompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 md:mt-4 p-2 md:p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                >
                  <div className="flex items-center text-red-400 text-xs md:text-sm">
                    <AlertTriangle className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                    {error}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2"
          >
            {generatedImage ? (
              <div className="space-y-4 md:space-y-6">
                {/* Result Header */}
                <div className="bg-white/5 backdrop-blur-sm md:backdrop-blur-xl rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10 shadow-lg md:shadow-2xl">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 md:mb-4">
                    <div className="flex-1">
                      <h3 className="text-base md:text-lg font-bold text-white mb-1 md:mb-2">Generated Artwork</h3>
                      <p className="text-gray-300 text-xs md:text-sm">"{prompt}"</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-1 md:gap-2">
                    <div className="px-2 py-1 md:px-3 md:py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium">
                      {style.charAt(0).toUpperCase() + style.slice(1)} Style
                    </div>
                    <div className="px-2 py-1 md:px-3 md:py-1 bg-pink-500/20 text-pink-300 rounded-full text-xs font-medium">
                      High Quality
                    </div>
                  </div>
                </div>

                {/* Generated Images */}
                <div className="bg-white/5 backdrop-blur-sm md:backdrop-blur-xl rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10 shadow-lg md:shadow-2xl">
                  <div className="flex justify-between items-center mb-3 md:mb-4">
                    <h3 className="text-base md:text-lg font-bold text-white">Generated Image</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={resetForm}
                        className="flex items-center justify-center px-3 py-1 md:px-4 md:py-2 bg-white/10 text-white rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200 text-xs md:text-sm"
                      >
                        <RefreshCw className="mr-1 h-3 w-3 md:h-4 md:w-4" />
                        New Image
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="flex items-center justify-center px-3 py-1 md:px-4 md:py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-black font-bold rounded-lg hover:from-purple-400 hover:to-pink-400 disabled:opacity-50 transition-all duration-200 text-xs md:text-sm"
                      >
                        Regenerate
                      </button>
                    </div>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Image container */}
                    <div className="relative rounded-lg overflow-hidden mb-3 md:mb-4">
                      <div className="bg-gray-900 flex justify-center" style={{ minHeight: '40vh' }}>
                        {isLoading ? (
                          <div className="flex items-center justify-center w-full">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500"></div>
                          </div>
                        ) : (
                          <img
                            src={generatedImage}
                            alt={`Generated image from: ${prompt}`}
                            className="h-auto w-full max-h-[70vh] object-contain"
                          />
                        )}
                      </div>
                      {/* Loading bar */}
                      {isLoading && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500">
                          <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 animate-loading-bar"></div>
                        </div>
                      )}
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={copyToClipboard}
                        className={`p-2 md:p-3 rounded-lg border transition-all duration-200 flex items-center text-xs md:text-sm ${
                          copied 
                            ? 'bg-green-500/20 border-green-500 text-green-300' 
                            : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700/70'
                        }`}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        {copied ? 'Copied!' : 'Copy Link'}
                      </button>
                      <button
                        onClick={handleDownload}
                        className="p-2 md:p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-black font-bold rounded-lg hover:from-purple-400 hover:to-pink-400 transition-all duration-200 flex items-center text-xs md:text-sm"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            ) : (
              <div className="bg-white/5 backdrop-blur-sm md:backdrop-blur-xl rounded-xl md:rounded-2xl p-6 md:p-8 border border-white/10 text-center shadow-lg md:shadow-2xl">
                <div className="inline-flex p-3 md:p-4 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 mb-3 md:mb-4">
                  <Image className="h-6 w-6 md:h-8 md:w-8 text-purple-400" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">Ready to Create?</h3>
                <p className="text-gray-300 mb-4 md:mb-6 max-w-md mx-auto text-sm md:text-base">
                  Enter your creative prompt and style preferences to generate stunning AI artwork.
                </p>
                <div className="text-xs md:text-sm text-gray-400">
                  💡 Tip: Be specific and creative for better results!
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Result;