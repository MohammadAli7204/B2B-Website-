
import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

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
              <p className="text-slate-600">sales@steripro.com</p>
              <p className="text-slate-600">support@steripro.com</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                <Phone />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Direct Line</h4>
              <p className="text-slate-600">+91 (261) 555-STERI</p>
              <p className="text-slate-600">+91 98765 43210</p>
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
                      <label className={labelClasses}>Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Mohammad Ali" 
                        className={inputClasses}
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className={labelClasses}>Email Address</label>
                      <input 
                        required
                        type="email" 
                        placeholder="saiyedmohammadali56@gmail.com" 
                        className={inputClasses}
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClasses}>Company / Institution</label>
                      <input 
                        required
                        type="text" 
                        placeholder="City General Hospital" 
                        className={inputClasses}
                        value={formState.company}
                        onChange={(e) => setFormState({...formState, company: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className={labelClasses}>Inquiry Type</label>
                      <div className="relative">
                        <select 
                          className={inputClasses + " appearance-none cursor-pointer pr-10"}
                          value={formState.interest}
                          onChange={(e) => setFormState({...formState, interest: e.target.value})}
                        >
                          <option>Product Inquiries</option>
                          <option>Bulk Orders / Quotes</option>
                          <option>Technical Support</option>
                          <option>Partnership/Distribution</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className={labelClasses}>Detailed Message</label>
                    <textarea 
                      required
                      rows={5} 
                      placeholder="Tell us about your requirements..." 
                      className={inputClasses}
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

      {/* Map Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
         <div className="h-[450px] w-full rounded-[2.5rem] bg-slate-200 border border-slate-300 relative overflow-hidden shadow-inner">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.4241512419!2d72.84!3d21.13!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDA3JzQ4LjAiTiA3MsKwNTAnMjQuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin&q=Udhna+station+Ratan+chowk+Surat"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="SteriPro Location - Ratan Chowk Udhna Station Surat"
              className="grayscale-[20%] contrast-[110%] brightness-[105%]"
            ></iframe>
         </div>
      </div>
    </div>
  );
};

export default Contact;
