import React, { useState, useRef, useMemo, useEffect } from 'react';
import { 
  Plus, Trash, Edit, Save, X, Tags, Upload, 
  Search, Settings, RotateCcw, Package, 
  Database, Wifi, WifiOff, Loader2, LogOut, TrendingUp, BarChart3, Users,
  Image as ImageIcon, Cloud, Server, Activity, ShieldCheck, AlertCircle
} from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { Product, InquiryData, Category, SizeChartEntry } from '../types';
import { testConnection } from '../lib/supabase';

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
  const [activeTab, setActiveTab] = useState<'INVENTORY' | 'INQUIRIES' | 'DASHBOARD' | 'HEALTH'>('DASHBOARD');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isManagingCategories, setIsManagingCategories] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [adminSearchTerm, setAdminSearchTerm] = useState('');
  const [inquirySearchTerm, setInquirySearchTerm] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  
  // Diagnostic State (Test Sprite)
  const [healthStatus, setHealthStatus] = useState<any>(null);
  const [isCheckingHealth, setIsCheckingHealth] = useState(false);

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

  const checkHealth = async () => {
    setIsCheckingHealth(true);
    const result = await testConnection();
    setHealthStatus(result);
    setIsCheckingHealth(false);
  };

  useEffect(() => {
    if (activeTab === 'HEALTH') checkHealth();
  }, [activeTab]);

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

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const productData = { ...formProduct, id: editingId || '' } as Product;
      if (editingId) {
        await onUpdateProduct(productData);
        showFeedback('Cloud Record Updated');
      } else {
        await onAddProduct(productData);
        showFeedback('New Registry Created');
      }
      setIsAdding(false);
      setEditingId(null);
      resetForm();
    } catch (err: any) {
      alert(`API Error: ${err.message}`);
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

  const inputClasses = "w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-red-500 bg-slate-50 text-slate-900 font-medium transition-all";
  const labelClasses = "block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-[0.2em]";

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Unified Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-12 gap-6">
          <div>
            <SectionTitle title="CareGuard Ledger" subtitle="Administrative control for clinical apparel distribution." />
            <div className={`mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest w-fit shadow-sm border ${dbConnected ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
              {dbConnected ? <Wifi size={12} /> : <WifiOff size={12} />}
              {dbConnected ? 'Cloud Sync Active' : 'Local Fallback Active'}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => onResetData().then(() => showFeedback('Ledger Refreshed'))} 
              className="flex items-center gap-2 bg-white text-slate-500 px-5 py-3 rounded-xl font-bold border border-slate-200 hover:bg-slate-100 active:scale-95 transition-all"
            >
              <RotateCcw size={18} className={isProcessing ? 'animate-spin' : ''} />
              Sync
            </button>
            <button 
              onClick={() => {
                setActiveTab('INVENTORY');
                setIsAdding(!isAdding);
                if (!isAdding) { setEditingId(null); resetForm(); }
              }} 
              className="flex items-center gap-2 bg-red-600 text-white px-7 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-700 active:scale-95 transition-all shadow-xl"
            >
              {isAdding ? <X size={18} /> : <Plus size={18} />}
              {isAdding ? 'Cancel' : 'New Unit'}
            </button>
            {onLogout && (
              <button onClick={onLogout} className="p-3 bg-white text-slate-400 hover:text-red-600 border border-slate-200 rounded-xl active:scale-95 transition-all"><LogOut size={20} /></button>
            )}
          </div>
        </div>

        {/* Console Tabs */}
        <div className="flex gap-1 bg-slate-200 p-1.5 rounded-2xl mb-10 w-fit">
          {['DASHBOARD', 'INVENTORY', 'INQUIRIES', 'HEALTH'].map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab as any); setIsAdding(false); }}
              className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500 hover:bg-slate-100'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* SYSTEM HEALTH (TEST SPRITE) */}
        {activeTab === 'HEALTH' && (
          <div className="animate-in fade-in duration-500 max-w-2xl mx-auto">
            <div className="bg-white rounded-[2.5rem] border border-slate-200 p-12 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full -mr-32 -mt-32 blur-3xl"></div>
               <div className="flex items-center gap-6 mb-12 relative z-10">
                  <div className={`p-5 rounded-[2rem] shadow-xl ${healthStatus?.success ? 'bg-emerald-600' : 'bg-red-600'}`}>
                    <Activity className="text-white animate-pulse" size={32} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">API Diagnostic</h3>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Handshake Verification Tool</p>
                  </div>
               </div>

               <div className="space-y-6 relative z-10">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Connection Status</span>
                    {isCheckingHealth ? (
                      <Loader2 size={18} className="animate-spin text-red-600" />
                    ) : (
                      <span className={`text-xs font-black uppercase ${healthStatus?.success ? 'text-emerald-600' : 'text-red-600'}`}>
                        {healthStatus?.message || 'Ready to Test'}
                      </span>
                    )}
                  </div>

                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Latency (RTT)</span>
                    <span className="text-xs font-black text-slate-900">
                      {healthStatus?.latency ? `${healthStatus.latency}ms` : 'N/A'}
                    </span>
                  </div>

                  {!healthStatus?.success && healthStatus?.message && (
                    <div className="p-6 bg-red-50 rounded-2xl border border-red-100 flex gap-4">
                      <AlertCircle className="text-red-600 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-red-800 mb-1">Failed to Fetch</p>
                        <p className="text-[10px] text-red-600 leading-relaxed font-medium">
                          Browser cannot reach the database. This is usually caused by AdBlockers, Firewalls, or the Supabase project being paused. 
                          Check your environment variables and internet connection.
                        </p>
                      </div>
                    </div>
                  )}

                  <button 
                    onClick={checkHealth}
                    disabled={isCheckingHealth}
                    className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl shadow-xl hover:bg-red-600 active:scale-95 transition-all uppercase tracking-widest text-xs mt-6"
                  >
                    {isCheckingHealth ? 'Running Handshake...' : 'Run Diagnostics'}
                  </button>
               </div>
            </div>
          </div>
        )}

        {/* DASHBOARD VIEW */}
        {activeTab === 'DASHBOARD' && (
          <div className="space-y-10 animate-in fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mb-6">
                  <TrendingUp size={24} />
                </div>
                <h4 className="text-4xl font-black text-slate-900 mb-2">{stats.totalProducts}</h4>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Units</p>
              </div>
              <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                  <Users size={24} />
                </div>
                <h4 className="text-4xl font-black text-slate-900 mb-2">{stats.totalInquiries}</h4>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Procurement Requests</p>
              </div>
              <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6">
                  <BarChart3 size={24} />
                </div>
                <h4 className="text-4xl font-black text-slate-900 mb-2">{stats.totalCategories}</h4>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Garment Classes</p>
              </div>
            </div>
            
            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 border border-white/5 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
               <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-2 tracking-tight">System Infrastructure</h3>
                  <p className="text-slate-400 text-sm max-w-md font-medium">B2B procurement platform built on the CareGuard 1.0 architecture with Supabase Realtime synchronization.</p>
               </div>
               <button onClick={() => setActiveTab('HEALTH')} className="bg-white/10 text-white px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 active:scale-95 transition-all relative z-10">
                  Open Diagnostics
               </button>
            </div>
          </div>
        )}

        {/* INVENTORY LIST */}
        {activeTab === 'INVENTORY' && !isAdding && (
          <div className="animate-in fade-in">
             <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/50">
                   <div className="relative w-full max-w-md">
                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                     <input 
                        className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl outline-none text-sm font-medium focus:ring-2 focus:ring-red-500 transition-all shadow-inner"
                        placeholder="Search SKU identity..."
                        value={adminSearchTerm}
                        onChange={e => setAdminSearchTerm(e.target.value)}
                     />
                   </div>
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full text-left">
                      <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                         <tr>
                            <th className="px-10 py-6">Unit</th>
                            <th className="px-10 py-6">Taxonomy</th>
                            <th className="px-10 py-6 text-right">Actions</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                         {filteredAdminProducts.map(p => (
                            <tr key={p.id} className="group hover:bg-slate-50 transition-colors">
                               <td className="px-10 py-6">
                                  <div className="flex items-center gap-4">
                                     <img src={p.image} className="w-10 h-10 rounded-lg object-cover" alt="" />
                                     <span className="text-sm font-bold text-slate-900">{p.name}</span>
                                  </div>
                               </td>
                               <td className="px-10 py-6">
                                  <span className="px-3 py-1 bg-white border border-slate-100 rounded-full text-[9px] font-black text-slate-500 uppercase tracking-widest">{p.category}</span>
                               </td>
                               <td className="px-10 py-6 text-right">
                                  <div className="flex justify-end gap-2">
                                     <button 
                                        onClick={() => {
                                          setEditingId(p.id);
                                          setFormProduct({ ...p });
                                          setIsAdding(true);
                                        }} 
                                        className="p-2 text-slate-400 hover:text-slate-900 bg-white border border-slate-200 rounded-lg shadow-sm"
                                      >
                                        <Edit size={16} />
                                      </button>
                                     <button onClick={() => onDeleteProduct(p.id)} className="p-2 text-slate-400 hover:text-red-600 bg-white border border-slate-200 rounded-lg shadow-sm">
                                        <Trash size={16} />
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
        )}

        {/* INQUIRIES LIST */}
        {activeTab === 'INQUIRIES' && (
          <div className="animate-in fade-in space-y-6">
             {inquiries.map(inq => (
               <div key={inq.id} className="bg-white p-8 rounded-[2rem] border border-slate-200 flex flex-col md:flex-row justify-between gap-6 hover:shadow-lg transition-all group">
                  <div className="flex-grow">
                     <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white font-black">
                           {inq.name.charAt(0)}
                        </div>
                        <div>
                           <h4 className="text-xl font-black text-slate-900">{inq.name}</h4>
                           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{inq.company}</p>
                        </div>
                     </div>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-bold text-slate-600 bg-slate-50 p-6 rounded-2xl">
                        <div>
                           <span className="block text-[8px] uppercase tracking-widest text-slate-400 mb-1">Product</span>
                           <span className="text-red-600 uppercase">{inq.productName}</span>
                        </div>
                        <div>
                           <span className="block text-[8px] uppercase tracking-widest text-slate-400 mb-1">Volume</span>
                           <span className="text-slate-900">{inq.quantity} Units</span>
                        </div>
                        <div>
                           <span className="block text-[8px] uppercase tracking-widest text-slate-400 mb-1">Email</span>
                           <span className="text-slate-900">{inq.email}</span>
                        </div>
                        <div>
                           <span className="block text-[8px] uppercase tracking-widest text-slate-400 mb-1">Received</span>
                           <span className="text-slate-400">{new Date(inq.timestamp).toLocaleDateString()}</span>
                        </div>
                     </div>
                  </div>
                  <button onClick={() => onDeleteInquiry(inq.id)} className="p-4 h-fit bg-red-50 text-red-600 rounded-2xl hover:bg-red-600 hover:text-white transition-all self-center md:self-end">
                    <Trash size={20} />
                  </button>
               </div>
             ))}
             {inquiries.length === 0 && (
               <div className="py-24 text-center text-slate-300 font-black uppercase tracking-widest flex flex-col items-center gap-4">
                  <Activity size={48} className="text-slate-100" />
                  No Procurement Requests Found
               </div>
             )}
          </div>
        )}

        {/* ADD/EDIT FORM */}
        {isAdding && (
          <div className="bg-white rounded-[3.5rem] border border-slate-200 shadow-2xl p-12 animate-in zoom-in duration-500">
             <form onSubmit={handleProductSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-6">
                      <div>
                        <label className={labelClasses}>Unit Name</label>
                        <input required className={inputClasses} value={formProduct.name} onChange={e => setFormProduct({...formProduct, name: e.target.value})} />
                      </div>
                      <div>
                        <label className={labelClasses}>Classification</label>
                        <select className={inputClasses} value={formProduct.category} onChange={e => setFormProduct({...formProduct, category: e.target.value})}>
                           {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className={labelClasses}>Description</label>
                        <textarea rows={4} className={inputClasses} value={formProduct.description} onChange={e => setFormProduct({...formProduct, description: e.target.value})} />
                      </div>
                   </div>
                   <div>
                      <label className={labelClasses}>Master Image URL</label>
                      <input className={inputClasses} value={formProduct.image} onChange={e => setFormProduct({...formProduct, image: e.target.value})} />
                      <div className="mt-4 aspect-video rounded-3xl overflow-hidden bg-slate-50 border border-slate-100">
                         <img src={formProduct.image} className="w-full h-full object-cover" alt="" />
                      </div>
                   </div>
                </div>
                <button type="submit" className="w-full bg-slate-900 text-white font-black py-6 rounded-2xl shadow-xl hover:bg-red-600 transition-all uppercase tracking-widest text-xs">
                   {editingId ? 'Save Ledger Record' : 'Registry New Unit'}
                </button>
             </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;