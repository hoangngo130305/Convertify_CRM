import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { 
  Users, 
  Building, 
  Calendar, 
  Package, 
  Target,
  Search,
  Filter,
  RefreshCw,
  RotateCcw,
  Trash2,
  AlertTriangle,
  Info
} from 'lucide-react';

interface RestoreDataPopupProps {
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

export function RestoreDataPopup({
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
}: RestoreDataPopupProps) {
  const [activeTab, setActiveTab] = useState<'customers' | 'leads'>('customers');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    search: '',
    dateRange: '',
    deletedBy: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter functions
  const filterItems = (items: any[]) => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                           item.phone.includes(filters.search) ||
                           item.email.toLowerCase().includes(filters.search.toLowerCase());
      
      let matchesDate = true;
      if (filters.dateRange) {
        const deletedDate = new Date(item.deletedAt);
        const today = new Date();
        switch (filters.dateRange) {
          case 'today':
            matchesDate = deletedDate.toDateString() === today.toDateString();
            break;
          case 'week':
            const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
            matchesDate = deletedDate >= weekAgo;
            break;
          case 'month':
            const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
            matchesDate = deletedDate >= monthAgo;
            break;
        }
      }

      const matchesDeletedBy = !filters.deletedBy || item.deletedBy === filters.deletedBy;

      return matchesSearch && matchesDate && matchesDeletedBy;
    });
  };

  const filteredCustomers = filterItems(deletedCustomers);
  const filteredLeads = filterItems(deletedLeads);
  const currentItems = activeTab === 'customers' ? filteredCustomers : filteredLeads;

  // Pagination
  const totalPages = Math.ceil(currentItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = currentItems.slice(startIndex, startIndex + itemsPerPage);

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

  const handleRestoreCustomer = (customerId: string) => {
    onRestoreCustomer(customerId);
  };

  const handlePermanentDelete = (itemId: string) => {
    const itemType = activeTab === 'customers' ? 'khách hàng' : 'lead';
    const item = currentItems.find(i => i.id === itemId);
    
    if (confirm(`Bạn có chắc chắn muốn xóa vĩnh viễn ${itemType} "${item?.name}"?\n\nHành động này không thể hoàn tác!`)) {
      if (activeTab === 'customers') {
        onPermanentDeleteCustomer(itemId);
      } else {
        onPermanentDeleteLead(itemId);
      }
    }
  };

  const handleRestoreLead = (leadId: string) => {
    onRestoreLead(leadId);
  };

  // Filter functions
  const clearAllFilters = () => {
    setFilters({
      search: '',
      dateRange: '',
      deletedBy: ''
    });
    setCurrentPage(1);
  };

  const getActiveFilterCount = () => {
    return Object.values(filters).filter(value => value !== '').length;
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh] flex flex-col">
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
            onClick={() => {
              setActiveTab('customers');
              setSelectedItems([]);
              setCurrentPage(1);
            }}
            className="flex-1 justify-center gap-2"
          >
            <Users className="h-4 w-4" />
            Khách hàng ({deletedCustomers.length})
          </Button>
          <Button
            variant={activeTab === 'leads' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => {
              setActiveTab('leads');
              setSelectedItems([]);
              setCurrentPage(1);
            }}
            className="flex-1 justify-center gap-2"
          >
            <Target className="h-4 w-4" />
            Leads ({deletedLeads.length})
          </Button>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          {/* Tab Content */}
          {activeTab === 'customers' ? (
            <div className="flex-1 flex flex-col gap-4 overflow-hidden">
              {filteredCustomers.length > 0 ? (
                <div className="flex-1 flex flex-col gap-4 overflow-hidden">
                  {/* Filters and Search */}
                  <div className="flex flex-col gap-4 flex-shrink-0">
                    <div className="flex gap-4 items-center">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Tìm kiếm theo tên, điện thoại, email..."
                          value={filters.search}
                          onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                          className="pl-10"
                        />
                      </div>
                      <Select value={filters.dateRange} onValueChange={(value) => setFilters(prev => ({ ...prev, dateRange: value }))}>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Thời gian xóa" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Tất cả</SelectItem>
                          <SelectItem value="today">Hôm nay</SelectItem>
                          <SelectItem value="week">7 ngày qua</SelectItem>
                          <SelectItem value="month">30 ngày qua</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={filters.deletedBy} onValueChange={(value) => setFilters(prev => ({ ...prev, deletedBy: value }))}>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Người xóa" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Tất cả</SelectItem>
                          <SelectItem value="current_user">Tôi</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Bulk Actions */}
                    {selectedItems.length > 0 && (
                      <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border">
                        <span className="text-sm">
                          Đã chọn {selectedItems.length} khách hàng
                        </span>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleRestoreSelected}
                            className="text-green-600 border-green-200 hover:bg-green-50"
                          >
                            <RotateCcw className="h-4 w-4 mr-1" />
                            Khôi phục tất cả
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handlePermanentDeleteSelected}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Xóa vĩnh viễn
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Active Filters Summary */}
                    {getActiveFilterCount() > 0 && (
                      <div className="pt-3 border-t">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Đang áp dụng {getActiveFilterCount()} bộ lọc
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearAllFilters}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <RefreshCw className="h-4 w-4 mr-1" />
                            Reset tất cả
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Data Table with Horizontal Scroll */}
                  <div className="flex-1 border rounded-lg overflow-x-auto custom-scrollbar">
                    <div className="min-w-[1000px] flex flex-col h-full">
                      {/* Header with Horizontal Scroll */}
                      <div className="bg-muted/50 p-3 border-b flex-shrink-0">
                        <div className="grid grid-cols-12 gap-4 items-center text-sm font-medium">
                          <div className="col-span-1">
                            <Checkbox
                              checked={isSelectAllIndeterminate ? false : filteredCustomers.length > 0 && selectedItems.length === filteredCustomers.length}
                              {...(isSelectAllIndeterminate && { indeterminate: true })}
                              onCheckedChange={handleSelectAll}
                            />
                          </div>
                          <div className="col-span-3">Tên khách hàng</div>
                          <div className="col-span-2">Số điện thoại</div>
                          <div className="col-span-3">Email</div>
                          <div className="col-span-2">Ngày xóa</div>
                          <div className="col-span-1">Thao tác</div>
                        </div>
                      </div>

                      {/* Scrollable Content */}
                      <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <div className="min-w-[1000px]">
                          {filteredCustomers.map((customer) => (
                            <div key={customer.id} className="border-b last:border-b-0 p-3 hover:bg-muted/30">
                              <div className="grid grid-cols-12 gap-4 items-center text-sm">
                                <div className="col-span-1">
                                  <Checkbox
                                    checked={selectedItems.includes(customer.id)}
                                    onCheckedChange={() => handleSelectItem(customer.id)}
                                  />
                                </div>
                                <div className="col-span-3">
                                  <div className="font-medium truncate" title={customer.name}>
                                    {customer.name}
                                  </div>
                                  <div className="text-muted-foreground text-xs truncate">
                                    ID: {customer.id}
                                  </div>
                                </div>
                                <div className="col-span-2">
                                  <div className="truncate" title={customer.phone}>
                                    {customer.phone}
                                  </div>
                                </div>
                                <div className="col-span-3">
                                  <div className="truncate" title={customer.email}>
                                    {customer.email}
                                  </div>
                                </div>
                                <div className="col-span-2">
                                  <div className="text-sm">
                                    {new Date(customer.deletedAt).toLocaleDateString('vi-VN')}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {customer.deletedBy || 'N/A'}
                                  </div>
                                </div>
                                <div className="col-span-1">
                                  <div className="flex gap-1 justify-center">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleRestoreCustomer(customer.id)}
                                      className="h-8 w-8 p-0 text-green-600 hover:bg-green-50 flex-shrink-0"
                                      title="Khôi phục"
                                    >
                                      <RotateCcw className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handlePermanentDelete(customer.id)}
                                      className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 flex-shrink-0"
                                      title="Xóa vĩnh viễn"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
                  <Users className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg mb-2">Không có khách hàng nào bị xóa</h3>
                  <p className="text-muted-foreground mb-6">
                    Khách hàng đã xóa sẽ xuất hiện ở đây trong vòng 30 ngày
                  </p>
                  {getActiveFilterCount() > 0 && (
                    <Button variant="outline" onClick={clearAllFilters}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Xóa bộ lọc
                    </Button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex flex-col gap-4 overflow-hidden">
              {filteredLeads.length > 0 ? (
                <div className="flex-1 flex flex-col gap-4 overflow-hidden">
                  {/* Filters and Search for Leads */}
                  <div className="flex flex-col gap-4 flex-shrink-0">
                    <div className="flex gap-4 items-center">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Tìm kiếm theo tên, điện thoại, email..."
                          value={filters.search}
                          onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                          className="pl-10"
                        />
                      </div>
                      <Select value={filters.dateRange} onValueChange={(value) => setFilters(prev => ({ ...prev, dateRange: value }))}>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Thời gian xóa" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Tất cả</SelectItem>
                          <SelectItem value="today">Hôm nay</SelectItem>
                          <SelectItem value="week">7 ngày qua</SelectItem>
                          <SelectItem value="month">30 ngày qua</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={filters.deletedBy} onValueChange={(value) => setFilters(prev => ({ ...prev, deletedBy: value }))}>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Người xóa" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Tất cả</SelectItem>
                          <SelectItem value="current_user">Tôi</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Bulk Actions for Leads */}
                    {selectedItems.length > 0 && (
                      <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border">
                        <span className="text-sm">
                          Đã chọn {selectedItems.length} lead
                        </span>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleRestoreSelected}
                            className="text-green-600 border-green-200 hover:bg-green-50"
                          >
                            <RotateCcw className="h-4 w-4 mr-1" />
                            Khôi phục tất cả
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handlePermanentDeleteSelected}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Xóa vĩnh viễn
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Active Filters Summary for Leads */}
                    {getActiveFilterCount() > 0 && (
                      <div className="pt-3 border-t">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Đang áp dụng {getActiveFilterCount()} bộ lọc
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearAllFilters}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <RefreshCw className="h-4 w-4 mr-1" />
                            Reset tất cả
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Data Table for Leads with Horizontal Scroll */}
                  <div className="flex-1 border rounded-lg overflow-x-auto custom-scrollbar">
                    <div className="min-w-[1000px] flex flex-col h-full">
                      {/* Header */}
                      <div className="bg-muted/50 p-3 border-b flex-shrink-0">
                        <div className="grid grid-cols-12 gap-4 items-center text-sm font-medium">
                          <div className="col-span-1">
                            <Checkbox
                              checked={isSelectAllIndeterminate ? false : filteredLeads.length > 0 && selectedItems.length === filteredLeads.length}
                              {...(isSelectAllIndeterminate && { indeterminate: true })}
                              onCheckedChange={handleSelectAll}
                            />
                          </div>
                          <div className="col-span-3">Tên lead</div>
                          <div className="col-span-2">Số điện thoại</div>
                          <div className="col-span-3">Email</div>
                          <div className="col-span-2">Ngày xóa</div>
                          <div className="col-span-1">Thao tác</div>
                        </div>
                      </div>

                      {/* Scrollable Content */}
                      <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <div className="min-w-[1000px]">
                          {filteredLeads.map((lead) => (
                            <div key={lead.id} className="border-b last:border-b-0 p-3 hover:bg-muted/30">
                              <div className="grid grid-cols-12 gap-4 items-center text-sm">
                                <div className="col-span-1">
                                  <Checkbox
                                    checked={selectedItems.includes(lead.id)}
                                    onCheckedChange={() => handleSelectItem(lead.id)}
                                  />
                                </div>
                                <div className="col-span-3">
                                  <div className="font-medium truncate" title={lead.name}>
                                    {lead.name}
                                  </div>
                                  <div className="text-muted-foreground text-xs truncate">
                                    ID: {lead.id}
                                  </div>
                                </div>
                                <div className="col-span-2">
                                  <div className="truncate" title={lead.phone}>
                                    {lead.phone}
                                  </div>
                                </div>
                                <div className="col-span-3">
                                  <div className="truncate" title={lead.email}>
                                    {lead.email}
                                  </div>
                                </div>
                                <div className="col-span-2">
                                  <div className="text-sm">
                                    {new Date(lead.deletedAt).toLocaleDateString('vi-VN')}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {lead.deletedBy || 'N/A'}
                                  </div>
                                </div>
                                <div className="col-span-1">
                                  <div className="flex gap-1 justify-center">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleRestoreLead(lead.id)}
                                      className="h-8 w-8 p-0 text-green-600 hover:bg-green-50 flex-shrink-0"
                                      title="Khôi phục"
                                    >
                                      <RotateCcw className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handlePermanentDelete(lead.id)}
                                      className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 flex-shrink-0"
                                      title="Xóa vĩnh viễn"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
                  <Target className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg mb-2">Không có lead nào bị xóa</h3>
                  <p className="text-muted-foreground mb-6">
                    Lead đã xóa sẽ xuất hiện ở đây trong vòng 30 ngày
                  </p>
                  {getActiveFilterCount() > 0 && (
                    <Button variant="outline" onClick={clearAllFilters}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Xóa bộ lọc
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer with Pagination */}
        {currentItems.length > itemsPerPage && (
          <div className="flex justify-center pt-4 border-t flex-shrink-0">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Trước
              </Button>
              <span className="text-sm text-muted-foreground">
                Trang {currentPage} / {totalPages}
              </span>
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

        {/* Warning Footer */}
        <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm flex-shrink-0">
          <AlertTriangle className="h-4 w-4 flex-shrink-0" />
          <span>
            Dữ liệu đã xóa sẽ tự động bị xóa vĩnh viễn sau 30 ngày. Vui lòng khôi phục kịp thời nếu cần.
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}