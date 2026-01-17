import { useState, useMemo, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  StickyNote, 
  Bell, 
  HelpCircle,
  ClipboardList,
  Search, 
  Plus, 
  Filter,
  Settings, 
  MoreVertical,
  Download,
  Zap,
  Shield,
  Copy,
  RotateCcw,
  FileSpreadsheet,
  ChevronDown,
  FileText,
  ChevronLeft,
  ChevronRight,
  User,
  CreditCard,
  Users,
  LogOut,
  TrendingUp,
  AlertTriangle,
  SkipBack,
  SkipForward
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { AdvancedPagination } from './ui/advanced-pagination';
import { ColumnManager } from './ColumnManager';
import { BulkActions } from './BulkActions';
import { BulkActionsButtons } from './BulkActionsButtons';
import { BulkEditPopup } from './BulkEditPopup';
import { LeadTableInlineEditWithAvatar } from './LeadTableInlineEditWithAvatar';
import { ExcelImportPopup } from './ExcelImportPopup';
import { LeadSheetManagerFixed } from './LeadSheetManagerFixed';
import { LeadHubQuickFilterPopup } from './LeadHubQuickFilterPopup';

interface LeadHubDashboardProps {
  onOpenPopup: (popup: string) => void;
  onOpenRestoreData?: () => void;
  onOpenDuplicateData?: () => void;
  onOpenPermissions?: () => void;
  onOpenAutomation?: () => void;
  onOpenBadDataManager?: () => void;
  onOpenCustomerDetails?: (customer: any) => void;
  onOpenReminder?: (customerId: string, customerName: string) => void;
  onOpenAccountSettings?: () => void;
  onOpenBilling?: () => void;
  onOpenInviteTeam?: () => void;
  onLogout?: () => void;
  onCreateCustomer?: (customer: any, targetGroup?: string) => void;
  onCustomerUpdate?: (customerId: string, field: string, value: any) => void;
  onDeleteCustomer?: (customerId: string) => void;
  onMoveToBadData?: (leadId: string, reason?: string) => void;
  onMoveToCustomer?: (leadId: string) => void;
  customers?: any[];
  reminders?: any[];
  badDataCount?: number;
}

interface Column {
  id: string;
  name: string;
  type: 'default' | 'hidden' | 'custom';
  visible: boolean;
  required: boolean;
  order: number;
  fieldType?: 'text' | 'number' | 'date' | 'select' | 'multiselect';
  options?: string[];
  pinned?: boolean;
}

// Lead Hub specific columns
const defaultColumns: Column[] = [
  { id: 'name', name: 'Tên', type: 'default', visible: true, required: true, order: 1, pinned: true },
  { id: 'phone', name: 'SĐT', type: 'default', visible: true, required: true, order: 2 },
  { id: 'email', name: 'Email', type: 'default', visible: true, required: false, order: 3 },
  { id: 'questions', name: 'Câu hỏi', type: 'default', visible: true, required: false, order: 4 },
  { id: 'source', name: 'Nguồn data', type: 'default', visible: true, required: false, order: 5 },
  { id: 'products', name: 'Sản phẩm/Dịch vụ', type: 'default', visible: true, required: false, order: 6 },
  { id: 'status', name: 'Trạng thái', type: 'default', visible: true, required: false, order: 7 },
  { id: 'quality', name: 'Chất lượng Lead', type: 'default', visible: true, required: false, order: 8 },
  { id: 'assignedSale', name: 'Sale phụ trách', type: 'default', visible: true, required: false, order: 9 },
  { id: 'createdDate', name: 'Ngày tạo', type: 'default', visible: true, required: false, order: 10 },
  { id: 'notes', name: 'Ghi chú', type: 'default', visible: true, required: false, order: 11 },
  
  // Hidden columns
  { id: 'address', name: 'Địa chỉ', type: 'hidden', visible: false, required: false, order: 12, fieldType: 'text' },
  { id: 'revenue', name: 'Doanh thu', type: 'hidden', visible: false, required: false, order: 13, fieldType: 'number' },
  { id: 'customerId', name: 'ID Customer', type: 'hidden', visible: false, required: false, order: 14 },
];

// Lead Hub specific data generation
const generateMockLeads = () => {
  const statuses = ['Mới', 'Đang xử lí', 'Waning', 'Thành công', 'Thất bại'];
  const sources = [
    'Facebook Lead Ads', 
    'TikTok Lead Ads', 
    'Zalo Lead Ads', 
    'Landingpage Form', 
    'Campaign - Dự án A', 
    'Campaign - Dự án B',
    'Organic Search',
    'Google Ads'
  ];
  
  const products = ['Website Design', 'SEO Service', 'Digital Marketing', 'E-commerce', 'Mobile App', 'Branding'];
  const sales = ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D', 'Chưa phân bổ'];
  const qualities = ['Hot/Nóng', 'Warm/Ấm', 'Cold/Lạnh'];
  
  const sampleQuestions = [
    'Tôi muốn biết giá cả dịch vụ SEO',
    'Có thể tư vấn thiết kế website không?',
    'Bao lâu thì hoàn thành dự án?',
    'Chi phí làm app mobile bao nhiều?',
    'Có gói dịch vụ nào phù hợp SME không?',
    'Muốn hỏi về chiến lược marketing',
    'Có thể xem portfolio được không?',
    'Cần tư vấn về branding'
  ];
  
  const leads = Array.from({ length: 87 }, (_, i) => {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const productArray = [products[Math.floor(Math.random() * products.length)]];
    
    // Assign leads to different sheets based on their products for demo
    let sheetId = 'main';
    if (productArray.includes('Digital Marketing')) {
      sheetId = 'sheet1';
    } else if (productArray.includes('Website Design') || productArray.includes('SEO Service')) {
      sheetId = 'sheet2';
    } else if (productArray.includes('E-commerce')) {
      sheetId = 'sheet3';
    }
    
    return {
      id: `LD${String(i + 1).padStart(3, '0')}`,
      name: `Lead ${i + 1}`,
      phone: `097${String(i).padStart(7, '0')}`,
      email: `lead${i + 1}@email.com`,
      questions: sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)],
      source: sources[Math.floor(Math.random() * sources.length)],
      products: productArray,
      status: status,
      quality: qualities[Math.floor(Math.random() * qualities.length)],
      assignedSale: sales[Math.floor(Math.random() * sales.length)],
      createdDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
      notes: `Ghi chú cho lead ${i + 1}`,
      address: `Địa chỉ ${i + 1}, Hà Nội`,
      revenue: Math.floor(Math.random() * 10000000),
      customerId: `LD${String(i + 1).padStart(3, '0')}`,
      customFields: {},
      tags: [],
      leadScore: Math.floor(Math.random() * 100) + 1,
      campaign: sources[Math.floor(Math.random() * sources.length)].includes('Campaign') ? sources[Math.floor(Math.random() * sources.length)] : '',
      utmSource: sources[Math.floor(Math.random() * sources.length)],
      sheetId: sheetId // Add sheetId to track which sheet this lead belongs to
    };
  });

  return leads;
};

export function LeadHubDashboard({ 
  onOpenPopup, 
  onOpenRestoreData, 
  onOpenDuplicateData, 
  onOpenPermissions, 
  onOpenAutomation, 
  onOpenBadDataManager,
  onOpenCustomerDetails, 
  onOpenReminder, 
  onOpenAccountSettings, 
  onOpenBilling, 
  onOpenInviteTeam, 
  onLogout, 
  onCreateCustomer, 
  onCustomerUpdate, 
  onDeleteCustomer, 
  onMoveToBadData,
  onMoveToCustomer,
  customers, 
  reminders,
  badDataCount = 0 
}: LeadHubDashboardProps) {
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showColumnManager, setShowColumnManager] = useState(false);
  const [showQuickFilter, setShowQuickFilter] = useState(false);
  const [showExcelImport, setShowExcelImport] = useState(false);
  const [showBulkEdit, setShowBulkEdit] = useState(false);
  
  // Add local leads state
  const [localLeads, setLocalLeads] = useState(() => generateMockLeads());
  
  // Lead Sheet Management
  const [activeSheet, setActiveSheet] = useState('main');
  const [sheets, setSheets] = useState<any[]>([]);
  
  const [quickFilters, setQuickFilters] = useState<Record<string, string[]>>({});
  const [tableFilters, setTableFilters] = useState<Record<string, string[]>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [columns, setColumns] = useState<Column[]>(defaultColumns);
  
  // Update local leads when props change
  useEffect(() => {
    if (customers) {
      setLocalLeads(customers);
    }
  }, [customers]);
  
  // Filter leads by active sheet
  const allLeads = useMemo(() => {
    if (activeSheet === 'main') {
      return localLeads;
    }
    
    // Filter leads by sheetId - this will work for both existing and new sheets
    return localLeads.filter(lead => lead.sheetId === activeSheet);
  }, [localLeads, activeSheet]);
  
  // Simplified filter logic - combine all filters into one
  const allFilters = useMemo(() => {
    const combined: Record<string, string[]> = {};
    
    // Merge all filter sources
    const filterSources = [quickFilters, tableFilters];
    filterSources.forEach(filterSource => {
      Object.entries(filterSource).forEach(([key, values]) => {
        if (values && values.length > 0) {
          combined[key] = [...(combined[key] || []), ...values];
          // Remove duplicates
          combined[key] = [...new Set(combined[key])];
        }
      });
    });
    
    return combined;
  }, [quickFilters, tableFilters]);
  
  // Filter leads based on search term and filters
  const filteredLeads = useMemo(() => {
    let result = allLeads;

    // Apply search filter
    if (searchTerm) {
      result = result.filter(lead => 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.questions.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply filters
    if (Object.keys(allFilters).length > 0) {
      result = result.filter(lead => {
        return Object.entries(allFilters).every(([columnId, filterValues]) => {
          if (!filterValues || filterValues.length === 0) return true;
          
          const leadValue = lead[columnId as keyof typeof lead];
          if (columnId === 'quality') {
            return filterValues.includes(String(leadValue));
          }
          
          const stringValue = Array.isArray(leadValue) 
            ? leadValue.join(' ') 
            : String(leadValue || '');
          
          return filterValues.some(filterValue => 
            stringValue.toLowerCase() === filterValue.toLowerCase()
          );
        });
      });
    }

    return result;
  }, [allLeads, searchTerm, allFilters]);
  
  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, allFilters]);

  // Handle quick filters change
  const handleQuickFiltersChange = (filters: Record<string, string[]>) => {
    setQuickFilters(filters);
  };

  // Pagination
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentLeads = filteredLeads.slice(startIndex, startIndex + itemsPerPage);

  // Handle lead update
  const handleLeadUpdateLocal = (leadId: string, field: string, value: any) => {
    console.log(`🔄 Lead update: ${leadId}, field: ${field}, value:`, value);
    
    // Update local leads state
    setLocalLeads(prev => prev.map(lead => {
      if (lead.id === leadId) {
        const updatedLead = { ...lead, [field]: value };
        return updatedLead;
      }
      return lead;
    }));
    
    // Also call the prop callback if provided
    if (onCustomerUpdate) {
      onCustomerUpdate(leadId, field, value);
    }
  };

  // Handle lead sorting
  const handleLeadSort = (sortedLeads: any[]) => {
    console.log('Lead sort requested:', sortedLeads);
  };

  const handleSelectLead = (leadId: string) => {
    setSelectedLeads(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const handleSelectAll = () => {
    setSelectedLeads(
      selectedLeads.length === currentLeads.length 
        ? [] 
        : currentLeads.map(l => l.id)
    );
  };

  // Handle quick create lead
  const handleQuickCreate = () => {
    const newId = `LD${String(localLeads.length + 1).padStart(3, '0')}`;
    
    // Get default product from current sheet
    const currentSheet = sheets.find(s => s.id === activeSheet);
    const defaultProduct = currentSheet?.defaultProduct || '';
    
    // Create new lead with minimal empty defaults
    const newLead = {
      id: newId,
      name: '',
      phone: '',
      email: '',
      questions: '',
      source: '',
      products: defaultProduct ? [defaultProduct] : [], // Use sheet's default product
      status: 'Mới',
      quality: 'Warm/Ấm',
      assignedSale: '',
      createdDate: new Date(),
      notes: '',
      address: '',
      revenue: 0,
      customerId: newId,
      customFields: {},
      tags: [],
      leadScore: 0,
      campaign: '',
      utmSource: '',
      sheetId: activeSheet // Assign lead to current active sheet
    };
    
    // Add lead to local state first
    setLocalLeads(prev => [newLead, ...prev]);
    
    // Use the callback if available
    if (onCreateCustomer) {
      onCreateCustomer(newLead, activeSheet);
    }
    
    console.log(`Tạo lead mới với trạng thái "Mới"`);
    
    // Auto-select the new lead for easy editing
    setSelectedLeads([newId]);
  }; 

  const handleExcelImport = (importedLeads: any[]) => {
    // Assign imported leads to current active sheet
    const leadsWithSheetId = importedLeads.map(lead => ({
      ...lead,
      sheetId: activeSheet
    }));
    
    setLocalLeads(prev => [...leadsWithSheetId, ...prev]);
    setShowExcelImport(false);
    // Auto-select imported leads for review
    setSelectedLeads(leadsWithSheetId.map(l => l.id));
  }; 

  // Handler functions for lead actions
  const handleShowDetails = (lead: any) => {
    console.log('Show details for lead:', lead);
    if (onOpenCustomerDetails) {
      onOpenCustomerDetails(lead);
    } else {
      alert(`Chi tiết lead: ${lead.name}\\nPhone: ${lead.phone}\\nEmail: ${lead.email}`);
    }
  };

  const handleCreateReminder = (leadId: string, leadName: string) => {
    console.log('Create reminder for:', leadId, leadName);
    if (onOpenReminder) {
      onOpenReminder(leadId, leadName);
    } else {
      alert(`Tạo nhắc nhở cho: ${leadName}`);
    }
  };

  const handleDeleteLead = (leadId: string) => {
    if (onDeleteCustomer) {
      onDeleteCustomer(leadId);
      setLocalLeads(prev => prev.filter(lead => lead.id !== leadId));
      setSelectedLeads(prev => prev.filter(id => id !== leadId));
    } else {
      if (confirm('Bạn có chắc chắn muốn xóa lead này?')) {
        setLocalLeads(prev => prev.filter(lead => lead.id !== leadId));
        setSelectedLeads(prev => prev.filter(id => id !== leadId));
        console.log('Deleted lead:', leadId);
      }
    }
  };

  const handleMoveToCRM = (leadId: string) => {
    console.log('Move to CRM:', leadId);
    
    // Call parent handler if available
    if (onMoveToCustomer) {
      onMoveToCustomer(leadId);
    }
    
    // Update local state immediately 
    setLocalLeads(prev => prev.map(lead => 
      lead.id === leadId 
        ? { ...lead, status: 'Đã chuyển CRM', quality: 'Hot/Nóng' }
        : lead
    ));
  };

  const handleMoveToBadData = (leadId: string) => {
    if (confirm('Bạn có chắc chắn muốn chuyển lead này vào data xấu?')) {
      console.log('Move to Bad Data:', leadId);
      
      if (onMoveToBadData) {
        onMoveToBadData(leadId, 'Không có nhu cầu');
      }
      
      setLocalLeads(prev => prev.filter(lead => lead.id !== leadId));
      setSelectedLeads(prev => prev.filter(id => id !== leadId));
    }
  };

  const handleChangeToHot = (leadId: string) => {
    console.log('Change to Hot:', leadId);
    setLocalLeads(prev => prev.map(lead => 
      lead.id === leadId 
        ? { ...lead, quality: 'Hot/Nóng' }
        : lead
    ));
    alert('Đã chuyển lead sang chất lượng Nóng');
  };

  // Bulk Actions Handler
  const handleBulkAction = (action: string, data?: any) => {
    const selectedCustomers = localLeads.filter(lead => selectedLeads.includes(lead.id));
    
    switch (action) {
      case 'bulk-edit':
        setShowBulkEdit(true);
        break;

      case 'assign-sale-a':
      case 'assign-sale-b': 
      case 'assign-sale-c':
      case 'assign-sale-d':
        const saleMapping = {
          'assign-sale-a': 'Nguyễn Văn A',
          'assign-sale-b': 'Trần Thị B', 
          'assign-sale-c': 'Lê Văn C',
          'assign-sale-d': 'Phạm Thị D'
        };
        handleBulkUpdate({ assignedSale: saleMapping[action as keyof typeof saleMapping] });
        break;

      case 'unassign-sale':
        handleBulkUpdate({ assignedSale: 'Chưa phân bổ' });
        break;

      case 'status-new':
      case 'status-processing':
      case 'status-warning':
      case 'status-success':
      case 'status-failed':
        const statusMapping = {
          'status-new': 'Mới',
          'status-processing': 'Đang xử lý',
          'status-warning': 'Waning',
          'status-success': 'Thành công', 
          'status-failed': 'Thất bại'
        };
        handleBulkUpdate({ status: statusMapping[action as keyof typeof statusMapping] });
        break;

      case 'quality-hot':
      case 'quality-warm':
      case 'quality-cold':
        const qualityMapping = {
          'quality-hot': 'Hot/Nóng',
          'quality-warm': 'Warm/Ấm',
          'quality-cold': 'Cold/Lạnh'
        };
        // Update quality and clear warning if applicable
        setLocalLeads(prev => prev.map(lead => 
          selectedLeads.includes(lead.id) 
            ? { 
                ...lead, 
                quality: qualityMapping[action as keyof typeof qualityMapping],
                status: lead.status === 'Waning' ? 'Mới' : lead.status, // Clear warning status
                qualityWarningDate: undefined,
                qualityWarningReason: undefined
              }
            : lead
        ));
        // Also update parent state
        selectedLeads.forEach(leadId => {
          if (onCustomerUpdate) {
            onCustomerUpdate(leadId, 'quality', qualityMapping[action as keyof typeof qualityMapping]);
          }
        });
        setSelectedLeads([]);
        alert(`✅ Đã cập nhật chất lượng "${qualityMapping[action as keyof typeof qualityMapping]}" cho ${selectedLeads.length} leads!`);
        break;

      case 'clear-warning':
        // Clear warning status and reset to "Mới"
        setLocalLeads(prev => prev.map(lead => 
          selectedLeads.includes(lead.id) && lead.status === 'Waning'
            ? { 
                ...lead, 
                status: 'Mới',
                qualityWarningDate: undefined,
                qualityWarningReason: undefined
              }
            : lead
        ));
        // Also update parent state
        selectedLeads.forEach(leadId => {
          if (onCustomerUpdate) {
            onCustomerUpdate(leadId, 'status', 'Mới');
          }
        });
        setSelectedLeads([]);
        const warningLeadsCount = localLeads.filter(lead => 
          selectedLeads.includes(lead.id) && lead.status === 'Waning'
        ).length;
        alert(`✅ Đã xóa trạng thái Warning cho ${warningLeadsCount} leads!`);
        break;

      case 'move-to-crm':
        selectedLeads.forEach(leadId => {
          if (onMoveToCustomer) {
            onMoveToCustomer(leadId);
          }
        });
        // Update local state
        setLocalLeads(prev => prev.map(lead => 
          selectedLeads.includes(lead.id) 
            ? { ...lead, status: 'Đã chuyển CRM', quality: 'Hot/Nóng' }
            : lead
        ));
        setSelectedLeads([]);
        alert(`✅ Đã chuyển ${selectedLeads.length} leads vào CRM!`);
        break;

      case 'move-to-bad-data':
        // Reason is now provided by BulkActionsButtons component
        const reason = data?.reason || 'Bulk move to bad data';
        selectedLeads.forEach(leadId => {
          if (onMoveToBadData) {
            onMoveToBadData(leadId, reason);
          }
        });
        setLocalLeads(prev => prev.filter(lead => !selectedLeads.includes(lead.id)));
        setSelectedLeads([]);
        alert(`✅ Đã chuyển ${selectedLeads.length} leads vào data xấu!\n📝 Lý do: ${reason}`);
        break;

      case 'tag-vip':
      case 'tag-potential':
      case 'tag-followup':
      case 'tag-priority':
        const tagMapping = {
          'tag-vip': 'VIP Customer',
          'tag-potential': 'Tiềm năng cao',
          'tag-followup': 'Cần theo dõi',
          'tag-priority': 'Ưu tiên'
        };
        // Add tag to existing tags
        setLocalLeads(prev => prev.map(lead => 
          selectedLeads.includes(lead.id) 
            ? { 
                ...lead, 
                tags: [...(lead.tags || []), { 
                  id: `tag_${Date.now()}_${Math.random()}`, 
                  name: tagMapping[action as keyof typeof tagMapping], 
                  color: '#8b5cf6' 
                }] 
              }
            : lead
        ));
        setSelectedLeads([]);
        alert(`✅ Đã gắn tag "${tagMapping[action as keyof typeof tagMapping]}" cho ${selectedLeads.length} leads!`);
        break;

      case 'product-website':
      case 'product-seo':
      case 'product-marketing':
      case 'product-ecommerce':
        const productMapping = {
          'product-website': 'Website Design',
          'product-seo': 'SEO Service',
          'product-marketing': 'Digital Marketing',
          'product-ecommerce': 'E-commerce'
        };
        const product = productMapping[action as keyof typeof productMapping];
        setLocalLeads(prev => prev.map(lead => 
          selectedLeads.includes(lead.id) 
            ? { 
                ...lead, 
                products: [...(lead.products || []), product].filter((p, index, arr) => 
                  arr.indexOf(p) === index // Remove duplicates
                )
              }
            : lead
        ));
        setSelectedLeads([]);
        alert(`✅ Đã gắn sản phẩm "${product}" cho ${selectedLeads.length} leads!`);
        break;

      case 'source-facebook':
      case 'source-google':
      case 'source-tiktok':
      case 'source-zalo':
      case 'source-hotline':
      case 'source-website':
      case 'source-referral':
      case 'source-walkin':
      case 'source-other':
        const sourceMapping = {
          'source-facebook': 'Facebook',
          'source-google': 'Google',
          'source-tiktok': 'TikTok',
          'source-zalo': 'Zalo',
          'source-hotline': 'Hotline',
          'source-website': 'Website',
          'source-referral': 'Giới thiệu',
          'source-walkin': 'Khách vãng lai',
          'source-other': 'Khác'
        };
        handleBulkUpdate({ source: sourceMapping[action as keyof typeof sourceMapping] });
        break;

      case 'bulk-delete':
        // Confirmation is now handled in BulkActionsButtons component
        selectedLeads.forEach(leadId => {
          if (onDeleteCustomer) {
            onDeleteCustomer(leadId);
          }
        });
        setLocalLeads(prev => prev.filter(lead => !selectedLeads.includes(lead.id)));
        setSelectedLeads([]);
        alert(`✅ Đã xóa ${selectedLeads.length} leads và chuyển vào thùng rác!`);
        break;

      default:
        console.log('Unhandled bulk action:', action, data);
        break;
    }
  };

  // Bulk Update Helper - Enhanced to handle all column types
  const handleBulkUpdate = (updates: Record<string, any>) => {
    const updatedCount = selectedLeads.length;
    
    // Process updates to handle special field types
    const processedUpdates: Record<string, any> = {};
    
    Object.entries(updates).forEach(([field, value]) => {
      // Handle products field - convert to array if needed
      if (field === 'products') {
        if (typeof value === 'string') {
          processedUpdates[field] = value.split(',').map(v => v.trim()).filter(v => v);
        } else {
          processedUpdates[field] = value;
        }
      }
      // Handle custom fields - store in customFields object if it's a custom column
      else if (field.startsWith('custom_') || columns.find(col => col.id === field && col.type === 'custom')) {
        // Store custom fields in the customFields object
        processedUpdates.customFields = processedUpdates.customFields || {};
        processedUpdates.customFields[field] = value;
        processedUpdates[field] = value; // Also store directly for table display
      }
      // Handle dates - ensure proper format
      else if (field.includes('Date') || field.includes('date')) {
        processedUpdates[field] = value ? new Date(value) : value;
      }
      // Handle numbers - convert to number if needed (excluding quality which is now string)
      else if (field === 'revenue') {
        processedUpdates[field] = value ? Number(value) : value;
      }
      // Handle quality field - keep as string
      else if (field === 'quality') {
        processedUpdates[field] = value;
      }
      // Handle arrays (like tags, multiple selections)
      else if (Array.isArray(value)) {
        processedUpdates[field] = [...value];
      }
      // Default: store as-is
      else {
        processedUpdates[field] = value;
      }
    });
    
    // Update local state with processed updates
    setLocalLeads(prev => prev.map(lead => 
      selectedLeads.includes(lead.id) 
        ? { 
            ...lead, 
            ...processedUpdates,
            // Ensure customFields is properly merged
            customFields: {
              ...lead.customFields,
              ...processedUpdates.customFields
            }
          }
        : lead
    ));

    // Call parent update handlers for each field and lead
    selectedLeads.forEach(leadId => {
      Object.entries(processedUpdates).forEach(([field, value]) => {
        if (field !== 'customFields' && onCustomerUpdate) {
          onCustomerUpdate(leadId, field, value);
        }
      });
    });

    setSelectedLeads([]);
    
    // Create a more detailed success message
    const fieldDisplayNames = Object.keys(updates).map(field => {
      const column = columns.find(col => col.id === field);
      return column?.displayName || column?.name || field;
    });
    
    alert(`✅ Đã cập nhật thành công!\n\n📊 Số lượng: ${updatedCount} leads\n📝 Các trường: ${fieldDisplayNames.join(', ')}\n⏰ Thời gian: ${new Date().toLocaleString('vi-VN')}`);
  };

  // Handle Bulk Edit Apply
  const handleBulkEditApply = (changes: Record<string, any>) => {
    handleBulkUpdate(changes);
  };

  return (
    <div className="flex flex-col h-screen bg-background w-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border flex-shrink-0 z-20 bg-gradient-to-r from-background to-accent/20">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Lead Hub</h1>
              <p className="text-sm text-muted-foreground font-medium">Quản lý Lead thông minh</p>
            </div>
          </div>
          <Badge variant="purple" className="ml-4">
            {filteredLeads.length} leads
          </Badge>
          {badDataCount > 0 && (
            <Badge variant="warning" className="ml-2">
              {badDataCount} data xấu
            </Badge>
          )}
        </div>
        
        {/* Header Icons */}
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="px-4 py-2 border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/30"
            onClick={onOpenBadDataManager}
            title={`Quản lý Data Xấu và Khôi phục (${badDataCount} data)`}
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            Data xấu ({badDataCount})
          </Button>
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

      {/* Main Content Layout */}
      <div className="flex flex-1 min-h-0">
        {/* Main Content Area - Full Width */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Lead Sheet Manager */}
          <LeadSheetManagerFixed 
            activeSheet={activeSheet}
            onSheetChange={setActiveSheet}
            customers={localLeads}
            onSheetsChange={setSheets}
          />

          {/* Control Bar */}
          <div className="p-6 border-b border-border bg-gradient-to-r from-muted/30 to-accent/10 flex-shrink-0 space-y-4">
            {/* Row 1: Search and Controls */}
            <div className="flex items-center justify-between gap-4">
              {/* Left Controls */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-4 w-4" />
                  <Input
                    placeholder="Tìm kiếm leads..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-80 pl-10 border-primary/20 focus:border-primary shadow-sm"
                  />
                </div>
              </div>

              {/* Right Controls - Groupped together */}
              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowQuickFilter(true)}
                  className="flex items-center gap-2 border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/30"
                >
                  <Filter className="h-4 w-4" />
                  Bộ lọc
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowColumnManager(true)}
                  className="flex items-center gap-2 border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/30"
                >
                  <Settings className="h-4 w-4" />
                  Quản lý cột
                </Button>

                <Button
                  onClick={handleQuickCreate}
                  size="sm"
                  variant="purple"
                  className="flex items-center gap-2 shadow-md"
                >
                  <Plus className="h-4 w-4" />
                  Tạo lead
                </Button>

                {/* More Actions Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/30"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={onOpenRestoreData}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Khôi phục dữ liệu
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onOpenDuplicateData}>
                    <Copy className="h-4 w-4 mr-2" />
                    Dữ liệu trùng lặp
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onOpenPermissions}>
                    <Shield className="h-4 w-4 mr-2" />
                    Phân quyền
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onOpenAutomation}>
                    <Zap className="h-4 w-4 mr-2" />
                    Tự động hóa Lead Hub
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setShowExcelImport(true)}>
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    Import Excel
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    console.log('Export Excel clicked');
                    // Create export data from currently displayed/filtered leads
                    const exportData = currentLeads.map(lead => ({
                      'ID': lead.id,
                      'Tên khách hàng': lead.name,
                      'Số điện thoại': lead.phone,
                      'Email': lead.email,
                      'Câu hỏi/Nhu cầu': lead.questions,
                      'Nguồn data': lead.source,
                      'Sản phẩm/Dịch vụ': Array.isArray(lead.products) ? lead.products.join(', ') : lead.products,
                      'Trạng thái': lead.status,
                      'Chất lượng Lead': lead.quality,
                      'Sale phụ trách': lead.assignedSale,
                      'Ngày tạo': lead.createdDate ? new Date(lead.createdDate).toLocaleDateString('vi-VN') : '',
                      'Ghi chú': lead.notes,
                      'Địa chỉ': lead.address,
                      'Doanh thu': lead.revenue ? new Intl.NumberFormat('vi-VN').format(lead.revenue) + ' VND' : '0 VND',
                      'Tags': lead.tags ? lead.tags.map((tag: any) => tag.name).join(', ') : '',
                      // Add Lead Hub specific fields
                      'Cảnh báo chất lượng': lead.qualityWarningReason || '',
                      'Ngày chuyển CRM': lead.movedToCRMDate ? new Date(lead.movedToCRMDate).toLocaleDateString('vi-VN') : '',
                      'Lý do chuyển CRM': lead.movedToCRMReason || ''
                    }));
                    
                    // Convert to CSV format
                    const headers = Object.keys(exportData[0] || {});
                    const csvContent = [
                      headers.join(','),
                      ...exportData.map(row => 
                        headers.map(header => `"${row[header] || ''}"`).join(',')
                      )
                    ].join('\\n');
                    
                    // Create and download file
                    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    // Generate filename with current date and filter info
                    const currentDate = new Date().toISOString().split('T')[0];
                    const groupName = activeGroup === 'main' ? 'TongQuan' : leadGroups.find(g => g.id === activeGroup)?.name?.replace(/\s+/g, '_') || 'Group';
                    const hasFilters = Object.keys(tableFilters).length > 0 || Object.keys(quickFilters).length > 0;
                    const filterSuffix = hasFilters ? '_Filtered' : '';
                    
                    link.download = `LeadHub_Export_${groupName}${filterSuffix}_${currentDate}.csv`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    // Success message with export details
                    const totalLeads = filteredLeads.length;
                    const exportedCount = exportData.length;
                    const filterInfo = hasFilters ? ` (đã lọc từ ${totalLeads} tổng)` : '';
                    const groupInfo = activeGroup !== 'main' ? `\n📁 Nhóm: ${leadGroups.find(g => g.id === activeGroup)?.name}` : '';
                    
                    alert(`✅ Đã xuất ${exportedCount} leads ra file CSV${filterInfo}!${groupInfo}\n\n📄 File: LeadHub_Export_${groupName}${filterSuffix}_${currentDate}.csv`);
                  }}>
                    <Download className="h-4 w-4 mr-2" />
                    Export Excel
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              </div>
            </div>

            {/* Row 2: Bulk Actions - Appears when items are selected */}
            {selectedLeads.length > 0 && (
              <div className="w-full">
                <BulkActionsButtons
                  selectedCount={selectedLeads.length}
                  selectedCustomers={localLeads.filter(lead => selectedLeads.includes(lead.id))}
                  onAction={handleBulkAction}
                  availableGroups={[]} // Add groups if needed
                  module="lead-hub"
                />
              </div>
            )}
          </div>

          {/* Table */}
          <div className="flex-1 min-h-0 overflow-auto custom-scrollbar">
            <LeadTableInlineEditWithAvatar
              customers={currentLeads}
              selectedCustomers={selectedLeads}
              onSelectCustomer={handleSelectLead}
              onSelectAll={handleSelectAll}
              columns={columns}
              onColumnsChange={setColumns}
              onFiltersChange={setTableFilters}
              currentFilters={tableFilters}
              onCustomerUpdate={handleLeadUpdateLocal}
              onCustomerSort={handleLeadSort}
              onShowDetails={handleShowDetails}
              onCreateReminder={handleCreateReminder}
              onDeleteCustomer={handleDeleteLead}
              onMoveToBadData={handleMoveToBadData}
              onMoveToCustomer={handleMoveToCRM}
              onChangeToHot={handleChangeToHot}
              reminders={reminders}
            />
          </div>

          {/* Enhanced Pagination */}
          <AdvancedPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={allLeads.length}
            filteredItems={filteredLeads.length}
            itemsPerPage={itemsPerPage}
            startIndex={startIndex}
            onPageChange={(page) => setCurrentPage(page)}
            onItemsPerPageChange={(items) => {
              setItemsPerPage(items);
              setCurrentPage(1); // Reset to first page
            }}
            itemName="lead"
            showItemsPerPageSelector={true}
            showGoToPage={true}
            showTotalUsers={true}
          />
        </div>
      </div>

      {/* Popups */}
      {showColumnManager && (
        <ColumnManager
          isOpen={showColumnManager}
          onClose={() => setShowColumnManager(false)}
          columns={columns}
          onColumnsChange={setColumns}
        />
      )}

      {showQuickFilter && (
        <LeadHubQuickFilterPopup
          isOpen={showQuickFilter}
          onClose={() => setShowQuickFilter(false)}
          onApply={handleQuickFiltersChange}
          currentFilters={quickFilters}
          customers={allLeads}
        />
      )}

      {showExcelImport && (
        <ExcelImportPopup
          isOpen={showExcelImport}
          onClose={() => setShowExcelImport(false)}
          onImport={handleExcelImport}
          columns={columns}
        />
      )}

      {showBulkEdit && (
        <BulkEditPopup
          isOpen={showBulkEdit}
          onClose={() => setShowBulkEdit(false)}
          columns={columns}
          selectedCustomers={localLeads.filter(lead => selectedLeads.includes(lead.id))}
          onApplyChanges={handleBulkEditApply}
        />
      )}
    </div>
  );
}