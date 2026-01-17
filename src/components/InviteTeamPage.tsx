import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Separator } from './ui/separator';
import { Checkbox } from './ui/checkbox';
import { ArrowLeft, Users, UserPlus, Mail, MoreVertical, Trash2, Edit, Send, Shield } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

interface InviteTeamPageProps {
  onClose: () => void;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'sale' | 'marketing' | 'crm' | 'manager';
  status: 'active' | 'pending' | 'inactive';
  avatar?: string;
  joinedDate: Date;
  lastActive: Date;
  permissions?: string[];
}

interface RolePermissions {
  view: boolean;
  edit: boolean;
  create: boolean;
  delete: boolean;
  export: boolean;
}

export function InviteTeamPage({ onClose }: InviteTeamPageProps) {
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'admin' | 'sale' | 'marketing' | 'crm' | 'manager'>('sale');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  // Role permissions state
  const [rolePermissions, setRolePermissions] = useState<Record<string, RolePermissions>>({
    admin: { view: true, edit: true, create: true, delete: true, export: true },
    marketing: { view: true, edit: true, create: true, delete: false, export: true },
    sale: { view: true, edit: true, create: false, delete: false, export: false }
  });

  // Track if permissions have been modified
  const [permissionsModified, setPermissionsModified] = useState(false);

  // Mock team members data
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: 'member-1',
      name: 'Nguyễn Văn Admin',
      email: 'admin@company.com',
      role: 'admin',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      joinedDate: new Date(2024, 0, 15),
      lastActive: new Date()
    },
    {
      id: 'member-2',
      name: 'Trần Thị Sale',
      email: 'sale1@company.com',
      role: 'sale',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b750?w=150&h=150&fit=crop&crop=face',
      joinedDate: new Date(2024, 1, 20),
      lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
    },
    {
      id: 'member-3',
      name: 'Lê Văn Marketing',
      email: 'marketing1@company.com',
      role: 'marketing',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      joinedDate: new Date(2024, 2, 10),
      lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
    },
    {
      id: 'member-4',
      name: 'Phạm Thị Sale 2',
      email: 'sale2@company.com',
      role: 'sale',
      status: 'pending',
      joinedDate: new Date(2024, 3, 5),
      lastActive: new Date(2024, 3, 5)
    },
    {
      id: 'member-5',
      name: 'Hoàng Văn Marketing 2',
      email: 'marketing2@company.com',
      role: 'marketing',
      status: 'inactive',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      joinedDate: new Date(2024, 1, 1),
      lastActive: new Date(2024, 10, 1)
    },
    {
      id: 'member-6',
      name: 'Vũ Thị CRM',
      email: 'crm@company.com',
      role: 'crm',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      joinedDate: new Date(2024, 3, 15),
      lastActive: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      permissions: ['customer_management', 'lead_management', 'report_view', 'data_export']
    },
    {
      id: 'member-7',
      name: 'Đặng Văn Manager',
      email: 'manager@company.com',
      role: 'manager',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      joinedDate: new Date(2024, 2, 1),
      lastActive: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      permissions: ['team_management', 'all_reports', 'system_settings', 'user_permissions']
    }
  ]);

  const getRoleLabel = (role: 'admin' | 'sale' | 'marketing' | 'crm' | 'manager') => {
    const roleMap = {
      admin: 'Admin',
      sale: 'Sale',
      marketing: 'Marketing',
      crm: 'CRM',
      manager: 'Manager'
    };
    return roleMap[role];
  };

  const getStatusLabel = (status: 'active' | 'pending' | 'inactive') => {
    const statusMap = {
      active: 'Hoạt động',
      pending: 'Chưa chấp nhận',
      inactive: 'Không hoạt động'
    };
    return statusMap[status];
  };

  const getStatusVariant = (status: 'active' | 'pending' | 'inactive') => {
    const variantMap = {
      active: 'default' as const,
      pending: 'secondary' as const,
      inactive: 'destructive' as const
    };
    return variantMap[status];
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date);
  };

  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Vừa xong';
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} ngày trước`;
    
    return formatDate(date);
  };

  const handleInviteMember = () => {
    if (!inviteEmail || !inviteRole) {
      alert('Vui lòng nhập email và chọn vai trò!');
      return;
    }

    // Check if email already exists
    const existingMember = teamMembers.find(member => member.email === inviteEmail);
    if (existingMember) {
      alert('Email này đã được mời hoặc đã là thành viên!');
      return;
    }

    // Create new team member
    const newMember: TeamMember = {
      id: `member-${Date.now()}`,
      name: inviteEmail.split('@')[0], // Use email prefix as temporary name
      email: inviteEmail,
      role: inviteRole,
      status: 'pending',
      joinedDate: new Date(),
      lastActive: new Date()
    };

    setTeamMembers(prev => [...prev, newMember]);
    setInviteEmail('');
    setInviteRole('sale');

    console.log('Sending invitation email to:', inviteEmail, 'with role:', inviteRole);
    alert(`Đã gửi lời mời đến ${inviteEmail} với vai trò ${getRoleLabel(inviteRole)}!`);
  };

  const handleDeleteMember = (member: TeamMember) => {
    setMemberToDelete(member);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteMember = () => {
    if (memberToDelete) {
      setTeamMembers(prev => prev.filter(member => member.id !== memberToDelete.id));
      console.log('Deleted member:', memberToDelete.email);
      alert(`Đã xóa thành viên ${memberToDelete.name} khỏi nhóm!`);
    }
    setDeleteDialogOpen(false);
    setMemberToDelete(null);
  };

  const handleChangeRole = (memberId: string, newRole: 'admin' | 'sale' | 'marketing' | 'crm' | 'manager') => {
    setTeamMembers(prev => prev.map(member => 
      member.id === memberId 
        ? { ...member, role: newRole }
        : member
    ));
    
    const member = teamMembers.find(m => m.id === memberId);
    console.log('Changed role for:', member?.email, 'to:', newRole);
    alert(`Đã thay đổi vai trò của ${member?.name} thành ${getRoleLabel(newRole)}!`);
  };

  const handleResendInvitation = (member: TeamMember) => {
    console.log('Resending invitation to:', member.email);
    alert(`Đã gửi lại lời mời đến ${member.email}!`);
  };

  const getTeamStats = () => {
    const total = teamMembers.length;
    const active = teamMembers.filter(m => m.status === 'active').length;
    const pending = teamMembers.filter(m => m.status === 'pending').length;
    const byRole = teamMembers.reduce((acc, member) => {
      acc[member.role] = (acc[member.role] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { total, active, pending, byRole };
  };

  const stats = getTeamStats();

  // Handle permission change
  const handlePermissionChange = (role: string, permission: keyof RolePermissions, checked: boolean) => {
    setRolePermissions(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [permission]: checked
      }
    }));
    setPermissionsModified(true);
  };

  // Save permissions
  const handleSavePermissions = () => {
    console.log('Saving permissions:', rolePermissions);
    setPermissionsModified(false);
    alert('Đã lưu cài đặt quyền hạn thành công!');
  };

  // Cancel permission changes
  const handleCancelPermissions = () => {
    // Reset to default permissions
    setRolePermissions({
      admin: { view: true, edit: true, create: true, delete: true, export: true },
      marketing: { view: true, edit: true, create: true, delete: false, export: true },
      sale: { view: true, edit: true, create: false, delete: false, export: false }
    });
    setPermissionsModified(false);
    alert('Đã hủy thay đổi và khôi phục về cài đặt mặc định!');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onClose}
              className="p-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-medium">Invite Team</h1>
              <p className="text-muted-foreground">Quản lý thành viên</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-8">
          {/* Team Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Tổng thành viên</span>
                </div>
                <p className="text-2xl font-semibold mt-2">{stats.total}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-sm font-medium">Hoạt động</span>
                </div>
                <p className="text-2xl font-semibold mt-2">{stats.active}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="text-sm font-medium">Chờ phản hồi</span>
                </div>
                <p className="text-2xl font-semibold mt-2">{stats.pending}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <span className="text-sm font-medium">Phân bố vai trò</span>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>Admin</span>
                      <span>{stats.byRole.admin || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Manager</span>
                      <span>{stats.byRole.manager || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CRM</span>
                      <span>{stats.byRole.crm || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sale</span>
                      <span>{stats.byRole.sale || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Marketing</span>
                      <span>{stats.byRole.marketing || 0}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Invite New Member */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Mời thành viên mới
              </CardTitle>
              <CardDescription>
                Thêm thành viên mới vào nhóm làm việc
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="inviteEmail">Email *</Label>
                  <Input
                    id="inviteEmail"
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="Nhập email thành viên mới"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inviteRole">Vai trò *</Label>
                  <Select 
                    value={inviteRole} 
                    onValueChange={(value: 'admin' | 'sale' | 'marketing' | 'crm' | 'manager') => setInviteRole(value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sale">Sale</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="crm">CRM</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button onClick={handleInviteMember} className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Gửi lời mời
                  </Button>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Quyền hạn theo vai trò</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium text-red-600 mb-2">🔑 Admin</h5>
                    <ul className="space-y-1 text-muted-foreground text-xs">
                      <li>• Toàn quyền hệ thống</li>
                      <li>• Quản lý thành viên</li>
                      <li>• Cài đặt hệ thống</li>
                      <li>• Xem tất cả báo cáo</li>
                      <li>• Backup & restore</li>
                      <li>• Quản lý thanh toán</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-600 mb-2">👑 Manager</h5>
                    <ul className="space-y-1 text-muted-foreground text-xs">
                      <li>• Quản lý team</li>
                      <li>• Xem báo cáo tổng hợp</li>
                      <li>• Phân quyền nhân viên</li>
                      <li>• Quản lý KPI</li>
                      <li>• Approve workflows</li>
                      <li>• Xem analytics</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-orange-600 mb-2">🎯 CRM</h5>
                    <ul className="space-y-1 text-muted-foreground text-xs">
                      <li>• Quản lý khách hàng</li>
                      <li>• Quản lý lead/data</li>
                      <li>• Phân bổ data</li>
                      <li>• Import/Export data</li>
                      <li>• Quản lý nhóm KH</li>
                      <li>• Báo cáo CRM</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-600 mb-2">💼 Sale</h5>
                    <ul className="space-y-1 text-muted-foreground text-xs">
                      <li>• Quản lý KH được giao</li>
                      <li>• Tạo/chỉnh sửa lead</li>
                      <li>• Ghi chú & nhắc nhở</li>
                      <li>• Xem báo cáo cá nhân</li>
                      <li>• Cập nhật trạng thái</li>
                      <li>• Theo dõi pipeline</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-600 mb-2">📊 Marketing</h5>
                    <ul className="space-y-1 text-muted-foreground text-xs">
                      <li>• Quản lý chiến dịch</li>
                      <li>• Xem báo cáo marketing</li>
                      <li>• Phân tích ROI</li>
                      <li>• Tích hợp quảng cáo</li>
                      <li>• Lead từ ads</li>
                      <li>• A/B testing</li>
                    </ul>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">💡 Chi tiết quyền hạn CRM</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-2">
                      <h6 className="font-medium text-orange-600">🗂️ Quản lý dữ liệu</h6>
                      <ul className="space-y-1 text-muted-foreground pl-3">
                        <li>• Tạo, sửa, xóa khách hàng</li>
                        <li>• Import data từ Excel/CSV</li>
                        <li>• Export báo cáo chi tiết</li>
                        <li>• Quản lý data trùng lặp</li>
                        <li>• Phục hồi data đã xóa</li>
                        <li>• Quản lý data xấu/lạnh</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h6 className="font-medium text-orange-600">⚙️ Cài đặt & Phân quyền</h6>
                      <ul className="space-y-1 text-muted-foreground pl-3">
                        <li>• Tạo/quản lý nhóm khách hàng</li>
                        <li>• Phân bổ lead cho sale</li>
                        <li>• Cài đặt quy trình tự động</li>
                        <li>• Quản lý cột & trường dữ liệu</li>
                        <li>• Thiết lập tags & phân loại</li>
                        <li>• Cấu hình báo cáo CRM</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Role Permissions Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Quản lý quyền hạn theo vai trò
              </CardTitle>
              <CardDescription>
                Cấu hình quyền truy cập chi tiết cho từng vai trò trong hệ thống
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-32">Vai trò</TableHead>
                      <TableHead className="text-center">Xem</TableHead>
                      <TableHead className="text-center">Sửa</TableHead>
                      <TableHead className="text-center">Tạo mới</TableHead>
                      <TableHead className="text-center">Xóa</TableHead>
                      <TableHead className="text-center">Export</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium text-red-600">
                        🔑 Admin
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          checked={rolePermissions.admin?.view || false}
                          onCheckedChange={(checked) => 
                            handlePermissionChange('admin', 'view', checked as boolean)
                          }
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          checked={rolePermissions.admin?.edit || false}
                          onCheckedChange={(checked) => 
                            handlePermissionChange('admin', 'edit', checked as boolean)
                          }
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          checked={rolePermissions.admin?.create || false}
                          onCheckedChange={(checked) => 
                            handlePermissionChange('admin', 'create', checked as boolean)
                          }
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          checked={rolePermissions.admin?.delete || false}
                          onCheckedChange={(checked) => 
                            handlePermissionChange('admin', 'delete', checked as boolean)
                          }
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          checked={rolePermissions.admin?.export || false}
                          onCheckedChange={(checked) => 
                            handlePermissionChange('admin', 'export', checked as boolean)
                          }
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-green-600">
                        📊 Marketing
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          checked={rolePermissions.marketing?.view || false}
                          onCheckedChange={(checked) => 
                            handlePermissionChange('marketing', 'view', checked as boolean)
                          }
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          checked={rolePermissions.marketing?.edit || false}
                          onCheckedChange={(checked) => 
                            handlePermissionChange('marketing', 'edit', checked as boolean)
                          }
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          checked={rolePermissions.marketing?.create || false}
                          onCheckedChange={(checked) => 
                            handlePermissionChange('marketing', 'create', checked as boolean)
                          }
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          checked={rolePermissions.marketing?.delete || false}
                          onCheckedChange={(checked) => 
                            handlePermissionChange('marketing', 'delete', checked as boolean)
                          }
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          checked={rolePermissions.marketing?.export || false}
                          onCheckedChange={(checked) => 
                            handlePermissionChange('marketing', 'export', checked as boolean)
                          }
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-blue-600">
                        💼 Sale
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          checked={rolePermissions.sale?.view || false}
                          onCheckedChange={(checked) => 
                            handlePermissionChange('sale', 'view', checked as boolean)
                          }
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          checked={rolePermissions.sale?.edit || false}
                          onCheckedChange={(checked) => 
                            handlePermissionChange('sale', 'edit', checked as boolean)
                          }
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          checked={rolePermissions.sale?.create || false}
                          onCheckedChange={(checked) => 
                            handlePermissionChange('sale', 'create', checked as boolean)
                          }
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          checked={rolePermissions.sale?.delete || false}
                          onCheckedChange={(checked) => 
                            handlePermissionChange('sale', 'delete', checked as boolean)
                          }
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          checked={rolePermissions.sale?.export || false}
                          onCheckedChange={(checked) => 
                            handlePermissionChange('sale', 'export', checked as boolean)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                {/* Action buttons */}
                {permissionsModified && (
                  <div className="flex items-center justify-end gap-3 pt-4 border-t">
                    <Button 
                      variant="outline" 
                      onClick={handleCancelPermissions}
                    >
                      Hủy
                    </Button>
                    <Button 
                      onClick={handleSavePermissions}
                      className="bg-primary hover:bg-primary-hover"
                    >
                      Lưu
                    </Button>
                  </div>
                )}
              </div>

              <Separator className="my-6" />

              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-medium mb-3">📝 Mô tả quyền hạn</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium text-primary mb-2">👁️ Xem</h5>
                    <p className="text-muted-foreground text-xs">
                      Quyền xem dữ liệu, báo cáo và thông tin trong hệ thống
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-primary mb-2">✏️ Sửa</h5>
                    <p className="text-muted-foreground text-xs">
                      Quyền chỉnh sửa thông tin khách hàng, lead và dữ liệu hiện có
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-primary mb-2">➕ Tạo mới</h5>
                    <p className="text-muted-foreground text-xs">
                      Quyền tạo mới khách hàng, lead, nhóm và các dữ liệu khác
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-primary mb-2">🗑️ Xóa</h5>
                    <p className="text-muted-foreground text-xs">
                      Quyền xóa dữ liệu khách hàng, lead và thông tin khỏi hệ thống
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-primary mb-2">📤 Export</h5>
                    <p className="text-muted-foreground text-xs">
                      Quyền xuất dữ liệu ra Excel, CSV và các định dạng khác
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Members List */}
          <Card>
            <CardHeader>
              <CardTitle>Danh sách thành viên</CardTitle>
              <CardDescription>
                Quản lý thông tin và quyền hạn của các thành viên trong nhóm
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Thành viên</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Vai trò</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Ngày tham gia</TableHead>
                    <TableHead>Hoạt động cuối</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{member.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          {member.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={member.role}
                          onValueChange={(value: 'admin' | 'sale' | 'marketing' | 'crm' | 'manager') => 
                            handleChangeRole(member.id, value)
                          }
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="crm">CRM</SelectItem>
                            <SelectItem value="sale">Sale</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(member.status)}>
                          {getStatusLabel(member.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(member.joinedDate)}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {member.status === 'active' ? getRelativeTime(member.lastActive) : '-'}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {member.status === 'pending' && (
                              <>
                                <DropdownMenuItem onClick={() => handleResendInvitation(member)}>
                                  <Send className="h-4 w-4 mr-2" />
                                  Gửi lại lời mời
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                              </>
                            )}
                            <DropdownMenuItem 
                              onClick={() => handleDeleteMember(member)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Xóa thành viên
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa thành viên</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa <strong>{memberToDelete?.name}</strong> khỏi nhóm? 
              Hành động này không thể hoàn tác và thành viên sẽ mất quyền truy cập vào hệ thống.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteMember}
              className="bg-destructive hover:bg-destructive/90"
            >
              Xóa thành viên
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}