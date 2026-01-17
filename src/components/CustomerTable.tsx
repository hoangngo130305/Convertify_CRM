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

export function CustomerTable({ customers, selectedCustomers, onSelectCustomer, onSelectAll, columns, onColumnsChange, onFiltersChange, currentFilters }: CustomerTableProps) {
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

  // Get predefined options for specific columns
  const getPredefinedOptions = (columnId: string) => {
    switch (columnId) {
      case 'status':
        return ['Mới', 'Đang xử lý', 'Thành công', 'Thất bại'];
      case 'source':
        return ['Facebook', 'Google', 'TikTok', 'Zalo', 'Website', 'Giới thiệu'];
      case 'products':
        return ['Website Design', 'SEO Service', 'Digital Marketing', 'E-commerce'];
      case 'assignedSale':
        return ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D', 'Chưa phân bổ'];
      default:
        return [];
    }
  };

  // Check if column has predefined options only
  const hasOnlyPredefinedOptions = (columnId: string) => {
    return ['status'].includes(columnId);
  };

  // Check if column supports filtering
  const isFilterableColumn = (columnId: string) => {
    const filterableColumns = ['products', 'status', 'source', 'assignedSale', 'createdDate'];
    return filterableColumns.includes(columnId);
  };

  // Handle filter changes from ColumnFilterManager
  const handleColumnFiltersChange = (columnId: string, filters: any[]) => {
    const filterValues = filters.map(filter => filter.value);
    setColumnFilters(prev => {
      const newFilters = {
        ...prev,
        [columnId]: filterValues
      };
      // Remove empty arrays
      if (filterValues.length === 0) {
        delete newFilters[columnId];
      }
      return newFilters;
    });
    // Close the filter popover
    setFilterPopoverOpen(null);
  };

  // Add filter to column
  const addFilter = (columnId: string, value: string) => {
    if (!value.trim()) return;
    
    // For status column, only allow predefined status values
    if (columnId === 'status') {
      const allowedStatuses = ['Mới', 'Đang xử lý', 'Thành công', 'Thất bại'];
      if (!allowedStatuses.includes(value.trim())) {
        alert('Chỉ có thể chọn trạng thái từ: Mới, Đang xử lý, Thành công, Thất bại');
        return;
      }
    }
    
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

  // Add custom option to column
  const addCustomOption = (columnId: string, option: string) => {
    if (!option.trim() || hasOnlyPredefinedOptions(columnId)) return;
    
    setCustomOptions(prev => ({
      ...prev,
      [columnId]: [...(prev[columnId] || []), option.trim()]
    }));
    
    // Clear input
    setNewOptionInput(prev => ({
      ...prev,
      [columnId]: ''
    }));
  };

  // Remove custom option from column
  const removeCustomOption = (columnId: string, option: string) => {
    setCustomOptions(prev => ({
      ...prev,
      [columnId]: (prev[columnId] || []).filter(o => o !== option)
    }));
    
    // Also remove from active filters if it exists
    removeFilter(columnId, option);
  };

  // Get base predefined options (excluding custom)
  const getBasePredefinedOptions = (columnId: string) => {
    switch (columnId) {
      case 'status':
        return ['Mới', 'Đang xử lý', 'Thành công', 'Thất bại'];
      case 'source':
        return ['Facebook', 'Google', 'TikTok', 'Zalo', 'Website', 'Giới thiệu'];
      case 'products':
        return ['Website Design', 'SEO Service', 'Digital Marketing', 'E-commerce'];
      case 'assignedSale':
        return ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D', 'Chưa phân bổ'];
      default:
        return [];
    }
  };

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

  // Handle column actions
  const handleColumnAction = (columnId: string, action: string) => {
    if (!onColumnsChange) return;

    const newColumns = [...columns];
    const columnIndex = newColumns.findIndex(col => col.id === columnId);
    
    switch (action) {
      case 'filter':
        // Only open filter popover for filterable columns
        if (isFilterableColumn(columnId)) {
          setFilterPopoverOpen(filterPopoverOpen === columnId ? null : columnId);
        }
        break;
      case 'sort-asc':
        // Logic to sort column in ascending order
        console.log(`Sort column ${columnId} ascending`);
        break;
      case 'sort-desc':
        // Logic to sort column in descending order
        console.log(`Sort column ${columnId} descending`);
        break;
      case 'insert-left':
        // Logic to insert column to the left
        console.log(`Insert column left of ${columnId}`);
        break;
      case 'insert-right':
        // Logic to insert column to the right
        console.log(`Insert column right of ${columnId}`);
        break;
      case 'pin-left':
        // Logic to pin column to the left
        console.log(`Pin column ${columnId} to left`);
        break;
      case 'pin-right':
        // Logic to pin column to the right
        console.log(`Pin column ${columnId} to right`);
        break;
      case 'hide':
        newColumns[columnIndex].visible = false;
        break;
      case 'pin':
        newColumns[columnIndex].pinned = !newColumns[columnIndex].pinned;
        break;
      case 'move-left':
        if (columnIndex > 0) {
          const currentOrder = newColumns[columnIndex].order;
          const prevOrder = newColumns[columnIndex - 1].order;
          newColumns[columnIndex].order = prevOrder;
          newColumns[columnIndex - 1].order = currentOrder;
        }
        break;
      case 'move-right':
        if (columnIndex < newColumns.length - 1) {
          const currentOrder = newColumns[columnIndex].order;
          const nextOrder = newColumns[columnIndex + 1].order;
          newColumns[columnIndex].order = nextOrder;
          newColumns[columnIndex + 1].order = currentOrder;
        }
        break;
    }
    
    onColumnsChange(newColumns);
  };

  // Handle drag and drop
  const handleDragStart = (e: React.DragEvent, columnId: string) => {
    setDraggedColumn(columnId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    setDragOverColumn(columnId);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    if (!draggedColumn || !onColumnsChange || draggedColumn === targetColumnId) return;

    const newColumns = [...columns];
    const draggedIndex = newColumns.findIndex(col => col.id === draggedColumn);
    const targetIndex = newColumns.findIndex(col => col.id === targetColumnId);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      // Swap the order values
      const draggedOrder = newColumns[draggedIndex].order;
      const targetOrder = newColumns[targetIndex].order;
      
      newColumns[draggedIndex].order = targetOrder;
      newColumns[targetIndex].order = draggedOrder;
    }

    setDraggedColumn(null);
    setDragOverColumn(null);
    onColumnsChange(newColumns);
  };

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
                className={`sticky left-12 bg-muted p-3 text-left border-b border-border min-w-[200px] z-20 transition-colors ${\n                  columnHover === 'name' ? 'bg-gray-100' : ''\n                }`}\n                style={{ \n                  left: '48px'\n                }}\n                onMouseEnter={() => setColumnHover('name')}\n                onMouseLeave={() => setColumnHover(null)}\n              >\n                <div className=\"flex items-center justify-between group\">\n                  <span className=\"text-red-600\">Tên khách hàng *</span>\n                  {columnHover === 'name' && (\n                    <div className=\"flex items-center gap-1\">\n                      <GripVertical className=\"h-4 w-4 text-gray-500 hover:text-gray-700\" style={{ cursor: 'grab' }} />\n                      <DropdownMenu>\n                        <DropdownMenuTrigger asChild>\n                          <Button variant=\"ghost\" size=\"sm\" className=\"h-5 w-5 p-0 hover:bg-gray-200\">\n                            <MoreVertical className=\"h-3 w-3\" />\n                          </Button>\n                        </DropdownMenuTrigger>\n                        <DropdownMenuContent align=\"end\">\n                          <DropdownMenuItem>\n                            <Filter className=\"h-4 w-4 mr-2\" />\n                            Lọc\n                          </DropdownMenuItem>\n                          <DropdownMenuItem>\n                            <ArrowUpDown className=\"h-4 w-4 mr-2\" />\n                            Sắp xếp\n                          </DropdownMenuItem>\n                        </DropdownMenuContent>\n                      </DropdownMenu>\n                    </div>\n                  )}\n                </div>\n              </th>\n\n              {/* Scrollable Columns */}\n              {visibleColumns.map(column => (\n                <th \n                  key={column.id} \n                  className={`relative p-3 text-left border-b border-border min-w-[120px] transition-all duration-200 ${\n                    columnHover === column.id ? 'bg-gray-100' : 'bg-muted'\n                  } ${dragOverColumn === column.id ? 'bg-blue-100 border-l-2 border-r-2 border-blue-300' : ''}`}\n                  onMouseEnter={() => setColumnHover(column.id)}\n                  onMouseLeave={() => setColumnHover(null)}\n                  draggable={columnHover === column.id}\n                  onDragStart={(e) => handleDragStart(e, column.id)}\n                  onDragOver={(e) => handleDragOver(e, column.id)}\n                  onDragLeave={handleDragLeave}\n                  onDrop={(e) => handleDrop(e, column.id)}\n                >\n                  <div className=\"flex items-center justify-between group\">\n                    <span className={getColumnColor(column)}>\n                      {column.name}{column.required ? ' *' : ''}\n                    </span>\n                    \n                    {/* Column Actions */}\n                    {columnHover === column.id && (\n                      <div className=\"flex items-center gap-1\">\n                        <GripVertical \n                          className=\"h-4 w-4 text-gray-500 hover:text-gray-700 transition-colors\" \n                          style={{ \n                            cursor: draggedColumn === column.id ? 'grabbing' : 'grab'\n                          }} \n                        /> \n                        \n                        <DropdownMenu>\n                          <DropdownMenuTrigger asChild>\n                            <Button \n                              variant=\"ghost\" \n                              size=\"sm\" \n                              className={`h-5 w-5 p-0 hover:bg-gray-200 transition-colors cursor-pointer ${
                                columnFilters[column.id]?.length ? 'bg-blue-100 text-blue-600' : ''
                              }`}
                              style={{ cursor: 'pointer !important' }}
                            >
                              <MoreVertical className="h-3 w-3 cursor-pointer" style={{ cursor: 'pointer !important' }} />
                              {columnFilters[column.id]?.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                  {columnFilters[column.id].length}
                                </span>
                              )}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            {/* Only show Filter option for filterable columns */}
                            {isFilterableColumn(column.id) && (
                              <DropdownMenuItem onClick={() => handleColumnAction(column.id, 'filter')}>
                                <Filter className="h-4 w-4 mr-2" />
                                Lọc
                              </DropdownMenuItem>
                            )}
                            
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>
                                <ArrowUpDown className="h-4 w-4 mr-2" />
                                Sắp xếp
                              </DropdownMenuSubTrigger>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem onClick={() => handleColumnAction(column.id, 'sort-asc')}>
                                  <ArrowLeft className="h-4 w-4 mr-2" />
                                  Tăng dần
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleColumnAction(column.id, 'sort-desc')}>
                                  <ArrowRight className="h-4 w-4 mr-2" />
                                  Giảm dần
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            
                            {/* Show separator only if Filter option was shown */}
                            {isFilterableColumn(column.id) && <DropdownMenuSeparator />}
                            
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>
                                <Plus className="h-4 w-4 mr-2" />
                                Chèn cột
                              </DropdownMenuSubTrigger>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem onClick={() => handleColumnAction(column.id, 'insert-left')}>
                                  <ArrowLeft className="h-4 w-4 mr-2" />
                                  Chèn trái
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleColumnAction(column.id, 'insert-right')}>
                                  <ArrowRight className="h-4 w-4 mr-2" />
                                  Chèn phải
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>
                                <Pin className="h-4 w-4 mr-2" />
                                Cố định cột
                              </DropdownMenuSubTrigger>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem onClick={() => handleColumnAction(column.id, 'pin-left')}>
                                  <ArrowLeft className="h-4 w-4 mr-2" />
                                  Cố định trái
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleColumnAction(column.id, 'pin-right')}>
                                  <ArrowRight className="h-4 w-4 mr-2" />
                                  Cố định phải
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            
                            <DropdownMenuSeparator />
                            
                            <DropdownMenuItem 
                              onClick={() => handleColumnAction(column.id, 'hide')}
                              className="text-red-600"
                            >
                              <EyeOff className="h-4 w-4 mr-2" />
                              Ẩn cột
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                  
                  {/* Filter Popover - Only show for filterable columns */}
                  {filterPopoverOpen === column.id && isFilterableColumn(column.id) && (
                    <div className="absolute top-full left-0 z-50 mt-1">
                      <div className="w-80 bg-popover border border-border rounded-md shadow-lg p-4">
                        <ColumnFilterManager
                          columnId={column.id}
                          columnName={column.name}
                          appliedFilters={columnFilters[column.id]?.map(value => ({ id: `${column.id}_${value}`, value })) || []}
                          onFiltersApply={(filters) => handleColumnFiltersChange(column.id, filters)}
                          predefinedOptions={getPredefinedOptions(column.id)}
                          hasOnlyPredefinedOptions={hasOnlyPredefinedOptions(column.id)}
                          placeholder="Nhập giá trị lọc..."
                        />
                        <div className="mt-3 flex justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setFilterPopoverOpen(null)}
                            className="h-6 w-6 p-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </th>
              ))}

              {/* Fixed Right Column - Actions */}
              <th className="sticky right-0 bg-muted p-3 text-center border-b border-border w-16 z-20">
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-muted/30 group">
                {/* Checkbox */}
                <td className="sticky left-0 bg-background group-hover:bg-muted/30 p-3 border-b border-border border-r-0 z-10">
                  <Checkbox
                    checked={selectedCustomers.includes(customer.id)}
                    onCheckedChange={() => onSelectCustomer(customer.id)}
                  />
                </td>

                {/* Fixed Left - Customer Name */}
                <td className="sticky left-12 bg-background group-hover:bg-muted/30 p-3 border-b border-border border-l-0 z-10" style={{ left: '48px' }}>
                  {editingCell?.row === customer.id && editingCell?.column === 'name' ? (
                    <Input
                      defaultValue={customer.name}
                      onBlur={handleCellBlur}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleCellBlur();
                        if (e.key === 'Escape') handleCellBlur();
                      }}
                      autoFocus
                      className="h-8"
                    />
                  ) : (
                    <div
                      onDoubleClick={() => handleCellDoubleClick(customer.id, 'name')}
                      className="cursor-pointer hover:bg-muted/50 p-1 rounded"
                    >
                      {customer.name}
                    </div>
                  )}
                </td>

                {/* Scrollable Columns */}
                {visibleColumns.map(column => (
                  <td key={column.id} className="bg-background p-3 border-b border-border">
                    {renderCellContent(customer, column)}
                  </td>
                ))}

                {/* Fixed Right - Actions */}
                <td className="sticky right-0 bg-background group-hover:bg-muted/30 p-3 border-b border-border text-center z-10">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" style={{ cursor: 'pointer !important' }}>
                        <MoreVertical className="h-4 w-4" style={{ cursor: 'pointer !important' }} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Phone className="h-4 w-4 mr-2" />
                        Gọi điện
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="h-4 w-4 mr-2" />
                        Gửi email
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        Xem chi tiết
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Bell className="h-4 w-4 mr-2" />
                        Tạo nhắc nhở
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-orange-600">
                        Chuyển Lead hub
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Chuyển data xấu
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

export function CustomerTableHeader({ columns, onColumnsChange }: { columns: Column[], onColumnsChange?: (columns: Column[]) => void }) {
  const [columnHover, setColumnHover] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [columnFilters, setColumnFilters] = useState<Record<string, string[]>>({});
  const [filterPopoverOpen, setFilterPopoverOpen] = useState<string | null>(null);
  const [customOptions, setCustomOptions] = useState<Record<string, string[]>>({});
  const [newOptionInput, setNewOptionInput] = useState<Record<string, string>>({});

  // Check if column supports filtering
  const isFilterableColumn = (columnId: string) => {
    const filterableColumns = ['products', 'status', 'source', 'assignedSale', 'createdDate'];
    return filterableColumns.includes(columnId);
  };

  // Check if column has predefined options only
  const hasOnlyPredefinedOptions = (columnId: string) => {
    return ['status'].includes(columnId);
  };

  // Get unique values for a column for filtering
  const getUniqueColumnValues = (columnId: string) => {
    // Mock function for header component - would need customers data to implement properly
    return [];
  };

  // Get predefined options for specific columns
  const getPredefinedOptions = (columnId: string) => {
    const baseOptions = (() => {
      switch (columnId) {
        case 'status':
          return ['Mới', 'Đang xử lý', 'Thành công', 'Thất bại'];
        case 'source':
          return ['Facebook', 'Google', 'TikTok', 'Zalo', 'Website', 'Giới thiệu'];
        case 'products':
          return ['Website Design', 'SEO Service', 'Digital Marketing', 'E-commerce'];
        case 'assignedSale':
          return ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D', 'Chưa phân bổ'];
        default:
          return [];
      }
    })();
    
    // Combine base options with custom options
    return [...baseOptions, ...(customOptions[columnId] || [])];
  };

  // Get base predefined options (excluding custom)
  const getBasePredefinedOptions = (columnId: string) => {
    switch (columnId) {
      case 'status':
        return ['Mới', 'Đang xử lý', 'Thành công', 'Thất bại'];
      case 'source':
        return ['Facebook', 'Google', 'TikTok', 'Zalo', 'Website', 'Giới thiệu'];
      case 'products':
        return ['Website Design', 'SEO Service', 'Digital Marketing', 'E-commerce'];
      case 'assignedSale':
        return ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D', 'Chưa phân bổ'];
      default:
        return [];
    }
  };

  // Add filter to column
  const addFilter = (columnId: string, value: string) => {
    if (!value.trim()) return;
    
    // For status column, only allow predefined status values
    if (columnId === 'status') {
      const allowedStatuses = ['Mới', 'Đang xử lý', 'Thành công', 'Thất bại'];
      if (!allowedStatuses.includes(value.trim())) {
        alert('Chỉ có thể chọn trạng thái từ: Mới, Đang xử lý, Thành công, Thất bại');
        return;
      }
    }
    
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

  // Add custom option to column
  const addCustomOption = (columnId: string, option: string) => {
    if (!option.trim() || hasOnlyPredefinedOptions(columnId)) return;
    
    setCustomOptions(prev => ({
      ...prev,
      [columnId]: [...(prev[columnId] || []), option.trim()]
    }));
    
    // Clear input
    setNewOptionInput(prev => ({
      ...prev,
      [columnId]: ''
    }));
  };

  // Remove custom option from column
  const removeCustomOption = (columnId: string, option: string) => {
    setCustomOptions(prev => ({
      ...prev,
      [columnId]: (prev[columnId] || []).filter(o => o !== option)
    }));
    
    // Also remove from active filters if it exists
    removeFilter(columnId, option);
  };

  const handleColumnClick = (columnId: string) => {
    const newColumns = columns.map(column => {
      if (column.id === columnId) {
        return {
          ...column,
          pinned: !column.pinned
        };
      }
      return column;
    });
    if (onColumnsChange) {
      onColumnsChange(newColumns);
    }
  };

  // Handle column actions
  const handleColumnAction = (columnId: string, action: string) => {
    if (!onColumnsChange) return;

    const newColumns = [...columns];
    const columnIndex = newColumns.findIndex(col => col.id === columnId);
    
    switch (action) {
      case 'filter':
        // Only open filter popover for filterable columns
        if (isFilterableColumn(columnId)) {
          setFilterPopoverOpen(filterPopoverOpen === columnId ? null : columnId);
        }
        break;
      case 'sort-asc':
        // Logic to sort column in ascending order
        console.log(`Sort column ${columnId} ascending`);
        break;
      case 'sort-desc':
        // Logic to sort column in descending order
        console.log(`Sort column ${columnId} descending`);
        break;
      case 'insert-left':
        // Logic to insert column to the left
        console.log(`Insert column left of ${columnId}`);
        break;
      case 'insert-right':
        // Logic to insert column to the right
        console.log(`Insert column right of ${columnId}`);
        break;
      case 'pin-left':
        // Logic to pin column to the left
        console.log(`Pin column ${columnId} to left`);
        break;
      case 'pin-right':
        // Logic to pin column to the right
        console.log(`Pin column ${columnId} to right`);
        break;
      case 'hide':
        newColumns[columnIndex].visible = false;
        break;
      case 'pin':
        newColumns[columnIndex].pinned = !newColumns[columnIndex].pinned;
        break;
      case 'move-left':
        if (columnIndex > 0) {
          const currentOrder = newColumns[columnIndex].order;
          const prevOrder = newColumns[columnIndex - 1].order;
          newColumns[columnIndex].order = prevOrder;
          newColumns[columnIndex - 1].order = currentOrder;
        }
        break;
      case 'move-right':
        if (columnIndex < newColumns.length - 1) {
          const currentOrder = newColumns[columnIndex].order;
          const nextOrder = newColumns[columnIndex + 1].order;
          newColumns[columnIndex].order = nextOrder;
          newColumns[columnIndex + 1].order = currentOrder;
        }
        break;
    }
    
    onColumnsChange(newColumns);
  };

  // Handle drag and drop
  const handleDragStart = (e: React.DragEvent, columnId: string) => {
    setDraggedColumn(columnId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    setDragOverColumn(columnId);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    if (!draggedColumn || !onColumnsChange || draggedColumn === targetColumnId) return;

    const newColumns = [...columns];
    const draggedIndex = newColumns.findIndex(col => col.id === draggedColumn);
    const targetIndex = newColumns.findIndex(col => col.id === targetColumnId);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      // Swap the order values
      const draggedOrder = newColumns[draggedIndex].order;
      const targetOrder = newColumns[targetIndex].order;
      
      newColumns[draggedIndex].order = targetOrder;
      newColumns[targetIndex].order = draggedOrder;
    }

    setDraggedColumn(null);
    setDragOverColumn(null);
    onColumnsChange(newColumns);
  };

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
                  checked={true}
                  onCheckedChange={onSelectAll}
                />
              </th>

              {/* Fixed Left Column - Customer Name */}
              <th 
                className={`sticky left-12 bg-muted p-3 text-left border-b border-border min-w-[200px] z-20 transition-colors ${\n                  columnHover === 'name' ? 'bg-gray-100' : ''\n                }`}\n                style={{ \n                  left: '48px'\n                }}\n                onMouseEnter={() => setColumnHover('name')}\n                onMouseLeave={() => setColumnHover(null)}\n              >\n                <div className=\"flex items-center justify-between group\">\n                  <span className=\"text-red-600\">Tên khách hàng *</span>\n                  {columnHover === 'name' && (\n                    <div className=\"flex items-center gap-1\">\n                      <GripVertical className=\"h-4 w-4 text-gray-500 hover:text-gray-700\" style={{ cursor: 'grab' }} />\n                      <DropdownMenu>\n                        <DropdownMenuTrigger asChild>\n                          <Button variant=\"ghost\" size=\"sm\" className=\"h-5 w-5 p-0 hover:bg-gray-200\">\n                            <MoreVertical className=\"h-3 w-3\" />\n                          </Button>\n                        </DropdownMenuTrigger>\n                        <DropdownMenuContent align=\"end\">\n                          <DropdownMenuItem>\n                            <Filter className=\"h-4 w-4 mr-2\" />\n                            Lọc\n                          </DropdownMenuItem>\n                          <DropdownMenuItem>\n                            <ArrowUpDown className=\"h-4 w-4 mr-2\" />\n                            Sắp xếp\n                          </DropdownMenuItem>\n                        </DropdownMenuContent>\n                      </DropdownMenu>\n                    </div>\n                  )}\n                </div>\n              </th>\n\n              {/* Scrollable Columns */}\n              {columns.map(column => (\n                <th \n                  key={column.id} \n                  className={`relative p-3 text-left border-b border-border min-w-[120px] transition-all duration-200 ${\n                    columnHover === column.id ? 'bg-gray-100' : 'bg-muted'\n                  } ${dragOverColumn === column.id ? 'bg-blue-100 border-l-2 border-r-2 border-blue-300' : ''}`}\n                  onMouseEnter={() => setColumnHover(column.id)}\n                  onMouseLeave={() => setColumnHover(null)}\n                  draggable={columnHover === column.id}\n                  onDragStart={(e) => handleDragStart(e, column.id)}\n                  onDragOver={(e) => handleDragOver(e, column.id)}\n                  onDragLeave={handleDragLeave}\n                  onDrop={(e) => handleDrop(e, column.id)}\n                >\n                  <div className=\"flex items-center justify-between group\">\n                    <span className={getColumnColor(column)}>\n                      {column.name}{column.required ? ' *' : ''}\n                    </span>\n                    \n                    {/* Column Actions */}\n                    {columnHover === column.id && (\n                      <div className=\"flex items-center gap-1\">\n                        <GripVertical \n                          className=\"h-4 w-4 text-gray-500 hover:text-gray-700 transition-colors\" \n                          style={{ \n                            cursor: draggedColumn === column.id ? 'grabbing' : 'grab'\n                          }} \n                        /> \n                        \n                        <DropdownMenu>\n                          <DropdownMenuTrigger asChild>\n                            <Button \n                              variant=\"ghost\" \n                              size=\"sm\" \n                              className={`h-5 w-5 p-0 hover:bg-gray-200 transition-colors cursor-pointer ${
                                columnFilters[column.id]?.length ? 'bg-blue-100 text-blue-600' : ''
                              }`}
                              style={{ cursor: 'pointer !important' }}
                            >
                              <MoreVertical className="h-3 w-3 cursor-pointer" style={{ cursor: 'pointer !important' }} />
                              {columnFilters[column.id]?.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                  {columnFilters[column.id].length}
                                </span>
                              )}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            {/* Only show Filter option for filterable columns */}
                            {isFilterableColumn(column.id) && (
                              <DropdownMenuItem onClick={() => handleColumnAction(column.id, 'filter')}>
                                <Filter className="h-4 w-4 mr-2" />
                                Lọc
                              </DropdownMenuItem>
                            )}
                            
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>
                                <ArrowUpDown className="h-4 w-4 mr-2" />
                                Sắp xếp
                              </DropdownMenuSubTrigger>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem onClick={() => handleColumnAction(column.id, 'sort-asc')}>
                                  <ArrowLeft className="h-4 w-4 mr-2" />
                                  Tăng dần
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleColumnAction(column.id, 'sort-desc')}>
                                  <ArrowRight className="h-4 w-4 mr-2" />
                                  Giảm dần
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            
                            {/* Show separator only if Filter option was shown */}
                            {isFilterableColumn(column.id) && <DropdownMenuSeparator />}
                            
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>
                                <Plus className="h-4 w-4 mr-2" />
                                Chèn cột
                              </DropdownMenuSubTrigger>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem onClick={() => handleColumnAction(column.id, 'insert-left')}>
                                  <ArrowLeft className="h-4 w-4 mr-2" />
                                  Chèn trái
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleColumnAction(column.id, 'insert-right')}>
                                  <ArrowRight className="h-4 w-4 mr-2" />
                                  Chèn phải
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>
                                <Pin className="h-4 w-4 mr-2" />
                                Cố định cột
                              </DropdownMenuSubTrigger>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem onClick={() => handleColumnAction(column.id, 'pin-left')}>
                                  <ArrowLeft className="h-4 w-4 mr-2" />
                                  Cố định trái
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleColumnAction(column.id, 'pin-right')}>
                                  <ArrowRight className="h-4 w-4 mr-2" />
                                  Cố định phải
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            
                            <DropdownMenuSeparator />
                            
                            <DropdownMenuItem 
                              onClick={() => handleColumnAction(column.id, 'hide')}
                              className="text-red-600"
                            >
                              <EyeOff className="h-4 w-4 mr-2" />
                              Ẩn cột
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                  
                  {/* Filter Popover - Only show for filterable columns */}
                  {filterPopoverOpen === column.id && isFilterableColumn(column.id) && (
                    <div className="absolute top-full left-0 z-50 mt-1">
                      <div className="w-80 bg-popover border border-border rounded-md shadow-lg p-4">
                        <ColumnFilterManager
                          columnId={column.id}
                          columnName={column.name}
                          appliedFilters={columnFilters[column.id]?.map(value => ({ id: `${column.id}_${value}`, value })) || []}
                          onFiltersApply={(filters) => handleColumnFiltersChange(column.id, filters)}
                          predefinedOptions={getPredefinedOptions(column.id)}
                          hasOnlyPredefinedOptions={hasOnlyPredefinedOptions(column.id)}
                          placeholder="Nhập giá trị lọc..."
                        />
                        <div className="mt-3 flex justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setFilterPopoverOpen(null)}
                            className="h-6 w-6 p-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </th>
              ))}

              {/* Fixed Right Column - Actions */}
              <th className="sticky right-0 bg-muted p-3 text-center border-b border-border w-16 z-20">
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-muted/30 group">
                {/* Checkbox */}
                <td className="sticky left-0 bg-background group-hover:bg-muted/30 p-3 border-b border-border border-r-0 z-10">
                  <Checkbox
                    checked={selectedCustomers.includes(customer.id)}
                    onCheckedChange={() => onSelectCustomer(customer.id)}
                  />
                </td>

                {/* Fixed Left - Customer Name */}
                <td className="sticky left-12 bg-background group-hover:bg-muted/30 p-3 border-b border-border border-l-0 z-10" style={{ left: '48px' }}>
                  {editingCell?.row === customer.id && editingCell?.column === 'name' ? (
                    <Input
                      defaultValue={customer.name}
                      onBlur={handleCellBlur}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleCellBlur();
                        if (e.key === 'Escape') handleCellBlur();
                      }}
                      autoFocus
                      className="h-8"
                    />
                  ) : (
                    <div
                      onDoubleClick={() => handleCellDoubleClick(customer.id, 'name')}
                      className="cursor-pointer hover:bg-muted/50 p-1 rounded"
                    >
                      {customer.name}
                    </div>
                  )}
                </td>

                {/* Scrollable Columns */}
                {visibleColumns.map(column => (
                  <td key={column.id} className="bg-background p-3 border-b border-border">
                    {renderCellContent(customer, column)}
                  </td>
                ))}

                {/* Fixed Right - Actions */}
                <td className="sticky right-0 bg-background group-hover:bg-muted/30 p-3 border-b border-border text-center z-10">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" style={{ cursor: 'pointer !important' }}>
                        <MoreVertical className="h-4 w-4" style={{ cursor: 'pointer !important' }} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Phone className="h-4 w-4 mr-2" />
                        Gọi điện
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="h-4 w-4 mr-2" />
                        Gửi email
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        Xem chi tiết
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Bell className="h-4 w-4 mr-2" />
                        Tạo nhắc nhở
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-orange-600">
                        Chuyển Lead hub
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Chuyển data xấu
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