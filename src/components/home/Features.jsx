import React from 'react';
import { ShieldCheck, CreditCard, ArrowRightLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const Features = () => {
    const features = [
        {
            icon: ShieldCheck,
            title: "Genuine Parts",
            description: "100% Authentic components for all repairs and upgrades.",
            color: "text-brand-green"
        },
        {
            icon: CreditCard,
            title: "0% EMI Available",
            description: "Easy finance options on leading credit cards and Bajaj Finserv.",
            color: "text-blue-400"
        },
        {
            icon: ArrowRightLeft,
            title: "Data Transfer",
            description: "Seamless migration of your photos, contacts, and apps to your new device.",
            color: "text-brand-red"
        }
    ];

    return (
        <section className="py-20 bg-brand-black border-y border-white/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-brand-black to-brand-black pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group cursor-default"
                        >
                            <div className={`p-4 rounded-xl bg-white/5 w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <feature.icon size={32} className={feature.color} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
