import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles, ChevronRight, X } from 'lucide-react';
import { ADS_DATA } from '../data/mockData';

export const AdSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  const currentAd = ADS_DATA[currentIndex];

  const nextAd = () => {
    setCurrentIndex((prev) => (prev + 1) % ADS_DATA.length);
  };

  return (
    <section className="w-full bg-[#0a0d14] border-t border-b border-white/[0.08] py-6 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-xs uppercase tracking-widest font-semibold text-amber-500/90">
              Curated Partner Spotlight
            </span>
            <span className="text-slate-600 text-xs hidden sm:inline">· Featured Collaboration</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={nextAd}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] transition-colors cursor-pointer"
            >
              <span>Next Partner</span>
              <ChevronRight className="w-3 h-3" />
            </button>
            <button
              onClick={() => setIsDismissed(true)}
              aria-label="Hide advertisement"
              className="text-slate-500 hover:text-slate-300 p-1 rounded hover:bg-white/[0.05] transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Ad Content Box */}
        <div className="bg-gradient-to-r from-[#121722] via-[#161c28] to-[#121722] border border-amber-500/20 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-black/40">
          {/* Visual Thumbnail */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 border border-white/10 bg-slate-900">
              <img
                src={currentAd.image}
                alt={currentAd.brand}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <span className="text-[11px] font-medium uppercase tracking-wider text-amber-400/90 block">
                {currentAd.brand} · {currentAd.tag}
              </span>
              <h4 className="text-sm sm:text-base font-semibold text-white mt-0.5">
                {currentAd.headline}
              </h4>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2 md:line-clamp-1 max-w-2xl">
                {currentAd.description}
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-end">
            <Link
              to={currentAd.ctaLink}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shadow-sm shadow-amber-400/20"
            >
              <span>{currentAd.ctaText}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
