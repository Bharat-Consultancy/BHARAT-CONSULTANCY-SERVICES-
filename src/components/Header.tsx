import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Search, 
  FileSearch, 
  PlusCircle, 
  Calculator, 
  UserCog, 
  Menu, 
  X, 
  Shield, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyInfo';
import { SERVICE_CATEGORIES } from '../data/servicesData';
import { ServiceCategory } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedCategory: ServiceCategory | 'all';
  setSelectedCategory: (cat: ServiceCategory | 'all') => void;
  onOpenCallback: () => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedCategory,
  setSelectedCategory,
  onOpenCallback,
  onOpenAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm relative z-30">
      {/* Top Banner Contact & Announcement Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Contact details */}
          <div className="flex flex-wrap items-center gap-4">
            <a 
              href={`tel:${COMPANY_INFO.phone}`} 
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors font-medium text-amber-300"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call: {COMPANY_INFO.phone}</span>
            </a>
            <span className="hidden sm:inline text-slate-600">|</span>
            <a 
              href={`mailto:${COMPANY_INFO.email}`} 
              className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span className="truncate max-w-[240px]">{COMPANY_INFO.email}</span>
            </a>
            <span className="hidden lg:inline text-slate-600">|</span>
            <span className="hidden lg:flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate max-w-[320px]">Meethapur Extension, Badarpur, New Delhi</span>
            </span>
          </div>

          {/* Quick links top right */}
          <div className="flex items-center gap-3 ml-auto">
            <span className="hidden sm:flex items-center gap-1 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Mon-Sat: 9:30 AM - 8:00 PM</span>
            </span>
            <button
              onClick={onOpenCallback}
              className="bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 px-2.5 py-1 rounded-md text-xs font-medium border border-amber-500/40 transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>Request Callback</span>
            </button>
            <button
              onClick={onOpenAdmin}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-md text-xs font-medium border border-slate-700 transition-colors flex items-center gap-1"
            >
              <UserCog className="w-3 h-3 text-blue-400" />
              <span>Staff Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header with Logo & Brand Name */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <div 
          onClick={() => { setActiveTab('home'); setSelectedCategory('all'); }}
          className="flex items-center gap-4 cursor-pointer group"
        >
          {/* Enlarged Logo Container */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-2xl p-1 bg-gradient-to-br from-blue-700 via-amber-400 to-blue-900 shadow-lg group-hover:shadow-2xl group-hover:scale-105 transition-all overflow-hidden shrink-0 ring-2 ring-amber-400/50">
            <img 
              src={COMPANY_INFO.logoPath} 
              alt={COMPANY_INFO.name} 
              className="w-full h-full object-contain p-0.5 rounded-xl bg-white"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = COMPANY_INFO.fallbackLogoPath;
              }}
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 group-hover:text-blue-800 transition-colors font-serif">
                BHARAT <span className="text-blue-600">CONSULTANCY</span> SERVICES
              </h1>
            </div>
            {/* Slogan under logo & company title */}
            <p className="text-xs sm:text-sm font-bold text-amber-600 tracking-wide mt-0.5 italic">
              "{COMPANY_INFO.slogan}"
            </p>
          </div>
        </div>

        {/* Action Buttons Right (Compact) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('track')}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-2.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold flex items-center gap-1 transition-all border border-slate-300 shadow-sm"
          >
            <FileSearch className="w-3.5 h-3.5 text-blue-600" />
            <span>Track Status</span>
          </button>

          <button
            onClick={() => setActiveTab('apply')}
            className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 hover:from-blue-800 hover:to-indigo-900 text-white px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-extrabold shadow-sm hover:shadow-md transition-all flex items-center gap-1"
          >
            <PlusCircle className="w-3.5 h-3.5 text-amber-300" />
            <span>Apply Online</span>
          </button>
        </div>
      </div>

      {/* Main Front Navigation Bar — Professional Corporate Style */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 text-white border-t border-slate-800 px-4 py-1.5 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 overflow-x-auto scrollbar-none">
          <nav className="flex items-center gap-1 sm:gap-2 font-bold text-xs sm:text-sm whitespace-nowrap py-0.5">
            <button
              onClick={() => { setActiveTab('home'); setSelectedCategory('all'); }}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'home' 
                  ? 'bg-amber-400 text-slate-950 font-extrabold shadow' 
                  : 'text-slate-200 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>🏠 Home</span>
            </button>

            <button
              onClick={() => { setActiveTab('about'); }}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'about' 
                  ? 'bg-amber-400 text-slate-950 font-extrabold shadow' 
                  : 'text-slate-200 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>🏢 About Us</span>
            </button>

            <button
              onClick={() => { setActiveTab('services'); setSelectedCategory('all'); }}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'services' 
                  ? 'bg-amber-400 text-slate-950 font-extrabold shadow' 
                  : 'text-slate-200 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>🛠️ Our Services</span>
            </button>

            <button
              onClick={() => { setActiveTab('contact'); }}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'contact' 
                  ? 'bg-amber-400 text-slate-950 font-extrabold shadow' 
                  : 'text-slate-200 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>📍 Contact Us</span>
            </button>

          </nav>

          <button
            onClick={onOpenAdmin}
            className="text-[11px] font-bold text-slate-300 hover:text-amber-300 transition-colors flex items-center gap-1 shrink-0 bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-md border border-white/10"
          >
            <UserCog className="w-3 h-3 text-amber-400" />
            <span>Staff Desk</span>
          </button>
        </div>
      </div>



      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 shadow-xl">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
            <button
              onClick={() => { setActiveTab('apply'); setMobileMenuOpen(false); }}
              className="bg-blue-600 text-white py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
            >
              <PlusCircle className="w-4 h-4 text-amber-300" />
              <span>Apply Online</span>
            </button>
            <button
              onClick={() => { setActiveTab('track'); setMobileMenuOpen(false); }}
              className="bg-slate-800 text-white py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <FileSearch className="w-4 h-4 text-blue-400" />
              <span>Track Application</span>
            </button>
          </div>

          <nav className="flex flex-col space-y-1 text-sm font-semibold text-slate-800">
            <button
              onClick={() => { setActiveTab('home'); setSelectedCategory('all'); setMobileMenuOpen(false); }}
              className={`text-left py-2 px-3 rounded-xl hover:bg-slate-100 ${activeTab === 'home' ? 'bg-blue-50 text-blue-700 font-bold' : ''}`}
            >
              🏠 Home
            </button>

            <button
              onClick={() => { setActiveTab('about'); setMobileMenuOpen(false); }}
              className={`text-left py-2 px-3 rounded-xl hover:bg-slate-100 ${activeTab === 'about' ? 'bg-blue-50 text-blue-700 font-bold' : ''}`}
            >
              🏢 About Us
            </button>

            <button
              onClick={() => { setActiveTab('services'); setSelectedCategory('all'); setMobileMenuOpen(false); }}
              className={`text-left py-2 px-3 rounded-xl hover:bg-slate-100 ${activeTab === 'services' ? 'bg-blue-50 text-blue-700 font-bold' : ''}`}
            >
              🛠️ Our Services
            </button>

            <button
              onClick={() => { setActiveTab('contact'); setMobileMenuOpen(false); }}
              className={`text-left py-2 px-3 rounded-xl hover:bg-slate-100 ${activeTab === 'contact' ? 'bg-blue-50 text-blue-700 font-bold' : ''}`}
            >
              📍 Contact Us
            </button>

            <button
              onClick={() => { onOpenAdmin(); setMobileMenuOpen(false); }}
              className="text-left py-2 px-3 rounded-xl hover:bg-slate-100 text-slate-600 flex items-center gap-2"
            >
              <UserCog className="w-4 h-4 text-blue-600" />
              <span>Staff Login Dashboard</span>
            </button>
          </nav>

          <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 space-y-1">
            <p className="font-semibold text-slate-800">Direct Office Contact:</p>
            <p>📞 Phone: {COMPANY_INFO.phone}</p>
            <p>✉️ Email: {COMPANY_INFO.email}</p>
            <p>📍 Address: Badarpur New Delhi - 110044</p>
          </div>
        </div>
      )}
    </header>
  );
};
