import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { X, Plus, Trash2, Save, Package, Users, Tag } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

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
  description?: string;
}

interface ColumnEditPopupProps {
  isOpen: boolean;
  onClose: () => void;
  column: Column;
  onColumnUpdate: (updatedColumn: Column) => void;
  customers?: any[]; // Add customers prop to extract existing values
}

export function ColumnEditPopup({ isOpen, onClose, column, onColumnUpdate, customers = [] }: ColumnEditPopupProps) {
  const [editedColumn, setEditedColumn] = useState<Column>(column);
  const [newOption, setNewOption] = useState('');
  const [newValue, setNewValue] = useState('');

  // Reset form when column changes
  useEffect(() => {
    setEditedColumn(column);
  }, [column]);

  // Get existing values from customer data for system columns
  const getExistingValues = (columnId: string): string[] => {
    if (!customers.length) return [];
    
    // Special handling for actions column
    if (columnId === 'actions') {
      return ['Xem chi tiết', 'Chỉnh sửa', 'Tạo nhắc nhở', 'Xóa'];
    }
    
    const values = new Set<string>();
    
    customers.forEach(customer => {
      let value = customer[columnId];
      
      if (Array.isArray(value)) {
        // For array fields like products, tags
        value.forEach((item: any) => {
          if (typeof item === 'string') {
            values.add(item);
          } else if (item && typeof item === 'object' && item.name) {
            values.add(item.name);
          }
        });
      } else if (typeof value === 'string' && value.trim()) {
        values.add(value);
      }
    });
    
    return Array.from(values).sort();
  };

  const handleSave = () => {
    console.log(`💾 Saving column "${editedColumn.name}" with options:`, editedColumn.options);
    onColumnUpdate(editedColumn);
    onClose();
  };

  const handleAddOption = () => {
    if (!newOption.trim()) return;
    
    const currentOptions = editedColumn.options || [];
    if (!currentOptions.includes(newOption.trim())) {
      setEditedColumn(prev => ({
        ...prev,
        options: [...currentOptions, newOption.trim()]
      }));
    }
    setNewOption('');
  };

  const handleRemoveOption = (optionToRemove: string) => {
    setEditedColumn(prev => ({
      ...prev,
      options: (prev.options || []).filter(option => option !== optionToRemove)
    }));
  };

  // Handle adding new values to system columns
  const handleAddValue = () => {
    if (!newValue.trim()) return;
    
    // For system columns, we store the new values as options
    // This allows users to add predefined values for dropdowns
    const currentOptions = editedColumn.options || [];
    if (!currentOptions.includes(newValue.trim())) {
      const updatedOptions = [...currentOptions, newValue.trim()];
      console.log(`✅ Adding value "${newValue.trim()}" to column "${editedColumn.name}":`, updatedOptions);
      setEditedColumn(prev => ({
        ...prev,
        options: updatedOptions
      }));
    }
    setNewValue('');
  };

  const handleRemoveValue = (valueToRemove: string) => {
    setEditedColumn(prev => ({
      ...prev,
      options: (prev.options || []).filter(option => option !== valueToRemove)
    }));
  };

  const fieldTypeOptions = [
    { value: 'text', label: 'Văn bản' },
    { value: 'number', label: 'Số' },
    { value: 'date', label: 'Ngày tháng' },
    { value: 'select', label: 'Lựa chọn đơn' },
    { value: 'multiselect', label: 'Lựa chọn nhiều' }
  ];

  const isSystemColumn = column.type === 'default';
  const needsOptions = editedColumn.fieldType === 'select' || editedColumn.fieldType === 'multiselect';
  
  // System columns that support value management
  const supportedSystemColumns = ['products', 'source', 'assignedSale', 'status', 'quality', 'actions'];
  const canManageValues = supportedSystemColumns.includes(column.id) || !isSystemColumn;
  
  // Get existing values for system columns
  const existingValues = isSystemColumn ? getExistingValues(column.id) : [];
  const customValues = editedColumn.options || [];
  const allValues = [...new Set([...existingValues, ...customValues])].sort();

  const getColumnIcon = (columnId: string) => {
    switch (columnId) {
      case 'products': return <Package className="h-4 w-4" />;
      case 'source': return <Users className="h-4 w-4" />;
      case 'tags': return <Tag className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getColumnIcon(column.id)}
            <span>Chỉnh sửa cột: {column.name}</span>
            {isSystemColumn && (
              <Badge variant="secondary" className="text-xs">
                Cột hệ thống
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            Cập nhật thông tin và quản lý giá trị cho cột dữ liệu.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Column Name */}
          <div className="space-y-2">
            <Label htmlFor="column-name">Tên cột *</Label>
            <Input
              id="column-name"
              value={editedColumn.name}
              onChange={(e) => setEditedColumn(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Nhập tên cột..."
            />
          </div>

          {/* Field Type - Only for custom columns */}
          {!isSystemColumn && (
            <div className="space-y-2">
              <Label htmlFor="field-type">Loại dữ liệu</Label>
              <Select
                value={editedColumn.fieldType || 'text'}
                onValueChange={(value: any) => setEditedColumn(prev => ({ 
                  ...prev, 
                  fieldType: value,
                  // Clear options if changing away from select types
                  options: (value === 'select' || value === 'multiselect') ? prev.options : undefined
                }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fieldTypeOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Mô tả</Label>
            <Textarea
              id="description"
              value={editedColumn.description || ''}
              onChange={(e) => setEditedColumn(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Mô tả về cột này..."
              className="min-h-[60px]"
            />
          </div>

          {/* Value Management Section */}
          {(canManageValues || needsOptions) && (
            <div className="space-y-3 border border-border rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-primary" />
                <Label className="text-base font-medium">
                  {isSystemColumn ? 'Quản lý giá trị' : 'Tùy chọn lựa chọn'}
                </Label>
              </div>
              
              {isSystemColumn && (
                <p className="text-sm text-muted-foreground">
                  Thêm các giá trị có sẵn để dễ dàng chọn khi nhập dữ liệu. Ví dụ: Sản phẩm A, Sản phẩm B, Sản phẩm C...
                </p>
              )}

              {/* Existing Values from Data */}
              {isSystemColumn && existingValues.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">
                    Giá trị có trong dữ liệu ({existingValues.length})
                  </Label>
                  <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                    {existingValues.map((value, index) => (
                      <Badge key={`existing-${index}`} variant="outline" className="text-xs">
                        {value}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom Values */}
              {allValues.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    {isSystemColumn ? 'Giá trị tùy chỉnh' : 'Tùy chọn hiện tại'} ({customValues.length})
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {customValues.map((value, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {value}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 hover:bg-red-100"
                          onClick={() => isSystemColumn ? handleRemoveValue(value) : handleRemoveOption(value)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Add new value */}
              <div className="flex gap-2">
                <Input
                  value={isSystemColumn ? newValue : newOption}
                  onChange={(e) => isSystemColumn ? setNewValue(e.target.value) : setNewOption(e.target.value)}
                  placeholder={isSystemColumn ? "Thêm giá trị mới (VD: Sản phẩm C)..." : "Thêm tùy chọn mới..."}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      isSystemColumn ? handleAddValue() : handleAddOption();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={isSystemColumn ? handleAddValue : handleAddOption}
                  disabled={isSystemColumn ? !newValue.trim() : !newOption.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Column Settings */}
          <div className="space-y-3 border-t pt-4">
            <h4 className="font-medium">Cài đặt cột</h4>
            
            {/* Required */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Trường bắt buộc</Label>
                <div className="text-sm text-muted-foreground">
                  Đánh dấu đỏ tên cột và yêu cầu nhập dữ liệu
                </div>
              </div>
              <Switch
                checked={editedColumn.required}
                onCheckedChange={(checked) => setEditedColumn(prev => ({ ...prev, required: checked }))}
                disabled={isSystemColumn && editedColumn.required} // Prevent unchecking system required fields
              />
            </div>

            {/* Visible */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Hiển thị cột</Label>
                <div className="text-sm text-muted-foreground">
                  Ẩn/hiện cột trong bảng dữ liệu
                </div>
              </div>
              <Switch
                checked={editedColumn.visible}
                onCheckedChange={(checked) => setEditedColumn(prev => ({ ...prev, visible: checked }))}
              />
            </div>
          </div>

          {/* Column Info */}
          <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="font-medium">ID cột:</span> {editedColumn.id}
              </div>
              <div>
                <span className="font-medium">Thứ tự:</span> {editedColumn.order}
              </div>
              <div>
                <span className="font-medium">Loại:</span> {editedColumn.type === 'custom' ? 'Tùy chỉnh' : 'Hệ thống'}
              </div>
              <div>
                <span className="font-medium">Dữ liệu:</span> {
                  fieldTypeOptions.find(opt => opt.value === editedColumn.fieldType)?.label || 'Văn bản'
                }
              </div>
            </div>
            {isSystemColumn && existingValues.length > 0 && (
              <div className="mt-2 pt-2 border-t border-border">
                <span className="font-medium">Tổng giá trị:</span> {existingValues.length} giá trị có sẵn, {customValues.length} tùy chỉnh
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Lưu thay đổi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}