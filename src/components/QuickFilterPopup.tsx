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

interface QuickFilterPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, string[]>) => void;
  currentFilters?: Record<string, string[]>;
  customers?: any[];
}

// Available fields for filtering - Expanded to include all customer fields
const availableFields = [
  { value: 'name', label: 'Tên khách hàng', icon: '👤' },
  { value: 'phone', label: 'Số điện thoại', icon: '📞' },
  { value: 'email', label: 'Email', icon: '📧' },
  { value: 'source', label: 'Nguồn', icon: '📍' },
  { value: 'status', label: 'Trạng thái', icon: '🔄' },
  { value: 'assignedSale', label: 'Sale phụ trách', icon: '👨‍💼' },
  { value: 'products', label: 'Sản phẩm/Dịch vụ', icon: '💼' },
  { value: 'quality', label: 'Chất lượng', icon: '⭐' },
  { value: 'createdDate', label: 'Thời gian', icon: '📅' },
  { value: 'notes', label: 'Ghi chú', icon: '📝' },
  { value: 'questions', label: 'Câu hỏi', icon: '❓' },
  { value: 'address', label: 'Địa chỉ', icon: '🏠' },
  { value: 'revenue', label: 'Doanh thu', icon: '💰' },
  { value: 'id', label: 'ID Customer', icon: '🆔' },
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

export function QuickFilterPopup({ isOpen, onClose, onApply, currentFilters = {}, customers = [] }: QuickFilterPopupProps) {
  const [conditions, setConditions] = useState<FilterCondition[]>([]);
  const [logicOperator, setLogicOperator] = useState('and');
  
  // Saved filters management
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [filterDescription, setFilterDescription] = useState('');
  
  // Quick select filters state
  const [quickFilters, setQuickFilters] = useState<Record<string, string[]>>({});
  
  // Load saved filters from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('crm-saved-filters');
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
    localStorage.setItem('crm-saved-filters', JSON.stringify(savedFilters));
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

  // Get unique values for a field from customer data
  const getFieldValues = (field: string) => {
    if (!customers || customers.length === 0) return [];
    
    // For specific fields, use predefined options instead of extracting from data
    const getPredefinedOptions = (field: string) => {
      switch (field) {
        case 'status':
          return ['Mới', 'Đang xử lý', 'Thành công', 'Thất bại']; // Fixed list, no 'Lạnh'
        case 'source':
          return ['Facebook', 'Google', 'TikTok', 'Zalo', 'Website', 'Giới thiệu'];
        case 'products':
          return ['Website Design', 'SEO Service', 'Digital Marketing', 'E-commerce'];
        case 'assignedSale':
          return ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D', 'Chưa phân bổ'];
        case 'revenue':
          // Revenue range options
          return [
            'Dưới 1 triệu',
            '1 - 3 triệu', 
            '3 - 5 triệu',
            '5 - 10 triệu',
            'Trên 10 triệu'
          ];
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
    const values = customers.map(customer => {
      const value = customer[field];
      
      // Handle different data types
      if (Array.isArray(value)) {
        return value.map(v => String(v));
      }
      
      if (value instanceof Date) {
        return value.toLocaleDateString('vi-VN');
      }
      
      if (field === 'revenue' && typeof value === 'number') {
        return value.toLocaleString('vi-VN') + ' VNĐ';
      }
      
      if (field === 'quality' && typeof value === 'number') {
        return `${value} sao`;
      }
      
      if (field === 'createdDate' && value) {
        const date = new Date(value);
        return date.toLocaleDateString('vi-VN');
      }
      
      return value ? String(value).trim() : '';
    }).flat().filter(v => v !== '');
    
    // Remove duplicates and sort
    const uniqueValues = [...new Set(values)];
    
    // Smart sorting based on field type
    if (field === 'quality') {
      return uniqueValues.sort((a, b) => {
        const numA = parseInt(a);
        const numB = parseInt(b);
        return numA - numB;
      });
    }
    
    if (field === 'revenue') {
      return uniqueValues.sort((a, b) => {
        const numA = parseFloat(a.replace(/[^\d]/g, ''));
        const numB = parseFloat(b.replace(/[^\d]/g, ''));
        return numA - numB;
      });
    }
    
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
          <DialogTitle>Bộ lọc dữ liệu khách hàng</DialogTitle>
          <DialogDescription>
            Tạo bộ lọc nâng cao để tìm kiếm và phân loại dữ liệu khách hàng theo nhiều tiêu chí khác nhau
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col h-full max-h-[95vh]">
          {/* Header - Fixed */}
          <div className="p-6 pb-4 border-b border-gray-100 flex-shrink-0 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Filter className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Bộ lọc nâng cao</h2>
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
                  Bộ lọc nâng cao
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
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Target className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Lọc nhanh</h3>
                        <p className="text-sm text-gray-600">Chọn nhanh theo các tiêu chí phổ biến</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Status Section */}
                      <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-lg">🔄</span>
                          <h4 className="font-medium text-gray-900">Trạng thái</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {['Mới', 'Đang xử lý', 'Thành công', 'Thất bại'].map(status => (
                            <div key={status} className="flex items-center space-x-2">
                              <Checkbox
                                id={`status-${status}`}
                                checked={quickFilters.status?.includes(status) || false}
                                onCheckedChange={() => handleQuickFilterToggle('status', status)}
                                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
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
                      </div>

                      {/* Source Section */}
                      <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-lg">📍</span>
                          <h4 className="font-medium text-gray-900">Nguồn</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {['Facebook', 'Google', 'TikTok', 'Zalo', 'Website', 'Giới thiệu'].map(source => (
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
                      </div>

                      {/* Products Section */}
                      <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-lg">💼</span>
                          <h4 className="font-medium text-gray-900">Sản phẩm/Dịch vụ</h4>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                          {['Website Design', 'SEO Service', 'Digital Marketing', 'E-commerce'].map(product => (
                            <div key={product} className="flex items-center space-x-2">
                              <Checkbox
                                id={`product-${product}`}
                                checked={quickFilters.products?.includes(product) || false}
                                onCheckedChange={() => handleQuickFilterToggle('products', product)}
                                className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
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
                      </div>

                      {/* Assigned Sale Section */}
                      <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-lg">👨‍💼</span>
                          <h4 className="font-medium text-gray-900">Sale phụ trách</h4>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
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
                      </div>

                      {/* Revenue Section */}
                      <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-lg">💰</span>
                          <h4 className="font-medium text-gray-900">Doanh thu</h4>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                          {['Dưới 1 triệu', '1 - 3 triệu', '3 - 5 triệu', '5 - 10 triệu', 'Trên 10 triệu'].map(revenue => (
                            <div key={revenue} className="flex items-center space-x-2">
                              <Checkbox
                                id={`revenue-${revenue}`}
                                checked={quickFilters.revenue?.includes(revenue) || false}
                                onCheckedChange={() => handleQuickFilterToggle('revenue', revenue)}
                                className="data-[state=checked]:bg-yellow-600 data-[state=checked]:border-yellow-600"
                              />
                              <label 
                                htmlFor={`revenue-${revenue}`} 
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                              >
                                {revenue}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Quick Filter Actions */}
                      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
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
                          className="bg-blue-600 hover:bg-blue-700"
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

                  {/* Advanced Filter Section */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Filter className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Tạo bộ lọc nâng cao</h3>
                        <p className="text-sm text-gray-600">Tùy chỉnh điều kiện lọc chi tiết</p>
                      </div>
                    </div>

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
                                className="p-1 h-7 w-7 hover:bg-red-100 hover:text-red-600 disabled:opacity-30 rounded-full"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Card Body */}
                          <div className="p-4 space-y-4">
                            {/* Field Selector */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Trường dữ liệu</label>
                              <Select 
                                value={condition.field} 
                                onValueChange={(value) => updateCondition(condition.id, { field: value, value: '' })}
                              >
                                <SelectTrigger className="w-full border-gray-200 h-11">
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
                              <label className="block text-sm font-medium text-gray-700 mb-2">Điều kiện</label>
                              <Select 
                                value={condition.operator} 
                                onValueChange={(value) => updateCondition(condition.id, { operator: value })}
                              >
                                <SelectTrigger className="w-full border-gray-200 h-11">
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

                            {/* Value Input */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Giá trị</label>
                              {condition.operator === 'exists' ? (
                                <div className="w-full px-4 py-3 bg-green-50 text-green-700 rounded-lg border border-green-200 h-11 flex items-center">
                                  <div className="flex items-center gap-2">
                                    <Check className="h-4 w-4" />
                                    <span>Có giá trị (bất kỳ)</span>
                                  </div>
                                </div>
                              ) : condition.operator === 'empty' ? (
                                <div className="w-full px-4 py-3 bg-red-50 text-red-700 rounded-lg border border-red-200 h-11 flex items-center">
                                  <div className="flex items-center gap-2">
                                    <X className="h-4 w-4" />
                                    <span>Không có giá trị (rỗng/null)</span>
                                  </div>
                                </div>
                              ) : condition.field ? (
                                <Select 
                                  value={condition.value} 
                                  onValueChange={(value) => updateCondition(condition.id, { value })}
                                >
                                  <SelectTrigger className="w-full border-gray-200 h-11">
                                    <SelectValue placeholder="Chọn giá trị để lọc" />
                                  </SelectTrigger>
                                  <SelectContent className="max-h-60">
                                    {getFieldValues(condition.field).map((value, valueIndex) => (
                                      <SelectItem key={`${value}-${valueIndex}`} value={value}>
                                        <div className="flex items-center gap-2">
                                          <span className="text-gray-500">•</span>
                                          <span className="truncate max-w-64">{value}</span>
                                        </div>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : (
                                <Input 
                                  placeholder="Vui lòng chọn trường dữ liệu trước"
                                  value=""
                                  className="w-full border-gray-200 h-11"
                                  disabled
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Add Filter Button */}
                      <div className="pt-2">
                        <Button
                          variant="outline"
                          onClick={addCondition}
                          className="w-full border-dashed border-2 border-purple-300 text-purple-600 hover:bg-purple-50 hover:border-purple-400 hover:text-purple-700 h-12 rounded-lg"
                        >
                          <Plus className="h-5 w-5 mr-2" />
                          Thêm điều kiện lọc
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer - Fixed */}
              <div className="flex-shrink-0 border-t border-gray-200 bg-white p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      onClick={handleClearAll}
                      className="text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Xóa tất cả
                    </Button>

                    <Button
                      variant="ghost"
                      onClick={() => setShowSaveDialog(true)}
                      disabled={conditions.every(c => !c.field || (c.operator !== 'exists' && c.operator !== 'empty' && !c.value))}
                      className="text-purple-600 hover:text-purple-800 hover:bg-purple-50"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Lưu bộ lọc
                    </Button>
                  </div>
                  
                  <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                    {conditions.length} điều kiện nâng cao
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    onClick={onClose} 
                    className="h-12"
                  >
                    Hủy bỏ
                  </Button>
                  <Button 
                    onClick={handleApply} 
                    className="bg-purple-600 hover:bg-purple-700 h-12"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Áp dụng bộ lọc
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Save Filter Dialog */}
        {showSaveDialog && (
          <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
            <DialogContent className="max-w-md">
              <DialogTitle>Lưu bộ lọc</DialogTitle>
              <DialogDescription>
                Đặt tên và mô tả cho bộ lọc để dễ dàng sử dụng lại sau này
              </DialogDescription>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên bộ lọc <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Ví dụ: Khách hàng tiềm năng Q4"
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mô tả (tùy chọn)
                  </label>
                  <Input
                    placeholder="Mô tả ngắn gọn về bộ lọc này"
                    value={filterDescription}
                    onChange={(e) => setFilterDescription(e.target.value)}
                  />
                </div>
                <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded">
                  <strong>Điều kiện hiện tại:</strong>
                  <ul className="mt-1 space-y-1">
                    {conditions
                      .filter(c => c.field && (c.value || c.operator === 'exists' || c.operator === 'empty'))
                      .map((condition, index) => (
                      <li key={condition.id} className="flex items-center gap-2">
                        <span className="text-lg">{getFieldIcon(condition.field)}</span>
                        <span>
                          {availableFields.find(f => f.value === condition.field)?.label} {operators.find(op => op.value === condition.operator)?.label.toLowerCase()}{condition.value ? ` "${condition.value}"` : ''}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
                  Hủy
                </Button>
                <Button 
                  onClick={handleSaveFilter}
                  disabled={!filterName.trim()}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Lưu bộ lọc
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </DialogContent>
    </Dialog>
  );
}