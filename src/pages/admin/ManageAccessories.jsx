import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, X, Save, Headphones, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const ManageAccessories = () => {
    const [accessories, setAccessories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({ name: '', brand: '', category: '', price: '', image: '' });

    const categories = ['Earbuds', 'Smartwatch', 'Cases', 'Chargers', 'Cables', 'Speakers'];
    const brands = ['Apple', 'Samsung', 'OnePlus', 'JBL', 'Boat', 'Sony'];

    useEffect(() => { fetchAccessories(); }, []);

    const fetchAccessories = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('accessories').select('*').order('created_at', { ascending: false });
        if (!error) setAccessories(data || []);
        setLoading(false);
    };

    const filteredAccessories = accessories.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({ name: item.name, brand: item.brand, category: item.category, price: item.price, image: item.image || '' });
        setShowModal(true);
    };

    const handleAdd = () => {
        setEditingItem(null);
        setFormData({ name: '', brand: '', category: 'Earbuds', price: '', image: '' });
        setShowModal(true);
    };

    const handleSave = async () => {
        setSaving(true);
        const itemData = {
            name: formData.name,
            brand: formData.brand,
            category: formData.category,
            price: Number(formData.price),
            original_price: Number(formData.price),
            image: formData.image || 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400'
        };

        if (editingItem) {
            await supabase.from('accessories').update(itemData).eq('id', editingItem.id);
        } else {
            await supabase.from('accessories').insert([itemData]);
        }
        setSaving(false);
        setShowModal(false);
        fetchAccessories();
    };

    const handleDelete = async (id) => {
        if (confirm('Delete this accessory?')) {
            await supabase.from('accessories').delete().eq('id', id);
            fetchAccessories();
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-brand-green" size={32} /></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Manage Accessories</h1>
                    <p className="text-gray-400">{accessories.length} accessories</p>
                </div>
                <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2.5 bg-brand-green text-black font-semibold rounded-xl">
                    <Plus size={20} /> Add Accessory
                </button>
            </div>

            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input type="text" placeholder="Search accessories..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800/50 border border-white/10 text-white" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAccessories.map((item) => (
                    <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-800/50 rounded-2xl p-5 border border-white/5">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <p className="text-xs text-brand-green font-medium">{item.brand}</p>
                                <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                                <span className="text-xs text-gray-400">{item.category}</span>
                            </div>
                            <div className="p-2 rounded-lg bg-brand-green/10">
                                <Headphones size={20} className="text-brand-green" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-white">₹{item.price?.toLocaleString()}</span>
                            <div className="flex items-center gap-2">
                                <button onClick={() => handleEdit(item)} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"><Edit2 size={18} /></button>
                                <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400"><Trash2 size={18} /></button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-white/10">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">{editingItem ? 'Edit' : 'Add'} Accessory</h2>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white/5 rounded-lg"><X size={20} className="text-gray-400" /></button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Name</label>
                                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-white/10 text-white" placeholder="Apple AirPods Pro 2" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Brand</label>
                                    <select value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-white/10 text-white">
                                        <option value="">Select</option>
                                        {brands.map(b => <option key={b} value={b}>{b}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Category</label>
                                    <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-white/10 text-white">
                                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Price (₹)</label>
                                <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-white/10 text-white" />
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl border border-white/10 text-white font-medium">Cancel</button>
                            <button onClick={handleSave} disabled={saving} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-green text-black font-semibold">
                                {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Save
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default ManageAccessories;
