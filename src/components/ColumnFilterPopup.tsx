import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { X, Filter } from 'lucide-react';

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
  quality: string; // Changed from number to string
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

interface ColumnFilterPopupProps {
  isOpen: boolean;
  onClose: () => void;
  column: Column;
  currentFilters: string[];
  onFiltersChange: (filters: string[]) => void;
  customers: Customer[];
}

export function ColumnFilterPopup({ 
  isOpen, 
  onClose, 
  column,
  currentFilters,
  onFiltersChange,
  customers 
}: ColumnFilterPopupProps) {
  const [filters, setFilters] = useState<string[]>(currentFilters || []);
  const [availableValues, setAvailableValues] = useState<string[]>([]);

  useEffect(() => {
    setFilters(currentFilters || []);
  }, [currentFilters, isOpen]);

  // Extract unique values from customers for this column
  const getUniqueValues = () => {
    const values = new Set<string>();
    
    // First, add any custom options from column configuration
    if (column.options && column.options.length > 0) {
      column.options.forEach(option => values.add(option));
    }
    
    // Special handling for actions column - use default values if no custom options
    if (column.id === 'actions' && (!column.options || column.options.length === 0)) {
      return ['Xem chi tiết', 'Chỉnh sửa', 'Tạo nhắc nhở', 'Xóa'];
    }
    
    // If column has custom options, prioritize those but also include values from data
    customers.forEach(customer => {
      let value = customer[column.id as keyof Customer];
      
      if (value != null) {
        if (Array.isArray(value)) {
          // For array fields like products, tags
          value.forEach(item => {
            if (typeof item === 'object' && item.name) {
              values.add(item.name); // For tags
            } else {
              values.add(String(item));
            }
          });
        } else if (value instanceof Date) {
          values.add(value.toLocaleDateString('vi-VN'));
        } else {
          values.add(String(value));
        }
      }
    });
    
    return Array.from(values).sort();
  };

  // Update available values when column options change
  useEffect(() => {
    if (isOpen) {
      const values = getUniqueValues();
      console.log(`🔍 Filter values for column "${column.name}":`, values);
      console.log(`📝 Column options:`, column.options);
      setAvailableValues(values);
    }
  }, [isOpen, column.options, customers]);

  if (!isOpen) return null;

  // Use availableValues instead of calling getUniqueValues directly
  const uniqueValues = availableValues;

  const handleRemoveFilter = (filterToRemove: string) => {
    const newFilters = filters.filter(f => f !== filterToRemove);
    setFilters(newFilters);
  };

  const handleSelectValue = (value: string, checked: boolean) => {
    if (checked) {
      // Add to filters if checked
      if (!filters.includes(value)) {
        const newFilters = [...filters, value];
        setFilters(newFilters);
      }
    } else {
      // Remove from filters if unchecked
      const newFilters = filters.filter(f => f !== value);
      setFilters(newFilters);
    }
  };

  const handleApply = () => {
    onFiltersChange(filters);
    onClose();
  };

  const handleClearAll = () => {
    setFilters([]);
  };

  const handleSelectAll = () => {
    setFilters([...uniqueValues]);
  };

  return (
    <>
      {/* Backdrop with very high z-index */}
      <div 
        className="fixed inset-0 bg-black/20 z-[9999]" 
        onClick={onClose}
      />
      
      {/* Popup with highest z-index */}
      <div className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none">
        <div 
          className="bg-background border border-border rounded-lg shadow-xl w-[500px] max-h-[85vh] overflow-hidden flex flex-col pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0 bg-background">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-primary" />
              <h3 className="font-medium">Lọc "{column.name}"</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-muted/80"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
            {/* Current Filters */}
            {filters.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Bộ lọc đã chọn ({filters.length}):</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearAll}
                    className="text-xs h-6 px-2"
                  >
                    Xóa tất cả
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {filters.map((filter, index) => (
                    <Badge 
                      key={`filter-${filter}-${index}`} 
                      variant="secondary" 
                      className="cursor-pointer hover:bg-destructive/10 transition-colors"
                      onClick={() => handleRemoveFilter(filter)}
                    >
                      {String(filter)}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Available Values */}
            {uniqueValues.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">
                    Giá trị có sẵn ({uniqueValues.length}):
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSelectAll}
                    className="text-xs h-6 px-2"
                  >
                    Chọn tất cả
                  </Button>
                </div>
                

                
                <div className="max-h-[300px] overflow-y-auto border border-border rounded p-3 bg-muted/5">
                  <div className="space-y-2">
                    {uniqueValues.map((value, index) => (
                      <div key={`${value}-${index}`} className="flex items-center space-x-2 hover:bg-muted/50 p-1 rounded">
                        <Checkbox
                          id={`checkbox-${value}-${index}`}
                          checked={filters.includes(value)}
                          onCheckedChange={(checked) => handleSelectValue(value, !!checked)}
                          className="flex-shrink-0"
                        />
                        <label 
                          htmlFor={`checkbox-${value}-${index}`}
                          className="text-sm cursor-pointer flex-1 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {String(value)}
                        </label>
                      </div>
                    ))}
                    {uniqueValues.length === 0 && (
                      <div className="text-sm text-muted-foreground text-center py-4">
                        Không có giá trị nào
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {uniqueValues.length === 0 && (
              <div className="text-sm text-muted-foreground text-center py-8">
                Không có dữ liệu để lọc cho cột này
              </div>
            )}
          </div>

          {/* Footer - Fixed */}
          <div className="flex items-center justify-between p-4 border-t border-border bg-muted/20 flex-shrink-0">
            <div className="text-sm text-muted-foreground">
              {filters.length > 0 ? `${filters.length} bộ lọc được chọn` : 'Chưa có bộ lọc nào'}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Hủy
              </Button>
              <Button 
                onClick={handleApply}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Áp dụng ({filters.length})
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}