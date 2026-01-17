import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Eye, EyeOff, User, Lock } from 'lucide-react';

interface LoginPageProps {
  onLogin: (username: string, password: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      alert('⚠️ Vui lòng nhập đầy đủ tài khoản và mật khẩu');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Simple validation - in real app, this would be handled by backend
      if (username === 'admin' && password === 'admin123') {
        onLogin(username, password);
      } else {
        alert('❌ Tài khoản hoặc mật khẩu không đúng.\n\nTài khoản demo:\n• Username: admin\n• Password: admin123');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/10 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-secondary/20 to-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-accent/30 to-primary/30 rounded-full blur-2xl animate-pulse"></div>
      </div>
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(124, 58, 237, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(124, 58, 237, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Main Login Card */}
      <Card className="w-full max-w-md relative z-10 card-elevated glass-effect border-primary/20 animate-scaleIn">
        <CardHeader className="text-center pb-6 relative">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mb-6 hover-glow animate-bounceIn backdrop-blur-sm border border-primary/20">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center shadow-lg">
              <User className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-3xl bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
            Đăng nhập CRM
          </CardTitle>
          <CardDescription className="text-base mt-2">
            Chào mừng trở lại hệ thống quản lý khách hàng đa kênh
          </CardDescription>
          
          {/* Decorative Line */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Enhanced Username Input */}
            <div className="space-y-3">
              <Label htmlFor="username" className="text-sm font-semibold text-foreground">Tài khoản *</Label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nhập tài khoản của bạn"
                  className="pl-12 h-12 border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-300 focus:border-primary focus:shadow-lg focus:bg-background group-hover:border-primary/50"
                  required
                />
              </div>
            </div>

            {/* Enhanced Password Input */}
            <div className="space-y-3">
              <Label htmlFor="password" className="text-sm font-semibold text-foreground">Mật khẩu *</Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu của bạn"
                  className="pl-12 pr-12 h-12 border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-300 focus:border-primary focus:shadow-lg focus:bg-background group-hover:border-primary/50"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 hover:bg-accent/50 transition-all duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  )}
                </Button>
              </div>
            </div>

            {/* Enhanced Login Button */}
            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-primary via-primary-light to-primary hover:from-primary-hover hover:via-primary hover:to-primary-hover btn-gradient text-primary-foreground font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                  Đang đăng nhập...
                </div>
              ) : (
                'Đăng nhập vào hệ thống'
              )}
            </Button>
          </form>

          {/* Enhanced Demo Info */}
          <div className="mt-8 p-5 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl border border-primary/20 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground text-xs">🎯</span>
              </div>
              <p className="text-sm font-semibold text-primary">
                Thông tin đăng nhập demo
              </p>
            </div>
            <div className="space-y-2 text-sm text-foreground/80">
              <div className="flex items-center justify-between p-2 bg-background/50 rounded-lg">
                <span className="font-medium">Username:</span>
                <code className="px-2 py-1 bg-muted/50 rounded text-primary font-mono">admin</code>
              </div>
              <div className="flex items-center justify-between p-2 bg-background/50 rounded-lg">
                <span className="font-medium">Password:</span>
                <code className="px-2 py-1 bg-muted/50 rounded text-primary font-mono">admin123</code>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              💡 Sử dụng thông tin trên để truy cập hệ thống demo
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-3 h-3 bg-primary/30 rounded-full animate-ping"></div>
      <div className="absolute bottom-20 right-20 w-2 h-2 bg-accent/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute top-1/3 left-10 w-1 h-1 bg-primary/50 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
    </div>
  );
}