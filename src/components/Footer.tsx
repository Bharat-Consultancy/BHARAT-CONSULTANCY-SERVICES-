import React from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Heart, Sparkles, ExternalLink } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyInfo';
import { SERVICE_CATEGORIES } from '../data/servicesData';
import { ServiceCategory } from '../types';

interface FooterProps {
  onSelectCategory: (cat: ServiceCategory) => void;
  onOpenCallback: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenCallback,
  onOpenAdmin
}) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-1 bg-gradient-to-br from-blue-700 via-amber-400 to-blue-900 shadow-xl overflow-hidden shrink-0 border border-slate-700">
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
                <h3 className="text-xl font-extrabold text-white font-serif tracking-tight">
                  {COMPANY_INFO.name}
                </h3>
                <p className="text-xs text-amber-400 font-bold italic mt-0.5">
                  "{COMPANY_INFO.slogan}"
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              {COMPANY_INFO.subTagline}. We provide reliable, fast, and 100% government-compliant consultancy across India.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <a 
                href={`tel:${COMPANY_INFO.phone}`} 
                className="flex items-center gap-2 text-amber-300 hover:text-amber-200 font-bold"
              >
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Call Helpline: {COMPANY_INFO.phone}</span>
              </a>

              <a 
                href={`mailto:${COMPANY_INFO.email}`} 
                className="flex items-center gap-2 text-slate-300 hover:text-white"
              >
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="truncate">{COMPANY_INFO.email}</span>
              </a>

              <div className="flex items-start gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Service Categories */}
          <div className="space-y-3 text-xs">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-xs border-b border-slate-800 pb-2">
              Service Categories
            </h4>
            <ul className="space-y-2 text-slate-400">
              {SERVICE_CATEGORIES.map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectCategory(cat.id)}
                    className="hover:text-amber-300 transition-colors text-left"
                  >
                    • {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="space-y-3 text-xs">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-xs border-b border-slate-800 pb-2">
              Popular Services
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>• PAN Card (NSDL / UTIITSL)</li>
              <li>• Birth & Death Certificates</li>
              <li>• All Type Personal & Business Loans</li>
              <li>• GST Registration & Returns</li>
              <li>• Private Limited Registration</li>
              <li>• Trademark Logo Registration</li>
              <li>• Health & Motor Insurance</li>
            </ul>
          </div>

          {/* Column 4: Location Map & Office Hours */}
          <div className="space-y-3 text-xs">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-xs border-b border-slate-800 pb-2">
              Badarpur Delhi Office
            </h4>
            <p className="text-slate-400">
              <Clock className="w-3.5 h-3.5 text-slate-400 inline mr-1" />
              {COMPANY_INFO.workingHours}
            </p>

            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(COMPANY_INFO.address)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-blue-400 border border-slate-700 px-3 py-2 rounded-xl text-xs font-semibold transition-colors"
            >
              <span>View Office on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="text-[11px] text-slate-500 hover:text-slate-300 underline"
              >
                Staff Access Login
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} BHARAT CONSULTANCY SERVICES. All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Policy</span>
            <span>Terms & Conditions</span>
            <span>Government Compliance Disclaimer</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
