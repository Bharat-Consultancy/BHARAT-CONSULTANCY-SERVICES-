import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, Calendar, Sparkles, Building2, CheckCircle2 } from 'lucide-react';

export const Calculators: React.FC = () => {
  const [activeCalc, setActiveCalc] = useState<'emi' | 'gst'>('emi');

  // EMI Calculator State
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [interestRate, setInterestRate] = useState<number>(10.5);
  const [tenureYears, setTenureYears] = useState<number>(5);

  // EMI Calculations
  const calculateEmi = () => {
    const p = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenureYears * 12;
    if (r === 0) return p / n;
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return isNaN(emi) ? 0 : emi;
  };

  const monthlyEmi = calculateEmi();
  const totalPayment = monthlyEmi * tenureYears * 12;
  const totalInterest = totalPayment - loanAmount;

  // GST Calculator State
  const [gstAmount, setGstAmount] = useState<number>(10000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [gstType, setGstType] = useState<'exclusive' | 'inclusive'>('exclusive');

  // GST Calculations
  const calculateGst = () => {
    if (gstType === 'exclusive') {
      const tax = (gstAmount * gstRate) / 100;
      const total = gstAmount + tax;
      return { base: gstAmount, tax, cgst: tax / 2, sgst: tax / 2, total };
    } else {
      const base = (gstAmount * 100) / (100 + gstRate);
      const tax = gstAmount - base;
      return { base, tax, cgst: tax / 2, sgst: tax / 2, total: gstAmount };
    }
  };

  const gstResult = calculateGst();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Financial & Tax Calculators
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
          Loan EMI & GST Tax Calculators
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
          Instantly calculate your monthly loan EMI and itemized GST tax breakdowns.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center">
        <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-2 text-xs font-bold shadow-inner">
          <button
            onClick={() => setActiveCalc('emi')}
            className={`px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
              activeCalc === 'emi' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Loan EMI Calculator</span>
          </button>

          <button
            onClick={() => setActiveCalc('gst')}
            className={`px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
              activeCalc === 'gst' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>GST Tax Calculator</span>
          </button>
        </div>
      </div>

      {/* EMI CALCULATOR */}
      {activeCalc === 'emi' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Inputs Left */}
          <div className="lg:col-span-7 space-y-6 text-xs font-medium">
            
            {/* Loan Amount Slider */}
            <div className="space-y-2">
              <div className="flex justify-between font-bold text-slate-800">
                <span>Loan Amount (₹)</span>
                <span className="text-blue-700 text-sm font-extrabold">₹{loanAmount.toLocaleString('en-IN')}</span>
              </div>
              <input 
                type="range"
                min={20000}
                max={5000000}
                step={10000}
                value={loanAmount}
                onChange={e => setLoanAmount(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>₹20,000</span>
                <span>₹50 Lakhs</span>
              </div>
            </div>

            {/* Interest Rate Slider */}
            <div className="space-y-2">
              <div className="flex justify-between font-bold text-slate-800">
                <span>Interest Rate (% p.a.)</span>
                <span className="text-blue-700 text-sm font-extrabold">{interestRate}%</span>
              </div>
              <input 
                type="range"
                min={7}
                max={24}
                step={0.25}
                value={interestRate}
                onChange={e => setInterestRate(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>7% (Home Loan)</span>
                <span>24% (Personal Loan)</span>
              </div>
            </div>

            {/* Tenure Slider */}
            <div className="space-y-2">
              <div className="flex justify-between font-bold text-slate-800">
                <span>Loan Tenure (Years)</span>
                <span className="text-blue-700 text-sm font-extrabold">{tenureYears} Years ({tenureYears * 12} Months)</span>
              </div>
              <input 
                type="range"
                min={1}
                max={30}
                step={1}
                value={tenureYears}
                onChange={e => setTenureYears(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>1 Year</span>
                <span>30 Years</span>
              </div>
            </div>

          </div>

          {/* Results Display Right */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 flex flex-col justify-between space-y-6 shadow-xl">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-400/20 px-2.5 py-1 rounded-full">
                Estimated Monthly EMI
              </span>
              <p className="text-3xl font-extrabold text-white font-serif mt-2">
                ₹{Math.round(monthlyEmi).toLocaleString('en-IN')} <span className="text-xs font-normal text-slate-300">/ Month</span>
              </p>
            </div>

            <div className="space-y-3 text-xs border-t border-slate-800 pt-4">
              <div className="flex justify-between text-slate-300">
                <span>Principal Amount:</span>
                <span className="font-bold text-white">₹{loanAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Total Interest Payable:</span>
                <span className="font-bold text-amber-400">₹{Math.round(totalInterest).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-300 font-bold border-t border-slate-800 pt-2 text-sm text-white">
                <span>Total Amount Payable:</span>
                <span>₹{Math.round(totalPayment).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <a
              href={`tel:9266677763`}
              className="block w-full text-center bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3 rounded-xl text-xs shadow transition-colors"
            >
              Apply For Loan at {interestRate}% Rate
            </a>
          </div>

        </div>
      )}

      {/* GST CALCULATOR */}
      {activeCalc === 'gst' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Inputs Left */}
          <div className="lg:col-span-7 space-y-6 text-xs font-medium">
            
            <div className="space-y-1">
              <label className="text-slate-700 font-bold block">Base Amount (₹)</label>
              <input 
                type="number"
                value={gstAmount}
                onChange={e => setGstAmount(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none font-bold text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-slate-700 font-bold block">Select GST Slab Rate (%)</label>
              <div className="grid grid-cols-4 gap-2">
                {[5, 12, 18, 28].map(rate => (
                  <button
                    key={rate}
                    onClick={() => setGstRate(rate)}
                    className={`py-2.5 rounded-xl font-bold transition-all ${
                      gstRate === rate ? 'bg-blue-600 text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {rate}%
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-slate-700 font-bold block">Calculation Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setGstType('exclusive')}
                  className={`py-2.5 rounded-xl font-bold transition-all ${
                    gstType === 'exclusive' ? 'bg-blue-600 text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  GST Exclusive (+ GST)
                </button>
                <button
                  onClick={() => setGstType('inclusive')}
                  className={`py-2.5 rounded-xl font-bold transition-all ${
                    gstType === 'inclusive' ? 'bg-blue-600 text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  GST Inclusive (Inbuilt Tax)
                </button>
              </div>
            </div>

          </div>

          {/* Results Display Right */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 flex flex-col justify-between space-y-6 shadow-xl">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-400/20 px-2.5 py-1 rounded-full">
                Final Invoice Total
              </span>
              <p className="text-3xl font-extrabold text-white font-serif mt-2">
                ₹{gstResult.total.toFixed(2)}
              </p>
            </div>

            <div className="space-y-2 text-xs border-t border-slate-800 pt-4">
              <div className="flex justify-between text-slate-300">
                <span>Net Amount (without tax):</span>
                <span className="font-bold text-white">₹{gstResult.base.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>CGST ({(gstRate / 2).toFixed(1)}%):</span>
                <span className="font-bold text-amber-400">₹{gstResult.cgst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>SGST ({(gstRate / 2).toFixed(1)}%):</span>
                <span className="font-bold text-amber-400">₹{gstResult.sgst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-300 font-bold border-t border-slate-800 pt-2 text-sm text-white">
                <span>Total GST Amount:</span>
                <span className="text-emerald-400">₹{gstResult.tax.toFixed(2)}</span>
              </div>
            </div>

            <a
              href={`tel:9266677763`}
              className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-extrabold py-3 rounded-xl text-xs shadow transition-colors"
            >
              Get GST Registration / Return Filing Assistance
            </a>
          </div>

        </div>
      )}

    </div>
  );
};
