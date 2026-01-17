import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import { createRegistration } from '../lib/api';

interface RegistrationPopupProps {
  onClose: () => void;
}

export function RegistrationPopup({ onClose }: RegistrationPopupProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    note: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc!', {
        description: 'Họ và tên và Email là các trường bắt buộc.',
        duration: 3000,
      });
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Email không hợp lệ!', {
        description: 'Vui lòng nhập địa chỉ email đúng định dạng.',
        duration: 3000,
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Gọi API Django
      const response = await createRegistration({
        name: formData.name,
        email: formData.email,
        note: formData.note || undefined,
      });
      
      console.log('Registration success:', response);
      
      // Show success toast
      toast.success('🎉 Đăng ký thành công!', {
        description: `Cảm ơn ${formData.name} đã đăng ký. Chúng tôi sẽ liên hệ với bạn qua email ${formData.email} khi bản chính thức ra mắt.`,
        duration: 5000,
      });
      
      // Reset form
      setFormData({ name: '', email: '', note: '' });
      
      // Close popup after a short delay to let toast show
      setTimeout(() => {
        onClose();
      }, 500);
      
    } catch (error: any) {
      console.error('Registration error:', error);
      
      // Hiển thị lỗi từ backend
      const errorMessage = error.message || 'Đăng ký thất bại. Vui lòng thử lại.';
      
      toast.error('❌ Đăng ký thất bại!', {
        description: errorMessage,
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-gradient-to-br from-purple-600 via-purple-500 to-purple-600 rounded-2xl p-1 shadow-2xl animate-scaleIn z-10">
        <div className="bg-white rounded-[14px] p-6 relative">
          {/* Close button */}
          <button
            onClick={onClose}
            type="button"
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors z-10"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
          
          {/* Header */}
          <div className="mb-5 pr-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Đăng ký nhân bản chính thức
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Convertify CRM hiện đang trong giai đoạn hoàn thiện. Hãy đăng ký bản chính thức miễn phí khi ra mắt.
            </p>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name field */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1.5 block">
                Họ và tên <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder=""
                required
              />
            </div>
            
            {/* Email field */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1.5 block">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder=""
                required
              />
            </div>
            
            {/* Note field */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1.5 block">
                Ghi chú
              </Label>
              <Textarea
                value={formData.note}
                onChange={(e) => handleChange('note', e.target.value)}
                className="w-full min-h-[100px] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                placeholder=""
              />
            </div>
            
            {/* Submit button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Đang gửi...' : 'Đăng ký'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}