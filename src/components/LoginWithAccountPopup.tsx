import { useState } from 'react';
import svgPaths from "../imports/svg-nclpatq09r";
import imgConvertifyBanner11 from "figma:asset/7876d1a880bbee52f598d578d0f16d16bbf0f7f9.png";
import imgConvertifyLogoFullLight021 from "figma:asset/9d0dcbad493973ebbf13ac24d21c1b3a8826b4b8.png";
import { Input } from './ui/input';
import { toast } from 'sonner@2.0.3';
import { API_BASE_URL } from '../lib/config';

interface LoginWithAccountPopupProps {
  onClose: () => void;
  onBack: () => void;
  onLoginSuccess?: (username: string, email?: string) => void;
  email?: string; // Email từ màn hình trước
}

export function LoginWithAccountPopup({ onClose, onBack, onLoginSuccess, email: initialEmail }: LoginWithAccountPopupProps) {
  const [email, setEmail] = useState(initialEmail || '');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !username.trim() || !password.trim()) {
      toast.error('Vui lòng điền đầy đủ thông tin!', {
        description: 'Email, tài khoản và mật khẩu không được để trống',
        duration: 3000,
      });
      return;
    }

    try {
      setIsLoading(true);
      console.log('🔵 [Finalize Login] Bắt đầu đăng ký/đăng nhập...');
      console.log('🔵 [Finalize Login] Data:', { email, login_username: username, password: '***' });
      console.log('🔵 [Finalize Login] API URL:', `${API_BASE_URL}/convertify-auth/finalize/`);

      const response = await fetch(`${API_BASE_URL}/convertify-auth/finalize/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          login_username: username,
          password,
        }),
      });

      console.log('🔵 [Finalize Login] Response status:', response.status);
      const data = await response.json();
      console.log('✅ [Finalize Login] Response data:', data);

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(data.error || 'Mật khẩu không đúng');
        } else if (response.status === 400) {
          throw new Error(data.error || 'Username đã tồn tại hoặc dữ liệu không hợp lệ');
        }
        throw new Error(data.detail || data.error || 'Đăng nhập thất bại');
      }

      // Log chi tiết kết quả
      console.log('✅✅✅ [DATABASE] Dữ liệu đã được lưu vào database!');
      console.log('📊 [DATABASE] Record ID:', data.data?.id);
      console.log('📊 [DATABASE] Email:', data.data?.email);
      console.log('📊 [DATABASE] Username:', data.data?.login_username);
      console.log('📊 [DATABASE] Full Name:', data.data?.full_name);
      console.log('📊 [DATABASE] Created At:', data.data?.created_at);
      console.log('📊 [DATABASE] Updated At:', data.data?.updated_at);
      console.log('📊 [DATABASE] Message:', data.message);

      toast.success(data.message || 'Thành công!', {
        description: `${data.data?.email} - ID: ${data.data?.id}`,
        duration: 3000,
      });

      setTimeout(() => {
        onLoginSuccess?.(
          data.data?.login_username || username,
          data.data?.email || email
        );
        onClose();
      }, 500);
    } catch (error: any) {
      console.error('❌ [Finalize Login] Error:', error);
      toast.error('Đăng nhập/Đăng ký thất bại!', {
        description: error.message || 'Vui lòng thử lại',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
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
      <div className="relative bg-white w-full max-w-[1000px] h-[600px] rounded-[10px] shadow-[0px_10px_25px_-10px_rgba(124,58,237,0.15)] p-[30px] flex gap-[30px] z-10">
        {/* Logo */}
        <div className="absolute left-[30px] top-[30px] h-[30px] w-[139px] rounded-[5px] overflow-hidden">
          <img 
            alt="Convertify Logo" 
            className="w-full h-full object-contain" 
            src={imgConvertifyLogoFullLight021} 
          />
        </div>

        {/* Left Side - Login Form */}
        <div className="flex-1 flex flex-col items-center justify-center pt-[45px] pb-0 px-[45px]">
          <div className="w-full flex flex-col gap-[15px]">
            {/* Header */}
            <div className="flex flex-col gap-[5px] items-center text-center mb-[10px]">
              <h2 className="text-[26px] font-bold text-[#212529]">
                Đăng nhập vào Convertify
              </h2>
              <p className="text-[16px] leading-[25px] text-[#757575]">
                Miễn phí, dễ dùng và hiệu quả
              </p>
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-[5px]">
              <label className="text-[16px] leading-[25px] text-[#212529]">
                Email <span className="text-[#7c3aed]">*</span>
              </label>
              <div className="bg-white h-[50px] rounded-[5px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.1),0px_1px_4px_0px_rgba(12,12,13,0.05)]">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email"
                  disabled={isLoading}
                  className="w-full h-full px-[14px] py-[12px] border-0 text-[16px] focus:outline-none focus:ring-2 focus:ring-[#7c3aed] rounded-[5px] disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Username Input */}
            <div className="flex flex-col gap-[5px]">
              <label className="text-[16px] leading-[25px] text-[#212529]">
                Tài khoản <span className="text-[#7c3aed]">*</span>
              </label>
              <div className="bg-white h-[50px] rounded-[5px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.1),0px_1px_4px_0px_rgba(12,12,13,0.05)]">
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nhập tài khoản hoặc email"
                  disabled={isLoading}
                  className="w-full h-full px-[14px] py-[12px] border-0 text-[16px] focus:outline-none focus:ring-2 focus:ring-[#7c3aed] rounded-[5px] disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-[5px]">
              <label className="text-[16px] leading-[25px] text-[#212529]">
                Mật khẩu <span className="text-[#7c3aed]">*</span>
              </label>
              <div className="bg-white h-[50px] rounded-[5px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.1),0px_1px_4px_0px_rgba(12,12,13,0.05)]">
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  disabled={isLoading}
                  className="w-full h-full px-[14px] py-[12px] border-0 text-[16px] focus:outline-none focus:ring-2 focus:ring-[#7c3aed] rounded-[5px] disabled:opacity-50 disabled:cursor-not-allowed"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
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
              className="w-full bg-[#7c3aed] rounded-[3px] border border-[#0d6efd] px-[24px] py-[10px] hover:bg-[#6d28d9] transition-colors mt-[10px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-[18px] font-medium text-white">
                {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập miễn phí'}
              </span>
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
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors z-10"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}