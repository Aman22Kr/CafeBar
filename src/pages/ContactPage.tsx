import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  Car
} from 'lucide-react';
import { RESTAURANT_INFO, FAQS } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { AdSection } from '../components/AdSection';

export const ContactPage: React.FC = () => {
  const { addContactMessage } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Table Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    addContactMessage({
      name,
      email,
      phone,
      subject,
      message,
    });

    setSubmitted(true);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#0b0d12] text-slate-200">
      {/* Header Banner */}
      <section className="relative py-20 bg-[#090b10] border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Connect &amp; Visit</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Find Us in the Clouds
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mt-3 leading-relaxed">
            Perched on the 7th floor of Peninsula Redpine in Andheri East, right next to Mumbai Airport.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 bg-[#121622] border border-white/[0.08] rounded-3xl space-y-6 shadow-xl">
              <h3 className="font-serif text-2xl font-bold text-white">Cafe Bar Sanctuary</h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-white">Physical Address</h5>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {RESTAURANT_INFO.address}
                    </p>
                    <p className="text-[11px] text-amber-500/90 mt-1 font-medium flex items-center gap-1">
                      <Car className="w-3 h-3" />
                      <span>Complimentary Valet Parking at Lobby</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pt-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-white">Service Hours</h5>
                    <p className="text-xs text-slate-400 mt-1">
                      Monday to Sunday: {RESTAURANT_INFO.hours.weekdays}
                    </p>
                    <p className="text-xs text-slate-400">
                      Happy Hours: {RESTAURANT_INFO.hours.happyHours}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pt-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-white">Reservations &amp; Host Desk</h5>
                    <p className="text-xs text-slate-300 font-mono mt-1">
                      <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-amber-400">{RESTAURANT_INFO.phone}</a>
                    </p>
                    <p className="text-xs text-slate-300 font-mono">
                      <a href={`tel:${RESTAURANT_INFO.secondaryPhone}`} className="hover:text-amber-400">{RESTAURANT_INFO.secondaryPhone}</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pt-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-white">Email Inquiries</h5>
                    <p className="text-xs text-slate-300 mt-1">
                      <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-amber-400">{RESTAURANT_INFO.email}</a>
                    </p>
                    <p className="text-xs text-slate-300">
                      <a href={`mailto:${RESTAURANT_INFO.inquiryEmail}`} className="hover:text-amber-400">{RESTAURANT_INFO.inquiryEmail}</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder Card with direct Google Maps route link */}
            <div className="p-6 bg-[#121622] border border-white/[0.08] rounded-3xl space-y-3">
              <h4 className="font-serif text-base font-bold text-white">Airport Proximity &amp; Route</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Located just 3.2 km (8–10 mins drive) from Chhatrapati Shivaji Maharaj International Airport (Terminal 2). Ideal for layover dinners, welcoming international guests, and post-flight cocktails.
              </p>
              <a
                href="https://maps.google.com/?q=Peninsula+Redpine+Andheri+East+Mumbai"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 uppercase tracking-wider"
              >
                <span>Open in Google Maps</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-[#121622] border border-white/[0.08] rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
            <div>
              <h3 className="font-serif text-2xl font-bold text-white">Send Us a Direct Note</h3>
              <p className="text-xs text-slate-400 mt-1">
                Have a special dining request, press inquiry, or private banquet question? Our team responds within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-3">
                <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-serif text-lg font-bold text-white">Message Transmitted</h4>
                <p className="text-xs text-slate-300">
                  Thank you! Your inquiry has been stored and routed to the Cafe Bar guest relations team.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alisha Roy"
                      required
                      className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alisha@example.com"
                      required
                      className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                      Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="General Table Inquiry" className="bg-[#121620]">General Table Inquiry</option>
                      <option value="Private Event Buyout" className="bg-[#121620]">Private Event / Rooftop Buyout</option>
                      <option value="Media & Collaborations" className="bg-[#121620]">Media &amp; Press Collaborations</option>
                      <option value="Career & Bartender Auditions" className="bg-[#121620]">Careers &amp; Bartending</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    Your Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Tell us how we can assist you..."
                    required
                    className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-amber-500/20 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="pt-8 border-t border-white/[0.08]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
              Frequently Inquired
            </span>
            <h3 className="text-3xl font-serif font-bold text-white mt-1">
              Guest Guidelines &amp; Experience FAQs
            </h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-white/[0.08] bg-[#121622] rounded-xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02]"
                  >
                    <span className="font-serif font-bold text-sm sm:text-base text-white">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-amber-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-white/[0.04]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Ad Section */}
      <AdSection />
    </div>
  );
};
