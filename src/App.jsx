import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import FloatingChat from './components/FloatingChat';
import Footer from './components/layout/Footer';

// Public Pages
import Home from './pages/Home';
import AllPhones from './pages/AllPhones';
import PhoneDetails from './pages/PhoneDetails';
import Services from './pages/Services';
import Offers from './pages/Offers';
import AboutContact from './pages/AboutContact';
import PreOwnedPage from './pages/PreOwned';
import AccessoriesPage from './pages/Accessories';

// Admin
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ManagePhones from './pages/admin/ManagePhones';
import ManagePreOwned from './pages/admin/ManagePreOwned';
import ManageOffers from './pages/admin/ManageOffers';
import ManageServices from './pages/admin/ManageServices';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    // Check if admin is logged in
    const loggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Admin routes
  if (isAdminRoute) {
    // Show login if not logged in
    if (!isLoggedIn) {
      return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
    }

    return (
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="phones" element={<ManagePhones />} />
          <Route path="pre-owned" element={<ManagePreOwned />} />
          <Route path="offers" element={<ManageOffers />} />
          <Route path="services" element={<ManageServices />} />
        </Route>
      </Routes>
    );
  }

  // Public routes
  return (
    <div className={`min-h-screen font-sans selection:bg-brand-green selection:text-black transition-colors duration-300 ${theme === 'dark' ? 'bg-brand-black text-white' : 'bg-white text-black'}`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/phones" element={<AllPhones />} />
          <Route path="/phone/:id" element={<PhoneDetails />} />
          <Route path="/pre-owned" element={<PreOwnedPage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/about" element={<AboutContact />} />
        </Routes>
      </main>
      <FloatingChat />
      <Footer />
    </div>
  );
}

export default App;
