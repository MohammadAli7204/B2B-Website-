
import React from 'react';

const CERTIFICATES = [
  { name: 'ISO 13485:2016', label: 'Medical Devices QMS', icon: 'https://images.unsplash.com/photo-1563206767-5b18f218e7de?auto=format&fit=crop&q=80&w=200' },
  { name: 'ISO 9001:2015', label: 'Quality Management', icon: 'https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?auto=format&fit=crop&q=80&w=200' },
  { name: 'CE MARK', label: 'European Compliance', icon: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=200' },
  { name: 'FDA REGISTERED', label: 'US Food & Drug Admin', icon: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=200' },
  { name: 'AAMI PB70', label: 'Barrier Protection', icon: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=200' },
  { name: 'GMP CERTIFIED', label: 'Good Manufacturing', icon: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=200' },
  { name: 'OEKO-TEX', label: 'Textile Safety', icon: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=200' },
];

const CertificatesSlider: React.FC = () => {
  // Double the array for seamless infinite loop
  const items = [...CERTIFICATES, ...CERTIFICATES];

  return (
    <div className="bg-slate-50/50 border-t border-slate-100 py-6 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 mb-3 text-center">
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">Global Compliance Registry</span>
      </div>
      
      <div className="flex relative">
        <div className="flex animate-scroll whitespace-nowrap gap-6 items-center gpu-accelerated">
          {items.map((cert, idx) => (
            <div 
              key={idx} 
              className="inline-flex flex-col items-center justify-center min-w-[120px] group"
            >
              <div className="w-16 h-16 bg-white border border-slate-200 rounded-full p-0 shadow-sm group-hover:shadow-lg group-hover:border-red-400 group-hover:scale-110 transition-all duration-300 flex items-center justify-center overflow-hidden grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 aspect-square">
                <img 
                  src={cert.icon} 
                  alt={cert.name} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="mt-2 text-center">
                <p className="text-[8px] font-black text-slate-900 uppercase tracking-widest">{cert.name}</p>
                <p className="text-[7px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">{cert.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(calc(-50% - 0.75rem), 0, 0); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
          display: flex;
          width: max-content;
          will-change: transform;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      {/* Side Fades */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>
    </div>
  );
};

export default CertificatesSlider;