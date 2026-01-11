
import React, { useState } from 'react';
import { Product, InquiryData } from '../types';
import SectionTitle from '../components/SectionTitle';
import { Send, Building, Mail, User, Info, Package, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface InquiryProps {
  product: Product;
  onAddInquiry: (inquiry: InquiryData) => void;
}

const Inquiry: React.FC<InquiryProps> = ({ product, onAddInquiry }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    quantity: '100',
    message: '',
    requirement: 'Standard'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newInquiry: InquiryData = {
      id: Date.now().toString(),
      productId: product.id,
      productName: product.name,
      name: formState.name,
      email: formState.email,
      company: formState.company,
      quantity: formState.quantity,
      message: formState.message,
      requirement: formState.requirement,
      timestamp: new Date().toISOString()
    };

    onAddInquiry(newInquiry);
    setSubmitted(true);
  };

  const inputClasses = "w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 outline-none transition-all bg-slate-50 focus:bg-white text-slate-900 font-medium placeholder:text-slate-300";
  const labelClasses = "block text-xs font-black text-slate-400 mb-2 uppercase tracking-[0.2em]";

  return (
    <div className="pt-32 pb-24 bg-white animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left: Product Context */}
          <div className="lg:w-2/5">
            <div className="sticky top-32">
              <div className="inline-flex items-center px-3 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-red-100">
                Inquiry Context
              </div>
              <h1 className="text-4xl font-black text-slate-900 mb-8 tracking-tighter">Request a <span className="text-red-600">Quote</span></h1>
              
              <div className="bg-slate-50 rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{product.category}</span>
                    <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">ID: {product.id.slice(-8)}</span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 mb-4">{product.name}</h2>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">{product.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-700">
                      <ShieldCheck size={18} className="text-red-600" />
                      Certified Protection Standard
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-700">
                      <Package size={18} className="text-red-600" />
                      Global Bulk Distribution Available
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-red-50 rounded-2xl border border-red-100">
                <div className="flex gap-4">
                   <Info className="text-red-600 flex-shrink-0" />
                   <p className="text-xs font-bold text-red-900 leading-relaxed">
                     A SteriPro sterilization specialist will review your technical requirements and provide a tiered volume pricing proposal within 4 business hours.
                   </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Detailed Form */}
          <div className="lg:w-3/5">
            <div className="bg-white p-10 lg:p-14 rounded-[3rem] shadow-2xl border border-slate-100 relative overflow-hidden">
              {submitted ? (
                <div className="py-20 flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-8 shadow-inner">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter">INQUIRY DISPATCHED</h3>
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-8">Ref: #QT-{Date.now().toString().slice(-6)}</p>
                  <p className="text-lg text-slate-600 max-w-sm mb-10">
                    Your request for <strong>{product.name}</strong> has been prioritized. Our procurement team will contact you shortly.
                  </p>
                  <button 
                    onClick={() => window.location.hash = '/products'} 
                    className="bg-slate-900 text-white font-black px-10 py-4 rounded-xl uppercase tracking-widest text-sm hover:bg-red-600 transition-colors"
                  >
                    Return to Catalog
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className={labelClasses}>
                        <User size={12} className="inline mr-1 mb-0.5" /> Full Name
                      </label>
                      <input 
                        required
                        className={inputClasses}
                        placeholder="Mohammad Ali"
                        value={formState.name}
                        onChange={e => setFormState({...formState, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className={labelClasses}>
                        <Mail size={12} className="inline mr-1 mb-0.5" /> Corporate Email
                      </label>
                      <input 
                        required
                        type="email"
                        className={inputClasses}
                        placeholder="saiyedmohammadali56@gmail.com"
                        value={formState.email}
                        onChange={e => setFormState({...formState, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className={labelClasses}>
                        <Building size={12} className="inline mr-1 mb-0.5" /> Company / Facility
                      </label>
                      <input 
                        required
                        className={inputClasses}
                        placeholder="Organization Name"
                        value={formState.company}
                        onChange={e => setFormState({...formState, company: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className={labelClasses}>Target Quantity</label>
                      <input 
                        required
                        type="number"
                        className={inputClasses}
                        placeholder="Units required"
                        value={formState.quantity}
                        onChange={e => setFormState({...formState, quantity: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClasses}>Special Manufacturing Requirements</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {['Standard', 'Custom Branding', 'Sterile Packing', 'Bulk Case', 'Rush Order'].map(req => (
                        <button
                          key={req}
                          type="button"
                          onClick={() => setFormState({...formState, requirement: req})}
                          className={`py-3 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                            formState.requirement === req 
                            ? 'bg-red-600 text-white border-red-600 shadow-lg' 
                            : 'bg-white text-slate-400 border-slate-200 hover:border-red-400'
                          }`}
                        >
                          {req}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={labelClasses}>Additional Technical Details</label>
                    <textarea 
                      rows={5}
                      className={inputClasses}
                      placeholder="Specify sizes, customization needs, or regulatory requirements..."
                      value={formState.message}
                      onChange={e => setFormState({...formState, message: e.target.value})}
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-red-600 text-white font-black py-6 rounded-2xl shadow-2xl hover:bg-red-700 transition-all flex items-center justify-center gap-4 text-xl tracking-tighter"
                  >
                    <Send size={24} /> DISPATCH QUOTE REQUEST
                  </button>
                  
                  <p className="text-center text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] leading-relaxed">
                    By submitting this form, you authorize SteriPro B2B Solutions to process your professional data for the purpose of a commercial proposal.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inquiry;
