import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  ArrowRight, 
  Clock, 
  MapPin, 
  Flame, 
  Droplet, 
  Wind, 
  Compass, 
  Sparkles, 
  Star, 
  ChevronRight,
  Plus,
  Heart
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RESTAURANT_INFO, MENU_ITEMS, EVENTS, REVIEWS } from '../data/mockData';
import { AdSection } from '../components/AdSection';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart, toggleFavorite, isFavorite } = useApp();

  // Quick reservation bar state
  const [quickDate, setQuickDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [quickGuests, setQuickGuests] = useState('2');
  const [quickTime, setQuickTime] = useState('20:00');
  const [quickArea, setQuickArea] = useState<'rooftop' | 'indoor' | 'private-booth'>('rooftop');

  const handleQuickReserve = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/reservations', {
      state: {
        date: quickDate,
        guests: Number(quickGuests),
        time: quickTime,
        area: quickArea
      }
    });
  };

  const featuredCocktails = MENU_ITEMS.filter((i) => i.category === 'cocktails').slice(0, 3);
  const featuredPlates = MENU_ITEMS.filter((i) => i.isChefSpecial || i.isPopular).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0b0d12] text-slate-200">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Background Atmosphere Image with deep dark gradient overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85"
            alt="Cafe Bar Rooftop Atmosphere"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-105 animate-pulse duration-[10000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d12] via-[#0b0d12]/85 to-[#0b0d12]/60" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-[#0b0d12]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 pb-20">
          {/* Subtle Kicker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>7th Floor Rooftop Lounge · Andheri East, Mumbai</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-white tracking-tight leading-[1.1] mb-6 drop-shadow-xl text-balance">
            Where the Elements of Taste &amp; Starlight Collide
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed mb-10 text-balance">
            Immerse yourself in artisanal sourdough baking, open-flame global tapas, and award-winning craft mixology high above the city skyline.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/reservations"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-semibold text-xs uppercase tracking-widest rounded-lg shadow-xl shadow-amber-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve a Rooftop Table</span>
            </Link>
            <Link
              to="/menu"
              className="w-full sm:w-auto px-8 py-4 bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/[0.15] font-semibold text-xs uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Culinary Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Live Service Indicator */}
          <div className="mt-12 flex items-center justify-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span className="text-emerald-400 font-medium">Kitchen &amp; Bar Open Now</span>
            </div>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span className="hidden sm:inline">11:00 AM – 01:30 AM Daily</span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span className="hidden sm:inline">Complimentary Valet Parking</span>
          </div>
        </div>
      </section>

      {/* 2. QUICK TABLE RESERVATION WIDGET */}
      <section className="relative z-20 -mt-10 max-w-6xl mx-auto px-4 sm:px-6">
        <form
          onSubmit={handleQuickReserve}
          className="bg-[#121622] border border-white/[0.12] rounded-2xl p-5 sm:p-6 shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center"
        >
          {/* Guests */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Guests
            </label>
            <select
              value={quickGuests}
              onChange={(e) => setQuickGuests(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
            >
              <option value="1" className="bg-[#161c28]">1 Guest</option>
              <option value="2" className="bg-[#161c28]">2 Guests (Couple)</option>
              <option value="4" className="bg-[#161c28]">4 Guests (Group)</option>
              <option value="6" className="bg-[#161c28]">6 Guests (Celebration)</option>
              <option value="8" className="bg-[#161c28]">8+ Guests (Party)</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Date
            </label>
            <input
              type="date"
              value={quickDate}
              onChange={(e) => setQuickDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Time Slot */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Time
            </label>
            <select
              value={quickTime}
              onChange={(e) => setQuickTime(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
            >
              <option value="13:00" className="bg-[#161c28]">01:00 PM (Lunch)</option>
              <option value="17:30" className="bg-[#161c28]">05:30 PM (Sundowner)</option>
              <option value="19:30" className="bg-[#161c28]">07:30 PM (Dinner)</option>
              <option value="21:00" className="bg-[#161c28]">09:00 PM (Nightlife)</option>
              <option value="22:30" className="bg-[#161c28]">10:30 PM (Late Night)</option>
            </select>
          </div>

          {/* Seating Area */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Atmosphere
            </label>
            <select
              value={quickArea}
              onChange={(e) => setQuickArea(e.target.value as any)}
              className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
            >
              <option value="rooftop" className="bg-[#161c28]">Rooftop Open Terrace</option>
              <option value="indoor" className="bg-[#161c28]">Velvet Indoor Lounge</option>
              <option value="private-booth" className="bg-[#161c28]">Private VIP Cabana</option>
            </select>
          </div>

          {/* CTA */}
          <div className="pt-2 sm:pt-0 sm:col-span-2 lg:col-span-1">
            <label className="hidden lg:block text-xs font-semibold uppercase tracking-wider text-transparent mb-1.5">
              Action
            </label>
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
            >
              <span>Check Table</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </section>

      {/* 3. ELEMENTAL DINING PHILOSOPHY */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-widest font-semibold text-amber-500 mb-2">
            The Five Cosmic Elements
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            An Alchemical Dining Experience
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
            Inspired by the timeless harmony of Earth, Water, Fire, Air, and Space. Every plate, bake, and cocktail is meticulously balanced to awaken each human sensation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {/* Earth */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-amber-500/30 transition-all space-y-3 group">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
              Earth · Prithvi
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Wholesome 36-hour wild fermentations, heirloom grains, whipped labneh, and deep earthy truffle risottos.
            </p>
          </div>

          {/* Water */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-sky-500/30 transition-all space-y-3 group">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Droplet className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white group-hover:text-sky-400 transition-colors">
              Water · Jal
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pan-seared Atlantic seafood, chilled butterfly pea elixirs, and cold-steeped nitrogen arabica infusions.
            </p>
          </div>

          {/* Fire */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-rose-500/30 transition-all space-y-3 group">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white group-hover:text-rose-400 transition-colors">
              Fire · Agni
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              450°C woodfired blistered sourdough pizzas, charcoal yakitori robata, and table-flamed applewood smoke cocktails.
            </p>
          </div>

          {/* Air */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/30 transition-all space-y-3 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Wind className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
              Air · Vayu
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              72-layer laminated butter croissants, botanical lavender foam, and breezy rooftop sunset air.
            </p>
          </div>

          {/* Space */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-purple-500/30 transition-all space-y-3 group">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
              Space · Akasha
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unbounded 7th-floor starlight views, deep resonant soundscapes, and celestial chocolate presentations.
            </p>
          </div>
        </div>
      </section>

      {/* 4. SIGNATURE TASTING MENU HIGHLIGHTS */}
      <section className="py-20 bg-[#090b10] border-t border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest font-semibold text-amber-500 mb-1">
                Curated Tastes
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                Signature Culinary Masterpieces
              </h2>
            </div>
            <Link
              to="/menu"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-amber-400 hover:text-amber-300 transition-colors"
            >
              <span>View All 30+ Menu Items</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPlates.map((item) => (
              <div
                key={item.id}
                className="group bg-[#121620] border border-white/[0.07] hover:border-amber-500/30 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
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
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-black/70 backdrop-blur-md text-amber-400 border border-amber-400/20">
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
                    aria-label="Add to favorites"
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:text-rose-500 transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 ${isFavorite(item.id) ? 'fill-rose-500 text-rose-500' : ''}`}
                    />
                  </button>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span className="capitalize">{item.categoryLabel}</span>
                      <span className="flex items-center gap-1 text-amber-400 font-mono">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{item.rating}</span>
                      </span>
                    </div>

                    <Link to={`/menu/${item.slug}`}>
                      <h3 className="font-serif text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                        {item.name}
                      </h3>
                    </Link>

                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-base font-serif font-bold text-amber-400 font-mono tabular-nums">
                      ₹{item.price}
                    </span>

                    <button
                      onClick={() => addToCart(item, 1)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500 hover:text-black text-amber-400 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. COCKTAILS SHOWCASE & ROOFTOP BAR */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual feature */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-white/[0.1] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=80"
                alt="Craft Cocktails at Cafe Bar"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                  The Fire Element Cloche
                </span>
                <p className="font-serif text-xl font-bold text-white mt-1">
                  Applewood Smoked Old Fashioned
                </p>
                <p className="text-xs text-slate-300 mt-1">
                  Infused tableside with smoldering spiced wood chips and hand-carved crystal ice.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Mixology details */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-xs uppercase tracking-widest font-semibold text-amber-500">
              The Alchemical Bar
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              35+ Signature Concoctions &amp; Zero-Proof Elixirs
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Curated by our resident master mixologists, our bar features artisanal bitters, clarified cordials, organic edible botanicals, and bespoke ice spheres. From sunset aperitifs to midnight highballs, each glass tells a distinct story.
            </p>

            {/* Micro List */}
            <div className="space-y-4 pt-2">
              {featuredCocktails.map((cocktail) => (
                <div
                  key={cocktail.id}
                  className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-amber-500/20 transition-all flex items-center justify-between gap-4"
                >
                  <div>
                    <h4 className="font-serif text-base font-semibold text-white">
                      {cocktail.name}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                      {cocktail.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-mono tabular-nums text-amber-400 font-semibold text-sm">
                      ₹{cocktail.price}
                    </span>
                    <button
                      onClick={() => addToCart(cocktail, 1)}
                      className="p-2 rounded-lg bg-amber-500/10 hover:bg-amber-500 hover:text-black text-amber-400 transition-colors"
                      aria-label="Add cocktail"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
              >
                <span>Full Cocktail Menu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. NIGHTLIFE & EVENTS TEASER */}
      <section className="py-20 bg-[#090b10] border-t border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs uppercase tracking-widest font-semibold text-amber-500 mb-1">
              Music &amp; Energy
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Upcoming Rooftop Experiences
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              From soulful acoustic sunsets to electrifying Friday DOJA parties under the stars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EVENTS.slice(0, 3).map((ev) => (
              <div
                key={ev.id}
                className="bg-[#121622] border border-white/[0.07] rounded-2xl overflow-hidden flex flex-col group hover:border-amber-500/30 transition-all"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={ev.image}
                    alt={ev.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-semibold text-amber-400 border border-white/10">
                    {ev.dayOfWeek} · {ev.time}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-500/90 block">
                      {ev.category}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-white mt-1 group-hover:text-amber-400 transition-colors">
                      {ev.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {ev.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-xs text-slate-300 font-medium">
                      {ev.entryFee}
                    </span>
                    <Link
                      to="/events"
                      className="text-xs text-amber-400 font-semibold uppercase tracking-wider hover:underline flex items-center gap-1"
                    >
                      <span>RSVP Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. GUEST REVIEWS */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-widest font-semibold text-amber-500 mb-1">
            Guest Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Loved by Mumbai's Discerning Diners
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Over 1,200+ 5-star ratings on Google &amp; TripAdvisor for ambiance, mixology, and hospitality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-amber-500/30"
                />
                <div>
                  <h4 className="text-xs font-semibold text-white">{rev.author}</h4>
                  <p className="text-[11px] text-slate-500">{rev.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. BOTTOM AD SECTION */}
      <AdSection />
    </div>
  );
};
