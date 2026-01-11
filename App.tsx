
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
import { PRODUCTS as INITIAL_PRODUCTS } from './constants';
import { Product, InquiryData } from './types';

const INITIAL_CATEGORIES = ['Sterile', 'Protective', 'Consumables', 'Custom'];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('/');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('careguard_admin_auth') === 'true';
  });
  
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('careguard_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [categories, setCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem('careguard_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [inquiries, setInquiries] = useState<InquiryData[]>(() => {
    const saved = localStorage.getItem('careguard_inquiries');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('careguard_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('careguard_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('careguard_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

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

  const handleAdminLogin = (user: string, pass: string) => {
    const TARGET_USERNAME = 'admin';
    const TARGET_PASSWORD = 'careguard2024';

    if (user === TARGET_USERNAME && pass === TARGET_PASSWORD) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('careguard_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('careguard_admin_auth');
    navigate('/');
  };

  const addProduct = (newProduct: Product) => {
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addCategory = (category: string) => {
    setCategories(prev => {
      if (!prev.includes(category)) {
        return [...prev, category];
      }
      return prev;
    });
  };

  const deleteCategory = (categoryToDelete: string) => {
    const updatedCategories = categories.filter(c => c !== categoryToDelete);
    setCategories(updatedCategories);
    const fallbackCategory = updatedCategories.length > 0 ? updatedCategories[0] : 'Uncategorized';
    setProducts(prev => prev.map(p => {
      if (p.category === categoryToDelete) {
        return { ...p, category: fallbackCategory };
      }
      return p;
    }));
  };

  const addInquiry = (inquiry: InquiryData) => {
    setInquiries(prev => [inquiry, ...prev]);
  };

  const deleteInquiry = (id: string) => {
    setInquiries(prev => prev.filter(i => i.id !== id));
  };

  const resetData = () => {
    if (window.confirm('WARNING: This will restore the original catalog and categories. All your custom data and deletions will be lost. Proceed?')) {
      setProducts(INITIAL_PRODUCTS);
      setCategories(INITIAL_CATEGORIES);
      setInquiries([]);
      localStorage.removeItem('careguard_products');
      localStorage.removeItem('careguard_categories');
      localStorage.removeItem('careguard_inquiries');
    }
  };

  const renderPage = () => {
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
    <div className="min-h-screen flex flex-col selection:bg-red-100 selection:text-red-900">
      <Navbar currentPage={currentPage} onNavigate={navigate} isAdmin={isAdminAuthenticated} onLogout={handleAdminLogout} />
      
      <main className="flex-grow">
        {renderPage()}
      </main>

      <Footer onNavigate={navigate} />
      
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-40 bg-white shadow-2xl p-3 rounded-full border border-slate-100 hover:text-red-600 transition-all opacity-0 invisible lg:visible hover:scale-110 scroll-visible-only"
        id="back-to-top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>

      <style>{`
        .scroll-visible-only {
          transition: opacity 0.3s;
        }
        body.scrolled #back-to-top {
          opacity: 1;
          visibility: visible;
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
