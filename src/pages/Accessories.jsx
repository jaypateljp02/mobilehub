import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Headphones, Watch, Smartphone, Battery, Cable, Speaker, Search, ChevronDown, Star, Heart, ShoppingCart, MessageCircle } from 'lucide-react';

const AccessoriesPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('featured');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = ['All', 'Earbuds', 'Smartwatch', 'Cases', 'Chargers', 'Cables', 'Speakers'];

    const accessories = [
        { id: 1, name: 'Apple AirPods Pro 2', category: 'Earbuds', price: 24900, originalPrice: 26900, image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400', rating: 4.9, reviews: 342, brand: 'Apple' },
        { id: 2, name: 'Samsung Galaxy Buds3 Pro', category: 'Earbuds', price: 17999, originalPrice: 19999, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400', rating: 4.7, reviews: 189, brand: 'Samsung' },
        { id: 3, name: 'Apple Watch Series 9', category: 'Smartwatch', price: 41900, originalPrice: 44900, image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400', rating: 4.8, reviews: 456, brand: 'Apple' },
        { id: 4, name: 'Samsung Galaxy Watch 6', category: 'Smartwatch', price: 28999, originalPrice: 32999, image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400', rating: 4.6, reviews: 234, brand: 'Samsung' },
        { id: 5, name: 'iPhone 16 Pro Silicone Case', category: 'Cases', price: 4900, originalPrice: 4900, image: 'https://images.unsplash.com/photo-1603351154351-5cf99bc32f1d?w=400', rating: 4.5, reviews: 89, brand: 'Apple' },
        { id: 6, name: 'Samsung S24 Ultra Clear Case', category: 'Cases', price: 1999, originalPrice: 2499, image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=400', rating: 4.4, reviews: 156, brand: 'Samsung' },
        { id: 7, name: 'Apple 20W USB-C Charger', category: 'Chargers', price: 1900, originalPrice: 1900, image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400', rating: 4.7, reviews: 567, brand: 'Apple' },
        { id: 8, name: 'Samsung 45W Super Fast Charger', category: 'Chargers', price: 2999, originalPrice: 3499, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400', rating: 4.6, reviews: 234, brand: 'Samsung' },
        { id: 9, name: 'Apple Lightning to USB-C Cable', category: 'Cables', price: 1900, originalPrice: 1900, image: 'https://images.unsplash.com/photo-1589739900266-43b2843f4c12?w=400', rating: 4.5, reviews: 890, brand: 'Apple' },
        { id: 10, name: 'JBL Flip 6 Speaker', category: 'Speakers', price: 11999, originalPrice: 14999, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400', rating: 4.8, reviews: 345, brand: 'JBL' },
        { id: 11, name: 'OnePlus Buds Pro 2', category: 'Earbuds', price: 9999, originalPrice: 11999, image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400', rating: 4.5, reviews: 178, brand: 'OnePlus' },
        { id: 12, name: 'Boat Airdopes 441', category: 'Earbuds', price: 1499, originalPrice: 2990, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400', rating: 4.2, reviews: 2345, brand: 'Boat' },
    ];

    const filteredAccessories = accessories
        .filter(item => selectedCategory === 'All' || item.category === selectedCategory)
        .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
            if (sortBy === 'price-low') return a.price - b.price;
            if (sortBy === 'price-high') return b.price - a.price;
            if (sortBy === 'rating') return b.rating - a.rating;
            return 0;
        });

    const handleWhatsAppEnquiry = (item) => {
        const message = `Hi! I'm interested in ${item.name} at ₹${item.price.toLocaleString()}. Is it available?`;
        window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-brand-black transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-brand-black dark:text-white mb-4">
                        Premium <span className="text-brand-green">Accessories</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                        Complete your setup with genuine accessories from top brands
                    </p>
                </motion.div>

                {/* Category Icons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-12"
                >
                    {[
                        { icon: Headphones, label: 'Earbuds' },
                        { icon: Watch, label: 'Smartwatch' },
                        { icon: Smartphone, label: 'Cases' },
                        { icon: Battery, label: 'Chargers' },
                        { icon: Cable, label: 'Cables' },
                        { icon: Speaker, label: 'Speakers' },
                    ].map((cat, index) => (
                        <button
                            key={cat.label}
                            onClick={() => setSelectedCategory(cat.label)}
                            className={`flex flex-col items-center p-4 rounded-2xl border transition-all ${selectedCategory === cat.label
                                ? 'bg-brand-green/10 border-brand-green text-brand-green'
                                : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:border-brand-green/50'
                                }`}
                        >
                            <cat.icon size={28} className="mb-2" />
                            <span className="text-sm font-medium">{cat.label}</span>
                        </button>
                    ))}
                </motion.div>

                {/* Search and Filters */}
                <div className="flex flex-col lg:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search accessories..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-brand-black dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-green/50"
                        />
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setSelectedCategory('All')}
                            className={`px-5 py-3 rounded-xl font-medium transition-all ${selectedCategory === 'All'
                                ? 'bg-brand-green text-black'
                                : 'bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-300'
                                }`}
                        >
                            All
                        </button>
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="appearance-none px-6 py-3 pr-12 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-brand-black dark:text-white focus:outline-none cursor-pointer"
                            >
                                <option value="featured">Featured</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Highest Rated</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Showing <span className="text-brand-green font-semibold">{filteredAccessories.length}</span> accessories
                </p>

                {/* Accessories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredAccessories.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group relative bg-black/5 dark:bg-white/5 rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden hover:border-brand-green/50 transition-all duration-300"
                        >
                            {/* Discount Badge */}
                            {item.price < item.originalPrice && (
                                <div className="absolute top-4 left-4 z-10 bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full">
                                    -{Math.round((1 - item.price / item.originalPrice) * 100)}%
                                </div>
                            )}

                            {/* Wishlist */}
                            <button className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-black/50 text-gray-600 dark:text-gray-300 hover:text-brand-red transition-colors">
                                <Heart size={18} />
                            </button>

                            {/* Image */}
                            <div className="aspect-square p-6 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 group-hover:scale-105 transition-transform duration-500">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover rounded-xl"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <p className="text-xs font-medium text-brand-green mb-1">{item.brand}</p>
                                <h3 className="text-lg font-bold text-brand-black dark:text-white mb-1 group-hover:text-brand-green transition-colors">
                                    {item.name}
                                </h3>
                                <p className="text-sm text-gray-500 mb-3">{item.category}</p>

                                {/* Rating */}
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="flex items-center gap-1">
                                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                                        <span className="text-sm font-medium text-brand-black dark:text-white">{item.rating}</span>
                                    </div>
                                    <span className="text-xs text-gray-500">({item.reviews} reviews)</span>
                                </div>

                                {/* Price */}
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <span className="text-xl font-bold text-brand-black dark:text-white">
                                            ₹{item.price.toLocaleString()}
                                        </span>
                                        {item.price < item.originalPrice && (
                                            <span className="ml-2 text-sm text-gray-500 line-through">
                                                ₹{item.originalPrice.toLocaleString()}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* CTA */}
                                <button
                                    onClick={() => handleWhatsAppEnquiry(item)}
                                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-green/10 text-brand-green font-semibold hover:bg-brand-green hover:text-black transition-all"
                                >
                                    <MessageCircle size={18} />
                                    Enquire
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredAccessories.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-xl text-gray-500 dark:text-gray-400">No accessories found matching your criteria</p>
                        <button
                            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                            className="mt-4 text-brand-green hover:underline"
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccessoriesPage;
