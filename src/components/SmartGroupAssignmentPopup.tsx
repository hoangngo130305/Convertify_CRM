import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { 
  X, 
  Plus, 
  Settings, 
  FolderOpen, 
  ChevronDown, 
  ChevronRight,
  Trash2,
  Save,
  Play,
  AlertCircle,
  Check
} from 'lucide-react';
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from './ui/tabs';

interface FilterRule {
  id: string;
  columnId: string;
  columnName: string;
  operator: 'equals' | 'contains' | 'not_equals' | 'in';
  values: string[];
}

interface GroupRule {
  id: string;
  name: string;
  targetGroupIds: string[];
  filters: FilterRule[];
  enabled: boolean;
  priority: number;
}

interface SmartGroupAssignmentProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCustomers: any[];
  availableGroups: { id: string; name: string; }[];
  onApply: (rules: GroupRule[], selectedGroupIds: string[]) => void;
}

// Available filter options for each column
const filterOptions = {
  status: ['Mới', 'Đang xử lý', 'Thành công', 'Thất bại', 'Lạnh'],
  source: ['Facebook', 'Google', 'TikTok', 'Zalo', 'Hotline', 'Website', 'Giới thiệu'],
  assignedSale: ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D', 'Chưa phân bổ'],
  products: ['Website Design', 'SEO Service', 'Digital Marketing', 'E-commerce', 'Mobile App', 'Branding'],
};

const availableColumns = [
  { id: 'status', name: 'Trạng thái' },
  { id: 'source', name: 'Nguồn Data' },
  { id: 'assignedSale', name: 'Sale phụ trách' },
  { id: 'products', name: 'Sản phẩm/Dịch vụ' },
  { id: 'quality', name: 'Chất lượng' },
];

// Predefined smart rules
const predefinedRules: GroupRule[] = [
  {
    id: 'rule-hot-leads',
    name: 'Lead nóng Facebook + Mới',
    targetGroupIds: ['group1'],
    filters: [
      {
        id: 'f1',
        columnId: 'status',
        columnName: 'Trạng thái',
        operator: 'equals',
        values: ['Mới']
      },
      {
        id: 'f2',
        columnId: 'source',
        columnName: 'Nguồn Data',
        operator: 'equals',
        values: ['Facebook']
      }
    ],
    enabled: true,
    priority: 1
  },
  {
    id: 'rule-google-processing',
    name: 'Google đang xử lý',
    targetGroupIds: ['group1'],
    filters: [
      {
        id: 'f3',
        columnId: 'status',
        columnName: 'Trạng thái',
        operator: 'equals',
        values: ['Đang xử lý']
      },
      {
        id: 'f4',
        columnId: 'source',
        columnName: 'Nguồn Data',
        operator: 'equals',
        values: ['Google']
      }
    ],
    enabled: true,
    priority: 2
  },
  {
    id: 'rule-successful',
    name: 'Khách hàng thành công',
    targetGroupIds: ['group2'],
    filters: [
      {
        id: 'f5',
        columnId: 'status',
        columnName: 'Trạng thái',
        operator: 'equals',
        values: ['Thành công']
      }
    ],
    enabled: true,
    priority: 3
  },
  {
    id: 'rule-unassigned',
    name: 'Chưa phân bổ Sale',
    targetGroupIds: ['group3'],
    filters: [
      {
        id: 'f6',
        columnId: 'assignedSale',
        columnName: 'Sale phụ trách',
        operator: 'equals',
        values: ['Chưa phân bổ']
      }
    ],
    enabled: true,
    priority: 4
  }
];

export function SmartGroupAssignmentPopup({ 
  isOpen, 
  onClose, 
  selectedCustomers, 
  availableGroups,
  onApply 
}: SmartGroupAssignmentProps) {
  const [activeTab, setActiveTab] = useState<'simple' | 'smart'>('simple');
  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([]);
  const [smartRules, setSmartRules] = useState<GroupRule[]>(predefinedRules);
  const [newRule, setNewRule] = useState<GroupRule | null>(null);
  const [previewResults, setPreviewResults] = useState<{ [ruleId: string]: any[] }>({});

  // Simple multi-group selection
  const handleGroupToggle = (groupId: string) => {
    setSelectedGroupIds(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  // Smart rules management
  const addNewRule = () => {
    const newRuleTemplate: GroupRule = {
      id: `rule-${Date.now()}`,
      name: 'Rule mới',
      targetGroupIds: [],
      filters: [],
      enabled: true,
      priority: smartRules.length + 1
    };
    setNewRule(newRuleTemplate);
  };

  const saveNewRule = () => {
    if (newRule && newRule.filters.length > 0 && newRule.targetGroupIds.length > 0) {
      setSmartRules(prev => [...prev, newRule]);
      setNewRule(null);
    }
  };

  const deleteRule = (ruleId: string) => {
    setSmartRules(prev => prev.filter(rule => rule.id !== ruleId));
  };

  const toggleRule = (ruleId: string) => {
    setSmartRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const addFilterToNewRule = () => {
    if (!newRule) return;
    
    const newFilter: FilterRule = {
      id: `filter-${Date.now()}`,
      columnId: 'status',
      columnName: 'Trạng thái',
      operator: 'equals',
      values: []
    };
    
    setNewRule(prev => ({
      ...prev!,
      filters: [...prev!.filters, newFilter]
    }));
  };

  const updateFilterInNewRule = (filterId: string, updates: Partial<FilterRule>) => {
    if (!newRule) return;
    
    setNewRule(prev => ({
      ...prev!,
      filters: prev!.filters.map(filter => 
        filter.id === filterId ? { ...filter, ...updates } : filter
      )
    }));
  };

  const removeFilterFromNewRule = (filterId: string) => {
    if (!newRule) return;
    
    setNewRule(prev => ({
      ...prev!,
      filters: prev!.filters.filter(filter => filter.id !== filterId)
    }));
  };

  // Preview logic - check which customers match each rule
  const previewRule = (rule: GroupRule) => {
    const matchingCustomers = selectedCustomers.filter(customer => {
      // All filters must match (AND logic)
      return rule.filters.every(filter => {
        const customerValue = customer[filter.columnId];
        
        switch (filter.operator) {
          case 'equals':
            if (Array.isArray(customerValue)) {
              return filter.values.some(val => customerValue.includes(val));
            }
            return filter.values.includes(String(customerValue));
          case 'contains':
            return filter.values.some(val => 
              String(customerValue).toLowerCase().includes(val.toLowerCase())
            );
          case 'not_equals':
            return !filter.values.includes(String(customerValue));
          case 'in':
            return filter.values.includes(String(customerValue));
          default:
            return false;
        }
      });
    });
    
    setPreviewResults(prev => ({
      ...prev,
      [rule.id]: matchingCustomers
    }));
  };

  // Apply rules to customers
  const applySmartRules = () => {
    const enabledRules = smartRules.filter(rule => rule.enabled);
    enabledRules.forEach(rule => previewRule(rule));
    
    // Apply the rules
    onApply(enabledRules, []);
    onClose();
  };

  const applySimpleGrouping = () => {
    onApply([], selectedGroupIds);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] w-[95vw] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5" />
            Phân nhóm thông minh ({selectedCustomers.length} khách hàng)
          </DialogTitle>
          <DialogDescription>
            Chọn nhiều group cùng lúc hoặc sử dụng rules với logic AND để tự động phân nhóm khách hàng theo điều kiện phức tạp
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)} className="flex-1 flex flex-col min-h-0">
          <TabsList className="grid w-full grid-cols-2 flex-shrink-0">
            <TabsTrigger value="simple" className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4" />
              Chọn group
            </TabsTrigger>
            <TabsTrigger value="smart" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Phân nhóm thông minh
            </TabsTrigger>
          </TabsList>

          {/* Simple Multi-Group Selection */}
          <TabsContent value="simple" className="flex-1 overflow-y-auto min-h-0 mt-4">
            <div className="space-y-4 pb-4">
              <div className="text-sm text-muted-foreground">
                Chọn một hoặc nhiều group để chuyển {selectedCustomers.length} khách hàng vào
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {availableGroups
                  .filter(group => group.id !== 'main')
                  .map(group => (
                  <Card 
                    key={group.id} 
                    className={`cursor-pointer transition-colors ${
                      selectedGroupIds.includes(group.id) 
                        ? 'border-primary bg-primary/5' 
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => handleGroupToggle(group.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Checkbox 
                          checked={selectedGroupIds.includes(group.id)}
                          onChange={() => {}}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{group.name}</div>
                          <div className="text-sm text-muted-foreground truncate">
                            Group ID: {group.id}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {selectedGroupIds.length > 0 && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="font-medium text-blue-900 mb-2">
                    Sẽ chuyển vào {selectedGroupIds.length} group:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedGroupIds.map(groupId => {
                      const group = availableGroups.find(g => g.id === groupId);
                      return (
                        <Badge key={groupId} variant="outline" className="bg-white">
                          {group?.name}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Smart Rules */}
          <TabsContent value="smart" className="flex-1 overflow-y-auto min-h-0 mt-4">
            <div className="space-y-4 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="font-medium">Rules phân nhóm tự động</div>
                  <div className="text-sm text-muted-foreground">
                    Thiết lập điều kiện AND để tự động phân nhóm khách hàng
                  </div>
                </div>
                <Button size="sm" onClick={addNewRule} className="self-start sm:self-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm rule
                </Button>
              </div>

              {/* Existing Rules */}
              <div className="space-y-3">
                {smartRules.map((rule) => (
                  <Card key={rule.id} className={rule.enabled ? '' : 'opacity-60'}>
                    <CardHeader className="pb-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <Checkbox 
                            checked={rule.enabled}
                            onCheckedChange={() => toggleRule(rule.id)}
                            className="flex-shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <CardTitle className="text-base truncate">{rule.name}</CardTitle>
                            <div className="text-sm text-muted-foreground truncate">
                              Priority: {rule.priority} | 
                              Target: {rule.targetGroupIds.map(id => 
                                availableGroups.find(g => g.id === id)?.name
                              ).join(', ')}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => previewRule(rule)}
                          >
                            <Play className="h-4 w-4 mr-1" />
                            <span className="hidden sm:inline">Preview</span>
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => deleteRule(rule.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Điều kiện (AND):</div>
                        <div className="space-y-1">
                          {rule.filters.map((filter, index) => (
                            <div key={filter.id} className="flex items-center gap-2 text-sm flex-wrap">
                              {index > 0 && <span className="text-blue-600 font-medium">AND</span>}
                              <Badge variant="outline" className="flex-shrink-0">
                                {filter.columnName} {filter.operator === 'equals' ? '=' : filter.operator} {filter.values.join(', ')}
                              </Badge>
                            </div>
                          ))}
                        </div>

                        {/* Preview Results */}
                        {previewResults[rule.id] && (
                          <div className="mt-3 p-3 bg-green-50 rounded-lg">
                            <div className="text-sm font-medium text-green-800">
                              <Check className="h-4 w-4 inline mr-1" />
                              Khớp với {previewResults[rule.id].length} khách hàng
                            </div>
                            {previewResults[rule.id].length > 0 && (
                              <div className="text-xs text-green-700 mt-1 break-words">
                                {previewResults[rule.id].slice(0, 3).map(c => c.name).join(', ')}
                                {previewResults[rule.id].length > 3 && ` và ${previewResults[rule.id].length - 3} khách hàng khác`}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* New Rule Creator */}
              {newRule && (
                <Card className="border-dashed border-2 border-primary">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <Input 
                        value={newRule.name}
                        onChange={(e) => setNewRule(prev => ({ ...prev!, name: e.target.value }))}
                        placeholder="Tên rule..."
                        className="text-base font-medium flex-1"
                      />
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Button size="sm" onClick={saveNewRule} disabled={newRule.filters.length === 0 || newRule.targetGroupIds.length === 0}>
                          <Save className="h-4 w-4 mr-1" />
                          Lưu
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setNewRule(null)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Target Groups */}
                    <div>
                      <div className="text-sm font-medium mb-2">Chuyển vào group:</div>
                      <div className="flex flex-wrap gap-2">
                        {availableGroups
                          .filter(group => group.id !== 'main')
                          .map(group => (
                          <Badge 
                            key={group.id}
                            variant={newRule.targetGroupIds.includes(group.id) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => {
                              setNewRule(prev => ({
                                ...prev!,
                                targetGroupIds: prev!.targetGroupIds.includes(group.id)
                                  ? prev!.targetGroupIds.filter(id => id !== group.id)
                                  : [...prev!.targetGroupIds, group.id]
                              }));
                            }}
                          >
                            {group.name}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Filters */}
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                        <div className="text-sm font-medium">Điều kiện (AND):</div>
                        <Button size="sm" variant="outline" onClick={addFilterToNewRule}>
                          <Plus className="h-4 w-4 mr-1" />
                          Thêm điều kiện
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        {newRule.filters.map((filter, index) => (
                          <div key={filter.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 p-3 border rounded-lg">
                            <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
                              {index > 0 && <Badge variant="outline" className="bg-blue-50 hidden sm:inline-flex">AND</Badge>}
                              
                              <Select 
                                value={filter.columnId}
                                onValueChange={(value) => {
                                  const column = availableColumns.find(col => col.id === value);
                                  updateFilterInNewRule(filter.id, { 
                                    columnId: value, 
                                    columnName: column?.name || value,
                                    values: [] // Reset values when column changes
                                  });
                                }}
                              >
                                <SelectTrigger className="w-full sm:w-40">
                                  <SelectValue placeholder="Chọn cột" />
                                </SelectTrigger>
                                <SelectContent>
                                  {availableColumns.map(col => (
                                    <SelectItem key={col.id} value={col.id}>
                                      {col.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>

                              <Select 
                                value={filter.operator}
                                onValueChange={(value: any) => updateFilterInNewRule(filter.id, { operator: value })}
                              >
                                <SelectTrigger className="w-full sm:w-24">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="equals">=</SelectItem>
                                  <SelectItem value="contains">chứa</SelectItem>
                                  <SelectItem value="not_equals">≠</SelectItem>
                                </SelectContent>
                              </Select>

                              <Select 
                                value={filter.values[0] || ''}
                                onValueChange={(value) => updateFilterInNewRule(filter.id, { values: [value] })}
                              >
                                <SelectTrigger className="flex-1 min-w-0">
                                  <SelectValue placeholder="Chọn giá trị" />
                                </SelectTrigger>
                                <SelectContent>
                                  {(filterOptions[filter.columnId as keyof typeof filterOptions] || []).map(option => (
                                    <SelectItem key={option} value={option}>
                                      {option}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>

                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => removeFilterFromNewRule(filter.id)}
                                className="flex-shrink-0"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t gap-3 flex-shrink-0">
          <div className="text-sm text-muted-foreground">
            {activeTab === 'simple' 
              ? `Chọn ${selectedGroupIds.length} group` 
              : `${smartRules.filter(r => r.enabled).length} rule được bật`
            }
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" onClick={onClose} className="flex-1 sm:flex-initial">
              Hủy
            </Button>
            <Button 
              onClick={activeTab === 'simple' ? applySimpleGrouping : applySmartRules}
              disabled={activeTab === 'simple' ? selectedGroupIds.length === 0 : smartRules.filter(r => r.enabled).length === 0}
              className="flex-1 sm:flex-initial"
            >
              {activeTab === 'simple' ? 'Chuyển vào group' : 'Áp dụng rules'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}