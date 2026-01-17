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
  Edit3,
  AlertTriangle,
  Building2
} from 'lucide-react';
import { SmartGroupAssignmentPopup } from './SmartGroupAssignmentPopup';

interface BulkActionsButtonsProps {
  selectedCount: number;
  selectedCustomers?: any[];
  onAction: (action: string, data?: any) => void;
  availableGroups?: { id: string; name: string; }[];
  module?: 'crm' | 'lead-hub'; // Để xác định module hiện tại
}

export function BulkActionsButtons({ 
  selectedCount, 
  selectedCustomers = [], 
  onAction, 
  availableGroups = [],
  module = 'crm'
}: BulkActionsButtonsProps) {
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

  const handleDeleteConfirm = () => {
    const moduleDisplayName = module === 'crm' ? 'khách hàng' : 'leads';
    if (confirm(`⚠️ Bạn có chắc chắn muốn xóa ${selectedCount} ${moduleDisplayName} đã chọn?\n\nDữ liệu sẽ được chuyển vào thùng rác và có thể khôi phục sau này.`)) {
      onAction('bulk-delete');
    }
  };

  const handleMoveToCRMConfirm = () => {
    if (confirm(`📋 Chuyển ${selectedCount} leads đã chọn vào CRM?\n\nCác leads sẽ chuyển trạng thái thành "Đã chuyển CRM" và được xử lý như khách hàng.`)) {
      onAction('move-to-crm');
    }
  };

  const handleMoveToBadDataConfirm = () => {
    const reason = prompt(`📝 Nhập lý do chuyển ${selectedCount} ${module === 'crm' ? 'khách hàng' : 'leads'} vào Data xấu:`, 'Không có nhu cầu');
    if (reason !== null) { // User didn't cancel
      onAction('move-to-bad-data', { reason: reason.trim() || 'Không có nhu cầu' });
    }
  };

  return (
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 min-w-0">
      {/* Row 1: Selection Info */}
      <div className="flex items-center gap-2 mb-3">
        <Users className="h-4 w-4 text-purple-600 flex-shrink-0" />
        <span className="text-sm font-medium text-purple-800 whitespace-nowrap">
          Đã chọn {selectedCount} {module === 'crm' ? 'khách hàng' : 'leads'}
        </span>
      </div>

      {/* Row 2: Primary Actions - Responsive Grid */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {/* Delete Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleDeleteConfirm}
          className="border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 hover:text-red-800 flex-shrink-0"
        >
          <Trash2 className="h-4 w-4 mr-1.5" />
          <span className="hidden sm:inline">Xóa</span> ({selectedCount})
        </Button>

        {/* Move to CRM Button - Only show in Lead Hub */}
        {module === 'lead-hub' && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleMoveToCRMConfirm}
            className="border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-800 flex-shrink-0"
          >
            <Building2 className="h-4 w-4 mr-1.5" />
            <span className="hidden sm:inline">CRM</span> ({selectedCount})
          </Button>
        )}

        {/* Move to Bad Data Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleMoveToBadDataConfirm}
          className="border-amber-200 text-amber-700 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-800 flex-shrink-0"
        >
          <AlertTriangle className="h-4 w-4 mr-1.5" />
          <span className="hidden sm:inline">Data xấu</span> ({selectedCount})
        </Button>

        {/* Additional Actions Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-100 flex-shrink-0">
              <Settings className="h-4 w-4 mr-1.5" />
              <span className="hidden sm:inline">Khác</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
          {/* Bulk Edit */}
          <DropdownMenuItem 
            onClick={() => onAction('bulk-edit')}
            className="text-blue-600"
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Sửa hàng loạt tất cả cột
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Assign Sale */}
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

          {/* Change Status */}
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

          {/* Lead Quality - Only show in Lead Hub */}
          {module === 'lead-hub' && (
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
          )}

          {/* Assign Tags */}
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

          {/* Assign Products */}
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

          {/* Change Source */}
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

          {/* Group Management */}
          {availableGroups.length > 0 && (
            <>
              <DropdownMenuSeparator />
              
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
                    .filter(group => group.id !== 'main')
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
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Smart Group Assignment Popup */}
      <SmartGroupAssignmentPopup 
        isOpen={showSmartGroupAssignment}
        onClose={() => setShowSmartGroupAssignment(false)}
        selectedCustomers={selectedCustomers}
        availableGroups={availableGroups}
        onApply={handleSmartGroupApply}
      />
    </div>
  );
}