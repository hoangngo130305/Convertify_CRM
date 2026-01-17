import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { X, Settings, Upload, Clock, Globe, Database, Users, Plus } from 'lucide-react';

interface SetRulePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveRule: (rule: any) => void;
}

// Mock data for source selection (3 nguồn: CRM, Lead Hub, Data xấu/rác)
const dataSources = [
  { id: 'crm', name: 'CRM', icon: '👥', color: '#3b82f6', description: 'Dữ liệu khách hàng từ CRM' },
  { id: 'leadhub', name: 'Lead Hub', icon: '🎯', color: '#10b981', description: 'Dữ liệu leads từ Lead Hub' },
  { id: 'bad-data', name: 'Data Xấu/Rác', icon: '🗑️', color: '#ef4444', description: 'Dữ liệu xấu và rác' }
];

// Quality filters for good/bad data
const qualityFilters = [
  { 
    id: 'good', 
    name: 'Data Tốt', 
    color: '#10b981', 
    description: 'Hot/Nóng, Warm/Ấm từ CRM + Lead Hub',
    qualities: ['Hot/Nóng', 'Warm/Ấm']
  },
  { 
    id: 'bad', 
    name: 'Data Xấu', 
    color: '#ef4444', 
    description: 'Cold/Lạnh từ tất cả nguồn',
    qualities: ['Cold/Lạnh']
  }
];

// Custom filters for columns that CRM, Lead Hub, Data xấu/rác all have
const customFilters = [
  { 
    id: 'name',
    name: 'Tên khách hàng',
    type: 'text',
    operators: ['chứa', 'không chứa', 'bằng', 'khác']
  },
  { 
    id: 'phone',
    name: 'Số điện thoại',
    type: 'text',
    operators: ['chứa', 'không chứa', 'bằng', 'khác']
  },
  { 
    id: 'email',
    name: 'Email',
    type: 'text',
    operators: ['chứa', 'không chứa', 'bằng', 'khác']
  },
  { 
    id: 'source',
    name: 'Nguồn',
    type: 'select',
    operators: ['bằng', 'khác'],
    options: ['Facebook', 'Google', 'TikTok', 'Zalo', 'Hotline', 'Website', 'Giới thiệu']
  },
  { 
    id: 'products',
    name: 'Sản phẩm/Dịch vụ',
    type: 'select',
    operators: ['chứa', 'không chứa'],
    options: ['Website Design', 'SEO Service', 'Digital Marketing', 'E-commerce', 'Mobile App']
  },
  { 
    id: 'assignedSale',
    name: 'Sale phụ trách',
    type: 'select',
    operators: ['bằng', 'khác'],
    options: ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D', 'Chưa phân bổ']
  },
  { 
    id: 'revenue',
    name: 'Doanh thu',
    type: 'number',
    operators: ['bằng', 'lớn hơn', 'nhỏ hơn', 'từ', 'đến']
  },
  { 
    id: 'createdDate',
    name: 'Ngày tạo',
    type: 'date',
    operators: ['bằng', 'trước', 'sau', 'từ', 'đến']
  }
];

// Upload destinations for Custom Audience
const uploadDestinations = [
  { id: 'facebook', name: 'Facebook Ads', icon: '📘', color: '#1877f2' },
  { id: 'google', name: 'Google Ads', icon: '🌐', color: '#4285f4' },
  { id: 'tiktok', name: 'TikTok Ads', icon: '🎵', color: '#000000' },
  { id: 'zalo', name: 'Zalo Ads', icon: '💬', color: '#0068ff' }
];

// Auto upload frequency options
const frequencyOptions = [
  { id: 'manual', label: 'Thủ công', description: 'Upload khi có yêu cầu' },
  { id: 'daily', label: 'Hàng ngày', description: 'Upload vào 6:00 sáng mỗi ngày' },
  { id: 'weekly', label: 'Hàng tuần', description: 'Upload vào Chủ nhật hàng tuần' },
  { id: 'monthly', label: 'Hàng tháng', description: 'Upload vào ngày 1 hàng tháng' }
];

interface CustomFilter {
  id: string;
  columnId: string;
  operator: string;
  value: string;
}

export function SetRulePopup({ isOpen, onClose, onSaveRule }: SetRulePopupProps) {
  const [selectedSources, setSelectedSources] = useState<string[]>(['crm', 'leadhub']);
  const [selectedQuality, setSelectedQuality] = useState<string>('good');
  const [customFilterRules, setCustomFilterRules] = useState<CustomFilter[]>([]);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(['facebook']);
  const [frequency, setFrequency] = useState<string>('daily');
  const [customAudienceName, setCustomAudienceName] = useState<string>('');
  
  // Reset form when popup opens
  useEffect(() => {
    if (isOpen) {
      setSelectedSources(['crm', 'leadhub']);
      setSelectedQuality('good');
      setCustomFilterRules([]);
      setSelectedDestinations(['facebook']);
      setFrequency('daily');
      setCustomAudienceName('');
    }
  }, [isOpen]);

  const handleSourceToggle = (sourceId: string) => {
    setSelectedSources(prev => 
      prev.includes(sourceId) 
        ? prev.filter(id => id !== sourceId)
        : [...prev, sourceId]
    );
  };

  const handleDestinationToggle = (destinationId: string) => {
    setSelectedDestinations(prev => 
      prev.includes(destinationId) 
        ? prev.filter(id => id !== destinationId)
        : [...prev, destinationId]
    );
  };

  const addCustomFilter = () => {
    const newFilter: CustomFilter = {
      id: `filter_${Date.now()}`,
      columnId: '',
      operator: '',
      value: ''
    };
    setCustomFilterRules(prev => [...prev, newFilter]);
  };

  const removeCustomFilter = (filterId: string) => {
    setCustomFilterRules(prev => prev.filter(f => f.id !== filterId));
  };

  const updateCustomFilter = (filterId: string, field: keyof CustomFilter, value: string) => {
    setCustomFilterRules(prev => prev.map(filter => 
      filter.id === filterId 
        ? { ...filter, [field]: value }
        : filter
    ));
  };

  const getFilterOperators = (columnId: string) => {
    const column = customFilters.find(f => f.id === columnId);
    return column?.operators || [];
  };

  const getFilterOptions = (columnId: string) => {
    const column = customFilters.find(f => f.id === columnId);
    return column?.options || [];
  };

  const handleSaveRule = () => {
    // Validate required fields
    if (selectedSources.length === 0) {
      alert('Vui lòng chọn ít nhất một nguồn dữ liệu!');
      return;
    }

    if (selectedDestinations.length === 0) {
      alert('Vui lòng chọn ít nhất một destination để upload!');
      return;
    }

    if (!customAudienceName.trim()) {
      alert('Vui lòng nhập tên Custom Audience!');
      return;
    }

    // Validate custom filters
    const incompleteFilters = customFilterRules.filter(f => !f.columnId || !f.operator || !f.value);
    if (incompleteFilters.length > 0) {
      alert('Vui lòng hoàn thành tất cả các filter hoặc xóa các filter chưa hoàn thành!');
      return;
    }

    const rule = {
      id: `rule_${Date.now()}`,
      name: customAudienceName,
      sources: selectedSources,
      quality: selectedQuality,
      customFilters: customFilterRules,
      destinations: selectedDestinations,
      frequency,
      createdAt: new Date(),
      isActive: true
    };

    console.log('Saving auto upload rule:', rule);
    onSaveRule(rule);
    
    // Show success message
    const sourceNames = selectedSources.map(id => dataSources.find(s => s.id === id)?.name).join(', ');
    const destNames = selectedDestinations.map(id => uploadDestinations.find(d => d.id === id)?.name).join(', ');
    const qualityName = qualityFilters.find(q => q.id === selectedQuality)?.name;
    const freqLabel = frequencyOptions.find(f => f.id === frequency)?.label;
    
    alert(`✅ Đã lưu rule thành công!\n\n📊 Tên: ${customAudienceName}\n📂 Nguồn: ${sourceNames}\n🎯 Chất lượng: ${qualityName}\n📤 Upload đến: ${destNames}\n⏰ Tần suất: ${freqLabel}\n🔧 Filters: ${customFilterRules.length} điều kiện`);
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            Set Auto Upload Rule
          </DialogTitle>
          <DialogDescription>
            Thiết lập quy tắc tự động upload Custom Audience từ các nguồn dữ liệu
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6 pb-4">
            {/* Custom Audience Name */}
            <div className="space-y-2">
              <Label className="font-medium">Tên Custom Audience</Label>
              <Input
                placeholder="Nhập tên cho Custom Audience (VD: Khách tiềm năng Q4 2024)"
                value={customAudienceName}
                onChange={(e) => setCustomAudienceName(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Data Sources Selection */}
            <div className="space-y-3">
              <Label className="font-medium">Nguồn dữ liệu</Label>
              <p className="text-sm text-muted-foreground">
                Chọn các nguồn dữ liệu để tạo Custom Audience
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {dataSources.map(source => (
                  <div key={source.id} className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                    <Checkbox
                      id={source.id}
                      checked={selectedSources.includes(source.id)}
                      onCheckedChange={() => handleSourceToggle(source.id)}
                    />
                    <Label htmlFor={source.id} className="cursor-pointer flex items-center gap-2 flex-1">
                      <span className="text-lg">{source.icon}</span>
                      <div>
                        <div className="font-medium">{source.name}</div>
                        <div className="text-xs text-muted-foreground">{source.description}</div>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality Filter */}
            <div className="space-y-3">
              <Label className="font-medium">Lọc theo chất lượng</Label>
              <p className="text-sm text-muted-foreground">
                Chọn loại data để upload Custom Audience
              </p>
              
              <RadioGroup value={selectedQuality} onValueChange={setSelectedQuality}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {qualityFilters.map(filter => (
                    <div key={filter.id} className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                      <RadioGroupItem value={filter.id} id={filter.id} />
                      <Label htmlFor={filter.id} className="cursor-pointer flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge 
                            style={{ backgroundColor: `${filter.color}20`, color: filter.color }} 
                            className="border-0"
                          >
                            {filter.name}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {filter.description}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          📊 Bao gồm: {filter.qualities.join(', ')}
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Custom Filters */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="font-medium">Bộ lọc tùy biến</Label>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={addCustomFilter}
                  className="text-xs"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Thêm filter
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Lọc các cột mà CRM, Lead Hub, Data xấu/rác đều có
              </p>

              {customFilterRules.length > 0 && (
                <div className="space-y-3 p-4 border border-border rounded-lg bg-muted/20">
                  {customFilterRules.map((filter, index) => (
                    <div key={filter.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 border border-border rounded-lg bg-background">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 flex-1 w-full min-w-0">
                        {/* Column Selection */}
                        <div className="flex flex-col w-full sm:w-auto">
                          <label className="text-xs text-muted-foreground mb-1 sm:hidden">Cột</label>
                          <select
                            value={filter.columnId}
                            onChange={(e) => updateCustomFilter(filter.id, 'columnId', e.target.value)}
                            className="px-3 py-2 border border-border rounded text-sm bg-background min-w-[140px] w-full sm:w-auto sm:max-w-[160px] truncate focus:border-primary transition-colors"
                            title={filter.columnId ? customFilters.find(f => f.id === filter.columnId)?.name : 'Chọn cột'}
                          >
                            <option value="">Chọn cột</option>
                            {customFilters.map(col => (
                              <option 
                                key={col.id} 
                                value={col.id}
                                title={col.name}
                              >
                                {col.name.length > 18 ? `${col.name.substring(0, 18)}...` : col.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Operator Selection */}
                        {filter.columnId && (
                          <div className="flex flex-col w-full sm:w-auto">
                            <label className="text-xs text-muted-foreground mb-1 sm:hidden">Điều kiện</label>
                            <select
                              value={filter.operator}
                              onChange={(e) => updateCustomFilter(filter.id, 'operator', e.target.value)}
                              className="px-3 py-2 border border-border rounded text-sm bg-background min-w-[120px] w-full sm:w-auto sm:max-w-[140px] truncate focus:border-primary transition-colors"
                              title={filter.operator || 'Chọn điều kiện'}
                            >
                              <option value="">Điều kiện</option>
                              {getFilterOperators(filter.columnId).map(op => (
                                <option 
                                  key={op} 
                                  value={op}
                                  title={op}
                                >
                                  {op.length > 15 ? `${op.substring(0, 15)}...` : op}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}

                        {/* Value Input */}
                        {filter.columnId && filter.operator && (
                          <div className="flex flex-col w-full sm:flex-1">
                            <label className="text-xs text-muted-foreground mb-1 sm:hidden">Giá trị</label>
                            {customFilters.find(f => f.id === filter.columnId)?.type === 'select' ? (
                              <select
                                value={filter.value}
                                onChange={(e) => updateCustomFilter(filter.id, 'value', e.target.value)}
                                className="px-3 py-2 border border-border rounded text-sm bg-background w-full min-w-[150px] truncate focus:border-primary transition-colors"
                                title={filter.value || 'Chọn giá trị'}
                              >
                                <option value="">Chọn giá trị</option>
                                {getFilterOptions(filter.columnId).map(opt => (
                                  <option 
                                    key={opt} 
                                    value={opt}
                                    title={opt}
                                  >
                                    {opt.length > 20 ? `${opt.substring(0, 20)}...` : opt}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <Input
                                placeholder="Nhập giá trị"
                                value={filter.value}
                                onChange={(e) => updateCustomFilter(filter.id, 'value', e.target.value)}
                                className="w-full text-sm focus:border-primary transition-colors"
                              />
                            )}
                          </div>
                        )}
                      </div>

                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => removeCustomFilter(filter.id)}
                        className="text-destructive hover:text-destructive flex-shrink-0 mt-2 sm:mt-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Upload Destinations */}
            <div className="space-y-3">
              <Label className="font-medium">Upload destinations</Label>
              <p className="text-sm text-muted-foreground">Chọn các kênh để upload Custom Audience</p>
              
              <div className="grid grid-cols-2 gap-3">
                {uploadDestinations.map(destination => (
                  <div key={destination.id} className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                    <Checkbox
                      id={destination.id}
                      checked={selectedDestinations.includes(destination.id)}
                      onCheckedChange={() => handleDestinationToggle(destination.id)}
                    />
                    <Label htmlFor={destination.id} className="cursor-pointer flex items-center gap-2 flex-1">
                      <div 
                        className="w-6 h-6 rounded flex items-center justify-center text-xs"
                        style={{ backgroundColor: `${destination.color}20`, color: destination.color }}
                      >
                        {destination.icon}
                      </div>
                      <span className="font-medium">{destination.name}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Auto Upload Frequency */}
            <div className="space-y-3">
              <Label className="font-medium">Tần suất tự động upload</Label>
              <p className="text-sm text-muted-foreground">Chọn tần suất upload Custom Audience tự động</p>
              
              <RadioGroup value={frequency} onValueChange={setFrequency}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {frequencyOptions.map(option => (
                    <div key={option.id} className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label htmlFor={option.id} className="cursor-pointer flex-1">
                        <div className="font-medium mb-1">{option.label}</div>
                        <div className="text-xs text-muted-foreground">{option.description}</div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>
        </ScrollArea>

        <div className="flex-shrink-0 flex justify-end space-x-2 pt-4 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button onClick={handleSaveRule} className="bg-primary hover:bg-primary-hover">
            <Upload className="h-4 w-4 mr-2" />
            Lưu Rule
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}