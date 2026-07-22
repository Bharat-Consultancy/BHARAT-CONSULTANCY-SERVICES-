import React, { useState, useEffect } from 'react';
import { 
  UserCog, 
  Lock, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  FileText, 
  MessageSquare, 
  Download, 
  Edit3, 
  Upload, 
  RefreshCw, 
  X, 
  Building, 
  Users, 
  ShieldAlert,
  Printer
} from 'lucide-react';
import { getStoredApplications, updateApplicationStatusInStorage } from '../utils/storage';
import { ApplicationRecord, ApplicationStatus, ServiceCategory } from '../types';
import { COMPANY_INFO } from '../data/companyInfo';

interface AdminPortalProps {
  onClose: () => void;
  onOpenReceipt: (record: ApplicationRecord) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onClose, onOpenReceipt }) => {
  // Authentication State (Passcode: 1234 or admin)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Applications State
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<ServiceCategory | 'all'>('all');

  // Edit Status Modal State
  const [selectedApp, setSelectedApp] = useState<ApplicationRecord | null>(null);
  const [newStatus, setNewStatus] = useState<ApplicationStatus>('Submitted');
  const [statusNote, setStatusNote] = useState('');
  const [certName, setCertName] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      loadApps();
    }
  }, [isAuthenticated]);

  const loadApps = () => {
    const records = getStoredApplications();
    setApplications(records);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === '1234' || passcode.toLowerCase() === 'admin' || passcode === '9266677763') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect Staff PIN. Use "1234" or "9266677763"');
    }
  };

  const handleUpdateStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;

    const mockCertUrl = certName ? `https://example.com/certificates/${encodeURIComponent(certName)}` : undefined;

    const updated = updateApplicationStatusInStorage(
      selectedApp.id,
      newStatus,
      statusNote || `Status updated to ${newStatus} by Staff.`,
      mockCertUrl,
      certName || undefined
    );

    if (updated) {
      loadApps();
      setSelectedApp(null);
      setStatusNote('');
      setCertName('');
    }
  };

  // Filtered applications
  const filteredApps = applications.filter(app => {
    const matchesCat = categoryFilter === 'all' || app.category === categoryFilter;
    const matchesQuery = searchQuery.trim() === '' || 
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.mobile.includes(searchQuery) ||
      app.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-600 text-white">
              <UserCog className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white font-serif">BHARAT CONSULTANCY SERVICES</h2>
              <p className="text-xs text-amber-300">Staff & Admin Management Portal</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* LOGIN SCREEN IF NOT AUTHENTICATED */}
        {!isAuthenticated ? (
          <div className="p-8 max-w-md mx-auto text-center space-y-5">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto">
              <Lock className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">Staff Access PIN</h3>
              <p className="text-xs text-slate-500 mt-1">Default PIN: <span className="font-bold text-blue-600">1234</span> or <span className="font-bold text-blue-600">9266677763</span></p>
            </div>

            {authError && (
              <p className="text-xs text-rose-600 bg-rose-50 p-2 rounded-xl border border-rose-200 font-medium">{authError}</p>
            )}

            <form onSubmit={handleLogin} className="space-y-3">
              <input 
                type="password"
                value={passcode}
                onChange={e => setPasscode(e.target.value)}
                placeholder="Enter Staff Passcode"
                className="w-full text-center py-2.5 px-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 text-sm font-bold"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-xs shadow"
              >
                Login to Staff Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED STAFF DASHBOARD */
          <div className="p-6 space-y-6">
            
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-slate-800 text-sm">Applications Database ({applications.length})</span>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search Name, Ref ID, Mobile..."
                  className="px-3 py-1.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs w-48"
                />

                <select
                  value={categoryFilter}
                  onChange={e => setCategoryFilter(e.target.value as any)}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs bg-white font-medium"
                >
                  <option value="all">All Categories</option>
                  <option value="citizen_services">Citizen Services (PAN, Birth/Death)</option>
                  <option value="loans">Loans</option>
                  <option value="gst_taxation">GST & Taxation</option>
                  <option value="company_registration">Company Registration</option>
                  <option value="trademark_logo">Logo & Trademark</option>
                  <option value="insurance">Insurance</option>
                </select>

                <button
                  onClick={loadApps}
                  className="p-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors"
                  title="Refresh List"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Applications Table */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden overflow-x-auto shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200 text-[10px]">
                  <tr>
                    <th className="p-3">Ref ID</th>
                    <th className="p-3">Service</th>
                    <th className="p-3">Applicant Details</th>
                    <th className="p-3">Fee / Payment</th>
                    <th className="p-3">Current Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {filteredApps.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-500">
                        No applications found matching search criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredApps.map(app => (
                      <tr key={app.id} className="hover:bg-blue-50/50 transition-colors">
                        <td className="p-3 font-mono font-bold text-blue-700">{app.id}</td>
                        <td className="p-3 font-bold text-slate-900">{app.serviceName}</td>
                        <td className="p-3">
                          <p className="font-bold">{app.applicantName}</p>
                          <p className="text-[10px] text-slate-500">📞 {app.mobile} | ✉️ {app.email}</p>
                        </td>
                        <td className="p-3">
                          <p className="font-bold text-slate-900">₹{app.totalAmount}</p>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                            app.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {app.paymentStatus}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="font-bold text-blue-900 bg-blue-100 px-2.5 py-1 rounded-full text-[10px]">
                            {app.status}
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-1">
                          <button
                            onClick={() => {
                              setSelectedApp(app);
                              setNewStatus(app.status);
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold"
                          >
                            Update
                          </button>

                          <button
                            onClick={() => onOpenReceipt(app)}
                            className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-2 py-1 rounded-lg text-[10px] font-bold"
                            title="Receipt"
                          >
                            Receipt
                          </button>

                          <a
                            href={`https://wa.me/91${app.mobile}?text=Hello%20${encodeURIComponent(app.applicantName)},%20update%20regarding%20your%20BHARAT%20CONSULTANCY%20SERVICES%20application%20Ref:%20${app.id}.%20Current%20Status:%20${encodeURIComponent(app.status)}.`}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-emerald-600 hover:bg-emerald-500 text-white px-2 py-1 rounded-lg text-[10px] font-bold inline-block"
                            title="Send WhatsApp Update"
                          >
                            WhatsApp
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* EDIT STATUS MODAL */}
            {selectedApp && (
              <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between border-b pb-3">
                    <h3 className="font-bold text-slate-900 text-base">Update Status for {selectedApp.id}</h3>
                    <button onClick={() => setSelectedApp(null)}><X className="w-5 h-5 text-slate-400" /></button>
                  </div>

                  <form onSubmit={handleUpdateStatus} className="space-y-3 text-xs font-medium">
                    <div>
                      <label className="text-slate-700 font-bold block mb-1">New Application Lifecycle Status</label>
                      <select
                        value={newStatus}
                        onChange={e => setNewStatus(e.target.value as ApplicationStatus)}
                        className="w-full p-2.5 rounded-xl border border-slate-300 font-bold bg-white"
                      >
                        <option value="Submitted">Submitted</option>
                        <option value="Document Verification">Document Verification</option>
                        <option value="Processing with Govt/Bank">Processing with Govt/Bank</option>
                        <option value="Action Needed">Action Needed</option>
                        <option value="Approved & Ready">Approved & Ready</option>
                        <option value="Completed / Dispatched">Completed / Dispatched</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-700 font-bold block mb-1">Internal Note for Client Timeline</label>
                      <textarea
                        rows={3}
                        value={statusNote}
                        onChange={e => setStatusNote(e.target.value)}
                        placeholder="e.g. Certificate approved by MCD/NSDL. Download link attached."
                        className="w-full p-2.5 rounded-xl border border-slate-300"
                      />
                    </div>

                    <div>
                      <label className="text-slate-700 font-bold block mb-1">Attach Generated Certificate Name (Optional)</label>
                      <input 
                        type="text"
                        value={certName}
                        onChange={e => setCertName(e.target.value)}
                        placeholder="e.g. PAN_Card_Ramesh.pdf"
                        className="w-full p-2.5 rounded-xl border border-slate-300"
                      />
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedApp(null)}
                        className="bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-xs font-bold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-5 py-2 rounded-xl text-xs font-bold shadow"
                      >
                        Save & Notify Client
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
