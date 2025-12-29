import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Star } from 'lucide-react';

const Hero = () => {
    return (
        <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-brand-black">
            {/* Background with Gradient Overlay */}
            <div className="absolute inset-0 z-0">
                {/* Placeholder for high-quality product image */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-brand-black to-brand-black opacity-80"></div>
                {/* Abstract glow effects */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-green/20 rounded-full blur-[128px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-red/10 rounded-full blur-[128px]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between w-full h-full pt-20">

                {/* Text Content */}
                <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
                    >
                        <Star size={14} className="text-brand-green fill-brand-green" />
                        <span className="text-xs font-semibold tracking-wider uppercase text-gray-300">Authorized Retailer</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight"
                    >
                        The Future <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">is Here.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-lg md:text-xl text-gray-400 max-w-lg mx-auto md:mx-0"
                    >
                        Experience the latest technology with the iPhone 16 Pro and Samsung S24 Ultra. Your reliable mobile partner in Ratnagiri.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start"
                    >
                        <button className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-transform hover:scale-105">
                            <div className="absolute inset-0 bg-brand-green opacity-0 group-hover:opacity-20 transition-opacity" />
                            <span className="relative flex items-center gap-2">
                                Shop Now <ChevronRight size={20} />
                            </span>
                        </button>
                        <button className="px-8 py-4 text-white font-semibold rounded-full border border-white/20 hover:bg-white/5 transition-colors">
                            View Offers
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="pt-8 flex items-center gap-6 justify-center md:justify-start grayscale opacity-60"
                    >
                        {/* Simple text or SVG logos for brands */}
                        <span className="text-xl font-bold font-sans">Apple</span>
                        <span className="text-xl font-bold font-sans">Samsung</span>
                        <span className="text-xl font-bold font-sans">Vivo</span>
                        <span className="text-xl font-bold font-sans">OnePlus</span>
                    </motion.div>
                </div>

                {/* Hero Image / Visual */}
                <div className="w-full md:w-1/2 h-[50vh] md:h-auto relative mt-10 md:mt-0 flex items-center justify-center">
                    {/* We will eventually put a 3D model or high-res image here. For now, a stylized CSS phone representation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative w-[280px] h-[580px] bg-black border-[12px] border-gray-800 rounded-[3rem] shadow-2xl shadow-brand-green/20 overflow-hidden ring-1 ring-white/20"
                    >
                        {/* Screen Content */}
                        <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black relative">
                            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1621330381928-846822129048?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-80 mix-blend-overlay"></div>
                            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-32 h-8 bg-black rounded-full flex items-center justify-center space-x-2 z-20">
                                {/* Dynamic Island */}
                            </div>
                            {/* Time */}
                            <div className="absolute top-12 left-1/2 -translate-x-1/2 text-white font-bold tracking-widest text-6xl opacity-20">16:04</div>
                        </div>
                    </motion.div>

                    {/* Floating Element behind */}
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -right-8 top-1/2 w-[260px] h-[540px] bg-black border-[10px] border-gray-700 rounded-[2.5rem] shadow-2xl -z-10 opacity-60 grayscale blur-[1px]"
                    >
                    </motion.div>
                </div>

            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
            >
                <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-2">
                    <div className="w-1 h-3 bg-white/50 rounded-full"></div>
                </div>
            </motion.div>
        </div>
    );
};

export default Hero;
