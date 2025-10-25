import React, { useEffect, useState, useRef } from 'react';
import { FaFilter, FaImages, FaShareAlt, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from '../styles/featuresection.module.css';

const features = [
  {
    icon: <FaFilter size={30} color="#282878" />,
    title: 'Instant Filters',
    desc: 'Apply professional photo filters to your snapshots instantly. Enhance lighting, contrast, and clarity for studio-quality photo booth images.',
  },
  {
    icon: <FaImages size={30} color="#282878" />,
    title: 'Custom Photo Strips',
    desc: 'Design personalized photo strips with stylish layouts and themes. Ideal for event souvenirs, party keepsakes, or fun social media sharing.',
  },
  {
    icon: <FaShareAlt size={30} color="#282878" />,
    title: 'Themed Props & Backgrounds',
    desc: 'Choose from a wide range of photo booth props and custom backgrounds. Perfectly tailored to match your wedding, party, or corporate event theme.',
  },
  {
    icon: <FaShareAlt size={30} color="#282878" />,
    title: 'Easy Digital Sharing',
    desc: 'Download and share photo booth pictures instantly via link or QR code. Quick and seamless social sharing for your event photography memories.',
  },
];

const FeatureSection = () => {
  const [positions, setPositions] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const padding = 40; // 2rem padding from CSS
      const borderRadius = 20; // 20px border radius from CSS

      // Adjust the section bounds by padding and border radius
      const adjustedRect = {
        left: rect.left + padding,
        top: rect.top + padding,
        right: rect.right - padding,
        bottom: rect.bottom - padding
      };

      if (
        e.clientX >= adjustedRect.left &&
        e.clientX <= adjustedRect.right &&
        e.clientY >= adjustedRect.top &&
        e.clientY <= adjustedRect.bottom
      ) {
        // Calculate position relative to the section's top-left corner, adjusted for padding
        const relativeX = e.clientX - rect.left - padding;
        const relativeY = e.clientY - rect.top - padding;

        // Ensure positions stay within bounds
        const maxX = adjustedRect.right - adjustedRect.left - padding;
        const maxY = adjustedRect.bottom - adjustedRect.top - padding;
        
        const boundedX = Math.max(0, Math.min(relativeX, maxX));
        const boundedY = Math.max(0, Math.min(relativeY, maxY));

        // Add new position with a timestamp
        setPositions((prev) => [
          ...prev.slice(-8), // Keep only last 8 positions
          { x: boundedX, y: boundedY, time: Date.now() }
        ]);
      }
    };

    const clearPositions = () => {
      setPositions([]);
    };

    const section = sectionRef.current;
    if (!section) return;

    section.addEventListener('mousemove', moveCursor);
    section.addEventListener('mouseleave', clearPositions);

    return () => {
      if (!section) return;
      section.removeEventListener('mousemove', moveCursor);
      section.removeEventListener('mouseleave', clearPositions);
    };
  }, []);

  return (
    <section className={styles.featuresSection} ref={sectionRef}>
      <h2 className={styles.title} style={{ fontSize: '4rem', fontWeight: 'bold' }}>Key Features</h2>

      {/* Cursor trail effect - contained within the section */}
      <div className={styles.trailContainer}>
        {positions.map((pos, index) => (
          <motion.div
            key={index}
            className={styles.trail}
            style={{ left: pos.x, top: pos.y }}
            animate={{ opacity: 1 }}
            transition={{ duration: 5 + index * 0.01 }}
          />
        ))}
      </div>

      <div className={styles.featuresGrid}>
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={`${styles.featureCard} feature-card`}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className={styles.icon}>{feature.icon}</div>
            <h3 className={styles.featureTitle}>{feature.title}</h3>
            <p className={styles.featureDesc}>{feature.desc}</p>
            <div className={styles.arrowButton}>
              <Link href={`/features/${feature.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                <FaArrowRight size={20} color="#282878" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
