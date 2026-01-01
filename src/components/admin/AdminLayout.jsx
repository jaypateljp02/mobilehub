import React, { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Smartphone, RefreshCcw, Tag, Wrench, Headphones, LogOut, Menu, ChevronLeft } from 'lucide-react';

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/phones', icon: Smartphone, label: 'Phones' },
        { path: '/admin/pre-owned', icon: RefreshCcw, label: 'Pre-Owned' },
        { path: '/admin/accessories', icon: Headphones, label: 'Accessories' },
        { path: '/admin/offers', icon: Tag, label: 'Offers' },
        { path: '/admin/services', icon: Wrench, label: 'Services' },
    ];

    const isActive = (path) => {
        if (path === '/admin') return location.pathname === '/admin';
        return location.pathname.startsWith(path);
    };

    const handleLogout = () => {
        localStorage.removeItem('adminLoggedIn');
        navigate('/admin');
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-gray-900 flex">
            {/* Sidebar */}
            <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-950 border-r border-white/10 transition-all duration-300 flex flex-col`}>
                <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
                    {sidebarOpen && (
                        <span className="text-xl font-bold text-white">
                            Mobile<span className="text-brand-green">Hub</span>
                        </span>
                    )}
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-white/5 text-gray-400">
                        {sidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <nav className="flex-1 py-4 px-3 space-y-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${isActive(item.path)
                                ? 'bg-brand-green text-black font-semibold'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <item.icon size={20} />
                            {sidebarOpen && <span>{item.label}</span>}
                        </Link>
                    ))}
                </nav>

                <div className="p-3 border-t border-white/10 space-y-1">
                    <Link to="/" className="flex items-center gap-3 px-3 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5">
                        <ChevronLeft size={20} />
                        {sidebarOpen && <span>Back to Site</span>}
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10">
                        <LogOut size={20} />
                        {sidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="h-16 bg-gray-950/50 border-b border-white/10 flex items-center px-6">
                    <h1 className="text-lg font-semibold text-white">Admin Panel</h1>
                </header>
                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
