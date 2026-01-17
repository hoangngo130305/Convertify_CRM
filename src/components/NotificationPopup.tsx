import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Bell,
  Search,
  ArrowUpDown,
  Circle
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'all' | 'work' | 'system' | 'customer';
  title: string;
  content: string;
  time: string;
  timeDetail: string;
  isRead: boolean;
  actionText?: string;
  avatar: string;
  avatarBg: string;
}

interface NotificationPopupProps {
  onClose: () => void;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'system',
    title: 'Hệ thống',
    content: 'Gói cước Đăng ký ngay 4RXQRj của bạn sẽ hết hạn sau 11 ngày nữa',
    time: '2 ngày trước',
    timeDetail: 'Hệ thống',
    isRead: false,
    actionText: 'Nâng cấp!',
    avatar: 'S',
    avatarBg: 'bg-orange-500'
  },
  {
    id: '2',
    type: 'system',
    title: 'Hệ thống',
    content: 'Backup dữ liệu hệ thống đã hoàn tất thành công. Tất cả dữ liệu khách hàng và báo cáo đã được sao lưu an toàn.',
    time: '3 ngày trước',
    timeDetail: 'Hệ thống',
    isRead: true,
    avatar: 'B',
    avatarBg: 'bg-green-500'
  },
  {
    id: '3',
    type: 'work',
    title: 'Công việc',
    content: 'Bạn có 5 lead mới cần xử lý từ chiến dịch Facebook Ads. Vui lòng kiểm tra và phân bổ cho team sale.',
    time: '4 giờ trước',
    timeDetail: 'Lead Hub',
    isRead: false,
    actionText: 'Xem ngay',
    avatar: 'L',
    avatarBg: 'bg-blue-500'
  },
  {
    id: '4',
    type: 'customer',
    title: 'Khách hàng',
    content: 'Khách hàng Nguyễn Văn A đã hoàn thành thanh toán gói dịch vụ Website Design trị giá 10,000,000 VNĐ.',
    time: '6 giờ trước',
    timeDetail: 'CRM',
    isRead: false,
    avatar: 'K',
    avatarBg: 'bg-purple-500'
  },
  {
    id: '5',
    type: 'system',
    title: 'Hệ thống',
    content: 'Phiên bản mới v2.1.5 đã được cập nhật với nhiều tính năng mới và cải thiện hiệu suất.',
    time: '1 ngày trước',
    timeDetail: 'Hệ thống',
    isRead: true,
    actionText: 'Xem chi tiết',
    avatar: 'U',
    avatarBg: 'bg-indigo-500'
  },
  {
    id: '6',
    type: 'work',
    title: 'Công việc',
    content: 'Báo cáo tuần này chưa được hoàn thành. Deadline là 17:00 hôm nay. Vui lòng cập nhật tiến độ.',
    time: '2 giờ trước',
    timeDetail: 'Báo cáo',
    isRead: false,
    actionText: 'Cập nhật',
    avatar: 'R',
    avatarBg: 'bg-red-500'
  },
  {
    id: '7',
    type: 'customer',
    title: 'Khách hàng',
    content: 'Có 3 khách hàng VIP sinh nhật trong tuần này. Đã gửi email chúc mừng và ưu đãi đặc biệt.',
    time: '1 ngày trước',
    timeDetail: 'CRM',
    isRead: true,
    avatar: 'V',
    avatarBg: 'bg-pink-500'
  },
  {
    id: '8',
    type: 'system',
    title: 'Hệ thống',
    content: 'Thông báo bảo trì hệ thống: Server sẽ được bảo trì vào 02:00 - 04:00 ngày mai. Vui lòng lưu dữ liệu.',
    time: '5 giờ trước',
    timeDetail: 'Hệ thống',
    isRead: false,
    actionText: 'Đã hiểu',
    avatar: 'M',
    avatarBg: 'bg-yellow-500'
  },
  {
    id: '9',
    type: 'work',
    title: 'Công việc',
    content: 'Task tối ưu SEO cho website khách hàng ABC Company đã hoàn thành 80%. Dự kiến hoàn thành vào ngày mai.',
    time: '8 giờ trước',
    timeDetail: 'Dự án',
    isRead: true,
    avatar: 'T',
    avatarBg: 'bg-teal-500'
  },
  {
    id: '10',
    type: 'customer',
    title: 'Khách hàng',
    content: 'Khách hàng Trần Thị B đã để lại đánh giá 5 sao cho dịch vụ Digital Marketing. Cảm ơn team đã làm tốt!',
    time: '12 giờ trước',
    timeDetail: 'CRM',
    isRead: false,
    avatar: '⭐',
    avatarBg: 'bg-amber-500'
  },
  {
    id: '11',
    type: 'system',
    title: 'Hệ thống',
    content: 'Cập nhật tính năng mới: Xuất báo cáo Excel với filter nâng cao đã được thêm vào module CRM.',
    time: '1 ngày trước',
    timeDetail: 'Hệ thống',
    isRead: true,
    actionText: 'Thử ngay',
    avatar: '🔧',
    avatarBg: 'bg-blue-500'
  },
  {
    id: '12',
    type: 'work',
    title: 'Công việc',
    content: 'Reminder: Họp weekly meeting vào 10:00 sáng thứ 2 để review tình hình leads và đề xuất cải thiện quy trình.',
    time: '2 ngày trước',
    timeDetail: 'Calendar',
    isRead: false,
    avatar: '📅',
    avatarBg: 'bg-purple-500'
  },
  {
    id: '13',
    type: 'customer',
    title: 'Khách hàng',
    content: 'Phản hồi từ khách hàng Lê Văn C: "Dịch vụ SEO rất hiệu quả, website đã lên top 3 Google sau 2 tháng."',
    time: '2 ngày trước',
    timeDetail: 'CRM',
    isRead: true,
    avatar: '💬',
    avatarBg: 'bg-green-500'
  },
  {
    id: '14',
    type: 'system',
    title: 'Hệ thống',
    content: 'Thống kê tháng 10: Tổng cộng 127 leads mới, tỷ lệ conversion 23.5%, tăng 5% so với tháng trước.',
    time: '3 ngày trước',
    timeDetail: 'Analytics',
    isRead: false,
    actionText: 'Xem chi tiết',
    avatar: '📊',
    avatarBg: 'bg-indigo-500'
  },
  {
    id: '15',
    type: 'work',
    title: 'Công việc',
    content: 'Task: Hoàn thiện setup automation cho email marketing campaign Q4. Deadline: Cuối tuần này.',
    time: '4 ngày trước',
    timeDetail: 'Project',
    isRead: true,
    avatar: '📧',
    avatarBg: 'bg-rose-500'
  }
];

const filterTabs = [
  { id: 'all', label: 'Tất cả', count: 15 },
  { id: 'assigned', label: 'Phân công cho tôi', count: 3 },
  { id: 'work', label: 'Công việc', count: 4 },
  { id: 'system', label: 'Hệ thống', count: 6 }
];

export function NotificationPopup({ onClose }: NotificationPopupProps) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [markAllRead, setMarkAllRead] = useState(false);

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = activeFilter === 'all' || 
      (activeFilter === 'system' && notification.type === 'system') ||
      (activeFilter === 'work' && notification.type === 'work') ||
      (activeFilter === 'assigned' && notification.type === 'customer');
    const matchesSearch = notification.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleMarkAllRead = (checked: boolean) => {
    setMarkAllRead(checked);
    if (checked) {
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[90vw] h-[90vh] p-0 overflow-hidden flex flex-col">
        {/* Fixed Header */}
        <DialogHeader className="px-6 py-4 pr-14 border-b border-border flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-lg text-foreground">
                Thông báo
              </DialogTitle>
              <DialogDescription className="sr-only">
                Quản lý và xem tất cả thông báo của hệ thống
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="mark-all-read"
                checked={markAllRead}
                onCheckedChange={handleMarkAllRead}
                className="h-4 w-4"
              />
              <label 
                htmlFor="mark-all-read" 
                className="text-sm text-muted-foreground cursor-pointer select-none"
              >
                Đánh dấu đã đọc tất cả
              </label>
            </div>
          </div>
        </DialogHeader>

        {/* Fixed Tabs Navigation */}
        <div className="px-6 py-4 border-b border-border flex-shrink-0">
          <Tabs value={activeFilter} onValueChange={setActiveFilter} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-muted h-10 p-1">
              {filterTabs.map((tab) => (
                <TabsTrigger 
                  key={tab.id} 
                  value={tab.id}
                  className="flex items-center justify-center gap-2 h-8 px-3 text-sm rounded-md data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm"
                >
                  <span className="truncate">{tab.label}</span>
                  <Badge 
                    variant="secondary" 
                    className="text-xs h-4 min-w-[16px] px-1.5 text-muted-foreground"
                  >
                    {tab.count}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Fixed Search Bar */}
        <div className="px-6 py-4 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm thông báo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-9 bg-background border-border text-sm"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-4 gap-2 text-sm"
            >
              <ArrowUpDown className="h-4 w-4" />
              Sắp xếp
            </Button>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 min-h-0 overflow-hidden">
          <Tabs value={activeFilter} onValueChange={setActiveFilter} className="h-full">
            {filterTabs.map((tab) => (
              <TabsContent 
                key={tab.id} 
                value={tab.id} 
                className="h-full m-0 data-[state=active]:block overflow-hidden"
              >
                {filteredNotifications.length > 0 ? (
                  <div className="h-full overflow-y-auto custom-scrollbar">
                    <div className="px-6 py-4">
                      {/* Section Header */}
                      <div className="text-sm text-muted-foreground pb-3 border-b border-border mb-4">
                        Cũ
                      </div>
                      
                      {/* Notifications List */}
                      <div className="space-y-0">
                        {filteredNotifications.map((notification, index) => (
                          <div key={notification.id} className="group">
                            <div className="flex items-start gap-3 py-4">
                              {/* Avatar */}
                              <div className={`w-8 h-8 rounded-full ${notification.avatarBg} flex items-center justify-center text-white font-medium text-sm flex-shrink-0`}>
                                {notification.avatar}
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0 space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                  <span className="font-medium text-foreground">{notification.title}</span>
                                  <span className="text-muted-foreground">•</span>
                                  <span className="text-muted-foreground">{notification.time}</span>
                                  <span className="text-muted-foreground">•</span>
                                  <span className="text-muted-foreground">{notification.timeDetail}</span>
                                </div>
                                
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {notification.content}
                                </p>
                                
                                {notification.actionText && (
                                  <div className="pt-1">
                                    <button className="text-sm text-primary font-medium hover:text-primary/80 transition-colors">
                                      {notification.actionText}
                                    </button>
                                  </div>
                                )}
                              </div>

                              {/* Unread Indicator */}
                              {!notification.isRead && (
                                <div className="flex-shrink-0 pt-2">
                                  <Circle className="w-2 h-2 fill-green-500 text-green-500" />
                                </div>
                              )}
                            </div>
                            
                            {/* Divider */}
                            {index < filteredNotifications.length - 1 && (
                              <div className="border-b border-border/50" />
                            )}
                          </div>
                        ))}
                        
                        {/* Extra padding at bottom to ensure last item is visible */}
                        <div className="h-8"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center px-6 py-12">
                      <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                      <p className="text-base text-foreground mb-2">Không có thông báo</p>
                      <p className="text-sm text-muted-foreground">Các thông báo sẽ xuất hiện ở đây</p>
                    </div>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}