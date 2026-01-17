import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
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
import { Plus, Filter, MoreVertical, Edit, Trash2, X, FilterX } from 'lucide-react';

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
  // Track customers explicitly assigned to this group
  memberIds?: string[];
  order?: number; // Add order property for drag and drop
  // Add group-level additional filters
  groupFilters?: CustomerGroupFilter[];
}

interface CustomerGroupsProps {
  activeGroup: string;
  onGroupChange: (groupId: string) => void;
  onFiltersChange?: (filters: Record<string, string[]>) => void;
  currentTableFilters?: Record<string, string[]>;
  customers?: any[]; // Pass customers to calculate real counts
  onGroupsChange?: (groups: CustomerGroup[]) => void; // Callback when groups change
  // Export group filter handlers to parent
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
  products: ['Khóa học Marketing', 'Tư vấn SEO', 'Thiết kế Website', 'Quảng cáo Facebook'],
  quality: ['1', '2', '3', '4', '5']
};

// Simple Group Item Component without drag and drop for now to prevent errors
const GroupItem = ({ 
  group, 
  activeGroup, 
  onGroupChange, 
  onEditGroup, 
  onDeleteGroup
}: {
  group: CustomerGroup;
  activeGroup: string;
  onGroupChange: (groupId: string) => void;
  onEditGroup: (groupId: string) => void;
  onDeleteGroup: (groupId: string) => void;
}) => {
  return (
    <div className="flex items-center gap-1">
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

export function CustomerGroups({ activeGroup, onGroupChange, onFiltersChange, currentTableFilters, customers, onGroupsChange, onGroupFilterHandlers }: CustomerGroupsProps) {
  const [groups, setGroups] = useState<CustomerGroup[]>(mockGroups);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showEditGroup, setShowEditGroup] = useState<string | null>(null);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupFilters, setNewGroupFilters] = useState<CustomerGroupFilter[]>([]);
  
  // Add state for group-level filters
  const [showGroupFilterDialog, setShowGroupFilterDialog] = useState<string | null>(null);
  const [groupFilters, setGroupFilters] = useState<Record<string, CustomerGroupFilter[]>>({});
  const [newGroupLevelFilters, setNewGroupLevelFilters] = useState<CustomerGroupFilter[]>([]);

  // Helper function to check if filters are compatible
  const areFiltersCompatible = (baseFilters: CustomerGroupFilter[], additionalFilters: CustomerGroupFilter[]) => {
    for (const additionalFilter of additionalFilters) {
      const baseFilter = baseFilters.find(f => f.columnId === additionalFilter.columnId);
      if (baseFilter) {
        // Check if there's any overlap in values
        const hasOverlap = additionalFilter.values.some(value => baseFilter.values.includes(value));
        if (!hasOverlap) {
          return false; // No compatible values found
        }
      }
    }
    return true;
  };

  // Helper function to get filtered customers for a group
  const getFilteredCustomersForGroup = (group: CustomerGroup, customers: any[]) => {
    if (!customers) return [];
    
    // First apply base group filters
    let filteredCustomers = customers.filter((customer) => {
      return group.filters.every(filter => {
        const customerValue = customer[filter.columnId];
        return filter.values.includes(customerValue);
      });
    });

    // Then apply group-level additional filters if they exist
    const additionalFilters = groupFilters[group.id] || [];
    if (additionalFilters.length > 0) {
      // Check compatibility first
      if (!areFiltersCompatible(group.filters, additionalFilters)) {
        return []; // Return empty if filters are incompatible
      }
      
      filteredCustomers = filteredCustomers.filter((customer) => {
        return additionalFilters.every(filter => {
          const customerValue = customer[filter.columnId];
          return filter.values.includes(customerValue);
        });
      });
    }

    return filteredCustomers;
  };

  // Apply group filters when group changes
  const handleGroupChange = (groupId: string) => {
    onGroupChange(groupId);
    
    if (onFiltersChange && groupId !== 'main') {
      const group = groups.find(g => g.id === groupId);
      if (group) {
        const filters: Record<string, string[]> = {};
        
        // Add base group filters
        group.filters.forEach(filter => {
          filters[filter.columnId] = filter.values;
        });
        
        // Add group-level additional filters
        const additionalFilters = groupFilters[groupId] || [];
        additionalFilters.forEach(filter => {
          if (filters[filter.columnId]) {
            // Intersect values if the column already exists
            filters[filter.columnId] = filters[filter.columnId].filter(value => 
              filter.values.includes(value)
            );
          } else {
            filters[filter.columnId] = filter.values;
          }
        });
        
        onFiltersChange(filters);
      }
    } else if (onFiltersChange) {
      // Clear filters for main group, but still apply any group-level filters for main
      const additionalFilters = groupFilters['main'] || [];
      if (additionalFilters.length > 0) {
        const filters: Record<string, string[]> = {};
        additionalFilters.forEach(filter => {
          filters[filter.columnId] = filter.values;
        });
        onFiltersChange(filters);
      } else {
        onFiltersChange({});
      }
    }
  };

  // Handle group-level filter management
  const handleOpenGroupFilter = (groupId: string) => {
    setShowGroupFilterDialog(groupId);
    setNewGroupLevelFilters([...(groupFilters[groupId] || [])]);
  };

  const handleSaveGroupFilter = () => {
    if (!showGroupFilterDialog) return;
    
    setGroupFilters(prev => ({
      ...prev,
      [showGroupFilterDialog]: [...newGroupLevelFilters]
    }));
    
    // If this is the active group, update the applied filters
    if (activeGroup === showGroupFilterDialog) {
      handleGroupChange(activeGroup);
    }
    
    setShowGroupFilterDialog(null);
    setNewGroupLevelFilters([]);
  };

  const handleClearGroupFilter = () => {
    if (!showGroupFilterDialog) return;
    
    setGroupFilters(prev => {
      const updated = { ...prev };
      delete updated[showGroupFilterDialog];
      return updated;
    });
    
    // If this is the active group, update the applied filters
    if (activeGroup === showGroupFilterDialog) {
      handleGroupChange(activeGroup);
    }
    
    setShowGroupFilterDialog(null);
    setNewGroupLevelFilters([]);
  };

  const addGroupFilter = () => {
    setNewGroupLevelFilters([...newGroupLevelFilters, { 
      columnId: '', 
      columnName: '', 
      values: [] 
    }]);
  };

  const removeGroupFilter = (index: number) => {
    setNewGroupLevelFilters(newGroupLevelFilters.filter((_, i) => i !== index));
  };

  const updateGroupFilter = (index: number, updates: Partial<CustomerGroupFilter>) => {
    setNewGroupLevelFilters(newGroupLevelFilters.map((filter, i) => 
      i === index ? { ...filter, ...updates } : filter
    ));
  };

  const addGroupFilterValue = (index: number, value: string) => {
    if (!value.trim()) return;
    
    const filter = newGroupLevelFilters[index];
    if (!filter.values.includes(value.trim())) {
      updateGroupFilter(index, {
        values: [...filter.values, value.trim()]
      });
    }
  };

  const removeGroupFilterValue = (filterIndex: number, valueIndex: number) => {
    const filter = newGroupLevelFilters[filterIndex];
    updateGroupFilter(filterIndex, {
      values: filter.values.filter((_, i) => i !== valueIndex)
    });
  };

  const resetDialog = () => {
    setNewGroupName('');
    setNewGroupFilters([]);
    setShowCreateGroup(false);
    setShowEditGroup(null);
  };

  // Initialize new group with at least one filter ready
  const initializeNewGroup = () => {
    setShowCreateGroup(true);
    
    // Always start with one empty filter ready to be configured
    const initialFilters: CustomerGroupFilter[] = [
      { 
        columnId: '', 
        columnName: '', 
        values: [] 
      }
    ];
    
    // Initialize with current table filters if available
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
      
      // If we have table filters, use them, otherwise use empty filter
      setNewGroupFilters(tableBasedFilters.length > 0 ? tableBasedFilters : initialFilters);
    } else {
      // No table filters, start with empty filter
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
      count: 0, // This would be calculated based on actual data
      filters: newGroupFilters
    };

    setGroups([...groups, newGroup]);
    setNewGroupName('');
    setNewGroupFilters([]);
    setShowCreateGroup(false);
    
    // Switch to the new group
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
        ? { ...group, name: newGroupName.trim(), filters: newGroupFilters }
        : group
    ));

    // If editing the active group, update filters
    if (activeGroup === showEditGroup && onFiltersChange) {
      const filters: Record<string, string[]> = {};
      newGroupFilters.forEach(filter => {
        filters[filter.columnId] = filter.values;
      });
      onFiltersChange(filters);
    }

    setNewGroupName('');
    setNewGroupFilters([]);
    setShowEditGroup(null);
  };

  const handleDeleteGroup = (groupId: string) => {
    if (groupId === 'main') return; // Can't delete main group
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

  const addFilterValue = (index: number, value: string) => {
    if (!value.trim()) return;
    
    const filter = newGroupFilters[index];
    if (!filter.values.includes(value.trim())) {
      updateFilter(index, {
        values: [...filter.values, value.trim()]
      });
    }
  };

  const removeFilterValue = (filterIndex: number, valueIndex: number) => {
    const filter = newGroupFilters[filterIndex];
    updateFilter(filterIndex, {
      values: filter.values.filter((_, i) => i !== valueIndex)
    });
  };

  useEffect(() => {
    if (customers && customers.length > 0) {
      // Calculate real counts for each group without causing infinite loops
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
        
        // Only update if counts actually changed to prevent infinite loops
        const hasChanged = updatedGroups.some((group, index) => 
          group.count !== prevGroups[index]?.count
        );
        
        return hasChanged ? updatedGroups : prevGroups;
      });
    }
  }, [customers, groupFilters]); // Remove groups dependency to prevent circular updates

  useEffect(() => {
    if (onGroupsChange) {
      onGroupsChange(groups);
    }
  }, [groups]);

  useEffect(() => {
    if (onGroupFilterHandlers) {
      onGroupFilterHandlers({
        openGroupFilter: handleOpenGroupFilter,
        hasGroupFilter: (groupId: string) => !!groupFilters[groupId] && groupFilters[groupId].length > 0
      });
    }
  }, [groupFilters]);

  return (
    <div className="border-b border-border bg-muted/10">
      <div className="flex items-center gap-2 p-4 overflow-x-auto">
        {groups.map((group) => (
          <GroupItem
            key={group.id}
            group={group}
            activeGroup={activeGroup}
            onGroupChange={handleGroupChange}
            onEditGroup={handleEditGroup}
            onDeleteGroup={handleDeleteGroup}
          />
        ))}

          <Button
            variant="outline"
            size="sm"
            onClick={initializeNewGroup}
            className="flex items-center gap-2 whitespace-nowrap"
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
      </div>

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
                          values: [] // Reset values when changing column
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
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={resetDialog}>
                Hủy
              </Button>
              <Button
                type="button"
                onClick={showEditGroup ? handleUpdateGroup : handleCreateGroup}
                disabled={!newGroupName.trim()}
              >
                {showEditGroup ? 'Cập nhật' : 'Tạo nhóm'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Group Filter Dialog */}
      <Dialog open={showGroupFilterDialog !== null} onOpenChange={() => {
        setShowGroupFilterDialog(null);
        setNewGroupLevelFilters([]);
      }}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Bộ lọc tổng cho nhóm "{groups.find(g => g.id === showGroupFilterDialog)?.name}"
            </DialogTitle>
            <DialogDescription>
              Thêm bộ lọc bổ sung cho nhóm này. Bộ lọc sẽ áp dụng trên dữ liệu đã được lọc theo điều kiện gốc của nhóm.
              {showGroupFilterDialog && groups.find(g => g.id === showGroupFilterDialog)?.filters.length > 0 && (
                <div className="mt-2 p-3 bg-muted/50 rounded border">
                  <div className="text-sm font-medium mb-1">Điều kiện gốc của nhóm:</div>
                  <div className="text-sm text-muted-foreground">
                    {getFilterDescription(groups.find(g => g.id === showGroupFilterDialog)?.filters || [])}
                  </div>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Warning about compatibility */}
            {newGroupLevelFilters.length > 0 && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Filter className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-orange-800">
                    <div className="font-medium">Lưu ý về tương thích</div>
                    <div className="mt-1">
                      Nếu bộ lọc bổ sung không tương thích với điều kiện gốc, kết quả sẽ hiển thị "không có dữ liệu".
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Filters */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Bộ lọc bổ sung</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addGroupFilter}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Thêm bộ lọc
                </Button>
              </div>

              {newGroupLevelFilters.map((filter, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Bộ lọc {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeGroupFilter(index)}
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
                        updateGroupFilter(index, {
                          columnId: value,
                          columnName: column?.name || '',
                          values: [] // Reset values when changing column
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
                                  updateGroupFilter(index, {
                                    values: filter.values.filter(v => v !== value)
                                  });
                                } else {
                                  updateGroupFilter(index, {
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
                                  onClick={() => removeGroupFilterValue(index, valueIndex)}
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

              {newGroupLevelFilters.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Filter className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <div>Chưa có bộ lọc bổ sung nào</div>
                  <div className="text-xs mt-1">Nhấp "Thêm bộ lọc" để thêm điều kiện lọc cho nhóm này</div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              {groupFilters[showGroupFilterDialog!] && groupFilters[showGroupFilterDialog!].length > 0 && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleClearGroupFilter}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <FilterX className="h-4 w-4 mr-2" />
                  Xóa tất cả bộ lọc
                </Button>
              )}
              <Button type="button" variant="outline" onClick={() => {
                setShowGroupFilterDialog(null);
                setNewGroupLevelFilters([]);
              }}>
                Hủy
              </Button>
              <Button
                type="button"
                onClick={handleSaveGroupFilter}
              >
                Áp dụng
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DndProvider>
  );
}