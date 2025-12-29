import React, { useState, useEffect } from 'react';
import { Wifi, Home, Smartphone, Headphones, RefreshCcw, Headset, PhoneCall, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const NavLink = ({ href, icon: Icon, children }) => (
        <a
            href={href}
            className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white hover:text-brand-green transition-colors duration-300"
        >
            {Icon && <Icon size={16} className="text-brand-green" />}
            {children}
        </a>
    );

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo Section */}
                    <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer group">
                        <div className="relative flex items-baseline">
                            <span className="text-2xl font-bold tracking-tight text-white">Mob</span>
                            <div className="relative flex flex-col items-center mx-[1px]">
                                <Wifi size={14} className="text-brand-green absolute -top-3 animate-pulse" />
                                <span className="text-2xl font-bold text-white">i</span>
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-white">le</span>
                        </div>

                        <div className="relative flex items-baseline ml-2">
                            <div className="relative flex flex-col items-center">
                                <Home size={16} className="text-brand-red absolute -top-3.5" />
                                <span className="text-2xl font-bold text-white">H</span>
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-white">ub</span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <NavLink href="#brands" icon={Smartphone}>Brands</NavLink>
                        <NavLink href="#accessories" icon={Headphones}>Accessories</NavLink>
                        <NavLink href="#pre-owned" icon={RefreshCcw}>Pre-Owned</NavLink>
                        <NavLink href="#support" icon={Headset}>Support</NavLink>
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:flex">
                        <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-full backdrop-blur-sm border border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(57,255,20,0.3)]">
                            <PhoneCall size={18} className="text-brand-green" />
                            <span className="font-semibold">Call Shop</span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden absolute top-20 left-0 right-0 bg-brand-black/95 backdrop-blur-xl border-b border-white/10"
                    >
                        <div className="px-4 py-6 space-y-4">
                            <a href="#brands" className="block text-lg font-medium text-gray-300 hover:text-brand-green" onClick={() => setIsMobileMenuOpen(false)}>Brands</a>
                            <a href="#accessories" className="block text-lg font-medium text-gray-300 hover:text-brand-green" onClick={() => setIsMobileMenuOpen(false)}>Accessories</a>
                            <a href="#pre-owned" className="block text-lg font-medium text-gray-300 hover:text-brand-green" onClick={() => setIsMobileMenuOpen(false)}>Pre-Owned</a>
                            <a href="#support" className="block text-lg font-medium text-gray-300 hover:text-brand-green" onClick={() => setIsMobileMenuOpen(false)}>Support</a>
                            <div className="pt-4 border-t border-white/10">
                                <button className="w-full flex items-center justify-center gap-2 bg-brand-green/10 text-brand-green py-3 rounded-xl font-bold border border-brand-green/20">
                                    <PhoneCall size={20} />
                                    Call Shop
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
