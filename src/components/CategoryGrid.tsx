import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Briefcase, 
  BadgeCheck, 
  Calculator, 
  FileText,
  Sparkles,
  ArrowRight,
  Network
} from 'lucide-react';
import { SERVICE_CATEGORIES, SERVICES_DATA } from '../data/servicesData';
import { ServiceCategory, ServiceItem } from '../types';
import { ServiceCard } from './ServiceCard';

interface CategoryGridProps {
  selectedCategory: ServiceCategory | 'all';
  setSelectedCategory: (cat: ServiceCategory | 'all') => void;
  onSelectService: (service: ServiceItem) => void;
  onApplyService: (service: ServiceItem) => void;
  searchQuery: string;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  selectedCategory,
  setSelectedCategory,
  onSelectService,
  onApplyService,
  searchQuery
}) => {
  // Map icon strings to Lucide components
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Network': return <Network className="w-6 h-6 text-blue-600" />;
      case 'Building2': return <Building2 className="w-6 h-6 text-indigo-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-purple-600" />;
      case 'BadgeCheck': return <BadgeCheck className="w-6 h-6 text-amber-600" />;
      case 'Calculator': return <Calculator className="w-6 h-6 text-rose-600" />;
      case 'FileText': return <FileText className="w-6 h-6 text-cyan-600" />;
      default: return <Sparkles className="w-6 h-6 text-blue-600" />;
    }
  };

  // Filter services by active category & search query
  const activeCatId = selectedCategory === 'all' ? SERVICE_CATEGORIES[0].id : selectedCategory;

  const filteredServices = SERVICES_DATA.filter(service => {
    const matchesCategory = service.category === activeCatId;
    const matchesSearch = searchQuery.trim() === '' || 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (service.titleHindi && service.titleHindi.includes(searchQuery)) ||
      service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 space-y-10">
      
      {/* Category Selection Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Category Wise Services / वर्ग अनुसार सेवाएं</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
          Services Category Wise
        </h2>
        <p className="text-sm text-slate-600">
          Aapko jis category ki service chahiye, use chunein aur dekhein.
        </p>
      </div>

      {/* Categories Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {SERVICE_CATEGORIES.map(cat => {
          const count = SERVICES_DATA.filter(s => s.category === cat.id).length;
          const isSelected = activeCatId === cat.id;

          return (
            <div
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`p-4 rounded-2xl cursor-pointer border transition-all text-center flex flex-col items-center justify-between gap-2 group ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-600/30'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50'
              }`}
            >
              <div className={`p-2.5 rounded-xl transition-colors ${isSelected ? 'bg-white/20 text-white' : 'bg-blue-50'}`}>
                {getCategoryIcon(cat.icon)}
              </div>
              <div>
                <h3 className="font-bold text-xs sm:text-sm line-clamp-2">{cat.name}</h3>
                <p className={`text-[10px] mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                  {count} Services
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filtered Services Grid */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-extrabold text-slate-900 font-serif">
              {SERVICE_CATEGORIES.find(c => c.id === activeCatId)?.name}
            </h3>
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
              {filteredServices.length} Items
            </span>
          </div>

          {searchQuery && (
            <div className="text-xs text-slate-500">
              Filtered for: <span className="font-bold text-slate-900">"{searchQuery}"</span>
            </div>
          )}
        </div>

        {filteredServices.length === 0 ? (
          <div className="bg-slate-50 border border-dashed border-slate-300 rounded-3xl p-12 text-center space-y-3">
            <p className="text-slate-600 font-medium">Is category me koi matching service nahi mili.</p>
            <button
              onClick={() => setSelectedCategory(SERVICE_CATEGORIES[0].id)}
              className="text-xs bg-blue-600 text-white px-4 py-2 rounded-xl font-bold"
            >
              Reset Category
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map(service => (
              <ServiceCard 
                key={service.id}
                service={service}
                onSelect={onSelectService}
                onApply={onApplyService}
              />
            ))}
          </div>
        )}
      </div>

    </section>
  );
};
