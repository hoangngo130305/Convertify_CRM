import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  User, 
  Star,
  DollarSign,
  Clock,
  Save,
  Edit3,
  Plus
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  products: string[];
  status: string;
  source: string;
  assignedSale: string;
  createdDate: Date;
  notes: string;
  quality: number;
  questions: string;
  address: string;
  revenue: number;
  customFields: Record<string, any>;
}

interface CustomerDetailsPopupProps {
  customer: Customer;
  onClose: () => void;
  onUpdate: (customerId: string, field: string, value: any) => void;
}

interface Interaction {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note';
  title: string;
  description: string;
  date: Date;
  duration?: string;
  status: 'completed' | 'pending' | 'failed';
}

const mockInteractions: Interaction[] = [
  {
    id: '1',
    type: 'call',
    title: 'Cuộc gọi tư vấn',
    description: 'Trao đổi về gói dịch vụ SEO cơ bản',
    date: new Date(2024, 8, 15, 14, 30),
    duration: '15 phút',
    status: 'completed'
  },
  {
    id: '2',
    type: 'email',
    title: 'Gửi báo giá',
    description: 'Email chi tiết về gói dịch vụ Digital Marketing',
    date: new Date(2024, 8, 12, 9, 0),
    status: 'completed'
  },
  {
    id: '3',
    type: 'meeting',
    title: 'Họp demo sản phẩm',
    description: 'Presentation về tính năng website',
    date: new Date(2024, 8, 10, 16, 0),
    duration: '45 phút',
    status: 'pending'
  }
];

const filterOptions = {
  products: ['Website Design', 'SEO Service', 'Digital Marketing', 'E-commerce', 'Mobile App', 'Branding'],
  status: ['Mới', 'Đang xử lý', 'Thành công', 'Thất bại'],
  source: ['Facebook', 'Google', 'TikTok', 'Zalo', 'Hotline', 'Website', 'Giới thiệu'],
  assignedSale: ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D', 'Chưa phân bổ'],
};

const getInteractionIcon = (type: string) => {
  switch (type) {
    case 'call': return <Phone className="h-4 w-4 text-blue-600" />;
    case 'email': return <Mail className="h-4 w-4 text-green-600" />;
    case 'meeting': return <User className="h-4 w-4 text-purple-600" />;
    case 'note': return <Edit3 className="h-4 w-4 text-orange-600" />;
    default: return <Clock className="h-4 w-4 text-gray-600" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Mới': return 'bg-blue-100 text-blue-800';
    case 'Đang xử lý': return 'bg-yellow-100 text-yellow-800';
    case 'Thành công': return 'bg-green-100 text-green-800';
    case 'Thất bại': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export function CustomerDetailsPopup({ customer, onClose, onUpdate }: CustomerDetailsPopupProps) {
  const [editData, setEditData] = useState(customer);
  const [isEditing, setIsEditing] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);

  const handleSave = () => {
    // Update each changed field
    Object.keys(editData).forEach(field => {
      if (editData[field as keyof Customer] !== customer[field as keyof Customer]) {
        onUpdate(customer.id, field, editData[field as keyof Customer]);
      }
    });
    setIsEditing(false);
    setEditingField(null);
  };

  const handleFieldEdit = (field: string, value: any) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-[95vw] h-[90vh] flex flex-col p-0 gap-0">
        {/* Header - Fixed */}
        <div className="flex-shrink-0 px-6 pt-6 pb-4 border-b border-border">
          <DialogHeader className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-xl font-medium">Chi tiết khách hàng</DialogTitle>
                <DialogDescription className="text-sm">
                  Xem và chỉnh sửa thông tin của {customer.name} (ID: {customer.id})
                </DialogDescription>
              </div>
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    <Button variant="outline" onClick={() => setIsEditing(false)} size="sm">
                      Hủy
                    </Button>
                    <Button onClick={handleSave} size="sm" className="bg-purple-600 hover:bg-purple-700">
                      <Save className="h-4 w-4 mr-2" />
                      Lưu thay đổi
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" onClick={() => setIsEditing(true)} size="sm">
                    <Edit3 className="h-4 w-4 mr-2" />
                    Chỉnh sửa
                  </Button>
                )}
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-6 pb-6">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info">Thông tin</TabsTrigger>
              <TabsTrigger value="interactions">Lịch sử tương tác</TabsTrigger>
              <TabsTrigger value="notes">Ghi chú & Theo dõi</TabsTrigger>
            </TabsList>
            
            <TabsContent value="info" className="space-y-6 mt-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Basic Info */}
                <Card className="p-4">
                  <h3 className="font-medium mb-4">Thông tin cơ bản</h3>
                  <div className="space-y-4">
                    {/* Tên khách hàng - Always show */}
                    <div>
                      <label className="text-sm font-medium mb-1 block">Tên khách hàng *</label>
                      {isEditing ? (
                        <Input 
                          value={editData.name}
                          onChange={(e) => handleFieldEdit('name', e.target.value)}
                        />
                      ) : (
                        <div className="p-2 bg-muted rounded text-sm">{customer.name}</div>
                      )}
                    </div>
                    
                    {/* Số điện thoại - Always show */}
                    <div>
                      <label className="text-sm font-medium mb-1 block">Số điện thoại *</label>
                      {isEditing ? (
                        <Input 
                          value={editData.phone}
                          onChange={(e) => handleFieldEdit('phone', e.target.value)}
                        />
                      ) : (
                        <div className="p-2 bg-muted rounded text-sm flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          {customer.phone}
                        </div>
                      )}
                    </div>
                    
                    {/* Email - Only show if has value */}
                    {customer.email && (
                      <div>
                        <label className="text-sm font-medium mb-1 block">Email</label>
                        {isEditing ? (
                          <Input 
                            value={editData.email}
                            onChange={(e) => handleFieldEdit('email', e.target.value)}
                          />
                        ) : (
                          <div className="p-2 bg-muted rounded text-sm flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            {customer.email}
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Địa chỉ - Only show if has value */}
                    {customer.address && (
                      <div>
                        <label className="text-sm font-medium mb-1 block">Địa chỉ</label>
                        {isEditing ? (
                          <Textarea 
                            value={editData.address}
                            onChange={(e) => handleFieldEdit('address', e.target.value)}
                            className="min-h-[80px]"
                          />
                        ) : (
                          <div className="p-2 bg-muted rounded text-sm flex items-start gap-2">
                            <MapPin className="h-4 w-4 mt-0.5" />
                            {customer.address}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Ngày tạo - Always show */}
                    <div>
                      <label className="text-sm font-medium mb-1 block">Ngày tạo</label>
                      <div className="p-2 bg-muted rounded text-sm flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {customer.createdDate.toLocaleDateString('vi-VN')}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Business Info */}
                <Card className="p-4">
                  <h3 className="font-medium mb-4">Thông tin kinh doanh</h3>
                  <div className="space-y-4">
                    {/* Trạng thái - Always show */}
                    <div>
                      <label className="text-sm font-medium mb-1 block">Trạng thái</label>
                      {isEditing ? (
                        <Select 
                          value={editData.status} 
                          onValueChange={(value) => handleFieldEdit('status', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {filterOptions.status.map(status => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Badge className={getStatusColor(customer.status)}>
                          {customer.status}
                        </Badge>
                      )}
                    </div>
                    
                    {/* Nguồn - Always show */}
                    <div>
                      <label className="text-sm font-medium mb-1 block">Nguồn Data</label>
                      {isEditing ? (
                        <Select 
                          value={editData.source} 
                          onValueChange={(value) => handleFieldEdit('source', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {filterOptions.source.map(source => (
                              <SelectItem key={source} value={source}>
                                {source}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Badge variant="outline">{customer.source}</Badge>
                      )}
                    </div>
                    
                    {/* Sale phụ trách - Only show if assigned */}
                    {customer.assignedSale && customer.assignedSale !== 'Chưa phân bổ' && (
                      <div>
                        <label className="text-sm font-medium mb-1 block">Sale phụ trách</label>
                        {isEditing ? (
                          <Select 
                            value={editData.assignedSale} 
                            onValueChange={(value) => handleFieldEdit('assignedSale', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {filterOptions.assignedSale.map(sale => (
                                <SelectItem key={sale} value={sale}>
                                  {sale}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <div className="p-2 bg-muted rounded text-sm flex items-center gap-2">
                            <User className="h-4 w-4" />
                            {customer.assignedSale}
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Chất lượng - Only show if > 0 */}
                    {customer.quality > 0 && (
                      <div>
                        <label className="text-sm font-medium mb-1 block">Chất lượng</label>
                        <div className="flex">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < customer.quality ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                          <span className="ml-2 text-sm text-muted-foreground">
                            ({customer.quality}/5)
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {/* Doanh thu - Only show if > 0 */}
                    {customer.revenue > 0 && (
                      <div>
                        <label className="text-sm font-medium mb-1 block">Doanh thu</label>
                        <div className="p-2 bg-muted rounded text-sm flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                          }).format(customer.revenue)}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </div>

              {/* Products - Only show if has products */}
              {customer.products && customer.products.length > 0 && (
                <Card className="p-4">
                  <h3 className="font-medium mb-4">Sản phẩm/Dịch vụ quan tâm</h3>
                  <div className="flex flex-wrap gap-2">
                    {customer.products.map((product, index) => (
                      <Badge key={index} variant="secondary">
                        {product}
                      </Badge>
                    ))}
                  </div>
                </Card>
              )}

              {/* Questions - Only show if has questions */}
              {customer.questions && (
                <Card className="p-4">
                  <h3 className="font-medium mb-4">Câu hỏi từ khách hàng</h3>
                  {isEditing ? (
                    <Textarea 
                      value={editData.questions}
                      onChange={(e) => handleFieldEdit('questions', e.target.value)}
                      className="min-h-[80px]"
                      placeholder="Câu hỏi từ khách hàng..."
                    />
                  ) : (
                    <div className="p-3 bg-muted rounded text-sm">
                      {customer.questions}
                    </div>
                  )}
                </Card>
              )}
            </TabsContent>            
            <TabsContent value="interactions" className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Lịch sử tương tác</h3>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm tương tác
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">Chỉ hiển thị lịch sử cuộc gọi và email</p>
              
              <div className="space-y-3">
                {mockInteractions
                  .filter(interaction => interaction.type === 'call' || interaction.type === 'email')
                  .map(interaction => (
                  <Card key={interaction.id} className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {getInteractionIcon(interaction.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-sm">{interaction.title}</h4>
                          <div className="flex items-center gap-2">
                            {interaction.duration && (
                              <span className="text-xs text-muted-foreground">
                                {interaction.duration}
                              </span>
                            )}
                            <Badge 
                              variant={interaction.status === 'completed' ? 'default' : 
                                      interaction.status === 'pending' ? 'secondary' : 'destructive'}
                              className="text-xs"
                            >
                              {interaction.status === 'completed' ? 'Hoàn thành' :
                               interaction.status === 'pending' ? 'Đang chờ' : 'Thất bại'}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {interaction.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {interaction.date.toLocaleString('vi-VN')}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
                
                {mockInteractions.filter(interaction => interaction.type === 'call' || interaction.type === 'email').length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Clock className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                    <p>Chưa có lịch sử cuộc gọi hoặc email nào</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="notes" className="space-y-4 mt-6">
              <div className="space-y-6">
                {/* Ghi chú section */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Ghi chú</label>
                  {isEditing ? (
                    <Textarea 
                      value={editData.notes}
                      onChange={(e) => handleFieldEdit('notes', e.target.value)}
                      className="min-h-[120px]"
                      placeholder="Thêm ghi chú về khách hàng..."
                    />
                  ) : (
                    <div className="p-3 bg-muted rounded text-sm min-h-[120px]">
                      {customer.notes || 'Chưa có ghi chú'}
                    </div>
                  )}
                </div>
                
                {/* Lịch sử cập nhật thông tin */}
                <div>
                  <h3 className="font-medium mb-3">Lịch sử cập nhật thông tin</h3>
                  <p className="text-sm text-muted-foreground mb-3">Theo d��i các thay đổi thông tin khách hàng</p>
                  
                  <div className="space-y-3">
                    {/* Mock update history */}
                    <Card className="p-3">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Edit3 className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-sm">Cập nhật trạng thái</h4>
                            <span className="text-xs text-muted-foreground">2 giờ trước</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Thay đổi từ "Mới" → "Đang xử lý"
                          </p>
                          <div className="text-xs text-muted-foreground">
                            Bởi: Nguyễn Văn A
                          </div>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-3">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Edit3 className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-sm">Cập nhật sản phẩm quan tâm</h4>
                            <span className="text-xs text-muted-foreground">1 ngày trước</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Thêm "Digital Marketing" vào danh sách quan tâm
                          </p>
                          <div className="text-xs text-muted-foreground">
                            Bởi: Trần Thị B
                          </div>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-3">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Edit3 className="h-4 w-4 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-sm">Phân bổ Sale</h4>
                            <span className="text-xs text-muted-foreground">3 ngày trước</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Phân bổ cho sale "Nguyễn Văn A"
                          </p>
                          <div className="text-xs text-muted-foreground">
                            Bởi: Admin
                          </div>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-3">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Plus className="h-4 w-4 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-sm">Tạo khách hàng mới</h4>
                            <span className="text-xs text-muted-foreground">5 ngày trước</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Khách hàng được tạo từ nguồn "{customer.source}"
                          </p>
                          <div className="text-xs text-muted-foreground">
                            Bởi: Hệ thống
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}