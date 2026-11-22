import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Minus,
  Plus,
  ShoppingBag,
  Tag,
  X,
} from 'lucide-react';
import {
  CartAddon,
  CartItem,
  MenuItem,
  OrderConfirmation,
  RouteView,
} from '../types/sushi';
import { CART_ADDONS } from '../data/menuData';
import { ResilientImage } from './ResilientImage';

interface CartViewProps {
  cartItems: CartItem[];
  allDishes: MenuItem[];
  onNavigate: (view: RouteView) => void;
  onUpdateQuantity: (cartKey: string, delta: number) => void;
  onRemoveItem: (cartKey: string) => void;
  onAddAddon: (addon: CartAddon) => void;
  onPlaceOrder: (confirmation: OrderConfirmation) => void;
  orderConfirmation: OrderConfirmation | null;
  onResetOrder: () => void;
}

const PROMO_CODES: Record<string, { type: 'percent' | 'fixed'; value: number; label: string }> = {
  KUROI5: { type: 'percent', value: 0.05, label: '5% off (Kuroi Club)' },
  WELCOME10: { type: 'fixed', value: 10, label: '$10.00 off welcome offer' },
};

const TIME_SLOTS = [
  'Today, 12:30 – 1:00 PM',
  'Today, 1:30 – 2:00 PM',
  'Today, 6:00 – 6:30 PM',
  'Today, 7:00 – 7:30 PM',
  'Today, 8:00 – 8:30 PM',
];

export function CartView({
  cartItems,
  onNavigate,
  onUpdateQuantity,
  onRemoveItem,
  onAddAddon,
  onPlaceOrder,
  orderConfirmation,
  onResetOrder,
}: CartViewProps) {
  const [fulfillment, setFulfillment] = useState<'delivery' | 'pickup'>('delivery');
  const [chopsticks, setChopsticks] = useState(2);
  const [deliveryTimeMode, setDeliveryTimeMode] = useState<'asap' | 'later'>('asap');
  const [scheduledSlot, setScheduledSlot] = useState(TIME_SLOTS[2]);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');

  const [fullName, setFullName] = useState('Alex Morgan');
  const [phone, setPhone] = useState('(212) 555-0142');
  const [street, setStreet] = useState('128 Spring Street');
  const [apt, setApt] = useState('Apt 4B');
  const [zip, setZip] = useState('10012');

  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');
  const [formError, setFormError] = useState('');

  const addonsScrollRef = useRef<HTMLDivElement>(null);

  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const promoRule = appliedPromo ? PROMO_CODES[appliedPromo] : null;
  const discountAmount = promoRule
    ? promoRule.type === 'percent'
      ? Number((subtotal * promoRule.value).toFixed(2))
      : Math.min(subtotal, promoRule.value)
    : 0;

  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  const deliveryFee =
    fulfillment === 'pickup' ? 0 : discountedSubtotal >= 50 || discountedSubtotal === 0 ? 0 : 4.99;
  const salesTax = Number((discountedSubtotal * 0.08875).toFixed(2));
  const finalTotal = Number((discountedSubtotal + deliveryFee + salesTax).toFixed(2));

  const scrollAddons = (dir: 'left' | 'right') => {
    if (!addonsScrollRef.current) return;
    const offset = dir === 'left' ? -240 : 240;
    addonsScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (!code) {
      setPromoError('Enter a promo code (try KUROI5)');
      return;
    }
    if (PROMO_CODES[code]) {
      setAppliedPromo(code);
      setPromoError('');
    } else {
      setPromoError('Code not recognized. Try KUROI5 or WELCOME10.');
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    if (!fullName.trim() || !phone.trim()) {
      setFormError('Please enter your name and phone number.');
      return;
    }
    if (fulfillment === 'delivery' && (!street.trim() || !zip.trim())) {
      setFormError('Please enter your street address and ZIP code.');
      return;
    }

    setFormError('');
    const orderNum = `KR-${Math.floor(1000 + Math.random() * 9000)}`;
    onPlaceOrder({
      orderNumber: orderNum,
      mode: fulfillment,
      customerName: fullName.trim(),
      address:
        fulfillment === 'delivery'
          ? `${street.trim()}${apt.trim() ? `, ${apt.trim()}` : ''}, NY ${zip.trim()}`
          : '128 Spring Street, New York, NY 10012 (Pickup)',
      eta:
        deliveryTimeMode === 'asap'
          ? fulfillment === 'delivery'
            ? '35–45 minutes'
            : '15–20 minutes'
          : scheduledSlot,
      paymentMethod,
      total: finalTotal,
      itemsCount: totalItemsCount,
      chopsticks,
    });
  };

  // Order Confirmation State
  if (orderConfirmation) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[720px] mx-auto px-4 sm:px-6 py-12 sm:py-20"
      >
        <div className="bg-white rounded-3xl border border-[#E5DFD6] p-7 sm:p-10 shadow-[0_14px_40px_rgba(20,19,18,0.06)]">
          <div className="w-12 h-12 rounded-2xl bg-[#D13825]/10 text-[#D13825] flex items-center justify-center mb-5">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <p className="text-[11px] font-semibold tracking-[0.14em] text-[#D13825] uppercase tabular-nums">
            ORDER #{orderConfirmation.orderNumber} CONFIRMED
          </p>
          <h1 className="mt-2 font-display text-[30px] sm:text-[38px] font-bold tracking-tight text-[#141312] leading-tight">
            It&apos;s rolling, {orderConfirmation.customerName.split(' ')[0]}.
          </h1>
          <p className="mt-2.5 text-[15px] text-[#6E6A66] leading-relaxed">
            Our chefs have received your order and are preparing every roll fresh by hand.
          </p>

          <div className="mt-7 pt-6 border-t border-[#EFE9E0] grid grid-cols-1 sm:grid-cols-2 gap-5 text-[13.5px]">
            <div>
              <p className="text-[10.5px] font-semibold tracking-[0.12em] text-[#9A948C] uppercase">
                {orderConfirmation.mode === 'delivery' ? 'DELIVERING TO' : 'PICKUP LOCATION'}
              </p>
              <p className="mt-1.5 font-medium text-[#141312]">{orderConfirmation.address}</p>
            </div>
            <div>
              <p className="text-[10.5px] font-semibold tracking-[0.12em] text-[#9A948C] uppercase">
                ESTIMATED TIME
              </p>
              <p className="mt-1.5 font-medium text-[#141312] inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#D13825]" />
                {orderConfirmation.eta}
              </p>
            </div>
            <div>
              <p className="text-[10.5px] font-semibold tracking-[0.12em] text-[#9A948C] uppercase">
                ORDER SUMMARY
              </p>
              <p className="mt-1.5 font-medium text-[#141312] tabular-nums">
                {orderConfirmation.itemsCount}{' '}
                {orderConfirmation.itemsCount === 1 ? 'dish' : 'dishes'} ·{' '}
                {orderConfirmation.chopsticks} chopstick sets
              </p>
            </div>
            <div>
              <p className="text-[10.5px] font-semibold tracking-[0.12em] text-[#9A948C] uppercase">
                TOTAL PAID ({orderConfirmation.paymentMethod === 'card' ? 'CARD' : 'CASH'})
              </p>
              <p className="mt-1.5 font-display text-lg font-bold text-[#141312] tabular-nums">
                ${orderConfirmation.total.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#EFE9E0] flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => {
                onResetOrder();
                onNavigate('menu');
              }}
              className="h-12 px-6 rounded-xl bg-[#D13825] hover:bg-[#B82B19] text-white text-[14px] font-semibold transition-colors"
            >
              Browse Menu
            </button>
            <button
              type="button"
              onClick={() => {
                onResetOrder();
                onNavigate('home');
              }}
              className="h-12 px-6 rounded-xl bg-[#F4EFE9] hover:bg-[#ECE5DB] text-[#141312] text-[14px] font-semibold transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </motion.section>
    );
  }

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
        <span className="text-[#141312]">YOUR CART</span>
      </nav>

      {/* Header Row */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="flex flex-wrap items-baseline gap-3 sm:gap-5">
          <h1 className="font-display text-[34px] sm:text-[44px] lg:text-[50px] font-bold tracking-[-0.03em] text-[#141312] leading-[1.06]">
            Your next good meal.
          </h1>
          <span className="text-[14px] text-[#8A837A] tabular-nums">
            {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('menu')}
          className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-[#D13825] hover:text-[#B82B19] transition-colors self-start sm:self-auto whitespace-nowrap group"
        >
          <span>Continue exploring</span>
          <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>

      {/* Main 2-Column Cart & Checkout Grid */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Items, Chopsticks, Extras, Promo */}
        <div className="lg:col-span-7 space-y-6">
          {/* Cart Items */}
          {cartItems.length > 0 ? (
            <div className="space-y-3.5">
              <AnimatePresence initial={false}>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.cartKey}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-white rounded-2xl border border-[#E5DFD6]/80 p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_2px_10px_rgba(20,19,18,0.025)]"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-20 h-16 sm:w-24 sm:h-[72px] rounded-xl overflow-hidden bg-[#ECE5DB] shrink-0">
                        <ResilientImage
                          src={item.image}
                          alt={item.name}
                          fallbackLabel={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h2 className="font-display text-[16px] font-semibold text-[#141312] truncate">
                          {item.name}
                        </h2>
                        <p className="text-[12.5px] text-[#8A837A] mt-0.5 tabular-nums">
                          {item.weightLabel}
                        </p>
                        {item.extras.length > 0 && (
                          <p className="text-[11.5px] text-[#D13825] mt-1 truncate">
                            + {item.extras.map((ex) => ex.label).join(', ')}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F4EFE9]">
                      {/* Quantity Stepper */}
                      <div className="flex items-center bg-[#FAF8F5] border border-[#E5DFD6] rounded-xl h-9 px-1">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartKey, -1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg text-[#57534E] hover:text-[#141312] hover:bg-white transition-colors"
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center text-[13px] font-semibold text-[#141312] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartKey, 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg text-[#57534E] hover:text-[#141312] hover:bg-white transition-colors"
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-display text-[15.5px] font-semibold text-[#141312] tabular-nums min-w-[60px] text-right">
                          ${(item.unitPrice * item.quantity).toFixed(2)}
                        </span>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.cartKey)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[#9A948C] hover:text-[#D13825] hover:bg-[#F4EFE9] transition-colors"
                          aria-label={`Remove ${item.name}`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl border border-[#E5DFD6] p-10 text-center"
            >
              <ShoppingBag className="w-8 h-8 text-[#9A948C] mx-auto mb-3" strokeWidth={1.6} />
              <p className="font-display text-lg font-semibold text-[#141312]">
                Your bag is empty
              </p>
              <p className="mt-1.5 text-[13.5px] text-[#6E6A66]">
                Explore our handcrafted rolls, nigiri, and combo sets to get started.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('menu')}
                className="mt-5 h-11 px-6 rounded-xl bg-[#D13825] hover:bg-[#B82B19] text-white text-[13.5px] font-semibold transition-colors"
              >
                Explore Menu
              </button>
            </motion.div>
          )}

          {/* Chopsticks & Napkins Row */}
          <div className="bg-[#ECE5DB]/75 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 border border-[#E5DFD6]/60">
            <div>
              <h3 className="font-display text-[15px] font-semibold text-[#141312]">
                A seat for everyone
              </h3>
              <p className="text-[12.5px] text-[#6E6A66] mt-0.5">
                How many sets of chopsticks &amp; napkins?
              </p>
            </div>

            <div className="flex items-center bg-white border border-[#E5DFD6] rounded-xl h-10 px-1 shrink-0">
              <button
                type="button"
                onClick={() => setChopsticks((c) => Math.max(0, c - 1))}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#57534E] hover:text-[#141312] hover:bg-[#F4EFE9] transition-colors"
                aria-label="Decrease chopstick sets"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-[13.5px] font-semibold text-[#141312] tabular-nums">
                {chopsticks}
              </span>
              <button
                type="button"
                onClick={() => setChopsticks((c) => c + 1)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#57534E] hover:text-[#141312] hover:bg-[#F4EFE9] transition-colors"
                aria-label="Increase chopstick sets"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* A little something extra? */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="font-display text-[17px] font-semibold text-[#141312]">
                A little something extra?
              </h3>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => scrollAddons('left')}
                  className="w-8 h-8 rounded-full bg-white border border-[#E5DFD6] flex items-center justify-center text-[#57534E] hover:text-[#141312] transition-colors"
                  aria-label="Scroll extras left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollAddons('right')}
                  className="w-8 h-8 rounded-full bg-white border border-[#E5DFD6] flex items-center justify-center text-[#57534E] hover:text-[#141312] transition-colors"
                  aria-label="Scroll extras right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              ref={addonsScrollRef}
              className="flex gap-3.5 overflow-x-auto no-scrollbar pb-1"
            >
              {CART_ADDONS.map((addon) => (
                <motion.div
                  key={addon.id}
                  whileHover={{ y: -2 }}
                  className="min-w-[260px] sm:min-w-[285px] bg-white rounded-2xl border border-[#E5DFD6]/80 p-3 flex items-center gap-3.5 shrink-0 shadow-[0_2px_8px_rgba(20,19,18,0.02)]"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#ECE5DB] shrink-0">
                    <ResilientImage
                      src={addon.image}
                      alt={addon.name}
                      fallbackLabel={addon.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-[14px] font-semibold text-[#141312] truncate">
                      {addon.name}
                    </p>
                    <p className="text-[12px] text-[#8A837A] tabular-nums mt-0.5">
                      {addon.size} · ${addon.price.toFixed(2)}
                    </p>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.94 }}
                      onClick={() => onAddAddon(addon)}
                      className="mt-2 h-7 px-3 rounded-lg bg-[#F4EFE9] hover:bg-[#141312] text-[#141312] hover:text-white text-[11.5px] font-semibold inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Add</span>
                      <Plus className="w-3 h-3" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Promo Code */}
          <div className="bg-white rounded-2xl border border-[#E5DFD6]/80 p-4 sm:p-5">
            <label
              htmlFor="promo-code-input"
              className="block text-[12.5px] font-semibold text-[#141312] mb-2.5"
            >
              Have a little secret code?
            </label>
            <form onSubmit={handleApplyPromo} className="flex items-center gap-2.5">
              <div className="relative flex-1">
                <Tag className="w-4 h-4 text-[#9A948C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="promo-code-input"
                  type="text"
                  value={promoInput}
                  onChange={(e) => {
                    setPromoInput(e.target.value);
                    setPromoError('');
                  }}
                  placeholder="Enter promo code (e.g. KUROI5)"
                  className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-[#FAF8F5] border border-[#E5DFD6] text-[13.5px] text-[#141312] placeholder:text-[#9A948C] focus:outline-none focus:border-[#141312] transition-colors"
                />
              </div>
              <button
                type="submit"
                className="h-11 px-5 rounded-xl bg-[#ECE5DB] hover:bg-[#141312] text-[#141312] hover:text-white text-[13px] font-semibold transition-colors shrink-0"
              >
                Apply
              </button>
            </form>

            {appliedPromo && promoRule && (
              <div className="mt-2.5 flex items-center justify-between text-[12.5px] text-[#141312] bg-[#F4EFE9] px-3 py-2 rounded-lg">
                <span>
                  Applied <strong className="font-semibold">{appliedPromo}</strong> — {promoRule.label}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setAppliedPromo(null);
                    setPromoInput('');
                  }}
                  className="text-[#D13825] font-medium hover:underline ml-2"
                >
                  Remove
                </button>
              </div>
            )}

            {promoError && <p className="mt-2 text-[12px] text-[#D13825]">{promoError}</p>}
          </div>

          <p className="text-[12px] text-[#8A837A] pt-1">
            Made to order. Packed with care. Delivered with a smile.
          </p>
        </div>

        {/* Right Column: Delivery & Checkout Panel */}
        <div className="lg:col-span-5">
          <form
            onSubmit={handleSubmitOrder}
            className="bg-white rounded-3xl border border-[#E5DFD6]/90 p-5 sm:p-7 shadow-[0_12px_36px_rgba(20,19,18,0.04)] space-y-5"
          >
            <div>
              <h2 className="font-display text-[22px] font-bold tracking-tight text-[#141312]">
                Almost at your door.
              </h2>

              {/* Delivery / Pickup Segmented Toggle */}
              <div className="mt-4 grid grid-cols-2 p-1 bg-[#F4EFE9] rounded-xl relative">
                {(['delivery', 'pickup'] as const).map((mode) => {
                  const active = fulfillment === mode;
                  return (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setFulfillment(mode)}
                      className={`relative z-10 h-10 rounded-lg text-[13px] font-semibold capitalize transition-colors duration-200 ${
                        active ? 'text-white' : 'text-[#57534E] hover:text-[#141312]'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="fulfillmentToggleBg"
                          transition={{ type: 'spring', stiffness: 450, damping: 34 }}
                          className="absolute inset-0 bg-[#141312] rounded-lg -z-10"
                        />
                      )}
                      {mode === 'delivery' ? 'Delivery' : 'Pickup'}
                    </button>
                  );
                })}
              </div>

              <p className="mt-3 text-[12.5px] font-medium text-[#D13825]">
                {fulfillment === 'delivery'
                  ? discountedSubtotal >= 50 || subtotal === 0
                    ? '35–45 min · Free delivery'
                    : '35–45 min · $4.99 delivery (free on $50+)'
                  : '15–20 min · Pickup at 128 Spring Street'}
              </p>
            </div>

            {/* Delivery / Contact Details */}
            <div className="space-y-3 pt-1">
              <p className="text-[12.5px] font-semibold text-[#141312]">
                {fulfillment === 'delivery' ? 'Delivery details' : 'Pickup contact'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="full-name" className="block text-[11px] text-[#8A837A] mb-1">
                    Full name
                  </label>
                  <input
                    id="full-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-[#E5DFD6] bg-white text-[13px] text-[#141312] focus:outline-none focus:border-[#141312]"
                  />
                </div>
                <div>
                  <label htmlFor="phone-number" className="block text-[11px] text-[#8A837A] mb-1">
                    Phone number
                  </label>
                  <input
                    id="phone-number"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-[#E5DFD6] bg-white text-[13px] text-[#141312] focus:outline-none focus:border-[#141312]"
                  />
                </div>
              </div>

              {fulfillment === 'delivery' && (
                <>
                  <div>
                    <label htmlFor="street-address" className="block text-[11px] text-[#8A837A] mb-1">
                      Street address
                    </label>
                    <input
                      id="street-address"
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-[#E5DFD6] bg-white text-[13px] text-[#141312] focus:outline-none focus:border-[#141312]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="apt-floor" className="block text-[11px] text-[#8A837A] mb-1">
                        Apartment / floor
                      </label>
                      <input
                        id="apt-floor"
                        type="text"
                        value={apt}
                        onChange={(e) => setApt(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-[#E5DFD6] bg-white text-[13px] text-[#141312] focus:outline-none focus:border-[#141312]"
                      />
                    </div>
                    <div>
                      <label htmlFor="zip-code" className="block text-[11px] text-[#8A837A] mb-1">
                        ZIP code
                      </label>
                      <input
                        id="zip-code"
                        type="text"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-[#E5DFD6] bg-white text-[13px] text-[#141312] tabular-nums focus:outline-none focus:border-[#141312]"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Delivery Time */}
            <div className="pt-1">
              <p className="text-[11.5px] font-medium text-[#6E6A66] mb-2">
                {fulfillment === 'delivery' ? 'Delivery time' : 'Pickup time'}
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setDeliveryTimeMode('asap')}
                  className={`h-10 px-3 rounded-xl text-[12.5px] font-medium border flex items-center justify-center gap-1.5 transition-all ${
                    deliveryTimeMode === 'asap'
                      ? 'bg-[#EFE9E0] border-[#141312]/30 text-[#141312] font-semibold'
                      : 'bg-white border-[#E5DFD6] text-[#6E6A66] hover:text-[#141312]'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      deliveryTimeMode === 'asap' ? 'bg-[#D13825]' : 'bg-[#C9C1B6]'
                    }`}
                  />
                  <span>ASAP · {fulfillment === 'delivery' ? '35–45 min' : '15–20 min'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryTimeMode('later')}
                  className={`h-10 px-3 rounded-xl text-[12.5px] font-medium border flex items-center justify-center gap-1.5 transition-all ${
                    deliveryTimeMode === 'later'
                      ? 'bg-[#EFE9E0] border-[#141312]/30 text-[#141312] font-semibold'
                      : 'bg-white border-[#E5DFD6] text-[#6E6A66] hover:text-[#141312]'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Schedule for later</span>
                </button>
              </div>

              <AnimatePresence>
                {deliveryTimeMode === 'later' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <select
                      value={scheduledSlot}
                      onChange={(e) => setScheduledSlot(e.target.value)}
                      className="mt-2.5 w-full h-10 px-3 rounded-xl border border-[#E5DFD6] bg-[#FAF8F5] text-[13px] text-[#141312] focus:outline-none focus:border-[#141312]"
                      aria-label="Select scheduled time slot"
                    >
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Payment Method */}
            <div className="pt-1">
              <p className="text-[12.5px] font-semibold text-[#141312] mb-2">Payment method</p>
              <div className="space-y-2">
                <label
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                    paymentMethod === 'card'
                      ? 'border-[#141312]/35 bg-[#FAF8F5]'
                      : 'border-[#E5DFD6] bg-white hover:bg-[#FAF8F5]/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="accent-[#141312]"
                    />
                    <div>
                      <p className="text-[13px] font-semibold text-[#141312]">Card online</p>
                      <p className="text-[11px] text-[#8A837A] mt-0.5">
                        VISA · Mastercard · Apple Pay
                      </p>
                    </div>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-colors ${
                    paymentMethod === 'cash'
                      ? 'border-[#141312]/35 bg-[#FAF8F5]'
                      : 'border-[#E5DFD6] bg-white hover:bg-[#FAF8F5]/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cash'}
                    onChange={() => setPaymentMethod('cash')}
                    className="accent-[#141312]"
                  />
                  <span className="text-[13px] font-medium text-[#141312]">
                    {fulfillment === 'delivery' ? 'Cash on delivery' : 'Pay on pickup'}
                  </span>
                </label>
              </div>
            </div>

            {/* Totals Breakdown */}
            <div className="pt-4 border-t border-[#EFE9E0] space-y-2 text-[13px]">
              <div className="flex items-center justify-between text-[#6E6A66]">
                <span className="tabular-nums">
                  Subtotal · {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}
                </span>
                <span className="font-medium text-[#141312] tabular-nums">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex items-center justify-between text-[#D13825]">
                  <span>Promo ({appliedPromo})</span>
                  <span className="font-medium tabular-nums">-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-[#6E6A66]">
                <span>{fulfillment === 'delivery' ? 'Delivery' : 'Pickup'}</span>
                <span
                  className={`font-medium tabular-nums ${
                    deliveryFee === 0 ? 'text-[#D13825]' : 'text-[#141312]'
                  }`}
                >
                  {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>

              <div className="flex items-center justify-between text-[#6E6A66]">
                <span>Sales tax (8.875%)</span>
                <span className="font-medium text-[#141312] tabular-nums">
                  ${salesTax.toFixed(2)}
                </span>
              </div>

              <div className="pt-3 border-t border-[#EFE9E0] flex items-baseline justify-between">
                <span className="font-display text-[17px] font-bold text-[#141312]">Total</span>
                <span className="font-display text-[22px] font-bold text-[#141312] tabular-nums">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {formError && <p className="text-[12.5px] text-[#D13825] font-medium">{formError}</p>}

            <motion.button
              type="submit"
              whileTap={{ scale: 0.98 }}
              disabled={cartItems.length === 0}
              className="w-full h-12 px-5 rounded-xl bg-[#D13825] hover:bg-[#B82B19] disabled:bg-[#D9D0C3] disabled:cursor-not-allowed text-white text-[14px] font-semibold flex items-center justify-between transition-colors shadow-sm"
            >
              <span>Place order</span>
              <span className="tabular-nums font-bold">${finalTotal.toFixed(2)}</span>
            </motion.button>

            <p className="text-[11px] text-[#9A948C]">
              By placing your order, you agree to our Terms.
            </p>
          </form>
        </div>
      </div>
    </motion.section>
  );
}
