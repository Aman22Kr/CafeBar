import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Utensils, Calendar, ArrowRight, Flame } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MENU_ITEMS, EVENTS } from '../data/mockData';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, addToCart } = useApp();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  if (!isSearchOpen) return null;

  const filteredDishes = query.trim()
    ? MENU_ITEMS.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.categoryLabel.toLowerCase().includes(query.toLowerCase()) ||
        item.ingredients.some((ing) => ing.toLowerCase().includes(query.toLowerCase()))
      )
    : MENU_ITEMS.slice(0, 4);

  const filteredEvents = query.trim()
    ? EVENTS.filter((ev) =>
        ev.title.toLowerCase().includes(query.toLowerCase()) ||
        ev.tagline.toLowerCase().includes(query.toLowerCase()) ||
        ev.description.toLowerCase().includes(query.toLowerCase())
      )
    : EVENTS.slice(0, 2);

  const handleSelectDish = (slug: string) => {
    setIsSearchOpen(false);
    navigate(`/menu/${slug}`);
  };

  const handleSelectEvent = () => {
    setIsSearchOpen(false);
    navigate('/events');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
      {/* Backdrop */}
      <div
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="relative w-full max-w-2xl bg-[#0f131d] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center gap-3">
          <Search className="w-5 h-5 text-amber-500 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cocktails, woodfired pizzas, tapas, ingredients..."
            autoFocus
            className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none text-base sm:text-lg"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs uppercase tracking-wider text-slate-400 hover:text-white px-2 py-1 rounded bg-white/[0.05]"
          >
            Esc
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Dishes Section */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              <span className="flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-amber-500" />
                <span>{query ? `Dishes & Drinks (${filteredDishes.length})` : 'Popular Recommendations'}</span>
              </span>
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  navigate('/menu');
                }}
                className="text-amber-400 hover:underline lowercase text-[11px]"
              >
                view all menu
              </button>
            </div>

            {filteredDishes.length === 0 ? (
              <p className="text-xs text-slate-500 py-2">No menu items match "{query}".</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredDishes.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectDish(item.slug)}
                    className="p-3 bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.05] hover:border-amber-500/30 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-lg object-cover bg-slate-800 shrink-0"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-white group-hover:text-amber-400 transition-colors truncate">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-slate-400 truncate">{item.categoryLabel}</p>
                        <p className="text-xs font-mono tabular-nums text-amber-500 font-medium">
                          ₹{item.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Events Section */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              <span>Upcoming Experiences</span>
            </div>

            <div className="space-y-2">
              {filteredEvents.map((ev) => (
                <div
                  key={ev.id}
                  onClick={handleSelectEvent}
                  className="p-3 bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05] rounded-xl flex items-center justify-between gap-4 cursor-pointer transition-all"
                >
                  <div>
                    <h5 className="text-xs font-semibold text-white">{ev.title}</h5>
                    <p className="text-[11px] text-slate-400">{ev.date} · {ev.time}</p>
                  </div>
                  <span className="text-xs text-amber-400 flex items-center gap-1 shrink-0 font-medium">
                    <span>View Event</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
