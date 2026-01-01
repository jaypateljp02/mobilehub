import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, RefreshCcw, Tag, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const stats = [
        { label: 'Phones', value: '7', icon: Smartphone, link: '/admin/phones' },
        { label: 'Pre-Owned', value: '8', icon: RefreshCcw, link: '/admin/pre-owned' },
        { label: 'Offers', value: '4', icon: Tag, link: '/admin/offers' },
        { label: 'Services', value: '6', icon: Wrench, link: '/admin/services' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                <p className="text-gray-400">Welcome to Mobile Hub Admin</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <Link key={stat.label} to={stat.link}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-800/50 rounded-2xl p-6 border border-white/5 hover:border-brand-green/30 transition-all cursor-pointer"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 rounded-xl bg-brand-green/10">
                                    <stat.icon size={24} className="text-brand-green" />
                                </div>
                            </div>
                            <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                            <p className="text-gray-400 text-sm">{stat.label}</p>
                        </motion.div>
                    </Link>
                ))}
            </div>

            <div className="bg-gray-800/50 rounded-2xl p-6 border border-white/5">
                <h2 className="text-lg font-semibold text-white mb-4">Quick Links</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Link to="/admin/phones" className="p-4 rounded-xl bg-white/5 hover:bg-brand-green/10 text-center transition-all">
                        <Smartphone className="mx-auto mb-2 text-brand-green" size={24} />
                        <span className="text-white text-sm">Add Phone</span>
                    </Link>
                    <Link to="/admin/pre-owned" className="p-4 rounded-xl bg-white/5 hover:bg-brand-green/10 text-center transition-all">
                        <RefreshCcw className="mx-auto mb-2 text-brand-green" size={24} />
                        <span className="text-white text-sm">Add Pre-Owned</span>
                    </Link>
                    <Link to="/admin/offers" className="p-4 rounded-xl bg-white/5 hover:bg-brand-green/10 text-center transition-all">
                        <Tag className="mx-auto mb-2 text-brand-green" size={24} />
                        <span className="text-white text-sm">Add Offer</span>
                    </Link>
                    <Link to="/admin/services" className="p-4 rounded-xl bg-white/5 hover:bg-brand-green/10 text-center transition-all">
                        <Wrench className="mx-auto mb-2 text-brand-green" size={24} />
                        <span className="text-white text-sm">Add Service</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
