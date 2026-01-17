import { Button } from './ui/button';
import { Users, TrendingUp, BarChart3, Workflow, Zap, PieChart, Target, Database, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface MobileSidebarProps {
  currentView: 'dashboard' | 'crm' | 'lead-hub' | 'ads-tracking' | 'dataflow' | 'dataset' | 'integration';
  onNavigate: (view: 'dashboard' | 'crm' | 'lead-hub' | 'ads-tracking' | 'dataflow' | 'dataset' | 'integration') => void;
  onOpenRegistration: () => void;
}

export function MobileSidebar({ currentView, onNavigate, onOpenRegistration }: MobileSidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      id: 'dashboard' as const,
      label: 'Dashboard',
      icon: PieChart,
      description: 'Báo cáo tổng quan'
    },
    {
      id: 'crm' as const,
      label: 'Customer',
      icon: Users,
      description: 'Quản lý khách hàng'
    },
    {
      id: 'lead-hub' as const,
      label: 'Lead Hub',
      icon: TrendingUp,
      description: 'Quản lý lead'
    },
    {
      id: 'ads-tracking' as const,
      label: 'Ads Tracking',
      icon: Target,
      description: 'Theo dõi quảng cáo'
    },
    {
      id: 'dataflow' as const,
      label: 'DataFlow',
      icon: Workflow,
      description: 'Quản lý pipelines'
    },
    {
      id: 'dataset' as const,
      label: 'Data Set',
      icon: Database,
      description: 'Quản lý dataset upload'
    },
    {
      id: 'integration' as const,
      label: 'Integration',
      icon: Zap,
      description: 'Quản lý tích hợp'
    }
  ];

  const currentItem = navigationItems.find(item => item.id === currentView);
  const CurrentIcon = currentItem?.icon || PieChart;

  const handleNavigate = (view: typeof currentView) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Top Bar - Fixed Header - Only visible on mobile (< 768px) */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-[10000] bg-white border-b border-gray-200 shadow-md">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Current Page Indicator */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-sidebar-primary to-sidebar-primary/80 rounded-lg flex items-center justify-center">
              <CurrentIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">{currentItem?.label}</h2>
              <p className="text-xs text-gray-600">{currentItem?.description}</p>
            </div>
          </div>

          {/* Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-gray-900" />
            ) : (
              <Menu className="w-5 h-5 text-gray-900" />
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <>
            {/* Overlay - Click to close */}
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm -z-10"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Dropdown Content */}
            <div className="absolute top-full left-0 right-0 bg-white shadow-2xl max-h-[calc(100vh-60px)] overflow-y-auto border-b border-gray-200">
              <div className="p-3 space-y-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigate(item.id)}
                      className={`
                        w-full flex items-center gap-3 p-3 rounded-xl transition-all
                        ${isActive 
                          ? 'bg-gradient-to-r from-sidebar-primary/20 to-sidebar-primary/10 text-sidebar-primary border border-sidebar-primary/30' 
                          : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
                        }
                      `}
                    >
                      <div className={`
                        p-2 rounded-lg
                        ${isActive 
                          ? 'bg-sidebar-primary/20' 
                          : 'bg-gray-100'
                        }
                      `}>
                        <Icon className={`w-4 h-4 ${isActive ? 'text-sidebar-primary' : 'text-gray-600'}`} />
                      </div>
                      <div className="flex-1 text-left">
                        <div className={`text-sm font-semibold ${isActive ? 'text-sidebar-primary' : 'text-gray-900'}`}>
                          {item.label}
                        </div>
                        <div className="text-xs text-gray-600">{item.description}</div>
                      </div>
                      {isActive && (
                        <div className="w-2 h-2 bg-sidebar-primary rounded-full"></div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Registration Button - Mobile */}
              <div className="p-3 border-t border-gray-200 bg-gray-50">
                <Button
                  onClick={() => {
                    onOpenRegistration();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full h-10 bg-gradient-to-r from-sidebar-primary to-sidebar-primary/90 hover:from-sidebar-primary/90 hover:to-sidebar-primary text-white font-semibold rounded-lg shadow-lg text-sm"
                >
                  CRM đang trong giai đoạn thử nghiệm
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}