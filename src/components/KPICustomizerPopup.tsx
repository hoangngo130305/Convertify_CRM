import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { 
  TrendingUp, 
  UserCheck, 
  UserX, 
  DollarSign,
  Calculator,
  Target,
  ShoppingCart,
  Users,
  UserPlus,
  RotateCcw,
  Settings,
  Eye,
  EyeOff,
  BarChart3,
  Percent,
  TrendingDown,
  Banknote
} from 'lucide-react';

export interface KPIConfig {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  enabled: boolean;
  category: 'leads' | 'revenue' | 'customers' | 'performance';
  format: 'number' | 'currency' | 'percentage';
  color: string;
}

interface KPICustomizerPopupProps {
  isOpen: boolean;
  onClose: () => void;
  kpiConfigs: KPIConfig[];
  onUpdateConfigs: (configs: KPIConfig[]) => void;
}

const defaultKPIConfigs: KPIConfig[] = [
  {
    id: 'total_leads',
    name: 'Tổng Lead',
    description: 'Tổng số lead trong khoảng thời gian',
    icon: TrendingUp,
    enabled: true,
    category: 'leads',
    format: 'number',
    color: '#7c3aed'
  },
  {
    id: 'good_leads',
    name: 'Lead Tốt',
    description: 'Số lead chất lượng cao',
    icon: UserCheck,
    enabled: true,
    category: 'leads',
    format: 'number',
    color: '#22c55e'
  },
  {
    id: 'bad_leads',
    name: 'Lead Xấu',
    description: 'Số lead chất lượng thấp',
    icon: UserX,
    enabled: true,
    category: 'leads',
    format: 'number',
    color: '#ef4444'
  },
  {
    id: 'good_lead_rate',
    name: 'Tỉ lệ Lead Tốt',
    description: 'Tỷ lệ phần trăm lead chất lượng',
    icon: Percent,
    enabled: true,
    category: 'leads',
    format: 'percentage',
    color: '#8b5cf6'
  },
  {
    id: 'revenue',
    name: 'Doanh Thu',
    description: 'Tổng doanh thu trong khoảng thời gian',
    icon: DollarSign,
    enabled: true,
    category: 'revenue',
    format: 'currency',
    color: '#10b981'
  },
  {
    id: 'total_cost',
    name: 'Tổng Chi Phí',
    description: 'Tổng chi phí quảng cáo',
    icon: TrendingDown,
    enabled: false,
    category: 'revenue',
    format: 'currency',
    color: '#f59e0b'
  },
  {
    id: 'roi',
    name: 'ROI',
    description: 'Tỷ suất lợi nhuận trên đầu tư',
    icon: Calculator,
    enabled: false,
    category: 'performance',
    format: 'percentage',
    color: '#06b6d4'
  },
  {
    id: 'avg_order_value',
    name: 'Giá Trị Đơn Hàng TB',
    description: 'Giá trị trung bình mỗi đơn hàng',
    icon: Banknote,
    enabled: false,
    category: 'revenue',
    format: 'currency',
    color: '#8b5cf6'
  },
  {
    id: 'conversion_rate',
    name: 'Tỷ Lệ Chuyển Đổi',
    description: 'Tỷ lệ chuyển đổi từ lead thành khách hàng',
    icon: Target,
    enabled: false,
    category: 'performance',
    format: 'percentage',
    color: '#ec4899'
  },
  {
    id: 'total_orders',
    name: 'Tổng Đơn Hàng',
    description: 'Tổng số đơn hàng hoàn thành',
    icon: ShoppingCart,
    enabled: false,
    category: 'revenue',
    format: 'number',
    color: '#f97316'
  },
  {
    id: 'new_customers',
    name: 'Khách Hàng Mới',
    description: 'Số khách hàng mới trong kỳ',
    icon: UserPlus,
    enabled: false,
    category: 'customers',
    format: 'number',
    color: '#06b6d4'
  },
  {
    id: 'returning_customers',
    name: 'Khách Hàng Quay Lại',
    description: 'Số khách hàng quay lại mua hàng',
    icon: RotateCcw,
    enabled: false,
    category: 'customers',
    format: 'number',
    color: '#8b5cf6'
  }
];

export function KPICustomizerPopup({ isOpen, onClose, kpiConfigs, onUpdateConfigs }: KPICustomizerPopupProps) {
  const [localConfigs, setLocalConfigs] = useState<KPIConfig[]>(kpiConfigs.length > 0 ? kpiConfigs : defaultKPIConfigs);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    if (kpiConfigs.length > 0) {
      setLocalConfigs(kpiConfigs);
    }
  }, [kpiConfigs]);

  const handleToggleKPI = (kpiId: string) => {
    setLocalConfigs(prev => prev.map(config => 
      config.id === kpiId ? { ...config, enabled: !config.enabled } : config
    ));
  };

  const handleSave = () => {
    onUpdateConfigs(localConfigs);
    onClose();
  };

  const handleReset = () => {
    setLocalConfigs(defaultKPIConfigs);
  };

  const enabledKPIs = localConfigs.filter(config => config.enabled);
  const disabledKPIs = localConfigs.filter(config => !config.enabled);

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'leads': return '📈 Lead Management';
      case 'revenue': return '💰 Doanh Thu & Chi Phí';
      case 'customers': return '👥 Khách Hàng';
      case 'performance': return '📊 Hiệu Suất';
      default: return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'leads': return '#7c3aed';
      case 'revenue': return '#10b981';
      case 'customers': return '#06b6d4';
      case 'performance': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const groupedConfigs = localConfigs.reduce((acc, config) => {
    if (!acc[config.category]) {
      acc[config.category] = [];
    }
    acc[config.category].push(config);
    return acc;
  }, {} as Record<string, KPIConfig[]>);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            Tùy Chỉnh KPI Dashboard
          </DialogTitle>
          <DialogDescription>
            Chọn các chỉ số bạn muốn hiển thị trên dashboard. Bạn có thể bật/tắt từng KPI theo nhu cầu.
          </DialogDescription>
        </DialogHeader>

        {/* Controls section - Fixed */}
        <div className="flex-shrink-0 border-b border-border/50 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-sm">
                {enabledKPIs.length} KPI đã chọn
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setPreviewMode(!previewMode)}
              >
                {previewMode ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                {previewMode ? 'Ẩn Preview' : 'Xem Preview'}
              </Button>
            </div>
            
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset Mặc Định
            </Button>
          </div>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto min-h-0 py-4 custom-scrollbar">
          {previewMode && (
            <Card className="mb-6 bg-muted/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Preview KPI Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {enabledKPIs.map((config) => {
                    const Icon = config.icon;
                    return (
                      <div key={config.id} className="p-3 bg-card border border-border/50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground">{config.name}</p>
                            <p className="text-lg font-semibold" style={{ color: config.color }}>
                              {config.format === 'currency' ? '₫25.6M' :
                               config.format === 'percentage' ? '68.5%' :
                               '156'}
                            </p>
                          </div>
                          <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${config.color}15` }}
                          >
                            <Icon className="h-4 w-4" style={{ color: config.color }} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-6">
            {Object.entries(groupedConfigs).map(([category, configs]) => (
              <div key={category}>
                <div className="flex items-center gap-2 mb-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getCategoryColor(category) }}
                  />
                  <h3 className="font-medium text-foreground">{getCategoryName(category)}</h3>
                  <Separator className="flex-1" />
                  <Badge variant="secondary" className="text-xs">
                    {configs.filter(c => c.enabled).length}/{configs.length}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {configs.map((config) => {
                    const Icon = config.icon;
                    return (
                      <Card 
                        key={config.id} 
                        className={`transition-all cursor-pointer hover:shadow-sm ${
                          config.enabled 
                            ? 'border-primary/20 bg-primary/5' 
                            : 'border-border/50 bg-muted/20'
                        }`}
                        onClick={() => handleToggleKPI(config.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3 flex-1">
                              <div 
                                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                  config.enabled ? 'opacity-100' : 'opacity-50'
                                }`}
                                style={{ backgroundColor: `${config.color}15` }}
                              >
                                <Icon 
                                  className="h-5 w-5" 
                                  style={{ color: config.enabled ? config.color : '#9ca3af' }} 
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className={`font-medium ${config.enabled ? 'text-foreground' : 'text-muted-foreground'}`}>
                                    {config.name}
                                  </h4>
                                  <Badge 
                                    variant="outline" 
                                    className="text-xs"
                                    style={{ borderColor: config.color, color: config.color }}
                                  >
                                    {config.format === 'currency' ? 'VNĐ' :
                                     config.format === 'percentage' ? '%' :
                                     'Số'}
                                  </Badge>
                                </div>
                                <p className={`text-sm ${config.enabled ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>
                                  {config.description}
                                </p>
                              </div>
                            </div>
                            <Switch 
                              checked={config.enabled}
                              onCheckedChange={() => handleToggleKPI(config.id)}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer section - Fixed */}
        <div className="flex-shrink-0 border-t border-border/50 pt-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              <strong>{enabledKPIs.length}</strong> KPI được chọn, <strong>{disabledKPIs.length}</strong> KPI bị ẩn
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Hủy
              </Button>
              <Button onClick={handleSave}>
                <Settings className="h-4 w-4 mr-2" />
                Lưu Cài Đặt
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}