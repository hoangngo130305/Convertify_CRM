import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import { 
  ChevronDown, 
  X, 
  Plus, 
  Check,
  Filter,
  Save,
  History,
  Trash2
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';

interface FilterCondition {
  id: string;
  field: string;
  operator: string;
  value: string;
}

interface SavedFilter {
  id: string;
  name: string;
  conditions: FilterCondition[];
  quickFilters: QuickFilters;
  filterLogic: 'and' | 'or';
  createdAt: Date;
}

interface QuickFilters {
  status: string[];
  source: string[];
  products: string[];
  assignedSale: string[];
  revenue: string[];
}

interface CRMQuickFilterPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
  currentFilters?: Record<string, string[]>;
  customers?: any[];
}

export function CRMQuickFilterPopup({ isOpen, onClose, onApply, currentFilters, customers }: CRMQuickFilterPopupProps) {
  // Quick Filter states
  const [quickFilters, setQuickFilters] = useState<QuickFilters>({
    status: currentFilters?.status || [],
    source: currentFilters?.source || [],
    products: currentFilters?.products || [],
    assignedSale: currentFilters?.assignedSale || [],
    revenue: currentFilters?.revenue || []
  });

  // Advanced Filter states
  const [conditions, setConditions] = useState<FilterCondition[]>([
    { id: '1', field: '', operator: '', value: '' }
  ]);
  const [filterLogic, setFilterLogic] = useState<'and' | 'or'>('and');

  // Saved filters
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);
  const [filterName, setFilterName] = useState('');
  const [activeTab, setActiveTab] = useState<'filter' | 'saved'>('filter');

  // Collapsible states
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    status: true,
    source: true,
    products: true,
    assignedSale: true,
    revenue: true,
    // Advanced filter section - default closed
    advancedFilters: false,
    saveFilter: false
  });

  // Available options
  const fieldOptions = [
    { value: 'name', label: 'Tên khách hàng' },
    { value: 'phone', label: 'Số điện thoại' },
    { value: 'email', label: 'Email' },
    { value: 'status', label: 'Trạng thái' },
    { value: 'source', label: 'Nguồn' },
    { value: 'products', label: 'Sản phẩm/Dịch vụ' },
    { value: 'assignedSale', label: 'Sale phụ trách' },
    { value: 'revenue', label: 'Doanh thu' },
    { value: 'createdDate', label: 'Ngày tạo' }
  ];

  const operatorOptions = [
    { value: 'belongs_to', label: 'Thuộc' },
    { value: 'not_belongs_to', label: 'Không thuộc' },
    { value: 'has_value', label: 'Có giá trị' },
    { value: 'no_value', label: 'Không có giá trị' }
  ];

  const filterLogicOptions = [
    { value: 'and', label: 'Đáp ứng TẤT CẢ điều kiện' },
    { value: 'or', label: 'Đáp ứng BẤT KỲ điều kiện nào' }
  ];

  // Toggle section
  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Quick filter handlers
  const handleQuickFilterToggle = (category: keyof QuickFilters, value: string) => {
    setQuickFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value]
    }));
  };

  const getActiveQuickFiltersCount = () => {
    return Object.values(quickFilters).reduce((total, values) => total + values.length, 0);
  };

  const clearQuickFilters = () => {
    setQuickFilters({
      status: [],
      source: [],
      products: [],
      assignedSale: [],
      revenue: []
    });
  };

  // Advanced filter handlers
  const addCondition = () => {
    const newCondition: FilterCondition = {
      id: Date.now().toString(),
      field: '',
      operator: '',
      value: ''
    };
    setConditions([...conditions, newCondition]);
  };

  const removeCondition = (id: string) => {
    if (conditions.length > 1) {
      setConditions(conditions.filter(c => c.id !== id));
    }
  };

  const updateCondition = (id: string, field: keyof FilterCondition, value: string) => {
    setConditions(conditions.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  const clearAdvancedFilters = () => {
    setConditions([{ id: '1', field: '', operator: '', value: '' }]);
    setFilterLogic('and');
  };

  const getActiveConditionsCount = () => {
    return conditions.filter(c => c.field && c.operator && c.value).length;
  };

  // Apply filters
  const handleApply = () => {
    const allFilters = {
      quick: quickFilters,
      advanced: conditions.filter(c => c.field && c.operator && c.value),
      filterLogic: filterLogic
    };
    onApply(allFilters);
    onClose();
  };

  // Save filter
  const handleSaveFilter = () => {
    if (!filterName.trim()) {
      alert('Vui lòng nhập tên bộ lọc!');
      return;
    }

    const newFilter: SavedFilter = {
      id: Date.now().toString(),
      name: filterName,
      conditions: conditions.filter(c => c.field && c.operator && c.value),
      quickFilters: quickFilters,
      filterLogic: filterLogic,
      createdAt: new Date()
    };

    setSavedFilters([newFilter, ...savedFilters]);
    setFilterName('');
    alert(`Đã lưu bộ lọc "${newFilter.name}" thành công!`);
  };

  // Load saved filter
  const handleLoadSavedFilter = (filter: SavedFilter) => {
    setQuickFilters(filter.quickFilters);
    setConditions(filter.conditions.length > 0 ? filter.conditions : [{ id: '1', field: '', operator: '', value: '' }]);
    setFilterLogic(filter.filterLogic || 'and');
    
    // Switch to filter tab to show loaded filter  
    setActiveTab('filter');
    
    // Show notification that filter was loaded but not applied
    setTimeout(() => {
      alert(`✅ Đã tải bộ lọc "${filter.name}" vào form!\n\n💡 Vui lòng nhấn "Áp dụng bộ lọc" để áp dụng bộ lọc này.`);
    }, 300);
  };

  // Delete saved filter
  const handleDeleteSavedFilter = (filterId: string) => {
    const filter = savedFilters.find(f => f.id === filterId);
    if (filter && confirm(`Bạn có chắc muốn xóa bộ lọc "${filter.name}"?`)) {
      setSavedFilters(savedFilters.filter(f => f.id !== filterId));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader className="sr-only">
          <DialogTitle>Bộ lọc CRM</DialogTitle>
          <DialogDescription>
            Tìm kiếm và quản lý bộ lọc khách hàng với các tùy chọn lọc nhanh và tạo điều kiện tùy chỉnh
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col min-h-0 flex-1">
          {/* Header */}
          <div className="p-6 pb-4 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center shadow-sm">
                <Filter className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Bộ lọc CRM</h2>
                <p className="text-sm text-gray-600">Tìm kiếm và quản lý bộ lọc khách hàng</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'filter' | 'saved')} className="flex-1 flex flex-col min-h-0">
            <div className="px-6 py-3 border-b flex-shrink-0">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="filter" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Bộ lọc
                  {(getActiveQuickFiltersCount() > 0 || getActiveConditionsCount() > 0) && (
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      {getActiveQuickFiltersCount() + getActiveConditionsCount()}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="saved" className="flex items-center gap-2">
                  <History className="w-4 h-4" />
                  Đã lưu ({savedFilters.length})
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Filter Tab */}
            <TabsContent value="filter" className="flex-1 m-0 min-h-0 flex flex-col">
              <div className="flex-1 overflow-y-auto p-6 pb-0">
                <div className="space-y-8 pb-6">
                  {/* Loaded Filter Notification */}
                  {(getActiveQuickFiltersCount() > 0 || getActiveConditionsCount() > 0) && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-sm">📥</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-blue-900">
                            Bộ lọc đã được tải vào form
                          </p>
                          <p className="text-xs text-blue-700">
                            💡 Nhấn "Áp dụng bộ lọc" bên dưới để áp dụng các điều kiện lọc
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Quick Filters Section */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Lọc nhanh</h3>
                      {getActiveQuickFiltersCount() > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearQuickFilters}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Xóa tất cả ({getActiveQuickFiltersCount()})
                        </Button>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      
                      {/* Status Filter */}
                      <Collapsible 
                        open={openSections.status} 
                        onOpenChange={() => toggleSection('status')}
                        className="border border-gray-200 rounded-lg"
                      >
                        <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              <span className="text-sm">🔄</span>
                            </div>
                            <span className="font-medium">Trạng thái</span>
                            {quickFilters.status.length > 0 && (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                {quickFilters.status.length}
                              </Badge>
                            )}
                          </div>
                          <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${openSections.status ? 'rotate-180' : ''}`} />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="px-4 pb-4">
                          <div className="grid grid-cols-2 gap-3">
                            {['Mới', 'Đang xử lý', 'Thành công', 'Thất bại'].map(status => (
                              <div key={status} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`status-${status}`}
                                  checked={quickFilters.status.includes(status)}
                                  onCheckedChange={() => handleQuickFilterToggle('status', status)}
                                />
                                <label htmlFor={`status-${status}`} className="text-sm cursor-pointer">
                                  {status}
                                </label>
                              </div>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>

                      {/* Source Filter */}
                      <Collapsible 
                        open={openSections.source} 
                        onOpenChange={() => toggleSection('source')}
                        className="border border-gray-200 rounded-lg"
                      >
                        <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                              <span className="text-sm">📍</span>
                            </div>
                            <span className="font-medium">Nguồn</span>
                            {quickFilters.source.length > 0 && (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                {quickFilters.source.length}
                              </Badge>
                            )}
                          </div>
                          <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${openSections.source ? 'rotate-180' : ''}`} />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="px-4 pb-4">
                          <div className="grid grid-cols-2 gap-3">
                            {['Facebook', 'Google', 'TikTok', 'Zalo', 'Website', 'Giới thiệu', 'Hotline'].map(source => (
                              <div key={source} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`source-${source}`}
                                  checked={quickFilters.source.includes(source)}
                                  onCheckedChange={() => handleQuickFilterToggle('source', source)}
                                />
                                <label htmlFor={`source-${source}`} className="text-sm cursor-pointer">
                                  {source}
                                </label>
                              </div>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>

                      {/* Products Filter */}
                      <Collapsible 
                        open={openSections.products} 
                        onOpenChange={() => toggleSection('products')}
                        className="border border-gray-200 rounded-lg"
                      >
                        <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                              <span className="text-sm">💼</span>
                            </div>
                            <span className="font-medium">Sản phẩm/Dịch vụ</span>
                            {quickFilters.products.length > 0 && (
                              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                {quickFilters.products.length}
                              </Badge>
                            )}
                          </div>
                          <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${openSections.products ? 'rotate-180' : ''}`} />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="px-4 pb-4">
                          <div className="grid grid-cols-1 gap-3">
                            {['Website Design', 'SEO Service', 'Digital Marketing', 'E-commerce'].map(product => (
                              <div key={product} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`product-${product}`}
                                  checked={quickFilters.products.includes(product)}
                                  onCheckedChange={() => handleQuickFilterToggle('products', product)}
                                />
                                <label htmlFor={`product-${product}`} className="text-sm cursor-pointer">
                                  {product}
                                </label>
                              </div>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>

                      {/* Sale Filter */}
                      <Collapsible 
                        open={openSections.assignedSale} 
                        onOpenChange={() => toggleSection('assignedSale')}
                        className="border border-gray-200 rounded-lg"
                      >
                        <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                              <span className="text-sm">👨‍💼</span>
                            </div>
                            <span className="font-medium">Sale phụ trách</span>
                            {quickFilters.assignedSale.length > 0 && (
                              <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                                {quickFilters.assignedSale.length}
                              </Badge>
                            )}
                          </div>
                          <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${openSections.assignedSale ? 'rotate-180' : ''}`} />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="px-4 pb-4">
                          <div className="grid grid-cols-1 gap-3">
                            {['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D', 'Chưa phân bổ'].map(sale => (
                              <div key={sale} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`sale-${sale}`}
                                  checked={quickFilters.assignedSale.includes(sale)}
                                  onCheckedChange={() => handleQuickFilterToggle('assignedSale', sale)}
                                />
                                <label htmlFor={`sale-${sale}`} className="text-sm cursor-pointer">
                                  {sale}
                                </label>
                              </div>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>

                      {/* Revenue Filter */}
                      <Collapsible 
                        open={openSections.revenue} 
                        onOpenChange={() => toggleSection('revenue')}
                        className="border border-gray-200 rounded-lg"
                      >
                        <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                              <span className="text-sm">💰</span>
                            </div>
                            <span className="font-medium">Doanh thu</span>
                            {quickFilters.revenue.length > 0 && (
                              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                {quickFilters.revenue.length}
                              </Badge>
                            )}
                          </div>
                          <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${openSections.revenue ? 'rotate-180' : ''}`} />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="px-4 pb-4">
                          <div className="grid grid-cols-1 gap-3">
                            {['Dưới 1 triệu', '1 - 3 triệu', '3 - 5 triệu', '5 - 10 triệu', 'Trên 10 triệu'].map(revenue => (
                              <div key={revenue} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`revenue-${revenue}`}
                                  checked={quickFilters.revenue.includes(revenue)}
                                  onCheckedChange={() => handleQuickFilterToggle('revenue', revenue)}
                                />
                                <label htmlFor={`revenue-${revenue}`} className="text-sm cursor-pointer">
                                  {revenue}
                                </label>
                              </div>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>

                    </div>
                  </div>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-3 bg-white text-sm text-gray-500">hoặc</span>
                    </div>
                  </div>

                  {/* Advanced Filters Section */}
                  <div>
                    <Collapsible 
                      open={openSections.advancedFilters} 
                      onOpenChange={() => toggleSection('advancedFilters')}
                      className="border border-gray-200 rounded-lg"
                    >
                      <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center">
                            <span className="text-sm">⚙️</span>
                          </div>
                          <span className="text-lg font-medium text-gray-900">Tạo bộ lọc với điều kiện</span>
                          {getActiveConditionsCount() > 0 && (
                            <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">
                              {getActiveConditionsCount()}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {getActiveConditionsCount() > 0 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                clearAdvancedFilters();
                              }}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <X className="h-4 w-4 mr-2" />
                              Xóa tất cả ({getActiveConditionsCount()})
                            </Button>
                          )}
                          <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${openSections.advancedFilters ? 'rotate-180' : ''}`} />
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="px-4 pb-4">
                        <div className="space-y-6">
                          {/* Filter Logic Selection */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Điều kiện lọc
                            </label>
                            <Select
                              value={filterLogic}
                              onValueChange={(value: 'and' | 'or') => setFilterLogic(value)}
                            >
                              <SelectTrigger className="w-full max-w-sm">
                                <SelectValue placeholder="Chọn điều kiện lọc" />
                              </SelectTrigger>
                              <SelectContent>
                                {filterLogicOptions.map(option => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <p className="text-sm text-gray-600 mt-1">
                              {filterLogic === 'and' 
                                ? 'Khách hàng phải thỏa mãn tất cả các điều kiện bên dưới'
                                : 'Khách hàng chỉ cần thỏa mãn bất kỳ điều kiện nào bên dưới'
                              }
                            </p>
                          </div>
                          
                          {/* Filter Conditions */}
                          <div className="space-y-4">
                            {conditions.map((condition, index) => (
                              <div key={condition.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50/30">
                                <div className="flex items-center justify-between mb-3">
                                  <span className="font-medium text-gray-700">Điều kiện {index + 1}</span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeCondition(condition.id)}
                                    disabled={conditions.length === 1}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                  {/* Field */}
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Trường dữ liệu
                                    </label>
                                    <Select
                                      value={condition.field}
                                      onValueChange={(value) => updateCondition(condition.id, 'field', value)}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Chọn trường" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {fieldOptions.map(field => (
                                          <SelectItem key={field.value} value={field.value}>
                                            {field.label}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  {/* Operator */}
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Điều kiện
                                    </label>
                                    <Select
                                      value={condition.operator}
                                      onValueChange={(value) => updateCondition(condition.id, 'operator', value)}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Chọn điều kiện" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {operatorOptions.map(op => (
                                          <SelectItem key={op.value} value={op.value}>
                                            {op.label}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  {/* Value */}
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Giá trị
                                    </label>
                                    <Input
                                      value={condition.value}
                                      onChange={(e) => updateCondition(condition.id, 'value', e.target.value)}
                                      placeholder="Nhập giá trị"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}

                            {/* Add Condition Button */}
                            <div className="flex justify-center">
                              <Button
                                variant="outline"
                                onClick={addCondition}
                                className="border-primary/30 text-primary hover:bg-primary/10"
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Thêm điều kiện lọc
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>

                  {/* Save Filter Section */}
                  {(getActiveQuickFiltersCount() > 0 || getActiveConditionsCount() > 0) && (
                    <div className="border-t border-gray-200 pt-6">
                      <Collapsible 
                        open={openSections.saveFilter} 
                        onOpenChange={() => toggleSection('saveFilter')}
                        className="border border-gray-200 rounded-lg"
                      >
                        <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                              <Save className="h-4 w-4 text-emerald-600" />
                            </div>
                            <span className="font-medium">Lưu bộ lọc hiện tại</span>
                            {filterName.trim() && (
                              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                                Sẵn sàng
                              </Badge>
                            )}
                          </div>
                          <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${openSections.saveFilter ? 'rotate-180' : ''}`} />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="px-4 pb-4">
                          <div className="space-y-3">
                            <p className="text-sm text-gray-600">
                              💾 Lưu bộ lọc hiện tại để sử dụng lại sau này
                            </p>
                            <div className="flex gap-3">
                              <Input
                                placeholder="Nhập tên bộ lọc..."
                                value={filterName}
                                onChange={(e) => setFilterName(e.target.value)}
                                className="flex-1"
                              />
                              <Button
                                onClick={handleSaveFilter}
                                disabled={!filterName.trim()}
                                className="bg-primary hover:bg-primary-hover"
                              >
                                <Save className="h-4 w-4 mr-2" />
                                Lưu
                              </Button>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Saved Filters Tab */}
            <TabsContent value="saved" className="flex-1 m-0 min-h-0 flex flex-col">
              <div className="flex-1 overflow-y-auto p-6 pb-0">
                {savedFilters.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <History className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có bộ lọc đã lưu</h3>
                    <p className="text-gray-600">Tạo và lưu bộ lọc để sử dụng lại sau này</p>
                  </div>
                ) : (
                  <div className="space-y-4 pb-6">
                    {savedFilters.map(filter => (
                      <div key={filter.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 mb-2">{filter.name}</h4>
                            <p className="text-sm text-gray-600 mb-3">
                              Tạo ngày: {filter.createdAt.toLocaleDateString('vi-VN')}
                            </p>
                            
                            {/* Filter Summary */}
                            <div className="space-y-2">
                              {Object.entries(filter.quickFilters).some(([_, values]) => values.length > 0) && (
                                <div>
                                  <span className="text-xs font-medium text-gray-500 uppercase">Lọc nhanh:</span>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {Object.entries(filter.quickFilters).map(([category, values]) => 
                                      values.map(value => (
                                        <Badge key={`${category}-${value}`} variant="outline" className="text-xs">
                                          {value}
                                        </Badge>
                                      ))
                                    )}
                                  </div>
                                </div>
                              )}
                              
                              {filter.conditions.length > 0 && (
                                <div>
                                  <span className="text-xs font-medium text-gray-500 uppercase">Điều kiện:</span>
                                  <div className="text-sm text-gray-600 mt-1">
                                    {filter.conditions.length} điều kiện tùy chỉnh
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Actions */}
                          <div className="flex items-center gap-2 ml-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleLoadSavedFilter(filter)}
                              className="text-primary hover:text-primary-hover hover:bg-primary/10"
                            >
                              📥 Tải vào form
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteSavedFilter(filter.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Footer */}
          <div className="p-6 pt-4 border-t border-gray-200 flex-shrink-0 bg-white">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                onClick={onClose}
                className="text-gray-600 hover:text-gray-800"
              >
                <X className="h-4 w-4 mr-2" />
                Đóng
              </Button>
              
              <Button 
                onClick={handleApply} 
                className="bg-primary hover:bg-primary-hover"
                disabled={getActiveQuickFiltersCount() === 0 && getActiveConditionsCount() === 0}
              >
                <Check className="h-4 w-4 mr-2" />
                Áp dụng bộ lọc
                {(getActiveQuickFiltersCount() > 0 || getActiveConditionsCount() > 0) && (
                  <Badge className="ml-2 bg-white text-primary">
                    {getActiveQuickFiltersCount() + getActiveConditionsCount()}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}