import React from 'react';
import { COMPANY_INFO } from '../data/companyInfo';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  Users, 
  Clock, 
  CheckCircle2, 
  FileText, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight,
  Briefcase,
  HelpCircle,
  Sparkles
} from 'lucide-react';

interface AboutUsProps {
  onExploreServices: () => void;
  onContactClick: () => void;
  onApplyClick: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({
  onExploreServices,
  onContactClick,
  onApplyClick,
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-8 sm:p-12 shadow-2xl overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 px-3.5 py-1 rounded-full text-xs font-bold text-amber-300">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Government Registered Consultancy • Badarpur New Delhi</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight leading-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">{COMPANY_INFO.name}</span>
          </h1>

          <p className="text-lg font-bold text-amber-400 italic">
            "{COMPANY_INFO.slogan}"
          </p>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
            {COMPANY_INFO.name} is a premier one-stop financial, legal, corporate, and government citizen services firm headquartered in Badarpur, New Delhi. We bridge the gap between complex official procedures and everyday citizens, offering end-to-end guidance for Banking Loans, GST Filing, Company Registration, Trademark Branding, Insurance, and Municipal Certificates.
          </p>

          <div className="pt-4 flex flex-wrap gap-3">
            <button
              onClick={onExploreServices}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3 rounded-xl shadow-lg transition-all text-xs flex items-center gap-2"
            >
              <span>Explore All Our Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onContactClick}
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3 rounded-xl border border-slate-700 transition-all text-xs flex items-center gap-2"
            >
              <span>Visit Our Delhi Office</span>
              <MapPin className="w-4 h-4 text-blue-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Detailed Corporate Article (~200 Words) with Founder Signature */}
      <div className="bg-gradient-to-br from-amber-50/70 via-white to-blue-50/50 rounded-3xl border border-amber-200/80 p-8 sm:p-10 shadow-md space-y-6">
        <div className="flex items-center gap-3 border-b border-amber-200/80 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 font-serif">
              BHARAT CONSULTANCY SERVICES — Company Profile & Vision
            </h2>
            <p className="text-xs text-amber-700 font-bold italic">
              "We don't Just Sell, We Provide all Solutions"
            </p>
          </div>
        </div>

        <div className="text-slate-800 text-sm sm:text-base leading-relaxed space-y-4 font-medium">
          <p>
            BHARAT CONSULTANCY SERVICES stands as a distinguished leader in financial, legal, corporate compliance, and government citizen advisory services, headquartered in Badarpur, New Delhi. Established with an unwavering commitment to simplifying complex regulatory procedures, we serve as a reliable bridge connecting everyday citizens, startups, and MSME business owners with nationalized banks, government departments, and statutory bodies.
          </p>
          <p>
            Our core operational philosophy transcends routine service delivery. Whether an individual requires urgent PAN card generation, MCD birth and death certificate registration, or an entrepreneur seeks business loans, Mudra credit, fresh GST filings, Pvt Ltd company incorporation, trademark branding, and comprehensive insurance coverage, we deliver end-to-end guidance with total transparency, exact document auditing, and prompt execution.
          </p>
          <p>
            By harmonizing modern digital application processing with hands-on personalized desk support, we empower thousands of clients across New Delhi and PAN-India to resolve official tasks efficiently without bureaucratic delays. Every client query is handled with professional craftsmanship, strict confidentiality, and complete accountability, fostering enduring trust and guaranteed peace of mind.
          </p>
        </div>

        {/* Founder Signature Block */}
        <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="font-serif italic text-2xl font-extrabold text-blue-950 tracking-wide border-b border-slate-300 pb-1 inline-block">
              Krishna Kant Sharma
            </div>
            <div>
              <p className="text-sm font-extrabold text-slate-900">
                Krishna Kant Sharma
              </p>
              <p className="text-xs text-slate-600 font-semibold">
                Founder & Managing Director | Chief Advisory Consultant
              </p>
              <p className="text-xs text-amber-700 font-bold mt-0.5">
                BHARAT CONSULTANCY SERVICES • Badarpur, New Delhi
              </p>
            </div>
          </div>

          <div className="px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2 shrink-0 shadow-sm self-start sm:self-auto">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Authorized Signatory & Verified Management</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-serif">100% Genuine & Transparent</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We adhere strictly to official government guidelines (NSDL, UTIITSL, MCA, GST, Municipalities) with zero hidden charges and complete receipt generation for every transaction.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-serif">Complete Solution Provider</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            From initial consultation to document preparation, online application submission, fee processing, and doorstep/digital delivery, we handle the entire process seamlessly.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-serif">Fast Track Processing</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Our experienced team ensures fast application turnaround, regular WhatsApp status updates, and direct staff support so you never miss a legal or financial deadline.
          </p>
        </div>
      </div>

      {/* Corporate Overview & Expertise Grid */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-8">
        <div className="border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-extrabold text-slate-900 font-serif">
            Our Areas of Expertise
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Delivering end-to-end solutions for individuals, MSMEs, startups, and established enterprises.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Building2 className="w-5 h-5 text-blue-600" />
              <span>Banking & Loans</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Personal loans, business loans, MSME Mudra credit, machinery financing, home loans, and loan against property with top nationalized and private banks.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Briefcase className="w-5 h-5 text-indigo-600" />
              <span>Company & Corporate Legal</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pvt Ltd, OPC, LLP, Partnership registration, MSME Udyam, FSSAI Food license, Import Export Code (IEC), and ISO certification.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <FileText className="w-5 h-5 text-amber-600" />
              <span>GST & Tax Advisory</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fresh GSTIN registration, monthly/quarterly GSTR-1 & GSTR-3B filings, Income Tax Return (ITR) for salaried and business owners, and accounting services.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Award className="w-5 h-5 text-purple-600" />
              <span>Logo & Trademark Branding</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Brand protection, trademark (TM) filing, logo copyright, objection reply filing, and brand registration across all government classes.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Insurance Management</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Health insurance, cashless hospitalization, term life insurance, car & bike motor policies, shopkeeper, and commercial business insurance policies.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Users className="w-5 h-5 text-rose-600" />
              <span>Citizen Digital Services</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              PAN Card NSDL/UTI (New & Correction), MCD QR Verified Birth & Death Certificates, Passport assistance, DL, Voter ID & Jan Seva Kendra works.
            </p>
          </div>
        </div>
      </div>

      {/* Office & Contact Summary */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl font-extrabold font-serif text-amber-300">
            Headquarters: Badarpur, New Delhi
          </h3>
          <p className="text-xs text-slate-300">
            {COMPANY_INFO.address}
          </p>
          <p className="text-xs text-slate-400">
            Working Hours: {COMPANY_INFO.workingHours}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={onApplyClick}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-3 rounded-xl text-xs shadow transition-colors"
          >
            Apply Online Now
          </button>
          <button
            onClick={onContactClick}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-3 rounded-xl text-xs shadow transition-colors"
          >
            Contact Office Desk
          </button>
        </div>
      </div>

    </div>
  );
};
