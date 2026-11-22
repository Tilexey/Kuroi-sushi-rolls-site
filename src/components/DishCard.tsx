import { motion } from 'motion/react';
import { Minus, Plus } from 'lucide-react';
import { MenuItem } from '../types/sushi';
import { ResilientImage } from './ResilientImage';

interface DishCardProps {
  dish: MenuItem;
  cartQuantity: number;
  variant?: 'home' | 'menu';
  onOpenModal: (dish: MenuItem) => void;
  onQuickAdd: (dish: MenuItem) => void;
  onIncrement: (dishId: string) => void;
  onDecrement: (dishId: string) => void;
  index?: number;
}

export function DishCard({
  dish,
  cartQuantity,
  variant = 'menu',
  onOpenModal,
  onQuickAdd,
  onIncrement,
  onDecrement,
  index = 0,
}: DishCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        duration: 0.28,
        delay: Math.min(index * 0.04, 0.2),
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -3 }}
      onClick={() => onOpenModal(dish)}
      className="group bg-white rounded-2xl overflow-hidden border border-[#E5DFD6]/60 shadow-[0_2px_10px_rgba(20,19,18,0.03)] hover:shadow-[0_12px_28px_rgba(20,19,18,0.08)] transition-shadow duration-300 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Image Container */}
        <div className="relative aspect-[300/216] w-full overflow-hidden bg-[#ECE5DB]">
          <ResilientImage
            src={dish.image}
            alt={`${dish.name} — ${dish.ingredients}`}
            fallbackLabel={dish.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
        </div>

        {/* Text Metadata */}
        <div className="p-4 sm:p-5 pb-3">
          <h3 className="font-display text-[17px] font-semibold tracking-tight text-[#141312] leading-snug group-hover:text-[#D13825] transition-colors duration-200">
            {dish.name}
          </h3>
          <p className="mt-1 text-[12.5px] font-medium text-[#9A948C] tabular-nums">
            {dish.weight} / {dish.pieces}
          </p>
          <p className="mt-2.5 text-[13px] leading-relaxed text-[#6E6A66] line-clamp-2 min-h-[2.4rem]">
            {dish.ingredients}
          </p>
        </div>
      </div>

      {/* Bottom Price & Action Bar */}
      <div
        className="px-4 sm:px-5 pb-4 sm:pb-5 pt-3 border-t border-[#F4EFE9] flex items-center justify-between gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="font-display text-[16px] font-semibold text-[#141312] tabular-nums">
          ${dish.price.toFixed(2)}
        </span>

        {cartQuantity > 0 ? (
          <motion.div
            initial={{ scale: 0.92, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 450, damping: 28 }}
            className="flex items-center bg-[#F4EFE9] rounded-lg border border-[#E5DFD6] h-10 md:h-9 px-1"
          >
            <button
              type="button"
              onClick={() => onDecrement(dish.id)}
              className="w-8 h-8 flex items-center justify-center rounded-md text-[#57534E] hover:text-[#141312] hover:bg-white transition-colors active:scale-90"
              aria-label={`Remove one ${dish.name}`}
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-7 text-center text-[13px] font-semibold text-[#141312] tabular-nums select-none">
              {cartQuantity}
            </span>
            <button
              type="button"
              onClick={() => onIncrement(dish.id)}
              className="w-8 h-8 flex items-center justify-center rounded-md text-[#57534E] hover:text-[#141312] hover:bg-white transition-colors active:scale-90"
              aria-label={`Add one more ${dish.name}`}
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ) : variant === 'home' ? (
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => onQuickAdd(dish)}
            className="h-10 md:h-9 px-4 rounded-lg bg-[#F4EFE9] hover:bg-[#141312] text-[#141312] hover:text-white text-[13px] font-medium inline-flex items-center gap-1.5 transition-colors duration-200 whitespace-nowrap shrink-0"
          >
            <span>Add</span>
            <Plus className="w-3.5 h-3.5" />
          </motion.button>
        ) : (
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => onQuickAdd(dish)}
            className="h-10 md:h-9 px-4 rounded-lg bg-[#D13825] hover:bg-[#B82B19] text-white text-[13px] font-medium inline-flex items-center gap-1.5 transition-colors duration-200 whitespace-nowrap shrink-0"
          >
            <span>Add to Cart</span>
            <Plus className="w-3.5 h-3.5" />
          </motion.button>
        )}
      </div>
    </motion.article>
  );
}
