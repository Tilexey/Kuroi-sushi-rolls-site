import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, MapPin, Menu, ShoppingBag, X } from 'lucide-react';
import { DishCategory, RouteView } from '../types/sushi';
import { NEIGHBORHOODS } from '../data/menuData';

interface NavbarProps {
  activeView: RouteView;
  onNavigate: (view: RouteView, category?: DishCategory | 'All menu', scrollTarget?: string) => void;
  cartCount: number;
  cartSubtotal: number;
  selectedNeighborhood: string;
  onSelectNeighborhood: (neighborhood: string) => void;
}

export function Navbar({
  activeView,
  onNavigate,
  cartCount,
  cartSubtotal,
  selectedNeighborhood,
  onSelectNeighborhood,
}: NavbarProps) {
  const [locationOpen, setLocationOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLocationOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

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

  const handleLinkClick = (
    view: RouteView,
    category?: DishCategory | 'All menu',
    scrollTarget?: string
  ) => {
    setMobileMenuOpen(false);
    onNavigate(view, category, scrollTarget);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#F4EFE9]/95 backdrop-blur-md border-b border-[#E5DFD6]/80 transition-colors duration-200">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 h-16 md:h-20 flex items-center justify-between gap-4 md:gap-8">
          {/* Zone 1: Brand Mark */}
          <button
            type="button"
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2.5 text-left group shrink-0 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D13825] rounded-lg py-1"
            aria-label="Kuroi Sushi Home"
          >
            <span className="w-7 h-7 md:w-8 md:h-8 rounded-md bg-[#D13825] flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105">
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 7h16" />
                <path d="M7 7v11" />
                <path d="M17 7v11" />
                <path d="M5 11h14" />
              </svg>
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display font-bold text-[15px] md:text-[17px] tracking-tight text-[#141312]">
                KUROI
              </span>
              <span className="text-[8px] md:text-[9px] font-medium tracking-[0.14em] text-[#6E6A66] uppercase mt-0.5">
                SUSHI &amp; ROLLS
              </span>
            </span>
          </button>

          {/* Zone 2: Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-7 lg:gap-9 text-[13.5px] font-medium text-[#57534E]"
            aria-label="Primary Navigation"
          >
            <button
              type="button"
              onClick={() => handleLinkClick('menu', 'All menu')}
              className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#141312] ${
                activeView === 'menu' ? 'text-[#141312] font-semibold' : ''
              }`}
            >
              Menu
              {activeView === 'menu' && (
                <motion.span
                  layoutId="navActiveDot"
                  className="absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-[#D13825] rounded-full"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                />
              )}
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick('menu', 'Sets')}
              className="relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#141312]"
            >
              Combos
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick('cart')}
              className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#141312] ${
                activeView === 'cart' ? 'text-[#141312] font-semibold' : ''
              }`}
            >
              Delivery
              {activeView === 'cart' && (
                <motion.span
                  layoutId="navActiveDot"
                  className="absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-[#D13825] rounded-full"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                />
              )}
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick('home', undefined, 'our-craft')}
              className="relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#141312]"
            >
              About
            </button>
          </nav>

          {/* Zone 3: Neighborhood Selector (Desktop) + Cart CTA + Mobile Menu Toggle */}
          <div className="flex items-center gap-2.5 md:gap-4 shrink-0">
            {/* Location selector on desktop */}
            <div className="relative hidden lg:block" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setLocationOpen((prev) => !prev)}
                className="flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium text-[#141312] bg-[#FAF8F5] hover:bg-white border border-[#E5DFD6] rounded-full transition-all duration-150 whitespace-nowrap shrink-0"
                aria-expanded={locationOpen}
              >
                <span className="max-w-[155px] truncate">{selectedNeighborhood}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#6E6A66] transition-transform duration-200 ${
                    locationOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {locationOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.97 }}
                    transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-[#E5DFD6] py-1.5 z-50"
                  >
                    <div className="px-3 py-1.5 text-[11px] font-semibold tracking-wider text-[#8A837A] uppercase">
                      Delivery Area
                    </div>
                    {NEIGHBORHOODS.map((area) => (
                      <button
                        key={area}
                        type="button"
                        onClick={() => {
                          onSelectNeighborhood(area);
                          setLocationOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-[13px] flex items-center gap-2 transition-colors ${
                          selectedNeighborhood === area
                            ? 'bg-[#F4EFE9] text-[#141312] font-semibold'
                            : 'text-[#57534E] hover:bg-[#FAF8F5] hover:text-[#141312]'
                        }`}
                      >
                        <MapPin className="w-3.5 h-3.5 text-[#D13825] shrink-0" />
                        <span className="truncate">{area}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart CTA button */}
            <motion.button
              type="button"
              onClick={() => handleLinkClick('cart')}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 sm:gap-3 bg-[#D13825] hover:bg-[#B82B19] text-white text-[13px] font-medium px-3.5 sm:px-4 h-10 md:h-10 rounded-xl transition-colors duration-150 shadow-sm whitespace-nowrap shrink-0"
              aria-label={`Open cart, ${cartCount} items, subtotal $${cartSubtotal.toFixed(2)}`}
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:hidden" />
              <span className="flex items-center gap-1.5">
                <span className="hidden sm:inline">Cart</span>
                <span className="hidden sm:inline text-white/70">·</span>
                <motion.span
                  key={cartCount}
                  initial={{ scale: 1.25 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 24 }}
                  className="tabular-nums font-semibold"
                >
                  {cartCount}
                </motion.span>
              </span>
              <span className="tabular-nums font-semibold border-l border-white/25 pl-2.5 sm:pl-3">
                ${cartSubtotal.toFixed(2)}
              </span>
            </motion.button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-[#E5DFD6] text-[#141312] transition-colors active:scale-95"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Slide-Over Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#141312]/45 backdrop-blur-xs"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 360, damping: 34 }}
              className="fixed top-0 right-0 bottom-0 w-[84%] max-w-[340px] bg-[#F4EFE9] shadow-2xl flex flex-col justify-between p-6 overflow-y-auto"
              aria-label="Mobile menu"
            >
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-[#E5DFD6]">
                  <div className="flex flex-col leading-none">
                    <span className="font-display font-bold text-lg tracking-tight text-[#141312]">
                      KUROI SUSHI
                    </span>
                    <span className="text-[10px] tracking-[0.14em] text-[#6E6A66] uppercase mt-1">
                      128 Spring Street, NYC
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-10 h-10 rounded-full bg-white border border-[#E5DFD6] flex items-center justify-center text-[#141312] active:scale-95"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="mt-6 flex flex-col gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleLinkClick('home')}
                    className={`w-full text-left px-4 py-3.5 rounded-xl font-display text-lg font-semibold transition-colors ${
                      activeView === 'home'
                        ? 'bg-[#141312] text-white'
                        : 'text-[#141312] hover:bg-white'
                    }`}
                  >
                    Home
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLinkClick('menu', 'All menu')}
                    className={`w-full text-left px-4 py-3.5 rounded-xl font-display text-lg font-semibold transition-colors ${
                      activeView === 'menu'
                        ? 'bg-[#141312] text-white'
                        : 'text-[#141312] hover:bg-white'
                    }`}
                  >
                    Full Menu
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLinkClick('menu', 'Sets')}
                    className="w-full text-left px-4 py-3.5 rounded-xl font-display text-lg font-semibold text-[#141312] hover:bg-white transition-colors"
                  >
                    Combo Sets
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLinkClick('cart')}
                    className={`w-full text-left px-4 py-3.5 rounded-xl font-display text-lg font-semibold flex items-center justify-between transition-colors ${
                      activeView === 'cart'
                        ? 'bg-[#141312] text-white'
                        : 'text-[#141312] hover:bg-white'
                    }`}
                  >
                    <span>Your Cart &amp; Delivery</span>
                    <span className="tabular-nums text-sm font-medium opacity-80">
                      {cartCount} · ${cartSubtotal.toFixed(2)}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLinkClick('home', undefined, 'our-craft')}
                    className="w-full text-left px-4 py-3.5 rounded-xl font-display text-lg font-semibold text-[#141312] hover:bg-white transition-colors"
                  >
                    Our Craft
                  </button>
                </nav>

                {/* Neighborhood Picker inside Mobile Drawer */}
                <div className="mt-8 pt-6 border-t border-[#E5DFD6]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8A837A] mb-3">
                    Delivery Neighborhood
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {NEIGHBORHOODS.map((area) => (
                      <button
                        key={area}
                        type="button"
                        onClick={() => onSelectNeighborhood(area)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl text-[13.5px] flex items-center gap-2.5 transition-colors ${
                          selectedNeighborhood === area
                            ? 'bg-white text-[#141312] font-semibold border border-[#E5DFD6]'
                            : 'text-[#57534E] hover:bg-white/60'
                        }`}
                      >
                        <MapPin className="w-3.5 h-3.5 text-[#D13825] shrink-0" />
                        <span>{area}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#E5DFD6] text-xs text-[#6E6A66] space-y-1">
                <p className="font-medium text-[#141312]">Delivered fresh in 35 minutes</p>
                <p>Free delivery on orders $50+ · Sun–Thu 11am–10pm</p>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
