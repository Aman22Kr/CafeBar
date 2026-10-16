import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Sparkles, 
  CheckCircle, 
  MapPin, 
  Phone, 
  X, 
  FileText,
  Printer,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RESTAURANT_INFO } from '../data/mockData';
import { Reservation } from '../types';
import { AdSection } from '../components/AdSection';

export const ReservationsPage: React.FC = () => {
  const location = useLocation();
  const prefill = (location.state as any) || {};

  const { addReservation, reservations, cancelReservation } = useApp();

  const [guests, setGuests] = useState<number>(prefill.guests || 2);
  const [date, setDate] = useState<string>(prefill.date || (() => new Date().toISOString().split('T')[0]));
  const [timeSlot, setTimeSlot] = useState<string>(prefill.time || '20:00');
  const [seatingArea, setSeatingArea] = useState<'rooftop' | 'indoor' | 'private-booth'>(prefill.area || 'rooftop');
  const [occasion, setOccasion] = useState<'casual' | 'birthday' | 'anniversary' | 'date-night' | 'business' | 'celebration'>('casual');
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const [confirmedPass, setConfirmedPass] = useState<Reservation | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !email) return;

    const newRes = addReservation({
      customerName,
      email,
      phone,
      guests,
      date,
      timeSlot,
      seatingArea,
      occasion,
      specialRequests,
    });

    setConfirmedPass(newRes);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#0b0d12] text-slate-200">
      {/* Header Banner */}
      <section className="relative py-20 bg-[#090b10] border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VIP Table Bookings</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Reserve Your Rooftop Table
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mt-3 leading-relaxed">
            Choose your preferred dining atmosphere: Open-Sky Skyline Terrace, Velvet Indoor Lounge, or Private VIP Cabanas. Instant confirmation pass generated upon booking.
          </p>
        </div>
      </section>

      {/* Main Reservation Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Pass Modal or Inline Confirmation */}
        {confirmedPass ? (
          <div className="max-w-xl mx-auto bg-[#121622] border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-amber-500/10 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
                <CheckCircle className="w-8 h-8" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                Reservation Confirmed
              </span>
              <h2 className="text-2xl font-serif font-bold text-white">VIP Table Access Pass</h2>
              <p className="text-xs text-slate-400">
                Present this digital pass or your booking code upon arrival at the 7th floor host desk.
              </p>
            </div>

            {/* Ticket Card */}
            <div className="p-6 bg-black/40 border border-white/[0.08] rounded-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500">Booking Reference</p>
                  <p className="text-lg font-mono font-bold text-amber-400">{confirmedPass.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500">Status</p>
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/20 text-emerald-400">
                    Confirmed
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-slate-500 uppercase tracking-wider text-[10px]">Guest Name</p>
                  <p className="font-semibold text-white mt-0.5">{confirmedPass.customerName}</p>
                </div>
                <div>
                  <p className="text-slate-500 uppercase tracking-wider text-[10px]">Party Size</p>
                  <p className="font-semibold text-white mt-0.5">{confirmedPass.guests} Guests</p>
                </div>
                <div>
                  <p className="text-slate-500 uppercase tracking-wider text-[10px]">Date &amp; Time</p>
                  <p className="font-semibold text-white mt-0.5">{confirmedPass.date} at {confirmedPass.timeSlot}</p>
                </div>
                <div>
                  <p className="text-slate-500 uppercase tracking-wider text-[10px]">Seating Area</p>
                  <p className="font-semibold text-white mt-0.5 capitalize">{confirmedPass.seatingArea.replace('-', ' ')}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.06] text-xs text-slate-400 flex items-center justify-between">
                <span>{RESTAURANT_INFO.address.split(',')[0]}</span>
                <span>Valet Validated</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="flex-1 py-3 bg-white/[0.08] hover:bg-white/[0.12] text-white font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save Pass</span>
              </button>
              <button
                onClick={() => setConfirmedPass(null)}
                className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book Another</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Interactive Booking Form */}
            <form
              onSubmit={handleSubmit}
              className="lg:col-span-8 bg-[#121622] border border-white/[0.08] rounded-3xl p-6 sm:p-8 space-y-8 shadow-xl"
            >
              {/* Step 1: Atmosphere & Party */}
              <div>
                <h3 className="font-serif text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center font-sans font-bold">1</span>
                  <span>Atmosphere &amp; Party Size</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  {/* Rooftop */}
                  <div
                    onClick={() => setSeatingArea('rooftop')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      seatingArea === 'rooftop'
                        ? 'bg-amber-500/10 border-amber-500 text-white'
                        : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <h5 className="font-serif font-bold text-sm text-white">Rooftop Open Terrace</h5>
                    <p className="text-[11px] text-slate-400 mt-1">Starlight views, gentle evening breeze, DJ beats.</p>
                  </div>

                  {/* Indoor */}
                  <div
                    onClick={() => setSeatingArea('indoor')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      seatingArea === 'indoor'
                        ? 'bg-amber-500/10 border-amber-500 text-white'
                        : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <h5 className="font-serif font-bold text-sm text-white">Velvet Indoor Lounge</h5>
                    <p className="text-[11px] text-slate-400 mt-1">Air-conditioned, plush seating, moody warm glow.</p>
                  </div>

                  {/* Private Cabana */}
                  <div
                    onClick={() => setSeatingArea('private-booth')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      seatingArea === 'private-booth'
                        ? 'bg-amber-500/10 border-amber-500 text-white'
                        : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <h5 className="font-serif font-bold text-sm text-white">VIP Private Cabana</h5>
                    <p className="text-[11px] text-slate-400 mt-1">Exclusive enclave with dedicated bar service.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Number of Guests
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((num) => (
                        <option key={num} value={num} className="bg-[#121620]">
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Celebration / Occasion
                    </label>
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="casual" className="bg-[#121620]">Casual Dining &amp; Drinks</option>
                      <option value="birthday" className="bg-[#121620]">Birthday Celebration (Complimentary Cake)</option>
                      <option value="anniversary" className="bg-[#121620]">Anniversary / Romantic Date</option>
                      <option value="business" className="bg-[#121620]">Corporate / Client Dinner</option>
                      <option value="celebration" className="bg-[#121620]">Private Gathering</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 2: Date & Time */}
              <div className="pt-6 border-t border-white/[0.08]">
                <h3 className="font-serif text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center font-sans font-bold">2</span>
                  <span>Date &amp; Time Slot</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Reservation Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      required
                      className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Dining Session &amp; Slot
                    </label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
                    >
                      <optgroup label="Afternoon &amp; Lunch" className="bg-[#121620]">
                        <option value="12:00">12:00 PM</option>
                        <option value="13:30">01:30 PM</option>
                        <option value="15:00">03:00 PM</option>
                      </optgroup>
                      <optgroup label="Golden Hour &amp; Sundowner" className="bg-[#121620]">
                        <option value="17:00">05:00 PM</option>
                        <option value="18:30">06:30 PM</option>
                      </optgroup>
                      <optgroup label="Dinner &amp; Nightlife" className="bg-[#121620]">
                        <option value="19:45">07:45 PM</option>
                        <option value="20:30">08:30 PM</option>
                        <option value="21:30">09:30 PM</option>
                        <option value="22:30">10:30 PM</option>
                      </optgroup>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 3: Contact Info */}
              <div className="pt-6 border-t border-white/[0.08]">
                <h3 className="font-serif text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center font-sans font-bold">3</span>
                  <span>Guest Details</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      required
                      className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Phone Number (For SMS / WhatsApp Pass)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      required
                      className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rahul@example.com"
                    required
                    className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                    Special Seating / Dietary Notes
                  </label>
                  <textarea
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    rows={2}
                    placeholder="e.g. Corner skyline table requested, celebrating engagement, birthday dessert"
                    className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-amber-500/20 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Confirm &amp; Generate Table Pass</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>

            {/* Right: Booking Policies & Stored Bookings */}
            <div className="lg:col-span-4 space-y-6">
              {/* Policy Card */}
              <div className="p-6 bg-[#121622] border border-white/[0.08] rounded-3xl space-y-4">
                <h4 className="font-serif text-lg font-bold text-white">Table Policies</h4>
                <ul className="space-y-3 text-xs text-slate-400 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">·</span>
                    <span><strong>15-Minute Grace Period:</strong> Tables are held for 15 minutes past scheduled time before release to waitlist.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">·</span>
                    <span><strong>Dress Code:</strong> Smart Casual to Upscale Chic. Valet parking validated at lobby entrance.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">·</span>
                    <span><strong>Large Groups (8+):</strong> A 10% minimum deposit may be required during peak weekend hours.</span>
                  </li>
                </ul>

                <div className="pt-4 border-t border-white/[0.06] text-xs">
                  <p className="text-slate-400">Need immediate assistance or same-day table?</p>
                  <a
                    href={`tel:${RESTAURANT_INFO.phone}`}
                    className="text-amber-400 font-semibold hover:underline block mt-1"
                  >
                    Call Host: {RESTAURANT_INFO.phone}
                  </a>
                </div>
              </div>

              {/* Saved User Reservations on this browser */}
              {reservations.length > 0 && (
                <div className="p-6 bg-[#121622] border border-white/[0.08] rounded-3xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-base font-bold text-white">
                      Your Stored Bookings ({reservations.length})
                    </h4>
                  </div>

                  <div className="space-y-3">
                    {reservations.slice(0, 3).map((res) => (
                      <div
                        key={res.id}
                        className="p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-amber-400 font-semibold">{res.id}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              res.status === 'confirmed'
                                ? 'bg-emerald-500/10 text-emerald-400'
                                : 'bg-slate-700 text-slate-400'
                            }`}
                          >
                            {res.status}
                          </span>
                        </div>
                        <p className="text-white font-medium">
                          {res.date} at {res.timeSlot} · {res.guests} Guests
                        </p>
                        <p className="text-[11px] text-slate-400 capitalize">
                          {res.seatingArea.replace('-', ' ')}
                        </p>

                        {res.status === 'confirmed' && (
                          <div className="pt-2 flex items-center justify-between">
                            <button
                              onClick={() => setConfirmedPass(res)}
                              className="text-amber-400 hover:underline text-[11px]"
                            >
                              View Pass
                            </button>
                            <button
                              onClick={() => cancelReservation(res.id)}
                              className="text-rose-400 hover:underline text-[11px]"
                            >
                              Cancel Booking
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Ad Section */}
      <AdSection />
    </div>
  );
};
