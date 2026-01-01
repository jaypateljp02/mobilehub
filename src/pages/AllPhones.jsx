import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, Star, Heart, ShoppingCart, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const AllPhones = () => {
    const [phones, setPhones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBrand, setSelectedBrand] = useState('All');
    const [sortBy, setSortBy] = useState('featured');
    const [searchQuery, setSearchQuery] = useState('');

    const brands = ['All', 'Apple', 'Samsung', 'OnePlus', 'Vivo', 'Oppo', 'Xiaomi'];

    useEffect(() => {
        fetchPhones();
    }, []);

    const fetchPhones = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('phones').select('*').order('created_at', { ascending: false });
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
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-brand-black dark:text-white mb-4">
                        All <span className="text-brand-green">Smartphones</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">Explore our complete collection</p>
                </motion.div>

                {/* Search and Sort */}
                <div className="flex flex-col lg:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search phones..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-brand-black dark:text-white placeholder-gray-500 focus:outline-none"
                        />
                    </div>
                    <div className="relative">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="appearance-none px-6 py-3 pr-12 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-brand-black dark:text-white cursor-pointer"
                        >
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
                        <button
                            key={brand}
                            onClick={() => setSelectedBrand(brand)}
                            className={`px-5 py-2.5 rounded-full font-medium transition-all ${selectedBrand === brand
                                ? 'bg-brand-green text-black'
                                : 'bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-black/10 dark:hover:bg-white/10'
                                }`}
                        >
                            {brand}
                        </button>
                    ))}
                </div>

                {/* Results */}
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Showing <span className="text-brand-green font-semibold">{filteredPhones.length}</span> smartphones
                </p>

                {/* Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredPhones.map((phone, index) => (
                        <motion.div
                            key={phone.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group relative bg-black/5 dark:bg-white/5 rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden hover:border-brand-green/50 transition-all"
                        >
                            {phone.original_price && phone.price < phone.original_price && (
                                <div className="absolute top-4 left-4 z-10 bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full">
                                    -{Math.round((1 - phone.price / phone.original_price) * 100)}%
                                </div>
                            )}

                            <button className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-black/50 text-gray-600 hover:text-brand-red">
                                <Heart size={18} />
                            </button>

                            <Link to={`/phone/${phone.id}`}>
                                <div className="aspect-square p-6 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900">
                                    <img src={phone.image || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400'} alt={phone.name} className="w-full h-full object-cover rounded-xl" />
                                </div>
                            </Link>

                            <div className="p-5">
                                <p className="text-xs font-medium text-brand-green mb-1">{phone.brand}</p>
                                <Link to={`/phone/${phone.id}`}>
                                    <h3 className="text-lg font-bold text-brand-black dark:text-white mb-2 hover:text-brand-green">{phone.name}</h3>
                                </Link>

                                <div className="flex items-center gap-2 mb-3">
                                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                                    <span className="text-sm font-medium text-brand-black dark:text-white">4.8</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-xl font-bold text-brand-black dark:text-white">₹{phone.price?.toLocaleString()}</span>
                                        {phone.original_price && (
                                            <span className="ml-2 text-sm text-gray-500 line-through">₹{phone.original_price?.toLocaleString()}</span>
                                        )}
                                    </div>
                                    <button className="p-2.5 rounded-xl bg-brand-green/10 text-brand-green hover:bg-brand-green hover:text-black transition-all">
                                        <ShoppingCart size={18} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filteredPhones.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-xl text-gray-500">No phones found</p>
                        <button onClick={() => { setSelectedBrand('All'); setSearchQuery(''); }} className="mt-4 text-brand-green hover:underline">Clear filters</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllPhones;
