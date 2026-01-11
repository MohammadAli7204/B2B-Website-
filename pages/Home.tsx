
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
                className="bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-all flex items-center justify-center group shadow-lg"
              >
                Browse Our Catalog
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => onNavigate('/contact')}
                className="bg-white text-slate-900 border-2 border-slate-200 px-8 py-4 rounded-full font-bold text-lg hover:border-red-600 hover:text-red-600 transition-all text-center"
              >
                Request Technical Samples
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
                alt="Medical surgeon using SteriPro sterile gown in clinical theater" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 z-20 bg-white p-6 rounded-2xl shadow-xl hidden md:block border border-slate-100">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
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

      {/* Authority & Backlinks Section */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 opacity-60">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Validated by Industry Bodies</p>
            <div className="flex flex-wrap justify-center items-center gap-12 grayscale">
              <a href="https://www.iso.org" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
                <Award size={20} />
                <span className="font-bold text-sm">ISO 13485</span>
              </a>
              <a href="https://www.cdc.gov" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
                <ShieldCheck size={20} />
                <span className="font-bold text-sm">CDC Compliance</span>
              </a>
              <a href="https://www.who.int" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
                <Globe size={20} />
                <span className="font-bold text-sm">WHO Guidelines</span>
              </a>
              <a href="https://www.fda.gov" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
                <Microscope size={20} />
                <span className="font-bold text-sm">FDA Registered</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-4 text-red-600">
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
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="Manufacturing Safety at Scale" 
            subtitle="Explore our specialized clinical production lines for hospital safety and lab protection."
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <div className="bg-white p-12 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col items-center text-center group hover:border-red-200 transition-colors">
                <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                   <Trash2 size={40} />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Disposable Medical Line</h3>
                <p className="text-slate-600 mb-8 leading-relaxed">
                   Hygiene-first solution for critical care. High-barrier SMS non-woven fabrics with AAMI Level 3/4 certification.
                </p>
                <button onClick={() => onNavigate('/products')} className="font-bold text-blue-600 flex items-center gap-2 hover:underline">
                   View Sterile Range <ArrowRight size={18} />
                </button>
             </div>

             <div className="bg-white p-12 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col items-center text-center group hover:border-red-200 transition-colors">
                <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                   <RefreshCw size={40} />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Reusable Performance Line</h3>
                <p className="text-slate-600 mb-8 leading-relaxed">
                   Engineered for 75+ laundry cycles. Carbon-fiber technology for ESD safety and long-term fluid resistance.
                </p>
                <button onClick={() => onNavigate('/products')} className="font-bold text-red-600 flex items-center gap-2 hover:underline">
                   View Sustainable Range <ArrowRight size={18} />
                </button>
             </div>
          </div>
        </div>
      </section>

      {/* Resources & Strategic Links */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-slate-900 rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                 <div>
                    <h2 className="text-4xl font-black mb-6 tracking-tight">Technical Knowledge Base</h2>
                    <p className="text-slate-400 mb-10 text-lg">
                       Our engineering team regularly publishes technical whitepapers on medical textile innovations and sterilization benchmarks.
                    </p>
                    <div className="space-y-4">
                       <a href="https://www.aami.org/standards/pb70" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-all group">
                          <span className="font-bold">Understanding PB70 Standards</span>
                          <ExternalLink className="text-red-500 group-hover:translate-x-1 transition-transform" />
                       </a>
                       <a href="https://www.iso.org/standard/66031.html" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-all group">
                          <span className="font-bold">ISO Textile Safety Protocols</span>
                          <ExternalLink className="text-red-500 group-hover:translate-x-1 transition-transform" />
                       </a>
                    </div>
                 </div>
                 <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=800" 
                      alt="Scientific analysis of medical textiles for SteriPro products" 
                      className="rounded-3xl shadow-2xl border border-white/10"
                    />
                    <div className="absolute -top-6 -right-6 bg-red-600 p-8 rounded-full shadow-2xl animate-pulse">
                       <Microscope size={32} />
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="Professional Collection" 
            subtitle="Trusted by leading surgical centers and cleanroom facilities worldwide."
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.slice(0, 3).map((product) => (
              <div key={product.id} className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden bg-slate-50">
                  <img src={product.image} alt={`${product.name} - Professional Medical Garment`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    {product.category}
                  </div>
                </div>
                <div className="p-8 flex-grow">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{product.name}</h3>
                  <p className="text-slate-600 mb-6 text-sm leading-relaxed line-clamp-2">{product.description}</p>
                  <button 
                    onClick={() => onNavigate(`/product/${product.id}`)}
                    className="flex items-center text-red-600 font-bold text-sm hover:text-red-700 transition-colors group"
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
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-600 rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden flex flex-col items-center text-center">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -mr-24 -mt-24"></div>
            
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-8 max-w-2xl leading-tight tracking-tighter">Optimize Your Supply Chain</h2>
            <p className="text-xl text-red-50 mb-10 max-w-xl">
              Partner with a primary manufacturer to ensure product consistency and regulatory compliance.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <button 
                onClick={() => onNavigate('/contact')}
                className="bg-white text-red-700 px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-red-50 transition-colors"
              >
                Request Corporate Quote
              </button>
              <button 
                onClick={() => onNavigate('/products')}
                className="bg-red-800 text-white px-10 py-4 rounded-full font-bold text-lg border border-red-500 hover:bg-red-900 transition-colors"
              >
                Digital Catalog
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ISO Certificates Slider - Home Page Only */}
      <CertificatesSlider />
    </div>
  );
};

export default Home;
