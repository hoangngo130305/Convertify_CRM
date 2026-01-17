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
  Zap as ZapIcon,
  FileText,
  ChevronLeft,
  ChevronRight,
  User,
  CreditCard,
  Users,
  LogOut
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ColumnManager } from './ColumnManager';
import { BulkActions } from './BulkActions';
import { BulkActionsButtons } from './BulkActionsButtons';
import { BulkEditPopup } from './BulkEditPopup';
import { CustomerGroups } from './CustomerGroupsFixed';
import { CRMQuickFilterPopup } from './CRMQuickFilterPopup';
import { CustomerTableInlineEditWithAvatar } from './CustomerTableInlineEditWithAvatar';
import { ExcelImportPopup } from './ExcelImportPopup';
import { AdvancedPagination } from './ui/advanced-pagination';

interface CRMDashboardProps {
  onOpenPopup: (popup: string) => void;
  onOpenRestoreData?: () => void;
  onOpenDuplicateData?: () => void;
  onOpenPermissions?: () => void;
  onOpenAutomation?: () => void;
  onOpenCustomerDetails?: (customer: any) => void;
  onOpenReminder?: (customerId: string, customerName: string) => void;
  onOpenAccountSettings?: () => void;
  onOpenBilling?: () => void;
  onOpenInviteTeam?: () => void;
  onLogout?: () => void;
  onCreateCustomer?: (customer: any, targetGroup?: string) => void;
  onCustomerUpdate?: (customerId: string, field: string, value: any) => void;
  onDeleteCustomer?: (customerId: string) => void;
  customers?: any[];
  reminders?: any[];
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

const defaultColumns: Column[] = [
  { id: 'name', name: 'Tên khách hàng', type: 'default', visible: true, required: true, order: 1 },
  { id: 'phone', name: 'Số điện thoại', type: 'default', visible: true, required: false, order: 2 },
  { id: 'email', name: 'Email', type: 'hidden', visible: false, required: false, order: 3 },
  { id: 'products', name: 'Sản phẩm/Dịch vụ', type: 'default', visible: true, required: false, order: 4 },
  { id: 'source', name: 'Nguồn Data', type: 'default', visible: true, required: false, order: 5 },
  { id: 'status', name: 'Trạng thái', type: 'default', visible: true, required: false, order: 6 },
  { id: 'assignedSale', name: 'Sale phụ trách', type: 'default', visible: true, required: false, order: 7 },
  { id: 'createdDate', name: 'Thời gian', type: 'default', visible: true, required: false, order: 8 },
  { id: 'notes', name: 'Ghi chú', type: 'default', visible: true, required: false, order: 9 },
  { id: 'tags', name: 'Tag', type: 'default', visible: true, required: false, order: 10 },
  
  // Additional columns
  { id: 'quality', name: 'Chất lượng', type: 'default', visible: true, required: false, order: 11, fieldType: 'select', options: ['Hot/Nóng', 'Warm/Ấm', 'Cold/Lạnh'] },
  { id: 'revenue', name: 'Doanh thu', type: 'default', visible: true, required: false, order: 12, fieldType: 'number' },
  { id: 'questions', name: 'Câu hỏi', type: 'hidden', visible: false, required: false, order: 13 },
  { id: 'address', name: 'Địa chỉ', type: 'hidden', visible: false, required: false, order: 14, fieldType: 'text' },
  { id: 'customerId', name: 'ID Customer', type: 'hidden', visible: false, required: false, order: 15 },
];

// Product pricing configuration - Easy to configure for admin
const PRODUCT_PRICING = {
  'Website Design': 5000000, // 5 triệu VNĐ
  'SEO Service': 3000000,    // 3 triệu VNĐ
  'Digital Marketing': 4000000, // 4 triệu VNĐ
  'E-commerce': 8000000,     // 8 triệu VNĐ
} as const;

// Calculate auto revenue based on products and status
const calculateAutoRevenue = (products: string[], status: string): number => {
  // Only calculate revenue when status is "Thành công"
  if (status !== 'Thành công') {
    return 0;
  }
  
  // Sum up pricing for all products
  return products.reduce((total, product) => {
    const price = PRODUCT_PRICING[product as keyof typeof PRODUCT_PRICING];
    return total + (price || 0);
  }, 0);
};

// Mock data for demonstration
const generateMockCustomers = () => {
  const statuses = ['Mới', 'Đang xử lý', 'Thành công', 'Thất bại']; // Removed 'Lạnh'
  const products = ['Website Design', 'SEO Service', 'Digital Marketing', 'E-commerce'];
  const sources = ['Facebook', 'Google', 'TikTok', 'Zalo', 'Hotline', 'Website', 'Giới thiệu'];
  const sales = ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D', 'Chưa phân bổ'];
  
  const customers = Array.from({ length: 50 }, (_, i) => ({
    id: `KH${String(i + 1).padStart(3, '0')}`,
    name: `Khách hàng ${i + 1}`,
    phone: `098${String(i).padStart(7, '0')}`,
    email: `customer${i + 1}@email.com`,
    products: [products[Math.floor(Math.random() * products.length)]],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    source: sources[Math.floor(Math.random() * sources.length)],
    assignedSale: sales[Math.floor(Math.random() * sales.length)],
    createdDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
    notes: `Ghi chú cho khách hàng ${i + 1}`,
    quality: Math.floor(Math.random() * 5) + 1,
    questions: `Câu hỏi từ khách hàng ${i + 1}`,
    address: `Địa chỉ ${i + 1}, Hà Nội`,
    revenue: Math.floor(Math.random() * 10000000),
    customFields: {}
  }));

  // Add some duplicate data for testing
  // Duplicate emails
  customers.push({
    id: 'KH051',
    name: 'Khách hàng trùng email 1',
    phone: '0981234567',
    email: 'customer5@email.com', // Same email as customer 5
    products: ['SEO Service'],
    status: 'Mới',
    source: 'Facebook',
    assignedSale: 'Nguyễn Văn A',
    createdDate: new Date(2024, 5, 15),
    notes: 'Khách hàng có email trùng lặp',
    quality: 4,
    questions: 'Câu hỏi từ khách hàng trùng email',
    address: 'Địa chỉ khác, TP HCM',
    revenue: 5000000,
    customFields: {}
  });

  customers.push({
    id: 'KH052',
    name: 'Khách hàng trùng email 2',
    phone: '0987654321',
    email: 'customer5@email.com', // Same email as customer 5
    products: ['Digital Marketing'],
    status: 'Đang xử lý',
    source: 'Google',
    assignedSale: 'Trần Thị B',
    createdDate: new Date(2024, 6, 20),
    notes: 'Khách hàng khác cùng email',
    quality: 3,
    questions: 'Thắc mắc về dịch vụ',
    address: 'Địa chỉ thứ 3, Đà Nẵng',
    revenue: 8000000,
    customFields: {}
  });

  // Duplicate phones
  customers.push({
    id: 'KH053',
    name: 'Khách hàng trùng SĐT',
    phone: '09800000009', // Same phone as customer 10
    email: 'duplicate.phone@email.com',
    products: ['E-commerce'],
    status: 'Thành công',
    source: 'TikTok',
    assignedSale: 'Lê Văn C',
    createdDate: new Date(2024, 7, 10),
    notes: 'Khách hàng có SĐT trùng lặp',
    quality: 5,
    questions: 'Hỏi về package',
    address: 'Địa chỉ mới, Hà Nội',
    revenue: 12000000,
    customFields: {}
  });

  // Both email and phone duplicates
  customers.push({
    id: 'KH054',
    name: 'Khách hàng trùng cả email & SĐT',
    phone: '09800000014', // Same phone as customer 15
    email: 'customer15@email.com', // Same email as customer 15
    products: ['Website Design'],
    status: 'Thất bại', // Changed from 'Lạnh' to 'Thất bại'
    source: 'Hotline',
    assignedSale: 'Phạm Thị D',
    createdDate: new Date(2024, 8, 5),
    notes: 'Trùng cả email và SĐT',
    quality: 2,
    questions: 'Quan tâm nhiều dịch vụ',
    address: 'Cùng địa chỉ, Hà Nội',
    revenue: 3000000,
    customFields: {}
  });

  return customers;
};

export function CRMDashboard({ onOpenPopup, onOpenRestoreData, onOpenDuplicateData, onOpenPermissions, onOpenAutomation, onOpenCustomerDetails, onOpenReminder, onOpenAccountSettings, onOpenBilling, onOpenInviteTeam, onLogout, onCreateCustomer, onCustomerUpdate, onDeleteCustomer, customers, reminders }: CRMDashboardProps) {
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showColumnManager, setShowColumnManager] = useState(false);
  const [showQuickFilter, setShowQuickFilter] = useState(false);
  const [showExcelImport, setShowExcelImport] = useState(false);
  const [showBulkEdit, setShowBulkEdit] = useState(false);
  
  // Add local customers state to ensure updates persist
  const [localCustomers, setLocalCustomers] = useState(() => customers || generateMockCustomers());
  
  // Group filter handlers state
  const [groupFilterHandlers, setGroupFilterHandlers] = useState<{
    openGroupFilter: (groupId: string) => void;
    hasGroupFilter: (groupId: string) => boolean;
  } | null>(null);
  
  // Update local customers when props change
  useEffect(() => {
    if (customers) {
      setLocalCustomers(customers);
    }
  }, [customers]);
  
  const [customerGroups, setCustomerGroups] = useState([
    {
      id: 'main',
      name: 'Tổng quan',
      count: 0,
      filters: [],
      memberIds: []
    },
    {
      id: 'group1',
      name: 'Khách hàng tiềm năng',
      count: 0,
      filters: [
        { columnId: 'status', columnName: 'Trạng thái', values: ['Mới', 'Đang xử lý'] },
        { columnId: 'source', columnName: 'Nguồn data', values: ['Facebook', 'Google'] }
      ],
      memberIds: []
    },
    {
      id: 'group2',
      name: 'Thành công Q4',
      count: 0,
      filters: [
        { columnId: 'status', columnName: 'Trạng thái', values: ['Thành công'] }
      ],
      memberIds: []
    },
    {
      id: 'group3',
      name: 'Chưa phân bổ Sale',
      count: 0,
      filters: [
        { columnId: 'assignedSale', columnName: 'Sale phụ trách', values: ['Chưa phân bổ'] }
      ],
      memberIds: []
    }
  ]);
  
  const [activeGroup, setActiveGroup] = useState('main');
  const [groupFilters, setGroupFilters] = useState<Record<string, string[]>>({});
  const [quickFilters, setQuickFilters] = useState<Record<string, string[]>>({});
  const [tableFilters, setTableFilters] = useState<Record<string, string[]>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [columns, setColumns] = useState<Column[]>(defaultColumns);
  
  // Debug log for column changes
  const handleColumnsChange = (newColumns: Column[]) => {
    console.log('📝 Columns updated:', newColumns);
    setColumns(newColumns);
  };
  
  // Use localCustomers instead of customers from props
  const allCustomers = localCustomers;
  
  // Groups state
  const availableGroups = customerGroups;
  
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
    
    const currentGroup = customerGroups.find(g => g.id === activeGroup);
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
  }, [activeGroup, customerGroups, quickFilters, tableFilters]);
  
  // Filter customers based on search term, filters, and group membership
  const filteredCustomers = useMemo(() => {
    // If there are conflicting filters, return empty result
    if (hasConflictingFilters) {
      return [];
    }
    
    let result = allCustomers;

    // Apply search filter
    if (searchTerm) {
      result = result.filter(customer => 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Group-specific filtering logic - PRIORITIZE GROUP MEMBERSHIP
    if (activeGroup !== 'main') {
      const currentGroup = customerGroups.find(g => g.id === activeGroup);
      if (currentGroup) {
        result = result.filter(customer => {
          // PRIORITY 1: Include customers explicitly assigned to this group (ALWAYS SHOW)
          if (currentGroup.memberIds && currentGroup.memberIds.includes(customer.id)) {
            return true;
          }
          
          // PRIORITY 2: Include customers matching group filters for auto-assignment
          const matchesFilters = currentGroup.filters.every(filter => {
            const customerValue = customer[filter.columnId as keyof typeof customer];
            
            if (filter.columnId === 'quality') {
              return filter.values.includes(String(customerValue));
            }
            
            const stringValue = Array.isArray(customerValue) 
              ? customerValue.join(' ') 
              : String(customerValue || '');
            
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
      result = result.filter(customer => {
        // Skip additional filtering for customers that are explicit group members
        if (activeGroup !== 'main') {
          const currentGroup = customerGroups.find(g => g.id === activeGroup);
          if (currentGroup && currentGroup.memberIds && currentGroup.memberIds.includes(customer.id)) {
            return true; // Always include explicit group members
          }
        }
        
        return Object.entries(allFilters).every(([columnId, filterValues]) => {
          if (!filterValues || filterValues.length === 0) return true;
          
          const customerValue = customer[columnId as keyof typeof customer];
          if (columnId === 'quality') {
            return filterValues.includes(String(customerValue));
          }
          
          const stringValue = Array.isArray(customerValue) 
            ? customerValue.join(' ') 
            : String(customerValue || '');
          
          return filterValues.some(filterValue => 
            stringValue.toLowerCase() === filterValue.toLowerCase()
          );
        });
      });
    }

    return result;
  }, [allCustomers, searchTerm, allFilters, activeGroup, customerGroups, hasConflictingFilters]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, allFilters]);

  // Handle group filters change
  const handleGroupFiltersChange = (filters: Record<string, string[]>) => {
    setGroupFilters(filters);
  };

  // Handle quick filters change
  const handleQuickFiltersChange = (filters: any) => {
    console.log('Quick filters changed:', filters);
    
    // Convert the filter format from popup to the format expected by the system
    const convertedFilters: Record<string, string[]> = {};
    
    if (filters.quick) {
      Object.entries(filters.quick).forEach(([key, values]) => {
        if (values && Array.isArray(values) && values.length > 0) {
          convertedFilters[key] = values;
        }
      });
    }
    
    // TODO: Handle advanced filters if needed
    if (filters.advanced && filters.advanced.length > 0) {
      console.log('Advanced filters:', filters.advanced);
      // Advanced filters would need more complex logic to convert to the current filter system
    }
    
    setQuickFilters(convertedFilters);
  };
  
  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);

  // Handle customer update
  const handleCustomerUpdateLocal = (customerId: string, field: string, value: any) => {
    // Debug logging
    console.log(`🔄 Customer update: ${customerId}, field: ${field}, value:`, value);
    
    // Check if customer is in a group
    const customerInGroup = customerGroups.find(group => 
      group.memberIds && group.memberIds.includes(customerId)
    );
    
    if (customerInGroup) {
      console.log(`🏷️ Customer ${customerId} is member of group "${customerInGroup.name}" - will persist in group`);
    }
    
    // Update local customers state with auto-revenue calculation
    setLocalCustomers(prev => prev.map(customer => {
      if (customer.id === customerId) {
        const updatedCustomer = { ...customer, [field]: value };
        
        // Auto-calculate revenue when status changes to "Thành công"
        if (field === 'status' || field === 'products') {
          const currentProducts = field === 'products' ? value : customer.products;
          const currentStatus = field === 'status' ? value : customer.status;
          
          // Calculate auto revenue
          const autoRevenue = calculateAutoRevenue(currentProducts || [], currentStatus || '');
          
          if (autoRevenue > 0) {
            updatedCustomer.revenue = autoRevenue;
            console.log(`💰 Auto-calculated revenue for ${customerId}: ${autoRevenue.toLocaleString('vi-VN')} VNĐ`);
            console.log(`📦 Products: ${currentProducts?.join(', ')}`);
            console.log(`📊 Status: ${currentStatus}`);
          } else if (currentStatus !== 'Thành công') {
            // Reset revenue to 0 if status is not "Thành công"
            updatedCustomer.revenue = 0;
            console.log(`🔄 Reset revenue for ${customerId} (status: ${currentStatus})`);
          }
        }
        
        return updatedCustomer;
      }
      return customer;
    }));
    
    // Also call the prop callback if provided
    if (onCustomerUpdate) {
      onCustomerUpdate(customerId, field, value);
    }
  };

  // Handle customer sorting - for now just log since we need to coordinate with parent
  const handleCustomerSort = (sortedCustomers: any[]) => {
    console.log('Customer sort requested:', sortedCustomers);
    // In a full implementation, this would need to be handled by the parent component
  };

  const handleSelectCustomer = (customerId: string) => {
    setSelectedCustomers(prev => 
      prev.includes(customerId) 
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    );
  };

  const handleSelectAll = () => {
    setSelectedCustomers(
      selectedCustomers.length === currentCustomers.length 
        ? [] 
        : currentCustomers.map(c => c.id)
    );
  };

  // Handle quick create customer - Create completely empty customer
  const handleQuickCreate = () => {
    const newId = `KH${String(allCustomers.length + 1).padStart(3, '0')}`;
    
    // Get current group for membership assignment (but don't auto-fill fields)
    const currentGroup = customerGroups.find(g => g.id === activeGroup);
    const currentGroupName = currentGroup?.name || 'Tổng quan';
    
    // Create new customer with minimal empty defaults
    const newCustomer = {
      id: newId,
      name: '', // Empty name for user to fill
      phone: '', // Empty phone
      email: '', // Empty email
      products: [], // Empty products array
      status: 'Mới', // Default status is always "Mới" for new customers
      source: '', // Empty source for user to select
      assignedSale: '', // Empty assigned sale for user to select
      createdDate: new Date(), // Only auto-fill creation date
      notes: '', // Empty notes
      quality: '', // Default to empty for manual input
      questions: '', // Empty questions
      address: '', // Empty address
      revenue: 0, // Default to 0 revenue
      customFields: {}, // Empty custom fields
      tags: [] // Empty tags array
    };
    
    // Add customer to local state first
    setLocalCustomers(prev => [newCustomer, ...prev]);
    
    // Add customer to group membership if not main group (but don't auto-fill fields)
    if (activeGroup !== 'main' && currentGroup) {
      setCustomerGroups(prev => prev.map(group => 
        group.id === activeGroup 
          ? { ...group, memberIds: [...(group.memberIds || []), newId] }
          : group
      ));
      
      // Debug logging
      console.log(`✅ Added customer ${newId} to group "${currentGroup.name}" memberIds:`, [...(currentGroup.memberIds || []), newId]);
    }
    
    // Use the callback if available
    if (onCreateCustomer) {
      onCreateCustomer(newCustomer, activeGroup);
    }
    
    // Show simple confirmation message
    console.log(`Tạo khách hàng mới với trạng thái "Mới" trong nhóm: ${currentGroupName}`);
    
    // Auto-select the new customer for easy editing
    setSelectedCustomers([newId]);
  }; 

  // Handle Excel import
  const handleExcelImport = (importedCustomers: any[]) => {
    // Process group assignments first if they exist
    const customersWithGroupAssignments = importedCustomers.filter(c => c._groupAssignments);
    
    if (customersWithGroupAssignments.length > 0) {
      // Handle group assignments
      setCustomerGroups(prev => prev.map(group => {
        const newMemberIds = [...(group.memberIds || [])];
        
        customersWithGroupAssignments.forEach(customer => {
          if (customer._groupAssignments && customer._groupAssignments.includes(group.id)) {
            if (!newMemberIds.includes(customer.id)) {
              newMemberIds.push(customer.id);
            }
          }
        });
        
        return newMemberIds.length > (group.memberIds?.length || 0) 
          ? { ...group, memberIds: newMemberIds }
          : group;
      }));
      
      console.log(`🏷️ Applied group assignments for ${customersWithGroupAssignments.length} customers`);
    }
    
    // Clean up the _groupAssignments field and add to local customers
    const cleanedCustomers = importedCustomers.map(customer => {
      const { _groupAssignments, ...cleanedCustomer } = customer;
      return cleanedCustomer;
    });
    
    setLocalCustomers(prev => [...cleanedCustomers, ...prev]);
    setShowExcelImport(false);
    // Auto-select imported customers for review
    setSelectedCustomers(cleanedCustomers.map(c => c.id));
  }; 

  // Handler functions for customer actions
  const handleShowDetails = (customer: any) => {
    console.log('Show details for customer:', customer);
    // You can implement a detail popup here
    if (onOpenCustomerDetails) {
      onOpenCustomerDetails(customer);
    } else {
      alert(`Chi tiết khách hàng: ${customer.name}\nPhone: ${customer.phone}\nEmail: ${customer.email}`);
    }
  };

  const handleCreateReminder = (customerId: string, customerName: string) => {
    console.log('Create reminder for:', customerId, customerName);
    // You can implement reminder popup here
    if (onOpenReminder) {
      onOpenReminder(customerId, customerName);
    } else {
      alert(`Tạo nhắc nhở cho: ${customerName}`);
    }
  };

  const handleDeleteCustomer = (customerId: string) => {
    // Use the parent's delete handler if provided
    if (onDeleteCustomer) {
      onDeleteCustomer(customerId);
      // Also update local state to reflect the change immediately
      setLocalCustomers(prev => prev.filter(customer => customer.id !== customerId));
      setSelectedCustomers(prev => prev.filter(id => id !== customerId));
    } else {
      // Fallback to local logic if no parent handler
      if (confirm('Bạn có chắc chắn muốn xóa khách hàng này?')) {
        setLocalCustomers(prev => prev.filter(customer => customer.id !== customerId));
        setSelectedCustomers(prev => prev.filter(id => id !== customerId));
        console.log('Deleted customer:', customerId);
      }
    }
  };

  const handleMoveToLeadHub = (customerId: string) => {
    console.log('Move to Lead Hub:', customerId);
    // Update customer status or move to different group
    setLocalCustomers(prev => prev.map(customer => 
      customer.id === customerId 
        ? { ...customer, status: 'Lead Hub' }
        : customer
    ));
    alert('Đã chuyển khách hàng vào Lead Hub');
  };

  const handleMoveToBadData = (customerId: string) => {
    if (confirm('Bạn có chắc chắn muốn chuyển khách hàng này vào data xấu?')) {
      console.log('Move to Bad Data:', customerId);
      // Update customer status or move to different group
      setLocalCustomers(prev => prev.map(customer => 
        customer.id === customerId 
          ? { ...customer, status: 'Data xấu' }
          : customer
      ));
      alert('Đã chuyển khách hàng vào data xấu');
    }
  };

  const handleChangeToHot = (customerId: string) => {
    console.log('Change to Hot:', customerId);
    // Update customer status to hot
    setLocalCustomers(prev => prev.map(customer => 
      customer.id === customerId 
        ? { ...customer, status: 'Nóng' }
        : customer
    ));
    alert('Đã chuyển khách hàng sang trạng thái Nóng');
  };

  // Handle Bulk Edit Apply - Enhanced to handle all column types
  const handleBulkEditApply = (updates: Record<string, any>) => {
    const updatedCount = selectedCustomers.length;
    
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
        const numValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]/g, '')) : value;
        processedUpdates[field] = isNaN(numValue) ? 0 : numValue;
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
    setLocalCustomers(prev => prev.map(customer => 
      selectedCustomers.includes(customer.id) 
        ? { 
            ...customer, 
            ...processedUpdates,
            // Ensure customFields is properly merged
            customFields: {
              ...customer.customFields,
              ...processedUpdates.customFields
            }
          }
        : customer
    ));

    // Call parent update handlers for each field and customer
    selectedCustomers.forEach(customerId => {
      Object.entries(processedUpdates).forEach(([field, value]) => {
        if (field !== 'customFields' && onCustomerUpdate) {
          onCustomerUpdate(customerId, field, value);
        }
      });
    });

    setSelectedCustomers([]);
    
    // Create a more detailed success message
    const fieldDisplayNames = Object.keys(updates).map(field => {
      const column = columns.find(col => col.id === field);
      return column?.displayName || column?.name || field;
    });
    
    alert(`✅ Đã cập nhật thành công!\n\n📊 Số lượng: ${updatedCount} khách hàng\n📝 Các trường: ${fieldDisplayNames.join(', ')}\n⏰ Thời gian: ${new Date().toLocaleString('vi-VN')}`);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header - Optimized */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center shadow-sm">
              <Users className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">CRM Dashboard</h1>
              <p className="text-xs text-muted-foreground">Quản lý khách hàng thông minh</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 font-medium">
            {filteredCustomers.length} khách hàng
          </Badge>
        </div>
        
        {/* Header Icons - Compact */}
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onOpenPopup('notes')}
            className="p-2 hover:bg-accent/60 rounded-lg transition-colors"
            title="Ghi chú"
          >
            <StickyNote className="h-4 w-4 text-primary" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onOpenPopup('notifications')}
            className="p-2 hover:bg-accent/60 rounded-lg transition-colors"
            title="Thông báo"
          >
            <Bell className="h-4 w-4 text-primary" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onOpenPopup('task')}
            className="p-2 hover:bg-accent/60 rounded-lg transition-colors"
            title="Công việc"
          >
            <ClipboardList className="h-4 w-4 text-primary" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onOpenPopup('support')}
            className="p-2 hover:bg-accent/60 rounded-lg transition-colors"
            title="Hỗ trợ"
          >
            <HelpCircle className="h-4 w-4 text-primary" />
          </Button>
          
          {/* User Avatar */}
          <div className="ml-2 pl-2 border-l border-border">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 hover:bg-accent rounded-full transition-colors"
                >
                  <Avatar className="w-7 h-7">
                    <AvatarImage 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
                      alt="Nguyễn Văn Admin" 
                    />
                    <AvatarFallback className="text-xs">NA</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem onClick={() => onOpenAccountSettings && onOpenAccountSettings()}>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem onClick={() => onOpenBilling && onOpenBilling()}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Billing
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={() => onOpenInviteTeam && onOpenInviteTeam()}>
                  <Users className="h-4 w-4 mr-2" />
                  Team
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem 
                  onClick={() => onLogout && onLogout()}
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

      {/* Customer Groups - Optimized */}
      <div className="flex-shrink-0 bg-muted/20 border-b border-border">
        <CustomerGroups 
          activeGroup={activeGroup}
          onGroupChange={setActiveGroup}
          onFiltersChange={handleGroupFiltersChange}
          currentTableFilters={tableFilters}
          onGroupFilterHandlers={setGroupFilterHandlers}
        />
      </div>

      {/* Control Bar - Optimized 2-Row Layout */}
      <div className="border-b border-border bg-muted/30 backdrop-blur-sm flex-shrink-0">
        <div className="flex flex-col gap-2">
          {/* Row 1: Search and Controls */}
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              {/* Search - Responsive */}
              <div className="relative w-80 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm khách hàng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-9 bg-background/80 border-border/60 focus:border-primary/60"
                />
              </div>

              {/* Quick Filters - Compact */}
              {activeGroup === 'main' && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowQuickFilter(true)}
                  className={`h-9 ${Object.keys(quickFilters).length > 0 ? 'border-primary/60 text-primary bg-primary/10' : 'border-border/60 hover:border-primary/40'}`}
                >
                  <Filter className="h-3.5 w-3.5 mr-1.5" />
                  Bộ lọc
                  {Object.keys(quickFilters).length > 0 && (
                    <Badge className="ml-1.5 h-4 px-1 text-xs bg-primary text-primary-foreground">
                      {Object.values(quickFilters).flat().length}
                    </Badge>
                  )}
                </Button>
              )}

              {/* Group Filter - Compact */}
              {activeGroup !== 'main' && groupFilterHandlers && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => groupFilterHandlers.openGroupFilter(activeGroup)}
                  className={`h-9 ${groupFilterHandlers.hasGroupFilter(activeGroup) ? 'border-primary/60 text-primary bg-primary/10' : 'border-border/60 hover:border-primary/40'}`}
                  title={groupFilterHandlers.hasGroupFilter(activeGroup) ? 'Đã có bộ lọc nhóm' : 'Thêm bộ lọc cho nhóm'}
                >
                  <Filter className="h-3.5 w-3.5 mr-1.5" />
                  Lọc nhóm
                  {groupFilterHandlers.hasGroupFilter(activeGroup) && (
                    <Badge className="ml-1.5 h-4 px-1 text-xs bg-primary text-primary-foreground">
                      Hoạt động
                    </Badge>
                  )}
                </Button>
              )} 
            </div>

            <div className="flex items-center gap-2">
          {/* Add Customer Dropdown - Compact */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3 shadow-sm">
                <Plus className="h-3.5 w-3.5 mr-1.5" />
                Thêm KH
                <ChevronDown className="h-3.5 w-3.5 ml-1.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem onClick={handleQuickCreate}>
                <Plus className="h-4 w-4 mr-2" />
                Tạo nhanh
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowExcelImport(true)}>
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Nhập Excel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Column Manager - Compact */}
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowColumnManager(true)}
            className="h-9 px-3 border-border/60 hover:border-primary/40 hover:bg-primary/5"
          >
            <Settings className="h-3.5 w-3.5 mr-1.5" />
            Cột
          </Button>

          {/* More Menu - Compact */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 w-9 p-0 border-border/60 hover:border-primary/40 hover:bg-primary/5">
                <MoreVertical className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => onOpenPermissions && onOpenPermissions()}>
                <Shield className="h-4 w-4 mr-2" />
                Phân quyền
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onOpenAutomation && onOpenAutomation()}>
                <Zap className="h-4 w-4 mr-2" />
                Automation
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onOpenDuplicateData && onOpenDuplicateData()}>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate Data
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onOpenRestoreData && onOpenRestoreData()}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Restore Data
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {
                console.log('Export Excel clicked');
                // Create export data from currently displayed/filtered customers
                const exportData = currentCustomers.map(customer => ({
                  'ID': customer.id,
                  'Tên khách hàng': customer.name,
                  'Số điện thoại': customer.phone,
                  'Email': customer.email,
                  'Sản phẩm/Dịch vụ': Array.isArray(customer.products) ? customer.products.join(', ') : customer.products,
                  'Trạng thái': customer.status,
                  'Nguồn data': customer.source,
                  'Sale phụ trách': customer.assignedSale,
                  'Ngày tạo': customer.createdDate ? new Date(customer.createdDate).toLocaleDateString('vi-VN') : '',
                  'Ghi chú': customer.notes,
                  'Địa chỉ': customer.address,
                  'Doanh thu': customer.revenue ? new Intl.NumberFormat('vi-VN').format(customer.revenue) + ' VND' : '0 VND',
                  'Chất lượng': customer.quality,
                  'Câu hỏi/Nhu cầu': customer.questions,
                  'Tags': customer.tags ? customer.tags.map((tag: any) => tag.name).join(', ') : ''
                }));
                
                // Convert to CSV format
                const headers = Object.keys(exportData[0] || {});
                const csvContent = [
                  headers.join(','),
                  ...exportData.map(row => 
                    headers.map(header => `"${row[header] || ''}"`).join(',')
                  )
                ].join('\n');
                
                // Create and download file
                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                
                // Generate filename with current date and filter info
                const currentDate = new Date().toISOString().split('T')[0];
                const groupName = activeGroup === 'main' ? 'TongQuan' : customerGroups.find(g => g.id === activeGroup)?.name?.replace(/\s+/g, '_') || 'Group';
                const hasFilters = Object.keys(tableFilters).length > 0 || Object.keys(quickFilters).length > 0;
                const filterSuffix = hasFilters ? '_Filtered' : '';
                
                link.download = `CRM_Export_${groupName}${filterSuffix}_${currentDate}.csv`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Success message with export details
                const totalCustomers = localCustomers.length;
                const exportedCount = exportData.length;
                const filterInfo = hasFilters ? ` (đã lọc từ ${totalCustomers} tổng)` : '';
                const groupInfo = activeGroup !== 'main' ? `\n📁 Nhóm: ${customerGroups.find(g => g.id === activeGroup)?.name}` : '';
                
                alert(`✅ Đã xuất ${exportedCount} khách hàng ra file CSV${filterInfo}!${groupInfo}\n\n📄 File: CRM_Export_${groupName}${filterSuffix}_${currentDate}.csv`);
              }}>
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Xuất Excel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
            </div>
          </div>

          {/* Row 2: Bulk Actions - Appears when items are selected */}
          {selectedCustomers.length > 0 && (
            <div className="px-4 pb-3">
              <BulkActionsButtons 
                selectedCount={selectedCustomers.length}
                selectedCustomers={currentCustomers.filter(c => selectedCustomers.includes(c.id))}
                availableGroups={availableGroups}
                module="crm"
                onAction={(action, data) => {
                  if (action === 'move-to-group') {
                    // Handle move to group
                    if (data && data.groupId && data.groupName) {
                      console.log(`Moving ${selectedCustomers.length} customers to group: ${data.groupName}`);
                      // Apply the group's filters to the selected customers
                      // This is a simulation - in real app, you'd update the customer data
                      alert(`Đã chuyển ${selectedCustomers.length} khách hàng vào nhóm "${data.groupName}"`);
                      setSelectedCustomers([]);
                    }
                  } else if (action === 'multi-group-assignment') {
                    // Handle multi-group assignment
                    if (data && data.groupIds && data.groupIds.length > 0) {
                      const groupNames = data.groupIds.map((id: string) => {
                        const group = customerGroups.find(g => g.id === id);
                        return group?.name || id;
                      }).join(', ');
                      
                      console.log(`Multi-group assignment: Moving ${selectedCustomers.length} customers to groups:`, data.groupIds);
                      
                      // Add customers to multiple groups
                      setCustomerGroups(prev => prev.map(group => {
                        if (data.groupIds.includes(group.id)) {
                          const newMemberIds = [...(group.memberIds || [])];
                          selectedCustomers.forEach(customerId => {
                            if (!newMemberIds.includes(customerId)) {
                              newMemberIds.push(customerId);
                            }
                          });
                          return { ...group, memberIds: newMemberIds };
                        }
                        return group;
                      }));
                      
                      alert(`✅ Đã chuyển ${selectedCustomers.length} khách hàng vào ${data.groupIds.length} nhóm:\n${groupNames}`);
                      setSelectedCustomers([]);
                    }
                  } else if (action === 'smart-group-assignment') {
                    // Handle smart rules assignment
                    if (data && data.rules && data.rules.length > 0) {
                      console.log('Applying smart rules:', data.rules);
                      
                      let totalAssigned = 0;
                      const assignmentSummary: string[] = [];
                      
                      // Apply each rule
                      data.rules.forEach((rule: any) => {
                        if (!rule.enabled) return;
                        
                        // Find customers that match ALL conditions (AND logic)
                        const matchingCustomers = selectedCustomers.filter(customerId => {
                          const customer = allCustomers.find(c => c.id === customerId);
                          if (!customer) return false;
                          
                          // All filters must match (AND logic)
                          return rule.filters.every((filter: any) => {
                            const customerValue = customer[filter.columnId];
                            
                            switch (filter.operator) {
                              case 'equals':
                                if (Array.isArray(customerValue)) {
                                  return filter.values.some((val: string) => customerValue.includes(val));
                                }
                                return filter.values.includes(String(customerValue));
                              case 'contains':
                                return filter.values.some((val: string) => 
                                  String(customerValue).toLowerCase().includes(val.toLowerCase())
                                );
                              case 'not_equals':
                                return !filter.values.includes(String(customerValue));
                              default:
                                return false;
                            }
                          });
                        });
                        
                        if (matchingCustomers.length > 0) {
                          // Add matching customers to target groups
                          setCustomerGroups(prev => prev.map(group => {
                            if (rule.targetGroupIds.includes(group.id)) {
                              const newMemberIds = [...(group.memberIds || [])];
                              matchingCustomers.forEach(customerId => {
                                if (!newMemberIds.includes(customerId)) {
                                  newMemberIds.push(customerId);
                                }
                              });
                              return { ...group, memberIds: newMemberIds };
                            }
                            return group;
                          }));
                          
                          totalAssigned += matchingCustomers.length;
                          const targetGroupNames = rule.targetGroupIds.map((id: string) => {
                            const group = customerGroups.find(g => g.id === id);
                            return group?.name || id;
                          }).join(', ');
                          
                          assignmentSummary.push(`• ${rule.name}: ${matchingCustomers.length} khách hàng → ${targetGroupNames}`);
                        }
                      });
                      
                      if (totalAssigned > 0) {
                        alert(`🤖 Phân nhóm thông minh hoàn tất!\n\n${assignmentSummary.join('\n')}\n\nTổng: ${totalAssigned} khách hàng được phân nhóm`);
                      } else {
                        alert('⚠️ Không có khách hàng nào khớp với các điều kiện đã thiết lập');
                      }
                      
                      setSelectedCustomers([]);
                    }
                  } else if (action === 'bulk-delete') {
                    // Confirmation is now handled in BulkActionsButtons component
                    selectedCustomers.forEach(customerId => {
                      if (onDeleteCustomer) {
                        onDeleteCustomer(customerId);
                      }
                    });
                    setSelectedCustomers([]);
                    alert(`✅ Đã xóa ${selectedCustomers.length} khách hàng và chuyển vào thùng rác!`);
                  } else if (action === 'move-to-bad-data') {
                    // Reason is now provided by BulkActionsButtons component
                    const reason = data?.reason || 'Bulk move to bad data';
                    selectedCustomers.forEach(customerId => {
                      // Move customer to bad data (handled in App.tsx through onMoveToBadData prop if available)
                      console.log(`Moving customer ${customerId} to bad data with reason: ${reason}`);
                    });
                    setSelectedCustomers([]);
                    alert(`✅ Đã chuyển ${selectedCustomers.length} khách hàng vào data xấu!\n📝 Lý do: ${reason}`);
                  } else if (action === 'bulk-edit') {
                    // Handle bulk edit - open bulk edit popup
                    setShowBulkEdit(true);
                  } else {
                    console.log(`Bulk action: ${action} for ${selectedCustomers.length} customers`);
                    setSelectedCustomers([]);
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Data Table - Optimized */}
      <div className="flex-1 min-h-0 overflow-auto custom-scrollbar bg-background">
        {/* Show conflict message when filters conflict with group conditions */}
        {hasConflictingFilters && activeGroup !== 'main' && (
          <div className="p-8 text-center bg-muted/10">
            <div className="max-w-lg mx-auto space-y-4">
              <div className="text-muted-foreground">
                <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="h-8 w-8 text-muted-foreground/60" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Không có kết quả
                </h3>
                <p className="text-sm text-muted-foreground">
                  Bộ lọc hiện tại xung đột với điều kiện của nhóm "{customerGroups.find(g => g.id === activeGroup)?.name}".
                  Vui lòng điều chỉnh bộ lọc hoặc chuyển về nhóm "Tổng quan" để xem tất cả dữ liệu.
                </p>
                <div className="mt-6 flex gap-3 justify-center">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setQuickFilters({});
                      setTableFilters({});
                    }}
                    className="h-9"
                  >
                    Xóa bộ lọc
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm"
                    onClick={() => setActiveGroup('main')}
                    className="h-9"
                  >
                    Về tổng quan
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Show normal table when no conflicts */}
        {!hasConflictingFilters && (
          <CustomerTableInlineEditWithAvatar
            customers={currentCustomers}
            selectedCustomers={selectedCustomers}
            onSelectCustomer={handleSelectCustomer}
            onSelectAll={handleSelectAll}
            columns={columns}
            onColumnsChange={handleColumnsChange}
            onFiltersChange={setTableFilters}
            currentFilters={tableFilters}
            onCustomerUpdate={handleCustomerUpdateLocal}
            onCustomerSort={handleCustomerSort}
            onShowDetails={handleShowDetails}
            onCreateReminder={handleCreateReminder}
            onDeleteCustomer={handleDeleteCustomer}
            onMoveToLeadHub={handleMoveToLeadHub}
            onMoveToBadData={handleMoveToBadData}
            onChangeToHot={handleChangeToHot}
            reminders={reminders || []}
          />
        )}
      </div>

      {/* Enhanced Pagination - Compact */}
      <div className="flex-shrink-0 border-t border-border bg-card/30 backdrop-blur-sm">
        <AdvancedPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={localCustomers.length}
        filteredItems={filteredCustomers.length}
        itemsPerPage={itemsPerPage}
        startIndex={startIndex}
        onPageChange={(page) => setCurrentPage(page)}
        onItemsPerPageChange={(items) => {
          setItemsPerPage(items);
          setCurrentPage(1); // Reset to first page
        }}
        itemName="khách hàng"
        showItemsPerPageSelector={true}
        showGoToPage={true}
        showTotalUsers={true}
      />
      </div>

      {/* Popups & Dialogs */}
      {showColumnManager && (
        <ColumnManager 
          columns={columns}
          onColumnsChange={setColumns}
          onClose={() => setShowColumnManager(false)} 
        />
      )}

      <CRMQuickFilterPopup 
        isOpen={showQuickFilter}
        onClose={() => setShowQuickFilter(false)}
        onApply={handleQuickFiltersChange}
        currentFilters={quickFilters}
        customers={customers}
      />

      {showExcelImport && (
        <ExcelImportPopup 
          onClose={() => setShowExcelImport(false)}
          onImport={handleExcelImport}
        />
      )}

      {showBulkEdit && (
        <BulkEditPopup
          isOpen={showBulkEdit}
          onClose={() => setShowBulkEdit(false)}
          columns={columns}
          selectedCustomers={currentCustomers.filter(customer => selectedCustomers.includes(customer.id))}
          onApplyChanges={handleBulkEditApply}
        />
      )}
    </div>
  );
}