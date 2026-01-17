import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  Edit3, 
  Save, 
  RotateCcw,
  Eye,
  EyeOff,
  AlertTriangle,
  Info
} from 'lucide-react';

interface Column {
  id: string;
  name: string;
  type: 'default' | 'hidden' | 'custom';
  visible: boolean;
  required: boolean;
  order: number;
  fieldType?: 'text' | 'number' | 'date' | 'select' | 'multiselect';
  options?: string[];
  displayName?: string;
  allowFilter?: boolean;
  showLabel?: boolean;
  color?: string;
}

interface BulkEditPopupProps {
  isOpen: boolean;
  onClose: () => void;
  columns: Column[];
  selectedCustomers: any[];
  onApplyChanges: (changes: Record<string, any>) => void;
}

export function BulkEditPopup({ 
  isOpen, 
  onClose, 
  columns, 
  selectedCustomers, 
  onApplyChanges 
}: BulkEditPopupProps) {
  const [changes, setChanges] = useState<Record<string, any>>({});
  const [enabledFields, setEnabledFields] = useState<Record<string, boolean>>({});

  // Get only visible columns for editing
  const visibleColumns = columns
    .filter(col => col.visible)
    .sort((a, b) => a.order - b.order);

  // Predefined options for common fields
  const fieldOptions: Record<string, string[]> = {
    status: ['Mới', 'Đang xử lý', 'Thành công', 'Thất bại'],
    source: ['Facebook', 'Google', 'TikTok', 'Zalo', 'Hotline', 'Website', 'Giới thiệu', 'Khách vãng lai', 'Khác'],
    assignedSale: ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D', 'Chưa phân bổ'],
    quality: ['Hot/Nóng', 'Warm/Ấm', 'Cold/Lạnh'],
    products: ['Website Design', 'SEO Service', 'Digital Marketing', 'E-commerce']
  };

  const handleFieldToggle = (fieldId: string, enabled: boolean) => {
    setEnabledFields(prev => ({ ...prev, [fieldId]: enabled }));
    if (!enabled) {
      // Remove from changes if disabled
      const newChanges = { ...changes };
      delete newChanges[fieldId];
      setChanges(newChanges);
    }
  };

  const handleValueChange = (fieldId: string, value: any) => {
    setChanges(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleApply = () => {
    // Only include enabled fields in changes
    const finalChanges: Record<string, any> = {};
    Object.entries(changes).forEach(([key, value]) => {
      if (enabledFields[key] && value !== undefined && value !== '') {
        finalChanges[key] = value;
      }
    });

    if (Object.keys(finalChanges).length === 0) {
      alert('⚠️ Vui lòng chọn ít nhất một trường để sửa!');
      return;
    }

    onApplyChanges(finalChanges);
    onClose();
  };

  const handleReset = () => {
    setChanges({});
    setEnabledFields({});
  };

  const renderFieldInput = (column: Column) => {
    const fieldId = column.id;
    const isEnabled = enabledFields[fieldId];
    const currentValue = changes[fieldId] || '';

    // Get options for this field
    const options = column.options || fieldOptions[fieldId] || [];

    return (
      <div key={fieldId} className="space-y-3 p-4 border border-border rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isEnabled}
              onChange={(e) => handleFieldToggle(fieldId, e.target.checked)}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <Label className="font-medium text-sm">
              {column.displayName || column.name}
            </Label>
            {column.required && (
              <Badge variant="destructive" className="text-xs h-4">
                Bắt buộc
              </Badge>
            )}
            {column.type === 'custom' && (
              <Badge variant="outline" className="text-xs h-4 border-blue-300 text-blue-700">
                Custom
              </Badge>
            )}
          </div>
          
          {isEnabled ? (
            <Eye className="h-4 w-4 text-green-600" />
          ) : (
            <EyeOff className="h-4 w-4 text-gray-400" />
          )}
        </div>

        {isEnabled && (
          <div className="space-y-2">
            {/* Text fields */}
            {(!column.fieldType || column.fieldType === 'text') && options.length === 0 && (
              <Input
                value={currentValue}
                onChange={(e) => handleValueChange(fieldId, e.target.value)}
                placeholder={`Nhập ${column.displayName || column.name}...`}
                className="h-9"
              />
            )}

            {/* Number fields */}
            {column.fieldType === 'number' && (
              <Input
                type="number"
                value={currentValue}
                onChange={(e) => handleValueChange(fieldId, e.target.value)}
                placeholder={`Nhập ${column.displayName || column.name}...`}
                className="h-9"
              />
            )}

            {/* Date fields */}
            {column.fieldType === 'date' && (
              <Input
                type="date"
                value={currentValue}
                onChange={(e) => handleValueChange(fieldId, e.target.value)}
                className="h-9"
              />
            )}

            {/* Select fields (with predefined options or custom options) */}
            {(column.fieldType === 'select' || options.length > 0) && (
              <Select value={currentValue} onValueChange={(value) => handleValueChange(fieldId, value)}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder={`Chọn ${column.displayName || column.name}...`} />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {/* Large text fields */}
            {(fieldId === 'notes' || fieldId === 'questions' || fieldId === 'address' || 
              (column.type === 'custom' && !column.fieldType)) && (
              <Textarea
                value={currentValue}
                onChange={(e) => handleValueChange(fieldId, e.target.value)}
                placeholder={`Nhập ${column.displayName || column.name}...`}
                rows={3}
                className="resize-none"
              />
            )}

            {/* Special handling for products field */}
            {fieldId === 'products' && !column.fieldType && (
              <div className="space-y-2">
                <Input
                  value={currentValue}
                  onChange={(e) => handleValueChange(fieldId, e.target.value)}
                  placeholder="Nhập tên sản phẩm/dịch vụ..."
                  className="h-9"
                />
                <div className="text-xs text-muted-foreground">
                  💡 Nhập tên sản phẩm. Sẽ thay thế hoàn toàn danh sách sản phẩm hiện tại.
                </div>
              </div>
            )}

            {/* Custom fields - Auto-detect based on field name patterns */}
            {column.type === 'custom' && (
              <div className="text-xs text-muted-foreground bg-blue-50 p-2 rounded border border-blue-200">
                <div className="flex items-center gap-1 text-blue-700">
                  <Info className="h-3 w-3" />
                  <span className="font-medium">Cột tùy chỉnh</span>
                </div>
                <div className="text-blue-600 mt-1">
                  Nhập giá trị cho cột "{column.displayName || column.name}". Giá trị này sẽ được áp dụng cho tất cả các mục đã chọn.
                </div>
              </div>
            )}

            {/* Multi-select preview */}
            {column.fieldType === 'multiselect' && (
              <div className="text-xs text-muted-foreground">
                💡 Chức năng multi-select sẽ được cập nhật trong phiên bản tới
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const enabledFieldsCount = Object.values(enabledFields).filter(Boolean).length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <Edit3 className="h-5 w-5 text-purple-600" />
            Sửa hàng loạt
          </DialogTitle>
          <DialogDescription>
            Sửa đổi thông tin cho {selectedCustomers.length} khách hàng đã chọn. 
            Chỉ chọn và nhập vào các trường bạn muốn thay đổi.
          </DialogDescription>
        </DialogHeader>

        {/* Warning */}
        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <div className="font-medium text-amber-800 mb-1">Lưu ý quan trọng:</div>
            <div className="text-amber-700 space-y-1">
              <div>• Chỉ các trường được tích chọn mới được cập nhật</div>
              <div>• Thao tác này sẽ áp dụng cho tất cả {selectedCustomers.length} khách hàng đã chọn</div>
              <div>• Dữ liệu cũ sẽ bị ghi đè bởi giá trị mới</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between p-4 bg-purple-50 border border-purple-200 rounded-lg flex-shrink-0">
          <div className="flex items-center gap-2 text-purple-700">
            <Info className="h-4 w-4" />
            <span className="text-sm font-medium">
              {enabledFieldsCount} trường đã chọn / {visibleColumns.length} trường có sẵn
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-purple-600 hover:text-purple-700 hover:bg-purple-100"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Đặt lại
          </Button>
        </div>

        {/* Fields */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="space-y-4 p-1">
            {visibleColumns.map(renderFieldInput)}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-border flex-shrink-0">
          <div className="text-sm text-muted-foreground">
            Sẽ cập nhật {selectedCustomers.length} khách hàng với {enabledFieldsCount} trường đã chọn
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button 
              onClick={handleApply}
              className="bg-purple-600 hover:bg-purple-700"
              disabled={enabledFieldsCount === 0}
            >
              <Save className="h-4 w-4 mr-2" />
              Áp dụng thay đổi
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}