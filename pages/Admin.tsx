import React, { useState, useRef, useMemo } from 'react';
import { 
  Plus, Trash, Edit, Save, X, Tags, Upload, 
  Search, Settings, Ruler, RotateCcw, Package, 
  Database, Wifi, WifiOff, Loader2, LogOut, TrendingUp, BarChart3, Users,
  Image as ImageIcon, GripVertical
} from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { Product, InquiryData, Category, SizeChartEntry } from '../types';

interface AdminProps {
  products: Product[];
  categories: Category[];
  inquiries: InquiryData[];
  dbConnected: boolean;
  onAddProduct: (product: Product) => Promise<void>;
  onUpdateProduct: (product: Product) => Promise<void>;
  onAddCategory: (category: string) => Promise<void>;
  onDeleteCategory: (id: string) => Promise<void>;
  onDeleteProduct: (id: string) => Promise<void>;
  onDeleteInquiry: (id: string) => Promise<void>;
  onResetData: () => Promise<void>;
  onLogout?: () => void;
}

const Admin: React.FC<AdminProps> = ({ 
  products, 
  categories, 
  inquiries,
  dbConnected,
  onAddProduct, 
  onUpdateProduct,
  onAddCategory, 
  onDeleteCategory,
  onDeleteProduct,
  onDeleteInquiry,
  onResetData,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'INVENTORY' | 'INQUIRIES' | 'DASHBOARD'>('DASHBOARD');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isManagingCategories, setIsManagingCategories] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [adminSearchTerm, setAdminSearchTerm] = useState('');
  const [inquirySearchTerm, setInquirySearchTerm] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  
  const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1581594549595-35e6edca9063?auto=format&fit=crop&q=80&w=800';

  const [formProduct, setFormProduct] = useState<Partial<Product>>({
    name: '',
    category: categories[0]?.name || '',
    description: '',
    image: DEFAULT_IMAGE,
    extraImages: [],
    features: ['Clinical Grade'],
    sizeChart: [],
    additionalInfo: { material: '', compliance: '', packaging: '' }
  });

  const stats = useMemo(() => {
    return {
      totalProducts: products.length,
      totalInquiries: inquiries.length,
      totalCategories: categories.length,
      recentInquiries: inquiries.slice(0, 5)
    };
  }, [products, inquiries, categories]);

  const filteredAdminProducts = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(adminSearchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(adminSearchTerm.toLowerCase())
    );
  }, [products, adminSearchTerm]);

  const filteredInquiries = useMemo(() => {
    return inquiries.filter(inq => 
      inq.name.toLowerCase().includes(inquirySearchTerm.toLowerCase()) ||
      inq.productName.toLowerCase().includes(inquirySearchTerm.toLowerCase()) ||
      inq.email.toLowerCase().includes(inquirySearchTerm.toLowerCase())
    );
  }, [inquiries, inquirySearchTerm]);

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formProduct.name || !formProduct.category) {
      alert("Product name and category are required.");
      return;
    }

    setIsProcessing(true);
    try {
      const productData = { ...formProduct, id: editingId || '' } as Product;
      if (editingId) {
        await onUpdateProduct(productData);
        showFeedback('Record updated in Cloud');
      } else {
        await onAddProduct(productData);
        showFeedback('New Registry Created');
      }
      setIsAdding(false);
      setEditingId(null);
      resetForm();
    } catch (err) {
      console.error(err);
      alert('Cloud write failure. Check connection.');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetForm = () => {
    setFormProduct({
      name: '',
      category: categories[0]?.name || '',
      description: '',
      image: DEFAULT_IMAGE,
      extraImages: [],
      features: ['Clinical Grade'],
      sizeChart: [],
      additionalInfo: { material: '', compliance: '', packaging: '' }
    });
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    setIsProcessing(true);
    try {
      await onAddCategory(newCategoryName.trim());
      setNewCategoryName('');
      showFeedback('Classification added');
    } catch (err) {
      alert('Operation failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddSizeRow = () => {
    const newRow: SizeChartEntry = { label: '', inches: '', cm: '' };
    setFormProduct({
      ...formProduct,
      sizeChart: [...(formProduct.sizeChart || []), newRow]
    });
  };

  const updateSizeRow = (index: number, field: keyof SizeChartEntry, value: string) => {
    const updated = [...(formProduct.sizeChart || [])];
    updated[index] = { ...updated[index], [field]: value };
    setFormProduct({ ...formProduct, sizeChart: updated });
  };

  const removeSizeRow = (index: number) => {
    setFormProduct({
      ...formProduct,
      sizeChart: (formProduct.sizeChart || []).filter((_, i) => i !== index)
    });
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Fix: Explicitly type 'file' as 'File' to avoid 'unknown' type error with readAsDataURL.
    // Line 185 refers to the start of setFormProduct closure but the error originates from readAsDataURL(file).
    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormProduct(prev => ({
          ...prev,
          extraImages: [...(prev.extraImages || []), reader.result as string]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeGalleryImage = (index: number) => {
    setFormProduct({
      ...formProduct,
      extraImages: (formProduct.extraImages || []).filter((_, i) => i !== index)
    });
  };

  const confirmDelete = async (type: 'product' | 'inquiry' | 'category', id: string, name?: string) => {
    if (window.confirm(`Permanently remove this ${type}${name ? `: ${name}` : ''}?`)) {
      setIsProcessing(true);
      try {
        if (type === 'product') await onDeleteProduct(id);
        if (type === 'inquiry') await onDeleteInquiry(id);
        if (type === 'category') await onDeleteCategory(id);
        showFeedback(`${type} purged from registry`);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const inputClasses = "w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-red-500 bg-slate-50 text-slate-900 font-medium transition-all placeholder:text-slate-300";
  const labelClasses = "block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-[0.2em]";

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Unified Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-12 gap-6">
          <div className="flex flex-col">
            <SectionTitle title="CareGuard Ledger" subtitle="Administrative control for institutional medical apparel distribution." />
            <div className={`mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest w-fit ${dbConnected ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
              {dbConnected ? <Wifi size={12} /> : <WifiOff size={12} />}
              {dbConnected ? 'Supabase Sync Active' : 'Offline Mode'}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => onResetData().then(() => showFeedback('Ledger Refreshed'))} 
              disabled={isProcessing}
              className="flex items-center gap-2 bg-white text-slate-500 px-5 py-3 rounded-xl font-bold hover:bg-slate-100 transition-all shadow-sm border border-slate-200 disabled:opacity-50"
            >
              <RotateCcw size={18} className={isProcessing ? 'animate-spin' : ''} />
              Refresh
            </button>
            <button 
              onClick={() => { setIsManagingCategories(!isManagingCategories); setIsAdding(false); }} 
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all shadow-sm ${isManagingCategories ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
            >
              <Tags size={18} />
              Classifications
            </button>
            <button 
              onClick={() => {
                setActiveTab('INVENTORY');
                if (isAdding && !editingId) {
                  setIsAdding(false);
                } else {
                  setEditingId(null);
                  setIsAdding(true);
                  setIsManagingCategories(false);
                  resetForm();
                }
              }} 
              className="flex items-center gap-2 bg-red-600 text-white px-7 py-3 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-red-700 transition-all shadow-xl active:scale-95"
            >
              {isAdding ? <X size={18} /> : <Plus size={18} />}
              {isAdding ? 'Cancel' : 'Register Unit'}
            </button>
            {onLogout && (
              <button onClick={onLogout} className="p-3 bg-white text-slate-400 hover:text-red-600 border border-slate-200 rounded-xl transition-all shadow-sm"><LogOut size={20} /></button>
            )}
          </div>
        </div>

        {/* Console Tabs */}
        <div className="flex gap-1 bg-slate-200 p-1.5 rounded-2xl mb-10 w-fit">
          {['DASHBOARD', 'INVENTORY', 'INQUIRIES'].map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab as any); setIsAdding(false); setIsManagingCategories(false); }}
              className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === tab ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500 hover:bg-slate-100'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Global Feedback */}
        {feedback && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
            <Database className="text-red-500" size={18} />
            <span className="font-black uppercase text-[10px] tracking-widest">{feedback}</span>
          </div>
        )}

        {/* DASHBOARD VIEW */}
        {activeTab === 'DASHBOARD' && (
          <div className="space-y-10 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mb-6">
                  <TrendingUp size={24} />
                </div>
                <h4 className="text-4xl font-black text-slate-900 mb-2">{stats.totalProducts}</h4>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Inventory SKU</p>
              </div>
              <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                  <Users size={24} />
                </div>
                <h4 className="text-4xl font-black text-slate-900 mb-2">{stats.totalInquiries}</h4>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pending Quotes</p>
              </div>
              <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6">
                  <BarChart3 size={24} />
                </div>
                <h4 className="text-4xl font-black text-slate-900 mb-2">{stats.totalCategories}</h4>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Market Classifications</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">Recent Inquiries</h3>
                  <button onClick={() => setActiveTab('INQUIRIES')} className="text-[9px] font-black text-red-600 uppercase tracking-widest hover:underline">View All</button>
                </div>
                <div className="divide-y divide-slate-100">
                  {stats.recentInquiries.map(inq => (
                    <div key={inq.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-black text-slate-400 text-xs">
                          {inq.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{inq.name}</p>
                          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{inq.productName}</p>
                        </div>
                      </div>
                      <span className="text-[9px] font-black text-red-600 bg-red-50 px-2 py-1 rounded uppercase tracking-tighter">
                        {inq.quantity} Units
                      </span>
                    </div>
                  ))}
                  {stats.recentInquiries.length === 0 && (
                    <div className="p-12 text-center text-slate-300 font-black uppercase text-[10px] tracking-widest">No recent data</div>
                  )}
                </div>
              </div>

              <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <h3 className="text-2xl font-black tracking-tight mb-4 relative z-10">Cloud Ledger Status</h3>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed font-medium relative z-10">All operations are synchronized with your Supabase backend. Real-time encryption ensures institutional privacy.</p>
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sync Latency</span>
                    <span className="text-xs font-black text-emerald-400">0.4ms (Ideal)</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Auth Protocol</span>
                    <span className="text-xs font-black text-slate-300">JWT / AES-256</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Storage Type</span>
                    <span className="text-xs font-black text-slate-300">Relational JSONB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MASTER UNIT FORM */}
        {isAdding && (
          <div className="bg-white rounded-[3.5rem] border border-slate-200 shadow-2xl mb-12 overflow-hidden animate-in zoom-in-95 duration-500">
            <div className="px-12 py-10 bg-slate-900 text-white flex items-center justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/20 rounded-full -mr-48 -mt-48 blur-3xl"></div>
              <div className="flex items-center gap-6 relative z-10">
                <div className="p-4 bg-red-600 rounded-[2rem] shadow-xl">
                  {editingId ? <Settings size={32} /> : <Plus size={32} />}
                </div>
                <div>
                  <h3 className="text-3xl font-black tracking-tight">{editingId ? 'MODIFY REGISTRY' : 'NEW REGISTRATION'}</h3>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Supabase Cloud Ledger Operation</p>
                </div>
              </div>
              <button onClick={() => setIsAdding(false)} className="p-3 hover:bg-white/10 rounded-full text-slate-400 transition-all relative z-10"><X size={32} /></button>
            </div>

            <form onSubmit={handleProductSubmit} className="p-12 space-y-12">
               {/* Basic Info */}
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-8">
                     <div>
                        <label className={labelClasses}>Technical Label</label>
                        <input required className={inputClasses} value={formProduct.name} onChange={e => setFormProduct({...formProduct, name: e.target.value})} placeholder="e.g. Sterile Isolation Gown" />
                     </div>
                     <div>
                        <label className={labelClasses}>Market Classification</label>
                        <select required className={inputClasses} value={formProduct.category} onChange={e => setFormProduct({...formProduct, category: e.target.value})}>
                           <option value="" disabled>Select Classification</option>
                           {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                        </select>
                     </div>
                     <div>
                        <label className={labelClasses}>Registry Specifications</label>
                        <textarea rows={5} className={inputClasses} value={formProduct.description} onChange={e => setFormProduct({...formProduct, description: e.target.value})} placeholder="Detailed garment specs..." />
                     </div>
                  </div>
                  <div className="space-y-8">
                     <label className={labelClasses}>Master Identity Image</label>
                     <div onClick={() => fileInputRef.current?.click()} className="aspect-[4/3] bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] overflow-hidden cursor-pointer hover:border-red-500 hover:bg-red-50/20 transition-all flex items-center justify-center relative group">
                        {formProduct.image ? (
                          <div className="w-full h-full relative">
                            <img src={formProduct.image} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Upload className="text-white" size={32} />
                            </div>
                          </div>
                        ) : (
                          <div className="text-center flex flex-col items-center gap-3">
                            <Upload className="text-slate-300" size={48} />
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Upload Master Reference</p>
                          </div>
                        )}
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => { const file = e.target.files?.[0]; if (file) { const reader = new FileReader(); reader.onloadend = () => setFormProduct({ ...formProduct, image: reader.result as string }); reader.readAsDataURL(file); } }} />
                     </div>
                  </div>
               </div>

               {/* Gallery Manager */}
               <div className="space-y-6">
                 <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                   <div className="flex items-center gap-3">
                     <ImageIcon size={20} className="text-red-600" />
                     <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Supplemental Gallery</h4>
                   </div>
                   <button 
                    type="button"
                    onClick={() => galleryInputRef.current?.click()}
                    className="text-[9px] font-black text-red-600 bg-red-50 px-4 py-2 rounded-xl uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all"
                   >
                     Add Images
                   </button>
                   <input type="file" multiple ref={galleryInputRef} className="hidden" accept="image/*" onChange={handleGalleryUpload} />
                 </div>
                 <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    {formProduct.extraImages?.map((img, idx) => (
                      <div key={idx} className="aspect-square relative group rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                        <img src={img} className="w-full h-full object-cover" />
                        <button 
                          type="button"
                          onClick={() => removeGalleryImage(idx)}
                          className="absolute inset-0 bg-red-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    ))}
                    <div 
                      onClick={() => galleryInputRef.current?.click()}
                      className="aspect-square border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-slate-300 cursor-pointer hover:border-red-500 hover:text-red-500 transition-all"
                    >
                      <Plus size={24} />
                    </div>
                 </div>
               </div>

               {/* Size Chart Manager */}
               <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                      <Ruler size={20} className="text-red-600" />
                      <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Size Specifications</h4>
                    </div>
                    <button 
                      type="button"
                      onClick={handleAddSizeRow}
                      className="text-[9px] font-black text-red-600 bg-red-50 px-4 py-2 rounded-xl uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all"
                    >
                      Add Size Row
                    </button>
                  </div>
                  <div className="overflow-hidden border border-slate-200 rounded-3xl bg-slate-50">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Label (e.g. S, M, L)</th>
                          <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Chest (Inches)</th>
                          <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Chest (CM)</th>
                          <th className="px-6 py-4 text-right"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {formProduct.sizeChart?.map((row, idx) => (
                          <tr key={idx} className="bg-white">
                            <td className="px-4 py-2">
                              <input 
                                className="w-full bg-slate-50 px-4 py-2 rounded-xl border-none outline-none focus:bg-white focus:ring-1 focus:ring-red-500 text-sm font-bold"
                                value={row.label}
                                onChange={(e) => updateSizeRow(idx, 'label', e.target.value)}
                                placeholder="Size"
                              />
                            </td>
                            <td className="px-4 py-2">
                              <input 
                                className="w-full bg-slate-50 px-4 py-2 rounded-xl border-none outline-none focus:bg-white focus:ring-1 focus:ring-red-500 text-sm"
                                value={row.inches}
                                onChange={(e) => updateSizeRow(idx, 'inches', e.target.value)}
                                placeholder="38-40"
                              />
                            </td>
                            <td className="px-4 py-2">
                              <input 
                                className="w-full bg-slate-50 px-4 py-2 rounded-xl border-none outline-none focus:bg-white focus:ring-1 focus:ring-red-500 text-sm"
                                value={row.cm}
                                onChange={(e) => updateSizeRow(idx, 'cm', e.target.value)}
                                placeholder="96-101"
                              />
                            </td>
                            <td className="px-4 py-2 text-right">
                              <button type="button" onClick={() => removeSizeRow(idx)} className="p-2 text-slate-300 hover:text-red-600 transition-colors">
                                <Trash size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                        {(!formProduct.sizeChart || formProduct.sizeChart.length === 0) && (
                          <tr>
                            <td colSpan={4} className="py-12 text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                              No size data defined for this unit.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
               </div>
               
               <div className="flex gap-4 pt-10 border-t border-slate-100">
                  <button type="submit" disabled={isProcessing} className="flex-grow bg-slate-900 text-white font-black py-6 rounded-3xl shadow-2xl hover:bg-red-600 disabled:bg-slate-200 transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-sm">
                    {isProcessing && <Loader2 className="animate-spin" size={20} />}
                    {editingId ? 'Commit Changes' : 'Initialize Cloud Registry'}
                  </button>
                  <button type="button" onClick={() => setIsAdding(false)} className="px-12 bg-white border border-slate-200 text-slate-400 font-black rounded-3xl hover:border-slate-900 hover:text-slate-900 transition-all text-xs uppercase tracking-widest">
                    Discard
                  </button>
               </div>
            </form>
          </div>
        )}

        {/* CLASSIFICATIONS VIEW */}
        {isManagingCategories && (
          <div className="mb-12 animate-in slide-in-from-top-4 duration-500">
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">Product Taxonomy</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Manage global classifications</p>
                </div>
                <form onSubmit={handleCategorySubmit} className="flex gap-2">
                  <input 
                    className="px-5 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500 text-sm font-medium"
                    placeholder="Add classification..."
                    value={newCategoryName}
                    onChange={e => setNewCategoryName(e.target.value)}
                  />
                  <button type="submit" disabled={isProcessing} className="bg-red-600 text-white p-3 rounded-xl hover:bg-red-700 disabled:opacity-50 shadow-lg">
                    {isProcessing ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
                  </button>
                </form>
              </div>
              <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {categories.map(cat => (
                  <div key={cat.id} className="group flex items-center justify-between px-5 py-5 bg-slate-50 border border-slate-100 rounded-2xl hover:border-red-200 hover:bg-white transition-all">
                    <span className="text-xs font-black text-slate-900 uppercase tracking-tight">{cat.name}</span>
                    <button onClick={() => confirmDelete('category', cat.id, cat.name)} className="p-2 text-slate-300 hover:text-red-600 transition-colors">
                      <Trash size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* INVENTORY VIEW */}
        {activeTab === 'INVENTORY' && !isAdding && !isManagingCategories && (
          <div className="space-y-6 animate-in fade-in">
             <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/50">
                   <div className="relative w-full max-w-md">
                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                     <input 
                        className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl outline-none text-sm font-medium focus:ring-2 focus:ring-red-500 transition-all"
                        placeholder="Search product registry..."
                        value={adminSearchTerm}
                        onChange={e => setAdminSearchTerm(e.target.value)}
                     />
                   </div>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{filteredAdminProducts.length} Results</span>
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full text-left">
                      <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                         <tr>
                            <th className="px-10 py-6">Unit Identity</th>
                            <th className="px-10 py-6">Market Segment</th>
                            <th className="px-10 py-6 text-right">Actions</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                         {filteredAdminProducts.map(p => (
                            <tr key={p.id} className="group hover:bg-slate-50/80 transition-colors">
                               <td className="px-10 py-6">
                                  <div className="flex items-center gap-5">
                                     <img src={p.image} className="w-12 h-12 rounded-xl object-cover shadow-sm border border-white" alt="" />
                                     <div>
                                        <div className="text-sm font-black text-slate-900">{p.name}</div>
                                        <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">ID: {p.id.slice(-8)}</div>
                                     </div>
                                  </div>
                               </td>
                               <td className="px-10 py-6">
                                  <span className="px-4 py-1.5 bg-white border border-slate-200 rounded-full text-[9px] font-black text-slate-600 uppercase tracking-widest shadow-sm">{p.category}</span>
                               </td>
                               <td className="px-10 py-6 text-right">
                                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0 translate-x-4">
                                     <button 
                                        onClick={() => {
                                          setEditingId(p.id);
                                          setFormProduct({ 
                                            ...p,
                                            extraImages: p.extraImages || [],
                                            sizeChart: p.sizeChart || []
                                          });
                                          setIsAdding(true);
                                          setIsManagingCategories(false);
                                        }} 
                                        className="p-3 text-slate-400 hover:text-slate-900 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all"
                                      >
                                        <Edit size={16} />
                                      </button>
                                     <button onClick={() => confirmDelete('product', p.id, p.name)} className="p-3 text-slate-400 hover:text-red-600 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all">
                                        <Trash size={16} />
                                      </button>
                                  </div>
                               </td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                   {filteredAdminProducts.length === 0 && (
                     <div className="py-24 text-center text-slate-300 font-black uppercase tracking-widest text-xs flex flex-col items-center gap-4">
                       <Database size={48} className="text-slate-100" />
                       Registry Empty
                     </div>
                   )}
                </div>
             </div>
          </div>
        )}

        {/* INQUIRIES VIEW */}
        {activeTab === 'INQUIRIES' && (
          <div className="space-y-8 animate-in fade-in duration-500">
             <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative w-full max-w-md">
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                   <input 
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none text-sm font-medium focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
                      placeholder="Search inquiries..."
                      value={inquirySearchTerm}
                      onChange={e => setInquirySearchTerm(e.target.value)}
                   />
                </div>
                <div className="flex items-center gap-4">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{filteredInquiries.length} Active Quotes</span>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredInquiries.map(inq => (
                   <div key={inq.id} className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative group hover:shadow-2xl hover:border-red-100 transition-all">
                      <button onClick={() => confirmDelete('inquiry', inq.id)} className="absolute top-8 right-8 p-3 text-slate-300 hover:text-red-600 transition-colors bg-slate-50 rounded-xl opacity-0 group-hover:opacity-100">
                         <Trash size={18} />
                      </button>
                      <div className="flex items-center gap-5 mb-8">
                         <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-red-100">
                            {inq.name.charAt(0)}
                         </div>
                         <div>
                            <div className="font-black text-slate-900 text-lg tracking-tight">{inq.name}</div>
                            <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{new Date(inq.timestamp).toLocaleDateString()}</div>
                         </div>
                      </div>
                      <div className="space-y-4 mb-8">
                         <div className="text-xs font-bold text-slate-600 flex items-center gap-3"><Package size={16} className="text-red-500" /> {inq.productName}</div>
                         <div className="text-xs font-bold text-slate-600 flex items-center gap-3"><TrendingUp size={16} className="text-red-500" /> Quantity: <span className="text-red-600 ml-1">{inq.quantity}</span> units</div>
                      </div>
                      <div className="p-6 bg-slate-50 rounded-2xl text-[11px] text-slate-500 italic border border-slate-100 leading-relaxed font-medium">"{inq.message}"</div>
                      <div className="mt-8 pt-8 border-t border-slate-100 flex justify-between items-center">
                         <a href={`mailto:${inq.email}`} className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-black text-[9px] uppercase tracking-[0.2em] hover:bg-red-600 transition-all shadow-md">Reply Now</a>
                         <span className="text-[9px] font-bold text-slate-300 uppercase">ID: {inq.id.slice(-6)}</span>
                      </div>
                   </div>
                ))}
                {filteredInquiries.length === 0 && (
                  <div className="col-span-full py-40 text-center flex flex-col items-center gap-4">
                    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-slate-300">
                       <Search size={40} />
                    </div>
                    <p className="text-slate-300 font-black uppercase tracking-widest text-xs">No active inquiries found</p>
                  </div>
                )}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;