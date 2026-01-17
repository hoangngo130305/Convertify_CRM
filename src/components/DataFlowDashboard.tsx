import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { 
  Plus, 
  Settings, 
  Play, 
  Pause, 
  CheckCircle, 
  AlertCircle, 
  Search,
  Filter,
  TestTube,
  Save,
  Facebook,
  Chrome,
  Zap,
  Upload,
  Globe,
  ArrowRight,
  Eye,
  MoreVertical,
  RefreshCw,
  Workflow,
  StickyNote,
  Bell,
  HelpCircle,
  ClipboardList,
  User,
  CreditCard,
  Users,
  LogOut
} from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

// Mock data for connected sources
const connectedSources = [
  {
    id: 'fb_001',
    type: 'Facebook',
    accountName: 'Tài khoản Facebook Business',
    status: 'connected',
    lastSync: '2024-12-25 10:30',
    accountId: 'fb_business_001'
  },
  {
    id: 'fb_002',
    type: 'Facebook',
    accountName: 'Tài khoản Facebook Personal',
    status: 'connected',
    lastSync: '2024-12-25 09:15',
    accountId: 'fb_personal_001'
  },
  {
    id: 'tiktok_001',
    type: 'TikTok',
    accountName: 'TikTok Business Account',
    status: 'connected',
    lastSync: '2024-12-25 08:45',
    accountId: 'tt_business_001'
  },
  {
    id: 'zalo_001',
    type: 'Zalo',
    accountName: 'Zalo OA Chính',
    status: 'disconnected',
    lastSync: '2024-12-24 15:20',
    accountId: 'zalo_oa_001'
  },
  {
    id: 'landing_001',
    type: 'Landing Page',
    accountName: 'Website Chính - domain.com',
    status: 'connected',
    lastSync: '2024-12-25 11:00',
    accountId: 'landing_001'
  },
];

// Mock data for running pipelines
const runningPipelines = [
  {
    id: 'pipeline_001',
    sourceName: 'Facebook Business',
    sourceType: 'Facebook',
    formName: 'Lead Form - Dịch vụ SEO',
    destination: 'Lead Hub - Sheet Chính',
    status: 'running',
    lastSync: '5 phút trước',
    leadsCount: 143,
    sourceAccountId: 'fb_business_001'
  },
  {
    id: 'pipeline_002',
    sourceName: 'TikTok Business',
    sourceType: 'TikTok',
    formName: 'Form liên hệ TikTok',
    destination: 'Lead Hub - Sheet Marketing',
    status: 'paused',
    lastSync: '2 giờ trước',
    leadsCount: 87,
    sourceAccountId: 'tt_business_001'
  },
  {
    id: 'pipeline_003',
    sourceName: 'Landing Page',
    sourceType: 'Landing Page',
    formName: 'Contact Form Website',
    destination: 'CRM - Khách hàng tiềm năng',
    status: 'running',
    lastSync: '10 phút trước',
    leadsCount: 256,
    sourceAccountId: 'landing_001'
  }
];

// Mock data for Lead Hub sheets
const leadHubSheets = [
  { id: 'sheet_main', name: 'Sheet Chính - Lead Hub' },
  { id: 'sheet_marketing', name: 'Sheet Marketing' },
  { id: 'sheet_sales', name: 'Sheet Sales Team' },
  { id: 'sheet_vip', name: 'Sheet Khách VIP' }
];

// Mock field mappings
const fieldMappings = [
  { sourceField: 'full_name', leadHubField: 'name', required: true },
  { sourceField: 'phone_number', leadHubField: 'phone', required: true },
  { sourceField: 'email_address', leadHubField: 'email', required: true },
  { sourceField: 'company_name', leadHubField: 'company', required: false },
  { sourceField: 'message', leadHubField: 'questions', required: false },
];

const getSourceIcon = (type: string) => {
  switch (type) {
    case 'Facebook': return Facebook;
    case 'TikTok': return Chrome;
    case 'Zalo': return Zap;
    case 'Landing Page': return Globe;
    case 'Webhook': return Zap;
    case 'CSV': return Upload;
    default: return Globe;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'connected': return 'bg-green-100 text-green-800';
    case 'disconnected': return 'bg-red-100 text-red-800';
    case 'running': return 'bg-green-100 text-green-800';
    case 'paused': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

interface DataFlowDashboardProps {
  onOpenPopup?: (popup: string) => void;
  onOpenAccountSettings?: () => void;
  onOpenBilling?: () => void;
  onOpenInviteTeam?: () => void;
  onLogout?: () => void;
}

export function DataFlowDashboard({
  onOpenPopup = () => {},
  onOpenAccountSettings = () => {},
  onOpenBilling = () => {},
  onOpenInviteTeam = () => {},
  onLogout = () => {}
}: DataFlowDashboardProps = {}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSource, setSelectedSource] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedForm, setSelectedForm] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoadingForms, setIsLoadingForms] = useState(false);
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(false);

  // Filter pipelines based on search
  const filteredPipelines = runningPipelines.filter(pipeline =>
    pipeline.sourceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pipeline.formName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pipeline.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get accounts for selected source type
  const getAccountsForSource = (sourceType: string) => {
    return connectedSources.filter(source => 
      source.type === sourceType && source.status === 'connected'
    );
  };

  // Get forms for selected account (mock data)
  const getFormsForAccount = (accountId: string) => {
    const mockForms = [
      { id: 'form_001', name: 'Lead Form - Dịch vụ SEO', accountId: 'fb_business_001', type: 'lead_ads' },
      { id: 'form_002', name: 'Form đăng ký tư vấn', accountId: 'fb_business_001', type: 'lead_ads' },
      { id: 'form_003', name: 'Contact Form TikTok', accountId: 'tt_business_001', type: 'lead_ads' },
      { id: 'form_004', name: 'Form liên hệ TikTok', accountId: 'tt_business_001', type: 'lead_ads' },
      { id: 'landing_001', name: 'Contact Form Website', accountId: 'landing_001', type: 'landing_page' },
      { id: 'landing_002', name: 'Newsletter Signup', accountId: 'landing_001', type: 'landing_page' },
    ];
    return mockForms.filter(form => form.accountId === accountId);
  };

  // Handle source selection - chuyển thẳng đến bước 2
  const handleSourceSelection = async (value: string) => {
    setIsLoadingAccounts(true);
    setSelectedSource(value);
    setSelectedAccount('');
    setSelectedForm('');
    
    // Simulate loading delay
    setTimeout(() => {
      setIsLoadingAccounts(false);
      if (value) setCurrentStep(2); // Chuyển thẳng đến bước 2
    }, 800);
  };

  const handleTestConnection = () => {
    if (!selectedSource || !selectedDestination) {
      alert('⚠️ Cần chọn đầy đủ nguồn và đích đến để test connection!');
      return;
    }
    
    // Simulate testing with loading
    const originalText = 'Test connection...';
    alert('🔄 Đang test connection, vui lòng chờ...');
    
    // Simulate API call
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate for demo
      
      if (success) {
        alert(`✅ Test connection thành công!\n\n🎯 Nguồn: ${selectedSource}\n📍 Đích đến: ${leadHubSheets.find(s => s.id === selectedDestination)?.name || selectedDestination}\n⏰ Thời gian test: ${new Date().toLocaleString('vi-VN')}\n\n💡 Pipeline sẵn sàng để tạo!`);
      } else {
        alert(`❌ Test connection thất bại!\n\n🔍 Vui lòng kiểm tra:\n• Quyền truy cập nguồn dữ liệu\n• Kết nối mạng\n• Cấu hình đích đến\n\n🔄 Thử lại sau ít phút.`);
      }
    }, 2000);
  };

  const handleSavePipeline = () => {
    if (!selectedSource || !selectedDestination) {
      alert('⚠️ Vui lòng hoàn thành đầy đủ 3 bước:\n\n1️⃣ Chọn nguồn dữ liệu\n2️⃣ Chọn đích đến\n3️⃣ Xem trước mapping');
      return;
    }
    
    // Enhanced success message với pipeline details
    const pipelineName = `Pipeline_${selectedSource}_${Date.now()}`;
    const destinationName = leadHubSheets.find(s => s.id === selectedDestination)?.name || selectedDestination;
    
    alert(`🚀 Pipeline đã được tạo thành công!\n\n📋 Chi tiết Pipeline:\n• Tên: ${pipelineName}\n• Nguồn: ${selectedSource}\n• Đích đến: ${destinationName}\n• Trạng thái: Đang chạy\n• Thời gian tạo: ${new Date().toLocaleString('vi-VN')}\n\n✨ Pipeline sẽ tự động đồng bộ dữ liệu theo thời gian thực!`);
    
    // Log pipeline creation for debugging
    console.log('🚀 New pipeline created:', {
      id: pipelineName,
      source: selectedSource,
      destination: selectedDestination,
      destinationName: destinationName,
      status: 'running',
      createdAt: new Date(),
      fieldMappings: fieldMappings.length
    });
    
    // Reset form với animation feedback
    setSelectedSource('');
    setSelectedAccount('');
    setSelectedForm('');
    setSelectedDestination('');
    setCurrentStep(1);
    
    // Show additional helpful info
    setTimeout(() => {
      alert(`💡 Pipeline "${pipelineName}" đã được thêm vào danh sách "Pipelines đang chạy".\n\nBạn có thể:\n• Theo dõi trạng thái real-time\n• Tạm dừng/tiếp tục pipeline\n• Xem logs và metrics\n• Chỉnh sửa cấu hình`);
    }, 1500);
  };



  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border flex-shrink-0 z-20 bg-gradient-to-r from-background to-accent/20">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center shadow-lg">
              <Workflow className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">DataFlow Management</h1>
              <p className="text-sm text-muted-foreground font-medium">Quản lý pipelines đồng bộ dữ liệu từ nhiều nguồn</p>
            </div>
          </div>
        </div>
        
        {/* Header Icons */}
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onOpenPopup('notes')}
            className="p-3 hover:bg-accent/60 rounded-xl"
            title="Ghi chú"
          >
            <StickyNote className="h-5 w-5 text-primary" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onOpenPopup('notifications')}
            className="p-3 hover:bg-accent/60 rounded-xl"
            title="Thông báo"
          >
            <Bell className="h-5 w-5 text-primary" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onOpenPopup('task')}
            className="p-3 hover:bg-accent/60 rounded-xl"
            title="Quản lý công việc và reminder"
          >
            <ClipboardList className="h-5 w-5 text-primary" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onOpenPopup('support')}
            className="p-3 hover:bg-accent/60 rounded-xl"
            title="Hỗ trợ"
          >
            <HelpCircle className="h-5 w-5 text-primary" />
          </Button>

          {/* User Avatar */}
          <div className="ml-2 pl-2 border-l border-border">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 hover:bg-accent rounded-full"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
                      alt="Nguyễn Văn Admin" 
                    />
                    <AvatarFallback className="text-sm">NA</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={onOpenAccountSettings}>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onOpenBilling}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onOpenInviteTeam}>
                  <Users className="h-4 w-4 mr-2" />
                  Team
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={onLogout}
                  className="text-purple-600 focus:text-purple-600 focus:bg-purple-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content - 3 Columns với thứ tự mới */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-12 gap-4 h-[calc(100vh-140px)] lg:gap-6 xl:gap-8">
          
          {/* Cột chính: Tạo Pipeline mới */}
          <div className="col-span-12 lg:col-span-6 xl:col-span-6 order-1 lg:order-1">
            <div className="bg-card border border-border rounded-lg h-full flex flex-col shadow-sm">
              {/* Header */}
              <div className="p-5 border-b border-border bg-gradient-to-r from-primary/10 to-primary-light/10 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">🚀 Tạo Pipeline mới</h2>
                    <p className="text-sm text-muted-foreground mt-1">Thiết lập đồng bộ dữ liệu từ nguồn đến hệ thống với 3 bước đơn giản</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-lg">
                    <Workflow className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
              </div>

              <ScrollArea className="flex-1 custom-scrollbar">
                <div className="p-6 space-y-6">
                  {/* Progress Steps - Chỉ 3 bước */}
                  <div className="bg-gradient-to-r from-primary/5 to-primary-light/5 rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-between mb-3">
                      {[1, 2, 3].map((step) => (
                        <div key={step} className="flex items-center">
                          <div className={`
                            w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all shadow-sm
                            ${currentStep >= step 
                              ? 'bg-gradient-to-br from-primary to-primary-light text-primary-foreground' 
                              : 'bg-muted text-muted-foreground border border-border'
                            }
                          `}>
                            {currentStep > step ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              step
                            )}
                          </div>
                          {step < 3 && (
                            <div className={`w-16 h-1 mx-3 rounded-full transition-colors
                              ${currentStep > step ? 'bg-gradient-to-r from-primary to-primary-light' : 'bg-muted'}
                            `} />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="text-center">
                      <span className="text-sm font-semibold text-primary">
                        Bước {Math.min(currentStep, 3)}/3: {
                          currentStep === 1 ? '🎯 Chọn nguồn dữ liệu' :
                          currentStep === 2 ? '📍 Chọn đích đến' :
                          '🔄 Mapping & Hoàn tất'
                        }
                      </span>
                    </div>
                  </div>

                  {/* Bước 1: Chọn nguồn dữ liệu */}
                  <div className={`border-2 rounded-xl transition-all shadow-sm ${
                    currentStep === 1 
                      ? 'border-primary bg-gradient-to-br from-primary/10 to-primary-light/5' 
                      : currentStep > 1 
                      ? 'border-green-300 bg-gradient-to-br from-green-50 to-green-100/30' 
                      : 'border-border/50 bg-muted/20'
                  }`}>
                    <div className="p-4 border-b border-border/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-sm ${
                            currentStep > 1 ? 'bg-green-500 text-white' : 'bg-gradient-to-br from-primary to-primary-light text-primary-foreground'
                          }`}>
                            {currentStep > 1 ? '✓' : '1'}
                          </div>
                          <div>
                            <span className="font-semibold text-foreground">🎯 Nguồn dữ liệu</span>
                            <p className="text-xs text-muted-foreground mt-0.5">Chọn nền tảng để lấy leads</p>
                          </div>
                        </div>
                        {currentStep > 1 && selectedSource && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                            {selectedSource}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="p-4">
                      <Select 
                        value={selectedSource} 
                        onValueChange={handleSourceSelection}
                        disabled={currentStep > 1}
                      >
                        <SelectTrigger className={`h-11 transition-all ${
                          currentStep === 1 
                            ? 'border-primary/50 hover:border-primary focus:border-primary shadow-sm' 
                            : 'border-green-200 bg-green-50/30'
                        }`}>
                          <div className="flex items-center gap-2 w-full">
                            {isLoadingAccounts && <RefreshCw className="h-4 w-4 animate-spin text-primary" />}
                            <SelectValue placeholder="🔍 Chọn nguồn dữ liệu..." />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Facebook">
                            <div className="flex items-center gap-3">
                              <Facebook className="h-5 w-5 text-blue-600" />
                              <div>
                                <div className="font-medium">Facebook Lead Ads</div>
                                <div className="text-xs text-muted-foreground">Forms quảng cáo Facebook</div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="TikTok">
                            <div className="flex items-center gap-3">
                              <Chrome className="h-5 w-5 text-black" />
                              <div>
                                <div className="font-medium">TikTok Lead Ads</div>
                                <div className="text-xs text-muted-foreground">Forms quảng cáo TikTok</div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="Zalo">
                            <div className="flex items-center gap-3">
                              <Zap className="h-5 w-5 text-blue-500" />
                              <div>
                                <div className="font-medium">Zalo Lead Ads</div>
                                <div className="text-xs text-muted-foreground">Forms Zalo OA</div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="Landing Page">
                            <div className="flex items-center gap-3">
                              <Globe className="h-5 w-5 text-green-600" />
                              <div>
                                <div className="font-medium">Landing Page/Website</div>
                                <div className="text-xs text-muted-foreground">Forms trên website</div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="Webhook">
                            <div className="flex items-center gap-3">
                              <Zap className="h-5 w-5 text-purple-600" />
                              <div>
                                <div className="font-medium">Webhook API</div>
                                <div className="text-xs text-muted-foreground">API endpoints</div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="CSV">
                            <div className="flex items-center gap-3">
                              <Upload className="h-5 w-5 text-orange-600" />
                              <div>
                                <div className="font-medium">CSV Upload</div>
                                <div className="text-xs text-muted-foreground">Tải file dữ liệu</div>
                              </div>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      {/* Source details */}
                      {selectedSource && currentStep >= 1 && (
                        <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Đã chọn nguồn: <strong className="text-foreground">{selectedSource}</strong></span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bước 2: Chọn đích đến */}
                  <div className={`border-2 rounded-xl transition-all shadow-sm ${
                    currentStep === 2 
                      ? 'border-primary bg-gradient-to-br from-primary/10 to-primary-light/5' 
                      : currentStep > 2 
                      ? 'border-green-300 bg-gradient-to-br from-green-50 to-green-100/30' 
                      : currentStep < 2
                      ? 'border-border/30 bg-muted/20 opacity-60'
                      : 'border-border/50 bg-muted/20'
                  }`}>
                    <div className="p-4 border-b border-border/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-sm ${
                            currentStep > 2 ? 'bg-green-500 text-white' : 
                            currentStep === 2 ? 'bg-gradient-to-br from-primary to-primary-light text-primary-foreground' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {currentStep > 2 ? '✓' : '2'}
                          </div>
                          <div>
                            <span className="font-semibold text-foreground">📍 Đích đến</span>
                            <p className="text-xs text-muted-foreground mt-0.5">Chọn nơi lưu trữ dữ liệu</p>
                          </div>
                        </div>
                        {selectedDestination && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                            Đã chọn
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="p-4">
                      <Select 
                        value={selectedDestination} 
                        onValueChange={(value) => {
                          setSelectedDestination(value);
                          if (value) setCurrentStep(Math.max(currentStep, 3));
                        }}
                        disabled={currentStep < 2}
                      >
                        <SelectTrigger className={`h-11 transition-all ${
                          currentStep === 2 
                            ? 'border-primary/50 hover:border-primary focus:border-primary shadow-sm' 
                            : currentStep < 2
                            ? 'border-border/30 bg-muted/30'
                            : 'border-green-200 bg-green-50/30'
                        }`}>
                          <SelectValue placeholder="🎯 Chọn đích đến..." />
                        </SelectTrigger>
                        <SelectContent>
                          {leadHubSheets.map(sheet => (
                            <SelectItem key={sheet.id} value={sheet.id}>
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                <div>
                                  <div className="font-medium">{sheet.name}</div>
                                  <div className="text-xs text-muted-foreground">Lead Hub</div>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                          <SelectItem value="crm_potential">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <div>
                                <div className="font-medium">CRM - Khách hàng tiềm năng</div>
                                <div className="text-xs text-muted-foreground">Customer Management</div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="crm_main">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <div>
                                <div className="font-medium">CRM - Khách hàng chính</div>
                                <div className="text-xs text-muted-foreground">Customer Management</div>
                              </div>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      {currentStep < 2 && (
                        <div className="mt-3 p-3 bg-muted/50 rounded-lg text-center">
                          <div className="text-sm text-muted-foreground">
                            Chọn nguồn dữ liệu trước
                          </div>
                        </div>
                      )}

                      {/* Destination details */}
                      {selectedDestination && currentStep >= 2 && (
                        <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Đã chọn đích đến: <strong className="text-foreground">
                              {leadHubSheets.find(s => s.id === selectedDestination)?.name || 'CRM'}
                            </strong></span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bước 3: Mapping & Hoàn tất */}
                  <div className={`border-2 rounded-xl transition-all shadow-sm ${
                    currentStep === 3 
                      ? 'border-primary bg-gradient-to-br from-primary/10 to-primary-light/5' 
                      : currentStep > 3 
                      ? 'border-green-300 bg-gradient-to-br from-green-50 to-green-100/30' 
                      : currentStep < 3
                      ? 'border-border/30 bg-muted/20 opacity-60'
                      : 'border-border/50 bg-muted/20'
                  }`}>
                    <div className="p-4 border-b border-border/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-sm ${
                            currentStep > 3 ? 'bg-green-500 text-white' : 
                            currentStep === 3 ? 'bg-gradient-to-br from-primary to-primary-light text-primary-foreground' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {currentStep > 3 ? '✓' : '3'}
                          </div>
                          <div>
                            <span className="font-semibold text-foreground">🔄 Mapping & Hoàn tất</span>
                            <p className="text-xs text-muted-foreground mt-0.5">Xem trước và tạo pipeline</p>
                          </div>
                        </div>
                        {currentStep > 3 && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                            Hoàn thành
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="p-4">
                      {selectedSource && selectedDestination ? (
                        <div className="space-y-4">
                          {/* Field Mapping Preview */}
                          <div className="bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <Settings className="h-4 w-4 text-green-600" />
                              <span className="font-medium text-green-800">Field Mapping Preview</span>
                            </div>
                            <div className="space-y-2">
                              {fieldMappings.slice(0, 4).map((mapping, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-white/80 rounded border border-green-200/50">
                                  <span className="text-xs font-medium text-green-800">{mapping.sourceField}</span>
                                  <ArrowRight className="h-3 w-3 text-green-600" />
                                  <span className="text-xs font-medium text-foreground">{mapping.leadHubField}</span>
                                  {mapping.required && (
                                    <Badge variant="outline" className="text-xs ml-2 border-red-200 text-red-600">Bắt buộc</Badge>
                                  )}
                                </div>
                              ))}
                              {fieldMappings.length > 4 && (
                                <div className="text-xs text-green-600 text-center py-1">
                                  +{fieldMappings.length - 4} trường khác sẽ được tự động mapping...
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Pipeline Summary */}
                          <div className="bg-gradient-to-r from-primary/5 to-primary-light/5 border border-primary/20 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <Workflow className="h-4 w-4 text-primary" />
                              <span className="font-medium text-primary">Pipeline Summary</span>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Nguồn:</span>
                                <span className="font-medium text-foreground">{selectedSource}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Đích đến:</span>
                                <span className="font-medium text-foreground">
                                  {leadHubSheets.find(s => s.id === selectedDestination)?.name || selectedDestination}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Trường mapping:</span>
                                <span className="font-medium text-foreground">{fieldMappings.length} trường</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Trạng thái:</span>
                                <Badge className="bg-green-100 text-green-800">Sẵn sàng tạo</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-3 bg-muted/50 rounded-lg text-center">
                          <div className="text-sm text-muted-foreground">
                            Hoàn thành 2 bước trước để xem mapping
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleTestConnection}
                      disabled={!selectedForm || !selectedDestination}
                      className="flex-1"
                    >
                      <TestTube className="h-4 w-4 mr-2" />
                      Test
                    </Button>
                    <Button 
                      onClick={handleSavePipeline}
                      disabled={!selectedForm || !selectedDestination}
                      size="sm"
                      className="flex-1"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Tạo Pipeline
                    </Button>
                  </div>

                </div>
              </ScrollArea>
            </div>
          </div>

          {/* Cột thứ hai: Nguồn dữ liệu đã kết nối */}
          <div className="col-span-12 lg:col-span-3 xl:col-span-3 order-2 lg:order-2">
            <div className="bg-card border border-border rounded-lg h-full flex flex-col shadow-sm">
              <div className="p-4 border-b border-border bg-muted/30 rounded-t-lg">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-semibold text-foreground">Nguồn dữ liệu đã kết nối</h2>
                  <Button variant="ghost" size="sm" className="hover:bg-secondary/60">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 hover:bg-secondary/50 transition-colors">
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm tài khoản
                  </Button>
                  <Button variant="ghost" size="sm" className="hover:bg-secondary/60">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <ScrollArea className="flex-1 custom-scrollbar">
                <div className="p-3 space-y-3">
                  {['Facebook', 'TikTok', 'Zalo', 'Landing Page', 'Webhook', 'CSV'].map(sourceType => {
                    const sourcesOfType = connectedSources.filter(s => s.type === sourceType);
                    const Icon = getSourceIcon(sourceType);
                    
                    return (
                      <Card key={sourceType} className="border border-border/50 hover:border-border-hover hover:shadow-sm transition-all duration-200">
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-primary" />
                            <CardTitle className="text-xs">{sourceType}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          {sourcesOfType.length > 0 ? (
                            <div className="space-y-2">
                              {sourcesOfType.map(source => (
                                <div key={source.id} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                                  <div className="flex-1 min-w-0">
                                    <div className="text-xs font-medium truncate">{source.accountName}</div>
                                    <div className="text-xs text-muted-foreground">Sync: {source.lastSync}</div>
                                  </div>
                                  <Badge className={`text-xs ml-2 ${getStatusColor(source.status)}`}>
                                    {source.status === 'connected' ? 'Kết nối' : 'Ngắt'}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-2">
                              <p className="text-xs text-muted-foreground mb-2">
                                Chưa có tài khoản {sourceType}
                              </p>
                              <Button variant="outline" size="sm" className="text-xs">
                                Cấp quyền
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* Cột thứ ba: Pipelines đang chạy */}
          <div className="col-span-12 lg:col-span-3 xl:col-span-3 order-3 lg:order-3">
            <div className="bg-card border border-border rounded-lg h-full flex flex-col shadow-sm">
              <div className="p-4 border-b border-border bg-muted/30 rounded-t-lg">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-semibold text-foreground">Pipelines đang chạy</h2>
                  <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">{filteredPipelines.length}</Badge>
                </div>
                
                {/* Search and Filter */}
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                    <Input
                      placeholder="Tìm kiếm..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-7 h-8 text-xs border-border/50 focus:border-primary transition-colors"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0 hover:bg-secondary/50 transition-colors">
                    <Filter className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Pipelines List - Compact */}
              <ScrollArea className="flex-1 custom-scrollbar">
                <div className="p-3 space-y-2">
                  {filteredPipelines.map((pipeline) => (
                    <Card key={pipeline.id} className="border border-border/50 hover:border-border-hover hover:shadow-sm transition-all duration-200">
                      <CardContent className="p-3">
                        <div className="space-y-2">
                          {/* Header */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
                                {React.createElement(getSourceIcon(pipeline.sourceType), { className: "h-3 w-3 text-primary" })}
                              </div>
                              <div className="min-w-0">
                                <div className="text-xs font-medium truncate">{pipeline.sourceName}</div>
                                <div className="text-xs text-muted-foreground">{pipeline.sourceType}</div>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <MoreVertical className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Settings className="h-3 w-3 mr-2" />
                                  Cấu hình
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  {pipeline.status === 'running' ? (
                                    <>
                                      <Pause className="h-3 w-3 mr-2" />
                                      Tạm dừng
                                    </>
                                  ) : (
                                    <>
                                      <Play className="h-3 w-3 mr-2" />
                                      Tiếp tục
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <TestTube className="h-3 w-3 mr-2" />
                                  Test
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          {/* Details */}
                          <div className="space-y-1">
                            <div className="text-xs text-muted-foreground">
                              Form: <span className="text-foreground">{pipeline.formName}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Đến: <span className="text-foreground">{pipeline.destination}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                {pipeline.status === 'running' ? (
                                  <CheckCircle className="h-3 w-3 text-green-600" />
                                ) : (
                                  <Pause className="h-3 w-3 text-yellow-600" />
                                )}
                                <Badge className={`${getStatusColor(pipeline.status)} text-xs`}>
                                  {pipeline.status === 'running' ? 'Chạy' : 'Dừng'}
                                </Badge>
                              </div>
                              <div className="text-xs font-medium text-primary">{pipeline.leadsCount} leads</div>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Sync: {pipeline.lastSync}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {filteredPipelines.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <Workflow className="h-12 w-12 text-muted-foreground/50 mb-3" />
                      <h3 className="font-medium text-muted-foreground text-sm mb-1">
                        {searchTerm ? 'Không tìm thấy' : 'Chưa có pipeline'}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {searchTerm ? 'Thử từ khóa khác' : 'Tạo pipeline đầu tiên'}
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}