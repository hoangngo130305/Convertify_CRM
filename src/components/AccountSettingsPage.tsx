import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { ArrowLeft, Camera, Key, Shield, Settings, Save, Eye, EyeOff, DollarSign } from 'lucide-react';

interface AccountSettingsPageProps {
  onClose: () => void;
}

export function AccountSettingsPage({ onClose }: AccountSettingsPageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Personal Information State
  const [personalInfo, setPersonalInfo] = useState({
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    fullName: 'Nguyễn Văn Admin',
    email: 'admin@company.com',
    phone: '+84 98 123 4567',
    role: 'admin',
    country: 'vietnam'
  });

  // Security State
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    is2FAEnabled: false
  });

  // Settings State
  const [settings, setSettings] = useState({
    timezone: 'Asia/Ho_Chi_Minh',
    language: 'vi',
    currency: 'VND'
  });

  // Show password states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Country options
  const countries = [
    { value: 'vietnam', label: 'Việt Nam' },
    { value: 'usa', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'singapore', label: 'Singapore' },
    { value: 'thailand', label: 'Thailand' },
    { value: 'malaysia', label: 'Malaysia' },
    { value: 'philippines', label: 'Philippines' },
    { value: 'indonesia', label: 'Indonesia' }
  ];

  // Timezone options
  const timezones = [
    { value: 'Asia/Ho_Chi_Minh', label: '(UTC+7) Hồ Chí Minh' },
    { value: 'Asia/Bangkok', label: '(UTC+7) Bangkok' },
    { value: 'Asia/Singapore', label: '(UTC+8) Singapore' },
    { value: 'Asia/Tokyo', label: '(UTC+9) Tokyo' },
    { value: 'America/New_York', label: '(UTC-5) New York' },
    { value: 'America/Los_Angeles', label: '(UTC-8) Los Angeles' },
    { value: 'Europe/London', label: '(UTC+0) London' },
    { value: 'Europe/Paris', label: '(UTC+1) Paris' }
  ];

  // Language options
  const languages = [
    { value: 'vi', label: 'Vietnamese' },
    { value: 'en', label: 'English' },
    { value: 'zh', label: 'Chinese' },
    { value: 'ja', label: 'Japanese' },
    { value: 'ko', label: 'Korean' },
    { value: 'th', label: 'Thai' }
  ];

  // Currency options
  const currencies = [
    { value: 'VND', label: 'VND (Việt Nam Đồng)', symbol: '₫' },
    { value: 'USD', label: 'USD (US Dollar)', symbol: '$' },
    { value: 'EUR', label: 'EUR (Euro)', symbol: '€' },
    { value: 'JPY', label: 'JPY (Japanese Yen)', symbol: '¥' },
    { value: 'KRW', label: 'KRW (Korean Won)', symbol: '₩' },
    { value: 'THB', label: 'THB (Thai Baht)', symbol: '฿' },
    { value: 'SGD', label: 'SGD (Singapore Dollar)', symbol: 'S$' },
    { value: 'CNY', label: 'CNY (Chinese Yuan)', symbol: '¥' },
    { value: 'GBP', label: 'GBP (British Pound)', symbol: '£' },
    { value: 'AUD', label: 'AUD (Australian Dollar)', symbol: 'A$' },
    { value: 'CAD', label: 'CAD (Canadian Dollar)', symbol: 'C$' },
    { value: 'CHF', label: 'CHF (Swiss Franc)', symbol: 'CHF' }
  ];

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPersonalInfo(prev => ({ ...prev, avatar: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePersonalInfoSave = () => {
    console.log('Saving personal info:', personalInfo);
    alert('Đã lưu thông tin cá nhân thành công!');
  };

  const handlePasswordChange = () => {
    if (!security.currentPassword || !security.newPassword || !security.confirmPassword) {
      alert('Vui lòng điền đầy đủ thông tin mật khẩu!');
      return;
    }

    if (security.newPassword !== security.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }

    if (security.newPassword.length < 8) {
      alert('Mật khẩu mới phải có ít nhất 8 ký tự!');
      return;
    }

    console.log('Changing password');
    alert('Đã đổi mật khẩu thành công!');
    setSecurity(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  const handleToggle2FA = (enabled: boolean) => {
    setSecurity(prev => ({ ...prev, is2FAEnabled: enabled }));
    if (enabled) {
      alert('Đã bật xác thực 2 yếu tố. Bạn sẽ nhận được mã QR để thiết lập.');
    } else {
      alert('Đã tắt xác thực 2 yếu tố.');
    }
  };

  const handleSettingsSave = () => {
    console.log('Saving settings:', settings);
    alert('Đã lưu cài đặt thành công!');
  };

  const getCurrencyFormat = (amount: number) => {
    const currency = currencies.find(c => c.value === settings.currency);
    if (!currency) return `${amount}₫`;
    
    const formatMap: { [key: string]: string } = {
      'VND': `${amount.toLocaleString('vi-VN')}₫`,
      'USD': `$${amount.toLocaleString('en-US')}`,
      'EUR': `€${amount.toLocaleString('de-DE')}`,
      'JPY': `¥${amount.toLocaleString('ja-JP')}`,
      'KRW': `₩${amount.toLocaleString('ko-KR')}`,
      'THB': `฿${amount.toLocaleString('th-TH')}`,
      'SGD': `S$${amount.toLocaleString('en-SG')}`,
      'CNY': `¥${amount.toLocaleString('zh-CN')}`,
      'GBP': `£${amount.toLocaleString('en-GB')}`,
      'AUD': `A$${amount.toLocaleString('en-AU')}`,
      'CAD': `C$${amount.toLocaleString('en-CA')}`,
      'CHF': `CHF ${amount.toLocaleString('de-CH')}`
    };
    
    return formatMap[settings.currency] || `${amount}₫`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onClose}
              className="p-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-medium">Account Settings</h1>
              <p className="text-muted-foreground">Hồ sơ cá nhân</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Thông tin cá nhân
              </CardTitle>
              <CardDescription>
                Quản lý thông tin cơ bản của tài khoản
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Upload */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={personalInfo.avatar} alt="Avatar" />
                    <AvatarFallback>NA</AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">Ảnh đại diện</p>
                  <p className="text-xs text-muted-foreground">
                    Chọn ảnh JPG, PNG hoặc GIF. Kích thước tối đa 5MB.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">Họ tên</Label>
                  <Input
                    id="fullName"
                    value={personalInfo.fullName}
                    onChange={(e) => setPersonalInfo(prev => ({ ...prev, fullName: e.target.value }))}
                  />
                </div>

                {/* Email (Read-only) */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    value={personalInfo.email}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">Email không thể thay đổi</p>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input
                    id="phone"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Nhập số điện thoại"
                  />
                </div>

                {/* Role */}
                <div className="space-y-2">
                  <Label htmlFor="role">Quyền truy cập</Label>
                  <Select
                    value={personalInfo.role}
                    onValueChange={(value) => setPersonalInfo(prev => ({ ...prev, role: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sale">Sale</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Country */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="country">Quốc gia</Label>
                  <Select
                    value={personalInfo.country}
                    onValueChange={(value) => setPersonalInfo(prev => ({ ...prev, country: value }))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handlePersonalInfoSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Lưu thông tin
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Bảo mật
              </CardTitle>
              <CardDescription>
                Quản lý mật khẩu và cài đặt bảo mật tài khoản
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Change Password */}
              <div className="space-y-4">
                <h4 className="font-medium">Đổi mật khẩu</h4>
                
                <div className="space-y-4 max-w-md">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        value={security.currentPassword}
                        onChange={(e) => setSecurity(prev => ({ ...prev, currentPassword: e.target.value }))}
                        placeholder="Nhập mật khẩu hiện tại"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Mật khẩu mới</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={security.newPassword}
                        onChange={(e) => setSecurity(prev => ({ ...prev, newPassword: e.target.value }))}
                        placeholder="Nhập mật khẩu mới (tối thiểu 8 ký tự)"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={security.confirmPassword}
                        onChange={(e) => setSecurity(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        placeholder="Nhập lại mật khẩu mới"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <Button onClick={handlePasswordChange} variant="outline">
                  <Key className="h-4 w-4 mr-2" />
                  Đổi mật khẩu
                </Button>
              </div>

              <Separator />

              {/* Two-Factor Authentication */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium">Xác thực hai yếu tố (2FA)</h4>
                  <p className="text-sm text-muted-foreground">
                    Tăng cường bảo mật tài khoản bằng xác thực hai bước
                  </p>
                </div>
                <Switch
                  checked={security.is2FAEnabled}
                  onCheckedChange={handleToggle2FA}
                />
              </div>
              {security.is2FAEnabled && (
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    ✅ Xác thực 2FA đã được kích hoạt. Quét mã QR bằng ứng dụng Google Authenticator hoặc Authy để hoàn tất thiết lập.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Cài đặt
              </CardTitle>
              <CardDescription>
                Tùy chỉnh trải nghiệm sử dụng hệ thống
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Timezone */}
                <div className="space-y-2">
                  <Label htmlFor="timezone">Múi giờ</Label>
                  <Select
                    value={settings.timezone}
                    onValueChange={(value) => setSettings(prev => ({ ...prev, timezone: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map((timezone) => (
                        <SelectItem key={timezone.value} value={timezone.value}>
                          {timezone.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Language */}
                <div className="space-y-2">
                  <Label htmlFor="language">Ngôn ngữ</Label>
                  <Select
                    value={settings.language}
                    onValueChange={(value) => setSettings(prev => ({ ...prev, language: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((language) => (
                        <SelectItem key={language.value} value={language.value}>
                          {language.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Currency */}
                <div className="space-y-2">
                  <Label htmlFor="currency">Tiền tệ mặc định</Label>
                  <Select
                    value={settings.currency}
                    onValueChange={(value) => setSettings(prev => ({ ...prev, currency: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.value} value={currency.value}>
                          <div className="flex items-center justify-between w-full">
                            <span>{currency.label}</span>
                            <span className="text-muted-foreground ml-2">{currency.symbol}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Tiền tệ hiển thị trong báo cáo và giao dịch
                  </p>
                </div>
              </div>



              <div className="flex justify-end">
                <Button onClick={handleSettingsSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Lưu cài đặt
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}