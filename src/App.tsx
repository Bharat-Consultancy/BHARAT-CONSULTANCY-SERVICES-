import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryGrid } from './components/CategoryGrid';
import { CompactReviews } from './components/CompactReviews';
import { AboutUs } from './components/AboutUs';
import { OurServicesPage } from './components/OurServicesPage';
import { ContactUs } from './components/ContactUs';
import { ServiceModal } from './components/ServiceModal';
import { ApplicationPortal } from './components/ApplicationPortal';
import { StatusTracker } from './components/StatusTracker';
import { Calculators } from './components/Calculators';
import { AdminPortal } from './components/AdminPortal';
import { CallbackModal } from './components/CallbackModal';
import { ReceiptPrint } from './components/ReceiptPrint';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { Footer } from './components/Footer';

import { SERVICE_CATEGORIES, SERVICES_DATA } from './data/servicesData';
import { ServiceCategory, ServiceItem, ApplicationRecord } from './types';
import { COMPANY_INFO } from './data/companyInfo';

export default function App() {
  // Navigation State: 'home' | 'about' | 'services' | 'contact' | 'apply' | 'track' | 'calculators'
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('it_ites');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Service Details Modal
  const [detailService, setDetailService] = useState<ServiceItem | null>(null);

  // Application Wizard Pre-selected Service
  const [wizardService, setWizardService] = useState<ServiceItem | null>(null);

  // Application Tracking Pre-filled Ref ID
  const [trackRefId, setTrackRefId] = useState<string>('');

  // Printable Receipt Modal
  const [receiptRecord, setReceiptRecord] = useState<ApplicationRecord | null>(null);

  // Admin Modal
  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);

  // Callback Modal
  const [showCallbackModal, setShowCallbackModal] = useState<boolean>(false);

  // Auto Scroll to Top on Page/Tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // Handlers
  const handleApplyForService = (service: ServiceItem) => {
    setWizardService(service);
    setActiveTab('apply');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTrackRedirect = (refId: string) => {
    setTrackRefId(refId);
    setActiveTab('track');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      
      {/* Sticky Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onOpenCallback={() => setShowCallbackModal(true)}
        onOpenAdmin={() => setShowAdminModal(true)}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        
        {/* PAGE 1: HOME */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            <Hero 
              onSelectService={setDetailService}
              onApplyService={handleApplyForService}
              onTrackClick={() => setActiveTab('track')}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            <CategoryGrid 
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              onSelectService={setDetailService}
              onApplyService={handleApplyForService}
              searchQuery={searchQuery}
            />

            <CompactReviews />
          </div>
        )}

        {/* PAGE 2: ABOUT US */}
        {activeTab === 'about' && (
          <AboutUs
            onExploreServices={() => { setActiveTab('services'); setSelectedCategory('all'); }}
            onContactClick={() => { setActiveTab('contact'); }}
            onApplyClick={() => { setActiveTab('apply'); }}
          />
        )}

        {/* PAGE 3: OUR SERVICES (Subject-wise & Drill-down) */}
        {activeTab === 'services' && (
          <OurServicesPage
            initialSubject={selectedCategory}
            onSelectService={setDetailService}
            onApplyService={handleApplyForService}
          />
        )}

        {/* PAGE 4: CONTACT US (With Compact Feedback Form) */}
        {activeTab === 'contact' && (
          <ContactUs />
        )}

        {/* ONLINE APPLICATION PORTAL */}
        {activeTab === 'apply' && (
          <ApplicationPortal
            initialService={wizardService}
            onTrackRedirect={handleTrackRedirect}
            onOpenReceipt={setReceiptRecord}
          />
        )}

        {/* TRACK APPLICATION */}
        {activeTab === 'track' && (
          <StatusTracker
            initialSearchId={trackRefId}
            onOpenReceipt={setReceiptRecord}
            onApplyNew={() => { setWizardService(null); setActiveTab('apply'); }}
          />
        )}

        {/* EMI & TAX CALCULATORS */}
        {activeTab === 'calculators' && (
          <Calculators />
        )}

      </main>

      {/* Floating WhatsApp Quick Connect Button */}
      <WhatsAppFloatingButton />

      {/* Footer */}
      <Footer 
        onSelectCategory={(cat) => { setSelectedCategory(cat); setActiveTab('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        onOpenCallback={() => setShowCallbackModal(true)}
        onOpenAdmin={() => setShowAdminModal(true)}
      />

      {/* Service Details Popup Modal */}
      <ServiceModal
        service={detailService}
        onClose={() => setDetailService(null)}
        onApply={handleApplyForService}
      />

      {/* Printable Tax Receipt Modal */}
      {receiptRecord && (
        <ReceiptPrint
          record={receiptRecord}
          onClose={() => setReceiptRecord(null)}
        />
      )}

      {/* Staff Admin Portal Modal */}
      {showAdminModal && (
        <AdminPortal
          onClose={() => setShowAdminModal(false)}
          onOpenReceipt={setReceiptRecord}
        />
      )}

      {/* Instant Callback Modal */}
      {showCallbackModal && (
        <CallbackModal
          onClose={() => setShowCallbackModal(false)}
        />
      )}

    </div>
  );
}
