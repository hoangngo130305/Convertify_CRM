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
  Settings,
  UserPlus
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
  phoneArray?: string[]; // Array of phones when merged
  emailArray?: string[]; // Array of emails when merged
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
  pinned?: boolean | 'right' | 'left';
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
  onMoveToBadData?: (customerId: string) => void;
  onMoveToCustomer?: (customerId: string) => void;
  onChangeToHot?: (customerId: string) => void;
  reminders?: any[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Mới': return 'bg-blue-100 text-blue-800';
    case 'Đang xử lý': return 'bg-yellow-100 text-yellow-800';
    case 'Waning': return 'bg-orange-100 text-orange-800 border border-orange-300'; // Warning status
    case 'Thành công': return 'bg-green-100 text-green-800';
    case 'Thất bại': return 'bg-red-100 text-red-800';
    case 'Đã chuyển CRM': return 'bg-purple-100 text-purple-800';
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
  status: ['Mới', 'Đang xử lý', 'Waning', 'Thành công', 'Thất bại', 'Đã chuyển CRM', 'Lạnh'],
  source: ['Facebook', 'Google', 'TikTok', 'Zalo', 'Hotline', 'Website', 'Giới thiệu'],
  assignedSale: ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D', 'Chưa phân bổ'],
};

export function LeadTableInlineEditWithAvatar({ 
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
  onMoveToBadData,
  onMoveToCustomer,
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
  const [productsSelectOpen, setProductsSelectOpen] = useState(false);
  
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

  const handleCellDoubleClick = (customerId: string, columnId: string, currentValue: any) => {
    // Skip editing for non-editable columns
    if (['quality', 'customerId', 'revenue'].includes(columnId)) {
      return;
    }
    
    setEditingCell({ row: customerId, column: columnId });
    
    // For products column, ensure editValue is an array
    if (columnId === 'products') {
      setEditValue(Array.isArray(currentValue) ? [...currentValue] : []);
    } else {
      // Ensure value is never undefined to prevent uncontrolled input warning
      setEditValue(currentValue ?? '');
    }
  };

  const handleSaveEdit = () => {
    if (editingCell && onCustomerUpdate) {
      onCustomerUpdate(editingCell.row, editingCell.column, editValue);
    }
    setEditingCell(null);
    setEditValue('');
    setProductsSelectOpen(false);
  };

  const handleCancelEdit = () => {
    setEditingCell(null);
    setEditValue('');
    setProductsSelectOpen(false);
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

  const handleProductToggle = (product: string) => {
    if (Array.isArray(editValue)) {
      const newProducts = editValue.includes(product)
        ? editValue.filter(p => p !== product)
        : [...editValue, product];
      setEditValue(newProducts);
    }
  };

  const handleProductsSelectSave = () => {
    if (editingCell && onCustomerUpdate) {
      onCustomerUpdate(editingCell.row, editingCell.column, editValue);
    }
    setEditingCell(null);
    setEditValue('');
    setProductsSelectOpen(false);
  };

  const isAllSelected = (selectedCustomers?.length || 0) === (customers?.length || 0) && (customers?.length || 0) > 0;

  // Separate pinned and regular columns
  const allVisibleColumns = columns
    .filter(column => column.visible && column.id !== 'name')
    .sort((a, b) => a.order - b.order);
  
  const pinnedLeftColumns = allVisibleColumns.filter(col => col.pinned === 'left' || col.pinned === true);
  const pinnedRightColumns = allVisibleColumns.filter(col => col.pinned === 'right');
  const regularColumns = allVisibleColumns.filter(col => !col.pinned);
  
  // Combine columns in order: pinned left + regular + pinned right
  const visibleColumns = [...pinnedLeftColumns, ...regularColumns, ...pinnedRightColumns];

  const renderCellDisplayValue = (column: Column, value: any, customer?: Customer) => {
    switch (column.id) {
      case 'phone':
        // Check if customer has multiple phones from merge
        if (customer?.phoneArray && customer.phoneArray.length > 1) {
          return (
            <div className="space-y-1">
              <span className="text-sm text-primary font-medium">
                {customer.phoneArray.join(' | ')}
              </span>
              <div className="text-xs text-gray-500">
                {customer.phoneArray.length} số điện thoại
              </div>
            </div>
          );
        }
        return (
          <span className="text-sm">
            {value || '-'}
          </span>
        );
      
      case 'email':
        // Check if customer has multiple emails from merge
        if (customer?.emailArray && customer.emailArray.length > 1) {
          return (
            <div className="space-y-1">
              <span className="text-sm text-primary font-medium break-all">
                {customer.emailArray.join(' | ')}
              </span>
              <div className="text-xs text-gray-500">
                {customer.emailArray.length} email
              </div>
            </div>
          );
        }
        return (
          <span className="text-sm break-all">
            {value || '-'}
          </span>
        );
      
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
            <div className="flex items-center gap-2">
              <Badge className={`text-xs ${
                value === 'Hot/Nóng' ? 'bg-red-100 text-red-800' :
                value === 'Warm/Ấm' ? 'bg-yellow-100 text-yellow-800' :
                value === 'Cold/Lạnh' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {value}
              </Badge>
              {/* Show "Chuyển data xấu" button when quality is Cold/Lạnh */}
              {value === 'Cold/Lạnh' && onMoveToBadData && (
                <Button
                  size="sm"
                  variant="outline"
                  className="h-6 px-2 text-xs border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveToBadData(customer?.id || '', 'Lead chất lượng Cold - không có nhu cầu');
                  }}
                  title="Chuyển vào data xấu do chất lượng Cold"
                >
                  Chuyển data xấu
                </Button>
              )}
            </div>
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
              <th className="sticky left-0 bg-muted py-2 px-3 text-left border-b border-r border-border z-40" style={{ width: '48px', minWidth: '48px', maxWidth: '48px' }}>
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={onSelectAll}
                />
              </th>

              {/* Fixed Left Column - Customer Name */}
              <th 
                className="sticky bg-muted py-2 px-3 text-left border-b border-r border-border min-w-[200px] z-40"
                style={{ left: '48px' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-red-600">Tên khách hàng *</span>
                </div>
              </th>

              {/* Scrollable Columns */}
              {visibleColumns.map((column, index) => {
                const isPinnedLeft = column.pinned === 'left' || column.pinned === true;
                const isPinnedRight = column.pinned === 'right';
                const isSticky = isPinnedLeft || isPinnedRight;
                
                // Calculate sticky position for pinned columns
                let stickyStyle = {};
                if (isPinnedLeft) {
                  // Calculate left position: base customer name column (248px) + previous pinned left columns
                  const prevPinnedLeftCols = pinnedLeftColumns.slice(0, pinnedLeftColumns.findIndex(c => c.id === column.id));
                  const leftOffset = 248 + (prevPinnedLeftCols.length * 120); // 120px min width per column
                  stickyStyle = { left: `${leftOffset}px` };
                } else if (isPinnedRight) {
                  // Calculate right position: action column (80px) + previous pinned right columns  
                  const prevPinnedRightCols = pinnedRightColumns.slice(pinnedRightColumns.findIndex(c => c.id === column.id) + 1);
                  const rightOffset = 80 + (prevPinnedRightCols.length * 120);
                  stickyStyle = { right: `${rightOffset}px` };
                }
                
                return (
                <th 
                  key={column.id} 
                  className={`py-2 px-3 text-left border-b border-border min-w-[120px] relative group ${
                    isSticky ? 'sticky bg-muted z-40' : ''
                  } ${isPinnedLeft ? 'border-r-2 border-primary/20' : ''} ${isPinnedRight ? 'border-l-2 border-primary/20' : ''}`}
                  style={{
                    ...(isSticky ? stickyStyle : {}),
                    backgroundColor: dragOverColumn === column.id ? 'rgba(124, 58, 237, 0.1)' : undefined
                  }}
                  onMouseEnter={() => setColumnHover(column.id)}
                  onMouseLeave={() => setColumnHover(null)}
                  draggable={!isSticky}
                  onDragStart={!isSticky ? (e) => {
                    setDraggedColumn(column.id);
                    e.dataTransfer.effectAllowed = 'move';
                  } : undefined}
                  onDragOver={!isSticky ? (e) => {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = 'move';
                    setDragOverColumn(column.id);
                  } : undefined}
                  onDragLeave={!isSticky ? () => setDragOverColumn(null) : undefined}
                  onDrop={!isSticky ? (e) => {
                    e.preventDefault();
                    if (draggedColumn && draggedColumn !== column.id && onColumnsChange) {
                      const draggedCol = columns.find(c => c.id === draggedColumn);
                      const targetCol = columns.find(c => c.id === column.id);
                      
                      // Only allow reordering between non-pinned columns
                      if (draggedCol && targetCol && !draggedCol.pinned && !targetCol.pinned) {
                        const newColumns = [...columns];
                        const draggedIndex = newColumns.findIndex(c => c.id === draggedColumn);
                        const targetIndex = newColumns.findIndex(c => c.id === column.id);
                        
                        if (draggedIndex !== -1 && targetIndex !== -1) {
                          const [draggedItem] = newColumns.splice(draggedIndex, 1);
                          newColumns.splice(targetIndex, 0, draggedItem);
                          
                          // Update order numbers
                          newColumns.forEach((col, index) => {
                            col.order = index + 1;
                          });
                          
                          onColumnsChange(newColumns);
                        }
                      }
                    }
                    setDraggedColumn(null);
                    setDragOverColumn(null);
                  } : undefined}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GripVertical className={`h-4 w-4 text-muted-foreground transition-opacity ${
                        !isSticky ? 'cursor-move opacity-0 group-hover:opacity-100' : 'cursor-not-allowed opacity-30'
                      }`} />
                      <span className={getColumnColor(column)}>
                        {column.name}{column.required ? ' *' : ''}
                        {isSticky && <Pin className="h-3 w-3 ml-1 inline text-primary" />}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {/* Column Menu */}
                      <DropdownMenu
                        open={activeColumnMenu === column.id}
                        onOpenChange={(open) => setActiveColumnMenu(open ? column.id : null)}
                      >
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`h-6 w-6 p-0 transition-opacity ${
                              columnFilters[column.id]?.length > 0 
                                ? 'opacity-100 text-primary' 
                                : 'opacity-0 group-hover:opacity-100'
                            }`}
                          >
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem onClick={() => setFilterPopoverOpen(column.id)}>
                            <Filter className="h-4 w-4 mr-2" />
                            Lọc cột
                          </DropdownMenuItem>
                          
                          {/* Sắp xếp với sub-menu */}
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                              <ArrowUpDown className="h-4 w-4 mr-2" />
                              Sắp xếp
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem onClick={() => {
                                console.log(`Sort ${column.id} ascending`);
                                if (onCustomerSort) {
                                  const sortedCustomers = [...customers].sort((a, b) => {
                                    const aVal = a[column.id as keyof typeof a] || '';
                                    const bVal = b[column.id as keyof typeof b] || '';
                                    return String(aVal).localeCompare(String(bVal));
                                  });
                                  onCustomerSort(sortedCustomers);
                                }
                              }}>
                                <ArrowUpDown className="h-4 w-4 mr-2" />
                                A → Z
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {
                                console.log(`Sort ${column.id} descending`);
                                if (onCustomerSort) {
                                  const sortedCustomers = [...customers].sort((a, b) => {
                                    const aVal = a[column.id as keyof typeof a] || '';
                                    const bVal = b[column.id as keyof typeof b] || '';
                                    return String(bVal).localeCompare(String(aVal));
                                  });
                                  onCustomerSort(sortedCustomers);
                                }
                              }}>
                                <ArrowUpDown className="h-4 w-4 mr-2 rotate-180" />
                                Z → A
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuSub>
                          
                          <DropdownMenuItem onClick={() => setEditColumnPopupOpen(column.id)}>
                            <Settings className="h-4 w-4 mr-2" />
                            Chỉnh sửa cột
                          </DropdownMenuItem>
                          
                          <DropdownMenuSeparator />
                          
                          {/* Ghim cột với sub-menu */}
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                              <Pin className="h-4 w-4 mr-2" />
                              Ghim cột
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem 
                                onClick={() => {
                                  if (onColumnsChange) {
                                    const newColumns = columns.map(c => 
                                      c.id === column.id ? { ...c, pinned: 'left' } : c
                                    );
                                    onColumnsChange(newColumns);
                                  }
                                }}
                              >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Ghim trái
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => {
                                  if (onColumnsChange) {
                                    const newColumns = columns.map(c => 
                                      c.id === column.id ? { ...c, pinned: 'right' } : c
                                    );
                                    onColumnsChange(newColumns);
                                  }
                                }}
                              >
                                <ArrowRight className="h-4 w-4 mr-2" />
                                Ghim phải
                              </DropdownMenuItem>
                              {column.pinned && (
                                <DropdownMenuItem 
                                  onClick={() => {
                                    if (onColumnsChange) {
                                      const newColumns = columns.map(c => 
                                        c.id === column.id ? { ...c, pinned: false } : c
                                      );
                                      onColumnsChange(newColumns);
                                    }
                                  }}
                                >
                                  <PinOff className="h-4 w-4 mr-2" />
                                  Bỏ ghim
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuSubContent>
                          </DropdownMenuSub>
                          
                          {/* Chèn cột với sub-menu */}
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                              <Plus className="h-4 w-4 mr-2" />
                              Chèn cột
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem onClick={() => {
                                console.log(`Insert column before ${column.id}`);
                                if (onColumnsChange) {
                                  const newColumn = {
                                    id: `custom_${Date.now()}`,
                                    name: 'Cột mới',
                                    type: 'custom' as const,
                                    visible: true,
                                    required: false,
                                    order: column.order,
                                    fieldType: 'text' as const
                                  };
                                  const newColumns = [...columns];
                                  const insertIndex = newColumns.findIndex(c => c.id === column.id);
                                  newColumns.splice(insertIndex, 0, newColumn);
                                  
                                  // Update order numbers
                                  newColumns.forEach((col, index) => {
                                    col.order = index + 1;
                                  });
                                  
                                  onColumnsChange(newColumns);
                                }
                              }}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Chèn trước
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {
                                console.log(`Insert column after ${column.id}`);
                                if (onColumnsChange) {
                                  const newColumn = {
                                    id: `custom_${Date.now()}`,
                                    name: 'Cột mới',
                                    type: 'custom' as const,
                                    visible: true,
                                    required: false,
                                    order: column.order + 1,
                                    fieldType: 'text' as const
                                  };
                                  const newColumns = [...columns];
                                  const insertIndex = newColumns.findIndex(c => c.id === column.id) + 1;
                                  newColumns.splice(insertIndex, 0, newColumn);
                                  
                                  // Update order numbers
                                  newColumns.forEach((col, index) => {
                                    col.order = index + 1;
                                  });
                                  
                                  onColumnsChange(newColumns);
                                }
                              }}>
                                <ArrowRight className="h-4 w-4 mr-2" />
                                Chèn sau
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuSub>
                          
                          <DropdownMenuItem 
                            onClick={() => {
                              if (onColumnsChange) {
                                const newColumns = columns.map(c => 
                                  c.id === column.id ? { ...c, visible: false } : c
                                );
                                onColumnsChange(newColumns);
                              }
                            }}
                          >
                            <EyeOff className="h-4 w-4 mr-2" />
                            Ẩn cột
                          </DropdownMenuItem>
                          
                          {column.type === 'custom' && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => {
                                  if (confirm('Bạn có chắc chắn muốn xóa cột này?')) {
                                    if (onColumnsChange) {
                                      const newColumns = columns.filter(c => c.id !== column.id);
                                      onColumnsChange(newColumns);
                                    }
                                  }
                                }}
                                className="text-red-600"
                              >
                                <X className="h-4 w-4 mr-2" />
                                Xóa cột
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                </th>
                );
              })}

              {/* Fixed Right Column - Actions */}
              <th className="sticky right-0 bg-muted w-32 py-2 px-3 text-center border-b border-l border-border z-40">
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody>
            {customers.map(customer => {
              const bellStatus = getReminderBellStatus(customer.id);
              
              return (
              <tr key={customer.id} className="group hover:bg-muted">
                {/* Checkbox */}
                <td className="sticky left-0 bg-background group-hover:bg-muted py-2 px-3 text-left border-b border-r border-border z-20" style={{ width: '48px', minWidth: '48px', maxWidth: '48px' }}>
                  <Checkbox
                    checked={selectedCustomers.includes(customer.id)}
                    onCheckedChange={() => onSelectCustomer(customer.id)}
                  />
                </td>

                {/* Fixed Customer Name with Avatar */}
                <td 
                  className="sticky bg-background group-hover:bg-muted py-2 px-3 border-b border-r border-border min-w-[200px] z-20"
                  style={{ left: '48px' }}
                  onDoubleClick={() => handleCellDoubleClick(customer.id, 'name', customer.name)}
                >
                  <div className="flex items-center gap-2">
                    <CustomerAvatar name={customer.name} size="sm" />
                    {editingCell?.row === customer.id && editingCell?.column === 'name' ? (
                      <Input
                        ref={inputRef}
                        value={editValue || ''}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onBlur={handleSaveEdit}
                        className="h-6 text-sm min-w-[120px]"
                      />
                    ) : (
                      <div className="flex items-center gap-2 flex-1">
                        <span className="cursor-pointer hover:bg-gray-100 px-1 py-0.5 rounded">{customer.name}</span>
                        {bellStatus && (
                          <div className="relative flex-shrink-0" title={`${bellStatus.count} nhắc nhở ${bellStatus.type === 'overdue' ? 'quá hạn' : bellStatus.type === 'due' ? 'đến hạn' : 'sắp tới'}`}>
                            {bellStatus.type === 'overdue' && <BellRing className={`h-4 w-4 ${bellStatus.color}`} />}
                            {bellStatus.type === 'due' && <Bell className={`h-4 w-4 ${bellStatus.color}`} />}
                            {bellStatus.type === 'upcoming' && <BellOff className={`h-4 w-4 ${bellStatus.color}`} />}
                            {bellStatus.count > 1 && (
                              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center leading-none">
                                {bellStatus.count}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </td>

                {/* Scrollable Columns */}
                {visibleColumns.map((column, index) => {
                  const isPinnedLeft = column.pinned === 'left' || column.pinned === true;
                  const isPinnedRight = column.pinned === 'right';
                  const isSticky = isPinnedLeft || isPinnedRight;
                  
                  // Calculate sticky position for pinned columns (same as header)
                  let stickyStyle = {};
                  if (isPinnedLeft) {
                    const prevPinnedLeftCols = pinnedLeftColumns.slice(0, pinnedLeftColumns.findIndex(c => c.id === column.id));
                    const leftOffset = 248 + (prevPinnedLeftCols.length * 120);
                    stickyStyle = { left: `${leftOffset}px` };
                  } else if (isPinnedRight) {
                    const prevPinnedRightCols = pinnedRightColumns.slice(pinnedRightColumns.findIndex(c => c.id === column.id) + 1);
                    const rightOffset = 80 + (prevPinnedRightCols.length * 120);
                    stickyStyle = { right: `${rightOffset}px` };
                  }
                  const value = customer[column.id as keyof Customer] ?? customer.customFields?.[column.id] ?? '';
                  const isEditing = editingCell?.row === customer.id && editingCell?.column === column.id;
                  
                  // Handle tags column with TagCell component
                  if (column.id === 'tags') {
                    return (
                      <td key={column.id} className="py-2 px-3 border-b border-border">
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
                      </td>
                    );
                  }
                  
                  return (
                    <td 
                      key={column.id} 
                      className={`py-2 px-3 border-b border-border ${
                        isSticky ? 'sticky bg-background group-hover:bg-muted z-20' : ''
                      } ${isPinnedLeft ? 'border-r-2 border-primary/20' : ''} ${isPinnedRight ? 'border-l-2 border-primary/20' : ''}`}
                      style={isSticky ? stickyStyle : undefined}
                    >
                      {!isEditing ? (
                        <div
                          onDoubleClick={() => handleCellDoubleClick(customer.id, column.id, value)}
                          className="cursor-pointer hover:bg-accent p-1 rounded min-h-[32px] flex items-center"
                        >
                          {renderCellDisplayValue(column, value, customer)}
                        </div>
                      ) : (
                        // Edit mode - render appropriate input
                        <div className="p-1">
                          {column.id === 'products' ? (
                            <Popover open={productsSelectOpen} onOpenChange={setProductsSelectOpen}>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="h-8 text-xs justify-start"
                                  onClick={() => setProductsSelectOpen(true)}
                                >
                                  {Array.isArray(editValue) && editValue.length > 0 
                                    ? `${editValue.length} sản phẩm` 
                                    : 'Chọn sản phẩm...'}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-64 p-0" align="start">
                                <div className="p-3">
                                  <div className="space-y-2 max-h-48 overflow-y-auto">
                                    {filterOptions.products.map(product => (
                                      <div key={product} className="flex items-center space-x-2">
                                        <Checkbox
                                          id={`product-${product}`}
                                          checked={Array.isArray(editValue) && editValue.includes(product)}
                                          onCheckedChange={() => handleProductToggle(product)}
                                        />
                                        <label
                                          htmlFor={`product-${product}`}
                                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                                        >
                                          {product}
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="flex gap-2 mt-3 pt-3 border-t">
                                    <Button
                                      size="sm"
                                      onClick={handleProductsSelectSave}
                                      className="flex-1"
                                    >
                                      <Check className="h-4 w-4 mr-1" />
                                      Lưu
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => {
                                        setProductsSelectOpen(false);
                                        handleCancelEdit();
                                      }}
                                      className="flex-1"
                                    >
                                      <X className="h-4 w-4 mr-1" />
                                      Hủy
                                    </Button>
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                          ) : ['status', 'source', 'assignedSale', 'quality'].includes(column.id) ? (
                            <Select
                              value={editValue ?? ''}
                              onValueChange={(newValue) => {
                                if (onCustomerUpdate) {
                                  onCustomerUpdate(customer.id, column.id, newValue);
                                }
                                setEditingCell(null);
                                setEditValue('');
                              }}
                            >
                              <SelectTrigger className="h-8 text-xs">
                                <SelectValue placeholder="Chọn..." />
                              </SelectTrigger>
                              <SelectContent>
                                {column.id === 'quality' ? (
                                  ['Hot/Nóng', 'Warm/Ấm', 'Cold/Lạnh'].map(option => (
                                    <SelectItem key={option} value={option}>
                                      {option}
                                    </SelectItem>
                                  ))
                                ) : (
                                  filterOptions[column.id as keyof typeof filterOptions]?.map(option => (
                                    <SelectItem key={option} value={option}>
                                      {option}
                                    </SelectItem>
                                  ))
                                )}
                              </SelectContent>
                            </Select>
                          ) : (
                            <Input
                              ref={inputRef}
                              value={editValue ?? ''}
                              onChange={(e) => setEditValue(e.target.value)}
                              onKeyDown={handleKeyDown}
                              onBlur={handleSaveEdit}
                              className="h-8 text-xs"
                            />
                          )}
                        </div>
                      )}
                    </td>
                  );
                })}

                {/* Fixed Action Column */}
                <td className="sticky right-0 bg-background group-hover:bg-muted w-32 py-2 px-3 text-center border-b border-l border-border z-20">
                  <div className="flex items-center justify-center gap-1">
                    {/* Move to CRM Button - Direct action with better icon */}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={customer.status === 'Đã chuyển CRM' 
                        ? "h-7 w-7 p-0 border-gray-200 text-gray-500 bg-gray-50 cursor-not-allowed" 
                        : "h-7 w-7 p-0 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-800"
                      }
                      onClick={() => customer.status !== 'Đã chuyển CRM' && onMoveToCustomer?.(customer.id)}
                      disabled={customer.status === 'Đã chuyển CRM'}
                      title={customer.status === 'Đã chuyển CRM' ? "Đã chuyển vào CRM" : "Chuyển vào CRM"}
                    >
                      {customer.status === 'Đã chuyển CRM' ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <UserPlus className="h-3 w-3" />
                      )}
                    </Button>
                    
                    {/* More Actions Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <MoreVertical className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onShowDetails?.(customer)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onCreateReminder?.(customer.id, customer.name)}>
                          <Bell className="h-4 w-4 mr-2" />
                          Tạo nhắc nhở
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {/* Move to CRM option in dropdown */}
                        <DropdownMenuItem 
                          onClick={() => customer.status !== 'Đã chuyển CRM' && onMoveToCustomer?.(customer.id)}
                          disabled={customer.status === 'Đã chuyển CRM'}
                          className={customer.status === 'Đã chuyển CRM' ? 'text-gray-400 cursor-not-allowed' : 'text-purple-600'}
                        >
                          <UserPlus className="h-4 w-4 mr-2" />
                          {customer.status === 'Đã chuyển CRM' ? 'Đã chuyển CRM' : 'Chuyển vào CRM'}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onMoveToBadData?.(customer.id)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Chuyển vào data xấu
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onDeleteCustomer?.(customer.id)} className="text-red-600">
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
      
      {/* Column Edit Popup */}
      {editColumnPopupOpen && (
        <ColumnEditPopup
          isOpen={true}
          onClose={() => setEditColumnPopupOpen(null)}
          column={columns.find(c => c.id === editColumnPopupOpen)}
          onColumnUpdate={(updatedColumn) => {
            if (onColumnsChange) {
              const newColumns = columns.map(c => 
                c.id === updatedColumn.id ? updatedColumn : c
              );
              onColumnsChange(newColumns);
            }
            setEditColumnPopupOpen(null);
          }}
        />
      )}

      {/* Column Filter Popup - Rendered outside table with highest z-index */}
      {filterPopoverOpen && (
        <ColumnFilterPopup
          isOpen={true}
          onClose={() => setFilterPopoverOpen(null)}
          column={columns.find(c => c.id === filterPopoverOpen)!}
          currentFilters={columnFilters[filterPopoverOpen] || []}
          onFiltersChange={(filters) => {
            setColumnFilters(prev => ({
              ...prev,
              [filterPopoverOpen]: filters
            }));
          }}
          customers={customers}
        />
      )}
    </div>
  );
}