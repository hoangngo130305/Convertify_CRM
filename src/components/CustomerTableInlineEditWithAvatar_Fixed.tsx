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
  quality: number;
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

interface CustomerTableProps {
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

export function CustomerTableInlineEditWithAvatar({ 
  customers, 
  selectedCustomers, 
  onSelectCustomer, 
  onSelectAll, 
  columns, 
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
  reminders
}: CustomerTableProps) {
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

  const isAllSelected = selectedCustomers.length === customers.length && customers.length > 0;

  // Separate pinned and regular columns
  const allVisibleColumns = columns
    .filter(column => column.visible && column.id !== 'name')
    .sort((a, b) => a.order - b.order);
  
  const pinnedLeftColumns = allVisibleColumns.filter(col => col.pinned === 'left' || col.pinned === true);
  const pinnedRightColumns = allVisibleColumns.filter(col => col.pinned === 'right');
  const regularColumns = allVisibleColumns.filter(col => !col.pinned);
  
  // Combine columns in order: pinned left + regular + pinned right
  const visibleColumns = [...pinnedLeftColumns, ...regularColumns, ...pinnedRightColumns];

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
        return (
          <div className="flex">
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className={`text-sm ${i < value ? 'text-yellow-500' : 'text-gray-300'}`}
              >
                ★
              </span>
            ))}
          </div>
        );
      
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

  return (
    <div className="h-full overflow-x-auto overflow-y-hidden">
      <div className="min-w-[1600px]">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-muted z-10">
            <tr>
              {/* Checkbox Column */}
              <th className="sticky left-0 bg-muted w-12 p-3 text-left border-b border-border z-20">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={onSelectAll}
                />
              </th>

              {/* Fixed Left Column - Customer Name */}
              <th 
                className="sticky left-12 bg-muted p-3 text-left border-b border-border min-w-[200px] z-20"
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
                const isDraggable = !isSticky; // Disable drag for pinned columns
                
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
                  className={`p-3 text-left border-b border-border min-w-[120px] relative group ${
                    isSticky ? 'sticky bg-background z-20' : ''
                  } ${isPinnedLeft ? 'border-r-2 border-primary/20' : ''} ${isPinnedRight ? 'border-l-2 border-primary/20' : ''}`}
                  style={{
                    ...(isSticky ? stickyStyle : {}),
                    backgroundColor: dragOverColumn === column.id ? 'rgba(124, 58, 237, 0.1)' : undefined
                  }}
                  onMouseEnter={() => setColumnHover(column.id)}
                  onMouseLeave={() => setColumnHover(null)}
                  draggable={isDraggable}
                  onDragStart={isDraggable ? (e) => {
                    setDraggedColumn(column.id);
                    e.dataTransfer.effectAllowed = 'move';
                  } : undefined}
                  onDragOver={isDraggable ? (e) => {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = 'move';
                    setDragOverColumn(column.id);
                  } : undefined}
                  onDragLeave={isDraggable ? () => setDragOverColumn(null) : undefined}
                  onDrop={isDraggable ? (e) => {
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
                        isDraggable ? 'cursor-move opacity-0 group-hover:opacity-100' : 'cursor-not-allowed opacity-30'
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
                  
                  {/* Filter Popover */}
                  {filterPopoverOpen === column.id && (
                    <ColumnFilterPopup
                      isOpen={true}
                      onClose={() => setFilterPopoverOpen(null)}
                      column={column}
                      currentFilters={columnFilters[column.id] || []}
                      onFiltersChange={(filters) => {
                        setColumnFilters(prev => ({
                          ...prev,
                          [column.id]: filters
                        }));
                      }}
                      filterOptions={filterOptions[column.id as keyof typeof filterOptions] || []}
                    />
                  )}
                </th>
                );
              })}

              {/* Fixed Right Column - Actions */}
              <th className="sticky right-0 bg-muted w-20 p-3 text-left border-b border-border z-20">
                <span className="text-sm font-medium">Thao tác</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={customer.id} className="border-b border-border hover:bg-muted/50">
                {/* Checkbox Column */}
                <td className="sticky left-0 bg-white w-12 p-3 z-10 border-r border-border">
                  <Checkbox
                    checked={selectedCustomers.includes(customer.id)}
                    onCheckedChange={() => onSelectCustomer(customer.id)}
                  />
                </td>

                {/* Fixed Left Column - Customer Name with Avatar */}
                <td className="sticky left-12 bg-white p-3 z-10 border-r border-border min-w-[200px]" style={{ left: '48px' }}>
                  <div className="flex items-center gap-3">
                    <CustomerAvatar 
                      name={customer.name}
                      size="sm"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{customer.name}</p>
                      <p className="text-sm text-muted-foreground truncate">{customer.email}</p>
                    </div>
                  </div>
                </td>

                {/* Scrollable Data Columns */}
                {visibleColumns.map((column) => {
                  const isPinnedLeft = column.pinned === 'left' || column.pinned === true;
                  const isPinnedRight = column.pinned === 'right';
                  const isSticky = isPinnedLeft || isPinnedRight;
                  
                  // Calculate sticky position for pinned columns
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

                  const isEditing = editingCell?.row === customer.id && editingCell?.column === column.id;
                  const cellValue = customer[column.id as keyof Customer] || customer.customFields?.[column.id] || '';

                  return (
                  <td 
                    key={column.id}
                    className={`p-3 min-w-[120px] ${
                      isSticky ? 'sticky bg-white z-10' : ''
                    } ${isPinnedLeft ? 'border-r border-border' : ''} ${isPinnedRight ? 'border-l border-border' : ''}`}
                    style={isSticky ? stickyStyle : undefined}
                    onDoubleClick={() => handleCellDoubleClick(customer.id, column.id, cellValue)}
                  >
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        {column.fieldType === 'multiselect' ? (
                          <TagCell
                            value={editValue}
                            onChange={setEditValue}
                            options={column.options || []}
                            onSave={handleSaveEdit}
                            onCancel={handleCancelEdit}
                          />
                        ) : column.fieldType === 'select' ? (
                          <Select value={editValue} onValueChange={setEditValue}>
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {(column.options || filterOptions[column.id as keyof typeof filterOptions] || []).map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : column.id === 'notes' || column.id === 'questions' || column.id === 'address' ? (
                          <Textarea
                            ref={textareaRef}
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="min-h-[60px] text-xs"
                            placeholder={`Nhập ${column.name.toLowerCase()}...`}
                          />
                        ) : (
                          <Input
                            ref={inputRef}
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="h-8 text-xs"
                            type={column.fieldType === 'number' ? 'number' : 'text'}
                            placeholder={`Nhập ${column.name.toLowerCase()}...`}
                          />
                        )}
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            onClick={handleSaveEdit}
                            className="h-6 w-6 p-0"
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleCancelEdit}
                            className="h-6 w-6 p-0"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="cursor-pointer hover:bg-muted/50 rounded p-1 -m-1">
                        {renderCellDisplayValue(column, cellValue)}
                      </div>
                    )}
                  </td>
                  );
                })}

                {/* Fixed Right Column - Actions */}
                <td className="sticky right-0 bg-white w-20 p-3 z-10 border-l border-border">
                  <div className="flex items-center gap-1">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onShowDetails && onShowDetails(customer)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onCreateReminder && onCreateReminder(customer.id, customer.name)}>
                          <Clock className="h-4 w-4 mr-2" />
                          Tạo nhắc nhở
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onMoveToCustomer && onMoveToCustomer(customer.id)}>
                          <Users className="h-4 w-4 mr-2" />
                          Chuyển sang khách hàng
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onMoveToBadData && onMoveToBadData(customer.id)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Chuyển data xấu
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => onDeleteCustomer && onDeleteCustomer(customer.id)}
                          className="text-red-600"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <a href={`tel:${customer.phone}`}>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </a>

                    <a href={`mailto:${customer.email}`}>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Column Edit Popup */}
      {editColumnPopupOpen && (
        <ColumnEditPopup
          isOpen={true}
          onClose={() => setEditColumnPopupOpen(null)}
          column={columns.find(c => c.id === editColumnPopupOpen)!}
          onSave={(updatedColumn) => {
            if (onColumnsChange) {
              const newColumns = columns.map(c => 
                c.id === editColumnPopupOpen ? updatedColumn : c
              );
              onColumnsChange(newColumns);
            }
            setEditColumnPopupOpen(null);
          }}
        />
      )}
    </div>
  );
}