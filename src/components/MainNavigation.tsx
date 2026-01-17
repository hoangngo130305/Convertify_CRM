import { Button } from './ui/button';
import { Users, TrendingUp, BarChart3, Workflow, Zap, PieChart, Target, Database } from 'lucide-react';

interface MainNavigationProps {
  currentView: 'dashboard' | 'crm' | 'lead-hub' | 'ads-tracking' | 'dataflow' | 'dataset' | 'integration';
  onNavigate: (view: 'dashboard' | 'crm' | 'lead-hub' | 'ads-tracking' | 'dataflow' | 'dataset' | 'integration') => void;
  onOpenRegistration: () => void;
}

export function MainNavigation({ currentView, onNavigate, onOpenRegistration }: MainNavigationProps) {
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

  return (
    <div className="hidden md:flex w-64 h-screen bg-gradient-to-b from-sidebar via-sidebar to-sidebar-accent/10 border-r border-sidebar-border flex-col flex-shrink-0 shadow-xl backdrop-blur-sm">
      {/* Enhanced Header with animation */}
      <div className="p-6 border-b border-sidebar-border/50 bg-gradient-to-r from-sidebar-primary/5 to-sidebar-primary/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-sidebar-primary/5 to-transparent opacity-50"></div>
        <div className="relative z-10 flex items-center gap-3 animate-fadeIn">
          <div className="w-12 h-12 bg-gradient-to-br from-sidebar-primary via-sidebar-primary to-sidebar-primary/70 rounded-2xl flex items-center justify-center shadow-lg hover-glow animate-float">
            <BarChart3 className="w-7 h-7 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-sidebar-foreground text-xl bg-gradient-to-r from-sidebar-foreground to-sidebar-foreground/80 bg-clip-text">Convertify CRM</h1>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-sidebar-primary/10 to-transparent rounded-full blur-xl"></div>
      </div>

      {/* Enhanced Navigation Items */}
      <nav className="flex-1 p-4 overflow-y-auto custom-scrollbar">
        <div className="space-y-2">
          {navigationItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <div key={item.id} className="relative group">
                <Button
                  variant="ghost"
                  onClick={() => onNavigate(item.id)}
                  className={`
                    w-full justify-start gap-4 h-auto p-4 rounded-2xl transition-all duration-500 border relative overflow-hidden
                    ${isActive 
                      ? 'bg-gradient-to-r from-sidebar-primary/15 via-sidebar-primary/10 to-sidebar-primary/5 text-sidebar-primary shadow-lg border-sidebar-primary/25 transform scale-[1.02] hover-glow' 
                      : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground hover:shadow-lg border-transparent hover:border-sidebar-border/50 hover:scale-[1.01] hover-lift'
                    }
                    animate-slideInLeft
                  `}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-sidebar-primary via-sidebar-primary to-sidebar-primary/60 rounded-r-full animate-scaleIn"></div>
                  )}
                  
                  {/* Icon container with enhanced styling */}
                  <div className={`
                    p-3 rounded-xl transition-all duration-300 relative overflow-hidden
                    ${isActive 
                      ? 'bg-gradient-to-br from-sidebar-primary/20 to-sidebar-primary/10 shadow-md' 
                      : 'bg-sidebar-accent/30 group-hover:bg-sidebar-accent/50'
                    }
                  `}>
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-br from-sidebar-primary/30 to-transparent animate-glow"></div>
                    )}
                    <Icon className={`
                      w-5 h-5 transition-all duration-300 relative z-10
                      ${isActive 
                        ? 'text-sidebar-primary' 
                        : 'text-sidebar-foreground/60 group-hover:text-sidebar-foreground'
                      }
                    `} />
                  </div>
                  
                  {/* Text content */}
                  <div className="flex flex-col items-start flex-1">
                    <span className={`
                      font-semibold transition-all duration-300
                      ${isActive ? 'text-sidebar-primary' : 'group-hover:text-sidebar-foreground'}
                    `}>
                      {item.label}
                    </span>
                    <span className="text-xs opacity-70 font-medium text-left leading-tight">
                      {item.description}
                    </span>
                  </div>

                  {/* Hover effect background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sidebar-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>

                {/* Active module indicator dot */}
                {isActive && (
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-sidebar-primary rounded-full shadow-lg animate-bounceIn">
                    <div className="absolute inset-0 bg-sidebar-primary rounded-full animate-ping"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Enhanced Footer */}
      <div className="p-4 border-t border-sidebar-border/50 bg-gradient-to-r from-sidebar-accent/20 to-sidebar-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-sidebar-primary/5 to-transparent"></div>
        
        <div className="relative z-10 text-xs text-sidebar-foreground/60 font-medium space-y-1">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-sidebar-primary/60 rounded-full animate-pulse"></span>
              Convertify 2024
            </p>
            <div className="px-2 py-1 bg-sidebar-primary/10 rounded-full text-sidebar-primary text-xs font-semibold">
              v1.0.0
            </div>
          </div>
          <p className="text-sidebar-primary/70 text-center">Ready for production</p>
        </div>
      </div>
    </div>
  );
}