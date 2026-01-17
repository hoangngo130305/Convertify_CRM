import { useState, useEffect, useRef } from 'react';
import LandingPageMain from '../imports/LandingPageMain-227-2961';
import { MobileLandingWrapperNew } from './MobileLandingWrapperNew';

interface ResponsiveLandingPageProps {
  onRegisterClick?: () => void;
}

export function ResponsiveLandingPage({ onRegisterClick }: ResponsiveLandingPageProps) {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is tablet breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Add hover effects and click handlers for Desktop version
  useEffect(() => {
    if (!desktopRef.current || isMobile) {
      return;
    }

    // Add a small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      if (!desktopRef.current) return;

      const menuTexts = ['Trang chủ', 'Vấn đề', 'Giải pháp', 'Ưu điểm', 'Bảng giá', 'Câu hỏi'];
      
      const allElements = desktopRef.current.querySelectorAll('p');

      allElements.forEach((element) => {
        const text = element.textContent?.trim() || '';
        
        // Menu items hover effect
        if (menuTexts.includes(text)) {
          // Try multiple parent selectors
          let parentDiv = element.closest('div[data-name="Button Contact"]') as HTMLElement;
          
          // Fallback: if not found, try to get parent div
          if (!parentDiv) {
            parentDiv = element.parentElement as HTMLElement;
          }
          
          if (parentDiv) {
            
            parentDiv.style.cursor = 'pointer';
            parentDiv.style.transition = 'all 0.2s ease';
            
            const handleMouseEnter = () => {
              parentDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              parentDiv.style.transform = 'translateY(-2px)';
            };
            
            const handleMouseLeave = () => {
              parentDiv.style.backgroundColor = 'transparent';
              parentDiv.style.transform = 'translateY(0)';
            };
            
            const handleClick = () => {
              const sectionMap: Record<string, string> = {
                'Trang chủ': 'hero',
                'Vấn đề': 'problems',
                'Giải pháp': 'solutions',
                'Ưu điểm': 'benefits',
                'Bảng giá': 'pricing',
                'Câu hỏi': 'faqs'
              };
              
              const targetId = sectionMap[text];
              
              if (targetId) {
                if (targetId === 'hero') {
                  // Scroll to top for hero section
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  // Find the section by ID
                  const sectionElement = document.getElementById(targetId);
                  if (sectionElement) {
                    // Get the absolute position
                    const rect = sectionElement.getBoundingClientRect();
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const offsetPosition = rect.top + scrollTop - 100; // 100px offset for header
                    
                    // Try scrolling to the element
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                    
                    // Fallback: Try scrollIntoView if window.scrollTo doesn't work
                    setTimeout(() => {
                      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                  }
                }
              }
            };
            
            parentDiv.addEventListener('mouseenter', handleMouseEnter);
            parentDiv.addEventListener('mouseleave', handleMouseLeave);
            parentDiv.addEventListener('click', handleClick);
          }
        }
        
        // "Dùng thử miễn phí" button hover effect
        if (text === 'Dùng thử miễn phí') {
          const buttonDiv = element.closest('div[data-name="Button CTA"]') as HTMLElement;
          if (buttonDiv) {
            buttonDiv.style.cursor = 'pointer';
            buttonDiv.style.transition = 'all 0.3s ease';
            
            const checkIfPurpleSection = (el: HTMLElement): boolean => {
              let parent = el.parentElement;
              let depth = 0;
              while (parent && depth < 10) {
                const bgColor = window.getComputedStyle(parent).backgroundColor;
                if (bgColor.includes('124, 58, 237') || bgColor.includes('rgb(124, 58, 237)')) {
                  return true;
                }
                parent = parent.parentElement;
                depth++;
              }
              return false;
            };
            
            const isInPurpleSection = checkIfPurpleSection(buttonDiv);
            
            const handleMouseEnter = () => {
              if (isInPurpleSection) {
                buttonDiv.style.backgroundColor = 'transparent';
                buttonDiv.style.border = '2px solid white';
                (element as HTMLElement).style.color = 'white';
              } else {
                buttonDiv.style.backgroundColor = '#0b5ed7';
                buttonDiv.style.transform = 'translateY(-2px)';
                buttonDiv.style.boxShadow = '0 4px 12px rgba(13, 110, 253, 0.3)';
              }
            };
            
            const handleMouseLeave = () => {
              if (isInPurpleSection) {
                buttonDiv.style.backgroundColor = '#0d6efd';
                buttonDiv.style.border = '1px solid #0d6efd';
                (element as HTMLElement).style.color = 'white';
              } else {
                buttonDiv.style.backgroundColor = '#0d6efd';
                buttonDiv.style.transform = 'translateY(0)';
                buttonDiv.style.boxShadow = 'none';
              }
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
        
        // "Đăng ký" button in header
        if (text === 'Đăng ký') {
          const buttonDiv = element.closest('div[data-name="Button Contact"]') as HTMLElement;
          if (buttonDiv) {
            buttonDiv.style.cursor = 'pointer';
            buttonDiv.style.transition = 'all 0.3s ease';
            
            const handleMouseEnter = () => {
              buttonDiv.style.backgroundColor = '#0b5ed7';
              buttonDiv.style.transform = 'translateY(-2px)';
              buttonDiv.style.boxShadow = '0 4px 12px rgba(13, 110, 253, 0.3)';
            };
            
            const handleMouseLeave = () => {
              buttonDiv.style.backgroundColor = '#0d6efd';
              buttonDiv.style.transform = 'translateY(0)';
              buttonDiv.style.boxShadow = 'none';
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
    }, 100); // 100ms delay

    return () => clearTimeout(timer);
  }, [isMobile, onRegisterClick]);

  return (
    <div ref={containerRef} className="w-full h-full">
      {/* Desktop/Tablet Version */}
      <div 
        ref={desktopRef}
        className={`${isMobile ? 'hidden' : 'block'} w-full h-full`}
      >
        <LandingPageMain />
      </div>

      {/* Mobile Version - Figma component with responsive wrapper */}
      {isMobile && <MobileLandingWrapperNew onRegisterClick={onRegisterClick} />}
    </div>
  );
}