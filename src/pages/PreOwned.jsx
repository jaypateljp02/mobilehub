import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Battery, Shield, CheckCircle, Search, ChevronDown, MessageCircle, Heart, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const PreOwnedPage = () => {
    const [phones, setPhones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBrand, setSelectedBrand] = useState('All');
    const [sortBy, setSortBy] = useState('featured');
    const [searchQuery, setSearchQuery] = useState('');

    const brands = ['All', 'Apple', 'Samsung', 'OnePlus', 'Vivo', 'Xiaomi'];

    useEffect(() => {
        fetchPhones();
    }, []);

    const fetchPhones = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('pre_owned').select('*').order('created_at', { ascending: false });
        if (!error && data) {
            setPhones(data);
        }
        setLoading(false);
    };

    const filteredPhones = phones
        .filter(phone => selectedBrand === 'All' || phone.brand === selectedBrand)
        .filter(phone => phone.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
            if (sortBy === 'price-low') return a.price - b.price;
            if (sortBy === 'price-high') return b.price - a.price;
            return 0;
        });

    const getConditionColor = (condition) => {
        switch (condition) {
            case 'Like New': return 'bg-green-500/10 text-green-400 border-green-500/30';
            case 'Excellent': return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
            case 'Pristine': return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
            case 'Good': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
            default: return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
        }
    };

    const handleWhatsAppEnquiry = (phone) => {
        const message = `Hi! I'm interested in pre-owned ${phone.name} at ₹${phone.price?.toLocaleString()}. Battery: ${phone.battery}. Is it available?`;
        window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank');
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center bg-white dark:bg-brand-black">
                <Loader2 className="animate-spin text-brand-green" size={40} />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-brand-black transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-brand-black dark:text-white mb-4">
                        Certified <span className="text-brand-green">Pre-Owned</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                        Quality-checked phones with warranty. Save big on premium devices.
                    </p>
                </motion.div>

                {/* Trust Badges */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                    {[
                        { icon: CheckCircle, title: '52-Point Check', desc: 'Rigorous quality inspection' },
                        { icon: Shield, title: '6 Month Warranty', desc: 'Full coverage guarantee' },
                        { icon: Battery, title: 'Battery Health', desc: 'Verified battery condition' }
                    ].map((item, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-4 p-4 rounded-2xl bg-brand-green/5 border border-brand-green/20">
                            <div className="p-3 rounded-xl bg-brand-green/10"><item.icon className="text-brand-green" size={24} /></div>
                            <div>
                                <h3 className="font-semibold text-brand-black dark:text-white">{item.title}</h3>
                                <p className="text-sm text-gray-500">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Search & Filter */}
                <div className="flex flex-col lg:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input type="text" placeholder="Search pre-owned phones..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-brand-black dark:text-white" />
                    </div>
                    <div className="relative">
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                            className="appearance-none px-6 py-3 pr-12 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-brand-black dark:text-white cursor-pointer">
                            <option value="featured">Featured</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                    </div>
                </div>

                {/* Brand Filters */}
                <div className="flex flex-wrap gap-3 mb-8">
                    {brands.map((brand) => (
                        <button key={brand} onClick={() => setSelectedBrand(brand)}
                            className={`px-5 py-2.5 rounded-full font-medium transition-all ${selectedBrand === brand
                                ? 'bg-brand-green text-black' : 'bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-300'}`}>
                            {brand}
                        </button>
                    ))}
                </div>

                {/* Results */}
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Showing <span className="text-brand-green font-semibold">{filteredPhones.length}</span> pre-owned phones
                </p>

                {/* Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredPhones.map((phone, index) => (
                        <motion.div key={phone.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
                            className="group relative bg-black/5 dark:bg-white/5 rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden hover:border-brand-green/50">

                            {/* Condition Badge */}
                            <div className={`absolute top-4 left-4 z-10 text-xs font-bold px-3 py-1 rounded-full border ${getConditionColor(phone.condition)}`}>
                                {phone.condition}
                            </div>

                            {/* Wishlist */}
                            <button className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-black/50 text-gray-600 hover:text-brand-red">
                                <Heart size={18} />
                            </button>

                            {/* Image */}
                            <Link to={`/phone/${phone.id}`} className="block relative h-48 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
                                <img src={phone.image || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400'} alt={phone.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </Link>

                            {/* Content */}
                            <div className="p-5">
                                <p className="text-xs font-medium text-brand-green mb-1">{phone.brand}</p>
                                <Link to={`/phone/${phone.id}`}>
                                    <h3 className="text-lg font-bold text-brand-black dark:text-white mb-2 hover:text-brand-green">{phone.name}</h3>
                                </Link>

                                {/* Battery & Warranty */}
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                        <Battery size={14} className="text-brand-green" />
                                        <span>{phone.battery}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                        <Shield size={14} className="text-brand-green" />
                                        <span>6M Warranty</span>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <span className="text-xl font-bold text-brand-black dark:text-white">₹{phone.price?.toLocaleString()}</span>
                                        {phone.original_price && (
                                            <span className="ml-2 text-sm text-gray-500 line-through">₹{phone.original_price?.toLocaleString()}</span>
                                        )}
                                    </div>
                                </div>

                                {/* CTA */}
                                <button onClick={() => handleWhatsAppEnquiry(phone)}
                                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-green/10 text-brand-green font-semibold hover:bg-brand-green hover:text-black transition-all">
                                    <MessageCircle size={18} /> Enquire Now
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filteredPhones.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-xl text-gray-500">No pre-owned phones found</p>
                        <button onClick={() => { setSelectedBrand('All'); setSearchQuery(''); }} className="mt-4 text-brand-green hover:underline">Clear filters</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PreOwnedPage;
