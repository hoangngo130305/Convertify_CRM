// This file has been replaced by the main LeadHubDashboard.tsx
// Please use LeadHubDashboard.tsx instead

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

// Lead Hub specific columns - theo yêu cầu mới
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
  // Lead Hub specific statuses
  const statuses = ['Mới', 'Đang xử lí', 'Thành công', 'Thất bại'];
  const subStatuses = {
    'Mới': ['Lead mới', 'Chưa liên hệ', 'Cần xác thực'],
    'Đang xử lí': ['Đã liên hệ', 'Đang tư vấn', 'Gửi báo giá', 'Đang thương lượng'],
    'Thành công': ['Đã chốt deal', 'Đã ký hợp đồng', 'Đã thanh toán'],
    'Thất bại': ['Không có nhu cầu', 'Không đủ ngân sách', 'Chọn đối thủ', 'Không phản hồi']
  };
  
  // Lead Hub specific sources
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
  
  // Lead quality options
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
  
  const leads = Array.from({ length: 50 }, (_, i) => {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const subStatus = subStatuses[status][Math.floor(Math.random() * subStatuses[status].length)];
    
    return {
      id: `LD${String(i + 1).padStart(3, '0')}`,
      name: `Lead ${i + 1}`,
      phone: `097${String(i).padStart(7, '0')}`,
      email: `lead${i + 1}@email.com`,
      questions: sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)],
      source: sources[Math.floor(Math.random() * sources.length)],
      products: [products[Math.floor(Math.random() * products.length)]],
      status: status,
      subStatus: subStatus, // Additional custom status
      quality: qualities[Math.floor(Math.random() * qualities.length)],
      assignedSale: sales[Math.floor(Math.random() * sales.length)],
      createdDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1, Math.floor(Math.random() * 24), Math.floor(Math.random() * 60)),
      notes: `Ghi chú cho lead ${i + 1}`,
      address: `Địa chỉ ${i + 1}, Hà Nội`,
      revenue: Math.floor(Math.random() * 10000000),
      customerId: `LD${String(i + 1).padStart(3, '0')}`,
      customFields: {},
      tags: [],
      // Lead Hub specific fields
      leadScore: Math.floor(Math.random() * 100) + 1,
      campaign: sources[Math.floor(Math.random() * sources.length)].includes('Campaign') ? sources[Math.floor(Math.random() * sources.length)] : null,
      utmSource: sources[Math.floor(Math.random() * sources.length)]
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
  
  // Add local leads state to ensure updates persist
  const [localLeads, setLocalLeads] = useState(() => generateMockLeads());
  
  // Group filter handlers state
  const [groupFilterHandlers, setGroupFilterHandlers] = useState<{
    openGroupFilter: (groupId: string) => void;
    hasGroupFilter: (groupId: string) => boolean;
  } | null>(null);
  
  // Update local leads when props change
  useEffect(() => {
    if (customers) {
      setLocalLeads(customers);
    }
  }, [customers]);
  
  // Lead Hub specific groups
  const [leadGroups, setLeadGroups] = useState([
    {
      id: 'main',
      name: 'Tất cả Leads',
      count: 0,
      filters: [],
      memberIds: []
    },
    {
      id: 'group1',
      name: 'Leads nóng',
      count: 0,
      filters: [
        { columnId: 'quality', columnName: 'Chất lượng Lead', values: ['Hot/Nóng'] },
        { columnId: 'status', columnName: 'Trạng thái', values: ['Mới', 'Đang xử lí'] }
      ],
      memberIds: []
    },
    {
      id: 'group2',
      name: 'Facebook Leads',
      count: 0,
      filters: [
        { columnId: 'source', columnName: 'Nguồn data', values: ['Facebook Lead Ads'] }
      ],
      memberIds: []
    },
    {
      id: 'group3',
      name: 'Chưa phân bổ',
      count: 0,
      filters: [
        { columnId: 'assignedSale', columnName: 'Sale phụ trách', values: ['Chưa phân bổ'] }
      ],
      memberIds: []
    },
    {
      id: 'group4',
      name: 'Data xấu',
      count: 0,
      filters: [
        { columnId: 'quality', columnName: 'Chất lượng Lead', values: ['Cold/Lạnh'] }
      ],
      memberIds: []
    }
  ]);
  
  const [activeGroup, setActiveGroup] = useState('main');
  const [groupFilters, setGroupFilters] = useState<Record<string, string[]>>({});
  const [quickFilters, setQuickFilters] = useState<Record<string, string[]>>({});
  const [tableFilters, setTableFilters] = useState<Record<string, string[]>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [columns, setColumns] = useState<Column[]>(defaultColumns);
  
  // Use localLeads instead of customers from props
  const allLeads = localLeads;
  
  // Groups state
  const availableGroups = leadGroups;
  
  // Simplified filter logic - combine all filters into one
  const allFilters = useMemo(() => {
    const combined: Record<string, string[]> = {};
    
    // Merge all filter sources
    const filterSources = [groupFilters, quickFilters, tableFilters];
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
  }, [groupFilters, quickFilters, tableFilters]);
  
  // Check if additional filters conflict with group filters
  const hasConflictingFilters = useMemo(() => {
    if (activeGroup === 'main') return false;
    
    const currentGroup = leadGroups.find(g => g.id === activeGroup);
    if (!currentGroup || currentGroup.filters.length === 0) return false;
    
    // Check if any additional filters (quickFilters + tableFilters) conflict with group filters
    const additionalFilters: Record<string, string[]> = {};
    [quickFilters, tableFilters].forEach(filterSource => {
      Object.entries(filterSource).forEach(([key, values]) => {
        if (values && values.length > 0) {
          additionalFilters[key] = [...(additionalFilters[key] || []), ...values];
          additionalFilters[key] = [...new Set(additionalFilters[key])];
        }
      });
    });
    
    // Check for conflicts: if additional filter has values that don't overlap with group filter values
    for (const [columnId, additionalValues] of Object.entries(additionalFilters)) {
      const groupFilter = currentGroup.filters.find(f => f.columnId === columnId);
      if (groupFilter) {
        // Check if there's any overlap between group filter values and additional filter values
        const hasOverlap = additionalValues.some(additionalValue => 
          groupFilter.values.some(groupValue => 
            additionalValue.toLowerCase() === groupValue.toLowerCase()
          )
        );
        
        // If no overlap, it's a conflict
        if (!hasOverlap) {
          return true;
        }
      }
    }
    
    return false;
  }, [activeGroup, leadGroups, quickFilters, tableFilters]);
  
  // Filter leads based on search term, filters, and group membership
  const filteredLeads = useMemo(() => {
    // If there are conflicting filters, return empty result
    if (hasConflictingFilters) {
      return [];
    }
    
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

    // Group-specific filtering logic - PRIORITIZE GROUP MEMBERSHIP
    if (activeGroup !== 'main') {
      const currentGroup = leadGroups.find(g => g.id === activeGroup);
      if (currentGroup) {
        result = result.filter(lead => {
          // PRIORITY 1: Include leads explicitly assigned to this group (ALWAYS SHOW)
          if (currentGroup.memberIds && currentGroup.memberIds.includes(lead.id)) {
            return true;
          }
          
          // PRIORITY 2: Include leads matching group filters for auto-assignment
          const matchesFilters = currentGroup.filters.every(filter => {
            const leadValue = lead[filter.columnId as keyof typeof lead];
            
            if (filter.columnId === 'quality') {
              return filter.values.includes(String(leadValue));
            }
            
            const stringValue = Array.isArray(leadValue) 
              ? leadValue.join(' ') 
              : String(leadValue || '');
            
            return filter.values.some(filterValue => 
              stringValue.toLowerCase() === filterValue.toLowerCase()
            );
          });
          
          return matchesFilters;
        });
      }
    }

    // Apply additional filters (quick filters, table filters) only if not conflicting with group
    if (Object.keys(allFilters).length > 0) {
      result = result.filter(lead => {
        // Skip additional filtering for leads that are explicit group members
        if (activeGroup !== 'main') {
          const currentGroup = leadGroups.find(g => g.id === activeGroup);
          if (currentGroup && currentGroup.memberIds && currentGroup.memberIds.includes(lead.id)) {
            return true; // Always include explicit group members
          }
        }
        
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
  }, [allLeads, searchTerm, allFilters, activeGroup, leadGroups, hasConflictingFilters]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, allFilters]);

  // Handle group filters change
  const handleGroupFiltersChange = (filters: Record<string, string[]>) => {
    setGroupFilters(filters);
  };

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
    // Debug logging
    console.log(`🔄 Lead update: ${leadId}, field: ${field}, value:`, value);
    
    // Check if lead is in a group
    const leadInGroup = leadGroups.find(group => 
      group.memberIds && group.memberIds.includes(leadId)
    );
    
    if (leadInGroup) {
      console.log(`🏷️ Lead ${leadId} is member of group \"${leadInGroup.name}\" - will persist in group`);
    }
    
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
    // In a full implementation, this would need to be handled by the parent component
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
    const newId = `LD${String(allLeads.length + 1).padStart(3, '0')}`;
    
    // Get current group for membership assignment
    const currentGroup = leadGroups.find(g => g.id === activeGroup);
    const currentGroupName = currentGroup?.name || 'Tất cả Leads';
    
    // Create new lead with minimal empty defaults
    const newLead = {
      id: newId,
      name: '', // Empty name for user to fill
      phone: '', // Empty phone
      email: '', // Empty email
      questions: '', // Empty questions
      source: '', // Empty source for user to select
      products: [], // Empty products array
      status: 'Mới', // Default status is always \"Mới\" for new leads
      quality: 'Warm/Ấm', // Default quality
      assignedSale: '', // Empty assigned sale for user to select
      createdDate: new Date(), // Only auto-fill creation date
      notes: '', // Empty notes
      address: '', // Empty address
      revenue: 0, // Default to 0 revenue
      customerId: newId, // Auto-generate customer ID
      customFields: {}, // Empty custom fields
      tags: [], // Empty tags array
      leadScore: 0,
      campaign: null,
      utmSource: ''
    };
    
    // Add lead to local state first
    setLocalLeads(prev => [newLead, ...prev]);
    
    // Add lead to group membership if not main group
    if (activeGroup !== 'main' && currentGroup) {
      setLeadGroups(prev => prev.map(group => 
        group.id === activeGroup 
          ? { ...group, memberIds: [...(group.memberIds || []), newId] }
          : group
      ));
      
      // Debug logging
      console.log(`✅ Added lead ${newId} to group \"${currentGroup.name}\" memberIds:`, [...(currentGroup.memberIds || []), newId]);
    }
    
    // Use the callback if available
    if (onCreateCustomer) {
      onCreateCustomer(newLead, activeGroup);
    }
    
    // Show simple confirmation message
    console.log(`Tạo lead mới với trạng thái \"Mới\" trong nhóm: ${currentGroupName}`);
    
    // Auto-select the new lead for easy editing
    setSelectedLeads([newId]);
  }; 

  const handleExcelImport = (importedLeads: any[]) => {
    // Process group assignments first if they exist
    const leadsWithGroupAssignments = importedLeads.filter(l => l._groupAssignments);
    
    if (leadsWithGroupAssignments.length > 0) {
      // Handle group assignments
      setLeadGroups(prev => prev.map(group => {
        const newMemberIds = [...(group.memberIds || [])];
        
        leadsWithGroupAssignments.forEach(lead => {
          if (lead._groupAssignments && lead._groupAssignments.includes(group.id)) {
            if (!newMemberIds.includes(lead.id)) {
              newMemberIds.push(lead.id);
            }
          }
        });
        
        return newMemberIds.length > (group.memberIds?.length || 0) 
          ? { ...group, memberIds: newMemberIds }
          : group;
      }));
      
      console.log(`🏷️ Applied group assignments for ${leadsWithGroupAssignments.length} leads`);
    }
    
    // Clean up the _groupAssignments field and add to local leads
    const cleanedLeads = importedLeads.map(lead => {
      const { _groupAssignments, ...cleanedLead } = lead;
      return cleanedLead;
    });
    
    setLocalLeads(prev => [...cleanedLeads, ...prev]);
    setShowExcelImport(false);
    // Auto-select imported leads for review
    setSelectedLeads(cleanedLeads.map(l => l.id));
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
    // Use the parent's delete handler if provided
    if (onDeleteCustomer) {
      onDeleteCustomer(leadId);
      // Also update local state to reflect the change immediately
      setLocalLeads(prev => prev.filter(lead => lead.id !== leadId));
      setSelectedLeads(prev => prev.filter(id => id !== leadId));
    } else {
      // Fallback to local logic if no parent handler
      if (confirm('Bạn có chắc chắn muốn xóa lead này?')) {
        setLocalLeads(prev => prev.filter(lead => lead.id !== leadId));
        setSelectedLeads(prev => prev.filter(id => id !== leadId));
        console.log('Deleted lead:', leadId);
      }
    }
  };

  const handleMoveToCRM = (leadId: string) => {
    console.log('Move to CRM:', leadId);
    // Update lead status or move to different group
    setLocalLeads(prev => prev.map(lead => 
      lead.id === leadId 
        ? { ...lead, status: 'Đã chuyển CRM' }
        : lead
    ));
    alert('Đã chuyển lead vào CRM');
  };

  const handleMoveToBadData = (leadId: string) => {
    if (confirm('Bạn có chắc chắn muốn chuyển lead này vào data xấu?')) {
      console.log('Move to Bad Data:', leadId);
      
      // Call parent handler to move to bad data
      if (onMoveToBadData) {
        onMoveToBadData(leadId, 'Không có nhu cầu');
      }
      
      // Remove from local state
      setLocalLeads(prev => prev.filter(lead => lead.id !== leadId));
      setSelectedLeads(prev => prev.filter(id => id !== leadId));
    }
  };

  const handleChangeToHot = (leadId: string) => {
    console.log('Change to Hot:', leadId);
    // Update lead quality to hot
    setLocalLeads(prev => prev.map(lead => 
      lead.id === leadId 
        ? { ...lead, quality: 'Hot/Nóng' }
        : lead
    ));
    alert('Đã chuyển lead sang chất lượng Nóng');
  };

  return (
    <div className="flex flex-col h-screen bg-background w-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0 z-20">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-medium">Lead Hub - Quản lý Lead</h1>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            {filteredLeads.length} leads
          </Badge>
          {badDataCount > 0 && (
            <Badge variant="secondary" className="bg-red-100 text-red-800">
              {badDataCount} data xấu
            </Badge>
          )}
        </div>
        
        {/* Header Icons */}
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="px-3 py-2"
                title={`Quản lý Data Xấu và Khôi phục (${badDataCount} data)`}
              >
                Data xấu ({badDataCount})
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={onOpenBadDataManager}>
                <AlertTriangle className="h-4 w-4 mr-2" />
                Quản lý Data Xấu
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onOpenRestoreData}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Khôi phục dữ liệu
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onOpenPopup('notes')}
            className="p-2"
          >
            <StickyNote className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onOpenPopup('notifications')}
            className="p-2"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onOpenPopup('task')}
            className="p-2"
            title="Quản lý công việc và reminder"
          >
            <ClipboardList className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onOpenPopup('support')}
            className="p-2"
          >
            <HelpCircle className="h-5 w-5" />
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
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Customer Groups - Horizontal */}
      <CustomerGroups
        activeGroup={activeGroup}
        onGroupChange={setActiveGroup}
        onFiltersChange={handleGroupFiltersChange}
        currentTableFilters={groupFilters}
        customers={filteredLeads}
        onGroupsChange={(groups) => setLeadGroups(groups)}
        onGroupFilterHandlers={(handlers) => setGroupFilterHandlers(handlers)}
      />

      {/* Main Content Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Main Table Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Control Bar - FIXED SINGLE ROW */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-muted/20 flex-shrink-0">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {/* Search Box - Fixed Width */}
              <div className="relative w-64 flex-shrink-0">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Tìm kiếm leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4"
                />
              </div>
              
              {/* Bulk Actions - Show next to search when leads selected */}
              {selectedLeads.length > 0 && (
                <div className="flex items-center gap-2 flex-shrink-0">
                  <BulkActions
                    selectedCount={selectedLeads.length}
                    onBulkDelete={() => {
                      selectedLeads.forEach(handleDeleteLead);
                      setSelectedLeads([]);
                    }}
                    onBulkMoveToBadData={() => {
                      selectedLeads.forEach(handleMoveToBadData);
                      setSelectedLeads([]);
                    }}
                    onBulkChangeToHot={() => {
                      selectedLeads.forEach(handleChangeToHot);
                      setSelectedLeads([]);
                    }}
                    onBulkMoveToCRM={() => {
                      selectedLeads.forEach(handleMoveToCRM);
                      setSelectedLeads([]);
                    }}
                    onBulkExport={() => console.log('Bulk export:', selectedLeads)}
                  />
                </div>
              )}
            </div>

            {/* Right Side Actions - Always Visible */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Quick Filter */}
              <Button 
                variant={Object.keys(quickFilters).length > 0 ? "default" : "outline"}
                size="sm" 
                onClick={() => setShowQuickFilter(true)}
                className="h-9"
              >
                <Filter className="h-4 w-4 mr-2" />
                Bộ lọc
                {Object.keys(quickFilters).length > 0 && (
                  <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center bg-white text-purple-600">
                    {Object.keys(quickFilters).length}
                  </Badge>
                )}
              </Button>

              {/* Create Lead Button */}
              <Button 
                variant="default" 
                size="sm" 
                onClick={handleQuickCreate}
                className="h-9"
              >
                <Plus className="h-4 w-4 mr-2" />
                Tạo Lead
              </Button>

              {/* Column Manager Button */}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowColumnManager(true)}
                className="h-9"
              >
                <Settings className="h-4 w-4 mr-2" />
                Quản lý cột
              </Button>

              {/* More Actions Dropdown - Always Visible */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex-shrink-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => setShowExcelImport(true)}>
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    Import từ Excel
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => console.log('Export')}>
                    <Download className="h-4 w-4 mr-2" />
                    Export dữ liệu
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onOpenAutomation}>
                    <Zap className="h-4 w-4 mr-2" />
                    Tự động hóa
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onOpenPermissions}>
                    <Shield className="h-4 w-4 mr-2" />
                    Phân quyền
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onOpenDuplicateData}>
                    <Copy className="h-4 w-4 mr-2" />
                    Kiểm tra trùng lặp
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Table Container with fixed header */}
          <div className="flex-1 overflow-hidden">
            <LeadTableInlineEdit
              customers={currentLeads}
              columns={columns}
              selectedCustomers={selectedLeads}
              onSelectCustomer={handleSelectLead}
              onSelectAll={handleSelectAll}
              onCustomerUpdate={handleLeadUpdateLocal}
              onCustomerSort={handleLeadSort}
              onShowDetails={handleShowDetails}
              onCreateReminder={handleCreateReminder}
              onDeleteCustomer={handleDeleteLead}
              onMoveToBadData={handleMoveToBadData}
              onChangeToHot={handleChangeToHot}
              onMoveToCRM={handleMoveToCRM}
              tableFilters={tableFilters}
              onTableFiltersChange={setTableFilters}
            />
          </div>

          {/* Pagination Footer */}
          <div className="flex items-center justify-between p-4 border-t border-border flex-shrink-0 bg-background">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Hiển thị</span>
              <select 
                value={itemsPerPage} 
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="border border-border rounded px-2 py-1 text-sm"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="text-sm text-muted-foreground">
                của {filteredLeads.length} leads
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm px-3 py-1">
                Trang {currentPage} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Popups */}
      {showColumnManager && (
        <ColumnManager
          columns={columns}
          onColumnsChange={setColumns}
          onClose={() => setShowColumnManager(false)}
        />
      )}
      {showQuickFilter && (
        <LeadHubQuickFilterPopup
          currentFilters={quickFilters}
          onFiltersChange={handleQuickFiltersChange}
          onClose={() => setShowQuickFilter(false)}
        />
      )}
      {showExcelImport && (
        <ExcelImportPopup
          onImport={handleExcelImport}
          onClose={() => setShowExcelImport(false)}
          title="Import Leads từ Excel"
          sampleData={{
            headers: ['Tên', 'SĐT', 'Email', 'Câu hỏi', 'Nguồn data', 'Sản phẩm/Dịch vụ', 'Trạng thái', 'Chất lượng Lead', 'Sale phụ trách'],
            rows: [
              ['Lead Demo', '0987654321', 'demo@example.com', 'Quan tâm dịch vụ SEO', 'Facebook Lead Ads', 'SEO Service', 'Mới', 'Hot/Nóng', 'Nguyễn Văn A']
            ]
          }}
        />
      )}
    </div>
  );
}