import { useState, useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Plus, MoreVertical, Edit, Trash2, X, GripVertical } from 'lucide-react';

interface CustomerGroupFilter {
  columnId: string;
  columnName: string;
  values: string[];
}

interface CustomerGroup {
  id: string;
  name: string;
  count: number;
  filters: CustomerGroupFilter[];
  memberIds?: string[];
  order?: number;
  groupFilters?: CustomerGroupFilter[];
}

interface CustomerGroupsProps {
  activeGroup: string;
  onGroupChange: (groupId: string) => void;
  onFiltersChange?: (filters: Record<string, string[]>) => void;
  currentTableFilters?: Record<string, string[]>;
  customers?: any[];
  onGroupsChange?: (groups: CustomerGroup[]) => void;
  onGroupFilterHandlers?: (handlers: {
    openGroupFilter: (groupId: string) => void;
    hasGroupFilter: (groupId: string) => boolean;
  }) => void;
}

const mockGroups: CustomerGroup[] = [
  {
    id: 'main',
    name: 'Tổng quan',
    count: 50,
    filters: [],
    order: 0
  },
  {
    id: 'group1',
    name: 'Khách hàng tiềm năng',
    count: 15,
    filters: [
      { columnId: 'status', columnName: 'Trạng thái', values: ['Mới', 'Đang xử lý'] },
      { columnId: 'source', columnName: 'Nguồn data', values: ['Facebook', 'Google'] }
    ],
    order: 1
  },
  {
    id: 'group2',
    name: 'Thành công Q4',
    count: 8,
    filters: [
      { columnId: 'status', columnName: 'Trạng thái', values: ['Thành công'] }
    ],
    order: 2
  },
  {
    id: 'group3',
    name: 'Chưa phân bổ Sale',
    count: 12,
    filters: [
      { columnId: 'assignedSale', columnName: 'Sale phụ trách', values: ['Chưa phân bổ'] }
    ],
    order: 3
  }
];

// Available columns for filtering
const availableColumns = [
  { id: 'status', name: 'Trạng thái' },
  { id: 'source', name: 'Nguồn data' },
  { id: 'assignedSale', name: 'Sale phụ trách' },
  { id: 'products', name: 'Sản phẩm/Dịch vụ' },
  { id: 'quality', name: 'Chất lượng' }
];

// Available values for each column
const columnValues: Record<string, string[]> = {
  status: ['Mới', 'Đang xử lý', 'Thành công', 'Thất bại'],
  source: ['Facebook', 'Google', 'TikTok', 'Zalo', 'Website', 'Giới thiệu'],
  assignedSale: ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Chưa phân bổ'],
  products: ['Website Design', 'SEO Service', 'Digital Marketing', 'E-commerce'],
  quality: ['1', '2', '3', '4', '5']
};

// Draggable Group Item Component with DnD support
const DraggableGroupItem = ({ 
  group, 
  index,
  activeGroup, 
  onGroupChange, 
  onEditGroup, 
  onDeleteGroup,
  onMoveGroup
}: {
  group: CustomerGroup;
  index: number;
  activeGroup: string;
  onGroupChange: (groupId: string) => void;
  onEditGroup: (groupId: string) => void;
  onDeleteGroup: (groupId: string) => void;
  onMoveGroup: (dragIndex: number, hoverIndex: number) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId, isOver }, drop] = useDrop({
    accept: 'GROUP_ITEM',
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

      // Get horizontal middle
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the left
      const hoverClientX = clientOffset!.x - hoverBoundingRect.left;

      // Only perform the move when the mouse has crossed half of the items width
      // When dragging leftwards, only move when the cursor is to the left of 50%
      // When dragging rightwards, only move when the cursor is to the right of 50%

      // Dragging leftwards
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }

      // Dragging rightwards
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }

      // Time to actually perform the action
      onMoveGroup(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'GROUP_ITEM',
    item: () => {
      return { id: group.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: group.id !== 'main' // Prevent dragging the main group
  });

  const opacity = isDragging ? 0.4 : 1;
  preview(drop(ref));

  return (
    <div 
      ref={ref} 
      style={{ opacity }} 
      data-handler-id={handlerId}
      className={`flex items-center gap-1 transition-all duration-200 ${
        isDragging ? 'cursor-grabbing scale-105 shadow-lg z-10' : ''
      } ${
        isOver && !isDragging ? 'bg-primary/10 border-primary/30 border-dashed border-2 rounded-lg px-2 py-1' : ''
      }`}
    >
      {/* Drag Handle - Only show for non-main groups */}
      {group.id !== 'main' && (
        <div 
          ref={drag}
          className="cursor-grab hover:cursor-grabbing p-1 text-muted-foreground hover:text-primary transition-all duration-200 hover:bg-accent/50 rounded"
          title="Kéo để sắp xếp thứ tự nhóm"
        >
          <GripVertical className="h-3.5 w-3.5" />
        </div>
      )}
      
      <Button
        variant={activeGroup === group.id ? "default" : "outline"}
        size="sm"
        onClick={() => onGroupChange(group.id)}
        className="flex items-center gap-2 whitespace-nowrap"
      >
        {group.name}
        <Badge variant="secondary" className="ml-1">
          {group.count}
        </Badge>
      </Button>
      
      {group.id !== 'main' && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEditGroup(group.id)}>
              <Edit className="h-4 w-4 mr-2" />
              Chỉnh sửa bộ lọc gốc
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onDeleteGroup(group.id)}
              className="text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Xóa nhóm
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export function CustomerGroups({ 
  activeGroup, 
  onGroupChange, 
  onFiltersChange, 
  currentTableFilters, 
  customers, 
  onGroupsChange, 
  onGroupFilterHandlers 
}: CustomerGroupsProps) {
  const [groups, setGroups] = useState<CustomerGroup[]>(mockGroups);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showEditGroup, setShowEditGroup] = useState<string | null>(null);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupFilters, setNewGroupFilters] = useState<CustomerGroupFilter[]>([]);

  // Function to handle group reordering
  const handleMoveGroup = (dragIndex: number, hoverIndex: number) => {
    const sortedGroups = [...groups].sort((a, b) => (a.order || 0) - (b.order || 0));
    const draggedGroup = sortedGroups[dragIndex];
    
    // Remove dragged item and insert at new position
    sortedGroups.splice(dragIndex, 1);
    sortedGroups.splice(hoverIndex, 0, draggedGroup);
    
    // Update order property for all groups
    const reorderedGroups = sortedGroups.map((group, index) => ({
      ...group,
      order: index
    }));
    
    setGroups(reorderedGroups);
    
    // Show subtle success feedback
    console.log(`📁 Đã di chuyển nhóm "${draggedGroup.name}" từ vị trí ${dragIndex + 1} sang ${hoverIndex + 1}`);
    
    // Optional: Show toast notification for better UX
    // toast.success(`Đã di chuyển nhóm "${draggedGroup.name}"`);
  };
  
  // Helper function to get filtered customers for a group
  const getFilteredCustomersForGroup = (group: CustomerGroup, customers: any[]) => {
    if (!customers) return [];
    
    return customers.filter((customer) => {
      return group.filters.every(filter => {
        const customerValue = customer[filter.columnId];
        if (Array.isArray(customerValue)) {
          return filter.values.some(value => customerValue.includes(value));
        }
        return filter.values.includes(customerValue);
      });
    });
  };

  // Apply group filters when group changes
  const handleGroupChange = (groupId: string) => {
    onGroupChange(groupId);
    
    if (onFiltersChange && groupId !== 'main') {
      const group = groups.find(g => g.id === groupId);
      if (group) {
        const filters: Record<string, string[]> = {};
        
        group.filters.forEach(filter => {
          filters[filter.columnId] = filter.values;
        });
        
        onFiltersChange(filters);
      }
    } else if (onFiltersChange) {
      onFiltersChange({});
    }
  };

  const resetDialog = () => {
    setNewGroupName('');
    setNewGroupFilters([]);
    setShowCreateGroup(false);
    setShowEditGroup(null);
  };

  const initializeNewGroup = () => {
    setShowCreateGroup(true);
    
    const initialFilters: CustomerGroupFilter[] = [
      { 
        columnId: '', 
        columnName: '', 
        values: [] 
      }
    ];
    
    if (currentTableFilters && Object.keys(currentTableFilters).length > 0) {
      const tableBasedFilters: CustomerGroupFilter[] = [];
      Object.entries(currentTableFilters).forEach(([columnId, values]) => {
        if (values && values.length > 0) {
          const column = availableColumns.find(col => col.id === columnId);
          if (column) {
            tableBasedFilters.push({
              columnId,
              columnName: column.name,
              values: [...values]
            });
          }
        }
      });
      
      setNewGroupFilters(tableBasedFilters.length > 0 ? tableBasedFilters : initialFilters);
    } else {
      setNewGroupFilters(initialFilters);
    }
  };

  const getFilterDescription = (filters: CustomerGroupFilter[]) => {
    if (filters.length === 0) return 'Tất cả dữ liệu';
    
    return filters.map(filter => 
      `${filter.columnName}: ${filter.values.join(', ')}`
    ).join(' | ');
  };

  const handleCreateGroup = () => {
    if (!newGroupName.trim()) return;

    const newGroup: CustomerGroup = {
      id: `group_${Date.now()}`,
      name: newGroupName.trim(),
      count: 0,
      filters: newGroupFilters.filter(f => f.columnId && f.values.length > 0),
      order: groups.length // Add order property for new groups
    };

    setGroups([...groups, newGroup]);
    resetDialog();
    handleGroupChange(newGroup.id);
  };

  const handleEditGroup = (groupId: string) => {
    const group = groups.find(g => g.id === groupId);
    if (group) {
      setNewGroupName(group.name);
      setNewGroupFilters([...group.filters]);
      setShowEditGroup(groupId);
    }
  };

  const handleUpdateGroup = () => {
    if (!showEditGroup || !newGroupName.trim()) return;

    setGroups(groups.map(group => 
      group.id === showEditGroup
        ? { 
            ...group, 
            name: newGroupName.trim(), 
            filters: newGroupFilters.filter(f => f.columnId && f.values.length > 0)
          }
        : group
    ));

    if (activeGroup === showEditGroup && onFiltersChange) {
      const filters: Record<string, string[]> = {};
      newGroupFilters.forEach(filter => {
        if (filter.columnId && filter.values.length > 0) {
          filters[filter.columnId] = filter.values;
        }
      });
      onFiltersChange(filters);
    }

    resetDialog();
  };

  const handleDeleteGroup = (groupId: string) => {
    if (groupId === 'main') return;
    setGroups(groups.filter(g => g.id !== groupId));
    if (activeGroup === groupId) {
      handleGroupChange('main');
    }
  };

  const addFilter = () => {
    setNewGroupFilters([...newGroupFilters, { 
      columnId: '', 
      columnName: '', 
      values: [] 
    }]);
  };

  const removeFilter = (index: number) => {
    setNewGroupFilters(newGroupFilters.filter((_, i) => i !== index));
  };

  const updateFilter = (index: number, updates: Partial<CustomerGroupFilter>) => {
    setNewGroupFilters(newGroupFilters.map((filter, i) => 
      i === index ? { ...filter, ...updates } : filter
    ));
  };

  const removeFilterValue = (filterIndex: number, valueIndex: number) => {
    const filter = newGroupFilters[filterIndex];
    updateFilter(filterIndex, {
      values: filter.values.filter((_, i) => i !== valueIndex)
    });
  };

  useEffect(() => {
    if (customers && customers.length > 0) {
      setGroups(prevGroups => {
        const updatedGroups = prevGroups.map(group => {
          if (group.memberIds) {
            return {
              ...group,
              count: group.memberIds.length
            };
          } else {
            return {
              ...group,
              count: getFilteredCustomersForGroup(group, customers).length
            };
          }
        });
        
        const hasChanged = updatedGroups.some((group, index) => 
          group.count !== prevGroups[index]?.count
        );
        
        return hasChanged ? updatedGroups : prevGroups;
      });
    }
  }, [customers]);

  useEffect(() => {
    if (onGroupsChange) {
      onGroupsChange(groups);
    }
  }, [groups, onGroupsChange]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="border-b border-border bg-muted/10">
        <div className="flex items-center gap-2 p-4 overflow-x-auto">
          {groups
            .sort((a, b) => (a.order || 0) - (b.order || 0)) // Sort by order
            .map((group, index) => (
            <DraggableGroupItem
              key={group.id}
              group={group}
              index={index}
              activeGroup={activeGroup}
              onGroupChange={handleGroupChange}
              onEditGroup={handleEditGroup}
              onDeleteGroup={handleDeleteGroup}
              onMoveGroup={handleMoveGroup}
            />
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={initializeNewGroup}
            className="flex items-center gap-2 whitespace-nowrap ml-2"
          >
            <Plus className="h-4 w-4" />
            Tạo nhóm
          </Button>
        </div>

      {/* Show active group filters */}
      {activeGroup !== 'main' && (
        <div className="px-4 pb-3">
          <div className="text-xs text-muted-foreground">
            Bộ lọc: {getFilterDescription(groups.find(g => g.id === activeGroup)?.filters || [])}
          </div>
        </div>
      )}

      {/* Create/Edit Group Dialog */}
      <Dialog open={showCreateGroup || showEditGroup !== null} onOpenChange={resetDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {showEditGroup ? 'Chỉnh sửa nhóm khách hàng' : 'Tạo nhóm khách hàng mới'}
            </DialogTitle>
            <DialogDescription>
              {showEditGroup 
                ? 'Cập nhật tên và bộ lọc cho nhóm khách hàng'
                : 'Tạo nhóm khách hàng mới với các bộ lọc tùy chỉnh'
              }
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Group Name */}
            <div className="space-y-2">
              <Label htmlFor="group-name">Tên nhóm</Label>
              <Input
                id="group-name"
                placeholder="Nhập tên nhóm..."
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Bộ lọc</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addFilter}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Thêm bộ lọc
                </Button>
              </div>

              {newGroupFilters.map((filter, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Bộ lọc {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFilter(index)}
                      className="h-8 w-8 p-0 text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Column Selection */}
                  <div className="space-y-2">
                    <Label>Cột</Label>
                    <Select
                      value={filter.columnId}
                      onValueChange={(value) => {
                        const column = availableColumns.find(col => col.id === value);
                        updateFilter(index, {
                          columnId: value,
                          columnName: column?.name || '',
                          values: []
                        });
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn cột để lọc" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableColumns.map((column) => (
                          <SelectItem key={column.id} value={column.id}>
                            {column.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Values Selection */}
                  {filter.columnId && (
                    <div className="space-y-2">
                      <Label>Giá trị</Label>
                      <div className="space-y-2">
                        {/* Available values */}
                        <div className="flex flex-wrap gap-2">
                          {columnValues[filter.columnId]?.map((value) => (
                            <Button
                              key={value}
                              type="button"
                              variant={filter.values.includes(value) ? "default" : "outline"}
                              size="sm"
                              onClick={() => {
                                if (filter.values.includes(value)) {
                                  updateFilter(index, {
                                    values: filter.values.filter(v => v !== value)
                                  });
                                } else {
                                  updateFilter(index, {
                                    values: [...filter.values, value]
                                  });
                                }
                              }}
                              className="h-8"
                            >
                              {value}
                            </Button>
                          ))}
                        </div>

                        {/* Selected values */}
                        {filter.values.length > 0 && (
                          <div className="space-y-2">
                            <Label className="text-sm">Đã chọn:</Label>
                            <div className="flex flex-wrap gap-1">
                              {filter.values.map((value, valueIndex) => (
                                <Badge
                                  key={valueIndex}
                                  variant="secondary"
                                  className="cursor-pointer hover:bg-red-100"
                                  onClick={() => removeFilterValue(index, valueIndex)}
                                >
                                  {value}
                                  <X className="h-3 w-3 ml-1" />
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {newGroupFilters.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  Chưa có bộ lọc nào. Nhấp "Thêm bộ lọc" để bắt đầu.
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4 border-t">
              <Button 
                type="button" 
                variant="outline" 
                onClick={resetDialog}
                className="flex-1 sm:flex-initial order-2 sm:order-1"
              >
                Hủy
              </Button>
              <Button
                type="button"
                onClick={showEditGroup ? handleUpdateGroup : handleCreateGroup}
                disabled={!newGroupName.trim()}
                className="flex-1 sm:flex-initial order-1 sm:order-2"
              >
                {showEditGroup ? 'Cập nhật' : 'Tạo nhóm'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      </div>
    </DndProvider>
  );
}