import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  Plus, 
  Settings, 
  CheckCircle, 
  AlertCircle, 
  Search,
  Filter,
  TestTube,
  Eye,
  MoreVertical,
  RefreshCw,
  Facebook,
  Chrome,
  Zap,
  ExternalLink,
  Shield,
  Activity,
  Link,
  TrendingUp,
  StickyNote,
  Bell,
  HelpCircle,
  ClipboardList,
  User,
  CreditCard,
  Users,
  LogOut
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

// Mock data for integration sources
const integrationSources = [
  {
    id: 'facebook_ads',
    type: 'Facebook',
    subType: 'Ads',
    name: 'Facebook Ads',
    description: 'Kết nối Facebook Lead Ads để đồng bộ lead',
    icon: Facebook,
    color: '#1877F2',
    accounts: [
      {
        id: 'fb_ads_001',
        name: 'Tài khoản Facebook Ads Chính',
        accountId: '1234567890',
        status: 'connected',
        lastSync: '2024-12-25 10:30',
        formsCount: 3,
        leadsCount: 156
      },
      {
        id: 'fb_ads_002',
        name: 'Tài khoản Facebook Ads Phụ',
        accountId: '0987654321',
        status: 'connected',
        lastSync: '2024-12-25 09:15',
        formsCount: 2,
        leadsCount: 89
      }
    ]
  },
  {
    id: 'facebook_dataset',
    type: 'Facebook',
    subType: 'Data Set',
    name: 'Facebook Data Set',
    description: 'Kết nối Facebook Custom Audience để import dữ liệu',
    icon: Facebook,
    color: '#1877F2',
    accounts: [
      {
        id: 'fb_data_001',
        name: 'Facebook Business Manager',
        accountId: 'bm_1234567890',
        status: 'connected',
        lastSync: '2024-12-25 08:45',
        audiencesCount: 5,
        recordsCount: 2450
      }
    ]
  },
  {
    id: 'tiktok_ads',
    type: 'TikTok',
    subType: 'Ads',
    name: 'TikTok Ads',
    description: 'Kết nối TikTok Lead Generation để đồng bộ lead',
    icon: Chrome,
    color: '#000000',
    accounts: [
      {
        id: 'tt_ads_001',
        name: 'TikTok Business Account',
        accountId: 'tt_1234567890',
        status: 'connected',
        lastSync: '2024-12-25 11:00',
        formsCount: 2,
        leadsCount: 78
      }
    ]
  },
  {
    id: 'tiktok_dataset',
    type: 'TikTok',
    subType: 'Data Set',
    name: 'TikTok Data Set',
    description: 'Kết nối TikTok Audience để import dữ liệu',
    icon: Chrome,
    color: '#000000',
    accounts: []
  },
  {
    id: 'google_ads',
    type: 'Google',
    subType: 'Ads',
    name: 'Google Ads',
    description: 'Kết nối Google Lead Form Extensions để đồng bộ lead',
    icon: Chrome,
    color: '#4285F4',
    accounts: [
      {
        id: 'goog_ads_001',
        name: 'Google Ads Account',
        accountId: 'gads_1234567890',
        status: 'error',
        lastSync: '2024-12-24 15:20',
        formsCount: 1,
        leadsCount: 45,
        error: 'Token expired'
      }
    ]
  },
  {
    id: 'google_dataset',
    type: 'Google',
    subType: 'Data Set',
    name: 'Google Data Set',
    description: 'Kết nối Google Analytics và Sheets để import dữ liệu',
    icon: Chrome,
    color: '#4285F4',
    accounts: []
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'connected': return 'bg-green-100 text-green-800';
    case 'error': return 'bg-red-100 text-red-800';
    case 'disconnected': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'connected': return CheckCircle;
    case 'error': return AlertCircle;
    default: return AlertCircle;
  }
};

interface IntegrationDashboardProps {
  onOpenPopup?: (popup: string) => void;
  onOpenAccountSettings?: () => void;
  onOpenBilling?: () => void;
  onOpenInviteTeam?: () => void;
  onLogout?: () => void;
}

export function IntegrationDashboard({
  onOpenPopup = () => {},
  onOpenAccountSettings = () => {},
  onOpenBilling = () => {},
  onOpenInviteTeam = () => {},
  onLogout = () => {}
}: IntegrationDashboardProps = {}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');

  // Filter sources based on search and type
  const filteredSources = integrationSources.filter(source => {
    const matchesSearch = source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         source.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || source.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleTestConnection = (accountId: string, accountName: string) => {
    alert(`Đang test connection cho "${accountName}"...\n\nTrạng thái: ✅ Kết nối thành công`);
  };

  const handleViewStatus = (accountId: string, accountName: string) => {
    alert(`Chi tiết trạng thái kết nối cho "${accountName}":\n\n✅ API Status: Active\n🔄 Last Sync: Thành công\n📊 Rate Limit: 95% available\n⏰ Token Expiry: 30 ngày`);
  };

  const handleAddAccount = (sourceType: string, subType: string) => {
    alert(`Đang mở popup cấp quyền tích hợp cho ${sourceType} ${subType}...\n\nBạn sẽ được chuyển đến trang xác thực của ${sourceType}.`);
  };

  const handleRefreshAll = () => {
    alert('Đang đồng bộ lại tất cả kết nối...\n\n✅ Refreshed 6 connections\n📊 Updated 324 records');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border flex-shrink-0 z-20 bg-gradient-to-r from-background to-accent/20">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center shadow-lg">
              <Link className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Integration Management</h1>
              <p className="text-sm text-muted-foreground font-medium">Quản lý kết nối với các nguồn dữ liệu bên ngoài</p>
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

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header Controls */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm nguồn tích hợp..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 border-border/50 focus:border-primary transition-colors"
            />
          </div>
          
          {/* Platform Filter */}
          <div className="flex items-center gap-2">
            <Button 
              variant={selectedType === '' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setSelectedType('')}
              className="transition-colors"
            >
              Tất cả
            </Button>
            {['Facebook', 'TikTok', 'Google'].map(type => (
              <Button 
                key={type}
                variant={selectedType === type ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setSelectedType(selectedType === type ? '' : type)}
                className="transition-colors"
              >
                {type}
              </Button>
            ))}
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2 ml-auto">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRefreshAll}
              className="hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Đồng bộ tất cả
            </Button>
            <Button 
              variant="default" 
              size="sm"
              className="bg-primary hover:bg-primary-hover"
            >
              <Plus className="h-4 w-4 mr-2" />
              Thêm tích hợp
            </Button>
          </div>
        </div>

        {/* Integration Sources Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSources.map((source) => {
            const Icon = source.icon;
            const totalAccounts = source.accounts.length;
            const connectedAccounts = source.accounts.filter(acc => acc.status === 'connected').length;
            
            return (
              <Card key={source.id} className="border border-border/50 hover:border-border-hover hover:shadow-md transition-all duration-200">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${source.color}15` }}>
                        <Icon className="h-6 w-6" style={{ color: source.color }} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{source.name}</CardTitle>
                        <CardDescription className="text-sm">{source.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {source.subType}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Connection Status Summary */}
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Trạng thái kết nối</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-primary">{connectedAccounts}</span>
                      <span className="text-muted-foreground">/{totalAccounts} tài khoản</span>
                    </div>
                  </div>

                  {/* Account List - Simplified */}
                  {source.accounts.length > 0 ? (
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-foreground">Tài khoản đã kết nối</h4>
                      <div className="space-y-2">
                        {source.accounts.map(account => {
                          const StatusIcon = getStatusIcon(account.status);
                          return (
                            <div key={account.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg border border-border/20 hover:border-border/40 transition-all duration-200">
                              <div className="flex items-center gap-3">
                                <StatusIcon className={`h-4 w-4 ${account.status === 'connected' ? 'text-green-600' : 'text-red-600'}`} />
                                <div>
                                  <div className="text-sm font-medium text-foreground">{account.name}</div>
                                  {account.error && (
                                    <div className="text-xs text-red-600 mt-0.5">⚠️ {account.error}</div>
                                  )}
                                </div>
                              </div>
                              <Badge className={`text-xs ${getStatusColor(account.status)}`}>
                                {account.status === 'connected' ? 'Đã kết nối' : account.status === 'error' ? 'Lỗi' : 'Ngắt kết nối'}
                              </Badge>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 px-4 bg-muted/10 border border-border/30 border-dashed rounded-lg">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-muted/30 flex items-center justify-center">
                        <Link className="h-6 w-6 text-muted-foreground/60" />
                      </div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Chưa có tài khoản {source.name}
                      </p>
                      <p className="text-xs text-muted-foreground/70 mb-4">
                        Kết nối tài khoản để bắt đầu đồng bộ dữ liệu
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    {source.accounts.length > 0 ? (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 hover:bg-secondary/80 transition-colors"
                          onClick={() => handleAddAccount(source.type, source.subType)}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Thêm tài khoản
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="hover:bg-muted/60"
                          onClick={handleRefreshAll}
                          title="Đồng bộ lại tất cả"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="hover:bg-muted/60">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Settings className="h-4 w-4 mr-2" />
                              Cấu hình chung
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <TestTube className="h-4 w-4 mr-2" />
                              Test tất cả kết nối
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Xem logs đồng bộ
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </>
                    ) : (
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleAddAccount(source.type, source.subType)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Cấp quyền tích hợp
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredSources.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Zap className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="font-medium text-muted-foreground mb-2">
              {searchTerm ? 'Không tìm thấy nguồn tích hợp' : 'Chưa có nguồn tích hợp nào'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {searchTerm ? 'Thử thay đổi từ khóa tìm kiếm' : 'Bắt đầu bằng cách thêm tích hợp đầu tiên'}
            </p>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border border-border/50 hover:border-border-hover transition-colors">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center">
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">{integrationSources.reduce((acc, source) => acc + source.accounts.length, 0)}</p>
              <p className="text-xs text-muted-foreground">Tổng kết nối</p>
            </CardContent>
          </Card>
          
          <Card className="border border-border/50 hover:border-border-hover transition-colors">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 mx-auto mb-2 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-600">{integrationSources.reduce((acc, source) => acc + source.accounts.filter(a => a.status === 'connected').length, 0)}</p>
              <p className="text-xs text-muted-foreground">Hoạt động</p>
            </CardContent>
          </Card>

          <Card className="border border-border/50 hover:border-border-hover transition-colors">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 mx-auto mb-2 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-red-600">{integrationSources.reduce((acc, source) => acc + source.accounts.filter(a => a.status === 'error').length, 0)}</p>
              <p className="text-xs text-muted-foreground">Lỗi</p>
            </CardContent>
          </Card>

          <Card className="border border-border/50 hover:border-border-hover transition-colors">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-600">{integrationSources.reduce((acc, source) => acc + source.accounts.reduce((subAcc, account) => subAcc + (account.leadsCount || 0), 0), 0)}</p>
              <p className="text-xs text-muted-foreground">Leads nhận</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}