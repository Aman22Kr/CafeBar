import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft, Home, Utensils } from 'lucide-react';
import { AdSection } from '../components/AdSection';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0b0d12] text-slate-200 flex flex-col justify-between">
      <div className="flex-1 flex items-center justify-center py-24 px-4 text-center">
        <div className="max-w-md space-y-6">
          <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
            <Compass className="w-10 h-10 animate-spin-slow" />
          </div>

          <div className="space-y-2">
            <span className="font-mono text-sm uppercase tracking-widest text-amber-500 font-bold">
              404 · Uncharted Rooftop
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              The Path Has Dissolved into the Night Air
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              The page or dish you were seeking does not exist on our 7th-floor terrace. Let us guide you back to safety.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Return Home</span>
            </Link>
            <Link
              to="/menu"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/[0.1] font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors"
            >
              <Utensils className="w-4 h-4" />
              <span>View Menu</span>
            </Link>
          </div>
        </div>
      </div>

      <AdSection />
    </div>
  );
};
