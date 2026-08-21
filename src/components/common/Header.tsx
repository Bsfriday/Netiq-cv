import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  FileText, 
  Compass, 
  Bookmark, 
  Home, 
  Menu, 
  X, 
  Star,
  PlusCircle,
  Zap,
  ChevronRight
} from 'lucide-react';

interface HeaderProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  savedCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, onNavigate, savedCount = 0 }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes or resize to desktop
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentRoute]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  const handleOpenReview = () => {
    setMobileMenuOpen(false);
    window.dispatchEvent(new CustomEvent('netiqcv:show-review-prompt', {
      detail: { actionTrigger: 'manual' }
    }));
  };

  const NAV_ITEMS = [
    {
      route: '/',
      label: 'Home',
      icon: Home,
      desc: 'Studio overview & quick start'
    },
    {
      route: '/ai-generator',
      label: 'AI Resume Generator',
      icon: Sparkles,
      badge: 'New AI',
      desc: 'Tailored by country, role & experience'
    },
    {
      route: '/create',
      label: 'Create My CV',
      icon: FileText,
      badge: 'Studio',
      desc: 'Step-by-step custom builder'
    },
    {
      route: '/random',
      label: 'Random CV Generator',
      icon: Zap,
      desc: 'Instant complete CVs across 9 industries'
    },
    {
      route: '/samples',
      label: 'Sample Industry CVs',
      icon: Compass,
      desc: '9 Professionally formatted samples'
    },
    {
      route: '/saved',
      label: 'Saved Resumes',
      icon: Bookmark,
      count: savedCount,
      desc: 'Local browser drafts & backups'
    },
  ];

  return (
    <>
      <header className="no-print sticky top-0 z-40 flex justify-between items-center px-4 sm:px-6 md:px-10 py-3 sm:py-3.5 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs w-full">
        {/* Brand */}
        <button 
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer focus:outline-hidden rounded-xl p-0.5"
          id="nav-brand-logo"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform shrink-0">
            <span className="text-white font-black text-base sm:text-lg">N</span>
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-xl font-black tracking-tight text-slate-900 leading-none">
                NetiqCV
              </span>
              <span className="inline-block px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-bold bg-blue-50 text-blue-700 border border-blue-200 shrink-0">
                CreatIQ
              </span>
            </div>
            <span className="hidden xs:inline-block text-[9px] sm:text-[10px] font-medium text-slate-400 leading-tight mt-0.5 truncate max-w-[170px] sm:max-w-none">
              Professional CV Studio
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links (Visible on lg and larger) */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
          {currentRoute !== '/' && (
            <button
              onClick={() => onNavigate('/')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-all"
              id="nav-home-btn"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
          )}

          <button
            onClick={() => onNavigate('/ai-generator')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              currentRoute === '/ai-generator' 
                ? 'bg-blue-50 text-blue-700 border border-blue-200/80 shadow-xs' 
                : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
            }`}
            id="nav-ai-generator-btn"
          >
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>AI Generator</span>
          </button>

          <button
            onClick={() => onNavigate('/create')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              currentRoute === '/create' 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25' 
                : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
            }`}
            id="nav-create-btn"
          >
            <FileText className="w-4 h-4" />
            <span>Create My CV</span>
          </button>

          <button
            onClick={() => onNavigate('/random')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              currentRoute === '/random' 
                ? 'bg-blue-50 text-blue-700 border border-blue-200/80 shadow-xs' 
                : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
            }`}
            id="nav-random-btn"
          >
            <Zap className="w-4 h-4 text-blue-600" />
            <span>Random CV</span>
          </button>

          <button
            onClick={() => onNavigate('/samples')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              currentRoute === '/samples' 
                ? 'bg-blue-50 text-blue-700 border border-blue-200/80 shadow-xs' 
                : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
            }`}
            id="nav-samples-btn"
          >
            <Compass className="w-4 h-4 text-blue-600" />
            <span>Sample CVs</span>
          </button>

          <button
            onClick={() => onNavigate('/saved')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              currentRoute === '/saved' 
                ? 'bg-blue-50 text-blue-700 border border-blue-200/80 shadow-xs' 
                : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
            }`}
            id="nav-saved-btn"
          >
            <Bookmark className="w-4 h-4 text-blue-600" />
            <span>Saved</span>
            {savedCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-blue-100 text-blue-700 font-extrabold ml-0.5">
                {savedCount}
              </span>
            )}
          </button>
        </nav>

        {/* Mobile Actions: Primary Quick Button + Hamburger Toggle (Visible on < lg) */}
        <div className="flex lg:hidden items-center gap-2">
          {currentRoute !== '/create' && (
            <button
              onClick={() => handleNavClick('/create')}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm shadow-blue-500/20 transition-all"
              id="mobile-quick-create-btn"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Create</span>
            </button>
          )}

          {currentRoute === '/create' && (
            <button
              onClick={() => handleNavClick('/ai-generator')}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-bold transition-all"
              id="mobile-quick-ai-btn"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI</span>
            </button>
          )}

          {/* Hamburger Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-colors focus:outline-hidden relative"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            id="btn-mobile-menu-toggle"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
            {savedCount > 0 && !mobileMenuOpen && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer / Dropdown Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 lg:hidden flex flex-col bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
          id="mobile-menu-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setMobileMenuOpen(false);
          }}
        >
          <div className="bg-white border-b border-slate-200 shadow-2xl rounded-b-3xl max-h-[85vh] overflow-y-auto flex flex-col animate-in slide-in-from-top duration-200">
            {/* Drawer Top Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-sm">
                  N
                </div>
                <span className="font-extrabold text-sm text-slate-900">NetiqCV Menu</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
                id="btn-close-mobile-drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Items List */}
            <div className="p-3 sm:p-4 space-y-1.5">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = currentRoute === item.route;
                return (
                  <button
                    key={item.route}
                    onClick={() => handleNavClick(item.route)}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all ${
                      isActive
                        ? 'bg-blue-50 border border-blue-200/80 text-blue-900 font-bold shadow-xs'
                        : 'text-slate-700 hover:bg-slate-50 border border-transparent font-semibold'
                    }`}
                    id={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold flex items-center gap-1.5">
                          <span>{item.label}</span>
                          {item.badge && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-indigo-100 text-indigo-700">
                              {item.badge}
                            </span>
                          )}
                          {item.count !== undefined && item.count > 0 && (
                            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-blue-600 text-white">
                              {item.count}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400 line-clamp-1 font-normal">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-300'}`} />
                  </button>
                );
              })}
            </div>

            {/* Bottom Actions in Drawer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 rounded-b-3xl flex items-center justify-between">
              <button
                onClick={handleOpenReview}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-blue-600 py-2 px-3 rounded-xl hover:bg-white transition-colors"
                id="mobile-menu-rate-review"
              >
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Rate & Review</span>
              </button>

              <span className="text-[10px] font-bold text-slate-400">
                by CreatIQ Products
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
