import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { DishCategory, MenuItem, RouteView } from '../types/sushi';
import { DishCard } from './DishCard';
import { ResilientImage } from './ResilientImage';

interface HomeViewProps {
  featuredDishes: MenuItem[];
  getDishCartQuantity: (dishId: string) => number;
  onNavigate: (view: RouteView, category?: DishCategory | 'All menu') => void;
  onOpenModal: (dish: MenuItem) => void;
  onQuickAdd: (dish: MenuItem) => void;
  onIncrement: (dishId: string) => void;
  onDecrement: (dishId: string) => void;
}

const HOME_CATEGORIES: Array<{ label: string; value: DishCategory | 'All menu'; isAll?: boolean }> = [
  { label: 'All menu', value: 'All menu', isAll: true },
  { label: 'Rolls', value: 'Rolls' },
  { label: 'Nigiri', value: 'Nigiri' },
  { label: 'Baked Rolls', value: 'Baked rolls' },
  { label: 'Sets', value: 'Sets' },
  { label: 'Drinks', value: 'Drinks' },
];

export function HomeView({
  featuredDishes,
  getDishCartQuantity,
  onNavigate,
  onOpenModal,
  onQuickAdd,
  onIncrement,
  onDecrement,
}: HomeViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* 1. Hero Section */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 pt-8 sm:pt-12 lg:pt-16 pb-12 sm:pb-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Headline Column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 xl:col-span-5"
          >
            <p className="text-[11px] font-semibold tracking-[0.14em] text-[#D13825] uppercase">
              FRESHLY MADE. NEVER RUSHED.
            </p>
            <h1 className="mt-4 font-display text-[40px] sm:text-[52px] lg:text-[58px] xl:text-[64px] font-bold tracking-[-0.03em] text-[#141312] leading-[1.03] text-balance">
              A little Japan.
              <br />A lot of flavor.
            </h1>
            <p className="mt-5 text-[15px] sm:text-[16px] leading-relaxed text-[#6E6A66] max-w-[420px]">
              Beautiful ingredients. Handcrafted rolls.
              <br className="hidden sm:inline" /> Your favorite ritual, delivered in 35 minutes.
            </p>

            <div className="mt-7 sm:mt-8 flex flex-col items-start gap-3">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate('menu', 'All menu')}
                className="h-12 px-6 rounded-xl bg-[#D13825] hover:bg-[#B82B19] text-white text-[14px] font-semibold inline-flex items-center gap-3 shadow-sm transition-colors"
              >
                <span>Explore Menu</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              <span className="text-[12px] text-[#8A837A]">Made to order. Made for you.</span>
            </div>
          </motion.div>

          {/* Right Hero Platter Photography */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 xl:col-span-7"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(20,19,18,0.1)] bg-[#E8E0D5] aspect-[618/510]">
              <ResilientImage
                src="/assets/images/hero_platter.jpg"
                alt="Handcrafted Kuroi Sushi platter with salmon nigiri, tuna, and signature rolls"
                fallbackLabel="Kuroi Signature Platter"
                className="w-full h-full object-cover object-left-bottom"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Category Quick Strip */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 pb-12 sm:pb-16">
        <p className="text-[10.5px] font-semibold tracking-[0.14em] text-[#9A948C] uppercase mb-4">
          FIND YOUR FAVORITE
        </p>
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
          {HOME_CATEGORIES.map((cat) => (
            <motion.button
              key={cat.label}
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate('menu', cat.value)}
              className={`h-11 sm:h-12 px-5 sm:px-7 rounded-xl text-[13.5px] font-medium inline-flex items-center justify-between gap-3 transition-all duration-200 whitespace-nowrap shrink-0 min-w-[130px] sm:min-w-[168px] ${
                cat.isAll
                  ? 'bg-[#141312] text-white hover:bg-[#2A2826] shadow-xs'
                  : 'bg-white text-[#141312] border border-[#E5DFD6]/80 hover:border-[#C9C1B6] shadow-[0_1px_4px_rgba(20,19,18,0.03)]'
              }`}
            >
              <span>{cat.label}</span>
              {cat.isAll && <ArrowUpRight className="w-3.5 h-3.5 text-white/80" />}
            </motion.button>
          ))}
        </div>
      </section>

      {/* 3. Chef's Specials / Popular Grid */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 pb-16 sm:pb-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7 sm:mb-9">
          <div>
            <p className="text-[10.5px] font-semibold tracking-[0.14em] text-[#D13825] uppercase">
              CHEF&apos;S SPECIALS / POPULAR
            </p>
            <h2 className="mt-1.5 font-display text-[28px] sm:text-[34px] font-bold tracking-tight text-[#141312] leading-tight">
              The ones you come back for.
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('menu', 'All menu')}
            className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-[#141312] hover:text-[#D13825] transition-colors self-start sm:self-auto whitespace-nowrap group"
          >
            <span>View full menu</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {featuredDishes.map((dish, idx) => (
            <DishCard
              key={dish.id}
              dish={dish}
              index={idx}
              variant="home"
              cartQuantity={getDishCartQuantity(dish.id)}
              onOpenModal={onOpenModal}
              onQuickAdd={onQuickAdd}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
            />
          ))}
        </div>
      </section>

      {/* 4. Our Craft Split Section */}
      <section
        id="our-craft"
        className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 pb-16 sm:pb-24 scroll-mt-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-stretch"
        >
          {/* Left Chef Photography */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden bg-[#E8E0D5] h-64 sm:h-80 lg:h-full min-h-[320px] shadow-[0_12px_36px_rgba(20,19,18,0.06)]">
              <ResilientImage
                src="/assets/images/craft_chef.jpg"
                alt="Sushi chef shaping salmon nigiri by hand on bamboo mat"
                fallbackLabel="Sushi Chef Craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Editorial Prose */}
          <div className="lg:col-span-6 flex flex-col justify-center py-2 lg:py-6">
            <p className="text-[10.5px] font-semibold tracking-[0.14em] text-[#D13825] uppercase">
              OUR CRAFT
            </p>
            <h2 className="mt-2.5 font-display text-[30px] sm:text-[38px] lg:text-[42px] font-bold tracking-tight text-[#141312] leading-[1.1] text-balance">
              Good sushi starts
              <br />
              long before the roll.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-[#57534E] max-w-[490px]">
              Ocean-fresh fish, carefully sourced. Japanese rice, seasoned in small batches.
              Every roll made by hand, only when you order. Nothing extra. Nothing less.
            </p>

            <div className="mt-8 pt-6 border-t border-[#E5DFD6] grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-[10.5px] font-semibold tracking-[0.14em] text-[#D13825] uppercase tabular-nums">
                  01 / FRESH DAILY
                </p>
                <p className="mt-1.5 text-[14px] font-semibold text-[#141312]">
                  Responsibly sourced fish
                </p>
              </div>
              <div>
                <p className="text-[10.5px] font-semibold tracking-[0.14em] text-[#D13825] uppercase tabular-nums">
                  02 / PERFECTLY SEASONED
                </p>
                <p className="mt-1.5 text-[14px] font-semibold text-[#141312]">
                  Authentic Japanese rice
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 5. Combo & Loyalty Promo Banner */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 pb-16 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl bg-[#D6422D] text-white p-7 sm:p-10 lg:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-[0_18px_40px_rgba(209,56,37,0.18)]"
        >
          <div className="max-w-[540px]">
            <p className="text-[10.5px] font-semibold tracking-[0.14em] text-white/80 uppercase">
              BETTER TOGETHER
            </p>
            <h2 className="mt-2 font-display text-[28px] sm:text-[34px] lg:text-[38px] font-bold tracking-tight leading-tight text-balance">
              More rolls. More reasons to stay in.
            </h2>
            <p className="mt-3 text-[14.5px] leading-relaxed text-white/85">
              Discover our combo sets. Join Kuroi Club and earn 5% back on every order.
            </p>

            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate('menu', 'Sets')}
              className="mt-6 h-11 px-5 rounded-xl bg-white hover:bg-[#FAF8F5] text-[#141312] text-[13.5px] font-semibold inline-flex items-center gap-2 transition-colors shadow-xs"
            >
              <span>Find your combo</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </div>

          <div className="md:text-right shrink-0 border-t border-white/20 pt-5 md:border-t-0 md:pt-0">
            <div className="font-display text-[56px] sm:text-[68px] lg:text-[76px] font-bold leading-none tracking-tight tabular-nums">
              5%
            </div>
            <p className="mt-1.5 text-[10.5px] font-semibold tracking-[0.14em] text-white/85 uppercase">
              BACK IN KUROI POINTS
            </p>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
