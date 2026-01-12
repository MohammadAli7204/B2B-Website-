
import React, { useState, useMemo } from 'react';
import { ChevronRight, Ruler, Search, Minus, Plus, Star, X } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onNavigate: (path: string) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onNavigate }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('DESCRIPTION');
  const [selectedSize, setSelectedSize] = useState('L');
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [mainImage, setMainImage] = useState(product.image);

  const galleryImages = useMemo(() => {
    return [product.image, ...(product.extraImages || [])];
  }, [product]);

  const sizes = useMemo(() => {
    if (product.sizeChart && product.sizeChart.length > 0) {
      return product.sizeChart.map(s => s.label);
    }
    return ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  }, [product.sizeChart]);

  return (
    <div className="pt-24 pb-20 bg-white animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-slate-500 mb-8">
          <button onClick={() => onNavigate('/')} className="hover:text-red-600 transition-colors">Home</button>
          <ChevronRight size={14} />
          <button onClick={() => onNavigate('/products')} className="hover:text-red-600 transition-colors">Hospital Garments</button>
          <ChevronRight size={14} />
          <span className="text-slate-900 font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Left: Images */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex sm:flex-col gap-4 order-2 sm:order-1 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0">
              {galleryImages.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setMainImage(img)}
                  className={`w-20 h-24 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${mainImage === img ? 'border-red-600 shadow-md' : 'border-slate-100 hover:border-slate-300'}`}
                >
                  <img src={img} className="w-full h-full object-cover" alt={`thumbnail ${i}`} />
                </button>
              ))}
            </div>
            <div className="flex-grow relative group rounded-2xl overflow-hidden border border-slate-50 bg-slate-50 aspect-[3/4] order-1 sm:order-2">
              <img src={mainImage} className="w-full h-full object-cover animate-in fade-in duration-300" alt={product.name} />
              <button className="absolute top-4 right-4 p-3 bg-white/80 backdrop-blur rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <Search size={20} className="text-slate-700" />
              </button>
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">{product.name}</h1>
            
            <button 
              onClick={() => setIsSizeModalOpen(true)}
              className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold w-fit mb-8 hover:bg-red-700 transition-colors shadow-sm uppercase tracking-wider"
            >
              <Ruler size={18} />
              Size Chart
            </button>

            <div className="text-slate-600 leading-relaxed space-y-4 mb-8">
              <p>{product.description}</p>
              <p>Our fabrics offer excellent moisture and vapor barrier protection, ensuring safety and quality in clinical environments.</p>
            </div>

            {/* Size Selector */}
            <div className="mb-8">
              <p className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-widest">Select Size</p>
              <div className="flex flex-wrap gap-2">
                {sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-10 border rounded flex items-center justify-center text-xs font-bold transition-all ${selectedSize === size ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'border-slate-200 text-slate-600 hover:border-slate-900'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Inquiry */}
            <div className="flex items-center gap-6 mb-10">
              <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                <button onClick={() => setQuantity(Math.max(1, quantity-1))} className="p-3 hover:bg-slate-50 text-slate-600 transition-colors"><Minus size={16} /></button>
                <span className="w-12 text-center font-bold text-slate-900">{quantity}</span>
                <button onClick={() => setQuantity(quantity+1)} className="p-3 hover:bg-slate-50 text-slate-600 transition-colors"><Plus size={16} /></button>
              </div>
              <button onClick={() => onNavigate('/inquiry/' + product.id)} className="flex-grow bg-red-600 text-white font-bold py-3.5 px-8 rounded-lg hover:bg-red-700 transition-all uppercase tracking-widest shadow-sm">
                Send Inquiry
              </button>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <p className="text-sm">
                <span className="font-bold text-slate-900">Category:</span> <span className="text-slate-600">{product.category} Hospital Garments</span>
              </p>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="border-t border-slate-100">
          <div className="flex space-x-8 mb-10 overflow-x-auto">
            {['DESCRIPTION', 'REVIEWS (0)', 'ADDITIONAL INFORMATION'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-6 text-sm font-bold tracking-widest transition-all relative ${activeTab === tab ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="text-slate-600 leading-relaxed max-w-4xl animate-in fade-in slide-in-from-top-2 duration-300">
            {activeTab === 'DESCRIPTION' && (
              <div className="space-y-6">
                <p>The garment is intended to act as a barrier between the wearer and their surroundings while still allowing them to move freely.</p>
                <ul className="list-disc pl-5 space-y-2">
                  {product.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </div>
            )}
            {activeTab === 'REVIEWS (0)' && (
              <div className="py-10 text-center border-2 border-dashed border-slate-100 rounded-3xl">
                <Star className="mx-auto text-slate-200 mb-4" size={32} />
                <p>There are no reviews yet.</p>
              </div>
            )}
            {activeTab === 'ADDITIONAL INFORMATION' && (
              <div className="grid grid-cols-2 gap-y-6 text-sm max-w-md bg-slate-50 p-8 rounded-2xl border border-slate-100">
                <div className="font-bold text-slate-900 uppercase tracking-widest text-[10px]">Material</div>
                <div className="text-slate-600">{product.additionalInfo?.material || 'Contact for details'}</div>
                <div className="font-bold text-slate-900 uppercase tracking-widest text-[10px]">Compliance</div>
                <div className="text-slate-600">{product.additionalInfo?.compliance || 'AAMI Standard'}</div>
                <div className="font-bold text-slate-900 uppercase tracking-widest text-[10px]">Packaging</div>
                <div className="text-slate-600">{product.additionalInfo?.packaging || 'Standard Unit Pack'}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Size Chart Modal */}
      {isSizeModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded shadow-2xl w-full max-w-2xl overflow-hidden transform animate-in zoom-in duration-300">
             {/* Header */}
             <div className="flex items-center justify-between border-b px-6 py-4">
                <h3 className="text-lg font-medium text-slate-900">Size Specifications</h3>
                <button onClick={() => setIsSizeModalOpen(false)} className="text-slate-400 hover:text-slate-900 transition-colors p-1 border hover:bg-slate-50">
                   <X size={20} />
                </button>
             </div>

             {/* Content */}
             <div className="p-8">
                <div className="overflow-hidden border border-slate-200 rounded">
                   <table className="w-full text-center text-sm">
                      <thead className="bg-black text-white text-[10px] font-bold uppercase tracking-widest">
                         <tr>
                            <th className="px-4 py-4 border-r border-white/20">Label</th>
                            <th className="px-4 py-4 border-r border-white/20">Inches</th>
                            <th className="px-4 py-4">CM</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                         {product.sizeChart && product.sizeChart.length > 0 ? (
                            product.sizeChart.map((row, idx) => (
                               <tr key={idx} className={idx % 2 === 1 ? 'bg-slate-50' : 'bg-white'}>
                                  <td className="px-4 py-3 border-r border-slate-100 font-medium text-slate-600">{row.label}</td>
                                  <td className="px-4 py-3 border-r border-slate-100 text-slate-500">{row.inches}</td>
                                  <td className="px-4 py-3 text-slate-500">{row.cm}</td>
                               </tr>
                            ))
                         ) : (
                            <tr>
                               <td colSpan={3} className="py-12 text-slate-400 italic">No size specifications provided for this product.</td>
                            </tr>
                         )}
                      </tbody>
                   </table>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
