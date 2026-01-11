
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
import { Settings, ShieldAlert, ExternalLink } from 'lucide-react';

const INITIAL_CATEGORIES = ['Sterile', 'Protective', 'Consumables', 'Custom'];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('/');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [inquiries, setInquiries] = useState<InquiryData[]>([]);

  // Check auth session on load
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

  // Fetch data from Supabase
  useEffect(() => {
    if (!isConfigured) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const [
          { data: productsData },
          { data: categoriesData },
          { data: inquiriesData }
        ] = await Promise.all([
          supabase.from('products').select('*').order('name'),
          supabase.from('categories').select('name').order('name'),
          supabase.from('inquiries').select('*').order('created_at', { ascending: false })
        ]);

        if (productsData) setProducts(productsData.map(p => ({
          ...p,
          extraImages: p.extra_images,
          sizeChart: p.size_chart,
          additionalInfo: p.additional_info
        })));
        
        if (categoriesData) setCategories(categoriesData.map(c => c.name));
        else setCategories(INITIAL_CATEGORIES);

        if (inquiriesData) setInquiries(inquiriesData.map(inq => ({
          id: inq.id,
          productId: inq.product_id,
          productName: inq.product_name,
          name: inq.name,
          email: inq.email,
          company: inq.company,
          quantity: inq.quantity,
          message: inq.message,
          requirement: inq.requirement,
          timestamp: inq.created_at
        })));
      } catch (error) {
        console.error('Error fetching data from Supabase:', error);
      } finally {
        setLoading(false);
      }
    };

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
    setCurrentPage(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLogin = async (user: string, pass: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: user.includes('@') ? user : `${user}@careguard.com`,
      password: pass,
    });

    if (error) {
      console.error('Login error:', error.message);
      return false;
    }
    return true;
  };

  const handleAdminLogout = async () => {
    await supabase.auth.signOut();
    setIsAdminAuthenticated(false);
    navigate('/');
  };

  const addProduct = async (newProduct: Product) => {
    const { data, error } = await supabase.from('products').insert([{
      name: newProduct.name,
      category: newProduct.category,
      description: newProduct.description,
      image: newProduct.image,
      extra_images: newProduct.extraImages,
      features: newProduct.features,
      size_chart: newProduct.sizeChart,
      additional_info: newProduct.additionalInfo
    }]).select();

    if (data && !error) {
      const mapped = { ...data[0], extraImages: data[0].extra_images, sizeChart: data[0].size_chart, additionalInfo: data[0].additional_info };
      setProducts(prev => [...prev, mapped]);
    }
  };

  const updateProduct = async (updatedProduct: Product) => {
    const { error } = await supabase.from('products').update({
      name: updatedProduct.name,
      category: updatedProduct.category,
      description: updatedProduct.description,
      image: updatedProduct.image,
      extra_images: updatedProduct.extraImages,
      features: updatedProduct.features,
      size_chart: updatedProduct.sizeChart,
      additional_info: updatedProduct.additionalInfo
    }).eq('id', updatedProduct.id);

    if (!error) {
      setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    }
  };

  const deleteProduct = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const addCategory = async (category: string) => {
    const { error } = await supabase.from('categories').insert([{ name: category }]);
    if (!error) {
      setCategories(prev => [...prev, category]);
    }
  };

  const deleteCategory = async (categoryToDelete: string) => {
    const { error } = await supabase.from('categories').delete().eq('name', categoryToDelete);
    if (!error) {
      const updatedCategories = categories.filter(c => c !== categoryToDelete);
      setCategories(updatedCategories);
      const fallbackCategory = updatedCategories.length > 0 ? updatedCategories[0] : 'Uncategorized';
      setProducts(prev => prev.map(p => p.category === categoryToDelete ? { ...p, category: fallbackCategory } : p));
    }
  };

  const addInquiry = async (inquiry: InquiryData) => {
    const { data, error } = await supabase.from('inquiries').insert([{
      product_id: inquiry.productId,
      // Fix: Changed inquiry.product_name to inquiry.productName as per InquiryData interface
      product_name: inquiry.productName,
      name: inquiry.name,
      email: inquiry.email,
      company: inquiry.company,
      quantity: inquiry.quantity,
      message: inquiry.message,
      requirement: inquiry.requirement
    }]).select();

    if (data && !error) {
      const mapped = { 
        ...inquiry, 
        id: data[0].id, 
        timestamp: data[0].created_at 
      };
      setInquiries(prev => [mapped, ...prev]);
    }
  };

  const deleteInquiry = async (id: string) => {
    const { error } = await supabase.from('inquiries').delete().eq('id', id);
    if (!error) {
      setInquiries(prev => prev.filter(i => i.id !== id));
    }
  };

  const resetData = async () => {
    if (window.confirm('WARNING: This will re-seed the Supabase database with initial content. Proceed?')) {
      setLoading(true);
      try {
        await supabase.from('products').delete().neq('id', '0');
        await supabase.from('categories').delete().neq('id', '0');
        
        await Promise.all([
          ...INITIAL_CATEGORIES.map(c => supabase.from('categories').insert({ name: c })),
          ...INITIAL_PRODUCTS.map(p => supabase.from('products').insert({
            name: p.name,
            category: p.category,
            description: p.description,
            image: p.image,
            extra_images: p.extraImages,
            features: p.features,
            size_chart: p.sizeChart,
            additional_info: p.additionalInfo
          }))
        ]);
        window.location.reload();
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const renderConfigPlaceholder = () => (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-12 shadow-2xl text-center animate-in zoom-in duration-500">
        <div className="w-20 h-20 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
          <Settings size={40} className="animate-spin-slow" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Backend Required</h2>
        <p className="text-slate-500 font-medium mb-10 leading-relaxed">
          Please add your <span className="text-slate-900 font-bold">Supabase URL</span> and <span className="text-slate-900 font-bold">Anon Key</span> to your environment variables to enable data synchronization.
        </p>
        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-left text-xs font-mono text-slate-400 break-all">
            VITE_SUPABASE_URL<br/>
            VITE_SUPABASE_ANON_KEY
          </div>
          <a 
            href="https://supabase.com/dashboard" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-red-600 text-white font-black py-4 rounded-xl hover:bg-red-700 transition-all uppercase tracking-widest text-xs"
          >
            Open Supabase Dashboard <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );

  const renderPage = () => {
    if (!isConfigured) {
      return renderConfigPlaceholder();
    }

    if (loading && currentPage === '/products') {
      return (
        <div className="pt-40 text-center animate-pulse">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full mx-auto mb-4 animate-spin"></div>
          <p className="font-bold text-slate-400 uppercase tracking-widest text-xs">Syncing with Secure Backend...</p>
        </div>
      );
    }

    if (currentPage.startsWith('/product/')) {
      const id = currentPage.split('/').pop();
      const product = products.find(p => p.id === id);
      return product ? <ProductDetail product={product} onNavigate={navigate} /> : <div className="pt-40 text-center">Product not found</div>;
    }

    if (currentPage.startsWith('/inquiry/')) {
      const id = currentPage.split('/').pop();
      const product = products.find(p => p.id === id);
      return product ? <Inquiry product={product} onAddInquiry={addInquiry} /> : <div className="pt-40 text-center">Product not found</div>;
    }

    switch (currentPage) {
      case '/':
        return <Home onNavigate={navigate} />;
      case '/about':
        return <About />;
      case '/products':
        return <Products products={products} categories={categories} onNavigate={navigate} />;
      case '/blog':
        return <Blog />;
      case '/contact':
        return <Contact />;
      case '/admin':
        if (!isAdminAuthenticated) {
          return <AdminLogin onLogin={handleAdminLogin} />;
        }
        return (
          <Admin 
            products={products} 
            categories={categories} 
            inquiries={inquiries}
            onAddProduct={addProduct} 
            onUpdateProduct={updateProduct}
            onAddCategory={addCategory} 
            onDeleteCategory={deleteCategory}
            onDeleteProduct={deleteProduct}
            onDeleteInquiry={deleteInquiry}
            onResetData={resetData}
            onLogout={handleAdminLogout}
          />
        );
      default:
        return <Home onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-red-100 selection:text-red-900 cursor-none">
      <CursorFollower />
      {isConfigured && <Navbar currentPage={currentPage} onNavigate={navigate} isAdmin={isAdminAuthenticated} onLogout={handleAdminLogout} />}
      
      <main className="flex-grow">
        {renderPage()}
      </main>

      {isConfigured && <Footer onNavigate={navigate} />}
      
      {isConfigured && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-40 bg-white shadow-2xl p-3 rounded-full border border-slate-100 hover:text-red-600 transition-all opacity-0 invisible lg:visible hover:scale-110 scroll-visible-only"
          id="back-to-top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .scroll-visible-only {
          transition: opacity 0.3s;
        }
        body.scrolled #back-to-top {
          opacity: 1;
          visibility: visible;
        }
        * {
          cursor: none !important;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f8fafc;
        }
        ::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
      
      <script>{`
        window.addEventListener('scroll', () => {
          if (window.scrollY > 500) {
            document.body.classList.add('scrolled');
          } else {
            document.body.classList.remove('scrolled');
          }
        });
      `}</script>
    </div>
  );
};

export default App;
