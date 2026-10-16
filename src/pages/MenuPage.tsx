import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Star, 
  Plus, 
  Heart, 
  Flame, 
  Sparkles, 
  Check, 
  SlidersHorizontal 
} from 'lucide-react';
import { MENU_ITEMS } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { DietaryType, MenuItem } from '../types';
import { AdSection } from '../components/AdSection';

export const MenuPage: React.FC = () => {
  const { addToCart, toggleFavorite, isFavorite } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [chefSpecialOnly, setChefSpecialOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'rating'>('recommended');

  const categories = [
    { id: 'all', label: 'All Curations' },
    { id: 'small-plates', label: 'Small Plates & Tapas' },
    { id: 'mains', label: 'Mains & Platters' },
    { id: 'pizzas', label: 'Woodfired Pizzas' },
    { id: 'cocktails', label: 'Signature Cocktails' },
    { id: 'bakery-coffee', label: 'Artisanal Bakery & Coffee' },
    { id: 'desserts', label: 'Decadent Desserts' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Dietary match
      if (dietaryFilter === 'veg' && item.dietary !== 'veg' && item.dietary !== 'vegan') {
        return false;
      }
      if (dietaryFilter === 'non-veg' && item.dietary !== 'non-veg') {
        return false;
      }
      // Chef special
      if (chefSpecialOnly && !item.isChefSpecial) {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesIngredient = item.ingredients.some(ing => ing.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesIngredient) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isChefSpecial ? 1 : 0) - (a.isChefSpecial ? 1 : 0);
    });
  }, [activeCategory, dietaryFilter, chefSpecialOnly, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#0b0d12] text-slate-200">
      {/* Header Banner */}
      <section className="relative py-20 bg-[#090b10] border-b border-white/[0.08] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Tasting Menu</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Culinary Craft &amp; Mixology
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mt-3 leading-relaxed">
            From 72-hour naturally leavened sourdough pizzas to tableside applewood smoked cocktails and artisanal viennoiserie.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Controls Bar: Search & Sorting */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Live Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes or ingredients..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Quick Dietary Filters & Sort */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
            {/* Veg / Non-Veg Toggle Buttons (Functional Segmented Control) */}
            <div className="flex items-center p-1 bg-white/[0.04] border border-white/[0.08] rounded-lg">
              <button
                onClick={() => setDietaryFilter('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  dietaryFilter === 'all' ? 'bg-amber-500 text-black shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setDietaryFilter('veg')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1 ${
                  dietaryFilter === 'veg' ? 'bg-emerald-500 text-black shadow-sm' : 'text-emerald-400 hover:text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block border border-black" />
                <span>Veg</span>
              </button>
              <button
                onClick={() => setDietaryFilter('non-veg')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1 ${
                  dietaryFilter === 'non-veg' ? 'bg-rose-500 text-white shadow-sm' : 'text-rose-400 hover:text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-500 inline-block border border-black" />
                <span>Non-Veg</span>
              </button>
            </div>

            {/* Chef's Special Toggle */}
            <button
              onClick={() => setChefSpecialOnly(!chefSpecialOnly)}
              className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 ${
                chefSpecialOnly 
                  ? 'bg-amber-500/20 border-amber-500 text-amber-400' 
                  : 'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chef's Specials</span>
            </button>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-xs text-slate-300 focus:outline-none focus:border-amber-500"
            >
              <option value="recommended" className="bg-[#121620]">Sort: Recommended</option>
              <option value="rating" className="bg-[#121620]">Sort: Highest Rated</option>
              <option value="price-asc" className="bg-[#121620]">Price: Low to High</option>
              <option value="price-desc" className="bg-[#121620]">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Horizontal Scrolling Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-white/[0.06]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                  : 'bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.07] border border-white/[0.05]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-24 space-y-3">
            <p className="text-lg font-serif text-white">No culinary items match your filter criteria.</p>
            <p className="text-xs text-slate-400">Try adjusting your dietary filter or search query.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setDietaryFilter('all');
                setChefSpecialOnly(false);
                setSearchQuery('');
              }}
              className="mt-2 px-4 py-2 bg-amber-500 text-black font-semibold text-xs rounded-lg"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group bg-[#121622] border border-white/[0.07] hover:border-amber-500/30 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 shadow-md"
              >
                {/* Visual */}
                <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-black/80 backdrop-blur-md text-amber-400 border border-white/10">
                      {item.element}
                    </span>
                    {item.isChefSpecial && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-amber-500 text-black">
                        Chef's Choice
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => toggleFavorite(item.id)}
                    aria-label="Toggle favorite"
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/70 backdrop-blur-md text-white hover:text-rose-500 transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 ${isFavorite(item.id) ? 'fill-rose-500 text-rose-500' : ''}`}
                    />
                  </button>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            item.dietary === 'veg' || item.dietary === 'vegan'
                              ? 'bg-emerald-500'
                              : 'bg-rose-500'
                          }`}
                        />
                        <span className="capitalize">{item.categoryLabel}</span>
                      </span>
                      <span className="flex items-center gap-1 text-amber-400 font-mono">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{item.rating}</span>
                      </span>
                    </div>

                    <Link to={`/menu/${item.slug}`}>
                      <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                        {item.name}
                      </h3>
                    </Link>

                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Unboxed Ingredients preview */}
                    <div className="mt-3 flex flex-wrap items-center gap-1 text-[11px] text-slate-500">
                      {item.ingredients.slice(0, 3).map((ing, idx) => (
                        <React.Fragment key={ing}>
                          <span>{ing}</span>
                          {idx < 2 && <span aria-hidden="true">·</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Price & Add to Bag */}
                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <div>
                      <span className="text-lg font-serif font-bold text-amber-400 font-mono tabular-nums">
                        ₹{item.price}
                      </span>
                      <span className="text-[11px] text-slate-500 ml-1.5">taxes incl.</span>
                    </div>

                    <button
                      onClick={() => addToCart(item, 1)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500/10 hover:bg-amber-500 hover:text-black text-amber-400 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Ad Section */}
      <AdSection />
    </div>
  );
};
