import { useState, useEffect, useMemo } from 'react';
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
import { 
  Users, 
  Building, 
  Calendar, 
  Package, 
  Target,
  Search,
  Filter,
  RefreshCw,
  RotateCcw,
  Trash2,
  AlertTriangle,
  Info,
  ChevronDown, 
  X, 
  Plus, 
  Check,
  Save,
  History,
  Star,
  StarOff,
  Clock,
  Settings
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
  dataType: 'customers' | 'leads'; // Thêm để phân biệt loại dữ liệu
}

interface RestoreDataPopupWithAdvancedFilterProps {
  onClose: () => void;
  deletedCustomers: any[];
  deletedLeads: any[];
  onRestoreCustomer: (customerId: string) => void;
  onPermanentDeleteCustomer: (customerId: string) => void;
  onRestoreMultipleCustomers: (customerIds: string[]) => void;
  onPermanentDeleteMultipleCustomers: (customerIds: string[]) => void;
  onRestoreLead: (leadId: string) => void;
  onPermanentDeleteLead: (leadId: string) => void;
  onRestoreMultipleLeads: (leadIds: string[]) => void;
  onPermanentDeleteMultipleLeads: (leadIds: string[]) => void;
}

// Available fields for filtering - Khôi phục dữ liệu specific
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

export function RestoreDataPopupWithAdvancedFilter({
  onClose,
  deletedCustomers,
  deletedLeads,
  onRestoreCustomer,
  onPermanentDeleteCustomer,
  onRestoreMultipleCustomers,
  onPermanentDeleteMultipleCustomers,
  onRestoreLead,
  onPermanentDeleteLead,
  onRestoreMultipleLeads,
  onPermanentDeleteMultipleLeads
}: RestoreDataPopupWithAdvancedFilterProps) {
  const [activeTab, setActiveTab] = useState<'customers' | 'leads'>('customers');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
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
  
  // Collapsible sections state - Lọc nhanh mặc định mở tất cả
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
  }, [activeTab]);

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
      dataType: activeTab
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
    // Apply quick filters immediately
    setCurrentPage(1);
  };

  const handleQuickClear = () => {
    setQuickFilters({});
    setCurrentPage(1);
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

  // Advanced filter application
  const handleAdvancedApply = () => {
    // Apply advanced filters by updating the current page
    setCurrentPage(1);
  };

  const handleAdvancedClear = () => {
    setConditions([createNewCondition()]);
    setLogicOperator('and');
    setCurrentPage(1);
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

  // Enhanced filter function that combines basic, quick, and advanced filters
  const filterItems = useMemo(() => {
    return (items: any[]) => {
      return items.filter(item => {
        // Basic search filter
        const matchesSearch = !basicFilters.search || 
          item.name.toLowerCase().includes(basicFilters.search.toLowerCase()) ||
          item.phone.includes(basicFilters.search) ||
          item.email.toLowerCase().includes(basicFilters.search.toLowerCase());
        
        // Basic date filter
        let matchesDate = true;
        if (basicFilters.dateRange && basicFilters.dateRange !== 'all') {
          const deletedDate = new Date(item.deletedAt);
          const today = new Date();
          switch (basicFilters.dateRange) {
            case 'today':
              matchesDate = deletedDate.toDateString() === today.toDateString();
              break;
            case 'week':
              const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
              matchesDate = deletedDate >= weekAgo;
              break;
            case 'month':
              const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
              matchesDate = deletedDate >= monthAgo;
              break;
          }
        }

        // Basic deleted by filter
        const matchesDeletedBy = !basicFilters.deletedBy || basicFilters.deletedBy === 'all' || item.deletedBy === basicFilters.deletedBy;

        // Quick filters
        let matchesQuickFilters = true;
        if (Object.keys(quickFilters).length > 0) {
          matchesQuickFilters = Object.entries(quickFilters).every(([field, values]) => {
            if (!values || values.length === 0) return true;
            
            const itemValue = item[field];
            if (!itemValue) return false;
            
            if (Array.isArray(itemValue)) {
              return values.some(filterValue => 
                itemValue.some(iv => String(iv).toLowerCase() === filterValue.toLowerCase())
              );
            } else {
              return values.some(filterValue => 
                String(itemValue).toLowerCase() === filterValue.toLowerCase()
              );
            }
          });
        }

        // Advanced filters
        let matchesAdvanced = true;
        if (conditions.length > 0 && conditions.some(c => c.field && (c.value || ['exists', 'empty'].includes(c.operator)))) {
          const validConditions = conditions.filter(c => c.field && (c.value || ['exists', 'empty'].includes(c.operator)));
          
          if (logicOperator === 'and') {
            matchesAdvanced = validConditions.every(condition => {
              return evaluateCondition(item, condition);
            });
          } else {
            matchesAdvanced = validConditions.some(condition => {
              return evaluateCondition(item, condition);
            });
          }
        }

        return matchesSearch && matchesDate && matchesDeletedBy && matchesQuickFilters && matchesAdvanced;
      });
    };
  }, [basicFilters, quickFilters, conditions, logicOperator]);

  // Evaluate individual condition
  const evaluateCondition = (item: any, condition: FilterCondition): boolean => {
    const { field, operator, value } = condition;
    const itemValue = item[field];

    switch (operator) {
      case 'includes':
        if (Array.isArray(itemValue)) {
          return itemValue.some(iv => String(iv).toLowerCase() === value.toLowerCase());
        }
        return String(itemValue || '').toLowerCase() === value.toLowerCase();
      
      case 'excludes':
        if (Array.isArray(itemValue)) {
          return !itemValue.some(iv => String(iv).toLowerCase() === value.toLowerCase());
        }
        return String(itemValue || '').toLowerCase() !== value.toLowerCase();
      
      case 'contains':
        return String(itemValue || '').toLowerCase().includes(value.toLowerCase());
      
      case 'not_contains':
        return !String(itemValue || '').toLowerCase().includes(value.toLowerCase());
      
      case 'exists':
        return itemValue !== undefined && itemValue !== null && itemValue !== '';
      
      case 'empty':
        return itemValue === undefined || itemValue === null || itemValue === '';
      
      default:
        return true;
    }
  };

  // Apply filters
  const filteredCustomers = filterItems(deletedCustomers);
  const filteredLeads = filterItems(deletedLeads);
  const currentItems = activeTab === 'customers' ? filteredCustomers : filteredLeads;

  // Pagination
  const totalPages = Math.ceil(currentItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = currentItems.slice(startIndex, startIndex + itemsPerPage);

  // Selection handlers
  const handleSelectItem = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === paginatedItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(paginatedItems.map(item => item.id));
    }
  };

  const isSelectAllIndeterminate = selectedItems.length > 0 && selectedItems.length < paginatedItems.length;

  // Action handlers
  const handleRestoreSelected = () => {
    if (selectedItems.length === 0) return;
    
    if (activeTab === 'customers') {
      onRestoreMultipleCustomers(selectedItems);
    } else {
      onRestoreMultipleLeads(selectedItems);
    }
    setSelectedItems([]);
  };

  const handlePermanentDeleteSelected = () => {
    if (selectedItems.length === 0) return;
    
    const confirmMessage = `Bạn có chắc chắn muốn xóa vĩnh viễn ${selectedItems.length} ${activeTab === 'customers' ? 'khách hàng' : 'lead'} đã chọn?\n\nHành động này không thể hoàn tác!`;
    
    if (confirm(confirmMessage)) {
      if (activeTab === 'customers') {
        onPermanentDeleteMultipleCustomers(selectedItems);
      } else {
        onPermanentDeleteMultipleLeads(selectedItems);
      }
      setSelectedItems([]);
    }
  };

  const handleRestoreCustomer = (customerId: string) => {
    onRestoreCustomer(customerId);
  };

  const handlePermanentDelete = (itemId: string) => {
    const itemType = activeTab === 'customers' ? 'khách hàng' : 'lead';
    const item = currentItems.find(i => i.id === itemId);
    
    if (confirm(`Bạn có chắc chắn muốn xóa vĩnh viễn ${itemType} "${item?.name}"?\n\nHành động này không thể hoàn tác!`)) {
      if (activeTab === 'customers') {
        onPermanentDeleteCustomer(itemId);
      } else {
        onPermanentDeleteLead(itemId);
      }
    }
  };

  const handleRestoreLead = (leadId: string) => {
    onRestoreLead(leadId);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setBasicFilters({
      search: '',
      dateRange: 'all',
      deletedBy: 'all'
    });
    setQuickFilters({});
    setConditions([createNewCondition()]);
    setLogicOperator('and');
    setCurrentPage(1);
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

  const currentDataForFilters = activeTab === 'customers' ? deletedCustomers : deletedLeads;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <RotateCcw className="h-5 w-5 text-primary" />
            Khôi phục dữ liệu với bộ lọc nâng cao
          </DialogTitle>
          <DialogDescription>
            Quản lý và khôi phục dữ liệu đã xóa với tính năng lọc đầy đủ. Dữ liệu sẽ tự động bị xóa vĩnh viễn sau 30 ngày.
          </DialogDescription>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-muted rounded-lg flex-shrink-0">
          <Button
            variant={activeTab === 'customers' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => {
              setActiveTab('customers');
              setSelectedItems([]);
              setCurrentPage(1);
              // Clear filters when switching tabs
              clearAllFilters();
            }}
            className="flex-1 justify-center gap-2"
          >
            <Users className="h-4 w-4" />
            Khách hàng ({deletedCustomers.length})
          </Button>
          <Button
            variant={activeTab === 'leads' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => {
              setActiveTab('leads');
              setSelectedItems([]);
              setCurrentPage(1);
              // Clear filters when switching tabs
              clearAllFilters();
            }}
            className="flex-1 justify-center gap-2"
          >
            <Target className="h-4 w-4" />
            Leads ({deletedLeads.length})
          </Button>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex gap-4 overflow-hidden">
          {/* Filter Panel */}
          <div className="w-80 flex-shrink-0 border-r border-border pr-4">
            <div className="flex flex-col h-full">
              {/* Filter Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-primary" />
                  <span className="font-medium">Bộ lọc</span>
                  {getActiveFilterCount() > 0 && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {getActiveFilterCount()}
                    </Badge>
                  )}
                </div>
                {getActiveFilterCount() > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Reset
                  </Button>
                )}
              </div>

              {/* Basic Search */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm theo tên, SĐT, email..."
                    value={basicFilters.search}
                    onChange={(e) => setBasicFilters(prev => ({ ...prev, search: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Basic Filters */}
              <div className="space-y-3 mb-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Thời gian xóa</label>
                  <Select 
                    value={basicFilters.dateRange} 
                    onValueChange={(value) => setBasicFilters(prev => ({ ...prev, dateRange: value }))}
                  >
                    <SelectTrigger className="w-full">
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
                    <SelectTrigger className="w-full">
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

              {/* Filter Tabs */}
              <Tabs value={activeFilterTab} onValueChange={(value) => setActiveFilterTab(value as any)} className="flex-1 flex flex-col">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="quick" className="text-xs">
                    <Filter className="h-3 w-3 mr-1" />
                    Lọc nhanh
                  </TabsTrigger>
                  <TabsTrigger value="advanced" className="text-xs">
                    <Settings className="h-3 w-3 mr-1" />
                    Nâng cao
                  </TabsTrigger>
                  <TabsTrigger value="saved" className="text-xs">
                    <Save className="h-3 w-3 mr-1" />
                    Đã lưu
                  </TabsTrigger>
                </TabsList>

                {/* Quick Filters Tab */}
                <TabsContent value="quick" className="flex-1 overflow-y-auto custom-scrollbar mt-4">
                  <div className="space-y-4">
                    {/* Status Filter */}
                    <Collapsible
                      open={collapsibleSections.status}
                      onOpenChange={() => toggleCollapsibleSection('status')}
                    >
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted/50 rounded">
                        <span className="text-sm font-medium">🔄 Trạng thái gốc</span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${collapsibleSections.status ? 'rotate-180' : ''}`} />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-2 mt-2">
                        {getUniqueValues('status', currentDataForFilters).map(status => (
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
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted/50 rounded">
                        <span className="text-sm font-medium">📍 Nguồn data</span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${collapsibleSections.source ? 'rotate-180' : ''}`} />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-2 mt-2">
                        {getUniqueValues('source', currentDataForFilters).map(source => (
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
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted/50 rounded">
                        <span className="text-sm font-medium">⭐ Chất lượng</span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${collapsibleSections.quality ? 'rotate-180' : ''}`} />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-2 mt-2">
                        {getUniqueValues('quality', currentDataForFilters).map(quality => (
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
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted/50 rounded">
                        <span className="text-sm font-medium">👨‍💼 Sale phụ trách</span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${collapsibleSections.assignedSale ? 'rotate-180' : ''}`} />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-2 mt-2">
                        {getUniqueValues('assignedSale', currentDataForFilters).map(sale => (
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
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted/50 rounded">
                        <span className="text-sm font-medium">💼 Sản phẩm/Dịch vụ</span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${collapsibleSections.products ? 'rotate-180' : ''}`} />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-2 mt-2">
                        {getUniqueValues('products', currentDataForFilters).map(product => (
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

                    {/* Quick Filter Actions */}
                    <div className="flex gap-2 pt-4 border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleQuickClear}
                        disabled={getActiveFiltersCount() === 0}
                        className="flex-1"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Xóa
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={handleQuickApply}
                        disabled={getActiveFiltersCount() === 0}
                        className="flex-1"
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Áp dụng
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                {/* Advanced Filters Tab */}
                <TabsContent value="advanced" className="flex-1 overflow-y-auto custom-scrollbar mt-4">
                  <div className="space-y-4">
                    {/* Logic Operator Selection */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Điều kiện logic</label>
                      <Select value={logicOperator} onValueChange={setLogicOperator}>
                        <SelectTrigger className="w-full">
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
                        <div key={condition.id} className="space-y-2 p-3 border rounded-lg bg-muted/30">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">Điều kiện {index + 1}</span>
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
                            <SelectTrigger className="w-full">
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
                            <SelectTrigger className="w-full">
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

                    {/* Advanced Filter Actions */}
                    <div className="space-y-2 pt-4 border-t">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleAdvancedClear}
                          className="flex-1"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Xóa
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={handleAdvancedApply}
                          className="flex-1"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Áp dụng
                        </Button>
                      </div>

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
                  </div>
                </TabsContent>

                {/* Saved Filters Tab */}
                <TabsContent value="saved" className="flex-1 overflow-y-auto custom-scrollbar mt-4">
                  <div className="space-y-3">
                    {savedFilters.filter(f => f.dataType === activeTab).length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <History className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Chưa có bộ lọc nào được lưu</p>
                        <p className="text-xs">Tạo bộ lọc ở tab "Nâng cao" và lưu lại</p>
                      </div>
                    ) : (
                      savedFilters
                        .filter(f => f.dataType === activeTab)
                        .sort((a, b) => {
                          // Sort by favorite first, then by last used, then by use count
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

                            <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                              <span>{filter.conditions.length} điều kiện</span>
                              <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {filter.useCount} lần
                                </span>
                                {filter.lastUsed && (
                                  <span>
                                    {new Date(filter.lastUsed).toLocaleDateString('vi-VN')}
                                  </span>
                                )}
                              </div>
                            </div>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleLoadSavedFilter(filter)}
                              className="w-full"
                            >
                              <Check className="h-4 w-4 mr-2" />
                              Sử dụng bộ lọc này
                            </Button>
                          </div>
                        ))
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {currentItems.length > 0 ? (
              <div className="flex-1 flex flex-col gap-4 overflow-hidden">
                {/* Bulk Actions */}
                {selectedItems.length > 0 && (
                  <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border">
                    <span className="text-sm">
                      Đã chọn {selectedItems.length} {activeTab === 'customers' ? 'khách hàng' : 'lead'}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRestoreSelected}
                        className="text-green-600 border-green-200 hover:bg-green-50"
                      >
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Khôi phục tất cả
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handlePermanentDeleteSelected}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Xóa vĩnh viễn
                      </Button>
                    </div>
                  </div>
                )}

                {/* Data Table with Horizontal Scroll */}
                <div className="flex-1 border rounded-lg overflow-x-auto custom-scrollbar">
                  <div className="min-w-[1000px] flex flex-col h-full">
                    {/* Header */}
                    <div className="bg-muted/50 p-3 border-b flex-shrink-0">
                      <div className="grid grid-cols-12 gap-4 items-center text-sm font-medium">
                        <div className="col-span-1">
                          <Checkbox
                            checked={isSelectAllIndeterminate ? false : paginatedItems.length > 0 && selectedItems.length === paginatedItems.length}
                            {...(isSelectAllIndeterminate && { indeterminate: true })}
                            onCheckedChange={handleSelectAll}
                          />
                        </div>
                        <div className="col-span-3">Tên {activeTab === 'customers' ? 'khách hàng' : 'lead'}</div>
                        <div className="col-span-2">Số điện thoại</div>
                        <div className="col-span-3">Email</div>
                        <div className="col-span-2">Ngày xóa</div>
                        <div className="col-span-1">Thao tác</div>
                      </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                      <div className="min-w-[1000px]">
                        {paginatedItems.map((item) => (
                          <div key={item.id} className="border-b last:border-b-0 p-3 hover:bg-muted/30">
                            <div className="grid grid-cols-12 gap-4 items-center text-sm">
                              <div className="col-span-1">
                                <Checkbox
                                  checked={selectedItems.includes(item.id)}
                                  onCheckedChange={() => handleSelectItem(item.id)}
                                />
                              </div>
                              <div className="col-span-3">
                                <div className="font-medium truncate" title={item.name}>
                                  {item.name}
                                </div>
                                <div className="text-muted-foreground text-xs truncate">
                                  ID: {item.id}
                                </div>
                              </div>
                              <div className="col-span-2">
                                <div className="truncate" title={item.phone}>
                                  {item.phone}
                                </div>
                              </div>
                              <div className="col-span-3">
                                <div className="truncate" title={item.email}>
                                  {item.email}
                                </div>
                              </div>
                              <div className="col-span-2">
                                <div className="text-sm">
                                  {new Date(item.deletedAt).toLocaleDateString('vi-VN')}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {item.deletedBy || 'N/A'}
                                </div>
                              </div>
                              <div className="col-span-1">
                                <div className="flex gap-1 justify-center">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => activeTab === 'customers' ? handleRestoreCustomer(item.id) : handleRestoreLead(item.id)}
                                    className="h-8 w-8 p-0 text-green-600 hover:bg-green-50 flex-shrink-0"
                                    title="Khôi phục"
                                  >
                                    <RotateCcw className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handlePermanentDelete(item.id)}
                                    className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 flex-shrink-0"
                                    title="Xóa vĩnh viễn"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
                {activeTab === 'customers' ? (
                  <Users className="h-16 w-16 text-muted-foreground mb-4" />
                ) : (
                  <Target className="h-16 w-16 text-muted-foreground mb-4" />
                )}
                <h3 className="text-lg mb-2">
                  Không có {activeTab === 'customers' ? 'khách hàng' : 'lead'} nào {getActiveFilterCount() > 0 ? 'phù hợp với bộ lọc' : 'bị xóa'}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {getActiveFilterCount() > 0 
                    ? 'Thử điều chỉnh bộ lọc để xem thêm kết quả'
                    : `${activeTab === 'customers' ? 'Khách hàng' : 'Lead'} đã xóa sẽ xuất hiện ở đây trong vòng 30 ngày`
                  }
                </p>
                {getActiveFilterCount() > 0 && (
                  <Button variant="outline" onClick={clearAllFilters}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Xóa tất cả bộ lọc
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer with Pagination */}
        {currentItems.length > itemsPerPage && (
          <div className="flex justify-center pt-4 border-t flex-shrink-0">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Trước
              </Button>
              <span className="text-sm text-muted-foreground">
                Trang {currentPage} / {totalPages} • Hiển thị {currentItems.length} kết quả
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Sau
              </Button>
            </div>
          </div>
        )}

        {/* Warning Footer */}
        <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm flex-shrink-0">
          <AlertTriangle className="h-4 w-4 flex-shrink-0" />
          <span>
            Dữ liệu đã xóa sẽ tự động bị xóa vĩnh viễn sau 30 ngày. Vui lòng khôi phục kịp thời nếu cần.
          </span>
        </div>

        {/* Save Filter Dialog */}
        {showSaveDialog && (
          <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Lưu bộ lọc</DialogTitle>
                <DialogDescription>
                  Đặt tên cho bộ lọc để sử dụng lại sau này
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Tên bộ lọc *</label>
                  <Input
                    placeholder="Ví dụ: Lead chất lượng cao đã xóa"
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Mô tả (tùy chọn)</label>
                  <Input
                    placeholder="Mô tả ngắn về bộ lọc này..."
                    value={filterDescription}
                    onChange={(e) => setFilterDescription(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
                  Hủy
                </Button>
                <Button 
                  onClick={handleSaveFilter}
                  disabled={!filterName.trim()}
                >
                  <Save className="h-4 w-4 mr-2" />
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