
import React from 'react';
import { ChevronRight, ShieldCheck, Zap, Globe, Microscope, ArrowRight, RefreshCw, Trash2, ExternalLink, Award } from 'lucide-react';
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
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-slate-50 rounded-bl-[100px]"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-6">
              Certified B2B Garment Manufacturer
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-6">
              High-Barrier <span className="text-red-600">Apparel</span> for Healthcare
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg">
              Specialized manufacturing of premium sterile disposable garments and high-durability reusable apparel for global hospitals and industrial laboratories.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => onNavigate('/products')}
                className="bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-all flex items-center justify-center group shadow-lg active:scale-95"
              >
                Browse Our Catalog
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => onNavigate('/contact')}
                className="bg-white text-slate-900 border-2 border-slate-200 px-8 py-4 rounded-full font-bold text-lg hover:border-red-600 hover:text-red-600 transition-all text-center active:scale-95"
              >
                Request Technical Evaluation
              </button>
            </div>
            
            <div className="mt-12 flex items-center space-x-8 opacity-70 grayscale">
              <div className="flex items-center gap-2">
                 <Trash2 className="text-slate-400 w-5 h-5" />
                 <span className="text-xs font-bold text-slate-500 uppercase">Disposable Tech</span>
              </div>
              <div className="flex items-center gap-2">
                 <RefreshCw className="text-slate-400 w-5 h-5" />
                 <span className="text-xs font-bold text-slate-500 uppercase">Reusable Life</span>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500 bg-red-50/30 aspect-[4/3]">
              <img 
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200" 
                alt="Medical surgeon using CareGuard sterile gown" 
                className="w-full h-full object-cover"
                loading="eager"
                decoding="sync"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 z-20 bg-white p-6 rounded-2xl shadow-xl hidden md:block border border-slate-100">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 shadow-inner">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Global Standards</p>
                  <p className="text-lg font-bold text-slate-900">AAMI PB70 & EN13795</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Optimized for Rendering */}
      <section className="py-20 bg-white section-optimized">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 text-center hover:shadow-xl hover:bg-white transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-4 text-red-600 border border-slate-100">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dual Capability Focus */}
      <section className="py-24 bg-slate-50 section-optimized">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="Manufacturing Safety at Scale" 
            subtitle="Explore our specialized clinical production lines for hospital safety and lab protection."
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <div className="bg-white p-12 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col items-center text-center group hover:border-red-200 transition-all hover:shadow-2xl">
                <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                   <Trash2 size={40} />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">Disposable Medical Line</h3>
                <p className="text-slate-600 mb-8 leading-relaxed">
                   Hygiene-first solution for critical care. High-barrier SMS non-woven fabrics with AAMI Level 3/4 certification.
                </p>
                <button onClick={() => onNavigate('/products')} className="font-bold text-blue-600 flex items-center gap-2 hover:translate-x-1 transition-transform">
                   View Sterile Range <ArrowRight size={18} />
                </button>
             </div>

             <div className="bg-white p-12 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col items-center text-center group hover:border-red-200 transition-all hover:shadow-2xl">
                <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                   <RefreshCw size={40} />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4 group-hover:text-red-600 transition-colors">Reusable Performance Line</h3>
                <p className="text-slate-600 mb-8 leading-relaxed">
                   Engineered for 75+ laundry cycles. Carbon-fiber technology for ESD safety and long-term fluid resistance.
                </p>
                <button onClick={() => onNavigate('/products')} className="font-bold text-red-600 flex items-center gap-2 hover:translate-x-1 transition-transform">
                   View Sustainable Range <ArrowRight size={18} />
                </button>
             </div>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="py-24 bg-white section-optimized">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="Professional Collection" 
            subtitle="Trusted by leading surgical centers and cleanroom facilities worldwide."
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.slice(0, 3).map((product) => (
              <div key={product.id} className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="relative aspect-[3/4] overflow-hidden bg-slate-50">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                    {product.category}
                  </div>
                </div>
                <div className="p-8 flex-grow">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-red-600 transition-colors">{product.name}</h3>
                  <p className="text-slate-600 mb-6 text-sm leading-relaxed line-clamp-2">{product.description}</p>
                  <button 
                    onClick={() => onNavigate(`/product/${product.id}`)}
                    className="flex items-center text-red-600 font-bold text-sm hover:gap-3 transition-all group"
                  >
                    View Technical Data
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white relative overflow-hidden section-optimized">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-600 rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden flex flex-col items-center text-center shadow-2xl shadow-red-200">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full -mr-24 -mt-24 blur-3xl"></div>
            
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-8 max-w-2xl leading-tight tracking-tighter">Optimize Your Supply Chain</h2>
            <p className="text-xl text-red-50 mb-10 max-w-xl font-medium">
              Partner with a primary manufacturer to ensure product consistency and regulatory compliance.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 relative z-10">
              <button 
                onClick={() => onNavigate('/contact')}
                className="bg-white text-red-700 px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-slate-50 active:scale-95 transition-all"
              >
                Request Corporate Quote
              </button>
              <button 
                onClick={() => onNavigate('/products')}
                className="bg-red-800 text-white px-10 py-4 rounded-full font-bold text-lg border border-red-500 hover:bg-red-900 active:scale-95 transition-all"
              >
                Digital Catalog
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ISO Certificates Slider */}
      <CertificatesSlider />
    </div>
  );
};

export default Home;