import React from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';
import Features from './components/home/Features';
import Accessories from './components/home/Accessories';
import PreOwned from './components/home/PreOwned';
import FloatingChat from './components/FloatingChat';
import Footer from './components/layout/Footer';

function App() {
  return (
    <div className="bg-brand-black min-h-screen text-white font-sans selection:bg-brand-green selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Accessories />
        <PreOwned />
      </main>
      <FloatingChat />
      <Footer />
    </div>
  );
}

export default App;
