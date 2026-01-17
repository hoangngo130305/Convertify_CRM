import { useState } from 'react';
import svgPaths from "../imports/svg-j28agzdiyp";
import imgHero1Img1 from "figma:asset/2be47e67227fd376eb094b55ac5112065f82355f.png";
import imgHero2Img1 from "figma:asset/d4d57d2df832c490761752acaa5a5611096ad0f3.png";
import imgConvertifyLogoFullLight021 from "figma:asset/d2afe422db17950f27d4ea454ca993e47c0efea1.png";
import imgRectangle1 from "figma:asset/8f744231b291c01b80cc80cad5cc40941d88f215.png";
import imgRectangle2 from "figma:asset/4986c3f2b61e44b7f24f7c55a55bdda39c0b9a48.png";
import imgRectangle3 from "figma:asset/bda7b0d56db163d83dc5e77af664f9cb393facca.png";
import imgRectangle4 from "figma:asset/b6767066b78cfb865d7a3f6e212caf8d7ff0c3c0.png";
import imgRectangle5 from "figma:asset/6dea98ec815b7c5559a6aeee3378e1e9b2852960.png";
import imgRectangle6 from "figma:asset/be845882c72f33b6fefd8af3421980d039c99c7a.png";
import imgRectangle7 from "figma:asset/2076b46a96f4422a375bbf562b7998e5dd9fb028.png";
import imgRectangle8 from "figma:asset/6afbffa74bc1db39b9b125819b3493035c2e7cb2.png";

interface LandingPageProps {
  onRegisterClick?: () => void;
}

export function LandingPage({ onRegisterClick }: LandingPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleRegisterClick = () => {
    if (onRegisterClick) {
      onRegisterClick();
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Hero slides data
  const heroSlides = [
    {
      title: "CRM đồng bộ Lead đa kênh cho nhà quảng cáo",
      description: "Đồng bộ lead từ Facebook, Zalo, TikTok, Landing Page. Tối ưu quảng cáo và giảm data kém chất lượng.",
      image: imgHero1Img1,
      alt: "Convertify CRM Dashboard"
    },
    {
      title: "Quản lý Lead thông minh với AI",
      description: "Tự động phân loại, chấm điểm lead và gợi ý chiến lược tối ưu. Tăng tỷ lệ chuyển đổi lên 3x.",
      image: imgHero2Img1,
      alt: "Convertify AI Lead Management"
    }
  ];

  return (
    <div className="bg-white overflow-x-hidden min-h-screen" style={{ 
      width: '100%',
      maxWidth: '100vw'
    }}>
      {/* Hero Section */}
      <section id="hero" className="relative bg-[#7c3aed] overflow-hidden w-full" style={{ 
        minHeight: 'min(42vw, 810px)'
      }}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
          <svg className="w-full h-full" fill="none" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1644 981">
            <g clipPath="url(#clip0_227_1605)">
              <path d={svgPaths.p2c7a3080} fill="#FCF9FE" opacity="0.36" />
              <path d={svgPaths.p1be41880} fill="#FCF9FE" opacity="0.5" />
            </g>
            <defs>
              <clipPath id="clip0_227_1605">
                <rect fill="white" height="981" width="1644" />
              </clipPath>
            </defs>
          </svg>
        </div>

        {/* Header */}
        <header className="relative bg-[#7c3aed] flex items-center justify-between shadow-sm w-full" style={{ 
          height: 'min(5.2vw, 80px)',
          padding: '0 min(2.5vw, 48px)'
        }}>
          <div className="rounded overflow-hidden flex items-center justify-center flex-shrink-0" style={{ 
            height: 'min(3.2vw, 50px)',
            width: 'auto',
            maxWidth: 'min(12vw, 231px)'
          }}>
            <img 
              alt="Convertify CRM Logo" 
              className="w-full h-full object-contain" 
              src={imgConvertifyLogoFullLight021} 
            />
          </div>

          {/* Navigation - Hidden on smaller screens */}
          <nav className="hidden xl:flex items-center flex-wrap" style={{ gap: 'min(0.4vw, 8px)' }}>
            <button onClick={() => scrollToSection('hero')} className="text-white font-bold hover:bg-white/10 rounded transition-colors whitespace-nowrap" style={{ 
              padding: 'min(0.52vw, 10px) min(0.83vw, 16px)',
              fontSize: 'min(0.73vw, 14px)'
            }}>
              Trang chủ
            </button>
            <button onClick={() => scrollToSection('problems')} className="text-white font-bold hover:bg-white/10 rounded transition-colors whitespace-nowrap" style={{ 
              padding: 'min(0.52vw, 10px) min(0.83vw, 16px)',
              fontSize: 'min(0.73vw, 14px)'
            }}>
              Vấn đề
            </button>
            <button onClick={() => scrollToSection('solutions')} className="text-white font-bold hover:bg-white/10 rounded transition-colors whitespace-nowrap" style={{ 
              padding: 'min(0.52vw, 10px) min(0.83vw, 16px)',
              fontSize: 'min(0.73vw, 14px)'
            }}>
              Giải pháp
            </button>
            <button onClick={() => scrollToSection('advantages')} className="text-white font-bold hover:bg-white/10 rounded transition-colors whitespace-nowrap" style={{ 
              padding: 'min(0.52vw, 10px) min(0.83vw, 16px)',
              fontSize: 'min(0.73vw, 14px)'
            }}>
              Ưu điểm
            </button>
            <button onClick={() => scrollToSection('pricing')} className="text-white font-bold hover:bg-white/10 rounded transition-colors whitespace-nowrap" style={{ 
              padding: 'min(0.52vw, 10px) min(0.83vw, 16px)',
              fontSize: 'min(0.73vw, 14px)'
            }}>
              Bảng giá
            </button>
            <button onClick={() => scrollToSection('faq')} className="text-white font-bold hover:bg-white/10 rounded transition-colors whitespace-nowrap" style={{ 
              padding: 'min(0.52vw, 10px) min(0.83vw, 16px)',
              fontSize: 'min(0.73vw, 14px)'
            }}>
              Câu hỏi
            </button>
            <button 
              onClick={handleRegisterClick}
              className="bg-[#0d6efd] text-white font-bold rounded hover:bg-[#0b5ed7] transition-colors whitespace-nowrap" style={{ 
                padding: 'min(0.52vw, 10px) min(0.83vw, 16px)',
                fontSize: 'min(0.73vw, 14px)'
              }}
            >
              Đăng ký
            </button>
          </nav>

          {/* Mobile/Tablet Register Button */}
          <button 
            onClick={handleRegisterClick}
            className="xl:hidden bg-[#0d6efd] text-white font-bold rounded hover:bg-[#0b5ed7] transition-colors flex-shrink-0" style={{ 
              padding: 'min(0.7vw, 10px) min(1.2vw, 16px)',
              fontSize: 'min(1vw, 14px)'
            }}
          >
            Đăng ký
          </button>
        </header>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center w-full" style={{ 
          padding: `min(4.2vw, 80px) min(2.5vw, 48px) min(2.5vw, 48px)`,
          gap: 'min(2.5vw, 48px)',
          minHeight: 'min(38vw, 730px)'
        }}>
          {/* Text Content */}
          <div className="flex-1 flex flex-col w-full" style={{ gap: 'min(2.8vw, 54px)' }}>
            <div className="flex flex-col text-white" style={{ gap: 'min(1.25vw, 24px)' }}>
              <h1 className="font-bold leading-tight break-words" style={{ fontSize: 'min(3.3vw, 64px)' }}>
                {heroSlides[currentSlide].title}
              </h1>
              <p className="leading-relaxed" style={{ fontSize: 'min(1.15vw, 22px)' }}>
                {heroSlides[currentSlide].description}
              </p>
            </div>

            <div className="flex flex-col" style={{ gap: 'min(0.73vw, 14px)' }}>
              <button 
                onClick={handleRegisterClick}
                className="bg-[#0d6efd] text-white font-medium rounded hover:bg-[#0b5ed7] transition-colors w-fit" style={{ 
                  padding: 'min(0.63vw, 12px) min(1.25vw, 24px)',
                  fontSize: 'min(0.94vw, 18px)'
                }}
              >
                Dùng thử miễn phí
              </button>
              <p className="text-white" style={{ 
                fontSize: 'min(0.83vw, 16px)',
                lineHeight: '1.6'
              }}>
                Miễn phí mọi tính năng, dễ dùng trong 5 phút
              </p>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex-1 flex items-center justify-center w-full">
            <img 
              alt={heroSlides[currentSlide].alt} 
              className="w-full h-auto object-contain" 
              style={{ maxWidth: 'min(26.8vw, 515px)' }}
              src={heroSlides[currentSlide].image} 
            />
          </div>
        </div>

        {/* Slider Indicators */}
        <div className="absolute left-1/2 -translate-x-1/2 flex" style={{ 
          bottom: 'min(1.67vw, 32px)',
          gap: 'min(0.63vw, 12px)'
        }}>
          <button 
            onClick={() => setCurrentSlide(0)}
            className={`rounded-full transition-all hover:scale-110 ${currentSlide === 0 ? 'bg-white' : 'bg-white/25 hover:bg-white/40'}`}
            style={{ 
              width: 'min(0.42vw, 8px)',
              height: 'min(0.42vw, 8px)',
              border: 'none',
              cursor: 'pointer',
              padding: 0
            }}
            aria-label="Slide 1"
          ></button>
          <button 
            onClick={() => setCurrentSlide(1)}
            className={`rounded-full transition-all hover:scale-110 ${currentSlide === 1 ? 'bg-white' : 'bg-white/25 hover:bg-white/40'}`}
            style={{ 
              width: 'min(0.42vw, 8px)',
              height: 'min(0.42vw, 8px)',
              border: 'none',
              cursor: 'pointer',
              padding: 0
            }}
            aria-label="Slide 2"
          ></button>
        </div>
      </section>

      {/* Problems Section */}
      <section id="problems" className="py-6 sm:py-8 md:py-12 lg:py-16 xl:py-[60px] max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 overflow-hidden">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-[40px] mx-auto max-w-4xl px-2 sm:px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[48px] font-bold text-[#212529] mb-2 sm:mb-3 lg:mb-4">
            Vấn đề của nhà quảng cáo Lead
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[22px] leading-relaxed text-[#212529]">
            4 vấn đề phổ biến mà các nhà quảng cáo lead hay gặp phải
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-[30px]">
          {/* Problem 1 */}
          <div className="bg-white p-[20px] rounded-[10px] shadow-[0px_10px_25px_-10px_rgba(33,37,41,0.15)] flex flex-col gap-[40px]">
            <div className="flex flex-col gap-[12px]">
              <div className="w-[40px] h-[40px]">
                <svg className="w-full h-full" fill="none" viewBox="0 0 40 40">
                  <path d={svgPaths.p738f00} stroke="#7C3AED" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                  <path d={svgPaths.peebde00} stroke="#7C3AED" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                </svg>
              </div>
              <h3 className="text-[26px] font-bold text-[#212529]">Quản lý thủ công</h3>
              <p className="text-[16px] leading-[25px] text-[#212529]">
                Dữ liệu rời rạc trên Google Sheet, dễ bỏ sót và rò rỉ lead.
              </p>
            </div>
            <div className="rounded-[5px] overflow-hidden relative aspect-[293/219.75]">
              <img alt="" className="w-full h-full object-cover" src={imgRectangle1} />
              <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent" />
            </div>
          </div>

          {/* Problem 2 */}
          <div className="bg-white p-[20px] rounded-[10px] shadow-[0px_10px_25px_-10px_rgba(33,37,41,0.15)] flex flex-col gap-[40px]">
            <div className="flex flex-col gap-[12px]">
              <div className="w-[40px] h-[40px]">
                <svg className="w-full h-full" fill="none" viewBox="0 0 40 40">
                  <path d={svgPaths.p3f4c9340} stroke="#7C3AED" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                  <path d={svgPaths.p22941580} stroke="#7C3AED" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                  <path d="M30 13.3333L38.3333 21.6667" stroke="#7C3AED" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                  <path d="M38.3333 13.3333L30 21.6667" stroke="#7C3AED" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                </svg>
              </div>
              <h3 className="text-[26px] font-bold text-[#212529]">Mù mờ "Khách thật"</h3>
              <p className="text-[16px] leading-[25px] text-[#212529]">
                Không biết kênh nào dẫn về khách chất lượng để tối ưu ngân sách.
              </p>
            </div>
            <div className="rounded-[5px] overflow-hidden relative aspect-[293/219.75]">
              <img alt="" className="w-full h-full object-cover" src={imgRectangle2} />
              <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent" />
            </div>
          </div>

          {/* Problem 3 */}
          <div className="bg-white p-[20px] rounded-[10px] shadow-[0px_10px_25px_-10px_rgba(33,37,41,0.15)] flex flex-col gap-[40px]">
            <div className="flex flex-col gap-[12px]">
              <div className="w-[40px] h-[40px]">
                <svg className="w-full h-full" fill="none" viewBox="0 0 40 40">
                  <path d="M20 1.66667V38.3333" stroke="#7C3AED" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                  <path d={svgPaths.p3bec0d00} stroke="#7C3AED" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                </svg>
              </div>
              <h3 className="text-[26px] font-bold text-[#212529]">Lãng phí ngân sách</h3>
              <p className="text-[16px] leading-[25px] text-[#212529]">
                Data rác, số sai, form ảo làm đội chi phí quảng cáo.
              </p>
            </div>
            <div className="rounded-[5px] overflow-hidden relative aspect-[293/219.75]">
              <img alt="" className="w-full h-full object-cover" src={imgRectangle3} />
              <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent" />
            </div>
          </div>

          {/* Problem 4 */}
          <div className="bg-white p-[20px] rounded-[10px] shadow-[0px_10px_25px_-10px_rgba(33,37,41,0.15)] flex flex-col gap-[40px]">
            <div className="flex flex-col gap-[12px]">
              <div className="w-[40px] h-[40px]">
                <svg className="w-full h-full" fill="none" viewBox="0 0 40 40">
                  <path d={svgPaths.p2ebcf80} stroke="#7C3AED" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                  <path d={svgPaths.p959d930} stroke="#7C3AED" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                </svg>
              </div>
              <h3 className="text-[26px] font-bold text-[#212529]">Sales phản hồi chậm</h3>
              <p className="text-[16px] leading-[25px] text-[#212529]">
                Lead không được phân bổ tự động, gọi trùng khách, rớt đơn.
              </p>
            </div>
            <div className="rounded-[5px] overflow-hidden relative aspect-[293/219.75]">
              <img alt="" className="w-full h-full object-cover" src={imgRectangle4} />
              <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-4 border-t border-[#CCCCCC]"></div>

      {/* Solutions Section */}
      <section id="solutions" className="py-8 md:py-12 lg:py-[60px] max-w-7xl mx-auto px-4 md:px-8 lg:px-12 overflow-hidden">
        <div className="text-center mb-8 md:mb-10 lg:mb-[40px] mx-auto max-w-4xl px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-[48px] font-bold text-[#212529] mb-3 lg:mb-[12px]">
            Giải pháp Convertify CRM
          </h2>
          <p className="text-base md:text-lg lg:text-xl xl:text-[22px] leading-relaxed lg:leading-[32px] text-[#212529]">
            Convertify CRM với 4 giải pháp tối ưu giúp giải quyết tất cả vấn đề của nhà quảng cáo Lead trong cùng 1 nền tảng duy nhất
          </p>
        </div>

        {/* Solution Cards */}
        <div className="flex flex-col gap-4 md:gap-6 lg:gap-0 relative">
          {/* Solution 1 - LeadHub */}
          <div className="bg-[#fcf9fe] p-5 md:p-8 lg:p-[45px] flex flex-col lg:flex-row gap-5 lg:gap-[30px] items-center shadow-[0px_10px_25px_-10px_rgba(124,58,237,0.15)] relative z-[4] rounded-lg lg:rounded-none">
            <img 
              alt="Lead Hub Feature" 
              className="w-full lg:w-[660px] h-auto lg:h-[440px] object-cover rounded-[10px] border border-[#7c3aed] shadow-[0px_10px_25px_-10px_rgba(124,58,237,0.15)]" 
              src={imgRectangle5} 
            />
            <div className="flex-1 flex flex-col gap-4 lg:gap-[20px]">
              <div className="flex gap-[23px] items-start">
                <div className="w-[60px] h-[60px] rounded-[10px] flex items-center justify-center bg-gradient-to-br from-[#fcf9fe] via-[#dcc9fa] via-30% to-[#7c3aed] p-[10px]">
                  <svg className="w-[40px] h-[40px]" fill="none" viewBox="0 0 40 40">
                    <path d={svgPaths.p9d4580} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                    <path d={svgPaths.p17aff600} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#7c3aed] text-[18px] uppercase font-normal">TÍNH NĂNG LEADHUB</p>
                  <h3 className="text-[26px] font-bold text-[#212529]">Đồng bộ Lead đa kênh</h3>
                </div>
              </div>
              <p className="text-[16px] leading-[25px] text-black">
                Kết nối Facebook Lead Ads, Zalo, TikTok, Landing Page chỉ với vài click. Mọi lead đồ về một nơi, thông báo ngay lập tức.
              </p>
              <button 
                onClick={handleRegisterClick}
                className="bg-[#0d6efd] px-[24px] py-[10px] text-white text-[18px] font-medium rounded hover:bg-[#0b5ed7] transition-colors w-fit"
              >
                Dùng thử miễn phí
              </button>
            </div>
          </div>

          {/* Solution 2 - Ads Tracking */}
          <div className="bg-white p-5 md:p-8 lg:p-[45px] flex flex-col-reverse lg:flex-row gap-5 lg:gap-[30px] items-center justify-end shadow-[0px_10px_25px_-10px_rgba(124,58,237,0.15)] relative z-[3] rounded-lg lg:rounded-none">
            <div className="flex-1 flex flex-col gap-4 lg:gap-[20px]">
              <div className="flex gap-[23px] items-start">
                <div className="w-[60px] h-[60px] rounded-[10px] flex items-center justify-center bg-gradient-to-br from-[#fcf9fe] via-[#dcc9fa] via-30% to-[#7c3aed] p-[10px] flex-shrink-0">
                  <svg className="w-[40px] h-[40px]" fill="none" viewBox="0 0 40 40">
                    <path d={svgPaths.pdd16700} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                    <path d="M30 28.3333V15" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                    <path d="M21.6667 28.3333V8.33333" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                    <path d="M13.3333 28.3333V23.3333" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#7c3aed] text-sm md:text-base lg:text-[18px] uppercase font-normal">TÍNH NĂNG Ads Tracking</p>
                  <h3 className="text-xl md:text-2xl lg:text-[26px] font-bold text-[#212529]">Đo lường hiệu quả</h3>
                </div>
              </div>
              <p className="text-sm md:text-base lg:text-[16px] leading-relaxed lg:leading-[25px] text-black">
                Biết chính xác lead chất lượng đến từ chiến dịch nào. Thấy ngay chi phí/lead và doanh thu để ra quyết định tăng/giảm ngân sách.
              </p>
              <button 
                onClick={handleRegisterClick}
                className="bg-[#0d6efd] px-[24px] py-[10px] text-white text-base lg:text-[18px] font-medium rounded hover:bg-[#0b5ed7] transition-colors w-fit"
              >
                Dùng thử miễn phí
              </button>
            </div>
            <img 
              alt="Ads Tracking Feature" 
              className="w-full lg:w-[660px] h-auto lg:h-[440px] object-cover rounded-[10px] border border-[#7c3aed] shadow-[0px_10px_25px_-10px_rgba(124,58,237,0.15)]" 
              src={imgRectangle6} 
            />
          </div>

          {/* Solution 3 - DataSet */}
          <div className="bg-[#fcf9fe] p-5 md:p-8 lg:p-[45px] flex flex-col lg:flex-row gap-5 lg:gap-[30px] items-center shadow-[0px_10px_25px_-10px_rgba(124,58,237,0.15)] relative z-[2] rounded-lg lg:rounded-none">
            <img 
              alt="DataSet Feature" 
              className="w-full lg:w-[660px] h-auto lg:h-[440px] object-cover rounded-[10px] border border-[#7c3aed] shadow-[0px_10px_25px_-10px_rgba(124,58,237,0.15)]" 
              src={imgRectangle7} 
            />
            <div className="flex-1 flex flex-col gap-4 lg:gap-[20px]">
              <div className="flex gap-[23px] items-start">
                <div className="w-[60px] h-[60px] rounded-[10px] flex items-center justify-center bg-gradient-to-br from-[#fcf9fe] via-[#dcc9fa] via-30% to-[#7c3aed] p-[10px] flex-shrink-0">
                  <svg className="w-[40px] h-[40px]" fill="none" viewBox="0 0 40 40">
                    <path d={svgPaths.p20b6e900} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                    <path d={svgPaths.p3fb6f400} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                    <path d={svgPaths.p3d21d400} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#7c3aed] text-sm md:text-base lg:text-[18px] uppercase font-normal">TÍNH NĂNG DataSet</p>
                  <h3 className="text-xl md:text-2xl lg:text-[26px] font-bold text-[#212529]">Tối ưu & loại bỏ rác</h3>
                </div>
              </div>
              <p className="text-sm md:text-base lg:text-[16px] leading-relaxed lg:leading-[25px] text-black">
                Gửi tín hiệu chất lượng Lead ngược về Facebook/TikTok để thuật toán hiểu và phân phối quảng cáo đúng đối tượng hơn.
              </p>
              <button 
                onClick={handleRegisterClick}
                className="bg-[#0d6efd] px-[24px] py-[10px] text-white text-base lg:text-[18px] font-medium rounded hover:bg-[#0b5ed7] transition-colors w-fit"
              >
                Dùng thử miễn phí
              </button>
            </div>
          </div>

          {/* Solution 4 - Customer Management */}
          <div className="bg-white p-5 md:p-8 lg:p-[45px] flex flex-col-reverse lg:flex-row gap-5 lg:gap-[30px] items-center justify-end shadow-[0px_10px_25px_-10px_rgba(124,58,237,0.15)] relative z-[1] rounded-lg lg:rounded-none">
            <div className="flex-1 flex flex-col gap-4 lg:gap-[20px]">
              <div className="flex gap-[23px] items-start">
                <div className="w-[60px] h-[60px] rounded-[10px] flex items-center justify-center bg-gradient-to-br from-[#fcf9fe] via-[#dcc9fa] via-30% to-[#7c3aed] p-[10px] flex-shrink-0">
                  <svg className="w-[40px] h-[40px]" fill="none" viewBox="0 0 40 40">
                    <path d={svgPaths.p1a96b600} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                    <path d={svgPaths.p1fe95580} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                    <path d={svgPaths.p2a06b680} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                    <path d={svgPaths.p1517b200} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#7c3aed] text-sm md:text-base lg:text-[18px] uppercase font-normal">TÍNH NĂNG Customer Management</p>
                  <h3 className="text-xl md:text-2xl lg:text-[26px] font-bold text-[#212529]">Quản lý dễ dàng</h3>
                </div>
              </div>
              <p className="text-sm md:text-base lg:text-[16px] leading-relaxed lg:leading-[25px] text-black">
                Gắn tag phân nhóm, tự động nhắc việc, check trùng lead. Giúp sale phản hồi nhanh hơn và tăng hiệu suất.
              </p>
              <button 
                onClick={handleRegisterClick}
                className="bg-[#0d6efd] px-[24px] py-[10px] text-white text-base lg:text-[18px] font-medium rounded hover:bg-[#0b5ed7] transition-colors w-fit"
              >
                Dùng thử miễn phí
              </button>
            </div>
            <img 
              alt="Customer Management Feature" 
              className="w-full lg:w-[660px] h-auto lg:h-[440px] object-cover rounded-[10px] border border-[#7c3aed] shadow-[0px_10px_25px_-10px_rgba(124,58,237,0.15)]" 
              src={imgRectangle8} 
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-8 md:py-12 lg:py-[60px] max-w-7xl mx-auto px-4 md:px-8 lg:px-12 overflow-hidden">
        <div className="text-center mb-8 md:mb-10 lg:mb-[40px] mx-auto max-w-4xl px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-[48px] font-bold text-[#212529] mb-3 lg:mb-[12px]">
            Bảng giá phù hợp cho mọi quy mô
          </h2>
          <p className="text-base md:text-lg lg:text-xl xl:text-[22px] leading-relaxed lg:leading-[32px] text-[#212529]">
            Chọn gói phù hợp với nhu cầu của bạn
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-[30px] max-w-6xl mx-auto">
          {/* Basic Plan */}
          <div className="bg-white rounded-[10px] border border-[#e5e5e5] p-[30px] flex flex-col hover:shadow-lg transition-shadow">
            <h3 className="text-[28px] font-bold text-[#212529] mb-[12px]">Miễn phí</h3>
            <div className="mb-[20px]">
              <span className="text-[48px] font-bold text-[#7c3aed]">0đ</span>
              <span className="text-[18px] text-[#757575]">/tháng</span>
            </div>
            <ul className="flex-1 space-y-[12px] mb-[30px]">
              <li className="flex items-start gap-[8px] text-[16px] text-[#212529]">
                <span className="text-[#22c55e] mt-[4px]">✓</span>
                <span>Tối đa 1.000 leads/tháng</span>
              </li>
              <li className="flex items-start gap-[8px] text-[16px] text-[#212529]">
                <span className="text-[#22c55e] mt-[4px]">✓</span>
                <span>Kết nối 2 kênh quảng cáo</span>
              </li>
              <li className="flex items-start gap-[8px] text-[16px] text-[#212529]">
                <span className="text-[#22c55e] mt-[4px]">✓</span>
                <span>Báo cáo cơ bản</span>
              </li>
            </ul>
            <button 
              onClick={handleRegisterClick}
              className="bg-[#f3f0ff] text-[#7c3aed] px-[24px] py-[12px] rounded-lg font-semibold hover:bg-[#ede9fe] transition-colors"
            >
              Bắt đầu miễn phí
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-[#7c3aed] rounded-[10px] p-[30px] flex flex-col relative shadow-xl scale-105">
            <div className="absolute -top-[12px] left-1/2 -translate-x-1/2 bg-[#0d6efd] text-white px-[16px] py-[4px] rounded-full text-[14px] font-semibold">
              Phổ biến nhất
            </div>
            <h3 className="text-[28px] font-bold text-white mb-[12px]">Chuyên nghiệp</h3>
            <div className="mb-[20px]">
              <span className="text-[48px] font-bold text-white">499k</span>
              <span className="text-[18px] text-white/80">/tháng</span>
            </div>
            <ul className="flex-1 space-y-[12px] mb-[30px]">
              <li className="flex items-start gap-[8px] text-[16px] text-white">
                <span className="text-[#22c55e] mt-[4px]">✓</span>
                <span>Không giới hạn leads</span>
              </li>
              <li className="flex items-start gap-[8px] text-[16px] text-white">
                <span className="text-[#22c55e] mt-[4px]">✓</span>
                <span>Kết nối không giới hạn kênh</span>
              </li>
              <li className="flex items-start gap-[8px] text-[16px] text-white">
                <span className="text-[#22c55e] mt-[4px]">✓</span>
                <span>Báo cáo nâng cao + AI</span>
              </li>
              <li className="flex items-start gap-[8px] text-[16px] text-white">
                <span className="text-[#22c55e] mt-[4px]">✓</span>
                <span>Hỗ trợ ưu tiên 24/7</span>
              </li>
            </ul>
            <button 
              onClick={handleRegisterClick}
              className="bg-white text-[#7c3aed] px-[24px] py-[12px] rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Chọn gói này
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white rounded-[10px] border border-[#e5e5e5] p-[30px] flex flex-col hover:shadow-lg transition-shadow">
            <h3 className="text-[28px] font-bold text-[#212529] mb-[12px]">Doanh nghiệp</h3>
            <div className="mb-[20px]">
              <span className="text-[48px] font-bold text-[#7c3aed]">Liên hệ</span>
            </div>
            <ul className="flex-1 space-y-[12px] mb-[30px]">
              <li className="flex items-start gap-[8px] text-[16px] text-[#212529]">
                <span className="text-[#22c55e] mt-[4px]">✓</span>
                <span>Tất cả tính năng Pro</span>
              </li>
              <li className="flex items-start gap-[8px] text-[16px] text-[#212529]">
                <span className="text-[#22c55e] mt-[4px]">✓</span>
                <span>Tùy chỉnh theo yêu cầu</span>
              </li>
              <li className="flex items-start gap-[8px] text-[16px] text-[#212529]">
                <span className="text-[#22c55e] mt-[4px]">✓</span>
                <span>Đào tạo & tư vấn</span>
              </li>
              <li className="flex items-start gap-[8px] text-[16px] text-[#212529]">
                <span className="text-[#22c55e] mt-[4px]">✓</span>
                <span>API & Webhook riêng</span>
              </li>
            </ul>
            <button 
              onClick={handleRegisterClick}
              className="bg-[#f3f0ff] text-[#7c3aed] px-[24px] py-[12px] rounded-lg font-semibold hover:bg-[#ede9fe] transition-colors"
            >
              Liên hệ tư vấn
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-8 md:py-12 lg:py-[60px] bg-white max-w-7xl mx-auto px-4 md:px-8 lg:px-12 overflow-hidden">
        <div className="text-center mb-8 md:mb-10 lg:mb-[40px] mx-auto max-w-4xl px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-[48px] font-bold text-[#212529] mb-3 lg:mb-[12px]">
            Những câu hỏi thường gặp
          </h2>
          <p className="text-base md:text-lg lg:text-xl xl:text-[22px] leading-relaxed lg:leading-[32px] text-[#212529]">
            Tổng hợp thắc mắc thường gặp, giúp bạn hiểu rõ hơn về dịch vụ của chúng tôi
          </p>
        </div>
        <div className="max-w-4xl mx-auto space-y-[16px]">
          {/* FAQ Item 1 */}
          <details className="group bg-white border border-[#e5e5e5] rounded-[8px] p-[20px] hover:border-[#7c3aed] transition-colors">
            <summary className="flex justify-between items-center cursor-pointer text-[18px] font-semibold text-[#212529] list-none">
              <span>Convertify CRM có miễn phí không?</span>
              <span className="text-[#7c3aed] text-[24px] group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-[12px] text-[16px] leading-[25px] text-[#757575]">
              Có, chúng tôi cung cấp gói miễn phí với đầy đủ tính năng cơ bản. Bạn có thể nâng cấp lên gói Pro khi cần thêm tính năng nâng cao.
            </p>
          </details>

          {/* FAQ Item 2 */}
          <details className="group bg-white border border-[#e5e5e5] rounded-[8px] p-[20px] hover:border-[#7c3aed] transition-colors">
            <summary className="flex justify-between items-center cursor-pointer text-[18px] font-semibold text-[#212529] list-none">
              <span>Convertify hỗ trợ những kênh quảng cáo nào?</span>
              <span className="text-[#7c3aed] text-[24px] group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-[12px] text-[16px] leading-[25px] text-[#757575]">
              Chúng tôi hỗ trợ tích hợp với Facebook Ads, Google Ads, TikTok Ads, Zalo Ads và nhiều kênh khác.
            </p>
          </details>

          {/* FAQ Item 3 */}
          <details className="group bg-white border border-[#e5e5e5] rounded-[8px] p-[20px] hover:border-[#7c3aed] transition-colors">
            <summary className="flex justify-between items-center cursor-pointer text-[18px] font-semibold text-[#212529] list-none">
              <span>Dữ liệu của tôi có được bảo mật không?</span>
              <span className="text-[#7c3aed] text-[24px] group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-[12px] text-[16px] leading-[25px] text-[#757575]">
              Chúng tôi cam kết bảo mật tuyệt đối dữ liệu khách hàng với mã hóa SSL 256-bit và tuân thủ các tiêu chuẩn bảo mật quốc tế.
            </p>
          </details>

          {/* FAQ Item 4 */}
          <details className="group bg-white border border-[#e5e5e5] rounded-[8px] p-[20px] hover:border-[#7c3aed] transition-colors">
            <summary className="flex justify-between items-center cursor-pointer text-[18px] font-semibold text-[#212529] list-none">
              <span>Tôi có thể hủy gói dịch vụ bất cứ lúc nào không?</span>
              <span className="text-[#7c3aed] text-[24px] group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-[12px] text-[16px] leading-[25px] text-[#757575]">
              Có, bạn có thể hủy gói dịch vụ bất cứ lúc nào mà không mất phí. Dữ liệu của bạn sẽ được giữ trong 30 ngày sau khi hủy.
            </p>
          </details>

          {/* FAQ Item 5 */}
          <details className="group bg-white border border-[#e5e5e5] rounded-[8px] p-[20px] hover:border-[#7c3aed] transition-colors">
            <summary className="flex justify-between items-center cursor-pointer text-[18px] font-semibold text-[#212529] list-none">
              <span>Có được hỗ trợ kỹ thuật không?</span>
              <span className="text-[#7c3aed] text-[24px] group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-[12px] text-[16px] leading-[25px] text-[#757575]">
              Chúng tôi cung cấp hỗ trợ qua email cho tất cả người dùng. Gói Pro và Enterprise có hỗ trợ ưu tiên 24/7 qua chat và điện thoại.
            </p>
          </details>
        </div>
      </section>

      {/* CTA Section */}
      <section id="advantages" className="py-8 md:py-12 lg:py-[60px] bg-[#fcf9fe] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-[48px] font-bold text-[#212529] mb-4 lg:mb-[20px]">
            Bắt đầu miễn phí ngay hôm nay
          </h2>
          <p className="text-base md:text-lg lg:text-xl xl:text-[22px] leading-relaxed lg:leading-[32px] text-[#212529] mb-6 lg:mb-[40px]">
            Không cần thẻ tín dụng. Không giới hạn tính năng.
          </p>
          <button 
            onClick={handleRegisterClick}
            className="bg-[#0d6efd] px-6 md:px-8 lg:px-[40px] py-3 lg:py-[14px] text-white text-base md:text-lg lg:text-[20px] font-semibold rounded-lg hover:bg-[#0b5ed7] transition-colors shadow-lg"
          >
            Đăng ký ngay - Miễn phí
          </button>
        </div>
      </section>
    </div>
  );
}