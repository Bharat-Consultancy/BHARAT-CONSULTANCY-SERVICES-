import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Briefcase, 
  BadgeCheck, 
  Calculator, 
  FileText, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  PlusCircle,
  FileCode2,
  CreditCard,
  UserCheck
} from 'lucide-react';
import { ServiceItem } from '../types';
import { COMPANY_INFO } from '../data/companyInfo';

interface ServiceCardProps {
  service: ServiceItem;
  onSelect: (service: ServiceItem) => void;
  onApply: (service: ServiceItem) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onSelect,
  onApply
}) => {
  // Category Color Badge
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'loans': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'insurance': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'company_registration': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'trademark_logo': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'gst_taxation': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'citizen_services': return 'bg-cyan-50 text-cyan-800 border-cyan-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 hover:border-blue-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      
      {/* Top Banner & Badges */}
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between gap-2">
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider ${getCategoryBadge(service.category)}`}>
            {service.categoryName}
          </span>

          {service.popular && (
            <span className="bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3" />
              <span>POPULAR</span>
            </span>
          )}
        </div>

        {/* Title */}
        <div>
          <h3 
            onClick={() => onSelect(service)}
            className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors cursor-pointer font-serif flex items-center justify-between"
          >
            <span>{service.title}</span>
          </h3>
          {service.titleHindi && (
            <p className="text-xs text-slate-500 font-medium">{service.titleHindi}</p>
          )}
        </div>

        {/* Short Description */}
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
          {service.shortDesc}
        </p>

        {/* Quick Documents Preview */}
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-1.5 text-xs">
          <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Key Documents Required:</span>
          </p>
          <ul className="text-[11px] text-slate-600 space-y-1 pl-1">
            {service.documentsRequired.slice(0, 3).map((doc, idx) => (
              <li key={idx} className="line-clamp-1">
                • {doc}
              </li>
            ))}
            {service.documentsRequired.length > 3 && (
              <li className="text-blue-600 font-semibold text-[10px]">
                +{service.documentsRequired.length - 3} More Documents
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Card Footer: Fee & Action Buttons */}
      <div className="p-5 bg-slate-50 border-t border-slate-100 space-y-3">
        
        {/* Price & Time Estimate */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold text-slate-900">
                {service.totalFee === 0 ? 'Free Consultation' : `₹${service.totalFee}`}
              </span>
              {service.govtFee > 0 && (
                <span className="text-[10px] text-slate-500">
                  (Govt Fee ₹{service.govtFee})
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>Estimate: {service.estimatedTime}</span>
            </p>
          </div>

          <button
            onClick={() => onSelect(service)}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-0.5"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            href={`https://wa.me/${COMPANY_INFO.whatsappPhone}?text=Hello%20Bharat%20Consultancy,%20I%20want%20information%20for%20${encodeURIComponent(service.title)}`}
            target="_blank"
            rel="noreferrer"
            className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold py-2 px-3 rounded-xl border border-emerald-200 text-xs text-center flex items-center justify-center gap-1 transition-colors"
          >
            <span>💬 WhatsApp</span>
          </a>

          <button
            onClick={() => onApply(service)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5 text-amber-300" />
            <span>Apply Now</span>
          </button>
        </div>

      </div>

    </div>
  );
};
