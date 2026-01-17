import { useState, useEffect } from 'react';
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
  ChevronDown, 
  X, 
  Plus, 
  Check,
  Filter,
  Save,
  History,
  Star,
  StarOff,
  Trash2,
  Clock,
  Target
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface FilterCondition {
  id: string;
  field: string;
  operator: string;
  value: string;
}

interface SavedFilter {
  id: string;
  name: string;
  description?: string;
  conditions: FilterCondition[];
  logicOperator: string;
  createdAt: Date;
  lastUsed?: Date;
  useCount: number;
  isFavorite: boolean;
}

interface LeadHubQuickFilterPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, string[]>) => void;
  currentFilters?: Record<string, string[]>;
  leads?: any[];
}

// Available fields for filtering - Lead Hub specific
const availableFields = [
  { value: 'name', label: 'Tên', icon: '👤' },
  { value: 'phone', label: 'SĐT', icon: '📞' },
  { value: 'email', label: 'Email', icon: '📧' },
  { value: 'questions', label: 'Câu hỏi', icon: '❓' },
  { value: 'source', label: 'Nguồn data', icon: '📍' },
  { value: 'products', label: 'Sản phẩm/Dịch vụ', icon: '💼' },
  { value: 'status', label: 'Trạng thái', icon: '🔄' },
  { value: 'quality', label: 'Chất lượng Lead', icon: '⭐' },
  { value: 'assignedSale', label: 'Sale phụ trách', icon: '👨‍💼' },
  { value: 'createdDate', label: 'Ngày tạo', icon: '📅' },
  { value: 'notes', label: 'Ghi chú', icon: '📝' },
];

// Operators for filtering
const operators = [
  { value: 'includes', label: 'Thuộc', icon: '✅' },
  { value: 'excludes', label: 'Không thuộc', icon: '❌' },
  { value: 'exists', label: 'Có giá trị', icon: '✔️' },
  { value: 'empty', label: 'Không có giá trị', icon: '🚫' },
];

// Logic operators
const logicOperators = [
  { value: 'and', label: 'Đáp ứng TẤT CẢ điều kiện', icon: '🔗' },
  { value: 'or', label: 'Đáp ứng BẤT KỲ điều kiện nào', icon: '🔀' },
];

export function LeadHubQuickFilterPopup({ isOpen, onClose, onApply, currentFilters = {}, leads = [] }: LeadHubQuickFilterPopupProps) {
  const [conditions, setConditions] = useState<FilterCondition[]>([]);
  const [logicOperator, setLogicOperator] = useState('and');
  
  // Saved filters management
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [filterDescription, setFilterDescription] = useState('');
  
  // Quick select filters state
  const [quickFilters, setQuickFilters] = useState<Record<string, string[]>>({});
  
  // Collapsible sections state - Lọc nhanh mặc định mở tất cả
  const [collapsibleSections, setCollapsibleSections] = useState({
    status: true,
    source: true,
    quality: true,
    products: true,
    assignedSale: true
  });

  // Advanced filter section state - Tạo bộ lọc mặc định đóng
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  
  // Load saved filters from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('leadhub-saved-filters');
    if (saved) {
      try {
        const parsed = JSON.parse(saved).map((filter: any) => ({
          ...filter,
          createdAt: new Date(filter.createdAt),
          lastUsed: filter.lastUsed ? new Date(filter.lastUsed) : undefined
        }));
        setSavedFilters(parsed);
      } catch (error) {
        console.error('Error loading saved filters:', error);
      }
    }
  }, []);
  
  // Save filters to localStorage whenever savedFilters changes
  useEffect(() => {
    localStorage.setItem('leadhub-saved-filters', JSON.stringify(savedFilters));
  }, [savedFilters]);

  // Initialize with current filters
  useEffect(() => {
    if (Object.keys(currentFilters).length > 0) {
      const initialConditions: FilterCondition[] = [];
      Object.entries(currentFilters).forEach(([field, values]) => {
        values.forEach((value, index) => {
          initialConditions.push({
            id: `${field}-${index}`,
            field,
            operator: 'includes',
            value
          });
        });
      });
      setConditions(initialConditions.length > 0 ? initialConditions : [createNewCondition()]);
      setQuickFilters(currentFilters);
    } else {
      setConditions([createNewCondition()]);
      setQuickFilters({});
    }
  }, [currentFilters, isOpen]);

  function createNewCondition(): FilterCondition {
    return {
      id: `condition-${Date.now()}-${Math.random()}`,
      field: '',
      operator: 'includes',
      value: ''
    };
  }

  const addCondition = () => {
    setConditions([...conditions, createNewCondition()]);
  };

  const removeCondition = (id: string) => {
    if (conditions.length > 1) {
      setConditions(conditions.filter(c => c.id !== id));
    }
  };

  const updateCondition = (id: string, updates: Partial<FilterCondition>) => {
    setConditions(conditions.map(c => 
      c.id === id ? { ...c, ...updates } : c
    ));
  };

  // Save current filter
  const handleSaveFilter = () => {
    if (!filterName.trim()) return;
    
    const newSavedFilter: SavedFilter = {
      id: `filter-${Date.now()}`,
      name: filterName.trim(),
      description: filterDescription.trim() || undefined,
      conditions: [...conditions],
      logicOperator,
      createdAt: new Date(),
      useCount: 0,
      isFavorite: false
    };
    
    setSavedFilters(prev => [newSavedFilter, ...prev]);
    setFilterName('');
    setFilterDescription('');
    setShowSaveDialog(false);
    
    alert(`✅ Đã lưu bộ lọc "${newSavedFilter.name}" thành công!`);
  };
  
  // Load saved filter
  const handleLoadSavedFilter = (savedFilter: SavedFilter) => {
    setConditions([...savedFilter.conditions]);
    setLogicOperator(savedFilter.logicOperator);
    
    // Update usage statistics
    setSavedFilters(prev => prev.map(filter => 
      filter.id === savedFilter.id 
        ? { 
            ...filter, 
            lastUsed: new Date(), 
            useCount: filter.useCount + 1 
          }
        : filter
    ));
    
    alert(`📂 Đã tải bộ lọc "${savedFilter.name}"`);
  };
  
  // Toggle favorite
  const handleToggleFavorite = (filterId: string) => {
    setSavedFilters(prev => prev.map(filter => 
      filter.id === filterId 
        ? { ...filter, isFavorite: !filter.isFavorite }
        : filter
    ));
  };
  
  // Delete saved filter
  const handleDeleteSavedFilter = (filterId: string) => {
    const filter = savedFilters.find(f => f.id === filterId);
    if (!filter) return;
    
    if (confirm(`Bạn có chắc chắn muốn xóa bộ lọc "${filter.name}"?`)) {
      setSavedFilters(prev => prev.filter(f => f.id !== filterId));
      alert(`🗑️ Đã xóa bộ lọc "${filter.name}"`);
    }
  };

  // Quick select filters handlers
  const handleQuickFilterToggle = (field: string, value: string) => {
    const newQuickFilters = { ...quickFilters };
    
    if (!newQuickFilters[field]) {
      newQuickFilters[field] = [];
    }
    
    const currentValues = newQuickFilters[field];
    if (currentValues.includes(value)) {
      newQuickFilters[field] = currentValues.filter(v => v !== value);
      if (newQuickFilters[field].length === 0) {
        delete newQuickFilters[field];
      }
    } else {
      newQuickFilters[field] = [...currentValues, value];
    }
    
    setQuickFilters(newQuickFilters);
  };

  const handleQuickApply = () => {
    onApply(quickFilters);
    onClose();
  };

  const handleQuickClear = () => {
    setQuickFilters({});
  };

  const getActiveFiltersCount = () => {
    return Object.values(quickFilters).reduce((count, values) => count + values.length, 0);
  };

  const toggleCollapsibleSection = (section: string) => {
    setCollapsibleSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };

  const handleApply = () => {
    const filters: Record<string, string[]> = {};
    
    conditions.forEach(condition => {
      if (condition.field && condition.value && !['exists', 'empty'].includes(condition.operator)) {
        if (!filters[condition.field]) {
          filters[condition.field] = [];
        }
        if (!filters[condition.field].includes(condition.value)) {
          filters[condition.field].push(condition.value);
        }
      } else if (condition.field && (condition.operator === 'exists' || condition.operator === 'empty')) {
        // For "exists" and "empty" operators, we need special handling in the parent component
        if (!filters[condition.field]) {
          filters[condition.field] = [];
        }
        // Use a special marker to indicate the operator type
        filters[condition.field].push(`__${condition.operator}__`);
      }
    });

    onApply(filters);
    onClose();
  };

  const handleClearAll = () => {
    setConditions([createNewCondition()]);
  };

  // Get unique values for a field from lead data
  const getFieldValues = (field: string) => {
    if (!leads || leads.length === 0) return [];
    
    // For specific fields, use predefined options instead of extracting from data
    const getPredefinedOptions = (field: string) => {
      switch (field) {
        case 'status':
          return ['Mới', 'Đang xử lí', 'Thành công', 'Thất bại'];
        case 'source':
          return [
            'Facebook Lead Ads', 
            'TikTok Lead Ads', 
            'Zalo Lead Ads', 
            'Landingpage Form', 
            'Campaign - Dự án A', 
            'Campaign - Dự án B',
            'Organic Search',
            'Google Ads'
          ];
        case 'products':
          return ['Website Design', 'SEO Service', 'Digital Marketing', 'E-commerce', 'Mobile App', 'Branding'];
        case 'assignedSale':
          return ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D', 'Chưa phân bổ'];
        case 'quality':
          return ['Hot/Nóng', 'Warm/Ấm', 'Cold/Lạnh'];
        default:
          return null; // Use extracted values for other fields
      }
    };

    // Check if we should use predefined options
    const predefinedOptions = getPredefinedOptions(field);
    if (predefinedOptions) {
      return predefinedOptions.sort();
    }
    
    // For other fields, extract unique values from data
    const values = leads.map(lead => {
      const value = lead[field];
      
      // Handle different data types
      if (Array.isArray(value)) {
        return value.map(v => String(v));
      }
      
      if (value instanceof Date) {
        return value.toLocaleDateString('vi-VN');
      }
      
      if (field === 'createdDate' && value) {
        const date = new Date(value);
        return date.toLocaleDateString('vi-VN');
      }
      
      return value ? String(value).trim() : '';
    }).flat().filter(v => v !== '');
    
    // Remove duplicates and sort
    const uniqueValues = [...new Set(values)];
    
    if (field === 'createdDate') {
      return uniqueValues.sort((a, b) => {
        const dateA = new Date(a.split('/').reverse().join('-'));
        const dateB = new Date(b.split('/').reverse().join('-'));
        return dateB.getTime() - dateA.getTime(); // Newest first
      });
    }
    
    return uniqueValues.sort();
  };

  const getFieldIcon = (field: string) => {
    const fieldConfig = availableFields.find(f => f.value === field);
    return fieldConfig ? fieldConfig.icon : '📋';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full max-h-[95vh] overflow-hidden rounded-xl shadow-lg border-0 p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Bộ lọc dữ liệu lead</DialogTitle>
          <DialogDescription>
            Tạo bộ lọc nâng cao để tìm kiếm và phân loại dữ liệu lead theo nhiều tiêu chí khác nhau
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col h-full max-h-[95vh]">
          {/* Header - Fixed */}
          <div className="p-6 pb-4 border-b border-gray-100 flex-shrink-0 bg-gradient-to-r from-purple-50 to-pink-50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <Filter className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Bộ lọc Lead Hub</h2>
                <p className="text-sm text-gray-600">Tìm kiếm và lưu bộ lọc</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="advanced" className="flex-1 flex flex-col min-h-0">
            <div className="px-6 py-2 border-b flex-shrink-0">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="advanced" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Bộ lọc
                </TabsTrigger>
                <TabsTrigger value="saved" className="flex items-center gap-2">
                  <History className="w-4 h-4" />
                  Đã lưu ({savedFilters.length})
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Advanced Filter Tab - Combined Quick Select + Create Filter */}
            <TabsContent value="advanced" className="flex-1 flex flex-col m-0 min-h-0">
              {/* Single unified content - no sub-tabs */}
              <div className="flex-1 overflow-y-auto p-6 min-h-0">
                <div className="space-y-8">
                  {/* Quick Filter Section */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Target className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Lọc nhanh</h3>
                        <p className="text-sm text-gray-600">Chọn nhanh theo các tiêu chí phổ biến</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Status Section */}
                      <Collapsible 
                        open={collapsibleSections.status} 
                        onOpenChange={() => toggleCollapsibleSection('status')}
                      >
                        <div className="bg-white rounded-lg border border-gray-200">
                          <CollapsibleTrigger className="w-full p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">🔄</span>
                                <h4 className="font-medium text-gray-900">Trạng thái</h4>
                                {quickFilters.status && quickFilters.status.length > 0 && (
                                  <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                                    {quickFilters.status.length}
                                  </Badge>
                                )}
                              </div>
                              <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${collapsibleSections.status ? 'rotate-180' : ''}`} />
                            </div>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="border-t border-gray-100">
                            <div className="p-4 grid grid-cols-2 gap-3">
                              {['Mới', 'Đang xử lí', 'Thành công', 'Thất bại'].map(status => (
                                <div key={status} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`status-${status}`}
                                    checked={quickFilters.status?.includes(status) || false}
                                    onCheckedChange={() => handleQuickFilterToggle('status', status)}
                                    className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                                  />
                                  <label 
                                    htmlFor={`status-${status}`} 
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                  >
                                    {status}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </CollapsibleContent>
                        </div>
                      </Collapsible>

                      {/* Source Section */}
                      <Collapsible 
                        open={collapsibleSections.source} 
                        onOpenChange={() => toggleCollapsibleSection('source')}
                      >
                        <div className="bg-white rounded-lg border border-gray-200">
                          <CollapsibleTrigger className="w-full p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">📍</span>
                                <h4 className="font-medium text-gray-900">Nguồn data</h4>
                                {quickFilters.source && quickFilters.source.length > 0 && (
                                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                                    {quickFilters.source.length}
                                  </Badge>
                                )}
                              </div>
                              <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${collapsibleSections.source ? 'rotate-180' : ''}`} />
                            </div>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="border-t border-gray-100">
                            <div className="p-4 grid grid-cols-1 gap-3">
                              {[
                                'Facebook Lead Ads', 
                                'TikTok Lead Ads', 
                                'Zalo Lead Ads', 
                                'Landingpage Form', 
                                'Campaign - Dự án A', 
                                'Campaign - Dự án B',
                                'Organic Search',
                                'Google Ads'
                              ].map(source => (
                                <div key={source} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`source-${source}`}
                                    checked={quickFilters.source?.includes(source) || false}
                                    onCheckedChange={() => handleQuickFilterToggle('source', source)}
                                    className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                                  />
                                  <label 
                                    htmlFor={`source-${source}`} 
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                  >
                                    {source}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </CollapsibleContent>
                        </div>
                      </Collapsible>

                      {/* Quality Section */}
                      <Collapsible 
                        open={collapsibleSections.quality} 
                        onOpenChange={() => toggleCollapsibleSection('quality')}
                      >
                        <div className="bg-white rounded-lg border border-gray-200">
                          <CollapsibleTrigger className="w-full p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">⭐</span>
                                <h4 className="font-medium text-gray-900">Chất lượng Lead</h4>
                                {quickFilters.quality && quickFilters.quality.length > 0 && (
                                  <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-700">
                                    {quickFilters.quality.length}
                                  </Badge>
                                )}
                              </div>
                              <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${collapsibleSections.quality ? 'rotate-180' : ''}`} />
                            </div>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="border-t border-gray-100">
                            <div className="p-4 grid grid-cols-1 gap-3">
                              {['Hot/Nóng', 'Warm/Ấm', 'Cold/Lạnh'].map(quality => (
                                <div key={quality} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`quality-${quality}`}
                                    checked={quickFilters.quality?.includes(quality) || false}
                                    onCheckedChange={() => handleQuickFilterToggle('quality', quality)}
                                    className="data-[state=checked]:bg-yellow-600 data-[state=checked]:border-yellow-600"
                                  />
                                  <label 
                                    htmlFor={`quality-${quality}`} 
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                  >
                                    {quality}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </CollapsibleContent>
                        </div>
                      </Collapsible>

                      {/* Products Section */}
                      <Collapsible 
                        open={collapsibleSections.products} 
                        onOpenChange={() => toggleCollapsibleSection('products')}
                      >
                        <div className="bg-white rounded-lg border border-gray-200">
                          <CollapsibleTrigger className="w-full p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">💼</span>
                                <h4 className="font-medium text-gray-900">Sản phẩm/Dịch vụ</h4>
                                {quickFilters.products && quickFilters.products.length > 0 && (
                                  <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                                    {quickFilters.products.length}
                                  </Badge>
                                )}
                              </div>
                              <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${collapsibleSections.products ? 'rotate-180' : ''}`} />
                            </div>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="border-t border-gray-100">
                            <div className="p-4 grid grid-cols-1 gap-3">
                              {['Website Design', 'SEO Service', 'Digital Marketing', 'E-commerce', 'Mobile App', 'Branding'].map(product => (
                                <div key={product} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`product-${product}`}
                                    checked={quickFilters.products?.includes(product) || false}
                                    onCheckedChange={() => handleQuickFilterToggle('products', product)}
                                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                  />
                                  <label 
                                    htmlFor={`product-${product}`} 
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                  >
                                    {product}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </CollapsibleContent>
                        </div>
                      </Collapsible>

                      {/* Assigned Sale Section */}
                      <Collapsible 
                        open={collapsibleSections.assignedSale} 
                        onOpenChange={() => toggleCollapsibleSection('assignedSale')}
                      >
                        <div className="bg-white rounded-lg border border-gray-200">
                          <CollapsibleTrigger className="w-full p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">👨‍💼</span>
                                <h4 className="font-medium text-gray-900">Sale phụ trách</h4>
                                {quickFilters.assignedSale && quickFilters.assignedSale.length > 0 && (
                                  <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                                    {quickFilters.assignedSale.length}
                                  </Badge>
                                )}
                              </div>
                              <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${collapsibleSections.assignedSale ? 'rotate-180' : ''}`} />
                            </div>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="border-t border-gray-100">
                            <div className="p-4 grid grid-cols-1 gap-3">
                              {['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D', 'Chưa phân bổ'].map(sale => (
                                <div key={sale} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`sale-${sale}`}
                                    checked={quickFilters.assignedSale?.includes(sale) || false}
                                    onCheckedChange={() => handleQuickFilterToggle('assignedSale', sale)}
                                    className="data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
                                  />
                                  <label 
                                    htmlFor={`sale-${sale}`} 
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                  >
                                    {sale}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </CollapsibleContent>
                        </div>
                      </Collapsible>

                      {/* Quick Filter Actions */}
                      <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            onClick={handleQuickClear}
                            className="text-gray-600 hover:text-gray-800 hover:bg-white"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Xóa tất cả
                          </Button>
                          <div className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full">
                            {getActiveFiltersCount()} bộ lọc
                          </div>
                        </div>
                        
                        <Button 
                          onClick={handleQuickApply} 
                          className="bg-purple-600 hover:bg-purple-700"
                          disabled={getActiveFiltersCount() === 0}
                        >
                          <Target className="h-4 w-4 mr-2" />
                          Áp dụng ({getActiveFiltersCount()})
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-background text-gray-500">hoặc</span>
                    </div>
                  </div>

                  {/* Advanced Filter Section - Collapsible with default closed */}
                  <Collapsible 
                    open={isAdvancedFilterOpen} 
                    onOpenChange={setIsAdvancedFilterOpen}
                  >
                    <div className="bg-white rounded-lg border border-gray-200">
                      <CollapsibleTrigger className="w-full p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                              <Filter className="w-4 h-4 text-purple-600" />
                            </div>
                            <div className="text-left">
                              <h3 className="text-lg font-medium text-gray-900">Tạo bộ lọc nâng cao</h3>
                              <p className="text-sm text-gray-600">Tùy chỉnh điều kiện lọc chi tiết</p>
                            </div>
                          </div>
                          <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${isAdvancedFilterOpen ? 'rotate-180' : ''}`} />
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="border-t border-gray-100">
                        <div className="p-6">{/* Advanced filter content wrapper */}

                    {/* Logic Operator Selector */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Điều kiện lọc</label>
                      <Select value={logicOperator} onValueChange={setLogicOperator}>
                        <SelectTrigger className="w-full border-gray-200 h-10 bg-white">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{logicOperators.find(op => op.value === logicOperator)?.icon}</span>
                            <SelectValue />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          {logicOperators.map(op => (
                            <SelectItem key={op.value} value={op.value}>
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{op.icon}</span>
                                <span>{op.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Filter Conditions */}
                    <div className="space-y-4">
                      {conditions.map((condition, index) => (
                        <div key={condition.id} className="bg-white rounded-lg border-2 border-gray-100 hover:border-purple-200 transition-colors shadow-sm">
                          {/* Card Header */}
                          <div className="p-4 border-b border-gray-100 bg-gray-50 rounded-t-lg">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{getFieldIcon(condition.field)}</span>
                                <span className="font-medium text-gray-700">
                                  Điều kiện {index + 1}
                                </span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeCondition(condition.id)}
                                disabled={conditions.length === 1}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1 h-8 w-8"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Card Content */}
                          <div className="p-4 space-y-4">
                            {/* Field Selector */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Trường dữ liệu
                              </label>
                              <Select 
                                value={condition.field} 
                                onValueChange={(value) => updateCondition(condition.id, { field: value, value: '' })}
                              >
                                <SelectTrigger className="w-full border-gray-200 h-10 bg-white">
                                  <div className="flex items-center gap-2">
                                    {condition.field && (
                                      <span className="text-lg">{getFieldIcon(condition.field)}</span>
                                    )}
                                    <SelectValue placeholder="Chọn trường dữ liệu" />
                                  </div>
                                </SelectTrigger>
                                <SelectContent>
                                  {availableFields.map(field => (
                                    <SelectItem key={field.value} value={field.value}>
                                      <div className="flex items-center gap-2">
                                        <span className="text-lg">{field.icon}</span>
                                        <span>{field.label}</span>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            {/* Operator Selector */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Toán tử
                              </label>
                              <Select 
                                value={condition.operator} 
                                onValueChange={(value) => updateCondition(condition.id, { operator: value })}
                              >
                                <SelectTrigger className="w-full border-gray-200 h-10 bg-white">
                                  <div className="flex items-center gap-2">
                                    <span className="text-lg">{operators.find(op => op.value === condition.operator)?.icon}</span>
                                    <SelectValue />
                                  </div>
                                </SelectTrigger>
                                <SelectContent>
                                  {operators.map(op => (
                                    <SelectItem key={op.value} value={op.value}>
                                      <div className="flex items-center gap-2">
                                        <span className="text-lg">{op.icon}</span>
                                        <span>{op.label}</span>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            {/* Value Input/Selector */}
                            {!['exists', 'empty'].includes(condition.operator) && (
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Giá trị
                                </label>
                                {condition.field && getFieldValues(condition.field).length > 0 ? (
                                  <Select 
                                    value={condition.value} 
                                    onValueChange={(value) => updateCondition(condition.id, { value })}
                                  >
                                    <SelectTrigger className="w-full border-gray-200 h-10 bg-white">
                                      <SelectValue placeholder="Chọn giá trị" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {getFieldValues(condition.field).map((value, idx) => (
                                        <SelectItem key={idx} value={value}>
                                          {value}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                ) : (
                                  <Input
                                    type="text"
                                    value={condition.value}
                                    onChange={(e) => updateCondition(condition.id, { value: e.target.value })}
                                    placeholder="Nhập giá trị..."
                                    className="w-full border-gray-200 bg-white"
                                  />
                                )}
                              </div>
                            )}

                            {/* Preview */}
                            {condition.field && (
                              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                                <div className="text-sm text-purple-800">
                                  <span className="font-medium">Xem trước:</span>
                                  <div className="mt-1">
                                    <Badge variant="secondary" className="text-purple-700 bg-purple-100">
                                      {availableFields.find(f => f.value === condition.field)?.label || condition.field}
                                    </Badge>
                                    <span className="mx-2">
                                      {operators.find(op => op.value === condition.operator)?.label || condition.operator}
                                    </span>
                                    {!['exists', 'empty'].includes(condition.operator) && condition.value && (
                                      <Badge variant="outline" className="border-purple-300 text-purple-700">
                                        {condition.value}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add Condition Button */}
                    <div className="mt-6">
                      <Button
                        variant="outline"
                        onClick={addCondition}
                        className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Thêm điều kiện
                      </Button>
                    </div>

                          {/* Save Filter Section */}
                          <div className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                            <div className="flex items-center gap-2 mb-3">
                              <Save className="w-5 h-5 text-purple-600" />
                              <h4 className="font-medium text-gray-900">Lưu bộ lọc</h4>
                            </div>
                            <div className="space-y-3">
                              <Input
                                type="text"
                                placeholder="Tên bộ lọc..."
                                value={filterName}
                                onChange={(e) => setFilterName(e.target.value)}
                                className="bg-white border-purple-200"
                              />
                              <Input
                                type="text"
                                placeholder="Mô tả (tùy chọn)..."
                                value={filterDescription}
                                onChange={(e) => setFilterDescription(e.target.value)}
                                className="bg-white border-purple-200"
                              />
                              <Button
                                onClick={handleSaveFilter}
                                disabled={!filterName.trim() || conditions.every(c => !c.field)}
                                className="w-full bg-purple-600 hover:bg-purple-700"
                              >
                                <Save className="h-4 w-4 mr-2" />
                                Lưu bộ lọc
                              </Button>
                            </div>
                          </div>
                        </div>{/* End advanced filter content wrapper */}
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                </div>
              </div>
            </TabsContent>

            {/* Saved Filters Tab */}
            <TabsContent value="saved" className="flex-1 flex flex-col m-0 min-h-0">
              <div className="flex-1 overflow-y-auto p-6">
                {savedFilters.length === 0 ? (
                  <div className="text-center py-12">
                    <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có bộ lọc đã lưu</h3>
                    <p className="text-gray-600">Tạo và lưu bộ lọc để sử dụng lại sau này</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {savedFilters
                      .sort((a, b) => {
                        // Sort by favorite first, then by last used
                        if (a.isFavorite && !b.isFavorite) return -1;
                        if (!a.isFavorite && b.isFavorite) return 1;
                        
                        const aTime = a.lastUsed?.getTime() || a.createdAt.getTime();
                        const bTime = b.lastUsed?.getTime() || b.createdAt.getTime();
                        
                        return bTime - aTime;
                      })
                      .map(filter => (
                        <div key={filter.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-medium text-gray-900">{filter.name}</h4>
                                {filter.isFavorite && (
                                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                )}
                              </div>
                              {filter.description && (
                                <p className="text-sm text-gray-600 mb-2">{filter.description}</p>
                              )}
                              
                              {/* Show filter conditions preview */}
                              <div className="mb-3">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-xs font-medium text-gray-500 uppercase">Điều kiện:</span>
                                  <Badge variant="outline" className="text-xs">
                                    {filter.logicOperator === 'and' ? 'TẤT CẢ' : 'BẤT KỲ'}
                                  </Badge>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {filter.conditions.slice(0, 3).map((condition, idx) => (
                                    <div key={idx} className="flex items-center gap-1 bg-purple-50 text-purple-700 px-2 py-1 rounded text-xs">
                                      <span className="text-xs">{getFieldIcon(condition.field)}</span>
                                      <span className="font-medium">
                                        {availableFields.find(f => f.value === condition.field)?.label || condition.field}
                                      </span>
                                      <span className="text-purple-500">
                                        {operators.find(op => op.value === condition.operator)?.label || condition.operator}
                                      </span>
                                      {condition.value && !['exists', 'empty'].includes(condition.operator) && (
                                        <span className="bg-purple-100 px-1 rounded">{condition.value}</span>
                                      )}
                                    </div>
                                  ))}
                                  {filter.conditions.length > 3 && (
                                    <Badge variant="secondary" className="text-xs">
                                      +{filter.conditions.length - 3} khác
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {filter.lastUsed 
                                    ? `Dùng lần cuối: ${filter.lastUsed.toLocaleDateString('vi-VN')}`
                                    : `Tạo: ${filter.createdAt.toLocaleDateString('vi-VN')}`
                                  }
                                </span>
                                <span>Đã dùng: {filter.useCount} lần</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleToggleFavorite(filter.id)}
                                className="text-gray-400 hover:text-yellow-500"
                              >
                                {filter.isFavorite ? (
                                  <Star className="w-4 h-4 fill-current" />
                                ) : (
                                  <StarOff className="w-4 h-4" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleLoadSavedFilter(filter)}
                                className="text-purple-600 hover:text-purple-700"
                              >
                                Tải
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteSavedFilter(filter.id)}
                                className="text-red-600 hover:text-red-700"
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

          {/* Footer - Fixed */}
          <div className="p-6 pt-4 border-t border-gray-100 flex-shrink-0 bg-gray-50">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                onClick={onClose}
                className="text-gray-600 hover:text-gray-800"
              >
                <X className="h-4 w-4 mr-2" />
                Đóng
              </Button>
              
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  onClick={handleClearAll}
                  className="border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Xóa tất cả
                </Button>
                <Button 
                  onClick={handleApply} 
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Áp dụng bộ lọc nâng cao
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}