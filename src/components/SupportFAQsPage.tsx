import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { 
  ArrowLeft, 
  Search, 
  MessageCircle, 
  Mail, 
  Phone, 
  ChevronDown,
  ChevronRight,
  HelpCircle,
  BookOpen,
  Zap,
  CreditCard,
  Users,
  BarChart3,
  ExternalLink,
  Send
} from 'lucide-react';

interface SupportFAQsPageProps {
  onClose: () => void;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'crm' | 'leadhub' | 'ads-tracking' | 'billing';
  helpful: number;
  isExpanded?: boolean;
}

export function SupportFAQsPage({ onClose }: SupportFAQsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFAQs, setExpandedFAQs] = useState<string[]>([]);

  // Mock FAQs by category
  const faqs: FAQ[] = [
    // CRM FAQs
    {
      id: 'faq-crm-1',
      question: 'Làm thế nào để đăng nhập vào hệ thống CRM?',
      answer: 'Để đăng nhập vào hệ thống CRM:\n1. Truy cập trang đăng nhập tại [URL]\n2. Nhập email và mật khẩu đã được cấp\n3. Click "Đăng nhập"\n4. Nếu quên mật khẩu, click "Quên mật khẩu" để reset\n\nLưu ý: Tài khoản sẽ bị khóa tạm thời sau 5 lần đăng nhập sai.',
      category: 'crm',
      helpful: 45
    },
    {
      id: 'faq-crm-2',
      question: 'Cách thêm lead mới vào hệ thống?',
      answer: 'Có 3 cách để thêm lead mới:\n\n1. **Thêm thủ công:**\n   - Click nút "Thêm khách hàng" > "Tạo nhanh"\n   - Điền đầy đủ thông tin bắt buộc\n   - Chọn nhóm phù hợp\n   - Click "Lưu"\n\n2. **Import từ Excel:**\n   - Click "Thêm khách hàng" > "Nhập từ Excel"\n   - Tải template mẫu\n   - Upload file Excel đã chuẩn hóa\n\n3. **Tự động từ nguồn:**\n   - Tích hợp form website\n   - Kết nối Facebook/Google Ads\n   - API integration',
      category: 'crm',
      helpful: 38
    },
    {
      id: 'faq-crm-3',
      question: 'Làm sao để export dữ liệu ra Excel?',
      answer: 'Để export dữ liệu khách hàng:\n1. Vào trang danh sách khách hàng\n2. Áp dụng bộ lọc nếu cần (theo trạng thái, nguồn, thời gian...)\n3. Click nút "More" (3 chấm) > "Xuất Excel"\n4. Chọn các cột muốn export\n5. Click "Tải xuống"\n\nFile Excel sẽ được tải về máy với tên dạng "CRM_Export_DDMMYYYY.xlsx"',
      category: 'crm',
      helpful: 29
    },

    // LeadHub FAQs
    {
      id: 'faq-leadhub-1',
      question: 'LeadHub Multi-sheet hoạt động như thế nào?',
      answer: 'LeadHub Multi-sheet cho phép bạn:\n\n**Quản lý nhiều sheet đồng thời:**\n- Tạo sheet theo chiến dịch, nguồn, hoặc sản phẩm\n- Phân quyền xem/chỉnh sửa cho từng sheet\n- Đồng bộ dữ liệu tự động giữa các sheet\n\n**Tính năng nổi bật:**\n- Real-time collaboration\n- History tracking\n- Advanced filtering\n- Bulk operations\n- Data validation rules',
      category: 'leadhub',
      helpful: 22
    },
    {
      id: 'faq-leadhub-2',
      question: 'Cách chia sẻ sheet cho team member?',
      answer: 'Để chia sẻ sheet với thành viên khác:\n1. Mở sheet cần chia sẻ\n2. Click icon "Share" ở góc trên bên phải\n3. Nhập email của thành viên\n4. Chọn quyền hạn:\n   - **View:** Chỉ xem\n   - **Edit:** Xem và chỉnh sửa\n   - **Admin:** Full quyền quản lý\n5. Click "Send invitation"\n\nThành viên sẽ nhận email mời và có thể truy cập ngay lập tức.',
      category: 'leadhub',
      helpful: 18
    },

    // Ads Tracking FAQs
    {
      id: 'faq-ads-1',
      question: 'Cách tích hợp Facebook Ads với hệ thống?',
      answer: 'Để tích hợp Facebook Ads:\n\n**Bước 1: Kết nối tài khoản**\n1. Vào Settings > Integrations > Facebook Ads\n2. Click "Connect Facebook Account"\n3. Đăng nhập Facebook và cấp quyền\n\n**Bước 2: Chọn Ad Account**\n1. Chọn Ad Account muốn tracking\n2. Thiết lập conversion tracking\n3. Cấu hình webhook\n\n**Bước 3: Mapping dữ liệu**\n1. Map các field Facebook với CRM\n2. Test connection\n3. Enable auto-sync\n\nSau khi tích hợp, lead từ Facebook sẽ tự động import vào CRM.',
      category: 'ads-tracking',
      helpful: 56
    },
    {
      id: 'faq-ads-2',
      question: 'Báo cáo Ads Tracking hiển thị những gì?',
      answer: 'Báo cáo Ads Tracking cung cấp:\n\n**Overview Dashboard:**\n- Tổng chi phí quảng cáo\n- Số lead generated\n- Cost per lead (CPL)\n- Conversion rate\n- ROI/ROAS\n\n**Chi tiết theo chiến dịch:**\n- Performance từng campaign\n- Ad set breakdown\n- Creative analysis\n- Audience insights\n\n**Lead Attribution:**\n- Lead source tracking\n- Customer journey\n- Multi-touch attribution\n- Revenue attribution\n\n**Custom Reports:**\n- Tạo báo cáo tùy chỉnh\n- Schedule automated reports\n- Export to Excel/PDF',
      category: 'ads-tracking',
      helpful: 31
    },

    // Billing FAQs
    {
      id: 'faq-billing-1',
      question: 'Các gói dịch vụ có gì khác nhau?',
      answer: 'So sánh các gói dịch vụ:\n\n**Free (0đ/tháng):**\n- 100 leads/tháng\n- Basic CRM\n- 1 user\n- Email support\n\n**Starter (299k/tháng):**\n- 1,000 leads/tháng\n- Advanced CRM\n- 3 users\n- Basic reporting\n- Email & chat support\n\n**Pro (599k/tháng):**\n- 10,000 leads/tháng\n- Full CRM suite\n- 5 users\n- Advanced reporting\n- API integration\n- Priority support\n\n**Enterprise (1,299k/tháng):**\n- Unlimited leads\n- Unlimited users\n- Custom integrations\n- White-label\n- Dedicated support\n- Custom training',
      category: 'billing',
      helpful: 67
    },
    {
      id: 'faq-billing-2',
      question: 'Làm thế nào để nâng cấp gói dịch vụ?',
      answer: 'Để nâng cấp gói dịch vụ:\n\n**Cách 1: Từ dashboard**\n1. Vào Billing > Current Plan\n2. Click "Upgrade"\n3. Chọn gói muốn nâng cấp\n4. Chọn phương thức thanh toán\n5. Xác nhận và thanh toán\n\n**Cách 2: Liên hệ sales**\n1. Chat với team support\n2. Gọi hotline: 1900-xxx-xxx\n3. Email: billing@company.com\n\n**Lưu ý:**\n- Nâng cấp có hiệu lực ngay lập tức\n- Phí sẽ được tính theo tỷ lệ (pro-rated)\n- Có thể hủy downgrade bất kỳ lúc nào',
      category: 'billing',
      helpful: 43
    }
  ];

  // Filter FAQs based on search term
  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group FAQs by category
  const faqsByCategory = filteredFAQs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, FAQ[]>);

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQs(prev => 
      prev.includes(faqId) 
        ? prev.filter(id => id !== faqId)
        : [...prev, faqId]
    );
  };

  const getCategoryInfo = (category: string) => {
    const categoryMap = {
      crm: { 
        name: 'CRM', 
        icon: <Users className="h-5 w-5" />, 
        color: 'text-blue-600',
        description: 'Quản lý khách hàng và bán hàng'
      },
      leadhub: { 
        name: 'LeadHub', 
        icon: <BarChart3 className="h-5 w-5" />, 
        color: 'text-green-600',
        description: 'Quản lý leads và conversion'
      },
      'ads-tracking': { 
        name: 'Ads Tracking', 
        icon: <Zap className="h-5 w-5" />, 
        color: 'text-purple-600',
        description: 'Theo dõi và phân tích quảng cáo'
      },
      billing: { 
        name: 'Billing', 
        icon: <CreditCard className="h-5 w-5" />, 
        color: 'text-orange-600',
        description: 'Thanh toán và gói dịch vụ'
      }
    };
    return categoryMap[category as keyof typeof categoryMap] || { 
      name: category, 
      icon: <HelpCircle className="h-5 w-5" />, 
      color: 'text-gray-600',
      description: ''
    };
  };

  const handleStartChat = () => {
    console.log('Opening chat widget');
    alert('Đang kết nối với team support...\n\n🟢 Thời gian hỗ trợ: 8:00 - 22:00 hàng ngày\n📱 Zalo OA: @convertify\n💬 Live chat: Có sẵn ngay bây giờ');
  };

  const handleSendEmail = () => {
    window.open('mailto:support@convertify.com?subject=Hỗ trợ kỹ thuật&body=Xin chào team support,%0D%0A%0D%0ATôi cần hỗ trợ về:%0D%0A%0D%0AChi tiết vấn đề:%0D%0A%0D%0ACảm ơn!');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
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
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-medium">Hỗ trợ & FAQ</h1>
                <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700 border-purple-200">
                  Câu hỏi thường gặp
                </Badge>
              </div>
              <p className="text-muted-foreground">Tìm kiếm câu trả lời và liên hệ hỗ trợ</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm câu hỏi thường gặp..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>

        <Tabs defaultValue="faqs" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="faqs" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Câu hỏi thường gặp
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Liên hệ hỗ trợ
            </TabsTrigger>
          </TabsList>

          {/* FAQs */}
          <TabsContent value="faqs" className="space-y-6">
            <div>
              <h2 className="text-xl font-medium mb-4">Câu hỏi thường gặp</h2>
              <p className="text-muted-foreground mb-6">
                Tìm câu trả lời nhanh cho các vấn đề phổ biến
              </p>
            </div>

            {Object.entries(faqsByCategory).map(([category, categoryFAQs]) => {
              const categoryInfo = getCategoryInfo(category);
              return (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-2 ${categoryInfo.color}`}>
                      {categoryInfo.icon}
                      {categoryInfo.name}
                      <Badge variant="secondary">{categoryFAQs.length}</Badge>
                    </CardTitle>
                    <CardDescription>{categoryInfo.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {categoryFAQs.map((faq) => (
                      <Collapsible 
                        key={faq.id}
                        open={expandedFAQs.includes(faq.id)}
                        onOpenChange={() => toggleFAQ(faq.id)}
                      >
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-between p-4 h-auto text-left hover:bg-muted/50"
                          >
                            <span className="font-medium pr-4">{faq.question}</span>
                            {expandedFAQs.includes(faq.id) ? (
                              <ChevronDown className="h-4 w-4 flex-shrink-0" />
                            ) : (
                              <ChevronRight className="h-4 w-4 flex-shrink-0" />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="px-4 pb-4">
                          <div className="pt-2 border-t border-border">
                            <div className="prose prose-sm max-w-none">
                              {faq.answer.split('\n').map((line, index) => (
                                <p key={index} className={line.trim() === '' ? 'mb-2' : 'mb-1'}>
                                  {line}
                                </p>
                              ))}
                            </div>
                            <div className="mt-4 pt-2 border-t border-border flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">
                                {faq.helpful} người thấy hữu ích
                              </span>
                              <div className="space-x-2">
                                <Button size="sm" variant="ghost" className="text-xs">
                                  👍 Hữu ích
                                </Button>
                                <Button size="sm" variant="ghost" className="text-xs">
                                  👎 Không hữu ích
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </CardContent>
                </Card>
              );
            })}

            {Object.keys(faqsByCategory).length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">Không tìm thấy kết quả</h3>
                  <p className="text-muted-foreground mb-4">
                    Thử tìm kiếm với từ khóa khác hoặc liên hệ support để được hỗ trợ
                  </p>
                  <Button onClick={handleStartChat}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat với support
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Contact Support */}
          <TabsContent value="contact" className="space-y-6">
            <div>
              <h2 className="text-xl font-medium mb-4">Liên hệ hỗ trợ</h2>
              <p className="text-muted-foreground mb-6">
                Kết nối trực tiếp với team support để được hỗ trợ tốt nhất
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Live Chat */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <MessageCircle className="h-5 w-5" />
                    Chat trực tiếp
                  </CardTitle>
                  <CardDescription>
                    Hỗ trợ nhanh nhất qua live chat
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Online - Phản hồi trong vài phút</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Thời gian: 8:00 - 22:00 hàng ngày
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Zalo Official Account</p>
                    <p className="text-sm text-muted-foreground">@convertify</p>
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => window.open('https://zalo.me/convertify', '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Mở Zalo
                    </Button>
                  </div>
                  
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={handleStartChat}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Bắt đầu chat
                  </Button>
                </CardContent>
              </Card>

              {/* Email Support */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <Mail className="h-5 w-5" />
                    Email hỗ trợ
                  </CardTitle>
                  <CardDescription>
                    Gửi email chi tiết về vấn đề cần hỗ trợ
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">support@convertify.com</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Phản hồi trong 4-6 giờ làm việc
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Nên bao gồm thông tin:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Mô tả chi tiết vấn đề</li>
                      <li>• Screenshots nếu có</li>
                      <li>• Thông tin tài khoản</li>
                      <li>• Browser/Device sử dụng</li>
                    </ul>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={handleSendEmail}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Gửi email
                  </Button>
                </CardContent>
              </Card>

              {/* Phone Support */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-600">
                    <Phone className="h-5 w-5" />
                    Hotline hỗ trợ
                  </CardTitle>
                  <CardDescription>
                    Gọi trực tiếp để được hỗ trợ nhanh chóng
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-orange-600" />
                      <span className="text-lg font-medium">1900-xxx-xxx</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Miễn phí từ điện thoại bàn
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Giờ làm việc:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• T2 - T6: 8:00 - 18:00</li>
                      <li>• T7: 8:00 - 12:00</li>
                      <li>• CN: Nghỉ</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Dành cho:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Khách hàng Enterprise</li>
                      <li>• Vấn đề khẩn cấp</li>
                      <li>• Hỗ trợ kỹ thuật phức tạp</li>
                    </ul>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => window.open('tel:1900-xxx-xxx')}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Gọi ngay
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Gửi yêu cầu hỗ trợ</CardTitle>
                <CardDescription>
                  Điền form dưới đây để được hỗ trợ tốt nhất
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Loại vấn đề *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại vấn đề" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Lỗi kỹ thuật</SelectItem>
                        <SelectItem value="billing">Thanh toán & billing</SelectItem>
                        <SelectItem value="feature">Tính năng & sử dụng</SelectItem>
                        <SelectItem value="integration">Tích hợp</SelectItem>
                        <SelectItem value="other">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Mức độ ưu tiên *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn mức độ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Thấp - Có thể đợi</SelectItem>
                        <SelectItem value="medium">Trung bình - Trong ngày</SelectItem>
                        <SelectItem value="high">Cao - Trong vài giờ</SelectItem>
                        <SelectItem value="urgent">Khẩn cấp - Ngay lập tức</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <Label>Mô tả chi tiết vấn đề *</Label>
                  <Textarea 
                    className="w-full min-h-[120px] p-3 border rounded-md resize-y"
                    placeholder="Vui lòng mô tả chi tiết vấn đề bạn đang gặp phải, bao gồm:
- Các bước đã thực hiện
- Lỗi xuất hiện khi nào
- Screenshots nếu có
- Browser/thiết bị đang sử dụng"
                  />
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button>
                    <Send className="h-4 w-4 mr-2" />
                    Gửi yêu cầu
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}