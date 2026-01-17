import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { 
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  Sparkles,
  Bug,
  BookOpen,
  FileText,
  Video,
  Send
} from 'lucide-react';

interface SupportPopupProps {
  onClose: () => void;
  onOpenFeatureRequest: () => void;
  onOpenBugReport: () => void;
  onOpenDocumentation?: (type?: 'videos' | 'documents' | 'faqs') => void; // Updated to include 'faqs'
  onOpenFAQs?: () => void;
}

export function SupportPopup({ onClose, onOpenFeatureRequest, onOpenBugReport, onOpenDocumentation, onOpenFAQs }: SupportPopupProps) {
  const handleSupportAction = (action: string) => {
    console.log(`Support action: ${action}`);
    if (action === 'chat') {
      alert('🎧 Đang kết nối với Support chat...');
    } else if (action === 'call') {
      alert('📞 Vui lòng gọi hotline: 1900-xxxx để được hỗ trợ trực tiếp');
    } else if (action === 'email') {
      window.open('mailto:support@company.com?subject=Hỗ trợ CRM&body=Mô tả vấn đề của bạn...');
    }
  };

  const handleOpenDocumentationWithType = (type: 'videos' | 'documents' | 'faqs') => {
    onClose();
    onOpenDocumentation?.(type); // Always use documentation page with the specific tab
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <HelpCircle className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <DialogTitle className="text-lg text-purple-600">
                🎧 Hỗ trợ
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Liên hệ support, tài liệu hướng dẫn và gửi yêu cầu
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Liên hệ hỗ trợ */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">💬 Liên hệ hỗ trợ trực tiếp</h3>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start h-12 text-purple-600 border-purple-200 hover:bg-purple-50"
                onClick={() => handleSupportAction('chat')}
              >
                <MessageCircle className="h-4 w-4 mr-3" />
                Chat với Support (Online 8h-22h)
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start h-12 text-purple-600 border-purple-200 hover:bg-purple-50"
                onClick={() => handleSupportAction('call')}
              >
                <Phone className="h-4 w-4 mr-3" />
                Gọi Hotline: 1900-xxxx (24/7)
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start h-12 text-purple-600 border-purple-200 hover:bg-purple-50"
                onClick={() => handleSupportAction('email')}
              >
                <Mail className="h-4 w-4 mr-3" />
                Gửi Email: support@company.com
              </Button>
            </div>
          </div>

          <Separator />

          {/* Tài liệu hướng dẫn sử dụng */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">📚 Tài liệu hướng dẫn sử dụng</h3>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start h-12 text-purple-600 border-purple-200 hover:bg-purple-50"
                onClick={() => handleOpenDocumentationWithType('videos')}
              >
                <Video className="h-4 w-4 mr-3" />
                Video hướng dẫn
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start h-12 text-purple-600 border-purple-200 hover:bg-purple-50"
                onClick={() => handleOpenDocumentationWithType('documents')}
              >
                <BookOpen className="h-4 w-4 mr-3" />
                Tài liệu hướng dẫn
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start h-12 text-purple-600 border-purple-200 hover:bg-purple-50"
                onClick={() => handleOpenDocumentationWithType('faqs')}
              >
                <FileText className="h-4 w-4 mr-3" />
                Câu hỏi thường gặp
              </Button>
            </div>
          </div>

          <Separator />

          {/* Gửi yêu cầu & Báo cáo - 2 buttons riêng */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">📝 Gửi yêu cầu & Báo cáo</h3>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start h-12 text-blue-600 border-blue-200 hover:bg-blue-50"
                onClick={() => {
                  onClose();
                  onOpenFeatureRequest();
                }}
              >
                <Sparkles className="h-4 w-4 mr-3" />
                Gửi yêu cầu tính năng mới
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start h-12 text-red-600 border-red-200 hover:bg-red-50"
                onClick={() => {
                  onClose();
                  onOpenBugReport();
                }}
              >
                <Bug className="h-4 w-4 mr-3" />
                Báo cáo lỗi
              </Button>
            </div>
          </div>

          <Separator />
        </div>
      </DialogContent>
    </Dialog>
  );
}