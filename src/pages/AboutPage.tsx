import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Compass, 
  Droplet, 
  Flame, 
  Wind, 
  Award, 
  HeartHandshake, 
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/mockData';
import { AdSection } from '../components/AdSection';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0b0d12] text-slate-200">
      {/* Hero */}
      <section className="relative py-24 bg-[#090b10] border-b border-white/[0.08] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Cafe Bar Narrative</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
            The Philosophy of the Five Cosmic Elements
          </h1>
          <p className="text-sm sm:text-lg text-slate-300 max-w-3xl mx-auto mt-4 leading-relaxed font-light">
            Founded on the Sanskrit principle of <em>Tattva</em> — the fundamental truth of universal elements — Cafe Bar was conceptualized as a soulful rooftop haven where nature's primal forces find expression in dining, mixology, and human connection.
          </p>
        </div>
      </section>

      {/* Main Narrative & Split Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Story Part 1: High Above Mumbai */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
              01. The Rooftop Sanctuary
            </span>
            <h2 className="text-3xl font-serif font-bold text-white tracking-tight">
              A 7th-Floor Vista Over the Bustling City
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Suspended seven floors above the vibrant streets of Andheri East near Mumbai International Airport, Cafe Bar provides an escape from the city’s frantic pace. Our space is divided into two distinct emotional territories: the open-sky breeze of our skyline terrace and the sultry, moody intimacy of our indoor velvet lounge.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Every design element — from charred Shou Sugi Ban cedar wood to raw unpolished brass, dark Italian slate, and lush botanical greenery — was selected to evoke grounded tranquility and nocturnal elegance.
            </p>
            <div className="pt-2 flex items-center gap-6 text-xs text-amber-400 font-semibold">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                <span>Open Starlight Terrace</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                <span>Onyx Marble Bar</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                <span>Acoustic Velvet Booths</span>
              </span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.1] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
                alt="Cafe Bar Skyline"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Story Part 2: The Five Elements */}
        <div className="bg-[#121622] border border-white/[0.08] rounded-3xl p-8 sm:p-12 space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
              02. Culinary Equilibrium
            </span>
            <h2 className="text-3xl font-serif font-bold text-white tracking-tight mt-1">
              Harmonizing the Elements on the Plate
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Our culinary director and mixology curators construct every seasonal menu around five elemental pillars:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center">
            <div className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl space-y-2">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-white text-base">Earth</h4>
              <p className="text-xs text-slate-400">
                Wild heirloom grains, 72-hour sourdough loaves, and hand-whipped curds.
              </p>
            </div>

            <div className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl space-y-2">
              <div className="w-10 h-10 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mx-auto">
                <Droplet className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-white text-base">Water</h4>
              <p className="text-xs text-slate-400">
                Pristine oceanic harvests, clarified infusions, and nitrogen cold brews.
              </p>
            </div>

            <div className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl space-y-2">
              <div className="w-10 h-10 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
                <Flame className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-white text-base">Fire</h4>
              <p className="text-xs text-slate-400">
                450°C stone pizza ovens, white binchotan robata charcoal, and torched cloches.
              </p>
            </div>

            <div className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <Wind className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-white text-base">Air</h4>
              <p className="text-xs text-slate-400">
                Feather-light laminated croissants, delicate egg-white botanical foams.
              </p>
            </div>

            <div className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl space-y-2">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mx-auto">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-white text-base">Space</h4>
              <p className="text-xs text-slate-400">
                Uncluttered hospitality, acoustic warmth, and unhurried dining pace.
              </p>
            </div>
          </div>
        </div>

        {/* Story Part 3: Artisanal Viennoiserie & Coffee */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.1] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=80"
                alt="Artisanal Bakery Craft"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
              03. The Baker's Hearth
            </span>
            <h2 className="text-3xl font-serif font-bold text-white tracking-tight">
              Daily Viennoiserie &amp; Single-Origin Roasts
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              At dawn, before the rooftop evening lounge awakens, our master baker fires up the hearth. We employ authentic French T55 flours and pure cultured butter, rolling 72 delicate layers into our signature Sicilian Pistachio croissants and dark chocolate brioches.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              We partner directly with family estates in Chikmagalur and Coorg for single-origin Arabica microlots, roasted in small batches to preserve vibrant notes of stone fruit, cacao, and honey.
            </p>
            <div className="pt-2">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
              >
                <span>View Bakery Selections</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Ad Section */}
      <AdSection />
    </div>
  );
};
