import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { 
  Plus, 
  Trash2, 
  Eye, 
  EyeOff, 
  GripVertical,
  Settings,
  X,
  Move,
  ArrowUpDown
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
  showLabel?: boolean; // Add showLabel property
  color?: string; // Add color property
}

interface ColumnManagerProps {
  columns: Column[];
  onColumnsChange: (columns: Column[]) => void;
  onClose: () => void;
}

// Drag and Drop Item Types
const ItemTypes = {
  COLUMN: 'column'
};

// Draggable Column Item Component
interface DraggableColumnProps {
  column: Column;
  index: number;
  moveColumn: (dragIndex: number, hoverIndex: number) => void;
  onToggleVisibility: (columnId: string) => void;
  onDeleteColumn: (columnId: string) => void;
  getColumnTypeColor: (type: Column['type']) => string;
  getColumnTypeText: (type: Column['type']) => string;
}

function DraggableColumn({ 
  column, 
  index, 
  moveColumn, 
  onToggleVisibility, 
  onDeleteColumn,
  getColumnTypeColor,
  getColumnTypeText 
}: DraggableColumnProps) {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.COLUMN,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.COLUMN,
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveColumn(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`flex items-center gap-2 p-2.5 bg-white border border-green-200 rounded-md cursor-move transition-all duration-200 ${
        isDragging 
          ? 'opacity-60 scale-[1.01] shadow-md border-purple-300 bg-purple-50 z-10' 
          : 'hover:shadow-sm hover:border-purple-200 hover:bg-purple-50/30'
      }`}
      style={{ opacity: isDragging ? 0.6 : 1 }}
    >
      {/* Drag handle và order number */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <div className="flex items-center justify-center w-5 h-5 text-xs text-green-600 font-medium bg-green-100 rounded-full">
          {index + 1}
        </div>
        <GripVertical 
          className={`h-3.5 w-3.5 cursor-grab transition-colors ${
            isDragging ? 'text-purple-600' : 'text-purple-500 hover:text-purple-600'
          }`} 
          title="Kéo để sắp xếp"
        />
      </div>
      
      {/* Color indicator for custom columns */}
      {column.color && column.type === 'custom' && (
        <div 
          className="w-2.5 h-2.5 rounded-full border border-white shadow-sm flex-shrink-0"
          style={{ backgroundColor: column.color }}
          title={`Màu cột: ${column.color}`}
        />
      )}
      
      {/* Column info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-sm font-medium truncate">{column.name}</span>
          {column.required && (
            <Badge variant="destructive" className="text-xs h-3.5 px-1 flex-shrink-0">
              *
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <Badge className={`${getColumnTypeColor(column.type)} text-xs h-3.5 px-1 flex-shrink-0`}>
            {getColumnTypeText(column.type)}
          </Badge>
          {column.fieldType && (
            <span className="text-xs text-muted-foreground truncate">
              {column.fieldType}
            </span>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-0.5 flex-shrink-0">
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={() => onToggleVisibility(column.id)}
          disabled={column.required}
          title={column.required ? "Cột bắt buộc không thể ẩn" : "Ẩn cột"}
        >
          <EyeOff className="h-3 w-3" />
        </Button>
        
        {column.type === 'custom' && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => onDeleteColumn(column.id)}
            title="Xóa cột tùy chỉnh"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  );
}

export function ColumnManager({ columns, onColumnsChange, onClose }: ColumnManagerProps) {
  const [showAddColumn, setShowAddColumn] = useState(false);
  const [newColumn, setNewColumn] = useState({
    name: '',
    displayName: '',
    fieldType: 'text' as const,
    options: '',
    allowFilter: true,
    showLabel: true,
    color: '#3b82f6' // Default blue color
  });

  const toggleColumnVisibility = (columnId: string) => {
    const newColumns = columns.map(col => 
      col.id === columnId ? { ...col, visible: !col.visible } : col
    );
    onColumnsChange(newColumns);
  };

  const toggleColumnLabel = (columnId: string) => {
    const newColumns = columns.map(col => 
      col.id === columnId ? { ...col, showLabel: !col.showLabel } : col
    );
    onColumnsChange(newColumns);
  };

  const deleteColumn = (columnId: string) => {
    const newColumns = columns.filter(col => col.id !== columnId);
    onColumnsChange(newColumns);
  };

  // Move column function for drag and drop
  const moveColumn = (dragIndex: number, hoverIndex: number) => {
    const visibleColumns = columns.filter(col => col.visible).sort((a, b) => a.order - b.order);
    const dragColumn = visibleColumns[dragIndex];
    const hoverColumn = visibleColumns[hoverIndex];
    
    if (!dragColumn || !hoverColumn) return;

    // Create new columns array with updated order
    const newColumns = columns.map(col => {
      if (col.id === dragColumn.id) {
        return { ...col, order: hoverColumn.order };
      } else if (col.id === hoverColumn.id) {
        return { ...col, order: dragColumn.order };
      }
      return col;
    });

    onColumnsChange(newColumns);
  };

  // Reset column order to default
  const resetColumnOrder = () => {
    const resetColumns = columns.map((col, index) => ({
      ...col,
      order: index + 1
    }));
    onColumnsChange(resetColumns);
  };

  const addCustomColumn = () => {
    const maxOrder = Math.max(...columns.map(col => col.order));
    const newCol: Column = {
      id: `custom_${Date.now()}`,
      name: newColumn.name,
      type: 'custom',
      visible: true,
      required: false,
      order: maxOrder + 1,
      fieldType: newColumn.fieldType,
      options: newColumn.fieldType === 'select' || newColumn.fieldType === 'multiselect' 
        ? newColumn.options.split(',').map(opt => opt.trim()).filter(opt => opt)
        : undefined,
      displayName: newColumn.displayName || newColumn.name,
      allowFilter: newColumn.allowFilter !== false,
      showLabel: newColumn.showLabel !== false,
      color: newColumn.color
    };
    
    const newColumns = [...columns, newCol];
    onColumnsChange(newColumns);
    setNewColumn({ name: '', displayName: '', fieldType: 'text', options: '', allowFilter: true, showLabel: true, color: '#3b82f6' });
    setShowAddColumn(false);
  };

  const getColumnTypeColor = (type: Column['type']) => {
    switch (type) {
      case 'default': return 'bg-blue-100 text-blue-800';
      case 'hidden': return 'bg-gray-100 text-gray-800';
      case 'custom': return 'bg-green-100 text-green-800';
    }
  };

  const getColumnTypeText = (type: Column['type']) => {
    switch (type) {
      case 'default': return 'Mặc định';
      case 'hidden': return 'Ẩn';
      case 'custom': return 'Tùy chỉnh';
    }
  };

  const visibleColumns = columns.filter(col => col.visible).sort((a, b) => a.order - b.order);
  const allColumns = columns.sort((a, b) => a.order - b.order);

  return (
    <DndProvider backend={HTML5Backend}>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl w-[95vw] h-[85vh] flex flex-col p-0 gap-0">
          {/* Header - Fixed */}
          <div className="flex-shrink-0 px-6 pt-6 pb-2">
            <DialogHeader className="pb-3">
              <DialogTitle className="flex items-center gap-2 text-lg">
                <Settings className="h-5 w-5" />
                Quản lý cột
              </DialogTitle>
              <DialogDescription className="text-sm">
                Tùy chỉnh các cột hiển thị trong bảng dữ liệu khách hàng. Kéo thả để sắp xếp lại vị trí cột.
              </DialogDescription>
            </DialogHeader>

            {/* Drag and Drop Instructions */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-2.5">
              <div className="flex items-center gap-2 text-purple-700 mb-1">
                <ArrowUpDown className="h-3.5 w-3.5" />
                <span className="text-sm font-medium">Hướng dẫn:</span>
              </div>
              <div className="text-xs text-purple-600">
                <p>• Kéo <GripVertical className="h-3 w-3 inline mx-1" /> để sắp xếp • Tích/bỏ tích để ẩn/hiện • Cột (*) không thể ẩn</p>
              </div>
            </div>
          </div>

          {/* Main content area - Scrollable with proper height constraint */}
          <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-6">
            <div className="space-y-4 pb-4">
              {/* Danh sách cột đang hiển thị - với drag and drop */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium flex items-center gap-2 text-green-800 text-sm">
                    <Eye className="h-4 w-4" />
                    Cột đang hiển thị ({visibleColumns.length})
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-xs text-green-600">
                      <ArrowUpDown className="h-3 w-3" />
                      <span className="hidden sm:inline">Kéo thả</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetColumnOrder}
                      className="h-6 px-2 text-xs text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                    >
                      Đặt lại
                    </Button>
                  </div>
                </div>
                
                {/* Use flex layout instead of grid to prevent horizontal scroll */}
                <div className="space-y-2">
                  {visibleColumns.map((column, index) => (
                    <DraggableColumn
                      key={column.id}
                      column={column}
                      index={index}
                      moveColumn={moveColumn}
                      onToggleVisibility={toggleColumnVisibility}
                      onDeleteColumn={deleteColumn}
                      getColumnTypeColor={getColumnTypeColor}
                      getColumnTypeText={getColumnTypeText}
                    />
                  ))}
                </div>
                
                {visibleColumns.length === 0 && (
                  <div className="text-center py-6 text-green-600">
                    <Move className="h-10 w-10 mx-auto mb-2 opacity-50" />
                    <p className="text-sm font-medium">Chưa có cột nào được hiển thị</p>
                    <p className="text-xs opacity-75 mt-1">Tích chọn các cột bên dưới để hiển thị</p>
                  </div>
                )}
              </div>

              {/* Danh sách tất cả cột để tích chọn */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium flex items-center gap-2 text-sm">
                    <Settings className="h-4 w-4" />
                    Tất cả các cột ({allColumns.length})
                  </h3>
                  <Button onClick={() => setShowAddColumn(true)} size="sm" variant="outline" className="h-7 px-2 text-xs">
                    <Plus className="h-3 w-3 mr-1" />
                    Thêm cột
                  </Button>
                </div>
                
                <div className="border border-border rounded-lg bg-background overflow-hidden">
                  {allColumns.map((column, index) => (
                    <div key={column.id} className={`flex items-center gap-3 p-2.5 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors ${!column.visible ? 'bg-muted/10' : ''}`}>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs text-muted-foreground font-medium w-5 text-center">
                          {index + 1}
                        </span>
                        <Checkbox
                          checked={column.visible}
                          onCheckedChange={() => toggleColumnVisibility(column.id)}
                          disabled={column.required}
                        />
                      </div>
                      
                      {/* Color indicator for custom columns */}
                      {column.color && column.type === 'custom' && (
                        <div 
                          className="w-3 h-3 rounded-full border border-gray-300 shadow-sm flex-shrink-0"
                          style={{ backgroundColor: column.color }}
                          title={`Màu cột: ${column.color}`}
                        />
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`font-medium text-sm ${!column.visible ? 'text-muted-foreground line-through' : ''}`}>
                            {column.name}
                          </span>
                          {column.required && (
                            <Badge variant="destructive" className="text-xs h-4 px-1 shrink-0">
                              *
                            </Badge>
                          )}
                          <Badge className={`${getColumnTypeColor(column.type)} text-xs h-4 px-1 shrink-0`}>
                            {getColumnTypeText(column.type)}
                          </Badge>
                        </div>
                        {column.fieldType && (
                          <div className="text-xs text-muted-foreground">
                            {column.fieldType}
                            {column.options && column.options.length > 0 && (
                              <span className="ml-1">
                                ({column.options.slice(0, 2).join(', ')}{column.options.length > 2 ? '...' : ''})
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1 flex-shrink-0">
                        {!column.visible && (
                          <Badge variant="secondary" className="text-xs h-4 px-1">
                            Ẩn
                          </Badge>
                        )}
                        
                        {column.type === 'custom' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => deleteColumn(column.id)}
                            title="Xóa cột tùy chỉnh"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer - Fixed at bottom with guaranteed space */}
          <div className="flex-shrink-0 border-t border-border bg-white">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                {/* Left side info - more compact */}
                <div className="text-sm text-muted-foreground">
                  <div className="font-medium">{visibleColumns.length} hiển thị / {columns.length} tổng</div>
                  {visibleColumns.length > 0 && (
                    <div className="text-xs text-purple-600 max-w-xs truncate">
                      {visibleColumns.slice(0, 2).map(col => col.name).join(' → ')}{visibleColumns.length > 2 ? '...' : ''}
                    </div>
                  )}
                </div>
                
                {/* Right side buttons - always visible */}
                <div className="flex gap-3 items-center">
                  <Button variant="outline" onClick={onClose} size="sm" className="h-9 px-4">
                    Hủy
                  </Button>
                  <Button onClick={onClose} className="bg-purple-600 hover:bg-purple-700 h-9 px-4" size="sm">
                    Lưu thay đổi
                  </Button>
                </div>
              </div>
            </div>
          </div>

        {/* Add Column Dialog */}
        {showAddColumn && (
          <Dialog open={showAddColumn} onOpenChange={setShowAddColumn}>
            <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
              <DialogHeader className="pb-4">
                <DialogTitle className="text-lg">
                  Thêm cột mới
                </DialogTitle>
                <DialogDescription className="text-sm">
                  Tạo cột dữ liệu tùy chỉnh cho hệ thống CRM
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                {/* Column Name Field */}
                <div className="space-y-1.5">
                  <Label htmlFor="column-name" className="text-sm">
                    Tên cột <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="column-name"
                    value={newColumn.name}
                    onChange={(e) => setNewColumn({ ...newColumn, name: e.target.value })}
                    placeholder="Ví dụ: Quy mô công ty, Ngành nghề..."
                    className="h-9"
                  />
                </div>

                {/* Field Type */}
                <div className="space-y-1.5">
                  <Label htmlFor="column-type" className="text-sm">
                    Loại trường <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="column-type"
                    value={newColumn.fieldType}
                    onChange={(e) => setNewColumn({ ...newColumn, fieldType: e.target.value as any })}
                    className="w-full h-9 px-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-background"
                  >
                    <option value="text">Văn bản</option>
                    <option value="number">Số</option>
                    <option value="date">Ngày tháng</option>
                    <option value="select">Lựa chọn đơn</option>
                    <option value="multiselect">Lựa chọn nhiều</option>
                  </select>
                </div>

                {/* Options Field - Only show for select types */}
                {(newColumn.fieldType === 'select' || newColumn.fieldType === 'multiselect') && (
                  <div className="space-y-1.5">
                    <Label htmlFor="column-options" className="text-sm">
                      Tùy chọn (cách nhau bởi dấu phẩy)
                    </Label>
                    <Input
                      id="column-options"
                      value={newColumn.options}
                      onChange={(e) => setNewColumn({ ...newColumn, options: e.target.value })}
                      placeholder="Tùy chọn 1, Tùy chọn 2, Tùy chọn 3"
                      className="h-9"
                    />
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" onClick={() => setShowAddColumn(false)} className="flex-1">
                    Hủy
                  </Button>
                  <Button 
                    onClick={addCustomColumn} 
                    disabled={!newColumn.name.trim()}
                    className="flex-1"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Thêm
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </DialogContent>
    </Dialog>
    </DndProvider>
  );
}