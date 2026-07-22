import React, { useState, useEffect } from 'react';
import { Star, MessageSquarePlus, CheckCircle2, ThumbsUp, UserCheck, Sparkles, Send } from 'lucide-react';

interface ReviewItem {
  id: string;
  name: string;
  city: string;
  service: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Rajesh Kumar Verma',
    city: 'New Delhi',
    service: 'IT Lease Line & Wi-Fi',
    rating: 5,
    date: '2026-07-15',
    comment: 'BCS team set up our office 100 Mbps leased line and managed Wi-Fi within 3 days. Outstanding service and transparent rates.',
    verified: true
  },
  {
    id: 'rev-2',
    name: 'Priya Sharma',
    city: 'Noida, UP',
    service: 'GST & Trademark Registration',
    rating: 5,
    date: '2026-07-10',
    comment: 'Got my Pvt Ltd company registration and GST portal login done seamlessly. Highly recommended for business setup!',
    verified: true
  },
  {
    id: 'rev-3',
    name: 'Anil Dhaker',
    city: 'Jaipur',
    service: 'PM Mudra Business Loan',
    rating: 5,
    date: '2026-07-02',
    comment: 'Mudra loan file preparation and bank approval guidance was top-notch. Received loan sanction smoothly.',
    verified: true
  }
];

export const CompactReviews: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    const saved = localStorage.getItem('bcs_customer_reviews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_REVIEWS;
      }
    }
    return INITIAL_REVIEWS;
  });

  const [showForm, setShowForm] = useState<boolean>(false);
  const [newRating, setNewRating] = useState<number>(5);
  const [newName, setNewName] = useState<string>('');
  const [newCity, setNewCity] = useState<string>('');
  const [newService, setNewService] = useState<string>('IT / ITES Services');
  const [newComment, setNewComment] = useState<string>('');
  const [submittedMessage, setSubmittedMessage] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('bcs_customer_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;

    const item: ReviewItem = {
      id: `rev-${Date.now()}`,
      name: newName.trim(),
      city: newCity.trim() || 'India',
      service: newService,
      rating: newRating,
      date: new Date().toISOString().split('T')[0],
      comment: newComment.trim(),
      verified: true
    };

    setReviews([item, ...reviews]);
    setNewName('');
    setNewCity('');
    setNewComment('');
    setShowForm(false);
    setSubmittedMessage('Thank you! Your review and star rating have been submitted successfully.');
    setTimeout(() => setSubmittedMessage(''), 5000);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-sm space-y-6">
        
        {/* Compact Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                4.9 / 5.0 Rating
              </span>
              <span className="text-xs text-slate-500 font-medium">
                (1,450+ Verified Client Feedback)
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 font-serif">
              Customer Reviews & Ratings
            </h2>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold px-4 py-2 rounded-xl transition-all shadow-sm flex items-center gap-1.5 self-start sm:self-auto shrink-0"
          >
            <MessageSquarePlus className="w-4 h-4 text-amber-300" />
            <span>{showForm ? 'Close Form' : 'Write Review / Give Rating'}</span>
          </button>
        </div>

        {/* Success Alert */}
        {submittedMessage && (
          <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 p-3 rounded-2xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{submittedMessage}</span>
          </div>
        )}

        {/* Collapsible Write Review Form */}
        {showForm && (
          <form onSubmit={handleSubmitReview} className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="text-xs sm:text-sm font-extrabold text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Share Your Experience with Us
              </h3>
              <span className="text-[11px] text-slate-500 font-medium">Fields marked (*) are required</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Your Rating *</label>
                <div className="flex items-center gap-1 bg-white border border-slate-300 p-2 rounded-xl">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="p-0.5 hover:scale-110 transition-transform focus:outline-none"
                    >
                      <Star 
                        className={`w-5 h-5 ${
                          star <= newRating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                        }`} 
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-1.5">{newRating}.0 / 5</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Ramesh Singh"
                  className="w-full bg-white border border-slate-300 p-2 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">City / State</label>
                <input
                  type="text"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  placeholder="e.g. New Delhi"
                  className="w-full bg-white border border-slate-300 p-2 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Service Availed</label>
                <select
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  className="w-full bg-white border border-slate-300 p-2 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="IT / ITES Services">IT / ITES Services</option>
                  <option value="Loan Services">Loan Services</option>
                  <option value="Insurance">Insurance</option>
                  <option value="Registration Licenses">Registration Licenses</option>
                  <option value="GST & Taxation">GST & Taxation</option>
                  <option value="Citizen Services">Citizen Services</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Your Review Comment *</label>
                <input
                  type="text"
                  required
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a brief comment about your experience..."
                  className="w-full bg-white border border-slate-300 p-2 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Review</span>
              </button>
            </div>
          </form>
        )}

        {/* Reviews Cards Grid (Compact) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.slice(0, 3).map((item) => (
            <div 
              key={item.id}
              className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-2.5 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < item.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  {item.verified && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <UserCheck className="w-3 h-3 text-emerald-600" />
                      Verified
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-700 italic leading-relaxed font-normal">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between text-[11px]">
                <div>
                  <h4 className="font-bold text-slate-900 leading-tight">{item.name}</h4>
                  <p className="text-[10px] text-slate-500">{item.city} • <span className="text-blue-700 font-semibold">{item.service}</span></p>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">{item.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
