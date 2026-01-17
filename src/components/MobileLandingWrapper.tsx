import { useEffect, useRef } from 'react';
import LandingPageMobile from '../imports/LandingPageMobile-239-2956';

interface MobileLandingWrapperProps {
  onRegisterClick?: () => void;
}

export function MobileLandingWrapper({ onRegisterClick }: MobileLandingWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Remove absolute positioning and fixed width from main container
    const mainContainer = containerRef.current.querySelector('[data-name="Landing Page Mobile"]') as HTMLElement;
    if (mainContainer) {
      mainContainer.style.position = 'relative';
      mainContainer.style.left = 'auto';
      mainContainer.style.top = 'auto';
      mainContainer.style.transform = 'none';
      mainContainer.style.width = '100%';
      mainContainer.style.maxWidth = '100vw';
    }

    // Fix header positioning
    const header = containerRef.current.querySelector('[data-name="Mobile Header"]') as HTMLElement;
    if (header) {
      header.style.position = 'sticky';
      header.style.top = '0';
      header.style.left = 'auto';
      header.style.transform = 'none';
      header.style.width = '100%';
      header.style.maxWidth = '100vw';
      header.style.zIndex = '50';
    }

    // Fix hero section positioning
    const hero = containerRef.current.querySelector('[data-name="Mobile Hero"]') as HTMLElement;
    if (hero) {
      hero.style.position = 'relative';
      hero.style.left = 'auto';
      hero.style.top = 'auto';
      hero.style.transform = 'none';
      hero.style.width = '100%';
      hero.style.maxWidth = '100vw';
      hero.style.height = 'auto';
      hero.style.minHeight = '600px';
    }

    // Fix all sections with absolute positioning and fixed 430px width
    const sections = containerRef.current.querySelectorAll('[class*="w-[430px]"]');
    sections.forEach((section) => {
      const element = section as HTMLElement;
      if (element.style.position === 'absolute' || element.classList.contains('absolute')) {
        element.style.position = 'relative';
        element.style.left = 'auto';
        element.style.top = 'auto';
        element.style.transform = 'none';
      }
      element.style.width = '100%';
      element.style.maxWidth = '100vw';
    });

    // Add click handlers for "Đăng ký" and "Dùng thử miễn phí" buttons
    const allElements = containerRef.current.querySelectorAll('p');
    allElements.forEach((element) => {
      const text = element.textContent?.trim() || '';
      
      if (text === 'Đăng ký' || text === 'Dùng thử miễn phí') {
        const buttonDiv = element.closest('div[data-name*="Button"]') as HTMLElement;
        if (buttonDiv) {
          buttonDiv.style.cursor = 'pointer';
          buttonDiv.style.transition = 'all 0.3s ease';
          
          const handleMouseEnter = () => {
            buttonDiv.style.backgroundColor = '#0b5ed7';
            buttonDiv.style.transform = 'translateY(-2px)';
          };
          
          const handleMouseLeave = () => {
            buttonDiv.style.backgroundColor = '#0d6efd';
            buttonDiv.style.transform = 'translateY(0)';
          };
          
          const handleClick = () => {
            if (onRegisterClick) {
              onRegisterClick();
            }
          };
          
          buttonDiv.addEventListener('mouseenter', handleMouseEnter);
          buttonDiv.addEventListener('mouseleave', handleMouseLeave);
          buttonDiv.addEventListener('click', handleClick);
        }
      }
    });
  }, [onRegisterClick]);

  return (
    <div ref={containerRef} className="w-full overflow-x-hidden">
      <style>{`
        /* Force responsive behavior */
        [data-name="Landing Page Mobile"],
        [data-name="Mobile Header"],
        [data-name="Mobile Hero"],
        .w-\\\\[430px\\\\] {
          width: 100% !important;
          max-width: 100vw !important;
          left: auto !important;
          transform: none !important;
        }
        
        /* Fix positioning */
        [data-name="Landing Page Mobile"] {
          position: relative !important;
          top: auto !important;
        }
        
        [data-name="Mobile Header"] {
          position: sticky !important;
          top: 0 !important;
          z-index: 50;
        }
        
        [data-name="Mobile Hero"] {
          position: relative !important;
          top: auto !important;
          height: auto !important;
          min-height: 600px;
        }
        
        /* Responsive sections */
        [class*="absolute"][class*="w-[430px]"] {
          position: relative !important;
          top: auto !important;
          margin-top: 0 !important;
        }
        
        /* Ensure no horizontal scroll */
        * {
          max-width: 100vw;
        }
        
        img {
          max-width: 100%;
          height: auto;
        }
      `}</style>
      <LandingPageMobile onRegisterClick={onRegisterClick} />
    </div>
  );
}