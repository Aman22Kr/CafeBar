import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, ArrowUpRight, Check } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/mockData';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      const existing = JSON.parse(localStorage.getItem('cafebar_subscribers') || '[]');
      existing.push({ email, date: new Date().toISOString() });
      localStorage.setItem('cafebar_subscribers', JSON.stringify(existing));
    } catch (err) {
      // ignore
    }
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-[#07080b] border-t border-white/[0.08] text-slate-400">
      {/* Upper Footer: Brand & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <Link to="/" className="inline-block text-2xl font-serif font-bold text-white hover:text-amber-400 transition-colors">
              Cafe Bar
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Where Earth, Water, Fire, Air & Space converge. A premier 7th-floor rooftop retreat in Mumbai blending artisanal woodfired dining, specialty viennoiserie, and craft mixology.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={RESTAURANT_INFO.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-slate-300 hover:text-amber-400 hover:border-amber-400/40 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={RESTAURANT_INFO.social.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-slate-300 hover:text-amber-400 hover:border-amber-400/40 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-200 mb-4">
              Explore & Reserve
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/menu" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <span>Culinary & Cocktail Menu</span>
                </Link>
              </li>
              <li>
                <Link to="/reservations" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <span>Table Reservations</span>
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <span>Nightlife & DJ Evenings</span>
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <span>Rooftop Atmosphere Gallery</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <span>Our Elemental Philosophy</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <span>Private Events & Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-200 mb-4">
              Hours & Location
            </h4>
            <div className="flex items-start gap-3 text-sm">
              <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-medium">Daily Service</p>
                <p className="text-slate-400">{RESTAURANT_INFO.hours.weekdays}</p>
                <p className="text-xs text-amber-500/80 mt-1">Kitchen Closes 12:45 AM</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm pt-2">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-slate-400 text-xs leading-relaxed">
                {RESTAURANT_INFO.address}
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm pt-1">
              <Phone className="w-4 h-4 text-amber-500 shrink-0" />
              <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-white transition-colors">
                {RESTAURANT_INFO.phone}
              </a>
            </div>
          </div>

          {/* Col 4: Newsletter / Guest Club */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-200 mb-4">
              The Rooftop Society
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Subscribe for secret tasting menus, guest chef dinners, and priority access to weekend DJ events.
            </p>
            {subscribed ? (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>You are on the VIP guest list!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.1] rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 text-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Join Society</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Lower Footer */}
        <div className="mt-14 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Cafe Bar. All rights reserved. Formerly reference concept Tattva Bar &amp; Cafe.</p>
          <div className="flex items-center gap-6">
            <span>Valet Parking Available</span>
            <span aria-hidden="true">·</span>
            <span>7th Floor Rooftop</span>
            <span aria-hidden="true">·</span>
            <Link to="/contact" className="hover:text-slate-300 transition-colors">Directions &amp; Map</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
