import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { KPICustomizerPopup, type KPIConfig } from './KPICustomizerPopup';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  Calendar,
  TrendingUp,
  TrendingDown,
  Users,
  UserCheck,
  UserX,
  DollarSign,
  Clock,
  Target,
  AlertCircle,
  CheckCircle,
  Settings,
  Filter,
  Download,
  Zap,
  Facebook,
  Chrome,
  Phone,
  Globe,
  MessageSquare,
  RefreshCw,
  Eye,
  Star,
  Calculator,
  ShoppingCart,
  UserPlus,
  RotateCcw,
  Percent,
  Banknote
} from 'lucide-react';

// Mock data for dashboard analytics - Enhanced with all KPI data
const generateDashboardData = () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Time periods data
  const timePeriods = {
    today: Math.floor(Math.random() * 50) + 20,
    yesterday: Math.floor(Math.random() * 45) + 15,
    thisWeek: Math.floor(Math.random() * 300) + 100,
    lastWeek: Math.floor(Math.random() * 280) + 90,
    thisMonth: Math.floor(Math.random() * 1200) + 400,
    lastMonth: Math.floor(Math.random() * 1100) + 350
  };

  // Lead quality data
  const goodLeads = Math.floor(timePeriods.today * 0.65);
  const badLeads = timePeriods.today - goodLeads;
  const goodLeadRate = ((goodLeads / timePeriods.today) * 100).toFixed(1);

  // Revenue data (mock)
  const revenue = Math.floor(Math.random() * 50000000) + 20000000;
  
  // Additional KPI data
  const totalCost = Math.floor(revenue * 0.3); // 30% of revenue as cost
  const roi = (((revenue - totalCost) / totalCost) * 100).toFixed(1);
  const totalOrders = Math.floor(timePeriods.today * 0.4); // 40% conversion from leads to orders
  const avgOrderValue = Math.floor(revenue / Math.max(totalOrders, 1));
  const conversionRate = ((totalOrders / timePeriods.today) * 100).toFixed(1);
  const newCustomers = Math.floor(totalOrders * 0.7); // 70% new customers
  const returningCustomers = totalOrders - newCustomers;

  return {
    timePeriods,
    goodLeads,
    badLeads,
    goodLeadRate,
    revenue,
    totalCost,
    roi,
    totalOrders,
    avgOrderValue,
    conversionRate,
    newCustomers,
    returningCustomers
  };
};

// Source analysis data
const sourceAnalysisData = [
  {
    source: 'Facebook Ads',
    icon: Facebook,
    color: '#1877F2',
    totalLeads: 156,
    goodLeads: 89,
    badLeads: 67,
    goodRate: 57.1,
    revenue: 12500000
  },
  {
    source: 'Google Ads', 
    icon: Chrome,
    color: '#4285F4',
    totalLeads: 134,
    goodLeads: 98,
    badLeads: 36,
    goodRate: 73.1,
    revenue: 18900000
  },
  {
    source: 'TikTok Ads',
    icon: Chrome,
    color: '#000000',
    totalLeads: 89,
    goodLeads: 52,
    badLeads: 37,
    goodRate: 58.4,
    revenue: 8300000
  },
  {
    source: 'Zalo',
    icon: MessageSquare,
    color: '#0068FF',
    totalLeads: 67,
    goodLeads: 45,
    badLeads: 22,
    goodRate: 67.2,
    revenue: 6700000
  },
  {
    source: 'Landing Page',
    icon: Globe,
    color: '#22C55E',
    totalLeads: 78,
    goodLeads: 56,
    badLeads: 22,
    goodRate: 71.8,
    revenue: 9100000
  },
  {
    source: 'Hotline',
    icon: Phone,
    color: '#EF4444',
    totalLeads: 45,
    goodLeads: 38,
    badLeads: 7,
    goodRate: 84.4,
    revenue: 7800000
  }
];

// Chart data for lead trends
const leadTrendData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }),
    totalLeads: Math.floor(Math.random() * 50) + 10,
    goodLeads: Math.floor(Math.random() * 35) + 5,
    badLeads: Math.floor(Math.random() * 15) + 2
  };
});

// Employee performance data
const employeeData = [
  {
    id: 'emp_001',
    name: 'Nguyễn Văn A',
    avatar: 'NVA',
    totalLeads: 89,
    closedLeads: 34,
    closeRate: 38.2,
    avgProcessTime: 2.5,
    pendingLeads: 12,
    revenue: 15600000,
    rating: 4.8
  },
  {
    id: 'emp_002', 
    name: 'Trần Thị B',
    avatar: 'TTB',
    totalLeads: 76,
    closedLeads: 41,
    closeRate: 53.9,
    avgProcessTime: 1.8,
    pendingLeads: 8,
    revenue: 22300000,
    rating: 4.9
  },
  {
    id: 'emp_003',
    name: 'Lê Văn C',
    avatar: 'LVC',
    totalLeads: 92,
    closedLeads: 28,
    closeRate: 30.4,
    avgProcessTime: 3.2,
    pendingLeads: 18,
    revenue: 12800000,
    rating: 4.2
  },
  {
    id: 'emp_004',
    name: 'Phạm Thị D',
    avatar: 'PTD',
    totalLeads: 67,
    closedLeads: 31,
    closeRate: 46.3,
    avgProcessTime: 2.1,
    pendingLeads: 6,
    revenue: 18700000,
    rating: 4.6
  },
  {
    id: 'emp_005',
    name: 'Hoàng Văn E',
    avatar: 'HVE',
    totalLeads: 83,
    closedLeads: 39, 
    closeRate: 47.0,
    avgProcessTime: 1.9,
    pendingLeads: 9,
    revenue: 19900000,
    rating: 4.7
  }
];

// Integration status data
const integrationStatus = [
  { name: 'Facebook Ads', status: 'connected', lastSync: '10:30 AM', accounts: 2 },
  { name: 'Google Ads', status: 'error', lastSync: '9:15 AM', accounts: 1, error: 'Token expired' },
  { name: 'TikTok Ads', status: 'connected', lastSync: '11:00 AM', accounts: 1 },
  { name: 'Landing Page Forms', status: 'connected', lastSync: '10:45 AM', accounts: 3 },
  { name: 'Zalo API', status: 'connected', lastSync: '10:20 AM', accounts: 1 }
];

// Campaign data
const campaignData = [
  {
    id: 'camp_001',
    name: 'Facebook Lead Gen Q4',
    platform: 'Facebook',
    status: 'active',
    leads: 156,
    budget: 5000000,
    spent: 3200000,
    cpl: 20513,
    startDate: '2024-12-01',
    endDate: '2024-12-31'
  },
  {
    id: 'camp_002',
    name: 'Google Search Ads',
    platform: 'Google',
    status: 'active', 
    leads: 134,
    budget: 8000000,
    spent: 6100000,
    cpl: 45522,
    startDate: '2024-12-01',
    endDate: '2024-12-31'
  },
  {
    id: 'camp_003',
    name: 'TikTok Video Campaign',
    platform: 'TikTok',
    status: 'paused',
    leads: 89,
    budget: 3000000,
    spent: 2800000,
    cpl: 31461,
    startDate: '2024-12-10',
    endDate: '2024-12-25'
  }
];

const COLORS = ['#7c3aed', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#ede9fe'];

// Default KPI configurations
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
    enabled: false,
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

interface DashboardPageProps {
  customers?: any[];
  onOpenCustomerDetails?: (customer: any) => void;
  onOpenRegistration?: () => void;
}

export function DashboardPage({ customers, onOpenCustomerDetails, onOpenRegistration }: DashboardPageProps) {
  const [timeFilter, setTimeFilter] = useState('today');
  const [employeeTab, setEmployeeTab] = useState('overview');
  const [showKPICustomizer, setShowKPICustomizer] = useState(false);
  const [kpiConfigs, setKpiConfigs] = useState<KPIConfig[]>(defaultKPIConfigs);
  
  const dashboardData = useMemo(() => generateDashboardData(), [timeFilter]);

  const getTimeFilterLabel = (filter: string) => {
    switch (filter) {
      case 'today': return 'Hôm nay';
      case 'yesterday': return 'Hôm qua';
      case 'thisWeek': return 'Tuần này';
      case 'lastWeek': return 'Tuần trước';
      case 'thisMonth': return 'Tháng này';
      case 'lastMonth': return 'Tháng trước';
      default: return 'Hôm nay';
    }
  };

  const getComparisonData = () => {
    const current = dashboardData.timePeriods[timeFilter as keyof typeof dashboardData.timePeriods];
    let previous = 0;
    
    switch (timeFilter) {
      case 'today':
        previous = dashboardData.timePeriods.yesterday;
        break;
      case 'thisWeek':
        previous = dashboardData.timePeriods.lastWeek;
        break;
      case 'thisMonth':
        previous = dashboardData.timePeriods.lastMonth;
        break;
      default:
        previous = current;
    }
    
    const change = ((current - previous) / previous * 100).toFixed(1);
    const isPositive = parseFloat(change) > 0;
    
    return { change, isPositive };
  };

  const comparisonData = getComparisonData();

  // Sort employees by different metrics
  const getSortedEmployees = (sortBy: 'closeRate' | 'revenue' | 'speed' | 'pending') => {
    switch (sortBy) {
      case 'closeRate':
        return [...employeeData].sort((a, b) => b.closeRate - a.closeRate);
      case 'revenue':
        return [...employeeData].sort((a, b) => b.revenue - a.revenue);
      case 'speed':
        return [...employeeData].sort((a, b) => a.avgProcessTime - b.avgProcessTime);
      case 'pending':
        return [...employeeData].sort((a, b) => b.pendingLeads - a.pendingLeads);
      default:
        return employeeData;
    }
  };

  // Get enabled KPIs for display
  const enabledKPIs = kpiConfigs.filter(config => config.enabled);

  // Function to get KPI value based on config
  const getKPIValue = (config: KPIConfig) => {
    const currentPeriodData = dashboardData.timePeriods[timeFilter as keyof typeof dashboardData.timePeriods];
    
    switch (config.id) {
      case 'total_leads':
        return currentPeriodData;
      case 'good_leads':
        return dashboardData.goodLeads;
      case 'bad_leads':
        return dashboardData.badLeads;
      case 'good_lead_rate':
        return parseFloat(dashboardData.goodLeadRate);
      case 'revenue':
        return dashboardData.revenue;
      case 'total_cost':
        return dashboardData.totalCost;
      case 'roi':
        return parseFloat(dashboardData.roi);
      case 'avg_order_value':
        return dashboardData.avgOrderValue;
      case 'conversion_rate':
        return parseFloat(dashboardData.conversionRate);
      case 'total_orders':
        return dashboardData.totalOrders;
      case 'new_customers':
        return dashboardData.newCustomers;
      case 'returning_customers':
        return dashboardData.returningCustomers;
      default:
        return 0;
    }
  };

  // Function to format KPI value based on format type
  const formatKPIValue = (value: number, format: 'number' | 'currency' | 'percentage') => {
    switch (format) {
      case 'currency':
        return `${(value / 1000000).toFixed(1)}M`;
      case 'percentage':
        return `${value}%`;
      case 'number':
      default:
        return value.toLocaleString('vi-VN');
    }
  };

  // Function to get comparison data for KPIs
  const getKPIComparison = (config: KPIConfig) => {
    // For demo purposes, showing random comparison data
    // In real app, this would compare with previous period
    const change = (Math.random() * 20 - 10).toFixed(1); // -10% to +10%
    const isPositive = parseFloat(change) > 0;
    return { change, isPositive };
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background/95 to-muted/10 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-secondary/5 to-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-40 h-40 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-2xl animate-pulse"></div>
      </div>

      {/* Enhanced Sticky Header with Time Filter */}
      <div className="sticky top-0 z-20 bg-card/80 backdrop-blur-md border-b border-border/50 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between p-4 md:p-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center shadow-lg animate-glow">
              <BarChart className="w-5 h-5 md:w-7 md:h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Dashboard Analytics
              </h1>
              <p className="text-muted-foreground mt-1 text-sm md:text-base">Báo cáo tổng quan và phân tích hiệu suất kinh doanh</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3 flex-wrap">
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-36 md:w-48 h-9 md:h-11 bg-background/80 border-border/50 hover:border-primary/50 transition-all duration-200 text-sm">
                <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 text-primary" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">📅 Hôm nay</SelectItem>
                <SelectItem value="yesterday">🕐 Hôm qua</SelectItem>
                <SelectItem value="thisWeek">📊 Tuần này</SelectItem>
                <SelectItem value="lastWeek">📈 Tuần trước</SelectItem>
                <SelectItem value="thisMonth">📆 Tháng này</SelectItem>
                <SelectItem value="lastMonth">📋 Tháng trước</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              onClick={onOpenRegistration}
              variant="outline" 
              size="default"
              className="hidden md:flex h-11 px-4 bg-primary/5 border-primary/30 hover:border-primary/50 hover:bg-primary/10 text-primary transition-all duration-200 hover-lift font-semibold"
            >
              CRM đang trong giai đoạn thử nghiệm
            </Button>
            <Button 
              variant="outline" 
              size="default" 
              onClick={() => setShowKPICustomizer(true)}
              className="h-9 md:h-11 px-3 md:px-4 bg-background/80 border-border/50 hover:border-primary/50 transition-all duration-200 hover-lift text-sm"
            >
              <Settings className="h-3 w-3 md:h-4 md:w-4 md:mr-2" />
              <span className="hidden md:inline">Tùy Chỉnh KPI</span>
            </Button>
            <Button 
              variant="outline" 
              size="default"
              className="hidden md:flex h-11 px-4 bg-background/80 border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 hover-lift"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button 
              size="default"
              className="h-9 md:h-11 px-3 md:px-4 bg-gradient-to-r from-primary to-primary-light hover:from-primary-hover hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover-lift text-sm"
            >
              <RefreshCw className="h-3 w-3 md:h-4 md:w-4 md:mr-2" />
              <span className="hidden md:inline">Refresh</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-8 space-y-8 relative z-10">
        {/* Enhanced Dynamic KPIs Overview */}
        {enabledKPIs.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Chỉ số hiệu suất chính (KPIs)</h2>
            </div>
            
            <div className={`grid gap-6 ${
              enabledKPIs.length === 1 ? 'grid-cols-1 max-w-md' :
              enabledKPIs.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
              enabledKPIs.length === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
              'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            }`}>
              {enabledKPIs.map((config, index) => {
                const Icon = config.icon;
                const value = getKPIValue(config);
                const formattedValue = formatKPIValue(value, config.format);
                const comparison = getKPIComparison(config);
                
                return (
                  <Card 
                    key={config.id} 
                    className="border border-border/50 card-elevated hover:shadow-2xl transition-all duration-500 group relative overflow-hidden animate-fadeIn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <CardContent className="p-6 relative z-10">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground font-medium">{config.name}</p>
                          <p 
                            className="text-3xl font-bold transition-all duration-300 group-hover:scale-105"
                            style={{ color: config.color }}
                          >
                            {formattedValue}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <div className={`
                              flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
                              ${comparison.isPositive 
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                              }
                            `}>
                              {comparison.isPositive ? (
                                <TrendingUp className="h-3 w-3" />
                              ) : (
                                <TrendingDown className="h-3 w-3" />
                              )}
                              <span>{comparison.change}%</span>
                            </div>
                            <span className="text-xs text-muted-foreground">vs trước đó</span>
                          </div>
                        </div>
                          <div 
                            className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg hover-glow"
                            style={{ 
                              backgroundColor: `${config.color}15`,
                              background: `linear-gradient(135deg, ${config.color}20, ${config.color}10)`
                            }}
                          >
                            <Icon className="h-6 w-6 transition-transform duration-300 group-hover:rotate-6" style={{ color: config.color }} />
                          </div>
                        </div>
                        
                        {/* Progress bar for visual appeal */}
                        <div className="mt-4 h-1 bg-muted/30 rounded-full overflow-hidden">
                          <div 
                            className="h-full transition-all duration-1000 ease-out"
                            style={{ 
                              backgroundColor: config.color,
                              width: `${Math.min(100, Math.abs(parseFloat(comparison.change)) * 2)}%`
                            }}
                          ></div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

        {/* Enhanced empty state when no KPIs are enabled */}
        {enabledKPIs.length === 0 && (
          <Card className="border border-border/50 card-elevated">
            <CardContent className="p-12 text-center">
              <div className="flex flex-col items-center gap-6 animate-fadeIn">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center animate-bounceIn">
                  <Settings className="h-10 w-10 text-primary" />
                </div>
                <div className="space-y-3 max-w-md">
                  <h3 className="text-xl font-semibold text-foreground">Chưa Có KPI Nào Được Chọn</h3>
                  <p className="text-muted-foreground">
                    Tùy chỉnh các chỉ số hiệu suất chính (KPI) để theo dõi hiệu quả kinh doanh một cách trực quan và chi tiết
                  </p>
                </div>
                <Button 
                  onClick={() => setShowKPICustomizer(true)}
                  className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-hover hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover-lift"
                  size="lg"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Thiết Lập KPI Ngay
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Source Analysis */}
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-primary" />
              Phân Tích Nguồn Lead
            </CardTitle>
            <CardDescription>Hiệu suất từng kênh marketing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nguồn</TableHead>
                    <TableHead className="text-right">Tổng Lead</TableHead>
                    <TableHead className="text-right">Lead Tốt</TableHead>
                    <TableHead className="text-right">Lead Xấu</TableHead>
                    <TableHead className="text-right">Tỉ Lệ Tốt</TableHead>
                    <TableHead className="text-right">Doanh Thu</TableHead>
                    <TableHead className="text-right">CPL</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sourceAnalysisData.map((source) => {
                    const Icon = source.icon;
                    const cpl = source.revenue / source.totalLeads;
                    return (
                      <TableRow key={source.source}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${source.color}15` }}>
                              <Icon className="h-4 w-4" style={{ color: source.color }} />
                            </div>
                            <span className="font-medium">{source.source}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium">{source.totalLeads}</TableCell>
                        <TableCell className="text-right text-green-600">{source.goodLeads}</TableCell>
                        <TableCell className="text-right text-red-600">{source.badLeads}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <span className="font-medium">{source.goodRate}%</span>
                            <Progress value={source.goodRate} className="w-16" />
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {(source.revenue / 1000000).toFixed(1)}M
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">
                          {cpl.toLocaleString('vi-VN')}đ
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lead Trend Chart */}
          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle>Xu Hướng Lead Theo Thời Gian</CardTitle>
              <CardDescription>30 ngày gần đây</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={leadTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(124, 58, 237, 0.1)" />
                  <XAxis dataKey="date" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)', 
                      border: '1px solid var(--border)',
                      borderRadius: '8px' 
                    }} 
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="totalLeads" 
                    stackId="1"
                    stroke="#7c3aed" 
                    fill="#7c3aed" 
                    fillOpacity={0.1}
                    name="Tổng Lead"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="goodLeads" 
                    stackId="2"
                    stroke="#22c55e" 
                    fill="#22c55e" 
                    fillOpacity={0.2}
                    name="Lead Tốt"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Source Distribution */}
          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle>Phân Bố Lead Theo Kênh</CardTitle>
              <CardDescription>Tỉ trọng từng nguồn</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sourceAnalysisData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ source, percent }) => `${source}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="totalLeads"
                  >
                    {sourceAnalysisData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Good Lead Rate by Channel */}
          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle>Tỉ Lệ Lead Tốt Theo Kênh</CardTitle>
              <CardDescription>So sánh hiệu suất các kênh</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sourceAnalysisData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(124, 58, 237, 0.1)" />
                  <XAxis type="number" domain={[0, 100]} fontSize={12} />
                  <YAxis dataKey="source" type="category" fontSize={12} width={100} />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Tỉ lệ Lead Tốt']}
                    contentStyle={{ 
                      backgroundColor: 'var(--card)', 
                      border: '1px solid var(--border)',
                      borderRadius: '8px' 
                    }} 
                  />
                  <Bar dataKey="goodRate" fill="#7c3aed" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* UTM Analysis Chart */}
          <Card className="border border-border/50">
            <CardHeader>  
              <CardTitle>Phân Tích UTM Traffic</CardTitle>
              <CardDescription>Nguồn traffic chi tiết</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sourceAnalysisData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(124, 58, 237, 0.1)" />
                  <XAxis dataKey="source" fontSize={12} angle={-45} textAnchor="end" height={80} />
                  <YAxis fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)', 
                      border: '1px solid var(--border)',
                      borderRadius: '8px' 
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="totalLeads" fill="#7c3aed" name="Tổng Lead" />
                  <Bar dataKey="goodLeads" fill="#22c55e" name="Lead Tốt" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Employee Performance */}
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Hiệu Suất Nhân Viên
            </CardTitle>
            <CardDescription>Phân tích và xếp hạng nhân viên</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={employeeTab} onValueChange={setEmployeeTab}>
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="overview">Tổng Quan</TabsTrigger>
                <TabsTrigger value="close-rate">Tỉ Lệ Chốt</TabsTrigger>
                <TabsTrigger value="revenue">Doanh Số</TabsTrigger>
                <TabsTrigger value="speed">Xử Lý Nhanh</TabsTrigger>
                <TabsTrigger value="pending">Lead Pending</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nhân Viên</TableHead>
                        <TableHead className="text-right">Tổng Lead</TableHead>
                        <TableHead className="text-right">Lead Chốt</TableHead>
                        <TableHead className="text-right">Tỉ Lệ Chốt</TableHead>
                        <TableHead className="text-right">TG Xử Lý TB</TableHead>
                        <TableHead className="text-right">Lead Pending</TableHead>
                        <TableHead className="text-right">Doanh Số</TableHead>
                        <TableHead className="text-right">Đánh Giá</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {employeeData.map((employee) => (
                        <TableRow key={employee.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="text-xs font-medium text-primary">{employee.avatar}</span>
                              </div>
                              <span className="font-medium">{employee.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">{employee.totalLeads}</TableCell>
                          <TableCell className="text-right text-green-600">{employee.closedLeads}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <span className="font-medium">{employee.closeRate}%</span>
                              <Progress value={employee.closeRate} className="w-16" />
                            </div>
                          </TableCell>
                          <TableCell className="text-right">{employee.avgProcessTime}h</TableCell>
                          <TableCell className="text-right">
                            <Badge variant={employee.pendingLeads > 10 ? "destructive" : "secondary"}>
                              {employee.pendingLeads}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {(employee.revenue / 1000000).toFixed(1)}M
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm">{employee.rating}</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="close-rate" className="mt-6">
                <div className="space-y-4">
                  <h4 className="font-medium">🏆 Top Nhân Viên Theo Tỉ Lệ Chốt</h4>
                  {getSortedEmployees('closeRate').slice(0, 5).map((employee, index) => (
                    <div key={employee.id} className="flex items-center gap-4 p-4 border border-border/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant={index === 0 ? "default" : "secondary"}>
                          #{index + 1}
                        </Badge>
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">{employee.avatar}</span>
                        </div>
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-sm text-muted-foreground">{employee.closedLeads}/{employee.totalLeads} leads</p>
                        </div>
                      </div>
                      <div className="ml-auto text-right">
                        <p className="text-lg font-semibold text-green-600">{employee.closeRate}%</p>
                        <Progress value={employee.closeRate} className="w-24 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="revenue" className="mt-6">
                <div className="space-y-4">
                  <h4 className="font-medium">💰 Top Nhân Viên Theo Doanh Số</h4>
                  {getSortedEmployees('revenue').slice(0, 5).map((employee, index) => (
                    <div key={employee.id} className="flex items-center gap-4 p-4 border border-border/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant={index === 0 ? "default" : "secondary"}>
                          #{index + 1}
                        </Badge>
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">{employee.avatar}</span>
                        </div>
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-sm text-muted-foreground">{employee.closedLeads} leads chốt</p>
                        </div>
                      </div>
                      <div className="ml-auto text-right">
                        <p className="text-lg font-semibold text-primary">{(employee.revenue / 1000000).toFixed(1)}M</p>
                        <p className="text-sm text-muted-foreground">VNĐ</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="speed" className="mt-6">
                <div className="space-y-4">
                  <h4 className="font-medium">⚡ Top Nhân Viên Xử Lý Nhanh</h4>
                  {getSortedEmployees('speed').slice(0, 5).map((employee, index) => (
                    <div key={employee.id} className="flex items-center gap-4 p-4 border border-border/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant={index === 0 ? "default" : "secondary"}>
                          #{index + 1}
                        </Badge>
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">{employee.avatar}</span>
                        </div>
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-sm text-muted-foreground">{employee.totalLeads} leads tổng</p>
                        </div>
                      </div>
                      <div className="ml-auto text-right">
                        <p className="text-lg font-semibold text-blue-600">{employee.avgProcessTime}h</p>
                        <p className="text-sm text-muted-foreground">Trung bình</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="pending" className="mt-6">
                <div className="space-y-4">
                  <h4 className="font-medium">⏳ Nhân Viên Có Lead Chưa Xử Lý</h4>
                  {getSortedEmployees('pending').slice(0, 5).map((employee, index) => (
                    <div key={employee.id} className="flex items-center gap-4 p-4 border border-border/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant={employee.pendingLeads > 10 ? "destructive" : "secondary"}>
                          #{index + 1}
                        </Badge>
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">{employee.avatar}</span>
                        </div>
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-sm text-muted-foreground">Tỉ lệ chốt: {employee.closeRate}%</p>
                        </div>
                      </div>
                      <div className="ml-auto text-right">
                        <p className={`text-lg font-semibold ${employee.pendingLeads > 10 ? 'text-red-600' : 'text-orange-600'}`}>
                          {employee.pendingLeads}
                        </p>
                        <p className="text-sm text-muted-foreground">Pending</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* System Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Integration Status */}
          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Trạng Thái Integration
              </CardTitle>
              <CardDescription>Tình trạng kết nối các nguồn dữ liệu</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {integrationStatus.map((integration) => (
                  <div key={integration.name} className="flex items-center justify-between p-3 border border-border/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${integration.status === 'connected' ? 'bg-green-500' : 'bg-red-500'}`} />
                      <div>
                        <p className="font-medium">{integration.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {integration.accounts} tài khoản • Sync: {integration.lastSync}
                        </p>
                        {integration.error && (
                          <p className="text-xs text-red-600">{integration.error}</p>
                        )}
                      </div>
                    </div>
                    <Badge variant={integration.status === 'connected' ? 'default' : 'destructive'}>
                      {integration.status === 'connected' ? 'Kết nối' : 'Lỗi'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Campaign Performance */}
          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Danh Sách Campaigns
              </CardTitle>
              <CardDescription>Hiệu suất các chiến dịch đang chạy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {campaignData.map((campaign) => (
                  <div key={campaign.id} className="p-4 border border-border/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium">{campaign.name}</p>
                        <p className="text-sm text-muted-foreground">{campaign.platform}</p>
                      </div>
                      <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                        {campaign.status === 'active' ? 'Đang chạy' : 'Tạm dừng'}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Leads</p>
                        <p className="font-medium">{campaign.leads}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">CPL</p>
                        <p className="font-medium">{campaign.cpl.toLocaleString('vi-VN')}đ</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Chi phí</p>
                        <p className="font-medium">{(campaign.spent / 1000000).toFixed(1)}M</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Ngân sách sử dụng</span>
                        <span>{((campaign.spent / campaign.budget) * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={(campaign.spent / campaign.budget) * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* KPI Customizer Popup */}
      <KPICustomizerPopup
        isOpen={showKPICustomizer}
        onClose={() => setShowKPICustomizer(false)}
        kpiConfigs={kpiConfigs}
        onUpdateConfigs={setKpiConfigs}
      />
    </div>
  );
}