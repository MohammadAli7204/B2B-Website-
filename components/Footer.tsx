
import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, ArrowRight, FileText, Globe, Settings, Lock } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-transparent text-slate-600 pt-20 pb-10 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center cursor-pointer group" onClick={() => onNavigate('/')}>
              <div className="w-10 h-10 mr-3 group-hover:scale-110 transition-transform duration-300">
                <img 
                  src="./images/logo.svg" 
                  alt="CareGuard Logo" 
                  className="w-full h-full shadow-md shadow-red-100 rounded-lg object-contain" 
                />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                Care<span className="text-red-600">Guard</span>
              </span>
            </div>
            <p className="text-slate-500 leading-relaxed max-w-xs">
              Primary B2B manufacturer setting global benchmarks in clinical-grade sterilization and protective medical apparel.
            </p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener" className="p-2 bg-slate-100 rounded-full hover:bg-red-600 hover:text-white transition-all text-slate-600">
                <Linkedin size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener" className="p-2 bg-slate-100 rounded-full hover:bg-red-600 hover:text-white transition-all text-slate-600">
                <Twitter size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener" className="p-2 bg-slate-100 rounded-full hover:bg-red-600 hover:text-white transition-all text-slate-600">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold mb-6 uppercase tracking-widest text-xs">Solutions</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><button onClick={() => onNavigate('/products')} className="hover:text-red-600 transition-colors">AAMI Sterile Gowns</button></li>
              <li><button onClick={() => onNavigate('/products')} className="hover:text-red-600 transition-colors">Isolation Apparel</button></li>
              <li><button onClick={() => onNavigate('/products')} className="hover:text-red-600 transition-colors">Industrial Lab Coats</button></li>
              <li><button onClick={() => onNavigate('/products')} className="hover:text-red-600 transition-colors">Cleanroom PPE Kits</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold mb-6 uppercase tracking-widest text-xs">Resources</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><button onClick={() => onNavigate('/blog')} className="hover:text-red-600 transition-colors flex items-center gap-2"><FileText size={14} /> Knowledge Base</button></li>
              <li><button onClick={() => onNavigate('/contact')} className="hover:text-red-600 transition-colors flex items-center gap-2"><Globe size={14} /> Technical Support</button></li>
              <li>
                <button 
                  onClick={() => onNavigate('/admin')} 
                  className="hover:text-red-600 transition-colors flex items-center gap-2 text-slate-400 group"
                >
                  <Lock size={14} className="group-hover:text-red-600" /> Admin Console
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold mb-6 uppercase tracking-widest text-xs">Stay Informed</h4>
            <p className="text-slate-500 text-sm mb-4">Get manufacturing updates and industry insights.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="corporate@email.com" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-900 transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-red-600 hover:bg-red-700 text-white px-3 rounded-lg flex items-center justify-center transition-colors shadow-sm">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400">
          <p>© 2024 CareGuard. All rights reserved by WorkWithAli.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button className="hover:text-red-600 transition-colors">Privacy Policy</button>
            <button className="hover:text-red-600 transition-colors">Terms of Compliance</button>
            <button className="hover:text-red-600 transition-colors">Cookie Data</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
