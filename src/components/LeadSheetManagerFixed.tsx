import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Textarea } from './ui/textarea';
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
import { Plus, MoreVertical, Edit, Trash2, Layers, ChevronUp, ChevronDown, Info } from 'lucide-react';

interface LeadSheet {
  id: string;
  name: string;
  count: number;
  defaultProduct: string;
  distributionRule: string;
  distributionAlgorithm: string;
  assignedUsers: string[];
  order?: number;
  description?: string;
  createdAt: Date;
  createdBy: string;
  // Distribution allocation settings
  distributionMethod?: 'round-robin' | 'performance' | 'percentage';
  userPerformances?: Record<string, number>;
  userPercentages?: Record<string, number>;
}

interface LeadSheetManagerProps {
  activeSheet: string;
  onSheetChange: (sheetId: string) => void;
  customers?: any[];
  onSheetsChange?: (sheets: LeadSheet[]) => void;
}

// Mock users data - this would normally come from account settings
const mockUsers = [
  { id: 'user1', name: 'Nguyễn Văn A', email: 'nguyenvana@company.com', role: 'Sale Manager' },
  { id: 'user2', name: 'Trần Thị B', email: 'tranthib@company.com', role: 'Sales Representative' },
  { id: 'user3', name: 'Lê Văn C', email: 'levanc@company.com', role: 'Sales Representative' },
  { id: 'user4', name: 'Phạm Thị D', email: 'phamthid@company.com', role: 'Sales Representative' },
  { id: 'user5', name: 'Hoàng Văn E', email: 'hoangvane@company.com', role: 'Sales Supervisor' },
];

// Default products/services
const defaultProducts = [
  'Website Design',
  'SEO Service', 
  'Digital Marketing',
  'E-commerce',
  'Mobile App',
  'Branding',
  'Content Marketing',
  'Social Media Marketing'
];

// Distribution algorithms
const distributionAlgorithms = [
  { id: 'round-robin', name: 'Round Robin', description: 'Phân bổ tuần tự theo thứ tự' },
  { id: 'weighted', name: 'Weighted', description: 'Phân bổ theo trọng số' },
  { id: 'random', name: 'Random', description: 'Phân bổ ngẫu nhiên' },
  { id: 'skill-based', name: 'Skill-based', description: 'Phân bổ theo kỹ năng' },
  { id: 'workload', name: 'Workload', description: 'Phân bổ theo khối lượng công việc' }
];

// Distribution rules
const distributionRules = [
  { id: 'auto', name: 'Tự động', description: 'Phân bổ tự động khi có lead mới' },
  { id: 'manual', name: 'Thủ công', description: 'Yêu cầu phê duyệt thủ công' },
  { id: 'hybrid', name: 'Kết hợp', description: 'Tự động với điều kiện, thủ công khi cần' }
];

const mockSheets: LeadSheet[] = [
  {
    id: 'main',
    name: 'Tất cả Leads',
    count: 50,
    defaultProduct: '',
    distributionRule: 'manual',
    distributionAlgorithm: 'round-robin',
    assignedUsers: [],
    order: 0,
    description: 'Sheet tổng quan chứa toàn bộ leads',
    createdAt: new Date(2024, 0, 1),
    createdBy: 'system'
  },
  {
    id: 'sheet1',
    name: 'Digital Marketing',
    count: 15,
    defaultProduct: 'Digital Marketing',
    distributionRule: 'auto',
    distributionAlgorithm: 'round-robin',
    assignedUsers: ['user1', 'user2', 'user3'],
    order: 1,
    description: 'Leads quan tâm đến dịch vụ Digital Marketing',
    createdAt: new Date(2024, 1, 15),
    createdBy: 'user1'
  },
  {
    id: 'sheet2',
    name: 'Website & SEO',
    count: 20,
    defaultProduct: 'Website Design',
    distributionRule: 'hybrid',
    distributionAlgorithm: 'skill-based',
    assignedUsers: ['user2', 'user4', 'user5'],
    order: 2,
    description: 'Leads có nhu cầu thiết kế website và SEO',
    createdAt: new Date(2024, 2, 10),
    createdBy: 'user2'
  },
  {
    id: 'sheet3',
    name: 'Enterprise Clients',
    count: 8,
    defaultProduct: 'E-commerce',
    distributionRule: 'manual',
    distributionAlgorithm: 'weighted',
    assignedUsers: ['user1', 'user5'],
    order: 3,
    description: 'Khách hàng doanh nghiệp lớn',
    createdAt: new Date(2024, 3, 5),
    createdBy: 'user5'
  }
];

// Simple Sheet Item Component (without drag & drop)
const SheetItem = ({ 
  sheet, 
  index, 
  activeSheet, 
  onSheetChange, 
  onEditSheet, 
  onDeleteSheet,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast
}: {
  sheet: LeadSheet;
  index: number;
  activeSheet: string;
  onSheetChange: (sheetId: string) => void;
  onEditSheet: (sheetId: string) => void;
  onDeleteSheet: (sheetId: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  isFirst: boolean;
  isLast: boolean;
}) => {
  const canReorder = sheet.id !== 'main';

  return (
    <div className="flex items-center gap-1">
      {/* Reorder buttons */}
      {canReorder && (
        <div className="flex flex-col">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMoveUp(index)}
            disabled={isFirst}
            className="h-4 w-4 p-0 hover:bg-muted"
          >
            <ChevronUp className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMoveDown(index)}
            disabled={isLast}
            className="h-4 w-4 p-0 hover:bg-muted"
          >
            <ChevronDown className="h-3 w-3" />
          </Button>
        </div>
      )}
      
      <Button
        variant={activeSheet === sheet.id ? "default" : "outline"}
        size="sm"
        onClick={() => onSheetChange(sheet.id)}
        className="flex items-center gap-2 whitespace-nowrap"
      >
        <Layers className="h-4 w-4" />
        {sheet.name}
        <Badge variant="secondary" className="ml-1">
          {sheet.count}
        </Badge>
      </Button>
      
      {sheet.id !== 'main' && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEditSheet(sheet.id)}>
              <Edit className="h-4 w-4 mr-2" />
              Chỉnh sửa sheet
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onDeleteSheet(sheet.id)}
              className="text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Xóa sheet
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export function LeadSheetManagerFixed({ activeSheet, onSheetChange, customers, onSheetsChange }: LeadSheetManagerProps) {
  const [sheets, setSheets] = useState<LeadSheet[]>(mockSheets);
  const [showCreateSheet, setShowCreateSheet] = useState(false);
  const [showEditSheet, setShowEditSheet] = useState<string | null>(null);
  
  // New sheet form state - simplified to only 2 fields for create
  const [newSheetName, setNewSheetName] = useState('');
  const [newDefaultProduct, setNewDefaultProduct] = useState('');
  
  // Additional fields for edit mode
  const [newSheetDescription, setNewSheetDescription] = useState('');
  const [newDistributionRule, setNewDistributionRule] = useState('');
  const [newDistributionAlgorithm, setNewDistributionAlgorithm] = useState('');
  const [newAssignedUsers, setNewAssignedUsers] = useState<string[]>([]);
  
  // Distribution allocation settings
  const [distributionMethod, setDistributionMethod] = useState<'round-robin' | 'performance' | 'percentage'>('round-robin');
  const [userPerformances, setUserPerformances] = useState<Record<string, number>>({});
  const [userPercentages, setUserPercentages] = useState<Record<string, number>>({});

  const resetDialog = () => {
    setNewSheetName('');
    setNewDefaultProduct('');
    setNewSheetDescription('');
    setNewDistributionRule('');
    setNewDistributionAlgorithm('');
    setNewAssignedUsers([]);
    setDistributionMethod('round-robin');
    setUserPerformances({});
    setUserPercentages({});
    setShowCreateSheet(false);
    setShowEditSheet(null);
  };

  const initializeNewSheet = () => {
    setShowCreateSheet(true);
  };

  const handleCreateSheet = () => {
    if (!newSheetName.trim()) return;
    if (!newDefaultProduct) return;
    if (newAssignedUsers.length === 0) return;

    // Validate percentage allocation if percentage method is selected
    if (distributionMethod === 'percentage') {
      const totalPercentage = Object.values(userPercentages).reduce((sum, val) => sum + (val || 0), 0);
      if (Math.abs(totalPercentage - 100) > 0.1) {
        alert('⚠️ Tổng tỉ lệ phân bổ phải bằng 100%!');
        return;
      }
    }

    const newSheet: LeadSheet = {
      id: `sheet_${Date.now()}`,
      name: newSheetName.trim(),
      count: 0, // Start with 0 - empty sheet
      defaultProduct: newDefaultProduct,
      distributionRule: 'auto', // Set to auto when users are assigned
      distributionAlgorithm: distributionMethod,
      assignedUsers: newAssignedUsers,
      order: sheets.length,
      description: `Sheet ${newSheetName.trim()} - Sản phẩm mặc định: ${newDefaultProduct}`,
      createdAt: new Date(),
      createdBy: 'current_user', // In real app, this would be the actual user
      // Additional distribution settings
      distributionMethod,
      userPerformances: distributionMethod === 'performance' ? userPerformances : undefined,
      userPercentages: distributionMethod === 'percentage' ? userPercentages : undefined,
    };

    setSheets([...sheets, newSheet]);
    resetDialog();
    
    // Switch to the new sheet
    onSheetChange(newSheet.id);
    
    console.log('Created new sheet:', newSheet);
    
    // Show success message with distribution info
    const distributionInfo = distributionMethod === 'round-robin' 
      ? 'Phân bổ tuần tự theo vòng tròn'
      : distributionMethod === 'performance' 
      ? `Phân bổ theo hiệu suất (${Object.keys(userPerformances).length} sale)`
      : `Phân bổ theo tỉ lệ % (tổng 100%)`;
    
    const assignedUserNames = newAssignedUsers.map(id => mockUsers.find(u => u.id === id)?.name).join(', ');
    alert(`✅ Đã tạo sheet "${newSheet.name}" thành công!\n\n📋 Sheet hiện đang trống\n🔄 Vui lòng click "Tạo lead" để thêm dữ liệu mới`);
  };

  const handleEditSheet = (sheetId: string) => {
    const sheet = sheets.find(s => s.id === sheetId);
    if (sheet) {
      setNewSheetName(sheet.name);
      setNewDefaultProduct(sheet.defaultProduct);
      setShowEditSheet(sheetId);
    }
  };

  const handleUpdateSheet = () => {
    if (!showEditSheet || !newSheetName.trim()) return;
    if (!newDefaultProduct) return;

    setSheets(sheets.map(sheet => 
      sheet.id === showEditSheet
        ? { 
            ...sheet, 
            name: newSheetName.trim(),
            defaultProduct: newDefaultProduct,
            description: `Sheet ${newSheetName.trim()} - Sản phẩm mặc định: ${newDefaultProduct}`,
            // Keep all existing settings unchanged
          }
        : sheet
    ));

    resetDialog();
    console.log('Updated sheet:', showEditSheet);
  };

  const handleDeleteSheet = (sheetId: string) => {
    if (sheetId === 'main') return; // Can't delete main sheet
    
    if (confirm('Bạn có chắc chắn muốn xóa sheet này? Dữ liệu trong sheet sẽ được chuyển về sheet "Tất cả Leads".')) {
      setSheets(sheets.filter(s => s.id !== sheetId));
      if (activeSheet === sheetId) {
        onSheetChange('main');
      }
      console.log('Deleted sheet:', sheetId);
    }
  };

  const handleUserToggle = (userId: string) => {
    setNewAssignedUsers(prev => {
      const newUsers = prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId];
      
      // Auto-assign equal percentages when users change and percentage method is selected
      if (distributionMethod === 'percentage' && newUsers.length > 0) {
        const equalPercentage = Math.floor(100 / newUsers.length);
        const remainder = 100 - (equalPercentage * newUsers.length);
        const newPercentages: Record<string, number> = {};
        
        newUsers.forEach((id, index) => {
          newPercentages[id] = equalPercentage + (index === 0 ? remainder : 0);
        });
        
        setUserPercentages(newPercentages);
      }
      
      // Auto-assign default performance scores when users change and performance method is selected
      if (distributionMethod === 'performance' && newUsers.length > 0) {
        const newPerformances: Record<string, number> = {};
        newUsers.forEach(id => {
          if (!userPerformances[id]) {
            newPerformances[id] = 50; // Default performance score
          } else {
            newPerformances[id] = userPerformances[id];
          }
        });
        setUserPerformances(newPerformances);
      }
      
      return newUsers;
    });
  };

  const handlePercentageChange = (userId: string, percentage: number) => {
    setUserPercentages(prev => ({
      ...prev,
      [userId]: Math.max(0, Math.min(100, percentage))
    }));
  };

  const handlePerformanceChange = (userId: string, performance: number) => {
    setUserPerformances(prev => ({
      ...prev,
      [userId]: Math.max(0, Math.min(100, performance))
    }));
  };

  const getTotalPercentage = () => {
    return Object.values(userPercentages).reduce((sum, val) => sum + (val || 0), 0);
  };

  const getDistributionMethodName = (method: string) => {
    switch (method) {
      case 'round-robin': return 'Theo vòng tròn';
      case 'performance': return 'Theo hiệu suất';
      case 'percentage': return 'Theo tỉ lệ %';
      default: return method;
    }
  };

  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    
    const newSheets = [...sheets];
    [newSheets[index - 1], newSheets[index]] = [newSheets[index], newSheets[index - 1]];
    setSheets(newSheets);
  };

  const handleMoveDown = (index: number) => {
    if (index >= sheets.length - 1) return;
    
    const newSheets = [...sheets];
    [newSheets[index], newSheets[index + 1]] = [newSheets[index + 1], newSheets[index]];
    setSheets(newSheets);
  };

  const getSheetDescription = (sheet: LeadSheet) => {
    const rule = distributionRules.find(r => r.id === sheet.distributionRule);
    const algorithm = distributionAlgorithms.find(a => a.id === sheet.distributionAlgorithm);
    const userCount = sheet.assignedUsers.length;
    
    return `${sheet.defaultProduct} • ${rule?.name} • ${algorithm?.name} • ${userCount} người`;
  };

  // Calculate real counts for each sheet
  useEffect(() => {
    if (customers) {
      const updatedSheets = sheets.map(sheet => {
        let count = 0;
        if (sheet.id === 'main') {
          count = customers.length;
        } else {
          // Count leads that belong to this specific sheet
          count = customers.filter(lead => lead.sheetId === sheet.id).length;
        }
        
        return {
          ...sheet,
          count: count
        };
      });
      setSheets(updatedSheets);
    }
  }, [customers]);

  useEffect(() => {
    if (onSheetsChange) {
      onSheetsChange(sheets);
    }
  }, [sheets, onSheetsChange]);

  return (
    <div className="border-b border-border bg-muted/10">
      <div className="flex items-center gap-2 p-4 overflow-x-auto">
        {sheets.map((sheet, index) => (
          <SheetItem
            key={sheet.id}
            sheet={sheet}
            index={index}
            activeSheet={activeSheet}
            onSheetChange={onSheetChange}
            onEditSheet={handleEditSheet}
            onDeleteSheet={handleDeleteSheet}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
            isFirst={index === 0}
            isLast={index === sheets.length - 1}
          />
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={initializeNewSheet}
          className="flex items-center gap-2 whitespace-nowrap"
        >
          <Plus className="h-4 w-4" />
          Tạo sheet
        </Button>
      </div>

      {/* Show active sheet info */}
      {activeSheet !== 'main' && (
        <div className="px-4 pb-3">
          <div className="text-xs text-muted-foreground">
            {getSheetDescription(sheets.find(s => s.id === activeSheet) || sheets[0])}
          </div>
        </div>
      )}

      {/* Create/Edit Sheet Dialog */}
      <Dialog open={showCreateSheet || showEditSheet !== null} onOpenChange={resetDialog}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" />
              {showEditSheet ? 'Chỉnh sửa sheet' : 'Tạo sheet mới'}
            </DialogTitle>
            <DialogDescription>
              {showEditSheet 
                ? 'Cập nhật thông tin và cài đặt cho sheet Lead Hub'
                : 'Tạo sheet mới để quản lý leads theo từng nhóm cụ thể'
              }
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Sheet Name */}
            <div className="space-y-2">
              <Label htmlFor="sheet-name">Tên sheet <span className="text-red-500">*</span></Label>
              <Input
                id="sheet-name"
                placeholder="Nhập tên sheet (ví dụ: Digital Marketing, Enterprise Clients...)"
                value={newSheetName}
                onChange={(e) => setNewSheetName(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Tên sẽ hiển thị trên tab sheet để phân biệt các nhóm lead
              </p>
            </div>

            {/* Default Product */}
            <div className="space-y-2">
              <Label>Sản phẩm mặc định <span className="text-red-500">*</span></Label>
              <Select
                value={newDefaultProduct}
                onValueChange={setNewDefaultProduct}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn sản phẩm/dịch vụ mặc định" />
                </SelectTrigger>
                <SelectContent>
                  {defaultProducts.map((product) => (
                    <SelectItem key={product} value={product}>
                      {product}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Sản phẩm/dịch vụ sẽ được gán mặc định cho leads mới trong sheet này
              </p>
            </div>

            {/* Only show allocation settings in create mode */}
            {showCreateSheet && (
              <>
                {/* Assigned Users */}
                <div className="space-y-2">
                  <Label>Sale phụ trách <span className="text-red-500">*</span></Label>
                  <div className="border border-input rounded-lg p-3 space-y-2 max-h-32 overflow-y-auto">
                    {mockUsers.map((user) => (
                      <div key={user.id} className="flex items-center space-x-3">
                        <Checkbox
                          id={user.id}
                          checked={newAssignedUsers.includes(user.id)}
                          onCheckedChange={() => handleUserToggle(user.id)}
                        />
                        <label
                          htmlFor={user.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                        >
                          <div>{user.name}</div>
                          <div className="text-xs text-muted-foreground">{user.role}</div>
                        </label>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Chọn các sale sẽ được phân bổ leads trong sheet này
                  </p>
                </div>

                {/* Distribution Method - Only show if users are selected */}
                {newAssignedUsers.length > 0 && (
                  <div className="space-y-4 p-4 border border-border rounded-lg bg-muted/20">
                    <div className="space-y-2">
                      <Label>Phương thức phân bổ</Label>
                      <Select
                        value={distributionMethod}
                        onValueChange={(value: 'round-robin' | 'performance' | 'percentage') => setDistributionMethod(value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="round-robin">
                            <div>
                              <div className="font-medium">🔄 Theo vòng tròn</div>
                              <div className="text-sm text-muted-foreground">Phân bổ tuần tự, mỗi sale nhận lần lượt</div>
                            </div>
                          </SelectItem>
                          <SelectItem value="performance">
                            <div>
                              <div className="font-medium">📊 Theo hiệu suất</div>
                              <div className="text-sm text-muted-foreground">Phân bổ dựa trên điểm hiệu suất của sale</div>
                            </div>
                          </SelectItem>
                          <SelectItem value="percentage">
                            <div>
                              <div className="font-medium">📈 Theo tỉ lệ %</div>
                              <div className="text-sm text-muted-foreground">Phân bổ theo tỉ lệ phần trăm cụ thể</div>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Performance Settings */}
                    {distributionMethod === 'performance' && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Label className="text-sm font-medium">Điểm hiệu suất (0-100)</Label>
                          <div className="text-xs text-muted-foreground">(Điểm cao hơn = nhận nhiều lead hơn)</div>
                        </div>
                        <div className="space-y-2">
                          {newAssignedUsers.map((userId) => {
                            const user = mockUsers.find(u => u.id === userId);
                            return (
                              <div key={userId} className="flex items-center gap-3">
                                <div className="flex-1">
                                  <div className="text-sm font-medium">{user?.name}</div>
                                  <div className="text-xs text-muted-foreground">{user?.role}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={userPerformances[userId] || 50}
                                    onChange={(e) => handlePerformanceChange(userId, parseInt(e.target.value) || 0)}
                                    className="w-20 text-center"
                                  />
                                  <span className="text-sm text-muted-foreground">điểm</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
                          💡 Leads sẽ được phân bổ dựa trên tỉ lệ điểm hiệu suất. Sale có điểm cao hơn sẽ nhận nhiều lead hơn.
                        </div>
                      </div>
                    )}

                    {/* Percentage Settings */}
                    {distributionMethod === 'percentage' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-medium">Tỉ lệ phân bổ (%)</Label>
                          <div className={`text-sm font-medium ${getTotalPercentage() === 100 ? 'text-green-600' : 'text-red-600'}`}>
                            Tổng: {getTotalPercentage()}%
                          </div>
                        </div>
                        <div className="space-y-2">
                          {newAssignedUsers.map((userId) => {
                            const user = mockUsers.find(u => u.id === userId);
                            return (
                              <div key={userId} className="flex items-center gap-3">
                                <div className="flex-1">
                                  <div className="text-sm font-medium">{user?.name}</div>
                                  <div className="text-xs text-muted-foreground">{user?.role}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Input
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="0.1"
                                    value={userPercentages[userId] || 0}
                                    onChange={(e) => handlePercentageChange(userId, parseFloat(e.target.value) || 0)}
                                    className="w-20 text-center"
                                  />
                                  <span className="text-sm text-muted-foreground">%</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        {getTotalPercentage() !== 100 && (
                          <div className="text-xs text-red-600 bg-red-50 p-2 rounded">
                            ⚠️ Tổng tỉ lệ phân bổ phải bằng 100%. Hiện tại: {getTotalPercentage()}%
                          </div>
                        )}
                      </div>
                    )}

                    {/* Round Robin Info */}
                    {distributionMethod === 'round-robin' && newAssignedUsers.length > 0 && (
                      <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                        🔄 Leads sẽ được phân bổ tuần tự theo thứ tự: {newAssignedUsers.map(id => mockUsers.find(u => u.id === id)?.name).join(' → ')} → lặp lại
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {/* Info section for both create and edit mode */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Info className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">
                    {showEditSheet ? 'Lưu ý khi chỉnh sửa sheet' : 'Sheet sẽ được tạo với cài đặt mặc định'}
                  </h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    {showEditSheet ? (
                      <>
                        <div>• Chỉ có thể thay đổi tên sheet và sản phẩm mặc định</div>
                        <div>• Các cài đặt khác sẽ được giữ nguyên</div>
                        <div>• Thay đổi sẽ ảnh hưởng đến leads mới trong sheet</div>
                      </>
                    ) : (
                      <>
                        <div>• Quy tắc phân bổ: <strong>Thủ công</strong></div>
                        <div>• Thuật toán: <strong>Round Robin</strong></div>
                        <div>• Sheet sẽ bắt đầu trống hoàn toàn</div>
                        <div>• Bạn có thể chỉnh sửa cài đặt chi tiết sau khi tạo</div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={resetDialog}>
                Hủy
              </Button>
              <Button
                onClick={showEditSheet ? handleUpdateSheet : handleCreateSheet}
                disabled={
                  !newSheetName.trim() || 
                  !newDefaultProduct || 
                  (!showEditSheet && newAssignedUsers.length === 0) ||
                  (!showEditSheet && distributionMethod === 'percentage' && getTotalPercentage() !== 100)
                }
                className="bg-primary hover:bg-primary-hover"
              >
                {showEditSheet ? 'Cập nhật sheet' : 'Tạo sheet'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}