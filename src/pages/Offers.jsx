import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, Clock, Percent, ArrowRightLeft, Gift, Sparkles, ChevronRight, Flame } from 'lucide-react';

const Offers = () => {
    const [activeTab, setActiveTab] = useState('all');

    const offers = [
        {
            id: 1,
            type: 'featured',
            title: 'iPhone 16 Pro Launch Offer',
            description: 'Get ₹15,000 off on iPhone 16 Pro with instant bank discount + exchange bonus',
            discount: '₹15,000 OFF',
            validTill: 'Jan 15, 2026',
            image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600',
            tag: 'New Launch',
            color: 'from-purple-500/20 to-blue-500/20',
        },
        {
            id: 2,
            type: 'exchange',
            title: 'Exchange Bonanza',
            description: 'Get up to ₹20,000 extra on exchanging your old phone',
            discount: 'Up to ₹20,000',
            validTill: 'Jan 31, 2026',
            image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600',
            tag: 'Exchange',
            color: 'from-brand-green/20 to-emerald-500/20',
        },
        {
            id: 3,
            type: 'bank',
            title: 'HDFC Bank Card Offer',
            description: '10% instant discount on HDFC Credit & Debit Cards',
            discount: '10% OFF',
            validTill: 'Feb 28, 2026',
            image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600',
            tag: 'Bank Offer',
            color: 'from-blue-500/20 to-cyan-500/20',
        },
        {
            id: 4,
            type: 'festive',
            title: 'New Year Sale',
            description: 'Flat ₹5,000 off on all Samsung flagship phones',
            discount: '₹5,000 OFF',
            validTill: 'Jan 10, 2026',
            image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600',
            tag: 'Limited Time',
            color: 'from-brand-red/20 to-orange-500/20',
        },
        {
            id: 5,
            type: 'exchange',
            title: 'OnePlus Exchange Offer',
            description: 'Exchange any old phone and get OnePlus 12 at ₹54,999',
            discount: '₹10,000 OFF',
            validTill: 'Jan 20, 2026',
            image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600',
            tag: 'Exchange',
            color: 'from-red-500/20 to-pink-500/20',
        },
        {
            id: 6,
            type: 'accessories',
            title: 'Free Accessories Bundle',
            description: 'Get free case + screen guard + earphones worth ₹2,999 on phones above ₹30,000',
            discount: 'FREE Accessories',
            validTill: 'Jan 31, 2026',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
            tag: 'Bundle',
            color: 'from-yellow-500/20 to-amber-500/20',
        },
    ];

    const tabs = [
        { id: 'all', label: 'All Offers', icon: Sparkles },
        { id: 'featured', label: 'Featured', icon: Flame },
        { id: 'exchange', label: 'Exchange', icon: ArrowRightLeft },
        { id: 'bank', label: 'Bank Offers', icon: Percent },
        { id: 'festive', label: 'Festive', icon: Gift },
    ];

    const filteredOffers = activeTab === 'all'
        ? offers
        : offers.filter(offer => offer.type === activeTab);

    return (
        <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-brand-black transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-red/10 text-brand-red mb-4">
                        <Flame size={18} />
                        <span className="font-semibold">Hot Deals</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-brand-black dark:text-white mb-4">
                        Exclusive <span className="text-brand-green">Offers</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                        Discover amazing deals on smartphones, accessories, and more. Limited time offers!
                    </p>
                </motion.div>

                {/* Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${activeTab === tab.id
                                    ? 'bg-brand-green text-black'
                                    : 'bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-black/10 dark:hover:bg-white/10'
                                }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </motion.div>

                {/* Offers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredOffers.map((offer, index) => (
                        <motion.div
                            key={offer.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 hover:border-brand-green/50 transition-all duration-300"
                        >
                            {/* Background Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${offer.color} opacity-50`} />

                            {/* Tag */}
                            <div className="absolute top-4 left-4 z-10">
                                <span className="px-3 py-1 rounded-full bg-brand-green text-black text-xs font-bold">
                                    {offer.tag}
                                </span>
                            </div>

                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={offer.image}
                                    alt={offer.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="relative p-6 bg-white/80 dark:bg-brand-black/80 backdrop-blur-sm">
                                <h3 className="text-xl font-bold text-brand-black dark:text-white mb-2">
                                    {offer.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                                    {offer.description}
                                </p>

                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2 text-brand-green font-bold text-lg">
                                        <Tag size={18} />
                                        {offer.discount}
                                    </div>
                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                        <Clock size={14} />
                                        Till {offer.validTill}
                                    </div>
                                </div>

                                <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-black dark:bg-white text-white dark:text-black font-semibold hover:bg-brand-green hover:text-black transition-all group/btn">
                                    Claim Offer
                                    <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* No Offers State */}
                {filteredOffers.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-xl text-gray-500 dark:text-gray-400">No offers available in this category</p>
                        <button
                            onClick={() => setActiveTab('all')}
                            className="mt-4 text-brand-green hover:underline"
                        >
                            View all offers
                        </button>
                    </div>
                )}

                {/* Newsletter CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center bg-gradient-to-r from-brand-green/10 via-brand-green/5 to-brand-green/10 rounded-3xl p-12 border border-brand-green/20"
                >
                    <Gift className="mx-auto text-brand-green mb-4" size={48} />
                    <h2 className="text-2xl md:text-3xl font-bold text-brand-black dark:text-white mb-4">
                        Never Miss a Deal!
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">
                        Follow us on WhatsApp to get instant notifications about exclusive offers and flash sales.
                    </p>
                    <button
                        onClick={() => {
                            window.open('https://wa.me/919876543210?text=I want to receive offer updates', '_blank');
                        }}
                        className="inline-flex items-center gap-2 bg-brand-green text-black font-bold px-8 py-4 rounded-xl hover:shadow-[0_0_30px_rgba(57,255,20,0.3)] transition-all"
                    >
                        <Sparkles size={20} />
                        Get Offer Updates
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default Offers;
