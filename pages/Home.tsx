
import React from 'react';
import { ChevronRight, ShieldCheck, Zap, Globe, Microscope, ArrowRight, RefreshCw, Trash2 } from 'lucide-react';
import { STATS, PRODUCTS } from '../constants';
import SectionTitle from '../components/SectionTitle';

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
              Full-Scale Garment Manufacturer
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-6">
              Disposable & Reusable <span className="text-red-600">Apparel</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg">
              Specialized manufacturing of premium sterile disposable garments and high-durability reusable apparel for institutional healthcare and industrial labs.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => onNavigate('/products')}
                className="bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-all flex items-center justify-center group shadow-lg"
              >
                Explore Apparel
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => onNavigate('/contact')}
                className="bg-white text-slate-900 border-2 border-slate-200 px-8 py-4 rounded-full font-bold text-lg hover:border-red-600 hover:text-red-600 transition-all text-center"
              >
                Request Samples
              </button>
            </div>
            
            <div className="mt-12 flex items-center space-x-8 opacity-70 grayscale">
              <div className="flex items-center gap-2">
                 <Trash2 className="text-slate-400 w-5 h-5" />
                 <span className="text-xs font-bold text-slate-500 uppercase">Disposable</span>
              </div>
              <div className="flex items-center gap-2">
                 <RefreshCw className="text-slate-400 w-5 h-5" />
                 <span className="text-xs font-bold text-slate-500 uppercase">Reusable</span>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500 bg-red-50/30 aspect-[4/3]">
              <img 
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200" 
                alt="Medical Professional in Gown" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating UI element */}
            <div className="absolute -bottom-10 -left-10 z-20 bg-white p-6 rounded-2xl shadow-xl hidden md:block border border-slate-100">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Compliance</p>
                  <p className="text-lg font-bold text-slate-900">AAMI PB70 Certified</p>
                </div>
              </div>
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
            title="Garment Manufacturing Excellence" 
            subtitle="Explore our dual lines of specialized apparel designed for safety and longevity."
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <div className="bg-white p-12 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col items-center text-center group hover:border-red-200 transition-colors">
                <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                   <Trash2 size={40} />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Disposable Line</h3>
                <p className="text-slate-600 mb-8 leading-relaxed">
                   Optimized for hygiene and high-risk procedures. Features breathable non-woven fabrics with superior barrier properties.
                </p>
                <button onClick={() => onNavigate('/products')} className="font-bold text-blue-600 flex items-center gap-2 hover:underline">
                   View Disposable Range <ArrowRight size={18} />
                </button>
             </div>

             <div className="bg-white p-12 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col items-center text-center group hover:border-red-200 transition-colors">
                <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                   <RefreshCw size={40} />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Reusable Line</h3>
                <p className="text-slate-600 mb-8 leading-relaxed">
                   Designed for 75+ industrial laundry cycles. Premium carbon-fiber integrated textiles for long-term clinical safety.
                </p>
                <button onClick={() => onNavigate('/products')} className="font-bold text-red-600 flex items-center gap-2 hover:underline">
                   View Reusable Range <ArrowRight size={18} />
                </button>
             </div>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="Studio Collection" 
            subtitle="Top-performing garments trusted by leading clinical and industrial facilities."
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.slice(0, 3).map((product) => (
              <div key={product.id} className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden bg-slate-50">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
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
                    Product Details
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <SectionTitle 
                title="Direct Manufacturing Control" 
                subtitle="By managing every step from fabric sourcing to the final stitch, we guarantee A-grade quality."
              />
              
              <div className="space-y-8 mt-10">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 border border-red-100">
                    <Zap size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">High-Tech Textiles</h4>
                    <p className="text-slate-600">Specialized cleanroom fabrics and sterile non-wovens sourced from the world's best mills.</p>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 border border-blue-100">
                    <Globe size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Sustainable Cycles</h4>
                    <p className="text-slate-600">Helping institutions transition to reusable models that save costs and reduce medical waste by 80%.</p>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 border border-purple-100">
                    <Microscope size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Certified Protection</h4>
                    <p className="text-slate-600">Every garment tested against AAMI PB70 and EN 13795 standards for surgical safety.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=400" className="rounded-2xl shadow-lg mt-8 h-64 w-full object-cover" alt="Research laboratory" />
              <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=400" className="rounded-2xl shadow-lg mb-8 h-64 w-full object-cover" alt="Sterile production" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-600 rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden flex flex-col items-center text-center">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -mr-24 -mt-24"></div>
            
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-8 max-w-2xl leading-tight">Elevate Your Apparel Standards</h2>
            <p className="text-xl text-red-50 mb-10 max-w-xl">
              Partner with a manufacturer that prioritizes both safety and style.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <button 
                onClick={() => onNavigate('/contact')}
                className="bg-white text-red-700 px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-red-50 transition-colors"
              >
                Request Quote
              </button>
              <button 
                onClick={() => onNavigate('/products')}
                className="bg-red-800 text-white px-10 py-4 rounded-full font-bold text-lg border border-red-500 hover:bg-red-900 transition-colors"
              >
                Browse Catalog
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
