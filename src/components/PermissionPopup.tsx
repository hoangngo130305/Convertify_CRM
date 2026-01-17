import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Shield, Save } from 'lucide-react';

interface PermissionPopupProps {
  onClose: () => void;
}

interface Permission {
  view: boolean;
  edit: boolean;
  create: boolean;
  delete: boolean;
  export: boolean;
}

interface Role {
  id: string;
  name: string;
  permissions: Permission;
}

export function PermissionPopup({ onClose }: PermissionPopupProps) {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: 'admin',
      name: 'Admin',
      permissions: {
        view: true,
        edit: true,
        create: true,
        delete: true,
        export: true,
      },
    },
    {
      id: 'marketing',
      name: 'Marketing',
      permissions: {
        view: true,
        edit: true,
        create: true,
        delete: true,
        export: false,
      },
    },
    {
      id: 'sale',
      name: 'Sale',
      permissions: {
        view: true,
        edit: true,
        create: true,
        delete: false,
        export: false,
      },
    },
  ]);

  const updatePermission = (roleId: string, permission: keyof Permission, value: boolean) => {
    setRoles(prev => prev.map(role => 
      role.id === roleId 
        ? { ...role, permissions: { ...role.permissions, [permission]: value } }
        : role
    ));
  };

  const handleSave = () => {
    console.log('Saving permissions:', roles);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <DialogTitle className="text-xl font-medium text-gray-900">
                Phân quyền người dùng
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500 mt-1">
                Quản lý quyền truy cập và thao tác của từng vai trò trong hệ thống CRM
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 overflow-y-auto flex-1">
          {/* Permission Table */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-200 min-w-[120px]">
                      Vai trò
                    </th>
                    <th className="px-3 py-3 text-center text-sm font-medium text-gray-700 border-r border-gray-200 w-20">
                      Xem
                    </th>
                    <th className="px-3 py-3 text-center text-sm font-medium text-gray-700 border-r border-gray-200 w-20">
                      Sửa
                    </th>
                    <th className="px-3 py-3 text-center text-sm font-medium text-gray-700 border-r border-gray-200 w-24">
                      Tạo mới
                    </th>
                    <th className="px-3 py-3 text-center text-sm font-medium text-gray-700 border-r border-gray-200 w-20">
                      Xóa
                    </th>
                    <th className="px-3 py-3 text-center text-sm font-medium text-gray-700 w-24">
                      Export
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {roles.map((role) => (
                    <tr key={role.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 border-r border-gray-200">
                        {role.name}
                      </td>
                      <td className="px-3 py-3 text-center border-r border-gray-200">
                        <Checkbox
                          checked={role.permissions.view}
                          onCheckedChange={(checked) => 
                            updatePermission(role.id, 'view', checked as boolean)
                          }
                          disabled={role.id === 'admin'}
                        />
                      </td>
                      <td className="px-3 py-3 text-center border-r border-gray-200">
                        <Checkbox
                          checked={role.permissions.edit}
                          onCheckedChange={(checked) => 
                            updatePermission(role.id, 'edit', checked as boolean)
                          }
                          disabled={role.id === 'admin'}
                        />
                      </td>
                      <td className="px-3 py-3 text-center border-r border-gray-200">
                        <Checkbox
                          checked={role.permissions.create}
                          onCheckedChange={(checked) => 
                            updatePermission(role.id, 'create', checked as boolean)
                          }
                          disabled={role.id === 'admin'}
                        />
                      </td>
                      <td className="px-3 py-3 text-center border-r border-gray-200">
                        <Checkbox
                          checked={role.permissions.delete}
                          onCheckedChange={(checked) => 
                            updatePermission(role.id, 'delete', checked as boolean)
                          }
                          disabled={role.id === 'admin'}
                        />
                      </td>
                      <td className="px-3 py-3 text-center">
                        <Checkbox
                          checked={role.permissions.export}
                          onCheckedChange={(checked) => 
                            updatePermission(role.id, 'export', checked as boolean)
                          }
                          disabled={role.id === 'admin'}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Save className="h-4 w-4 mr-2" />
            Lưu
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}