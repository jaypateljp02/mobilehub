import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Battery, Shield, CheckCircle, ChevronRight } from 'lucide-react';

const PreOwned = () => {
    const phones = [
        {
            id: 1,
            model: "iPhone 15 Pro",
            storage: "128GB",
            color: "Natural Titanium",
            battery: "98% BH",
            condition: "Like New",
            price: "₹84,900",
            originalPrice: "₹1,34,900",
            image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=2670&auto=format&fit=crop"
        },
        {
            id: 2,
            model: "Samsung Galaxy S23 Ultra",
            storage: "256GB",
            color: "Phantom Black",
            battery: "Perfect",
            condition: "Excellent",
            price: "₹74,900",
            originalPrice: "₹1,24,900",
            image: "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?q=80&w=2670&auto=format&fit=crop"
        },
        {
            id: 3,
            model: "iPhone 14 Plus",
            storage: "128GB",
            color: "Blue",
            battery: "92% BH",
            condition: "Pristine",
            price: "₹52,900",
            originalPrice: "₹89,900",
            image: "https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?q=80&w=2670&auto=format&fit=crop"
        },
        {
            id: 4,
            model: "OnePlus 11 5G",
            storage: "16GB/256GB",
            color: "Eternal Green",
            battery: "Original",
            condition: "Superb",
            price: "₹38,900",
            originalPrice: "₹61,999",
            image: "https://images.unsplash.com/photo-1675704174309-883ec3802956?q=80&w=2670&auto=format&fit=crop"
        }
    ];

    return (
        <section id="pre-owned" className="py-24 bg-white dark:bg-brand-black transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-brand-green font-semibold tracking-wider uppercase text-sm mb-2 block">Certified Value</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-brand-black dark:text-white mb-4">Budget Friendly & <span className="text-gray-400 dark:text-gray-500 line-through decoration-brand-red decoration-2">Risky</span> <span className="text-brand-green">Verified</span></h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Every pre-owned device undergoes a 52-point quality check. 100% Genuine. Warranty included.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {phones.map((phone, index) => (
                        <motion.div
                            key={phone.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden hover:border-brand-green/50 dark:hover:border-brand-green/50 transition-all group"
                        >
                            <div className="relative h-48 bg-gray-200 dark:bg-gray-800 overflow-hidden">
                                <img src={phone.image} alt={phone.model} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute top-2 right-2 bg-brand-green text-black text-xs font-bold px-2 py-1 rounded-full">
                                    {phone.condition}
                                </div>
                            </div>

                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-lg font-bold text-brand-black dark:text-white leading-tight">{phone.model}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{phone.storage} • {phone.color}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 my-3 text-xs font-medium text-gray-700 dark:text-gray-300 bg-black/5 dark:bg-black/40 p-2 rounded-lg border border-black/5 dark:border-white/5">
                                    <div className="flex items-center gap-1">
                                        <Battery size={12} className="text-brand-green" />
                                        <span>{phone.battery}</span>
                                    </div>
                                    <div className="w-px h-3 bg-gray-300 dark:bg-gray-600"></div>
                                    <div className="flex items-center gap-1">
                                        <Shield size={12} className="text-brand-green" />
                                        <span>Warranty</span>
                                    </div>
                                </div>

                                <div className="flex items-end justify-between mt-4">
                                    <div>
                                        <p className="text-xs text-gray-400 dark:text-gray-500 line-through">{phone.originalPrice}</p>
                                        <p className="text-xl font-bold text-brand-black dark:text-white">{phone.price}</p>
                                    </div>
                                    <button className="bg-brand-black dark:bg-white text-white dark:text-black p-2 rounded-full hover:bg-brand-green dark:hover:bg-brand-green transition-colors">
                                        <CheckCircle size={20} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All Link */}
                <div className="text-center mt-12">
                    <Link
                        to="/pre-owned"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-brand-green/10 text-brand-green font-bold rounded-full border border-brand-green/20 hover:bg-brand-green hover:text-black transition-all"
                    >
                        View All Pre-Owned Phones
                        <ChevronRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PreOwned;
