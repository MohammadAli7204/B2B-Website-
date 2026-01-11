
import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    interest: 'Products'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setSubmitted(true);
    setTimeout(() => {
        setSubmitted(false);
        setFormState({ name: '', email: '', company: '', message: '', interest: 'Products' });
    }, 3000);
  };

  const inputClasses = "w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-red-500 outline-none transition-all text-slate-900 placeholder:text-slate-400 font-medium";
  const labelClasses = "block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide text-xs";

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="Connect with Our Specialists" 
          subtitle="Whether you need a custom quote, technical datasheets, or distribution partnership info, we're here to help."
          centered
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-600 mb-6">
                <MapPin />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Global Headquarters</h4>
              <p className="text-slate-600 leading-relaxed">
                Ratan Chowk, Udhna Station<br />
                Surat, Gujarat 394210, India
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <Mail />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Sales & Support</h4>
              <p className="text-slate-600">sales@careguard.com</p>
              <p className="text-slate-600">support@careguard.com</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                <Phone />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Direct Line</h4>
              <p className="text-slate-600">+91 (261) 555-CARE</p>
              <p className="text-slate-600">+91 98765 43210</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-10 lg:p-12 rounded-[2rem] shadow-xl">
              {submitted ? (
                <div className="py-20 text-center animate-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-4">Message Received</h3>
                  <p className="text-slate-600 text-lg max-w-sm mx-auto">
                    A technical specialist will review your request and contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClasses}>Full Name</label>
                      <input 
                        required
                        className={inputClasses}
                        placeholder="John Doe"
                        value={formState.name}
                        onChange={e => setFormState({...formState, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className={labelClasses}>Email Address</label>
                      <input 
                        required
                        type="email"
                        className={inputClasses}
                        placeholder="john@hospital.com"
                        value={formState.email}
                        onChange={e => setFormState({...formState, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClasses}>Company / Institution</label>
                      <input 
                        required
                        className={inputClasses}
                        placeholder="General Hospital"
                        value={formState.company}
                        onChange={e => setFormState({...formState, company: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className={labelClasses}>Interest Area</label>
                      <select 
                        className={inputClasses}
                        value={formState.interest}
                        onChange={e => setFormState({...formState, interest: e.target.value})}
                      >
                        <option value="Products">Product Catalog</option>
                        <option value="Custom">Custom Manufacturing</option>
                        <option value="Compliance">Regulatory Compliance</option>
                        <option value="Partnership">Global Partnership</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={labelClasses}>Technical Message</label>
                    <textarea 
                      required
                      rows={4}
                      className={inputClasses}
                      placeholder="Specify your requirements or inquiry details..."
                      value={formState.message}
                      onChange={e => setFormState({...formState, message: e.target.value})}
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-red-600 text-white font-black py-4 rounded-xl shadow-xl hover:bg-red-700 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
                  >
                    Send Message
                    <Send size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
