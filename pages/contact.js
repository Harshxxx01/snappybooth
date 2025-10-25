import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { useState, useEffect } from 'react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Contact() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
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
            }}>Contact Us</h1>
            <p className="hero-description" style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: 'clamp(1rem, 3vw, 1.2rem)',
              lineHeight: '1.6',
              opacity: isMounted ? 1 : 0,
              transform: isMounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s ease 0.4s',
            }}>
              We'd love to hear from you! Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid md:grid-cols-2 gap-12"
        >
          {/* Contact Information */}
          <motion.div variants={fadeInUp} className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Contact Information</h2>
            <p className="text-gray-600">
              Have questions or feedback? We're here to help! Reach out to us through any of the following methods.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 mr-4">
                  <FiMail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Email Us</h3>
                  <a href="mailto:hello@snappybooth.me" className="text-indigo-600 hover:text-indigo-500 transition-colors">
                    hello@snappybooth.me
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 mr-4">
                  <FiPhone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Call Us</h3>
                  <a href="tel:+1234567890" className="text-gray-600 hover:text-gray-900 transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mr-4">
                  <FiMapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Visit Us</h3>
                  <p className="text-gray-600">
                    123 Photo Street<br />
                    San Francisco, CA 94103
                  </p>
                </div>
              </div>
            </div>
            
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                {['Twitter', 'Facebook', 'Instagram', 'LinkedIn'].map((social) => (
                  <a 
                    key={social}
                    href={`#${social.toLowerCase()}`}
                    className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                    aria-label={social}
                  >
                    <span className="sr-only">{social}</span>
                    <span className="text-lg">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div variants={fadeInUp} className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="you@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="How can we help you?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="Type your message here..."
                ></textarea>
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  <FiSend className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Map Section */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="h-96 w-full bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">Interactive Map Placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
