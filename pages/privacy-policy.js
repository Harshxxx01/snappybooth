import Layout from '../components/Layout';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiLock, FiEyeOff, FiSmartphone, FiDatabase, FiDownload, FiCode, FiZap, FiClock } from 'react-icons/fi';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function PrivacyPolicy() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('introduction');

  useEffect(() => {
    // Only run on client-side
    if (typeof window !== 'undefined') {
      setIsMounted(true);
      
      // Add scroll event listener for section highlighting
      const handleScroll = () => {
        const sections = ['introduction', 'information', 'usage', 'features', 'rights'];
        const scrollPosition = window.scrollY + 200;

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const offsetTop = element.offsetTop;
            const offsetHeight = element.offsetHeight;
            
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section);
              break;
            }
          }
        }
      };

      // Initial check
      handleScroll();
      
      // Add event listener
      window.addEventListener('scroll', handleScroll);
      
      // Cleanup
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollToSection = (sectionId) => {
    if (typeof window !== 'undefined') {
      const element = document.getElementById(sectionId);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    }
  };

  const features = [
    {
      icon: <FiLock className="w-6 h-6" />,
      title: "End-to-End Privacy",
      description: "Your photos are processed directly in your browser and never leave your device.",
      color: "indigo"
    },
    {
      icon: <FiDatabase className="w-6 h-6" />,
      title: "No Cloud Storage",
      description: "We don't store your photos on any servers. Once you close the app, they're gone.",
      color: "purple"
    },
    {
      icon: <FiZap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Process photos instantly without waiting for uploads or downloads.",
      color: "blue"
    },
    {
      icon: <FiCode className="w-6 h-6" />,
      title: "Open Source",
      description: "Our code is open for anyone to inspect, so you can verify our privacy claims.",
      color: "indigo"
    }
  ];

  const privacyItems = [
    { 
      icon: <FiEyeOff className="w-5 h-5" />, 
      title: "No Personal Information",
      description: "We don't collect any personally identifiable information."
    },
    { 
      icon: <FiSmartphone className="w-5 h-5" />, 
      title: "Local Processing Only",
      description: "All photo processing happens directly in your browser."
    },
    { 
      icon: <FiCode className="w-5 h-5" />, 
      title: "No Tracking",
      description: "We don't use cookies, trackers, or analytics."
    },
    { 
      icon: <FiDownload className="w-5 h-5" />, 
      title: "Your Data Stays Yours",
      description: "Your photos never leave your device unless you choose to download them."
    }
  ];

  const rights = [
    "Complete control over your photos and data",
    "No account registration required",
    "No tracking, analytics, or profiling",
    "Full transparency about our practices",
    "No third-party data sharing",
    "No hidden data collection"
  ];

  return (
    <Layout>
      {/* Animated Background */}
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
            }}>Privacy Policy</h1>
            <p className="hero-description" style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: 'clamp(1rem, 3vw, 1.2rem)',
              lineHeight: '1.6',
              opacity: isMounted ? 1 : 0,
              transform: isMounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s ease 0.4s',
            }}>
              Your privacy is our top priority. Learn how we protect your data and ensure your information stays secure.
            </p>
          </div>
        </div>
      </section>

      {/* Last Updated Badge - Only render on client-side */}
      {isMounted && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="relative -mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10"
        >
          <div className="bg-white rounded-xl shadow-xl p-1.5 inline-block">
            <div className="bg-blue-50 rounded-lg px-6 py-3 text-sm font-medium text-blue-800 flex items-center">
              <FiClock className="mr-2" />
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="lg:flex gap-12">
          {/* Sticky Sidebar Navigation */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-1">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Jump to Section
              </h3>
              {[
                { id: 'introduction', label: 'Introduction' },
                { id: 'information', label: 'Information We Collect' },
                { id: 'usage', label: 'How We Use Data' },
                { id: 'features', label: 'Privacy Features' },
                { id: 'rights', label: 'Your Rights' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors duration-200 ${
                    activeSection === item.id
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Contact Card */}
              <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-3">Questions?</h4>
                <p className="text-sm text-gray-600 mb-4">
                  If you have any questions about our privacy practices, please contact us.
                </p>
                <a
                  href="mailto:privacy@photoboothpro.com"
                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Contact Us
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={isMounted ? "visible" : "hidden"}
              className="space-y-16"
            >
              {/* Introduction Section */}
              <motion.section 
                id="introduction"
                variants={fadeInUp}
                className="scroll-mt-24"
              >
                <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 mr-4">
                      <FiShield className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Introduction</h2>
                  </div>
                  
                  <div className="prose prose-indigo max-w-none text-gray-600">
                    <p className="text-lg">
                      Welcome to <span className="font-semibold text-indigo-700">PhotoBooth Pro</span>. We are committed to protecting your privacy and ensuring 
                      that your personal information is handled with the highest standards of security and care.
                    </p>
                    <p>
                      This Privacy Policy explains our practices regarding the collection, use, and protection of your information when you use our application.
                    </p>
                  </div>
                </div>
              </motion.section>

              {/* Information Collection Section */}
              <motion.section 
                id="information"
                variants={fadeInUp}
                className="scroll-mt-24"
              >
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-10 border border-blue-100">
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 rounded-lg bg-white/80 backdrop-blur-sm border border-blue-200 flex items-center justify-center text-blue-600 mr-4 shadow-sm">
                      <FiDatabase className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Information We Collect</h2>
                  </div>
                  
                  <div className="prose prose-blue max-w-none">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-blue-100 shadow-sm">
                      <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
                        <FiLock className="mr-2" /> No Personal Data Collection
                      </h3>
                      <p className="text-blue-800 leading-relaxed mb-6">
                        We believe in complete transparency. Here's what you need to know about our data practices:
                      </p>
                      
                      <div className="space-y-4">
                        {privacyItems.map((item, index) => (
                          <motion.div 
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="flex items-start p-4 bg-white/50 rounded-lg border border-blue-50 hover:border-blue-100 transition-colors"
                          >
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0 mr-4">
                              {item.icon}
                            </div>
                            <div>
                              <h4 className="font-medium text-blue-900">{item.title}</h4>
                              <p className="text-sm text-blue-700">{item.description}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Data Usage Section */}
              <motion.section 
                id="usage"
                variants={fadeInUp}
                className="scroll-mt-24"
              >
                <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center text-green-600 mr-4">
                      <FiZap className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">How We Use Your Data</h2>
                  </div>
                  
                  <div className="prose prose-green max-w-none text-gray-600">
                    <div className="bg-green-50/50 p-6 rounded-xl border border-green-100">
                      <h3 className="text-xl font-semibold text-green-800 mb-4">Complete Transparency</h3>
                      <p className="text-green-800/90 mb-4">
                        Since we don't collect any personal data, there's no usage to disclose. Your photos 
                        are processed entirely on your device and are never transmitted to our servers or 
                        any third-party services.
                      </p>
                      <p className="text-green-800/90">
                        The application works completely offline once loaded, ensuring maximum privacy 
                        and security for your content. You're in full control of your data at all times.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Privacy Features Section */}
              <motion.section 
                id="features"
                variants={fadeInUp}
                className="scroll-mt-24"
              >
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 md:p-10 border border-purple-100">
                  <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Privacy Features</h2>
                    <p className="text-lg text-purple-800/80">
                      We've built PhotoBooth Pro with privacy at its core. Here's how we protect you:
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className={`bg-white/80 backdrop-blur-sm p-6 rounded-xl border ${
                          feature.color === 'indigo' ? 'border-indigo-100 hover:border-indigo-200' :
                          feature.color === 'purple' ? 'border-purple-100 hover:border-purple-200' :
                          'border-blue-100 hover:border-blue-200'
                        } transition-all duration-300 hover:shadow-md`}
                      >
                        <div className={`w-12 h-12 rounded-lg ${
                          feature.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
                          feature.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                          'bg-blue-50 text-blue-600'
                        } flex items-center justify-center mb-4`}>
                          {feature.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.section>

              {/* Your Rights Section */}
              <motion.section 
                id="rights"
                variants={fadeInUp}
                className="scroll-mt-24"
              >
                <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100 overflow-hidden">
                  <div className="relative">
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
                    <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
                    
                    <div className="relative">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 mr-4">
                          <FiShield className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Your Privacy Rights</h2>
                      </div>
                      
                      <div className="prose prose-purple max-w-none">
                        <p className="text-lg text-gray-700 mb-8">
                          We believe you should have complete control over your data. Here's what that means for you:
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          {rights.map((right, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.05 * index }}
                              className="flex items-start"
                            >
                              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3 mt-0.5">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <span className="text-gray-700">{right}</span>
                            </motion.div>
                          ))}
                        </div>
                        
                        <div className="mt-10 p-6 bg-purple-50/50 rounded-xl border border-purple-100">
                          <h3 className="text-lg font-semibold text-purple-900 mb-3">Questions or Concerns?</h3>
                          <p className="text-purple-800/90 mb-4">
                            If you have any questions about our privacy practices or your data, we're here to help.
                          </p>
                          <a 
                            href="mailto:privacy@photoboothpro.com" 
                            className="inline-flex items-center text-purple-700 font-medium hover:text-purple-800 transition-colors"
                          >
                            Contact our privacy team
                            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Footer CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{
          background: 'linear-gradient(135deg, #270859 0%, #282878 25%, #2859A3 50%, #297DC5 75%, #2AA1E7 100%)',
          padding: '4rem 1rem',
          color: 'white'
        }}
        className="py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to experience privacy-first photo editing?</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust PhotoBooth Pro with their memories.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/" 
              className="px-8 py-4 bg-white text-indigo-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Started for Free
            </a>
            <a 
              href="#features" 
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('features');
              }}
            >
              Learn More
            </a>
          </div>
        </div>
      </motion.div>
            <footer className="footer" style={{ backgroundColor: '#1a1a1a', color: '#fff', padding: '2rem 0' }}>
          <div className="footer-content" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
            <div className="footer-logo" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              PhotoBooth Pro
            </div>
            <div className="footer-links" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <a href="#home" style={{ color: '#fff', textDecoration: 'none' }}>Home</a>
              <a href="#about" style={{ color: '#fff', textDecoration: 'none' }}>About</a>
              <a href="#features" style={{ color: '#fff', textDecoration: 'none' }}>Features</a>
              <a href="#contact" style={{ color: '#fff', textDecoration: 'none' }}>Contact</a>
            </div>
            <div className="footer-social" style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Facebook</a>
              <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Instagram</a>
              <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Twitter</a>
            </div>
          </div>
          <div className="footer-bottom" style={{ borderTop: '1px solid #333', marginTop: '2rem', paddingTop: '1rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.9rem' }}>&copy; 2025 PhotoBooth Pro. All rights reserved.</p>
          </div>
        </footer>
    </Layout>
  );
}