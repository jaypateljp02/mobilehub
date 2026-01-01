import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff } from 'lucide-react';

const AdminLogin = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    // Simple password - change this to your desired password
    const ADMIN_PASSWORD = 'mobilehub123';

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            localStorage.setItem('adminLoggedIn', 'true');
            onLogin();
        } else {
            setError('Incorrect password');
            setTimeout(() => setError(''), 3000);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-green/10 rounded-2xl mb-4">
                        <Lock size={32} className="text-brand-green" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Admin Login</h1>
                    <p className="text-gray-400 mt-2">Enter password to access admin panel</p>
                </div>

                <form onSubmit={handleLogin} className="bg-gray-800/50 rounded-2xl p-6 border border-white/10">
                    <div className="mb-4">
                        <label className="block text-sm text-gray-400 mb-2">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 pr-12 rounded-xl bg-gray-900 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-brand-green/50"
                                placeholder="Enter admin password"
                                autoFocus
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <p className="text-red-400 text-sm mb-4">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 bg-brand-green text-black font-bold rounded-xl hover:shadow-lg transition-all"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-gray-500 text-sm mt-6">
                    Default password: mobilehub123
                </p>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
