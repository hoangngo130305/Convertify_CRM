import { API_BASE_URL } from '../lib/config';

// URL Backend Django của bạn
// const API_BASE_URL = "https://convertifycrm.com/api";; // Đã chuyển sang config.ts

// ============================================================
// TOKEN MANAGEMENT
// ============================================================

export const getToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

export const setToken = (access: string, refresh: string): void => {
  localStorage.setItem('accessToken', access);
  localStorage.setItem('refreshToken', refresh);
};

export const clearToken = (): void => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

// ============================================================
// AUTHENTICATION API
// ============================================================

interface SocialLoginPayload {
  provider: string;   // 'google' | 'facebook'
  social_id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
}

/**
 * Gọi API Social Login của Django
 */
export const socialLogin = async (payload: SocialLoginPayload) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/social_login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(JSON.stringify(data) || "Login failed");
    }

    // Lưu Token
    if (data.access && data.refresh) {
      setToken(data.access, data.refresh);
    }

    return data;
  } catch (error: any) {
    console.error("Social API Error:", error);
    throw error;
  }
};

/**
 * Gọi API Login thường (Username/Password)
 */
export const loginAccount = async (username: string, password: string) => {
  try {
    // Endpoint này trỏ vào view TokenObtainPairView hoặc Custom Login View của bạn
    // Nếu dùng Custom Login View trả về user info: /users/login/
    // Nếu dùng SimpleJWT chuẩn: /token/
    const response = await fetch(`${API_BASE_URL}/users/login/`, { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Tài khoản hoặc mật khẩu không đúng");
    }

    if (data.access && data.refresh) {
      setToken(data.access, data.refresh);
    }

    return data;
  } catch (error: any) {
    console.error("Login API Error:", error);
    throw error;
  }
};

/**
 * Helper: Lấy thông tin User từ Google (Client-side)
 */
export const fetchGoogleUserInfo = async (googleAccessToken: string) => {
  const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${googleAccessToken}` }
  });
  if (!response.ok) throw new Error("Failed to fetch Google User Info");
  return await response.json();
};

// ============================================================
// REGISTRATION API
// ============================================================

interface RegistrationPayload {
  name: string;
  email: string;
  note?: string;
}

interface RegistrationResponse {
  id: number;
  name: string;
  email: string;
  note: string | null;
  created_at: string;
}

/**
 * Gọi API Đăng ký bản chính thức
 * POST /api/registrations/
 */
export const createRegistration = async (payload: RegistrationPayload): Promise<RegistrationResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/registrations/`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      // Xử lý lỗi validation từ Django
      if (data.email) {
        throw new Error(data.email[0] || "Email không hợp lệ");
      }
      if (data.name) {
        throw new Error(data.name[0] || "Tên không hợp lệ");
      }
      throw new Error(data.detail || "Đăng ký thất bại");
    }

    return data;
  } catch (error: any) {
    console.error("Registration API Error:", error);
    throw error;
  }
};

// ============================================================
// QUICK REGISTER API (Email Only)
// ============================================================

interface QuickRegisterPayload {
  email: string;
}

interface QuickRegisterResponse {
  message: string;
  created: boolean;
  data: {
    id: number;
    email: string;
    login_username: string | null;
    full_name: string | null;
    created_at: string;
    updated_at: string;
  };
}

/**
 * Gọi API Đăng ký nhanh chỉ với email
 * POST /api/auth-convertify/quick-register/
 */
export const quickRegister = async (payload: QuickRegisterPayload): Promise<QuickRegisterResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth-convertify/quick-register/`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      // Xử lý lỗi validation từ Django
      if (data.email) {
        throw new Error(data.email[0] || "Email không hợp lệ");
      }
      throw new Error(data.detail || "Đăng ký thất bại");
    }

    return data;
  } catch (error: any) {
    console.error("Quick Register API Error:", error);
    throw error;
  }
};