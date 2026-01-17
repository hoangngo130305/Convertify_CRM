import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Checkbox } from './ui/checkbox';
import { Separator } from './ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { 
  Zap, 
  X, 
  Plus, 
  Save, 
  Tag, 
  Package, 
  Clock, 
  Users, 
  DollarSign, 
  Trash2, 
  Info,
  Bell,
  AlertCircle,
  Settings2,
  UserCheck,
  Edit3,
  Loader2,
  TrendingUp,
  ShoppingCart,
  Sparkles,
  Database,
  RotateCw,
  RefreshCw,
  Link2,
  CheckCircle2
} from 'lucide-react';

interface AutomationPopupProps {
  onClose: () => void;
  automationSettings: any;
  onUpdateSettings: (settings: any) => void;
}

interface TagItem {
  id: string;
  name: string;
  color: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  category?: string;
}

interface SaleGroup {
  saleId: string;
  saleName: string;
  defaultGroup: string;
  customGroup: string;
}

export function AutomationPopup({ onClose, automationSettings, onUpdateSettings }: AutomationPopupProps) {
  // 1. Cài đặt TAG mặc định
  const [selectedDefaultTags, setSelectedDefaultTags] = useState<string[]>([]);
  const [availableTags] = useState<TagItem[]>([
    { id: '1', name: 'Khách VIP', color: '#8b5cf6' },
    { id: '2', name: 'Khách sỉ', color: '#06b6d4' },
    { id: '3', name: 'Khách lẻ', color: '#10b981' },
    { id: '4', name: 'Tiềm năng', color: '#f59e0b' },
    { id: '5', name: 'Ưu tiên', color: '#ef4444' },
    { id: '6', name: 'Enterprise', color: '#6366f1' },
    { id: '7', name: 'Trung thành', color: '#ec4899' }
  ]);

  // 2. Cài đặt nhắc nhở Sale
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [reminderMinutes, setReminderMinutes] = useState(60);

  // 3. Tạo giá cho sản phẩm & cập nhật doanh thu - MẶC ĐỊNH TẮT
  const [productPricingEnabled, setProductPricingEnabled] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [productPricing, setProductPricing] = useState<Product[]>([]);
  const [autoRevenueUpdate, setAutoRevenueUpdate] = useState(false);

  // Mock data cho sản phẩm khi bật tính năng
  const mockProductData: Product[] = [
    { 
      id: '1', 
      name: 'Website Design', 
      price: 10000000,
      description: 'Thiết kế website chuyên nghiệp, responsive',
      category: 'Design'
    },
    { 
      id: '2', 
      name: 'SEO Service', 
      price: 5000000,
      description: 'Dịch vụ SEO tổng thể, tăng ranking Google',
      category: 'Marketing'
    },
    { 
      id: '3', 
      name: 'Digital Marketing', 
      price: 8000000,
      description: 'Chiến lược marketing số toàn diện',
      category: 'Marketing'
    },
    { 
      id: '4', 
      name: 'E-commerce Platform', 
      price: 15000000,
      description: 'Nền tảng thương mại điện tử hoàn chỉnh',
      category: 'Development'
    },
    { 
      id: '5', 
      name: 'Mobile App Development', 
      price: 25000000,
      description: 'Phát triển ứng dụng di động iOS/Android',
      category: 'Development'
    },
    { 
      id: '6', 
      name: 'Brand Identity', 
      price: 3000000,
      description: 'Thiết kế nhận diện thương hiệu',
      category: 'Design'
    }
  ];

  // 4. Cài đặt Group khách hàng
  const [defaultGroupForAll, setDefaultGroupForAll] = useState('potential');
  const [salesGroups, setSalesGroups] = useState<SaleGroup[]>([
    { saleId: '1', saleName: 'Nguyễn Văn A', defaultGroup: 'Khách tiềm năng', customGroup: 'VIP Follow-up' },
    { saleId: '2', saleName: 'Trần Thị B', defaultGroup: 'Khách tiềm năng', customGroup: 'Hot Leads' },
    { saleId: '3', saleName: 'Lê Văn C', defaultGroup: 'Khách thân thiết', customGroup: 'Upsell Candidates' },
    { saleId: '4', saleName: 'Phạm Thị D', defaultGroup: 'Khách ưu tiên', customGroup: 'Enterprise Deals' }
  ]);

  const availableGroups = [
    { id: 'potential', name: 'Khách tiềm năng' },
    { id: 'vip', name: 'Khách thân thiết' },
    { id: 'priority', name: 'Khách ưu tiên' },
    { id: 'regular', name: 'Khách thường' }
  ];

  // 5. Cài đặt Column Sync - TÍNH NĂNG MỚI
  const [columnSyncEnabled, setColumnSyncEnabled] = useState(false);
  const [autoCreateColumnEnabled, setAutoCreateColumnEnabled] = useState(false);
  const [bidirectionalSyncEnabled, setBidirectionalSyncEnabled] = useState(false);
  const [isLoadingColumnSync, setIsLoadingColumnSync] = useState(false);
  const [isCreatingColumn, setIsCreatingColumn] = useState(false);
  const [newColumnName, setNewColumnName] = useState('');
  const [newColumnType, setNewColumnType] = useState('text');
  const [leadhubConnected, setLeadhubConnected] = useState(true); // Auto-connected to LeadHub
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  // Mock data cho các cột CRM có sẵn
  const [crmColumns, setCrmColumns] = useState([
    { id: '1', name: 'Tên khách hàng', type: 'text', isCore: true, createdDate: new Date(2024, 0, 1) },
    { id: '2', name: 'Số điện thoại', type: 'phone', isCore: true, createdDate: new Date(2024, 0, 1) },
    { id: '3', name: 'Email', type: 'email', isCore: true, createdDate: new Date(2024, 0, 1) },
    { id: '4', name: 'Trạng thái', type: 'select', isCore: true, createdDate: new Date(2024, 0, 1) },
    { id: '5', name: 'Nguồn', type: 'select', isCore: true, createdDate: new Date(2024, 0, 1) },
    { id: '6', name: 'Ngân sách', type: 'number', isCore: false, createdDate: new Date(2024, 7, 15) },
    { id: '7', name: 'Xếp hạng tiềm năng', type: 'select', isCore: false, createdDate: new Date(2024, 8, 20) }
  ]);

  // Mock data cho các cột LeadHub
  const [leadhubColumns, setLeadhubColumns] = useState([
    { id: '1', name: 'customer_name', type: 'text', syncedFromCrm: false, lastSync: null },
    { id: '2', name: 'phone_number', type: 'phone', syncedFromCrm: false, lastSync: null },
    { id: '3', name: 'email_address', type: 'email', syncedFromCrm: false, lastSync: null }
  ]);

  // Mock data cho mapping giữa CRM và LeadHub
  const [columnMappings, setColumnMappings] = useState([
    {
      id: '1',
      crmColumnId: '1',
      crmColumnName: 'Tên khách hàng',
      leadhubColumnId: '1',
      leadhubColumnName: 'customer_name',
      isActive: false,
      autoCreated: false,
      lastSync: null
    },
    {
      id: '2', 
      crmColumnId: '2',
      crmColumnName: 'Số điện thoại',
      leadhubColumnId: '2',
      leadhubColumnName: 'phone_number',
      isActive: false,
      autoCreated: false,
      lastSync: null
    },
    {
      id: '3',
      crmColumnId: '3',
      crmColumnName: 'Email',
      leadhubColumnId: '3',
      leadhubColumnName: 'email_address',
      isActive: false,
      autoCreated: false,
      lastSync: null
    }
  ]);

  const columnTypes = [
    { value: 'text', label: 'Văn bản' },
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Số điện thoại' },
    { value: 'number', label: 'Số' },
    { value: 'date', label: 'Ngày' },
    { value: 'select', label: 'Dropdown' },
    { value: 'checkbox', label: 'Checkbox' }
  ];

  const syncDirections = [
    { value: 'bidirectional', label: 'Hai chiều', icon: RotateCw },
    { value: 'crm_to_leadhub', label: 'CRM → LeadHub', icon: RefreshCw },
    { value: 'leadhub_to_crm', label: 'LeadHub → CRM', icon: RefreshCw }
  ];

  // Functions
  const toggleDefaultTag = (tagId: string) => {
    setSelectedDefaultTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleProductPricingToggle = async (enabled: boolean) => {
    setProductPricingEnabled(enabled);
    
    if (enabled && productPricing.length === 0) {
      setIsLoadingProducts(true);
      // Simulate API call to load product data
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProductPricing(mockProductData);
      setAutoRevenueUpdate(true); // Mặc định bật auto revenue khi bật pricing
      setIsLoadingProducts(false);
    } else if (!enabled) {
      setAutoRevenueUpdate(false);
    }
  };

  const updateProductPrice = (productId: string, newPrice: string) => {
    const price = parseInt(newPrice.replace(/[^0-9]/g, '')) || 0;
    setProductPricing(prev => prev.map(p => 
      p.id === productId ? { ...p, price } : p
    ));
  };

  const addNewProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: 'Sản phẩm mới',
      price: 0,
      description: 'Mô tả sản phẩm',
      category: 'Other'
    };
    setProductPricing(prev => [...prev, newProduct]);
  };

  const removeProduct = (productId: string) => {
    setProductPricing(prev => prev.filter(p => p.id !== productId));
  };

  const updateSaleDefaultGroup = (saleId: string, groupName: string) => {
    setSalesGroups(prev => prev.map(sale =>
      sale.saleId === saleId ? { ...sale, defaultGroup: groupName } : sale
    ));
  };

  const updateSaleCustomGroup = (saleId: string, customGroup: string) => {
    setSalesGroups(prev => prev.map(sale =>
      sale.saleId === saleId ? { ...sale, customGroup } : sale
    ));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('vi-VN');
  };

  // Column Sync Functions
  const handleColumnSyncToggle = async (enabled: boolean) => {
    setColumnSyncEnabled(enabled);
    
    if (enabled) {
      setIsLoadingColumnSync(true);
      // Simulate API call to enable sync with LeadHub
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLastSyncTime(new Date());
      setIsLoadingColumnSync(false);
      
      console.log('🔄 Column sync enabled - automation rules activated');
      alert('✅ Đã bật quy tắc đồng bộ Column!\n\n• Khi tạo cột mới trong CRM → tự động tạo cột tương ứng trong LeadHub\n• Khi cập nhật/xóa cột → cũng sẽ đồng bộ theo\n• LeadHub đã được kết nối tự động, sẵn sàng đồng bộ');
    } else {
      console.log('⏸️ Column sync disabled - automation rules deactivated');
      alert('⏸️ Đã tắt quy tắc đồng bộ Column!\n\nCRM và LeadHub sẽ không tự động đồng bộ cột với nhau nữa.');
    }
  };

  const handleCreateNewColumn = async () => {
    if (!newColumnName.trim()) return;
    
    setIsCreatingColumn(true);
    
    try {
      // Step 1: Create column in CRM first
      console.log(`📝 Creating column "${newColumnName}" in CRM...`);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newCrmColumnId = (crmColumns.length + 1).toString();
      const newCrmColumn = {
        id: newCrmColumnId,
        name: newColumnName,
        type: newColumnType,
        isCore: false,
        createdDate: new Date()
      };
      
      setCrmColumns(prev => [...prev, newCrmColumn]);
      
      // Step 2: Check if automation is enabled
      if (columnSyncEnabled) {
        console.log(`🔄 Automation enabled - auto-creating column "${newColumnName}" in LeadHub...`);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const leadhubColumnName = newColumnName.toLowerCase().replace(/\s+/g, '_');
        const newLeadhubColumnId = (leadhubColumns.length + 1).toString();
        const newLeadhubColumn = {
          id: newLeadhubColumnId,
          name: leadhubColumnName,
          type: newColumnType,
          syncedFromCrm: true,
          lastSync: new Date()
        };
        
        setLeadhubColumns(prev => [...prev, newLeadhubColumn]);
        
        // Step 3: Create automatic mapping
        const newMapping = {
          id: Date.now().toString(),
          crmColumnId: newCrmColumnId,
          crmColumnName: newColumnName,
          leadhubColumnId: newLeadhubColumnId,
          leadhubColumnName: leadhubColumnName,
          dataType: newColumnType,
          syncDirection: 'bidirectional',
          isActive: true,
          autoCreated: true,
          lastSync: new Date()
        };
        
        setColumnMappings(prev => [...prev, newMapping]);
        setLastSyncTime(new Date());
        
        console.log('✅ Column created in both CRM and LeadHub with auto-mapping:', newMapping);
        alert(`✅ Đã tạo thành công!\n\n📝 Column "${newColumnName}" đã được tạo trong CRM\n🔄 Nhờ automation, cũng đã tự động tạo "${leadhubColumnName}" trong LeadHub\n🔗 Mapping tự động đã được thiết lập`);
      } else {
        console.log('⚠️ Automation disabled - column only created in CRM');
        alert(`✅ Đã tạo thành công!\n\n📝 Column "${newColumnName}" đã được tạo trong CRM\n⚠️ Automation đang tắt - không tự động tạo trong LeadHub\n💡 Bật automation để tự động đồng bộ`);
      }
      
      setNewColumnName('');
      
    } catch (error) {
      console.error('❌ Error creating column:', error);
      alert('❌ Có lỗi xảy ra khi tạo column. Vui lòng thử lại.');
    } finally {
      setIsCreatingColumn(false);
    }
  };

  const handleSyncNow = async () => {
    if (!columnSyncEnabled) {
      alert('⚠️ Vui lòng bật quy tắc đồng bộ Column trước khi sync thủ công!');
      return;
    }
    
    setIsLoadingColumnSync(true);
    
    try {
      console.log('🔄 Starting manual sync...');
      
      // Simulate sync process for each active mapping
      const activeMappings = columnMappings.filter(m => m.isActive);
      
      if (activeMappings.length === 0) {
        alert('⚠️ Không có mapping nào được kích hoạt để đồng bộ!');
        setIsLoadingColumnSync(false);
        return;
      }
      
      for (const mapping of activeMappings) {
        console.log(`📊 Syncing "${mapping.crmColumnName}" ↔ "${mapping.leadhubColumnName}"`);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      // Update all last sync times
      setColumnMappings(prev => prev.map(mapping => 
        mapping.isActive 
          ? { ...mapping, lastSync: new Date() }
          : mapping
      ));
      
      setLastSyncTime(new Date());
      
      console.log('✅ Manual sync completed');
      alert(`✅ Đồng bộ thành công!\n\n🔄 Đã đồng bộ ${activeMappings.length} column giữa CRM và LeadHub\n⏰ Thời gian: ${new Date().toLocaleString('vi-VN')}`);
      
    } catch (error) {
      console.error('❌ Sync error:', error);
      alert('❌ Có lỗi xảy ra trong quá trình đồng bộ. Vui lòng thử lại.');
    } finally {
      setIsLoadingColumnSync(false);
    }
  };

  const handleConnectLeadHub = async () => {
    setIsLoadingColumnSync(true);
    
    try {
      console.log('🔌 Connecting to LeadHub...');
      // Simulate connection process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setLeadhubConnected(true);
      
      console.log('✅ LeadHub connected successfully');
      alert('✅ Kết nối LeadHub thành công!\n\n🔗 Đã thiết lập kết nối với LeadHub\n💡 Bây giờ bạn có thể:\n• Bật quy tắc đồng bộ Column\n• Tạo column mới với auto-sync\n• Quản lý mapping dữ liệu');
      
    } catch (error) {
      console.error('❌ Connection failed:', error);
      alert('❌ Không thể kết nối với LeadHub. Vui lòng kiểm tra cài đặt.');
    } finally {
      setIsLoadingColumnSync(false);
    }
  };

  const handleSave = () => {
    const newSettings = {
      defaultTags: selectedDefaultTags.map(tagId => 
        availableTags.find(tag => tag.id === tagId)
      ).filter(Boolean),
      salesReminder: {
        enabled: reminderEnabled,
        minutes: reminderMinutes
      },
      productPricing: {
        enabled: productPricingEnabled,
        products: productPricing
      },
      revenueCalculation: {
        enabled: autoRevenueUpdate
      },
      customerGroups: {
        defaultGroupForAll,
        salesGroups
      }
    };
    
    console.log('💾 Lưu cài đặt automation:', newSettings);
    onUpdateSettings(newSettings);
    onClose();
  };

  // Load settings on mount
  useEffect(() => {
    if (automationSettings) {
      setSelectedDefaultTags(automationSettings.defaultTags?.map((tag: any) => tag.id) || []);
      setReminderEnabled(automationSettings.salesReminder?.enabled ?? true);
      setReminderMinutes(automationSettings.salesReminder?.minutes || 60);
      
      // Load product pricing settings
      setProductPricingEnabled(automationSettings.productPricing?.enabled ?? false);
      setProductPricing(automationSettings.productPricing?.products || []);
      setAutoRevenueUpdate(automationSettings.revenueCalculation?.enabled ?? false);
      
      setDefaultGroupForAll(automationSettings.customerGroups?.defaultGroupForAll || 'potential');
      setSalesGroups(automationSettings.customerGroups?.salesGroups || salesGroups);
    }
  }, [automationSettings]);

  return (
    <TooltipProvider>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0 pb-4 border-b border-border/50">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl flex items-center justify-center">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                  <Sparkles className="h-2.5 w-2.5 text-primary-foreground" />
                </div>
              </div>
              <div>
                <DialogTitle className="text-2xl text-foreground flex items-center gap-2">
                  Automation
                  <Badge variant="secondary" className="text-xs">v2.0</Badge>
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Thiết lập tự động hóa thông minh cho quy trình CRM
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <Tabs defaultValue="tags" className="flex-1 flex flex-col min-h-0">
            <div className="flex-shrink-0 mb-6">
              <TabsList className="grid grid-cols-5 w-full gap-2 p-1 bg-muted/50 rounded-xl h-14">
                <TabsTrigger value="tags" className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <Tag className="h-4 w-4" />
                  <span className="text-xs font-medium">TAG</span>
                </TabsTrigger>
                <TabsTrigger value="reminders" className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs font-medium">Nhắc nhở</span>
                </TabsTrigger>
                <TabsTrigger value="products" className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <Package className="h-4 w-4" />
                  <span className="text-xs font-medium">Giá SP</span>
                </TabsTrigger>
                <TabsTrigger value="groups" className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <Users className="h-4 w-4" />
                  <span className="text-xs font-medium">Group KH</span>
                </TabsTrigger>
                <TabsTrigger value="sync" className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <Database className="h-4 w-4" />
                  <span className="text-xs font-medium">Column Sync</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-y-auto">
              {/* 1. Cài đặt TAG mặc định */}
              <TabsContent value="tags" className="space-y-6 mt-0">
                <Card className="border-border/50 shadow-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Tag className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">TAG mặc định cho Lead</CardTitle>
                        <CardDescription>
                          Chọn các TAG mặc định sẽ được áp dụng tự động khi tạo Lead mới trong hệ thống
                        </CardDescription>
                      </div>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Các TAG mặc định sẽ áp dụng khi tạo Lead mới</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium mb-3 block">
                        Chọn TAG mặc định (có thể chọn nhiều)
                      </Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
                        {availableTags.map(tag => (
                          <div
                            key={tag.id}
                            onClick={() => toggleDefaultTag(tag.id)}
                            className={`cursor-pointer p-2 rounded-md border transition-all duration-150 hover:shadow-sm group ${ 
                              selectedDefaultTags.includes(tag.id)
                                ? 'border-primary bg-primary/8 shadow-sm'
                                : 'border-border hover:border-primary/40 hover:bg-muted/30'
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="flex-shrink-0">
                                <Checkbox
                                  checked={selectedDefaultTags.includes(tag.id)}
                                  readOnly
                                  className="h-3.5 w-3.5"
                                />
                              </div>
                              <div
                                className="w-3 h-3 rounded-full flex-shrink-0 ring-1 ring-white/20"
                                style={{ backgroundColor: tag.color }}
                              />
                              <span className="text-xs font-medium truncate leading-relaxed">{tag.name}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Hiển thị số lượng tag đã chọn */}
                      {selectedDefaultTags.length > 0 && (
                        <div className="mt-2 text-xs text-muted-foreground">
                          Đã chọn {selectedDefaultTags.length} TAG mặc định
                        </div>
                      )}
                    </div>

                    {selectedDefaultTags.length > 0 && (
                      <div className="bg-primary/5 p-2.5 rounded-md border border-primary/20">
                        <Label className="text-xs font-medium text-primary mb-1.5 block">
                          TAG đã chọn sẽ áp dụng mặc định:
                        </Label>
                        <div className="flex flex-wrap gap-1">
                          {selectedDefaultTags.map(tagId => {
                            const tag = availableTags.find(t => t.id === tagId);
                            return tag ? (
                              <Badge
                                key={tag.id}
                                style={{ backgroundColor: tag.color }}
                                className="text-white text-xs px-1.5 py-0.5 h-auto"
                              >
                                <div
                                  className="w-1.5 h-1.5 rounded-full mr-1 ring-1 ring-white/30"
                                  style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
                                />
                                {tag.name}
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 2. Cài đặt nhắc nhở Sale */}
              <TabsContent value="reminders" className="space-y-6 mt-0">
                <Card className="border-border/50 shadow-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Bell className="h-4 w-4 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">Nhắc nhở xử lý data mới</CardTitle>
                        <CardDescription>
                          Thiết lập thời gian nhắc nhở Sale khi có data mới chưa được xử lý
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-200">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-orange-600" />
                        <div>
                          <Label className="font-medium">
                            Bật nhắc nhở tự động
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Tự động nhắc nhở khi Sale không xử lý data trong thời gian quy định
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={reminderEnabled}
                        onCheckedChange={setReminderEnabled}
                      />
                    </div>

                    {reminderEnabled && (
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium mb-3 block">
                            Thời gian nhắc nhở
                          </Label>
                          <div className="flex items-center gap-3">
                            <Input
                              type="number"
                              value={reminderMinutes}
                              onChange={(e) => setReminderMinutes(parseInt(e.target.value) || 60)}
                              className="w-24 text-center font-medium"
                              min="1"
                              max="1440"
                            />
                            <span className="text-sm font-medium">phút</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            Nếu sau {reminderMinutes} phút data phân về chưa xử lý → thông báo tại chuông công việc
                          </p>
                        </div>

                        <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                          <div className="flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-amber-900 mb-1">
                                💡 Cách hoạt động:
                              </p>
                              <p className="text-sm text-amber-700">
                                Sau {reminderMinutes} phút kể từ khi data được phân bổ cho Sale mà chưa có thay đổi trạng thái, 
                                hệ thống sẽ gửi thông báo tại biểu tượng chuông công việc để nhắc nhở xử lý.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 3. Tạo giá cho sản phẩm & cập nhật doanh thu */}
              <TabsContent value="products" className="space-y-6 mt-0">
                <Card className="border-border/50 shadow-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">Quản lý giá sản phẩm & doanh thu</CardTitle>
                        <CardDescription>
                          Cài đặt giá cho từng sản phẩm và tự động cập nhật doanh thu khi Lead thành công
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Toggle để bật/tắt tính năng */}
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                      <div className="flex items-center gap-3">
                        <ShoppingCart className="h-5 w-5 text-green-600" />
                        <div>
                          <Label className="font-medium">
                            Bật quản lý giá sản phẩm
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Tự động load dữ liệu sản phẩm và thiết lập giá
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={productPricingEnabled}
                        onCheckedChange={handleProductPricingToggle}
                        disabled={isLoadingProducts}
                      />
                    </div>

                    {/* Loading state */}
                    {isLoadingProducts && (
                      <div className="flex items-center justify-center p-8 bg-muted/30 rounded-xl border border-dashed border-border">
                        <div className="flex flex-col items-center gap-3">
                          <Loader2 className="h-8 w-8 animate-spin text-primary" />
                          <p className="text-sm font-medium text-muted-foreground">Đang tải dữ liệu sản phẩm...</p>
                        </div>
                      </div>
                    )}

                    {/* Product pricing content - chỉ hiển thị khi đã bật */}
                    {productPricingEnabled && !isLoadingProducts && (
                      <>
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <Label className="text-sm font-medium">
                              Bảng giá sản phẩm ({productPricing.length} sản phẩm)
                            </Label>
                            <Button
                              onClick={addNewProduct}
                              size="sm"
                              className="gap-2"
                            >
                              <Plus className="h-4 w-4" />
                              Thêm sản phẩm
                            </Button>
                          </div>
                          <div className="space-y-3 max-h-60 overflow-y-auto">
                            {productPricing.map(product => (
                              <div key={product.id} className="flex items-center gap-4 p-4 bg-green-50/50 rounded-xl border border-green-200/50 hover:bg-green-50 transition-colors">
                                <div className="flex-1">
                                  <div className="font-medium text-foreground">{product.name}</div>
                                  {product.description && (
                                    <div className="text-xs text-muted-foreground mt-1">{product.description}</div>
                                  )}
                                  <div className="text-sm text-green-600 font-medium mt-1">
                                    {formatCurrency(product.price)}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Input
                                    type="text"
                                    value={formatNumber(product.price)}
                                    onChange={(e) => updateProductPrice(product.id, e.target.value)}
                                    className="w-32 text-right font-medium"
                                    placeholder="Nhập giá..."
                                  />
                                  <span className="text-sm text-muted-foreground">VNĐ</span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeProduct(product.id)}
                                    className="text-destructive hover:text-destructive h-8 w-8 p-0"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                          <div className="flex items-center gap-3">
                            <TrendingUp className="h-5 w-5 text-blue-600" />
                            <div>
                              <Label className="font-medium">
                                Tự động cập nhật doanh thu khi Lead thành công
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                Khi trạng thái chuyển sang "Thành công", tự động cộng giá sản phẩm vào doanh thu
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={autoRevenueUpdate}
                            onCheckedChange={setAutoRevenueUpdate}
                          />
                        </div>

                        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                          <div className="flex items-start gap-3">
                            <DollarSign className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-emerald-900 mb-1">
                                💡 Ví dụ hoạt động:
                              </p>
                              <p className="text-sm text-emerald-700">
                                SP "Website Design" giá 10,000,000 VNĐ → Khi Lead chuyển "Thành công" 
                                → Doanh thu tăng +10,000,000 VNĐ tự động.
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Info khi chưa bật */}
                    {!productPricingEnabled && !isLoadingProducts && (
                      <div className="text-center p-8 bg-muted/30 rounded-xl border border-dashed border-border">
                        <Package className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                        <p className="text-sm font-medium text-muted-foreground mb-2">Tính năng quản lý giá sản phẩm đang tắt</p>
                        <p className="text-xs text-muted-foreground">Bật để tự động load dữ liệu sản phẩm và thiết lập giá</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 4. Cài đặt Group khách hàng */}
              <TabsContent value="groups" className="space-y-6 mt-0">
                <Card className="border-border/50 shadow-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">Cài đặt Group khách hàng</CardTitle>
                        <CardDescription>
                          Thiết lập Group mặc định cho tất cả Sale và cho phép Sale tự tạo Group riêng
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="text-sm font-medium mb-3 block">
                        Group KH mặc định (áp dụng cho tất cả Sale)
                      </Label>
                      <Select value={defaultGroupForAll} onValueChange={setDefaultGroupForAll}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Chọn group mặc định" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableGroups.map(group => (
                            <SelectItem key={group.id} value={group.id}>
                              {group.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div>
                      <Label className="text-sm font-medium mb-3 block">
                        Bảng phân quyền Group theo Sale
                      </Label>
                      <div className="border rounded-xl overflow-hidden">
                        <div className="bg-muted/50 p-4 grid grid-cols-3 gap-4 font-medium text-sm">
                          <div>Sale</div>
                          <div>Group mặc định (admin cài)</div>
                          <div>Group Sale tự gán thêm</div>
                        </div>
                        {salesGroups.map(sale => (
                          <div key={sale.saleId} className="p-4 border-t grid grid-cols-3 gap-4 items-center hover:bg-muted/30 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <UserCheck className="h-4 w-4 text-blue-600" />
                              </div>
                              <span className="font-medium">{sale.saleName}</span>
                            </div>
                            <div>
                              <Select 
                                value={sale.defaultGroup} 
                                onValueChange={(value) => updateSaleDefaultGroup(sale.saleId, value)}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {availableGroups.map(group => (
                                    <SelectItem key={group.id} value={group.name}>
                                      {group.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex items-center gap-2">
                              <Input
                                value={sale.customGroup}
                                onChange={(e) => updateSaleCustomGroup(sale.saleId, e.target.value)}
                                placeholder="Group tự tạo..."
                                className="flex-1"
                              />
                              <Edit3 className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                      <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-blue-900 mb-1">
                            💡 Cách hoạt động:
                          </p>
                          <p className="text-sm text-blue-700">
                            • <strong>Group mặc định:</strong> Do admin thiết lập, áp dụng tự động cho tất cả khách hàng mới<br/>
                            • <strong>Group tự gán:</strong> Sale có thể tạo thêm group riêng để phân loại khách hàng theo nhu cầu
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 5. Cài đặt Column Sync - TÍNH NĂNG MỚI */}
              <TabsContent value="sync" className="space-y-6 mt-0">
                <Card className="border-border/50 shadow-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Database className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                          Column Sync với LeadHub
                          <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">NEW</Badge>
                        </CardTitle>
                        <CardDescription>
                          Đồng bộ dữ liệu column giữa CRM và LeadHub tự động, tạo column mới và mapping dữ liệu
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Connection Status */}
                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-200">
                      <div className="flex items-center gap-3">
                        <Link2 className="h-5 w-5 text-purple-600" />
                        <div>
                          <Label className="font-medium">
                            Kết nối với LeadHub
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {leadhubConnected ? 'Đã kết nối thành công' : 'Chưa kết nối với LeadHub'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {leadhubConnected ? (
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Đã kết nối
                          </Badge>
                        ) : (
                          <Button size="sm" onClick={() => setLeadhubConnected(true)}>
                            Kết nối
                          </Button>
                        )}
                      </div>
                    </div>

                    {leadhubConnected && (
                      <>
                        {/* Main Toggle */}
                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                          <div className="flex items-center gap-3">
                            <RefreshCw className="h-5 w-5 text-blue-600" />
                            <div>
                              <Label className="font-medium">
                                Bật đồng bộ Column
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                Tự động đồng bộ dữ liệu column giữa CRM và LeadHub
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={columnSyncEnabled}
                            onCheckedChange={handleColumnSyncToggle}
                          />
                        </div>

                        {columnSyncEnabled && (
                          <>
                            {/* Sync Options */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                                <div className="flex items-center gap-3">
                                  <Plus className="h-5 w-5 text-green-600" />
                                  <div>
                                    <Label className="font-medium text-sm">
                                      Tự động tạo Column mới
                                    </Label>
                                    <p className="text-xs text-muted-foreground">
                                      Tự động tạo column trong CRM khi có column mới từ LeadHub
                                    </p>
                                  </div>
                                </div>
                                <Switch
                                  checked={autoCreateColumnEnabled}
                                  onCheckedChange={setAutoCreateColumnEnabled}
                                />
                              </div>

                              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-200">
                                <div className="flex items-center gap-3">
                                  <RefreshCw className="h-5 w-5 text-orange-600" />
                                  <div>
                                    <Label className="font-medium text-sm">
                                      Đồng bộ hai chiều
                                    </Label>
                                    <p className="text-xs text-muted-foreground">
                                      Đồng bộ dữ liệu từ CRM ↔ LeadHub
                                    </p>
                                  </div>
                                </div>
                                <Switch
                                  checked={bidirectionalSyncEnabled}
                                  onCheckedChange={setBidirectionalSyncEnabled}
                                />
                              </div>
                            </div>

                            {/* Column Mappings */}
                            <div>
                              <div className="flex items-center justify-between mb-4">
                                <Label className="text-sm font-medium">
                                  Mapping Column ({columnMappings.length} column)
                                </Label>
                                <div className="flex items-center gap-2">
                                  {lastSyncTime && (
                                    <span className="text-xs text-muted-foreground">
                                      Sync cuối: {lastSyncTime.toLocaleString('vi-VN')}
                                    </span>
                                  )}
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="gap-2"
                                    onClick={handleSyncNow}
                                    disabled={isLoadingColumnSync}
                                  >
                                    {isLoadingColumnSync ? (
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                      <RefreshCw className="h-4 w-4" />
                                    )}
                                    Sync ngay
                                  </Button>
                                </div>
                              </div>

                              <div className="border rounded-xl overflow-hidden">
                                <div className="bg-muted/50 p-4 grid grid-cols-5 gap-4 font-medium text-sm">
                                  <div>CRM Column</div>
                                  <div>LeadHub Column</div>
                                  <div>Kiểu dữ liệu</div>
                                  <div>Hướng sync</div>
                                  <div>Trạng thái</div>
                                </div>
                                {columnMappings.map(mapping => (
                                  <div key={mapping.id} className="p-4 border-t grid grid-cols-5 gap-4 items-center hover:bg-muted/30 transition-colors">
                                    <div className="font-medium">{mapping.crmColumnName}</div>
                                    <div className="text-sm text-muted-foreground font-mono">
                                      {mapping.leadhubColumnName}
                                    </div>
                                    <div>
                                      <Badge variant="outline" className="text-xs">
                                        {columnTypes.find(t => t.value === mapping.dataType)?.label}
                                      </Badge>
                                    </div>
                                    <div>
                                      <div className="flex items-center gap-1">
                                        {(() => {
                                          const direction = syncDirections.find(d => d.value === mapping.syncDirection);
                                          const Icon = direction?.icon || RotateCw;
                                          return (
                                            <>
                                              <Icon className="h-3 w-3" />
                                              <span className="text-xs">{direction?.label}</span>
                                            </>
                                          );
                                        })()}
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Switch
                                        checked={mapping.isActive}
                                        onCheckedChange={(checked) => {
                                          setColumnMappings(prev => prev.map(m => 
                                            m.id === mapping.id ? { ...m, isActive: checked } : m
                                          ));
                                        }}
                                        size="sm"
                                      />
                                      {mapping.lastSync && (
                                        <Tooltip>
                                          <TooltipTrigger>
                                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p>Sync lần cuối: {mapping.lastSync.toLocaleString('vi-VN')}</p>
                                          </TooltipContent>
                                        </Tooltip>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Create New Column */}
                            <div className="border-t pt-6">
                              <Label className="text-sm font-medium mb-3 block">
                                Tạo Column mới
                              </Label>
                              <div className="flex items-end gap-3">
                                <div className="flex-1">
                                  <Label className="text-xs text-muted-foreground mb-1 block">
                                    Tên column
                                  </Label>
                                  <Input
                                    value={newColumnName}
                                    onChange={(e) => setNewColumnName(e.target.value)}
                                    placeholder="Nhập tên column..."
                                  />
                                </div>
                                <div className="w-40">
                                  <Label className="text-xs text-muted-foreground mb-1 block">
                                    Kiểu dữ liệu
                                  </Label>
                                  <Select value={newColumnType} onValueChange={setNewColumnType}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {columnTypes.map(type => (
                                        <SelectItem key={type.value} value={type.value}>
                                          {type.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <Button 
                                  onClick={handleCreateNewColumn}
                                  disabled={!newColumnName.trim() || isCreatingColumn}
                                  className="gap-2"
                                >
                                  {isCreatingColumn ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Plus className="h-4 w-4" />
                                  )}
                                  Tạo
                                </Button>
                              </div>
                            </div>

                            {/* Info Box */}
                            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                              <div className="flex items-start gap-3">
                                <Info className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-sm font-medium text-purple-900 mb-1">
                                    💡 Cách hoạt động Column Sync:
                                  </p>
                                  <p className="text-sm text-purple-700">
                                    • <strong>Tự động tạo:</strong> Khi LeadHub có column mới → tự động tạo trong CRM<br/>
                                    • <strong>Đồng bộ hai chiều:</strong> Thay đổi dữ liệu ở CRM hoặc LeadHub → tự động cập nhật bên kia<br/>
                                    • <strong>Mapping thông minh:</strong> Tự động nhận diện và mapping column tương tự
                                  </p>
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                        {/* Info khi chưa bật */}
                        {!columnSyncEnabled && (
                          <div className="text-center p-8 bg-muted/30 rounded-xl border border-dashed border-border">
                            <Database className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                            <p className="text-sm font-medium text-muted-foreground mb-2">Tính năng Column Sync đang tắt</p>
                            <p className="text-xs text-muted-foreground">Bật để đồng bộ dữ liệu column giữa CRM và LeadHub</p>
                          </div>
                        )}
                      </>
                    )}

                    {/* Info khi chưa kết nối */}
                    {!leadhubConnected && (
                      <div className="text-center p-8 bg-muted/30 rounded-xl border border-dashed border-border">
                        <Link2 className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                        <p className="text-sm font-medium text-muted-foreground mb-2">Chưa kết nối với LeadHub</p>
                        <p className="text-xs text-muted-foreground">Kết nối để sử dụng tính năng đồng bộ column</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>

          {/* Modern Footer */}
          <div className="flex-shrink-0 flex justify-between items-center pt-6 border-t border-border/50">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                Cài đặt sẽ áp dụng ngay lập tức sau khi lưu
              </span>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="gap-2">
                <X className="h-4 w-4" />
                Hủy
              </Button>
              <Button onClick={handleSave} className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-md gap-2">
                <Save className="h-4 w-4" />
                Lưu cài đặt
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}