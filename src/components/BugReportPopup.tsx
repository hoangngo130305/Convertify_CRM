import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { 
  Bug,
  Send,
  AlertTriangle,
  X
} from 'lucide-react';

interface BugReportPopupProps {
  onClose: () => void;
}

export function BugReportPopup({ onClose }: BugReportPopupProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    contactInfo: ''
  });

  const handleSubmitReport = () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      alert('⚠️ Vui lòng nhập đầy đủ tiêu đề và mô tả');
      return;
    }

    const reportData = {
      type: 'bug',
      ...formData,
      submittedAt: new Date(),
      id: `bug_${Date.now()}`
    };

    console.log('📝 Báo cáo lỗi:', reportData);
    
    // Mock API call
    setTimeout(() => {
      alert('✅ Đã gửi báo cáo lỗi thành công!\n\nTeam kỹ thuật sẽ kiểm tra và khắc phục trong thời gian sớm nhất.');
      setFormData({ title: '', description: '', priority: 'medium', contactInfo: '' });
      onClose();
    }, 500);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-6 border-b border-red-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <Bug className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <DialogTitle className="text-lg text-red-600">
                🐛 Báo cáo lỗi
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Báo cáo lỗi hoặc sự cố trong hệ thống để được khắc phục
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Title */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Mô tả ngắn về lỗi *
            </Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="VD: Không thể lưu thông tin khách hàng"
              className="w-full"
            />
          </div>

          {/* Description */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Mô tả chi tiết lỗi *
            </Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Mô tả chi tiết lỗi: Bước nào gây ra lỗi? Lỗi xảy ra khi nào? Thông báo lỗi hiển thị gì?"
              rows={6}
              className="w-full"
            />
          </div>

          {/* Priority */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Mức độ nghiêm trọng
            </Label>
            <RadioGroup 
              value={formData.priority} 
              onValueChange={(value) => setFormData({...formData, priority: value})}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="low" />
                <Label htmlFor="low" className="cursor-pointer text-green-600">Thấp</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium" className="cursor-pointer text-yellow-600">Trung bình</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="high" />
                <Label htmlFor="high" className="cursor-pointer text-red-600">Cao</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Contact Info */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Thông tin liên hệ (tùy chọn)
            </Label>
            <Input
              value={formData.contactInfo}
              onChange={(e) => setFormData({...formData, contactInfo: e.target.value})}
              placeholder="Email hoặc SĐT để chúng tôi liên hệ phản hồi"
              className="w-full"
            />
          </div>

          {/* Info box */}
          <div className="p-4 rounded-lg border bg-orange-50 border-orange-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium mb-1 text-orange-900">
                  ⚠️ Lưu ý:
                </p>
                <p className="text-sm text-orange-700">
                  Báo cáo lỗi sẽ được team kỹ thuật ưu tiên xử lý. Lỗi nghiêm trọng sẽ được khắc phục trong 2-4h, lỗi thường sẽ được xử lý trong 24h.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-100">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Hủy
          </Button>
          <Button 
            onClick={handleSubmitReport}
            className="bg-red-600 hover:bg-red-700"
          >
            <Send className="h-4 w-4 mr-2" />
            Gửi báo cáo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}