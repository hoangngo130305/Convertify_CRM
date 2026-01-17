import { useState } from 'react';
import { Button } from './ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from './ui/dropdown-menu';
import { 
  Users, 
  UserCheck, 
  Archive, 
  Trash2, 
  Tag, 
  Package, 
  Database,
  RotateCcw,
  ChevronDown,
  FolderOpen,
  Settings,
  Edit3
} from 'lucide-react';
import { SmartGroupAssignmentPopup } from './SmartGroupAssignmentPopup';

interface BulkActionsProps {
  selectedCount: number;
  selectedCustomers?: any[];
  onAction: (action: string, data?: any) => void;
  availableGroups?: { id: string; name: string; }[];
}

export function BulkActions({ selectedCount, selectedCustomers = [], onAction, availableGroups = [] }: BulkActionsProps) {
  const [showSmartGroupAssignment, setShowSmartGroupAssignment] = useState(false);

  const handleSmartGroupApply = (rules: any[], selectedGroupIds: string[]) => {
    if (rules.length > 0) {
      // Apply smart rules
      onAction('smart-group-assignment', { rules, selectedCustomers });
    } else if (selectedGroupIds.length > 0) {
      // Apply simple multi-group assignment
      onAction('multi-group-assignment', { groupIds: selectedGroupIds, selectedCustomers });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Users className="h-4 w-4 mr-2" />
            Thao tác hàng loạt ({selectedCount})
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          {/* Gán Sale */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserCheck className="h-4 w-4 mr-2" />
              Gán Sale
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => onAction('assign-sale-a')}>
                Nguyễn Văn A
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction('assign-sale-b')}>
                Trần Thị B
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction('assign-sale-c')}>
                Lê Văn C
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction('assign-sale-d')}>
                Phạm Thị D
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onAction('unassign-sale')}>
                Bỏ gán Sale
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          {/* Thay đổi trạng thái */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Archive className="h-4 w-4 mr-2" />
              Thay đổi trạng thái
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => onAction('status-new')}>
                Mới
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction('status-processing')}>
                Đang xử lý
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction('status-warning')}>
                Waning (Cảnh báo)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction('status-success')}>
                Thành công
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction('status-failed')}>
                Thất bại
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          {/* Xử lý chất lượng Lead */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserCheck className="h-4 w-4 mr-2" />
              Chất lượng Lead
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => onAction('quality-hot')}>
                Hot/Nóng
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction('quality-warm')}>
                Warm/Ấm
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction('quality-cold')}>
                Cold/Lạnh
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onAction('clear-warning')}>
                Xóa trạng thái Warning
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          {/* Gắn Tag */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Tag className="h-4 w-4 mr-2" />
              Gắn Tag
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => onAction('tag-vip')}>
                VIP Customer
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction('tag-potential')}>
                Tiềm năng cao
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction('tag-followup')}>
                Cần theo dõi
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction('tag-priority')}>
                Ưu tiên
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          {/* Gắn sản phẩm dịch vụ */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Package className="h-4 w-4 mr-2" />
              Gắn sản phẩm/dịch vụ
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => onAction('product-website')}>
                Website Design
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction('product-seo')}>
                SEO Service
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction('product-marketing')}>
                Digital Marketing
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction('product-ecommerce')}>
                E-commerce
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          {/* Nguồn Lead */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Database className="h-4 w-4 mr-2" />
              Đổi nguồn Lead
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => onAction('source-facebook')}>
                Facebook
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction('source-google')}>
                Google
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction('source-tiktok')}>
                TikTok
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction('source-zalo')}>
                Zalo
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction('source-hotline')}>
                Hotline
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction('source-website')}>
                Website
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction('source-referral')}>
                Giới thiệu
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction('source-walkin')}>
                Khách vãng lai
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction('source-other')}>
                Khác
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSeparator />

          {/* Smart Group Assignment - NEW ENHANCED */}
          {availableGroups.length > 0 && (
            <>
              <DropdownMenuItem onClick={() => setShowSmartGroupAssignment(true)}>
                <Settings className="h-4 w-4 mr-2 text-blue-600" />
                <div>
                  <div>Phân nhóm thông minh</div>
                  <div className="text-xs text-muted-foreground">Nhiều group + Logic AND</div>
                </div>
              </DropdownMenuItem>
              
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <FolderOpen className="h-4 w-4 mr-2" />
                  Chuyển vào Group (đơn)
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {availableGroups
                    .filter(group => group.id !== 'main') // Exclude main group
                    .map((group) => (
                    <DropdownMenuItem 
                      key={group.id}
                      onClick={() => onAction('move-to-group', { groupId: group.id, groupName: group.name })}
                    >
                      {group.name}
                    </DropdownMenuItem>
                  ))}
                  {availableGroups.filter(group => group.id !== 'main').length === 0 && (
                    <DropdownMenuItem disabled>
                      Chưa có group nào
                    </DropdownMenuItem>
                  )}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </>
          )}

          <DropdownMenuSeparator />

          {/* Sửa hàng loạt - NEW */}
          <DropdownMenuItem 
            onClick={() => onAction('bulk-edit')}
            className="text-blue-600"
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Sửa hàng loạt tất cả cột
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Chuyển CRM */}
          <DropdownMenuItem 
            onClick={() => onAction('move-to-crm')}
            className="text-orange-600"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Chuyển về CRM
          </DropdownMenuItem>

          {/* Chuyển Data xấu */}
          <DropdownMenuItem 
            onClick={() => onAction('move-to-bad-data')}
            className="text-red-600"
          >
            <Archive className="h-4 w-4 mr-2" />
            Chuyển về Data xấu
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Xóa hàng loạt */}
          <DropdownMenuItem 
            onClick={() => onAction('bulk-delete')}
            className="text-red-600"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Xóa hàng loạt
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Smart Group Assignment Popup */}
      <SmartGroupAssignmentPopup 
        isOpen={showSmartGroupAssignment}
        onClose={() => setShowSmartGroupAssignment(false)}
        selectedCustomers={selectedCustomers}
        availableGroups={availableGroups}
        onApply={handleSmartGroupApply}
      />
    </>
  );
}