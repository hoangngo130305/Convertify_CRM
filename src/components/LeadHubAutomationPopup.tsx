import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Checkbox } from './ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { 
  Zap, 
  Save, 
  Tag, 
  Clock, 
  Users, 
  Info,
  Bell,
  UserCheck,
  TrendingUp,
  Sparkles
} from 'lucide-react';

interface LeadHubAutomationPopupProps {
  onClose: () => void;
  automationSettings: any;
  onUpdateSettings: (settings: any) => void;
}

interface TagItem {
  id: string;
  name: string;
  color: string;
}

export function LeadHubAutomationPopup({ onClose, automationSettings, onUpdateSettings }: LeadHubAutomationPopupProps) {
  // 1. Cài đặt TAG mặc định
  const [selectedDefaultTags, setSelectedDefaultTags] = useState<string[]>([]);
  const [availableTags] = useState<TagItem[]>([
    { id: '1', name: 'Lead nóng', color: '#ef4444' },
    { id: '2', name: 'Lead ấm', color: '#f59e0b' },
    { id: '3', name: 'Lead lạnh', color: '#06b6d4' },
    { id: '4', name: 'Tiềm năng cao', color: '#8b5cf6' },
    { id: '5', name: 'Ưu tiên', color: '#ec4899' },
    { id: '6', name: 'Facebook Lead', color: '#1877f2' },
    { id: '7', name: 'TikTok Lead', color: '#ff0050' },
    { id: '8', name: 'Google Lead', color: '#4285f4' }
  ]);

  // 2. Cài đặt nhắc nhở Sale
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [reminderMinutes, setReminderMinutes] = useState(30); // Shorter for Lead Hub

  // 3. Lead Hub specific settings
  const [leadQualificationEnabled, setLeadQualificationEnabled] = useState(true);
  const [autoAssignSalesEnabled, setAutoAssignSalesEnabled] = useState(true);
  const [leadScoringEnabled, setLeadScoringEnabled] = useState(false);

  // Functions
  const toggleDefaultTag = (tagId: string) => {
    setSelectedDefaultTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleSave = () => {
    const newSettings = {
      defaultTags: selectedDefaultTags.map(tagId => 
        availableTags.find(tag => tag.id === tagId)
      ).filter(Boolean),
      salesReminder: {
        enabled: reminderEnabled,
        minutes: reminderMinutes
      },
      leadQualification: {
        enabled: leadQualificationEnabled
      },
      autoAssignSales: {
        enabled: autoAssignSalesEnabled
      },
      leadScoring: {
        enabled: leadScoringEnabled
      }
    };
    
    console.log('💾 Lưu cài đặt Lead Hub automation:', newSettings);
    onUpdateSettings(newSettings);
    onClose();
  };

  // Load settings on mount
  useEffect(() => {
    if (automationSettings) {
      setSelectedDefaultTags(automationSettings.defaultTags?.map((tag: any) => tag.id) || []);
      setReminderEnabled(automationSettings.salesReminder?.enabled ?? true);
      setReminderMinutes(automationSettings.salesReminder?.minutes || 30);
      
      // Load Lead Hub specific settings
      setLeadQualificationEnabled(automationSettings.leadQualification?.enabled ?? true);
      setAutoAssignSalesEnabled(automationSettings.autoAssignSales?.enabled ?? true);
      setLeadScoringEnabled(automationSettings.leadScoring?.enabled ?? false);
    }
  }, [automationSettings]);

  return (
    <TooltipProvider>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0 pb-4 border-b border-border/50">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/10 to-purple-600/20 rounded-xl flex items-center justify-center">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-600 rounded-full flex items-center justify-center">
                  <Sparkles className="h-2.5 w-2.5 text-white" />
                </div>
              </div>
              <div>
                <DialogTitle className="text-2xl text-foreground flex items-center gap-2">
                  Lead Hub Automation
                  <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-800">Lead Hub</Badge>
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Thiết lập tự động hóa thông minh cho quy trình Lead Hub - quản lý và xử lý lead hiệu quả
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <Tabs defaultValue="tags" className="flex-1 flex flex-col min-h-0">
            <div className="flex-shrink-0 mb-6">
              <TabsList className="grid grid-cols-3 w-full gap-2 p-1 bg-muted/50 rounded-xl h-14">
                <TabsTrigger value="tags" className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <Tag className="h-4 w-4" />
                  <span className="text-xs font-medium">TAG Lead</span>
                </TabsTrigger>
                <TabsTrigger value="reminders" className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs font-medium">Nhắc nhở</span>
                </TabsTrigger>
                <TabsTrigger value="qualification" className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <UserCheck className="h-4 w-4" />
                  <span className="text-xs font-medium">Chất lượng</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-y-auto">
              {/* 1. Cài đặt TAG mặc định */}
              <TabsContent value="tags" className="space-y-6 mt-0">
                <Card className="border-border/50 shadow-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Tag className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">TAG mặc định cho Lead mới</CardTitle>
                        <CardDescription>
                          Chọn các TAG mặc định sẽ được áp dụng tự động khi tạo Lead mới trong Lead Hub
                        </CardDescription>
                      </div>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Các TAG mặc định sẽ áp dụng khi tạo Lead mới trong Lead Hub</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium mb-3 block">
                        Chọn TAG mặc định cho Lead Hub (có thể chọn nhiều)
                      </Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
                        {availableTags.map(tag => (
                          <div
                            key={tag.id}
                            onClick={() => toggleDefaultTag(tag.id)}
                            className={`cursor-pointer p-2 rounded-md border transition-all duration-150 hover:shadow-sm group ${ 
                              selectedDefaultTags.includes(tag.id)
                                ? 'border-purple-500 bg-purple-50 shadow-sm'
                                : 'border-border hover:border-purple-400 hover:bg-muted/30'
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="flex-shrink-0">
                                <Checkbox
                                  checked={selectedDefaultTags.includes(tag.id)}
                                  readOnly
                                  className="h-3.5 w-3.5"
                                />
                              </div>
                              <div
                                className="w-3 h-3 rounded-full flex-shrink-0 ring-1 ring-white/20"
                                style={{ backgroundColor: tag.color }}
                              />
                              <span className="text-xs font-medium truncate leading-relaxed">{tag.name}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Hiển thị số lượng tag đã chọn */}
                      {selectedDefaultTags.length > 0 && (
                        <div className="mt-2 text-xs text-muted-foreground">
                          Đã chọn {selectedDefaultTags.length} TAG mặc định cho Lead Hub
                        </div>
                      )}
                    </div>

                    {selectedDefaultTags.length > 0 && (
                      <div className="bg-purple-50 p-2.5 rounded-md border border-purple-200">
                        <Label className="text-xs font-medium text-purple-700 mb-1.5 block">
                          TAG đã chọn sẽ áp dụng mặc định cho Lead mới:
                        </Label>
                        <div className="flex flex-wrap gap-1">
                          {selectedDefaultTags.map(tagId => {
                            const tag = availableTags.find(t => t.id === tagId);
                            return tag ? (
                              <Badge
                                key={tag.id}
                                style={{ backgroundColor: tag.color }}
                                className="text-white text-xs px-1.5 py-0.5 h-auto"
                              >
                                <div
                                  className="w-1.5 h-1.5 rounded-full mr-1 ring-1 ring-white/30"
                                  style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
                                />
                                {tag.name}
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 2. Cài đặt nhắc nhở Sale */}
              <TabsContent value="reminders" className="space-y-6 mt-0">
                <Card className="border-border/50 shadow-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Bell className="h-4 w-4 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">Nhắc nhở xử lý Lead mới</CardTitle>
                        <CardDescription>
                          Thiết lập thời gian nhắc nhở Sale khi có Lead mới chưa được xử lý (tối ưu cho Lead Hub)
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-200">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-orange-600" />
                        <div>
                          <Label className="font-medium">
                            Bật nhắc nhở tự động cho Lead Hub
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Tự động nhắc nhở khi Sale không xử lý Lead trong thời gian quy định (nhanh hơn CRM)
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={reminderEnabled}
                        onCheckedChange={setReminderEnabled}
                      />
                    </div>

                    {reminderEnabled && (
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium mb-3 block">
                            Thời gian nhắc nhở (phút) - tối ưu cho Lead Hub
                          </Label>
                          <div className="flex items-center gap-3">
                            <Input
                              type="number"
                              value={reminderMinutes}
                              onChange={(e) => setReminderMinutes(parseInt(e.target.value) || 30)}
                              className="w-20"
                              min="5"
                              max="480"
                            />
                            <span className="text-sm text-muted-foreground">phút</span>
                            <div className="text-xs text-muted-foreground ml-4">
                              💡 Lead Hub thường cần xử lý nhanh hơn (30 phút so với 60 phút của CRM)
                            </div>
                          </div>
                        </div>

                        <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                          <div className="flex items-start gap-2">
                            <Info className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-purple-800">
                              <p className="font-medium mb-1">Cách hoạt động cho Lead Hub:</p>
                              <ul className="space-y-1 text-xs">
                                <li>• Khi có Lead mới từ form/ads → gửi thông báo ngay lập tức</li>
                                <li>• Sau {reminderMinutes} phút nếu Lead chưa được xử lý → nhắc nhở Sale</li>
                                <li>• Nhắc nhở lại mỗi {Math.floor(reminderMinutes / 2)} phút cho đến khi xử lý</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 3. Cài đặt kiểm tra chất lượng Lead */}
              <TabsContent value="qualification" className="space-y-6 mt-0">
                <Card className="border-border/50 shadow-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <UserCheck className="h-4 w-4 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">Kiểm tra chất lượng Lead tự động</CardTitle>
                        <CardDescription>
                          Workflow tự động kiểm tra và xử lý Lead chưa điền chất lượng
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-200">
                      <div className="flex items-center gap-3">
                        <UserCheck className="h-5 w-5 text-orange-600" />
                        <div>
                          <Label className="font-medium">
                            Bật kiểm tra chất lượng tự động
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Tự động kiểm tra Lead mới có điền trường chất lượng chưa
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={leadQualificationEnabled}
                        onCheckedChange={setLeadQualificationEnabled}
                      />
                    </div>

                    {leadQualificationEnabled && (
                      <>
                        <div>
                          <Label className="text-sm font-medium mb-3 block">
                            Hành động khi Lead mới chưa điền chất lượng
                          </Label>
                          <Select defaultValue="warning">
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn hành động" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="warning">Chuyển trạng thái Warning - Chờ bổ sung</SelectItem>
                              <SelectItem value="move-to-crm">Tự động chuyển vào CRM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="text-sm font-medium mb-3 block">
                            Thời gian chờ trước khi xử lý tiếp (giờ)
                          </Label>
                          <Input
                            type="number"
                            defaultValue="24"
                            min="1"
                            max="168"
                            className="w-full"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Thời gian tối đa chờ bổ sung chất lượng trước khi tự động xử lý (1-168 giờ)
                          </p>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-sm font-medium">Tùy chọn thông báo</Label>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="email-warning" defaultChecked />
                              <Label htmlFor="email-warning" className="text-sm">
                                Gửi email cảnh báo khi Lead chuyển sang Warning
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="email-move-crm" defaultChecked />
                              <Label htmlFor="email-move-crm" className="text-sm">
                                Gửi email thông báo khi tự động chuyển vào CRM
                              </Label>
                            </div>
                          </div>
                        </div>

                        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                          <div className="flex items-start gap-2">
                            <Info className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-amber-800">
                              <p className="font-medium mb-2">Workflow hoạt động:</p>
                              <ol className="space-y-1 text-xs list-decimal list-inside">
                                <li>Lead mới được tạo → Kiểm tra trường "Chất lượng"</li>
                                <li>Nếu chưa điền → Chuyển trạng thái "Warning"</li>
                                <li>Gửi email cảnh báo cho team (tùy chọn)</li>
                                <li>Chờ trong thời gian đã cấu hình</li>
                                <li>Sau timeout:
                                  <ul className="ml-4 mt-1 space-y-0.5">
                                    <li>• Nếu cài "Warning": Giữ nguyên trạng thái</li>
                                    <li>• Nếu cài "Chuyển CRM": Tự động chuyển vào CRM</li>
                                  </ul>
                                </li>
                              </ol>
                            </div>
                          </div>
                        </div>

                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                          <div className="flex items-start gap-2">
                            <Bell className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-blue-800">
                              <p className="font-medium mb-1">Lưu ý quan trọng:</p>
                              <ul className="space-y-1 text-xs">
                                <li>• Lead ở trạng thái "Warning" sẽ hiển thị màu cam để dễ nhận biết</li>
                                <li>• Có thể bổ sung chất lượng bất cứ lúc nào để xóa Warning</li>
                                <li>• Workflow chỉ áp dụng cho Lead mới, không ảnh hưởng Lead cũ</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>

          {/* Footer */}
          <div className="flex-shrink-0 flex items-center justify-end gap-3 pt-4 border-t border-border/50">
            <Button variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
              <Save className="h-4 w-4 mr-2" />
              Lưu cài đặt
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}