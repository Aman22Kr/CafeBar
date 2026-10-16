import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Star, 
  Plus, 
  Minus, 
  Clock, 
  Flame, 
  Heart, 
  ShieldAlert, 
  Sparkles, 
  ShoppingBag,
  Wine,
  Share2
} from 'lucide-react';
import { MENU_ITEMS } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { AdSection } from '../components/AdSection';

export const MenuItemDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleFavorite, isFavorite } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [itemNote, setItemNote] = useState('');
  const [copied, setCopied] = useState(false);

  const item = MENU_ITEMS.find((i) => i.slug === slug || i.id === slug);

  if (!item) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-2xl font-serif font-bold text-white mb-2">Curated Dish Not Found</h2>
        <p className="text-slate-400 text-sm mb-6">The requested culinary selection is no longer on the seasonal menu.</p>
        <Link
          to="/menu"
          className="px-6 py-2.5 bg-amber-500 text-black text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-amber-400 transition-colors"
        >
          Return to Menu
        </Link>
      </div>
    );
  }

  const relatedItems = MENU_ITEMS.filter((i) => i.category === item.category && i.id !== item.id).slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleOrder = () => {
    addToCart(item, quantity, itemNote);
  };

  return (
    <div className="min-h-screen bg-[#0b0d12] text-slate-200">
      {/* Breadcrumb & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Selections</span>
        </button>
      </div>

      {/* Main Split Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Visual Presentation */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-white/[0.1] shadow-2xl">
              <img
                src={item.image}
                alt={item.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-black/80 backdrop-blur-md text-amber-400 border border-amber-500/20">
                  Element: {item.element}
                </span>
                {item.isChefSpecial && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-500 text-black">
                    Signature Highlight
                  </span>
                )}
              </div>

              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={handleShare}
                  aria-label="Share dish"
                  className="p-2.5 rounded-full bg-black/70 backdrop-blur-md text-white hover:text-amber-400 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleFavorite(item.id)}
                  aria-label="Favorite dish"
                  className="p-2.5 rounded-full bg-black/70 backdrop-blur-md text-white hover:text-rose-500 transition-colors"
                >
                  <Heart className={`w-4 h-4 ${isFavorite(item.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              </div>

              {copied && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-black/90 text-amber-400 text-xs font-medium rounded-full border border-amber-500/30">
                  Link copied to clipboard!
                </div>
              )}
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
                <p className="text-[11px] uppercase tracking-wider text-slate-500">Prep Time</p>
                <p className="text-sm font-semibold text-white mt-0.5 flex items-center justify-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{item.prepTime}</span>
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
                <p className="text-[11px] uppercase tracking-wider text-slate-500">Dietary</p>
                <p className="text-sm font-semibold text-white mt-0.5 capitalize">
                  {item.dietary}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
                <p className="text-[11px] uppercase tracking-wider text-slate-500">Reviews</p>
                <p className="text-sm font-semibold text-white mt-0.5 flex items-center justify-center gap-1 font-mono">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{item.rating} ({item.reviewCount})</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module & Stories */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500 mb-2">
                <span>{item.categoryLabel}</span>
                <span>·</span>
                <span>7th Floor Rooftop Kitchen</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
                {item.name}
              </h1>
              <p className="text-2xl font-serif font-bold text-amber-400 font-mono tabular-nums mt-3">
                ₹{item.price}
              </p>
            </div>

            {/* Long Description */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {item.longDescription}
            </p>

            {/* Ingredients Story */}
            <div className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Crafted With
              </h4>
              <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                {item.ingredients.map((ing) => (
                  <span key={ing} className="bg-white/[0.05] px-2.5 py-1 rounded-md text-slate-300">
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Allergens & Pairings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {item.allergens.length > 0 && (
                <div className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 uppercase tracking-wider">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Allergen Notice</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Contains {item.allergens.join(', ')}. Please inform your server if you have severe intolerances.
                  </p>
                </div>
              )}

              {item.pairings.length > 0 && (
                <div className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    <Wine className="w-3.5 h-3.5" />
                    <span>Sommelier Pairing</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Best enjoyed alongside {item.pairings.join(' or ')}.
                  </p>
                </div>
              )}
            </div>

            {/* Quantity Stepper & Order Button */}
            <div className="pt-4 border-t border-white/[0.08] space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Special Kitchen Preparation Instructions
                </label>
                <input
                  type="text"
                  value={itemNote}
                  onChange={(e) => setItemNote(e.target.value)}
                  placeholder="e.g. Extra dressing, crisp crust, no onion"
                  className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.1] rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center border border-white/[0.1] rounded-lg bg-black/40 h-12">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    aria-label="Decrease quantity"
                    className="px-3.5 h-full text-slate-400 hover:text-white"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-mono tabular-nums font-semibold text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    aria-label="Increase quantity"
                    className="px-3.5 h-full text-slate-400 hover:text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleOrder}
                  className="flex-1 h-12 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-semibold text-xs uppercase tracking-widest rounded-lg transition-all shadow-xl shadow-amber-500/20 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Tasting Order · ₹{item.price * quantity}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Dishes */}
        {relatedItems.length > 0 && (
          <div className="mt-24 pt-12 border-t border-white/[0.08]">
            <h3 className="font-serif text-2xl font-bold text-white mb-6">
              More from {item.categoryLabel}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedItems.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/menu/${rel.slug}`}
                  className="p-4 bg-white/[0.02] border border-white/[0.06] hover:border-amber-500/30 rounded-xl flex items-center gap-4 group transition-all"
                >
                  <img
                    src={rel.image}
                    alt={rel.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-lg object-cover bg-slate-800 shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="min-w-0">
                    <h5 className="font-serif text-sm font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                      {rel.name}
                    </h5>
                    <p className="text-xs text-amber-500 font-mono mt-1">₹{rel.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Ad Section */}
      <AdSection />
    </div>
  );
};
