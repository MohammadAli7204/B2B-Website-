
import React, { useState, useEffect } from 'react';
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
import { Product, InquiryData } from './types';
import { supabase, isConfigured } from './lib/supabase';

const INITIAL_CATEGORIES = ['Sterile', 'Protective', 'Consumables', 'Custom'];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('/');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [dbConnected, setDbConnected] = useState<boolean>(false);
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [inquiries, setInquiries] = useState<InquiryData[]>([]);

  useEffect(() => {
    if (!isConfigured) return;
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAdminAuthenticated(!!session);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdminAuthenticated(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const fetchData = async () => {
    if (!isConfigured) {
      setProducts(INITIAL_PRODUCTS);
      setCategories(INITIAL_CATEGORIES);
      setLoading(false);
      setDbConnected(false);
      return;
    }
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('careguard')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;

      setDbConnected(true);

      if (data) {
        const p: Product[] = [];
        const c: string[] = [];
        const i: InquiryData[] = [];

        data.forEach(record => {
          if (record.type === 'product') {
            p.push({ id: record.id, ...record.payload });
          } else if (record.type === 'category') {
            c.push(record.payload.name);
          } else if (record.type === 'inquiry') {
            i.push({ id: record.id, ...record.payload, timestamp: record.created_at });
          }
        });

        // Use database data if available, otherwise fallback to constants
        setProducts(p.length > 0 ? p.sort((a, b) => a.name.localeCompare(b.name)) : INITIAL_PRODUCTS);
        setCategories(c.length > 0 ? c.sort() : INITIAL_CATEGORIES);
        setInquiries(i);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setDbConnected(false);
      setProducts(INITIAL_PRODUCTS);
      setCategories(INITIAL_CATEGORIES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleLogin = async (user: string, pass: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email: user, password: pass });
    return !error && !!data.user;
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAdminAuthenticated(false);
    navigate('/');
  };

  const handleAddProduct = async (product: Product) => {
    const { id, ...payload } = product;
    const { error } = await supabase.from('careguard').insert([{ type: 'product', payload }]);
    if (error) console.error(error);
    else fetchData();
  };

  const handleUpdateProduct = async (product: Product) => {
    const { id, ...payload } = product;
    const { error } = await supabase.from('careguard').update({ payload }).eq('id', id);
    if (error) console.error(error);
    else fetchData();
  };

  const handleDeleteProduct = async (id: string) => {
    const { error } = await supabase.from('careguard').delete().eq('id', id);
    if (error) console.error(error);
    else fetchData();
  };

  const handleAddCategory = async (name: string) => {
    const { error } = await supabase.from('careguard').insert([{ type: 'category', payload: { name } }]);
    if (error) console.error(error);
    else fetchData();
  };

  const handleDeleteCategory = async (name: string) => {
    // Delete by matching payload name in JSONB
    const { data: records } = await supabase.from('careguard').select('*').eq('type', 'category');
    const target = records?.find(r => r.payload?.name === name);
    if (target) {
      await supabase.from('careguard').delete().eq('id', target.id);
      fetchData();
    }
  };

  const handleAddInquiry = async (inq: InquiryData) => {
    const { id, timestamp, ...payload } = inq;
    const { error } = await supabase.from('careguard').insert([{ type: 'inquiry', payload }]);
    if (error) throw error;
    else fetchData();
  };

  const handleDeleteInquiry = async (id: string) => {
    const { error } = await supabase.from('careguard').delete().eq('id', id);
    if (error) console.error(error);
    else fetchData();
  };

  const handleResetData = async () => {
    await fetchData();
  };

  const renderPage = () => {
    if (currentPage.startsWith('/product/')) {
      const id = currentPage.split('/')[2];
      const product = products.find(p => p.id === id);
      return product ? <ProductDetail product={product} onNavigate={navigate} /> : <div className="pt-40 text-center">Product not found.</div>;
    }
    
    if (currentPage.startsWith('/inquiry/')) {
      const id = currentPage.split('/')[2];
      const product = products.find(p => p.id === id);
      return product ? <Inquiry product={product} onAddInquiry={handleAddInquiry} /> : <div className="pt-40 text-center">Product not found.</div>;
    }

    switch (currentPage) {
      case '/': return <Home onNavigate={navigate} />;
      case '/about': return <About />;
      case '/products': return <Products products={products} categories={categories} onNavigate={navigate} />;
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
            onResetData={handleResetData}
            onLogout={handleLogout}
          />
        ) : (
          <AdminLogin onLogin={handleLogin} />
        );
      default: return <Home onNavigate={navigate} />;
    }
  };

  return (
    <div className="relative min-h-screen">
      <CursorFollower />
      <Navbar currentPage={currentPage} onNavigate={navigate} isAdmin={isAdminAuthenticated} onLogout={handleLogout} />
      <main className="min-h-[calc(100vh-400px)]">
        {loading && !dbConnected ? (
          <div className="pt-60 flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-400 font-bold uppercase tracking-widest text-xs">Accessing CareGuard Registry...</p>
          </div>
        ) : renderPage()}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
};

export default App;
