import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, Calendar, Flame } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { cartCount, setIsCartOpen, setIsSearchOpen } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Menu', path: '/menu' },
    { label: 'Reservations', path: '/reservations' },
    { label: 'Events & Nightlife', path: '/events' },
    { label: 'About', path: '/about' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0b0d12]/90 backdrop-blur-md border-b border-white/[0.08] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Strict single-element Display) */}
        <Link 
          to="/" 
          className="flex items-center gap-2 text-2xl sm:text-3xl font-serif font-bold tracking-tight text-white hover:text-amber-400 transition-colors shrink-0 group"
        >
          <span className="text-amber-500 font-sans tracking-widest text-sm font-semibold uppercase hidden sm:inline-block">The</span>
          <span>Cafe Bar</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block transition-transform group-hover:scale-125" />
        </Link>

        {/* Zone 2: 4-5 Concise Single-line Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative py-1 whitespace-nowrap shrink-0 transition-colors hover:text-white ${
                isActive(link.path) ? 'text-amber-400 font-semibold' : 'text-slate-300'
              }`}
            >
              {link.label}
              {isActive(link.path) && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Zone 3: Actions (Search, Cart & Primary CTA) */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Quick Search */}
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search menu and events"
            className="p-2 text-slate-400 hover:text-white hover:bg-white/[0.06] rounded-full transition-colors cursor-pointer"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Cart Bag */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="View shopping bag"
            className="relative p-2 text-slate-400 hover:text-white hover:bg-white/[0.06] rounded-full transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center tabular-nums shadow-md">
                {cartCount}
              </span>
            )}
          </button>

          {/* Primary Action Button */}
          <Link
            to="/reservations"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-lg hover:from-amber-300 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/10 active:scale-95 whitespace-nowrap shrink-0"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book a Table</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e121a] border-b border-white/[0.1] px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                isActive(link.path)
                  ? 'bg-amber-500/10 text-amber-400 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-2">
            <Link
              to="/reservations"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold uppercase tracking-wider text-black bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Table</span>
            </Link>
            <div className="flex items-center justify-center gap-2 text-xs text-amber-400/80 pt-1">
              <Flame className="w-3.5 h-3.5" />
              <span>Rooftop Open Today 11:00 AM – 01:30 AM</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
