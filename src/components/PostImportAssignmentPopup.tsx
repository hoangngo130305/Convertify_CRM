import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { 
  X, 
  Users, 
  ArrowRight,
  User,
  Target,
  Shuffle,
  ChevronDown,
  CheckCircle,
  RotateCcw,
  TrendingUp,
  Percent
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface PostImportAssignmentPopupProps {
  isOpen: boolean;
  onClose: () => void;
  importedCustomers: any[];
  onAssign: (assignments: AssignmentResult[]) => void;
}

interface AssignmentResult {
  customerId: string;
  customerName: string;
  assignmentType: 'sale' | 'group' | 'both';
  assignedSale?: string;
  assignedGroups?: string[];
}

interface AssignmentOption {
  id: string;
  type: 'sale' | 'group';
  name: string;
  description?: string;
  count?: number;
}

const SALES_OPTIONS: AssignmentOption[] = [
  { id: 'nguyen_van_a', type: 'sale', name: 'Nguyễn Văn A', description: 'Senior Sales' },
  { id: 'tran_thi_b', type: 'sale', name: 'Trần Thị B', description: 'Sales Manager' },
  { id: 'le_van_c', type: 'sale', name: 'Lê Văn C', description: 'Junior Sales' },
  { id: 'pham_thi_d', type: 'sale', name: 'Phạm Thị D', description: 'Senior Sales' },
  { id: 'chua_phan_bo', type: 'sale', name: 'Chưa phân bổ', description: 'Để trống sale' }
];

const GROUP_OPTIONS: AssignmentOption[] = [
  { id: 'group1', type: 'group', name: 'Khách hàng tiềm năng', description: 'Lead mới có tiềm năng cao', count: 12 },
  { id: 'group2', type: 'group', name: 'Thành công Q4', description: 'Khách hàng đã thành công trong Q4', count: 8 },
  { id: 'group3', type: 'group', name: 'Chưa phân bổ Sale', description: 'Khách hàng chưa có Sale phụ trách', count: 15 },
  { id: 'group4', type: 'group', name: 'VIP Premium', description: 'Khách hàng VIP cao cấp', count: 5 }
];

export function PostImportAssignmentPopup({ 
  isOpen, 
  onClose, 
  importedCustomers, 
  onAssign 
}: PostImportAssignmentPopupProps) {
  const [assignmentMode, setAssignmentMode] = useState<'manual' | 'automatic' | 'skip'>('manual');
  const [saleAssignment, setSaleAssignment] = useState({
    enabled: true,
    method: 'select' as 'select' | 'round-robin' | 'performance' | 'percentage',
    selectedSale: 'chua_phan_bo',
    // Performance-based assignment
    userPerformances: {} as Record<string, number>,
    // Percentage-based assignment  
    userPercentages: {} as Record<string, number>
  });
  const [groupAssignment, setGroupAssignment] = useState({
    enabled: false,
    selectedGroups: [] as string[]
  });

  if (!isOpen) return null;

  // Helper functions for distribution
  const handlePerformanceChange = (saleId: string, performance: number) => {
    setSaleAssignment(prev => ({
      ...prev,
      userPerformances: {
        ...prev.userPerformances,
        [saleId]: Math.max(0, Math.min(100, performance))
      }
    }));
  };

  const handlePercentageChange = (saleId: string, percentage: number) => {
    setSaleAssignment(prev => ({
      ...prev,
      userPercentages: {
        ...prev.userPercentages,
        [saleId]: Math.max(0, Math.min(100, percentage))
      }
    }));
  };

  const getTotalPercentage = () => {
    const activeSales = SALES_OPTIONS.filter(s => s.id !== 'chua_phan_bo');
    return activeSales.reduce((sum, sale) => {
      return sum + (saleAssignment.userPercentages[sale.id] || 0);
    }, 0);
  };

  const initializeEqualPercentages = () => {
    const activeSales = SALES_OPTIONS.filter(s => s.id !== 'chua_phan_bo');
    const equalPercentage = Math.floor(100 / activeSales.length);
    const remainder = 100 - (equalPercentage * activeSales.length);
    
    const newPercentages: Record<string, number> = {};
    activeSales.forEach((sale, index) => {
      newPercentages[sale.id] = equalPercentage + (index === 0 ? remainder : 0);
    });
    
    setSaleAssignment(prev => ({
      ...prev,
      userPercentages: newPercentages
    }));
  };

  const initializeDefaultPerformances = () => {
    const activeSales = SALES_OPTIONS.filter(s => s.id !== 'chua_phan_bo');
    const newPerformances: Record<string, number> = {};
    activeSales.forEach(sale => {
      newPerformances[sale.id] = 50; // Default performance score
    });
    
    setSaleAssignment(prev => ({
      ...prev,
      userPerformances: newPerformances
    }));
  };

  const handleSkipAssignment = () => {
    onClose();
  };

  const handleAutoAssignment = () => {
    const assignments: AssignmentResult[] = [];
    const salesList = SALES_OPTIONS.filter(s => s.id !== 'chua_phan_bo');
    
    // Validate percentage allocation if percentage method is selected
    if (saleAssignment.method === 'percentage') {
      const totalPercentage = getTotalPercentage();
      if (Math.abs(totalPercentage - 100) > 0.1) {
        alert('⚠️ Tổng tỉ lệ phân bổ phải bằng 100%!');
        return;
      }
    }
    
    importedCustomers.forEach((customer, index) => {
      const assignment: AssignmentResult = {
        customerId: customer.id,
        customerName: customer.name,
        assignmentType: 'both'
      };

      // Auto assign sale using different methods
      if (saleAssignment.enabled) {
        let assignedSaleName = 'Chưa phân bổ';
        
        if (saleAssignment.method === 'round-robin') {
          // Round robin assignment
          const saleIndex = index % salesList.length;
          assignedSaleName = salesList[saleIndex].name;
        } else if (saleAssignment.method === 'performance') {
          // Performance-based assignment (weighted distribution)
          const totalPerformance = salesList.reduce((sum, sale) => {
            return sum + (saleAssignment.userPerformances[sale.id] || 50);
          }, 0);
          
          let random = Math.random() * totalPerformance;
          for (const sale of salesList) {
            const performance = saleAssignment.userPerformances[sale.id] || 50;
            random -= performance;
            if (random <= 0) {
              assignedSaleName = sale.name;
              break;
            }
          }
        } else if (saleAssignment.method === 'percentage') {
          // Percentage-based assignment
          let random = Math.random() * 100;
          for (const sale of salesList) {
            const percentage = saleAssignment.userPercentages[sale.id] || 0;
            random -= percentage;
            if (random <= 0) {
              assignedSaleName = sale.name;
              break;
            }
          }
        } else {
          // Specific sale selection
          assignedSaleName = SALES_OPTIONS.find(s => s.id === saleAssignment.selectedSale)?.name || 'Chưa phân bổ';
        }
        
        assignment.assignedSale = assignedSaleName;
      }

      // Auto assign groups
      if (groupAssignment.enabled && groupAssignment.selectedGroups.length > 0) {
        assignment.assignedGroups = groupAssignment.selectedGroups;
      }

      assignments.push(assignment);
    });

    onAssign(assignments);
    onClose();
  };

  const handleManualAssignment = () => {
    // For manual mode, we create basic assignments based on current settings
    const assignments: AssignmentResult[] = importedCustomers.map(customer => ({
      customerId: customer.id,
      customerName: customer.name,
      assignmentType: 'both',
      assignedSale: saleAssignment.enabled ? 
        (SALES_OPTIONS.find(s => s.id === saleAssignment.selectedSale)?.name || 'Chưa phân bổ') : 
        undefined,
      assignedGroups: groupAssignment.enabled ? groupAssignment.selectedGroups : undefined
    }));

    onAssign(assignments);
    onClose();
  };

  const toggleGroupSelection = (groupId: string) => {
    setGroupAssignment(prev => ({
      ...prev,
      selectedGroups: prev.selectedGroups.includes(groupId)
        ? prev.selectedGroups.filter(id => id !== groupId)
        : [...prev.selectedGroups, groupId]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h1 className="text-lg font-medium">Phân bổ khách hàng</h1>
            <p className="text-sm text-muted-foreground">
              Bạn có muốn phân bổ {importedCustomers.length} khách hàng vừa import không?
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Assignment Mode Selection */}
          <div>
            <Label className="text-base font-medium mb-4 block">Chọn phương thức phân bổ</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card 
                className={`p-4 cursor-pointer border-2 transition-colors ${
                  assignmentMode === 'manual' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setAssignmentMode('manual')}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">Thủ công</div>
                    <div className="text-sm text-muted-foreground">Chọn sale/nhóm cụ thể</div>
                  </div>
                </div>
              </Card>

              <Card 
                className={`p-4 cursor-pointer border-2 transition-colors ${
                  assignmentMode === 'automatic' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setAssignmentMode('automatic')}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Shuffle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium">Tự động</div>
                    <div className="text-sm text-muted-foreground">Phân bổ đều theo tỉ lệ</div>
                  </div>
                </div>
              </Card>

              <Card 
                className={`p-4 cursor-pointer border-2 transition-colors ${
                  assignmentMode === 'skip' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setAssignmentMode('skip')}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <ArrowRight className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-medium">Bỏ qua</div>
                    <div className="text-sm text-muted-foreground">Phân bổ sau</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {assignmentMode !== 'skip' && (
            <>
              {/* Sale Assignment */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Checkbox 
                    id="sale-assignment"
                    checked={saleAssignment.enabled}
                    onCheckedChange={(checked) => 
                      setSaleAssignment(prev => ({ ...prev, enabled: !!checked }))
                    }
                  />
                  <Label htmlFor="sale-assignment" className="text-base font-medium">
                    Phân bổ Sale phụ trách
                  </Label>
                </div>

                {saleAssignment.enabled && (
                  <div className="ml-6 space-y-4">
                    {assignmentMode === 'automatic' && (
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Phương thức phân bổ</Label>
                        <Select
                          value={saleAssignment.method}
                          onValueChange={(value: 'select' | 'round-robin' | 'performance' | 'percentage') => {
                            setSaleAssignment(prev => ({ ...prev, method: value }));
                            // Initialize default values when switching methods
                            if (value === 'percentage') {
                              initializeEqualPercentages();
                            } else if (value === 'performance') {
                              initializeDefaultPerformances();
                            }
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="round-robin">Phân bổ đều (Round Robin)</SelectItem>
                            <SelectItem value="select">Chỉ định Sale cụ thể</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {(assignmentMode === 'manual' || saleAssignment.method === 'select') && (
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Chọn Sale</Label>
                        <Select
                          value={saleAssignment.selectedSale}
                          onValueChange={(value) => 
                            setSaleAssignment(prev => ({ ...prev, selectedSale: value }))
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {SALES_OPTIONS.map(sale => (
                              <SelectItem key={sale.id} value={sale.id}>
                                <div className="flex items-center gap-2">
                                  <span>{sale.name}</span>
                                  {sale.description && (
                                    <span className="text-xs text-muted-foreground">
                                      ({sale.description})
                                    </span>
                                  )}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Group Assignment */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Checkbox 
                    id="group-assignment"
                    checked={groupAssignment.enabled}
                    onCheckedChange={(checked) => 
                      setGroupAssignment(prev => ({ ...prev, enabled: !!checked }))
                    }
                  />
                  <Label htmlFor="group-assignment" className="text-base font-medium">
                    Thêm vào nhóm khách hàng
                  </Label>
                </div>

                {groupAssignment.enabled && (
                  <div className="ml-6">
                    <Label className="text-sm font-medium mb-3 block">Chọn nhóm (có thể chọn nhiều)</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {GROUP_OPTIONS.map(group => (
                        <Card
                          key={group.id}
                          className={`p-3 cursor-pointer border transition-colors ${
                            groupAssignment.selectedGroups.includes(group.id)
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          }`}
                          onClick={() => toggleGroupSelection(group.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="font-medium text-sm">{group.name}</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {group.description}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {group.count && (
                                <Badge variant="secondary" className="text-xs">
                                  {group.count}
                                </Badge>
                              )}
                              {groupAssignment.selectedGroups.includes(group.id) && (
                                <CheckCircle className="h-4 w-4 text-primary" />
                              )}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Preview */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-medium mb-3">Xem trước phân bổ</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Số khách hàng sẽ được phân bổ:</span>
                    <Badge variant="default">{importedCustomers.length}</Badge>
                  </div>
                  
                  {saleAssignment.enabled && (
                    <div className="flex items-center justify-between">
                      <span>Sale phụ trách:</span>
                      <span className="font-medium">
                        {assignmentMode === 'automatic' && saleAssignment.method === 'round-robin' 
                          ? 'Phân bổ đều cho tất cả Sale'
                          : SALES_OPTIONS.find(s => s.id === saleAssignment.selectedSale)?.name
                        }
                      </span>
                    </div>
                  )}
                  
                  {groupAssignment.enabled && groupAssignment.selectedGroups.length > 0 && (
                    <div className="flex items-center justify-between">
                      <span>Nhóm khách hàng:</span>
                      <div className="flex gap-1">
                        {groupAssignment.selectedGroups.map(groupId => (
                          <Badge key={groupId} variant="secondary" className="text-xs">
                            {GROUP_OPTIONS.find(g => g.id === groupId)?.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-muted/20">
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>

          <div className="flex gap-2">
            {assignmentMode === 'skip' ? (
              <Button onClick={handleSkipAssignment}>
                Bỏ qua phân bổ
              </Button>
            ) : (
              <Button 
                onClick={assignmentMode === 'automatic' ? handleAutoAssignment : handleManualAssignment}
                className="bg-primary hover:bg-primary/90"
              >
                {assignmentMode === 'automatic' ? 'Phân bổ tự động' : 'Áp dụng phân bổ'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}