import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Building, 
  Building2, 
  Lock, 
  Sparkles, 
  QrCode, 
  Loader2,
  DollarSign
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyInfo';

interface PaymentGatewayModalProps {
  amount: number;
  serviceName: string;
  applicantName: string;
  applicantMobile: string;
  onClose: () => void;
  onSuccess: (paymentDetails: { method: string; transactionId: string }) => void;
}

export const PaymentGatewayModal: React.FC<PaymentGatewayModalProps> = ({
  amount,
  serviceName,
  applicantName,
  applicantMobile,
  onClose,
  onSuccess
}) => {
  const [paymentMode, setPaymentMode] = useState<'upi' | 'card' | 'netbanking' | 'office'>('upi');
  
  // Card Fields
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardHolder, setCardHolder] = useState(applicantName || '');

  // Netbanking field
  const [selectedBank, setSelectedBank] = useState('State Bank of India (SBI)');

  // Simulation State
  const [isProcessing, setIsProcessing] = useState(false);
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otpInput, setOtpInput] = useState('');

  // UPI Link
  const upiUrl = `upi://pay?pa=${COMPANY_INFO.upiVpa}&pn=${encodeURIComponent(COMPANY_INFO.name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(serviceName)}`;
  const qrCodeImg = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiUrl)}`;

  const handleSimulatePayment = () => {
    setIsProcessing(true);

    if (paymentMode === 'card') {
      setTimeout(() => {
        setIsProcessing(false);
        setShowOtpScreen(true);
      }, 1000);
    } else if (paymentMode === 'office') {
      setTimeout(() => {
        setIsProcessing(false);
        onSuccess({
          method: 'Office Visit / Pay at Desk',
          transactionId: `OFFICE-PAY-${Math.floor(100000 + Math.random() * 900000)}`
        });
      }, 1000);
    } else {
      // UPI or Netbanking instant confirmation
      setTimeout(() => {
        setIsProcessing(false);
        onSuccess({
          method: paymentMode === 'upi' ? 'UPI (Google Pay / PhonePe)' : `Net Banking (${selectedBank})`,
          transactionId: `TXN-BCS-${Math.floor(100000000 + Math.random() * 900000000)}`
        });
      }, 1500);
    }
  };

  const handleVerifyOtp = () => {
    if (!otpInput || otpInput.length < 4) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess({
        method: 'Debit/Credit Card (3D Secure Verified)',
        transactionId: `TXN-CARD-${Math.floor(100000000 + Math.random() * 900000000)}`
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 relative border-b border-slate-800">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <img 
              src={COMPANY_INFO.logoPath} 
              alt="BCS Logo" 
              className="w-10 h-10 rounded-lg object-cover border border-amber-400/40"
              referrerPolicy="no-referrer"
            />
            <div>
              <h2 className="text-sm font-extrabold text-white font-serif">{COMPANY_INFO.name}</h2>
              <p className="text-[11px] text-amber-300">Secure Payment Portal • SSL 256-Bit Encrypted</p>
            </div>
          </div>
        </div>

        {/* Amount Header Banner */}
        <div className="bg-blue-50 border-b border-blue-100 p-4 flex items-center justify-between text-xs">
          <div>
            <p className="text-slate-500 font-medium">Payment For:</p>
            <p className="font-bold text-slate-900 text-sm">{serviceName}</p>
          </div>
          <div className="text-right">
            <p className="text-slate-500 font-medium">Total Amount:</p>
            <p className="text-xl font-extrabold text-blue-900">₹{amount}</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          
          {showOtpScreen ? (
            /* OTP Verification Screen */
            <div className="space-y-4 text-center py-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">3D Secure Bank OTP Verification</h3>
                <p className="text-xs text-slate-500 mt-1">One Time Password (OTP) sent to {applicantMobile.replace(/(\d{2})\d{6}(\d{2})/, '$1******$2')}</p>
              </div>

              <div className="max-w-xs mx-auto space-y-2">
                <input 
                  type="text" 
                  maxLength={6}
                  value={otpInput}
                  onChange={e => setOtpInput(e.target.value)}
                  placeholder="Enter 4 or 6 Digit OTP (e.g. 123456)"
                  className="w-full text-center text-lg font-bold tracking-widest py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                  onClick={handleVerifyOtp}
                  disabled={isProcessing || !otpInput}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow"
                >
                  {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Submit OTP & Complete Payment</span>}
                </button>
              </div>
            </div>
          ) : (
            /* Payment Modes Switcher */
            <div className="space-y-4">
              
              {/* Payment Mode Buttons */}
              <div className="grid grid-cols-4 gap-1.5 bg-slate-100 p-1 rounded-2xl text-[11px] font-bold">
                <button
                  onClick={() => setPaymentMode('upi')}
                  className={`py-2 px-1 rounded-xl transition-all flex flex-col items-center justify-center gap-1 ${
                    paymentMode === 'upi' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  <span>UPI / QR</span>
                </button>

                <button
                  onClick={() => setPaymentMode('card')}
                  className={`py-2 px-1 rounded-xl transition-all flex flex-col items-center justify-center gap-1 ${
                    paymentMode === 'card' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  <span>Card</span>
                </button>

                <button
                  onClick={() => setPaymentMode('netbanking')}
                  className={`py-2 px-1 rounded-xl transition-all flex flex-col items-center justify-center gap-1 ${
                    paymentMode === 'netbanking' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-purple-600" />
                  <span>NetBank</span>
                </button>

                <button
                  onClick={() => setPaymentMode('office')}
                  className={`py-2 px-1 rounded-xl transition-all flex flex-col items-center justify-center gap-1 ${
                    paymentMode === 'office' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Building className="w-4 h-4 text-amber-600" />
                  <span>Pay Office</span>
                </button>
              </div>

              {/* UPI MODE */}
              {paymentMode === 'upi' && (
                <div className="space-y-4 text-center">
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex flex-col items-center space-y-2">
                    <p className="text-xs font-bold text-slate-800">Scan QR Code with any UPI App</p>
                    
                    <div className="bg-white p-2.5 rounded-2xl border border-slate-300 shadow-md">
                      <img 
                        src={qrCodeImg} 
                        alt="UPI Payment QR Code" 
                        className="w-44 h-44 object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="bg-amber-50 text-amber-900 px-3 py-1 rounded-full text-[11px] font-bold border border-amber-200">
                      Official VPA: {COMPANY_INFO.upiVpa}
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500">
                    Supported: Google Pay • PhonePe • Paytm • BHIM • Amazon Pay
                  </div>

                  <button
                    onClick={handleSimulatePayment}
                    disabled={isProcessing}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>I Have Paid via UPI (Confirm Payment)</span>}
                  </button>
                </div>
              )}

              {/* CARD MODE */}
              {paymentMode === 'card' && (
                <div className="space-y-3 text-xs font-medium">
                  <div className="space-y-1">
                    <label className="text-slate-700 font-bold">Card Number</label>
                    <input 
                      type="text"
                      maxLength={16}
                      value={cardNumber}
                      onChange={e => setCardNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="4000 1234 5678 9010"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-slate-700 font-bold">Expiry (MM/YY)</label>
                      <input 
                        type="text"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={e => setCardExpiry(e.target.value)}
                        placeholder="12/28"
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-700 font-bold">CVV</label>
                      <input 
                        type="password"
                        maxLength={3}
                        value={cardCvv}
                        onChange={e => setCardCvv(e.target.value.replace(/\D/g, ''))}
                        placeholder="123"
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-700 font-bold">Name on Card</label>
                    <input 
                      type="text"
                      value={cardHolder}
                      onChange={e => setCardHolder(e.target.value)}
                      placeholder="e.g. Ramesh Verma"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={handleSimulatePayment}
                    disabled={isProcessing}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all mt-2"
                  >
                    {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Pay ₹{amount} via Card</span>}
                  </button>
                </div>
              )}

              {/* NETBANKING MODE */}
              {paymentMode === 'netbanking' && (
                <div className="space-y-3 text-xs font-medium">
                  <label className="text-slate-700 font-bold block">Select Your Indian Bank</label>
                  <select
                    value={selectedBank}
                    onChange={e => setSelectedBank(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-bold"
                  >
                    <option value="State Bank of India (SBI)">State Bank of India (SBI)</option>
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="Axis Bank">Axis Bank</option>
                    <option value="Punjab National Bank (PNB)">Punjab National Bank (PNB)</option>
                    <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                    <option value="Bank of Baroda">Bank of Baroda</option>
                    <option value="Canara Bank">Canara Bank</option>
                  </select>

                  <button
                    onClick={handleSimulatePayment}
                    disabled={isProcessing}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-extrabold py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all mt-4"
                  >
                    {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Proceed to Bank Portal</span>}
                  </button>
                </div>
              )}

              {/* OFFICE PAY MODE */}
              {paymentMode === 'office' && (
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-xs text-amber-900 space-y-3">
                  <p className="font-bold">Pay Cash or UPI at Badarpur Office</p>
                  <p className="text-amber-800">
                    Aap abhi application online submit kar sakte hain aur payment hmare Badarpur office par aakar cash ya UPI me kar sakte hain.
                  </p>
                  <div className="bg-white p-3 rounded-xl border border-amber-300 font-mono text-[11px]">
                    📍 Plot NO 770/16, Lakhpat Colony Part 2 Meethapur Extension Badarpur New Delhi - 110044
                  </div>

                  <button
                    onClick={handleSimulatePayment}
                    disabled={isProcessing}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3 rounded-2xl text-xs flex items-center justify-center gap-2 shadow transition-all"
                  >
                    {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Submit Now & Pay at Office</span>}
                  </button>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-3 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Guaranteed Safe & Verified Transaction by BHARAT CONSULTANCY SERVICES</span>
        </div>

      </div>
    </div>
  );
};
