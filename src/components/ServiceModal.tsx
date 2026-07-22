import React from 'react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ShieldCheck, 
  PlusCircle, 
  Phone, 
  HelpCircle,
  Building,
  CreditCard
} from 'lucide-react';
import { ServiceItem } from '../types';
import { COMPANY_INFO } from '../data/companyInfo';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onApply: (service: ServiceItem) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  onApply
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-2 pr-8">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-400/20 px-2.5 py-1 rounded-full border border-amber-400/30">
              {service.categoryName}
            </span>
            <h2 className="text-2xl font-extrabold font-serif text-white">
              {service.title}
            </h2>
            {service.titleHindi && (
              <p className="text-sm text-slate-300 font-medium">{service.titleHindi}</p>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Long Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Service Details & Overview</span>
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
              {service.longDesc}
            </p>
          </div>

          {/* Fee & Time Breakdown Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3.5 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block">Total Fee</span>
              <span className="text-xl font-extrabold text-blue-900">₹{service.totalFee}</span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Govt Fee Component</span>
              <span className="text-base font-bold text-slate-700">
                {service.govtFee > 0 ? `₹${service.govtFee}` : 'Free / Included'}
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Estimated Processing</span>
              <span className="text-xs font-bold text-emerald-700 flex items-center justify-center gap-1 mt-1">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>{service.estimatedTime}</span>
              </span>
            </div>
          </div>

          {/* Key Features List */}
          {service.features && service.features.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Key Benefits & Highlights</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {service.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100 text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Required Documents List */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-amber-600" />
              <span>Documents Required for Application</span>
            </h3>
            <ul className="space-y-2 text-xs">
              {service.documentsRequired.map((doc, idx) => (
                <li key={idx} className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-[10px] shrink-0">
                    {idx + 1}
                  </span>
                  <span className="font-medium">{doc}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 bg-slate-100 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="text-xs text-slate-700 font-semibold flex items-center gap-1.5 hover:text-blue-600"
          >
            <Phone className="w-4 h-4 text-blue-600" />
            <span>Questions? Call {COMPANY_INFO.phone}</span>
          </a>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onApply(service);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md transition-all"
            >
              <PlusCircle className="w-4 h-4 text-amber-300" />
              <span>Proceed to Apply Online</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
