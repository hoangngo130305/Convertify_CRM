import { useState, useEffect, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { ScrollArea } from './ui/scroll-area';
import { RestoreDataFilterPopup } from './RestoreDataFilterPopup';
import { 
  Users, 
  Target,
  Search,
  Filter,
  RotateCcw,
  Trash2,
  AlertTriangle
} from 'lucide-react';

interface RestoreDataPopupSimpleProps {
  onClose: () => void;
  deletedCustomers: any[];
  deletedLeads: any[];
  onRestoreCustomer: (customerId: string) => void;
  onPermanentDeleteCustomer: (customerId: string) => void;
  onRestoreMultipleCustomers: (customerIds: string[]) => void;
  onPermanentDeleteMultipleCustomers: (customerIds: string[]) => void;
  onRestoreLead: (leadId: string) => void;
  onPermanentDeleteLead: (leadId: string) => void;
  onRestoreMultipleLeads: (leadIds: string[]) => void;
  onPermanentDeleteMultipleLeads: (leadIds: string[]) => void;
}

export function RestoreDataPopupSimple({
  onClose,
  deletedCustomers,
  deletedLeads,
  onRestoreCustomer,
  onPermanentDeleteCustomer,
  onRestoreMultipleCustomers,
  onPermanentDeleteMultipleCustomers,
  onRestoreLead,
  onPermanentDeleteLead,
  onRestoreMultipleLeads,
  onPermanentDeleteMultipleLeads
}: RestoreDataPopupSimpleProps) {
  const [activeTab, setActiveTab] = useState<'customers' | 'leads'>('customers');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<any>(null);
  const itemsPerPage = 10;

  // Filter functions
  const applyBasicFilter = (items: any[]) => {
    if (!searchQuery) return items;
    
    return items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.includes(searchQuery) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Advanced filter function
  const applyAdvancedFilters = (items: any[]) => {
    if (!appliedFilters) return items;

    return items.filter(item => {
      // Basic filters
      let matches = true;
      
      if (appliedFilters.basic) {
        const { search, dateRange, deletedBy } = appliedFilters.basic;
        
        // Search filter
        if (search) {
          matches = matches && (
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.phone.includes(search) ||
            item.email.toLowerCase().includes(search.toLowerCase())
          );
        }
        
        // Date range filter
        if (dateRange && dateRange !== 'all') {
          const deletedDate = new Date(item.deletedAt);
          const today = new Date();
          
          switch (dateRange) {
            case 'today':
              matches = matches && deletedDate.toDateString() === today.toDateString();
              break;
            case 'week':
              const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
              matches = matches && deletedDate >= weekAgo;
              break;
            case 'month':
              const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
              matches = matches && deletedDate >= monthAgo;
              break;
          }
        }
        
        // Deleted by filter
        if (deletedBy && deletedBy !== 'all') {
          matches = matches && item.deletedBy === deletedBy;
        }
      }

      // Quick filters
      if (appliedFilters.quick && Object.keys(appliedFilters.quick).length > 0) {
        Object.entries(appliedFilters.quick).forEach(([field, values]: [string, any]) => {
          if (values && values.length > 0) {
            const itemValue = item[field];
            if (Array.isArray(itemValue)) {
              matches = matches && values.some((filterValue: string) => 
                itemValue.some(iv => String(iv).toLowerCase() === filterValue.toLowerCase())
              );
            } else {
              matches = matches && values.some((filterValue: string) => 
                String(itemValue || '').toLowerCase() === filterValue.toLowerCase()
              );
            }
          }
        });
      }

      // Advanced filters
      if (appliedFilters.advanced && appliedFilters.advanced.conditions.length > 0) {
        const { conditions, logicOperator } = appliedFilters.advanced;
        
        if (logicOperator === 'and') {
          matches = matches && conditions.every((condition: any) => 
            evaluateCondition(item, condition)
          );
        } else {
          matches = matches && conditions.some((condition: any) => 
            evaluateCondition(item, condition)
          );
        }
      }

      return matches;
    });
  };

  // Evaluate individual condition
  const evaluateCondition = (item: any, condition: any): boolean => {
    const { field, operator, value } = condition;
    const itemValue = item[field];

    switch (operator) {
      case 'includes':
        if (Array.isArray(itemValue)) {
          return itemValue.some(iv => String(iv).toLowerCase() === value.toLowerCase());
        }
        return String(itemValue || '').toLowerCase() === value.toLowerCase();
      
      case 'excludes':
        if (Array.isArray(itemValue)) {
          return !itemValue.some(iv => String(iv).toLowerCase() === value.toLowerCase());
        }
        return String(itemValue || '').toLowerCase() !== value.toLowerCase();
      
      case 'contains':
        return String(itemValue || '').toLowerCase().includes(value.toLowerCase());
      
      case 'not_contains':
        return !String(itemValue || '').toLowerCase().includes(value.toLowerCase());
      
      case 'exists':
        return itemValue !== undefined && itemValue !== null && itemValue !== '';
      
      case 'empty':
        return itemValue === undefined || itemValue === null || itemValue === '';
      
      default:
        return true;
    }
  };

  // Apply all filters
  const filteredItems = useMemo(() => {
    const currentData = activeTab === 'customers' ? deletedCustomers : deletedLeads;
    let filtered = applyBasicFilter(currentData);
    filtered = applyAdvancedFilters(filtered);
    return filtered;
  }, [activeTab, deletedCustomers, deletedLeads, searchQuery, appliedFilters]);

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  // Reset page when switching tabs or applying filters
  useEffect(() => {
    setCurrentPage(1);
    setSelectedItems([]);
  }, [activeTab, appliedFilters, searchQuery]);

  // Selection handlers
  const handleSelectItem = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === paginatedItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(paginatedItems.map(item => item.id));
    }
  };

  const isSelectAllIndeterminate = selectedItems.length > 0 && selectedItems.length < paginatedItems.length;

  // Action handlers
  const handleRestoreSelected = () => {
    if (selectedItems.length === 0) return;
    
    if (activeTab === 'customers') {
      onRestoreMultipleCustomers(selectedItems);
    } else {
      onRestoreMultipleLeads(selectedItems);
    }
    setSelectedItems([]);
  };

  const handlePermanentDeleteSelected = () => {
    if (selectedItems.length === 0) return;
    
    const confirmMessage = `Bạn có chắc chắn muốn xóa vĩnh viễn ${selectedItems.length} ${activeTab === 'customers' ? 'khách hàng' : 'lead'} đã chọn?\n\nHành động này không thể hoàn tác!`;
    
    if (confirm(confirmMessage)) {
      if (activeTab === 'customers') {
        onPermanentDeleteMultipleCustomers(selectedItems);
      } else {
        onPermanentDeleteMultipleLeads(selectedItems);
      }
      setSelectedItems([]);
    }
  };

  const handleRestoreItem = (itemId: string) => {
    if (activeTab === 'customers') {
      onRestoreCustomer(itemId);
    } else {
      onRestoreLead(itemId);
    }
  };

  const handlePermanentDelete = (itemId: string) => {
    const itemType = activeTab === 'customers' ? 'khách hàng' : 'lead';
    const item = filteredItems.find(i => i.id === itemId);
    
    if (confirm(`Bạn có chắc chắn muốn xóa vĩnh viễn ${itemType} "${item?.name}"?\n\nHành động này không thể hoàn tác!`)) {
      if (activeTab === 'customers') {
        onPermanentDeleteCustomer(itemId);
      } else {
        onPermanentDeleteLead(itemId);
      }
    }
  };

  // Handle filter application
  const handleApplyFilters = (filters: any) => {
    setAppliedFilters(filters);
  };

  // Clear filters
  const handleClearFilters = () => {
    setAppliedFilters(null);
    setSearchQuery('');
  };

  // Count active filters
  const getActiveFilterCount = () => {
    let count = 0;
    if (searchQuery) count++;
    if (appliedFilters) {
      if (appliedFilters.basic) {
        count += Object.values(appliedFilters.basic).filter(v => v !== '' && v !== 'all').length;
      }
      if (appliedFilters.quick) {
        count += Object.values(appliedFilters.quick).reduce((sum: number, values: any) => sum + (values?.length || 0), 0);
      }
      if (appliedFilters.advanced) {
        count += appliedFilters.advanced.conditions.length;
      }
    }
    return count;
  };

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="flex items-center gap-2">
              <RotateCcw className="h-5 w-5 text-primary" />
              Khôi phục dữ liệu
            </DialogTitle>
            <DialogDescription>
              Quản lý và khôi phục dữ liệu đã xóa. Dữ liệu sẽ tự động bị xóa vĩnh viễn sau 30 ngày.
            </DialogDescription>
          </DialogHeader>

          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-muted rounded-lg flex-shrink-0">
            <Button
              variant={activeTab === 'customers' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('customers')}
              className="flex-1 justify-center gap-2"
            >
              <Users className="h-4 w-4" />
              Khách hàng ({deletedCustomers.length})
            </Button>
            <Button
              variant={activeTab === 'leads' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('leads')}
              className="flex-1 justify-center gap-2"
            >
              <Target className="h-4 w-4" />
              Leads ({deletedLeads.length})
            </Button>
          </div>

          {/* Toolbar */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm theo tên, SĐT, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Button */}
            <Button
              variant="outline"
              onClick={() => setShowFilterPopup(true)}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              Bộ lọc
              {getActiveFilterCount() > 0 && (
                <Badge variant="secondary" className="bg-primary/10 text-primary ml-1">
                  {getActiveFilterCount()}
                </Badge>
              )}
            </Button>

            {/* Clear Filters */}
            {getActiveFilterCount() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                Xóa bộ lọc
              </Button>
            )}
          </div>

          {/* Results Info */}
          <div className="flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Hiển thị {filteredItems.length} trong tổng số {activeTab === 'customers' ? deletedCustomers.length : deletedLeads.length} {activeTab === 'customers' ? 'khách hàng' : 'lead'}
              </span>
              {getActiveFilterCount() > 0 && (
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {getActiveFilterCount()} bộ lọc đang áp dụng
                </Badge>
              )}
            </div>
            
            {selectedItems.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Đã chọn {selectedItems.length} {activeTab === 'customers' ? 'khách hàng' : 'lead'}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRestoreSelected}
                  className="h-8"
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Khôi phục
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handlePermanentDeleteSelected}
                  className="h-8"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Xóa vĩnh viễn
                </Button>
              </div>
            )}
          </div>

          {/* Table */}
          <div className="flex-1 border rounded-lg overflow-hidden">
            <ScrollArea className="h-full">
              <div className="min-w-full">
                {/* Table Header */}
                <div className="flex items-center bg-muted/50 border-b sticky top-0 z-10">
                  <div className="w-12 p-3 flex items-center justify-center">
                    <Checkbox
                      checked={selectedItems.length === paginatedItems.length && paginatedItems.length > 0}
                      onCheckedChange={handleSelectAll}
                      {...(isSelectAllIndeterminate && { indeterminate: true })}
                    />
                  </div>
                  <div className="flex-1 p-3 font-medium text-sm">Thông tin</div>
                  <div className="w-32 p-3 font-medium text-sm">Trạng thái gốc</div>
                  <div className="w-32 p-3 font-medium text-sm">Ngày xóa</div>
                  <div className="w-24 p-3 font-medium text-sm">Hành động</div>
                </div>

                {/* Table Body */}
                <div>
                  {paginatedItems.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                      <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <h3 className="font-medium mb-2">Không tìm thấy dữ liệu</h3>
                      <p className="text-sm">
                        {getActiveFilterCount() > 0 
                          ? 'Thử điều chỉnh bộ lọc để xem thêm kết quả'
                          : `Chưa có ${activeTab === 'customers' ? 'khách hàng' : 'lead'} nào bị xóa`
                        }
                      </p>
                    </div>
                  ) : (
                    paginatedItems.map((item) => (
                      <div key={item.id} className="flex items-center border-b hover:bg-muted/30 transition-colors">
                        <div className="w-12 p-3 flex items-center justify-center">
                          <Checkbox
                            checked={selectedItems.includes(item.id)}
                            onCheckedChange={() => handleSelectItem(item.id)}
                          />
                        </div>
                        <div className="flex-1 p-3">
                          <div className="space-y-1">
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-muted-foreground">
                              📞 {item.phone} • 📧 {item.email}
                            </div>
                            {item.products && Array.isArray(item.products) && (
                              <div className="text-xs text-muted-foreground">
                                💼 {item.products.join(', ')}
                              </div>
                            )}
                            {item.assignedSale && (
                              <div className="text-xs text-muted-foreground">
                                👨‍💼 {item.assignedSale}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="w-32 p-3">
                          <Badge variant="outline" className="text-xs">
                            {item.status}
                          </Badge>
                          {item.quality && (
                            <div className="text-xs text-muted-foreground mt-1">
                              ⭐ {item.quality}
                            </div>
                          )}
                        </div>
                        <div className="w-32 p-3">
                          <div className="text-sm">
                            {new Date(item.deletedAt).toLocaleDateString('vi-VN')}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            bởi {item.deletedBy}
                          </div>
                        </div>
                        <div className="w-24 p-3">
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRestoreItem(item.id)}
                              className="h-7 w-7 p-0"
                              title="Khôi phục"
                            >
                              <RotateCcw className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handlePermanentDelete(item.id)}
                              className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10"
                              title="Xóa vĩnh viễn"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </ScrollArea>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between flex-shrink-0">
              <div className="text-sm text-muted-foreground">
                Trang {currentPage} / {totalPages}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Trước
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Sau
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Filter Popup */}
      {showFilterPopup && (
        <RestoreDataFilterPopup
          isOpen={showFilterPopup}
          onClose={() => setShowFilterPopup(false)}
          onApplyFilters={handleApplyFilters}
          dataType={activeTab}
          data={activeTab === 'customers' ? deletedCustomers : deletedLeads}
        />
      )}
    </>
  );
}