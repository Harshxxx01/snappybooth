import React from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/ContactSection.module.css';

const ContactSection = () => {
  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.sectionTitle}>Contact Us</h2>
          <div className={styles.contactInfo}>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className={styles.contactItem}
            >
              <h3>Email</h3>
              <p>support@photoboothpro.com</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className={styles.contactItem}
            >
              <h3>Phone</h3>
              <p>+1 234 567 8900</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className={styles.contactItem}
            >
              <h3>Location</h3>
              <p>123 Photo Booth Ave, Event City, EC 12345</p>
            </motion.div>
          </div>
          <div className={styles.formContainer}>
            <motion.div 
              className={styles.contactForm}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '2rem',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div className={styles.formImage}>
                <img src="/images/contact-image.jpg" alt="Contact Us" />
              </div>
              <div className={styles.formContent}>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    placeholder="Name"
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <input
                    type="email"
                    placeholder="Email"
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <textarea
                    placeholder="Message"
                    className={styles.textarea}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={styles.submitButton}
                >
                  Send Message
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
