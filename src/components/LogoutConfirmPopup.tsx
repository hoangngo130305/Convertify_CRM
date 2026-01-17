import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { LogOut, X } from 'lucide-react';

interface LogoutConfirmPopupProps {
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutConfirmPopup({ onClose, onConfirm }: LogoutConfirmPopupProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader className="pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <LogOut className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <DialogTitle className="text-lg text-purple-600">
                Xác nhận đăng xuất
              </DialogTitle>
            </div>
          </div>
          <DialogDescription className="text-gray-600">
            Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?
          </DialogDescription>
        </DialogHeader>

        <div className="pt-4 border-t border-gray-100">
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 mb-6">
            <p className="text-sm text-purple-700">
              💡 <strong>Lưu ý:</strong> Sau khi đăng xuất, bạn sẽ cần đăng nhập lại để tiếp tục sử dụng hệ thống CRM.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              <X className="h-4 w-4 mr-2" />
              Hủy
            </Button>
            <Button 
              onClick={onConfirm}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Đăng xuất
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}