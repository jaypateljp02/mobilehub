import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black border-t border-white/10 pt-16 pb-8" id="support">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white">Mobile <span className="text-brand-green">Hub</span></h3>
                        <p className="text-gray-400 text-sm">Your Reliable Mobile Partner. Experience the best in class service and premium products.</p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-brand-green transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-brand-green transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-brand-green transition-colors"><Twitter size={20} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#brands" className="hover:text-brand-green transition-colors">Brands</a></li>
                            <li><a href="#accessories" className="hover:text-brand-green transition-colors">Accessories</a></li>
                            <li><a href="#pre-owned" className="hover:text-brand-green transition-colors">Pre-Owned</a></li>
                            <li><a href="#" className="hover:text-brand-green transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold text-white mb-4">Services</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-brand-green transition-colors">Data Transfer</a></li>
                            <li><a href="#" className="hover:text-brand-green transition-colors">Screen Replacement</a></li>
                            <li><a href="#" className="hover:text-brand-green transition-colors">Battery Replacement</a></li>
                            <li><a href="#" className="hover:text-brand-green transition-colors">EMI Finance</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold text-white mb-4">Contact Us</h4>
                        <div className="space-y-3 text-sm text-gray-400">
                            <div className="flex items-start gap-3">
                                <MapPin size={18} className="text-brand-green flex-shrink-0 mt-1" />
                                <p>Shop no- 1, Shivrekar Plaza,<br />Ratnagiri, Maharashtra 415612</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={18} className="text-brand-green flex-shrink-0" />
                                <p>+91 98765 43210</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={18} className="text-brand-green flex-shrink-0" />
                                <p>support@mobilehub.com</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-500">
                    <p>&copy; 2024 Mobile Hub Ratnagiri. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
