import { useEffect, useState } from 'react';
import LandingPageMobile from '../imports/LandingPageMobile-240-1484';

interface MobileLandingWrapperNewProps {
  onRegisterClick?: () => void;
}

export function MobileLandingWrapperNew({ onRegisterClick }: MobileLandingWrapperNewProps) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const viewportWidth = window.innerWidth;
      const designWidth = 430; // Figma design width for mobile
      
      // Scale down if viewport is smaller than design width
      if (viewportWidth < designWidth) {
        setScale(viewportWidth / designWidth);
      } else {
        setScale(1);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  useEffect(() => {
    // Add click handlers for register buttons
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const buttonText = target.textContent?.trim() || '';
      
      if (buttonText === 'Đăng ký' || buttonText === 'Dùng thử miễn phí') {
        e.preventDefault();
        e.stopPropagation();
        if (onRegisterClick) {
          onRegisterClick();
        }
      }
    };
    
    // Listen for custom event from MobileHeader
    const handleOpenLoginPopup = () => {
      if (onRegisterClick) {
        onRegisterClick();
      }
    };

    document.addEventListener('click', handleClick);
    window.addEventListener('openLoginPopup', handleOpenLoginPopup);
    
    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('openLoginPopup', handleOpenLoginPopup);
    };
  }, [onRegisterClick]);

  return (
    <div 
      id="mobile-scroll-container"
      className="w-full bg-white overflow-x-hidden overflow-y-auto" 
      style={{ height: '100vh' }}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '100vw',
        }}
      >
        <LandingPageMobile />
      </div>
      
      <style>{`
        /* Add hover effects for buttons */
        [data-name*="Button"] {
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        [data-name*="Button"]:hover {
          opacity: 0.9;
          transform: translateY(-2px);
        }
        
        /* Ensure smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Prevent horizontal overflow and remove default spacing */
        body {
          overflow-x: hidden !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        
        /* Remove any container padding that might cause gaps */
        * {
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
        }
        
        /* Testimonial card optimizations */
        [data-name="Landing Page - Mobile"] img[alt="Khách hàng"],
        [data-name="Landing Page - Mobile"] img[src*="Ellipse"] {
          border-radius: 50%;
          object-fit: cover;
        }
        
        /* Smooth transitions for interactive elements */
        [data-name="Landing Page - Mobile"] [class*="shadow"] {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
}