import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  X, 
  Search, 
  RotateCcw, 
  Trash2, 
  Eye, 
  AlertTriangle,
  TrendingUp,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from './ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  questions: string;
  source: string;
  products: string[];
  status: string;
  quality: string;
  assignedSale: string;
  createdDate: Date;
  notes: string;
  badDataReason?: string;
  movedToBadDataDate?: Date;
  movedToBadDataBy?: string;
  originalModule?: 'crm' | 'leadhub'; // Track which module the lead came from
  originalStatus?: string; // Save original status before moving to bad data
  originalQuality?: string; // Save original quality before moving to bad data
}

interface BadDataManagerPopupProps {
  isOpen: boolean;
  onClose: () => void;
  badDataLeads: Lead[];
  onRestoreLead: (leadId: string, newStatus: string, targetModule?: 'crm' | 'leadhub') => void;
  onPermanentDelete: (leadId: string) => void;
  onShowDetails: (lead: Lead) => void;
}

const getQualityColor = (quality: string) => {
  switch (quality) {
    case 'Hot/Nóng': return 'bg-red-100 text-red-800';
    case 'Warm/Ấm': return 'bg-yellow-100 text-yellow-800';
    case 'Cold/Lạnh': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getSourceColor = (source: string) => {
  switch (source) {
    case 'Facebook Lead Ads': return 'bg-blue-100 text-blue-800';
    case 'Google Ads': return 'bg-green-100 text-green-800';
    case 'TikTok Lead Ads': return 'bg-pink-100 text-pink-800';
    case 'Zalo Lead Ads': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getModuleColor = (module?: string) => {
  switch (module) {
    case 'crm': return 'bg-purple-100 text-purple-800';
    case 'leadhub': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const formatDate = (date: Date) => {
  return date.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getDaysUntilDeletion = (movedDate: Date) => {
  const now = new Date();
  const diffTime = now.getTime() - movedDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const remainingDays = 30 - diffDays;
  return remainingDays;
};

const getExpirationStatus = (remainingDays: number) => {
  if (remainingDays <= 0) {
    return { color: 'bg-red-100 text-red-800', text: 'Hết hạn', icon: '🚨' };
  } else if (remainingDays <= 3) {
    return { color: 'bg-red-100 text-red-800', text: `${remainingDays} ngày`, icon: '⚠️' };
  } else if (remainingDays <= 7) {
    return { color: 'bg-yellow-100 text-yellow-800', text: `${remainingDays} ngày`, icon: '⏰' };
  } else {
    return { color: 'bg-green-100 text-green-800', text: `${remainingDays} ngày`, icon: '✅' };
  }
};

export function BadDataManagerPopup({ 
  isOpen, 
  onClose, 
  badDataLeads, 
  onRestoreLead, 
  onPermanentDelete,
  onShowDetails 
}: BadDataManagerPopupProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [filterSource, setFilterSource] = useState<string>('all');
  const [filterQuality, setFilterQuality] = useState<string>('all');
  const [filterProduct, setFilterProduct] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterAssignedSale, setFilterAssignedSale] = useState<string>('all');
  const [filterDateRange, setFilterDateRange] = useState<string>('all');

  // Filter leads based on search and filters
  const filteredLeads = badDataLeads.filter(lead => {
    const matchesSearch = !searchTerm || 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.questions.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSource = filterSource === 'all' || lead.source === filterSource;
    const matchesQuality = filterQuality === 'all' || lead.quality === filterQuality;
    
    // Filter by products
    const matchesProduct = filterProduct === 'all' || 
      (lead.products && Array.isArray(lead.products) && lead.products.includes(filterProduct));
    
    // Filter by status (originalStatus)
    const matchesStatus = filterStatus === 'all' || 
      ((lead as any).originalStatus === filterStatus) || 
      (filterStatus === 'undefined' && !(lead as any).originalStatus);
    
    // Filter by assigned sale
    const matchesAssignedSale = filterAssignedSale === 'all' || lead.assignedSale === filterAssignedSale;
    
    // Filter by date range
    const matchesDateRange = filterDateRange === 'all' || (() => {
      if (!lead.movedToBadDataDate) return false;
      const moveDate = new Date(lead.movedToBadDataDate);
      const now = new Date();
      const diffDays = Math.floor((now.getTime() - moveDate.getTime()) / (1000 * 60 * 60 * 24));
      
      switch (filterDateRange) {
        case 'today': return diffDays === 0;
        case 'yesterday': return diffDays === 1;
        case 'last7days': return diffDays <= 7;
        case 'last30days': return diffDays <= 30;
        case 'older': return diffDays > 30;
        default: return true;
      }
    })();

    return matchesSearch && matchesSource && matchesQuality && matchesProduct && 
           matchesStatus && matchesAssignedSale && matchesDateRange;
  });

  // Get unique values for filters
  const uniqueSources = [...new Set(badDataLeads.map(lead => lead.source))];
  const uniqueQualities = [...new Set(badDataLeads.map(lead => lead.quality))];
  
  // Get unique products (flatten arrays)
  const uniqueProducts = [...new Set(
    badDataLeads
      .filter(lead => lead.products && Array.isArray(lead.products))
      .flatMap(lead => lead.products)
  )];
  
  // Get unique statuses (original status)
  const uniqueStatuses = [...new Set(
    badDataLeads
      .map(lead => (lead as any).originalStatus)
      .filter(status => status !== undefined)
  )];
  
  // Get unique assigned sales
  const uniqueAssignedSales = [...new Set(
    badDataLeads
      .map(lead => lead.assignedSale)
      .filter(sale => sale !== undefined)
  )];

  // Calculate expiration statistics
  const expirationStats = badDataLeads.reduce((stats, lead) => {
    if (lead.movedToBadDataDate) {
      const remainingDays = getDaysUntilDeletion(lead.movedToBadDataDate);
      if (remainingDays <= 0) {
        stats.expired++;
      } else if (remainingDays <= 3) {
        stats.critical++;
      } else if (remainingDays <= 7) {
        stats.warning++;
      } else {
        stats.safe++;
      }
    }
    return stats;
  }, { expired: 0, critical: 0, warning: 0, safe: 0 });

  const handleSelectLead = (leadId: string) => {
    setSelectedLeads(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const handleSelectAll = () => {
    setSelectedLeads(
      selectedLeads.length === filteredLeads.length 
        ? [] 
        : filteredLeads.map(l => l.id)
    );
  };

  const handleBulkRestore = (newStatus: string, targetModule?: 'crm' | 'leadhub') => {
    selectedLeads.forEach(leadId => {
      // Find the lead to determine its original module
      const lead = badDataLeads.find(l => l.id === leadId);
      const originalModule = lead?.originalModule || 'leadhub'; // Default to leadhub if not specified
      onRestoreLead(leadId, newStatus, targetModule || originalModule);
    });
    setSelectedLeads([]);
  };

  const handleBulkDelete = () => {
    if (confirm(`Bạn có chắc chắn muốn xóa vĩnh viễn ${selectedLeads.length} leads? Hành động này không thể hoàn tác!`)) {
      selectedLeads.forEach(leadId => {
        onPermanentDelete(leadId);
      });
      setSelectedLeads([]);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterSource('all');
    setFilterQuality('all');
    setFilterProduct('all');
    setFilterStatus('all');
    setFilterAssignedSale('all');
    setFilterDateRange('all');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[80vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <DialogTitle className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <span>Quản lý Data Xấu</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                {filteredLeads.length} leads
              </Badge>
              {expirationStats.expired > 0 && (
                <Badge className="bg-red-100 text-red-800 text-xs">
                  🚨 {expirationStats.expired} hết hạn
                </Badge>
              )}
              {expirationStats.critical > 0 && (
                <Badge className="bg-red-100 text-red-800 text-xs">
                  ⚠️ {expirationStats.critical} ≤3 ngày
                </Badge>
              )}
              {expirationStats.warning > 0 && (
                <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                  ⏰ {expirationStats.warning} ≤7 ngày
                </Badge>
              )}
            </div>
          </DialogTitle>
          <DialogDescription>
            Quản lý và khôi phục các leads đã được chuyển vào data xấu về đúng module nguồn.
            <br />
            <span className="text-amber-600 font-medium">⚠️ Lưu ý:</span> Data xấu chỉ được lưu trữ trong 30 ngày, sau đó sẽ tự động bị xóa vĩnh viễn.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Controls */}
          <div className="p-4 border-b border-border bg-muted/20">
            <div className="flex items-center justify-between">
              {/* Search */}
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Tìm kiếm trong data xấu..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4"
                />
              </div>
              
              <div className="flex items-center gap-2">
                {/* Filter Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="relative">
                      <Filter className="h-4 w-4 mr-2" />
                      Bộ lọc
                      {(filterSource !== 'all' || filterQuality !== 'all' || 
                        filterProduct !== 'all' || filterStatus !== 'all' || 
                        filterAssignedSale !== 'all' || filterDateRange !== 'all') && (
                        <Badge className="ml-2 h-5 w-5 p-0 text-xs bg-purple-600 text-white rounded-full flex items-center justify-center">
                          {[filterSource, filterQuality, filterProduct, filterStatus, filterAssignedSale, filterDateRange]
                            .filter(f => f !== 'all').length}
                        </Badge>
                      )}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Bộ lọc Data Xấu</DialogTitle>
                      <DialogDescription>
                        Áp dụng các tiêu chí lọc để tìm kiếm data xấu cụ thể
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid grid-cols-2 gap-4 py-4">
                      {/* Left Column */}
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm mb-2 block">Nguồn Data</label>
                          <Select value={filterSource} onValueChange={setFilterSource}>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn nguồn" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Tất cả nguồn</SelectItem>
                              {uniqueSources.map(source => (
                                <SelectItem key={source} value={source}>{source}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="text-sm mb-2 block">Chất lượng</label>
                          <Select value={filterQuality} onValueChange={setFilterQuality}>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn chất lượng" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Tất cả chất lượng</SelectItem>
                              {uniqueQualities.map(quality => (
                                <SelectItem key={quality} value={quality}>{quality}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="text-sm mb-2 block">Sản phẩm/Dịch vụ</label>
                          <Select value={filterProduct} onValueChange={setFilterProduct}>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn sản phẩm" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Tất cả sản phẩm</SelectItem>
                              {uniqueProducts.map(product => (
                                <SelectItem key={product} value={product}>{product}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm mb-2 block">Trạng thái gốc</label>
                          <Select value={filterStatus} onValueChange={setFilterStatus}>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn trạng thái" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Tất cả trạng thái</SelectItem>
                              <SelectItem value="undefined">Chưa có trạng thái</SelectItem>
                              {uniqueStatuses.map(status => (
                                <SelectItem key={status} value={status}>{status}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="text-sm mb-2 block">Người xử lý</label>
                          <Select value={filterAssignedSale} onValueChange={setFilterAssignedSale}>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn người xử lý" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Tất cả người xử lý</SelectItem>
                              {uniqueAssignedSales.map(sale => (
                                <SelectItem key={sale} value={sale}>{sale}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="text-sm mb-2 block">Thời gian thêm vào</label>
                          <Select value={filterDateRange} onValueChange={setFilterDateRange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn khoảng thời gian" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Tất cả thời gian</SelectItem>
                              <SelectItem value="today">Hôm nay</SelectItem>
                              <SelectItem value="yesterday">Hôm qua</SelectItem>
                              <SelectItem value="last7days">7 ngày qua</SelectItem>
                              <SelectItem value="last30days">30 ngày qua</SelectItem>
                              <SelectItem value="older">Cũ hơn 30 ngày</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="text-sm text-muted-foreground">
                        {(filterSource !== 'all' || filterQuality !== 'all' || 
                          filterProduct !== 'all' || filterStatus !== 'all' || 
                          filterAssignedSale !== 'all' || filterDateRange !== 'all') && (
                          <span className="text-purple-600">
                            {[filterSource, filterQuality, filterProduct, filterStatus, filterAssignedSale, filterDateRange]
                              .filter(f => f !== 'all').length} bộ lọc đang áp dụng
                          </span>
                        )}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Quick clear button when filters are active */}
                {(searchTerm || filterSource !== 'all' || filterQuality !== 'all' || 
                  filterProduct !== 'all' || filterStatus !== 'all' || 
                  filterAssignedSale !== 'all' || filterDateRange !== 'all') && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-purple-600 hover:text-purple-700">
                    <X className="h-4 w-4 mr-1" />
                    Xóa bộ lọc
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Bulk Actions Row - Separate from controls */}
          {selectedLeads.length > 0 && (
            <div className="px-4 py-2 border-b border-border bg-purple-50/50">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  Đã chọn {selectedLeads.length} leads
                </span>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Khôi phục
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleBulkRestore('original')}>
                      🔄 Khôi phục về module gốc với trạng thái gốc
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleBulkRestore('Mới', 'crm')}>
                      🏢 Chuyển về CRM với trạng thái "Mới"
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkRestore('Mới', 'leadhub')}>
                      🎯 Chuyển về Lead Hub với trạng thái "Mới"
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={handleBulkDelete}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Xóa vĩnh viễn
                </Button>
              </div>
            </div>
          )}

          {/* Filter Status Row */}
          {(searchTerm || filterSource !== 'all' || filterQuality !== 'all' || 
            filterProduct !== 'all' || filterStatus !== 'all' || 
            filterAssignedSale !== 'all' || filterDateRange !== 'all') && (
            <div className="px-4 py-2 border-b border-border bg-purple-50/30">
              <div className="text-sm text-purple-600">
                🔍 Hiển thị {filteredLeads.length} kết quả được lọc từ {badDataLeads.length} tổng số
              </div>
            </div>
          )}

          {/* Data Table */}
          <div className="flex-1 overflow-auto">
            {filteredLeads.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <AlertTriangle className="h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {badDataLeads.length === 0 ? 'Không có data xấu' : 'Không tìm thấy kết quả'}
                </h3>
                <p className="text-gray-500 mb-4">
                  {badDataLeads.length === 0 
                    ? 'Chưa có leads nào được chuyển vào data xấu.'
                    : 'Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc.'
                  }
                </p>
                {badDataLeads.length > 0 && (
                  <Button variant="outline" onClick={clearFilters}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Xóa bộ lọc
                  </Button>
                )}
              </div>
            ) : (
              <table className="w-full">
                <thead className="sticky top-0 bg-muted z-10">
                  <tr>
                    <th className="p-3 text-left border-b border-border w-12">
                      <input
                        type="checkbox"
                        checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                        onChange={handleSelectAll}
                        className="rounded"
                      />
                    </th>
                    <th className="p-3 text-left border-b border-border min-w-[180px]">
                      <span className="text-red-600">Tên khách hàng</span>
                    </th>
                    <th className="p-3 text-left border-b border-border min-w-[120px]">SĐT</th>
                    <th className="p-3 text-left border-b border-border min-w-[160px]">Email</th>
                    <th className="p-3 text-left border-b border-border min-w-[140px]">Sản phẩm</th>
                    <th className="p-3 text-left border-b border-border min-w-[120px]">Nguồn</th>
                    <th className="p-3 text-left border-b border-border min-w-[100px]">Chất lượng</th>
                    <th className="p-3 text-left border-b border-border min-w-[110px]">Trạng thái gốc</th>
                    <th className="p-3 text-left border-b border-border min-w-[120px]">Người xử lý</th>
                    <th className="p-3 text-left border-b border-border min-w-[100px]">Module gốc</th>
                    <th className="p-3 text-left border-b border-border min-w-[130px]">Ngày chuyển</th>
                    <th className="p-3 text-left border-b border-border min-w-[100px]">Thời hạn</th>
                    <th className="p-3 text-left border-b border-border min-w-[120px]">Lý do</th>
                    <th className="p-3 text-left border-b border-border min-w-[120px]">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-muted/50 border-b border-border/50">
                      <td className="p-3">
                        <input
                          type="checkbox"
                          checked={selectedLeads.includes(lead.id)}
                          onChange={() => handleSelectLead(lead.id)}
                          className="rounded"
                        />
                      </td>
                      <td className="p-3">
                        <div className="font-medium">{lead.name}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-[160px]">
                          {lead.questions}
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="text-sm">{lead.phone}</span>
                      </td>
                      <td className="p-3">
                        <span className="text-sm">{lead.email}</span>
                      </td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1">
                          {lead.products && Array.isArray(lead.products) && lead.products.length > 0 ? (
                            lead.products.slice(0, 2).map((product, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {product}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-xs text-muted-foreground">-</span>
                          )}
                          {lead.products && lead.products.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{lead.products.length - 2}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge className={`${getSourceColor(lead.source)} text-xs`}>
                          {lead.source}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Badge className={`${getQualityColor(lead.quality)} text-xs`}>
                          {lead.quality}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Badge className={`text-xs ${(lead as any).originalStatus ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                          {(lead as any).originalStatus || 'Chưa có'}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <span className="text-sm">{lead.assignedSale || '-'}</span>
                      </td>
                      <td className="p-3">
                        <Badge className={`${getModuleColor(lead.originalModule)} text-xs`}>
                          {lead.originalModule === 'crm' ? '🏢 CRM' : lead.originalModule === 'leadhub' ? '🎯 Lead Hub' : '❓ Unknown'}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <span className="text-sm">
                          {lead.movedToBadDataDate ? formatDate(lead.movedToBadDataDate) : '-'}
                        </span>
                      </td>
                      <td className="p-3">
                        {lead.movedToBadDataDate ? (() => {
                          const remainingDays = getDaysUntilDeletion(lead.movedToBadDataDate);
                          const status = getExpirationStatus(remainingDays);
                          return (
                            <Badge className={`${status.color} text-xs`}>
                              {status.icon} {status.text}
                            </Badge>
                          );
                        })() : (
                          <Badge className="bg-gray-100 text-gray-800 text-xs">-</Badge>
                        )}
                      </td>
                      <td className="p-3">
                        <span className="text-sm text-muted-foreground">
                          {lead.badDataReason || 'Không có nhu cầu'}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onShowDetails(lead)}
                            className="h-8 w-8 p-0"
                            title="Xem chi tiết"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                title="Khôi phục"
                              >
                                <RotateCcw className="h-4 w-4 text-green-600" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => onRestoreLead(lead.id, 'original', lead.originalModule)}>
                                <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
                                🔄 Khôi phục về {lead.originalModule === 'crm' ? 'CRM' : 'Lead Hub'} - Trạng thái gốc: "{(lead as any).originalStatus || 'Mới'}"
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => onRestoreLead(lead.id, 'Mới', 'crm')}>
                                <TrendingUp className="h-4 w-4 mr-2 text-purple-600" />
                                🏢 Chuyển về CRM - "Mới"
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => onRestoreLead(lead.id, 'Mới', 'leadhub')}>
                                <TrendingUp className="h-4 w-4 mr-2 text-purple-600" />
                                🎯 Chuyển về Lead Hub - "Mới"
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              if (confirm('Bạn có chắc chắn muốn xóa vĩnh viễn lead này? Hành động này không thể hoàn tác!')) {
                                onPermanentDelete(lead.id);
                              }
                            }}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                            title="Xóa vĩnh viễn"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-muted/20">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              <div>Hiển thị {filteredLeads.length} / {badDataLeads.length} leads data xấu</div>
              {(searchTerm || filterSource !== 'all' || filterQuality !== 'all' || 
                filterProduct !== 'all' || filterStatus !== 'all' || 
                filterAssignedSale !== 'all' || filterDateRange !== 'all') && (
                <div className="text-xs text-purple-600 mt-1">
                  🔍 Đang áp dụng bộ lọc - {filteredLeads.length} kết quả từ {badDataLeads.length} tổng số
                </div>
              )}
              <div className="text-xs text-amber-600 mt-1">
                💡 Chính sách: Data xấu tự động xóa sau 30 ngày để giảm thiểu lưu trữ dữ liệu không cần thiết
              </div>
            </div>
            <Button variant="outline" onClick={onClose}>
              <X className="h-4 w-4 mr-2" />
              Đóng
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}