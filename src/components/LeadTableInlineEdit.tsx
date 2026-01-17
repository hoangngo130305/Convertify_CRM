import { useState, useEffect, useRef } from 'react';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { CustomerAvatar } from './CustomerAvatar';
import { 
  MoreVertical, 
  Phone, 
  Mail, 
  Eye, 
  Bell, 
  ArrowUpDown,
  Filter,
  GripVertical,
  Plus,
  ArrowLeft,
  ArrowRight,
  Pin,
  PinOff,
  EyeOff,
  X,
  Trash2,
  MessageSquare,
  Move3D,
  Check,
  Clock,
  Users,
  BellRing,
  BellOff,
  Settings
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from './ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { TagCell } from './TagCell';
import { ColumnFilterPopup } from './ColumnFilterPopup';
import { ColumnEditPopup } from './ColumnEditPopup';

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  products: string[];
  status: string;
  source: string;
  assignedSale: string;
  createdDate: Date;
  notes: string;
  quality: number | string;
  questions: string;
  address: string;
  revenue: number;
  customFields: Record<string, any>;
  reminders?: any[];
  tags?: Array<{
    id: string;
    name: string;
    color: string;
  }>;
}

interface Column {
  id: string;
  name: string;
  type: 'default' | 'hidden' | 'custom';
  visible: boolean;
  required: boolean;
  order: number;
  fieldType?: 'text' | 'number' | 'date' | 'select' | 'multiselect';
  options?: string[];
  pinned?: boolean | 'right';
}

interface LeadTableProps {
  customers: Customer[];
  selectedCustomers: string[];
  onSelectCustomer: (id: string) => void;
  onSelectAll: () => void;
  columns: Column[];
  onColumnsChange?: (columns: Column[]) => void;
  onFiltersChange?: (filters: Record<string, string[]>) => void;
  currentFilters?: Record<string, string[]>;
  onCustomerUpdate?: (customerId: string, field: string, value: any) => void;
  onCustomerSort?: (customers: Customer[]) => void;
  onShowDetails?: (customer: Customer) => void;
  onCreateReminder?: (customerId: string, customerName: string) => void;
  onDeleteCustomer?: (customerId: string) => void;
  onMoveToCustomer?: (customerId: string) => void;
  onMoveToBadData?: (customerId: string) => void;
  onChangeToHot?: (customerId: string) => void;
  reminders?: any[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Mới': return 'bg-blue-100 text-blue-800';
    case 'Đang xử lý': return 'bg-yellow-100 text-yellow-800';
    case 'Thành công': return 'bg-green-100 text-green-800';
    case 'Thất bại': return 'bg-red-100 text-red-800';
    case 'Lạnh': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getSourceColor = (source: string) => {
  switch (source) {
    case 'Facebook': return 'bg-blue-100 text-blue-800';
    case 'Google': return 'bg-green-100 text-green-800';
    case 'TikTok': return 'bg-pink-100 text-pink-800';
    case 'Zalo': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
};

const formatDate = (date: Date) => {
  return date.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Define filter options for each column - FULL OPTIONS FOR EDITING
const filterOptions = {
  products: ['Website Design', 'SEO Service', 'Digital Marketing', 'E-commerce', 'Mobile App', 'Branding'],
  status: ['Mới', 'Đang xử lý', 'Thành công', 'Thất bại', 'Lạnh'],
  source: ['Facebook', 'Google', 'TikTok', 'Zalo', 'Hotline', 'Website', 'Giới thiệu'],
  assignedSale: ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D', 'Chưa phân bổ'],
};

export function LeadTableInlineEdit({ 
  customers = [], 
  selectedCustomers = [], 
  onSelectCustomer, 
  onSelectAll, 
  columns = [], 
  onColumnsChange, 
  onFiltersChange, 
  currentFilters,
  onCustomerUpdate,
  onCustomerSort,
  onShowDetails,
  onCreateReminder,
  onDeleteCustomer,
  onMoveToCustomer,
  onMoveToBadData,
  onChangeToHot,
  reminders = []
}: LeadTableProps) {
  const [editingCell, setEditingCell] = useState<{ row: string; column: string } | null>(null);
  const [editValue, setEditValue] = useState<any>('');
  const [columnHover, setColumnHover] = useState<string | null>(null);
  const [activeColumnMenu, setActiveColumnMenu] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [columnFilters, setColumnFilters] = useState<Record<string, string[]>>(currentFilters || {});
  const [filterPopoverOpen, setFilterPopoverOpen] = useState<string | null>(null);
  const [editColumnPopupOpen, setEditColumnPopupOpen] = useState<string | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Notify parent about filter changes
  useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange(columnFilters);
    }
  }, [columnFilters, onFiltersChange]);

  // Sync external filters
  useEffect(() => {
    if (currentFilters) {
      setColumnFilters(currentFilters);
    }
  }, [currentFilters]);

  // Focus input when editing starts
  useEffect(() => {
    if (editingCell) {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      } else if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.select();
      }
    }
  }, [editingCell]);

  const handleCellDoubleClick = (customerId: string, columnId: string, currentValue: any) => {
    // Skip editing for non-editable columns
    if (['quality', 'customerId', 'revenue'].includes(columnId)) {
      return;
    }
    
    setEditingCell({ row: customerId, column: columnId });
    setEditValue(currentValue);
  };

  const handleSaveEdit = () => {
    if (editingCell && onCustomerUpdate) {
      onCustomerUpdate(editingCell.row, editingCell.column, editValue);
    }
    setEditingCell(null);
    setEditValue('');
  };

  const handleCancelEdit = () => {
    setEditingCell(null);
    setEditValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancelEdit();
    }
  };

  const isAllSelected = (selectedCustomers?.length || 0) === (customers?.length || 0) && (customers?.length || 0) > 0;

  // Get visible columns excluding name (which is fixed) and sort them properly
  const visibleColumns = columns
    .filter(column => column.visible && column.id !== 'name')
    .sort((a, b) => a.order - b.order);

  // Separate pinned and regular columns for proper Excel-like freeze functionality
  const pinnedLeftColumns = visibleColumns.filter(col => col.pinned === true);
  const pinnedRightColumns = visibleColumns.filter(col => col.pinned === 'right');
  const regularColumns = visibleColumns.filter(col => !col.pinned);
  
  // Combine columns in correct order: pinned left columns first, then regular columns
  const orderedColumns = [...pinnedLeftColumns, ...regularColumns];

  // Calculate left position for pinned columns
  const calculatePinnedLeft = (columnIndex: number) => {
    let left = 248; // Start after name column (48px checkbox + 200px name)
    for (let i = 0; i < columnIndex; i++) {
      left += 120; // min-width of each column
    }
    return left;
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, columnId: string) => {
    setDraggedColumn(columnId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', columnId);
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(columnId);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    const sourceColumnId = e.dataTransfer.getData('text/plain');
    
    if (sourceColumnId !== targetColumnId && onColumnsChange) {
      const newColumns = [...columns];
      const sourceIndex = newColumns.findIndex(col => col.id === sourceColumnId);
      const targetIndex = newColumns.findIndex(col => col.id === targetColumnId);
      
      if (sourceIndex !== -1 && targetIndex !== -1) {
        // Swap the order values
        const sourceOrder = newColumns[sourceIndex].order;
        const targetOrder = newColumns[targetIndex].order;
        
        newColumns[sourceIndex].order = targetOrder;
        newColumns[targetIndex].order = sourceOrder;
        
        onColumnsChange(newColumns);
      }
    }
    
    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  const handleDragEnd = () => {
    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  // Get unique values for a column for filtering
  const getUniqueColumnValues = (columnId: string) => {
    if (!customers || customers.length === 0) return [];
    const values = customers.map(customer => {
      const value = customer[columnId as keyof Customer] || customer.customFields?.[columnId];
      if (Array.isArray(value)) {
        return value;
      }
      return value ? String(value) : '';
    }).flat().filter(v => v !== '');
    
    return [...new Set(values)].sort();
  };

  // Add filter to column
  const addFilter = (columnId: string, value: string) => {
    if (!value.trim()) return;
    
    setColumnFilters(prev => ({
      ...prev,
      [columnId]: [...(prev[columnId] || []), value.trim()]
    }));
  };

  // Remove filter from column
  const removeFilter = (columnId: string, value: string) => {
    setColumnFilters(prev => ({
      ...prev,
      [columnId]: (prev[columnId] || []).filter(f => f !== value)
    }));
  };

  // Clear all filters for column
  const clearColumnFilters = (columnId: string) => {
    setColumnFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[columnId];
      return newFilters;
    });
  };

  const handleColumnAction = (columnId: string, action: string, direction?: 'left' | 'right' | 'unpin') => {
    if (!onColumnsChange) return;

    const newColumns = [...columns];
    const columnIndex = newColumns.findIndex(col => col.id === columnId);
    
    switch (action) {
      case 'filter':
        setFilterPopoverOpen(filterPopoverOpen === columnId ? null : columnId);
        // Close any open dropdown menus
        setActiveColumnMenu(null);
        break;
      case 'edit':
        setEditColumnPopupOpen(editColumnPopupOpen === columnId ? null : columnId);
        // Close any open dropdown menus
        setActiveColumnMenu(null);
        break;
      case 'hide':
        newColumns[columnIndex].visible = false;
        break;
      case 'sort':
        // Handle sorting logic here
        const sortDirection = direction === 'left' ? 'asc' : 'desc';
        console.log(`Sorting ${columnId} in ${sortDirection} order`);
        
        if (onCustomerSort && customers) {
          const sortedCustomers = [...customers].sort((a, b) => {
            const valueA = a[columnId as keyof Customer] || a.customFields?.[columnId] || '';
            const valueB = b[columnId as keyof Customer] || b.customFields?.[columnId] || '';
            
            // Handle different data types
            if (columnId === 'createdDate') {
              const dateA = new Date(valueA).getTime();
              const dateB = new Date(valueB).getTime();
              return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
            }
            
            if (columnId === 'revenue' || columnId === 'quality') {
              const numA = Number(valueA) || 0;
              const numB = Number(valueB) || 0;
              return sortDirection === 'asc' ? numA - numB : numB - numA;
            }
            
            if (Array.isArray(valueA) || Array.isArray(valueB)) {
              const strA = Array.isArray(valueA) ? valueA.join(' ') : String(valueA);
              const strB = Array.isArray(valueB) ? valueB.join(' ') : String(valueB);
              return sortDirection === 'asc' 
                ? strA.localeCompare(strB) 
                : strB.localeCompare(strA);
            }
            
            // Default string comparison
            const strA = String(valueA).toLowerCase();
            const strB = String(valueB).toLowerCase();
            
            if (strA < strB) return sortDirection === 'asc' ? -1 : 1;
            if (strA > strB) return sortDirection === 'asc' ? 1 : -1;
            return 0;
          });
          
          onCustomerSort(sortedCustomers);
        }
        break;
      case 'insert':
        // Handle column insertion
        const currentOrder = newColumns[columnIndex].order;
        const newOrder = direction === 'left' ? currentOrder - 0.5 : currentOrder + 0.5;
        
        // Create new custom column
        const newColumn: Column = {
          id: `custom-${Date.now()}`,
          name: 'Cột mới',
          type: 'custom',
          visible: true,
          required: false,
          order: newOrder,
          fieldType: 'text'
        };
        
        newColumns.push(newColumn);
        console.log(`Inserted new column ${direction === 'left' ? 'left' : 'right'} of ${columnId}`);
        break;
    }
    
    onColumnsChange(newColumns);
  };

  const renderEditableCell = (customer: Customer, column: Column) => {
    const value = customer[column.id as keyof Customer] || customer.customFields?.[column.id];
    const isEditing = editingCell?.row === customer.id && editingCell?.column === column.id;

    // Handle tags column with TagCell component
    if (column.id === 'tags') {
      return (
        <TagCell
          tags={customer.tags || []}
          customerId={customer.id}
          customerName={customer.name}
          onTagsUpdate={(customerId, newTags) => {
            if (onCustomerUpdate) {
              onCustomerUpdate(customerId, 'tags', newTags);
            }
          }}
        />
      );
    }

    if (!isEditing) {
      return (
        <div
          onDoubleClick={() => handleCellDoubleClick(customer.id, column.id, value)}
          className="cursor-pointer hover:bg-muted/50 p-1 rounded min-h-[32px] flex items-center"
        >
          {renderCellDisplayValue(column, value)}
        </div>
      );
    }

    // Render appropriate editor based on column type
    if (column.id === 'products') {
      // Multi-select for products - Use column options if available, fallback to filterOptions
      const columnOptions = column.options || [];
      const defaultOptions = filterOptions.products;
      const availableOptions = [...new Set([...columnOptions, ...defaultOptions])].sort();
      const selectedProducts = Array.isArray(editValue) ? editValue : [];
      
      return (
        <div className="p-1">
          <div className="flex flex-wrap gap-1 mb-2">
            {selectedProducts.map((product: string, index: number) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs cursor-pointer hover:bg-red-100"
                onClick={() => {
                  setEditValue(selectedProducts.filter((_: any, i: number) => i !== index));
                }}
              >
                {product}
                <X className="h-3 w-3 ml-1" />
              </Badge>
            ))}
          </div>
          <Select
            value=""
            onValueChange={(newProduct) => {
              if (!selectedProducts.includes(newProduct)) {
                setEditValue([...selectedProducts, newProduct]);
              }
            }}
          >
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="Chọn sản phẩm..." />
            </SelectTrigger>
            <SelectContent>
              {availableOptions.map(option => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-1 mt-1">
            <Button size="sm" variant="default" className="h-6 text-xs" onClick={handleSaveEdit}>
              <Check className="h-3 w-3" />
            </Button>
            <Button size="sm" variant="outline" className="h-6 text-xs" onClick={handleCancelEdit}>
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      );
    }

    if (['status', 'source', 'assignedSale'].includes(column.id)) {
      // Single select for status, source, assignedSale - Use column options if available
      const columnOptions = column.options || [];
      const defaultOptions = filterOptions[column.id as keyof typeof filterOptions] || [];
      const availableOptions = [...new Set([...columnOptions, ...defaultOptions])].sort();
      
      return (
        <div className="p-1">
          <Select
            value={editValue}
            onValueChange={(newValue) => {
              console.log(`📝 Select change: ${column.id} = ${newValue} for customer ${customer.id}`);
              setEditValue(newValue);
              // Call update immediately with the new value to avoid race conditions
              if (onCustomerUpdate) {
                onCustomerUpdate(customer.id, column.id, newValue);
              }
              // Exit edit mode
              setEditingCell(null);
              setEditValue('');
            }}
          >
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="Chọn..." />
            </SelectTrigger>
            <SelectContent>
              {availableOptions.map(option => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    }

    if (column.id === 'createdDate') {
      // Date input
      return (
        <div className="p-1">
          <Input
            ref={inputRef}
            type="date"
            value={editValue instanceof Date ? editValue.toISOString().split('T')[0] : editValue}
            onChange={(e) => setEditValue(new Date(e.target.value))}
            onKeyDown={handleKeyDown}
            onBlur={handleSaveEdit}
            className="h-8 text-xs"
          />
        </div>
      );
    }

    if (['notes', 'questions', 'address'].includes(column.id)) {
      // Multi-line text for longer content
      return (
        <div className="p-1">
          <Textarea
            ref={textareaRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSaveEdit}
            className="text-xs min-h-[60px] resize-none"
          />
        </div>
      );
    }

    // Default text input
    return (
      <div className="p-1">
        <Input
          ref={inputRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSaveEdit}
          className="h-8 text-xs"
        />
      </div>
    );
  };

  const renderCellDisplayValue = (column: Column, value: any) => {
    switch (column.id) {
      case 'products':
        return (
          <div className="flex flex-wrap gap-1">
            {Array.isArray(value) && value.map((product, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {product}
              </Badge>
            ))}
          </div>
        );
      
      case 'status':
        return (
          <Badge className={`${getStatusColor(value)} text-xs`}>
            {value}
          </Badge>
        );
      
      case 'source':
        return (
          <Badge className={`${getSourceColor(value)} text-xs`}>
            {value}
          </Badge>
        );
      
      case 'assignedSale':
        return (
          <span className={value === 'Chưa phân bổ' ? 'text-orange-600' : ''}>
            {value}
          </span>
        );
      
      case 'createdDate':
        return (
          <span className="text-sm">
            {value instanceof Date ? formatDate(value) : value}
          </span>
        );
      
      case 'quality':
        // Handle both numeric and string quality values
        if (typeof value === 'string') {
          return (
            <Badge className={`text-xs ${
              value === 'Hot/Nóng' ? 'bg-red-100 text-red-800' :
              value === 'Warm/Ấm' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {value}
            </Badge>
          );
        } else {
          // Numeric stars display
          const numValue = Number(value) || 0;
          return (
            <div className="flex">
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  className={`text-sm ${i < numValue ? 'text-yellow-500' : 'text-gray-300'}`}
                >
                  ★
                </span>
              ))}
            </div>
          );
        }
      
      case 'revenue':
        return (
          <span className="text-sm font-medium">
            {value > 0 ? formatCurrency(value) : '-'}
          </span>
        );
      
      case 'customerId':
        return (
          <span className="text-sm text-muted-foreground">
            {value}
          </span>
        );
      
      default:
        return (
          <span className="text-sm truncate max-w-[150px]" title={value}>
            {value || '-'}
          </span>
        );
    }
  };

  const getColumnColor = (column: Column) => {
    // Specific red color for these columns
    if (['phone', 'products', 'source', 'status'].includes(column.id)) return 'text-red-600';
    if (column.required) return 'text-red-600';
    if (column.type === 'custom') return 'text-green-600';
    if (column.id === 'assignedSale') return 'text-green-600';
    if (column.id === 'customerId') return 'text-yellow-600';
    return '';
  };

  // Helper function to get reminder bell status
  const getReminderBellStatus = (customerId: string) => {
    if (!reminders || reminders.length === 0) {
      return null;
    }

    const customerReminders = reminders.filter(r => r.customerId === customerId && r.status === 'pending');
    
    if (customerReminders.length === 0) return null;

    const now = new Date();

    // Check for overdue reminders (red)
    const overdueReminders = customerReminders.filter(r => new Date(r.reminderDateTime) < now);
    if (overdueReminders.length > 0) {
      return { type: 'overdue', count: overdueReminders.length, color: 'text-red-500' };
    }

    // Check for due reminders (yellow)
    const dueReminders = customerReminders.filter(r => {
      const reminderTime = new Date(r.reminderDateTime);
      const notifyTime = new Date(r.notifyDateTime);
      return now >= notifyTime && now < reminderTime;
    });
    if (dueReminders.length > 0) {
      return { type: 'due', count: dueReminders.length, color: 'text-yellow-500' };
    }

    // Upcoming reminders (gray)
    return { type: 'upcoming', count: customerReminders.length, color: 'text-gray-400' };
  };

  // Helper function to determine if status allows change to hot
  const canChangeToHot = (status: string) => {
    return status === 'Lạnh' || status === 'Thất bại';
  };

  // Early return if no data to prevent errors
  if (!customers || !Array.isArray(customers)) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-x-auto overflow-y-auto custom-scrollbar">
      <div className="min-w-[1600px]">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-muted z-30">
            <tr>
              {/* Checkbox Column */}
              <th className="sticky left-0 bg-muted w-12 p-3 text-left border-b border-border z-40">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={onSelectAll}
                />
              </th>

              {/* Fixed Left Column - Customer Name */}
              <th 
                className="sticky left-12 bg-muted p-3 text-left border-b border-border min-w-[200px] z-40"
                style={{ left: '48px' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-red-600">Tên khách hàng *</span>
                </div>
              </th>

              {/* Pinned Columns - Fixed after Name */}
              {pinnedLeftColumns.map((column, index) => (
                <th 
                  key={column.id} 
                  className={`sticky bg-muted/90 p-3 text-left border-b border-border min-w-[120px] transition-colors z-40 border-r-2 border-r-blue-200 ${
                    columnHover === column.id ? 'bg-blue-50' : ''
                  } ${
                    dragOverColumn === column.id ? 'bg-yellow-100 border-yellow-400' : ''
                  } ${
                    draggedColumn === column.id ? 'opacity-50' : ''
                  }`}
                  style={{ left: `${calculatePinnedLeft(index)}px` }}
                  onMouseEnter={() => setColumnHover(column.id)}
                  onMouseLeave={() => setColumnHover(null)}
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, column.id)}
                  onDragOver={(e) => handleDragOver(e, column.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, column.id)}
                  onDragEnd={handleDragEnd}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-3 w-3 text-muted-foreground cursor-move" />
                      <span className={`${getColumnColor(column)} flex items-center gap-1`}>
                        <Pin className="h-3 w-3 text-blue-600" />
                        {column.name}{column.required ? ' *' : ''}
                      </span>
                    </div>
                    
                    {(columnHover === column.id || activeColumnMenu === column.id) && (
                      <div className="flex items-center gap-1">
                        <DropdownMenu 
                          onOpenChange={(open) => {
                            setActiveColumnMenu(open ? column.id : null);
                          }}
                        >
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 w-6 p-0 hover:bg-blue-100"
                            >
                              <ArrowUpDown className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="w-48">
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>
                                <ArrowUpDown className="h-4 w-4 mr-2" />
                                Sắp xếp
                              </DropdownMenuSubTrigger>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem onClick={() => handleColumnAction(column.id, 'sort', 'left')}>
                                  A → Z
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleColumnAction(column.id, 'sort', 'right')}>
                                  Z → A
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            
                            <DropdownMenuItem onClick={() => handleColumnAction(column.id, 'filter')}>
                              <Filter className="h-4 w-4 mr-2" />
                              Lọc
                            </DropdownMenuItem>
                            
                            <DropdownMenuSeparator />
                            
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>
                                <Pin className="h-4 w-4 mr-2" />
                                Ghim cột
                              </DropdownMenuSubTrigger>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem 
                                  onClick={() => {
                                    const newColumns = [...columns];
                                    const columnIndex = newColumns.findIndex(col => col.id === column.id);
                                    newColumns[columnIndex].pinned = false;
                                    onColumnsChange?.(newColumns);
                                  }}
                                >
                                  <PinOff className="h-4 w-4 mr-2" />
                                  Bỏ ghim
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>
                                <Plus className="h-4 w-4 mr-2" />
                                Thêm cột
                              </DropdownMenuSubTrigger>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem onClick={() => handleColumnAction(column.id, 'insert', 'left')}>
                                  <ArrowLeft className="h-4 w-4 mr-2" />
                                  Thêm bên trái
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleColumnAction(column.id, 'insert', 'right')}>
                                  <ArrowRight className="h-4 w-4 mr-2" />
                                  Thêm bên phải
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            
                            <DropdownMenuSeparator />
                            
                            <DropdownMenuItem onClick={() => handleColumnAction(column.id, 'edit')}>
                              <Settings className="h-4 w-4 mr-2" />
                              Chỉnh sửa cột
                            </DropdownMenuItem>
                            
                            <DropdownMenuItem onClick={() => handleColumnAction(column.id, 'hide')}>
                              <EyeOff className="h-4 w-4 mr-2" />
                              Ẩn cột
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Filter Popup */}
                        {filterPopoverOpen === column.id && (
                          <ColumnFilterPopup
                            columnId={column.id}
                            columnName={column.name}
                            uniqueValues={getUniqueColumnValues(column.id)}
                            currentFilters={columnFilters[column.id] || []}
                            onAddFilter={(value) => addFilter(column.id, value)}
                            onRemoveFilter={(value) => removeFilter(column.id, value)}
                            onClearFilters={() => clearColumnFilters(column.id)}
                            onClose={() => setFilterPopoverOpen(null)}
                          />
                        )}

                        {/* Edit Column Popup */}
                        {editColumnPopupOpen === column.id && (
                          <ColumnEditPopup
                            column={column}
                            onSave={(updatedColumn) => {
                              if (onColumnsChange) {
                                const newColumns = [...columns];
                                const columnIndex = newColumns.findIndex(col => col.id === column.id);
                                newColumns[columnIndex] = updatedColumn;
                                onColumnsChange(newColumns);
                              }
                              setEditColumnPopupOpen(null);
                            }}
                            onClose={() => setEditColumnPopupOpen(null)}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </th>
              ))}

              {/* Regular Columns */}
              {regularColumns.map((column) => (
                <th 
                  key={column.id} 
                  className={`p-3 text-left border-b border-border min-w-[120px] transition-colors ${
                    columnHover === column.id ? 'bg-blue-50' : 'bg-muted'
                  } ${
                    dragOverColumn === column.id ? 'bg-yellow-100 border-yellow-400' : ''
                  } ${
                    draggedColumn === column.id ? 'opacity-50' : ''
                  }`}
                  onMouseEnter={() => setColumnHover(column.id)}
                  onMouseLeave={() => setColumnHover(null)}
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, column.id)}
                  onDragOver={(e) => handleDragOver(e, column.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, column.id)}
                  onDragEnd={handleDragEnd}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-3 w-3 text-muted-foreground cursor-move" />
                      <span className={getColumnColor(column)}>
                        {column.name}{column.required ? ' *' : ''}
                      </span>
                    </div>
                    
                    {(columnHover === column.id || activeColumnMenu === column.id) && (
                      <div className="flex items-center gap-1">
                        <DropdownMenu 
                          onOpenChange={(open) => {
                            setActiveColumnMenu(open ? column.id : null);
                          }}
                        >
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 w-6 p-0 hover:bg-blue-100"
                            >
                              <ArrowUpDown className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="w-48">
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>
                                <ArrowUpDown className="h-4 w-4 mr-2" />
                                Sắp xếp
                              </DropdownMenuSubTrigger>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem onClick={() => handleColumnAction(column.id, 'sort', 'left')}>
                                  A → Z
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleColumnAction(column.id, 'sort', 'right')}>
                                  Z → A
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            
                            <DropdownMenuItem onClick={() => handleColumnAction(column.id, 'filter')}>
                              <Filter className="h-4 w-4 mr-2" />
                              Lọc
                            </DropdownMenuItem>
                            
                            <DropdownMenuSeparator />
                            
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>
                                <Pin className="h-4 w-4 mr-2" />
                                Ghim cột
                              </DropdownMenuSubTrigger>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem 
                                  onClick={() => {
                                    const newColumns = [...columns];
                                    const columnIndex = newColumns.findIndex(col => col.id === column.id);
                                    newColumns[columnIndex].pinned = true;
                                    onColumnsChange?.(newColumns);
                                  }}
                                >
                                  <Pin className="h-4 w-4 mr-2" />
                                  Ghim bên trái
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>
                                <Plus className="h-4 w-4 mr-2" />
                                Thêm cột
                              </DropdownMenuSubTrigger>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem onClick={() => handleColumnAction(column.id, 'insert', 'left')}>
                                  <ArrowLeft className="h-4 w-4 mr-2" />
                                  Thêm bên trái
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleColumnAction(column.id, 'insert', 'right')}>
                                  <ArrowRight className="h-4 w-4 mr-2" />
                                  Thêm bên phải
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            
                            <DropdownMenuSeparator />
                            
                            <DropdownMenuItem onClick={() => handleColumnAction(column.id, 'edit')}>
                              <Settings className="h-4 w-4 mr-2" />
                              Chỉnh sửa cột
                            </DropdownMenuItem>
                            
                            <DropdownMenuItem onClick={() => handleColumnAction(column.id, 'hide')}>
                              <EyeOff className="h-4 w-4 mr-2" />
                              Ẩn cột
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Filter Popup */}
                        {filterPopoverOpen === column.id && (
                          <ColumnFilterPopup
                            columnId={column.id}
                            columnName={column.name}
                            uniqueValues={getUniqueColumnValues(column.id)}
                            currentFilters={columnFilters[column.id] || []}
                            onAddFilter={(value) => addFilter(column.id, value)}
                            onRemoveFilter={(value) => removeFilter(column.id, value)}
                            onClearFilters={() => clearColumnFilters(column.id)}
                            onClose={() => setFilterPopoverOpen(null)}
                          />
                        )}

                        {/* Edit Column Popup */}
                        {editColumnPopupOpen === column.id && (
                          <ColumnEditPopup
                            column={column}
                            onSave={(updatedColumn) => {
                              if (onColumnsChange) {
                                const newColumns = [...columns];
                                const columnIndex = newColumns.findIndex(col => col.id === column.id);
                                newColumns[columnIndex] = updatedColumn;
                                onColumnsChange(newColumns);
                              }
                              setEditColumnPopupOpen(null);
                            }}
                            onClose={() => setEditColumnPopupOpen(null)}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </th>
              ))}

              {/* Fixed Right Column - Actions */}
              <th className="sticky right-0 bg-muted p-3 text-left border-b border-border min-w-[120px] z-40">
                <div className="flex items-center justify-between">
                  <span>Thao tác</span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => {
              const isSelected = selectedCustomers.includes(customer.id);
              const reminderStatus = getReminderBellStatus(customer.id);
              
              return (
                <tr 
                  key={customer.id} 
                  className={`border-b border-border hover:bg-muted/30 ${
                    isSelected ? 'bg-blue-50' : ''
                  }`}
                >
                  {/* Checkbox Column */}
                  <td className="sticky left-0 bg-background w-12 p-3 z-20">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => onSelectCustomer(customer.id)}
                    />
                  </td>

                  {/* Fixed Left Column - Customer Name */}
                  <td 
                    className="sticky left-12 bg-background p-3 min-w-[200px] z-20"
                    style={{ left: '48px' }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{customer.name}</span>
                      {reminderStatus && (
                        <div className="relative">
                          <Bell className={`h-4 w-4 ${reminderStatus.color}`} />
                          {reminderStatus.count > 1 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                              {reminderStatus.count}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Pinned Columns - Fixed after Name */}
                  {pinnedLeftColumns.map((column, index) => (
                    <td 
                      key={column.id} 
                      className="sticky bg-background/95 p-3 min-w-[120px] z-5 border-r-2 border-r-blue-100"
                      style={{ left: `${calculatePinnedLeft(index)}px` }}
                    >
                      {renderEditableCell(customer, column)}
                    </td>
                  ))}

                  {/* Regular Columns */}
                  {regularColumns.map((column) => (
                    <td key={column.id} className="p-3 min-w-[120px]">
                      {renderEditableCell(customer, column)}
                    </td>
                  ))}

                  {/* Fixed Right Column - Actions */}
                  <td className="sticky right-0 bg-background p-3 min-w-[120px] z-20">
                    <div className="flex items-center gap-1">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem onClick={() => onShowDetails?.(customer)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Xem chi tiết
                          </DropdownMenuItem>
                          
                          <DropdownMenuItem onClick={() => onCreateReminder?.(customer.id, customer.name)}>
                            <Clock className="h-4 w-4 mr-2" />
                            Tạo nhắc nhở
                          </DropdownMenuItem>
                          
                          <DropdownMenuSeparator />
                          
                          <DropdownMenuItem onClick={() => onMoveToCustomer?.(customer.id)}>
                            <Users className="h-4 w-4 mr-2" />
                            Chuyển sang Khách hàng
                          </DropdownMenuItem>
                          
                          {canChangeToHot(customer.status) && (
                            <DropdownMenuItem onClick={() => onChangeToHot?.(customer.id)}>
                              <BellRing className="h-4 w-4 mr-2" />
                              Chuyển sang Nóng
                            </DropdownMenuItem>
                          )}
                          
                          <DropdownMenuItem onClick={() => onMoveToBadData?.(customer.id)}>
                            <Move3D className="h-4 w-4 mr-2" />
                            Chuyển sang Dữ liệu xấu
                          </DropdownMenuItem>
                          
                          <DropdownMenuSeparator />
                          
                          <DropdownMenuItem 
                            onClick={() => onDeleteCustomer?.(customer.id)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}