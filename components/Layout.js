import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  // Close menu when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && 
          headerRef.current && !headerRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    // Handle scroll with throttle
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only update state if scroll position changes significantly
      if (Math.abs(currentScrollY - lastScrollY) > 5) {
        setIsScrolled(currentScrollY > 10);
        lastScrollY = currentScrollY;
      }
    };

    // Add event listeners
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('scroll', handleScroll, { passive: true });
    };
  }, [isMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header 
        ref={headerRef}
        className={`w-full px-4 sm:px-6 py-3 flex items-center justify-between fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/25 shadow-md py-2' : 'bg-white py-3'
        }`}
        style={{
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.08)' : 'none',
          transition: 'all 0.3s ease-in-out'
        }}
      >
        <div className="flex items-center flex-1">
          <Link href="/" className="z-50" aria-label="SnappyBooth Home">
            <div className="relative w-32 h-10 md:w-40 md:h-12">
              <Image 
                src="/images/snappy.png" 
                alt="SnappyBooth" 
                fill
                className="object-contain object-left"
                priority
                sizes="(max-width: 768px) 8rem, 10rem"
              />
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 xl:space-x-4">
          <NavLink href="/landing">Home</NavLink>
          <NavLink href="/choose">Choose Layout</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/privacy-policy">Privacy Policy</NavLink>
          <Link 
            href="/contact" 
            className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 whitespace-nowrap"
            aria-label="Contact Us"
          >
            Contact Us
          </Link>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden z-50 ml-4">
          <button
            onClick={toggleMenu}
            className="p-2 -mr-2 rounded-md text-gray-700 hover:text-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {!isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        ref={menuRef}
        id="mobile-menu"
        className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out pt-20 pb-8 px-6 overflow-y-auto ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isMenuOpen}
        aria-labelledby="mobile-menu-title"
      >
        <h2 id="mobile-menu-title" className="sr-only">Main Menu</h2>
        <nav className="flex flex-col space-y-6 py-8">
          <MobileNavLink href="/landing" onClick={() => setIsMenuOpen(false)}>
            Home
          </MobileNavLink>
          <MobileNavLink href="/choose" onClick={() => setIsMenuOpen(false)}>
            Choose Layout
          </MobileNavLink>
          <MobileNavLink href="/about" onClick={() => setIsMenuOpen(false)}>
            About
          </MobileNavLink>
          <MobileNavLink href="/privacy-policy" onClick={() => setIsMenuOpen(false)}>
            Privacy Policy
          </MobileNavLink>
          <div className="pt-4 mt-4 border-t border-gray-100">
            <Link 
              href="/contact" 
              className="block w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-base font-semibold text-center transition-all duration-200 transform hover:scale-105 active:scale-95"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </nav>
      </div>
      
      {/* Main content with responsive padding */}
      <main className={`pt-16 md:pt-20 lg:pt-24 transition-all duration-300 ${
        isMenuOpen ? 'blur-sm md:blur-0' : ''
      }`}>
        {children}
      </main>
    </div>
  );
}

// Reusable NavLink component for desktop
function NavLink({ href, children }) {
  return (
    <Link 
      href={href}
      className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-pink-500 transition-colors duration-200 rounded-md whitespace-nowrap"
    >
      {children}
    </Link>
  );
}

// Reusable MobileNavLink component
function MobileNavLink({ href, onClick, children }) {
  return (
    <Link 
      href={href}
      onClick={onClick}
      className="text-lg font-medium text-gray-800 hover:text-pink-500 transition-colors duration-200 py-2 block"
    >
      {children}
    </Link>
  );
}
