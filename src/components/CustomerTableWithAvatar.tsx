import { useState, useEffect } from 'react';
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
  EyeOff,
  X
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import { Input } from './ui/input';
import { ColumnFilterManager } from './ColumnFilterManager';

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
  pinned?: boolean;
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
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Mới': return 'bg-blue-100 text-blue-800';
    case 'Đang xử lý': return 'bg-yellow-100 text-yellow-800';
    case 'Thành công': return 'bg-green-100 text-green-800';
    case 'Thất bại': return 'bg-red-100 text-red-800';
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
  return date.toLocaleDateString('vi-VN');
};

export function CustomerTableWithAvatar({ customers, selectedCustomers, onSelectCustomer, onSelectAll, columns, onColumnsChange, onFiltersChange, currentFilters }: CustomerTableProps) {
  const [editingCell, setEditingCell] = useState<{ row: string; column: string } | null>(null);
  const [columnHover, setColumnHover] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [columnFilters, setColumnFilters] = useState<Record<string, string[]>>(currentFilters || {});
  const [filterPopoverOpen, setFilterPopoverOpen] = useState<string | null>(null);

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

  const handleCellDoubleClick = (customerId: string, column: string) => {
    setEditingCell({ row: customerId, column });
  };

  const handleCellBlur = () => {
    setEditingCell(null);
  };

  const isAllSelected = selectedCustomers.length === customers.length && customers.length > 0;

  // Get visible columns excluding name (which is fixed) and sort them properly
  const visibleColumns = columns
    .filter(column => column.visible && column.id !== 'name')
    .sort((a, b) => a.order - b.order);

  // Apply filters to customers
  const filteredCustomers = customers.filter(customer => {
    return Object.entries(columnFilters).every(([columnId, filters]) => {
      if (!filters || filters.length === 0) return true;
      
      const value = customer[columnId as keyof Customer] || customer.customFields?.[columnId];
      const stringValue = Array.isArray(value) ? value.join(' ') : String(value || '');
      
      // Define columns that need exact matching vs substring matching
      const exactMatchColumns = ['assignedSale', 'status', 'source', 'products'];
      const isExactMatch = exactMatchColumns.includes(columnId);
      
      return filters.some(filter => {
        if (isExactMatch) {
          // For exact match columns, check if the value exactly matches the filter
          if (Array.isArray(value)) {
            // For array values (like products), check if any element matches exactly
            return value.some(item => String(item).toLowerCase() === filter.toLowerCase());
          } else {
            // For single values, exact match
            return stringValue.toLowerCase() === filter.toLowerCase();
          }
        } else {
          // For text fields, use substring matching
          return stringValue.toLowerCase().includes(filter.toLowerCase());
        }
      });
    });
  });

  const renderCellContent = (customer: Customer, column: Column) => {
    const value = customer[column.id as keyof Customer] || customer.customFields?.[column.id];
    
    switch (column.id) {
      case 'phone':
        return (
          <div
            onDoubleClick={() => handleCellDoubleClick(customer.id, column.id)}
            className="cursor-pointer hover:bg-muted/50 p-1 rounded"
          >
            {value}
          </div>
        );
      
      case 'email':
        return (
          <div
            onDoubleClick={() => handleCellDoubleClick(customer.id, column.id)}
            className="cursor-pointer hover:bg-muted/50 p-1 rounded text-sm"
          >
            {value}
          </div>
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
      
      case 'notes':
        return (
          <div
            onDoubleClick={() => handleCellDoubleClick(customer.id, column.id)}
            className="cursor-pointer hover:bg-muted/50 p-1 rounded text-sm truncate max-w-[150px]"
            title={value}
          >
            {value}
          </div>
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
      
      case 'questions':
        return (
          <div
            onDoubleClick={() => handleCellDoubleClick(customer.id, column.id)}
            className="cursor-pointer hover:bg-muted/50 p-1 rounded text-sm truncate max-w-[150px]"
            title={value}
          >
            {value}
          </div>
        );
      
      case 'address':
        return (
          <div
            onDoubleClick={() => handleCellDoubleClick(customer.id, column.id)}
            className="cursor-pointer hover:bg-muted/50 p-1 rounded text-sm truncate max-w-[150px]"
            title={value}
          >
            {value}
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
        // Handle custom fields
        if (column.type === 'custom') {
          switch (column.fieldType) {
            case 'number':
              return (
                <span className="text-sm font-medium">
                  {typeof value === 'number' ? formatCurrency(value) : value || '-'}
                </span>
              );
            case 'date':
              return (
                <span className="text-sm">
                  {value instanceof Date ? formatDate(value) : value || '-'}
                </span>
              );
            case 'select':
              return value ? (
                <Badge className="bg-gray-100 text-gray-800 text-xs">
                  {value}
                </Badge>
              ) : '-';
            case 'multiselect':
              return Array.isArray(value) ? (
                <div className="flex flex-wrap gap-1">
                  {value.map((item, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                </div>
              ) : '-';
            default:
              return (
                <div
                  onDoubleClick={() => handleCellDoubleClick(customer.id, column.id)}
                  className="cursor-pointer hover:bg-muted/50 p-1 rounded text-sm"
                >
                  {value || '-'}
                </div>
              );
          }
        }
        return value || '-';
    }
  };

  const getColumnColor = (column: Column) => {
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
              {visibleColumns.map(column => (
                <th 
                  key={column.id} 
                  className="p-3 text-left border-b border-border min-w-[120px]"
                >
                  <div className="flex items-center justify-between">
                    <span className={getColumnColor(column)}>
                      {column.name}{column.required ? ' *' : ''}
                    </span>
                  </div>
                </th>
              ))}

              {/* Fixed Action Column */}
              <th className="sticky right-0 bg-muted w-20 p-3 text-center border-b border-border z-20">
                Hành động
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map(customer => (
              <tr key={customer.id} className="hover:bg-muted/50">
                {/* Checkbox */}
                <td className="sticky left-0 bg-white w-12 p-3 text-left border-b border-border z-10">
                  <Checkbox
                    checked={selectedCustomers.includes(customer.id)}
                    onCheckedChange={() => onSelectCustomer(customer.id)}
                  />
                </td>

                {/* Fixed Customer Name with Avatar */}
                <td 
                  className="sticky left-12 bg-white p-3 border-b border-border min-w-[200px] z-10"
                  style={{ left: '48px' }}
                >
                  <div className="flex items-center gap-2">
                    <CustomerAvatar name={customer.name} size="md" />
                    <span>{customer.name}</span>
                  </div>
                </td>

                {/* Scrollable Columns */}
                {visibleColumns.map(column => (
                  <td key={column.id} className="p-3 border-b border-border">
                    {renderCellContent(customer, column)}
                  </td>
                ))}

                {/* Fixed Action Column */}
                <td className="sticky right-0 bg-white w-20 p-3 text-center border-b border-border z-10">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        Xem chi tiết
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Phone className="h-4 w-4 mr-2" />
                        Gọi điện
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="h-4 w-4 mr-2" />
                        Gửi email
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Bell className="h-4 w-4 mr-2" />
                        Tạo nhắc nhở
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
  );
}