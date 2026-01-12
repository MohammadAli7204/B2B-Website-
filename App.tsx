import React, { useState, useEffect, useCallback } from 'react';
import { Search, WifiOff, Cloud } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import ProductDetail from './pages/ProductDetail';
import Inquiry from './pages/Inquiry';
import AdminLogin from './components/AdminLogin';
import CursorFollower from './components/CursorFollower';
import { PRODUCTS as INITIAL_PRODUCTS } from './constants';
import { Product, InquiryData, Category } from './types';
import { supabase, isConfigured } from './lib/supabase';

const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Sterile' },
  { id: 'cat-2', name: 'Protective' },
  { id: 'cat-3', name: 'Consumables' },
  { id: 'cat-4', name: 'Custom' }
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('/');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [dbConnected, setDbConnected] = useState<boolean>(false);
  const [cloudSynced, setCloudSynced] = useState<boolean>(false);
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [inquiries, setInquiries] = useState<InquiryData[]>([]);

  useEffect(() => {
    if (!isConfigured) {
      setLoading(false);
      return;
    }
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAdminAuthenticated(!!session);
    }).catch(() => {});
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdminAuthenticated(!!session);
    });
    
    return () => subscription.unsubscribe();
  }, []);

  const fetchData = useCallback(async () => {
    if (!isConfigured) {
      setProducts(INITIAL_PRODUCTS);
      setCategories(INITIAL_CATEGORIES);
      setLoading(false);
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('careguard')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;

      if (data) {
        setDbConnected(true);
        setIsOfflineMode(false);
        const p: Product[] = [];
        const c: Category[] = [];
        const i: InquiryData[] = [];

        data.forEach(record => {
          const payload = record.payload || {};
          if (record.type === 'product') p.push({ ...payload, id: record.id });
          else if (record.type === 'category') c.push({ id: record.id, name: payload.name });
          else if (record.type === 'inquiry') i.push({ ...payload, id: record.id, timestamp: record.created_at });
        });

        setProducts(p.length > 0 ? p : INITIAL_PRODUCTS);
        setCategories(c.length > 0 ? c : INITIAL_CATEGORIES);
        setInquiries(i);
        setCloudSynced(true);
      }
    } catch (error: any) {
      setDbConnected(false);
      if (error.message === 'Failed to fetch') {
        setIsOfflineMode(true);
      }
      // Fallback to constants on fetch error
      setProducts(INITIAL_PRODUCTS);
      setCategories(INITIAL_CATEGORIES);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || '/';
      setCurrentPage(hash);
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
  };

  const handleLogin = async (email: string, pass: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
      if (error) return { success: false, message: error.message };
      return { success: !!data.user };
    } catch (err) {
      return { success: false, message: 'Authentication Service Unreachable' };
    }
  };

  const handleSignUp = async (email: string, pass: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password: pass });
      if (error) return { success: false, message: error.message };
      return { success: true, message: 'Identity Created. Verify via Email.' };
    } catch (err) {
      return { success: false, message: 'Registry Failure' };
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAdminAuthenticated(false);
    navigate('/');
  };

  // CRUD Operations (Cloud-Synced)
  const handleAddProduct = async (product: Product) => {
    const { id, ...payload } = product;
    const { error } = await supabase.from('careguard').insert([{ type: 'product', payload }]);
    if (error) throw error;
    await fetchData();
  };

  const handleUpdateProduct = async (product: Product) => {
    const { id, ...payload } = product;
    const { error } = await supabase.from('careguard').update({ payload }).eq('id', id);
    if (error) throw error;
    await fetchData();
  };

  const handleDeleteProduct = async (id: string) => {
    const { error } = await supabase.from('careguard').delete().eq('id', id);
    if (error) throw error;
    await fetchData();
  };

  const handleAddCategory = async (name: string) => {
    const { error } = await supabase.from('careguard').insert([{ type: 'category', payload: { name } }]);
    if (error) throw error;
    await fetchData();
  };

  const handleDeleteCategory = async (id: string) => {
    const { error } = await supabase.from('careguard').delete().eq('id', id);
    if (error) throw error;
    await fetchData();
  };

  const handleAddInquiry = async (inq: InquiryData) => {
    const { id, timestamp, ...payload } = inq;
    const { error } = await supabase.from('careguard').insert([{ type: 'inquiry', payload }]);
    if (error) throw error;
    await fetchData();
  };

  const handleDeleteInquiry = async (id: string) => {
    const { error } = await supabase.from('careguard').delete().eq('id', id);
    if (error) throw error;
    await fetchData();
  };

  const renderPage = () => {
    if (currentPage.startsWith('/product/')) {
      const id = currentPage.split('/')[2];
      const product = products.find(p => p.id === id);
      return product ? <ProductDetail product={product} onNavigate={navigate} /> : <div className="pt-40 text-center uppercase font-black text-slate-300">Unit Missing</div>;
    }
    
    if (currentPage.startsWith('/inquiry/')) {
      const id = currentPage.split('/')[2];
      const product = products.find(p => p.id === id);
      return product ? <Inquiry product={product} onAddInquiry={handleAddInquiry} /> : <div className="pt-40 text-center uppercase font-black text-slate-300">Target Invalid</div>;
    }

    switch (currentPage) {
      case '/': return <Home onNavigate={navigate} />;
      case '/about': return <About />;
      case '/products': return <Products products={products} categories={categories.map(c => c.name)} onNavigate={navigate} />;
      case '/blog': return <Blog />;
      case '/contact': return <Contact />;
      case '/admin': 
        return isAdminAuthenticated ? (
          <Admin 
            products={products} 
            categories={categories} 
            inquiries={inquiries}
            dbConnected={dbConnected}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onAddCategory={handleAddCategory}
            onDeleteCategory={handleDeleteCategory}
            onDeleteProduct={handleDeleteProduct}
            onDeleteInquiry={handleDeleteInquiry}
            onResetData={fetchData}
            onLogout={handleLogout}
          />
        ) : (
          <AdminLogin onLogin={handleLogin} onSignUp={handleSignUp} />
        );
      default: return <Home onNavigate={navigate} />;
    }
  };

  return (
    <div className="relative min-h-screen">
      <CursorFollower />
      {isOfflineMode && (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-amber-600 text-white text-[10px] font-black uppercase tracking-widest py-1.5 flex items-center justify-center gap-2 animate-in slide-in-from-top duration-500">
          <WifiOff size={12} /> Cloud Link Interrupted - Using Institutional Fallback Data
        </div>
      )}
      <Navbar currentPage={currentPage} onNavigate={navigate} isAdmin={isAdminAuthenticated} onLogout={handleLogout} />
      <main className="min-h-screen">
        {loading ? (
          <div className="h-screen flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-400 font-bold uppercase tracking-widest text-[10px]">Synchronizing Ledger...</p>
          </div>
        ) : renderPage()}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
};

export default App;