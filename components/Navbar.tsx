
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, UserCog, LogOut } from 'lucide-react';
import { NAV_LINKS } from '../constants';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isAdmin?: boolean;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, isAdmin, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => onNavigate('/')}
          >
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center mr-3 group-hover:bg-red-700 transition-colors">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">
              Steri<span className="text-red-600">Pro</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.path}
                onClick={() => onNavigate(link.path)}
                className={`text-sm font-bold uppercase tracking-widest transition-colors hover:text-red-600 ${
                  currentPage === link.path ? 'text-red-600' : 'text-slate-600'
                }`}
              >
                {link.label}
              </button>
            ))}
            
            {isAdmin ? (
              <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
                <button 
                  onClick={() => onNavigate('/admin')}
                  className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-widest hover:text-red-600 transition-colors"
                >
                  <UserCog size={18} />
                  Admin
                </button>
                <button 
                  onClick={onLogout}
                  className="text-slate-400 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => onNavigate('/contact')}
                className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-red-600 transition-all flex items-center group shadow-xl"
              >
                Get a Quote
                <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-slate-900 p-2">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-4 space-y-4 shadow-xl animate-in fade-in slide-in-from-top-2 duration-300">
          {NAV_LINKS.map((link) => (
            <button
              key={link.path}
              onClick={() => {
                onNavigate(link.path);
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-3 text-slate-600 font-bold uppercase tracking-widest text-xs hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
            >
              {link.label}
            </button>
          ))}
          {isAdmin && (
            <button
              onClick={() => {
                onNavigate('/admin');
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-3 text-red-600 font-bold uppercase tracking-widest text-xs hover:bg-red-50 rounded-lg transition-all"
            >
              Admin Dashboard
            </button>
          )}
          <button 
            onClick={() => {
              if (isAdmin && onLogout) {
                onLogout();
              } else {
                onNavigate('/contact');
              }
              setIsOpen(false);
            }}
            className={`w-full ${isAdmin ? 'bg-slate-100 text-slate-900' : 'bg-red-600 text-white'} px-4 py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-colors`}
          >
            {isAdmin ? 'Logout' : 'Get a Quote'}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
