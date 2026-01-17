import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { ScrollArea } from './ui/scroll-area';
import { 
  Filter,
  RefreshCw,
  ChevronDown, 
  X, 
  Plus, 
  Check,
  Save,
  History,
  Star,
  StarOff,
  Settings,
  Trash2
} from 'lucide-react';

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
  dataType: 'customers' | 'leads';
}

interface RestoreDataFilterPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
  dataType: 'customers' | 'leads';
  data: any[];
}

// Available fields for filtering
const availableFields = [
  { value: 'name', label: 'Tên', icon: '👤' },
  { value: 'phone', label: 'SĐT', icon: '📞' },
  { value: 'email', label: 'Email', icon: '📧' },
  { value: 'questions', label: 'Câu hỏi/Nhu cầu', icon: '❓' },
  { value: 'source', label: 'Nguồn data', icon: '📍' },
  { value: 'products', label: 'Sản phẩm/Dịch vụ', icon: '💼' },
  { value: 'status', label: 'Trạng thái (gốc)', icon: '🔄' },
  { value: 'quality', label: 'Chất lượng', icon: '⭐' },
  { value: 'assignedSale', label: 'Sale phụ trách', icon: '👨‍💼' },
  { value: 'deletedAt', label: 'Ngày xóa', icon: '📅' },
  { value: 'deletedBy', label: 'Người xóa', icon: '👤' },
  { value: 'notes', label: 'Ghi chú', icon: '📝' },
];

// Operators for filtering
const operators = [
  { value: 'includes', label: 'Thuộc', icon: '✅' },
  { value: 'excludes', label: 'Không thuộc', icon: '❌' },
  { value: 'contains', label: 'Chứa từ khóa', icon: '🔍' },
  { value: 'not_contains', label: 'Không chứa', icon: '🚫' },
  { value: 'exists', label: 'Có giá trị', icon: '✔️' },
  { value: 'empty', label: 'Không có giá trị', icon: '⚪' },
];

// Logic operators
const logicOperators = [
  { value: 'and', label: 'Đáp ứng TẤT CẢ điều kiện', icon: '🔗' },
  { value: 'or', label: 'Đáp ứng BẤT KỲ điều kiện nào', icon: '🔀' },
];

export function RestoreDataFilterPopup({
  isOpen,
  onClose,
  onApplyFilters,
  dataType,
  data
}: RestoreDataFilterPopupProps) {
  // Advanced filtering states
  const [conditions, setConditions] = useState<FilterCondition[]>([]);
  const [logicOperator, setLogicOperator] = useState('and');
  
  // Saved filters management
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [filterDescription, setFilterDescription] = useState('');
  
  // Quick select filters state
  const [quickFilters, setQuickFilters] = useState<Record<string, string[]>>({});
  
  // Basic filters
  const [basicFilters, setBasicFilters] = useState({
    search: '',
    dateRange: 'all',
    deletedBy: 'all'
  });
  
  // Collapsible sections state
  const [collapsibleSections, setCollapsibleSections] = useState({
    status: true,
    source: true,
    quality: true,
    products: true,
    assignedSale: true,
    deletedBy: true
  });

  // Filter tab state
  const [activeFilterTab, setActiveFilterTab] = useState<'quick' | 'advanced' | 'saved'>('quick');
  
  // Load saved filters from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('restore-data-saved-filters');
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
    localStorage.setItem('restore-data-saved-filters', JSON.stringify(savedFilters));
  }, [savedFilters]);

  // Initialize conditions
  useEffect(() => {
    if (conditions.length === 0) {
      setConditions([createNewCondition()]);
    }
  }, [isOpen]);

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
      isFavorite: false,
      dataType: dataType
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

  // Advanced filter handlers
  const handleAdvancedClear = () => {
    setConditions([createNewCondition()]);
    setLogicOperator('and');
  };

  // Get all unique values for quick filters
  const getUniqueValues = (field: string, data: any[]) => {
    const values = new Set<string>();
    data.forEach(item => {
      const value = item[field];
      if (value) {
        if (Array.isArray(value)) {
          value.forEach(v => values.add(String(v)));
        } else {
          values.add(String(value));
        }
      }
    });
    return Array.from(values).sort();
  };

  // Clear all filters
  const clearAllFilters = () => {
    const hasActiveFilters = getActiveFilterCount() > 0;
    
    if (hasActiveFilters && !confirm('🗑️ Bạn có chắc chắn muốn xóa tất cả bộ lọc đang có?')) {
      return;
    }
    
    setBasicFilters({
      search: '',
      dateRange: 'all',
      deletedBy: 'all'
    });
    setQuickFilters({});
    setConditions([createNewCondition()]);
    setLogicOperator('and');
    
    if (hasActiveFilters) {
      console.log('🧹 Đã xóa tất cả bộ lọc');
    }
  };

  const getActiveFilterCount = () => {
    let count = 0;
    
    // Basic filters
    count += Object.values(basicFilters).filter(value => value !== '' && value !== 'all').length;
    
    // Quick filters
    count += Object.values(quickFilters).reduce((sum, values) => sum + values.length, 0);
    
    // Advanced filters
    count += conditions.filter(c => c.field && (c.value || ['exists', 'empty'].includes(c.operator))).length;
    
    return count;
  };

  // Apply filters and close
  const handleApplyFilters = () => {
    const activeConditions = conditions.filter(c => c.field && (c.value || ['exists', 'empty'].includes(c.operator)));
    const activeBasicFilters = Object.entries(basicFilters).filter(([_, value]) => value !== '' && value !== 'all');
    const activeQuickFilters = Object.values(quickFilters).reduce((sum, values) => sum + values.length, 0);
    
    // Validate that there's at least one active filter
    if (activeConditions.length === 0 && activeBasicFilters.length === 0 && activeQuickFilters === 0) {
      alert('⚠️ Vui lòng thiết lập ít nhất một bộ lọc trước khi áp dụng!');
      return;
    }
    
    const allFilters = {
      basic: basicFilters,
      quick: quickFilters,
      advanced: {
        conditions: activeConditions,
        logicOperator
      }
    };
    
    // Show confirmation message with filter count
    const totalActiveFilters = activeConditions.length + activeBasicFilters.length + activeQuickFilters;
    console.log(`✅ Áp dụng ${totalActiveFilters} bộ lọc cho ${dataType === 'customers' ? 'khách hàng' : 'leads'} đã xóa`);
    
    onApplyFilters(allFilters);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-full h-[95vh] max-h-[95vh] flex flex-col p-0">
        <DialogHeader className="flex-shrink-0 px-6 py-4 border-b">
          <DialogTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            Bộ lọc nâng cao - {dataType === 'customers' ? 'Khách hàng' : 'Leads'}
            {getActiveFilterCount() > 0 && (
              <Badge variant="secondary" className="bg-primary/10 text-primary ml-2">
                {getActiveFilterCount()} bộ lọc
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            Tạo và áp dụng bộ lọc nâng cao để tìm kiếm dữ liệu đã xóa. Hỗ trợ lọc nhanh, điều kiện phức tạp và lưu bộ lọc.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 flex flex-col min-h-0 gap-4 px-6 py-4">
          {/* Basic Filters */}
          <div className="flex-shrink-0 space-y-3 p-4 border rounded-lg bg-muted/20">
            <h3 className="font-medium flex items-center gap-2 text-sm">
              <Filter className="h-4 w-4" />
              Lọc cơ bản
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="text-sm font-medium mb-1 block">Tìm kiếm</label>
                <Input
                  placeholder="Tên, SĐT, email..."
                  value={basicFilters.search}
                  onChange={(e) => setBasicFilters(prev => ({ ...prev, search: e.target.value }))}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Thời gian xóa</label>
                <Select 
                  value={basicFilters.dateRange} 
                  onValueChange={(value) => setBasicFilters(prev => ({ ...prev, dateRange: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="today">Hôm nay</SelectItem>
                    <SelectItem value="week">7 ngày qua</SelectItem>
                    <SelectItem value="month">30 ngày qua</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Người xóa</label>
                <Select 
                  value={basicFilters.deletedBy} 
                  onValueChange={(value) => setBasicFilters(prev => ({ ...prev, deletedBy: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="current_user">Tôi</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Advanced Filter Tabs */}
          <Tabs value={activeFilterTab} onValueChange={(value) => setActiveFilterTab(value as any)} className="flex-1 flex flex-col min-h-0 overflow-hidden">
            <TabsList className="grid w-full grid-cols-3 flex-shrink-0">
              <TabsTrigger value="quick" className="text-sm">
                <Filter className="h-4 w-4 mr-1" />
                Lọc nhanh
              </TabsTrigger>
              <TabsTrigger value="advanced" className="text-sm">
                <Settings className="h-4 w-4 mr-1" />
                Nâng cao
              </TabsTrigger>
              <TabsTrigger value="saved" className="text-sm">
                <Save className="h-4 w-4 mr-1" />
                Đã lưu
              </TabsTrigger>
            </TabsList>

            {/* Quick Filters Tab */}
            <TabsContent value="quick" className="flex-1 mt-3 min-h-0 overflow-hidden">
              <ScrollArea className="h-full max-h-[calc(95vh-240px)]">
                <div className="space-y-3 pr-2 pb-4">
                  {/* Status Filter */}
                  <Collapsible
                    open={collapsibleSections.status}
                    onOpenChange={() => toggleCollapsibleSection('status')}
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted/50 rounded-lg border text-sm">
                      <span className="font-medium">🔄 Trạng thái gốc</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${collapsibleSections.status ? 'rotate-180' : ''}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2 p-3 space-y-2 border rounded-lg bg-muted/20 max-h-32 overflow-y-auto">
                      {getUniqueValues('status', data).map(status => (
                        <div key={status} className="flex items-center space-x-2">
                          <Checkbox
                            id={`status-${status}`}
                            checked={quickFilters.status?.includes(status) || false}
                            onCheckedChange={() => handleQuickFilterToggle('status', status)}
                          />
                          <label htmlFor={`status-${status}`} className="text-sm cursor-pointer flex-1">
                            {status}
                          </label>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Source Filter */}
                  <Collapsible
                    open={collapsibleSections.source}
                    onOpenChange={() => toggleCollapsibleSection('source')}
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted/50 rounded-lg border text-sm">
                      <span className="font-medium">📍 Nguồn data</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${collapsibleSections.source ? 'rotate-180' : ''}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2 p-3 space-y-2 border rounded-lg bg-muted/20 max-h-32 overflow-y-auto">
                      {getUniqueValues('source', data).map(source => (
                        <div key={source} className="flex items-center space-x-2">
                          <Checkbox
                            id={`source-${source}`}
                            checked={quickFilters.source?.includes(source) || false}
                            onCheckedChange={() => handleQuickFilterToggle('source', source)}
                          />
                          <label htmlFor={`source-${source}`} className="text-sm cursor-pointer flex-1">
                            {source}
                          </label>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Quality Filter */}
                  <Collapsible
                    open={collapsibleSections.quality}
                    onOpenChange={() => toggleCollapsibleSection('quality')}
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted/50 rounded-lg border text-sm">
                      <span className="font-medium">⭐ Chất lượng</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${collapsibleSections.quality ? 'rotate-180' : ''}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2 p-3 space-y-2 border rounded-lg bg-muted/20 max-h-32 overflow-y-auto">
                      {getUniqueValues('quality', data).map(quality => (
                        <div key={quality} className="flex items-center space-x-2">
                          <Checkbox
                            id={`quality-${quality}`}
                            checked={quickFilters.quality?.includes(quality) || false}
                            onCheckedChange={() => handleQuickFilterToggle('quality', quality)}
                          />
                          <label htmlFor={`quality-${quality}`} className="text-sm cursor-pointer flex-1">
                            {quality}
                          </label>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Assigned Sale Filter */}
                  <Collapsible
                    open={collapsibleSections.assignedSale}
                    onOpenChange={() => toggleCollapsibleSection('assignedSale')}
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted/50 rounded-lg border text-sm">
                      <span className="font-medium">👨‍💼 Sale phụ trách</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${collapsibleSections.assignedSale ? 'rotate-180' : ''}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2 p-3 space-y-2 border rounded-lg bg-muted/20 max-h-32 overflow-y-auto">
                      {getUniqueValues('assignedSale', data).map(sale => (
                        <div key={sale} className="flex items-center space-x-2">
                          <Checkbox
                            id={`sale-${sale}`}
                            checked={quickFilters.assignedSale?.includes(sale) || false}
                            onCheckedChange={() => handleQuickFilterToggle('assignedSale', sale)}
                          />
                          <label htmlFor={`sale-${sale}`} className="text-sm cursor-pointer flex-1">
                            {sale}
                          </label>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Products Filter */}
                  <Collapsible
                    open={collapsibleSections.products}
                    onOpenChange={() => toggleCollapsibleSection('products')}
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted/50 rounded-lg border text-sm">
                      <span className="font-medium">💼 Sản phẩm/Dịch vụ</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${collapsibleSections.products ? 'rotate-180' : ''}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2 p-3 space-y-2 border rounded-lg bg-muted/20 max-h-32 overflow-y-auto">
                      {getUniqueValues('products', data).map(product => (
                        <div key={product} className="flex items-center space-x-2">
                          <Checkbox
                            id={`product-${product}`}
                            checked={quickFilters.products?.includes(product) || false}
                            onCheckedChange={() => handleQuickFilterToggle('products', product)}
                          />
                          <label htmlFor={`product-${product}`} className="text-sm cursor-pointer flex-1">
                            {product}
                          </label>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Advanced Filters Tab */}
            <TabsContent value="advanced" className="flex-1 mt-3 min-h-0 overflow-hidden">
              <ScrollArea className="h-full max-h-[calc(95vh-240px)]">
                <div className="space-y-4 pr-2 pb-4">
                  {/* Logic Operator Selection */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Điều kiện logic</label>
                    <Select value={logicOperator} onValueChange={setLogicOperator}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {logicOperators.map(op => (
                          <SelectItem key={op.value} value={op.value}>
                            <span className="flex items-center gap-2">
                              <span>{op.icon}</span>
                              {op.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Filter Conditions */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Điều kiện lọc</label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={addCondition}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {conditions.map((condition, index) => (
                      <div key={condition.id} className="space-y-3 p-4 border rounded-lg bg-muted/30">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Điều kiện {index + 1}</span>
                          {conditions.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeCondition(condition.id)}
                              className="h-6 w-6 p-0 text-destructive hover:bg-destructive/10"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          )}
                        </div>

                        {/* Field Selection */}
                        <Select 
                          value={condition.field} 
                          onValueChange={(value) => updateCondition(condition.id, { field: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn trường dữ liệu" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableFields.map(field => (
                              <SelectItem key={field.value} value={field.value}>
                                <span className="flex items-center gap-2">
                                  <span>{field.icon}</span>
                                  {field.label}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        {/* Operator Selection */}
                        <Select 
                          value={condition.operator} 
                          onValueChange={(value) => updateCondition(condition.id, { operator: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {operators.map(op => (
                              <SelectItem key={op.value} value={op.value}>
                                <span className="flex items-center gap-2">
                                  <span>{op.icon}</span>
                                  {op.label}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        {/* Value Input - Only show if operator needs a value */}
                        {!['exists', 'empty'].includes(condition.operator) && (
                          <Input
                            placeholder="Nhập giá trị..."
                            value={condition.value}
                            onChange={(e) => updateCondition(condition.id, { value: e.target.value })}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Save Filter Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSaveDialog(true)}
                    className="w-full"
                    disabled={!conditions.some(c => c.field && (c.value || ['exists', 'empty'].includes(c.operator)))}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Lưu bộ lọc này
                  </Button>
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Saved Filters Tab */}
            <TabsContent value="saved" className="flex-1 mt-3 min-h-0 overflow-hidden">
              <ScrollArea className="h-full max-h-[calc(95vh-240px)]">
                <div className="space-y-3 pr-2 pb-4">
                  {savedFilters.filter(f => f.dataType === dataType).length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <History className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Chưa có bộ lọc nào được lưu</p>
                      <p className="text-xs">Tạo bộ lọc ở tab "Nâng cao" và lưu lại</p>
                    </div>
                  ) : (
                    savedFilters
                      .filter(f => f.dataType === dataType)
                      .sort((a, b) => {
                        if (a.isFavorite !== b.isFavorite) {
                          return a.isFavorite ? -1 : 1;
                        }
                        if (a.lastUsed && b.lastUsed) {
                          return new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime();
                        }
                        if (a.lastUsed && !b.lastUsed) return -1;
                        if (!a.lastUsed && b.lastUsed) return 1;
                        return b.useCount - a.useCount;
                      })
                      .map(filter => (
                        <div key={filter.id} className="p-3 border rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium text-sm">{filter.name}</h4>
                                {filter.isFavorite && (
                                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                )}
                              </div>
                              {filter.description && (
                                <p className="text-xs text-muted-foreground mt-1">{filter.description}</p>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleToggleFavorite(filter.id)}
                                className="h-6 w-6 p-0"
                                title={filter.isFavorite ? "Bỏ yêu thích" : "Yêu thích"}
                              >
                                {filter.isFavorite ? (
                                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                ) : (
                                  <StarOff className="h-3 w-3" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteSavedFilter(filter.id)}
                                className="h-6 w-6 p-0 text-destructive hover:bg-destructive/10"
                                title="Xóa bộ lọc"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                            <span>📊 {filter.conditions.length} điều kiện</span>
                            <span>🔄 Dùng {filter.useCount} lần</span>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleLoadSavedFilter(filter)}
                              className="flex-1 h-7 text-xs"
                            >
                              Tải bộ lọc
                            </Button>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 px-6 py-4 border-t flex-shrink-0 bg-background">
          <Button
            variant="outline"
            onClick={clearAllFilters}
            disabled={getActiveFilterCount() === 0}
            className="flex-1"
            size="sm"
            title={getActiveFilterCount() === 0 ? 'Không có bộ lọc nào để xóa' : `Xóa ${getActiveFilterCount()} bộ lọc`}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Xóa tất cả
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
            size="sm"
          >
            Hủy
          </Button>
          <Button
            onClick={handleApplyFilters}
            className="flex-1"
            size="sm"
          >
            <Check className="h-4 w-4 mr-2" />
            Áp dụng bộ lọc
          </Button>
        </div>

        {/* Save Filter Dialog */}
        {showSaveDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]" role="dialog" aria-modal="true" aria-labelledby="save-dialog-title">
            <div className="bg-background p-6 rounded-lg w-96 max-w-[90vw] shadow-xl border">
              <h3 id="save-dialog-title" className="font-medium mb-4">Lưu bộ lọc</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Tên bộ lọc *</label>
                  <Input
                    placeholder="Ví dụ: Leads chất lượng cao"
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Mô tả (không bắt buộc)</label>
                  <Input
                    placeholder="Mô tả ngắn gọn về bộ lọc này"
                    value={filterDescription}
                    onChange={(e) => setFilterDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowSaveDialog(false);
                    setFilterName('');
                    setFilterDescription('');
                  }}
                  className="flex-1"
                  size="sm"
                >
                  Hủy
                </Button>
                <Button
                  onClick={handleSaveFilter}
                  disabled={!filterName.trim()}
                  className="flex-1"
                  size="sm"
                >
                  Lưu
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}