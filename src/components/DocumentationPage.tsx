import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { 
  ArrowLeft, 
  Play, 
  FileText, 
  Search,
  Clock,
  Users,
  Star,
  Download,
  Eye,
  BookOpen,
  Video,
  HelpCircle,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

interface DocumentationPageProps {
  onClose: () => void;
  defaultTab?: 'videos' | 'documents' | 'faqs'; // Add 'faqs' option
}

export function DocumentationPage({ onClose, defaultTab = 'videos' }: DocumentationPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Mock data for videos
  const videos = [
    {
      id: 'v1',
      title: 'Hướng dẫn sử dụng CRM cơ bản',
      description: 'Làm quen với giao diện và các tính năng cơ bản của hệ thống CRM',
      duration: '12:30',
      views: 2543,
      rating: 4.8,
      category: 'basic',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
      level: 'Cơ bản'
    },
    {
      id: 'v2', 
      title: 'Quản lý khách hàng và dữ liệu',
      description: 'Cách thêm, chỉnh sửa và quản lý thông tin khách hàng hiệu quả',
      duration: '18:45',
      views: 1987,
      rating: 4.9,
      category: 'customer',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop',
      level: 'Trung bình'
    },
    {
      id: 'v3',
      title: 'Bộ lọc và tìm kiếm nâng cao',
      description: 'Sử dụng các bộ lọc và tính năng tìm kiếm để quản lý dữ liệu hiệu quả',
      duration: '15:20',
      views: 1654,
      rating: 4.7,
      category: 'advanced',
      thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=225&fit=crop',
      level: 'Nâng cao'
    },
    {
      id: 'v4',
      title: 'Automation và quy trình tự động',
      description: 'Thiết lập các quy trình tự động hóa để tối ưu công việc',
      duration: '22:10',
      views: 987,
      rating: 4.9,
      category: 'automation',
      thumbnail: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=225&fit=crop',
      level: 'Nâng cao'
    },
    {
      id: 'v5',
      title: 'Báo cáo và phân tích dữ liệu',
      description: 'Tạo báo cáo và phân tích hiệu suất kinh doanh từ dữ liệu CRM',
      duration: '16:55',
      views: 1432,
      rating: 4.6,
      category: 'reports',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
      level: 'Trung bình'
    },
    {
      id: 'v6',
      title: 'Quản lý nhóm và phân quyền',
      description: 'Cài đặt quyền truy cập và quản lý nhóm người dùng trong hệ thống',
      duration: '13:40',
      views: 876,
      rating: 4.5,
      category: 'admin',
      thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=225&fit=crop',
      level: 'Nâng cao'
    }
  ];

  // Mock data for documents
  const documents = [
    {
      id: 'd1',
      title: 'Hướng dẫn sử dụng CRM - Phiên bản đầy đủ',
      description: 'Tài liệu hướng dẫn chi tiết tất cả tính năng của hệ thống CRM',
      type: 'PDF',
      size: '2.5 MB',
      pages: 45,
      category: 'manual',
      downloadUrl: '#',
      lastUpdated: '2024-11-15'
    },
    {
      id: 'd2',
      title: 'Checklist onboarding cho người dùng mới',
      description: 'Danh sách các bước cần thực hiện khi bắt đầu sử dụng CRM',
      type: 'PDF',
      size: '850 KB',
      pages: 8,
      category: 'guide',
      downloadUrl: '#',
      lastUpdated: '2024-11-10'
    },
    {
      id: 'd3',
      title: 'Template import dữ liệu Excel',
      description: 'File Excel mẫu để import dữ liệu khách hàng vào hệ thống',
      type: 'XLSX',
      size: '125 KB',
      pages: 3,
      category: 'template',
      downloadUrl: '#',
      lastUpdated: '2024-11-08'
    },
    {
      id: 'd4',
      title: 'API Documentation',
      description: 'Tài liệu hướng dẫn tích hợp API cho developers',
      type: 'PDF',
      size: '1.8 MB',
      pages: 32,
      category: 'api',
      downloadUrl: '#',
      lastUpdated: '2024-11-12'
    },
    {
      id: 'd5',
      title: 'Troubleshooting - Xử lý sự cố thường gặp',
      description: 'Hướng dẫn khắc phục các lỗi và sự cố phổ biến',
      type: 'PDF',
      size: '1.2 MB',
      pages: 18,
      category: 'troubleshooting',
      downloadUrl: '#',
      lastUpdated: '2024-11-14'
    }
  ];

  // Mock data for FAQs
  const faqs = [
    {
      id: 'faq1',
      question: 'Làm sao để thêm khách hàng mới vào hệ thống?',
      answer: 'Bạn có thể thêm khách hàng mới bằng cách click vào nút "Thêm khách hàng" trên dashboard hoặc sử dụng tính năng import từ file Excel. Hệ thống sẽ tự động kiểm tra và thông báo nếu có dữ liệu trùng lặp.',
      category: 'basic',
      views: 1250,
      helpful: 890
    },
    {
      id: 'faq2',
      question: 'Tại sao dữ liệu khách hàng của tôi bị trùng lặp?',
      answer: 'Dữ liệu trùng lặp có thể xảy ra khi import từ nhiều nguồn khác nhau hoặc do nhập liệu thủ công. Hệ thống cung cấp tính năng "Quản lý dữ liệu trùng lặp" để bạn có thể kiểm tra và hợp nhất các bản ghi trùng lặp một cách dễ dàng.',
      category: 'customer',
      views: 980,
      helpful: 756
    },
    {
      id: 'faq3',
      question: 'Làm thế nào để thiết lập automation cho email marketing?',
      answer: 'Vào mục "Automation" trong cài đặt, bật tính năng "Email notification" và cấu hình các điều kiện trigger. Bạn có thể thiết lập gửi email tự động khi có lead mới, khi khách hàng thay đổi trạng thái, hoặc theo lịch trình định sẵn.',
      category: 'automation',
      views: 743,
      helpful: 612
    },
    {
      id: 'faq4',
      question: 'Tôi có thể tạo báo cáo tùy chỉnh không?',
      answer: 'Có, hệ thống hỗ trợ tạo báo cáo tùy chỉnh với nhiều loại biểu đồ và bộ lọc khác nhau. Bạn có thể chọn các trường dữ liệu cần thiết, thiết lập thời gian báo cáo và xuất file theo nhiều định dạng như PDF, Excel.',
      category: 'reports',
      views: 567,
      helpful: 445
    },
    {
      id: 'faq5',
      question: 'Làm sao để phân quyền cho nhân viên trong team?',
      answer: 'Trong mục "Quản lý nhóm", bạn có thể tạo các vai trò khác nhau (Admin, Manager, Sale) với quyền hạn tương ứng. Mỗi nhân viên có thể được gán nhiều vai trò và chỉ có thể truy cập những chức năng được phép.',
      category: 'admin',
      views: 456,
      helpful: 378
    },
    {
      id: 'faq6',
      question: 'Hệ thống có hỗ trợ import dữ liệu từ CRM cũ không?',
      answer: 'Có, hệ thống hỗ trợ import từ các định dạng phổ biến như CSV, Excel và có thể tích hợp API với các CRM khác như Salesforce, HubSpot. Liên hệ support để được hỗ trợ migration dữ liệu.',
      category: 'advanced',
      views: 321,
      helpful: 267
    },
    {
      id: 'faq7',
      question: 'Tại sao tôi không thể đăng nhập vào hệ thống?',
      answer: 'Kiểm tra lại username/password, đảm bảo rằng tài khoản chưa bị khóa và kết nối internet ổn định. Nếu vẫn không được, sử dụng tính năng "Quên mật khẩu" hoặc liên hệ admin để reset tài khoản.',
      category: 'troubleshooting',
      views: 1100,
      helpful: 845
    },
    {
      id: 'faq8',
      question: 'Có thể sử dụng CRM trên điện thoại không?',
      answer: 'Có, giao diện CRM được thiết kế responsive và tương thích hoàn toàn với mobile. Bạn có thể truy cập qua trình duyệt di động hoặc cài đặt PWA để có trải nghiệm tương tự app native.',
      category: 'basic',
      views: 890,
      helpful: 723
    }
  ];

  // Filter content based on search and category
  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || video.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || doc.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', name: 'Tất cả', icon: BookOpen },
    { id: 'basic', name: 'Cơ bản', icon: HelpCircle },
    { id: 'customer', name: 'Quản lý KH', icon: Users },
    { id: 'advanced', name: 'Nâng cao', icon: Star },
    { id: 'automation', name: 'Automation', icon: CheckCircle },
    { id: 'reports', name: 'Báo cáo', icon: FileText },
    { id: 'admin', name: 'Quản trị', icon: Users }
  ];

  const handlePlayVideo = (videoId: string) => {
    console.log(`Playing video: ${videoId}`);
    alert(`🎬 Đang phát video: ${videos.find(v => v.id === videoId)?.title}`);
  };

  const handleDownloadDocument = (docId: string) => {
    console.log(`Downloading document: ${docId}`);
    alert(`📥 Đang tải xuống: ${documents.find(d => d.id === docId)?.title}`);
  };

  const handleFAQHelpful = (faqId: string) => {
    console.log(`FAQ ${faqId} marked as helpful`);
    alert('✅ Cảm ơn bạn đã đánh giá câu trả lời này hữu ích!');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onClose}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại Dashboard
              </Button>
              <div className="h-6 w-px bg-border" />
              <div>
                <h1 className="text-xl font-semibold">📚 Tài liệu hướng dẫn sử dụng</h1>
                <p className="text-sm text-muted-foreground">
                  Video hướng dẫn, tài liệu và câu hỏi thường gặp về cách sử dụng hệ thống CRM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm video, tài liệu hoặc câu hỏi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category.id)}
                  className="h-8"
                >
                  <Icon className="h-3 w-3 mr-1.5" />
                  {category.name}
                </Button>
              );
            })}
          </div>
        </div>

        <Tabs defaultValue={defaultTab} className="space-y-6">
          <TabsList className="grid w-full max-w-lg grid-cols-3">
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Video hướng dẫn
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Tài liệu
            </TabsTrigger>
            <TabsTrigger value="faqs" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              FAQ
            </TabsTrigger>
          </TabsList>

          {/* Videos Tab */}
          <TabsContent value="videos" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map(video => (
                <Card key={video.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        onClick={() => handlePlayVideo(video.id)}
                        className="bg-white/90 text-black hover:bg-white"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Phát video
                      </Button>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-black/60 text-white">
                        {video.duration}
                      </Badge>
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          video.level === 'Cơ bản' ? 'bg-green-100 text-green-700 border-green-300' :
                          video.level === 'Trung bình' ? 'bg-yellow-100 text-yellow-700 border-yellow-300' :
                          'bg-red-100 text-red-700 border-red-300'
                        }`}
                      >
                        {video.level}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">{video.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{video.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {video.views.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {video.rating}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredVideos.length === 0 && (
              <div className="text-center py-12">
                <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">Không tìm thấy video</h3>
                <p className="text-sm text-muted-foreground">
                  Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc danh mục
                </p>
              </div>
            )}
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocuments.map(doc => (
                <Card key={doc.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-sm font-semibold line-clamp-2 mb-1">
                          {doc.title}
                        </CardTitle>
                        <CardDescription className="text-xs line-clamp-2">
                          {doc.description}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="ml-2 text-xs">
                        {doc.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Kích thước: {doc.size}</span>
                        <span>{doc.pages} trang</span>
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        Cập nhật: {new Date(doc.lastUpdated).toLocaleDateString('vi-VN')}
                      </div>

                      <Separator />

                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleDownloadDocument(doc.id)}
                      >
                        <Download className="h-3 w-3 mr-2" />
                        Tải xuống
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredDocuments.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">Không tìm thấy tài liệu</h3>
                <p className="text-sm text-muted-foreground">
                  Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc danh mục
                </p>
              </div>
            )}
          </TabsContent>

          {/* FAQs Tab */}
          <TabsContent value="faqs" className="space-y-6">
            <div className="space-y-4">
              {filteredFAQs.map(faq => (
                <Card key={faq.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-base font-semibold mb-2">
                          {faq.question}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {faq.answer}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="ml-4 text-xs">
                        {faq.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {faq.views.toLocaleString()} lượt xem
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          {faq.helpful.toLocaleString()} hữu ích
                        </div>
                      </div>
                      
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleFAQHelpful(faq.id)}
                      >
                        <CheckCircle className="h-3 w-3 mr-2" />
                        Hữu ích
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredFAQs.length === 0 && (
              <div className="text-center py-12">
                <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">Không tìm thấy câu hỏi</h3>
                <p className="text-sm text-muted-foreground">
                  Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc danh mục
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Quick Start Guide */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold mb-4">🚀 Bắt đầu nhanh</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handlePlayVideo('v1')}>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 text-sm font-semibold">1</span>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Làm quen với CRM</h3>
                  <p className="text-xs text-muted-foreground mt-1">Tìm hiểu giao diện cơ bản</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Clock className="h-3 w-3" />
                    <span className="text-xs">12:30</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handlePlayVideo('v2')}>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 text-sm font-semibold">2</span>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Quản lý khách hàng</h3>
                  <p className="text-xs text-muted-foreground mt-1">Thêm và chỉnh sửa thông tin</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Clock className="h-3 w-3" />
                    <span className="text-xs">18:45</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handlePlayVideo('v3')}>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 text-sm font-semibold">3</span>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Bộ lọc nâng cao</h3>
                  <p className="text-xs text-muted-foreground mt-1">Tìm kiếm và lọc dữ liệu</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Clock className="h-3 w-3" />
                    <span className="text-xs">15:20</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handlePlayVideo('v4')}>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-600 text-sm font-semibold">4</span>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Automation</h3>
                  <p className="text-xs text-muted-foreground mt-1">Tự động hóa quy trình</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Clock className="h-3 w-3" />
                    <span className="text-xs">22:10</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}