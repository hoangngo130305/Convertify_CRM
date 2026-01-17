import { useState, useEffect } from 'react';
import { CRMDashboard } from './components/CRMDashboard';
import { LeadHubDashboard } from './components/LeadHubDashboard';
import { AdsTrackingPage } from './components/AdsTrackingPage';
import { DataFlowDashboard } from './components/DataFlowDashboard';
import { DataSetDashboard } from './components/DataSetDashboard';
import { IntegrationDashboard } from './components/IntegrationDashboard';
import { DashboardPage } from './components/DashboardPage';
import { MainNavigation } from './components/MainNavigation';
import { MobileSidebar } from './components/MobileSidebar';
import { NotesPopup } from './components/NotesPopup';
import { NotificationPopup } from './components/NotificationPopup';
import { TaskPopup } from './components/TaskPopup';
import { SupportPopup } from './components/SupportPopup';
import { FeatureRequestPopup } from './components/FeatureRequestPopup';
import { BugReportPopup } from './components/BugReportPopup';
import { RestoreDataPopupSimple } from './components/RestoreDataPopupSimple';
import { DuplicateDataPopup } from './components/DuplicateDataPopup';
import { PermissionPopup } from './components/PermissionPopup';
import { AutomationPopup } from './components/AutomationPopup';
import { LeadHubAutomationPopup } from './components/LeadHubAutomationPopup';
import { CustomerDetailsPopup } from './components/CustomerDetailsPopup';
import { ReminderPopup } from './components/ReminderPopup';
import { AccountSettingsPage } from './components/AccountSettingsPage';
import { BillingPage } from './components/BillingPage';
import { InviteTeamPage } from './components/InviteTeamPage';
import { SupportFAQsPage } from './components/SupportFAQsPage';
import { DocumentationPage } from './components/DocumentationPage';
import { LoginPage } from './components/LoginPage';
import { LogoutConfirmPopup } from './components/LogoutConfirmPopup';
import { BadDataManagerPopup } from './components/BadDataManagerPopup';
import { RegistrationPopup } from './components/RegistrationPopup';
import { ResponsiveLandingPage } from './components/ResponsiveLandingPage';
import { LoginPopupComplete } from './components/LoginPopupComplete';
import { LoginWithAccountPopupComplete } from './components/LoginWithAccountPopupComplete';
import { MobileLoginPopup } from './components/MobileLoginPopup';
import FloatingCTA from './components/FloatingCTA';
import { Toaster } from './components/ui/sonner';



// Customer Group interfaces
interface CustomerGroupFilter {
  columnId: string;
  columnName: string;
  values: string[];
}

interface CustomerGroup {
  id: string;
  name: string;
  count: number;
  filters: CustomerGroupFilter[];
  memberIds?: string[];
}

// Mock data generation for testing duplicates
const generateMockCustomersWithDuplicates = () => {
  const statuses = ['Mới', 'Đang xử lý', 'Thành công', 'Thất bại']; // Removed 'Lạnh'
  const products = ['Website Design', 'SEO Service', 'Digital Marketing', 'E-commerce'];
  const sources = ['Facebook', 'Google', 'TikTok', 'Zalo', 'Hotline', 'Website', 'Giới thiệu'];
  const sales = ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D', 'Chưa phân bổ'];
  const qualities = ['Hot/Nóng', 'Warm/Ấm', 'Cold/Lạnh']; // New quality options
  
  // Sample tags data
  const sampleTags = [
    { id: 'tag_vip', name: 'VIP', color: '#8b5cf6' },
    { id: 'tag_potential', name: 'Tiềm năng', color: '#a78bfa' },
    { id: 'tag_priority', name: 'Ưu tiên', color: '#c4b5fd' },
    { id: 'tag_wholesale', name: 'Khách sỉ', color: '#ddd6fe' },
    { id: 'tag_retail', name: 'Khách lẻ', color: '#ede9fe' },
    { id: 'tag_enterprise', name: 'Enterprise', color: '#7c3aed' },
    { id: 'tag_loyal', name: 'Trung thành', color: '#6b46c1' }
  ];
  
  const customers = Array.from({ length: 50 }, (_, i) => ({
    id: `KH${String(i + 1).padStart(3, '0')}`,
    name: `Khách hàng ${i + 1}`,
    phone: `098${String(i).padStart(7, '0')}`,
    email: `customer${i + 1}@email.com`,
    products: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => 
      products[Math.floor(Math.random() * products.length)]
    ).filter((product, index, array) => 
      array.findIndex(p => p === product) === index // Remove duplicates
    ),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    source: sources[Math.floor(Math.random() * sources.length)],
    assignedSale: sales[Math.floor(Math.random() * sales.length)],
    createdDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1, Math.floor(Math.random() * 24), Math.floor(Math.random() * 60)),
    notes: `Ghi chú cho khách hàng ${i + 1}`,
    quality: qualities[Math.floor(Math.random() * qualities.length)], // Use new quality format
    questions: `Câu hỏi từ khách hàng ${i + 1}`,
    address: `Địa chỉ ${i + 1}, Hà Nội`,
    revenue: Math.floor(Math.random() * 10000000),
    customFields: {},
    // Add random tags to customers
    tags: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => 
      sampleTags[Math.floor(Math.random() * sampleTags.length)]
    ).filter((tag, index, array) => 
      array.findIndex(t => t.id === tag.id) === index // Remove duplicates
    )
  }));

  // Add some duplicate data for testing
  // Duplicate emails
  customers.push({
    id: 'KH051',
    name: 'Khách hàng trùng email 1',
    phone: '0981234567',
    email: 'customer5@email.com', // Same email as customer 5
    products: ['SEO Service', 'Digital Marketing'],
    status: 'Mới',
    source: 'Facebook',
    assignedSale: 'Nguyễn Văn A',
    createdDate: new Date(2024, 5, 15),
    notes: 'Khách hàng có email trùng lặp',
    quality: 'Hot/Nóng',
    questions: 'Câu hỏi từ khách hàng trùng email',
    address: 'Địa chỉ khác, TP HCM',
    revenue: 5000000,
    customFields: {},
    tags: [sampleTags[0], sampleTags[2]] // VIP, Ưu tiên
  });

  customers.push({
    id: 'KH052',
    name: 'Khách hàng trùng email 2',
    phone: '0987654321',
    email: 'customer5@email.com', // Same email as customer 5
    products: ['Digital Marketing', 'Website Design', 'E-commerce'],
    status: 'Đang xử lý',
    source: 'Google',
    assignedSale: 'Trần Thị B',
    createdDate: new Date(2024, 6, 20),
    notes: 'Khách hàng khác cùng email',
    quality: 'Warm/Ấm',
    questions: 'Thắc mắc về dịch vụ',
    address: 'Địa chỉ thứ 3, Đà Nẵng',
    revenue: 8000000,
    customFields: {},
    tags: [sampleTags[1]] // Tiềm năng
  });

  // Duplicate phones
  customers.push({
    id: 'KH053',
    name: 'Khách hàng trùng SĐT',
    phone: '09800000009', // Same phone as customer 10
    email: 'duplicate.phone@email.com',
    products: ['E-commerce', 'SEO Service'],
    status: 'Thành công',
    source: 'TikTok',
    assignedSale: 'Lê Văn C',
    createdDate: new Date(2024, 7, 10),
    notes: 'Khách hàng có SĐT trùng lặp',
    quality: 'Hot/Nóng',
    questions: 'Hỏi về package',
    address: 'Địa chỉ mới, Hà Nội',
    revenue: 12000000,
    customFields: {},
    tags: [sampleTags[3], sampleTags[6]] // Khách sỉ, Trung thành
  });

  // Both email and phone duplicates
  customers.push({
    id: 'KH054',
    name: 'Khách hàng trùng cả email & SĐT',
    phone: '09800000014', // Same phone as customer 15
    email: 'customer15@email.com', // Same email as customer 15
    products: ['Website Design', 'Mobile App'],
    status: 'Thất bại', // Changed from 'Lạnh' to 'Thất bại'
    source: 'Hotline',
    assignedSale: 'Phạm Thị D',
    createdDate: new Date(2024, 8, 5),
    notes: 'Trùng cả email và SĐT',
    quality: 'Cold/Lạnh',
    questions: 'Quan tâm nhiều dịch vụ',
    address: 'Cùng địa chỉ, Hà Nội',
    revenue: 3000000,
    customFields: {},
    tags: [] // No tags
  });

  // Duplicate names
  customers.push({
    id: 'KH055',
    name: 'Khách hàng 1', // Same name as customer 1
    phone: '0988888888',
    email: 'duplicate.name1@email.com',
    products: ['Digital Marketing'],
    status: 'Mới',
    source: 'Facebook',
    assignedSale: 'Nguyễn Văn A',
    createdDate: new Date(2024, 9, 1),
    notes: 'Khách hàng có tên trùng lặp',
    quality: 'Warm/Ấm',
    questions: 'Hỏi về giá cả',
    address: 'Địa chỉ khác, TP HCM',
    revenue: 4000000,
    customFields: {},
    tags: [sampleTags[4]] // Khách lẻ
  });

  customers.push({
    id: 'KH056',
    name: 'Khách hàng 1', // Same name as customer 1
    phone: '0999999999',
    email: 'duplicate.name2@email.com',
    products: ['SEO Service'],
    status: 'Đang xử lý',
    source: 'Google',
    assignedSale: 'Trần Thị B',
    createdDate: new Date(2024, 9, 10),
    notes: 'Khách hàng cùng tên khác',
    quality: 'Hot/Nóng',
    questions: 'Quan tâm dịch vụ',
    address: 'Địa chỉ thứ ba, Đà Nẵng',
    revenue: 6000000,
    customFields: {},
    tags: [sampleTags[5], sampleTags[1]] // Enterprise, Tiềm năng
  });

  // Add a test customer with merged contact info to verify display logic
  customers.push({
    id: 'KH999',
    name: 'Test - Khách hàng đã gộp thông tin liên hệ',
    phone: '0987654321 | 0123456789', // Merged display format
    email: 'test1@email.com | test2@email.com', // Merged display format
    phoneArray: ['0987654321', '0123456789'], // Array for multiple phones
    emailArray: ['test1@email.com', 'test2@email.com'], // Array for multiple emails
    products: ['Website Design', 'SEO Service'],
    status: 'Thành công',
    source: 'Facebook',
    assignedSale: 'Nguyễn Văn A',
    createdDate: new Date(2024, 10, 15),
    notes: 'Khách hàng test với multiple contacts đã gộp',
    quality: 'Hot/Nóng',
    questions: 'Test question',
    address: 'Test address, Hà Nội',
    revenue: 15000000,
    customFields: {},
    tags: [sampleTags[0], sampleTags[1]] // VIP, Tiềm năng
  });

  return customers;
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<{username: string, loginTime: Date} | null>(null);
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [loginEmail, setLoginEmail] = useState<string>(''); // State để lưu email từ màn hình 1
  const [currentView, setCurrentView] = useState<'dashboard' | 'account-settings' | 'billing' | 'invite-team' | 'support-faqs' | 'documentation'>('dashboard');
  const [currentModule, setCurrentModule] = useState<'dashboard' | 'crm' | 'lead-hub' | 'ads-tracking' | 'dataflow' | 'dataset' | 'integration'>('dashboard'); // New state for navigation
  const [documentationTab, setDocumentationTab] = useState<'videos' | 'documents' | 'faqs'>('videos'); // Updated to include 'faqs'
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [reminderData, setReminderData] = useState<{customerId: string, customerName: string} | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [reminders, setReminders] = useState<any[]>([
    // Mock reminders for testing bell display
    {
      id: 'reminder_1',
      customerId: 'KH001',
      customerName: 'Khách hàng 1',
      content: 'Gọi lại để confirm báo giá',
      reminderDateTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago (overdue)
      notifyDateTime: new Date(Date.now() - 2.5 * 60 * 60 * 1000), // 2.5 hours ago
      reminderBefore: 30,
      status: 'pending',
      createdDate: new Date()
    },
    {
      id: 'reminder_2',
      customerId: 'KH002',
      customerName: 'Khách hàng 2',
      content: 'Follow up về dự án website',
      reminderDateTime: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour from now
      notifyDateTime: new Date(Date.now() - 15 * 60 * 60 * 1000), // 15 minutes ago (due)
      reminderBefore: 30,
      status: 'pending',
      createdDate: new Date()
    },
    {
      id: 'reminder_3',
      customerId: 'KH003',
      customerName: 'Khách hàng 3',
      content: 'Chuẩn bị thuyết trình dự án',
      reminderDateTime: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now (upcoming)
      notifyDateTime: new Date(Date.now() + 3.5 * 60 * 60 * 1000), // 3.5 hours from now
      reminderBefore: 30,
      status: 'pending',
      createdDate: new Date()
    },
    {
      id: 'reminder_4',
      customerId: 'KH001',
      customerName: 'Khách hàng 1',
      content: 'Gửi proposal chi tiết',
      reminderDateTime: new Date(Date.now() - 30 * 60 * 60 * 1000), // 30 minutes ago (overdue)
      notifyDateTime: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      reminderBefore: 30,
      status: 'pending',
      createdDate: new Date()
    }
  ]);
  const [customers, setCustomers] = useState<any[]>(generateMockCustomersWithDuplicates());
  const [deletedCustomers, setDeletedCustomers] = useState<any[]>([]); // New state for restore data
  const [deletedLeads, setDeletedLeads] = useState<any[]>([]); // New state for deleted leads  
  const [badDataLeads, setBadDataLeads] = useState<any[]>([]); // New state for bad data leads
  const [automationSettings, setAutomationSettings] = useState({
    emailOnNewLead: true,
    adminEmail: 'admin@company.com',
    salesEmails: ['sale1@company.com', 'sale2@company.com'],
    defaultTags: [
      { id: '1', name: 'Khách VIP', color: '#8b5cf6' },
      { id: '2', name: 'Khách sỉ', color: '#a78bfa' },
      { id: '3', name: 'Khách lẻ', color: '#c4b5fd' }
    ],
    defaultProducts: [
      { id: '1', name: 'Website Design', price: 10000000 },
      { id: '2', name: 'SEO Service', price: 5000000 },
      { id: '3', name: 'Digital Marketing', price: 8000000 }
    ],
    salesReminder: {
      enabled: true,
      minutes: 60
    },
    dataAssignment: {
      enabled: true,
      mode: 'round-robin'
    },
    revenueCalculation: {
      enabled: true
    },
    emailNotification: {
      enabled: true,
      adminEmail: 'admin@company.com',
      salesEmails: ['sale1@company.com', 'sale2@company.com']
    },
    customerGroups: {
      groups: [
        {
          id: 'default_1',
          name: 'Khách tiềm năng',
          description: 'Khách hàng có khả năng mua cao, cần theo dõi sát sao',
          isDefault: true,
          createdBy: 'admin',
          color: '#8b5cf6',
          canEdit: true,
          filters: [
            {
              columnId: 'status',
              columnName: 'Trạng thái',
              values: ['Mới', 'Đang xử lý']
            }
          ]
        },
        {
          id: 'default_2', 
          name: 'Khách thân thiết',
          description: 'Khách hàng đã mua nhiều lần, có giá trị cao',
          isDefault: true,
          createdBy: 'admin',
          color: '#a78bfa',
          canEdit: true,
          filters: [
            {
              columnId: 'revenue',
              columnName: 'Doanh thu',
              values: ['> 5,000,000']
            }
          ]
        },
        {
          id: 'default_3',
          name: 'Khách ưu tiên',
          description: 'Khách hàng VIP, cần chăm sóc đặc biệt',
          isDefault: true,
          createdBy: 'admin',
          color: '#c4b5fd',
          canEdit: true,
          filters: [
            {
              columnId: 'tags',
              columnName: 'Tags',
              values: ['VIP', 'Enterprise']
            }
          ]
        }
      ],
      allowPersonalGroups: true
    },
    // Lead Hub Quality Check Settings
    leadQualityCheck: {
      enabled: true,
      autoCheckOnNewLead: true,
      emptyQualityAction: 'warning', // 'warning' hoặc 'move-to-crm'
      warningTimeout: 24, // Hours to wait before taking action
      notifications: {
        enabled: true,
        emailOnWarning: true,
        emailOnMoveToCRM: true
      },
      qualityOptions: ['Hot/Nóng', 'Warm/Ấm', 'Cold/Lạnh'],
      defaultQualityForNew: null, // null means require manual input
      goodQualityTypes: ['Hot/Nóng', 'Warm/Ấm'], // Data tốt
      badQualityTypes: ['Cold/Lạnh'] // Data xấu
    }
  });

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Background check for quality warning timeouts
  useEffect(() => {
    if (!automationSettings.leadQualityCheck?.enabled) return;
    
    const interval = setInterval(() => {
      handleQualityWarningTimeout();
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [automationSettings.leadQualityCheck?.enabled, automationSettings.leadQualityCheck?.warningTimeout, automationSettings.leadQualityCheck?.emptyQualityAction]);

  const openPopup = (popup: string) => setActivePopup(popup);
  const closePopup = () => {
    setActivePopup(null);
    setSelectedCustomer(null);
    setReminderData(null);
  };

  const openAccountSettings = () => {
    setCurrentView('account-settings');
  };

  const openBilling = () => {
    setCurrentView('billing');
  };

  const openInviteTeam = () => {
    setCurrentView('invite-team');
  };

  const openDocumentation = (type?: 'videos' | 'documents' | 'faqs') => {
    setDocumentationTab(type || 'videos'); // Set the tab based on the type parameter
    setCurrentView('documentation');
  };

  const openFAQs = () => {
    setCurrentView('support-faqs');
  };

  const backToDashboard = () => {
    setCurrentView('dashboard');
  };

  const openCustomerDetails = (customer: any) => {
    setSelectedCustomer(customer);
    setActivePopup('customer-details');
  };

  const openReminderPopup = (customerId: string, customerName: string) => {
    setReminderData({ customerId, customerName });
    setActivePopup('reminder');
  };

  // Automation: Send email when new lead is created
  const sendNewLeadEmail = (customer: any) => {
    if (!automationSettings.emailNotification.enabled) return;

    // Mock email sending - in real app, this would call an API
    console.log('📧 Sending new lead email notification...');
    console.log('To:', [...automationSettings.emailNotification.salesEmails, automationSettings.emailNotification.adminEmail]);
    console.log('Subject: 🚨 Lead mới từ', customer.source);
    console.log('Customer:', customer);
    
    // Simulate email content
    const emailContent = {
      to: [...automationSettings.emailNotification.salesEmails, automationSettings.emailNotification.adminEmail],
      subject: `🚨 Lead mới từ ${customer.source} - ${customer.name}`,
      body: `
        Có lead mới vừa được tạo trong hệ thống CRM:
        
        👤 Tên: ${customer.name}
        📞 SĐT: ${customer.phone}
        📧 Email: ${customer.email}
        🏢 Sản phẩm/Dịch vụ: ${customer.products.join(', ')}
        📍 Nguồn: ${customer.source}
        📊 Trạng thái: ${customer.status}
        👨‍💼 Sale phụ trách: ${customer.assignedSale}
        📅 Thời gian: ${new Date().toLocaleString('vi-VN')}
        
        Vui lòng xử lý lead này trong thời gian sớm nhất.
        
        Xem chi tiết tại: [Link to CRM System]
      `
    };
    
    // Show notification that email was sent
    alert(`📧 Đã gửi thông báo lead mới qua email!\n\nTới: ${emailContent.to.join(', ')}\nChủ đề: ${emailContent.subject}`);
  };

  // Handle automation settings update
  const handleUpdateAutomationSettings = (newSettings: any) => {
    setAutomationSettings({
      ...automationSettings,
      ...newSettings
    });
    console.log('✅ Automation settings updated:', newSettings);
  };

  // Handle customer creation with automation
  const handleCreateCustomer = (newCustomer: any, targetGroup?: string) => {
    // Ensure status is always "Mới" for new customers
    let customerWithNewStatus = {
      ...newCustomer,
      status: 'Mới' // Always set status to "Mới" for new customers
    };
    
    // Apply Lead Hub quality check if in Lead Hub module
    if (currentModule === 'lead-hub') {
      customerWithNewStatus = checkLeadQuality(customerWithNewStatus);
      
      // Send warning email if lead moved to Warning status
      if (customerWithNewStatus.status === 'Waning') {
        sendQualityWarningEmail(customerWithNewStatus);
      }
    }
    
    // Add customer to state
    setCustomers(prev => [customerWithNewStatus, ...prev]);
    
    // Trigger automation for new lead if status is "Mới"
    if (customerWithNewStatus.status === 'Mới') {
      sendNewLeadEmail(customerWithNewStatus);
    }
    
    // Log the group assignment for future integration
    if (targetGroup && targetGroup !== 'main') {
      console.log(`Customer ${customerWithNewStatus.id} assigned to group: ${targetGroup}`);
    }
    
    // Log quality check result
    if (currentModule === 'lead-hub' && automationSettings.leadQualityCheck?.enabled) {
      console.log(`🔍 Lead quality check applied to "${customerWithNewStatus.name}":`, {
        finalStatus: customerWithNewStatus.status,
        quality: customerWithNewStatus.quality,
        hasWarning: !!customerWithNewStatus.qualityWarningDate
      });
    }
  };

  // Lead Quality Check Functions
  const checkLeadQuality = (lead: any) => {
    if (!automationSettings.leadQualityCheck?.enabled) return lead;
    
    // Check if lead is new and quality is empty/missing
    if (lead.status === 'Mới' && (!lead.quality || lead.quality === '')) {
      console.log(`🔍 Lead "${lead.name}" is new but missing quality, checking automation settings...`);
      
      const qualitySettings = automationSettings.leadQualityCheck;
      
      if (qualitySettings.emptyQualityAction === 'warning') {
        // Set status to Warning and track warning time
        return {
          ...lead,
          status: 'Waning', // Corrected typo from original request
          quality: '', // Keep empty to indicate needs manual input
          qualityWarningDate: new Date(),
          qualityWarningReason: 'Chưa điền chất lượng lead'
        };
      } else if (qualitySettings.emptyQualityAction === 'move-to-crm') {
        // Automatically move to CRM
        return {
          ...lead,
          status: 'Đã chuyển CRM',
          quality: 'Warm/Ấm', // Default quality when moving to CRM
          movedToCRMDate: new Date(),
          movedToCRMReason: 'Tự động chuyển do chưa điền chất lượng'
        };
      }
    }
    
    return lead;
  };

  const handleQualityWarningTimeout = () => {
    if (!automationSettings.leadQualityCheck?.enabled) return;
    
    const warningTimeoutHours = automationSettings.leadQualityCheck.warningTimeout || 24;
    const cutoffTime = new Date(Date.now() - warningTimeoutHours * 60 * 60 * 1000);
    
    setCustomers(prev => prev.map(customer => {
      // Check if customer is in Warning status and timeout has passed
      if (customer.status === 'Waning' && 
          customer.qualityWarningDate && 
          new Date(customer.qualityWarningDate) < cutoffTime &&
          automationSettings.leadQualityCheck?.emptyQualityAction === 'move-to-crm') {
        
        console.log(`⏰ Warning timeout reached for lead "${customer.name}", moving to CRM`);
        
        // Automatically move to CRM after timeout
        return {
          ...customer,
          status: 'Đã chuyển CRM',
          quality: 'Warm/Ấm',
          movedToCRMDate: new Date(),
          movedToCRMReason: 'Tự động chuyển sau khi hết thời gian cảnh báo',
          qualityWarningDate: undefined,
          qualityWarningReason: undefined
        };
      }
      return customer;
    }));
  };

  const sendQualityWarningEmail = (lead: any) => {
    if (!automationSettings.leadQualityCheck?.notifications?.enabled || 
        !automationSettings.leadQualityCheck?.notifications?.emailOnWarning) return;

    console.log('📧 Sending quality warning email for lead:', lead.name);
    
    const emailContent = {
      subject: `⚠️ Cảnh báo: Lead "${lead.name}" chưa điền chất lượng`,
      body: `
        Lead mới cần được đánh giá chất lượng:
        
        👤 Tên: ${lead.name}
        📞 SĐT: ${lead.phone}
        📧 Email: ${lead.email}
        🏢 Sản phẩm/Dịch vụ: ${lead.products?.join(', ') || 'N/A'}
        📍 Nguồn: ${lead.source}
        📊 Trạng thái: ${lead.status}
        ⚠️ Cảnh báo: Chưa điền chất lượng lead
        📅 Thời gian cảnh báo: ${new Date().toLocaleString('vi-VN')}
        
        Vui lòng đánh giá chất lượng lead này trong thời gian sớm nhất.
        Nếu không được xử lý trong ${automationSettings.leadQualityCheck?.warningTimeout || 24} giờ, 
        lead sẽ ${automationSettings.leadQualityCheck?.emptyQualityAction === 'move-to-crm' ? 'tự động chuyển vào CRM' : 'tiếp tục ở trạng thái cảnh báo'}.
      `
    };
    
    alert(`📧 Đã gửi email cảnh báo chất lượng lead!\n\nLead: ${lead.name}\nChủ đề: ${emailContent.subject}`);
  };

  const handleCustomerUpdate = (customerId: string, field: string, value: any) => {
    setCustomers(prev => prev.map(customer => {
      if (customer.id === customerId) {
        const updatedCustomer = {
          ...customer,
          [field]: value
        };
        
        // Special handling for quality field updates in Lead Hub
        if (field === 'quality' && currentModule === 'lead-hub') {
          // If quality is being set and customer was in Warning status, clear warning
          if (customer.status === 'Waning' && value && value !== '') {
            updatedCustomer.status = 'Mới'; // Reset to new status
            updatedCustomer.qualityWarningDate = undefined;
            updatedCustomer.qualityWarningReason = undefined;
            
            console.log(`✅ Quality "${value}" assigned to lead "${customer.name}", cleared warning status`);
          }
        }
        
        // Special handling for status changes
        if (field === 'status') {
          // If changing from Warning to another status, clear warning metadata
          if (customer.status === 'Waning' && value !== 'Waning') {
            updatedCustomer.qualityWarningDate = undefined;
            updatedCustomer.qualityWarningReason = undefined;
          }
          
          // Trigger automation if status changed to 'Mới' (new lead)
          if (value === 'Mới' && customer.status !== 'Mới') {
            sendNewLeadEmail(updatedCustomer);
          }
        }
        
        return updatedCustomer;
      }
      return customer;
    }));
  };

  // Handle merge duplicates
  const handleMergeCustomers = (duplicateGroups: any[], mergeOptions: any[]) => {
    console.log('Merging customers:', duplicateGroups, mergeOptions);
    
    // Apply merge logic
    let updatedCustomers = [...customers];
    let totalMergedContacts = 0;
    
    mergeOptions.forEach((option, index) => {
      const group = duplicateGroups[index];
      if (!group || !option) return;
      
      // Update the primary customer with merged data
      const primaryIndex = updatedCustomers.findIndex(c => c.id === option.primaryCustomerId);
      if (primaryIndex !== -1) {
        const mergedCustomer = { ...option.mergedData };
        
        // Log merge details for debugging
        if (option.mergeRevenueOption && mergedCustomer.phoneArray?.length > 1) {
          console.log(`📱 Merged phones for ${mergedCustomer.name}:`, mergedCustomer.phoneArray);
          totalMergedContacts += mergedCustomer.phoneArray.length - 1;
        }
        if (option.mergeRevenueOption && mergedCustomer.emailArray?.length > 1) {
          console.log(`📧 Merged emails for ${mergedCustomer.name}:`, mergedCustomer.emailArray);
          totalMergedContacts += mergedCustomer.emailArray.length - 1;
        }
        
        updatedCustomers[primaryIndex] = mergedCustomer;
      }
      
      // Remove the duplicate customers
      updatedCustomers = updatedCustomers.filter(c => !option.deleteIds.includes(c.id));
    });
    
    setCustomers(updatedCustomers);
    
    // Enhanced success message with contact merge info
    let successMessage = `✅ Đã hợp nhất thành công ${mergeOptions.length} nhóm dữ liệu trùng lặp!`;
    
    if (totalMergedContacts > 0) {
      successMessage += `\n\n📱 Gộp thành công ${totalMergedContacts} thông tin liên hệ bổ sung`;
      successMessage += `\n💡 Các số điện thoại và email được hiển thị dạng: "Thông tin 1 | Thông tin 2"`;
    }
    
    const hasRevenueActivated = mergeOptions.some(option => option.mergeRevenueOption);
    if (hasRevenueActivated) {
      const totalMergedRevenue = mergeOptions.reduce((sum, option) => {
        return sum + (option.mergedData?.revenue || 0);
      }, 0);
      successMessage += `\n\n💰 Tổng doanh thu sau gộp: ${new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
      }).format(totalMergedRevenue)}`;
    }
    
    alert(successMessage);
  };

  // Handle create reminder
  const handleCreateReminder = (reminderData: any) => {
    const newReminder = {
      id: `reminder_${Date.now()}`,
      ...reminderData,
      status: 'pending',
      createdDate: new Date()
    };
    
    setReminders(prev => [...prev, newReminder]);
    console.log('Reminder created:', newReminder);
    alert(`Đã tạo nhắc nhở cho khách hàng ${reminderData.customerName}!`);
  };

  // Handle delete customer - move to restore data instead of permanent delete
  const handleDeleteCustomer = (customerId: string) => {
    const customerToDelete = customers.find(c => c.id === customerId);
    if (!customerToDelete) return;

    // Move customer/lead to appropriate deleted list with deletion timestamp
    const deletedItem = {
      ...customerToDelete,
      deletedAt: new Date(),
      deletedBy: 'current_user' // In real app, this would be the actual user
    };

    // Determine which list to add to based on current module
    if (currentModule === 'lead-hub') {
      // Add to deleted leads
      setDeletedLeads(prev => [deletedItem, ...prev]);
      console.log(`Lead ${customerToDelete.name} moved to restore data`);
      alert(`Đã xóa lead "${customerToDelete.name}" và di chuyển vào thùng rác. Bạn có thể khôi phục từ "Khôi phục dữ liệu".`);
    } else {
      // Add to deleted customers (for CRM module)
      setDeletedCustomers(prev => [deletedItem, ...prev]);
      console.log(`Customer ${customerToDelete.name} moved to restore data`);
      alert(`Đã xóa khách hàng "${customerToDelete.name}" và di chuyển vào thùng rác. Bạn có thể khôi phục từ "Khôi phục dữ liệu".`);
    }
    
    // Remove from active customers
    setCustomers(prev => prev.filter(c => c.id !== customerId));
  };

  // Handle restore customer from deleted customers
  const handleRestoreCustomer = (customerId: string) => {
    const customerToRestore = deletedCustomers.find(c => c.id === customerId);
    if (!customerToRestore) return;

    // Create restored customer without deletion metadata
    const restoredCustomer = {
      ...customerToRestore,
      deletedAt: undefined,
      deletedBy: undefined
    };

    // Add back to active customers
    setCustomers(prev => [restoredCustomer, ...prev]);
    
    // Remove from deleted customers
    setDeletedCustomers(prev => prev.filter(c => c.id !== customerId));
    
    console.log(`Customer ${customerToRestore.name} restored successfully`);
  };

  // Handle permanent delete customer
  const handlePermanentDeleteCustomer = (customerId: string) => {
    const customerToDelete = deletedCustomers.find(c => c.id === customerId);
    if (!customerToDelete) return;

    // Remove permanently from deleted customers
    setDeletedCustomers(prev => prev.filter(c => c.id !== customerId));
    
    console.log(`Customer ${customerToDelete.name} permanently deleted`);
  };

  // Handle restore multiple customers
  const handleRestoreMultipleCustomers = (customerIds: string[]) => {
    const customersToRestore = deletedCustomers.filter(c => customerIds.includes(c.id));
    
    // Create restored customers without deletion metadata
    const restoredCustomers = customersToRestore.map(customer => ({
      ...customer,
      deletedAt: undefined,
      deletedBy: undefined
    }));

    // Add back to active customers
    setCustomers(prev => [...restoredCustomers, ...prev]);
    
    // Remove from deleted customers
    setDeletedCustomers(prev => prev.filter(c => !customerIds.includes(c.id)));
    
    console.log(`${customersToRestore.length} customers restored successfully`);
  };

  // Handle permanent delete multiple customers
  const handlePermanentDeleteMultipleCustomers = (customerIds: string[]) => {
    const customersToDelete = deletedCustomers.filter(c => customerIds.includes(c.id));
    
    // Remove permanently from deleted customers
    setDeletedCustomers(prev => prev.filter(c => !customerIds.includes(c.id)));
    
    console.log(`${customersToDelete.length} customers permanently deleted`);
  };

  // Handle restore lead from deleted leads
  const handleRestoreLead = (leadId: string) => {
    const leadToRestore = deletedLeads.find(l => l.id === leadId);
    if (!leadToRestore) return;

    // Create restored lead without deletion metadata
    const restoredLead = {
      ...leadToRestore,
      deletedAt: undefined,
      deletedBy: undefined
    };

    // Add back to active customers (leads are stored in customers array)
    setCustomers(prev => [restoredLead, ...prev]);
    
    // Remove from deleted leads
    setDeletedLeads(prev => prev.filter(l => l.id !== leadId));
    
    console.log(`Lead ${leadToRestore.name} restored successfully`);
  };

  // Handle permanent delete lead
  const handlePermanentDeleteLead = (leadId: string) => {
    const leadToDelete = deletedLeads.find(l => l.id === leadId);
    if (!leadToDelete) return;

    // Remove permanently from deleted leads
    setDeletedLeads(prev => prev.filter(l => l.id !== leadId));
    
    console.log(`Lead ${leadToDelete.name} permanently deleted`);
  };

  // Handle restore multiple leads
  const handleRestoreMultipleLeads = (leadIds: string[]) => {
    const leadsToRestore = deletedLeads.filter(l => leadIds.includes(l.id));
    
    // Create restored leads without deletion metadata
    const restoredLeads = leadsToRestore.map(lead => ({
      ...lead,
      deletedAt: undefined,
      deletedBy: undefined
    }));

    // Add back to active customers (leads are stored in customers array)
    setCustomers(prev => [...restoredLeads, ...prev]);
    
    // Remove from deleted leads
    setDeletedLeads(prev => prev.filter(l => !leadIds.includes(l.id)));
    
    console.log(`${leadsToRestore.length} leads restored successfully`);
  };

  // Handle permanent delete multiple leads
  const handlePermanentDeleteMultipleLeads = (leadIds: string[]) => {
    const leadsToDelete = deletedLeads.filter(l => leadIds.includes(l.id));
    
    // Remove permanently from deleted leads
    setDeletedLeads(prev => prev.filter(l => !leadIds.includes(l.id)));
    
    console.log(`${leadsToDelete.length} leads permanently deleted`);
  };

  // Handle move lead to bad data with original module tracking and original status
  const handleMoveToBadData = (leadId: string, reason?: string) => {
    const leadToMove = customers.find(c => c.id === leadId);
    if (!leadToMove) return;

    // Move lead to bad data with additional metadata including original module and status
    const badDataLead = {
      ...leadToMove,
      originalStatus: leadToMove.status, // Save original status
      originalQuality: leadToMove.quality, // Save original quality
      quality: 'Cold/Lạnh', // Ensure quality is set to Cold
      status: 'Data xấu', // Update status
      badDataReason: reason || 'Không có nhu cầu',
      movedToBadDataDate: new Date(),
      movedToBadDataBy: 'current_user', // In real app, this would be the actual user
      originalModule: currentModule // Track which module the lead came from
    };

    // Add to bad data
    setBadDataLeads(prev => [badDataLead, ...prev]);
    
    // Remove from active customers
    setCustomers(prev => prev.filter(c => c.id !== leadId));
    
    console.log(`Lead ${leadToMove.name} moved to bad data from ${currentModule}`);
    const moduleDisplayName = currentModule === 'crm' ? 'CRM' : 'Lead Hub';
    alert(`✅ Đã chuyển lead "${leadToMove.name}" vào data xấu!\n\n📍 Từ module: ${moduleDisplayName}\n📝 Lý do: ${reason || 'Không có nhu cầu'}\n\n💡 Bạn có thể khôi phục từ "Quản lý Data Xấu".`);
  };

  // Handle restore lead from bad data with target module - restore with original status only
  const handleRestoreFromBadData = (leadId: string, newStatus?: string, targetModule?: 'crm' | 'leadhub') => {
    const leadToRestore = badDataLeads.find(l => l.id === leadId);
    if (!leadToRestore) return;

    // Determine target module - only allow original module or explicitly chosen module
    const moduleToRestore = targetModule || leadToRestore.originalModule || 'leadhub';
    
    // For original status restoration, use original status and quality
    const shouldUseOriginal = !newStatus || newStatus === 'original';
    
    // Create restored lead - use either original status or specified new status
    const restoredLead = {
      ...leadToRestore,
      status: shouldUseOriginal ? (leadToRestore.originalStatus || 'Mới') : newStatus,
      quality: shouldUseOriginal ? (leadToRestore.originalQuality || 'Warm/Ấm') : 
               (newStatus === 'Mới' || newStatus === 'Đang xử lí' ? 'Warm/Ấm' : leadToRestore.originalQuality || 'Warm/Ấm'),
      // Remove bad data specific fields
      badDataReason: undefined,
      movedToBadDataDate: undefined,
      movedToBadDataBy: undefined,
      originalStatus: undefined,
      originalQuality: undefined
    };

    // Add back to active customers (in a real implementation, this would route to the correct module)
    setCustomers(prev => [restoredLead, ...prev]);
    
    // Remove from bad data
    setBadDataLeads(prev => prev.filter(l => l.id !== leadId));
    
    console.log(`Lead ${leadToRestore.name} restored to ${moduleToRestore} with status: ${restoredLead.status}`);
    
    // Show appropriate message based on target module and restoration type
    const moduleDisplayName = moduleToRestore === 'crm' ? 'CRM' : 'Lead Hub';
    const isOriginalRestore = shouldUseOriginal;
    const restoreMessage = isOriginalRestore 
      ? `✅ Đã khôi phục lead "${leadToRestore.name}" về trạng thái ban đầu!\n\n🎯 Module: ${moduleDisplayName}\n📊 Trạng thái: ${restoredLead.status} (trạng thái gốc)\n🔥 Chất lượng: ${restoredLead.quality} (chất lượng gốc)\n⏰ Thời gian: ${new Date().toLocaleString('vi-VN')}`
      : `✅ Đã chuyển lead "${leadToRestore.name}" sang module mới!\n\n🎯 Module: ${moduleDisplayName}\n📊 Trạng thái: ${restoredLead.status}\n🔥 Chất lượng: ${restoredLead.quality}\n⏰ Thời gian: ${new Date().toLocaleString('vi-VN')}`;
    
    alert(restoreMessage);
  };

  // Handle permanent delete from bad data
  const handlePermanentDeleteBadData = (leadId: string) => {
    const leadToDelete = badDataLeads.find(l => l.id === leadId);
    if (!leadToDelete) return;

    // Remove permanently from bad data
    setBadDataLeads(prev => prev.filter(l => l.id !== leadId));
    
    console.log(`Lead ${leadToDelete.name} permanently deleted from bad data`);
    alert(`Đã xóa vĩnh viễn lead "${leadToDelete.name}" khỏi hệ thống.`);
  };

  // Handle move lead to CRM (Customer system) - IMMEDIATE ACTION
  const handleMoveToCRM = (leadId: string) => {
    const leadToMove = customers.find(c => c.id === leadId);
    if (!leadToMove) return;

    // Check if already moved to CRM
    if (leadToMove.status === 'Đã chuyển CRM') {
      alert(`⚠️ Lead "${leadToMove.name}" đã được chuyển vào CRM rồi!\n\n📅 Thời gian chuyển: ${leadToMove.movedToCRMDate ? new Date(leadToMove.movedToCRMDate).toLocaleString('vi-VN') : 'Không xác định'}`);
      return;
    }

    // Update lead status to indicate it's been moved to CRM immediately
    const updatedLead = {
      ...leadToMove,
      status: 'Đã chuyển CRM',
      quality: leadToMove.quality || 'Warm/Ấm', // Keep existing quality or default to Warm if empty
      movedToCRMDate: new Date(),
      movedToCRMBy: 'current_user' // In real app, this would be the actual user
    };

    // Update in customers list immediately
    setCustomers(prev => prev.map(c => 
      c.id === leadId ? updatedLead : c
    ));
    
    console.log(`Lead ${leadToMove.name} moved to CRM immediately`);
    
    // Show success message without confirmation
    alert(`✅ Đã chuyển lead "${leadToMove.name}" vào CRM thành công!\n\n📊 Trạng thái: Đã chuyển CRM\n🔥 Chất lượng: Hot/Nóng\n⏰ Thời gian: ${new Date().toLocaleString('vi-VN')}`);
  };

  // Authentication handlers
  const handleLogin = (username: string, password: string) => {
    // Set login state
    setIsLoggedIn(true);
    setUserInfo({
      username,
      loginTime: new Date()
    });
    
    console.log('User logged in:', { username, loginTime: new Date() });
    alert(`✅ Đăng nhập thành công!\n\nChào mừng ${username} quay trở lại hệ thống CRM.`);
  };

  const handleLogout = () => {
    openPopup('logout-confirm');
  };

  const handleLogoutConfirm = () => {
    // Clear session data
    setIsLoggedIn(false);
    setUserInfo(null);
    
    // Reset all states to initial values
    setActivePopup(null);
    setCurrentView('dashboard');
    setSelectedCustomer(null);
    setReminderData(null);
    
    // Clear browser session storage (in real app)
    // sessionStorage.clear();
    // localStorage.removeItem('authToken');
    
    console.log('User logged out, session cleared');
    alert('✅ Đã đăng xuất thành công!\n\nCảm ơn bạn đã sử dụng hệ thống CRM.');
  };

  // Navigation handler
  const handleModuleNavigation = (module: 'dashboard' | 'crm' | 'lead-hub' | 'ads-tracking' | 'dataflow' | 'dataset' | 'integration') => {
    setCurrentModule(module);
    // Reset current view to dashboard when switching modules
    setCurrentView('dashboard');
  };

  // Handler for Landing Page register button - opens login popup
  const handleRegisterClick = () => {
    setActivePopup('login');
  };

  // Handler for successful login from Facebook/Google
  const handleLoginSuccess = (username: string, email?: string, loginMethod?: string) => {
    setIsLoggedIn(true);
    setUserInfo({
      username,
      loginTime: new Date()
    });
    setActivePopup(null);
    
    console.log(`User logged in via ${loginMethod}:`, { username, email, loginTime: new Date() });
    
    // Auto open registration popup after 30 seconds
    setTimeout(() => {
      setActivePopup('registration');
    }, 30000);
  };

  // Handler to switch to account login popup (email/password login)
  const handleSwitchToAccountLogin = (email?: string) => {
    if (email) {
      setLoginEmail(email);
      console.log('📧 [Email Saved] Email được lưu để chuyển sang màn hình 2:', email);
    }
    setActivePopup('login-account');
  };

  // Show Landing Page if not logged in
  if (!isLoggedIn) {
    return (
      <div className="relative min-h-screen">
        {/* Landing Page - only show when no popup is active */}
        {!activePopup && <ResponsiveLandingPage onRegisterClick={handleRegisterClick} />}
        
        {/* Floating CTA Button - chỉ hiển thị trên mobile và khi không có popup */}
        {!activePopup && isMobile && (
          <FloatingCTA onClick={() => {
            const element = document.getElementById('pricing');
            element?.scrollIntoView({ behavior: 'smooth' });
          }} />
        )}
        
        {/* Login Popup Overlay with White Background */}
        {activePopup === 'login' && (
          <>
            {isMobile ? (
              <MobileLoginPopup
                onClose={() => setActivePopup(null)}
                onLoginSuccess={handleLoginSuccess}
              />
            ) : (
              <div className="fixed inset-0 z-[200] bg-white animate-fadeIn">
                <LoginPopupComplete
                  onClose={() => setActivePopup(null)}
                  onSwitchToAccountLogin={handleSwitchToAccountLogin}
                  onLoginSuccess={handleLoginSuccess}
                />
              </div>
            )}
          </>
        )}
        
        {/* Account Login Popup (for email/password) with White Background */}
        {activePopup === 'login-account' && (
          <div className="fixed inset-0 z-[200] bg-white animate-fadeIn">
            <LoginWithAccountPopupComplete
              onClose={() => setActivePopup(null)}
              onBack={() => setActivePopup('login')}
              onLoginSuccess={handleLoginSuccess}
              email={loginEmail}
            />
          </div>
        )}
        
        {/* Toast notifications */}
        <Toaster position="top-right" richColors />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 antialiased">
      {/* Enhanced Loading Animation */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        <div className="absolute top-4 right-4 opacity-0 animate-pulse">
          <div className="w-2 h-2 bg-primary/20 rounded-full"></div>
        </div>
      </div>

      {currentView === 'dashboard' ? (
        <div className="flex h-screen relative overflow-hidden">
          {/* Mobile Sidebar - Only visible on mobile */}
          <MobileSidebar 
            currentView={currentModule}
            onNavigate={handleModuleNavigation}
            onOpenRegistration={() => openPopup('registration')}
          />

          {/* Desktop Navigation Sidebar - Only visible on desktop */}
          <div className="flex-shrink-0 z-30 relative">
            <div className="absolute inset-y-0 -right-px w-px bg-gradient-to-b from-transparent via-border to-transparent opacity-60"></div>
            <MainNavigation 
              currentView={currentModule}
              onNavigate={handleModuleNavigation}
              onOpenRegistration={() => openPopup('registration')}
            />
          </div>
          
          {/* Enhanced Main Content Area */}
          <div className="flex-1 overflow-auto relative bg-gradient-to-br from-background/95 to-muted/10 backdrop-blur-[1px] pt-[60px] md:pt-0">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-secondary/5 to-primary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Content with enhanced transitions */}
            <div className="relative z-10 transition-all duration-500 ease-out">
              {currentModule === 'dashboard' ? (
                <div className="animate-fadeIn">
                  <DashboardPage 
                    customers={customers}
                    onOpenCustomerDetails={openCustomerDetails}
                    onOpenRegistration={() => openPopup('registration')}
                  />
                </div>
              ) : currentModule === 'crm' ? (
                <div className="animate-slideInRight">
                  <CRMDashboard 
                    onOpenPopup={openPopup}
                    onOpenRestoreData={() => openPopup('restore-data')}
                    onOpenDuplicateData={() => openPopup('duplicate-data')}
                    onOpenPermissions={() => openPopup('permissions')}
                    onOpenAutomation={() => openPopup('automation')}
                    onOpenCustomerDetails={openCustomerDetails}
                    onOpenReminder={openReminderPopup}
                    onOpenAccountSettings={openAccountSettings}
                    onOpenBilling={openBilling}
                    onOpenInviteTeam={openInviteTeam}
                    onLogout={handleLogout}
                    onCreateCustomer={handleCreateCustomer}
                    onCustomerUpdate={handleCustomerUpdate}
                    onDeleteCustomer={handleDeleteCustomer}
                    customers={customers}
                    reminders={reminders}
                  />
                </div>
              ) : currentModule === 'lead-hub' ? (
                <div className="animate-slideInRight">
                  <LeadHubDashboard 
                    onOpenPopup={openPopup}
                    onOpenRestoreData={() => openPopup('restore-data')}
                    onOpenDuplicateData={() => openPopup('duplicate-data')}
                    onOpenPermissions={() => openPopup('permissions')}
                    onOpenAutomation={() => openPopup('automation')}
                    onOpenBadDataManager={() => openPopup('bad-data-manager')}
                    onOpenCustomerDetails={openCustomerDetails}
                    onOpenReminder={openReminderPopup}
                    onOpenAccountSettings={openAccountSettings}
                    onOpenBilling={openBilling}
                    onOpenInviteTeam={openInviteTeam}
                    onLogout={handleLogout}
                    onCreateCustomer={handleCreateCustomer}
                    onCustomerUpdate={handleCustomerUpdate}
                    onDeleteCustomer={handleDeleteCustomer}
                    onMoveToBadData={handleMoveToBadData}
                    onMoveToCustomer={handleMoveToCRM}
                    customers={customers}
                    reminders={reminders}
                    badDataCount={badDataLeads.length}
                  />
                </div>
              ) : currentModule === 'ads-tracking' ? (
                <div className="animate-slideInRight">
                  <AdsTrackingPage 
                    onOpenPopup={openPopup}
                    onOpenAccountSettings={openAccountSettings}
                    onOpenBilling={openBilling}
                    onOpenInviteTeam={openInviteTeam}
                    onLogout={handleLogout}
                  />
                </div>
              ) : currentModule === 'dataflow' ? (
                <div className="animate-slideInRight">
                  <DataFlowDashboard 
                    onOpenPopup={openPopup}
                    onOpenAccountSettings={openAccountSettings}
                    onOpenBilling={openBilling}
                    onOpenInviteTeam={openInviteTeam}
                    onLogout={handleLogout}
                  />
                </div>
              ) : currentModule === 'dataset' ? (
                <div className="animate-slideInRight">
                  <DataSetDashboard 
                    onOpenPopup={openPopup}
                    onOpenAccountSettings={openAccountSettings}
                    onOpenBilling={openBilling}
                    onOpenInviteTeam={openInviteTeam}
                    onLogout={handleLogout}
                  />
                </div>
              ) : (
                <div className="animate-slideInRight">
                  <IntegrationDashboard 
                    onOpenPopup={openPopup}
                    onOpenAccountSettings={openAccountSettings}
                    onOpenBilling={openBilling}
                    onOpenInviteTeam={openInviteTeam}
                    onLogout={handleLogout}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="animate-fadeIn">
          {/* Enhanced Other Views */}
          {currentView === 'account-settings' && (
            <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
              <AccountSettingsPage onClose={backToDashboard} />
            </div>
          )}
          {currentView === 'billing' && (
            <div className="min-h-screen bg-gradient-to-br from-background to-accent/10">
              <BillingPage onClose={backToDashboard} />
            </div>
          )}
          {currentView === 'invite-team' && (
            <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
              <InviteTeamPage onClose={backToDashboard} />
            </div>
          )}
          {currentView === 'support-faqs' && (
            <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
              <SupportFAQsPage onClose={backToDashboard} />
            </div>
          )}
          {currentView === 'documentation' && (
            <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
              <DocumentationPage onClose={backToDashboard} defaultTab={documentationTab} />
            </div>
          )}
        </div>
      )}
      
      {/* Enhanced Popups with better backdrop */}
      <div className="relative z-[100]">
        {activePopup === 'notes' && (
          <div className="animate-fadeIn">
            <NotesPopup onClose={closePopup} />
          </div>
        )}
        {activePopup === 'notifications' && (
          <div className="animate-slideInDown">
            <NotificationPopup onClose={closePopup} />
          </div>
        )}
        {activePopup === 'task' && (
          <div className="animate-slideInUp">
            <TaskPopup onClose={closePopup} />
          </div>
        )}
        {activePopup === 'support' && (
          <div className="animate-scaleIn">
            <SupportPopup 
              onClose={closePopup} 
              onOpenFeatureRequest={() => openPopup('feature-request')}
              onOpenBugReport={() => openPopup('bug-report')}
              onOpenDocumentation={openDocumentation} 
              onOpenFAQs={openFAQs} 
            />
          </div>
        )}
        {activePopup === 'feature-request' && (
          <div className="animate-slideInRight">
            <FeatureRequestPopup onClose={closePopup} />
          </div>
        )}
        {activePopup === 'bug-report' && (
          <div className="animate-slideInLeft">
            <BugReportPopup onClose={closePopup} />
          </div>
        )}
        {activePopup === 'restore-data' && (
          <div className="animate-slideInUp">
            <RestoreDataPopupSimple 
              onClose={closePopup}
              deletedCustomers={deletedCustomers}
              deletedLeads={deletedLeads}
              onRestoreCustomer={handleRestoreCustomer}
              onPermanentDeleteCustomer={handlePermanentDeleteCustomer}
              onRestoreMultipleCustomers={handleRestoreMultipleCustomers}
              onPermanentDeleteMultipleCustomers={handlePermanentDeleteMultipleCustomers}
              onRestoreLead={handleRestoreLead}
              onPermanentDeleteLead={handlePermanentDeleteLead}
              onRestoreMultipleLeads={handleRestoreMultipleLeads}
              onPermanentDeleteMultipleLeads={handlePermanentDeleteMultipleLeads}
            />
          </div>
        )}
        {activePopup === 'duplicate-data' && (
          <div className="animate-scaleIn">
            <DuplicateDataPopup 
              isOpen={true}
              onClose={closePopup}
              customers={customers}
              onMergeCustomers={handleMergeCustomers}
            />
          </div>
        )}
        {activePopup === 'permissions' && (
          <div className="animate-slideInDown">
            <PermissionPopup onClose={closePopup} />
          </div>
        )}
        {activePopup === 'automation' && (
          <div className="animate-fadeIn">
            {currentModule === 'crm' ? (
              <AutomationPopup 
                onClose={closePopup} 
                automationSettings={automationSettings}
                onUpdateSettings={handleUpdateAutomationSettings}
              />
            ) : (
              <LeadHubAutomationPopup 
                onClose={closePopup} 
                automationSettings={automationSettings}
                onUpdateSettings={handleUpdateAutomationSettings}
              />
            )}
          </div>
        )}
        {activePopup === 'customer-details' && selectedCustomer && (
          <div className="animate-slideInRight">
            <CustomerDetailsPopup 
              customer={selectedCustomer}
              onClose={closePopup}
              onUpdate={handleCustomerUpdate}
            />
          </div>
        )}
        {activePopup === 'reminder' && reminderData && (
          <div className="animate-scaleIn">
            <ReminderPopup 
              customerId={reminderData.customerId}
              customerName={reminderData.customerName}
              onClose={closePopup} 
              onCreateReminder={handleCreateReminder} 
            />
          </div>
        )}
        {activePopup === 'logout-confirm' && (
          <div className="animate-scaleIn">
            <LogoutConfirmPopup 
              onClose={closePopup}
              onConfirm={handleLogoutConfirm}
            />
          </div>
        )}
        {activePopup === 'bad-data-manager' && (
          <div className="animate-slideInUp">
            <BadDataManagerPopup
              isOpen={true}
              onClose={closePopup}
              badDataLeads={badDataLeads}
              onRestoreLead={handleRestoreFromBadData}
              onPermanentDelete={handlePermanentDeleteBadData}
              onShowDetails={openCustomerDetails}
            />
          </div>
        )}
        {activePopup === 'registration' && (
          <RegistrationPopup onClose={closePopup} />
        )}
      </div>
      
      {/* Toast notifications */}
      <Toaster position="top-right" richColors />
    </div>
  );
}