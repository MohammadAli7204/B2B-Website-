
import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';

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
                450 Innovation Way, Suite 200<br />
                Palo Alto, CA 94304, USA
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <Mail />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Sales & Support</h4>
              <p className="text-slate-600">sales@steripro-b2b.com</p>
              <p className="text-slate-600">support@steripro-b2b.com</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                <Phone />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Direct Line</h4>
              <p className="text-slate-600">+1 (800) 555-STERI</p>
              <p className="text-slate-600">+1 (650) 433-2100</p>
            </div>
            
            <div className="bg-slate-900 p-8 rounded-3xl text-white">
               <div className="flex items-center gap-3 mb-4">
                  <Clock className="text-red-400" size={20} />
                  <span className="font-bold">Operating Hours</span>
               </div>
               <p className="text-slate-400 text-sm">Mon - Fri: 08:00 - 18:00 (PST)</p>
               <p className="text-slate-400 text-sm">Sat: 09:00 - 13:00 (PST)</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-10 lg:p-12 rounded-[2rem] shadow-xl border border-slate-100 h-full relative overflow-hidden">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
                   <div className="w-24 h-24 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
                      <Send size={48} />
                   </div>
                   <h3 className="text-3xl font-bold text-slate-900 mb-4">Message Received!</h3>
                   <p className="text-lg text-slate-600 max-w-sm">Thank you for reaching out. A sterilization specialist will contact you within 4 business hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="John Doe" 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 outline-none transition-all"
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                      <input 
                        required
                        type="email" 
                        placeholder="john@hospital.com" 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 outline-none transition-all"
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Company / Institution</label>
                      <input 
                        required
                        type="text" 
                        placeholder="City General Hospital" 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 outline-none transition-all"
                        value={formState.company}
                        onChange={(e) => setFormState({...formState, company: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Inquiry Type</label>
                      <select 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 outline-none transition-all appearance-none bg-white"
                        value={formState.interest}
                        onChange={(e) => setFormState({...formState, interest: e.target.value})}
                      >
                        <option>Product Inquiries</option>
                        <option>Bulk Orders / Quotes</option>
                        <option>Technical Support</option>
                        <option>Partnership/Distribution</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Detailed Message</label>
                    <textarea 
                      required
                      rows={5} 
                      placeholder="Tell us about your requirements..." 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 outline-none transition-all"
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-red-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-red-700 transition-all flex items-center justify-center gap-2 group"
                  >
                    Send Inquiry
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                  
                  <p className="text-center text-xs text-slate-400">
                    By submitting this form, you agree to our privacy policy and consent to being contacted regarding your inquiry.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
         <div className="h-96 w-full rounded-[2rem] bg-slate-200 border border-slate-300 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center flex-col text-slate-400">
               <MapPin size={48} className="mb-4 opacity-50" />
               <p className="font-bold">Interactive Map Integration Placeholder</p>
               <p className="text-sm">Palo Alto Innovation District</p>
            </div>
            {/* Visual markers for 'sterile' feel */}
            <div className="absolute top-10 left-1/2 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
            <div className="absolute top-10 left-1/2 w-4 h-4 bg-red-600 rounded-full"></div>
         </div>
      </div>
    </div>
  );
};

export default Contact;
