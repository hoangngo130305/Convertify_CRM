import { useState } from 'react';
import { X, Loader } from 'lucide-react';
import svgPaths from "../imports/svg-vu28l9ngvt";
import imgConvertifyBanner11 from "figma:asset/7876d1a880bbee52f598d578d0f16d16bbf0f7f9.png";
import imgConvertifyLogoFullLight021 from "figma:asset/d2afe422db17950f27d4ea454ca993e47c0efea1.png";
import { toast } from 'sonner@2.0.3';
import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { socialLogin, fetchGoogleUserInfo, quickRegister } from '../lib/api';

const FACEBOOK_APP_ID = "770120739476984";

interface MobileLoginPopupProps {
  onClose: () => void;
  onLoginSuccess?: (username: string, email?: string, loginMethod?: string) => void;
}

export function MobileLoginPopup({ onClose, onLoginSuccess }: MobileLoginPopupProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // --- HÀM XỬ LÝ CHUNG: GỌI BACKEND ---
  const handleBackendHandshake = async (
    provider: string,
    social_id: string,
    email: string,
    full_name: string,
    avatar_url: string
  ) => {
    try {
      await socialLogin({
        provider: provider.toLowerCase(),
        social_id,
        email,
        full_name,
        avatar_url,
      });

      toast.success(`Đăng nhập ${provider} thành công!`, {
        description: 'Chào mừng bạn đến với Convertify CRM',
        duration: 2000,
      });
      
      setTimeout(() => {
        onLoginSuccess?.(full_name, email, provider);
      }, 500);
    } catch (error: any) {
      toast.error(`Lỗi đăng nhập ${provider}`, {
        description: error.message || 'Không thể kết nối Server',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // --- GOOGLE LOGIN ---
  const loginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        const userInfo = await fetchGoogleUserInfo(tokenResponse.access_token);
        await handleBackendHandshake(
          'Google',
          userInfo.sub,
          userInfo.email,
          userInfo.name,
          userInfo.picture
        );
      } catch (error) {
        toast.error('Lỗi lấy thông tin Google', {
          description: 'Không thể kết nối đến Google',
          duration: 3000,
        });
        setIsLoading(false);
      }
    },
    onError: () => {
      toast.error('Đăng nhập Google thất bại', {
        description: 'Vui lòng thử lại sau',
        duration: 3000,
      });
      setIsLoading(false);
    },
  });

  // --- FACEBOOK LOGIN HANDLERS ---
  const handleFacebookSuccess = (response: any) => {
    setIsLoading(true);
    handleBackendHandshake(
      'Facebook',
      response.id || '',
      response.email || '',
      response.name || '',
      response.picture?.data?.url || ''
    );
  };

  const handleFacebookFail = () => {
    toast.error('Đăng nhập Facebook thất bại', {
      description: 'Vui lòng thử lại sau',
      duration: 3000,
    });
    setIsLoading(false);
  };

  // --- EMAIL LOGIN ---
  const handleEmailLogin = async () => {
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

    // Gọi API quick-register
    setIsLoading(true);

    try {
      const response = await quickRegister({ email });
      
      toast.success(response.message, {
        description: 'Chào mừng bạn đến với Convertify CRM',
        duration: 2000,
      });

      // Chuyển vào CRM sau khi đăng ký thành công
      setTimeout(() => {
        onLoginSuccess?.(
          response.data.email.split("@")[0], 
          response.data.email, 
          "Email"
        );
      }, 500);
    } catch (error: any) {
      toast.error("Lỗi đăng ký", {
        description: error.message || "Không thể kết nối Server",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] bg-white overflow-auto">
      <div className="bg-white content-stretch flex flex-col gap-[15px] items-center justify-center p-[15px] relative min-h-screen">
        {/* Logo - Top Left */}
        <div className="absolute h-[30px] left-[15px] rounded-[5px] top-[15px] w-[138.75px]">
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[5px]">
            <img 
              alt="" 
              className="absolute h-[403.78%] left-[-17.42%] max-w-none top-[-147.09%] w-[130.96%]" 
              src={imgConvertifyLogoFullLight021} 
            />
          </div>
        </div>

        {/* Close Button - Top Right */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute right-[15px] top-[15px] p-2 hover:bg-gray-100 rounded-full transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <X className="w-6 h-6 text-[#212529]" />
        </button>

        {/* Main Content */}
        <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full">
          <div className="flex flex-col items-center justify-center size-full">
            <div className="content-stretch flex flex-col gap-[10px] items-center justify-center pb-[45px] pt-[60px] px-[30px] relative size-full">
              
              {/* Header */}
              <div className="content-stretch flex flex-col gap-[5px] items-center pb-[12px] pt-0 px-0 relative shrink-0 text-center w-full">
                <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[32px] relative shrink-0 text-[#212529] text-[23px] text-nowrap">
                  Đăng nhập vào Convertify
                </p>
                <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[normal] min-w-full relative shrink-0 text-[#757575] text-[12px] w-[min-content]">
                  Miễn phí, dễ dùng và hiệu quả
                </p>
              </div>

              {/* Google Login Button */}
              <button
                onClick={() => loginGoogle()}
                disabled={isLoading}
                className="bg-[#0d6efd] relative rounded-[3px] shrink-0 w-full hover:opacity-90 transition-opacity active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div aria-hidden="true" className="absolute border border-[#0d6efd] border-solid inset-0 pointer-events-none rounded-[3px]" />
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex gap-[12px] items-center px-[32px] py-[10px] relative w-full">
                    {isLoading ? (
                      <Loader className="animate-spin size-[24px] text-white mx-auto" />
                    ) : (
                      <>
                        <div className="relative shrink-0 size-[24px]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                            <g clipPath="url(#clip0_227_1825)">
                              <circle cx="12" cy="12" fill="white" r="12" />
                              <g>
                                <path clipRule="evenodd" d={svgPaths.p2ad90f00} fill="#F44336" fillRule="evenodd" opacity="0.987" />
                                <path clipRule="evenodd" d={svgPaths.p3fa56470} fill="#FFC107" fillRule="evenodd" opacity="0.997" />
                                <path clipRule="evenodd" d={svgPaths.p28315d80} fill="#448AFF" fillRule="evenodd" opacity="0.999" />
                                <path clipRule="evenodd" d={svgPaths.p129ea880} fill="#43A047" fillRule="evenodd" opacity="0.993" />
                              </g>
                            </g>
                            <defs>
                              <clipPath id="clip0_227_1825">
                                <rect fill="white" height="24" width="24" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                        <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[18px] text-nowrap text-white">
                          Đăng nhập với Google
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </button>

              {/* Facebook Login Button */}
              <FacebookLogin
                appId={FACEBOOK_APP_ID}
                fields="name,email,picture"
                onProfileSuccess={handleFacebookSuccess}
                onFail={handleFacebookFail}
                render={({ onClick }) => (
                  <button
                    onClick={onClick}
                    disabled={isLoading}
                    className="bg-[#0d6efd] relative rounded-[3px] shrink-0 w-full hover:opacity-90 transition-opacity active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div aria-hidden="true" className="absolute border border-[#0d6efd] border-solid inset-0 pointer-events-none rounded-[3px]" />
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex gap-[12px] items-center px-[32px] py-[10px] relative w-full">
                        {isLoading ? (
                          <Loader className="animate-spin size-[24px] text-white mx-auto" />
                        ) : (
                          <>
                            <div className="relative shrink-0 size-[24px]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                                <g clipPath="url(#clip0_227_1875)">
                                  <path d={svgPaths.pec16600} fill="white" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_227_1875">
                                    <rect fill="white" height="24" width="24" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[18px] text-nowrap text-white">
                              Đăng nhập với Facebook
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </button>
                )}
              />

              {/* Divider */}
              <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0 w-full">
                <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0">
                  <div className="absolute inset-[-1px_0_0_0]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41.5 1">
                      <line stroke="#212529" x2="41.5" y1="0.5" y2="0.5" />
                    </svg>
                  </div>
                </div>
                <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#757575] text-[16px] text-center text-nowrap">
                  Hoặc đăng nhập bằng email
                </p>
                <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0">
                  <div className="absolute inset-[-1px_0_0_0]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41.5 1">
                      <line stroke="#212529" x2="41.5" y1="0.5" y2="0.5" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Email Input */}
              <div className="bg-white h-[50px] relative rounded-[5px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.1),0px_1px_4px_0px_rgba(12,12,13,0.05)] shrink-0 w-full">
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex items-center px-[14px] py-[12px] relative size-full">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email của bạn"
                      disabled={isLoading}
                      className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] w-full text-[#757575] text-[16px] outline-none bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !isLoading) {
                          handleEmailLogin();
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Login Button */}
              <button
                onClick={handleEmailLogin}
                disabled={isLoading}
                className="bg-[#0d6efd] relative rounded-[3px] shrink-0 w-full hover:opacity-90 transition-opacity active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div aria-hidden="true" className="absolute border border-[#0d6efd] border-solid inset-0 pointer-events-none rounded-[3px]" />
                <div className="flex flex-row items-center justify-center size-full">
                  <div className="content-stretch flex gap-[8px] items-center justify-center pb-[12px] pt-[10px] px-[24px] relative w-full">
                    {isLoading && (
                      <Loader className="animate-spin size-[18px] text-white" />
                    )}
                    <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[18px] text-nowrap text-white">
                      {isLoading ? 'Đang xử lý...' : 'Đăng nhập miễn phí'}
                    </p>
                  </div>
                </div>
              </button>

              {/* Footer Links */}
              <p className="absolute bottom-[13.56px] font-['Rubik:Regular',sans-serif] font-normal leading-[normal] left-0 text-[#757575] text-[12px] text-nowrap translate-y-[100%]">
                Privacy Policy
              </p>
              <p className="absolute bottom-[13.56px] font-['Rubik:Regular',sans-serif] font-normal leading-[normal] right-0 text-[#757575] text-[12px] text-nowrap text-right translate-y-[100%]">
                Copyright 2025
              </p>
            </div>
          </div>
        </div>

        {/* Purple Banner Section */}
        <div className="bg-[#7c3aed] relative rounded-[5px] shrink-0 w-full">
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex gap-[5px] items-center justify-center p-[15px] relative w-full">
              
              {/* Banner Image */}
              <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
                <div className="basis-0 grow h-full min-h-px min-w-px relative">
                  <img 
                    alt="" 
                    className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" 
                    src={imgConvertifyBanner11} 
                  />
                </div>
              </div>

              {/* Text Content */}
              <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0">
                <div className="content-stretch flex flex-col gap-[3px] items-start px-0 py-[10px] relative shrink-0 text-center text-white w-full">
                  <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[18px] w-full">
                    Gia tăng hiệu quả quảng cáo lead
                  </p>
                  <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[10px] w-full">
                    Đồng bộ lead từ Facebook, Google, TikTok, Zalo về một nơi. Tối ưu quảng cáo giúp nhắm đúng khách hàng, tăng chuyển đổi, tiết kiệm chi phí quảng cáo.
                  </p>
                </div>

                {/* Platform Icons */}
                <div className="content-stretch flex flex-col gap-[5px] items-center relative shrink-0 w-full">
                  <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[12px] text-center text-white w-full">
                    Nền tảng kết nối
                  </p>
                  <div className="content-center flex flex-wrap gap-[5px_15px] items-center justify-center leading-[0] relative shrink-0 w-full">
                    {/* Zalo Icon */}
                    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                      <div className="[grid-area:1_/_1] h-[9.646px] ml-0 mt-0 relative w-[28.402px]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.4016 9.64582">
                          <g>
                            <path d={svgPaths.p2663cdf0} fill="white" />
                            <path d={svgPaths.pded3880} fill="white" />
                            <path d={svgPaths.p2fabe400} fill="white" />
                            <path d={svgPaths.p21c126f0} fill="white" />
                            <path d={svgPaths.p16f5cb80} fill="white" />
                          </g>
                        </svg>
                      </div>
                    </div>

                    {/* TikTok Icon */}
                    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                      <div className="[grid-area:1_/_1] aspect-[319.35/94.15] ml-0 mt-0 overflow-clip relative w-[43.406px]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 43.4 12.8">
                          <path d={svgPaths.p1a7d4800} fill="white" />
                          <path d={svgPaths.pcd00e80} fill="white" />
                          <path d={svgPaths.pb70200} fill="white" />
                        </svg>
                      </div>
                    </div>

                    {/* Facebook Icon */}
                    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                      <div className="[grid-area:1_/_1] h-[9.646px] ml-0 mt-0 relative w-[53.983px]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 53.9826 9.6458">
                          <g clipPath="url(#clip0_240_2157)">
                            <path d={svgPaths.p4d8c00} fill="white" />
                          </g>
                          <defs>
                            <clipPath id="clip0_240_2157">
                              <rect fill="white" height="9.6458" width="53.9826" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>

                    {/* YouTube Icon */}
                    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                      <div className="[grid-area:1_/_1] h-[9.646px] ml-0 mt-0 relative w-[43.208px]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 43.2083 9.6458">
                          <g clipPath="url(#clip0_240_2166)">
                            <path clipRule="evenodd" d={svgPaths.p1fad4400} fill="white" fillRule="evenodd" />
                            <g>
                              <path clipRule="evenodd" d={svgPaths.p15029100} fill="white" fillRule="evenodd" />
                              <path clipRule="evenodd" d={svgPaths.p3e26a540} fill="white" fillRule="evenodd" />
                            </g>
                          </g>
                          <defs>
                            <clipPath id="clip0_240_2166">
                              <rect fill="white" height="9.6458" width="43.2083" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>

                    {/* WooCommerce Icon */}
                    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                      <div className="[grid-area:1_/_1] h-[8.038px] ml-0 mt-0 overflow-clip relative w-[85.842px]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 85.842 8.038">
                          <path d={svgPaths.p3959d400} fill="white" />
                          <path d={svgPaths.p16c61c00} fill="white" />
                          <path d={svgPaths.p16f40800} fill="white" />
                          <path d={svgPaths.p10c946f0} fill="white" />
                          <path d={svgPaths.p624b900} fill="white" />
                          <path d={svgPaths.p43ddb80} fill="white" />
                          <path d={svgPaths.p1b9863c0} fill="white" />
                          <path d={svgPaths.p35f83600} fill="white" />
                          <path d={svgPaths.p12b1c840} fill="white" />
                          <path d={svgPaths.p158fca80} fill="white" />
                          <path d={svgPaths.p2950c100} fill="white" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
