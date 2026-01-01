import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Battery, Droplets, Wifi, Monitor, HardDrive, Clock, MessageCircle, Shield, CheckCircle, Wrench, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    const icons = { Repair: Monitor, Software: Smartphone, Insurance: Shield, Accessories: HardDrive };

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('services').select('*').eq('active', true).order('created_at', { ascending: false });
        if (!error && data) {
            setServices(data);
        }
        setLoading(false);
    };

    const brands = ['Apple', 'Samsung', 'OnePlus', 'Vivo', 'Oppo', 'Xiaomi', 'Realme', 'Google', 'Nothing', 'Motorola'];

    const handleWhatsAppEnquiry = (service) => {
        const message = `Hi! I need help with ${service.name} for my phone. Please share more details and availability.`;
        window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank');
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case 'Repair': return 'text-orange-500';
            case 'Software': return 'text-blue-500';
            case 'Insurance': return 'text-green-500';
            default: return 'text-purple-500';
        }
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
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-brand-black dark:text-white mb-4">
                        Repair <span className="text-brand-green">Services</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                        Expert repairs by certified technicians. Quick turnaround with genuine parts.
                    </p>
                </motion.div>

                {/* Trust Badges */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    {[
                        { icon: Shield, text: '90 Day Warranty' },
                        { icon: Clock, text: 'Quick Turnaround' },
                        { icon: CheckCircle, text: 'Genuine Parts' },
                        { icon: Smartphone, text: 'All Brands' },
                    ].map((badge, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-6 bg-black/5 dark:bg-white/5 rounded-2xl border border-black/10 dark:border-white/10">
                            <badge.icon className="text-brand-green mb-3" size={32} />
                            <span className="font-medium text-brand-black dark:text-white">{badge.text}</span>
                        </div>
                    ))}
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-black/5 dark:bg-white/5 rounded-2xl border border-black/10 dark:border-white/10 p-6 hover:border-brand-green/50 transition-all"
                        >
                            <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 w-fit mb-4 group-hover:scale-110 transition-transform">
                                <Wrench size={28} className={getCategoryColor(service.category)} />
                            </div>

                            <h3 className="text-xl font-bold text-brand-black dark:text-white mb-2">{service.name}</h3>
                            <p className="text-sm text-gray-500 mb-4">{service.category}</p>

                            <div className="flex items-center justify-between mb-4 pt-4 border-t border-black/10 dark:border-white/10">
                                <div>
                                    <p className="text-sm text-gray-500">Price</p>
                                    <p className="font-semibold text-brand-green">{service.price}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">Est. Time</p>
                                    <p className="font-medium text-brand-black dark:text-white">{service.time}</p>
                                </div>
                            </div>

                            <button onClick={() => handleWhatsAppEnquiry(service)}
                                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-green/10 text-brand-green font-semibold hover:bg-brand-green hover:text-black transition-all">
                                <MessageCircle size={18} /> Book Service
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Brands We Service */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
                    <h2 className="text-2xl font-bold text-brand-black dark:text-white mb-6">Brands We Service</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {brands.map((brand, index) => (
                            <span key={index} className="px-5 py-2.5 bg-black/5 dark:bg-white/5 rounded-full text-gray-600 dark:text-gray-300 font-medium border border-black/10 dark:border-white/10">
                                {brand}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="mt-16 text-center bg-gradient-to-r from-brand-green/10 to-brand-green/5 rounded-3xl p-12 border border-brand-green/20">
                    <h2 className="text-2xl md:text-3xl font-bold text-brand-black dark:text-white mb-4">Can't find your issue?</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">Contact us for a free diagnosis.</p>
                    <button onClick={() => window.open(`https://wa.me/919876543210?text=${encodeURIComponent("Hi! I need help with my phone.")}`, '_blank')}
                        className="inline-flex items-center gap-2 bg-brand-green text-black font-bold px-8 py-4 rounded-xl hover:shadow-[0_0_30px_rgba(57,255,20,0.3)] transition-all">
                        <MessageCircle size={20} /> Get Free Diagnosis
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default Services;
