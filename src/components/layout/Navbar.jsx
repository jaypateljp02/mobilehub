import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wifi, Home, Smartphone, Wrench, Tag, Info, PhoneCall, Menu, X, Sun, Moon, RefreshCcw, Headphones } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ theme, toggleTheme }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const navLinks = [
        { href: '/phones', icon: Smartphone, label: 'Phones' },
        { href: '/pre-owned', icon: RefreshCcw, label: 'Pre-Owned' },
        { href: '/accessories', icon: Headphones, label: 'Accessories' },
        { href: '/services', icon: Wrench, label: 'Services' },
        { href: '/offers', icon: Tag, label: 'Offers' },
        { href: '/about', icon: Info, label: 'About' },
    ];

    const NavLink = ({ href, icon: Icon, children }) => {
        const isActive = location.pathname === href;
        return (
            <Link
                to={href}
                className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${isActive
                    ? 'text-brand-green'
                    : 'text-gray-400 dark:text-gray-300 hover:text-brand-green dark:hover:text-brand-green'
                    }`}
            >
                {Icon && <Icon size={16} className={isActive ? 'text-brand-green' : 'text-brand-green'} />}
                {children}
            </Link>
        );
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? theme === 'dark' ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-white/80 backdrop-blur-md border-b border-black/10' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo Section */}
                    <Link to="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer group">
                        <div className="relative flex items-baseline">
                            <span className="text-2xl font-bold tracking-tight text-brand-black dark:text-white">Mob</span>
                            <div className="relative flex flex-col items-center mx-[1px]">
                                <Wifi size={14} className="text-brand-green absolute -top-3 animate-pulse" />
                                <span className="text-2xl font-bold text-brand-black dark:text-white">i</span>
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-brand-black dark:text-white">le</span>
                        </div>

                        <div className="relative flex items-baseline ml-2">
                            <div className="relative flex flex-col items-center">
                                <Home size={16} className="text-brand-red absolute -top-3.5" />
                                <span className="text-2xl font-bold text-brand-black dark:text-white">H</span>
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-brand-black dark:text-white">ub</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <NavLink key={link.href} href={link.href} icon={link.icon}>
                                {link.label}
                            </NavLink>
                        ))}
                    </div>

                    {/* CTA and Theme Toggle Button */}
                    <div className="hidden md:flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-full bg-black/5 dark:bg-white/10 text-brand-black dark:text-white hover:bg-black/10 dark:hover:bg-white/20 transition-all duration-300"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <a
                            href="tel:+919876543210"
                            className="flex items-center gap-2 bg-brand-black dark:bg-white/10 text-white px-5 py-2.5 rounded-full backdrop-blur-sm border border-black/10 dark:border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(57,255,20,0.3)]"
                        >
                            <PhoneCall size={18} className="text-brand-green" />
                            <span className="font-semibold">Call Shop</span>
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-black/5 dark:bg-white/10 text-brand-black dark:text-white"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-brand-black dark:text-white p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
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
                        className={`md:hidden absolute top-20 left-0 right-0 backdrop-blur-xl border-b ${theme === 'dark' ? 'bg-brand-black/95 border-white/10' : 'bg-white/95 border-black/10'}`}
                    >
                        <div className="px-4 py-6 space-y-4">
                            <Link to="/" className="block text-lg font-medium text-gray-600 dark:text-gray-300 hover:text-brand-green">Home</Link>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    className={`block text-lg font-medium hover:text-brand-green ${location.pathname === link.href
                                        ? 'text-brand-green'
                                        : 'text-gray-600 dark:text-gray-300'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-black/10 dark:border-white/10">
                                <a
                                    href="tel:+919876543210"
                                    className="w-full flex items-center justify-center gap-2 bg-brand-green/10 text-brand-green py-3 rounded-xl font-bold border border-brand-green/20"
                                >
                                    <PhoneCall size={20} />
                                    Call Shop
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
