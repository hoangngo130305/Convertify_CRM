import { useState } from 'react';
import svgPaths from "../imports/svg-j0vojkrwh3";
import imgConvertifyBanner11 from "figma:asset/7876d1a880bbee52f598d578d0f16d16bbf0f7f9.png";
import imgConvertifyLogoFullLight022 from "figma:asset/9d0dcbad493973ebbf13ac24d21c1b3a8826b4b8.png";
import { Input } from './ui/input';
import { toast } from 'sonner@2.0.3';

interface LoginPopupProps {
  onClose: () => void;
  onSwitchToAccountLogin: () => void;
}

export function LoginPopup({ onClose, onSwitchToAccountLogin }: LoginPopupProps) {
  const [email, setEmail] = useState('');

  const handleGoogleLogin = () => {
    toast.info('Đăng nhập với Google', {
      description: 'Tính năng đang được phát triển',
      duration: 3000,
    });
  };

  const handleFacebookLogin = () => {
    toast.info('Đăng nhập với Facebook', {
      description: 'Tính năng đang được phát triển',
      duration: 3000,
    });
  };

  const handleEmailLogin = () => {
    if (!email.trim()) {
      toast.error('Vui lòng nhập email!', {
        description: 'Email không được để trống',
        duration: 3000,
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Email không hợp lệ!', {
        description: 'Vui lòng nhập địa chỉ email đúng định dạng.',
        duration: 3000,
      });
      return;
    }

    // Chuyển sang giao diện đăng nhập với tài khoản
    onSwitchToAccountLogin();
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4" style={{ 
      backgroundImage: "linear-gradient(90deg, rgba(124, 58, 237, 0.05) 0%, rgba(252, 249, 254, 0.05) 30%, rgba(252, 249, 254, 0.05) 70%, rgba(92, 29, 163, 0.05) 100%), linear-gradient(90deg, rgb(252, 249, 254) 0%, rgb(252, 249, 254) 100%)" 
    }}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-white w-full max-w-[950px] h-[600px] rounded-[10px] shadow-[0px_10px_25px_-10px_rgba(124,58,237,0.15)] p-[30px] flex gap-[30px] z-10">
        {/* Logo */}
        <div className="absolute left-[30px] top-[30px] h-[30px] w-[139px] rounded-[5px] overflow-hidden">
          <img 
            alt="Convertify Logo" 
            className="w-full h-full object-contain" 
            src={imgConvertifyLogoFullLight022} 
          />
        </div>

        {/* Left Side - Login Form */}
        <div className="flex-1 flex flex-col items-center justify-center pt-[45px] pb-0 px-[45px]">
          <div className="w-full flex flex-col gap-[15px]">
            {/* Header */}
            <div className="flex flex-col gap-[5px] items-center text-center mb-[12px]">
              <h2 className="text-[23px] font-bold text-[#212529]">
                Đăng nhập vào Convertify
              </h2>
              <p className="text-[12px] text-[#757575]">
                Miễn phí, dễ dùng và hiệu quả
              </p>
            </div>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-[#0d6efd] rounded-[3px] border border-[#0d6efd] px-[32px] py-[10px] flex items-center gap-[12px] hover:bg-[#0b5ed7] transition-colors"
            >
              <div className="w-[24px] h-[24px]">
                <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" fill="white" r="12" />
                  <g>
                    <path clipRule="evenodd" d={svgPaths.p2ad90f00} fill="#F44336" fillRule="evenodd" opacity="0.987" />
                    <path clipRule="evenodd" d={svgPaths.p3fa56470} fill="#FFC107" fillRule="evenodd" opacity="0.997" />
                    <path clipRule="evenodd" d={svgPaths.p28315d80} fill="#448AFF" fillRule="evenodd" opacity="0.999" />
                    <path clipRule="evenodd" d={svgPaths.p129ea880} fill="#43A047" fillRule="evenodd" opacity="0.993" />
                  </g>
                </svg>
              </div>
              <span className="text-[18px] font-medium text-white">
                Đăng nhập với Google
              </span>
            </button>

            {/* Facebook Login Button */}
            <button
              onClick={handleFacebookLogin}
              className="w-full bg-[#0d6efd] rounded-[3px] border border-[#0d6efd] px-[32px] py-[10px] flex items-center gap-[12px] hover:bg-[#0b5ed7] transition-colors"
            >
              <div className="w-[24px] h-[24px]">
                <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
                  <path d={svgPaths.pec16600} fill="white" />
                </svg>
              </div>
              <span className="text-[18px] font-medium text-white">
                Đăng nhập với Facebook
              </span>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-[10px] justify-center w-full">
              <div className="flex-1 h-[1px] bg-black"></div>
              <p className="text-[16px] text-[#757575] text-center whitespace-nowrap">
                Hoặc đăng nhập bằng email
              </p>
              <div className="flex-1 h-[1px] bg-black"></div>
            </div>

            {/* Email Input */}
            <div className="bg-white h-[50px] rounded-[5px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.1),0px_1px_4px_0px_rgba(12,12,13,0.05)]">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email của bạn"
                className="w-full h-full px-[14px] py-[12px] border-0 text-[16px] text-[#757575] focus:outline-none focus:ring-2 focus:ring-[#0d6efd] rounded-[5px]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleEmailLogin();
                  }
                }}
              />
            </div>

            {/* Login Button */}
            <button
              onClick={handleEmailLogin}
              className="w-full bg-[#0d6efd] rounded-[3px] border border-[#0d6efd] px-[24px] py-[10px] hover:bg-[#0b5ed7] transition-colors"
            >
              <span className="text-[18px] font-medium text-white">
                Đăng nhập miễn phí
              </span>
            </button>
          </div>

          {/* Footer */}
          <div className="absolute bottom-[14px] left-0 right-0 flex justify-between px-[45px]">
            <p className="text-[12px] text-[#757575]">Privacy Policy</p>
            <p className="text-[12px] text-[#757575]">Copyright 2025</p>
          </div>
        </div>

        {/* Right Side - Banner */}
        <div className="w-[453px] bg-[#7c3aed] rounded-[5px] flex flex-col gap-[15px] items-center justify-center pt-[30px] pb-[15px] px-[30px]">
          {/* Banner Image */}
          <div className="flex-1 w-full">
            <img 
              alt="Convertify Dashboard" 
              className="w-full h-full object-contain" 
              src={imgConvertifyBanner11} 
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-[3px] text-center text-white py-[10px]">
            <h3 className="text-[23px] font-bold leading-[32px]">
              Gia tăng hiệu quả quảng cáo lead
            </h3>
            <p className="text-[14px] leading-[22px]">
              Đồng bộ lead từ Facebook, Google, TikTok, Zalo về một nơi. Tối ưu quảng cáo giúp nhắm đúng khách hàng, tăng chuyển đổi, tiết kiệm chi phí quảng cáo.
            </p>
          </div>

          {/* Platform Icons */}
          <div className="flex flex-col gap-[5px] items-center w-full">
            <p className="text-[14px] leading-[22px] text-center text-white">
              Nền tảng kết nối
            </p>
            <div className="flex items-center justify-between w-full">
              {/* Zalo Icon */}
              <div className="w-[35.502px] h-[12.057px]">
                <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35.502 12.0573">
                  <path d={svgPaths.p240d1980} fill="white" />
                  <path d={svgPaths.p3df41d80} fill="white" />
                  <path d={svgPaths.p3e4cc300} fill="white" />
                  <path d={svgPaths.p267a9400} fill="white" />
                  <path d={svgPaths.p3861eb00} fill="white" />
                </svg>
              </div>

              {/* TikTok Icon */}
              <div className="w-[54.258px] h-[16px]">
                <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 54.258 16">
                  <g>
                    <path d={svgPaths.p222db300} fill="white" />
                    <path d={svgPaths.p33a3e700} fill="white" />
                    <path d={svgPaths.p5323100} fill="white" />
                    <path d={svgPaths.pe9d880} fill="white" />
                    <path d={svgPaths.p1d0dac00} fill="white" />
                    <path d={svgPaths.p87f7800} fill="white" />
                    <path d={svgPaths.p3a4a6c80} fill="white" />
                    <path d={svgPaths.p69a9bc0} fill="white" />
                    <path d={svgPaths.p16275e80} fill="white" />
                    <path d={svgPaths.p18f0f600} fill="white" />
                    <path d={svgPaths.p29376e00} fill="white" />
                    <path d={svgPaths.p32851300} fill="white" />
                  </g>
                </svg>
              </div>

              {/* YouTube Icon */}
              <div className="w-[67.478px] h-[12.057px]">
                <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 67.4783 12.0573">
                  <path d={svgPaths.p2eff1100} fill="white" />
                </svg>
              </div>

              {/* Facebook Icon */}
              <div className="w-[54.01px] h-[12.057px]">
                <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 54.0104 12.0573">
                  <path clipRule="evenodd" d={svgPaths.p3c3e7980} fill="white" fillRule="evenodd" />
                  <path clipRule="evenodd" d={svgPaths.p1a58c500} fill="white" fillRule="evenodd" />
                  <path clipRule="evenodd" d={svgPaths.p275c3b00} fill="white" fillRule="evenodd" />
                </svg>
              </div>

              {/* WooCommerce Icon */}
              <div className="w-[107.302px] h-[10.048px]">
                <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 107.302 10.048">
                  <path d={svgPaths.p3b927700} fill="white" />
                  <path d={svgPaths.p3ae85080} fill="white" />
                  <path d={svgPaths.pc656600} fill="white" />
                  <path d={svgPaths.p25b98f00} fill="white" />
                  <path d={svgPaths.p1cae4100} fill="white" />
                  <path d={svgPaths.p27a638a0} fill="white" />
                  <path d={svgPaths.p398b7e80} fill="white" />
                  <path d={svgPaths.p1bfa1600} fill="white" />
                  <path d={svgPaths.p2df33680} fill="white" />
                  <path d={svgPaths.p1feeff00} fill="white" />
                  <path d={svgPaths.p2606ab80} fill="white" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
