export type ServiceCategory = 
  | 'it_ites'
  | 'loans' 
  | 'insurance' 
  | 'registration_licenses' 
  | 'gst_taxation' 
  | 'citizen_services';

export interface ServiceItem {
  id: string;
  title: string;
  titleHindi?: string;
  category: ServiceCategory;
  categoryName: string;
  shortDesc: string;
  longDesc: string;
  iconName: string;
  govtFee: number;
  consultancyFee: number;
  totalFee: number;
  estimatedTime: string;
  popular?: boolean;
  documentsRequired: string[];
  features?: string[];
  formFields?: {
    id: string;
    label: string;
    type: 'text' | 'number' | 'select' | 'radio' | 'textarea';
    options?: string[];
    required: boolean;
    placeholder?: string;
  }[];
}

export interface UploadedFile {
  id: string;
  docName: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  dataUrl?: string;
}

export type ApplicationStatus = 
  | 'Submitted' 
  | 'Document Verification' 
  | 'Processing with Govt/Bank' 
  | 'Action Needed' 
  | 'Approved & Ready' 
  | 'Completed / Dispatched';

export interface ApplicationRecord {
  id: string; // e.g., BCS-2026-98124
  createdAt: string;
  updatedAt: string;
  serviceId: string;
  serviceName: string;
  category: ServiceCategory;
  applicantName: string;
  mobile: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  customData: Record<string, any>;
  documents: UploadedFile[];
  status: ApplicationStatus;
  statusHistory: {
    status: ApplicationStatus;
    timestamp: string;
    note: string;
  }[];
  paymentStatus: 'Paid' | 'Pending' | 'Pay at Office';
  paymentMethod?: string;
  transactionId?: string;
  totalAmount: number;
  outputCertificateUrl?: string;
  outputCertificateName?: string;
  notes?: string;
}

export interface CallbackRequest {
  id: string;
  name: string;
  phone: string;
  service: string;
  preferredTime: string;
  createdAt: string;
}
