import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  AlertTriangle,
  Phone,
  Mail,
  User,
  Building,
  Check,
  Search,
  Merge,
  Eye,
  Calendar,
  MapPin,
  DollarSign,
  Package,
  X,
  Users,
  Calculator,
  HelpCircle
} from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  phoneArray?: string[]; // Array of phones when merged
  emailArray?: string[]; // Array of emails when merged
  products: string[];
  status: string;
  source: string;
  assignedSale: string;
  createdDate: Date;
  notes: string;
  quality: number;
  address: string;
  revenue: number;
}

interface DuplicateGroup {
  id: string;
  duplicateType: 'email' | 'phone' | 'name' | 'multiple';
  customers: Customer[];
  selected?: boolean;
}

interface DuplicateDataPopupProps {
  isOpen: boolean;
  onClose: () => void;
  customers: Customer[];
  onMergeCustomers: (duplicateGroups: DuplicateGroup[], mergeOptions: any[]) => void;
}

// Memoized component for product revenue summary
const ProductRevenueSummary = React.memo(({ 
  customers, 
  calculateProductRevenue, 
  formatRevenue 
}: {
  customers: Customer[];
  calculateProductRevenue: (customers: Customer[]) => { product: string; revenue: number }[];
  formatRevenue: (amount: number) => string;
}) => {
  const productRevenue = useMemo(() => calculateProductRevenue(customers), [customers, calculateProductRevenue]);
  
  if (productRevenue.length === 0) return null;

  const totalRevenue = productRevenue.reduce((sum, item) => sum + item.revenue, 0);

  return (
    <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
      <h5 className="font-medium text-sm text-blue-800 mb-2">Doanh thu sản phẩm</h5>
      <div className="space-y-1">
        {productRevenue.map((item, index) => (
          <div key={`${item.product}-${index}`} className="flex justify-between items-center text-xs">
            <span className="text-blue-700 font-medium">{item.product}</span>
            <span className="text-blue-800 font-semibold">{formatRevenue(item.revenue)}</span>
          </div>
        ))}
        {productRevenue.length > 1 && (
          <div className="flex justify-between items-center text-xs pt-1 border-t border-blue-300">
            <span className="text-blue-800 font-semibold">Tổng cộng:</span>
            <span className="text-blue-900 font-bold">{formatRevenue(totalRevenue)}</span>
          </div>
        )}
      </div>
    </div>
  );
});

// Memoized component for contact info preview when merging
const ContactMergePreview = React.memo(({ 
  customers 
}: {
  customers: Customer[];
}) => {
  const allPhones = useMemo(() => 
    customers
      .map(c => c.phone)
      .filter(Boolean)
      .map(phone => phone.trim())
      .filter((phone, index, arr) => arr.indexOf(phone) === index), // Remove duplicates
    [customers]
  );
  
  const allEmails = useMemo(() => 
    customers
      .map(c => c.email)
      .filter(Boolean)
      .map(email => email.toLowerCase().trim())
      .filter((email, index, arr) => arr.indexOf(email) === index), // Remove duplicates
    [customers]
  );

  if (allPhones.length <= 1 && allEmails.length <= 1) return null;

  return (
    <div className="mt-4 p-3 bg-emerald-50 rounded border border-emerald-200">
      <h5 className="font-medium text-sm text-emerald-800 mb-2">📱 Thông tin liên hệ sẽ gộp</h5>
      
      {allPhones.length > 1 && (
        <div className="mb-2">
          <div className="text-xs text-emerald-700 font-medium mb-1">📞 Số điện thoại ({allPhones.length}):</div>
          <div className="flex flex-wrap gap-1">
            {allPhones.map((phone, index) => (
              <span key={index} className="text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded text-xs">
                {phone} {index === 0 && <span className="text-emerald-500">(chính)</span>}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {allEmails.length > 1 && (
        <div>
          <div className="text-xs text-emerald-700 font-medium mb-1">📧 Email ({allEmails.length}):</div>
          <div className="flex flex-wrap gap-1">
            {allEmails.map((email, index) => (
              <span key={index} className="text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded text-xs">
                {email} {index === 0 && <span className="text-emerald-500">(chính)</span>}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export function DuplicateDataPopup({ isOpen, onClose, customers, onMergeCustomers }: DuplicateDataPopupProps) {
  const [duplicateGroups, setDuplicateGroups] = useState<DuplicateGroup[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [mergeOptions, setMergeOptions] = useState<Record<string, any>>({});
  const [currentStep, setCurrentStep] = useState<'detection' | 'confirmation' | 'resolution' | 'customer-details'>('detection');
  const [mergeRevenueOption, setMergeRevenueOption] = useState<boolean | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomerForDetails, setSelectedCustomerForDetails] = useState<Customer | null>(null);

  const detectDuplicates = useCallback((customerList: Customer[]): DuplicateGroup[] => {
    const emailGroups: Record<string, Customer[]> = {};
    const phoneGroups: Record<string, Customer[]> = {};
    const nameGroups: Record<string, Customer[]> = {};
    const groups: DuplicateGroup[] = [];

    // Group by email
    customerList.forEach(customer => {
      if (customer.email && customer.email.trim()) {
        const email = customer.email.toLowerCase().trim();
        if (!emailGroups[email]) {
          emailGroups[email] = [];
        }
        emailGroups[email].push(customer);
      }
    });

    // Group by phone
    customerList.forEach(customer => {
      if (customer.phone && customer.phone.trim()) {
        const phone = customer.phone.replace(/\D/g, ''); // Remove non-digits
        if (!phoneGroups[phone]) {
          phoneGroups[phone] = [];
        }
        phoneGroups[phone].push(customer);
      }
    });

    // Group by name
    customerList.forEach(customer => {
      if (customer.name && customer.name.trim()) {
        const name = customer.name.toLowerCase().trim();
        if (!nameGroups[name]) {
          nameGroups[name] = [];
        }
        nameGroups[name].push(customer);
      }
    });

    // Find email duplicates
    Object.entries(emailGroups).forEach(([email, customers]) => {
      if (customers.length > 1) {
        groups.push({
          id: `email-${email}`,
          duplicateType: 'email',
          customers,
          selected: false
        });
      }
    });

    // Find phone duplicates (that aren't already in email groups)
    Object.entries(phoneGroups).forEach(([phone, customers]) => {
      if (customers.length > 1) {
        // Check if any of these customers are already in an email group
        const existingGroup = groups.find(group => 
          group.customers.some(c1 => customers.some(c2 => c1.id === c2.id))
        );

        if (existingGroup) {
          // Update existing group to indicate multiple duplicates
          existingGroup.duplicateType = 'multiple';
          // Merge customers if there are additional ones
          const newCustomers = customers.filter(c1 => 
            !existingGroup.customers.some(c2 => c1.id === c2.id)
          );
          existingGroup.customers.push(...newCustomers);
        } else {
          groups.push({
            id: `phone-${phone}`,
            duplicateType: 'phone',
            customers,
            selected: false
          });
        }
      }
    });

    // Find name duplicates (that aren't already in email or phone groups)
    Object.entries(nameGroups).forEach(([name, customers]) => {
      if (customers.length > 1) {
        // Check if any of these customers are already in an email or phone group
        const existingGroup = groups.find(group => 
          group.customers.some(c1 => customers.some(c2 => c1.id === c2.id))
        );

        if (existingGroup) {
          // Update existing group to indicate multiple duplicates
          existingGroup.duplicateType = 'multiple';
          // Merge customers if there are additional ones
          const newCustomers = customers.filter(c1 => 
            !existingGroup.customers.some(c2 => c1.id === c2.id)
          );
          existingGroup.customers.push(...newCustomers);
        } else {
          groups.push({
            id: `name-${name}`,
            duplicateType: 'name',
            customers,
            selected: false
          });
        }
      }
    });

    return groups;
  }, []);

  // Memoized duplicate detection - only run when customers actually change
  const detectedDuplicates = useMemo(() => {
    if (!customers || customers.length === 0) return [];
    return detectDuplicates(customers);
  }, [customers, detectDuplicates]);

  // Update state when duplicates change
  useEffect(() => {
    setDuplicateGroups(detectedDuplicates);
  }, [detectedDuplicates]);

  // Memoized function to calculate product revenue summary
  const calculateProductRevenue = useCallback((customers: Customer[]) => {
    const productRevenueMap: Record<string, number> = {};
    
    customers.forEach(customer => {
      if (customer.products && customer.products.length > 0 && customer.revenue > 0) {
        // Divide revenue equally among products if customer has multiple products
        const revenuePerProduct = customer.revenue / customer.products.length;
        
        customer.products.forEach(product => {
          if (!productRevenueMap[product]) {
            productRevenueMap[product] = 0;
          }
          productRevenueMap[product] += revenuePerProduct;
        });
      }
    });

    // Filter out products with zero revenue and sort by revenue descending
    const productRevenueArray = Object.entries(productRevenueMap)
      .filter(([_, revenue]) => revenue > 0)
      .sort((a, b) => b[1] - a[1])
      .map(([product, revenue]) => ({ product, revenue }));

    return productRevenueArray;
  }, []);

  // Memoized function to format revenue
  const formatRevenue = useCallback((amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(amount);
  }, []);

  // Memoized filtered groups
  const filteredGroups = useMemo(() => {
    if (!searchTerm) return duplicateGroups;
    return duplicateGroups.filter(group => 
      group.customers.some(customer => 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm)
      )
    );
  }, [duplicateGroups, searchTerm]);

  const handleGroupSelect = useCallback((groupId: string, selected: boolean) => {
    setSelectedGroups(prev => 
      selected 
        ? [...prev, groupId]
        : prev.filter(id => id !== groupId)
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedGroups.length === duplicateGroups.length) {
      setSelectedGroups([]);
    } else {
      setSelectedGroups(duplicateGroups.map(g => g.id));
    }
  }, [selectedGroups.length, duplicateGroups]);

  const prepareForConfirmation = () => {
    setCurrentStep('confirmation');
  };

  const handleConfirmMergeRevenue = (shouldMergeRevenue: boolean) => {
    setMergeRevenueOption(shouldMergeRevenue);
    prepareForResolution();
  };

  const prepareForResolution = () => {
    const selectedDuplicateGroups = duplicateGroups.filter(group => 
      selectedGroups.includes(group.id)
    );
    
    // Initialize merge options for each group
    const initialMergeOptions: Record<string, any> = {};
    selectedDuplicateGroups.forEach(group => {
      // Default to keeping the first customer's data
      const primaryCustomer = group.customers[0];
      
      // Merge data based on revenue option
      let mergedData = { ...primaryCustomer };
      
      if (mergeRevenueOption !== null) {
        // Merge products (remove duplicates)
        const allProducts = group.customers.flatMap(c => c.products || []);
        const uniqueProducts = [...new Set(allProducts)];
        
        // Calculate revenue
        let totalRevenue = primaryCustomer.revenue || 0;
        if (mergeRevenueOption) {
          // Add revenue from all duplicate customers
          totalRevenue = group.customers.reduce((sum, c) => sum + (c.revenue || 0), 0);
        }
        
        // Merge assigned sales (prefer primary, but allow override)
        const allSales = group.customers.map(c => c.assignedSale).filter(Boolean);
        const uniqueSales = [...new Set(allSales)];
        
        // Merge contact information when merging revenue
        let mergedPhone = primaryCustomer.phone;
        let mergedEmail = primaryCustomer.email;
        let phoneArray: string[] = [];
        let emailArray: string[] = [];
        
        if (mergeRevenueOption) {
          // When merging revenue, collect all unique phone numbers and emails
          const allPhones = group.customers
            .map(c => c.phone)
            .filter(Boolean)
            .map(phone => phone.trim())
            .filter((phone, index, arr) => arr.indexOf(phone) === index); // Remove duplicates
          
          const allEmails = group.customers
            .map(c => c.email)
            .filter(Boolean)
            .map(email => email.toLowerCase().trim())
            .filter((email, index, arr) => arr.indexOf(email) === index); // Remove duplicates
          
          // Store arrays for better display
          phoneArray = allPhones;
          emailArray = allEmails;
          
          // For merged data, join with separator for storage
          mergedPhone = allPhones.join(' | ');
          mergedEmail = allEmails.join(' | ');
        } else {
          // When not merging revenue, just use primary customer's contact info
          const allPhones = group.customers.map(c => c.phone).filter(Boolean);
          mergedPhone = primaryCustomer.phone || allPhones[0];
          phoneArray = [mergedPhone].filter(Boolean);
          emailArray = [primaryCustomer.email || group.customers.find(c => c.email)?.email].filter(Boolean);
        }
        
        mergedData = {
          ...mergedData,
          products: uniqueProducts,
          revenue: totalRevenue,
          phone: mergedPhone,
          email: mergedEmail,
          phoneArray: phoneArray, // Store array for better display
          emailArray: emailArray, // Store array for better display
          assignedSale: mergedData.assignedSale || uniqueSales[0] || 'Chưa phân bổ',
          // Merge notes
          notes: group.customers
            .map(c => c.notes)
            .filter(Boolean)
            .join(' | ')
            .substring(0, 500) || mergedData.notes
        };
      }
      
      initialMergeOptions[group.id] = {
        primaryCustomerId: primaryCustomer.id,
        mergedData,
        deleteIds: group.customers.slice(1).map(c => c.id),
        mergeRevenueOption
      };
    });
    
    setMergeOptions(initialMergeOptions);
    setCurrentStep('resolution');
  };

  const handlePrimaryCustomerChange = (groupId: string, customerId: string) => {
    const group = duplicateGroups.find(g => g.id === groupId);
    if (!group) return;

    const selectedCustomer = group.customers.find(c => c.id === customerId);
    if (!selectedCustomer) return;

    // Recalculate merged data with new primary customer
    let mergedData = { ...selectedCustomer };
    
    if (mergeRevenueOption !== null) {
      // Merge products (remove duplicates)
      const allProducts = group.customers.flatMap(c => c.products || []);
      const uniqueProducts = [...new Set(allProducts)];
      
      // Calculate revenue
      let totalRevenue = selectedCustomer.revenue || 0;
      if (mergeRevenueOption) {
        // Add revenue from all duplicate customers
        totalRevenue = group.customers.reduce((sum, c) => sum + (c.revenue || 0), 0);
      }
      
      // Merge assigned sales (prefer primary, but allow override)
      const allSales = group.customers.map(c => c.assignedSale).filter(Boolean);
      const uniqueSales = [...new Set(allSales)];
      
      // Merge contact information when merging revenue
      let mergedPhone = selectedCustomer.phone;
      let mergedEmail = selectedCustomer.email;
      let phoneArray: string[] = [];
      let emailArray: string[] = [];
      
      if (mergeRevenueOption) {
        // When merging revenue, collect all unique phone numbers and emails
        const allPhones = group.customers
          .map(c => c.phone)
          .filter(Boolean)
          .map(phone => phone.trim())
          .filter((phone, index, arr) => arr.indexOf(phone) === index); // Remove duplicates
        
        const allEmails = group.customers
          .map(c => c.email)
          .filter(Boolean)
          .map(email => email.toLowerCase().trim())
          .filter((email, index, arr) => arr.indexOf(email) === index); // Remove duplicates
        
        // Store arrays for better display
        phoneArray = allPhones;
        emailArray = allEmails;
        
        // For merged data, join with separator for storage
        mergedPhone = allPhones.join(' | ');
        mergedEmail = allEmails.join(' | ');
      } else {
        // When not merging revenue, just use primary customer's contact info
        const allPhones = group.customers.map(c => c.phone).filter(Boolean);
        mergedPhone = selectedCustomer.phone || allPhones[0];
        phoneArray = [mergedPhone].filter(Boolean);
        emailArray = [selectedCustomer.email || group.customers.find(c => c.email)?.email].filter(Boolean);
      }
      
      mergedData = {
        ...mergedData,
        products: uniqueProducts,
        revenue: totalRevenue,
        phone: mergedPhone,
        email: mergedEmail,
        phoneArray: phoneArray, // Store array for better display
        emailArray: emailArray, // Store array for better display
        assignedSale: mergedData.assignedSale || uniqueSales[0] || 'Chưa phân bổ',
        // Merge notes
        notes: group.customers
          .map(c => c.notes)
          .filter(Boolean)
          .join(' | ')
          .substring(0, 500) || mergedData.notes
      };
    }

    setMergeOptions(prev => ({
      ...prev,
      [groupId]: {
        ...prev[groupId],
        primaryCustomerId: customerId,
        mergedData,
        deleteIds: group.customers.filter(c => c.id !== customerId).map(c => c.id)
      }
    }));
  };

  const handleMerge = () => {
    const selectedDuplicateGroups = duplicateGroups.filter(group => 
      selectedGroups.includes(group.id)
    );
    
    const mergeOptionsArray = selectedDuplicateGroups.map(group => mergeOptions[group.id]);
    
    onMergeCustomers(selectedDuplicateGroups, mergeOptionsArray);
    onClose();
  };

  const getDuplicateTypeInfo = (type: 'email' | 'phone' | 'name' | 'multiple') => {
    switch (type) {
      case 'email':
        return { icon: <Mail className="h-4 w-4" />, text: 'Email trùng', color: 'text-red-600' };
      case 'phone':
        return { icon: <Phone className="h-4 w-4" />, text: 'SĐT trùng', color: 'text-orange-600' };
      case 'name':
        return { icon: <User className="h-4 w-4" />, text: 'Tên trùng', color: 'text-blue-600' };
      case 'multiple':
        return { icon: <AlertTriangle className="h-4 w-4" />, text: 'Nhiều trường', color: 'text-red-600' };
      default:
        return { icon: null, text: '', color: 'text-gray-600' };
    }
  };

  const handleViewCustomerDetails = useCallback((customer: Customer) => {
    setSelectedCustomerForDetails(customer);
    setCurrentStep('customer-details');
  }, []);

  const handleBackFromDetails = useCallback(() => {
    setSelectedCustomerForDetails(null);
    setCurrentStep('detection');
  }, []);

  // Memoized customer details calculations
  const customerDetailsData = useMemo(() => {
    if (!selectedCustomerForDetails) return null;
    
    const customer = selectedCustomerForDetails;
    const totalProducts = customer.products?.length || 0;
    const totalRevenue = customer.revenue || 0;
    const productRevenue = totalRevenue / Math.max(totalProducts, 1);
    
    return {
      customer,
      totalProducts,
      totalRevenue,
      productRevenue,
      hasProducts: totalProducts > 0
    };
  }, [selectedCustomerForDetails]);

  // Render different content based on currentStep
  const renderDialogContent = () => {
    // Customer Details View
    if (currentStep === 'customer-details' && customerDetailsData) {
      const { customer, totalProducts, totalRevenue, productRevenue, hasProducts } = customerDetailsData;
      
      return (
        <>
          <DialogHeader className="pb-3 flex-shrink-0">
            <DialogTitle className="flex items-center gap-2 text-lg">
              <Eye className="h-5 w-5 text-primary" />
              Chi tiết khách hàng
            </DialogTitle>
            <DialogDescription>
              Thông tin chi tiết về sản phẩm và doanh thu
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto min-h-0">
            <div className="space-y-6 pr-1">
              {/* Customer Basic Info */}
              <div className="bg-gradient-to-br from-primary/5 to-primary-light/5 rounded-lg p-4 border border-primary/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">{customer.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium break-all">{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">SĐT:</span>
                        <span className="font-medium">{customer.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">Ngày tạo:</span>
                        <span className="font-medium">{customer.createdDate.toLocaleDateString('vi-VN')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">Nguồn:</span>
                        <Badge variant="outline" className="text-xs">{customer.source}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Revenue Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm text-emerald-700 font-medium">Tổng doanh thu</p>
                      <p className="text-xl font-bold text-emerald-800">{formatRevenue(totalRevenue)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Package className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-700 font-medium">Số sản phẩm</p>
                      <p className="text-xl font-bold text-blue-800">{totalProducts}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products Details */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Sản phẩm/Dịch vụ đã mua
                </h4>
                
                {hasProducts ? (
                  <div className="space-y-3">
                    {customer.products.map((product, index) => (
                      <div key={`${product}-${index}`} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                              <span className="text-sm font-medium text-primary">{index + 1}</span>
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-900">{product}</h5>
                              <p className="text-sm text-gray-600">Sản phẩm/Dịch vụ</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-emerald-600">{formatRevenue(productRevenue)}</p>
                            <p className="text-xs text-gray-500">Doanh thu ước tính</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 font-medium">Chưa có sản phẩm</p>
                    <p className="text-sm text-gray-500">Khách hàng chưa mua sản phẩm/dịch vụ nào</p>
                  </div>
                )}
              </div>

              {/* Additional Info */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Thông tin bổ sung</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-2">Trạng thái</h5>
                    <Badge variant={customer.status === 'Thành công' ? 'default' : 'secondary'}>
                      {customer.status}
                    </Badge>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-2">Chất lượng lead</h5>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <div 
                          key={i} 
                          className={`w-3 h-3 rounded-full ${
                            i < customer.quality ? 'bg-yellow-400' : 'bg-gray-200'
                          }`} 
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">({customer.quality}/5)</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-2">Sale phụ trách</h5>
                    <p className="text-sm">{customer.assignedSale}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-2">Địa chỉ</h5>
                    <p className="text-sm text-gray-600">{customer.address || 'Chưa cập nhật'}</p>
                  </div>
                </div>

                {customer.notes && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h5 className="font-medium text-amber-800 mb-2">Ghi chú</h5>
                    <p className="text-sm text-amber-700">{customer.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t flex-shrink-0">
            <Button variant="outline" onClick={handleBackFromDetails} size="sm">
              <X className="h-4 w-4 mr-2" />
              Quay lại
            </Button>
            <div className="text-xs text-gray-500 flex items-center">
              ID: {customer.id}
            </div>
          </div>
        </>
      );
    }

    // Confirmation View
    if (currentStep === 'confirmation') {
      const selectedDuplicateGroups = duplicateGroups.filter(group => 
        selectedGroups.includes(group.id)
      );
      
      const totalRevenue = selectedDuplicateGroups.reduce((sum, group) => 
        sum + group.customers.reduce((groupSum, customer) => groupSum + (customer.revenue || 0), 0), 0
      );
      
      const totalCustomers = selectedDuplicateGroups.reduce((sum, group) => sum + group.customers.length, 0);

      return (
        <>
          <DialogHeader className="pb-3 flex-shrink-0">
            <DialogTitle className="flex items-center gap-2 text-lg">
              <HelpCircle className="h-5 w-5 text-amber-600" />
              Xác nhận hợp nhất dữ liệu
            </DialogTitle>
            <DialogDescription>
              Chọn cách xử lý doanh thu khi hợp nhất khách hàng trùng lặp
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto min-h-0">
            <div className="space-y-6 pr-1">
              {/* Summary Statistics */}
              <div className="bg-gradient-to-br from-primary/5 to-primary-light/5 rounded-lg p-4 border border-primary/20">
                <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Tóm tắt dữ liệu cần hợp nhất
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/60 rounded-lg p-3 border">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">Tổng khách hàng</span>
                    </div>
                    <div className="text-xl font-bold text-blue-700">{totalCustomers}</div>
                    <div className="text-xs text-gray-600">Từ {selectedDuplicateGroups.length} nhóm trùng lặp</div>
                  </div>
                  <div className="bg-white/60 rounded-lg p-3 border">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm font-medium text-gray-700">Tổng doanh thu</span>
                    </div>
                    <div className="text-xl font-bold text-emerald-700">{formatRevenue(totalRevenue)}</div>
                    <div className="text-xs text-gray-600">Của tất cả khách hàng trùng</div>
                  </div>
                </div>
              </div>

              {/* Revenue Merge Question */}
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HelpCircle className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Có muốn gộp doanh thu không?
                  </h3>
                  <p className="text-sm text-gray-600 max-w-md mx-auto">
                    Khi hợp nhất khách hàng trùng lặp, bạn có muốn cộng dồn doanh thu của tất cả khách hàng vào khách hàng chính?
                  </p>
                </div>

                {/* Options */}
                <div className="grid gap-4">
                  {/* Option: Merge Revenue */}
                  <div 
                    className="border-2 border-emerald-200 rounded-lg p-4 cursor-pointer hover:bg-emerald-50 transition-colors bg-emerald-25"
                    onClick={() => handleConfirmMergeRevenue(true)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mt-1">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-emerald-800 mb-2">Có - Gộp doanh thu & thông tin liên hệ</h4>
                        <p className="text-sm text-emerald-700 mb-2">
                          Cộng dồn tất cả doanh thu và gộp thông tin liên hệ từ khách hàng trùng lặp
                        </p>
                        <div className="text-xs text-emerald-600 space-y-1">
                          <div>• Tổng doanh thu sẽ là: <span className="font-semibold">{formatRevenue(totalRevenue)}</span></div>
                          <div>• <span className="font-semibold">Gộp tất cả số điện thoại và email thành danh sách</span></div>
                          <div>• <span className="text-emerald-700">Hiển thị: "SĐT1 | SĐT2" và "Email1 | Email2"</span></div>
                          <div>• Hợp nhất danh sách sản phẩm/dịch vụ</div>
                          <div>• Gộp thông tin sale phụ trách</div>
                          <div>• Loại bỏ thông tin trùng lặp</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Option: Keep Primary Revenue */}
                  <div 
                    className="border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handleConfirmMergeRevenue(false)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center mt-1">
                        <X className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Không - Giữ doanh thu chính</h4>
                        <p className="text-sm text-gray-700 mb-2">
                          Chỉ giữ lại doanh thu của khách hàng chính, loại bỏ doanh thu từ khách hàng trùng
                        </p>
                        <div className="text-xs text-gray-600 space-y-1">
                          <div>• Doanh thu được giữ từ khách hàng chính</div>
                          <div>• Vẫn hợp nhất danh sách sản phẩm/dịch vụ</div>
                          <div>• Vẫn gộp thông tin sale phụ trách</div>
                          <div>• Dữ liệu trùng sẽ bị loại bỏ hoàn toàn</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Group Preview */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Dữ liệu sẽ được hợp nhất:</h4>
                {selectedDuplicateGroups.slice(0, 3).map((group) => {
                  const typeInfo = getDuplicateTypeInfo(group.duplicateType);
                  const groupRevenue = group.customers.reduce((sum, c) => sum + (c.revenue || 0), 0);
                  
                  return (
                    <div key={group.id} className="border rounded-lg p-3 bg-gray-50">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={typeInfo.color}>{typeInfo.icon}</span>
                        <span className="font-medium text-sm">{typeInfo.text}</span>
                        <Badge variant="destructive" className="text-xs">{group.customers.length}</Badge>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs font-medium text-emerald-600">{formatRevenue(groupRevenue)}</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        {group.customers.map(c => c.name).join(', ')}
                      </div>
                    </div>
                  );
                })}
                {selectedDuplicateGroups.length > 3 && (
                  <div className="text-center text-xs text-gray-500">
                    và {selectedDuplicateGroups.length - 3} nhóm khác...
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t flex-shrink-0">
            <Button variant="outline" onClick={() => setCurrentStep('detection')} size="sm">
              <X className="h-4 w-4 mr-2" />
              Quay lại
            </Button>
            <div className="text-xs text-gray-500 flex items-center">
              Chọn một trong hai tùy chọn phía trên
            </div>
          </div>
        </>
      );
    }

    // Resolution View
    if (currentStep === 'resolution') {
      const selectedDuplicateGroups = duplicateGroups.filter(group => 
        selectedGroups.includes(group.id)
      );

      return (
        <>
          <DialogHeader className="pb-3 flex-shrink-0">
            <DialogTitle className="flex items-center gap-2 text-lg">
              <Merge className="h-5 w-5 text-blue-600" />
              Hợp nhất dữ liệu
            </DialogTitle>
            <DialogDescription>
              Chọn khách hàng chính và xem dữ liệu đã được hợp nhất
            </DialogDescription>
            {mergeRevenueOption !== null && (
              <div className="mt-2 p-2 bg-blue-50 rounded text-xs">
                <span className="font-medium">Tùy chọn doanh thu:</span> {mergeRevenueOption ? 'Gộp doanh thu' : 'Giữ doanh thu chính'}
              </div>
            )}
          </DialogHeader>

          <div className="flex-1 overflow-y-auto min-h-0">
            <div className="space-y-4 pr-1">
              {selectedDuplicateGroups.map((group) => {
                const typeInfo = getDuplicateTypeInfo(group.duplicateType);
                return (
                  <div key={group.id} className="border rounded p-3 bg-gray-50">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={typeInfo.color}>{typeInfo.icon}</span>
                      <h4 className="text-sm font-medium">{typeInfo.text}</h4>
                      <Badge variant="outline" className="text-xs">{group.customers.length}</Badge>
                    </div>

                    <div className="space-y-2">
                      {group.customers.map((customer) => (
                        <div
                          key={customer.id}
                          className={`p-3 border rounded cursor-pointer transition-colors ${
                            mergeOptions[group.id]?.primaryCustomerId === customer.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                          onClick={() => handlePrimaryCustomerChange(group.id, customer.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                              mergeOptions[group.id]?.primaryCustomerId === customer.id
                                ? 'border-blue-500 bg-blue-500'
                                : 'border-gray-300'
                            }`}>
                              {mergeOptions[group.id]?.primaryCustomerId === customer.id && (
                                <Check className="h-2.5 w-2.5 text-white" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium break-words">{customer.name}</div>
                              <div className="text-xs text-gray-600 break-words space-y-0.5">
                                <div>📧 {customer.email}</div>
                                <div>📞 {customer.phone}</div>
                                <div>📍 {customer.source}</div>
                                {customer.products && customer.products.length > 0 && (
                                  <div className="flex items-center gap-1 mt-1">
                                    <Package className="h-3 w-3 text-blue-600" />
                                    <span className="text-blue-600">{customer.products.length} sản phẩm</span>
                                    <span className="text-gray-400">•</span>
                                    <span className="text-emerald-600 font-medium">{formatRevenue(customer.revenue)}</span>
                                  </div>
                                )}
                              </div>
                              {mergeOptions[group.id]?.primaryCustomerId === customer.id && mergeOptions[group.id]?.mergedData && (
                                <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-200">
                                  <div className="text-xs font-medium text-blue-800 mb-1">Dữ liệu sau hợp nhất:</div>
                                  <div className="text-xs text-blue-700 space-y-0.5">
                                    {/* Enhanced email display */}
                                    <div>
                                      📧 Email: 
                                      {mergeOptions[group.id].mergedData.emailArray && mergeOptions[group.id].mergedData.emailArray.length > 1 ? (
                                        <div className="ml-4 mt-1 space-y-0.5">
                                          {mergeOptions[group.id].mergedData.emailArray.map((email: string, index: number) => (
                                            <div key={index} className="text-blue-600 bg-blue-100 px-2 py-0.5 rounded text-xs inline-block mr-1 mb-1">
                                              {email} {index === 0 && <span className="text-blue-500">(chính)</span>}
                                            </div>
                                          ))}
                                          <span className="text-xs text-blue-600 ml-1">(đã gộp {mergeOptions[group.id].mergedData.emailArray.length} email)</span>
                                        </div>
                                      ) : (
                                        <span> {mergeOptions[group.id].mergedData.email}</span>
                                      )}
                                    </div>
                                    
                                    {/* Enhanced phone display */}
                                    <div>
                                      📞 SĐT: 
                                      {mergeOptions[group.id].mergedData.phoneArray && mergeOptions[group.id].mergedData.phoneArray.length > 1 ? (
                                        <div className="ml-4 mt-1 space-y-0.5">
                                          {mergeOptions[group.id].mergedData.phoneArray.map((phone: string, index: number) => (
                                            <div key={index} className="text-blue-600 bg-blue-100 px-2 py-0.5 rounded text-xs inline-block mr-1 mb-1">
                                              {phone} {index === 0 && <span className="text-blue-500">(chính)</span>}
                                            </div>
                                          ))}
                                          <span className="text-xs text-blue-600 ml-1">(đã gộp {mergeOptions[group.id].mergedData.phoneArray.length} SĐT)</span>
                                        </div>
                                      ) : (
                                        <span> {mergeOptions[group.id].mergedData.phone}</span>
                                      )}
                                    </div>
                                    
                                    <div>👨‍💼 Sale: {mergeOptions[group.id].mergedData.assignedSale}</div>
                                    <div>📦 Sản phẩm: {mergeOptions[group.id].mergedData.products?.length || 0} loại</div>
                                    <div className="font-medium text-emerald-700">
                                      💰 Doanh thu: {formatRevenue(mergeOptions[group.id].mergedData.revenue)}
                                      {mergeRevenueOption && (
                                        <span className="text-xs text-emerald-600 ml-1">(đã gộp)</span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between pt-3 border-t flex-shrink-0">
            <Button variant="outline" onClick={() => setCurrentStep('confirmation')} size="sm">
              Quay lại
            </Button>
            <Button onClick={handleMerge} className="bg-red-600 hover:bg-red-700" size="sm">
              Hợp nhất {selectedGroups.length} nhóm
            </Button>
          </div>
        </>
      );
    }

    // Main Detection View
    return (
      <>
        <DialogHeader className="pb-3 flex-shrink-0">
          <DialogTitle className="flex items-center gap-2 text-lg">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Dữ liệu trùng lặp
          </DialogTitle>
          <DialogDescription>
            Phát hiện khách hàng có thông tin giống nhau
          </DialogDescription>
        </DialogHeader>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4 flex-shrink-0">
          <div className="text-center p-2 bg-blue-50 rounded text-xs">
            <div className="font-medium text-blue-600">{customers.length}</div>
            <div className="text-gray-600">Tổng KH</div>
          </div>
          <div className="text-center p-2 bg-red-50 rounded text-xs">
            <div className="font-medium text-red-600">{duplicateGroups.length}</div>
            <div className="text-gray-600">Nhóm trùng</div>
          </div>
          <div className="text-center p-2 bg-orange-50 rounded text-xs">
            <div className="font-medium text-orange-600">
              {duplicateGroups.reduce((sum, group) => sum + group.customers.length, 0)}
            </div>
            <div className="text-gray-600">Bản ghi</div>
          </div>
        </div>

        {duplicateGroups.length > 0 ? (
          <>
            {/* Controls */}
            <div className="flex items-center gap-3 mb-4 flex-shrink-0">
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 h-8 text-sm"
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={selectedGroups.length === duplicateGroups.length}
                  onCheckedChange={handleSelectAll}
                  id="select-all"
                />
                <Label htmlFor="select-all" className="text-xs whitespace-nowrap">
                  Tất cả ({selectedGroups.length}/{duplicateGroups.length})
                </Label>
              </div>
            </div>

            {/* Groups */}
            <div className="flex-1 overflow-y-auto min-h-0">
              <div className="space-y-3 pr-1">
                {filteredGroups.map((group) => {
                  const typeInfo = getDuplicateTypeInfo(group.duplicateType);
                  return (
                    <div key={group.id} className="border rounded p-3 bg-white">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={selectedGroups.includes(group.id)}
                          onCheckedChange={(checked) => handleGroupSelect(group.id, !!checked)}
                          id={`group-${group.id}`}
                          className="mt-0.5 flex-shrink-0"
                        />
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={typeInfo.color}>{typeInfo.icon}</span>
                            <span className="font-medium text-sm">{typeInfo.text}</span>
                            <Badge variant="destructive" className="text-xs">{group.customers.length}</Badge>
                          </div>
                          
                          <div className="space-y-2">
                            {group.customers.map((customer) => (
                              <div key={customer.id} className="p-3 bg-gray-50 rounded border">
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium mb-1 break-words text-sm">{customer.name}</div>
                                    <div className="text-gray-600 space-y-0.5 text-xs">
                                      <div className="break-words">📧 {customer.email}</div>
                                      <div className="break-words">📞 {customer.phone}</div>
                                      <div className="break-words">📍 {customer.source}</div>
                                      {customer.products && customer.products.length > 0 && (
                                        <div className="flex items-center gap-1 mt-1">
                                          <Package className="h-3 w-3 text-blue-600" />
                                          <span className="text-blue-600 font-medium">{customer.products.length} sản phẩm</span>
                                          <span className="text-gray-400">•</span>
                                          <span className="text-emerald-600 font-medium">{formatRevenue(customer.revenue)}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleViewCustomerDetails(customer)}
                                    className="h-7 px-2 text-xs flex-shrink-0"
                                  >
                                    <Eye className="h-3 w-3 mr-1" />
                                    Chi tiết
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Product Revenue Summary */}
                          <ProductRevenueSummary 
                            customers={group.customers} 
                            calculateProductRevenue={calculateProductRevenue}
                            formatRevenue={formatRevenue}
                          />
                          
                          {/* Contact Merge Preview */}
                          <ContactMergePreview customers={group.customers} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8 flex-shrink-0">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-medium mb-1 text-sm">Không có dữ liệu trùng lặp</h3>
            <p className="text-gray-500 text-xs">Tất cả khách hàng đều có thông tin duy nhất</p>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between pt-3 border-t flex-shrink-0">
          <div className="text-xs text-gray-500">
            {duplicateGroups.length > 0 ? 
              `${duplicateGroups.length} nhóm trùng lặp` : 
              'Dữ liệu sạch'
            }
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} size="sm">Đóng</Button>
            {selectedGroups.length > 0 && (
              <Button onClick={prepareForConfirmation} className="bg-blue-600 hover:bg-blue-700" size="sm">
                Xử lý ({selectedGroups.length})
              </Button>
            )}
          </div>
        </div>
      </>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col w-[95vw]">
        {renderDialogContent()}
      </DialogContent>
    </Dialog>
  );
}