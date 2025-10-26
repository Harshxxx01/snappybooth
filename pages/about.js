import Layout from '../components/Layout';
import Footer from '../components/Footer';
import styles from '../styles/AboutPage.module.css';
import { useState, useEffect } from 'react';

export default function About() {
  const testimonials = [
    {
      text: "The photo booth was the highlight of our wedding! The photos came out amazing and everyone had so much fun using it.",
      name: "John Doe",
      role: "Wedding Organizer",
      avatar: "J",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
    },
    {
      text: "The team was professional and set up everything perfectly. The photos turned out great and we received them quickly.",
      name: "Sarah Smith",
      role: "Event Planner",
      avatar: "S",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
    },
    {
      text: "Absolutely loved the photo booth experience! The filters were amazing and the sharing options were super convenient.",
      name: "Mike Johnson",
      role: "Party Host",
      avatar: "M",
      image: "https://images.unsplash.com/photo-1573497019305-1bee34b34daf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
    },
    {
      text: "The photo quality was outstanding and the team was incredibly helpful throughout the event. Highly recommend!",
      name: "Emily Chen",
      role: "Corporate Event Manager",
      avatar: "E",
      image: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
    }
  ];

  // Group testimonials into pairs
  const testimonialPairs = testimonials.reduce((acc, curr, index) => {
    if (index % 2 === 0) {
      acc.push([curr, testimonials[index + 1]]);
    }
    return acc;
  }, []).filter(pair => pair[1]); // Remove incomplete pairs

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonialPairs.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonialPairs.length) % testimonialPairs.length);
  };

  return (
    <Layout>
      {/* Hero Section */}
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
            }}>About Us</h1>
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

      {/* About Content Section */}
      <div className={styles.aboutContainer}>
        <div className={styles.heroSection}>
          <div className={styles.heroContent}>
            <div className={styles.heroTextContainer}>
              <h1 className={styles.heroTitle}>Where Memories Come to Life</h1>
              <p className={styles.heroText}>
                Experience the future of event photography with our cutting-edge virtual photo booth. Capture moments, apply stunning filters, and create beautiful photo strips that you can share instantly.
              </p>
              <p className={styles.heroText}>
                We bring the joy of photo booths right to your fingertips. Whether you're capturing moments with friends, celebrating a special event, or just having fun with creative layouts, our online photo booth platform is designed to give you a smooth, exciting, and high-quality photo experience.
              </p>
              <p className={styles.heroText}>
                We believe that every smile deserves to be remembered, and we make it easy, fun, and accessible from anywhere, at any time.
              </p>
            </div>
            <div className={styles.heroImageWrapper}>
              <img 
                src="/images/img3.jpg" 
                alt="Photo Booth in Action"
                className={styles.heroImage}
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className={styles.featuresSection}>
          <div className={styles.featureGrid}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <img src="/images/feature-icons/camera.svg" alt="Camera" />
              </div>
              <h3 className={styles.featureTitle}>High-Quality Photos</h3>
              <p className={styles.featureDescription}>
                Capture stunning photos with professional-grade image quality
              </p>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <img src="/images/feature-icons/filter.svg" alt="Filter" />
              </div>
              <h3 className={styles.featureTitle}>Creative Filters</h3>
              <p className={styles.featureDescription}>
                Apply professional filters and effects to enhance your photos
              </p>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <img src="/images/feature-icons/share.svg" alt="Share" />
              </div>
              <h3 className={styles.featureTitle}>Instant Sharing</h3>
              <p className={styles.featureDescription}>
                Share your photos instantly via email, social media, or download
              </p>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <img src="/images/feature-icons/mobile.svg" alt="Mobile" />
              </div>
              <h3 className={styles.featureTitle}>Mobile Friendly</h3>
              <p className={styles.featureDescription}>
                Access our photo booth from any device, anywhere
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className={styles.testimonialsSection}>
          <h2 className={styles.testimonialTitle}>
            What Our Users Say
          </h2>
          
          <div className={styles.testimonialCarousel}>
            <div 
              className={styles.testimonialSlides} 
              style={{
                transform: `translateX(-${currentSlide * 100}%)`
              }}
            >
              {testimonialPairs.map((pair, index) => (
                <div key={index} className={styles.testimonialSlide}>
                  <div className={styles.testimonialPair}>
                    {pair.map((testimonial, pairIndex) => (
                      <div 
                        key={pairIndex}
                        className={styles.testimonialCard}
                        style={{
                          opacity: isMounted && index === currentSlide ? 1 : 0.5,
                          transform: isMounted && index === currentSlide ? 'scale(1)' : 'scale(0.95)',
                          transition: 'all 0.5s ease'
                        }}
                      >
                        <div className={styles.testimonialContent}>
                          <div className={styles.quoteIcon}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 11V17C10 18.1046 9.10457 19 8 19H7C5.89543 19 5 18.1046 5 17V14C5 12.8954 5.89543 12 7 12H8C8 12 9 12 9 11C9 10 8 8 8 6C8 3 10 1 13 1C15 1 17 2 17 5C17 8 15 10 13 11H10Z" fill="currentColor"/>
                              <path d="M19 11V17C19 18.1046 18.1046 19 17 19H16C14.8954 19 14 18.1046 14 17V14C14 12.8954 14.8954 12 16 12H17C17 12 18 12 18 11C18 10 17 8 17 6C17 3 19 1 22 1C24 1 26 2 26 5C26 8 24 10 22 11H19Z" fill="currentColor"/>
                            </svg>
                          </div>
                          <div className={styles.testimonialText}>
                            {testimonial.text}
                          </div>
                          <div className={styles.testimonialAuthor}>
                            <div 
                              className={styles.avatar} 
                              style={{
                                backgroundImage: `url(${testimonial.image})`
                              }}
                            ></div>
                            <div className={styles.authorInfo}>
                              <h3>{testimonial.name}</h3>
                              <p>{testimonial.role}</p>
                            </div>
                          </div>
                        </div>
                        <div className={styles.cardBackground}></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className={styles.carouselIndicators}>
              {testimonialPairs.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.indicator} ${index === currentSlide ? styles.active : ''}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
            
            <button 
              className={styles.prevButton} 
              onClick={prevSlide} 
              style={{ opacity: currentSlide === 0 ? 0.5 : 1 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button 
              className={styles.nextButton} 
              onClick={nextSlide} 
              style={{ opacity: currentSlide === testimonialPairs.length - 1 ? 0.5 : 1 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className={styles.statsSection}>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>100K+</div>
              <div className={styles.statLabel}>Photos Captured</div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statNumber}>500+</div>
              <div className={styles.statLabel}>Events Covered</div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statNumber}>99%</div>
              <div className={styles.statLabel}>Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </Layout>
  );
}