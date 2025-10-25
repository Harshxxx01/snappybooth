import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Image from 'next/image';
import Head from 'next/head';

const PhotoStripPage = () => {
  const router = useRouter();
  const [backgroundImage, setBackgroundImage] = useState('');
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // Get background image URL and photos from query parameters
    if (router.query.backgroundUrl) {
      setBackgroundImage(decodeURIComponent(router.query.backgroundUrl));
    }
    
    // In a real app, you would get photos from state management or API
    // For now, we'll use placeholder photos
    setPhotos([
      { id: 1, src: '/images/photo1.jpg' },
      { id: 2, src: '/images/photo2.jpg' },
      { id: 3, src: '/images/photo3.jpg' },
      { id: 4, src: '/images/photo4.jpg' }
    ]);
  }, [router.query]);

  if (!backgroundImage) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <p className="text-gray-600">Loading photo strip...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Your Photo Strip</title>
        <meta name="description" content="View your photo strip with the selected background" />
      </Head>
      
      <div className="relative min-h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            filter: 'blur(8px) brightness(0.7)',
            transform: 'scale(1.05)'
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Photo Strip Container */}
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-4xl bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6">
              <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Your Photo Strip</h1>
              
              {/* Photo Grid */}
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {photos.map((photo) => (
                  <div 
                    key={photo.id}
                    className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg bg-gray-100"
                  >
                    <Image 
                      src={photo.src}
                      alt={`Photo ${photo.id}`}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
              </div>
          
              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <button 
                  onClick={() => window.print()}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  <span>Print Photo Strip</span>
                </button>
                
                <button 
                  onClick={() => alert('Download functionality will be implemented here')}
                  className="px-6 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download</span>
                </button>
                
                <button 
                  onClick={() => router.push('/choose')}
                  className="px-6 py-2.5 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                  </svg>
                  <span>Choose Different Background</span>
                </button>
              </div>
            </div>
            <button className="control-button">
              <Image 
                src="/images/download-icon.png" 
                alt="Download" 
                width={24} 
                height={24}
              />
              Download
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PhotoStripPage;
