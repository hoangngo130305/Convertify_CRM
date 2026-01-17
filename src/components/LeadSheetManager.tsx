import { useState, useEffect, useRef } from 'react';
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
import { Plus, MoreVertical, Edit, Trash2, X, GripVertical, Layers } from 'lucide-react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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

// Draggable Sheet Item Component
const DraggableSheetItem = ({ 
  sheet, 
  index, 
  activeSheet, 
  onSheetChange, 
  onEditSheet, 
  onDeleteSheet,
  moveSheet 
}: {
  sheet: LeadSheet;
  index: number;
  activeSheet: string;
  onSheetChange: (sheetId: string) => void;
  onEditSheet: (sheetId: string) => void;
  onDeleteSheet: (sheetId: string) => void;
  moveSheet: (dragIndex: number, hoverIndex: number) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'sheet',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientX = (clientOffset?.x ?? 0) - hoverBoundingRect.left;

      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }

      moveSheet(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'sheet',
    item: () => {
      return { id: sheet.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;
  const canDrag = sheet.id !== 'main';
  
  if (canDrag) {
    drag(drop(ref));
  } else {
    drop(ref);
  }

  return (
    <div 
      ref={ref} 
      style={{ opacity }} 
      data-handler-id={handlerId}
      className="flex items-center gap-1"
    >
      {canDrag && (
        <div className="cursor-move p-1 text-muted-foreground hover:text-foreground transition-colors">
          <GripVertical className="h-4 w-4" />
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

export function LeadSheetManager({ activeSheet, onSheetChange, customers, onSheetsChange }: LeadSheetManagerProps) {
  const [sheets, setSheets] = useState<LeadSheet[]>(mockSheets);
  const [showCreateSheet, setShowCreateSheet] = useState(false);
  const [showEditSheet, setShowEditSheet] = useState<string | null>(null);
  
  // New sheet form state
  const [newSheetName, setNewSheetName] = useState('');
  const [newSheetDescription, setNewSheetDescription] = useState('');
  const [newDefaultProduct, setNewDefaultProduct] = useState('');
  const [newDistributionRule, setNewDistributionRule] = useState('');
  const [newDistributionAlgorithm, setNewDistributionAlgorithm] = useState('');
  const [newAssignedUsers, setNewAssignedUsers] = useState<string[]>([]);

  const resetDialog = () => {
    setNewSheetName('');
    setNewSheetDescription('');
    setNewDefaultProduct('');
    setNewDistributionRule('');
    setNewDistributionAlgorithm('');
    setNewAssignedUsers([]);
    setShowCreateSheet(false);
    setShowEditSheet(null);
  };

  const initializeNewSheet = () => {
    setShowCreateSheet(true);
  };

  const handleCreateSheet = () => {
    if (!newSheetName.trim()) return;
    if (!newDefaultProduct) return;
    if (!newDistributionRule) return;
    if (!newDistributionAlgorithm) return;

    const newSheet: LeadSheet = {
      id: `sheet_${Date.now()}`,
      name: newSheetName.trim(),
      count: 0,
      defaultProduct: newDefaultProduct,
      distributionRule: newDistributionRule,
      distributionAlgorithm: newDistributionAlgorithm,
      assignedUsers: [...newAssignedUsers],
      order: sheets.length,
      description: newSheetDescription.trim() || undefined,
      createdAt: new Date(),
      createdBy: 'current_user' // In real app, this would be the actual user
    };

    setSheets([...sheets, newSheet]);
    resetDialog();
    
    // Switch to the new sheet
    onSheetChange(newSheet.id);
    
    console.log('Created new sheet:', newSheet);
  };

  const handleEditSheet = (sheetId: string) => {
    const sheet = sheets.find(s => s.id === sheetId);
    if (sheet) {
      setNewSheetName(sheet.name);
      setNewSheetDescription(sheet.description || '');
      setNewDefaultProduct(sheet.defaultProduct);
      setNewDistributionRule(sheet.distributionRule);
      setNewDistributionAlgorithm(sheet.distributionAlgorithm);
      setNewAssignedUsers([...sheet.assignedUsers]);
      setShowEditSheet(sheetId);
    }
  };

  const handleUpdateSheet = () => {
    if (!showEditSheet || !newSheetName.trim()) return;
    if (!newDefaultProduct) return;
    if (!newDistributionRule) return;
    if (!newDistributionAlgorithm) return;

    setSheets(sheets.map(sheet => 
      sheet.id === showEditSheet
        ? { 
            ...sheet, 
            name: newSheetName.trim(),
            description: newSheetDescription.trim() || undefined,
            defaultProduct: newDefaultProduct,
            distributionRule: newDistributionRule,
            distributionAlgorithm: newDistributionAlgorithm,
            assignedUsers: [...newAssignedUsers]
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
    setNewAssignedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
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
      const updatedSheets = sheets.map(sheet => ({
        ...sheet,
        // For now, we'll use the mock count, but in real implementation
        // this would be calculated based on actual sheet assignment logic
        count: sheet.count
      }));
      setSheets(updatedSheets);
    }
  }, [customers]);

  useEffect(() => {
    if (onSheetsChange) {
      onSheetsChange(sheets);
    }
  }, [sheets, onSheetsChange]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="border-b border-border bg-muted/10">
        <div className="flex items-center gap-2 p-4 overflow-x-auto">
          {sheets.map((sheet, index) => (
            <DraggableSheetItem
              key={sheet.id}
              sheet={sheet}
              index={index}
              activeSheet={activeSheet}
              onSheetChange={onSheetChange}
              onEditSheet={handleEditSheet}
              onDeleteSheet={handleDeleteSheet}
              moveSheet={(dragIndex, hoverIndex) => {
                const updatedSheets = [...sheets];
                const [draggedSheet] = updatedSheets.splice(dragIndex, 1);
                updatedSheets.splice(hoverIndex, 0, draggedSheet);
                setSheets(updatedSheets);
              }}
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
      </div>

      {/* Create/Edit Sheet Dialog */}
      <Dialog open={showCreateSheet || showEditSheet !== null} onOpenChange={resetDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
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
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="sheet-description">Mô tả (tùy chọn)</Label>
              <Textarea
                id="sheet-description"
                placeholder="Mô tả ngắn về sheet này..."
                value={newSheetDescription}
                onChange={(e) => setNewSheetDescription(e.target.value)}
                rows={3}
              />
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

            {/* Distribution Rule */}
            <div className="space-y-2">
              <Label>Quy tắc phân bổ <span className="text-red-500">*</span></Label>
              <Select
                value={newDistributionRule}
                onValueChange={setNewDistributionRule}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn quy tắc phân bổ" />
                </SelectTrigger>
                <SelectContent>
                  {distributionRules.map((rule) => (
                    <SelectItem key={rule.id} value={rule.id}>
                      <div>
                        <div className="font-medium">{rule.name}</div>
                        <div className="text-sm text-muted-foreground">{rule.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Distribution Algorithm */}
            <div className="space-y-2">
              <Label>Thuật toán phân bổ <span className="text-red-500">*</span></Label>
              <Select
                value={newDistributionAlgorithm}
                onValueChange={setNewDistributionAlgorithm}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn thuật toán phân bổ" />
                </SelectTrigger>
                <SelectContent>
                  {distributionAlgorithms.map((algorithm) => (
                    <SelectItem key={algorithm.id} value={algorithm.id}>
                      <div>
                        <div className="font-medium">{algorithm.name}</div>
                        <div className="text-sm text-muted-foreground">{algorithm.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* User Assignment */}
            <div className="space-y-4">
              <div>
                <Label>Phân bổ cho users</Label>
                <p className="text-sm text-muted-foreground">
                  Chọn các user sẽ nhận leads từ sheet này
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {mockUsers.map((user) => (
                  <div key={user.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Checkbox
                      id={`user-${user.id}`}
                      checked={newAssignedUsers.includes(user.id)}
                      onCheckedChange={() => handleUserToggle(user.id)}
                    />
                    <div className="flex-1">
                      <Label 
                        htmlFor={`user-${user.id}`}
                        className="cursor-pointer flex flex-col"
                      >
                        <span className="font-medium">{user.name}</span>
                        <span className="text-sm text-muted-foreground">{user.role}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </Label>
                    </div>
                  </div>
                ))}
              </div>

              {newAssignedUsers.length > 0 && (
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium">Đã chọn {newAssignedUsers.length} users:</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {newAssignedUsers.map(userId => {
                      const user = mockUsers.find(u => u.id === userId);
                      return user ? (
                        <Badge key={userId} variant="secondary" className="text-xs">
                          {user.name}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={resetDialog}>
                Hủy
              </Button>
              <Button
                onClick={showEditSheet ? handleUpdateSheet : handleCreateSheet}
                disabled={!newSheetName.trim() || !newDefaultProduct || !newDistributionRule || !newDistributionAlgorithm}
              >
                {showEditSheet ? 'Cập nhật sheet' : 'Tạo sheet'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DndProvider>
  );
}