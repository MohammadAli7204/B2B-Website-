
import React from 'react';
import { ChevronRight, ShieldCheck, Zap, Globe, Microscope, ArrowRight, RefreshCw, Trash2, ExternalLink, Award, Factory, Thermometer, Layers } from 'lucide-react';
import { STATS, PRODUCTS } from '../constants';
import SectionTitle from '../components/SectionTitle';
import CertificatesSlider from '../components/CertificatesSlider';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden w-full bg-white">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-slate-50/50 rounded-bl-[160px]"></div>
        
        <div className="w-full px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <div className="inline-flex items-center px-4 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              Certified Global B2B Manufacturer
            </div>
            <h1 className="text-5xl lg:text-8xl font-black text-slate-900 leading-[0.9] mb-8 tracking-tighter">
              Precision <br/><span className="text-red-600">Apparel</span> for <br/>Medical Excellence
            </h1>
            <p className="text-xl text-slate-500 mb-12 leading-relaxed max-w-lg font-medium">
              World-class manufacturing of AAMI PB70 sterile disposable and high-durability reusable garments for leading clinical institutions.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => onNavigate('/products')}
                className="bg-red-600 text-white px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-red-700 transition-all flex items-center justify-center group shadow-2xl shadow-red-200 active:scale-95"
              >
                Explore Catalog
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => onNavigate('/contact')}
                className="bg-white text-slate-900 border-2 border-slate-100 px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:border-red-600 hover:text-red-600 transition-all text-center active:scale-95"
              >
                Direct Factory Inquiry
              </button>
            </div>
            
            <div className="mt-16 flex items-center space-x-10">
              <div className="flex flex-col">
                <span className="text-2xl font-black text-slate-900">AAMI L3/4</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Barrier Level</span>
              </div>
              <div className="w-px h-10 bg-slate-200"></div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-slate-900">75+</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wash Cycles</span>
              </div>
              <div className="w-px h-10 bg-slate-200"></div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-slate-900">ISO</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">13485:2016</span>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] bg-slate-100 aspect-[4/5] lg:aspect-[4/5]">
              <img 
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200" 
                alt="Sterile surgical garment manufacturing" 
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            {/* Absolute Badges */}
            <div className="absolute -top-10 -left-10 z-20 bg-white p-8 rounded-[3rem] shadow-2xl hidden lg:block border border-slate-50">
              <ShieldCheck size={48} className="text-red-600 mb-2" />
              <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">100% Sterile</p>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing Advantages Section (Steri Attire Inspired) */}
      <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-red-600 opacity-5 -skew-x-12 transform translate-x-20"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-red-500 font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Our Manufacturing Core</span>
              <h2 className="text-4xl lg:text-6xl font-black mb-10 tracking-tighter leading-tight">Advanced Textile <br/>Engineering.</h2>
              
              <div className="space-y-10">
                <div className="flex gap-6 group">
                  <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                    <Factory size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black mb-2">Vertical Integration</h4>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-medium">From raw fiber sourcing to final sonic-welding, we control every micron of the production process.</p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                    <Thermometer size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black mb-2">Cleanroom Standard</h4>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-medium">All sterile products are processed in Class 100 ISO-certified environments to ensure zero biological load.</p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                    <Layers size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black mb-2">Multi-Barrier Tech</h4>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-medium">Proprietary SMS and PE-film lamination techniques for unmatched liquid and microbial resistance.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
               <div className="aspect-square bg-slate-800 rounded-[4rem] overflow-hidden border border-slate-700">
                  <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700" alt="Factory Detail" />
               </div>
               <div className="absolute -bottom-10 -right-10 bg-red-600 p-12 rounded-[3rem] shadow-2xl hidden md:block">
                  <p className="text-5xl font-black text-white">15+</p>
                  <p className="text-[10px] font-black text-red-200 uppercase tracking-widest mt-2">Years Quality Assurance</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-red-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Product Solutions</span>
              <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-slate-900 leading-tight">Procedural Compliance <br/>for Every Specialty.</h2>
            </div>
            <button onClick={() => onNavigate('/products')} className="font-black text-sm uppercase tracking-widest text-red-600 flex items-center gap-3 group">
              View All Systems <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {PRODUCTS.slice(0, 3).map((product) => (
              <div key={product.id} className="group cursor-pointer" onClick={() => onNavigate(`/product/${product.id}`)}>
                <div className="aspect-[3/4] bg-slate-50 rounded-[3rem] overflow-hidden mb-8 relative">
                  <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={product.name} />
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm">
                    {product.category}
                  </div>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-red-600 transition-colors">{product.name}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed line-clamp-2">{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Markers / Certificates */}
      <CertificatesSlider />

      {/* Contact CTA */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-[4rem] p-16 lg:p-24 shadow-2xl border border-slate-100 flex flex-col items-center text-center">
             <div className="w-24 h-24 bg-red-100 rounded-[2rem] flex items-center justify-center text-red-600 mb-10 shadow-inner">
                <Globe size={48} />
             </div>
             <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-8 tracking-tighter leading-tight">Scale Your Supply with <br/>Global Reliability.</h2>
             <p className="text-xl text-slate-500 mb-12 max-w-2xl font-medium leading-relaxed">
                Connect with our procurement specialists for tiered volume pricing and custom sterilization requirements tailored to your facility.
             </p>
             <div className="flex flex-col sm:flex-row gap-6">
                <button onClick={() => onNavigate('/contact')} className="bg-slate-900 text-white px-12 py-6 rounded-full font-black text-sm uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl active:scale-95">
                   Request Institutional Quote
                </button>
                <button onClick={() => onNavigate('/about')} className="bg-white text-slate-400 border border-slate-200 px-12 py-6 rounded-full font-black text-sm uppercase tracking-widest hover:text-slate-900 hover:border-slate-900 transition-all active:scale-95">
                   Compliance Papers
                </button>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
