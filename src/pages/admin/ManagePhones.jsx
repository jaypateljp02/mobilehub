import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, X, Save, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const ManagePhones = () => {
    const [phones, setPhones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingPhone, setEditingPhone] = useState(null);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({ name: '', brand: '', price: '', stock: '', image: '' });

    // Fetch phones from Supabase
    useEffect(() => {
        fetchPhones();
    }, []);

    const fetchPhones = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('phones').select('*').order('created_at', { ascending: false });
        if (!error) setPhones(data || []);
        setLoading(false);
    };

    const filteredPhones = phones.filter(phone =>
        phone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        phone.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEdit = (phone) => {
        setEditingPhone(phone);
        setFormData({ name: phone.name, brand: phone.brand, price: phone.price, stock: phone.stock || 0, image: phone.image || '' });
        setShowModal(true);
    };

    const handleAdd = () => {
        setEditingPhone(null);
        setFormData({ name: '', brand: '', price: '', stock: '10', image: '' });
        setShowModal(true);
    };

    const handleSave = async () => {
        setSaving(true);
        const phoneData = {
            name: formData.name,
            brand: formData.brand,
            price: Number(formData.price),
            original_price: Number(formData.price),
            stock: Number(formData.stock),
            image: formData.image || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600'
        };

        if (editingPhone) {
            await supabase.from('phones').update(phoneData).eq('id', editingPhone.id);
        } else {
            await supabase.from('phones').insert([phoneData]);
        }

        setSaving(false);
        setShowModal(false);
        fetchPhones();
    };

    const handleDelete = async (id) => {
        if (confirm('Delete this phone?')) {
            await supabase.from('phones').delete().eq('id', id);
            fetchPhones();
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="animate-spin text-brand-green" size={32} />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Manage Phones</h1>
                    <p className="text-gray-400">{phones.length} phones in database</p>
                </div>
                <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2.5 bg-brand-green text-black font-semibold rounded-xl">
                    <Plus size={20} /> Add Phone
                </button>
            </div>

            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search phones..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none"
                />
            </div>

            <div className="bg-gray-800/50 rounded-2xl border border-white/5 overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="text-left py-4 px-6 text-gray-400 font-medium">Phone</th>
                            <th className="text-left py-4 px-6 text-gray-400 font-medium">Brand</th>
                            <th className="text-left py-4 px-6 text-gray-400 font-medium">Price</th>
                            <th className="text-left py-4 px-6 text-gray-400 font-medium">Stock</th>
                            <th className="text-right py-4 px-6 text-gray-400 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPhones.map((phone) => (
                            <tr key={phone.id} className="border-b border-white/5 hover:bg-white/5">
                                <td className="py-4 px-6 text-white font-medium">{phone.name}</td>
                                <td className="py-4 px-6 text-gray-300">{phone.brand}</td>
                                <td className="py-4 px-6 text-white">₹{phone.price?.toLocaleString()}</td>
                                <td className="py-4 px-6 text-gray-300">{phone.stock}</td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center justify-end gap-2">
                                        <button onClick={() => handleEdit(phone)} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white">
                                            <Edit2 size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(phone.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-white/10">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">{editingPhone ? 'Edit Phone' : 'Add Phone'}</h2>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white/5 rounded-lg"><X size={20} className="text-gray-400" /></button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Phone Name</label>
                                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-white/10 text-white" placeholder="iPhone 16 Pro Max" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Brand</label>
                                <select value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-white/10 text-white">
                                    <option value="">Select Brand</option>
                                    <option value="Apple">Apple</option>
                                    <option value="Samsung">Samsung</option>
                                    <option value="OnePlus">OnePlus</option>
                                    <option value="Vivo">Vivo</option>
                                    <option value="Oppo">Oppo</option>
                                    <option value="Xiaomi">Xiaomi</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Price (₹)</label>
                                    <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-white/10 text-white" />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Stock</label>
                                    <input type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-white/10 text-white" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Image URL</label>
                                <input type="text" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-white/10 text-white" placeholder="https://..." />
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5">Cancel</button>
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

export default ManagePhones;
