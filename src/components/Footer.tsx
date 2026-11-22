import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, X } from 'lucide-react';
import { RouteView } from '../types/sushi';

interface FooterProps {
  onNavigate: (view: RouteView) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const [legalDoc, setLegalDoc] = useState<'privacy' | 'terms' | null>(null);

  return (
    <>
      <footer className="bg-[#0B0A09] text-white border-t border-white/10">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Brand Column */}
            <div className="lg:col-span-4">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="font-display text-[17px] font-bold tracking-tight text-white hover:text-[#D13825] transition-colors"
              >
                KUROI SUSHI
              </button>
              <p className="mt-2.5 text-[13px] text-white/55">
                A little Japan. A lot of flavor.
              </p>
            </div>

            {/* Visit Us */}
            <div className="lg:col-span-3">
              <p className="text-[10px] font-semibold tracking-[0.14em] text-white/45 uppercase">
                VISIT US
              </p>
              <p className="mt-3 text-[13px] leading-relaxed text-white/85">
                128 Spring Street
                <br />
                New York, NY 10012
              </p>
            </div>

            {/* Open Every Day */}
            <div className="lg:col-span-3">
              <p className="text-[10px] font-semibold tracking-[0.14em] text-white/45 uppercase">
                OPEN EVERY DAY
              </p>
              <p className="mt-3 text-[13px] leading-relaxed text-white/85 tabular-nums">
                Sunday–Thursday: 11am–10pm
                <br />
                Friday–Saturday: 11am–11pm
              </p>
            </div>

            {/* Let's Stay in Touch */}
            <div className="lg:col-span-2">
              <p className="text-[10px] font-semibold tracking-[0.14em] text-white/45 uppercase">
                LET&apos;S STAY IN TOUCH
              </p>
              <div className="mt-3 space-y-1.5 text-[13px]">
                <a
                  href="#instagram"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('menu');
                  }}
                  className="inline-flex items-center gap-1 text-white/85 hover:text-white transition-colors"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <p className="text-white/85 tabular-nums">
                  <a href="tel:+12125550198" className="hover:text-white transition-colors">
                    +1 (212) 555-0198
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11.5px] text-white/45">
            <p>© 2025 Kuroi Sushi</p>
            <p>Delivery within 5 miles · Free on orders $50+</p>
            <div className="flex items-center gap-5">
              <button
                type="button"
                onClick={() => setLegalDoc('privacy')}
                className="hover:text-white/80 transition-colors"
              >
                Privacy policy
              </button>
              <button
                type="button"
                onClick={() => setLegalDoc('terms')}
                className="hover:text-white/80 transition-colors"
              >
                Terms &amp; conditions
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Info Modal */}
      <AnimatePresence>
        {legalDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLegalDoc(null)}
              className="fixed inset-0 bg-black/55 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              className="relative z-10 w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl text-[#141312]"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#EFE9E0]">
                <h3 className="font-display text-lg font-bold">
                  {legalDoc === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
                </h3>
                <button
                  type="button"
                  onClick={() => setLegalDoc(null)}
                  className="w-8 h-8 rounded-full bg-[#F4EFE9] flex items-center justify-center hover:bg-[#ECE5DB]"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="mt-4 text-[13.5px] leading-relaxed text-[#57534E]">
                {legalDoc === 'privacy'
                  ? 'Kuroi Sushi respects your privacy. Delivery contact details and order preferences are used solely to prepare and deliver your handcrafted sushi order within our Manhattan & Brooklyn delivery zones.'
                  : 'All sushi rolls and nigiri are prepared to order. Delivery is complimentary on orders of $50 or more within 5 miles of 128 Spring Street. Allergen inquiries can be noted at checkout or by calling +1 (212) 555-0198.'}
              </p>
              <button
                type="button"
                onClick={() => setLegalDoc(null)}
                className="mt-6 w-full h-10 rounded-xl bg-[#141312] text-white text-[13px] font-semibold"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
