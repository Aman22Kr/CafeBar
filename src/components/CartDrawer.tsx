import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, cart, updateQuantity, removeFromCart, clearCart, cartTotal } = useApp();
  const [tableNumber, setTableNumber] = useState('Terrace-07');
  const [orderNotes, setOrderNotes] = useState('');
  const [orderSubmitted, setOrderSubmitted] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const gst = Math.round(cartTotal * 0.05);
  const serviceCharge = Math.round(cartTotal * 0.05);
  const grandTotal = cartTotal + gst + serviceCharge;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const orderId = `CB-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      orderId,
      tableNumber,
      notes: orderNotes,
      items: cart,
      subtotal: cartTotal,
      tax: gst + serviceCharge,
      total: grandTotal,
      createdAt: new Date().toISOString(),
      status: 'Preparing in Kitchen',
    };

    try {
      const existing = JSON.parse(localStorage.getItem('cafebar_orders') || '[]');
      existing.unshift(newOrder);
      localStorage.setItem('cafebar_orders', JSON.stringify(existing));
    } catch (err) {
      console.warn(err);
    }

    setOrderSubmitted(orderId);
    clearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => {
          setIsCartOpen(false);
          setOrderSubmitted(null);
        }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0f131c] border-l border-white/[0.08] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-500" />
              <h3 className="font-serif text-lg font-bold text-white">Your Tasting Order</h3>
            </div>
            <button
              onClick={() => {
                setIsCartOpen(false);
                setOrderSubmitted(null);
              }}
              aria-label="Close cart"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {orderSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-xl font-bold text-white">Order Sent to Kitchen!</h4>
                <p className="text-sm text-slate-400">
                  Order ID <span className="font-mono text-amber-400 font-semibold">{orderSubmitted}</span> has been logged for <span className="text-white font-medium">{tableNumber}</span>.
                </p>
                <div className="p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl text-left text-xs space-y-2">
                  <div className="flex items-center gap-2 text-amber-400">
                    <Clock className="w-4 h-4" />
                    <span>Estimated Kitchen Prep: 15–20 mins</span>
                  </div>
                  <p className="text-slate-400">
                    Our bar &amp; kitchen team will bring your items directly to your table. Your receipt is stored in local session.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setOrderSubmitted(null);
                    setIsCartOpen(false);
                  }}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors"
                >
                  Close &amp; Return to Menu
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-lg font-semibold text-white">Your Order is Empty</h4>
                <p className="text-sm text-slate-400 max-w-xs mx-auto">
                  Explore our craft cocktails, woodfired pizzas, and artisanal sourdough bites to build your rooftop feast.
                </p>
                <Link
                  to="/menu"
                  onClick={() => setIsCartOpen(false)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-black text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-amber-400 transition-colors"
                >
                  <span>Browse Full Menu</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((ci) => (
                  <div
                    key={ci.item.id}
                    className="p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={ci.item.image}
                        alt={ci.item.name}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 rounded-lg object-cover bg-slate-800 shrink-0"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="min-w-0">
                        <h5 className="text-sm font-semibold text-white truncate">{ci.item.name}</h5>
                        <p className="text-xs text-amber-400 font-mono tabular-nums">
                          ₹{ci.item.price} each
                        </p>
                        {ci.notes && (
                          <p className="text-[11px] text-slate-500 italic mt-0.5 truncate">
                            Note: {ci.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center border border-white/[0.1] rounded-lg bg-black/40">
                        <button
                          onClick={() => updateQuantity(ci.item.id, ci.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="p-1.5 text-slate-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-mono tabular-nums text-white">
                          {ci.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(ci.item.id, ci.quantity + 1)}
                          aria-label="Increase quantity"
                          className="p-1.5 text-slate-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(ci.item.id)}
                        aria-label="Remove item"
                        className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Table & Special Instructions */}
                <div className="pt-2 space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Table / Seating Location
                    </label>
                    <select
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.1] rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="Terrace-07" className="bg-[#121620]">Rooftop Terrace — Table 07</option>
                      <option value="Terrace-12" className="bg-[#121620]">Rooftop Terrace — Table 12</option>
                      <option value="Bar-Counter" className="bg-[#121620]">Onyx Cocktail Bar — High Top</option>
                      <option value="Indoor-Lounge-03" className="bg-[#121620]">Velvet Indoor Lounge — Booth 03</option>
                      <option value="Takeaway" className="bg-[#121620]">Artisanal Bakery Takeaway</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Kitchen Preparation Notes
                    </label>
                    <input
                      type="text"
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      placeholder="e.g. Less spicy, dressing on side"
                      className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.1] rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Totals & Checkout */}
          {cart.length > 0 && !orderSubmitted && (
            <div className="p-6 border-t border-white/[0.08] bg-[#0c0f16] space-y-3">
              <div className="space-y-1.5 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-white">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span className="font-mono tabular-nums text-white">₹{gst}</span>
                </div>
                <div className="flex justify-between">
                  <span>Staff &amp; Service (5%)</span>
                  <span className="font-mono tabular-nums text-white">₹{serviceCharge}</span>
                </div>
                <div className="border-t border-white/[0.06] pt-2 flex justify-between text-sm font-semibold text-white">
                  <span>Total Due</span>
                  <span className="font-mono tabular-nums text-amber-400 text-base">₹{grandTotal}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3 px-4 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-semibold text-xs uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-amber-500/20 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Send Order to Kitchen</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
