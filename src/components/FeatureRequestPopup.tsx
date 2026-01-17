import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { 
  Sparkles,
  Send,
  CheckCircle,
  X
} from 'lucide-react';

interface FeatureRequestPopupProps {
  onClose: () => void;
}

export function FeatureRequestPopup({ onClose }: FeatureRequestPopupProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    contactInfo: ''
  });

  const handleSubmitRequest = () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      alert('⚠️ Vui lòng nhập đầy đủ tiêu đề và mô tả');
      return;
    }

    const requestData = {
      type: 'feature',
      ...formData,
      submittedAt: new Date(),
      id: `feature_${Date.now()}`
    };

    console.log('📝 Yêu cầu tính năng:', requestData);
    
    // Mock API call
    setTimeout(() => {
      alert('✅ Đã gửi yêu cầu tính năng mới thành công!\n\nChúng tôi sẽ xem xét và phản hồi trong vòng 24-48h.');
      setFormData({ title: '', description: '', priority: 'medium', contactInfo: '' });
      onClose();
    }, 500);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-6 border-b border-blue-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <DialogTitle className="text-lg text-blue-600">
                ✨ Gửi yêu cầu tính năng
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Đề xuất tính năng mới để cải thiện hệ thống CRM
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Title */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Tên tính năng *
            </Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="VD: Export dữ liệu ra Excel"
              className="w-full"
            />
          </div>

          {/* Description */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Mô tả chi tiết tính năng *
            </Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Mô tả chi tiết tính năng bạn muốn thêm vào hệ thống. Tính năng này sẽ giúp ích như thế nào?"
              rows={6}
              className="w-full"
            />
          </div>

          {/* Priority */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Mức độ ưu tiên
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
          <div className="p-4 rounded-lg border bg-blue-50 border-blue-200">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium mb-1 text-blue-900">
                  💡 Lưu ý:
                </p>
                <p className="text-sm text-blue-700">
                  Yêu cầu tính năng sẽ được team phát triển xem xét và phản hồi trong vòng 24-48h. Tính năng phù hợp sẽ được đưa vào kế hoạch phát triển.
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
            onClick={handleSubmitRequest}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-4 w-4 mr-2" />
            Gửi yêu cầu
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}