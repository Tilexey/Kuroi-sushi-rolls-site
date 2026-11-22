import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check } from 'lucide-react';
import {
  CartAddon,
  CartItem,
  DishCategory,
  ExtraOption,
  MenuItem,
  OrderConfirmation,
  RouteView,
} from './types/sushi';
import { INITIAL_CART_IDS, MENU_ITEMS, NEIGHBORHOODS } from './data/menuData';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { MenuView } from './components/MenuView';
import { CartView } from './components/CartView';
import { ProductModal } from './components/ProductModal';
import { Footer } from './components/Footer';

function buildInitialCart(): CartItem[] {
  return INITIAL_CART_IDS.map((id): CartItem | null => {
    const dish = MENU_ITEMS.find((m) => m.id === id);
    if (!dish) return null;
    return {
      cartKey: dish.id,
      dishId: dish.id,
      name: dish.name,
      weightLabel: `${dish.weight} / ${dish.pieces}`,
      unitPrice: dish.price,
      image: dish.image,
      quantity: 1,
      extras: [],
    };
  }).filter((item): item is CartItem => item !== null);
}

export default function App() {
  const [activeView, setActiveView] = useState<RouteView>('home');
  const [activeCategory, setActiveCategory] = useState<DishCategory | 'All menu'>('All menu');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>(NEIGHBORHOODS[0]);
  const [cartItems, setCartItems] = useState<CartItem[]>(buildInitialCart);
  const [modalDish, setModalDish] = useState<MenuItem | null>(null);
  const [orderConfirmation, setOrderConfirmation] = useState<OrderConfirmation | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const featuredDishes = useMemo(
    () => MENU_ITEMS.filter((item) => item.featured).slice(0, 4),
    []
  );

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const cartSubtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [cartItems]
  );

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    window.clearTimeout((triggerToast as unknown as { t?: number }).t);
    (triggerToast as unknown as { t?: number }).t = window.setTimeout(() => {
      setToastMessage(null);
    }, 2200);
  };

  const handleNavigate = (
    view: RouteView,
    category?: DishCategory | 'All menu',
    scrollTarget?: string
  ) => {
    if (category) {
      setActiveCategory(category);
    }
    setActiveView(view);
    if (view !== 'cart') {
      setOrderConfirmation(null);
    }
    if (scrollTarget) {
      window.setTimeout(() => {
        const el = document.getElementById(scrollTarget);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 120);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getDishCartQuantity = (dishId: string) => {
    return cartItems
      .filter((item) => item.dishId === dishId)
      .reduce((sum, item) => sum + item.quantity, 0);
  };

  const handleAddToCart = (dish: MenuItem, quantity = 1, extras: ExtraOption[] = []) => {
    const extraIds = extras
      .map((e) => e.id)
      .sort()
      .join(',');
    const cartKey = extraIds ? `${dish.id}::${extraIds}` : dish.id;
    const extrasPrice = extras.reduce((sum, e) => sum + e.price, 0);
    const unitPrice = dish.price + extrasPrice;

    setOrderConfirmation(null);
    setCartItems((prev) => {
      const existing = prev.find((i) => i.cartKey === cartKey);
      if (existing) {
        return prev.map((i) =>
          i.cartKey === cartKey ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          cartKey,
          dishId: dish.id,
          name: dish.name,
          weightLabel: `${dish.weight} / ${dish.pieces}`,
          unitPrice,
          image: dish.image,
          quantity,
          extras,
        },
      ];
    });
    triggerToast(`Added ${dish.name} to cart`);
  };

  const handleIncrementDish = (dishId: string) => {
    setCartItems((prev) => {
      const idx = prev.findIndex((item) => item.dishId === dishId);
      if (idx === -1) return prev;
      return prev.map((item, i) =>
        i === idx ? { ...item, quantity: item.quantity + 1 } : item
      );
    });
  };

  const handleDecrementDish = (dishId: string) => {
    setCartItems((prev) => {
      const idx = prev.findIndex((item) => item.dishId === dishId);
      if (idx === -1) return prev;
      const target = prev[idx];
      if (target.quantity <= 1) {
        return prev.filter((_, i) => i !== idx);
      }
      return prev.map((item, i) =>
        i === idx ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const handleUpdateCartKeyQuantity = (cartKey: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.cartKey === cartKey ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (cartKey: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartKey !== cartKey));
  };

  const handleAddAddon = (addon: CartAddon) => {
    const matchedDish = MENU_ITEMS.find((m) => m.id === addon.dishId);
    if (matchedDish) {
      handleAddToCart(matchedDish, 1, []);
      return;
    }
    setCartItems((prev) => {
      const existing = prev.find((i) => i.cartKey === addon.id);
      if (existing) {
        return prev.map((i) =>
          i.cartKey === addon.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          cartKey: addon.id,
          dishId: addon.dishId,
          name: addon.name,
          weightLabel: addon.size,
          unitPrice: addon.price,
          image: addon.image,
          quantity: 1,
          extras: [],
        },
      ];
    });
    triggerToast(`Added ${addon.name} to cart`);
  };

  const handlePlaceOrder = (confirmation: OrderConfirmation) => {
    setOrderConfirmation(confirmation);
    setCartItems([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4EFE9] text-[#141312] selection:bg-[#D13825]/15 selection:text-[#141312]">
      <Navbar
        activeView={activeView}
        onNavigate={handleNavigate}
        cartCount={cartCount}
        cartSubtotal={cartSubtotal}
        selectedNeighborhood={selectedNeighborhood}
        onSelectNeighborhood={setSelectedNeighborhood}
      />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          {activeView === 'home' && (
            <HomeView
              key="home-view"
              featuredDishes={featuredDishes}
              getDishCartQuantity={getDishCartQuantity}
              onNavigate={handleNavigate}
              onOpenModal={setModalDish}
              onQuickAdd={(dish) => handleAddToCart(dish, 1, [])}
              onIncrement={handleIncrementDish}
              onDecrement={handleDecrementDish}
            />
          )}

          {activeView === 'menu' && (
            <MenuView
              key="menu-view"
              dishes={MENU_ITEMS}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              getDishCartQuantity={getDishCartQuantity}
              onNavigate={handleNavigate}
              onOpenModal={setModalDish}
              onQuickAdd={(dish) => handleAddToCart(dish, 1, [])}
              onIncrement={handleIncrementDish}
              onDecrement={handleDecrementDish}
            />
          )}

          {activeView === 'cart' && (
            <CartView
              key="cart-view"
              cartItems={cartItems}
              allDishes={MENU_ITEMS}
              onNavigate={handleNavigate}
              onUpdateQuantity={handleUpdateCartKeyQuantity}
              onRemoveItem={handleRemoveCartItem}
              onAddAddon={handleAddAddon}
              onPlaceOrder={handlePlaceOrder}
              orderConfirmation={orderConfirmation}
              onResetOrder={() => setOrderConfirmation(null)}
            />
          )}
        </AnimatePresence>
      </main>

      <Footer onNavigate={handleNavigate} />

      <ProductModal
        dish={modalDish}
        onClose={() => setModalDish(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Subtle Floating Feedback Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-[#141312] text-white text-[13px] font-medium px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 pointer-events-none"
            role="status"
            aria-live="polite"
          >
            <Check className="w-4 h-4 text-[#D13825]" />
            <span className="whitespace-nowrap">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
