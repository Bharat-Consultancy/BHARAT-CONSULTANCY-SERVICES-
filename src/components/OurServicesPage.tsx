import React, { useState } from 'react';
import { SERVICE_CATEGORIES, SERVICES_DATA } from '../data/servicesData';
import { ServiceCategory, ServiceItem } from '../types';
import { Calculators } from './Calculators';
import { 
  Building2, 
  ShieldCheck, 
  Briefcase, 
  BadgeCheck, 
  Calculator, 
  FileText, 
  Search, 
  Clock, 
  CheckCircle2, 
  PlusCircle,
  Eye,
  Layers,
  Sparkles,
  Network,
  ArrowRight
} from 'lucide-react';

interface OurServicesPageProps {
  onSelectService: (service: ServiceItem) => void;
  onApplyService: (service: ServiceItem) => void;
  initialSubject?: ServiceCategory | 'all';
}

export const OurServicesPage: React.FC<OurServicesPageProps> = ({
  onSelectService,
  onApplyService,
  initialSubject = 'all'
}) => {
  const [selectedSubject, setSelectedSubject] = useState<ServiceCategory | 'all'>(initialSubject);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Helper icon map for category headers
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Network': return <Network className="w-6 h-6 text-blue-600" />;
      case 'Building2': return <Building2 className="w-6 h-6 text-indigo-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-purple-600" />;
      case 'Calculator': return <Calculator className="w-6 h-6 text-amber-600" />;
      case 'FileText': return <FileText className="w-6 h-6 text-rose-600" />;
      default: return <Layers className="w-6 h-6 text-blue-600" />;
    }
  };

  // Filter categories based on selectedSubject
  const visibleCategories = SERVICE_CATEGORIES.filter(cat => 
    selectedSubject === 'all' || cat.id === selectedSubject
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      
      {/* Page Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              BHARAT CONSULTANCY SERVICES DIRECTORY
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight">
              Our Professional Advisory & Citizen Services
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Below are all our services grouped by Subject Name. Click on any service for details or online application.
            </p>
          </div>

          {/* Quick Search Bar */}
          <div className="w-full md:w-80 shrink-0">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any service name..."
                className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-white/10 text-white placeholder-slate-400 text-xs font-medium border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-300 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Top Subject Quick Jump Tabs */}
      <div className="bg-white p-3 sm:p-4 rounded-3xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 px-1">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px] text-blue-900 font-extrabold">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Quick Select Subject Category:
          </span>
          <span className="text-slate-500 font-medium">
            Total <b>{SERVICES_DATA.length}</b> Services Available
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          <button
            onClick={() => { setSelectedSubject('all'); }}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold shrink-0 transition-all ${
              selectedSubject === 'all'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Subjects ({SERVICES_DATA.length})
          </button>

          {SERVICE_CATEGORIES.map(cat => {
            const count = SERVICES_DATA.filter(s => s.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => { setSelectedSubject(cat.id); }}
                className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-2 ${
                  selectedSubject === cat.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{cat.name} ({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Subject by Subject Section List */}
      <div className="space-y-12">
        {visibleCategories.map((category) => {
          // Get services under this subject matching search query
          const subjectServices = SERVICES_DATA.filter(service => {
            const matchesCategory = service.category === category.id;
            const matchesSearch = searchQuery.trim() === '' || 
              service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (service.titleHindi && service.titleHindi.toLowerCase().includes(searchQuery.toLowerCase())) ||
              service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
          });

          if (subjectServices.length === 0 && searchQuery.trim() !== '') {
            return null; // hide empty sections during search
          }

          return (
            <section 
              key={category.id}
              id={`subject-${category.id}`}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6"
            >
              {/* SUBJECT HEADER BANNER */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 shadow-sm">
                    {getCategoryIcon(category.icon)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-serif">
                        {category.name}
                      </h2>
                      <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
                        {subjectServices.length} Services
                      </span>
                    </div>
                    <p className="text-xs text-amber-700 font-bold mt-0.5">
                      {category.nameHindi}
                    </p>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* SERVICES GRID UNDER THIS SUBJECT */}
              {subjectServices.length === 0 ? (
                <p className="text-xs text-slate-400 italic py-4">No matching services found in this subject.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {subjectServices.map((service) => (
                    <div 
                      key={service.id}
                      className="bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200 hover:border-blue-500 p-5 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-4 relative group"
                    >
                      {service.popular && (
                        <span className="absolute top-3.5 right-3.5 bg-amber-400 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">
                          Popular
                        </span>
                      )}

                      <div className="space-y-2.5">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded border border-blue-200 inline-block">
                          {service.categoryName}
                        </span>

                        <div>
                          <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                            {service.title}
                          </h3>
                          {service.titleHindi && (
                            <p className="text-xs text-amber-700 font-semibold mt-0.5">{service.titleHindi}</p>
                          )}
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 font-normal">
                          {service.shortDesc}
                        </p>

                        <div className="pt-2 border-t border-slate-200/80 grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-white p-2 rounded-xl border border-slate-200">
                            <span className="text-[10px] text-slate-400 font-bold block uppercase">Est. Processing</span>
                            <span className="font-bold text-slate-800 flex items-center gap-1 text-[11px] mt-0.5">
                              <Clock className="w-3 h-3 text-purple-600 shrink-0" />
                              <span className="truncate">{service.estimatedTime}</span>
                            </span>
                          </div>

                          <div className="bg-white p-2 rounded-xl border border-slate-200">
                            <span className="text-[10px] text-slate-400 font-bold block uppercase">Consultancy Fee</span>
                            <span className="font-extrabold text-blue-700 text-[11px] mt-0.5 block truncate">
                              {service.consultancyFee === 0 ? 'Free Advisory' : `₹${service.consultancyFee}`}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-2 grid grid-cols-2 gap-2">
                        <button
                          onClick={() => onSelectService(service)}
                          className="bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold py-2 px-3 rounded-xl transition-colors flex items-center justify-center gap-1 border border-slate-300 shadow-sm"
                        >
                          <Eye className="w-3.5 h-3.5 text-blue-600" />
                          <span>Details</span>
                        </button>

                        <button
                          onClick={() => onApplyService(service)}
                          className="bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white text-xs font-extrabold py-2 px-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1"
                        >
                          <PlusCircle className="w-3.5 h-3.5 text-amber-300" />
                          <span>Apply Now</span>
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Financial & Tax Calculators Section */}
      <div className="pt-8 border-t border-slate-200">
        <Calculators />
      </div>

    </div>
  );
};
