import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const FloatingChat = () => {
    return (
        <motion.a
            href="https://wa.me/919876543210" // Replace with actual number
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="fixed bottom-6 right-6 z-50 bg-brand-green text-black p-4 rounded-full shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:scale-110 transition-transform cursor-pointer group"
        >
            <MessageCircle size={28} fill="currentColor" className="text-black group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-brand-black dark:bg-white text-white dark:text-black text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Chat with us
            </span>
        </motion.a>
    );
};

export default FloatingChat;
