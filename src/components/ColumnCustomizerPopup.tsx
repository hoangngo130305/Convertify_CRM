import React, { useState, useRef } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { 
  Settings, 
  Eye, 
  EyeOff,
  RotateCcw
} from 'lucide-react';

interface Column {
  id: string;
  name: string;
  visible: boolean;
  order: number;
}

interface ColumnCustomizerPopupProps {
  isOpen: boolean;
  onClose: () => void;
  availableColumns: Column[];
  visibleColumns: Column[];
  onColumnToggle: (columnId: string) => void;
  onColumnReorder: (columnId: string, newOrder: number) => void;
  onResetToDefault: () => void;
}

// Draggable Column Item Component
const DraggableColumnItem = ({ 
  column, 
  index, 
  onToggle, 
  onMove 
}: {
  column: Column;
  index: number;
  onToggle: (columnId: string) => void;
  onMove: (dragIndex: number, hoverIndex: number) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId, isOver }, drop] = useDrop({
    accept: 'COLUMN_ITEM',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isOver: monitor.isOver(),
      };
    },
    hover(item: { index: number; id: string }, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      onMove(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'COLUMN_ITEM',
    item: () => {
      return { id: column.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;
  preview(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
      className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
        column.visible 
          ? 'bg-white border-primary/20 shadow-sm' 
          : 'bg-muted/30 border-border/50'
      } ${
        isDragging ? 'cursor-grabbing scale-105 shadow-lg z-10' : ''
      } ${
        isOver && !isDragging ? 'bg-primary/10 border-primary/30 border-dashed' : ''
      }`}
    >
      <div className="flex items-center gap-3">
        <div 
          ref={drag}
          className="flex items-center gap-3 cursor-grab hover:cursor-grabbing transition-colors p-1 rounded hover:bg-primary/10"
          title="Kéo để sắp xếp thứ tự"
        >
          {/* 6 dấu chấm để kéo */}
          <div className="grid grid-cols-2 gap-0.5 p-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <div 
                key={i} 
                className="w-1.5 h-1.5 bg-muted-foreground rounded-full opacity-60 hover:opacity-100 transition-opacity" 
              />
            ))}
          </div>
          <span className="text-sm font-medium text-muted-foreground w-6">
            {index + 1}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id={column.id}
            checked={column.visible}
            onCheckedChange={() => onToggle(column.id)}
          />
          <Label 
            htmlFor={column.id}
            className={`cursor-pointer ${
              column.visible ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            {column.name}
          </Label>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {column.visible ? (
          <Eye className="h-4 w-4 text-green-500" />
        ) : (
          <EyeOff className="h-4 w-4 text-muted-foreground" />
        )}
      </div>
    </div>
  );
};

export function ColumnCustomizerPopup({
  isOpen,
  onClose,
  availableColumns,
  visibleColumns,
  onColumnToggle,
  onColumnReorder,
  onResetToDefault
}: ColumnCustomizerPopupProps) {
  const [localColumns, setLocalColumns] = useState(availableColumns);

  const handleToggle = (columnId: string) => {
    setLocalColumns(prev => prev.map(col => 
      col.id === columnId ? { ...col, visible: !col.visible } : col
    ));
  };

  const handleMove = (dragIndex: number, hoverIndex: number) => {
    const sortedColumns = [...localColumns].sort((a, b) => a.order - b.order);
    const draggedColumn = sortedColumns[dragIndex];
    
    // Remove dragged item and insert at new position
    sortedColumns.splice(dragIndex, 1);
    sortedColumns.splice(hoverIndex, 0, draggedColumn);
    
    // Update order property for all columns
    const reorderedColumns = sortedColumns.map((column, index) => ({
      ...column,
      order: index
    }));
    
    // Update local state
    setLocalColumns(prev => 
      prev.map(col => {
        const reorderedCol = reorderedColumns.find(rc => rc.id === col.id);
        return reorderedCol ? { ...col, order: reorderedCol.order } : col;
      })
    );
    
    console.log(`📋 Đã di chuyển cột "${draggedColumn.name}" từ vị trí ${dragIndex + 1} sang ${hoverIndex + 1}`);
  };

  const handleApply = () => {
    // Apply changes to parent component
    localColumns.forEach(column => {
      const originalColumn = availableColumns.find(col => col.id === column.id);
      if (originalColumn && originalColumn.visible !== column.visible) {
        onColumnToggle(column.id);
      }
      if (originalColumn && originalColumn.order !== column.order) {
        onColumnReorder(column.id, column.order);
      }
    });
    onClose();
  };

  const handleReset = () => {
    onResetToDefault();
    setLocalColumns(availableColumns);
  };

  const sortedColumns = [...localColumns].sort((a, b) => a.order - b.order);
  const visibleCount = localColumns.filter(col => col.visible).length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            Tùy chỉnh cột hiển thị
          </DialogTitle>
          <DialogDescription>
            Chọn các cột muốn hiển thị và kéo 6 dấu chấm để sắp xếp thứ tự
          </DialogDescription>
        </DialogHeader>

        <DndProvider backend={HTML5Backend}>
          <div className="space-y-4">
            {/* Summary */}
            <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  {visibleCount}/{availableColumns.length} cột hiển thị
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  🖱️ Kéo thả để sắp xếp
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Đặt lại mặc định
              </Button>
            </div>

            {/* Column List */}
            <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
              {sortedColumns.map((column, index) => (
                <DraggableColumnItem
                  key={column.id}
                  column={column}
                  index={index}
                  onToggle={handleToggle}
                  onMove={handleMove}
                />
              ))}
            </div>

            {/* Preview */}
            <div className="p-3 bg-muted/20 rounded-lg">
              <Label className="text-sm font-medium mb-2 block">Xem trước thứ tự cột:</Label>
              <div className="flex flex-wrap gap-1">
                {sortedColumns
                  .filter(col => col.visible)
                  .map((column, index) => (
                    <Badge 
                      key={column.id} 
                      variant="outline" 
                      className="text-xs bg-primary/5 border-primary/30"
                    >
                      {index + 1}. {column.name}
                    </Badge>
                  ))}
              </div>
            </div>
          </div>
        </DndProvider>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button onClick={handleApply} className="bg-primary hover:bg-primary-hover">
            Áp dụng thay đổi
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}