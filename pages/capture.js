import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import Head from 'next/head';
import { FaCamera, FaDownload, FaTrash, FaTimes, FaFilter } from 'react-icons/fa';
import CapturePage from '../styles/CapturePage.module.css';
import Webcam from 'react-webcam';

// Constants
const maxPhotos = 4;
const FILTERS = [
  { name: 'None', value: 'none' },
  { name: 'Sepia Tone', value: 'sepia(1) contrast(1.1) brightness(1.05)' },
  { name: 'Black & White', value: 'grayscale(1) contrast(1.2) brightness(1.05)' },
  { name: 'Vintage', value: 'sepia(0.7) contrast(1.15) brightness(1.12) saturate(1.3) hue-rotate(-10deg)' },
  { name: 'Warm', value: 'brightness(1.08) contrast(0.9) sepia(0.2) saturate(1.2)' },
  { name: 'Cool', value: 'contrast(1.1) brightness(1.05) sepia(0.3) hue-rotate(-20deg) saturate(1.2)' },
  { name: 'Polaroid', value: 'contrast(1.1) brightness(1.15) sepia(0.3) saturate(1.1)' },
  { name: 'Pastel', value: 'saturate(0.7) brightness(1.15) contrast(0.95)' },
  { name: 'Green Tint', value: 'sepia(0.5) hue-rotate(60deg) saturate(0.8)' },
  { name: 'Orange Tone', value: 'sepia(0.7) hue-rotate(-20deg) saturate(1.3)' },
  { name: 'Grainy', value: 'blur(1px) contrast(1.1) brightness(1.05)' },
  { name: 'Juno', value: 'contrast(1.15) brightness(1.15) saturate(1.8) sepia(0.2)' },
  { name: 'Gingham', value: 'contrast(1.1) brightness(1.05) sepia(0.04)' },
  { name: 'Slumber', value: 'contrast(0.9) brightness(1.05) sepia(0.35) saturate(1.25)' },
  { name: 'Reyes', value: 'brightness(1.1) contrast(0.85) sepia(0.22)' },
  { name: 'Aden', value: 'sepia(0.2) brightness(1.15) saturate(1.4) hue-rotate(-20deg)' }
];

// Background images are now passed via URL parameters

export default function Capture() {
  const webcamRef = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [filters, setFilters] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [stickers, setStickers] = useState([]);
  const [layout, setLayout] = useState('strip');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasWebcamAccess, setHasWebcamAccess] = useState(false);
  const router = useRouter();

  // Set background image and stickers from URL parameters and initialize layout
  useEffect(() => {
    if (router.query.backgroundUrl) {
      const decodedUrl = decodeURIComponent(router.query.backgroundUrl);
      setBackgroundImage(decodedUrl);
      
      // Parse stickers if they exist in the URL
      if (router.query.stickers) {
        try {
          const decodedStickers = decodeURIComponent(router.query.stickers);
          const parsedStickers = JSON.parse(decodedStickers);
          setStickers(Array.isArray(parsedStickers) ? parsedStickers : []);
        } catch (error) {
          console.error('Error parsing stickers:', error);
          setStickers([]);
        }
      }
      
      // Set body styles
      document.body.style.background = '#111';
      document.body.style.margin = '0';
      document.body.style.padding = '0';
      document.body.style.overflowX = 'hidden';
    } else {
      document.body.style.background = '#ffffff';
      document.body.style.backgroundImage = 'none';
      setStickers([]);
    }
  }, [router.query.backgroundUrl]);

  useEffect(() => {
    const handleLayoutChange = () => {
      if (router.query.layout && ['strip', 'grid'].includes(router.query.layout)) {
        setLayout(router.query.layout);
      }
    };

    handleLayoutChange();
  }, [router.query.layout]);

  useEffect(() => {
    const checkWebcamAccess = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach(track => track.stop());
        setHasWebcamAccess(true);
      } catch (error) {
        setError('Failed to access webcam. Please check your camera permissions.');
        setHasWebcamAccess(false);
      }
    };

    checkWebcamAccess();

    return () => {
      if (webcamRef.current) {
        const stream = webcamRef.current.video?.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
        }
      }
    };
  }, []);

  const capturePhoto = async () => {
    try {
      setLoading(true);
      
      if (!webcamRef.current) {
        throw new Error('Webcam not initialized');
      }

      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setPhotos(prev => [...prev, imageSrc]);
        setFilters(prev => [...prev, 'none']);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to capture photo');
    } finally {
      setLoading(false);
    }
  };

  const downloadPhotos = async () => {
    try {
      if (photos.length === 0) {
        throw new Error('No photos to download!');
      }

      setLoading(true);
      setError('');

      // Helper function to load an image with better error handling
      const loadImage = (src, isBackground = false) => {
        return new Promise((resolve, reject) => {
          const img = new window.Image();
          
          // Handle CORS for external images
          if (src.startsWith('http') && !src.startsWith(window.location.origin)) {
            // If the image is from a different origin, try to use a proxy
            const proxyUrl = `https://cors-anywhere.herokuapp.com/${src}`;
            img.crossOrigin = 'Anonymous';
            img.src = proxyUrl;
          } else {
            // For same-origin images or data URLs
            img.crossOrigin = 'Anonymous';
            img.src = src;
          }

          let timeout = setTimeout(() => {
            reject(new Error(`Image loading timed out: ${isBackground ? 'Background' : 'Photo'}`));
          }, 10000); // 10 second timeout

          img.onload = () => {
            clearTimeout(timeout);
            resolve(img);
          };
          
          img.onerror = (e) => {
            clearTimeout(timeout);
            console.error(`Error loading ${isBackground ? 'background' : 'photo'} image:`, e);
            // If proxy fails, try direct load as fallback
            if (img.src !== src) {
              console.log('Trying direct load...');
              img.crossOrigin = 'Anonymous';
              img.src = src;
            } else {
              reject(new Error(`Failed to load ${isBackground ? 'background' : 'photo'} image`));
            }
          };
        });
      };

      // Load all images including the background with better error handling
      let bgImage = null;
      const imgEls = [];

      try {
        // Try to load background image if it exists
        if (backgroundImage) {
          bgImage = await loadImage(backgroundImage, true);
        }
      } catch (err) {
        console.warn('Could not load background image, using fallback:', err);
        // Continue with a fallback background
        bgImage = null;
      }

      // Load all photos
      for (let i = 0; i < photos.length; i++) {
        try {
          const img = await loadImage(photos[i]);
          imgEls.push(img);
        } catch (err) {
          console.error(`Error loading photo ${i + 1}:`, err);
          throw new Error(`Failed to load photo ${i + 1}. Please try capturing again.`);
        }
      }

      // Use first photo dimensions as reference
      const photoWidth = 800; // Increased width for better quality
      const photoHeight = 1000; // Increased height for better proportions
      const photoAspectRatio = photoWidth / photoHeight;
      
      // Calculate canvas dimensions based on layout and number of photos
      let canvasWidth, canvasHeight;
      let photosPerRow;
      
      if (layout === 'strip') {
        photosPerRow = 1;
        const photoSpacing = 60; // Increased spacing between photos
        const sidePadding = 100; // Increased side padding
        const verticalPadding = 80; // Increased vertical padding
        
        canvasWidth = photoWidth + (sidePadding * 2); // Add padding on both sides
        canvasHeight = (photoHeight * photos.length) + (verticalPadding * 2) + (photoSpacing * (photos.length - 1));
      } else { // grid layout
        photosPerRow = 2;
        const photoSpacing = 40;
        const sidePadding = 60;
        const verticalPadding = 60;
        const rows = Math.ceil(photos.length / photosPerRow);
        
        canvasWidth = (photoWidth * photosPerRow) + (sidePadding * 2) + (photoSpacing * (photosPerRow - 1));
        canvasHeight = (photoHeight * rows) + (verticalPadding * 2) + (photoSpacing * (rows - 1));
      }

      // Create canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      // Set canvas dimensions
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      
      // Set filename
      const filename = `photo-${layout}-${new Date().getTime()}.png`;

      // Draw background if available
      if (bgImage) {
        // Draw the background image to cover the entire canvas height while maintaining aspect ratio
        ctx.save();
        
        // Calculate aspect ratios
        const bgAspectRatio = bgImage.width / bgImage.height;
        const canvasAspectRatio = canvasWidth / canvasHeight;
        
        let bgWidth, bgHeight, offsetX = 0, offsetY = 0;
        
        if (bgAspectRatio > canvasAspectRatio) {
          // Background is wider than canvas relative to height
          bgHeight = canvasHeight;
          bgWidth = bgHeight * bgAspectRatio;
          offsetX = (canvasWidth - bgWidth) / 2; // Center horizontally
        } else {
          // Background is taller than canvas relative to width
          bgWidth = canvasWidth;
          bgHeight = bgWidth / bgAspectRatio;
          offsetY = (canvasHeight - bgHeight) / 2; // Center vertically
        }
        
        // Draw the background image
        ctx.drawImage(bgImage, offsetX, offsetY, bgWidth, bgHeight);
        
        // Add a subtle overlay to ensure photos are readable
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        
        ctx.restore();
      } else {
        // Fallback to a solid color background
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      }

      // Calculate spacing between photos
      const horizontalPadding = layout === 'strip' ? 100 : 60;
      const verticalPadding = layout === 'strip' ? 80 : 60;
      const photoSpacing = layout === 'strip' ? 60 : 40;

      // Draw each photo with shadow and border
      for (let i = 0; i < imgEls.length; i++) {
        const img = imgEls[i];
        const filter = filters[i] || 'none';
        
        // Calculate position based on layout
        let x, y;
        if (layout === 'strip') {
          x = (canvasWidth - photoWidth) / 2; // Center horizontally
          y = verticalPadding + (i * (photoHeight + photoSpacing));
        } else { // grid layout
          const row = Math.floor(i / photosPerRow);
          const col = i % photosPerRow;
          x = horizontalPadding + (col * (photoWidth + photoSpacing));
          y = verticalPadding + (row * (photoHeight + photoSpacing));
        }

        // Create a temporary canvas for the photo with filter
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = photoWidth;
        tempCanvas.height = photoHeight;
        const tempCtx = tempCanvas.getContext('2d');
        if (!tempCtx) continue;

        // Apply filter if specified
        if (filter !== 'none') {
          tempCtx.filter = filter;
        }

        // Calculate dimensions to maintain aspect ratio
        const imgAspectRatio = img.width / img.height;
        let drawWidth, drawHeight, offsetX = 0, offsetY = 0;
        
        if (imgAspectRatio > photoAspectRatio) {
          // Image is wider than the photo area
          drawHeight = photoHeight;
          drawWidth = drawHeight * imgAspectRatio;
          offsetX = (photoWidth - drawWidth) / 2; // Center horizontally
        } else {
          // Image is taller than the photo area
          drawWidth = photoWidth;
          drawHeight = drawWidth / imgAspectRatio;
          offsetY = (photoHeight - drawHeight) / 2; // Center vertically
        }

        // Draw the image centered in the temporary canvas
        tempCtx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

        // Prepare to draw the photo without shadow or border
        ctx.save();
        
        // Draw the photo with rounded corners
        const cornerRadius = 10;
        ctx.beginPath();
        ctx.moveTo(x + cornerRadius, y);
        ctx.lineTo(x + photoWidth - cornerRadius, y);
        ctx.quadraticCurveTo(x + photoWidth, y, x + photoWidth, y + cornerRadius);
        ctx.lineTo(x + photoWidth, y + photoHeight - cornerRadius);
        ctx.quadraticCurveTo(x + photoWidth, y + photoHeight, x + photoWidth - cornerRadius, y + photoHeight);
        ctx.lineTo(x + cornerRadius, y + photoHeight);
        ctx.quadraticCurveTo(x, y + photoHeight, x, y + photoHeight - cornerRadius);
        ctx.lineTo(x, y + cornerRadius);
        ctx.quadraticCurveTo(x, y, x + cornerRadius, y);
        ctx.closePath();
        
        // Clip to the rounded rectangle
        ctx.clip();
        
        // Draw the image
        ctx.drawImage(tempCanvas, x, y, photoWidth, photoHeight);
        
        // Draw stickers for this photo
        stickers.forEach(sticker => {
          const stickerImg = new Image();
          stickerImg.src = sticker.url;
          
          // Calculate sticker position relative to the photo
          const stickerX = x + (sticker.x / 100 * photoWidth);
          const stickerY = y + (sticker.y / 100 * photoHeight);
          const stickerSize = 80 * (sticker.scale || 1);
          
          // Save the context to apply transformations
          ctx.save();
          
          // Move to the center of the sticker, rotate, then draw
          ctx.translate(stickerX, stickerY);
          ctx.rotate((sticker.rotation || 0) * Math.PI / 180);
          
          // Draw the sticker
          ctx.drawImage(
            stickerImg, 
            -stickerSize / 2, // x position (centered)
            -stickerSize / 2, // y position (centered)
            stickerSize,      // width
            stickerSize       // height
          );
          
          // Restore the context
          ctx.restore();
        });
        
        // Restore the context
        ctx.restore();
        
      }
      
      // Add a subtle gradient overlay at the bottom for branding
      const gradient = ctx.createLinearGradient(0, canvasHeight - 100, 0, canvasHeight);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0.8)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, canvasHeight - 100, canvasWidth, 100);
      
      // Add a subtle watermark
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.font = 'italic 24px Arial';
      ctx.textAlign = 'right';
      ctx.fillText('PhotoBooth Pro', canvasWidth - 30, canvasHeight - 30);

      // Convert canvas to blob for better performance with large images
      canvas.toBlob((blob) => {
        if (!blob) {
          throw new Error('Failed to create image blob');
        }
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = filename;
        link.href = url;
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        
        // Clean up
        setTimeout(() => {
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          canvas.remove();
        }, 100);
      }, 'image/png', 1.0); // Maximum quality

    } catch (error) {
      console.error('Download error:', error);
      setError(error.message || 'Failed to download photos. Please try again.');
      
      // Auto-hide error after 5 seconds
      setTimeout(() => {
        setError('');
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
    setFilters(filters.filter((_, i) => i !== index));
  };

    const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Layout>
        <Head>
          <title>Photo Booth - Capture Your Moments with Style</title>
          <meta name="description" content="Create stunning photo strips and grids with our advanced photo booth. Add filters, backgrounds, and effects to make your memories unforgettable." />
        </Head>
        
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 transform -skew-y-3 -translate-y-12"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-6 shadow-lg">
                <FaCamera className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Capture Your</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Best Moments</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Create stunning photo strips and grids with our advanced photo booth. Add filters, backgrounds, and effects to make your memories truly unforgettable.
              </p>
              {photos.length > 0 && (
                <div className="mt-6 inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-100">
                  <span className="flex h-3 w-3 relative mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    {photos.length} {photos.length === 1 ? 'Photo' : 'Photos'} Captured
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Webcam Preview Section */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 transform transition-all duration-300 hover:shadow-2xl border border-gray-100">
            {!hasWebcamAccess ? (
              <div className="p-12 text-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-br from-red-50 to-red-100 mb-6 shadow-inner p-4">
                  <FaTimes className="h-12 w-12 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Camera Access Required</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">Please allow camera access to use the photo booth. Make sure your camera is connected and not in use by another application.</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 pointer-events-none">
                  <div className="text-white text-sm bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="flex items-center">
                      <span className="flex h-2 w-2 mr-2">
                        <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                      </span>
                      Ready to capture!
                    </span>
                  </div>
                </div>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="w-full h-auto block"
                  style={{
                    filter: 'brightness(1.02) contrast(1.05) saturate(1.1)',
                    aspectRatio: '4/3',
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover'
                  }}
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <button
              onClick={capturePhoto}
              disabled={!hasWebcamAccess || loading || photos.length >= maxPhotos}
              className={`flex items-center px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg transition-all duration-200 ${
                !hasWebcamAccess || photos.length >= maxPhotos 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:shadow-md hover:scale-105'
              }`}
            >
              <FaCamera className="mr-3 text-xl" />
              {loading ? (
                <span className="flex items-center">
                  <span className="inline-block w-2 h-2 bg-white rounded-full mr-1 animate-bounce"></span>
                  <span className="inline-block w-2 h-2 bg-white rounded-full mr-1 animate-bounce" style={{animationDelay: '0.1s'}}></span>
                  <span className="inline-block w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                </span>
              ) : photos.length >= maxPhotos ? (
                <span className="flex items-center">
                  <span className="mr-1">🎉</span> All Set!
                </span>
              ) : (
                'Take Photo'
              )}
            </button>
            
            <button
              onClick={downloadPhotos}
              disabled={photos.length === 0}
              className={`flex items-center px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg transition-all duration-200 ${
                photos.length === 0 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transform hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:shadow-md hover:scale-105'
              }`}
            >
              <FaDownload className="mr-3 text-xl" />
              <span className="flex items-center">
                Download {photos.length > 0 && <span className="ml-1.5 px-2 py-0.5 bg-white/20 rounded-full text-sm">{photos.length}</span>}
              </span>
            </button>
            
            {photos.length > 0 && (
              <button
                onClick={() => setPhotos([])}
                className="flex items-center px-6 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-lg shadow-lg transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:shadow-md hover:scale-105"
              >
                <FaTrash className="mr-3 text-xl" />
                Clear All
              </button>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg shadow-md">
              <div className="flex items-start">
                <FaTimes className="flex-shrink-0 mt-1 mr-3 text-red-500" />
                <p className="font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Gallery Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-100 transition-all duration-300 hover:shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <span className="mr-2">📸</span> Your Photo Gallery
              </h2>
              {photos.length > 0 && (
                <div className="flex items-center mt-2 sm:mt-0">
                  <div className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-full px-3 py-1.5 border border-gray-100">
                    <span className="flex h-2 w-2 relative mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    <span>{photos.length} of {maxPhotos} slots used</span>
                  </div>
                </div>
              )}
            </div>
            
            {photos.length === 0 ? (
              <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-200 hover:border-blue-300 transition-colors duration-200">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center shadow-inner">
                  <FaCamera className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">Your gallery is empty</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">Click the button below to capture your first moment.</p>
                <button
                  onClick={capturePhoto}
                  disabled={!hasWebcamAccess || loading}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Capture First Photo
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {photos.map((photo, index) => (
                  <div key={index} className="relative group" style={{ perspective: '1000px' }}>
                    <div 
                      className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 transform transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 group-hover:scale-[1.02]"
                      style={{
                        transformStyle: 'preserve-3d',
                        transform: 'rotateY(0deg)',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                      }}
                    >
                      <img
                        src={photo}
                        alt={`Captured ${index + 1}`}
                        className="w-full h-full object-cover"
                        style={{ 
                          filter: filters[index] || 'none',
                          transition: 'all 0.3s ease',
                          transform: 'translateZ(20px)'
                        }}
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-3">
                        <div className="flex justify-end">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removePhoto(index);
                            }}
                            className="w-9 h-9 flex items-center justify-center bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200 hover:bg-red-600 shadow-md hover:scale-110"
                            aria-label="Remove photo"
                          >
                            <FaTimes className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        
                        <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                          <div className="relative">
                            <select
                              value={filters[index] || 'none'}
                              onChange={(e) => {
                                const newFilters = [...filters];
                                newFilters[index] = e.target.value;
                                setFilters(newFilters);
                              }}
                              className="w-full bg-white/90 border border-gray-200 text-gray-800 text-sm rounded-lg py-2 pl-3 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm hover:bg-white transition-colors"
                              aria-label="Select filter"
                            >
                              <option value="none">No Filter</option>
                              {FILTERS.filter(f => f.value !== 'none').map((filter) => (
                                <option key={filter.value} value={filter.value}>
                                  {filter.name}
                                </option>
                              ))}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                              <FaFilter className="h-3 w-3 text-gray-500" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center justify-between px-1">
                      <span className="text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-gray-100">
                        Photo {index + 1}
                      </span>
                      <span className="text-xs text-gray-400 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-gray-100">
                        {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                  </div>
                ))}
                
                {photos.length < maxPhotos && (
                  <button
                    onClick={capturePhoto}
                    disabled={!hasWebcamAccess || loading}
                    className="aspect-[3/4] flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 hover:border-blue-300 bg-gray-50 hover:bg-blue-50 transition-all duration-200 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center mb-3 group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-200 shadow-inner">
                      <FaCamera className="h-5 w-5 text-blue-600 group-hover:text-blue-700" />
                    </div>
                    <span className="text-sm font-medium text-gray-600 group-hover:text-gray-700">Add Photo</span>
                    <span className="text-xs text-gray-400 mt-1 group-hover:text-gray-500">
                      {maxPhotos - photos.length} remaining
                    </span>
                  </button>
                )}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </Layout>
    </div>
  );
}
