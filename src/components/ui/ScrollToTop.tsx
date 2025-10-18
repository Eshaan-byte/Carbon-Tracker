'use client';

import { useState, useEffect } from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down 300px
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      scrollToTop();
    }
  };

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener('scroll', toggleVisibility);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          onKeyDown={handleKeyDown}
          className="fixed bottom-4 right-16 z-[9999] bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-xl transition-all duration-300 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 animate-in fade-in-0 slide-in-from-bottom-2 lg:bottom-4 lg:right-16"
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          <ChevronUpIcon className="w-6 h-6" />
        </button>
      )}
    </>
  );
}
