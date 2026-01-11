
import React, { useState, useRef, useMemo } from 'react';
import { 
  Plus, Trash, Edit, Save, X, Tags, Upload, 
  Search, Settings, Ruler, RotateCcw, Package, 
  Filter, AlertCircle, ChevronRight, CheckCircle2,
  FileText, Shield, Info, Layers, ListChecks,
  Image as ImageIcon, LogOut
} from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { Product, SizeChartEntry } from '../types';

interface AdminProps {
  products: Product[];
  categories: string[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onAddCategory: (category: string) => void;
  onDeleteCategory: (category: string) => void;
  onDeleteProduct: (id: string) => void;
  onResetData: () => void;
  onLogout?: () => void;
}

const Admin: React.FC<AdminProps> = ({ 
  products, 
  categories, 
  onAddProduct, 
  onUpdateProduct,
  onAddCategory, 
  onDeleteCategory,
  onDeleteProduct,
  onResetData,
  onLogout
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isManagingCategories, setIsManagingCategories] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [adminSearchTerm, setAdminSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  
  const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1581594549595-35e6edca9063?auto=format&fit=crop&q=80&w=800';

  const [formProduct, setFormProduct] = useState<Partial<Product>>({
    name: '',
    category: categories[0] || '',
    description: '',
    image: DEFAULT_IMAGE,
    extraImages: [],
    features: ['Professional Grade'],
    sizeChart: [],
    additionalInfo: { material: '', compliance: '', packaging: '' }
  });

  const categoryStats = useMemo(() => {
    const stats: Record<string, number> = {};
    products.forEach(p => {
      stats[p.category] = (stats[p.category] || 0) + 1;
    });
    return stats;
  }, [products]);

  const filteredAdminProducts = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(adminSearchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(adminSearchTerm.toLowerCase())
    );
  }, [products, adminSearchTerm]);

  const showFeedback = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const resetForm = () => {
    setFormProduct({
      name: '',
      category: categories[0] || '',
      description: '',
      image: DEFAULT_IMAGE,
      extraImages: [],
      features: ['Professional Grade'],
      sizeChart: [],
      additionalInfo: { material: '', compliance: '', packaging: '' }
    });
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formProduct.name || !formProduct.category) {
      alert("Product name and category are required.");
      return;
    }

    const productData = { 
      ...formProduct,
      id: editingId || Date.now().toString() 
    } as Product;
    
    if (editingId) {
      onUpdateProduct(productData);
      showFeedback('Entry updated successfully');
      setEditingId(null);
    } else {
      onAddProduct(productData);
      showFeedback('New product registered');
    }
    
    setIsAdding(false);
    resetForm();
  };

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setFormProduct({
      ...product,
      sizeChart: product.sizeChart || [],
      features: product.features || [],
      extraImages: product.extraImages || [],
      additionalInfo: product.additionalInfo || { material: '', compliance: '', packaging: '' }
    });
    setIsAdding(true);
    setIsManagingCategories(false);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  };

  const cancelAction = () => {
    setIsAdding(false);
    setEditingId(null);
    resetForm();
  };

  // Gallery Management
  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    const files = Array.from(fileList) as File[];
    files.forEach((file: File) => {
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
    setFormProduct(prev => ({
      ...prev,
      extraImages: (prev.extraImages || []).filter((_, i) => i !== index)
    }));
  };

  // Feature Management
  const addFeature = () => {
    setFormProduct(prev => ({
      ...prev,
      features: [...(prev.features || []), '']
    }));
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...(formProduct.features || [])];
    newFeatures[index] = value;
    setFormProduct(prev => ({ ...prev, features: newFeatures }));
  };

  const removeFeature = (index: number) => {
    setFormProduct(prev => ({
      ...prev,
      features: (prev.features || []).filter((_, i) => i !== index)
    }));
  };

  // Size Chart Management
  const addSizeRow = () => {
    setFormProduct(prev => ({
      ...prev,
      sizeChart: [...(prev.sizeChart || []), { label: '', inches: '', cm: '' }]
    }));
  };

  const updateSizeRow = (index: number, field: keyof SizeChartEntry, value: string) => {
    const currentChart = [...(formProduct.sizeChart || [])];
    currentChart[index] = { ...currentChart[index], [field]: value };
    setFormProduct({ ...formProduct, sizeChart: currentChart });
  };

  const removeSizeRow = (index: number) => {
    setFormProduct(prev => ({
      ...prev,
      sizeChart: (prev.sizeChart || []).filter((_, i) => i !== index)
    }));
  };

  const loadSizeTemplate = () => {
    setFormProduct(prev => ({
      ...prev,
      sizeChart: [
        { label: 'S', inches: '36-38', cm: '91-96' },
        { label: 'M', inches: '38-40', cm: '96-101' },
        { label: 'L', inches: '40-42', cm: '101-106' },
        { label: 'XL', inches: '42-44', cm: '106-111' },
      ]
    }));
  };

  const confirmDeleteProduct = (id: string, name: string) => {
    if (window.confirm(`Permanently remove "${name}" from the catalog? This action cannot be undone.`)) {
      onDeleteProduct(id);
      showFeedback('Entry deleted');
      if (editingId === id) cancelAction();
    }
  };

  const confirmDeleteCategory = (category: string) => {
    const count = categoryStats[category] || 0;
    if (window.confirm(`Delete category "${category}"? ${count} items will be re-assigned to the first available category.`)) {
      onDeleteCategory(category);
      showFeedback('Category removed');
    }
  };

  const inputClasses = "w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-red-500 bg-slate-50 text-slate-900 font-medium transition-all placeholder:text-slate-300 disabled:opacity-50";
  const labelClasses = "block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-[0.2em]";

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-12 gap-6">
          <SectionTitle 
            title="Registry Control Center" 
            subtitle="Manage your clinical-grade inventory and organizational classifications." 
          />
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={onResetData} 
              className="flex items-center gap-2 bg-white text-slate-500 px-5 py-2.5 rounded-xl font-bold hover:bg-slate-100 transition-all shadow-sm border border-slate-200"
            >
              <RotateCcw size={18} />
              Reset
            </button>
            <button 
              onClick={() => { setIsManagingCategories(!isManagingCategories); setIsAdding(false); }} 
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm ${isManagingCategories ? 'bg-slate-800 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
            >
              <Tags size={18} />
              Categories
            </button>
            <button 
              onClick={() => {
                if (isAdding && !editingId) {
                  cancelAction();
                } else {
                  resetForm();
                  setEditingId(null);
                  setIsAdding(true);
                  setIsManagingCategories(false);
                }
              }} 
              className="flex items-center gap-2 bg-red-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-red-700 transition-all shadow-md"
            >
              {isAdding && !editingId ? <X size={18} /> : <Plus size={18} />}
              {isAdding && !editingId ? 'Discard' : 'New Entry'}
            </button>
            {onLogout && (
              <button 
                onClick={onLogout}
                className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-md"
              >
                <LogOut size={18} />
                Logout
              </button>
            )}
          </div>
        </div>

        {/* Feedback Alert */}
        {successMessage && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
            <CheckCircle2 className="text-red-500" size={24} />
            <span className="font-extrabold tracking-tight">{successMessage}</span>
          </div>
        )}

        {/* Categories Manager */}
        {isManagingCategories && (
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-xl mb-12 animate-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-2xl font-black flex items-center gap-3 text-slate-900">
                 <Filter className="text-red-600" size={28} /> Classification Tree
               </h3>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); if (newCategoryName.trim()) { onAddCategory(newCategoryName.trim()); setNewCategoryName(''); showFeedback('Category added'); } }} className="flex gap-4 mb-10">
              <input required className={inputClasses} placeholder="Define new classification..." value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} />
              <button type="submit" className="bg-red-600 text-white font-black px-10 py-3 rounded-xl hover:bg-red-700 transition-all shadow-md whitespace-nowrap">ADD CLASS</button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((cat) => (
                <div key={cat} className="flex items-center justify-between bg-slate-50 border border-slate-200 p-6 rounded-[1.5rem] group hover:border-red-500 transition-all">
                  <div className="flex flex-col">
                    <span className="font-black text-slate-900 uppercase text-[10px] tracking-widest">{cat}</span>
                    <span className="text-[10px] text-slate-400 font-bold">{categoryStats[cat] || 0} Registered Units</span>
                  </div>
                  <button type="button" onClick={() => confirmDeleteCategory(cat)} className="text-slate-300 hover:text-red-600 transition-colors p-2 bg-white rounded-xl border border-slate-100 shadow-sm">
                    <Trash size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Master Form */}
        {isAdding && (
          <div ref={formRef} className="bg-white rounded-[3rem] border border-slate-200 shadow-2xl mb-12 animate-in slide-in-from-top-6 duration-500 overflow-hidden">
            <div className="px-10 py-8 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-600 rounded-2xl">
                  {editingId ? <Settings size={28} /> : <Plus size={28} />}
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight">{editingId ? 'MODIFICATION MODE' : 'NEW REGISTRATION'}</h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                    Registry Operation ID: {editingId || 'New'}
                  </p>
                </div>
              </div>
              <button onClick={cancelAction} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400"><X size={32} /></button>
            </div>

            <form onSubmit={handleProductSubmit} className="p-10 space-y-16">
              {/* Section 1: Basic Identity & Images */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText size={20} className="text-red-600" />
                    <h4 className="font-black text-sm uppercase tracking-widest">Base Identity</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className={labelClasses}>Garment Name</label>
                      <input required className={inputClasses} value={formProduct.name} onChange={e => setFormProduct({...formProduct, name: e.target.value})} placeholder="e.g. Sterile Isolation Gown" />
                    </div>
                    <div>
                      <label className={labelClasses}>Category Selection</label>
                      <div className="relative">
                        <select required className={inputClasses + " appearance-none cursor-pointer pr-10"} value={formProduct.category} onChange={e => setFormProduct({...formProduct, category: e.target.value})}>
                          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                          {categories.length === 0 && <option value="">Uncategorized</option>}
                        </select>
                        <ChevronRight size={18} className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className={labelClasses}>Master Description</label>
                    <textarea rows={5} className={inputClasses} value={formProduct.description} onChange={e => setFormProduct({...formProduct, description: e.target.value})} placeholder="Describe technical purpose and barrier level..." />
                  </div>
                </div>

                <div className="space-y-6">
                   <label className={labelClasses}>Master Photo</label>
                   <div onClick={() => fileInputRef.current?.click()} className="group relative cursor-pointer border-2 border-dashed border-slate-200 rounded-[2rem] p-6 hover:border-red-500 hover:bg-red-50/30 transition-all flex flex-col items-center justify-center min-h-[300px] bg-slate-50 overflow-hidden">
                      {formProduct.image && formProduct.image !== DEFAULT_IMAGE ? (
                        <div className="absolute inset-0">
                          <img src={formProduct.image} alt="Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Upload className="text-white" size={48} />
                          </div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload className="mx-auto mb-4 text-slate-300" size={48} />
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tap to Upload</p>
                        </div>
                      )}
                      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => { const file = e.target.files?.[0]; if (file) { const reader = new FileReader(); reader.onloadend = () => setFormProduct({ ...formProduct, image: reader.result as string }); reader.readAsDataURL(file); } }} />
                   </div>
                </div>
              </div>

              {/* Section 2: Product Gallery */}
              <div className="space-y-8">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ImageIcon size={20} className="text-red-600" />
                      <h4 className="font-black text-sm uppercase tracking-widest">Product Gallery</h4>
                    </div>
                    <button type="button" onClick={() => galleryInputRef.current?.click()} className="text-[10px] font-black text-red-600 flex items-center gap-2 hover:bg-red-50 px-4 py-2 rounded-xl border border-red-200 uppercase tracking-widest transition-all">
                       <Plus size={14} /> Add Extra Photos
                    </button>
                    <input type="file" multiple ref={galleryInputRef} className="hidden" accept="image/*" onChange={handleGalleryUpload} />
                 </div>
                 <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
                    {(formProduct.extraImages || []).map((img, idx) => (
                       <div key={idx} className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 group">
                          <img src={img} className="w-full h-full object-cover" alt={`Gallery ${idx}`} />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <button type="button" onClick={() => removeGalleryImage(idx)} className="p-2 bg-red-600 text-white rounded-full shadow-lg hover:scale-110 transition-transform">
                                <Trash size={16} />
                             </button>
                          </div>
                       </div>
                    ))}
                    {(formProduct.extraImages || []).length === 0 && (
                       <div className="col-span-full py-12 text-center bg-slate-50 border border-dashed border-slate-200 rounded-[2rem] text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                          No additional views registered.
                       </div>
                    )}
                 </div>
              </div>

              {/* Section 3: Technical Specifications */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                 <div className="space-y-8">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                         <ListChecks size={20} className="text-red-600" />
                         <h4 className="font-black text-sm uppercase tracking-widest">Performance Attributes</h4>
                       </div>
                       <button type="button" onClick={addFeature} className="text-[10px] font-black text-red-600 flex items-center gap-2 hover:bg-red-50 px-3 py-1.5 rounded-lg border border-red-200 uppercase tracking-widest transition-all">+ Add Feature</button>
                    </div>
                    <div className="space-y-4">
                       {(formProduct.features || []).map((feat, idx) => (
                          <div key={idx} className="flex gap-3">
                             <input className={inputClasses} value={feat} onChange={e => updateFeature(idx, e.target.value)} placeholder={`Attribute ${idx + 1}`} />
                             <button type="button" onClick={() => removeFeature(idx)} className="p-3 bg-white text-slate-300 hover:text-red-600 rounded-xl border border-slate-100"><Trash size={18} /></button>
                          </div>
                       ))}
                    </div>
                 </div>

                 <div className="space-y-8">
                    <div className="flex items-center gap-3">
                      <Shield size={20} className="text-red-600" />
                      <h4 className="font-black text-sm uppercase tracking-widest">Advanced Metadata</h4>
                    </div>
                    <div className="space-y-6">
                       <div>
                          <label className={labelClasses}>Material Composition</label>
                          <input className={inputClasses} value={formProduct.additionalInfo?.material} onChange={e => setFormProduct({...formProduct, additionalInfo: { ...formProduct.additionalInfo!, material: e.target.value }})} placeholder="e.g. SMS / Polypropylene" />
                       </div>
                       <div className="grid grid-cols-2 gap-6">
                          <div>
                             <label className={labelClasses}>Compliance Rating</label>
                             <input className={inputClasses} value={formProduct.additionalInfo?.compliance} onChange={e => setFormProduct({...formProduct, additionalInfo: { ...formProduct.additionalInfo!, compliance: e.target.value }})} placeholder="e.g. AAMI Level 3" />
                          </div>
                          <div>
                             <label className={labelClasses}>Packaging Unit</label>
                             <input className={inputClasses} value={formProduct.additionalInfo?.packaging} onChange={e => setFormProduct({...formProduct, additionalInfo: { ...formProduct.additionalInfo!, packaging: e.target.value }})} placeholder="e.g. 50 Units/Box" />
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Section 4: Size Matrix */}
              <div className="space-y-8">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Ruler size={20} className="text-red-600" />
                      <h4 className="font-black text-sm uppercase tracking-widest">Dimensional Matrix</h4>
                    </div>
                    <button type="button" onClick={loadSizeTemplate} className="text-[10px] font-black text-slate-400 hover:text-red-600 border border-slate-200 px-4 py-2 rounded-xl uppercase tracking-widest transition-all">Apply Standard Template</button>
                 </div>
                 <div className="overflow-hidden border border-slate-200 rounded-[2rem] bg-slate-50">
                    <table className="w-full text-left text-xs">
                       <thead className="bg-slate-100 text-slate-400 uppercase tracking-widest font-black">
                          <tr>
                             <th className="px-8 py-5">Classification</th>
                             <th className="px-8 py-5">Imperial (In)</th>
                             <th className="px-8 py-5">Metric (Cm)</th>
                             <th className="px-8 py-5 text-right">Kill</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-200 bg-white">
                          {(formProduct.sizeChart || []).map((row, index) => (
                             <tr key={index} className="group hover:bg-slate-50/50">
                                <td className="px-8 py-4"><input value={row.label} onChange={e => updateSizeRow(index, 'label', e.target.value)} className="w-full bg-slate-50 rounded-xl p-3 outline-red-500 font-black text-slate-900" placeholder="Size" /></td>
                                <td className="px-8 py-4"><input value={row.inches} onChange={e => updateSizeRow(index, 'inches', e.target.value)} className="w-full bg-slate-50 rounded-xl p-3 outline-red-500" placeholder="00-00" /></td>
                                <td className="px-8 py-4"><input value={row.cm} onChange={e => updateSizeRow(index, 'cm', e.target.value)} className="w-full bg-slate-50 rounded-xl p-3 outline-red-500" placeholder="00-00" /></td>
                                <td className="px-8 py-4 text-right">
                                   <button type="button" onClick={() => removeSizeRow(index)} className="text-slate-200 hover:text-red-600 transition-colors p-3 bg-white rounded-xl border border-slate-100 shadow-sm"><Trash size={18} /></button>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                    <button type="button" onClick={addSizeRow} className="w-full py-6 text-[10px] font-black text-red-600 bg-slate-50 hover:bg-slate-100 uppercase tracking-[0.3em] transition-colors flex items-center justify-center gap-2">
                       <Plus size={14} /> NEW SIZE VARIANT
                    </button>
                 </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 pt-12 border-t border-slate-100">
                <button type="submit" className="flex-grow bg-red-600 text-white font-black py-6 rounded-[1.5rem] shadow-2xl hover:bg-red-700 transition-all flex items-center justify-center gap-4 text-xl tracking-tighter">
                  <Save size={28} /> {editingId ? 'COMMIT MODIFICATIONS' : 'AUTHORIZE REGISTRATION'}
                </button>
                <button type="button" onClick={cancelAction} className="bg-white text-slate-400 border border-slate-200 font-black px-16 rounded-[1.5rem] hover:bg-slate-50 hover:text-slate-900 transition-all uppercase tracking-[0.2em] text-sm">
                  Discard
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Dashboard Inventory */}
        <div className="bg-white rounded-[3rem] border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-10 border-b border-slate-100 flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-slate-900 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl">
                <Package size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Active Master Registry</h3>
                <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">{products.length} Items Validated</p>
              </div>
            </div>
            <div className="relative w-full lg:w-[400px]">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
              <input 
                type="text" 
                placeholder="Find garment record..." 
                className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-lg font-medium focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:bg-white transition-all placeholder:text-slate-300"
                value={adminSearchTerm}
                onChange={e => setAdminSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Garment Identity</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Classification</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Gallery</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Registry Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAdminProducts.map(p => (
                  <tr key={p.id} className={`transition-all group ${editingId === p.id ? 'bg-red-50/30' : 'hover:bg-slate-50/30'}`}>
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-[1.25rem] bg-white overflow-hidden flex-shrink-0 border border-slate-100 shadow-md transition-transform group-hover:scale-105">
                          <img src={p.image} className="w-full h-full object-cover" alt="" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-black text-slate-900 text-lg leading-tight">{p.name}</span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">UUID: {p.id.slice(-8)}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <span className="inline-flex items-center px-5 py-2 bg-white text-slate-600 text-[10px] font-black uppercase rounded-full tracking-widest border border-slate-200 shadow-sm group-hover:border-red-200 group-hover:text-red-600 transition-all">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-10 py-6">
                       <div className="flex items-center gap-1.5">
                          {[p.image, ...(p.extraImages || [])].slice(0, 3).map((img, i) => (
                             <div key={i} className="w-6 h-8 rounded bg-slate-100 border border-slate-200 overflow-hidden">
                                <img src={img} className="w-full h-full object-cover" alt="" />
                             </div>
                          ))}
                       </div>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <div className="flex justify-end gap-3">
                        <button 
                          onClick={() => startEdit(p)} 
                          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs transition-all ${editingId === p.id ? 'bg-red-600 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-100 shadow-sm hover:bg-slate-900 hover:text-white'}`}
                        >
                          <Edit size={16} />
                          <span className="hidden sm:inline uppercase">Modify</span>
                        </button>
                        <button 
                          onClick={() => confirmDeleteProduct(p.id, p.name)} 
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs bg-white text-slate-400 border border-slate-100 shadow-sm hover:bg-red-600 hover:text-white transition-all"
                        >
                          <Trash size={16} />
                          <span className="hidden sm:inline uppercase">Kill</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
