import React, { useState, useEffect, useRef } from 'react';
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
  phoneArray?: string[]; // Array of phones when merged
  emailArray?: string[]; // Array of emails when merged
  products: string[];
  status: string;
  source: string;
  assignedSale: string;
  createdDate: Date;
  notes: string;
  quality: string; // Changed from number to string for Hot/Warm/Cold
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
  quality: ['Hot/Nóng', 'Warm/Ấm', 'Cold/Lạnh'], // Add quality filter options
  actions: ['Xem chi tiết', 'Chỉnh sửa', 'Tạo nhắc nhở', 'Xóa'], // Add actions filter options
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
  const [productsSelectOpen, setProductsSelectOpen] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
    
    if (isEditing) {
      // Special handling for different field types
      if (column.fieldType === 'select' && column.options) {
        return (
          <Select
            value={editValue}
            onValueChange={(newValue) => {
              setEditValue(newValue);
              handleSaveEdit();
            }}
          >
            <SelectTrigger className="h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {column.options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      } else if (column.fieldType === 'multiselect' && column.options) {
        return (
          <Select
            value={editValue}
            onValueChange={(newValue) => {
              // Handle multiselect logic here if needed
              setEditValue(newValue);
              handleSaveEdit();
            }}
          >
            <SelectTrigger className="h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {column.options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      } else if (column.id === 'notes') {
        return (
          <Textarea
            ref={textareaRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSaveEdit}
            className="h-20 text-sm resize-none"
            placeholder="Nhập ghi chú..."
          />
        );
      } else {
        return (
          <Input
            ref={inputRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSaveEdit}
            className="h-8 text-sm"
            type={column.fieldType === 'number' ? 'number' : 'text'}
          />
        );
      }
    }
    
    // Display mode
    return (
      <div
        onDoubleClick={() => handleCellDoubleClick(customer.id, column.id, value)}
        className="cursor-pointer hover:bg-muted/50 p-1 rounded min-h-[32px] flex items-center"
      >
        {renderCellDisplayValue(column, value)}
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
        return (
          <Badge 
            className={`text-xs ${
              value === 'Hot/Nóng' ? 'bg-red-100 text-red-800' :
              value === 'Warm/Ấm' ? 'bg-yellow-100 text-yellow-800' :
              value === 'Cold/Lạnh' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}
          >
            {value}
          </Badge>
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
                
                return (
                <th 
                  key={column.id} 
                  className={`p-3 text-left border-b border-border min-w-[120px] relative group ${
                    isSticky ? 'sticky bg-muted z-20' : ''
                  } ${isPinnedLeft ? 'border-r-2 border-primary/20' : ''} ${isPinnedRight ? 'border-l-2 border-primary/20' : ''}`}
                  style={stickyStyle}
                >
                  <div className="flex items-center justify-between">
                    <span className={getColumnColor(column)}>
                      {column.name}{column.required ? ' *' : ''}
                      {isSticky && <Pin className="h-3 w-3 ml-1 inline text-primary" />}
                    </span>
                    
                    <div className="flex items-center gap-1">
                      {/* Column Menu */}
                      <DropdownMenu>
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
                          
                          <DropdownMenuItem 
                            onClick={() => setEditColumnPopupOpen(column.id)}
                            className="flex items-center gap-2"
                          >
                            <Settings className="h-3 w-3" />
                            Chỉnh sửa cột
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                </th>
                );
              })}

              {/* Fixed Right Column - Actions */}
              <th className="sticky right-0 bg-muted w-20 p-3 text-center border-b border-border z-40">
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody>
            {customers.map(customer => {
              const bellStatus = getReminderBellStatus(customer.id);
              
              return (
              <tr key={customer.id} className="hover:bg-muted/50">
                {/* Checkbox */}
                <td className="sticky left-0 bg-white w-12 p-3 text-left border-b border-border z-20">
                  <Checkbox
                    checked={selectedCustomers.includes(customer.id)}
                    onCheckedChange={() => onSelectCustomer(customer.id)}
                  />
                </td>

                {/* Fixed Customer Name with Avatar - Now Editable */}
                <td 
                  className="sticky left-12 bg-white p-3 border-b border-border min-w-[200px] z-20"
                  style={{ left: '48px' }}
                >
                  {editingCell?.row === customer.id && editingCell?.column === 'name' ? (
                    <div className="flex items-center gap-2">
                      <CustomerAvatar name={customer.name} size="md" />
                      <Input
                        ref={inputRef}
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onBlur={handleSaveEdit}
                        className="h-8 text-sm flex-1"
                      />
                    </div>
                  ) : (
                    <div 
                      className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 p-1 rounded min-h-[32px]"
                      onDoubleClick={() => handleCellDoubleClick(customer.id, 'name', customer.name)}
                    >
                      <CustomerAvatar name={customer.name} size="md" />
                      <div className="flex items-center gap-2 flex-1">
                        <span>{customer.name}</span>
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
                    </div>
                  )}
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
                  const value = customer[column.id as keyof Customer] || customer.customFields?.[column.id];
                  const isEditing = editingCell?.row === customer.id && editingCell?.column === column.id;
                  
                  // Handle tags column with TagCell component
                  if (column.id === 'tags') {
                    return (
                      <td key={column.id} className="p-3 border-b border-border">
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
                      className={`p-3 border-b border-border ${
                        isSticky ? 'sticky bg-white z-20' : ''
                      } ${isPinnedLeft ? 'border-r-2 border-primary/20' : ''} ${isPinnedRight ? 'border-l-2 border-primary/20' : ''}`}
                      style={stickyStyle}
                    >
                      {renderEditableCell(customer, column)}
                    </td>
                  );
                })}

                {/* Fixed Right Column - Actions */}
                <td className="sticky right-0 bg-white w-20 p-3 text-center border-b border-border z-40">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        onClick={() => onShowDetails && onShowDetails(customer)}
                        className="flex items-center gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        Xem chi tiết
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem 
                        onClick={() => onCreateReminder && onCreateReminder(customer.id, customer.name)}
                        className="flex items-center gap-2"
                      >
                        <Bell className="h-4 w-4" />
                        Tạo nhắc nhở
                      </DropdownMenuItem>
                      
                      <DropdownMenuSeparator />
                      
                      <DropdownMenuItem 
                        onClick={() => onDeleteCustomer && onDeleteCustomer(customer.id)}
                        className="flex items-center gap-2 text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                        Xóa
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
          column={columns.find(c => c.id === editColumnPopupOpen)!}
          onSave={(updatedColumn) => {
            console.log(`💾 Column "${updatedColumn.name}" updated with options:`, updatedColumn.options);
            if (onColumnsChange) {
              const newColumns = columns.map(c => 
                c.id === updatedColumn.id ? updatedColumn : c
              );
              onColumnsChange(newColumns);
            }
            setEditColumnPopupOpen(null);
            
            // Force refresh filter popup if it's open for this column
            if (filterPopoverOpen === updatedColumn.id) {
              setFilterPopoverOpen(null);
              setTimeout(() => {
                setFilterPopoverOpen(updatedColumn.id);
              }, 100);
            }
          }}
          customers={customers}
        />
      )}

      {/* Column Filter Popup - Rendered outside table with highest z-index */}
      {filterPopoverOpen && (() => {
        const currentColumn = columns.find(c => c.id === filterPopoverOpen);
        const forceRefreshKey = `filter-${filterPopoverOpen}-${Date.now()}-${JSON.stringify(currentColumn?.options || [])}`;
        console.log(`🔄 Rendering ColumnFilterPopup for "${currentColumn?.name}" with options:`, currentColumn?.options);
        
        return (
          <ColumnFilterPopup
            key={forceRefreshKey}
            isOpen={true}
            onClose={() => setFilterPopoverOpen(null)}
            column={currentColumn!}
            currentFilters={columnFilters[filterPopoverOpen] || []}
            onFiltersChange={(filters) => {
              setColumnFilters(prev => ({
                ...prev,
                [filterPopoverOpen]: filters
              }));
            }}
            customers={customers}
          />
        );
      })()}
    </div>
  );
}