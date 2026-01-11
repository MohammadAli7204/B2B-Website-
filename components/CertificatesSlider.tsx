
import React from 'react';

const CERTIFICATES = [
  { name: 'ISO 13485:2016', label: 'Medical Devices QMS', icon: '/images/cert-iso.svg' },
  { name: 'CE MARK', label: 'European Compliance', icon: '/images/cert-ce.svg' },
  { name: 'AAMI PB70', label: 'Barrier Protection', icon: '/images/cert-aami.svg' },
  { name: 'FDA REGISTERED', label: 'US Food & Drug Admin', icon: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=200' },
  { name: 'GMP CERTIFIED', label: 'Good Manufacturing', icon: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=200' },
  { name: 'ISO 9001:2015', label: 'Quality Management', icon: '/images/cert-iso.svg' },
  { name: 'OEKO-TEX', label: 'Textile Safety', icon: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=200' },
];

const CertificatesSlider: React.FC = () => {
  const items = [...CERTIFICATES, ...CERTIFICATES, ...CERTIFICATES];

  return (
    <div className="bg-slate-50/50 border-t border-slate-100 py-10 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Verified Compliance Standards</span>
      </div>
      
      <div className="flex relative w-full">
        <div className="flex animate-scroll-infinite whitespace-nowrap items-center gpu-accelerated">
          {items.map((cert, idx) => (
            <div 
              key={idx} 
              className="inline-flex flex-col items-center justify-center px-10 group flex-shrink-0"
            >
              <div className="w-20 h-20 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm group-hover:shadow-xl group-hover:border-red-400 group-hover:scale-110 transition-all duration-500 flex items-center justify-center overflow-hidden grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100">
                <img 
                  src={cert.icon} 
                  alt={cert.name} 
                  className="w-full h-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="mt-3 text-center">
                <p className="text-[9px] font-black text-slate-900 uppercase tracking-widest">{cert.name}</p>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{cert.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll-infinite {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(calc(-100% / 3), 0, 0); }
        }
        .animate-scroll-infinite {
          animation: scroll-infinite 35s linear infinite;
          display: flex;
          width: max-content;
          will-change: transform;
        }
        .animate-scroll-infinite:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>
    </div>
  );
};

export default CertificatesSlider;
