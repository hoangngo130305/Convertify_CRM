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

export function CustomerTableFixedWithFilter({ 
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

  // Get unique values for a column
  const getUniqueValuesForColumn = (columnId: string): string[] => {
    console.log('Getting unique values for column:', columnId);
    
    // First check if we have predefined options in filterOptions
    if (filterOptions[columnId as keyof typeof filterOptions]) {
      const predefined = filterOptions[columnId as keyof typeof filterOptions];
      console.log('Found predefined options:', predefined);
      return predefined;
    }

    // Extract unique values from customer data
    const uniqueValues = new Set<string>();
    
    customers.forEach(customer => {
      let value = customer[columnId as keyof typeof customer];
      
      if (value != null && value !== '') {
        if (Array.isArray(value)) {
          // Handle array values like products or tags
          value.forEach(item => {
            if (typeof item === 'object' && item.name) {
              uniqueValues.add(String(item.name));
            } else {
              uniqueValues.add(String(item));
            }
          });
        } else if (value instanceof Date) {
          // Handle date values
          uniqueValues.add(formatDate(value));
        } else {
          // Handle regular string/number values
          uniqueValues.add(String(value));
        }
      }
    });

    const result = Array.from(uniqueValues).sort();
    console.log('Extracted unique values:', result);
    return result;
  };

  // Handle filter application
  const handleApplyFilters = (columnId: string, filters: string[]) => {
    console.log('Applying filters for column', columnId, ':', filters);
    
    const newFilters = { ...columnFilters };
    
    if (filters.length === 0) {
      delete newFilters[columnId];
    } else {
      newFilters[columnId] = filters;
    }
    
    setColumnFilters(newFilters);
    setFilterPopoverOpen(null);
    setActiveColumnMenu(null);
  };

  return (
    <>
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
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </th>
                );})}

                {/* Fixed Right Column - Actions */}
                <th className="sticky right-0 bg-muted w-20 p-3 text-center border-b border-border z-20">
                  <span className="text-sm font-medium">Thao tác</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {customers.map((customer, rowIndex) => (
                <tr key={customer.id} className="border-b border-border hover:bg-muted/50">
                  {/* Checkbox */}
                  <td className="sticky left-0 bg-background w-12 p-3 z-10">
                    <Checkbox
                      checked={selectedCustomers.includes(customer.id)}
                      onCheckedChange={() => onSelectCustomer(customer.id)}
                    />
                  </td>

                  {/* Customer Name - Fixed Left */}
                  <td 
                    className="sticky left-12 bg-background p-3 min-w-[200px] z-10"
                    style={{ left: '48px' }}
                  >
                    <div className="flex items-center gap-3">
                      <CustomerAvatar name={customer.name} />
                      <div>
                        <div className="font-medium text-sm">{customer.name}</div>
                        <div className="text-xs text-muted-foreground">{customer.id}</div>
                      </div>
                    </div>
                  </td>

                  {/* Dynamic Columns */}
                  {visibleColumns.map((column) => {
                    const isPinnedLeft = column.pinned === 'left' || column.pinned === true;
                    const isPinnedRight = column.pinned === 'right';
                    const isSticky = isPinnedLeft || isPinnedRight;
                    
                    // Calculate sticky position
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
                    const cellValue = customer[column.id as keyof typeof customer];

                    return (
                      <td
                        key={`${customer.id}-${column.id}`}
                        className={`p-3 min-w-[120px] ${
                          isSticky ? 'sticky bg-background z-10' : ''
                        } ${isPinnedLeft ? 'border-r border-border' : ''} ${isPinnedRight ? 'border-l border-border' : ''}`}
                        style={isSticky ? stickyStyle : {}}
                        onDoubleClick={() => handleCellDoubleClick(customer.id, column.id, cellValue)}
                      >
                        {isEditing ? (
                          <div className="flex items-center gap-2">
                            {column.fieldType === 'select' && column.options ? (
                              <Select value={editValue} onValueChange={setEditValue}>
                                <SelectTrigger className="h-8">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {column.options.map(option => (
                                    <SelectItem key={option} value={option}>
                                      {option}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : column.id === 'notes' || column.id === 'questions' ? (
                              <Textarea
                                ref={textareaRef}
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="min-h-[60px] text-sm"
                              />
                            ) : (
                              <Input
                                ref={inputRef}
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="h-8 text-sm"
                              />
                            )}
                            <div className="flex gap-1">
                              <Button size="sm" variant="ghost" onClick={handleSaveEdit}>
                                <Check className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={handleCancelEdit}>
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ) : (
                          renderCellDisplayValue(column, cellValue)
                        )}
                      </td>
                    );
                  })}

                  {/* Actions - Fixed Right */}
                  <td className="sticky right-0 bg-background w-20 p-3 text-center z-10">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
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
                        <DropdownMenuItem 
                          onClick={() => onDeleteCustomer?.(customer.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Column Filter Popup */}
      {filterPopoverOpen && (
        <ColumnFilterPopup
          isOpen={true}
          onClose={() => {
            setFilterPopoverOpen(null);
            setActiveColumnMenu(null);
          }}
          columnId={filterPopoverOpen}
          columnName={columns.find(c => c.id === filterPopoverOpen)?.name || ''}
          onApplyFilters={handleApplyFilters}
          currentFilters={columnFilters[filterPopoverOpen] || []}
          uniqueValues={getUniqueValuesForColumn(filterPopoverOpen)}
        />
      )}

      {/* Column Edit Popup */}
      {editColumnPopupOpen && (
        <ColumnEditPopup
          isOpen={true}
          onClose={() => setEditColumnPopupOpen(null)}
          column={columns.find(c => c.id === editColumnPopupOpen)}
          onSave={(updatedColumn) => {
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
    </>
  );
}