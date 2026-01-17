import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';
import { ColumnCustomizerPopup } from './ColumnCustomizerPopup';
import { LandingPageTracker } from './LandingPageTracker';
import { 
  Filter,
  Download,
  RefreshCw,
  Calendar as CalendarIcon,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  TrendingUp,
  Users,
  Target,
  DollarSign,
  Facebook,
  Chrome,
  Globe,
  MessageSquare,
  Search,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Zap,
  Eye,
  Settings,
  ChevronDown,
  ChevronRight,
  StickyNote,
  Bell,
  HelpCircle,
  ClipboardList,
  User,
  CreditCard,
  LogOut
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie, BarChart as RechartsBarChart, Bar, Legend } from 'recharts';

// Mock data generation for ads tracking with hierarchical campaign structure
const generateAdsTrackingData = () => {
  const sources = [
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: '#1877f2' },
    { id: 'google', name: 'Google', icon: Chrome, color: '#4285f4' },
    { id: 'tiktok', name: 'TikTok', icon: Activity, color: '#ff0050' },
    { id: 'zalo', name: 'Zalo', icon: MessageSquare, color: '#0084ff' }
  ];

  const sourceTypes = ['Lead Form', 'Landing Page'];
  const campaignStatuses = ['active', 'inactive']; // New campaign status

  // Generate hierarchical campaign data: Campaign > Ad Groups > Ads
  const sourceData = [
    // Facebook campaigns
    {
      source: 'Facebook',
      sourceId: 'facebook',
      sourceIcon: Facebook,
      sourceColor: '#1877f2',
      campaigns: [
        {
          id: 'fb_summer_campaign',
          sourceType: 'Lead Form',
          campaign: 'summer_sale_2024',
          status: 'active',
          medium: 'cpc',
          content: 'seasonal_promotion',
          term: '',
          totalLeads: 145,
          goodLeads: 98,  // Hot + Warm -> Good
          badLeads: 47,   // Cold -> Bad
          budget: 25000000, // New budget field
          revenue: 285000000, // Linked from CRM
          cost: 22000000,
          adGroups: [
            {
              id: 'fb_summer_ag1',
              name: 'Summer Sale - Audience 1',
              status: 'active',
              totalLeads: 85,
              goodLeads: 62,
              badLeads: 23,
              budget: 15000000,
              revenue: 175000000,
              cost: 13500000,
              ads: [
                {
                  id: 'fb_summer_ad1',
                  name: 'Summer Sale Creative A',
                  status: 'active',
                  totalLeads: 45,
                  goodLeads: 32,
                  badLeads: 13,
                  budget: 8000000,
                  revenue: 95000000,
                  cost: 7200000
                },
                {
                  id: 'fb_summer_ad2', 
                  name: 'Summer Sale Creative B',
                  status: 'active',
                  totalLeads: 40,
                  goodLeads: 30,
                  badLeads: 10,
                  budget: 7000000,
                  revenue: 80000000,
                  cost: 6300000
                }
              ]
            },
            {
              id: 'fb_summer_ag2',
              name: 'Summer Sale - Audience 2',
              status: 'active',
              totalLeads: 60,
              goodLeads: 36,
              badLeads: 24,
              budget: 10000000,
              revenue: 110000000,
              cost: 8500000,
              ads: [
                {
                  id: 'fb_summer_ad3',
                  name: 'Summer Sale Video Ad',
                  status: 'active',
                  totalLeads: 35,
                  goodLeads: 22,
                  badLeads: 13,
                  budget: 6000000,
                  revenue: 65000000,
                  cost: 5100000
                },
                {
                  id: 'fb_summer_ad4',
                  name: 'Summer Sale Carousel',
                  status: 'active',
                  totalLeads: 25,
                  goodLeads: 14,
                  badLeads: 11,
                  budget: 4000000,
                  revenue: 45000000,
                  cost: 3400000
                }
              ]
            }
          ]
        },
        {
          id: 'fb_brand_campaign',
          sourceType: 'Landing Page',
          campaign: 'brand_awareness_2024',
          status: 'active',
          medium: 'social',
          content: 'brand_content',
          term: '',
          totalLeads: 78,
          goodLeads: 52,
          badLeads: 26,
          budget: 18000000,
          revenue: 156000000,
          cost: 15500000,
          adGroups: [
            {
              id: 'fb_brand_ag1',
              name: 'Brand Awareness - Video',
              status: 'active',
              totalLeads: 45,
              goodLeads: 31,
              badLeads: 14,
              budget: 11000000,
              revenue: 93000000,
              cost: 9200000,
              ads: [
                {
                  id: 'fb_brand_ad1',
                  name: 'Brand Video 30s',
                  status: 'active',
                  totalLeads: 28,
                  goodLeads: 19,
                  badLeads: 9,
                  budget: 7000000,
                  revenue: 58000000,
                  cost: 5800000
                },
                {
                  id: 'fb_brand_ad2',
                  name: 'Brand Video 15s',
                  status: 'active',
                  totalLeads: 17,
                  goodLeads: 12,
                  badLeads: 5,
                  budget: 4000000,
                  revenue: 35000000,
                  cost: 3400000
                }
              ]
            },
            {
              id: 'fb_brand_ag2',
              name: 'Brand Awareness - Static',
              status: 'active',
              totalLeads: 33,
              goodLeads: 21,
              badLeads: 12,
              budget: 7000000,
              revenue: 63000000,
              cost: 6300000,
              ads: [
                {
                  id: 'fb_brand_ad3',
                  name: 'Brand Static Image',
                  status: 'active',
                  totalLeads: 33,
                  goodLeads: 21,
                  badLeads: 12,
                  budget: 7000000,
                  revenue: 63000000,
                  cost: 6300000
                }
              ]
            }
          ]
        },
        {
          id: 'fb_retargeting_campaign',
          sourceType: 'Lead Form',
          campaign: 'retargeting_q4',
          status: 'inactive', // Inactive campaign example
          medium: 'cpc',
          content: 'retargeting_creative',
          term: '',
          totalLeads: 42,
          goodLeads: 25,
          badLeads: 17,
          budget: 12000000,
          revenue: 95000000,
          cost: 10800000,
          adGroups: [
            {
              id: 'fb_retarg_ag1',
              name: 'Website Visitors Retargeting',
              status: 'inactive',
              totalLeads: 42,
              goodLeads: 25,
              badLeads: 17,
              budget: 12000000,
              revenue: 95000000,
              cost: 10800000,
              ads: [
                {
                  id: 'fb_retarg_ad1',
                  name: 'Retargeting Carousel',
                  status: 'inactive',
                  totalLeads: 25,
                  goodLeads: 16,
                  badLeads: 9,
                  budget: 7000000,
                  revenue: 58000000,
                  cost: 6200000
                },
                {
                  id: 'fb_retarg_ad2',
                  name: 'Retargeting Single Image',
                  status: 'inactive',
                  totalLeads: 17,
                  goodLeads: 9,
                  badLeads: 8,
                  budget: 5000000,
                  revenue: 37000000,
                  cost: 4600000
                }
              ]
            }
          ]
        }
      ]
    },
    // Google campaigns  
    {
      source: 'Google',
      sourceId: 'google',
      sourceIcon: Chrome,
      sourceColor: '#4285f4',
      campaigns: [
        {
          id: 'gg_search_campaign',
          sourceType: 'Lead Form',
          campaign: 'google_search_2024',
          status: 'active',
          medium: 'cpc',
          content: 'search_ads',
          term: 'relevant_keywords',
          totalLeads: 95,
          goodLeads: 73,
          badLeads: 22,
          budget: 20000000,
          revenue: 185000000,
          cost: 18500000,
          adGroups: [
            {
              id: 'gg_search_ag1',
              name: 'Branded Keywords',
              status: 'active',
              totalLeads: 55,
              goodLeads: 45,
              badLeads: 10,
              budget: 12000000,
              revenue: 115000000,
              cost: 11200000,
              ads: [
                {
                  id: 'gg_search_ad1',
                  name: 'Brand Search Ad 1',
                  status: 'active',
                  totalLeads: 32,
                  goodLeads: 27,
                  badLeads: 5,
                  budget: 7000000,
                  revenue: 68000000,
                  cost: 6500000
                },
                {
                  id: 'gg_search_ad2',
                  name: 'Brand Search Ad 2',
                  status: 'active',
                  totalLeads: 23,
                  goodLeads: 18,
                  badLeads: 5,
                  budget: 5000000,
                  revenue: 47000000,
                  cost: 4700000
                }
              ]
            },
            {
              id: 'gg_search_ag2',
              name: 'Generic Keywords',
              status: 'active',
              totalLeads: 40,
              goodLeads: 28,
              badLeads: 12,
              budget: 8000000,
              revenue: 70000000,
              cost: 7300000,
              ads: [
                {
                  id: 'gg_search_ad3',
                  name: 'Generic Search Ad',
                  status: 'active',
                  totalLeads: 40,
                  goodLeads: 28,
                  badLeads: 12,
                  budget: 8000000,
                  revenue: 70000000,
                  cost: 7300000
                }
              ]
            }
          ]
        },
        {
          id: 'gg_display_campaign',
          sourceType: 'Landing Page',
          campaign: 'display_remarketing',
          status: 'active',
          medium: 'display',
          content: 'banner_ads',
          term: '',
          totalLeads: 48,
          goodLeads: 29,
          badLeads: 19,
          budget: 15000000,
          revenue: 87000000,
          cost: 13200000,
          adGroups: [
            {
              id: 'gg_display_ag1',
              name: 'Website Visitors',
              status: 'active',
              totalLeads: 48,
              goodLeads: 29,
              badLeads: 19,
              budget: 15000000,
              revenue: 87000000,
              cost: 13200000,
              ads: [
                {
                  id: 'gg_display_ad1',
                  name: 'Remarketing Banner 728x90',
                  status: 'active',
                  totalLeads: 26,
                  goodLeads: 17,
                  badLeads: 9,
                  budget: 8000000,
                  revenue: 48000000,
                  cost: 7100000
                },
                {
                  id: 'gg_display_ad2',
                  name: 'Remarketing Banner 300x250',
                  status: 'active',
                  totalLeads: 22,
                  goodLeads: 12,
                  badLeads: 10,
                  budget: 7000000,
                  revenue: 39000000,
                  cost: 6100000
                }
              ]
            }
          ]
        }
      ]
    },
    // TikTok campaigns
    {
      source: 'TikTok',
      sourceId: 'tiktok',
      sourceIcon: Activity,
      sourceColor: '#ff0050',
      campaigns: [
        {
          id: 'tt_video_campaign',
          sourceType: 'Landing Page',
          campaign: 'tiktok_video_ads_2024',
          status: 'active',
          medium: 'video',
          content: 'viral_content',
          term: '',
          totalLeads: 87,
          goodLeads: 52,
          badLeads: 35,
          budget: 30000000,
          revenue: 124000000,
          cost: 28500000,
          adGroups: [
            {
              id: 'tt_video_ag1',
              name: 'Viral Challenge Videos',
              status: 'active',
              totalLeads: 62,
              goodLeads: 35,
              badLeads: 27,
              budget: 22000000,
              revenue: 89000000,
              cost: 20500000,
              ads: [
                {
                  id: 'tt_video_ad1',
                  name: 'Challenge Video #1',
                  status: 'active',
                  totalLeads: 35,
                  goodLeads: 22,
                  badLeads: 13,
                  budget: 12000000,
                  revenue: 52000000,
                  cost: 11200000
                },
                {
                  id: 'tt_video_ad2',
                  name: 'Challenge Video #2',
                  status: 'active',
                  totalLeads: 27,
                  goodLeads: 13,
                  badLeads: 14,
                  budget: 10000000,
                  revenue: 37000000,
                  cost: 9300000
                }
              ]
            },
            {
              id: 'tt_video_ag2',
              name: 'Brand Awareness Videos',
              status: 'active',
              totalLeads: 25,
              goodLeads: 17,
              badLeads: 8,
              budget: 8000000,
              revenue: 35000000,
              cost: 8000000,
              ads: [
                {
                  id: 'tt_video_ad3',
                  name: 'Brand Story Video',
                  status: 'active',
                  totalLeads: 25,
                  goodLeads: 17,
                  badLeads: 8,
                  budget: 8000000,
                  revenue: 35000000,
                  cost: 8000000
                }
              ]
            }
          ]
        },
        {
          id: 'tt_spark_campaign',
          sourceType: 'Lead Form',
          campaign: 'spark_ads_ugc',
          status: 'inactive',
          medium: 'native',
          content: 'user_generated',
          term: '',
          totalLeads: 28,
          goodLeads: 15,
          badLeads: 13,
          budget: 12000000,
          revenue: 42000000,
          cost: 11500000,
          adGroups: [
            {
              id: 'tt_spark_ag1',
              name: 'UGC Spark Ads',
              status: 'inactive',
              totalLeads: 28,
              goodLeads: 15,
              badLeads: 13,
              budget: 12000000,
              revenue: 42000000,
              cost: 11500000,
              ads: [
                {
                  id: 'tt_spark_ad1',
                  name: 'UGC Spark Ad #1',
                  status: 'inactive',
                  totalLeads: 28,
                  goodLeads: 15,
                  badLeads: 13,
                  budget: 12000000,
                  revenue: 42000000,
                  cost: 11500000
                }
              ]
            }
          ]
        }
      ]
    },
    // Zalo campaigns
    {
      source: 'Zalo',
      sourceId: 'zalo',
      sourceIcon: MessageSquare,
      sourceColor: '#0084ff',
      campaigns: [
        {
          id: 'zl_local_campaign',
          sourceType: 'Lead Form',
          campaign: 'zalo_local_2024',
          status: 'active',
          medium: 'social',
          content: 'local_content',
          term: '',
          totalLeads: 41,
          goodLeads: 31,
          badLeads: 10,
          budget: 14000000,
          revenue: 62000000,
          cost: 13200000,
          adGroups: [
            {
              id: 'zl_local_ag1',
              name: 'Local Targeting',
              status: 'active',
              totalLeads: 25,
              goodLeads: 20,
              badLeads: 5,
              budget: 8000000,
              revenue: 38000000,
              cost: 7500000,
              ads: [
                {
                  id: 'zl_local_ad1',
                  name: 'Local Banner Ad',
                  status: 'active',
                  totalLeads: 25,
                  goodLeads: 20,
                  badLeads: 5,
                  budget: 8000000,
                  revenue: 38000000,
                  cost: 7500000
                }
              ]
            },
            {
              id: 'zl_local_ag2',
              name: 'Community Ads',
              status: 'active',
              totalLeads: 16,
              goodLeads: 11,
              badLeads: 5,
              budget: 6000000,
              revenue: 24000000,
              cost: 5700000,
              ads: [
                {
                  id: 'zl_local_ad2',
                  name: 'Community Story Ad',
                  status: 'active',
                  totalLeads: 16,
                  goodLeads: 11,
                  badLeads: 5,
                  budget: 6000000,
                  revenue: 24000000,
                  cost: 5700000
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  // Calculate totals for each source including new metrics
  const sourceTotals = sourceData.map(source => {
    const campaigns = source.campaigns;
    const totalLeads = campaigns.reduce((sum, c) => sum + c.totalLeads, 0);
    const goodLeads = campaigns.reduce((sum, c) => sum + c.goodLeads, 0);
    const badLeads = campaigns.reduce((sum, c) => sum + c.badLeads, 0);
    const revenue = campaigns.reduce((sum, c) => sum + c.revenue, 0);
    const cost = campaigns.reduce((sum, c) => sum + c.cost, 0);
    const budget = campaigns.reduce((sum, c) => sum + (c.budget || c.cost), 0);
    const goodLeadRate = totalLeads > 0 ? (goodLeads / totalLeads) * 100 : 0;
    const cpl = totalLeads > 0 ? cost / totalLeads : 0;

    return {
      ...source,
      totalLeads,
      goodLeads,
      badLeads,
      goodLeadRate,
      revenue,
      cost,
      budget, // New budget field
      cpl,
      // New calculated metrics
      cplAll: totalLeads > 0 ? cost / totalLeads : 0,
      cplGood: goodLeads > 0 ? cost / goodLeads : 0,
      roas: budget > 0 ? revenue / budget : 0,
      campaigns: campaigns.map(campaign => ({
        ...campaign,
        goodLeadRate: campaign.totalLeads > 0 ? (campaign.goodLeads / campaign.totalLeads) * 100 : 0,
        cpl: campaign.totalLeads > 0 ? campaign.cost / campaign.totalLeads : 0,
        // New calculated metrics for campaigns
        cplAll: campaign.totalLeads > 0 ? campaign.cost / campaign.totalLeads : 0,
        cplGood: campaign.goodLeads > 0 ? campaign.cost / campaign.goodLeads : 0,
        roas: (campaign.budget || campaign.cost) > 0 ? campaign.revenue / (campaign.budget || campaign.cost) : 0
      }))
    };
  });

  // Calculate grand totals including budget
  const grandTotals = {
    totalLeads: sourceTotals.reduce((sum, s) => sum + s.totalLeads, 0),
    goodLeads: sourceTotals.reduce((sum, s) => sum + s.goodLeads, 0),
    badLeads: sourceTotals.reduce((sum, s) => sum + s.badLeads, 0),
    revenue: sourceTotals.reduce((sum, s) => sum + s.revenue, 0),
    cost: sourceTotals.reduce((sum, s) => sum + s.cost, 0),
    budget: sourceTotals.reduce((sum, s) => sum + s.budget, 0) // Add budget calculation
  };
  
  grandTotals.goodLeadRate = grandTotals.totalLeads > 0 ? (grandTotals.goodLeads / grandTotals.totalLeads) * 100 : 0;
  grandTotals.cpl = grandTotals.totalLeads > 0 ? grandTotals.cost / grandTotals.totalLeads : 0;

  // Generate landing page data structure
  const landingPageData = [
    {
      id: 'lp_product_showcase',
      name: 'Product Showcase LP',
      url: 'https://domain.com/product-showcase',
      category: 'Product',
      sources: ['Facebook', 'Google', 'TikTok'],
      campaigns: [
        { sourceId: 'facebook', campaignId: 'fb_summer_lp', campaign: 'summer_sale_2024', totalLeads: 28, goodLeads: 20, badLeads: 8, revenue: 55000000, cost: 12000000 },
        { sourceId: 'google', campaignId: 'gg_remarket_lp', campaign: 'remarketing', totalLeads: 18, goodLeads: 11, badLeads: 7, revenue: 23000000, cost: 8000000 },
        { sourceId: 'tiktok', campaignId: 'tt_viral_lp', campaign: 'viral_challenge', totalLeads: 62, goodLeads: 35, badLeads: 27, revenue: 52000000, cost: 25000000 }
      ]
    },
    {
      id: 'lp_service_intro',
      name: 'Service Introduction LP',
      url: 'https://domain.com/services',
      category: 'Service',
      sources: ['Facebook', 'Google'],
      campaigns: [
        { sourceId: 'facebook', campaignId: 'fb_brand_lp', campaign: 'brand_awareness', totalLeads: 24, goodLeads: 15, badLeads: 9, revenue: 35000000, cost: 7000000 },
        { sourceId: 'google', campaignId: 'gg_seo_lp', campaign: 'seo_content', totalLeads: 22, goodLeads: 16, badLeads: 6, revenue: 38000000, cost: 5000000 }
      ]
    },
    {
      id: 'lp_demo_request',
      name: 'Demo Request LP',
      url: 'https://domain.com/demo',
      category: 'Demo',
      sources: ['Facebook', 'TikTok', 'Zalo'],
      campaigns: [
        { sourceId: 'facebook', campaignId: 'fb_demo_lp', campaign: 'product_demo', totalLeads: 31, goodLeads: 19, badLeads: 12, revenue: 48000000, cost: 12000000 },
        { sourceId: 'tiktok', campaignId: 'tt_takeover_lp', campaign: 'brand_takeover', totalLeads: 35, goodLeads: 18, badLeads: 17, revenue: 28000000, cost: 15000000 },
        { sourceId: 'zalo', campaignId: 'zl_community_lp', campaign: 'community_ads', totalLeads: 26, goodLeads: 19, badLeads: 7, revenue: 34000000, cost: 8000000 }
      ]
    }
  ];

  // Calculate landing page totals
  const landingPageTotals = landingPageData.map(landingPage => {
    const totals = landingPage.campaigns.reduce((acc, campaign) => ({
      totalLeads: acc.totalLeads + campaign.totalLeads,
      goodLeads: acc.goodLeads + campaign.goodLeads,
      badLeads: acc.badLeads + campaign.badLeads,
      revenue: acc.revenue + campaign.revenue,
      cost: acc.cost + campaign.cost
    }), { totalLeads: 0, goodLeads: 0, badLeads: 0, revenue: 0, cost: 0 });

    return {
      ...landingPage,
      ...totals,
      goodLeadRate: totals.totalLeads > 0 ? (totals.goodLeads / totals.totalLeads) * 100 : 0,
      cpl: totals.totalLeads > 0 ? totals.cost / totals.totalLeads : 0,
      campaigns: landingPage.campaigns.map(campaign => ({
        ...campaign,
        goodLeadRate: campaign.totalLeads > 0 ? (campaign.goodLeads / campaign.totalLeads) * 100 : 0,
        cpl: campaign.totalLeads > 0 ? campaign.cost / campaign.totalLeads : 0
      }))
    };
  });

  return { sources, sourceTypes, sourceTotals, grandTotals, landingPageData: landingPageTotals };
};

// Simple date utilities
const formatDate = (date: Date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${day}/${month}`;
};

const formatFullDate = (date: Date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const subDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
};

const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const startOfWeek = (date: Date) => {
  const result = new Date(date);
  const day = result.getDay();
  const diff = result.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  result.setDate(diff);
  return result;
};

const endOfWeek = (date: Date) => {
  const result = new Date(date);
  const day = result.getDay();
  const diff = result.getDate() + (7 - day);
  result.setDate(diff);
  return result;
};

const startOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

const endOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

// Generate time series data for charts
const generateTimeSeriesData = () => {
  const dates = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = subDays(today, i);
    dates.push({
      date: formatDate(date),
      fullDate: date,
      totalLeads: Math.floor(Math.random() * 50) + 20,
      goodLeads: Math.floor(Math.random() * 35) + 15,
      badLeads: Math.floor(Math.random() * 15) + 5,
      revenue: Math.floor(Math.random() * 20000000) + 5000000
    });
  }
  
  return dates;
};

// Quick date range presets
const datePresets = [
  { label: 'Hôm nay', value: 'today' },
  { label: 'Hôm qua', value: 'yesterday' },
  { label: '7 ngày qua', value: '7days' },
  { label: '30 ngày qua', value: '30days' },
  { label: 'Tuần này', value: 'thisWeek' },
  { label: 'Tuần trước', value: 'lastWeek' },
  { label: 'Tháng này', value: 'thisMonth' },
  { label: 'Tháng trước', value: 'lastMonth' }
];

// Chart colors
const CHART_COLORS = ['#7c3aed', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#ede9fe'];

type SortDirection = 'asc' | 'desc' | null;

interface SortState {
  column: string | null;
  direction: SortDirection;
}

interface AdsTrackingPageProps {
  onOpenPopup?: (popup: string) => void;
  onOpenAccountSettings?: () => void;
  onOpenBilling?: () => void;
  onOpenInviteTeam?: () => void;
  onLogout?: () => void;
}

export function AdsTrackingPage({
  onOpenPopup = () => {},
  onOpenAccountSettings = () => {},
  onOpenBilling = () => {},
  onOpenInviteTeam = () => {},
  onLogout = () => {}
}: AdsTrackingPageProps = {}) {
  // Filter states
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: subDays(new Date(), 7),
    to: new Date()
  });
  const [sourceTypeFilter, setSourceTypeFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [campaignSearch, setCampaignSearch] = useState<string>('');
  const [mediumSearch, setMediumSearch] = useState<string>('');
  const [campaignStatusFilter, setCampaignStatusFilter] = useState<string>('active'); // Default to show only active campaigns - User can switch to show inactive campaigns
  
  // Comparison states
  const [isComparisonEnabled, setIsComparisonEnabled] = useState(false);
  const [comparisonRange, setComparisonRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: subDays(new Date(), 14),
    to: subDays(new Date(), 7)
  });

  // Column customization states
  const [availableColumns] = useState([
    { id: 'source', name: 'Nguồn', visible: true, order: 0 },
    { id: 'totalLeads', name: 'Tổng Lead', visible: true, order: 1 },
    { id: 'goodLeads', name: 'Lead Tốt', visible: true, order: 2 },
    { id: 'badLeads', name: 'Lead Xấu', visible: true, order: 3 },
    { id: 'goodLeadRate', name: '% Lead Tốt', visible: true, order: 4 },
    { id: 'budget', name: 'Ngân sách', visible: true, order: 5 }, // Budget column
    { id: 'cplAll', name: 'CPL Tất cả', visible: true, order: 6 }, // CPL all leads
    { id: 'cplGood', name: 'CPL Lead Tốt', visible: true, order: 7 }, // CPL good leads
    { id: 'roas', name: 'ROAS', visible: true, order: 8 }, // ROAS column
    { id: 'revenue', name: 'Doanh thu', visible: true, order: 9 } // Revenue column moved to end
  ]);
  const [visibleColumns, setVisibleColumns] = useState(availableColumns.filter(col => col.visible));
  const [isColumnCustomizerOpen, setIsColumnCustomizerOpen] = useState(false);
  
  // Table states
  const [sortState, setSortState] = useState<SortState>({ column: null, direction: null });
  const [expandedSources, setExpandedSources] = useState<Set<string>>(new Set());
  const [expandedCampaigns, setExpandedCampaigns] = useState<Set<string>>(new Set());
  const [expandedAdGroups, setExpandedAdGroups] = useState<Set<string>>(new Set());
  const [expandedLandingPages, setExpandedLandingPages] = useState<Set<string>>(new Set());
  
  // Data
  const mockData = useMemo(() => generateAdsTrackingData(), []);
  const timeSeriesData = useMemo(() => generateTimeSeriesData(), []);
  
  // Mock comparison data (simulated previous period data)
  const mockComparisonData = useMemo(() => {
    if (!isComparisonEnabled) return null;
    
    // Generate comparison data with some variation from main data
    const comparisonSourceTotals = mockData.sourceTotals.map(source => ({
      ...source,
      totalLeads: Math.max(1, Math.floor(source.totalLeads * (0.7 + Math.random() * 0.6))), // Random variation ±30%
      goodLeads: Math.max(1, Math.floor(source.goodLeads * (0.7 + Math.random() * 0.6))),
      badLeads: Math.max(1, Math.floor(source.badLeads * (0.7 + Math.random() * 0.6))),
      revenue: Math.max(1000000, Math.floor(source.revenue * (0.7 + Math.random() * 0.6))),
      cost: Math.max(100000, Math.floor(source.cost * (0.7 + Math.random() * 0.6))),
      campaigns: source.campaigns.map(campaign => ({
        ...campaign,
        totalLeads: Math.max(1, Math.floor(campaign.totalLeads * (0.7 + Math.random() * 0.6))),
        goodLeads: Math.max(1, Math.floor(campaign.goodLeads * (0.7 + Math.random() * 0.6))),
        badLeads: Math.max(1, Math.floor(campaign.badLeads * (0.7 + Math.random() * 0.6))),
        revenue: Math.max(1000000, Math.floor(campaign.revenue * (0.7 + Math.random() * 0.6))),
        cost: Math.max(100000, Math.floor(campaign.cost * (0.7 + Math.random() * 0.6)))
      }))
    }));
    
    // Recalculate rates for comparison data
    return {
      sourceTotals: comparisonSourceTotals.map(source => ({
        ...source,
        goodLeadRate: source.totalLeads > 0 ? (source.goodLeads / source.totalLeads) * 100 : 0,
        cpl: source.totalLeads > 0 ? source.cost / source.totalLeads : 0,
        campaigns: source.campaigns.map(campaign => ({
          ...campaign,
          goodLeadRate: campaign.totalLeads > 0 ? (campaign.goodLeads / campaign.totalLeads) * 100 : 0,
          cpl: campaign.totalLeads > 0 ? campaign.cost / campaign.totalLeads : 0
        }))
      }))
    };
  }, [mockData, isComparisonEnabled]);

  // Calculate CPL for all leads
  const calculateCPLAll = (cost: number, totalLeads: number) => {
    return totalLeads > 0 ? cost / totalLeads : 0;
  };

  // Calculate CPL for good leads only
  const calculateCPLGood = (cost: number, goodLeads: number) => {
    return goodLeads > 0 ? cost / goodLeads : 0;
  };

  // Calculate ROAS (Return on Ad Spend) = Revenue / Budget
  const calculateROAS = (revenue: number, budget: number) => {
    return budget > 0 ? revenue / budget : 0;
  };

  // Format ROAS with color coding
  const formatROAS = (roas: number) => {
    const safeRoas = roas || 0;
    const percentage = (safeRoas * 100).toFixed(1);
    const color = safeRoas >= 3 ? 'text-green-600' : safeRoas >= 2 ? 'text-yellow-600' : 'text-red-600';
    return (
      <span className={`font-medium ${color}`}>
        {safeRoas.toFixed(2)}x ({percentage}%)
      </span>
    );
  };

  // Get revenue from CRM (mock function - in real app this would come from CRM integration)
  const getRevenueFromCRM = (leadIds: string[]) => {
    // Mock: simulate getting revenue from CRM based on lead IDs
    // In real implementation, this would query CRM database
    const mockCRMRevenue = leadIds.reduce((total, leadId) => {
      // Simulate some leads having revenue in CRM, others don't
      const hasRevenue = Math.random() > 0.3; // 70% chance of having revenue
      return total + (hasRevenue ? Math.floor(Math.random() * 5000000) + 1000000 : 0);
    }, 0);
    return mockCRMRevenue;
  };
  
  // Filter and sort data with campaign status support
  const filteredData = useMemo(() => {
    let filtered = mockData.sourceTotals.filter(source => {
      if (sourceFilter !== 'all' && source.sourceId !== sourceFilter) return false;
      
      // Filter campaigns within each source with status filter
      const filteredCampaigns = source.campaigns.filter(campaign => {
        if (sourceTypeFilter !== 'all' && campaign.sourceType !== sourceTypeFilter) return false;
        if (campaignSearch && !campaign.campaign.toLowerCase().includes(campaignSearch.toLowerCase())) return false;
        if (mediumSearch && !campaign.medium.toLowerCase().includes(mediumSearch.toLowerCase())) return false;
        if (campaignStatusFilter !== 'all' && campaign.status !== campaignStatusFilter) return false; // New status filter
        return true;
      });
      
      return filteredCampaigns.length > 0;
    }).map(source => ({
      ...source,
      campaigns: source.campaigns.filter(campaign => {
        if (sourceTypeFilter !== 'all' && campaign.sourceType !== sourceTypeFilter) return false;
        if (campaignSearch && !campaign.campaign.toLowerCase().includes(campaignSearch.toLowerCase())) return false;
        if (mediumSearch && !campaign.medium.toLowerCase().includes(mediumSearch.toLowerCase())) return false;
        if (campaignStatusFilter !== 'all' && campaign.status !== campaignStatusFilter) return false; // New status filter
        return true;
      }).map(campaign => ({
        ...campaign,
        // Calculate new metrics
        cplAll: calculateCPLAll(campaign.cost, campaign.totalLeads),
        cplGood: calculateCPLGood(campaign.cost, campaign.goodLeads),
        roas: calculateROAS(campaign.revenue, campaign.budget || campaign.cost), // Use budget if available, fallback to cost
        // Add calculated revenue from CRM (mock)
        crmRevenue: getRevenueFromCRM([campaign.id])
      }))
    }));

    // Apply sorting to sources
    if (sortState.column && sortState.direction) {
      filtered = [...filtered].sort((a, b) => {
        let aVal = a[sortState.column as keyof typeof a];
        let bVal = b[sortState.column as keyof typeof b];
        
        if (typeof aVal === 'string') aVal = aVal.toLowerCase();
        if (typeof bVal === 'string') bVal = bVal.toLowerCase();
        
        if (sortState.direction === 'asc') {
          return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        } else {
          return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
        }
      });
    }

    return filtered;
  }, [mockData.sourceTotals, sourceTypeFilter, sourceFilter, campaignSearch, mediumSearch, campaignStatusFilter, sortState]);

  // Filter landing page data
  const filteredLandingPageData = useMemo(() => {
    let filtered = mockData.landingPageData.filter(landingPage => {
      // Filter campaigns within each landing page
      const filteredCampaigns = landingPage.campaigns.filter(campaign => {
        if (sourceFilter !== 'all' && campaign.sourceId !== sourceFilter) return false;
        if (campaignSearch && !campaign.campaign.toLowerCase().includes(campaignSearch.toLowerCase())) return false;
        return true;
      });
      
      return filteredCampaigns.length > 0;
    }).map(landingPage => ({
      ...landingPage,
      campaigns: landingPage.campaigns.filter(campaign => {
        if (sourceFilter !== 'all' && campaign.sourceId !== sourceFilter) return false;
        if (campaignSearch && !campaign.campaign.toLowerCase().includes(campaignSearch.toLowerCase())) return false;
        return true;
      })
    }));

    // Recalculate totals for filtered landing pages
    filtered = filtered.map(landingPage => {
      const totals = landingPage.campaigns.reduce((acc, campaign) => ({
        totalLeads: acc.totalLeads + campaign.totalLeads,
        goodLeads: acc.goodLeads + campaign.goodLeads,
        badLeads: acc.badLeads + campaign.badLeads,
        revenue: acc.revenue + campaign.revenue,
        cost: acc.cost + campaign.cost
      }), { totalLeads: 0, goodLeads: 0, badLeads: 0, revenue: 0, cost: 0 });

      return {
        ...landingPage,
        ...totals,
        goodLeadRate: totals.totalLeads > 0 ? (totals.goodLeads / totals.totalLeads) * 100 : 0,
        cpl: totals.totalLeads > 0 ? totals.cost / totals.totalLeads : 0
      };
    });

    // Apply sorting to landing pages
    if (sortState.column && sortState.direction) {
      filtered = [...filtered].sort((a, b) => {
        let aVal = a[sortState.column as keyof typeof a];
        let bVal = b[sortState.column as keyof typeof b];
        
        if (typeof aVal === 'string') aVal = aVal.toLowerCase();
        if (typeof bVal === 'string') bVal = bVal.toLowerCase();
        
        if (sortState.direction === 'asc') {
          return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        } else {
          return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
        }
      });
    }

    return filtered;
  }, [mockData.landingPageData, sourceFilter, campaignSearch, sortState]);

  // Handle sort
  const handleSort = (column: string) => {
    setSortState(prev => {
      if (prev.column === column) {
        // Cycle through: null -> asc -> desc -> null
        const newDirection = prev.direction === null ? 'asc' : prev.direction === 'asc' ? 'desc' : null;
        return { column: newDirection ? column : null, direction: newDirection };
      } else {
        return { column, direction: 'asc' };
      }
    });
  };

  // Handle expand/collapse source
  const toggleSourceExpansion = (sourceId: string) => {
    setExpandedSources(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sourceId)) {
        newSet.delete(sourceId);
      } else {
        newSet.add(sourceId);
      }
      return newSet;
    });
  };

  // Handle expand/collapse campaign
  const toggleCampaignExpansion = (campaignId: string) => {
    setExpandedCampaigns(prev => {
      const newSet = new Set(prev);
      if (newSet.has(campaignId)) {
        newSet.delete(campaignId);
      } else {
        newSet.add(campaignId);
      }
      return newSet;
    });
  };

  // Handle expand/collapse ad group
  const toggleAdGroupExpansion = (adGroupId: string) => {
    setExpandedAdGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(adGroupId)) {
        newSet.delete(adGroupId);
      } else {
        newSet.add(adGroupId);
      }
      return newSet;
    });
  };

  // Handle expand/collapse landing page
  const toggleLandingPageExpansion = (landingPageId: string) => {
    setExpandedLandingPages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(landingPageId)) {
        newSet.delete(landingPageId);
      } else {
        newSet.add(landingPageId);
      }
      return newSet;
    });
  };

  // Get sort icon
  const getSortIcon = (column: string) => {
    if (sortState.column !== column) return <ArrowUpDown className="h-4 w-4 opacity-50" />;
    if (sortState.direction === 'asc') return <ArrowUp className="h-4 w-4 text-primary" />;
    if (sortState.direction === 'desc') return <ArrowDown className="h-4 w-4 text-primary" />;
    return <ArrowUpDown className="h-4 w-4 opacity-50" />;
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  // Format number
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('vi-VN').format(num);
  };

  // Calculate percentage change for comparison
  const calculatePercentageChange = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  // Format percentage change with color and icon
  const formatPercentageChange = (change: number) => {
    const isPositive = change > 0;
    const isNegative = change < 0;
    const icon = isPositive ? <ArrowUp className="h-3 w-3" /> : isNegative ? <ArrowDown className="h-3 w-3" /> : null;
    const color = isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-muted-foreground';
    
    return (
      <div className={`flex items-center gap-1 ${color}`}>
        {icon}
        <span className="text-xs font-medium">
          {Math.abs(change).toFixed(1)}%
        </span>
      </div>
    );
  };

  // Handle column visibility toggle
  const handleColumnToggle = (columnId: string) => {
    setVisibleColumns(prev => {
      const column = availableColumns.find(col => col.id === columnId);
      if (!column) return prev;

      const isCurrentlyVisible = prev.some(col => col.id === columnId);
      
      if (isCurrentlyVisible) {
        return prev.filter(col => col.id !== columnId);
      } else {
        const newColumns = [...prev, column];
        return newColumns.sort((a, b) => a.order - b.order);
      }
    });
  };

  // Handle column reorder
  const handleColumnReorder = (columnId: string, newOrder: number) => {
    setVisibleColumns(prev => {
      const column = prev.find(col => col.id === columnId);
      if (!column) return prev;

      const updatedColumns = prev.map(col => {
        if (col.id === columnId) {
          return { ...col, order: newOrder };
        }
        return col;
      });

      return updatedColumns.sort((a, b) => a.order - b.order);
    });
  };

  // Reset columns to default
  const handleResetColumns = () => {
    setVisibleColumns(availableColumns.filter(col => col.visible));
  };

  // Render table header cell
  const renderTableHeader = (column: any) => {
    return (
      <TableHead 
        key={column.id}
        className="cursor-pointer hover:bg-muted/50 transition-colors text-right"
        onClick={() => handleSort(column.id)}
      >
        <div className="flex items-center justify-end gap-1">
          {column.name}
          {getSortIcon(column.id)}
        </div>
      </TableHead>
    );
  };

  // Render table cell content
  const renderTableCell = (column: any, data: any) => {
    switch (column.id) {
      case 'source':
        return (
          <TableCell key={column.id}>
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                {/* Expansion icon would go here */}
              </div>
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${data.sourceColor}15` }}
              >
                <data.sourceIcon className="h-4 w-4" style={{ color: data.sourceColor }} />
              </div>
              <div>
                <div className="font-medium">{data.source}</div>
                <div className="text-xs text-muted-foreground">{data.campaigns?.length || 0} campaigns</div>
              </div>
            </div>
          </TableCell>
        );
      
      case 'totalLeads':
        return (
          <TableCell key={column.id} className="text-right font-medium">
            {formatNumber(data.totalLeads || 0)}
          </TableCell>
        );
      
      case 'goodLeads':
        return (
          <TableCell key={column.id} className="text-right text-green-600 font-medium">
            {formatNumber(data.goodLeads || 0)}
          </TableCell>
        );
      
      case 'badLeads':
        return (
          <TableCell key={column.id} className="text-right text-red-600 font-medium">
            {formatNumber(data.badLeads || 0)}
          </TableCell>
        );
      
      case 'goodLeadRate':
        const goodLeadRate = data.goodLeadRate || (data.totalLeads > 0 ? (data.goodLeads / data.totalLeads) * 100 : 0);
        return (
          <TableCell key={column.id}>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {goodLeadRate.toFixed(1)}%
                </span>
              </div>
              <Progress 
                value={goodLeadRate} 
                className="h-1"
                style={{
                  '--progress-background': goodLeadRate >= 60 ? '#22c55e' : 
                                          goodLeadRate >= 40 ? '#f59e0b' : '#ef4444'
                } as React.CSSProperties}
              />
            </div>
          </TableCell>
        );
      
      case 'budget':
        return (
          <TableCell key={column.id} className="text-right text-purple-600 font-medium">
            {formatCurrency(data.budget || data.cost || 0)}
          </TableCell>
        );
      
      case 'revenue':
        return (
          <TableCell key={column.id} className="text-right text-green-600 font-medium">
            {formatCurrency(data.revenue || 0)}
          </TableCell>
        );
      
      case 'cplAll':
        return (
          <TableCell key={column.id} className="text-right">
            {formatCurrency(data.cplAll || calculateCPLAll(data.cost || 0, data.totalLeads || 0))}
          </TableCell>
        );
      
      case 'cplGood':
        return (
          <TableCell key={column.id} className="text-right">
            {formatCurrency(data.cplGood || calculateCPLGood(data.cost || 0, data.goodLeads || 0))}
          </TableCell>
        );
      
      case 'roas':
        return (
          <TableCell key={column.id} className="text-right">
            {formatROAS(data.roas || calculateROAS(data.revenue || 0, data.budget || data.cost || 0))}
          </TableCell>
        );
      
      default:
        return <TableCell key={column.id}>-</TableCell>;
    }
  };

  // Quick date preset handler with smart comparison
  const handleDatePreset = (preset: string) => {
    const today = new Date();
    let primaryRange = { from: undefined as Date | undefined, to: undefined as Date | undefined };
    let comparisonRange = { from: undefined as Date | undefined, to: undefined as Date | undefined };
    
    switch (preset) {
      case 'today':
        primaryRange = { from: today, to: today };
        comparisonRange = { from: subDays(today, 1), to: subDays(today, 1) };
        break;
      case 'yesterday':
        const yesterday = subDays(today, 1);
        primaryRange = { from: yesterday, to: yesterday };
        comparisonRange = { from: subDays(today, 2), to: subDays(today, 2) };
        break;
      case '7days':
        primaryRange = { from: subDays(today, 7), to: today };
        comparisonRange = { from: subDays(today, 14), to: subDays(today, 7) };
        break;
      case '30days':
        primaryRange = { from: subDays(today, 30), to: today };
        comparisonRange = { from: subDays(today, 60), to: subDays(today, 30) };
        break;
      case 'thisWeek':
        primaryRange = { from: startOfWeek(today), to: endOfWeek(today) };
        const lastWeekStart = subDays(startOfWeek(today), 7);
        comparisonRange = { from: lastWeekStart, to: subDays(endOfWeek(today), 7) };
        break;
      case 'lastWeek':
        const lastWeek = subDays(today, 7);
        primaryRange = { from: startOfWeek(lastWeek), to: endOfWeek(lastWeek) };
        const twoWeeksAgo = subDays(today, 14);
        comparisonRange = { from: startOfWeek(twoWeeksAgo), to: endOfWeek(twoWeeksAgo) };
        break;
      case 'thisMonth':
        primaryRange = { from: startOfMonth(today), to: endOfMonth(today) };
        const prevMonth = subDays(startOfMonth(today), 1);
        comparisonRange = { from: startOfMonth(prevMonth), to: endOfMonth(prevMonth) };
        break;
      case 'lastMonth':
        const lastMonth = subDays(startOfMonth(today), 1);
        primaryRange = { from: startOfMonth(lastMonth), to: endOfMonth(lastMonth) };
        const twoMonthsAgo = subDays(startOfMonth(lastMonth), 1);
        comparisonRange = { from: startOfMonth(twoMonthsAgo), to: endOfMonth(twoMonthsAgo) };
        break;
    }
    
    setDateRange(primaryRange);
    
    // Auto-set comparison range if comparison is enabled
    if (isComparisonEnabled && comparisonRange.from && comparisonRange.to) {
      setComparisonRange(comparisonRange);
    }
  };

  // Chart data preparation
  const sourceTypeChartData = useMemo(() => {
    // Calculate totals by source type from filtered data
    const typeData = mockData.sourceTypes.map(type => {
      const total = filteredData.reduce((sum, source) => {
        return sum + source.campaigns
          .filter(campaign => campaign.sourceType === type)
          .reduce((campaignSum, campaign) => campaignSum + campaign.totalLeads, 0);
      }, 0);
      
      return {
        name: type,
        value: total,
        color: type === 'Lead Form' ? '#7c3aed' : '#8b5cf6'
      };
    }).filter(item => item.value > 0);
    
    return typeData;
  }, [filteredData, mockData.sourceTypes]);

  const sourceChannelChartData = useMemo(() => {
    return filteredData.map(source => ({
      name: source.source,
      leads: source.totalLeads,
      goodLeads: source.goodLeads,
      color: source.sourceColor
    }));
  }, [filteredData]);

  const goodLeadRateChartData = useMemo(() => {
    return filteredData.map(source => ({
      name: source.source,
      value: source.goodLeadRate,
      color: source.sourceColor
    })).filter(item => item.value > 0);
  }, [filteredData]);

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border flex-shrink-0 z-20 bg-gradient-to-r from-background to-accent/20">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center shadow-lg">
                <BarChart3 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Ads Tracking</h1>
                <p className="text-sm text-muted-foreground font-medium">Theo dõi hiệu suất quảng cáo đa kênh và phân tích nguồn Lead</p>
              </div>
            </div>
          </div>
          
          {/* Header Icons */}
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onOpenPopup('notes')}
              className="p-3 hover:bg-accent/60 rounded-xl"
              title="Ghi chú"
            >
              <StickyNote className="h-5 w-5 text-primary" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onOpenPopup('notifications')}
              className="p-3 hover:bg-accent/60 rounded-xl"
              title="Thông báo"
            >
              <Bell className="h-5 w-5 text-primary" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onOpenPopup('task')}
              className="p-3 hover:bg-accent/60 rounded-xl"
              title="Quản lý công việc và reminder"
            >
              <ClipboardList className="h-5 w-5 text-primary" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onOpenPopup('support')}
              className="p-3 hover:bg-accent/60 rounded-xl"
              title="Hỗ trợ"
            >
              <HelpCircle className="h-5 w-5 text-primary" />
            </Button>

            {/* User Avatar */}
            <div className="ml-2 pl-2 border-l border-border">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 hover:bg-accent rounded-full"
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage 
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
                        alt="Nguyễn Văn Admin" 
                      />
                      <AvatarFallback className="text-sm">NA</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={onOpenAccountSettings}>
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onOpenBilling}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onOpenInviteTeam}>
                    <Users className="h-4 w-4 mr-2" />
                    Team
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={onLogout}
                    className="text-purple-600 focus:text-purple-600 focus:bg-purple-50"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Advanced Filter Section */}
        <Card className="border border-border/50 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              Tính Năng Nâng Cao
            </CardTitle>
            <CardDescription>
              Khoảng thời gian và so sánh dữ liệu với các tùy chọn lọc chi tiết
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Primary Date Range with Comparison Toggle */}
            <div className="space-y-6">
              {/* Advanced Date Range Section */}
              <div className="p-4 bg-gradient-to-br from-primary/5 to-accent/10 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <CalendarIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <Label className="text-base font-semibold">Khoảng thời gian phân tích</Label>
                      <p className="text-xs text-muted-foreground">Chọn thời gian chính để phân tích dữ liệu</p>
                    </div>
                  </div>
                  
                  {/* Comparison Toggle */}
                  <div className="flex items-center space-x-3">
                    <Switch 
                      id="comparison-mode" 
                      checked={isComparisonEnabled}
                      onCheckedChange={setIsComparisonEnabled}
                    />
                    <Label htmlFor="comparison-mode" className="text-sm font-medium">
                      So sánh thời gian
                    </Label>
                    {isComparisonEnabled && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        So sánh đang bật
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Date Range Selection */}
                <div className={`grid gap-4 ${isComparisonEnabled ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                  {/* Primary Date Range */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Label className="text-sm font-medium">
                        {isComparisonEnabled ? 'Khoảng thời gian chính' : 'Khoảng thời gian'}
                      </Label>
                      {isComparisonEnabled && (
                        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/30">
                          Chính
                        </Badge>
                      )}
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button 
                          variant="outline" 
                          className={`w-full justify-start text-left ${isComparisonEnabled ? 'border-primary/30 bg-primary/5' : ''}`}
                        >
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          {dateRange.from ? (
                            dateRange.to ? (
                              <>
                                {formatFullDate(dateRange.from)} -{" "}
                                {formatFullDate(dateRange.to)}
                              </>
                            ) : (
                              formatFullDate(dateRange.from)
                            )
                          ) : (
                            "Chọn khoảng thời gian chính"
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <div className="p-3 border-b">
                          <div className="grid grid-cols-2 gap-2">
                            {datePresets.map((preset) => (
                              <Button
                                key={preset.value}
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDatePreset(preset.value)}
                                className="justify-start"
                              >
                                {preset.label}
                              </Button>
                            ))}
                          </div>
                        </div>
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={dateRange.from}
                          selected={{
                            from: dateRange.from,
                            to: dateRange.to,
                          }}
                          onSelect={(range) => setDateRange(range || { from: undefined, to: undefined })}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Comparison Date Range */}
                  {isComparisonEnabled && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Label className="text-sm font-medium">Khoảng thời gian so sánh</Label>
                        <Badge variant="outline" className="bg-secondary/50 text-secondary-foreground border-secondary/30">
                          So sánh
                        </Badge>
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button 
                            variant="outline" 
                            className="w-full justify-start text-left border-secondary/30 bg-secondary/5"
                          >
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            {comparisonRange.from && comparisonRange.to ? (
                              `${formatFullDate(comparisonRange.from)} - ${formatFullDate(comparisonRange.to)}`
                            ) : 'Chọn khoảng so sánh'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <div className="p-3 border-b">
                            <div className="grid grid-cols-2 gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  if (dateRange.from && dateRange.to) {
                                    const from = subDays(dateRange.from, 7);
                                    const to = subDays(dateRange.to, 7);
                                    setComparisonRange({ from, to });
                                  }
                                }}
                                disabled={!dateRange.from || !dateRange.to}
                              >
                                Tuần trước
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  if (dateRange.from && dateRange.to) {
                                    const from = subDays(dateRange.from, 30);
                                    const to = subDays(dateRange.to, 30);
                                    setComparisonRange({ from, to });
                                  }
                                }}
                                disabled={!dateRange.from || !dateRange.to}
                              >
                                Tháng trước
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  if (dateRange.from && dateRange.to) {
                                    const diffDays = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24));
                                    const from = subDays(dateRange.from, diffDays + 1);
                                    const to = subDays(dateRange.from, 1);
                                    setComparisonRange({ from, to });
                                  }
                                }}
                                disabled={!dateRange.from || !dateRange.to}
                                className="col-span-2"
                              >
                                Cùng khoảng thời gian trước đó
                              </Button>
                            </div>
                          </div>
                          <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={comparisonRange.from}
                            selected={{
                              from: comparisonRange.from,
                              to: comparisonRange.to,
                            }}
                            onSelect={(range) => setComparisonRange(range || { from: undefined, to: undefined })}
                            numberOfMonths={2}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  )}
                </div>

                {/* Date Range Summary */}
                {isComparisonEnabled && dateRange.from && dateRange.to && comparisonRange.from && comparisonRange.to && (
                  <div className="mt-4 p-3 bg-white/50 rounded-lg border border-border/30">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <span className="font-medium">Chính:</span>
                        <span>{formatFullDate(dateRange.from)} - {formatFullDate(dateRange.to)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-secondary rounded-full"></div>
                        <span className="font-medium">So sánh:</span>
                        <span>{formatFullDate(comparisonRange.from)} - {formatFullDate(comparisonRange.to)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Other Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

              {/* Source Type */}
              <div className="space-y-2">
                <Label>Loại nguồn</Label>
                <Select value={sourceTypeFilter} onValueChange={setSourceTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại nguồn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    {mockData.sourceTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Source */}
              <div className="space-y-2">
                <Label>Kênh quảng cáo</Label>
                <Select value={sourceFilter} onValueChange={setSourceFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn kênh" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả kênh</SelectItem>
                    {mockData.sourceTotals.map((source) => (
                      <SelectItem key={source.sourceId} value={source.sourceId}>
                        <div className="flex items-center gap-2">
                          <source.sourceIcon className="h-4 w-4" style={{ color: source.sourceColor }} />
                          {source.source}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Campaign Status */}
              <div className="space-y-2">
                <Label>Trạng thái Campaign</Label>
                <Select value={campaignStatusFilter} onValueChange={setCampaignStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="active">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Đang hoạt động
                      </div>
                    </SelectItem>
                    <SelectItem value="inactive">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        Không hoạt động
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Campaign */}
              <div className="space-y-2">
                <Label>Campaign</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm campaign..."
                    value={campaignSearch}
                    onChange={(e) => setCampaignSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Medium */}
              <div className="space-y-2">
                <Label>Medium</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm medium..."
                    value={mediumSearch}
                    onChange={(e) => setMediumSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </div>

            </div>
          </CardContent>
        </Card>

        {/* Analytics Section */}
        {sourceTypeFilter === 'Landing Page' ? (
          /* Landing Page Tracker Component */
          <LandingPageTracker />
        ) : (
          /* Original Analytics Table */
          <Card className="border border-border/50 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Phân Tích Nguồn Lead
                </CardTitle>
                <CardDescription>
                  Báo cáo chi tiết hiệu suất từng kênh quảng cáo và loại nguồn
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                {isComparisonEnabled && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setIsComparisonEnabled(false)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Tắt so sánh
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsColumnCustomizerOpen(true)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Tùy chỉnh cột
                </Button>
                <Select defaultValue="current">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">Khoảng thời gian hiện tại</SelectItem>
                    <SelectItem value="7days">7 ngày gần nhất</SelectItem>
                    <SelectItem value="30days">30 ngày gần nhất</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Excel
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Comparison Summary Header */}
            {isComparisonEnabled && dateRange.from && dateRange.to && comparisonRange.from && comparisonRange.to && (
              <div className="mb-4 p-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-border/30">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span className="font-medium">Chính:</span>
                      <span>{formatFullDate(dateRange.from)} - {formatFullDate(dateRange.to)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-secondary rounded-full"></div>
                      <span className="font-medium">So sánh:</span>
                      <span>{formatFullDate(comparisonRange.from)} - {formatFullDate(comparisonRange.to)}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    Chế độ so sánh
                  </Badge>
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {visibleColumns.map((column) => renderTableHeader(column))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                    {/* Source Table Body */}
                    <>
                      {filteredData.map((source) => {
                        const Icon = source.sourceIcon;
                        const isExpanded = expandedSources.has(source.sourceId);
                        
                        return (
                          <React.Fragment key={source.sourceId}>
                            {/* Source summary row */}
                            <TableRow 
                              className="hover:bg-muted/30 transition-colors cursor-pointer font-medium bg-muted/20"
                              onClick={() => toggleSourceExpansion(source.sourceId)}
                            >
                              {visibleColumns.map((column) => {
                                if (column.id === 'source') {
                                  return (
                                    <TableCell key={column.id}>
                                      <div className="flex items-center gap-3">
                                        <div className="flex items-center">
                                          {isExpanded ? (
                                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                          ) : (
                                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                          )}
                                        </div>
                                        <div 
                                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                                          style={{ backgroundColor: `${source.sourceColor}15` }}
                                        >
                                          <Icon className="h-4 w-4" style={{ color: source.sourceColor }} />
                                        </div>
                                        <div>
                                          <span className="font-semibold">{source.source}</span>
                                          <div className="text-xs text-muted-foreground">{source.campaigns?.length || 0} campaigns</div>
                                        </div>
                                      </div>
                                    </TableCell>
                                  );
                                }
                                return renderTableCell(column, source);
                              })}
                            </TableRow>

                            {/* Campaign detail rows with hierarchical structure */}
                            {isExpanded && source.campaigns.map((campaign) => {
                              const isCampaignExpanded = expandedCampaigns.has(campaign.id);
                              
                              return (
                                <React.Fragment key={campaign.id}>
                                  {/* Campaign row */}
                                  <TableRow 
                                    className="hover:bg-muted/10 transition-colors bg-background cursor-pointer"
                                    onClick={() => toggleCampaignExpansion(campaign.id)}
                                  >
                                    {visibleColumns.map((column) => {
                                      if (column.id === 'source') {
                                        return (
                                          <TableCell key={column.id} className="pl-12">
                                            <div className="flex items-center gap-3">
                                              <div className="flex items-center">
                                                {campaign.adGroups && campaign.adGroups.length > 0 ? (
                                                  isCampaignExpanded ? (
                                                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                                  ) : (
                                                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                                  )
                                                ) : (
                                                  <div className="w-4 h-4" />
                                                )}
                                              </div>
                                              <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                  <span className="font-medium text-sm">📋 {campaign.campaign}</span>
                                                  <Badge 
                                                    variant={campaign.sourceType === 'Lead Form' ? 'default' : 'secondary'}
                                                    className="text-xs"
                                                  >
                                                    {campaign.sourceType}
                                                  </Badge>
                                                  {campaign.status === 'active' ? (
                                                    <div className="flex items-center gap-1">
                                                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                                                      <span className="text-xs text-green-600">Active</span>
                                                    </div>
                                                  ) : (
                                                    <div className="flex items-center gap-1">
                                                      <div className="w-2 h-2 bg-gray-400 rounded-full" />
                                                      <span className="text-xs text-gray-500">Inactive</span>
                                                    </div>
                                                  )}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                  Medium: {campaign.medium} • {campaign.adGroups?.length || 0} ad groups
                                                </div>
                                              </div>
                                            </div>
                                          </TableCell>
                                        );
                                      }
                                      return renderTableCell(column, campaign);
                                    })}
                                  </TableRow>

                                  {/* Ad Groups rows */}
                                  {isCampaignExpanded && campaign.adGroups?.map((adGroup) => {
                                    const isAdGroupExpanded = expandedAdGroups.has(adGroup.id);
                                    
                                    return (
                                      <React.Fragment key={adGroup.id}>
                                        {/* Ad Group row */}
                                        <TableRow 
                                          className="hover:bg-muted/5 transition-colors bg-muted/5 cursor-pointer"
                                          onClick={() => toggleAdGroupExpansion(adGroup.id)}
                                        >
                                          {visibleColumns.map((column) => {
                                            if (column.id === 'source') {
                                              return (
                                                <TableCell key={column.id} className="pl-20">
                                                  <div className="flex items-center gap-3">
                                                    <div className="flex items-center">
                                                      {adGroup.ads && adGroup.ads.length > 0 ? (
                                                        isAdGroupExpanded ? (
                                                          <ChevronDown className="h-3 w-3 text-muted-foreground" />
                                                        ) : (
                                                          <ChevronRight className="h-3 w-3 text-muted-foreground" />
                                                        )
                                                      ) : (
                                                        <div className="w-3 h-3" />
                                                      )}
                                                    </div>
                                                    <div className="space-y-1">
                                                      <div className="flex items-center gap-2">
                                                        <span className="font-medium text-sm">📁 {adGroup.name}</span>
                                                        {adGroup.status === 'active' ? (
                                                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                                        ) : (
                                                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                                                        )}
                                                      </div>
                                                      <div className="text-xs text-muted-foreground">
                                                        Ad Group • {adGroup.ads?.length || 0} ads
                                                      </div>
                                                    </div>
                                                  </div>
                                                </TableCell>
                                              );
                                            }
                                            return renderTableCell(column, adGroup);
                                          })}
                                        </TableRow>

                                        {/* Individual Ads rows */}
                                        {isAdGroupExpanded && adGroup.ads?.map((ad) => (
                                          <TableRow key={ad.id} className="hover:bg-muted/3 transition-colors bg-background">
                                            {visibleColumns.map((column) => {
                                              if (column.id === 'source') {
                                                return (
                                                  <TableCell key={column.id} className="pl-28">
                                                    <div className="flex items-center gap-3">
                                                      <div className="space-y-1">
                                                        <div className="flex items-center gap-2">
                                                          <span className="font-medium text-sm">
                                                            {campaign.sourceType === 'Lead Form' ? '📝' : '🌐'} {ad.name}
                                                          </span>
                                                          {ad.status === 'active' ? (
                                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                                          ) : (
                                                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                                                          )}
                                                        </div>
                                                        <div className="text-xs text-muted-foreground">
                                                          {campaign.sourceType === 'Lead Form' ? 'Lead Form' : 'Landing Page'}
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </TableCell>
                                                );
                                              }
                                              return renderTableCell(column, ad);
                                            })}
                                          </TableRow>
                                        ))}
                                      </React.Fragment>
                                    );
                                  })}
                                </React.Fragment>
                              );
                            })}
                          </React.Fragment>
                        );
                      })}

                        {/* Grand Total row for Sources */}
                        {filteredData.length > 0 && (
                          <TableRow className="border-t-2 border-primary/20 bg-primary/5 font-bold">
                            {visibleColumns.map((column) => {
                              if (column.id === 'source') {
                                return (
                                  <TableCell key={column.id}>
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary/10">
                                        <BarChart3 className="h-4 w-4 text-primary" />
                                      </div>
                                      <span className="font-bold text-primary">TỔNG CỘNG</span>
                                    </div>
                                  </TableCell>
                                );
                              }
                              const grandTotalsWithCalc = {
                                ...mockData.grandTotals,
                                cplAll: mockData.grandTotals.cpl,
                                cplGood: mockData.grandTotals.goodLeads > 0 ? mockData.grandTotals.cost / mockData.grandTotals.goodLeads : 0,
                                roas: mockData.grandTotals.budget > 0 ? mockData.grandTotals.revenue / mockData.grandTotals.budget : 0
                              };
                              return (
                                <TableCell key={column.id} className="font-bold">
                                  {renderTableCell(column, grandTotalsWithCalc)?.props?.children}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        )}
                    </>
                </TableBody>
              </Table>
            </div>
            
            {filteredData.length === 0 && (
              <div className="text-center py-8">
                <div className="flex flex-col items-center gap-2">
                  <Eye className="h-8 w-8 text-muted-foreground" />
                  <p className="text-muted-foreground">Không có dữ liệu phù hợp với bộ lọc hiện tại</p>
                  <Button variant="outline" size="sm" onClick={() => {
                    setSourceTypeFilter('all');
                    setSourceFilter('all');
                    setCampaignSearch('');
                    setMediumSearch('');
                  }}>
                    Xóa bộ lọc
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        )}

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Line Chart - Lead Trend */}
          <Card className="border border-border/50 shadow-sm lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-primary" />
                Xu Hướng Lead Theo Thời Gian
              </CardTitle>
              <CardDescription>
                Biểu đồ thể hiện số lượng lead theo ngày trong 30 ngày gần nhất
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={timeSeriesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(124, 58, 237, 0.1)" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#7c3aed"
                      fontSize={12}
                    />
                    <YAxis stroke="#7c3aed" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid rgba(124, 58, 237, 0.2)',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="totalLeads" 
                      stroke="#7c3aed" 
                      strokeWidth={2}
                      name="Tổng Lead"
                      dot={{ fill: '#7c3aed', strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="goodLeads" 
                      stroke="#22c55e" 
                      strokeWidth={2}
                      name="Lead Tốt"
                      dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Pie Chart - Source Type Distribution */}
          <Card className="border border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-primary" />
                Phân Bố Theo Loại Nguồn
              </CardTitle>
              <CardDescription>
                Tỉ lệ Lead Form vs Landing Page
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={sourceTypeChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {sourceTypeChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Bar Chart - Channel Performance */}
          <Card className="border border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Hiệu Suất Theo Kênh
              </CardTitle>
              <CardDescription>
                So sánh số lượng lead giữa các kênh quảng cáo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={sourceChannelChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(124, 58, 237, 0.1)" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#7c3aed"
                      fontSize={12}
                    />
                    <YAxis stroke="#7c3aed" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid rgba(124, 58, 237, 0.2)',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="leads" fill="#7c3aed" name="Tổng Lead" />
                    <Bar dataKey="goodLeads" fill="#22c55e" name="Lead Tốt" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Pie Chart - Good Lead Rate by Channel */}
          <Card className="border border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Tỉ Lệ Lead Tốt Theo Kênh
              </CardTitle>
              <CardDescription>
                Chất lượng lead từng kênh quảng cáo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={goodLeadRateChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name} ${value.toFixed(1)}%`}
                    >
                      {goodLeadRateChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value.toFixed(1)}%`, 'Tỉ lệ Lead tốt']} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Summary Stats */}
          <Card className="border border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Tóm Tắt Thống Kê
              </CardTitle>
              <CardDescription>
                Các chỉ số tổng quan từ dữ liệu đã lọc
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Tổng Lead</span>
                  </div>
                  <span className="font-semibold text-lg">
                    {formatNumber(filteredData.reduce((sum, item) => sum + item.totalLeads, 0))}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Lead Tốt</span>
                  </div>
                  <span className="font-semibold text-lg text-green-600">
                    {formatNumber(filteredData.reduce((sum, item) => sum + item.goodLeads, 0))}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Tổng Doanh Thu</span>
                  </div>
                  <span className="font-semibold text-sm text-blue-600">
                    {formatCurrency(filteredData.reduce((sum, item) => sum + item.revenue, 0))}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium">Tỉ Lệ Chuyển Đổi TB</span>
                  </div>
                  <span className="font-semibold text-lg text-purple-600">
                    {filteredData.length > 0 ? (
                      (filteredData.reduce((sum, item) => sum + item.goodLeadRate, 0) / filteredData.length).toFixed(1)
                    ) : 0}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Column Customizer Popup */}
      <ColumnCustomizerPopup
        isOpen={isColumnCustomizerOpen}
        onClose={() => setIsColumnCustomizerOpen(false)}
        availableColumns={availableColumns}
        visibleColumns={visibleColumns}
        onColumnToggle={handleColumnToggle}
        onColumnReorder={handleColumnReorder}
        onResetToDefault={handleResetColumns}
      />
    </div>
  );
}