import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { Target, Eye, Heart, ShieldCheck, RefreshCw, Trash2, CheckCircle, AlertTriangle, Code, Cpu } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-white animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          <div className="lg:w-1/2">
            <SectionTitle 
              title="Manufacturing Safety for Global Healthcare" 
              subtitle="Specializing in the direct manufacture of high-performance disposable and reusable hospital garments."
            />
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Founded on the principles of uncompromising protection, CareGuard has become a trusted partner for hospitals globally. We manage the entire lifecycle of hospital apparel—from sourcing specialized medical-grade textiles to the precision manufacturing of both single-use sterile kits and industrial-strength reusable gowns.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                    <Trash2 size={20} />
                 </div>
                 <div>
                    <p className="text-lg font-bold text-slate-900">Disposable</p>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Single-use Kits</p>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600">
                    <RefreshCw size={20} />
                 </div>
                 <div>
                    <p className="text-lg font-bold text-slate-900">Reusable</p>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">75+ Cycle Gowns</p>
                 </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="bg-slate-100 rounded-3xl aspect-square overflow-hidden shadow-2xl">
               <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200" alt="Advanced Manufacturing Facility" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-2xl shadow-2xl border border-slate-100 max-w-xs">
              <p className="text-slate-900 font-bold italic">"We manufacture the armor for those who save lives, whether it's for one use or a hundred."</p>
              <p className="mt-4 text-sm text-red-600 font-bold">— Operations Director, CareGuard</p>
            </div>
          </div>
        </div>

        {/* Vision / Mission */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          <div className="p-10 rounded-3xl bg-teal-50 border border-teal-100">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-teal-600 mb-6 shadow-sm">
              <Target size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Manufacturing Ethics</h3>
            <p className="text-slate-600 leading-relaxed">Direct control over production lines allows us to eliminate middle-man costs while maintaining 100% material traceability.</p>
          </div>
          
          <div className="p-10 rounded-3xl bg-blue-50 border border-blue-100">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 mb-6 shadow-sm">
              <Eye size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Future Innovation</h3>
            <p className="text-slate-600 leading-relaxed">Pioneering reusable textiles that offer the same lightweight comfort as disposable SMS without the environmental waste.</p>
          </div>

          <div className="p-10 rounded-3xl bg-purple-50 border border-purple-100">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-purple-600 mb-6 shadow-sm">
              <Heart size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Clinical Impact</h3>
            <p className="text-slate-600 leading-relaxed">Providing clinicians with garments that are not just protective, but ergonomically designed for long-duration procedures.</p>
          </div>
        </div>

        {/* Pros & Cons Analysis Section */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <span className="text-red-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Platform Analysis</span>
            <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">System Strengths & Limitations</h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium">A transparent look at our B2B procurement platform architecture and clinical deployment strategy.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Pros */}
            <div className="bg-emerald-50/50 rounded-[3rem] p-10 lg:p-16 border border-emerald-100">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                  <CheckCircle size={24} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Platform Pros</h3>
              </div>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="mt-1 w-5 h-5 bg-emerald-500 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold">1</div>
                  <div>
                    <p className="font-bold text-slate-900 mb-1">Real-Time Ledger Sync</p>
                    <p className="text-sm text-slate-600 leading-relaxed">Direct integration with Supabase ensures that inventory updates and procurement requests are synchronized across all administrative terminals instantly.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 w-5 h-5 bg-emerald-500 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold">2</div>
                  <div>
                    <p className="font-bold text-slate-900 mb-1">Hybrid Data Strategy</p>
                    <p className="text-sm text-slate-600 leading-relaxed">The 'Offline-First' architecture allows the catalog to remain visible even during clinical network outages using local constants as an intelligent fallback.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 w-5 h-5 bg-emerald-500 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold">3</div>
                  <div>
                    <p className="font-bold text-slate-900 mb-1">Institutional Security</p>
                    <p className="text-sm text-slate-600 leading-relaxed">Row Level Security (RLS) ensures that sensitive procurement data is isolated and only accessible to verified procurement officers.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Cons */}
            <div className="bg-amber-50/50 rounded-[3rem] p-10 lg:p-16 border border-amber-100">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600">
                  <AlertTriangle size={24} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">System Cons</h3>
              </div>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="mt-1 w-5 h-5 bg-amber-500 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold">1</div>
                  <div>
                    <p className="font-bold text-slate-900 mb-1">Initial Setup Overhead</p>
                    <p className="text-sm text-slate-600 leading-relaxed">Full cloud persistence requires an initial SQL schema migration (the 'careguard' table) which can be a barrier for non-technical facility managers.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 w-5 h-5 bg-amber-500 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold">2</div>
                  <div>
                    <p className="font-bold text-slate-900 mb-1">Vendor Dependency</p>
                    <p className="text-sm text-slate-600 leading-relaxed">The architecture is tightly coupled with Supabase PostgreSQL services. Migrating to an on-premise hospital server requires code-level refactoring.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 w-5 h-5 bg-amber-500 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold">3</div>
                  <div>
                    <p className="font-bold text-slate-900 mb-1">Fetch Latency</p>
                    <p className="text-sm text-slate-600 leading-relaxed">Direct API calls for large institutional catalogs may experience 'handshake' delays on high-latency hospital Wi-Fi networks compared to static builds.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quality Section */}
        <div className="bg-slate-900 rounded-[3rem] p-12 lg:p-20 text-white flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
             <div className="inline-block px-3 py-1 bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest rounded mb-6">ISO 13485:2016 Certified</div>
             <h2 className="text-4xl font-bold mb-8">Rigorous Production Quality</h2>
             <p className="text-slate-400 mb-8 leading-relaxed text-lg">
               Our facility is dedicated to the production of high-barrier apparel. Whether it's the sonic-welding of disposable gowns or the reinforced stitching of reusable garments, quality is non-negotiable.
             </p>
             <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <ShieldCheck className="text-red-400" />
                  <span>Fluid Resistance (AAMI PB70) Testing</span>
                </li>
                <li className="flex items-center gap-3">
                  <ShieldCheck className="text-red-400" />
                  <span>Microbial Barrier Integrity Checks</span>
                </li>
                <li className="flex items-center gap-3">
                  <ShieldCheck className="text-red-400" />
                  <span>Lint-Free & Antistatic Compliance</span>
                </li>
             </ul>
          </div>
          <div className="lg:w-1/2 rounded-2xl overflow-hidden border border-slate-800">
             <img src="https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=1200" alt="Textile Quality Control" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;