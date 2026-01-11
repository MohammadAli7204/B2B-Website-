
import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, ArrowRight } from 'lucide-react';

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
              <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center mr-2 group-hover:bg-red-700 transition-colors">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                Steri<span className="text-red-600">Pro</span>
              </span>
            </div>
            <p className="text-slate-500 leading-relaxed max-w-xs">
              Setting global benchmarks in medical-grade sterilization and protective apparel for healthcare professionals.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-slate-100 rounded-full hover:bg-red-600 hover:text-white transition-all text-slate-600">
                <Linkedin size={18} />
              </a>
              <a href="#" className="p-2 bg-slate-100 rounded-full hover:bg-red-600 hover:text-white transition-all text-slate-600">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 bg-slate-100 rounded-full hover:bg-red-600 hover:text-white transition-all text-slate-600">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold mb-6 uppercase tracking-widest text-xs">Quick Links</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><button onClick={() => onNavigate('/products')} className="hover:text-red-600 transition-colors">Surgical Gowns</button></li>
              <li><button onClick={() => onNavigate('/products')} className="hover:text-red-600 transition-colors">Isolation Gowns</button></li>
              <li><button onClick={() => onNavigate('/products')} className="hover:text-red-600 transition-colors">Procedure Packs</button></li>
              <li><button onClick={() => onNavigate('/admin')} className="hover:text-red-600 transition-colors">Admin Dashboard</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold mb-6 uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><button onClick={() => onNavigate('/about')} className="hover:text-red-600 transition-colors">About Us</button></li>
              <li><button onClick={() => onNavigate('/contact')} className="hover:text-red-600 transition-colors">Quality Control</button></li>
              <li><button onClick={() => onNavigate('/about')} className="hover:text-red-600 transition-colors">Careers</button></li>
              <li><button onClick={() => onNavigate('/contact')} className="hover:text-red-600 transition-colors">Contact</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold mb-6 uppercase tracking-widest text-xs">Newsletter</h4>
            <p className="text-slate-500 text-sm mb-4">Stay updated with our latest innovations.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="email@company.com" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-900 transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-red-600 hover:bg-red-700 text-white px-3 rounded-lg flex items-center justify-center transition-colors shadow-sm">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400">
          <p>© 2024 SteriPro B2B Solutions. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button className="hover:text-red-600 transition-colors">Privacy Policy</button>
            <button className="hover:text-red-600 transition-colors">Terms of Service</button>
            <button className="hover:text-red-600 transition-colors">Cookie Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
