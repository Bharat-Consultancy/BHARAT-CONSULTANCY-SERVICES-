import React, { useState } from 'react';
import { 
  Search, 
  PlusCircle, 
  FileSearch, 
  Phone, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Users, 
  Clock, 
  Sparkles,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyInfo';
import { SERVICES_DATA } from '../data/servicesData';
import { ServiceItem } from '../types';

interface HeroProps {
  onSelectService: (service: ServiceItem) => void;
  onApplyService: (service: ServiceItem) => void;
  onTrackClick: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSelectService,
  onApplyService,
  onTrackClick,
  searchQuery,
  setSearchQuery
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  // Filtered services for instant search dropdown
  const filteredSearch = searchQuery.trim() === '' ? [] : SERVICES_DATA.filter(
    s => s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
         (s.titleHindi && s.titleHindi.includes(searchQuery)) ||
         s.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
         s.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 6);

  return (
    <div className="relative bg-slate-900 text-white overflow-hidden">
      {/* Background Hero Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={COMPANY_INFO.heroBannerPath} 
          alt="Bharat Consultancy Services Office" 
          className="w-full h-full object-cover object-center opacity-25 filter blur-[1px]"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = COMPANY_INFO.fallbackHeroBannerPath;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-blue-950/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Hero Main Text & Call to Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Government & Office Registration Tagline */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/30 to-amber-500/30 border border-blue-400/40 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-300 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Government Registered Consultancy • Badarpur New Delhi Headquarters</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white font-serif">
                Your Trusted <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">Financial, Legal & Citizen Services</span> Partner
              </h1>
              <p className="text-base sm:text-lg font-medium text-slate-300 leading-relaxed">
                Seamless processing for Banking Loans, Insurance Coverage, Company Registration, Trademark Logo, GST Filing, and Government Citizen Certificates (PAN Card, Birth & Death Registrations).
              </p>
            </div>

            {/* Live Interactive Search Bar */}
            <div className="relative max-w-xl">
              <div className="relative flex items-center bg-white rounded-2xl shadow-xl p-1.5 border-2 border-amber-400 focus-within:ring-4 focus-within:ring-amber-400/30 transition-all">
                <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  placeholder="Search service (e.g., PAN Card, Home Loan, GST, Birth Certificate)..."
                  className="w-full py-2.5 px-3 text-slate-900 text-sm focus:outline-none placeholder:text-slate-400 font-medium"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-slate-400 hover:text-slate-600 px-2 font-bold"
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={() => setShowDropdown(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold shrink-0 transition-colors shadow-sm hidden sm:block"
                >
                  Search
                </button>
              </div>

              {/* Search Dropdown Results */}
              {showDropdown && filteredSearch.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden text-slate-800">
                  <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider flex justify-between items-center">
                    <span>Matching Services ({filteredSearch.length})</span>
                    <button onClick={() => setShowDropdown(false)} className="text-blue-600 hover:underline">Close</button>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                    {filteredSearch.map(s => (
                      <div 
                        key={s.id}
                        onClick={() => {
                          onSelectService(s);
                          setShowDropdown(false);
                        }}
                        className="p-3.5 hover:bg-blue-50/80 cursor-pointer transition-colors flex items-center justify-between gap-3 group"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-900 text-sm group-hover:text-blue-700">{s.title}</span>
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-1">{s.shortDesc}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">₹{s.totalFee}</span>
                          <span className="text-[10px] block text-slate-400 mt-0.5">{s.estimatedTime}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onApplyService(SERVICES_DATA[0])}
                className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-sm"
              >
                <PlusCircle className="w-5 h-5 text-slate-950" />
                <span>Apply Online Now</span>
              </button>

              <button
                onClick={onTrackClick}
                className="bg-slate-800/80 hover:bg-slate-700/90 text-white font-bold px-5 py-3.5 rounded-xl border border-slate-700 transition-all flex items-center gap-2 text-sm backdrop-blur-md"
              >
                <FileSearch className="w-5 h-5 text-blue-400" />
                <span>Track Status</span>
              </button>

              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-bold px-4 py-3.5 rounded-xl border border-emerald-500/40 transition-all flex items-center gap-2 text-sm"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Call {COMPANY_INFO.phone}</span>
              </a>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs border-t border-slate-800">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Government Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Encrypted & Verified</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Users className="w-4 h-4 text-amber-400 shrink-0" />
                <span>25,000+ Satisfied Clients</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Rapid Turnaround Time</span>
              </div>
            </div>

          </div>

          {/* Right Hero Card: Quick Key Highlights Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-800/90 border-2 border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-700 pb-5">
                <div className="flex items-center gap-4">
                  {/* ENLARGED LOGO IN HERO CARD */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl p-1 bg-gradient-to-br from-blue-600 via-amber-400 to-blue-900 shadow-xl overflow-hidden shrink-0 ring-2 ring-amber-400/50">
                    <img 
                      src={COMPANY_INFO.logoPath} 
                      alt="BCS Logo" 
                      className="w-full h-full object-contain p-0.5 rounded-xl bg-white"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = COMPANY_INFO.fallbackLogoPath;
                      }}
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-white font-serif">{COMPANY_INFO.name}</h2>
                    <p className="text-xs font-bold text-amber-300 italic mt-0.5">"{COMPANY_INFO.slogan}"</p>
                    <p className="text-[11px] text-slate-300 mt-1">{COMPANY_INFO.landmark}</p>
                  </div>
                </div>
              </div>

              {/* Feature Grid inside Card */}
              <div className="space-y-3 text-xs">
                <p className="text-slate-300 font-extrabold text-xs uppercase tracking-wider">Top Priority Services:</p>
                
                <div className="space-y-2.5">
                  <div 
                    onClick={() => onApplyService(SERVICES_DATA.find(s => s.id === 'pan-nsdl-uti') || SERVICES_DATA[0])}
                    className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-blue-900/50 border border-slate-700 hover:border-blue-400 cursor-pointer transition-all flex items-center justify-between group shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <div>
                        <p className="font-bold text-white group-hover:text-amber-300 transition-colors text-sm">PAN Card Services (NSDL / UTI)</p>
                        <p className="text-[11px] text-slate-400">Instant e-PAN, Corrections & Physical Delivery</p>
                      </div>
                    </div>
                    <span className="text-amber-400 font-extrabold group-hover:translate-x-1 transition-transform text-xs">Apply →</span>
                  </div>

                  <div 
                    onClick={() => onApplyService(SERVICES_DATA.find(s => s.id === 'loan-personal') || SERVICES_DATA[0])}
                    className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-blue-900/50 border border-slate-700 hover:border-blue-400 cursor-pointer transition-all flex items-center justify-between group shadow-sm"
                  >
                    <div>
                      <p className="font-bold text-white group-hover:text-amber-300 transition-colors text-sm">Bank Loans (Personal, Business, Home)</p>
                      <p className="text-[11px] text-slate-400">Low Interest Rates • Instant Eligibility Approval</p>
                    </div>
                    <span className="text-amber-400 font-extrabold group-hover:translate-x-1 transition-transform text-xs">Apply →</span>
                  </div>

                  <div 
                    onClick={() => onApplyService(SERVICES_DATA.find(s => s.id === 'gst-new-reg') || SERVICES_DATA[0])}
                    className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-blue-900/50 border border-slate-700 hover:border-blue-400 cursor-pointer transition-all flex items-center justify-between group shadow-sm"
                  >
                    <div>
                      <p className="font-bold text-white group-hover:text-amber-300 transition-colors text-sm">GST Registration & Return Filing</p>
                      <p className="text-[11px] text-slate-400">New GSTIN Allocation, Monthly Filings & Tax Advisory</p>
                    </div>
                    <span className="text-amber-400 font-extrabold group-hover:translate-x-1 transition-transform text-xs">Apply →</span>
                  </div>

                  <div 
                    onClick={() => onApplyService(SERVICES_DATA.find(s => s.id === 'cert-birth') || SERVICES_DATA[0])}
                    className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-blue-900/50 border border-slate-700 hover:border-blue-400 cursor-pointer transition-all flex items-center justify-between group shadow-sm"
                  >
                    <div>
                      <p className="font-bold text-white group-hover:text-amber-300 transition-colors text-sm">Birth & Death Certificates</p>
                      <p className="text-[11px] text-slate-400">Official Municipal & QR Code Verified Certificates</p>
                    </div>
                    <span className="text-amber-400 font-extrabold group-hover:translate-x-1 transition-transform text-xs">Apply →</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappPhone}?text=Hello%20Bharat%20Consultancy%20Services,%20I%20would%20like%20to%20enquire%20about%20your%20professional%20services.`}
                target="_blank"
                rel="noreferrer"
                className="block w-full text-center bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3.5 px-4 rounded-2xl shadow-lg transition-all text-xs"
              >
                💬 Chat on WhatsApp with Executive (Instant Reply)
              </a>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
