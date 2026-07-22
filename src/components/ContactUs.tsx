import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/companyInfo';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  ExternalLink, 
  Star, 
  Send, 
  CheckCircle2, 
  Sparkles,
  HelpCircle,
  FileText
} from 'lucide-react';

export const ContactUs: React.FC = () => {
  // Active Form Tab: 'inquiry' or 'feedback'
  const [activeForm, setActiveForm] = useState<'inquiry' | 'feedback'>('inquiry');

  // Inquiry Form State
  const [inqName, setInqName] = useState<string>('');
  const [inqMobile, setInqMobile] = useState<string>('');
  const [inqEmail, setInqEmail] = useState<string>('');
  const [inqServiceType, setInqServiceType] = useState<string>('IT / ITES Services');
  const [inqMessage, setInqMessage] = useState<string>('');
  const [inqSubmitted, setInqSubmitted] = useState<boolean>(false);

  // Feedback Form State
  const [fbName, setFbName] = useState<string>('');
  const [fbContact, setFbContact] = useState<string>('');
  const [fbService, setFbService] = useState<string>('General Enquiry / Feedback');
  const [fbRating, setFbRating] = useState<number>(5);
  const [fbMessage, setFbMessage] = useState<string>('');
  const [fbHoverRating, setFbHoverRating] = useState<number>(0);
  const [fbSubmitted, setFbSubmitted] = useState<boolean>(false);

  // Submit Inquiry directly on website without auto-opening WhatsApp
  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inqName.trim() || !inqMobile.trim()) return;

    // Save lead locally
    const newInquiry = {
      id: 'INQ-' + Date.now(),
      name: inqName.trim(),
      mobile: inqMobile.trim(),
      email: inqEmail.trim(),
      serviceType: inqServiceType,
      message: inqMessage.trim(),
      date: new Date().toLocaleDateString('en-IN'),
      status: 'New Inquiry'
    };

    try {
      const existing = JSON.parse(localStorage.getItem('bcs_inquiries') || '[]');
      localStorage.setItem('bcs_inquiries', JSON.stringify([newInquiry, ...existing]));
    } catch (err) {
      console.error(err);
    }

    setInqSubmitted(true);
  };

  // Submit Feedback
  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fbName.trim() || !fbMessage.trim()) return;

    const newFeedback = {
      id: 'FB-' + Date.now(),
      name: fbName.trim(),
      contact: fbContact.trim(),
      service: fbService,
      rating: fbRating,
      message: fbMessage.trim(),
      date: new Date().toLocaleDateString('en-IN')
    };

    try {
      const existing = JSON.parse(localStorage.getItem('bcs_feedbacks') || '[]');
      localStorage.setItem('bcs_feedbacks', JSON.stringify([newFeedback, ...existing]));
    } catch (err) {
      console.error(err);
    }

    setFbSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      
      {/* Page Heading */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200 inline-block">
          Official Helpdesk & Inquiry Desk
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
          Contact Us & Send Inquiry
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto font-medium">
          Fill out the inquiry form below to send your request directly to our team via WhatsApp on <b className="text-blue-900">{COMPANY_INFO.phone}</b> or visit our Badarpur New Delhi office.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Office Details Card */}
        <div className="lg:col-span-5 bg-slate-950 text-white rounded-3xl p-7 space-y-6 shadow-xl border border-slate-800">
          
          <div className="flex items-center gap-4 border-b border-slate-800 pb-5">
            <div className="w-16 h-16 rounded-2xl p-1 bg-gradient-to-br from-blue-700 via-amber-400 to-blue-900 shadow-md shrink-0 border border-slate-700">
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
              <h2 className="text-lg font-extrabold font-serif text-white">{COMPANY_INFO.name}</h2>
              <p className="text-xs text-amber-300 font-bold italic mt-0.5">"{COMPANY_INFO.slogan}"</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Headquarters & Citizen Service Center</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            {/* Director Contact */}
            <div className="flex items-start gap-3 bg-slate-900 p-3 rounded-2xl border border-amber-500/30">
              <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-extrabold text-amber-300 uppercase text-[10px] tracking-wider">
                  {COMPANY_INFO.directorName} - {COMPANY_INFO.directorDesignation}
                </p>
                <a href={`tel:${COMPANY_INFO.directorPhone}`} className="text-lg font-extrabold text-white hover:text-amber-300 transition-colors">
                  +91 {COMPANY_INFO.directorPhone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-400 uppercase text-[10px]">Official Helpdesk / WhatsApp</p>
                <a href={`tel:${COMPANY_INFO.phone}`} className="text-base font-extrabold text-white hover:text-amber-300 transition-colors">
                  +91 {COMPANY_INFO.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-400 uppercase text-[10px]">Official Email Address</p>
                <a href={`mailto:${COMPANY_INFO.email}`} className="font-bold text-white hover:underline text-xs">
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-400 uppercase text-[10px]">Office Address</p>
                <p className="font-bold text-white leading-relaxed">
                  {COMPANY_INFO.address}
                </p>
                <p className="text-[11px] text-amber-300 font-medium mt-0.5">Landmark: {COMPANY_INFO.landmark}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-400 uppercase text-[10px]">Working Hours</p>
                <p className="font-bold text-white">{COMPANY_INFO.workingHours}</p>
              </div>
            </div>
          </div>

          {/* Direct WhatsApp Buttons */}
          <div className="pt-2 border-t border-slate-800 space-y-2.5">
            <a
              href={`https://wa.me/${COMPANY_INFO.directorWhatsapp}?text=Hello%20Mr.%20Manoj%20(Director),%20I%20have%20an%20inquiry.`}
              target="_blank"
              rel="noreferrer"
              className="block w-full text-center bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-2.5 px-4 rounded-xl shadow-lg transition-all text-xs flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-slate-950" />
              <span>WhatsApp Director (Mr. Manoj: 9654184650)</span>
            </a>

            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappPhone}?text=Hello%20Bharat%20Consultancy%20Services,%20I%20have%20an%20inquiry.`}
              target="_blank"
              rel="noreferrer"
              className="block w-full text-center bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-2.5 px-4 rounded-xl shadow-lg transition-all text-xs flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Helpdesk WhatsApp ({COMPANY_INFO.phone})</span>
            </a>

            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(COMPANY_INFO.address)}`}
              target="_blank"
              rel="noreferrer"
              className="block w-full text-center bg-slate-800 hover:bg-slate-700 text-blue-300 font-bold py-2.5 px-4 rounded-xl border border-slate-700 transition-all text-xs flex items-center justify-center gap-2"
            >
              <span>View Location on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Right Column: Inquiry Form & Review Tab */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          
          {/* Form Toggle Tabs */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveForm('inquiry')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                  activeForm === 'inquiry'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>For Inquiry (इन्क्वायरी फॉर्म)</span>
              </button>

              <button
                onClick={() => setActiveForm('feedback')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeForm === 'feedback'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Give Review / Rating</span>
              </button>
            </div>
            <Sparkles className="w-5 h-5 text-amber-500 hidden sm:block" />
          </div>

          {/* ================= FOR INQUIRY FORM ================= */}
          {activeForm === 'inquiry' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3.5 text-xs text-blue-900 font-medium flex items-center justify-between">
                <div>
                  <p className="font-bold">📩 Direct Website Inquiry Desk</p>
                  <p className="text-[11px] text-blue-700">Aapki inquiry direct hamare database/portal par submit hogi. External WhatsApp app alag se nahi khulega.</p>
                </div>
              </div>

              {inqSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3 animate-fadeIn">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-extrabold text-emerald-900 text-base">Inquiry Submitted Directly! (इन्क्वायरी दर्ज हो गई)</h4>
                  <p className="text-xs text-emerald-800 leading-relaxed max-w-sm mx-auto font-medium">
                    Aapki inquiry hamare portal par successfully save ho chuki hai. Executive team (Director Mr. Manoj / Helpdesk: <b>{COMPANY_INFO.phone}</b>) jald hi aapke mobile number par contact karegi.
                  </p>
                  <button
                    onClick={() => {
                      setInqSubmitted(false);
                      setInqName('');
                      setInqMobile('');
                      setInqEmail('');
                      setInqMessage('');
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  
                  {/* Customer Name */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Customer Name (ग्राहक का नाम) *
                    </label>
                    <input 
                      type="text" 
                      required
                      value={inqName}
                      onChange={(e) => setInqName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  {/* Mobile Number & Email ID */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Mobile Number (मोबाइल नंबर) *
                      </label>
                      <input 
                        type="tel" 
                        required
                        maxLength={10}
                        value={inqMobile}
                        onChange={(e) => setInqMobile(e.target.value.replace(/\D/g, ''))}
                        placeholder="10-digit mobile number"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        E-mail ID (ई-मेल आईडी)
                      </label>
                      <input 
                        type="email" 
                        value={inqEmail}
                        onChange={(e) => setInqEmail(e.target.value)}
                        placeholder="e.g. rahul@gmail.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Services Type Dropdown */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Services Type (सर्विस का प्रकार) *
                    </label>
                    <select
                      value={inqServiceType}
                      onChange={(e) => setInqServiceType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-bold text-blue-900"
                    >
                      <option value="IT / ITES Services">IT / ITES Services (Lease Line, Wi-Fi, M365, Hardware)</option>
                      <option value="Loan Services">Loan Services (Personal, Business, Home, Mudra, LAP)</option>
                      <option value="Insurance">Insurance (Health, Vehicle, Shop, Gold, Life)</option>
                      <option value="Registration Licenses">Registration Licenses (Company, Logo, FSSAI, MSME, TM)</option>
                      <option value="GST & Taxation">GST & Taxation (GST Reg, Monthly Returns, ITR)</option>
                      <option value="Citizen Services">Citizen Services (PAN Card, Passport, DL, Ayushman, Birth)</option>
                    </select>
                  </div>

                  {/* Message / Requirement Details */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Requirement Details / Message (आवश्यकता विवरण)
                    </label>
                    <textarea 
                      rows={3}
                      value={inqMessage}
                      onChange={(e) => setInqMessage(e.target.value)}
                      placeholder="Write brief details about what service or advice you need..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 hover:from-blue-800 hover:to-indigo-900 text-white font-extrabold py-3 rounded-xl text-xs shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-amber-300" />
                    <span>Submit Inquiry Direct / मैसेज भेजें</span>
                  </button>

                </form>
              )}
            </div>
          )}

          {/* ================= GIVE REVIEW / RATING FORM ================= */}
          {activeForm === 'feedback' && (
            <div className="space-y-4">
              {fbSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-extrabold text-emerald-900 text-base">Thank You for Your Review!</h4>
                  <p className="text-xs text-emerald-700 leading-relaxed max-w-sm mx-auto">
                    Your rating and feedback have been saved. BHARAT CONSULTANCY SERVICES appreciates your response.
                  </p>
                  <button
                    onClick={() => {
                      setFbSubmitted(false);
                      setFbName('');
                      setFbContact('');
                      setFbMessage('');
                      setFbRating(5);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm transition-colors"
                  >
                    Submit Another Feedback
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Your Name *
                      </label>
                      <input 
                        type="text" 
                        required
                        value={fbName}
                        onChange={(e) => setFbName(e.target.value)}
                        placeholder="Enter full name"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Mobile or Email (Optional)
                      </label>
                      <input 
                        type="text" 
                        value={fbContact}
                        onChange={(e) => setFbContact(e.target.value)}
                        placeholder="Mobile / Email"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Service / Subject Topic
                    </label>
                    <select
                      value={fbService}
                      onChange={(e) => setFbService(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium"
                    >
                      <option value="General Enquiry / Feedback">General Enquiry / Feedback</option>
                      <option value="IT / ITES Services">IT / ITES Services</option>
                      <option value="Banking Loans">Banking Loans</option>
                      <option value="GST & Income Tax">GST & Income Tax</option>
                      <option value="Company Registration">Company Registration & Legal</option>
                      <option value="PAN Card Services">PAN Card Services (NSDL/UTI)</option>
                      <option value="Citizen Services">Citizen Services</option>
                      <option value="Insurance Services">Insurance Policies</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Your Star Rating
                    </label>
                    <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 p-2 rounded-xl w-fit">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFbRating(star)}
                          onMouseEnter={() => setFbHoverRating(star)}
                          onMouseLeave={() => setFbHoverRating(0)}
                          className="p-1 focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star 
                            className={`w-6 h-6 ${
                              (fbHoverRating || fbRating) >= star 
                                ? 'text-amber-400 fill-amber-400' 
                                : 'text-slate-300'
                            }`} 
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-slate-700 ml-2">
                        {fbRating === 5 ? '5/5 Excellent' : `${fbRating}/5 Rating`}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Review Comment / Suggestion *
                    </label>
                    <textarea 
                      rows={3}
                      required
                      value={fbMessage}
                      onChange={(e) => setFbMessage(e.target.value)}
                      placeholder="Write your experience or feedback here..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-extrabold py-2.5 rounded-xl text-xs shadow transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5 text-amber-300" />
                    <span>Submit Review</span>
                  </button>

                </form>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
