import React from 'react';
import { motion } from 'framer-motion';
import { Battery, Shield, CheckCircle } from 'lucide-react';

const PreOwned = () => {
    const phones = [
        {
            id: 1,
            model: "iPhone 13 Pro",
            storage: "128GB",
            color: "Sierra Blue",
            price: "₹48,000",
            originalPrice: "₹1,19,900",
            battery: "92%",
            condition: "Excellent",
            image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=2670&auto=format&fit=crop"
        },
        {
            id: 2,
            model: "Samsung S23 Ultra",
            storage: "256GB",
            color: "Phantom Black",
            price: "₹65,000",
            originalPrice: "₹1,24,999",
            battery: "100%",
            condition: "Like New",
            image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=2671&auto=format&fit=crop"
        },
        {
            id: 3,
            model: "OnePlus 11 5G",
            storage: "128GB",
            color: "Titan Black",
            price: "₹32,000",
            originalPrice: "₹56,999",
            battery: "95%",
            condition: "Good",
            image: "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?q=80&w=2672&auto=format&fit=crop"
        },
        {
            id: 4,
            model: "iPhone 14",
            storage: "128GB",
            color: "Midnight",
            price: "₹42,000",
            originalPrice: "₹69,900",
            battery: "89%",
            condition: "Fair",
            image: "https://images.unsplash.com/photo-1678652197831-2d180705cd2c?q=80&w=2670&auto=format&fit=crop"
        }
    ];

    return (
        <section id="pre-owned" className="py-24 bg-brand-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-brand-green font-semibold tracking-wider uppercase text-sm mb-2 block">Certified Value</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Budget Friendly & <span className="text-gray-500 line-through decoration-brand-red decoration-2">Risky</span> <span className="text-brand-green">Verified</span></h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">Every pre-owned device undergoes a 52-point quality check. 100% Genuine. Warranty included.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {phones.map((phone, index) => (
                        <motion.div
                            key={phone.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-brand-green/50 transition-colors group"
                        >
                            <div className="relative h-48 bg-gray-800 overflow-hidden">
                                <img src={phone.image} alt={phone.model} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute top-2 right-2 bg-brand-green text-black text-xs font-bold px-2 py-1 rounded-full">
                                    {phone.condition}
                                </div>
                            </div>

                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-lg font-bold text-white leading-tight">{phone.model}</h3>
                                        <p className="text-sm text-gray-400">{phone.storage} • {phone.color}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 my-3 text-xs font-medium text-gray-300 bg-black/40 p-2 rounded-lg border border-white/5">
                                    <div className="flex items-center gap-1">
                                        <Battery size={12} className="text-brand-green" />
                                        <span>{phone.battery}</span>
                                    </div>
                                    <div className="w-px h-3 bg-gray-600"></div>
                                    <div className="flex items-center gap-1">
                                        <Shield size={12} className="text-brand-green" />
                                        <span>Warranty</span>
                                    </div>
                                </div>

                                <div className="flex items-end justify-between mt-4">
                                    <div>
                                        <p className="text-xs text-gray-500 line-through">{phone.originalPrice}</p>
                                        <p className="text-xl font-bold text-white">{phone.price}</p>
                                    </div>
                                    <button className="bg-white text-black p-2 rounded-full hover:bg-brand-green transition-colors">
                                        <CheckCircle size={20} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PreOwned;
