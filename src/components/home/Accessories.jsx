import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Watch, Headphones, Smartphone } from 'lucide-react';

const Accessories = () => {
    const categories = [
        {
            id: 1,
            title: "Smart Watches",
            image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2672&auto=format&fit=crop",
            price: "From ₹2,499"
        },
        {
            id: 2,
            title: "TWS Earbuds",
            image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=2670&auto=format&fit=crop",
            price: "From ₹1,299"
        },
        {
            id: 3,
            title: "Premium Covers",
            image: "https://images.unsplash.com/photo-1603351154351-5cf99bc32f1d?q=80&w=2670&auto=format&fit=crop",
            price: "From ₹499"
        },
    ];

    return (
        <section id="accessories" className="py-24 bg-white dark:bg-brand-black relative transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-bold text-brand-black dark:text-white mb-4"
                        >
                            Complete Your <span className="text-brand-green">Look</span>
                        </motion.h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">Premium accessories to enhance your device.</p>
                    </div>
                    <Link to="/accessories" className="text-brand-green font-semibold hover:text-brand-black dark:hover:text-white transition-colors">View All Accessories &rarr;</Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {categories.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="group relative h-[400px] rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-900 border border-black/10 dark:border-white/10"
                        >
                            {/* Background Image */}
                            <img
                                src={item.image}
                                alt={item.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 dark:opacity-60 group-hover:opacity-50 dark:group-hover:opacity-40"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 w-full p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <div className="w-12 h-1 bg-brand-green mb-4 rounded-full"></div>
                                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-gray-200 font-medium">{item.price}</p>

                                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                                    <button className="px-6 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-semibold border border-white/20 hover:bg-brand-green hover:border-brand-green hover:text-black transition-all">
                                        Explore
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

export default Accessories;
