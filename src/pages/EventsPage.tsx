import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Music, 
  Sparkles, 
  CheckCircle, 
  Users, 
  Wine, 
  ArrowRight,
  Gift,
  X
} from 'lucide-react';
import { EVENTS } from '../data/mockData';
import { AdSection } from '../components/AdSection';

export const EventsPage: React.FC = () => {
  const [selectedEventForRsvp, setSelectedEventForRsvp] = useState<string | null>(null);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpPhone, setRsvpPhone] = useState('');
  const [rsvpGuests, setRsvpGuests] = useState('2');
  const [rsvpConfirmed, setRsvpConfirmed] = useState(false);

  // Private Inquiry form state
  const [privateName, setPrivateName] = useState('');
  const [privatePhone, setPrivatePhone] = useState('');
  const [privateDate, setPrivateDate] = useState('');
  const [privateGuests, setPrivateGuests] = useState('25');
  const [privateType, setPrivateType] = useState('Birthday Celebration');
  const [privateInquirySubmitted, setPrivateInquirySubmitted] = useState(false);

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName || !rsvpPhone) return;
    try {
      const existing = JSON.parse(localStorage.getItem('cafebar_rsvps') || '[]');
      existing.push({
        eventId: selectedEventForRsvp,
        name: rsvpName,
        phone: rsvpPhone,
        guests: rsvpGuests,
        date: new Date().toISOString(),
      });
      localStorage.setItem('cafebar_rsvps', JSON.stringify(existing));
    } catch (err) {
      console.warn(err);
    }
    setRsvpConfirmed(true);
    setTimeout(() => {
      setRsvpConfirmed(false);
      setSelectedEventForRsvp(null);
      setRsvpName('');
      setRsvpPhone('');
    }, 3000);
  };

  const handlePrivateInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!privateName || !privatePhone) return;
    try {
      const existing = JSON.parse(localStorage.getItem('cafebar_event_inquiries') || '[]');
      existing.push({
        name: privateName,
        phone: privatePhone,
        date: privateDate,
        guests: privateGuests,
        type: privateType,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem('cafebar_event_inquiries', JSON.stringify(existing));
    } catch (err) {
      console.warn(err);
    }
    setPrivateInquirySubmitted(true);
    setTimeout(() => setPrivateInquirySubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#0b0d12] text-slate-200">
      {/* Header Banner */}
      <section className="relative py-20 bg-[#090b10] border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Music className="w-3.5 h-3.5" />
            <span>Nightlife &amp; Entertainment</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Rooftop Sessions &amp; Curated Evenings
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mt-3 leading-relaxed">
            From acoustic sunset sundowners with skyline vistas to dynamic Friday DOJA nights and celebratory birthday bashes.
          </p>
        </div>
      </section>

      {/* Events Lineup */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-2xl font-bold text-white">
            Weekly Recurring Lineup
          </h2>
          <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
            Reservations Recommended
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EVENTS.map((ev) => (
            <div
              key={ev.id}
              className="bg-[#121622] border border-white/[0.08] hover:border-amber-500/30 rounded-2xl overflow-hidden flex flex-col group transition-all"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-900">
                <img
                  src={ev.image}
                  alt={ev.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-amber-400 border border-white/10">
                  {ev.dayOfWeek} · {ev.time}
                </div>
                <div className="absolute top-4 right-4 bg-amber-500 text-black px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider">
                  {ev.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {ev.title}
                  </h3>
                  <p className="text-xs text-amber-400/90 font-medium">
                    {ev.tagline}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed pt-1">
                    {ev.description}
                  </p>
                  <p className="text-xs text-slate-300 font-medium pt-1">
                    {ev.artistOrHost}
                  </p>
                </div>

                {/* Perks */}
                <div className="p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl space-y-1.5">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Evening Highlights:
                  </p>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {ev.perks.map((p, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-amber-400 inline-block" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 block">Cover / Entry</span>
                    <span className="text-xs font-semibold text-white">{ev.entryFee}</span>
                  </div>

                  <button
                    onClick={() => setSelectedEventForRsvp(ev.id)}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    Quick Guestlist RSVP
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Private Events & Birthday Celebrations Banner */}
        <div className="mt-20 p-8 sm:p-12 bg-gradient-to-r from-[#141a26] via-[#1a2130] to-[#141a26] border border-amber-500/30 rounded-3xl relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest">
                <Gift className="w-3.5 h-3.5" />
                <span>Special 10% Off on Birthday &amp; Anniversary Menus</span>
              </div>
              <h2 className="text-3xl font-serif font-bold text-white tracking-tight">
                Host Your Private Celebration High Above Mumbai
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Whether an intimate cocktail gathering in our VIP cabana or a full 150-guest rooftop terrace buyout, our dedicated banquet team coordinates tailored tasting menus, custom cocktail creation, live acoustic duos, and audiovisual setups.
              </p>
              <div className="flex flex-wrap gap-4 text-xs text-slate-300 pt-2">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-amber-400" />
                  <span>Customized Chef's 5-Course Menu</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-amber-400" />
                  <span>Dedicated Private Bartender</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-amber-400" />
                  <span>Complimentary Celebration Cake</span>
                </span>
              </div>
            </div>

            {/* Quick Private Inquiry Form */}
            <div className="lg:col-span-5 bg-black/50 border border-white/[0.1] rounded-2xl p-6 space-y-4">
              <h4 className="font-serif text-lg font-bold text-white">Private Event Inquiry</h4>
              {privateInquirySubmitted ? (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs text-center space-y-1">
                  <p className="font-semibold">Inquiry Received!</p>
                  <p className="text-slate-300">Our events manager will reach out within 2 hours with customized packages.</p>
                </div>
              ) : (
                <form onSubmit={handlePrivateInquiry} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      value={privateName}
                      onChange={(e) => setPrivateName(e.target.value)}
                      placeholder="Your Name"
                      required
                      className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.1] rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="tel"
                      value={privatePhone}
                      onChange={(e) => setPrivatePhone(e.target.value)}
                      placeholder="Phone / WhatsApp"
                      required
                      className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.1] rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
                    />
                    <input
                      type="date"
                      value={privateDate}
                      onChange={(e) => setPrivateDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      required
                      className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.1] rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={privateType}
                      onChange={(e) => setPrivateType(e.target.value)}
                      className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.1] rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="Birthday" className="bg-[#121620]">Birthday Party</option>
                      <option value="Corporate" className="bg-[#121620]">Corporate Dinner</option>
                      <option value="Anniversary" className="bg-[#121620]">Anniversary</option>
                      <option value="Cocktail Mixer" className="bg-[#121620]">Cocktail Mixer</option>
                    </select>
                    <select
                      value={privateGuests}
                      onChange={(e) => setPrivateGuests(e.target.value)}
                      className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.1] rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="15-25" className="bg-[#121620]">15–25 Guests</option>
                      <option value="25-50" className="bg-[#121620]">25–50 Guests</option>
                      <option value="50-100" className="bg-[#121620]">50–100 Guests</option>
                      <option value="100+" className="bg-[#121620]">100+ Full Buyout</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    Request Proposal
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* RSVP Modal */}
      {selectedEventForRsvp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#121622] border border-white/[0.1] rounded-2xl p-6 max-w-md w-full space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-serif text-lg font-bold text-white">Guestlist Priority RSVP</h4>
              <button
                onClick={() => setSelectedEventForRsvp(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {rsvpConfirmed ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <p className="font-serif text-lg font-bold text-white">You are on the Guestlist!</p>
                <p className="text-xs text-slate-400">Entry confirmed. Present your name and phone number at the 7th floor host desk.</p>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-3">
                <p className="text-xs text-slate-400">
                  Secure early bird terrace entry and happy hour cocktail perks.
                </p>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    required
                    placeholder="Guest Name"
                    className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.1] rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={rsvpPhone}
                    onChange={(e) => setRsvpPhone(e.target.value)}
                    required
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.1] rounded-lg text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Guests</label>
                  <select
                    value={rsvpGuests}
                    onChange={(e) => setRsvpGuests(e.target.value)}
                    className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.1] rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="1" className="bg-[#121620]">1 Guest</option>
                    <option value="2" className="bg-[#121620]">2 Guests (Couple)</option>
                    <option value="4" className="bg-[#121620]">4 Guests</option>
                    <option value="6" className="bg-[#121620]">6+ Guests</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  Confirm RSVP
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Bottom Ad Section */}
      <AdSection />
    </div>
  );
};
