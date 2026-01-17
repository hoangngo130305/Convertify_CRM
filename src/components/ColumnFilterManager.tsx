import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Plus, X, Check } from 'lucide-react';

interface ColumnFilter {
  id: string;
  value: string;
  label?: string;
}

interface ColumnFilterManagerProps {
  columnId: string;
  columnName: string;
  appliedFilters: ColumnFilter[]; // Filters actually applied to table
  onFiltersApply: (filters: ColumnFilter[]) => void; // Callback when applying filters
  predefinedOptions?: string[];
  hasOnlyPredefinedOptions?: boolean;
  placeholder?: string;
}

export function ColumnFilterManager({
  columnId,
  columnName,
  appliedFilters = [],
  onFiltersApply,
  predefinedOptions = [],
  hasOnlyPredefinedOptions = false,
  placeholder = "Nhập giá trị lọc..."
}: ColumnFilterManagerProps) {
  const [inputValue, setInputValue] = useState('');
  const [pendingFilters, setPendingFilters] = useState<ColumnFilter[]>(appliedFilters); // Filters selected but not yet applied

  // Add new filter to pending list (not applied yet)
  const addToPending = (value: string) => {
    if (!value.trim()) return;
    
    // For status column, only allow predefined status values
    if (columnId === 'status' && hasOnlyPredefinedOptions) {
      const allowedStatuses = ['Mới', 'Đang xử lý', 'Thành công', 'Thất bại'];
      if (!allowedStatuses.includes(value.trim())) {
        alert('Chỉ có thể chọn trạng thái từ: Mới, Đang xử lý, Thành công, Thất bại');
        return;
      }
    }

    // Check if filter already exists in pending
    const exists = pendingFilters.some(filter => filter.value.toLowerCase() === value.trim().toLowerCase());
    if (exists) {
      alert('Bộ lọc này đã tồn tại trong danh sách!');
      return;
    }

    // Add new filter to pending list
    const newFilter: ColumnFilter = {
      id: `${columnId}_${Date.now()}`,
      value: value.trim(),
      label: value.trim()
    };

    setPendingFilters([...pendingFilters, newFilter]);
    setInputValue('');
  };

  // Remove filter from pending list
  const removeFromPending = (filterId: string) => {
    setPendingFilters(pendingFilters.filter(filter => filter.id !== filterId));
  };

  // Clear all pending filters
  const clearAllPending = () => {
    setPendingFilters([]);
  };

  // Apply pending filters to table
  const applyFilters = () => {
    onFiltersApply(pendingFilters);
    alert(`Đã áp dụng ${pendingFilters.length} bộ lọc cho cột "${columnName}"`);
  };

  // Cancel and restore to applied filters
  const cancelChanges = () => {
    setPendingFilters(appliedFilters);
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addToPending(inputValue);
    }
  };

  // Handle predefined option click
  const handlePredefinedOptionClick = (option: string) => {
    const exists = pendingFilters.some(filter => 
      filter.value.toLowerCase() === option.toLowerCase()
    );
    
    if (exists) {
      // If already selected, remove it from pending
      const filterToRemove = pendingFilters.find(filter => 
        filter.value.toLowerCase() === option.toLowerCase()
      );
      if (filterToRemove) {
        removeFromPending(filterToRemove.id);
      }
    } else {
      // If not selected, add it to pending
      addToPending(option);
    }
  };

  // Check if there are changes between applied and pending
  const hasChanges = () => {
    if (appliedFilters.length !== pendingFilters.length) return true;
    
    const appliedValues = appliedFilters.map(f => f.value).sort();
    const pendingValues = pendingFilters.map(f => f.value).sort();
    
    return JSON.stringify(appliedValues) !== JSON.stringify(pendingValues);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Lọc {columnName}</h4>
        {pendingFilters.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllPending}
            className="text-red-600 hover:text-red-700"
          >
            Xóa tất cả
          </Button>
        )}
      </div>

      {/* Add Filter Input - Only show for columns that allow custom values */}
      {!hasOnlyPredefinedOptions && (
        <div className="flex items-center gap-2">
          <Input
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => addToPending(inputValue)}
            disabled={!inputValue.trim()}
            className="px-3"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Pending Filters (not yet applied) */}
      {pendingFilters.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">Bộ lọc đã chọn:</p>
          <div className="flex flex-wrap gap-2">
            {pendingFilters.map((filter) => (
              <Badge
                key={filter.id}
                variant="outline"
                className="cursor-pointer hover:bg-red-100 border-blue-300 bg-blue-50 text-blue-800 pr-1"
                onClick={() => removeFromPending(filter.id)}
              >
                {filter.label || filter.value}
                <X className="h-3 w-3 ml-1" />
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Applied Filters (currently filtering the table) */}
      {appliedFilters.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2 text-green-600">Đang áp dụng:</p>
          <div className="flex flex-wrap gap-2">
            {appliedFilters.map((filter) => (
              <Badge
                key={filter.id}
                variant="default"
                className="bg-green-100 text-green-800"
              >
                {filter.label || filter.value}
                <Check className="h-3 w-3 ml-1" />
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Predefined Options */}
      {predefinedOptions.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">
            {hasOnlyPredefinedOptions ? 'Chọn giá trị:' : 'Giá trị gợi ý:'}
          </p>
          <div className="flex flex-wrap gap-2">
            {predefinedOptions.map((option, index) => {
              const isInPending = pendingFilters.some(filter => 
                filter.value.toLowerCase() === option.toLowerCase()
              );
              
              return (
                <Badge
                  key={`predefined-${index}`}
                  variant={isInPending ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    isInPending 
                      ? 'bg-blue-100 text-blue-800 border-blue-300' 
                      : 'hover:bg-blue-50'
                  }`}
                  onClick={() => handlePredefinedOptionClick(option)}
                >
                  {option}
                </Badge>
              );
            })}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-2 border-t">
        <div className="flex items-center gap-2">
          <Button
            onClick={applyFilters}
            disabled={!hasChanges()}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            size="sm"
          >
            <Check className="h-4 w-4 mr-1" />
            Áp dụng ({pendingFilters.length})
          </Button>
          
          {hasChanges() && (
            <Button
              variant="ghost"
              size="sm"
              onClick={cancelChanges}
              className="text-gray-600 hover:text-gray-700"
            >
              Hủy thay đổi
            </Button>
          )}
        </div>

        {/* Status indicator */}
        <div className="text-xs text-muted-foreground">
          {hasChanges() ? (
            <span className="text-orange-600">● Có thay đổi chưa áp dụng</span>
          ) : (
            <span className="text-green-600">● Đồng bộ</span>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="text-xs text-muted-foreground bg-gray-50 p-2 rounded">
        {hasOnlyPredefinedOptions ? (
          <p>Chọn từ các giá trị có sẵn ở trên, sau đó bấm <strong>Áp dụng</strong> để lọc bảng.</p>
        ) : (
          <p>Nhập giá trị và nhấn Enter hoặc nút + để thêm vào danh sách, sau đó bấm <strong>Áp dụng</strong> để lọc bảng.</p>
        )}
      </div>
    </div>
  );
}