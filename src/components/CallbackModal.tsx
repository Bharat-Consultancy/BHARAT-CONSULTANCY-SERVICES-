import React, { useState } from 'react';
import { X, Phone, User, CheckCircle2, Send } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyInfo';

interface CallbackModalProps {
  onClose: () => void;
}

export const CallbackModal: React.FC<CallbackModalProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Loan Services (All Types)');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in duration-200">
        
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-slate-900 text-base">Request Instant Callback</h3>
          </div>
          <button onClick={onClose}><X className="w-5 h-5 text-slate-400" /></button>
        </div>

        {submitted ? (
          <div className="text-center py-6 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-slate-900 text-lg">Callback Request Received!</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our senior consultant at <b>BHARAT CONSULTANCY SERVICES</b> will contact you on <b>{phone}</b> within 15 minutes.
            </p>
            <button
              onClick={onClose}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-xl text-xs shadow"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-xs font-medium">
            <div>
              <label className="text-slate-700 font-bold block mb-1">Full Name *</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Ramesh Verma"
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-slate-700 font-bold block mb-1">Mobile Number *</label>
              <input 
                type="tel" 
                required
                maxLength={10}
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="10-Digit Mobile Number"
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-slate-700 font-bold block mb-1">Service Required</label>
              <select
                value={service}
                onChange={e => setService(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-bold bg-white"
              >
                <option value="Loan Services (All Types)">Loan Services (All Types)</option>
                <option value="PAN Card Services (NSDL/UTI)">PAN Card Services (NSDL/UTI)</option>
                <option value="Birth & Death Certificates">Birth & Death Certificates</option>
                <option value="GST & Income Tax Filing">GST & Income Tax Filing</option>
                <option value="Company Registration & Legal">Company Registration & Legal</option>
                <option value="Trademark & Logo Registration">Trademark & Logo Registration</option>
                <option value="Insurance Services">Insurance Services</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold py-3 rounded-xl text-xs shadow mt-2 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Callback Request</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
