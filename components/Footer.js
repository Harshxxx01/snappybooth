import React from 'react';
import Link from 'next/link';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLogo}>
          <h3>PhotoBooth Pro</h3>
          <p>Your Photo Booth Solution</p>
        </div>
        <div className={styles.footerLinks}>
          <Link href="/#home" className={styles.footerLink}>Home</Link>
          <Link href="/about" className={styles.footerLink}>About</Link>
          <Link href="/#features" className={styles.footerLink}>Features</Link>
          <Link href="/contact" className={styles.footerLink}>Contact</Link>
        </div>
        <div className={styles.footerSocial}>
          <a href="#" className={styles.socialLink} aria-label="Facebook">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
            </svg>
          </a>
          <a href="#" className={styles.socialLink} aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a href="#" className={styles.socialLink} aria-label="Twitter">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
            </svg>
          </a>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; {currentYear} PhotoBooth Pro. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
