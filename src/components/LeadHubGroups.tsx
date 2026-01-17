import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Plus, MoreVertical, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface LeadGroupFilter {
  columnId: string;
  columnName: string;
  values: string[];
}

interface LeadGroup {
  id: string;
  name: string;
  count: number;
  filters: LeadGroupFilter[];
  memberIds?: string[];
}

interface LeadHubGroupsProps {
  groups: LeadGroup[];
  activeGroup: string;
  onGroupChange: (groupId: string) => void;
  onFiltersChange?: (filters: Record<string, string[]>) => void;
  onHandlersReady?: (handlers: any) => void;
}

export function LeadHubGroups({ 
  groups, 
  activeGroup, 
  onGroupChange, 
  onFiltersChange,
  onHandlersReady 
}: LeadHubGroupsProps) {
  const [localGroups, setLocalGroups] = useState<LeadGroup[]>(groups);

  // Sync with parent groups
  useEffect(() => {
    setLocalGroups(groups);
  }, [groups]);

  // Apply group filters when group changes
  const handleGroupChange = (groupId: string) => {
    onGroupChange(groupId);
    
    if (onFiltersChange && groupId !== 'main') {
      const group = localGroups.find(g => g.id === groupId);
      if (group) {
        const filters: Record<string, string[]> = {};
        
        // Add base group filters
        group.filters.forEach(filter => {
          filters[filter.columnId] = filter.values;
        });
        
        onFiltersChange(filters);
      }
    } else if (onFiltersChange) {
      onFiltersChange({});
    }
  };

  const handleCreateGroup = () => {
    console.log('Create new group');
    // This would open a create dialog
  };

  const handleEditGroup = (groupId: string) => {
    console.log('Edit group:', groupId);
    // This would open an edit dialog
  };

  const handleDeleteGroup = (groupId: string) => {
    if (groupId === 'main') return; // Can't delete main group
    
    if (confirm('Bạn có chắc chắn muốn xóa nhóm này?')) {
      const updatedGroups = localGroups.filter(g => g.id !== groupId);
      setLocalGroups(updatedGroups);
      
      if (activeGroup === groupId) {
        handleGroupChange('main');
      }
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="font-medium">Phân loại Lead</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCreateGroup}
            className="h-8 w-8 p-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Groups List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-1">
          {localGroups.map((group) => (
            <div key={group.id} className="relative group">
              <Button
                variant={activeGroup === group.id ? "default" : "ghost"}
                onClick={() => handleGroupChange(group.id)}
                className={`w-full justify-start text-left h-auto py-3 px-3 transition-all duration-200 ${
                  activeGroup === group.id 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{group.name}</div>
                    {group.filters.length > 0 && (
                      <div className={`text-xs truncate ${
                        activeGroup === group.id 
                          ? "text-primary-foreground/70" 
                          : "text-muted-foreground"
                      }`}>
                        {group.filters.length} bộ lọc
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-2">
                    <Badge 
                      variant={activeGroup === group.id ? "secondary" : "secondary"} 
                      className={`text-xs ${
                        activeGroup === group.id 
                          ? "bg-primary-foreground/20 text-primary-foreground" 
                          : ""
                      }`}
                    >
                      {group.count}
                    </Badge>
                    
                    {group.id !== 'main' && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className={`h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity ${
                              activeGroup === group.id
                                ? "text-primary-foreground hover:bg-primary-foreground/20"
                                : ""
                            }`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditGroup(group.id)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteGroup(group.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Xóa nhóm
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </div>
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer - Create New Group */}
      <div className="p-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCreateGroup}
          className="w-full justify-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Tạo nhóm mới
        </Button>
      </div>
    </div>
  );
}