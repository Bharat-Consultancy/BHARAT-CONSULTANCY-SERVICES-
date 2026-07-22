import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Upload, 
  FileText, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  CreditCard, 
  AlertCircle, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  X, 
  Building, 
  Printer, 
  MessageSquare,
  FileCheck
} from 'lucide-react';
import { SERVICES_DATA, SERVICE_CATEGORIES } from '../data/servicesData';
import { ServiceItem, ServiceCategory, UploadedFile, ApplicationRecord } from '../types';
import { COMPANY_INFO } from '../data/companyInfo';
import { saveApplication } from '../utils/storage';
import { PaymentGatewayModal } from './PaymentGatewayModal';

interface ApplicationPortalProps {
  initialService?: ServiceItem | null;
  onTrackRedirect: (refId: string) => void;
  onOpenReceipt: (record: ApplicationRecord) => void;
}

export const ApplicationPortal: React.FC<ApplicationPortalProps> = ({
  initialService,
  onTrackRedirect,
  onOpenReceipt
}) => {
  // Step State: 1 = Service, 2 = Personal Details, 3 = Service Details, 4 = Docs Upload, 5 = Review & Payment, 6 = Success
  const [currentStep, setCurrentStep] = useState<number>(initialService ? 2 : 1);
  const [selectedService, setSelectedService] = useState<ServiceItem>(initialService || SERVICES_DATA[0]);

  // Form Fields
  const [applicantName, setApplicantName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('New Delhi');
  const [state, setState] = useState('Delhi');
  const [pincode, setPincode] = useState('110044');

  // Custom Form Data
  const [customData, setCustomData] = useState<Record<string, any>>({});

  // Uploaded Files
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);

  // Payment Modal Trigger
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [completedRecord, setCompletedRecord] = useState<ApplicationRecord | null>(null);

  // Validation Errors
  const [errorMsg, setErrorMsg] = useState('');

  // Update selected service if initialService prop changes
  useEffect(() => {
    if (initialService) {
      setSelectedService(initialService);
      setCurrentStep(2);
    }
  }, [initialService]);

  // Handle custom field input
  const handleCustomFieldChange = (fieldId: string, val: any) => {
    setCustomData(prev => ({ ...prev, [fieldId]: val }));
  };

  // Mock File Upload Handler
  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newUploaded: UploadedFile[] = Array.from(files).map((f, idx) => ({
      id: `doc-${Date.now()}-${idx}`,
      docName: f.name.split('.')[0] || 'Document',
      fileName: f.name,
      fileSize: `${(f.size / (1024 * 1024)).toFixed(2)} MB`,
      fileType: f.type || 'application/pdf',
      dataUrl: URL.createObjectURL(f)
    }));

    setUploadedFiles(prev => [...prev, ...newUploaded]);
  };

  // Remove File
  const handleRemoveFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  // Validation per step
  const validateStep = (step: number): boolean => {
    setErrorMsg('');
    if (step === 1) {
      if (!selectedService) {
        setErrorMsg('Please select a service to proceed.');
        return false;
      }
    } else if (step === 2) {
      if (!applicantName.trim()) {
        setErrorMsg('Full name is required.');
        return false;
      }
      if (!mobile.trim() || mobile.replace(/\D/g, '').length < 10) {
        setErrorMsg('Please enter a valid 10-digit mobile number.');
        return false;
      }
      if (!email.trim() || !email.includes('@')) {
        setErrorMsg('Please enter a valid email address.');
        return false;
      }
      if (!address.trim()) {
        setErrorMsg('Complete street address is required.');
        return false;
      }
    } else if (step === 3) {
      if (selectedService.formFields) {
        for (const field of selectedService.formFields) {
          if (field.required && !customData[field.id]) {
            setErrorMsg(`Please complete the "${field.label}" field.`);
            return false;
          }
        }
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 4) {
        // Proceed to Review & Payment
        setCurrentStep(5);
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  // Finalize Submission after Payment Complete
  const handlePaymentSuccess = (paymentDetails: { method: string; transactionId: string }) => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const refId = `BCS-2026-${randomNum}`;
    const now = new Date();
    const formattedTime = `${now.toLocaleDateString('en-IN')} ${now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`;

    const newRecord: ApplicationRecord = {
      id: refId,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      serviceId: selectedService.id,
      serviceName: selectedService.title,
      category: selectedService.category,
      applicantName,
      mobile,
      email,
      address,
      city,
      state,
      pincode,
      customData,
      documents: uploadedFiles.length > 0 ? uploadedFiles : [
        { id: 'doc-default-1', docName: 'Aadhaar Card Copy', fileName: 'aadhaar_doc.pdf', fileSize: '1.5 MB', fileType: 'application/pdf' },
        { id: 'doc-default-2', docName: 'Passport Photo / Proof', fileName: 'applicant_photo.jpg', fileSize: '520 KB', fileType: 'image/jpeg' }
      ],
      status: 'Submitted',
      statusHistory: [
        {
          status: 'Submitted',
          timestamp: formattedTime,
          note: `Application submitted successfully via ${paymentDetails.method}. Payment Ref: ${paymentDetails.transactionId}.`
        }
      ],
      paymentStatus: paymentDetails.method === 'Office Visit / Pay at Desk' ? 'Pay at Office' : 'Paid',
      paymentMethod: paymentDetails.method,
      transactionId: paymentDetails.transactionId,
      totalAmount: selectedService.totalFee
    };

    saveApplication(newRecord);
    setCompletedRecord(newRecord);
    setShowPaymentModal(false);
    setCurrentStep(6);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      
      {/* Header Title */}
      <div className="text-center space-y-2 mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
          Online Application Portal
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
          BHARAT CONSULTANCY SERVICES Application Wizard
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Streamlined Process: Select Service ➔ Applicant Info ➔ Upload Documents ➔ Payment & Receipt
        </p>
      </div>

      {/* Progress Steps Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm mb-8">
        <div className="grid grid-cols-5 text-center text-xs font-bold">
          <div className={`py-2 px-1 border-b-4 transition-all ${currentStep >= 1 ? 'border-blue-600 text-blue-700' : 'border-slate-200 text-slate-400'}`}>
            <span className="hidden sm:inline">1. </span>Service
          </div>
          <div className={`py-2 px-1 border-b-4 transition-all ${currentStep >= 2 ? 'border-blue-600 text-blue-700' : 'border-slate-200 text-slate-400'}`}>
            <span className="hidden sm:inline">2. </span>Applicant Info
          </div>
          <div className={`py-2 px-1 border-b-4 transition-all ${currentStep >= 3 ? 'border-blue-600 text-blue-700' : 'border-slate-200 text-slate-400'}`}>
            <span className="hidden sm:inline">3. </span>Details
          </div>
          <div className={`py-2 px-1 border-b-4 transition-all ${currentStep >= 4 ? 'border-blue-600 text-blue-700' : 'border-slate-200 text-slate-400'}`}>
            <span className="hidden sm:inline">4. </span>Documents
          </div>
          <div className={`py-2 px-1 border-b-4 transition-all ${currentStep >= 5 ? 'border-emerald-600 text-emerald-700' : 'border-slate-200 text-slate-400'}`}>
            <span className="hidden sm:inline">5. </span>Payment & Finish
          </div>
        </div>
      </div>

      {/* Validation Alert */}
      {errorMsg && (
        <div className="bg-rose-50 border border-rose-300 text-rose-800 p-4 rounded-2xl text-xs font-semibold mb-6 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* STEP 1: SERVICE SELECTION */}
      {currentStep === 1 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 font-serif">
            Step 1: Choose Service / सर्विस चुनें
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERVICES_DATA.map(s => (
              <div 
                key={s.id}
                onClick={() => setSelectedService(s)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                  selectedService.id === s.id 
                    ? 'border-blue-600 bg-blue-50/70 shadow-md ring-2 ring-blue-600/30' 
                    : 'border-slate-200 hover:border-blue-300 bg-white'
                }`}
              >
                <input 
                  type="radio" 
                  name="serviceSelect" 
                  checked={selectedService.id === s.id} 
                  onChange={() => setSelectedService(s)}
                  className="mt-1 text-blue-600"
                />
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                    {s.categoryName}
                  </span>
                  <p className="font-bold text-slate-900 text-sm">{s.title}</p>
                  <p className="text-xs text-slate-500 line-clamp-1">{s.shortDesc}</p>
                  <p className="text-xs font-bold text-emerald-700">Total Fee: ₹{s.totalFee}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-2 shadow-md"
            >
              <span>Aage Badhein / Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: APPLICANT PERSONAL INFORMATION */}
      {currentStep === 2 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-serif">
                Step 2: Applicant Information / आवेदक की जानकारी
              </h2>
              <p className="text-xs text-slate-500">Selected Service: <span className="font-bold text-blue-700">{selectedService.title}</span> (₹{selectedService.totalFee})</p>
            </div>
            <button
              onClick={() => setCurrentStep(1)}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              Change Service
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
            <div className="space-y-1 sm:col-span-2">
              <label className="text-slate-700 font-bold">Avedak Ka Poora Naam / Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input 
                  type="text" 
                  value={applicantName}
                  onChange={e => setApplicantName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar Verma"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-700 font-bold">Mobile Number (WhatsApp) *</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input 
                  type="tel" 
                  value={mobile}
                  onChange={e => setMobile(e.target.value)}
                  placeholder="10 Digit Mobile Number e.g. 9876543210"
                  maxLength={10}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-700 font-bold">Email ID *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="e.g. name@example.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-slate-700 font-bold">Full Address (Gali No, House No, Colony) *</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input 
                  type="text" 
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="e.g. Plot No 770/16, Lakhpat Colony Part 2 Meethapur Extension"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-700 font-bold">City / District</label>
              <input 
                type="text" 
                value={city}
                onChange={e => setCity(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-700 font-bold">Pincode</label>
              <input 
                type="text" 
                value={pincode}
                onChange={e => setPincode(e.target.value)}
                maxLength={6}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentStep(1)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-2 shadow-md"
            >
              <span>Aage Badhein / Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: SERVICE SPECIFIC QUESTIONS */}
      {currentStep === 3 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 font-serif">
            Step 3: Service Specific Questions / सर्विस विवरण
          </h2>

          {selectedService.formFields && selectedService.formFields.length > 0 ? (
            <div className="space-y-4 text-xs font-medium">
              {selectedService.formFields.map(field => (
                <div key={field.id} className="space-y-1">
                  <label className="text-slate-800 font-bold">
                    {field.label} {field.required && '*'}
                  </label>

                  {field.type === 'text' && (
                    <input 
                      type="text"
                      value={customData[field.id] || ''}
                      onChange={e => handleCustomFieldChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  )}

                  {field.type === 'number' && (
                    <input 
                      type="number"
                      value={customData[field.id] || ''}
                      onChange={e => handleCustomFieldChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  )}

                  {field.type === 'select' && (
                    <select
                      value={customData[field.id] || field.options?.[0]}
                      onChange={e => handleCustomFieldChange(field.id, e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                    >
                      {field.options?.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                      ))}
                    </select>
                  )}

                  {field.type === 'radio' && (
                    <div className="flex flex-wrap gap-3 pt-1">
                      {field.options?.map((opt, i) => (
                        <label key={i} className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200 cursor-pointer">
                          <input 
                            type="radio" 
                            name={field.id} 
                            value={opt}
                            checked={customData[field.id] === opt}
                            onChange={e => handleCustomFieldChange(field.id, e.target.value)}
                            className="text-blue-600"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {field.type === 'textarea' && (
                    <textarea
                      rows={3}
                      value={customData[field.id] || ''}
                      onChange={e => handleCustomFieldChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-slate-600 text-xs">
              Is service ke liye koi extra technical details ki zaroorat nahi hai. Kripya next step par document upload karein.
            </div>
          )}

          <div className="flex justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentStep(2)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-2 shadow-md"
            >
              <span>Aage Badhein / Document Upload</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: DOCUMENT UPLOAD */}
      {currentStep === 4 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-serif">
              Step 4: Upload Required Documents / दस्तावेज अपलोड
            </h2>
            <p className="text-xs text-slate-500">
              Aadhaar, PAN, Bank Statement, Photo or relevant files upload karein. (PDF, JPG, PNG supported)
            </p>
          </div>

          {/* List of Recommended Documents */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl text-xs text-blue-900 space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Document Checklist for {selectedService.title}:</span>
            </p>
            <ul className="list-disc pl-5 space-y-0.5 text-blue-800">
              {selectedService.documentsRequired.map((doc, i) => (
                <li key={i}>{doc}</li>
              ))}
            </ul>
          </div>

          {/* Drag & Drop File Upload Box */}
          <div 
            onDragOver={e => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={e => { e.preventDefault(); setDragActive(false); handleFileUpload(e.dataTransfer.files); }}
            className={`border-2 border-dashed rounded-3xl p-8 text-center transition-colors ${
              dragActive ? 'border-blue-600 bg-blue-50' : 'border-slate-300 hover:border-blue-400 bg-slate-50/50'
            }`}
          >
            <Upload className="w-10 h-10 text-blue-600 mx-auto mb-3" />
            <p className="text-sm font-bold text-slate-800">Drag & Drop files here, or Click to Browse</p>
            <p className="text-xs text-slate-500 mt-1">Photos, Aadhaar PDF, PAN Card images, Discharges or Bank Statements</p>
            
            <label className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs cursor-pointer shadow">
              <span>Choose Files</span>
              <input 
                type="file" 
                multiple 
                onChange={e => handleFileUpload(e.target.files)} 
                className="hidden" 
              />
            </label>
          </div>

          {/* List of Attached Uploads */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Attached Documents ({uploadedFiles.length}):
              </p>
              <div className="space-y-2">
                {uploadedFiles.map(file => (
                  <div key={file.id} className="flex items-center justify-between bg-slate-100 p-3 rounded-2xl border border-slate-200 text-xs">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <FileCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                      <div className="truncate">
                        <p className="font-bold text-slate-900 truncate">{file.fileName}</p>
                        <p className="text-[10px] text-slate-500">{file.fileSize}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveFile(file.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentStep(3)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-2 shadow-md"
            >
              <span>Proceed to Review & Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: REVIEW SUMMARY & TRIGGER PAYMENT */}
      {currentStep === 5 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 font-serif">
            Step 5: Review Summary & Secure Payment Gateway
          </h2>

          {/* Summary Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs bg-slate-50 p-6 rounded-3xl border border-slate-200">
            <div className="space-y-2">
              <p className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Service & Fees</p>
              <p className="text-base font-extrabold text-slate-900">{selectedService.title}</p>
              <p className="text-slate-600">{selectedService.shortDesc}</p>
              <div className="pt-2 text-slate-800 space-y-1">
                <div className="flex justify-between">
                  <span>Govt Fee Component:</span>
                  <span>₹{selectedService.govtFee}</span>
                </div>
                <div className="flex justify-between">
                  <span>Consultancy / Processing Fee:</span>
                  <span>₹{selectedService.consultancyFee}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-blue-900 pt-1 border-t border-slate-200">
                  <span>Total Payable Fee:</span>
                  <span>₹{selectedService.totalFee}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Applicant Contact</p>
              <p className="font-bold text-slate-900">{applicantName}</p>
              <p className="text-slate-600">📱 Mobile: {mobile}</p>
              <p className="text-slate-600">✉️ Email: {email}</p>
              <p className="text-slate-600">📍 Address: {address}, {city}, {state} - {pincode}</p>
              <p className="text-slate-600">📎 Uploaded Docs: {uploadedFiles.length > 0 ? `${uploadedFiles.length} files attached` : 'Default verification docs'}</p>
            </div>
          </div>

          {/* Payment CTA Box */}
          <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-blue-950 text-white p-6 rounded-3xl space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-amber-400 shrink-0" />
              <div>
                <h3 className="font-bold text-base text-white">BHARAT CONSULTANCY SERVICES Secure Payment</h3>
                <p className="text-xs text-slate-300">UPI (GPay / PhonePe / Paytm VPA: 9266677763@upi), Credit/Debit Card, Net Banking or Pay at Office.</p>
              </div>
            </div>

            <button
              onClick={() => setShowPaymentModal(true)}
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold py-3.5 px-6 rounded-2xl shadow-lg transition-all text-sm flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-slate-950" />
              <span>Pay ₹{selectedService.totalFee} & Submit Application</span>
            </button>
          </div>

          <div className="flex justify-start">
            <button
              onClick={() => setCurrentStep(4)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Documents</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: CONFIRMATION & RECEIPT */}
      {currentStep === 6 && completedRecord && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
              Application Successfully Submitted
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 font-serif">
              Aavedan Safaltapoorvak Jama Ho Gaya Hai
            </h2>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Aapki application BHARAT CONSULTANCY SERVICES team ke paas aagayi hai. Continuous status check ke liye application reference number note karein:
            </p>
          </div>

          {/* Reference ID Banner */}
          <div className="bg-slate-900 text-white p-6 rounded-3xl max-w-lg mx-auto shadow-lg space-y-2">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Application Reference ID</p>
            <p className="text-3xl font-extrabold text-amber-400 font-mono tracking-wider">{completedRecord.id}</p>
            <p className="text-[11px] text-slate-300">Payment Status: <span className="font-bold text-emerald-400">{completedRecord.paymentStatus} ({completedRecord.paymentMethod})</span></p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappPhone}?text=Hello%20Bharat%20Consultancy,%20my%20application%20reference%20id%20is%20${completedRecord.id}%20for%20${encodeURIComponent(completedRecord.serviceName)}.`}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-5 rounded-2xl text-xs flex items-center gap-2 shadow"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send Reference on WhatsApp</span>
            </a>

            <button
              onClick={() => onOpenReceipt(completedRecord)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-2xl text-xs flex items-center gap-2 shadow"
            >
              <Printer className="w-4 h-4" />
              <span>Print Tax Invoice & Receipt</span>
            </button>

            <button
              onClick={() => onTrackRedirect(completedRecord.id)}
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-5 rounded-2xl text-xs flex items-center gap-2 shadow"
            >
              <FileText className="w-4 h-4 text-blue-400" />
              <span>Track Live Application Status</span>
            </button>
          </div>
        </div>
      )}

      {/* Payment Gateway Modal */}
      {showPaymentModal && (
        <PaymentGatewayModal
          amount={selectedService.totalFee}
          serviceName={selectedService.title}
          applicantName={applicantName}
          applicantMobile={mobile}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}

    </div>
  );
};
