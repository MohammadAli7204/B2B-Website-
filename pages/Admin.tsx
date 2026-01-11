
import React, { useState, useRef, useMemo } from 'react';
import { 
  Plus, Trash, Edit, Save, X, Tags, Upload, 
  Search, Settings, Ruler, RotateCcw, Package, 
  Filter, AlertCircle, ChevronRight, CheckCircle2,
  FileText, Shield, Info, Layers, ListChecks,
  ImageIcon, LogOut, FileDown, Calendar,
  MessageSquare, User as UserIcon, Calendar as CalendarIcon,
  Building, Database, Wifi, WifiOff
} from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { Product, SizeChartEntry, InquiryData } from '../types';

interface AdminProps {
  products: Product[];
  categories: string[];
  inquiries: InquiryData[];
  dbConnected: boolean;
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onAddCategory: (category: string) => void;
  onDeleteCategory: (category: string) => void;
  onDeleteProduct: (id: string) => void;
  onDeleteInquiry: (id: string) => void;
  onResetData: () => void;
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
  const [activeTab, setActiveTab] = useState<'INVENTORY' | 'INQUIRIES'>('INVENTORY');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isManagingCategories, setIsManagingCategories] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [adminSearchTerm, setAdminSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Inquiry Filtering State
  const [inquiryDateStart, setInquiryDateStart] = useState('');
  const [inquiryDateEnd, setInquiryDateEnd] = useState('');
  
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

  const filteredInquiries = useMemo(() => {
    return inquiries.filter(inq => {
      const date = new Date(inq.timestamp);
      const start = inquiryDateStart ? new Date(inquiryDateStart) : null;
      const end = inquiryDateEnd ? new Date(inquiryDateEnd) : null;
      
      if (start && date < start) return false;
      if (end) {
        const endOfSelectedDay = new Date(end);
        endOfSelectedDay.setHours(23, 59, 59, 999);
        if (date > endOfSelectedDay) return false;
      }
      return true;
    });
  }, [inquiries, inquiryDateStart, inquiryDateEnd]);

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
      id: editingId || '' 
    } as Product;
    
    if (editingId) {
      onUpdateProduct(productData);
      showFeedback('Supabase Ledger Updated');
      setEditingId(null);
    } else {
      onAddProduct(productData);
      showFeedback('New Registry Created in Supabase');
    }
    
    setIsAdding(false);
    resetForm();
  };

  const downloadCSV = () => {
    if (filteredInquiries.length === 0) {
      alert("No data found for the selected date range.");
      return;
    }

    const headers = ["Timestamp", "Product Name", "Requester Name", "Email", "Company", "Quantity", "Requirement", "Message"];
    const rows = filteredInquiries.map(inq => [
      new Date(inq.timestamp).toLocaleString(),
      inq.productName,
      inq.name,
      inq.email,
      inq.company,
      inq.quantity,
      inq.requirement,
      `"${inq.message.replace(/"/g, '""')}"`
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(r => r.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `CareGuard_Inquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showFeedback('Export Initialized');
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

  const addSizeRow = () => {
    setFormProduct(prev => ({
      ...prev,
      sizeChart: [...(prev.sizeChart || []), { label: '', inches: '', cm: '' }]
    }));
  };

  const updateSizeRow = (index: number, field: keyof SizeChartEntry, value: string) => {
    const currentChart = [...(formProduct.sizeChart || [])];
    currentChart[index] = { ...currentChart[index], [field]: value };
    setFormProduct(prev => ({ ...prev, sizeChart: currentChart }));
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
    if (window.confirm(`Permanently remove "${name}" from Supabase?`)) {
      onDeleteProduct(id);
      showFeedback('Registry Purged');
      if (editingId === id) cancelAction();
    }
  };

  const confirmDeleteCategory = (category: string) => {
    if (window.confirm(`Delete category "${category}" from Supabase?`)) {
      onDeleteCategory(category);
      showFeedback('Classification Removed');
    }
  };

  const inputClasses = "w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-red-500 bg-slate-50 text-slate-900 font-medium transition-all placeholder:text-slate-300 disabled:opacity-50";
  const labelClasses = "block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-[0.2em]";

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-12 gap-6">
          <div className="flex flex-col">
            <SectionTitle 
              title="Registry Control Center" 
              subtitle="Manage your clinical-grade inventory directly in your Supabase cloud database." 
            />
            <div className="flex items-center gap-3 mt-2">
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${dbConnected ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                {dbConnected ? <Wifi size={12} /> : <WifiOff size={12} />}
                {dbConnected ? 'Supabase Connected' : 'Cloud Offline'}
              </div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Table: careguard</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => { onResetData(); showFeedback('Ledger Synchronized'); }} 
              className="flex items-center gap-2 bg-white text-slate-500 px-5 py-2.5 rounded-xl font-bold hover:bg-slate-100 transition-all shadow-sm border border-slate-200"
              title="Refresh from Database"
            >
              <RotateCcw size={18} />
              Sync
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
                setActiveTab('INVENTORY');
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
              {isAdding && !editingId ? 'Discard' : 'New Product'}
            </button>
            {onLogout && (
              <button 
                onClick={onLogout}
                className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-md"
              >
                <LogOut size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 mb-8 overflow-x-auto">
           <button 
              onClick={() => { setActiveTab('INVENTORY'); setIsAdding(false); }}
              className={`px-8 py-4 text-sm font-black uppercase tracking-widest transition-all relative ${activeTab === 'INVENTORY' ? 'text-red-600' : 'text-slate-400 hover:text-slate-600'}`}
           >
             Inventory
             {activeTab === 'INVENTORY' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600 rounded-t-full"></div>}
           </button>
           <button 
              onClick={() => { setActiveTab('INQUIRIES'); setIsAdding(false); }}
              className={`px-8 py-4 text-sm font-black uppercase tracking-widest transition-all relative ${activeTab === 'INQUIRIES' ? 'text-red-600' : 'text-slate-400 hover:text-slate-600'}`}
           >
             Quote Inquiries
             {inquiries.length > 0 && <span className="ml-2 bg-slate-100 text-slate-400 text-[10px] px-2 py-1 rounded-full">{inquiries.length}</span>}
             {activeTab === 'INQUIRIES' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600 rounded-t-full"></div>}
           </button>
        </div>

        {/* Feedback Alert */}
        {successMessage && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
            <Database className="text-red-500" size={24} />
            <span className="font-extrabold tracking-tight uppercase text-xs tracking-[0.1em]">{successMessage}</span>
          </div>
        )}

        {/* Inventory Table (Simplified UI, removing HTML tables for modern cards where appropriate) */}
        {activeTab === 'INVENTORY' && !isAdding && (
          <div className="space-y-4">
             {filteredAdminProducts.length === 0 ? (
                <div className="bg-white p-20 rounded-[3rem] text-center border-2 border-dashed border-slate-200">
                   <Package size={48} className="mx-auto text-slate-200 mb-4" />
                   <p className="text-slate-400 font-black uppercase tracking-widest text-xs">No records found in Supabase.</p>
                </div>
             ) : (
                <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
                   <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                      <div className="relative w-full max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                        <input 
                           className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500 transition-all text-sm font-medium"
                           placeholder="Filter registry..."
                           value={adminSearchTerm}
                           onChange={e => setAdminSearchTerm(e.target.value)}
                        />
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{filteredAdminProducts.length} Entries Synchronized</span>
                   </div>
                   <div className="overflow-x-auto">
                      <table className="w-full text-left">
                         <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <tr>
                               <th className="px-8 py-5">Product Identity</th>
                               <th className="px-8 py-5">Classification</th>
                               <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-100">
                            {filteredAdminProducts.map(p => (
                               <tr key={p.id} className="group hover:bg-slate-50/50 transition-colors">
                                  <td className="px-8 py-5">
                                     <div className="flex items-center gap-4">
                                        <img src={p.image} className="w-12 h-12 rounded-lg object-cover shadow-sm border border-slate-100" alt="" />
                                        <div>
                                           <div className="font-bold text-slate-900">{p.name}</div>
                                           <div className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">ID: {p.id.slice(-8)}</div>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="px-8 py-5">
                                     <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[9px] font-black text-slate-600 uppercase tracking-widest">{p.category}</span>
                                  </td>
                                  <td className="px-8 py-5 text-right">
                                     <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => startEdit(p)} className="p-2 text-slate-400 hover:text-slate-900 bg-white border border-slate-100 rounded-lg shadow-sm"><Edit size={16} /></button>
                                        <button onClick={() => confirmDeleteProduct(p.id, p.name)} className="p-2 text-slate-400 hover:text-red-600 bg-white border border-slate-100 rounded-lg shadow-sm"><Trash size={16} /></button>
                                     </div>
                                  </td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </div>
             )}
          </div>
        )}

        {/* Master Form (Keeping as is, it's highly functional) */}
        {activeTab === 'INVENTORY' && isAdding && (
          <div ref={formRef} className="bg-white rounded-[3rem] border border-slate-200 shadow-2xl mb-12 animate-in slide-in-from-top-6 duration-500 overflow-hidden">
            <div className="px-10 py-8 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-600 rounded-2xl">
                  {editingId ? <Settings size={28} /> : <Plus size={28} />}
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight">{editingId ? 'EDIT REGISTRY' : 'NEW REGISTRATION'}</h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                    Cloud Storage Operation
                  </p>
                </div>
              </div>
              <button onClick={cancelAction} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400"><X size={32} /></button>
            </div>

            <form onSubmit={handleProductSubmit} className="p-10 space-y-12">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <div className="space-y-6">
                     <div>
                        <label className={labelClasses}>Garment Name</label>
                        <input required className={inputClasses} value={formProduct.name} onChange={e => setFormProduct({...formProduct, name: e.target.value})} placeholder="e.g. Sterile Isolation Gown" />
                     </div>
                     <div>
                        <label className={labelClasses}>Category</label>
                        <select className={inputClasses} value={formProduct.category} onChange={e => setFormProduct({...formProduct, category: e.target.value})}>
                           {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                     </div>
                     <div>
                        <label className={labelClasses}>Description</label>
                        <textarea rows={4} className={inputClasses} value={formProduct.description} onChange={e => setFormProduct({...formProduct, description: e.target.value})} placeholder="Technical details..." />
                     </div>
                  </div>
                  <div className="space-y-6">
                     <label className={labelClasses}>Primary Image</label>
                     <div onClick={() => fileInputRef.current?.click()} className="aspect-video bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] overflow-hidden cursor-pointer hover:border-red-500 transition-all flex flex-col items-center justify-center relative">
                        {formProduct.image ? <img src={formProduct.image} className="w-full h-full object-cover" /> : <Upload className="text-slate-300" size={48} />}
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => { const file = e.target.files?.[0]; if (file) { const reader = new FileReader(); reader.onloadend = () => setFormProduct({ ...formProduct, image: reader.result as string }); reader.readAsDataURL(file); } }} />
                     </div>
                  </div>
               </div>
               
               <div className="flex gap-4 pt-8">
                  <button type="submit" className="flex-grow bg-red-600 text-white font-black py-5 rounded-2xl shadow-xl hover:bg-red-700 transition-all uppercase tracking-widest text-sm">
                    Commit to Supabase
                  </button>
                  <button type="button" onClick={cancelAction} className="px-10 bg-white border border-slate-200 text-slate-400 font-black rounded-2xl hover:bg-slate-50 transition-all text-sm uppercase tracking-widest">
                    Discard
                  </button>
               </div>
            </form>
          </div>
        )}

        {/* INQUIRIES VIEW (Cards for mobile friendliness) */}
        {activeTab === 'INQUIRIES' && (
          <div className="space-y-6 animate-in fade-in duration-300">
             <div className="flex justify-between items-center mb-6">
                <div className="flex gap-4">
                   <input type="date" className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold" value={inquiryDateStart} onChange={e => setInquiryDateStart(e.target.value)} />
                   <input type="date" className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold" value={inquiryDateEnd} onChange={e => setInquiryDateEnd(e.target.value)} />
                </div>
                <button onClick={downloadCSV} className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-red-600 transition-all">
                  <FileDown size={14} /> Download CSV
                </button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInquiries.map(inq => (
                   <div key={inq.id} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all relative group">
                      <button onClick={() => { if(window.confirm('Delete this record?')) onDeleteInquiry(inq.id); }} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100">
                         <Trash size={16} />
                      </button>
                      <div className="flex items-center gap-4 mb-6">
                         <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-600 font-black text-xl">
                            {inq.name.charAt(0)}
                         </div>
                         <div>
                            <div className="font-black text-slate-900">{inq.name}</div>
                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{new Date(inq.timestamp).toLocaleDateString()}</div>
                         </div>
                      </div>
                      <div className="space-y-4 mb-6">
                         <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                            <Building size={14} className="text-slate-300" /> {inq.company}
                         </div>
                         <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                            <Package size={14} className="text-slate-300" /> {inq.productName} ({inq.quantity} units)
                         </div>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-xl text-xs text-slate-500 italic border border-slate-100">
                         "{inq.message}"
                      </div>
                      <div className="mt-6 pt-6 border-t border-slate-100 flex justify-between items-center">
                         <a href={`mailto:${inq.email}`} className="text-red-600 font-black text-[10px] uppercase tracking-widest hover:underline">Contact Client</a>
                         <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">ID: {inq.id.slice(-6)}</span>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
