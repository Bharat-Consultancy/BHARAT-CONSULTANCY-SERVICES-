import React, { useState, useEffect } from 'react';
import { 
  FileSearch, 
  Search, 
  CheckCircle2, 
  Clock, 
  Building, 
  AlertCircle, 
  Printer, 
  MessageSquare, 
  Download, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight,
  ShieldCheck,
  FileCheck2
} from 'lucide-react';
import { searchApplication, getStoredApplications } from '../utils/storage';
import { ApplicationRecord, ApplicationStatus } from '../types';
import { COMPANY_INFO } from '../data/companyInfo';

interface StatusTrackerProps {
  initialSearchId?: string;
  onOpenReceipt: (record: ApplicationRecord) => void;
  onApplyNew: () => void;
}

const STAGES: ApplicationStatus[] = [
  'Submitted',
  'Document Verification',
  'Processing with Govt/Bank',
  'Approved & Ready',
  'Completed / Dispatched'
];

export const StatusTracker: React.FC<StatusTrackerProps> = ({
  initialSearchId,
  onOpenReceipt,
  onApplyNew
}) => {
  const [query, setQuery] = useState(initialSearchId || '');
  const [foundApp, setFoundApp] = useState<ApplicationRecord | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (initialSearchId) {
      const result = searchApplication(initialSearchId);
      if (result) {
        setFoundApp(result);
        setSearched(true);
      }
    }
  }, [initialSearchId]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    const result = searchApplication(query);
    setFoundApp(result);
    setSearched(true);
  };

  const getStageIndex = (status: ApplicationStatus) => {
    return STAGES.indexOf(status);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
          Live Application Tracking Portal
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
          Check Application Status
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
          Enter your Application Reference Number (e.g. BCS-2026-98124) or registered Mobile Number to track real-time progress.
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="max-w-xl mx-auto">
        <div className="flex items-center bg-white rounded-2xl shadow-md p-2 border-2 border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/20 transition-all">
          <Search className="w-5 h-5 text-blue-600 ml-3 shrink-0" />
          <input 
            type="text" 
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Enter Ref ID (BCS-2026-XXXXX) or Mobile Number..."
            className="w-full py-2.5 px-3 text-sm text-slate-900 font-bold focus:outline-none placeholder:font-normal placeholder:text-slate-400"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs shrink-0 shadow transition-colors"
          >
            Track Status
          </button>
        </div>
      </form>

      {/* Search Result Display */}
      {searched && (
        <div>
          {!foundApp ? (
            <div className="bg-rose-50 border border-rose-200 rounded-3xl p-8 text-center space-y-3 max-w-lg mx-auto shadow-sm">
              <AlertCircle className="w-10 h-10 text-rose-600 mx-auto" />
              <h3 className="font-bold text-rose-900 text-base">No Application Records Found</h3>
              <p className="text-xs text-rose-700">
                Please verify your Reference Number (e.g. BCS-2026-98124) or Mobile Number and try again.
              </p>
              <button
                onClick={onApplyNew}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm transition-colors"
              >
                Submit New Application
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl space-y-8 animate-in fade-in duration-300">
              
              {/* Top Banner */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded">
                      {foundApp.category.toUpperCase()}
                    </span>
                    <span className="text-xs text-slate-400">Ref: {foundApp.id}</span>
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900 font-serif mt-1">
                    {foundApp.serviceName}
                  </h2>
                  <p className="text-xs text-slate-500">Applicant: <span className="font-bold text-slate-800">{foundApp.applicantName}</span> | Phone: {foundApp.mobile}</p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                    Status: {foundApp.status}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1">Last Updated: {foundApp.updatedAt ? new Date(foundApp.updatedAt).toLocaleDateString('en-IN') : 'Today'}</p>
                </div>
              </div>

              {/* Visual Progress Bar */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Application Lifecycle Progress:</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                  {STAGES.map((stg, idx) => {
                    const currentIdx = getStageIndex(foundApp.status);
                    const isCompleted = idx <= currentIdx;
                    const isCurrent = idx === currentIdx;

                    return (
                      <div 
                        key={idx}
                        className={`p-3 rounded-2xl border text-center space-y-1.5 transition-all ${
                          isCurrent 
                            ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-600/30' 
                            : isCompleted 
                              ? 'bg-emerald-50 text-emerald-900 border-emerald-200' 
                              : 'bg-slate-50 text-slate-400 border-slate-200'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center text-xs font-bold ${
                          isCurrent ? 'bg-white text-blue-700' : isCompleted ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                        }`}>
                          {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>
                        <p className="font-bold text-xs">{stg}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status History Timeline */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Detailed Activity History:</h3>
                
                <div className="space-y-3 border-l-2 border-blue-500 pl-4">
                  {foundApp.statusHistory.map((hist, idx) => (
                    <div key={idx} className="relative space-y-1">
                      <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-white" />
                      <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                        <span>{hist.status}</span>
                        <span className="text-[10px] text-slate-400 font-normal">{hist.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        {hist.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Output Document / Certificate if available */}
              {foundApp.outputCertificateUrl && (
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <FileCheck2 className="w-6 h-6 text-emerald-600 shrink-0" />
                    <div>
                      <p className="font-bold text-emerald-900">Official Certificate / Dispatched Document Ready</p>
                      <p className="text-emerald-700">{foundApp.outputCertificateName || 'Approved_Document.pdf'}</p>
                    </div>
                  </div>
                  <a 
                    href={foundApp.outputCertificateUrl} 
                    download
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1 shadow"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                </div>
              )}

              {/* Bottom Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 text-xs">
                <button
                  onClick={() => onOpenReceipt(foundApp)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 shadow"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Fee Receipt & Invoice</span>
                </button>

                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappPhone}?text=Hello%20Bharat%20Consultancy,%20I%20am%20enquiring%20about%20my%20application%20Ref:%20${foundApp.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 shadow"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Ask Question on WhatsApp</span>
                </a>
              </div>

            </div>
          )}
        </div>
      )}

    </div>
  );
};
