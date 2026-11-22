import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Minus, Plus, X } from 'lucide-react';
import { ExtraOption, MenuItem } from '../types/sushi';
import { MAKE_IT_YOURS_EXTRAS } from '../data/menuData';
import { ResilientImage } from './ResilientImage';

interface ProductModalProps {
  dish: MenuItem | null;
  onClose: () => void;
  onAddToCart: (dish: MenuItem, quantity: number, extras: ExtraOption[]) => void;
}

export function ProductModal({ dish, onClose, onAddToCart }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedExtraIds, setSelectedExtraIds] = useState<string[]>([]);

  useEffect(() => {
    if (dish) {
      setQuantity(1);
      setSelectedExtraIds([]);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [dish]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (dish) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [dish, onClose]);

  const toggleExtra = (id: string) => {
    setSelectedExtraIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedExtras = MAKE_IT_YOURS_EXTRAS.filter((extra) =>
    selectedExtraIds.includes(extra.id)
  );
  const extrasSum = selectedExtras.reduce((sum, item) => sum + item.price, 0);
  const unitTotal = dish ? dish.price + extrasSum : 0;
  const lineTotal = unitTotal * quantity;

  const handleConfirmAdd = () => {
    if (!dish) return;
    onAddToCart(dish, quantity, selectedExtras);
    onClose();
  };

  return (
    <AnimatePresence>
      {dish && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-dish-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#141312]/55 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 360, damping: 32 }}
            className="relative z-10 w-full max-w-[920px] max-h-[92vh] md:max-h-[88vh] bg-white rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:grid md:grid-cols-12"
          >
            {/* Mobile Close Handle & Floating Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/95 md:bg-[#F4EFE9]/90 hover:bg-[#ECE5DB] text-[#141312] flex items-center justify-center shadow-sm border border-[#E5DFD6]/80 transition-all active:scale-90"
              aria-label="Close product details"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Left Column: Photo + Craft Statement */}
            <div className="md:col-span-6 bg-[#FAF8F5] flex flex-col justify-between overflow-hidden shrink-0">
              <div className="relative h-56 sm:h-68 md:h-[360px] w-full overflow-hidden bg-[#ECE5DB]">
                <ResilientImage
                  src={dish.modalImage || dish.image}
                  alt={dish.name}
                  fallbackLabel={dish.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="hidden md:block p-7 lg:p-8 bg-[#FAF8F5] border-t border-[#EFE9E0]">
                <p className="text-[10.5px] font-semibold tracking-[0.14em] text-[#D13825] uppercase">
                  HANDCRAFTED, ALWAYS.
                </p>
                <h4 className="mt-2 font-display text-[22px] font-semibold tracking-tight text-[#141312] leading-snug">
                  Simple ingredients.
                  <br />
                  Something extraordinary.
                </h4>
                <p className="mt-3 text-[13px] leading-relaxed text-[#6E6A66]">
                  {dish.craftNote}
                </p>
              </div>
            </div>

            {/* Right Column: Dish Details, Nutrition, Extras, Action Bar */}
            <div className="md:col-span-6 flex flex-col max-h-[calc(92vh-14rem)] md:max-h-[88vh] bg-white">
              <div className="p-5 sm:p-7 lg:p-8 overflow-y-auto flex-1 space-y-5">
                <div>
                  <p className="text-[10.5px] font-semibold tracking-[0.14em] text-[#D13825] uppercase pr-8">
                    {dish.kicker}
                  </p>
                  <h2
                    id="modal-dish-title"
                    className="mt-1.5 font-display text-[26px] sm:text-[30px] font-bold tracking-tight text-[#141312] leading-tight"
                  >
                    {dish.name}
                  </h2>
                  <p className="mt-1 text-[13px] font-medium text-[#9A948C] tabular-nums">
                    {dish.weight} / {dish.pieces}
                  </p>
                  <p className="mt-3.5 text-[14.5px] leading-relaxed text-[#57534E]">
                    {dish.description}
                  </p>
                </div>

                {/* Ingredients */}
                <div className="pt-4 border-t border-[#EFE9E0]">
                  <h3 className="text-[13px] font-semibold text-[#141312]">Ingredients</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[#6E6A66]">
                    {dish.ingredients}. Prepared daily with short-grain Japanese sushi rice, seasoned
                    vinegar, crisp roasted nori, and toasted sesame seeds.
                  </p>
                </div>

                {/* Nutrition per 100g */}
                <div className="pt-4 border-t border-[#EFE9E0]">
                  <p className="text-[10.5px] font-semibold tracking-[0.14em] text-[#9A948C] uppercase">
                    NUTRITION PER 100G
                  </p>
                  <div className="mt-3 grid grid-cols-4 gap-3">
                    <div>
                      <div className="font-display text-[17px] font-semibold text-[#141312] tabular-nums">
                        {dish.nutrition.kcal}
                      </div>
                      <div className="text-[11px] text-[#8A837A]">kcal</div>
                    </div>
                    <div>
                      <div className="font-display text-[17px] font-semibold text-[#141312] tabular-nums">
                        {dish.nutrition.protein}
                      </div>
                      <div className="text-[11px] text-[#8A837A]">Protein</div>
                    </div>
                    <div>
                      <div className="font-display text-[17px] font-semibold text-[#141312] tabular-nums">
                        {dish.nutrition.carbs}
                      </div>
                      <div className="text-[11px] text-[#8A837A]">Carbs</div>
                    </div>
                    <div>
                      <div className="font-display text-[17px] font-semibold text-[#141312] tabular-nums">
                        {dish.nutrition.fat}
                      </div>
                      <div className="text-[11px] text-[#8A837A]">Fat</div>
                    </div>
                  </div>
                  <p className="mt-3.5 text-[12px] text-[#D13825]">
                    Allergens: {dish.allergens}
                  </p>
                </div>

                {/* Make it yours */}
                <div className="pt-4 border-t border-[#EFE9E0]">
                  <h3 className="text-[13px] font-semibold text-[#141312] mb-2.5">
                    Make it yours
                  </h3>
                  <div className="space-y-2">
                    {MAKE_IT_YOURS_EXTRAS.map((extra) => {
                      const checked = selectedExtraIds.includes(extra.id);
                      return (
                        <label
                          key={extra.id}
                          className={`flex items-center justify-between py-2 px-3 rounded-xl border cursor-pointer transition-all duration-150 ${
                            checked
                              ? 'bg-[#FAF8F5] border-[#D13825]/40'
                              : 'bg-white border-[#EFE9E0] hover:border-[#D9D0C3]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleExtra(extra.id)}
                              className="sr-only"
                            />
                            <span
                              className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors ${
                                checked
                                  ? 'bg-[#D13825] border-[#D13825] text-white'
                                  : 'bg-white border-[#C9C1B6]'
                              }`}
                            >
                              {checked && <Check className="w-3 h-3" strokeWidth={3} />}
                            </span>
                            <span className="text-[13px] font-medium text-[#141312]">
                              {extra.label}
                            </span>
                          </div>
                          <span className="text-[12.5px] font-medium text-[#6E6A66] tabular-nums">
                            +${extra.price.toFixed(2)}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Sticky Bottom Purchase Bar */}
              <div className="p-4 sm:p-6 lg:px-8 border-t border-[#EFE9E0] bg-white shrink-0">
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-[#F4EFE9] border border-[#E5DFD6] rounded-xl h-12 px-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-9 h-9 flex items-center justify-center rounded-lg text-[#57534E] hover:text-[#141312] hover:bg-white transition-colors active:scale-90"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center text-[14px] font-semibold text-[#141312] tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-9 h-9 flex items-center justify-center rounded-lg text-[#57534E] hover:text-[#141312] hover:bg-white transition-colors active:scale-90"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.98 }}
                    onClick={handleConfirmAdd}
                    className="flex-1 h-12 px-5 rounded-xl bg-[#D13825] hover:bg-[#B82B19] text-white text-[14px] font-semibold flex items-center justify-between transition-colors shadow-sm"
                  >
                    <span>Add to Cart</span>
                    <span className="tabular-nums font-bold">${lineTotal.toFixed(2)}</span>
                  </motion.button>
                </div>

                <p className="mt-2.5 text-[11.5px] text-[#8A837A]">
                  Soy sauce, wasabi &amp; ginger included with every roll.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
