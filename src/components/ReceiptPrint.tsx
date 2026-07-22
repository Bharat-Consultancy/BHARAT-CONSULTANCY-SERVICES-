import React from 'react';
import { X, Printer, ShieldCheck, Download, CheckCircle2 } from 'lucide-react';
import { ApplicationRecord } from '../types';
import { COMPANY_INFO } from '../data/companyInfo';

interface ReceiptPrintProps {
  record: ApplicationRecord | null;
  onClose: () => void;
}

export const ReceiptPrint: React.FC<ReceiptPrintProps> = ({ record, onClose }) => {
  if (!record) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-slate-200 space-y-6 my-8 font-sans">
        
        {/* Top Control Bar (Hidden when printing) */}
        <div className="flex items-center justify-between border-b pb-4 print:hidden">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-sm">Official Tax Invoice & Fee Receipt</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download PDF</span>
            </button>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div id="printable-receipt" className="border border-slate-300 p-8 rounded-2xl space-y-6 bg-white">
          
          {/* Header Branding */}
          <div className="flex items-start justify-between gap-4 border-b-2 border-slate-900 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl p-1 bg-gradient-to-br from-blue-700 via-amber-400 to-blue-900 shadow-md shrink-0 border border-slate-300">
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
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-serif tracking-tight">
                  {COMPANY_INFO.name}
                </h1>
                <p className="text-xs font-bold text-amber-700 italic mt-0.5">
                  "{COMPANY_INFO.slogan}"
                </p>
                <p className="text-xs text-slate-600 font-bold mt-0.5">
                  Financial, Legal, Corporate & Citizen Services Portal
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  {COMPANY_INFO.address}
                </p>
              </div>
            </div>

            <div className="text-right text-xs">
              <span className="font-extrabold text-slate-900 uppercase tracking-widest text-sm block">TAX INVOICE</span>
              <p className="text-slate-500 mt-1">Receipt No: <span className="font-mono font-bold text-slate-900">{record.id}</span></p>
              <p className="text-slate-500">Date: {new Date(record.createdAt).toLocaleDateString('en-IN')}</p>
            </div>
          </div>

          {/* Billed To Details */}
          <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <p className="font-bold text-slate-500 uppercase text-[10px]">BILLED TO (CLIENT):</p>
              <p className="font-bold text-slate-900 text-sm mt-0.5">{record.applicantName}</p>
              <p className="text-slate-600">Phone: {record.mobile}</p>
              <p className="text-slate-600">Email: {record.email}</p>
              <p className="text-slate-600">Address: {record.address}, {record.city}</p>
            </div>

            <div>
              <p className="font-bold text-slate-500 uppercase text-[10px]">PAYMENT DETAILS:</p>
              <p className="font-bold text-emerald-700 text-sm mt-0.5">Status: {record.paymentStatus}</p>
              <p className="text-slate-600">Method: {record.paymentMethod || 'Online'}</p>
              <p className="text-slate-600 font-mono text-[11px]">Txn Ref: {record.transactionId || 'N/A'}</p>
            </div>
          </div>

          {/* Service Itemized Table */}
          <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-slate-100 text-slate-800 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3 border-b">Service Description</th>
                <th className="p-3 border-b text-right">Category</th>
                <th className="p-3 border-b text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-3 font-bold text-slate-900">{record.serviceName}</td>
                <td className="p-3 text-right uppercase text-[10px] text-slate-500">{record.category}</td>
                <td className="p-3 text-right font-bold text-slate-900">₹{record.totalAmount}</td>
              </tr>
            </tbody>
            <tfoot className="bg-slate-50 font-bold text-slate-900">
              <tr>
                <td colSpan={2} className="p-3 text-right">Total Amount Paid:</td>
                <td className="p-3 text-right text-sm font-extrabold text-blue-900">₹{record.totalAmount}</td>
              </tr>
            </tfoot>
          </table>

          {/* Official Stamp & Sign */}
          <div className="flex items-end justify-between pt-6 border-t border-slate-200 text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Digital Seal</span>
              </div>
              <p className="text-[10px] text-slate-400">System Generated Document • No signature required</p>
            </div>

            <div className="text-center space-y-1">
              <div className="font-serif italic font-bold text-blue-900 text-sm">Bharat Consultancy Services</div>
              <p className="text-[10px] text-slate-500 border-t border-slate-300 pt-1">Authorized Signatory</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
