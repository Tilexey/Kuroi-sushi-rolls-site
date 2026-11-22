import { useState, useMemo, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, RotateCcw } from 'lucide-react';
import { DishCategory, MenuItem, RouteView, TasteTag } from '../types/sushi';
import { DishCard } from './DishCard';

interface MenuViewProps {
  dishes: MenuItem[];
  activeCategory: DishCategory | 'All menu';
  onCategoryChange: (cat: DishCategory | 'All menu') => void;
  getDishCartQuantity: (dishId: string) => number;
  onNavigate: (view: RouteView) => void;
  onOpenModal: (dish: MenuItem) => void;
  onQuickAdd: (dish: MenuItem) => void;
  onIncrement: (dishId: string) => void;
  onDecrement: (dishId: string) => void;
}

const MENU_TABS: Array<DishCategory | 'All menu'> = [
  'All menu',
  'Rolls',
  'Nigiri',
  'Baked rolls',
  'Sets',
  'Drinks',
];

const TASTE_FILTERS: TasteTag[] = ['Spicy', 'Baked', 'Vegetarian', 'New'];

type SortOption = 'popular' | 'price-asc' | 'price-desc';

const SORT_LABELS: Record<SortOption, string> = {
  popular: 'Popular first',
  'price-asc': 'Price: Low to high',
  'price-desc': 'Price: High to low',
};

export function MenuView({
  dishes,
  activeCategory,
  onCategoryChange,
  getDishCartQuantity,
  onNavigate,
  onOpenModal,
  onQuickAdd,
  onIncrement,
  onDecrement,
}: MenuViewProps) {
  const [selectedTags, setSelectedTags] = useState<TasteTag[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const toggleTag = (tag: TasteTag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredDishes = useMemo(() => {
    let list = dishes.filter((item) => {
      if (activeCategory === 'All menu') {
        // Core 8 dishes in "All menu" matching the exact 8-dish layout; Sets & Drinks live in their tabs unless taste filters are active
        if (selectedTags.length === 0) {
          return item.category !== 'Sets' && item.category !== 'Drinks';
        }
        return true;
      }
      return item.category === activeCategory;
    });

    if (selectedTags.length > 0) {
      list = list.filter((item) =>
        selectedTags.every((tag) => item.tags.includes(tag))
      );
    }

    const sorted = [...list];
    if (sortBy === 'popular') {
      sorted.sort((a, b) => b.popularity - a.popularity);
    } else if (sortBy === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  }, [dishes, activeCategory, selectedTags, sortBy]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 pt-6 sm:pt-10 pb-20 sm:pb-28"
    >
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-[11px] font-semibold tracking-[0.12em] uppercase">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="text-[#9A948C] hover:text-[#141312] transition-colors"
        >
          HOME
        </button>
        <span className="mx-2 text-[#C9C1B6]">/</span>
        <span className="text-[#141312]">MENU</span>
      </nav>

      {/* Title Row */}
      <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-[36px] sm:text-[46px] lg:text-[52px] font-bold tracking-[-0.03em] text-[#141312] leading-[1.06]">
            Find your next favorite.
          </h1>
          <p className="mt-2.5 text-[15px] text-[#6E6A66]">
            Handcrafted to order. Best enjoyed together.
          </p>
        </div>

        <p className="text-[12.5px] font-medium text-[#D13825] md:pb-1">
          Freshly rolled. At your door in 35 min.
        </p>
      </div>

      {/* Category Underline Tabs */}
      <div className="mt-8 border-b border-[#E5DFD6] flex items-center gap-6 sm:gap-9 overflow-x-auto no-scrollbar">
        {MENU_TABS.map((tab) => {
          const isActive = activeCategory === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => onCategoryChange(tab)}
              className={`relative pb-3.5 text-[14px] whitespace-nowrap shrink-0 transition-colors duration-150 ${
                isActive
                  ? 'font-semibold text-[#141312]'
                  : 'font-medium text-[#8A837A] hover:text-[#141312]'
              }`}
            >
              {tab}
              {isActive && (
                <motion.span
                  layoutId="menuCategoryUnderline"
                  transition={{ type: 'spring', stiffness: 450, damping: 34 }}
                  className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#D13825] rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Taste & Preferences Filter Strip + Sort */}
      <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="text-[10.5px] font-semibold tracking-[0.12em] text-[#9A948C] uppercase mr-1">
            TASTE &amp; PREFERENCES
          </span>
          {TASTE_FILTERS.map((tag) => {
            const active = selectedTags.includes(tag);
            return (
              <motion.button
                key={tag}
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleTag(tag)}
                className={`h-9 md:h-8 px-3.5 rounded-lg text-[12.5px] font-medium transition-all duration-150 whitespace-nowrap ${
                  active
                    ? 'bg-[#141312] text-white shadow-xs'
                    : 'bg-white text-[#57534E] border border-[#E5DFD6] hover:border-[#C9C1B6] hover:text-[#141312]'
                }`}
              >
                {tag}
              </motion.button>
            );
          })}

          {selectedTags.length > 0 && (
            <button
              type="button"
              onClick={() => setSelectedTags([])}
              className="text-[12px] font-medium text-[#D13825] hover:underline inline-flex items-center gap-1 ml-1 px-1.5 py-1"
            >
              <RotateCcw className="w-3 h-3" />
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-5 text-[13px]">
          <span className="text-[#8A837A] tabular-nums">
            {filteredDishes.length} {filteredDishes.length === 1 ? 'dish' : 'dishes'}
          </span>

          <div className="relative" ref={sortRef}>
            <button
              type="button"
              onClick={() => setSortOpen((o) => !o)}
              className="inline-flex items-center gap-1.5 font-medium text-[#141312] hover:text-[#D13825] transition-colors py-1"
              aria-expanded={sortOpen}
            >
              <span>{SORT_LABELS[sortBy]}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#6E6A66] transition-transform duration-200 ${
                  sortOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {sortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-[#E5DFD6] py-1.5 z-30"
                >
                  {(Object.keys(SORT_LABELS) as SortOption[]).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setSortBy(opt);
                        setSortOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-[13px] transition-colors ${
                        sortBy === opt
                          ? 'bg-[#F4EFE9] font-semibold text-[#141312]'
                          : 'text-[#57534E] hover:bg-[#FAF8F5] hover:text-[#141312]'
                      }`}
                    >
                      {SORT_LABELS[opt]}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Dish Grid */}
      {filteredDishes.length > 0 ? (
        <motion.div
          layout
          className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredDishes.map((dish, idx) => (
              <DishCard
                key={dish.id}
                dish={dish}
                index={idx}
                variant="menu"
                cartQuantity={getDishCartQuantity(dish.id)}
                onOpenModal={onOpenModal}
                onQuickAdd={onQuickAdd}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 bg-white rounded-2xl border border-[#E5DFD6] p-10 text-center max-w-md mx-auto"
        >
          <p className="font-display text-lg font-semibold text-[#141312]">
            No dishes match these filters
          </p>
          <p className="mt-2 text-[13.5px] text-[#6E6A66]">
            Try clearing a preference tag or switching back to the full menu.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedTags([]);
              onCategoryChange('All menu');
            }}
            className="mt-5 h-10 px-5 rounded-xl bg-[#D13825] hover:bg-[#B82B19] text-white text-[13px] font-semibold transition-colors"
          >
            Reset all filters
          </button>
        </motion.div>
      )}
    </motion.section>
  );
}
