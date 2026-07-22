import React from 'react';
import { MessageSquare, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyInfo';

export const WhatsAppFloatingButton: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Phone Direct */}
      <a
        href={`tel:${COMPANY_INFO.phone}`}
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
        title={`Call ${COMPANY_INFO.phone}`}
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${COMPANY_INFO.whatsappPhone}?text=Hello%20BHARAT%20CONSULTANCY%20SERVICES,%20I%20want%20to%20enquire%20about%20your%20services.`}
        target="_blank"
        rel="noreferrer"
        className="bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group relative"
        title="Chat on WhatsApp"
      >
        <MessageSquare className="w-6 h-6 fill-white text-emerald-500" />
        <span className="absolute right-14 bg-slate-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Chat with Us (9266677763)
        </span>
      </a>
    </div>
  );
};
