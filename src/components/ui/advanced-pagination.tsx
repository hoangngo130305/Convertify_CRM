import { Button } from './button';
import { Input } from './input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { ChevronLeft, ChevronRight, SkipBack, SkipForward, Users } from 'lucide-react';

interface AdvancedPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  filteredItems: number;
  itemsPerPage: number;
  startIndex: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  itemName?: string;
  showItemsPerPageSelector?: boolean;
  showGoToPage?: boolean;
  showTotalUsers?: boolean;
  className?: string;
}

export function AdvancedPagination({
  currentPage,
  totalPages,
  totalItems,
  filteredItems,
  itemsPerPage,
  startIndex,
  onPageChange,
  onItemsPerPageChange,
  itemName = 'mục',
  showItemsPerPageSelector = true,
  showGoToPage = true,
  showTotalUsers = true,
  className = ''
}: AdvancedPaginationProps) {
  const itemsPerPageOptions = [4, 10, 25, 50, 100];
  const maxVisiblePages = 5;

  const renderPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Add first page and ellipsis if needed
    if (startPage > 1) {
      pages.push(
        <Button
          key={1}
          variant={1 === currentPage ? "default" : "outline"}
          size="sm"
          onClick={() => onPageChange(1)}
          className={`h-8 w-8 p-0 text-xs ${
            1 === currentPage 
              ? "bg-primary text-primary-foreground" 
              : "border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/30"
          }`}
        >
          1
        </Button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis1" className="text-muted-foreground px-1">...</span>
        );
      }
    }

    // Add visible page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          variant={i === currentPage ? "default" : "outline"}
          size="sm"
          onClick={() => onPageChange(i)}
          className={`h-8 w-8 p-0 text-xs ${
            i === currentPage 
              ? "bg-primary text-primary-foreground" 
              : "border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/30"
          }`}
        >
          {i}
        </Button>
      );
    }

    // Add last page and ellipsis if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis2" className="text-muted-foreground px-1">...</span>
        );
      }
      pages.push(
        <Button
          key={totalPages}
          variant={totalPages === currentPage ? "default" : "outline"}
          size="sm"
          onClick={() => onPageChange(totalPages)}
          className={`h-8 w-8 p-0 text-xs ${
            totalPages === currentPage 
              ? "bg-primary text-primary-foreground" 
              : "border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/30"
          }`}
        >
          {totalPages}
        </Button>
      );
    }

    return pages;
  };

  const handleGoToPage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = parseInt((e.target as HTMLInputElement).value);
      if (value >= 1 && value <= totalPages) {
        onPageChange(value);
        (e.target as HTMLInputElement).value = '';
      }
    }
  };

  return (
    <div className={`flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-6 border-t border-border bg-gradient-to-r from-muted/30 to-accent/10 flex-shrink-0 ${className}`}>
      {/* Left side - Info and Items per page */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Total info */}
        {showTotalUsers && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Users className="h-4 w-4 text-primary" />
            </div>
            <div className="text-sm">
              <span className="font-medium text-foreground">
                {filteredItems.toLocaleString()}
              </span>
              <span className="text-muted-foreground ml-1">
                {itemName}{filteredItems !== 1 ? 's' : ''}
              </span>
              {filteredItems !== totalItems && (
                <span className="text-muted-foreground ml-1">
                  (từ {totalItems.toLocaleString()} tổng)
                </span>
              )}
            </div>
          </div>
        )}

        {/* Items per page selector */}
        {showItemsPerPageSelector && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">Hiển thị:</span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => onItemsPerPageChange(parseInt(value))}
            >
              <SelectTrigger className="w-20 h-8 text-sm border-primary/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {itemsPerPageOptions.map(option => (
                  <SelectItem key={option} value={option.toString()}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground whitespace-nowrap">mục/trang</span>
          </div>
        )}

        {/* Page info */}
        <div className="text-sm text-muted-foreground">
          <span>Hiển thị </span>
          <span className="font-medium text-foreground">
            {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredItems)}
          </span>
          <span> trong </span>
          <span className="font-medium text-foreground">
            {filteredItems}
          </span>
        </div>
      </div>
      
      {/* Right side - Navigation */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Navigation buttons */}
        <div className="flex items-center gap-1">
          {/* Go to first page */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0 border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/30 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:border-border"
            title="Trang đầu"
          >
            <SkipBack className="h-3 w-3" />
          </Button>

          {/* Previous page */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0 border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/30 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:border-border"
            title="Trang trước"
          >
            <ChevronLeft className="h-3 w-3" />
          </Button>

          {/* Page numbers */}
          <div className="flex items-center gap-1">
            {renderPageNumbers()}
          </div>

          {/* Next page */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="h-8 w-8 p-0 border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/30 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:border-border"
            title="Trang sau"
          >
            <ChevronRight className="h-3 w-3" />
          </Button>

          {/* Go to last page */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="h-8 w-8 p-0 border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/30 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:border-border"
            title="Trang cuối"
          >
            <SkipForward className="h-3 w-3" />
          </Button>
        </div>

        {/* Page input */}
        {showGoToPage && (
          <div className="flex items-center gap-2 ml-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">Đi tới:</span>
            <Input
              type="number"
              min="1"
              max={totalPages}
              className="w-16 h-8 text-xs text-center border-primary/20"
              placeholder={currentPage.toString()}
              onKeyDown={handleGoToPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}