import { useState } from "react";
import svgPaths from "../imports/svg-fa4f2p84k7";
import imgConvertifyBanner11 from "figma:asset/7876d1a880bbee52f598d578d0f16d16bbf0f7f9.png";
import imgConvertifyLogoFullLight022 from "figma:asset/9d0dcbad493973ebbf13ac24d21c1b3a8826b4b8.png";
import { Input } from "./ui/input";
import { toast } from "sonner@2.0.3";
import { Loader } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { socialLogin, fetchGoogleUserInfo, quickRegister } from "../lib/api";

const FACEBOOK_APP_ID = "770120739476984";

interface LoginPopupCompleteProps {
  onClose: () => void;
  onSwitchToAccountLogin: (email?: string) => void;
  onLoginSuccess?: (
    username: string,
    email?: string,
    loginMethod?: string,
  ) => void;
}

export function LoginPopupComplete({
  onClose,
  onSwitchToAccountLogin,
  onLoginSuccess,
}: LoginPopupCompleteProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // --- HÀM XỬ LÝ CHUNG: GỌI BACKEND ---
  const handleBackendHandshake = async (
    provider: string,
    social_id: string,
    email: string,
    full_name: string,
    avatar_url: string,
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
        description: "Chào mừng bạn đến với Convertify CRM",
        duration: 2000,
      });

      // Simulate successful login
      setTimeout(() => {
        onLoginSuccess?.(full_name, email, provider);
      }, 500);
    } catch (error: any) {
      toast.error(`Lỗi đăng nhập ${provider}`, {
        description:
          error.message || "Không thể kết nối Server",
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
        const userInfo = await fetchGoogleUserInfo(
          tokenResponse.access_token,
        );
        await handleBackendHandshake(
          "Google",
          userInfo.sub,
          userInfo.email,
          userInfo.name,
          userInfo.picture,
        );
      } catch (error) {
        toast.error("Lỗi lấy thông tin Google", {
          description: "Không thể kết nối đến Google",
          duration: 3000,
        });
        setIsLoading(false);
      }
    },
    onError: () => {
      toast.error("Đăng nhập Google thất bại", {
        description: "Vui lòng thử lại sau",
        duration: 3000,
      });
      setIsLoading(false);
    },
  });

  // --- FACEBOOK LOGIN HANDLERS ---
  const handleFacebookSuccess = (response: any) => {
    setIsLoading(true);
    handleBackendHandshake(
      "Facebook",
      response.id || "",
      response.email || "",
      response.name || "",
      response.picture?.data?.url || "",
    );
  };

  const handleFacebookFail = () => {
    toast.error("Đăng nhập Facebook thất bại", {
      description: "Vui lòng thử lại sau",
      duration: 3000,
    });
    setIsLoading(false);
  };

  // --- EMAIL LOGIN ---
  const handleEmailLogin = async () => {
    if (!email.trim()) {
      toast.error("Vui lòng nhập email!", {
        description: "Email không được để trống",
        duration: 3000,
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Email không hợp lệ!", {
        description:
          "Vui lòng nhập địa chỉ email đúng định dạng.",
        duration: 3000,
      });
      return;
    }

    // Gọi API quick-register
    setIsLoading(true);

    try {
      const response = await quickRegister({ email });
      
      toast.success(response.message, {
        description: "Chào mừng bạn đến với Convertify CRM",
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
    <div
      className="relative size-full"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(124, 58, 237, 0.05) 0%, rgba(252, 249, 254, 0.05) 30%, rgba(252, 249, 254, 0.05) 70%, rgba(92, 29, 163, 0.05) 100%), linear-gradient(90deg, rgb(252, 249, 254) 0%, rgb(252, 249, 254) 100%)",
      }}
    >
      <div className="absolute bg-white content-stretch flex gap-[30px] h-[600px] items-center justify-center left-1/2 p-[30px] rounded-[10px] shadow-[0px_10px_25px_-10px_rgba(124,58,237,0.15)] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[950px]">
        {/* Left Side - Login Form */}
        <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
          <div className="flex flex-col items-center justify-center size-full">
            <div className="content-stretch flex flex-col gap-[15px] items-center justify-center p-[45px] relative size-full">
              {/* Header */}
              <div className="content-stretch flex flex-col gap-[5px] items-center pb-[12px] pt-0 px-0 relative shrink-0 text-center w-full">
                <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[32px] relative shrink-0 text-[#212529] text-[23px] text-nowrap">
                  Đăng nhập vào Convertify
                </p>
                <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[normal] min-w-full relative shrink-0 text-[#757575] text-[12px] w-[min-content]">
                  Miễn phí, dễ dùng và hiệu quả
                </p>
              </div>

              {/* Google Button */}
              <button
                onClick={() => loginGoogle()}
                disabled={isLoading}
                className="bg-[#0d6efd] relative rounded-[3px] shrink-0 w-full hover:bg-[#0b5ed7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div
                  aria-hidden="true"
                  className="absolute border border-[#0d6efd] border-solid inset-0 pointer-events-none rounded-[3px]"
                />
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex gap-[12px] items-center justify-center px-[32px] py-[10px] relative w-full">
                    {isLoading ? (
                      <Loader className="animate-spin size-[24px] text-white" />
                    ) : (
                      <div className="relative shrink-0 size-[24px]">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 24 24"
                        >
                          <g
                            clipPath="url(#clip0_227_1825)"
                            id="Icon"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              fill="var(--fill-0, white)"
                              id="Ellipse 3"
                              r="12"
                            />
                            <g id="Group">
                              <path
                                clipRule="evenodd"
                                d={svgPaths.p2ad90f00}
                                fill="var(--fill-0, #F44336)"
                                fillRule="evenodd"
                                id="Vector"
                                opacity="0.987"
                              />
                              <path
                                clipRule="evenodd"
                                d={svgPaths.p3fa56470}
                                fill="var(--fill-0, #FFC107)"
                                fillRule="evenodd"
                                id="Vector_2"
                                opacity="0.997"
                              />
                              <path
                                clipRule="evenodd"
                                d={svgPaths.p28315d80}
                                fill="var(--fill-0, #448AFF)"
                                fillRule="evenodd"
                                id="Vector_3"
                                opacity="0.999"
                              />
                              <path
                                clipRule="evenodd"
                                d={svgPaths.p129ea880}
                                fill="var(--fill-0, #43A047)"
                                fillRule="evenodd"
                                id="Vector_4"
                                opacity="0.993"
                              />
                            </g>
                          </g>
                          <defs>
                            <clipPath id="clip0_227_1825">
                              <rect
                                fill="white"
                                height="24"
                                width="24"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    )}
                    <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[18px] text-nowrap text-white">
                      {isLoading
                        ? "Đang xử lý..."
                        : "Đăng nhập với Google"}
                    </p>
                  </div>
                </div>
              </button>

              {/* Facebook Button */}
              <FacebookLogin
                appId={FACEBOOK_APP_ID}
                fields="name,email,picture"
                onProfileSuccess={handleFacebookSuccess}
                onFail={handleFacebookFail}
                render={({ onClick }) => (
                  <button
                    onClick={onClick}
                    disabled={isLoading}
                    className="bg-[#0d6efd] relative rounded-[3px] shrink-0 w-full hover:bg-[#0b5ed7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div
                      aria-hidden="true"
                      className="absolute border border-[#0d6efd] border-solid inset-0 pointer-events-none rounded-[3px]"
                    />
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex gap-[12px] items-center justify-center px-[32px] py-[10px] relative w-full">
                        {isLoading ? (
                          <Loader className="animate-spin size-[24px] text-white" />
                        ) : (
                          <div className="relative shrink-0 size-[24px]">
                            <svg
                              className="block size-full"
                              fill="none"
                              preserveAspectRatio="none"
                              viewBox="0 0 24 24"
                            >
                              <g
                                clipPath="url(#clip0_227_1875)"
                                id="Icon"
                              >
                                <path
                                  d={svgPaths.pec16600}
                                  fill="var(--fill-0, white)"
                                  id="Vector"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_227_1875">
                                  <rect
                                    fill="white"
                                    height="24"
                                    width="24"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                        )}
                        <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[18px] text-nowrap text-white">
                          {isLoading
                            ? "Đang xử lý..."
                            : "Đăng nhập với Facebook"}
                        </p>
                      </div>
                    </div>
                  </button>
                )}
              />

              {/* Divider */}
              <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0 w-full">
                <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0">
                  <div className="absolute inset-[-1px_0_0_0]">
                    <svg
                      className="block size-full"
                      fill="none"
                      preserveAspectRatio="none"
                      viewBox="0 0 45 1"
                    >
                      <line
                        id="Line 3"
                        stroke="var(--stroke-0, black)"
                        x2="45"
                        y1="0.5"
                        y2="0.5"
                      />
                    </svg>
                  </div>
                </div>
                <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#757575] text-[16px] text-center text-nowrap">
                  Hoặc đăng nhập bằng email
                </p>
                <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0">
                  <div className="absolute inset-[-1px_0_0_0]">
                    <svg
                      className="block size-full"
                      fill="none"
                      preserveAspectRatio="none"
                      viewBox="0 0 45 1"
                    >
                      <line
                        id="Line 3"
                        stroke="var(--stroke-0, black)"
                        x2="45"
                        y1="0.5"
                        y2="0.5"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Email Input */}
              <div className="bg-white h-[50px] relative rounded-[5px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.1),0px_1px_4px_0px_rgba(12,12,13,0.05)] shrink-0 w-full">
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex items-center px-[14px] py-[12px] relative size-full">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email của bạn"
                      disabled={isLoading}
                      className="border-0 p-0 font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] text-[#757575] text-[16px] focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 h-auto shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
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
                className="bg-[#0d6efd] relative rounded-[3px] shrink-0 w-full hover:bg-[#0b5ed7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div
                  aria-hidden="true"
                  className="absolute border border-[#0d6efd] border-solid inset-0 pointer-events-none rounded-[3px]"
                />
                <div className="flex flex-row items-center justify-center size-full">
                  <div className="content-stretch flex gap-[8px] items-center justify-center pb-[12px] pt-[10px] px-[24px] relative w-full">
                    {isLoading && (
                      <Loader className="animate-spin size-[18px] text-white" />
                    )}
                    <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[18px] text-nowrap text-white">
                      {isLoading
                        ? "Đang xử lý..."
                        : "Đăng nhập miễn phí"}
                    </p>
                  </div>
                </div>
              </button>

              {/* Footer */}
              <p className="absolute bottom-[14px] font-['Rubik:Regular',sans-serif] font-normal leading-[normal] left-0 text-[#757575] text-[12px] text-nowrap translate-y-[100%]">
                Privacy Policy
              </p>
              <p className="absolute bottom-[14px] font-['Rubik:Regular',sans-serif] font-normal leading-[normal] right-0 text-[#757575] text-[12px] text-nowrap text-right translate-y-[100%]">
                Copyright 2025
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Banner */}
        <div className="bg-[#7c3aed] content-stretch flex flex-col gap-[15px] h-full items-center justify-center pb-[15px] pt-[30px] px-[30px] relative rounded-[5px] shrink-0 w-[453px]">
          <div
            className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full"
            data-name="Convertify_banner_1 1"
          >
            <img
              alt=""
              className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full"
              src={imgConvertifyBanner11}
            />
          </div>

          <div className="content-stretch flex flex-col gap-[3px] items-start px-0 py-[10px] relative shrink-0 text-center text-white w-full">
            <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[32px] relative shrink-0 text-[23px] w-full">
              Gia tăng hiệu quả quảng cáo lead
            </p>
            <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[14px] w-full">
              Đồng bộ lead từ Facebook, Google, TikTok, Zalo về
              một nơi. Tối ưu quảng cáo giúp nhắm đúng khách
              hàng, tăng chuyển đổi, tiết kiệm chi phí quảng
              cáo.
            </p>
          </div>

          <div className="content-stretch flex flex-col gap-[5px] items-center relative shrink-0 w-full">
            <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[14px] text-center text-white w-full">
              Nền tảng kết nối
            </p>
            <div className="content-stretch flex items-center justify-between leading-[0] relative shrink-0 w-full">
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                <div className="[grid-area:1_/_1] h-[12.057px] ml-0 mt-0 relative w-[35.502px]">
                  <svg
                    className="block size-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 35.502 12.0573"
                  >
                    <g id="Frame 95">
                      <path
                        d={svgPaths.p240d1980}
                        fill="var(--fill-0, white)"
                        id="Vector"
                      />
                      <path
                        d={svgPaths.p3df41d80}
                        fill="var(--fill-0, white)"
                        id="Vector_2"
                      />
                      <path
                        d={svgPaths.p3e4cc300}
                        fill="var(--fill-0, white)"
                        id="Vector_3"
                      />
                      <path
                        d={svgPaths.p267a9400}
                        fill="var(--fill-0, white)"
                        id="Vector_4"
                      />
                      <path
                        d={svgPaths.p3861eb00}
                        fill="var(--fill-0, white)"
                        id="Vector_5"
                      />
                    </g>
                  </svg>
                </div>
              </div>

              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                <div
                  className="aspect-[319.35/94.15] relative w-[54.258px]"
                  data-name="OBJECTS"
                >
                  <div
                    className="absolute inset-[0_74.08%_-0.51%_0]"
                    data-name="Group"
                  >
                    <div
                      className="absolute inset-[4.77%_74.08%_-0.51%_1.4%]"
                      data-name="Vector"
                    >
                      <div
                        className="absolute inset-0"
                        style={
                          {
                            "--fill-0":
                              "rgba(255, 255, 255, 1)",
                          } as React.CSSProperties
                        }
                      >
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 13.3015 15.3148"
                        >
                          <path
                            d={svgPaths.p222db300}
                            fill="var(--fill-0, white)"
                            id="Vector"
                          />
                        </svg>
                      </div>
                    </div>
                    <div
                      className="absolute inset-[0_75.48%_4.27%_0]"
                      data-name="Vector"
                    >
                      <div
                        className="absolute inset-0"
                        style={
                          {
                            "--fill-0":
                              "rgba(255, 255, 255, 1)",
                          } as React.CSSProperties
                        }
                      >
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 13.3015 15.3131"
                        >
                          <path
                            d={svgPaths.p33a3e700}
                            fill="var(--fill-0, white)"
                            id="Vector"
                          />
                        </svg>
                      </div>
                    </div>
                    <div
                      className="absolute inset-[4.77%_75.48%_4.28%_1.4%]"
                      data-name="Vector"
                    >
                      <div
                        className="absolute inset-0"
                        style={
                          {
                            "--fill-0":
                              "rgba(255, 255, 255, 1)",
                          } as React.CSSProperties
                        }
                      >
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 12.542 14.5481"
                        >
                          <path
                            d={svgPaths.p5323100}
                            fill="var(--fill-0, white)"
                            id="Vector"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div
                    className="absolute inset-[29.46%_0_17.11%_31.38%]"
                    data-name="Group"
                  >
                    <div
                      className="absolute inset-[29.46%_52.81%_57.66%_43.41%]"
                      data-name="Vector"
                    >
                      <div
                        className="absolute inset-0"
                        style={
                          {
                            "--fill-0":
                              "rgba(255, 255, 255, 1)",
                          } as React.CSSProperties
                        }
                      >
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 2.049 2.05927"
                        >
                          <path
                            d={svgPaths.p32851300}
                            fill="var(--fill-0, white)"
                            id="Vector"
                          />
                        </svg>
                      </div>
                    </div>
                    <div
                      className="absolute inset-[30.28%_0_17.11%_31.38%]"
                      data-name="Group"
                    >
                      <div
                        className="absolute inset-[30.28%_57.22%_18.02%_31.38%]"
                        data-name="Vector"
                      >
                        <div
                          className="absolute inset-0"
                          style={
                            {
                              "--fill-0":
                                "rgba(255, 255, 255, 1)",
                            } as React.CSSProperties
                          }
                        >
                          <svg
                            className="block size-full"
                            fill="none"
                            preserveAspectRatio="none"
                            viewBox="0 0 6.18607 8.26954"
                          >
                            <path
                              d={svgPaths.pe9d880}
                              fill="var(--fill-0, white)"
                              id="Vector"
                            />
                          </svg>
                        </div>
                      </div>
                      <div
                        className="absolute inset-[30.28%_26.95%_18.02%_61.65%]"
                        data-name="Vector"
                      >
                        <div
                          className="absolute inset-0"
                          style={
                            {
                              "--fill-0":
                                "rgba(255, 255, 255, 1)",
                            } as React.CSSProperties
                          }
                        >
                          <svg
                            className="block size-full"
                            fill="none"
                            preserveAspectRatio="none"
                            viewBox="0 0 6.18607 8.26954"
                          >
                            <path
                              d={svgPaths.p1d0dac00}
                              fill="var(--fill-0, white)"
                              id="Vector"
                            />
                          </svg>
                        </div>
                      </div>
                      <div
                        className="absolute inset-[47.15%_52.83%_18.03%_43.43%]"
                        data-name="Vector"
                      >
                        <div
                          className="absolute inset-0"
                          style={
                            {
                              "--fill-0":
                                "rgba(255, 255, 255, 1)",
                            } as React.CSSProperties
                          }
                        >
                          <svg
                            className="block size-full"
                            fill="none"
                            preserveAspectRatio="none"
                            viewBox="0 0 2.02861 5.56994"
                          >
                            <path
                              d={svgPaths.p87f7800}
                              fill="var(--fill-0, white)"
                              id="Vector"
                            />
                          </svg>
                        </div>
                      </div>
                      <div
                        className="absolute inset-[30.28%_39.03%_18.02%_48.71%]"
                        data-name="Vector"
                      >
                        <div
                          className="absolute inset-0"
                          style={
                            {
                              "--fill-0":
                                "rgba(255, 255, 255, 1)",
                            } as React.CSSProperties
                          }
                        >
                          <svg
                            className="block size-full"
                            fill="none"
                            preserveAspectRatio="none"
                            viewBox="0 0 6.6516 8.26954"
                          >
                            <path
                              d={svgPaths.p3a4a6c80}
                              fill="var(--fill-0, white)"
                              id="Vector"
                            />
                          </svg>
                        </div>
                      </div>
                      <div
                        className="absolute inset-[30.28%_0_18.02%_87.74%]"
                        data-name="Vector"
                      >
                        <div
                          className="absolute inset-0"
                          style={
                            {
                              "--fill-0":
                                "rgba(255, 255, 255, 1)",
                            } as React.CSSProperties
                          }
                        >
                          <svg
                            className="block size-full"
                            fill="none"
                            preserveAspectRatio="none"
                            viewBox="0 0 6.65329 8.26954"
                          >
                            <path
                              d={svgPaths.p69a9bc0}
                              fill="var(--fill-0, white)"
                              id="Vector"
                            />
                          </svg>
                        </div>
                      </div>
                      <div
                        className="absolute inset-[39.35%_14.42%_17.12%_72.81%]"
                        data-name="Vector"
                      >
                        <div
                          className="absolute inset-0"
                          style={
                            {
                              "--fill-0":
                                "rgba(255, 255, 255, 1)",
                            } as React.CSSProperties
                          }
                        >
                          <svg
                            className="block size-full"
                            fill="none"
                            preserveAspectRatio="none"
                            viewBox="0 0 6.92853 6.96328"
                          >
                            <path
                              d={svgPaths.p16275e80}
                              fill="var(--fill-0, white)"
                              id="Vector"
                            />
                          </svg>
                        </div>
                      </div>
                      <div
                        className="absolute inset-[39.36%_21.43%_17.11%_71.56%]"
                        data-name="Vector"
                      >
                        <div
                          className="absolute inset-0"
                          style={
                            {
                              "--fill-0":
                                "rgba(255, 255, 255, 1)",
                            } as React.CSSProperties
                          }
                        >
                          <svg
                            className="block size-full"
                            fill="none"
                            preserveAspectRatio="none"
                            viewBox="0 0 3.80407 6.96328"
                          >
                            <path
                              d={svgPaths.p18f0f600}
                              fill="var(--fill-0, white)"
                              id="Vector"
                            />
                          </svg>
                        </div>
                      </div>
                      <div
                        className="absolute inset-[39.35%_13.41%_17.12%_79.71%]"
                        data-name="Vector"
                      >
                        <div
                          className="absolute inset-0"
                          style={
                            {
                              "--fill-0":
                                "rgba(255, 255, 255, 1)",
                            } as React.CSSProperties
                          }
                        >
                          <svg
                            className="block size-full"
                            fill="none"
                            preserveAspectRatio="none"
                            viewBox="0 0 3.73781 6.96328"
                          >
                            <path
                              d={svgPaths.p29376e00}
                              fill="var(--fill-0, white)"
                              id="Vector"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                <div
                  className="[grid-area:1_/_1] h-[12.057px] ml-0 mt-0 relative w-[67.478px]"
                  data-name="Layer_1"
                >
                  <svg
                    className="block size-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 67.4783 12.0573"
                  >
                    <g
                      clipPath="url(#clip0_227_1868)"
                      id="Layer_1"
                    >
                      <path
                        d={svgPaths.p2eff1100}
                        fill="var(--fill-0, white)"
                        id="Vector"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_227_1868">
                        <rect
                          fill="white"
                          height="12.0573"
                          width="67.4783"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>

              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                <div
                  className="[grid-area:1_/_1] h-[12.057px] ml-0 mt-0 relative w-[54.01px]"
                  data-name="Layer_1"
                >
                  <svg
                    className="block size-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 54.0104 12.0573"
                  >
                    <g
                      clipPath="url(#clip0_227_1856)"
                      id="Layer_1"
                    >
                      <path
                        clipRule="evenodd"
                        d={svgPaths.p3c3e7980}
                        fill="var(--fill-0, white)"
                        fillRule="evenodd"
                        id="Vector"
                      />
                      <g id="Group">
                        <path
                          clipRule="evenodd"
                          d={svgPaths.p1a58c500}
                          fill="var(--fill-0, white)"
                          fillRule="evenodd"
                          id="Vector_2"
                        />
                        <path
                          clipRule="evenodd"
                          d={svgPaths.p275c3b00}
                          fill="var(--fill-0, white)"
                          fillRule="evenodd"
                          id="Vector_3"
                        />
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_227_1856">
                        <rect
                          fill="white"
                          height="12.0573"
                          width="54.0104"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>

              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                <div
                  className="[grid-area:1_/_1] h-[10.048px] ml-0 mt-0 overflow-clip relative w-[107.302px]"
                  data-name="Layer_1"
                >
                  <div
                    className="absolute inset-[0_64%_0.21%_0]"
                    data-name="Group"
                  >
                    <svg
                      className="block size-full"
                      fill="none"
                      preserveAspectRatio="none"
                      viewBox="0 0 38.6322 10.0266"
                    >
                      <g id="Group">
                        <path
                          d={svgPaths.p3b927700}
                          fill="var(--fill-0, white)"
                          id="Vector"
                        />
                        <path
                          d={svgPaths.p3ae85080}
                          fill="var(--fill-0, white)"
                          id="wc-logo-def-o"
                        />
                        <path
                          d={svgPaths.pc656600}
                          fill="var(--fill-0, white)"
                          id="wc-logo-def-o_2"
                        />
                      </g>
                    </svg>
                  </div>
                  <div
                    className="absolute inset-[0.63%_0_0_37.4%]"
                    data-name="Group"
                  >
                    <svg
                      className="block size-full"
                      fill="none"
                      preserveAspectRatio="none"
                      viewBox="0 0 67.1744 9.98452"
                    >
                      <g id="Group">
                        <path
                          d={svgPaths.p25b98f00}
                          fill="var(--fill-0, white)"
                          id="Vector"
                        />
                        <path
                          d={svgPaths.p1cae4100}
                          fill="var(--fill-0, white)"
                          id="Vector_2"
                        />
                        <path
                          d={svgPaths.p27a638a0}
                          fill="var(--fill-0, white)"
                          id="wc-logo-def-m"
                        />
                        <path
                          d={svgPaths.p398b7e80}
                          fill="var(--fill-0, white)"
                          id="wc-logo-def-m_2"
                        />
                        <path
                          d={svgPaths.p1bfa1600}
                          fill="var(--fill-0, white)"
                          id="wc-logo-def-e"
                        />
                        <path
                          d={svgPaths.p2df33680}
                          fill="var(--fill-0, white)"
                          id="Vector_3"
                        />
                        <path
                          d={svgPaths.p1feeff00}
                          fill="var(--fill-0, white)"
                          id="Vector_4"
                        />
                        <path
                          d={svgPaths.p2606ab80}
                          fill="var(--fill-0, white)"
                          id="wc-logo-def-e_2"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logo */}
        <div
          className="absolute h-[30px] left-[30px] rounded-[5px] top-[30px] w-[139px]"
          data-name="Convertify_logo-full-light-02 2"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[5px]">
            <img
              alt=""
              className="absolute h-[403.78%] left-[-17.42%] max-w-none top-[-147.09%] w-[130.96%]"
              src={imgConvertifyLogoFullLight022}
            />
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}