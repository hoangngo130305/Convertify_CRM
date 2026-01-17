import { useRef, useEffect } from 'react';
import LandingPageMain from '../imports/LandingPageMain-227-2961';

interface LandingPageCompleteProps {
  onRegisterClick?: () => void;
}

export function LandingPageComplete({ onRegisterClick }: LandingPageCompleteProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Add hover effect styles to menu items
  useEffect(() => {
    if (!containerRef.current) return;

    // Add hover effect to menu items
    const menuTexts = ['Trang chủ', 'Vấn đề', 'Giải pháp', 'Ưu điểm', 'Bảng giá', 'Câu hỏi'];
    
    // Footer link texts
    const footerLinkTexts = [
      'About Us', 'Careers', 'Our Blog', 'Contact Us',
      'Integration', 'Customers', 'Pricing', 'Help Center',
      'Terms of Use', 'Privacy Policy', 'Cookies Policy', 'Site Map',
      'Blog'
    ];
    
    const allElements = containerRef.current.querySelectorAll('p');

    allElements.forEach((element) => {
      const text = element.textContent?.trim() || '';
      
      // Menu items hover effect
      if (menuTexts.includes(text)) {
        const parentDiv = element.closest('div[data-name="Button Contact"]') as HTMLElement;
        if (parentDiv) {
          parentDiv.style.cursor = 'pointer';
          parentDiv.style.transition = 'all 0.2s ease';
          
          parentDiv.addEventListener('mouseenter', () => {
            parentDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            parentDiv.style.transform = 'translateY(-2px)';
          });
          
          parentDiv.addEventListener('mouseleave', () => {
            parentDiv.style.backgroundColor = 'transparent';
            parentDiv.style.transform = 'translateY(0)';
          });
        }
      }
      
      // Footer links hover effect
      if (footerLinkTexts.includes(text)) {
        (element as HTMLElement).style.cursor = 'pointer';
        (element as HTMLElement).style.transition = 'all 0.2s ease';
        
        element.addEventListener('mouseenter', () => {
          (element as HTMLElement).style.color = '#7c3aed'; // Purple color
          (element as HTMLElement).style.transform = 'translateX(4px)';
        });
        
        element.addEventListener('mouseleave', () => {
          (element as HTMLElement).style.color = ''; // Reset to original color
          (element as HTMLElement).style.transform = 'translateX(0)';
        });
      }
      
      // "Dùng thử miễn phí" button hover effect
      if (text === 'Dùng thử miễn phí') {
        const buttonDiv = element.closest('div[data-name="Button CTA"]') as HTMLElement;
        if (buttonDiv) {
          buttonDiv.style.cursor = 'pointer';
          buttonDiv.style.transition = 'all 0.3s ease';
          
          // Store original styles
          const originalBg = buttonDiv.style.backgroundColor || '#0d6efd';
          
          // Check if button is in purple background section (hero section or CTA section)
          const checkIfPurpleSection = (el: HTMLElement): boolean => {
            let parent = el.parentElement;
            let depth = 0;
            while (parent && depth < 10) {
              const bgColor = window.getComputedStyle(parent).backgroundColor;
              // Check if background is purple (#7c3aed or similar)
              if (bgColor.includes('124, 58, 237') || bgColor.includes('rgb(124, 58, 237)')) {
                return true;
              }
              parent = parent.parentElement;
              depth++;
            }
            return false;
          };
          
          const isInPurpleSection = checkIfPurpleSection(buttonDiv);
          
          buttonDiv.addEventListener('mouseenter', () => {
            if (isInPurpleSection) {
              // For buttons in purple section: white border and text
              buttonDiv.style.backgroundColor = 'transparent';
              buttonDiv.style.border = '2px solid white';
              (element as HTMLElement).style.color = 'white';
            } else {
              // For other buttons: black border and text
              buttonDiv.style.backgroundColor = 'transparent';
              buttonDiv.style.border = '2px solid black';
              (element as HTMLElement).style.color = 'black';
            }
            buttonDiv.style.transform = 'scale(1.05)';
          });
          
          buttonDiv.addEventListener('mouseleave', () => {
            buttonDiv.style.backgroundColor = originalBg;
            buttonDiv.style.border = '1px solid #0d6efd';
            (element as HTMLElement).style.color = 'white';
            buttonDiv.style.transform = 'scale(1)';
          });
        }
      }
    });
  }, []);

  // Function to scroll to section by text content
  const scrollToSection = (sectionTitle: string) => {
    if (!containerRef.current) return;

    // Find all text elements
    const allTextElements = containerRef.current.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
    
    let targetElement: Element | null = null;
    
    // Search for the section title
    for (const element of allTextElements) {
      const text = element.textContent || '';
      if (text.includes(sectionTitle)) {
        targetElement = element;
        break;
      }
    }

    if (targetElement) {
      // Scroll to the section with smooth behavior
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // Handle scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div 
      ref={containerRef}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        const text = target.textContent?.trim() || '';
        
        // Check for register/trial buttons
        if (text === 'Đăng ký' || text === 'Dùng thử miễn phí') {
          e.preventDefault();
          onRegisterClick?.();
          return;
        }

        // Check for menu navigation
        switch (text) {
          case 'Trang chủ':
            e.preventDefault();
            scrollToTop();
            break;
          case 'Vấn đề':
            e.preventDefault();
            scrollToSection('Vấn đề của nhà quảng cáo Lead');
            break;
          case 'Giải pháp':
            e.preventDefault();
            scrollToSection('Giải pháp Convertify CRM');
            break;
          case 'Ưu điểm':
            e.preventDefault();
            scrollToSection('Lĩnh vực phù hợp với Convertify CRM');
            break;
          case 'Bảng giá':
            e.preventDefault();
            scrollToSection('Lựa chọn gói dịch vụ phù hợp');
            break;
          case 'Câu hỏi':
            e.preventDefault();
            scrollToSection('Những câu hỏi thường gặp');
            break;
        }
      }}
    >
      <LandingPageMain />
    </div>
  );
}