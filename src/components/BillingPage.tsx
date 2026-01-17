import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { ArrowLeft, CreditCard, Calendar, Download, CheckCircle, Star, Zap, Building, Crown, Plus, Users, Database } from 'lucide-react';

interface BillingPageProps {
  onClose: () => void;
}

export function BillingPage({ onClose }: BillingPageProps) {
  const [autoRenewal, setAutoRenewal] = useState(true);
  const [showAddOns, setShowAddOns] = useState(false);

  // Mock current plan
  const currentPlan = {
    name: 'Pro',
    price: 599000,
    period: 'tháng',
    expiryDate: new Date(2024, 11, 25), // December 25, 2024
    features: [
      'Unlimited leads',
      'Advanced reporting',
      'API integration',
      'Priority support',
      '5 team members'
    ]
  };

  // Mock payment history
  const paymentHistory = [
    {
      id: 'INV-2024-001',
      date: new Date(2024, 10, 25), // November 25, 2024
      plan: 'Pro Plan',
      amount: 599000,
      status: 'Paid',
      method: 'Visa ****1234'
    },
    {
      id: 'INV-2024-002',
      date: new Date(2024, 9, 25), // October 25, 2024
      plan: 'Pro Plan',
      amount: 599000,
      status: 'Paid',
      method: 'MoMo'
    },
    {
      id: 'INV-2024-003',
      date: new Date(2024, 8, 25), // September 25, 2024
      plan: 'Starter Plan',
      amount: 299000,
      status: 'Paid',
      method: 'ZaloPay'
    },
    {
      id: 'INV-2024-004',
      date: new Date(2024, 7, 25), // August 25, 2024
      plan: 'Starter Plan',
      amount: 299000,
      status: 'Failed',
      method: 'Visa ****5678'
    }
  ];

  // Available plans
  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      period: 'tháng',
      description: 'Dành cho cá nhân và startup',
      icon: <Star className="h-6 w-6" />,
      features: [
        '100 leads/tháng',
        'Basic CRM',
        'Email support',
        '1 user'
      ],
      isCurrentPlan: false,
      popular: false
    },
    {
      id: 'starter',
      name: 'Starter',
      price: 299000,
      period: 'tháng',
      description: 'Dành cho doanh nghiệp nhỏ',
      icon: <Zap className="h-6 w-6" />,
      features: [
        '1,000 leads/tháng',
        'Advanced CRM',
        'Basic reporting',
        'Email & chat support',
        '3 users'
      ],
      isCurrentPlan: false,
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 599000,
      period: 'tháng',
      description: 'Dành cho doanh nghiệp vừa',
      icon: <Building className="h-6 w-6" />,
      features: [
        '10,000 leads/tháng',
        'Full CRM suite',
        'Advanced reporting',
        'API integration',
        'Priority support',
        '5 users'
      ],
      isCurrentPlan: true,
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 1299000,
      period: 'tháng',
      description: 'Dành cho doanh nghiệp lớn',
      icon: <Crown className="h-6 w-6" />,
      features: [
        'Unlimited leads',
        'Custom integrations',
        'White-label solution',
        'Dedicated support',
        'Unlimited users',
        'Custom training'
      ],
      isCurrentPlan: false,
      popular: false
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date);
  };

  const getDaysUntilExpiry = () => {
    const today = new Date();
    const expiry = currentPlan.expiryDate;
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    console.log('Downloading invoice:', invoiceId);
    alert(`Đang tải hóa đơn ${invoiceId}...`);
  };

  const handleUpgradePlan = (planId: string) => {
    console.log('Upgrading to plan:', planId);
    alert(`Đang chuyển đến trang thanh toán cho gói ${plans.find(p => p.id === planId)?.name}...`);
  };

  const handleRenewPlan = (duration: string) => {
    console.log('Renewing plan for:', duration);
    alert(`Đang gia hạn gói ${currentPlan.name} cho ${duration}...`);
  };

  const handleBuyAddon = (type: 'user' | 'lead', planId: string, quantity: number = 1) => {
    const plan = plans.find(p => p.id === planId);
    if (!plan) return;

    const prices = {
      user: {
        starter: 50000,
        pro: 75000,
        enterprise: 100000
      },
      lead: {
        starter: 150000, // Per 1000 leads
        pro: 120000,     // Per 1000 leads  
        enterprise: 100000 // Per 1000 leads
      }
    };

    const price = prices[type][planId as keyof typeof prices.user] || 0;
    const totalPrice = price * quantity;
    
    const typeText = type === 'user' ? 'user' : '1,000 leads';
    const planText = plan.name;
    
    console.log(`Buying ${quantity} ${typeText} for ${planText} plan:`, { type, planId, quantity, price, totalPrice });
    
    alert(`🛒 Mua thêm ${quantity} ${typeText} cho gói ${planText}\n\n💰 Giá: ${formatCurrency(price)}/${typeText}\n💳 Tổng tiền: ${formatCurrency(totalPrice)}\n\n✅ Đang chuyển đến trang thanh toán...`);
  };

  const daysLeft = getDaysUntilExpiry();

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
              <h1 className="text-2xl font-medium">Billing</h1>
              <p className="text-muted-foreground">Gói & thanh toán</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-8">
          {/* Current Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Gói hiện tại
              </CardTitle>
              <CardDescription>
                Thông tin gói dịch vụ bạn đang sử dụng
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-medium">{currentPlan.name} Plan</h3>
                    <Badge variant="secondary">Đang hoạt động</Badge>
                  </div>
                  <p className="text-2xl font-semibold">
                    {formatCurrency(currentPlan.price)}
                    <span className="text-sm font-normal text-muted-foreground">/{currentPlan.period}</span>
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-sm text-muted-foreground">Hết hạn</p>
                  <p className="font-medium">{formatDate(currentPlan.expiryDate)}</p>
                  <p className="text-sm text-muted-foreground">
                    {daysLeft > 0 ? `Còn ${daysLeft} ngày` : 'Đã hết hạn'}
                  </p>
                </div>
              </div>

              {daysLeft <= 7 && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                  <p className="text-sm text-destructive font-medium">
                    ⚠️ Gói dịch vụ sắp hết hạn! Vui lòng gia hạn để tiếp tục sử dụng dịch vụ.
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Tự động gia hạn</span>
                  <Switch
                    checked={autoRenewal}
                    onCheckedChange={setAutoRenewal}
                  />
                </div>
                <div className="space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => handleRenewPlan('1 tháng')}
                  >
                    Gia hạn
                  </Button>
                  <Button onClick={() => handleUpgradePlan('enterprise')}>
                    Nâng cấp
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Plans */}
          <Card>
            <CardHeader>
              <CardTitle>Các gói dịch vụ</CardTitle>
              <CardDescription>
                Chọn gói phù hợp với nhu cầu của bạn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {plans.map((plan) => (
                  <Card 
                    key={plan.id} 
                    className={`relative ${plan.popular ? 'border-primary' : ''} ${plan.isCurrentPlan ? 'bg-muted/30' : ''}`}
                  >
                    {plan.popular && (
                      <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary">
                        Phổ biến
                      </Badge>
                    )}
                    <CardHeader className="text-center">
                      <div className="mx-auto mb-2 p-3 bg-primary/10 rounded-full w-fit">
                        {plan.icon}
                      </div>
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      <div className="space-y-1">
                        <div className="text-3xl font-semibold">
                          {plan.price === 0 ? 'Miễn phí' : formatCurrency(plan.price)}
                        </div>
                        {plan.price > 0 && (
                          <p className="text-sm text-muted-foreground">/{plan.period}</p>
                        )}
                      </div>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className="w-full" 
                        variant={plan.isCurrentPlan ? "secondary" : "default"}
                        disabled={plan.isCurrentPlan}
                        onClick={() => handleUpgradePlan(plan.id)}
                      >
                        {plan.isCurrentPlan ? 'Gói hiện tại' : 'Chọn gói này'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Add-ons for Paid Plans */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Mua thêm Lead & User
              </CardTitle>
              <CardDescription>
                Mở rộng giới hạn cho các gói trả phí (Starter, Pro, Enterprise)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Starter Add-ons */}
                <Card className="border-orange-200 bg-orange-50/30">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-2 p-3 bg-orange-100 rounded-full w-fit">
                      <Zap className="h-6 w-6 text-orange-600" />
                    </div>
                    <CardTitle className="text-lg text-orange-800">Starter Add-ons</CardTitle>
                    <CardDescription>Mở rộng cho gói Starter</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Extra Users */}
                    <div className="p-4 border rounded-lg bg-white">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-orange-600" />
                          <span className="font-medium">Thêm User</span>
                        </div>
                        <Badge variant="outline" className="text-orange-700 border-orange-300">
                          50,000₫/user/tháng
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Giới hạn hiện tại: 3 users
                      </p>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleBuyAddon('user', 'starter', 1)}
                          className="flex-1"
                        >
                          +1 User
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleBuyAddon('user', 'starter', 2)}
                          className="flex-1"
                        >
                          +2 Users
                        </Button>
                      </div>
                    </div>

                    {/* Extra Leads */}
                    <div className="p-4 border rounded-lg bg-white">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Database className="h-4 w-4 text-orange-600" />
                          <span className="font-medium">Thêm Leads</span>
                        </div>
                        <Badge variant="outline" className="text-orange-700 border-orange-300">
                          150,000₫/1K leads
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Giới hạn hiện tại: 1,000 leads/tháng
                      </p>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleBuyAddon('lead', 'starter', 1)}
                          className="flex-1"
                        >
                          +1K Leads
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleBuyAddon('lead', 'starter', 5)}
                          className="flex-1"
                        >
                          +5K Leads
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Pro Add-ons */}
                <Card className="border-blue-200 bg-blue-50/30">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-2 p-3 bg-blue-100 rounded-full w-fit">
                      <Building className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg text-blue-800">Pro Add-ons</CardTitle>
                    <CardDescription>Mở rộng cho gói Pro</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Extra Users */}
                    <div className="p-4 border rounded-lg bg-white">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">Thêm User</span>
                        </div>
                        <Badge variant="outline" className="text-blue-700 border-blue-300">
                          75,000₫/user/tháng
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Giới hạn hiện tại: 5 users
                      </p>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleBuyAddon('user', 'pro', 1)}
                          className="flex-1"
                        >
                          +1 User
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleBuyAddon('user', 'pro', 3)}
                          className="flex-1"
                        >
                          +3 Users
                        </Button>
                      </div>
                    </div>

                    {/* Extra Leads */}
                    <div className="p-4 border rounded-lg bg-white">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Database className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">Thêm Leads</span>
                        </div>
                        <Badge variant="outline" className="text-blue-700 border-blue-300">
                          120,000₫/1K leads
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Giới hạn hiện tại: 10,000 leads/tháng
                      </p>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleBuyAddon('lead', 'pro', 5)}
                          className="flex-1"
                        >
                          +5K Leads
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleBuyAddon('lead', 'pro', 10)}
                          className="flex-1"
                        >
                          +10K Leads
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Enterprise Add-ons */}
                <Card className="border-purple-200 bg-purple-50/30">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-2 p-3 bg-purple-100 rounded-full w-fit">
                      <Crown className="h-6 w-6 text-purple-600" />
                    </div>
                    <CardTitle className="text-lg text-purple-800">Enterprise Add-ons</CardTitle>
                    <CardDescription>Mở rộng cho gói Enterprise</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Extra Users */}
                    <div className="p-4 border rounded-lg bg-white">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-purple-600" />
                          <span className="font-medium">Thêm User</span>
                        </div>
                        <Badge variant="outline" className="text-purple-700 border-purple-300">
                          100,000₫/user/tháng
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Unlimited users (premium add-ons)
                      </p>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleBuyAddon('user', 'enterprise', 5)}
                          className="flex-1"
                        >
                          +5 Users
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleBuyAddon('user', 'enterprise', 10)}
                          className="flex-1"
                        >
                          +10 Users
                        </Button>
                      </div>
                    </div>

                    {/* Extra Processing Power */}
                    <div className="p-4 border rounded-lg bg-white">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Database className="h-4 w-4 text-purple-600" />
                          <span className="font-medium">Extra Processing</span>
                        </div>
                        <Badge variant="outline" className="text-purple-700 border-purple-300">
                          100,000₫/1K leads
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Thêm sức mạnh xử lý cho volume lớn
                      </p>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleBuyAddon('lead', 'enterprise', 10)}
                          className="flex-1"
                        >
                          +10K Leads
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleBuyAddon('lead', 'enterprise', 50)}
                          className="flex-1"
                        >
                          +50K Leads
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Add-ons Note */}
              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Lưu ý về Add-ons
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Add-ons chỉ áp dụng cho các gói trả phí (Starter, Pro, Enterprise)</li>
                  <li>• Giá add-ons được tính theo tháng và sẽ được gia hạn cùng gói chính</li>
                  <li>• Bạn có thể mua thêm nhiều lần trong tháng nếu cần</li>
                  <li>• Add-ons sẽ tự động hết hạn khi gói chính hết hạn</li>
                  <li>• Liên hệ support để được tư vấn gói phù hợp cho nhu cầu lớn</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Payment History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Lịch sử thanh toán
              </CardTitle>
              <CardDescription>
                Danh sách các giao dịch thanh toán gần đây
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã hóa đơn</TableHead>
                    <TableHead>Ngày</TableHead>
                    <TableHead>Gói dịch vụ</TableHead>
                    <TableHead>Số tiền</TableHead>
                    <TableHead>Phương thức</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>{formatDate(payment.date)}</TableCell>
                      <TableCell>{payment.plan}</TableCell>
                      <TableCell>{formatCurrency(payment.amount)}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell>
                        <Badge variant={payment.status === 'Paid' ? 'default' : 'destructive'}>
                          {payment.status === 'Paid' ? 'Đã thanh toán' : 'Thất bại'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {payment.status === 'Paid' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownloadInvoice(payment.id)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle>Phương thức thanh toán</CardTitle>
              <CardDescription>
                Các hình thức thanh toán được hỗ trợ
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Credit Cards */}
                <div className="space-y-3">
                  <h4 className="font-medium">Thẻ quốc tế</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="w-8 h-6 bg-gradient-to-r from-blue-600 to-blue-400 rounded text-white text-xs flex items-center justify-center font-bold">
                        VISA
                      </div>
                      <span className="text-sm">Visa</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="w-8 h-6 bg-gradient-to-r from-red-600 to-orange-400 rounded text-white text-xs flex items-center justify-center font-bold">
                        MC
                      </div>
                      <span className="text-sm">MasterCard</span>
                    </div>
                  </div>
                </div>

                {/* E-wallets */}
                <div className="space-y-3">
                  <h4 className="font-medium">Ví điện tử</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="w-8 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded text-white text-xs flex items-center justify-center font-bold">
                        M
                      </div>
                      <span className="text-sm">MoMo</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="w-8 h-6 bg-gradient-to-r from-blue-500 to-cyan-400 rounded text-white text-xs flex items-center justify-center font-bold">
                        Z
                      </div>
                      <span className="text-sm">ZaloPay</span>
                    </div>
                  </div>
                </div>

                {/* Bank Transfer */}
                <div className="space-y-3">
                  <h4 className="font-medium">Chuyển khoản</h4>
                  <div className="space-y-2">
                    <div className="p-3 border rounded-lg">
                      <p className="text-sm font-medium">Ngân hàng ABC</p>
                      <p className="text-xs text-muted-foreground">STK: 1234567890</p>
                      <p className="text-xs text-muted-foreground">Chủ TK: CÔNG TY ABC</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Lưu ý thanh toán</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Thanh toán sẽ được xử lý trong vòng 1-2 ngày làm việc</li>
                  <li>• Hóa đơn điện tử sẽ được gửi qua email đã đăng ký</li>
                  <li>• Liên hệ support nếu có vấn đề về thanh toán</li>
                  <li>• Gói dịch vụ sẽ tự động kích hoạt sau khi thanh toán thành công</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}