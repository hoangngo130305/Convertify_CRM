import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  Settings, 
  FileUp,
  Upload,
  Search,
  Filter,
  MoreVertical,
  RefreshCw,
  Database,
  Bell,
  Eye,
  Plus,
  StickyNote,
  HelpCircle,
  ClipboardList,
  User,
  CreditCard,
  Users,
  LogOut,
  Globe,
  Clock,
  MoreHorizontal,
  Edit,
  Copy,
  Trash2
} from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Switch } from './ui/switch';
import { SetRulePopupFixed } from './SetRulePopupFixed';

// Mock data for custom audiences
const mockCustomAudiences = [
  {
    id: 'audience_001',
    name: 'CRM Hot Leads',
    type: 'Auto',
    totalLeads: 1245,
    goodLeads: 1058,
    badLeads: 187,
    platforms: ['Facebook', 'Google'],
    status: true,
    lastUpload: '2024-12-25 10:30',
    source: 'crm',
    rules: ['Hot/Nóng', 'Warm/Ấm']
  },
  {
    id: 'audience_002', 
    name: 'Lead Hub Premium',
    type: 'Auto',
    totalLeads: 856,
    goodLeads: 788,
    badLeads: 68,
    platforms: ['TikTok', 'Facebook'],
    status: true,
    lastUpload: '2024-12-25 09:15',
    source: 'leadhub',
    rules: ['Hot/Nóng', 'Warm/Ấm']
  },
  {
    id: 'audience_003',
    name: 'Bad Data Cleanup',
    type: 'Auto',
    totalLeads: 340,
    goodLeads: 0,
    badLeads: 340,
    platforms: ['Google'],
    status: false,
    lastUpload: '2024-12-24 15:20',
    source: 'bad-data',
    rules: ['Cold/Lạnh']
  },
  {
    id: 'audience_004',
    name: 'Manual Upload Test',
    type: 'Manual',
    totalLeads: 150,
    goodLeads: 89,
    badLeads: 61,
    platforms: ['Facebook', 'Google'],
    status: true,
    lastUpload: '2024-12-25 08:45',
    source: 'manual',
    rules: ['Email & Phone only']
  }
];

// Mock Lead Ads Auto API data
const mockLeadAdsAPI = [
  {
    id: 'api_001',
    platform: 'Facebook',
    totalLeads: 3420,
    goodLeads: 2736,
    badLeads: 684,
    status: true,
    timeUpload: '2024-12-25 11:15',
    realtimeSync: true
  },
  {
    id: 'api_002',
    platform: 'Google',
    totalLeads: 2156,
    goodLeads: 1940,
    badLeads: 216,
    status: true,
    timeUpload: '2024-12-25 11:10',
    realtimeSync: true
  },
  {
    id: 'api_003',
    platform: 'TikTok',
    totalLeads: 1876,
    goodLeads: 1313,
    badLeads: 563,
    status: false,
    timeUpload: '2024-12-24 18:30',
    realtimeSync: false
  },
  {
    id: 'api_004',
    platform: 'Zalo',
    totalLeads: 567,
    goodLeads: 454,
    badLeads: 113,
    status: true,
    timeUpload: '2024-12-25 10:55',
    realtimeSync: true
  }
];

interface DataSetDashboardProps {
  onOpenPopup?: (popup: string) => void;
  onOpenAccountSettings?: () => void;
  onOpenBilling?: () => void;
  onOpenInviteTeam?: () => void;
  onLogout?: () => void;
}

export function DataSetDashboard({
  onOpenPopup = () => {},
  onOpenAccountSettings = () => {},
  onOpenBilling = () => {},
  onOpenInviteTeam = () => {},
  onLogout = () => {}
}: DataSetDashboardProps = {}) {
  const [customAudiences, setCustomAudiences] = useState(mockCustomAudiences);
  const [savedRules, setSavedRules] = useState<any[]>([
    {
      id: 'rule_001',
      name: 'CRM Hot Leads Auto Upload',
      sources: ['crm'],
      quality: 'good',
      customFilters: [
        { id: 'filter_1', columnId: 'source', operator: 'bằng', value: 'Facebook' }
      ],
      destinations: ['facebook', 'google'],
      frequency: 'daily',
      createdAt: new Date('2024-12-20'),
      isActive: true
    },
    {
      id: 'rule_002', 
      name: 'Lead Hub Premium Upload',
      sources: ['leadhub'],
      quality: 'good',
      customFilters: [],
      destinations: ['facebook', 'tiktok'],
      frequency: 'weekly',
      createdAt: new Date('2024-12-18'),
      isActive: true
    }
  ]);
  const [leadAdsAPI, setLeadAdsAPI] = useState(mockLeadAdsAPI);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSetRulePopup, setShowSetRulePopup] = useState(false);
  const [activeTab, setActiveTab] = useState<'audiences' | 'api' | 'rules'>('audiences');

  // Custom Audience handlers
  const handleSaveAutoRule = (rule: any) => {
    console.log('📊 Received rule data:', rule);
    
    // Calculate data tốt và data xấu based on source and quality
    let totalLeads = 0;
    let goodLeads = 0;
    let badLeads = 0;
    let source = 'manual';

    // Determine source based on selected sources
    if (rule.sources && rule.sources.length > 0) {
      if (rule.sources.includes('crm') && rule.sources.includes('leadhub')) {
        source = 'crm+leadhub';
        totalLeads = Math.floor(Math.random() * 2000) + 800;
      } else if (rule.sources.includes('crm')) {
        source = 'crm';
        totalLeads = Math.floor(Math.random() * 1500) + 500;
      } else if (rule.sources.includes('leadhub')) {
        source = 'leadhub';
        totalLeads = Math.floor(Math.random() * 1200) + 400;
      } else if (rule.sources.includes('bad-data')) {
        source = 'bad-data';
        totalLeads = Math.floor(Math.random() * 500) + 200;
      }
    }

    // Calculate good/bad leads based on data quality rules
    if (rule.quality === 'good') {
      // Data tốt: Hot/Nóng, Warm/Ấm from CRM + Lead Hub
      goodLeads = Math.floor(totalLeads * 0.85);
      badLeads = totalLeads - goodLeads;
    } else if (rule.quality === 'bad') {
      // Data xấu: Cold/Lạnh from all sources
      badLeads = totalLeads;
      goodLeads = 0;
    } else {
      // Mixed data
      goodLeads = Math.floor(totalLeads * 0.65);
      badLeads = totalLeads - goodLeads;
    }

    // Create platforms array from destinations
    const platforms = rule.destinations?.map((d: string) => {
      switch(d) {
        case 'facebook': return 'Facebook';
        case 'google': return 'Google';
        case 'tiktok': return 'TikTok';
        case 'zalo': return 'Zalo';
        default: return d;
      }
    }) || [];

    // Create rule description based on filters
    const ruleDescriptions = [];
    if (rule.quality === 'good') {
      ruleDescriptions.push('Data Tốt (Hot/Nóng, Warm/Ấm)');
    } else if (rule.quality === 'bad') {
      ruleDescriptions.push('Data Xấu (Cold/Lạnh)');
    }
    
    // Add custom filter descriptions
    if (rule.customFilters && rule.customFilters.length > 0) {
      rule.customFilters.forEach((filter: any) => {
        if (filter.columnId && filter.operator && filter.value) {
          ruleDescriptions.push(`${filter.columnId} ${filter.operator} "${filter.value}"`);
        }
      });
    }

    const newAudience = {
      id: `audience_${Date.now()}`,
      name: rule.name || `Custom Audience ${Date.now()}`,
      type: 'Auto',
      totalLeads,
      goodLeads,
      badLeads,
      platforms,
      status: true,
      lastUpload: new Date().toLocaleString('vi-VN'),
      source,
      rules: ruleDescriptions.length > 0 ? ruleDescriptions : ['Auto Upload Rule'],
      frequency: rule.frequency || 'daily',
      sourcesCount: rule.sources?.length || 0,
      filtersCount: (rule.customFilters?.length || 0) + 1, // +1 for quality filter
      createdAt: rule.createdAt || new Date()
    };
    
    console.log('✅ Created new audience:', newAudience);
    setCustomAudiences(prev => [newAudience, ...prev]);
    
    // Also save the rule for future reference
    setSavedRules(prev => [rule, ...prev]);
    console.log('📝 Saved rule:', rule);
    
    // Show success notification with detailed info
    const sourceNames = rule.sources?.map((id: string) => {
      const sourceMap: any = {
        'crm': 'CRM',
        'leadhub': 'Lead Hub', 
        'bad-data': 'Data Xấu/Rác'
      };
      return sourceMap[id] || id;
    }).join(', ') || 'Unknown';
    
    const qualityName = rule.quality === 'good' ? 'Data Tốt' : rule.quality === 'bad' ? 'Data Xấu' : 'Mixed';
    const freqName = rule.frequency === 'daily' ? 'Hàng ngày' : rule.frequency === 'weekly' ? 'Hàng tuần' : rule.frequency === 'monthly' ? 'Hàng tháng' : 'Thủ công';
    
    setTimeout(() => {
      alert(`🎉 Tạo Custom Audience thành công!\n\n📊 Tên: ${newAudience.name}\n📂 Nguồn: ${sourceNames}\n🎯 Chất lượng: ${qualityName}\n📤 Platforms: ${platforms.join(', ')}\n⏰ Tần suất: ${freqName}\n📈 Tổng leads: ${totalLeads.toLocaleString('vi-VN')}\n✅ Data tốt: ${goodLeads.toLocaleString('vi-VN')}\n❌ Data xấu: ${badLeads.toLocaleString('vi-VN')}\n🔧 Filters: ${newAudience.filtersCount}`);
    }, 300);
  };

  const handleToggleAudienceStatus = (audienceId: string) => {
    setCustomAudiences(prev => prev.map(audience => 
      audience.id === audienceId 
        ? { ...audience, status: !audience.status }
        : audience
    ));
  };

  const handleToggleAPIStatus = (apiId: string) => {
    setLeadAdsAPI(prev => prev.map(api => 
      api.id === apiId 
        ? { ...api, status: !api.status, timeUpload: api.status ? api.timeUpload : new Date().toISOString() }
        : api
    ));
  };

  const handleManualUpload = () => {
    alert('🚀 Manual Upload\n\nChức năng này cho phép:\n📧 Upload chỉ Email và SĐT\n📂 Import từ file Excel/CSV\n📋 Chọn list từ Lead Hub\n\n💡 Lưu ý: Upload sẽ thêm data mới (không thay thế)');
  };

  const handleUploadNow = (audienceId: string) => {
    const audience = customAudiences.find(d => d.id === audienceId);
    if (!audience) return;
    
    // Simulate upload process with + thêm logic
    const additionalLeads = Math.floor(Math.random() * 200) + 50;
    const additionalGood = Math.floor(additionalLeads * 0.7);
    const additionalBad = additionalLeads - additionalGood;
    
    alert(`🚀 Upload ngay - Thêm data mới\n\n📊 Data hiện tại: ${audience.totalLeads.toLocaleString()}\n➕ Thêm mới: ${additionalLeads.toLocaleString()}\n📈 Tổng sau upload: ${(audience.totalLeads + additionalLeads).toLocaleString()}\n🎯 Platforms: ${audience.platforms.join(', ')}\n⏰ Thời gian: ${new Date().toLocaleString('vi-VN')}`);
    
    // Update with additional data (not replace)
    setCustomAudiences(prev => prev.map(d => 
      d.id === audienceId 
        ? { 
            ...d, 
            totalLeads: d.totalLeads + additionalLeads,
            goodLeads: d.goodLeads + additionalGood,
            badLeads: d.badLeads + additionalBad,
            lastUpload: new Date().toISOString() 
          }
        : d
    ));
  };

  const handleViewDetails = (audienceId: string) => {
    const audience = customAudiences.find(d => d.id === audienceId);
    if (!audience) return;
    
    const goodRate = audience.totalLeads > 0 ? ((audience.goodLeads / audience.totalLeads) * 100).toFixed(1) : '0';
    const badRate = audience.totalLeads > 0 ? ((audience.badLeads / audience.totalLeads) * 100).toFixed(1) : '0';
    
    alert(`📊 Chi tiết Custom Audience: ${audience.name}\n\n🏷️ Loại: ${audience.type}\n📈 Tổng leads: ${audience.totalLeads.toLocaleString()}\n✅ Good Leads: ${audience.goodLeads.toLocaleString()} (${goodRate}%)\n❌ Bad Leads: ${audience.badLeads.toLocaleString()} (${badRate}%)\n🎯 Platforms: ${audience.platforms.join(', ')}\n🔄 Trạng thái: ${audience.status ? 'Hoạt động' : 'Tạm dừng'}\n⏰ Upload cuối: ${audience.lastUpload ? new Date(audience.lastUpload).toLocaleString('vi-VN') : 'Chưa upload'}\n📍 Nguồn: ${audience.source}\n📋 Rules: ${audience.rules.join(', ')}`);
  };

  const handleDeleteAudience = (audienceId: string) => {
    const audience = customAudiences.find(d => d.id === audienceId);
    if (!audience) return;
    
    if (confirm(`⚠️ Bạn có chắc chắn muốn xóa custom audience "${audience.name}"?\n\nViệc này sẽ xóa vĩnh viễn audience và không thể khôi phục.`)) {
      setCustomAudiences(prev => prev.filter(d => d.id !== audienceId));
      alert(`✅ Đã xóa custom audience "${audience.name}" thành công!`);
    }
  };

  const handleViewAPIDetails = (apiId: string) => {
    const api = leadAdsAPI.find(a => a.id === apiId);
    if (!api) return;
    
    const goodRate = api.totalLeads > 0 ? ((api.goodLeads / api.totalLeads) * 100).toFixed(1) : '0';
    const badRate = api.totalLeads > 0 ? ((api.badLeads / api.totalLeads) * 100).toFixed(1) : '0';
    
    alert(`📊 Chi tiết Lead Ads API: ${api.platform}\n\n📈 Total Leads: ${api.totalLeads.toLocaleString()}\n✅ Good Leads: ${api.goodLeads.toLocaleString()} (${goodRate}%)\n❌ Bad Leads: ${api.badLeads.toLocaleString()} (${badRate}%)\n🔄 Trạng thái: ${api.status ? 'ON' : 'OFF'}\n⏰ Time Upload: ${new Date(api.timeUpload).toLocaleString('vi-VN')}\n🔄 Realtime Sync: ${api.realtimeSync ? 'Có' : 'Không'}`);
  };

  // Filter based on active tab and search
  const filteredAudiences = customAudiences.filter(audience =>
    audience.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    audience.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    audience.platforms?.some(platform => platform?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    audience.source?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAPIs = leadAdsAPI.filter(api =>
    api.platform?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAudienceTypeIcon = (type: string) => {
    return type === 'Auto' ? Settings : FileUp;
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Facebook': return '📘';
      case 'Google': return '🔍';
      case 'TikTok': return '🎵';
      case 'Zalo': return '💬';
      default: return '🌐';
    }
  };

  const getSourceBadgeColor = (source: string) => {
    switch (source) {
      case 'crm': return 'bg-blue-100 text-blue-800';
      case 'leadhub': return 'bg-green-100 text-green-800';
      case 'bad-data': return 'bg-red-100 text-red-800';
      case 'manual': return 'bg-purple-100 text-purple-800';
      case 'crm+leadhub': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSourceLabel = (source: string) => {
    switch (source) {
      case 'crm': return 'CRM';
      case 'leadhub': return 'Lead Hub';
      case 'bad-data': return 'Data Xấu';
      case 'manual': return 'Manual';
      case 'crm+leadhub': return 'CRM + Lead Hub';
      default: return source;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border flex-shrink-0 z-20 bg-gradient-to-r from-background to-accent/20">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center shadow-lg">
              <Database className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Data Set Management</h1>
              <p className="text-sm text-muted-foreground font-medium">Quản lý Custom Audience và Lead Ads API</p>
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
        <div className="space-y-6 h-[calc(100vh-180px)]">
          {/* Upload Cards */}
          <div className="grid grid-cols-2 gap-6">
            {/* Auto Upload Card */}
            <Card className="border-border/50 hover:border-border-hover hover:shadow-md transition-all duration-200">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Settings className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Set Auto Upload Rule</CardTitle>
                    <CardDescription>
                      Đổ dữ liệu từ CRM và Lead Hub với bộ lọc tùy biến
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => setShowSetRulePopup(true)}
                  className="w-full bg-primary hover:bg-primary-hover transition-colors"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Set Rule
                </Button>
              </CardContent>
            </Card>

            {/* Manual Upload Card */}
            <Card className="border-border/50 hover:border-border-hover hover:shadow-md transition-all duration-200">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/50 flex items-center justify-center">
                    <FileUp className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Manual Upload</CardTitle>
                    <CardDescription>
                      Upload chỉ Email và SĐT từ file Excel/CSV hoặc Lead Hub (thêm data mới)
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline"
                  onClick={handleManualUpload}
                  className="w-full hover:bg-secondary/50 transition-colors"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload now
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Table */}
          <Card className="border-border/50 flex-1 flex flex-col">
            <CardHeader className="pb-4 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Data Management</CardTitle>
                  <CardDescription>
                    Quản lý Custom Audience và Lead Ads API
                  </CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  {/* Tab Switch - Reordered: Custom Audience → Lead Ads API → Saved Rules */}
                  <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
                    <Button
                      variant={activeTab === 'audiences' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setActiveTab('audiences')}
                      className="text-xs px-2"
                    >
                      Custom Audience ({filteredAudiences.length})
                    </Button>
                    <Button
                      variant={activeTab === 'api' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setActiveTab('api')}
                      className="text-xs px-2"
                    >
                      Lead Ads API ({filteredAPIs.length})
                    </Button>
                    <Button
                      variant={activeTab === 'rules' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setActiveTab('rules')}
                      className="text-xs px-2"
                    >
                      Saved Rules ({savedRules.length})
                    </Button>
                  </div>
                  <Button variant="outline" size="sm">
                    <Bell className="h-4 w-4 mr-2" />
                    Notification
                  </Button>
                </div>
              </div>

              {/* Search */}
              <div className="flex items-center gap-2 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={
                      activeTab === 'audiences' ? 'Tìm kiếm Custom Audience...' : 
                      activeTab === 'api' ? 'Tìm kiếm Lead Ads API...' : 'Tìm kiếm Saved Rules...'
                    }
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 border-border/50 focus:border-primary transition-colors"
                  />
                </div>
                <Button variant="outline" size="sm" className="hover:bg-secondary/50 transition-colors">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <div className="flex-1 overflow-auto custom-scrollbar">
              {activeTab === 'audiences' ? (
                <Table>
                  <TableHeader className="sticky top-0 bg-muted/50 z-10">
                    <TableRow>
                      <TableHead>Custom Audience</TableHead>
                      <TableHead>Nguồn</TableHead>
                      <TableHead>Total Leads</TableHead>
                      <TableHead>Good Leads</TableHead>
                      <TableHead>Bad Leads</TableHead>
                      <TableHead>Platforms</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Upload</TableHead>
                      <TableHead className="w-12">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAudiences.map((audience) => (
                      <TableRow key={audience.id} className="hover:bg-muted/30">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                              {React.createElement(getAudienceTypeIcon(audience.type), { 
                                className: "h-4 w-4 text-primary" 
                              })}
                            </div>
                            <div>
                              <div className="font-medium text-sm">{audience.name}</div>
                              <Badge variant={audience.type === 'Auto' ? 'default' : 'secondary'} className="text-xs mt-1">
                                {audience.type}
                              </Badge>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getSourceBadgeColor(audience.source)}`}
                          >
                            {getSourceLabel(audience.source)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{audience.totalLeads.toLocaleString()}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="text-sm font-medium text-green-600">{audience.goodLeads.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">
                              ({audience.totalLeads > 0 ? ((audience.goodLeads / audience.totalLeads) * 100).toFixed(1) : '0'}%)
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="text-sm font-medium text-red-600">{audience.badLeads.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">
                              ({audience.totalLeads > 0 ? ((audience.badLeads / audience.totalLeads) * 100).toFixed(1) : '0'}%)
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {audience.platforms.slice(0, 3).map((platform, index) => (
                              <div
                                key={index}
                                className="w-6 h-6 rounded bg-muted flex items-center justify-center text-xs"
                                title={platform}
                              >
                                {getPlatformIcon(platform)}
                              </div>
                            ))}
                            {audience.platforms.length > 3 && (
                              <span className="text-xs text-muted-foreground">
                                +{audience.platforms.length - 3}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={audience.status}
                              onCheckedChange={() => handleToggleAudienceStatus(audience.id)}
                            />
                            <span className={`text-xs ${audience.status ? 'text-green-600' : 'text-muted-foreground'}`}>
                              {audience.status ? 'ON' : 'OFF'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foreground">
                            {new Date(audience.lastUpload).toLocaleString('vi-VN')}
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewDetails(audience.id)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUploadNow(audience.id)}>
                                <Upload className="h-4 w-4 mr-2" />
                                Upload Now
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDeleteAudience(audience.id)} className="text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : activeTab === 'api' ? (
                <Table>
                  <TableHeader className="sticky top-0 bg-muted/50 z-10">
                    <TableRow>
                      <TableHead>Nền tảng</TableHead>
                      <TableHead>Total Leads</TableHead>
                      <TableHead>Good Leads</TableHead>
                      <TableHead>Bad Leads</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Time Upload</TableHead>
                      <TableHead className="w-12">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAPIs.map((api) => (
                      <TableRow key={api.id} className="hover:bg-muted/30">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                              {getPlatformIcon(api.platform)}
                            </div>
                            <div>
                              <div className="font-medium text-sm">{api.platform}</div>
                              <Badge variant={api.realtimeSync ? 'default' : 'secondary'} className="text-xs mt-1">
                                {api.realtimeSync ? 'Realtime' : 'Manual'}
                              </Badge>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{api.totalLeads.toLocaleString()}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="text-sm font-medium text-green-600">{api.goodLeads.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">
                              ({api.totalLeads > 0 ? ((api.goodLeads / api.totalLeads) * 100).toFixed(1) : '0'}%)
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="text-sm font-medium text-red-600">{api.badLeads.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">
                              ({api.totalLeads > 0 ? ((api.badLeads / api.totalLeads) * 100).toFixed(1) : '0'}%)
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={api.status}
                              onCheckedChange={() => handleToggleAPIStatus(api.id)}
                            />
                            <span className={`text-xs ${api.status ? 'text-green-600' : 'text-muted-foreground'}`}>
                              {api.status ? 'ON' : 'OFF'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foreground">
                            {new Date(api.timeUpload).toLocaleString('vi-VN')}
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewAPIDetails(api.id)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Sync Now
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Settings className="h-4 w-4 mr-2" />
                                Cấu hình API
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/50">
                      <TableHead>Rule Name</TableHead>
                      <TableHead>Sources</TableHead>
                      <TableHead>Quality</TableHead>
                      <TableHead>Destinations</TableHead>
                      <TableHead>Filters</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {savedRules.map(rule => (
                      <TableRow key={rule.id} className="border-border/50 hover:bg-accent/30">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                              <Settings className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">{rule.name}</div>
                              <div className="text-xs text-muted-foreground">ID: {rule.id}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {rule.sources.map((source: string) => (
                              <Badge key={source} variant="outline" className="text-xs">
                                {source === 'crm' ? 'CRM' : source === 'leadhub' ? 'Lead Hub' : source === 'bad-data' ? 'Data Xấu' : source}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={rule.quality === 'good' ? 'default' : 'destructive'}
                            className="text-xs"
                          >
                            {rule.quality === 'good' ? 'Data Tốt' : rule.quality === 'bad' ? 'Data Xấu' : rule.quality}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {rule.destinations.slice(0, 2).map((dest: string) => (
                              <div
                                key={dest}
                                className="w-6 h-6 rounded bg-muted flex items-center justify-center text-xs"
                                title={dest}
                              >
                                {getPlatformIcon(dest === 'facebook' ? 'Facebook' : dest === 'google' ? 'Google' : dest === 'tiktok' ? 'TikTok' : dest === 'zalo' ? 'Zalo' : dest)}
                              </div>
                            ))}
                            {rule.destinations.length > 2 && (
                              <span className="text-xs text-muted-foreground">
                                +{rule.destinations.length - 2}
                              </span>
                            )}
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="text-sm">
                            {rule.customFilters.length + 1} filter(s)
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={rule.isActive}
                              onCheckedChange={() => {
                                setSavedRules(prev => prev.map(r => 
                                  r.id === rule.id ? { ...r, isActive: !r.isActive } : r
                                ));
                              }}
                            />
                            <span className={`text-xs ${rule.isActive ? 'text-green-600' : 'text-muted-foreground'}`}>
                              {rule.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foreground">
                            {new Date(rule.createdAt).toLocaleDateString('vi-VN')}
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => {
                                console.log('Edit rule:', rule);
                                alert(`Chức năng edit rule "${rule.name}" sẽ được phát triển trong version tiếp theo!`);
                              }}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Rule
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {
                                console.log('Duplicate rule:', rule);
                                const duplicatedRule = {
                                  ...rule,
                                  id: `rule_${Date.now()}`,
                                  name: `${rule.name} (Copy)`,
                                  createdAt: new Date()
                                };
                                setSavedRules(prev => [duplicatedRule, ...prev]);
                                alert(`✅ Đã tạo bản sao rule "${rule.name}"!`);
                              }}>
                                <Copy className="h-4 w-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => {
                                  if (confirm(`Bạn có chắc muốn xóa rule "${rule.name}"?`)) {
                                    setSavedRules(prev => prev.filter(r => r.id !== rule.id));
                                    alert(`✅ Đã xóa rule "${rule.name}"!`);
                                  }
                                }}
                                className="text-destructive"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}

              {/* Empty State */}
              {((activeTab === 'audiences' && filteredAudiences.length === 0) || 
                (activeTab === 'api' && filteredAPIs.length === 0) ||
                (activeTab === 'rules' && savedRules.length === 0)) && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Database className="h-16 w-16 text-muted-foreground/50 mb-4" />
                  <h3 className="font-medium text-muted-foreground mb-2">
                    {searchTerm ? 'Không tìm thấy' : 
                     activeTab === 'audiences' ? 'Chưa có Custom Audience nào' : 
                     activeTab === 'api' ? 'Chưa có Lead Ads API nào' : 'Chưa có Saved Rule nào'}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {searchTerm ? 'Thử thay đổi từ khóa tìm kiếm' : 
                     activeTab === 'audiences' ? 'Tạo Custom Audience đầu tiên bằng Auto Upload Rule' : 
                     activeTab === 'api' ? 'Kết nối Lead Ads API để đồng bộ dữ liệu' : 'Tạo Auto Upload Rule để lưu cấu hình'}
                  </p>
                  {!searchTerm && activeTab === 'audiences' && (
                    <div className="flex items-center gap-3">
                      <Button 
                        size="sm" 
                        onClick={() => setShowSetRulePopup(true)}
                        className="bg-primary hover:bg-primary-hover"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Set Auto Rule
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={handleManualUpload}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Manual Upload
                      </Button>
                    </div>
                  )}
                  {!searchTerm && activeTab === 'rules' && (
                    <Button 
                      size="sm" 
                      onClick={() => setShowSetRulePopup(true)}
                      className="bg-primary hover:bg-primary-hover"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Create First Rule
                    </Button>
                  )}
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Set Rule Popup */}
        <SetRulePopupFixed
          isOpen={showSetRulePopup}
          onClose={() => setShowSetRulePopup(false)}
          onSaveRule={handleSaveAutoRule}
        />
      </div>
    </div>
  );
}