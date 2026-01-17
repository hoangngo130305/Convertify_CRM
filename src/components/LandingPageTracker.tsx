import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Label } from './ui/label';
import { 
  ChevronDown,
  ChevronRight,
  Globe,
  BarChart3,
  Filter,
  Search,
  Target,
  Activity,
  TrendingUp
} from 'lucide-react';

// Mock data for 4-tier structure: Landing Page → Campaign → Ad Group → Ads
const generateLandingPageHierarchyData = () => {
  return [
    {
      id: 'lp_1',
      name: 'Product Showcase Landing Page',
      url: 'https://domain.com/product-showcase',
      category: 'Product',
      type: 'landingPage',
      totalLeads: 245,
      goodLeads: 168,
      badLeads: 77,
      budget: 50000000,
      revenue: 485000000,
      cost: 45000000,
      campaigns: [
        {
          id: 'campaign_1',
          name: 'Summer Sale Campaign 2024',
          source: 'Facebook',
          type: 'campaign',
          status: 'active',
          totalLeads: 145,
          goodLeads: 98,
          badLeads: 47,
          budget: 30000000,
          revenue: 285000000,
          cost: 27000000,
          adGroups: [
            {
              id: 'adgroup_1',
              name: 'Audience 25-34 Interest-Based',
              type: 'adGroup',
              status: 'active',
              totalLeads: 85,
              goodLeads: 62,
              badLeads: 23,
              budget: 18000000,
              revenue: 175000000,
              cost: 16200000,
              ads: [
                {
                  id: 'ad_1',
                  name: 'Summer Sale Creative A - Carousel',
                  type: 'ad',
                  format: 'Carousel',
                  status: 'active',
                  totalLeads: 45,
                  goodLeads: 32,
                  badLeads: 13,
                  budget: 10000000,
                  revenue: 95000000,
                  cost: 9000000
                },
                {
                  id: 'ad_2',
                  name: 'Summer Sale Creative B - Video',
                  type: 'ad',
                  format: 'Video',
                  status: 'active',
                  totalLeads: 40,
                  goodLeads: 30,
                  badLeads: 10,
                  budget: 8000000,
                  revenue: 80000000,
                  cost: 7200000
                }
              ]
            },
            {
              id: 'adgroup_2',
              name: 'Audience 35-44 Lookalike',
              type: 'adGroup',
              status: 'active',
              totalLeads: 60,
              goodLeads: 36,
              badLeads: 24,
              budget: 12000000,
              revenue: 110000000,
              cost: 10800000,
              ads: [
                {
                  id: 'ad_3',
                  name: 'Summer Sale Creative C - Single Image',
                  type: 'ad',
                  format: 'Single Image',
                  status: 'active',
                  totalLeads: 35,
                  goodLeads: 22,
                  badLeads: 13,
                  budget: 7000000,
                  revenue: 65000000,
                  cost: 6300000
                },
                {
                  id: 'ad_4',
                  name: 'Summer Sale Creative D - Collection',
                  type: 'ad',
                  format: 'Collection',
                  status: 'active',
                  totalLeads: 25,
                  goodLeads: 14,
                  badLeads: 11,
                  budget: 5000000,
                  revenue: 45000000,
                  cost: 4500000
                }
              ]
            }
          ]
        },
        {
          id: 'campaign_2',
          name: 'Google Search Campaign',
          source: 'Google',
          type: 'campaign',
          status: 'active',
          totalLeads: 100,
          goodLeads: 70,
          badLeads: 30,
          budget: 20000000,
          revenue: 200000000,
          cost: 18000000,
          adGroups: [
            {
              id: 'adgroup_3',
              name: 'Branded Keywords',
              type: 'adGroup',
              status: 'active',
              totalLeads: 60,
              goodLeads: 45,
              badLeads: 15,
              budget: 12000000,
              revenue: 125000000,
              cost: 10800000,
              ads: [
                {
                  id: 'ad_5',
                  name: 'Brand Search Ad 1',
                  type: 'ad',
                  format: 'Text Ad',
                  status: 'active',
                  totalLeads: 35,
                  goodLeads: 27,
                  badLeads: 8,
                  budget: 7000000,
                  revenue: 75000000,
                  cost: 6300000
                },
                {
                  id: 'ad_6',
                  name: 'Brand Search Ad 2',
                  type: 'ad',
                  format: 'Text Ad',
                  status: 'active',
                  totalLeads: 25,
                  goodLeads: 18,
                  badLeads: 7,
                  budget: 5000000,
                  revenue: 50000000,
                  cost: 4500000
                }
              ]
            },
            {
              id: 'adgroup_4',
              name: 'Generic Keywords',
              type: 'adGroup',
              status: 'active',
              totalLeads: 40,
              goodLeads: 25,
              badLeads: 15,
              budget: 8000000,
              revenue: 75000000,
              cost: 7200000,
              ads: [
                {
                  id: 'ad_7',
                  name: 'Generic Search Ad 1',
                  type: 'ad',
                  format: 'Text Ad',
                  status: 'active',
                  totalLeads: 40,
                  goodLeads: 25,
                  badLeads: 15,
                  budget: 8000000,
                  revenue: 75000000,
                  cost: 7200000
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'lp_2',
      name: 'Service Introduction Landing Page',
      url: 'https://domain.com/services',
      category: 'Service',
      type: 'landingPage',
      totalLeads: 180,
      goodLeads: 125,
      badLeads: 55,
      budget: 35000000,
      revenue: 325000000,
      cost: 32000000,
      campaigns: [
        {
          id: 'campaign_3',
          name: 'TikTok Viral Campaign',
          source: 'TikTok',
          type: 'campaign',
          status: 'active',
          totalLeads: 120,
          goodLeads: 85,
          badLeads: 35,
          budget: 25000000,
          revenue: 225000000,
          cost: 22500000,
          adGroups: [
            {
              id: 'adgroup_5',
              name: 'Viral Challenge Videos',
              type: 'adGroup',
              status: 'active',
              totalLeads: 80,
              goodLeads: 58,
              badLeads: 22,
              budget: 16000000,
              revenue: 150000000,
              cost: 14400000,
              ads: [
                {
                  id: 'ad_8',
                  name: 'Challenge Video #1',
                  type: 'ad',
                  format: 'Video',
                  status: 'active',
                  totalLeads: 50,
                  goodLeads: 38,
                  badLeads: 12,
                  budget: 10000000,
                  revenue: 95000000,
                  cost: 9000000
                },
                {
                  id: 'ad_9',
                  name: 'Challenge Video #2',
                  type: 'ad',
                  format: 'Video',
                  status: 'active',
                  totalLeads: 30,
                  goodLeads: 20,
                  badLeads: 10,
                  budget: 6000000,
                  revenue: 55000000,
                  cost: 5400000
                }
              ]
            },
            {
              id: 'adgroup_6',
              name: 'Brand Awareness Videos',
              type: 'adGroup',
              status: 'active',
              totalLeads: 40,
              goodLeads: 27,
              badLeads: 13,
              budget: 9000000,
              revenue: 75000000,
              cost: 8100000,
              ads: [
                {
                  id: 'ad_10',
                  name: 'Brand Story Video',
                  type: 'ad',
                  format: 'Video',
                  status: 'active',
                  totalLeads: 40,
                  goodLeads: 27,
                  badLeads: 13,
                  budget: 9000000,
                  revenue: 75000000,
                  cost: 8100000
                }
              ]
            }
          ]
        },
        {
          id: 'campaign_4',
          name: 'Zalo Community Campaign',
          source: 'Zalo',
          type: 'campaign',
          status: 'active',
          totalLeads: 60,
          goodLeads: 40,
          badLeads: 20,
          budget: 10000000,
          revenue: 100000000,
          cost: 9500000,
          adGroups: [
            {
              id: 'adgroup_7',
              name: 'Local Community Targeting',
              type: 'adGroup',
              status: 'active',
              totalLeads: 60,
              goodLeads: 40,
              badLeads: 20,
              budget: 10000000,
              revenue: 100000000,
              cost: 9500000,
              ads: [
                {
                  id: 'ad_11',
                  name: 'Community Banner Ad',
                  type: 'ad',
                  format: 'Banner',
                  status: 'active',
                  totalLeads: 35,
                  goodLeads: 25,
                  badLeads: 10,
                  budget: 6000000,
                  revenue: 60000000,
                  cost: 5700000
                },
                {
                  id: 'ad_12',
                  name: 'Community Story Ad',
                  type: 'ad',
                  format: 'Story',
                  status: 'active',
                  totalLeads: 25,
                  goodLeads: 15,
                  badLeads: 10,
                  budget: 4000000,
                  revenue: 40000000,
                  cost: 3800000
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'lp_3',
      name: 'Demo Request Landing Page',
      url: 'https://domain.com/demo',
      category: 'Demo',
      type: 'landingPage',
      totalLeads: 150,
      goodLeads: 110,
      badLeads: 40,
      budget: 25000000,
      revenue: 275000000,
      cost: 23000000,
      campaigns: [
        {
          id: 'campaign_5',
          name: 'Facebook Brand Awareness',
          source: 'Facebook',
          type: 'campaign',
          status: 'active',
          totalLeads: 90,
          goodLeads: 68,
          badLeads: 22,
          budget: 15000000,
          revenue: 165000000,
          cost: 13800000,
          adGroups: [
            {
              id: 'adgroup_8',
              name: 'Interest-Based Targeting',
              type: 'adGroup',
              status: 'active',
              totalLeads: 90,
              goodLeads: 68,
              badLeads: 22,
              budget: 15000000,
              revenue: 165000000,
              cost: 13800000,
              ads: [
                {
                  id: 'ad_13',
                  name: 'Demo Request Video Ad',
                  type: 'ad',
                  format: 'Video',
                  status: 'active',
                  totalLeads: 50,
                  goodLeads: 40,
                  badLeads: 10,
                  budget: 8500000,
                  revenue: 95000000,
                  cost: 7800000
                },
                {
                  id: 'ad_14',
                  name: 'Demo Request Carousel Ad',
                  type: 'ad',
                  format: 'Carousel',
                  status: 'active',
                  totalLeads: 40,
                  goodLeads: 28,
                  badLeads: 12,
                  budget: 6500000,
                  revenue: 70000000,
                  cost: 6000000
                }
              ]
            }
          ]
        },
        {
          id: 'campaign_6',
          name: 'Google Display Retargeting',
          source: 'Google',
          type: 'campaign',
          status: 'active',
          totalLeads: 60,
          goodLeads: 42,
          badLeads: 18,
          budget: 10000000,
          revenue: 110000000,
          cost: 9200000,
          adGroups: [
            {
              id: 'adgroup_9',
              name: 'Website Visitors Retargeting',
              type: 'adGroup',
              status: 'active',
              totalLeads: 60,
              goodLeads: 42,
              badLeads: 18,
              budget: 10000000,
              revenue: 110000000,
              cost: 9200000,
              ads: [
                {
                  id: 'ad_15',
                  name: 'Retargeting Banner 728x90',
                  type: 'ad',
                  format: 'Banner',
                  status: 'active',
                  totalLeads: 35,
                  goodLeads: 26,
                  badLeads: 9,
                  budget: 6000000,
                  revenue: 66000000,
                  cost: 5500000
                },
                {
                  id: 'ad_16',
                  name: 'Retargeting Banner 300x250',
                  type: 'ad',
                  format: 'Banner',
                  status: 'active',
                  totalLeads: 25,
                  goodLeads: 16,
                  badLeads: 9,
                  budget: 4000000,
                  revenue: 44000000,
                  cost: 3700000
                }
              ]
            }
          ]
        }
      ]
    }
  ];
};

// Calculate metrics for each item
const calculateMetrics = (item: any) => {
  const goodLeadRate = item.totalLeads > 0 ? (item.goodLeads / item.totalLeads) * 100 : 0;
  const cplAll = item.totalLeads > 0 ? item.cost / item.totalLeads : 0;
  const cplGood = item.goodLeads > 0 ? item.cost / item.goodLeads : 0;
  const roas = item.budget > 0 ? item.revenue / item.budget : 0;
  
  return {
    ...item,
    goodLeadRate,
    cplAll,
    cplGood,
    roas
  };
};

// Flatten hierarchy for filtering
const flattenHierarchy = (data: any[]) => {
  const flattened: any[] = [];
  
  data.forEach(landingPage => {
    flattened.push({ ...landingPage, level: 0, parentId: null });
    
    landingPage.campaigns?.forEach((campaign: any) => {
      flattened.push({ ...campaign, level: 1, parentId: landingPage.id });
      
      campaign.adGroups?.forEach((adGroup: any) => {
        flattened.push({ ...adGroup, level: 2, parentId: campaign.id });
        
        adGroup.ads?.forEach((ad: any) => {
          flattened.push({ ...ad, level: 3, parentId: adGroup.id });
        });
      });
    });
  });
  
  return flattened;
};

interface LandingPageTrackerProps {
  className?: string;
}

export const LandingPageTracker: React.FC<LandingPageTrackerProps> = ({ className }) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceFilter, setSourceFilter] = useState<string>('all');

  const data = useMemo(() => generateLandingPageHierarchyData(), []);
  
  // Create flattened data for filtering
  const flatData = useMemo(() => flattenHierarchy(data), [data]);
  
  // Get unique sources for filter
  const sources = useMemo(() => {
    const uniqueSources = new Set<string>();
    flatData.forEach(item => {
      if (item.source) uniqueSources.add(item.source);
    });
    return Array.from(uniqueSources);
  }, [flatData]);

  const toggleExpansion = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const shouldShowItem = (item: any, parentVisible: boolean = true) => {
    if (!parentVisible) return false;
    
    // Level filter
    if (levelFilter !== 'all') {
      const levelMap = { 'landingPage': 0, 'campaign': 1, 'adGroup': 2, 'ad': 3 };
      if (item.level !== levelMap[levelFilter as keyof typeof levelMap]) return false;
    }
    
    // Source filter
    if (sourceFilter !== 'all' && item.source && item.source !== sourceFilter) return false;
    
    // Search filter
    if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    
    return true;
  };

  const renderRow = (item: any, level: number, isVisible: boolean = true) => {
    if (!isVisible) return null;
    
    const itemWithMetrics = calculateMetrics(item);
    const isExpanded = expandedItems.has(item.id);
    const hasChildren = (item.campaigns?.length > 0) || (item.adGroups?.length > 0) || (item.ads?.length > 0);
    const indent = level * 32;

    const getIcon = () => {
      switch (item.type) {
        case 'landingPage': return Globe;
        case 'campaign': return Target;
        case 'adGroup': return Activity;
        case 'ad': return BarChart3;
        default: return Globe;
      }
    };

    const Icon = getIcon();

    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
      }).format(amount);
    };

    const formatNumber = (num: number) => {
      return new Intl.NumberFormat('vi-VN').format(num);
    };

    return (
      <React.Fragment key={item.id}>
        <TableRow 
          className={`hover:bg-muted/30 transition-colors ${hasChildren ? 'cursor-pointer' : ''} ${
            level === 0 ? 'bg-muted/20 font-semibold' : 
            level === 1 ? 'bg-background' :
            level === 2 ? 'bg-muted/5' : 'bg-muted/10'
          }`}
          onClick={hasChildren ? () => toggleExpansion(item.id) : undefined}
        >
          {/* Nguồn column */}
          <TableCell>
            <div className="flex items-center gap-3" style={{ paddingLeft: `${indent}px` }}>
              {hasChildren && (
                <div className="flex items-center">
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              )}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                level === 0 ? 'bg-primary/15' :
                level === 1 ? 'bg-blue-500/15' :
                level === 2 ? 'bg-green-500/15' : 'bg-orange-500/15'
              }`}>
                <Icon className={`h-4 w-4 ${
                  level === 0 ? 'text-primary' :
                  level === 1 ? 'text-blue-500' :
                  level === 2 ? 'text-green-500' : 'text-orange-500'
                }`} />
              </div>
              <div>
                <div className="font-medium">{item.name}</div>
                {item.url && <div className="text-xs text-muted-foreground">{item.url}</div>}
                {item.source && (
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {item.source}
                    </Badge>
                    {item.format && (
                      <Badge variant="secondary" className="text-xs">
                        {item.format}
                      </Badge>
                    )}
                    {item.status === 'active' ? (
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                    ) : (
                      <div className="w-2 h-2 bg-gray-400 rounded-full" />
                    )}
                  </div>
                )}
              </div>
            </div>
          </TableCell>

          {/* Tổng Lead */}
          <TableCell className="text-center">
            <div className="font-medium">{formatNumber(itemWithMetrics.totalLeads)}</div>
          </TableCell>

          {/* Lead Tốt */}
          <TableCell className="text-center">
            <div className="text-green-600 font-medium">{formatNumber(itemWithMetrics.goodLeads)}</div>
          </TableCell>

          {/* Lead Xấu */}
          <TableCell className="text-center">
            <div className="text-red-600 font-medium">{formatNumber(itemWithMetrics.badLeads)}</div>
          </TableCell>

          {/* % Lead Tốt */}
          <TableCell className="text-center">
            <div className={`font-medium ${
              itemWithMetrics.goodLeadRate >= 70 ? 'text-green-600' :
              itemWithMetrics.goodLeadRate >= 50 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {itemWithMetrics.goodLeadRate.toFixed(1)}%
            </div>
          </TableCell>

          {/* Ngân sách */}
          <TableCell className="text-right">
            <div className="font-medium">{formatCurrency(itemWithMetrics.budget)}</div>
          </TableCell>

          {/* Doanh thu */}
          <TableCell className="text-right">
            <div className="text-green-600 font-medium">{formatCurrency(itemWithMetrics.revenue)}</div>
          </TableCell>

          {/* CPL Tất cả */}
          <TableCell className="text-right">
            <div className="font-medium">{formatCurrency(itemWithMetrics.cplAll)}</div>
          </TableCell>

          {/* CPL Lead Tốt */}
          <TableCell className="text-right">
            <div className="font-medium">{formatCurrency(itemWithMetrics.cplGood)}</div>
          </TableCell>

          {/* ROAS */}
          <TableCell className="text-center">
            <div className={`font-medium ${
              itemWithMetrics.roas >= 3 ? 'text-green-600' :
              itemWithMetrics.roas >= 2 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {itemWithMetrics.roas.toFixed(2)}x
            </div>
          </TableCell>
        </TableRow>

        {/* Render children if expanded */}
        {isExpanded && (
          <>
            {item.campaigns?.map((campaign: any) => (
              renderRow(campaign, level + 1, shouldShowItem(campaign))
            ))}
            {item.adGroups?.map((adGroup: any) => (
              renderRow(adGroup, level + 1, shouldShowItem(adGroup))
            ))}
            {item.ads?.map((ad: any) => (
              renderRow(ad, level + 1, shouldShowItem(ad))
            ))}
          </>
        )}
      </React.Fragment>
    );
  };

  // Calculate grand totals
  const grandTotals = useMemo(() => {
    const totals = data.reduce((acc, item) => ({
      totalLeads: acc.totalLeads + item.totalLeads,
      goodLeads: acc.goodLeads + item.goodLeads,
      badLeads: acc.badLeads + item.badLeads,
      budget: acc.budget + item.budget,
      revenue: acc.revenue + item.revenue,
      cost: acc.cost + item.cost
    }), { totalLeads: 0, goodLeads: 0, badLeads: 0, budget: 0, revenue: 0, cost: 0 });

    return calculateMetrics(totals);
  }, [data]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('vi-VN').format(num);
  };

  return (
    <Card className={`border border-border/50 shadow-sm ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          Phân Tích Landing Page
        </CardTitle>
        <CardDescription>
          Theo dõi hiệu quả landing page theo cấu trúc phân cấp 4 tầng
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-2">
            <Label>Cấp:</Label>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả cấp</SelectItem>
                <SelectItem value="landingPage">Landing Page</SelectItem>
                <SelectItem value="campaign">Campaign</SelectItem>
                <SelectItem value="adGroup">Ad Group</SelectItem>
                <SelectItem value="ad">Ads</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Label>Nguồn:</Label>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả nguồn</SelectItem>
                {sources.map(source => (
                  <SelectItem key={source} value={source}>{source}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Label>Tìm kiếm:</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Nhập tên để tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
          </div>

          {/* Reset filters */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              setLevelFilter('all');
              setSourceFilter('all');
              setSearchTerm('');
            }}
          >
            <Filter className="h-4 w-4 mr-2" />
            Xóa bộ lọc
          </Button>
        </div>

        {/* Table */}
        <div className="rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="min-w-[300px]">Nguồn</TableHead>
                  <TableHead className="text-center min-w-[100px]">Tổng Lead</TableHead>
                  <TableHead className="text-center min-w-[100px]">Lead Tốt</TableHead>
                  <TableHead className="text-center min-w-[100px]">Lead Xấu</TableHead>
                  <TableHead className="text-center min-w-[100px]">% Lead Tốt</TableHead>
                  <TableHead className="text-right min-w-[120px]">Ngân sách</TableHead>
                  <TableHead className="text-right min-w-[120px]">Doanh thu</TableHead>
                  <TableHead className="text-right min-w-[120px]">CPL Tất cả</TableHead>
                  <TableHead className="text-right min-w-[120px]">CPL Lead Tốt</TableHead>
                  <TableHead className="text-center min-w-[80px]">ROAS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((landingPage) => 
                  renderRow(landingPage, 0, shouldShowItem(landingPage))
                )}

                {/* Grand Total Row */}
                <TableRow className="border-t-2 border-primary/20 bg-primary/5 font-bold">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary/15">
                        <TrendingUp className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-bold text-primary">TỔNG CỘNG</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-bold">
                    {formatNumber(grandTotals.totalLeads)}
                  </TableCell>
                  <TableCell className="text-center font-bold text-green-600">
                    {formatNumber(grandTotals.goodLeads)}
                  </TableCell>
                  <TableCell className="text-center font-bold text-red-600">
                    {formatNumber(grandTotals.badLeads)}
                  </TableCell>
                  <TableCell className="text-center font-bold">
                    {grandTotals.goodLeadRate.toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {formatCurrency(grandTotals.budget)}
                  </TableCell>
                  <TableCell className="text-right font-bold text-green-600">
                    {formatCurrency(grandTotals.revenue)}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {formatCurrency(grandTotals.cplAll)}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {formatCurrency(grandTotals.cplGood)}
                  </TableCell>
                  <TableCell className="text-center font-bold">
                    {grandTotals.roas.toFixed(2)}x
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Empty state */}
        {data.length === 0 && (
          <div className="text-center py-8">
            <div className="flex flex-col items-center gap-2">
              <Globe className="h-8 w-8 text-muted-foreground" />
              <p className="text-muted-foreground">Không có dữ liệu landing page</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};