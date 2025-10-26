import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import Head from 'next/head';
import Link from 'next/link';

const backgroundOptions = [
  {
    id: 'strip1',
    name: 'Floral Frame',
    imageUrl: 'https://ik.imagekit.io/kwdtxojfz/46c7f674-a946-492b-8492-c1528308f957.jpg',
    thumbnailUrl: 'https://ik.imagekit.io/kwdtxojfz/46c7f674-a946-492b-8492-c1528308f957.jpg?tr=w-200,h-200',
    color: 'from-pink-500/20 to-pink-600/20'
  },
  {
    id: 'strip2',
    name: 'Elegant Frame',
    imageUrl: 'https://ik.imagekit.io/kwdtxojfz/3e7c0fd4-4f70-455c-853e-fef67429f5aa.jpg',
    thumbnailUrl: 'https://ik.imagekit.io/kwdtxojfz/3e7c0fd4-4f70-455c-853e-fef67429f5aa.jpg?tr=w-200,h-200',
    color: 'from-purple-500/20 to-purple-600/20'
  },
  {
    id: 'strip3',
    name: 'Vintage Frame',
    imageUrl: 'https://ik.imagekit.io/kwdtxojfz/0f52775a-5350-4bf6-9e42-978933d7df4c.jpg',
    thumbnailUrl: 'https://ik.imagekit.io/kwdtxojfz/0f52775a-5350-4bf6-9e42-978933d7df4c.jpg?tr=w-200,h-200',
    color: 'from-amber-500/20 to-amber-600/20'
  },
  {
    id: 'strip4',
    name: 'Golden Frame',
    imageUrl: 'https://ik.imagekit.io/kwdtxojfz/e0fdf7ea-5acf-48a8-91dc-a7256185e024.jpg',
    thumbnailUrl: 'https://ik.imagekit.io/kwdtxojfz/e0fdf7ea-5acf-48a8-91dc-a7256185e024.jpg?tr=w-200,h-200',
    color: 'from-yellow-500/20 to-yellow-600/20'
  },
  {
    id: 'strip5',
    name: 'Ornate Frame',
    imageUrl: 'https://ik.imagekit.io/kwdtxojfz/5029c43a-bf7e-4e64-bff8-5e58113e54e6.jpg',
    thumbnailUrl: 'https://ik.imagekit.io/kwdtxojfz/5029c43a-bf7e-4e64-bff8-5e58113e54e6.jpg?tr=w-200,h-200',
    color: 'from-rose-500/20 to-rose-600/20'
  },
  {
    id: 'strip6',
    name: 'Classic Frame',
    imageUrl: 'https://ik.imagekit.io/kwdtxojfz/download.jpg',
    thumbnailUrl: 'https://ik.imagekit.io/kwdtxojfz/download.jpg?tr=w-200,h-200',
    color: 'from-gray-500/20 to-gray-600/20'
  },
  {
    id: 'strip7',
    name: 'Floral Design',
    imageUrl: 'https://ik.imagekit.io/kwdtxojfz/9c3ddc70-a09b-4c09-aec3-06ad64c877d6.jpg',
    thumbnailUrl: 'https://ik.imagekit.io/kwdtxojfz/9c3ddc70-a09b-4c09-aec3-06ad64c877d6.jpg?tr=w-200,h-200',
    color: 'from-pink-400/20 to-pink-500/20'
  },
  {
    id: 'strip8',
    name: 'Elegant Border',
    imageUrl: 'https://ik.imagekit.io/kwdtxojfz/74979b1a-75a1-411d-95fb-bc6d1cb5b456.jpg',
    thumbnailUrl: 'https://ik.imagekit.io/kwdtxojfz/74979b1a-75a1-411d-95fb-bc6d1cb5b456.jpg?tr=w-200,h-200',
    color: 'from-blue-500/20 to-blue-600/20'
  },
  {
    id: 'strip9',
    name: 'Vintage Border',
    imageUrl: 'https://ik.imagekit.io/kwdtxojfz/2f90cc2f-9975-44cf-9a54-1b9523c2c95f.jpg',
    thumbnailUrl: 'https://ik.imagekit.io/kwdtxojfz/2f90cc2f-9975-44cf-9a54-1b9523c2c95f.jpg?tr=w-200,h-200',
    color: 'from-amber-400/20 to-amber-500/20'
  },
  {
    id: 'strip10',
    name: 'Golden Border',
    imageUrl: 'https://ik.imagekit.io/kwdtxojfz/693dea02-f772-433e-960e-23f03d36e85c.jpg',
    thumbnailUrl: 'https://ik.imagekit.io/kwdtxojfz/693dea02-f772-433e-960e-23f03d36e85c.jpg?tr=w-200,h-200',
    color: 'from-yellow-400/20 to-yellow-500/20'
  },
  {
    id: 'strip11',
    name: 'Ornate Design',
    imageUrl: 'https://ik.imagekit.io/kwdtxojfz/550aa506-dc6a-4c11-ac82-274ddcce2fa0.jpg',
    thumbnailUrl: 'https://ik.imagekit.io/kwdtxojfz/550aa506-dc6a-4c11-ac82-274ddcce2fa0.jpg?tr=w-200,h-200',
    color: 'from-rose-400/20 to-rose-500/20'
  },
  {
    id: 'strip12',
    name: 'Classic Design',
    imageUrl: 'https://ik.imagekit.io/kwdtxojfz/b97a9b7a-d536-4a6e-8c88-d70e2f9f46da.jpg',
    thumbnailUrl: 'https://ik.imagekit.io/kwdtxojfz/b97a9b7a-d536-4a6e-8c88-d70e2f9f46da.jpg?tr=w-200,h-200',
    color: 'from-gray-400/20 to-gray-500/20'
  },
  {
    id: 'strip13',
    name: 'Modern Frame',
    imageUrl: 'https://ik.imagekit.io/kwdtxojfz/f5e5198d-a792-4821-b8c3-42f873aa6686.jpg',
    thumbnailUrl: 'https://ik.imagekit.io/kwdtxojfz/f5e5198d-a792-4821-b8c3-42f873aa6686.jpg?tr=w-200,h-200',
    color: 'from-slate-500/20 to-slate-600/20'
  },
  {
    id: 'strip14',
    name: 'Teal Gradient',
    imageUrl: 'https://i.ibb.co/3YzY6s2/Teal-Gradient.jpg',
    thumbnailUrl: 'https://i.ibb.co/3YzY6s2/Teal-Gradient.jpg',
    color: 'from-teal-500/20 to-teal-600/20'
  },
  {
    id: 'strip15',
    name: 'Yellow Gradient',
    imageUrl: 'https://i.ibb.co/2YzY6s2/Yellow-Gradient.jpg',
    thumbnailUrl: 'https://i.ibb.co/2YzY6s2/Yellow-Gradient.jpg',
    color: 'from-yellow-500/20 to-yellow-600/20'
  }
];

// Sticker options with the new sticker images
const stickerOptions = [
  { 
    id: 'sticker1', 
    url: '/images/stickers/download (4).png', 
    name: 'Decorative Frame 1' 
  },
  { 
    id: 'sticker2', 
    url: '/images/stickers/download (5).png', 
    name: 'Decorative Frame 2' 
  },
  { 
    id: 'sticker3', 
    url: '/images/stickers/download (5) (1).png', 
    name: 'Floral Design 1' 
  },
  { 
    id: 'sticker4', 
    url: '/images/stickers/download (5) (2).png', 
    name: 'Floral Design 2' 
  },
  { 
    id: 'sticker5', 
    url: '/images/stickers/download (5) (3).png', 
    name: 'Ornamental Frame 1' 
  },
  { 
    id: 'sticker6', 
    url: '/images/stickers/download (5) (4).png', 
    name: 'Ornamental Frame 2' 
  },
  { 
    id: 'sticker7', 
    url: '/images/stickers/download (5) (5).png', 
    name: 'Elegant Border 1' 
  },
  { 
    id: 'sticker8', 
    url: '/images/stickers/download (5) (6).png', 
    name: 'Elegant Border 2' 
  }
];

export default function ChooseLayout() {
  const [selectedBg, setSelectedBg] = useState(backgroundOptions[0].id);
  const [isMounted, setIsMounted] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [photoStripStickers, setPhotoStripStickers] = useState([]);
  const [activeSticker, setActiveSticker] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startStickerPos, setStartStickerPos] = useState({ x: 0, y: 0 });
  const photoStripRef = useRef(null);
  const router = useRouter();
  
  // Preload sticker images
  useEffect(() => {
    stickerOptions.forEach(sticker => {
      const img = new Image();
      img.src = sticker.url;
    });
  }, []);

  useEffect(() => {
    setIsMounted(true);
    // Preload the first background image
    const img = new Image();
    img.src = backgroundOptions[0].imageUrl;
    img.onload = () => setPreviewImage(img.src);
  }, []);

  const handleSelect = (bgId) => {
    setSelectedBg(bgId);
    // Preload the selected background image
    const selected = backgroundOptions.find(bg => bg.id === bgId);
    const img = new Image();
    img.src = selected.imageUrl;
    img.onload = () => setPreviewImage(img.src);
  };

  const handleStickerSelect = (sticker) => {
    setSelectedSticker(sticker);
    setActiveSticker(null);
  };

  const handlePhotoStripClick = (e) => {
    if (!selectedSticker || !photoStripRef.current || isDragging) return;
    
    const rect = photoStripRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    // Calculate which corner is closest to the click position
    const corners = [
      { x: 10, y: 10 },        // Top-left
      { x: 90, y: 10 },        // Top-right
      { x: 10, y: 90 },        // Bottom-left
      { x: 90, y: 90 }         // Bottom-right
    ];
    
    // Find the closest corner to the click position
    let closestCorner = corners[0];
    let minDistance = Infinity;
    
    corners.forEach(corner => {
      const distance = Math.sqrt(
        Math.pow(clickX - (rect.width * corner.x / 100), 2) + 
        Math.pow(clickY - (rect.height * corner.y / 100), 2)
      );
      
      if (distance < minDistance) {
        minDistance = distance;
        closestCorner = corner;
      }
    });
    
    // Check if there's already a sticker in this corner
    const cornerHasSticker = photoStripStickers.some(sticker => {
      const cornerThreshold = 20; // pixels
      const stickerX = sticker.x / 100 * rect.width;
      const stickerY = sticker.y / 100 * rect.height;
      const cornerX = closestCorner.x / 100 * rect.width;
      const cornerY = closestCorner.y / 100 * rect.height;
      
      return (
        Math.abs(stickerX - cornerX) < cornerThreshold &&
        Math.abs(stickerY - cornerY) < cornerThreshold
      );
    });
    
    // If corner is occupied, find the next available corner
    let finalPosition = { ...closestCorner };
    if (cornerHasSticker) {
      const availableCorners = corners.filter(corner => {
        return !photoStripStickers.some(sticker => {
          const cornerThreshold = 20;
          const stickerX = sticker.x / 100 * rect.width;
          const stickerY = sticker.y / 100 * rect.height;
          const cornerX = corner.x / 100 * rect.width;
          const cornerY = corner.y / 100 * rect.height;
          
          return (
            Math.abs(stickerX - cornerX) < cornerThreshold &&
            Math.abs(stickerY - cornerY) < cornerThreshold
          );
        });
      });
      
      if (availableCorners.length > 0) {
        // Use the first available corner
        finalPosition = availableCorners[0];
      } else {
        // If all corners are taken, place near the click position but with some offset
        finalPosition = {
          x: Math.max(10, Math.min(90, (clickX / rect.width) * 100)),
          y: Math.max(10, Math.min(90, (clickY / rect.height) * 100))
        };
      }
    }
    
    // Add some randomness to the position (within 5% of the corner)
    const randomOffset = () => (Math.random() * 10) - 5;
    const newSticker = {
      ...selectedSticker,
      id: Date.now(),
      x: finalPosition.x + randomOffset(),
      y: finalPosition.y + randomOffset(),
      rotation: Math.floor(Math.random() * 30) - 15, // Random rotation between -15 and 15 degrees
      scale: 0.8 + Math.random() * 0.4 // Random scale between 0.8 and 1.2
    };
    
    setPhotoStripStickers([...photoStripStickers, newSticker]);
    setActiveSticker(newSticker.id);
  };
  
  const handleStickerMouseDown = (e, sticker) => {
    e.stopPropagation();
    setActiveSticker(sticker.id);
    setStartPos({ x: e.clientX, y: e.clientY });
    setStartStickerPos({ x: sticker.x, y: sticker.y });
    setIsDragging(true);
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging || !activeSticker || !photoStripRef.current) return;
    
    const rect = photoStripRef.current.getBoundingClientRect();
    const deltaX = ((e.clientX - startPos.x) / rect.width) * 100;
    const deltaY = ((e.clientY - startPos.y) / rect.height) * 100;
    
    setPhotoStripStickers(photoStripStickers.map(sticker => {
      if (sticker.id === activeSticker) {
        return {
          ...sticker,
          x: Math.max(0, Math.min(startStickerPos.x + deltaX, 95)),
          y: Math.max(0, Math.min(startStickerPos.y + deltaY, 95))
        };
      }
      return sticker;
    }));
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // Add event listeners for drag operations
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, activeSticker, photoStripStickers, startPos, startStickerPos]);
  
  const rotateSticker = (id, e) => {
    e.stopPropagation();
    setPhotoStripStickers(photoStripStickers.map(sticker => {
      if (sticker.id === id) {
        return { ...sticker, rotation: (sticker.rotation + 30) % 360 };
      }
      return sticker;
    }));
  };
  
  const scaleSticker = (id, e, scaleDelta) => {
    e.stopPropagation();
    setPhotoStripStickers(photoStripStickers.map(sticker => {
      if (sticker.id === id) {
        const newScale = Math.max(0.5, Math.min(sticker.scale + scaleDelta, 2));
        return { ...sticker, scale: newScale };
      }
      return sticker;
    }));
  };

  const removeSticker = (id, e) => {
    if (e) e.stopPropagation();
    setPhotoStripStickers(photoStripStickers.filter(sticker => sticker.id !== id));
    if (activeSticker === id) {
      setActiveSticker(null);
    }
  };

  const handleConfirm = () => {
    const selectedBgData = backgroundOptions.find(bg => bg.id === selectedBg);
    
    // Prepare sticker data with all necessary properties
    const stickerData = photoStripStickers.map(sticker => ({
      id: sticker.id,
      url: sticker.url,
      x: sticker.x,
      y: sticker.y,
      rotation: sticker.rotation || 0,
      scale: sticker.scale || 1,
      name: sticker.name || ''
    }));
    
    router.push({ 
      pathname: '/capture', 
      query: { 
        backgroundUrl: encodeURIComponent(selectedBgData.imageUrl),
        backgroundId: selectedBg,
        stickers: encodeURIComponent(JSON.stringify(stickerData))
      } 
    });
  };

  return (
    <Layout>
      <Head>
        <title>Choose Layout - PhotoBooth Pro</title>
        <meta name="description" content="Choose your preferred photo layout" />
      </Head>
      
      {/* Enhanced Hero Section */}
      <section className="hero" style={{
        background: 'linear-gradient(135deg, #270859 0%, #282878 25%, #2859A3 50%, #297DC5 75%, #2AA1E7 100%)',
        margin: '7rem 2rem 0 2rem',
        borderRadius: '20px',
        overflow: 'hidden',
        padding: '8.2rem 0',
        opacity: isMounted ? 1 : 0,
        transform: isMounted ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.8s ease',
      }}>
        <div className="hero-content" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          padding: '0 2rem',
        }}>
          <div className="hero-text" style={{
            flex: 2,
            textAlign: 'left',
            width: '100%',
            maxWidth: '600px',
            opacity: isMounted ? 1 : 0,
            transform: isMounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease 0.2s',
          }}>
            <h1 className="hero-title" style={{
              color: '#fff',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 'bold',
              padding: '0.6rem',
              lineHeight: '1.3',
            }}>Choose Layouts</h1>
            <p className="hero-description" style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: 'clamp(1rem, 3vw, 1.2rem)',
              lineHeight: '1.6',
              opacity: isMounted ? 1 : 0,
              transform: isMounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s ease 0.4s',
            }}>
              Welcome to PhotoBooth Pro - Your ultimate solution for creating memorable moments.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Preview Section */}
        <motion.div 
          className="mb-16"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Live Preview
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how your photos will look with the selected layout
            </p>
          </div>

          <div className="relative max-w-2xl mx-auto">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-lg opacity-20 animate-pulse"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              <div 
                className="relative aspect-[3/4] w-full cursor-crosshair overflow-hidden"
                onClick={handlePhotoStripClick}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                ref={photoStripRef}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${previewImage})` }}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
                
                {photoStripStickers.map((sticker) => {
                  const isActive = activeSticker === sticker.id;
                  return (
                    <motion.div
                      key={sticker.id}
                      className={`absolute cursor-move ${isActive ? 'z-10' : 'z-0'}`}
                      style={{
                        left: `${sticker.x}%`,
                        top: `${sticker.y}%`,
                        transform: `translate(-50%, -50%) rotate(${sticker.rotation}deg) scale(${sticker.scale || 1})`,
                        width: '100px',
                        height: '100px',
                        transformOrigin: 'center center',
                        transition: isDragging ? 'none' : 'transform 0.2s ease-out'
                      }}
                      onMouseDown={(e) => handleStickerMouseDown(e, sticker)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSticker(sticker.id);
                      }}
                      whileHover={{ scale: 1.05 }}
                      animate={{
                        scale: isActive ? (sticker.scale || 1) * 1.05 : (sticker.scale || 1),
                        zIndex: isActive ? 10 : 1
                      }}
                    >
                      <img 
                        src={sticker.url} 
                        alt={sticker.name || 'sticker'} 
                        className="w-full h-full object-contain pointer-events-none"
                        draggable={false}
                      />
                      
                      {/* Sticker controls */}
                      {isActive && (
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex bg-white rounded-full shadow-lg p-1 space-x-1">
                          <button
                            onClick={(e) => removeSticker(sticker.id, e)}
                            className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold hover:bg-red-600 transition-colors"
                            title="Remove"
                          >
                            ×
                          </button>
                          <button
                            onClick={(e) => rotateSticker(sticker.id, e)}
                            className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold hover:bg-blue-600 transition-colors"
                            title="Rotate"
                          >
                            ↻
                          </button>
                          <button
                            onClick={(e) => scaleSticker(sticker.id, e, 0.2)}
                            className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold hover:bg-green-600 transition-colors"
                            title="Enlarge"
                          >
                            +
                          </button>
                          <button
                            onClick={(e) => scaleSticker(sticker.id, e, -0.2)}
                            className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs font-bold hover:bg-yellow-600 transition-colors"
                            title="Shrink"
                          >
                            −
                          </button>
                        </div>
                      )}
                      
                      {/* Highlight border when active */}
                      {isActive && (
                        <div className="absolute inset-0 border-2 border-dashed border-blue-400 rounded-lg pointer-events-none"></div>
                      )}
                    </motion.div>
                  );
                })}
                
                {!photoStripStickers.length && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                      </motion.div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Photos Here</h3>
                      <p className="text-gray-600 mb-2">
                        Selected: <span className="font-semibold text-blue-600">
                          {backgroundOptions.find(bg => bg.id === selectedBg)?.name}
                        </span>
                      </p>
                      <p className="text-sm text-gray-500">
                        {selectedSticker 
                          ? `Click anywhere to place the ${selectedSticker.name || 'selected sticker'}` 
                          : 'Select a sticker below, then click here to place it'}
                      </p>
                      {!selectedSticker && (
                        <p className="text-xs text-gray-400 mt-2">
                          Tip: You can move, rotate, and resize stickers after placing them
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sticker Selection */}
        <motion.div 
          className="mb-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Add Stickers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Click on a sticker to select it, then click on the preview to place it
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8 px-4">
            {stickerOptions.map((sticker) => (
              <motion.div
                key={sticker.id}
                className={`relative w-16 h-16 p-2 rounded-lg cursor-pointer transition-all ${
                  selectedSticker?.id === sticker.id 
                    ? 'bg-blue-100 ring-2 ring-blue-500' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                onClick={() => handleStickerSelect(sticker)}
                whileHover={{ scale: 1.1, zIndex: 10 }}
                whileTap={{ scale: 0.95 }}
                title={sticker.name || `Sticker ${sticker.id}`}
              >
                <img 
                  src={sticker.url} 
                  alt={sticker.name || `Sticker ${sticker.id}`} 
                  className="w-full h-full object-contain"
                  draggable={false}
                />
                {sticker.name && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs text-center py-0.5 truncate px-1 rounded-b-md">
                    {sticker.name}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Layout Selection */}
        <motion.div 
          className="mb-16"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Style
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse through our carefully curated collection of photo strip layouts
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4">
            {backgroundOptions.map((bg, index) => {
              const isSelected = selectedBg === bg.id;
              return (
                <motion.div
                  key={bg.id}
                  className={`relative group cursor-pointer ${
                    isSelected ? 'transform scale-105' : ''
                  }`}
                  onClick={() => handleSelect(bg.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Card */}
                  <div className={`relative aspect-[3/4] rounded-2xl overflow-hidden transition-all duration-300 ${
                    isSelected 
                      ? 'ring-4 ring-blue-500 shadow-2xl' 
                      : 'ring-2 ring-gray-200 group-hover:ring-blue-300 shadow-lg'
                  }`}>
                    {/* Background Image */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${bg.thumbnailUrl})` }}
                    />
                    
                    {/* Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${bg.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    
                    {/* Selection Indicator */}
                    {isSelected && (
                      <motion.div 
                        className="absolute top-3 right-3 bg-blue-500 text-white rounded-full p-2 shadow-lg"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </motion.div>
                    )}
                    
                    {/* Name */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                      <p className={`font-semibold text-sm text-center transition-colors duration-300 ${
                        isSelected ? 'text-blue-200' : 'text-white'
                      }`}>
                        {bg.name}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Action Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="max-w-md mx-auto space-y-6">
            <motion.button
              onClick={handleConfirm}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl text-lg shadow-2xl transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 flex items-center justify-center space-x-3 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Start Capturing Memories</span>
              <motion.svg 
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </motion.button>
            
            <motion.p 
              className="text-gray-600 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Selected: <span className="font-semibold text-blue-600">{backgroundOptions.find(bg => bg.id === selectedBg)?.name}</span>
            </motion.p>
          </div>
        </motion.div>
      </motion.div>

      <Footer />
    </Layout>
  );
}