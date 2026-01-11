
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
            <div className="bg-white p-10 lg:p-12 rounded-[2rem] shadow-xl