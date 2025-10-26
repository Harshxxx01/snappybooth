import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Head from 'next/head';
import FeatureSection from '../pages/features';
import WhyChooseSection from '../components/WhyChooseSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import styles from '../styles/WhyChooseSection.module.css';

function LandingPage() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>PhotoBooth Pro | Capture, Filter & Download Memories</title>
        <meta name="description" content="Book the best photo booth rental for weddings, parties & corporate events. Choose from multiple layouts, filters & backgrounds. Instant downloads & prints!" />
        <meta name="keywords" content="photo booth rental, event photobooth, wedding photo booth, birthday photo booth, custom photo strips, photo booth with filters, download photo strips" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout style={{
        padding: '2rem',
        '@media (max-width: 767px)': {
          padding: '0',
          margin: '2rem 2rem 0 2rem',
          borderRadius: '20px',
          overflow: 'hidden',
          zIndex: 1,
          padding: '8.2rem 0',
        }
      }}>
        <section id="home" className="hero" style={{
          background: 'linear-gradient(135deg, #270859 0%, #282878 25%, #2859A3 50%, #297DC5 75%, #2AA1E7 100%)',
          margin: '2rem 2rem 0 2rem',
          borderRadius: '20px',
          overflow: 'hidden',
          zIndex: 1,
          padding: '8.2rem 0',
          '@media (max-width: 767px)': {
            margin: '2rem 2rem 0 2rem',
            borderRadius: '20px',
            overflow: 'hidden',
            zIndex: 1,
            padding: '2rem 0',
          }
        }}>
          <div className="hero-content" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            '@media (max-width: 767px)': {
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }
          }}>
            <div className="hero-text" style={{
              flex: 2,
              textAlign: 'center',
              '@media (max-width: 767px)': {
                textAlign: 'center',
                padding: '0',
              }
            }}>
              <h1 className="hero-title" style={{
                color: '#fff',
                fontSize: '3rem',
                fontWeight: 'bold',
                padding: '0.6rem',
                lineHeight: '1.3',
                '@media (max-width: 767px)': {
                  fontSize: '2rem',
                  padding: '0.4rem',
                }
              }}>Capture Memories with the Best Photobooth Experience</h1>
              <p className="hero-subtitle" style={{
                color: '#fff',
                fontSize: '1rem',
                padding: '0.6rem',
                '@media (max-width: 767px)': {
                  fontSize: '0.8rem',
                  padding: '0.4rem',
                }
              }}>Make your event unforgettable with PhotoBooth Pro! Choose from stunning layouts, fun backgrounds, artistic filters & download custom photo strips instantly.</p>
              <button
                className="cta-button"
                onClick={() => router.push('/capture')}
                style={{
                  backgroundColor: '#297DC5',
                  color: '#fff',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  border: 'none',
                  cursor: 'pointer',
                  margin: '1rem',
                  '@media (max-width: 767px)': {
                    fontSize: '0.8rem',
                    padding: '0.4rem',
                  }
                }}
              >
                <style jsx>{`
              .cta-button:hover {
                background-color:rgb(122, 193, 234);
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
              }
              `}</style>
                Start Capturing
              </button>
            </div>
            <div className="hero-image" style={{ flex: 2, position: 'relative', zIndex: 1, overflow: 'hidden', margin: '-55rem 0 '}}>
              <img src="../images/img1.png" alt="Photo Booth" style={{ objectFit: 'cover', borderRadius: '20px', zIndex: 2, margin: '0 0' }} />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about-section" style={{ padding: '4rem 2rem', backgroundColor: '#f8f9fa' }}>
          <div className="about-content" style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ color: '#282878', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>About PhotoBooth Pro</h2>
            <p style={{ color: '#282878', fontSize: '4.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>We Turn Smiles Into{' '}
              <span className="hover-text">Memories</span>

              <style jsx>{`
            .hover-text {
                background: linear-gradient(130deg, red, orange, yellow, green, blue, indigo, violet);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                font-size: 4.5rem;
                font-weight: bold;
                display: inline-block;
            transition: transform 0.4s ease, background 0.6s ease;
            }

            .hover-text:hover {
                background: linear-gradient(130deg, violet, indigo, blue, green, yellow, orange, red);
                transform: scale(0.9);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            `}</style>
            </p>
            <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '3rem' }}>
              PhotoBooth Pro is your go-to solution for creating beautiful photo strips. With our modern virtual photo booth, you can capture and share your moments instantly.
              Our platform offers professional-grade filters, customizable backgrounds, and easy sharing options to make your photos stand out.
            </p>
            <div className="flex items-center justify-between gap-8 h-full relative">
              <div className="overflow-y-scroll h-full w-1/2 sticky top-0 hide-scrollbar">
                <style jsx>{`
          .hide-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;  /* Chrome, Safari and Opera */
          }
          `}</style>
                <img
                  src="../images/img2.png"
                  alt="Photo Booth"
                  className="rounded-2xl object-cover w-full h-full"
                  style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'left' }}
                />
              </div>
              <div className="about-scroll-text w-1/2 sticky top-20 self-start" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'left', paddingTop: '2rem' }}>
                <p className="about-scroll-text1 text-gray-600 text-lg leading-8">
                  At PhotoBooth Pro, we specialize in premium photo booth experiences that bring joy to any occasion.
                  With a passion for photography, innovation, and fun, we’ve helped thousands of guests create keepsakes
                  they’ll cherish forever. From instant print booths to digital sharing and themed props, our mission is to
                  make your event a picture-perfect success.
                </p><br></br>
                <p className="text-gray-600 text-lg leading-8">
                  We believe every celebration deserves a touch of magic. That’s why our team works closely with clients to design a booth experience that matches your event’s vibe and style.
                  Whether it's a wedding, birthday, or brand activation, we provide a seamless, fun, and unforgettable photo experience.
                </p><br></br>
                <p className="text-gray-600 text-lg leading-8">
                  Our booths are equipped with high-resolution cameras, studio-quality lighting, and intuitive touchscreen interfaces — ensuring every photo looks flawless. Plus, with instant social media sharing, your memories can go viral in moments.
                </p>
                <button
                  className="cta-button"
                  onClick={() => router.push('/capture')}
                  style={{
                    backgroundColor: '#297DC5',
                    color: '#fff',
                    borderRadius: '5px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease',
                    border: 'none',
                    cursor: 'pointer',
                    marginTop: '2rem',
                  }}
                >
                  <style jsx>{`
              .cta-button:hover {
                background-color:rgb(122, 193, 234);
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
              }
              `}</style>
                  Try Now
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="features-section" style={{ padding: '4rem 0rem', color: '#fff' }} >
          <FeatureSection />
        </section>

        {/* Why Choose Section */}
        <section id="why-choose" className={styles.whyChooseSection} style={{ padding: '4rem 0rem', color: '#fff' }}>
          <WhyChooseSection />
        </section>

        {/* Contact Section */}
        <ContactSection />
        <Footer />
      </Layout>
    </>
  );
};

export default LandingPage;


