import React, { useState, useRef, useCallback, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Upload, Link as LinkIcon, Eye, EyeOff, 
  AlertTriangle, CheckCircle, Settings, X, 
  FileImage, Trash2 
} from 'lucide-react';
import { AppContext } from '../context/AppContext';

const NudeDetector = () => {
  const { detectNudity } = useContext(AppContext);

  const [imageUrl, setImageUrl] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [error, setError] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        handleFileSelect(file);
      } else {
        setError('Please select a valid image file (JPG, PNG, GIF)');
      }
    }
  }, []);

  const handleFileSelect = (file) => {
    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10MB limit');
      return;
    }
    
    setUploadedFile(file);
    setImageUrl('');
    setPreviewUrl(URL.createObjectURL(file));
    setError('');
  };

  const handleFileInputChange = (e) => {
    if (e.target.files?.[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    setUploadedFile(null);
    setPreviewUrl(url);
  };

  const clearImage = () => {
    setUploadedFile(null);
    setImageUrl('');
    setPreviewUrl('');
    setResult(null);
    setShowImage(false);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageUrl.trim() && !uploadedFile) {
      setError('Please provide an image URL or upload an image');
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const formData = new FormData();
      
      if (uploadedFile) {
        formData.append('image', uploadedFile);
      } else if (imageUrl) {
        formData.append('url', imageUrl);
      }

      const data = await detectNudity(formData);

      if (data) {
        setResult(data);
      } else {
        setError('Analysis failed. Please try again.');
      }
    } catch (err) {
      setError('Analysis failed. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getSafetyStatus = (status) => {
    return status === 'Not Nudity' ? 'Safe' : 'Not Safe';
  };

  const getSafetyColor = (status) => {
    return status === 'Not Nudity' ? 'text-green-400' : 'text-red-400';
  };

  const getSafetyBg = (status) => {
    return status === 'Not Nudity' ? 'bg-green-400/10 border-green-400/20' : 'bg-red-400/10 border-red-400/20';
  };

  return (
    <div className="min-h-screen py-4 md:py-8 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4 md:mb-6"
        >
          <div className="inline-flex p-2 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 mb-2 md:mb-3">
            <Shield className="h-6 w-6 md:h-8 md:w-8 text-white" />
          </div>
          <h1 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2">
            NudeDetector
          </h1>
          <p className="text-gray-300 text-xs md:text-base max-w-2xl mx-auto px-2">
            AI-powered content moderation powered by Sightengine
          </p>
        </motion.div>

        <div className="flex flex-col space-y-4 md:grid md:grid-cols-1 lg:grid-cols-2 md:gap-4 lg:gap-5">
          {/* Left Column - Analysis Form & Results */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="space-y-4 md:space-y-5"
          >
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-4 md:p-5 border border-cyan-500/30 shadow-lg">
              <h2 className="text-md md:text-xl font-bold text-white mb-3 md:mb-4 flex items-center">
                <Settings className="mr-2 h-4 w-4 md:h-5 md:w-5 text-cyan-400" />
                Image Analysis
              </h2>

              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1 md:mb-2">
                    Upload Image
                  </label>
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-3 md:p-4 text-center ${
                      isDragOver
                        ? 'border-cyan-500 bg-cyan-500/10'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileInputChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    
                    {uploadedFile ? (
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-2 truncate">
                          <FileImage className="h-4 w-4 md:h-5 md:w-5 text-green-400 flex-shrink-0" />
                          <div className="text-left truncate">
                            <div className="text-white text-xs md:text-sm font-medium truncate max-w-[120px] md:max-w-xs">
                              {uploadedFile.name}
                            </div>
                            <div className="text-gray-400 text-2xs md:text-xs">
                              {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={clearImage}
                          className="ml-2 p-1 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/30 flex-shrink-0"
                          aria-label="Remove image"
                        >
                          <X className="h-3 w-3 md:h-4 md:w-4" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="h-5 w-5 md:h-6 md:w-6 text-gray-400 mx-auto mb-1 md:mb-2" />
                        <div className="text-white font-medium text-xs md:text-sm mb-1">
                          Drag & drop or click to upload
                        </div>
                        <div className="text-gray-400 text-2xs md:text-xs">
                          Supports JPG, PNG, GIF (Max 10MB)
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-xs md:text-sm">
                    <span className="px-2 bg-gray-900 text-gray-400">OR</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1 md:mb-2">
                    Image URL
                  </label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 md:h-4 md:w-4 text-gray-400" />
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={handleUrlChange}
                      placeholder="https://example.com/image.jpg"
                      className="w-full pl-8 md:pl-10 pr-3 md:pr-4 py-2 text-xs md:text-sm bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      disabled={!!uploadedFile}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <button
                    type="submit"
                    disabled={isLoading || (!imageUrl.trim() && !uploadedFile)}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 text-xs md:text-sm"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-3 w-3 md:h-4 md:w-4 border-b-2 border-white mr-2"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Shield className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                        Analyze Content
                      </>
                    )}
                  </button>

                  {(previewUrl || result) && (
                    <button
                      type="button"
                      onClick={clearImage}
                      className="px-3 py-2 bg-red-500/20 text-red-400 font-semibold rounded-lg hover:bg-red-500/30 flex items-center justify-center text-xs md:text-sm"
                    >
                      <Trash2 className="mr-1 h-3 w-3 md:h-4 md:w-4" />
                      Clear
                    </button>
                  )}
                </div>
              </form>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 md:mt-3 p-2 md:p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
                >
                  <div className="flex items-center text-red-400 text-xs md:text-sm">
                    <AlertTriangle className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                    <span>{error}</span>
                  </div>
                </motion.div>
              )}
            </div>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 md:p-4 rounded-xl border ${getSafetyBg(result.status)} shadow-lg`}
              >
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <h3 className="text-sm md:text-base font-bold text-white">Analysis Result</h3>
                  <div className={`px-2 py-1 rounded text-2xs md:text-xs text-cyan-400 bg-cyan-400/10 border border-cyan-400/30`}>
                    Sightengine
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="flex items-center p-2 bg-gray-800/30 rounded-lg">
                    {result.status === 'Not Nudity' ? (
                      <CheckCircle className="mr-2 h-4 w-4 md:h-5 md:w-5 text-green-400" />
                    ) : (
                      <AlertTriangle className="mr-2 h-4 w-4 md:h-5 md:w-5 text-red-400" />
                    )}
                    <div>
                      <div className="text-2xs md:text-xs text-gray-400">Nudity</div>
                      <div className={`text-xs md:text-sm font-semibold ${getSafetyColor(result.status)}`}>
                        {result.status === 'Not Nudity' ? 'No' : 'Yes'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center p-2 bg-gray-800/30 rounded-lg">
                    <div className="mr-2 h-4 w-4 md:h-5 md:w-5 flex items-center justify-center">
                      <div className={`text-xs font-bold ${getSafetyColor(result.status)}`}>
                        {result.percentage}%
                      </div>
                    </div>
                    <div>
                      <div className="text-2xs md:text-xs text-gray-400">Confidence</div>
                      <div className="text-2xs text-gray-300">
                        Certainty
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center p-2 bg-gray-800/30 rounded-lg">
                    <div className="mr-2 h-4 w-4 md:h-5 md:w-5 flex items-center justify-center">
                      <div className={`text-xs ${getSafetyColor(result.status)}`}>
                        {result.category === 'Nude' ? '🔞' : 
                         result.category === 'Semi-Nude' ? '⚠️' : '✅'}
                      </div>
                    </div>
                    <div>
                      <div className="text-2xs md:text-xs text-gray-400">Category</div>
                      <div className={`text-xs md:text-sm font-semibold ${getSafetyColor(result.status)}`}>
                        {result.category}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2 md:mt-3 bg-gray-800/30 rounded-lg p-2 md:p-3 border border-gray-700">
                  <h4 className="text-xs md:text-sm font-bold text-white mb-1">Safety Assessment</h4>
                  <div className="flex items-center justify-between p-2 bg-gray-900/40 rounded-lg">
                    <span className="text-gray-300 text-2xs md:text-xs">Overall Status</span>
                    <div className={`px-2 py-1 rounded font-bold text-2xs md:text-xs ${
                      result.status === 'Not Nudity' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {getSafetyStatus(result.status)}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right Column - Preview Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            {previewUrl && (
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-3 md:p-4 border border-cyan-500/30 shadow-lg h-[50vh] min-h-[250px] flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm md:text-base font-bold text-white">Image Preview</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setShowImage(!showImage)}
                      className="flex items-center px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500/20 text-xs"
                    >
                      {showImage ? (
                        <>
                          <EyeOff className="mr-1 h-3 w-3" />
                          Hide
                        </>
                      ) : (
                        <>
                          <Eye className="mr-1 h-3 w-3" />
                          Show
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <div className="relative rounded-lg overflow-hidden border border-gray-700 flex-1">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className={`w-full h-full object-contain bg-gray-900 ${!showImage ? 'blur-xl' : ''}`}
                    onError={() => setError('Failed to load image')}
                  />
                  {!showImage && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <div className="text-white text-xs font-medium bg-black/60 px-2 py-1 rounded">
                        Image Blurred for Privacy
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
        
        {/* Mobile floating action button */}
        {isMobile && (previewUrl || result) && (
          <div className="fixed bottom-4 right-4 z-10">
            <button
              onClick={clearImage}
              className="p-3 bg-red-500/90 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
              aria-label="Clear all"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NudeDetector;