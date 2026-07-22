import { ApplicationRecord } from '../types';

const STORAGE_KEY = 'bcs_applications_v1';

const SAMPLE_APPLICATIONS: ApplicationRecord[] = [
  {
    id: 'BCS-2026-98124',
    createdAt: '2026-07-20T10:15:00.000Z',
    updatedAt: '2026-07-21T14:30:00.000Z',
    serviceId: 'pan-nsdl-uti',
    serviceName: 'PAN Card Services (NSDL/UTIITSL)',
    category: 'citizen_services',
    applicantName: 'Ramesh Kumar Verma',
    mobile: '9876543210',
    email: 'ramesh.verma@example.com',
    address: 'H.No 124, Gali No 4, Meethapur',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110044',
    customData: { panType: 'New PAN Card (Fresh)', portalPreference: 'NSDL Portal' },
    documents: [
      { id: 'doc-1', docName: 'Aadhaar Card', fileName: 'aadhaar_ramesh.pdf', fileSize: '1.2 MB', fileType: 'application/pdf' },
      { id: 'doc-2', docName: 'Passport Photo', fileName: 'photo_ramesh.jpg', fileSize: '450 KB', fileType: 'image/jpeg' }
    ],
    status: 'Processing with Govt/Bank',
    statusHistory: [
      { status: 'Submitted', timestamp: '2026-07-20 10:15 AM', note: 'Application received online with NSDL fee payment.' },
      { status: 'Document Verification', timestamp: '2026-07-20 02:00 PM', note: 'Aadhaar and photo verified successfully.' },
      { status: 'Processing with Govt/Bank', timestamp: '2026-07-21 11:30 AM', note: 'Submitted to NSDL Government portal. Acknowledgement number NSDL-8874112.' }
    ],
    paymentStatus: 'Paid',
    paymentMethod: 'UPI (GPay)',
    transactionId: 'TXN981240192',
    totalAmount: 300
  },
  {
    id: 'BCS-2026-77401',
    createdAt: '2026-07-19T11:00:00.000Z',
    updatedAt: '2026-07-21T09:00:00.000Z',
    serviceId: 'loan-personal',
    serviceName: 'Personal Loan',
    category: 'loans',
    applicantName: 'Priya Sharma',
    mobile: '9123456789',
    email: 'priya.sharma@example.com',
    address: 'Flat 302, Badarpur Village',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110044',
    customData: { loanAmount: '350000', employmentType: 'Salaried', monthlyIncome: '55000' },
    documents: [
      { id: 'doc-3', docName: 'Salary Slips', fileName: 'salary_slips.pdf', fileSize: '2.4 MB', fileType: 'application/pdf' },
      { id: 'doc-4', docName: 'Bank Statement', fileName: 'hdfc_statement.pdf', fileSize: '3.1 MB', fileType: 'application/pdf' }
    ],
    status: 'Approved & Ready',
    statusHistory: [
      { status: 'Submitted', timestamp: '2026-07-19 11:00 AM', note: 'Loan application submitted for HDFC & ICICI Bank sanction.' },
      { status: 'Document Verification', timestamp: '2026-07-19 04:15 PM', note: 'Bank statements and credit score verified.' },
      { status: 'Processing with Govt/Bank', timestamp: '2026-07-20 10:00 AM', note: 'In-principle approval granted by bank manager.' },
      { status: 'Approved & Ready', timestamp: '2026-07-21 09:00 AM', note: 'Sanction letter issued for ₹3.5 Lakhs at 10.75% p.a interest.' }
    ],
    paymentStatus: 'Paid',
    paymentMethod: 'Credit Card',
    transactionId: 'TXN774019912',
    totalAmount: 999
  }
];

export const getStoredApplications = (): ApplicationRecord[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_APPLICATIONS));
      return SAMPLE_APPLICATIONS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse applications from localStorage', err);
    return SAMPLE_APPLICATIONS;
  }
};

export const saveApplication = (record: ApplicationRecord): void => {
  const current = getStoredApplications();
  const updated = [record, ...current.filter(item => item.id !== record.id)];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const updateApplicationStatusInStorage = (
  id: string, 
  newStatus: ApplicationRecord['status'], 
  note: string,
  certificateUrl?: string,
  certificateName?: string
): ApplicationRecord | null => {
  const current = getStoredApplications();
  const index = current.findIndex(app => app.id === id);
  if (index === -1) return null;

  const app = current[index];
  const now = new Date();
  const formattedTime = `${now.toLocaleDateString('en-IN')} ${now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`;

  const updatedApp: ApplicationRecord = {
    ...app,
    status: newStatus,
    updatedAt: now.toISOString(),
    statusHistory: [
      ...app.statusHistory,
      { status: newStatus, timestamp: formattedTime, note }
    ],
    ...(certificateUrl ? { outputCertificateUrl: certificateUrl, outputCertificateName: certificateName } : {})
  };

  current[index] = updatedApp;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  return updatedApp;
};

export const searchApplication = (query: string): ApplicationRecord | null => {
  const current = getStoredApplications();
  const cleanQuery = query.trim().toUpperCase();
  return current.find(
    app => app.id.toUpperCase() === cleanQuery || app.mobile.replace(/\D/g, '') === cleanQuery.replace(/\D/g, '')
  ) || null;
};
