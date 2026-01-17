import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  X, 
  Bell, 
  Calendar,
  Clock,
  Save,
  AlertCircle
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface ReminderPopupProps {
  customerId: string;
  customerName: string;
  onClose: () => void;
  onCreateReminder: (reminder: any) => void;
}

const REMINDER_MINUTES = [
  { value: '15', label: '15 phút' },
  { value: '30', label: '30 phút' },
  { value: '60', label: '1 giờ' },
  { value: '90', label: '1.5 giờ' },
  { value: '120', label: '2 giờ' },
  { value: '240', label: '4 giờ' },
  { value: '480', label: '8 giờ' },
  { value: '1440', label: '1 ngày' }
];

export function ReminderPopup({ customerId, customerName, onClose, onCreateReminder }: ReminderPopupProps) {
  const [reminderContent, setReminderContent] = useState('');
  const [reminderDate, setReminderDate] = useState('');
  const [reminderTime, setReminderTime] = useState('09:00');
  const [reminderBefore, setReminderBefore] = useState('30');

  const handleCreate = () => {
    if (!reminderContent || !reminderDate) {
      return;
    }

    const reminderDateTime = new Date(`${reminderDate}T${reminderTime}`);
    const notifyDateTime = new Date(reminderDateTime.getTime() - (parseInt(reminderBefore) * 60 * 1000));

    const reminder = {
      id: `reminder_${Date.now()}`,
      customerId,
      customerName,
      content: reminderContent,
      reminderDateTime,
      notifyDateTime,
      reminderBefore: parseInt(reminderBefore),
      status: 'pending',
      createdDate: new Date()
    };

    onCreateReminder(reminder);
    onClose();
  };

  const isFormValid = reminderContent && reminderDate;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-[95vw] max-h-[90vh] flex flex-col p-0 gap-0">
        {/* Header - Fixed */}
        <div className="flex-shrink-0 px-6 pt-6 pb-4 border-b border-border">
          <DialogHeader className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Bell className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <DialogTitle className="text-lg font-medium">Tạo nhắc nhở</DialogTitle>
                  <DialogDescription className="text-sm">
                    Thiết lập nhắc nhở cho <span className="font-medium text-purple-600">{customerName}</span>
                  </DialogDescription>
                </div>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-6 pb-4">
          <div className="space-y-5 pt-4">
            {/* Customer Info Card */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-purple-700">
                    {customerName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-purple-900">{customerName}</p>
                  <p className="text-xs text-purple-600">ID: {customerId}</p>
                </div>
              </div>
            </div>

            {/* Reminder Content */}
            <div>
              <label className="text-sm font-medium mb-2 block">Nội dung nhắc nhở *</label>
              <Textarea
                value={reminderContent}
                onChange={(e) => setReminderContent(e.target.value)}
                placeholder="Ví dụ: Gọi lại để confirm báo giá, Follow up khách hàng..."
                className="min-h-[100px] resize-none"
              />
              {!reminderContent && (
                <p className="text-xs text-red-500 mt-1">Vui lòng nhập nội dung nhắc nhở</p>
              )}
            </div>

            {/* Date and Time Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Ngày nhắc nhở *</label>
                <div className="relative">
                  <Input
                    type="date"
                    value={reminderDate}
                    onChange={(e) => setReminderDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
                {!reminderDate && (
                  <p className="text-xs text-red-500 mt-1">Chọn ngày</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Thời gian</label>
                <div className="relative">
                  <Input
                    type="time"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    className="w-full"
                  />
                  <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Reminder Before */}
            <div>
              <label className="text-sm font-medium mb-2 block">Nhắc trước</label>
              <Select value={reminderBefore} onValueChange={setReminderBefore}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {REMINDER_MINUTES.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-3.5 w-3.5 text-orange-500" />
                        {option.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                Bạn sẽ nhận được thông báo trước thời gian đã chọn
              </p>
            </div>

            {/* Preview */}
            {reminderDate && reminderTime && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-green-800 mb-2">Xem trước nhắc nhở</h4>
                <div className="space-y-1 text-sm text-green-700">
                  <p><Clock className="h-3.5 w-3.5 inline mr-1" />
                    Thời gian: {new Date(`${reminderDate}T${reminderTime}`).toLocaleString('vi-VN')}
                  </p>
                  <p><Bell className="h-3.5 w-3.5 inline mr-1" />
                    Thông báo: {new Date(new Date(`${reminderDate}T${reminderTime}`).getTime() - (parseInt(reminderBefore) * 60 * 1000)).toLocaleString('vi-VN')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer - Fixed */}
        <div className="flex-shrink-0 border-t border-border bg-background/95 backdrop-blur-sm">
          <div className="flex items-center justify-between p-6">
            <div className="text-sm text-muted-foreground">
              <span className={isFormValid ? 'text-green-600' : 'text-red-500'}>
                {isFormValid ? '✓ Sẵn sàng tạo nhắc nhở' : '⚠ Vui lòng điền đầy đủ thông tin'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={onClose} size="sm">
                Hủy
              </Button>
              <Button 
                onClick={handleCreate} 
                disabled={!isFormValid}
                className="bg-purple-600 hover:bg-purple-700"
                size="sm"
              >
                <Save className="h-4 w-4 mr-2" />
                Tạo nhắc nhở
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}