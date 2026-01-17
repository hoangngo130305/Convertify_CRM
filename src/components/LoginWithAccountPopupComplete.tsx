import { useState } from "react";
import svgPaths from "../imports/svg-3c6z0yghse";
import imgConvertifyBanner11 from "figma:asset/7876d1a880bbee52f598d578d0f16d16bbf0f7f9.png";
import imgConvertifyLogoFullLight021 from "figma:asset/9d0dcbad493973ebbf13ac24d21c1b3a8826b4b8.png";
import { Input } from "./ui/input";
import { toast } from "sonner@2.0.3";
import { API_BASE_URL } from "../lib/config";

interface LoginWithAccountPopupCompleteProps {
  onClose: () => void;
  onBack: () => void;
  onLoginSuccess?: (
    username: string,
    email?: string,
    loginMethod?: string
  ) => void;
  email?: string; // Email từ màn hình trước
}

export function LoginWithAccountPopupComplete({
  onClose,
  onBack,
  onLoginSuccess,
  email: initialEmail,
}: LoginWithAccountPopupCompleteProps) {
  const [email, setEmail] = useState(initialEmail || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log("🟢 [Component Mounted] Initial Email:", initialEmail);

  const handleLogin = async () => {
    console.log("🔴 [handleLogin CALLED] Button clicked!");
    console.log("🔴 [handleLogin] Email:", email);
    console.log("🔴 [handleLogin] Username:", username);
    console.log("🔴 [handleLogin] Password:", password ? "***" : "empty");

    if (!email.trim() || !username.trim() || !password.trim()) {
      toast.error("Vui lòng điền đầy đủ thông tin!", {
        description: "Email, tài khoản và mật khẩu không được để trống",
        duration: 3000,
      });
      return;
    }

    try {
      setIsLoading(true);
      console.log("🔵 [Finalize Login] Bắt đầu đăng ký/đăng nhập...");
      console.log("🔵 [Finalize Login] Data:", {
        email,
        login_username: username,
        password: "***",
      });
      console.log(
        "🔵 [Finalize Login] API URL:",
        `${API_BASE_URL}/auth-convertify/finalize/`
      );

      const response = await fetch(
        `${API_BASE_URL}/auth-convertify/finalize/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            login_username: username,
            password,
          }),
        }
      );

      console.log("🔵 [Finalize Login] Response status:", response.status);
      const data = await response.json();
      console.log("✅ [Finalize Login] Response data:", data);

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(data.error || "Mật khẩu không đúng");
        } else if (response.status === 400) {
          throw new Error(
            data.error || "Username đã tồn tại hoặc dữ liệu không hợp lệ"
          );
        }
        throw new Error(data.detail || data.error || "Đăng nhập thất bại");
      }

      // Log chi tiết kết quả
      console.log("✅✅✅ [DATABASE] Dữ liệu đã được lưu vào database!");
      console.log("📊 [DATABASE] Record ID:", data.data?.id);
      console.log("📊 [DATABASE] Email:", data.data?.email);
      console.log("📊 [DATABASE] Username:", data.data?.login_username);
      console.log("📊 [DATABASE] Full Name:", data.data?.full_name);
      console.log("📊 [DATABASE] Created At:", data.data?.created_at);
      console.log("📊 [DATABASE] Updated At:", data.data?.updated_at);
      console.log("📊 [DATABASE] Message:", data.message);

      toast.success(data.message || "Thành công!", {
        description: `${data.data?.email} - ID: ${data.data?.id}`,
        duration: 3000,
      });

      setTimeout(() => {
        console.log(
          "🟢 [Calling onLoginSuccess] Username:",
          data.data?.login_username,
          "Email:",
          data.data?.email
        );
        onLoginSuccess?.(
          data.data?.login_username || username,
          data.data?.email || email,
          "Account"
        );
      }, 500);
    } catch (error: any) {
      console.error("❌ [Finalize Login] Error:", error);
      toast.error("Đăng nhập/Đăng ký thất bại!", {
        description: error.message || "Vui lòng thử lại",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative size-full">
      <div className="absolute bg-white content-stretch flex gap-[30px] h-[600px] items-center justify-center left-1/2 p-[30px] rounded-[10px] shadow-[0px_10px_25px_-10px_rgba(124,58,237,0.15)] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[1000px]">
        {/* Left Side - Login Form */}
        <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
          <div className="flex flex-col items-center justify-center size-full">
            <div className="content-stretch flex flex-col gap-[15px] items-center justify-center pb-0 pt-[45px] px-[45px] relative size-full">
              {/* Header */}
              <div className="content-stretch flex flex-col gap-[5px] items-center relative shrink-0 text-center w-full">
                <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#212529] text-[26px] text-nowrap">
                  Đăng nhập vào Convertify
                </p>
                <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] min-w-full relative shrink-0 text-[#757575] text-[16px] w-[min-content]">
                  Miễn phí, dễ dùng và hiệu quả
                </p>
              </div>

              {/* Email Field */}
              {/* <div className="content-stretch flex flex-col gap-[5px] items-start relative shrink-0 w-full">
                <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#212529] text-[16px] text-center text-nowrap">
                  <span>Email </span>
                  <span className="text-[#7c3aed]">*</span>
                </p>
                <div className="bg-white h-[50px] rounded-[5px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.1),0px_1px_4px_0px_rgba(12,12,13,0.05)] shrink-0 w-full">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email"
                    disabled={isLoading}
                    className="w-full h-full px-[14px] py-[12px] border-0 text-[16px] focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-[5px] shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div> */}

              {/* Username Field */}
              <div className="content-stretch flex flex-col gap-[5px] items-start relative shrink-0 w-full">
                <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#212529] text-[16px] text-center text-nowrap">
                  <span>Tài khoản </span>
                  <span className="text-[#7c3aed]">*</span>
                </p>
                <div className="bg-white h-[50px] rounded-[5px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.1),0px_1px_4px_0px_rgba(12,12,13,0.05)] shrink-0 w-full">
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nhập tài khoản"
                    disabled={isLoading}
                    className="w-full h-full px-[14px] py-[12px] border-0 text-[16px] focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-[5px] shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="content-stretch flex flex-col gap-[5px] items-start relative shrink-0 w-full">
                <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#212529] text-[16px] text-center text-nowrap">
                  <span>Mật khẩu </span>
                  <span className="text-[#7c3aed]">*</span>
                </p>
                <div className="bg-white h-[50px] rounded-[5px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.1),0px_1px_4px_0px_rgba(12,12,13,0.05)] shrink-0 w-full">
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu"
                    disabled={isLoading}
                    className="w-full h-full px-[14px] py-[12px] border-0 text-[16px] focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-[5px] shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleLogin();
                      }
                    }}
                  />
                </div>
              </div>

              {/* Login Button */}
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="bg-[#7c3aed] relative rounded-[3px] shrink-0 w-full hover:bg-[#6d28d9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div
                  aria-hidden="true"
                  className="absolute border border-[#0d6efd] border-solid inset-0 pointer-events-none rounded-[3px]"
                />
                <div className="flex flex-row items-center justify-center size-full">
                  <div className="content-stretch flex items-center justify-center pb-[12px] pt-[10px] px-[24px] relative w-full">
                    <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[18px] text-nowrap text-white">
                      {isLoading ? "Đang xử lý..." : "Đăng nhập miễn phí"}
                    </p>
                  </div>
                </div>
              </button>

              {/* Back Button */}
              <button
                onClick={onBack}
                disabled={isLoading}
                className="text-[14px] text-[#7c3aed] hover:underline text-center mt-[5px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Quay lại đăng nhập bằng email
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Banner */}
        <div className="bg-[#7c3aed] basis-0 grow h-full min-h-px min-w-px relative rounded-[5px] shrink-0">
          <div className="flex flex-col items-center justify-center size-full">
            <div className="content-stretch flex flex-col gap-[15px] items-center justify-center pb-[15px] pt-[30px] px-[30px] relative size-full">
              {/* Banner Image */}
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

              {/* Description */}
              <div className="content-stretch flex flex-col gap-[3px] items-start px-0 py-[10px] relative shrink-0 text-center text-white w-full">
                <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[32px] relative shrink-0 text-[23px] w-full">
                  Gia tăng hiệu quả quảng cáo lead
                </p>
                <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[14px] w-full">
                  Đồng bộ lead từ Facebook, Google, TikTok, Zalo về một nơi. Tối
                  ưu quảng cáo giúp nhắm đúng khách hàng, tăng chuyển đổi, tiết
                  kiệm chi phí quảng cáo.
                </p>
              </div>

              {/* Platform Icons */}
              <div className="content-stretch flex flex-col gap-[5px] items-center relative shrink-0 w-full">
                <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[14px] text-center text-white w-full">
                  Nền tảng kết nối
                </p>
                <div className="content-stretch flex items-center justify-between leading-[0] relative shrink-0 w-full">
                  {/* Platform icons */}
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
                    <div className="[grid-area:1_/_1] h-[16px] ml-0 mt-0 relative w-[54.258px]">
                      <svg
                        className="block size-full"
                        fill="none"
                        preserveAspectRatio="none"
                        viewBox="0 0 54.258 16"
                      >
                        <g id="Group">
                          <path
                            d={svgPaths.p222db300}
                            fill="var(--fill-0, white)"
                            id="Vector"
                          />
                          <path
                            d={svgPaths.p33a3e700}
                            fill="var(--fill-0, white)"
                            id="Vector_2"
                          />
                          <path
                            d={svgPaths.p5323100}
                            fill="var(--fill-0, white)"
                            id="Vector_3"
                          />
                          <path
                            d={svgPaths.pe9d880}
                            fill="var(--fill-0, white)"
                            id="Vector_4"
                          />
                          <path
                            d={svgPaths.p1d0dac00}
                            fill="var(--fill-0, white)"
                            id="Vector_5"
                          />
                          <path
                            d={svgPaths.p87f7800}
                            fill="var(--fill-0, white)"
                            id="Vector_6"
                          />
                          <path
                            d={svgPaths.p3a4a6c80}
                            fill="var(--fill-0, white)"
                            id="Vector_7"
                          />
                          <path
                            d={svgPaths.p69a9bc0}
                            fill="var(--fill-0, white)"
                            id="Vector_8"
                          />
                          <path
                            d={svgPaths.p16275e80}
                            fill="var(--fill-0, white)"
                            id="Vector_9"
                          />
                          <path
                            d={svgPaths.p18f0f600}
                            fill="var(--fill-0, white)"
                            id="Vector_10"
                          />
                          <path
                            d={svgPaths.p29376e00}
                            fill="var(--fill-0, white)"
                            id="Vector_11"
                          />
                          <path
                            d={svgPaths.p32851300}
                            fill="var(--fill-0, white)"
                            id="Vector_12"
                          />
                        </g>
                      </svg>
                    </div>
                  </div>

                  <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                    <div className="[grid-area:1_/_1] h-[12.057px] ml-0 mt-0 relative w-[67.478px]">
                      <svg
                        className="block size-full"
                        fill="none"
                        preserveAspectRatio="none"
                        viewBox="0 0 67.4783 12.0573"
                      >
                        <path
                          d={svgPaths.p2eff1100}
                          fill="var(--fill-0, white)"
                          id="Group"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                    <div className="[grid-area:1_/_1] h-[12.057px] ml-0 mt-0 relative w-[54.01px]">
                      <svg
                        className="block size-full"
                        fill="none"
                        preserveAspectRatio="none"
                        viewBox="0 0 54.0104 12.0573"
                      >
                        <path
                          clipRule="evenodd"
                          d={svgPaths.p3c3e7980}
                          fill="var(--fill-0, white)"
                          fillRule="evenodd"
                          id="Vector"
                        />
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
                      </svg>
                    </div>
                  </div>

                  <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                    <div className="[grid-area:1_/_1] h-[10.048px] ml-0 mt-0 relative w-[107.302px]">
                      <svg
                        className="block size-full"
                        fill="none"
                        preserveAspectRatio="none"
                        viewBox="0 0 107.302 10.048"
                      >
                        <path
                          d={svgPaths.p3b927700}
                          fill="var(--fill-0, white)"
                          id="Vector"
                        />
                        <path
                          d={svgPaths.p3ae85080}
                          fill="var(--fill-0, white)"
                          id="Vector_2"
                        />
                        <path
                          d={svgPaths.pc656600}
                          fill="var(--fill-0, white)"
                          id="Vector_3"
                        />
                        <path
                          d={svgPaths.p25b98f00}
                          fill="var(--fill-0, white)"
                          id="Vector_4"
                        />
                        <path
                          d={svgPaths.p1cae4100}
                          fill="var(--fill-0, white)"
                          id="Vector_5"
                        />
                        <path
                          d={svgPaths.p27a638a0}
                          fill="var(--fill-0, white)"
                          id="Vector_6"
                        />
                        <path
                          d={svgPaths.p398b7e80}
                          fill="var(--fill-0, white)"
                          id="Vector_7"
                        />
                        <path
                          d={svgPaths.p1bfa1600}
                          fill="var(--fill-0, white)"
                          id="Vector_8"
                        />
                        <path
                          d={svgPaths.p2df33680}
                          fill="var(--fill-0, white)"
                          id="Vector_9"
                        />
                        <path
                          d={svgPaths.p1feeff00}
                          fill="var(--fill-0, white)"
                          id="Vector_10"
                        />
                        <path
                          d={svgPaths.p2606ab80}
                          fill="var(--fill-0, white)"
                          id="Vector_11"
                        />
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
  );
}
