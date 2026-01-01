import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, X, Save, Battery, Shield, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const ManagePreOwned = () => {
    const [phones, setPhones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingPhone, setEditingPhone] = useState(null);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({ name: '', brand: '', price: '', battery: '', condition: '', image: '' });

    const conditions = ['Like New', 'Excellent', 'Pristine', 'Superb', 'Good', 'Fair'];

    useEffect(() => { fetchPhones(); }, []);

    const fetchPhones = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('pre_owned').select('*').order('created_at', { ascending: false });
        if (!error) setPhones(data || []);
        setLoading(false);
    };

    const filteredPhones = phones.filter(phone => phone.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const handleEdit = (phone) => {
        setEditingPhone(phone);
        setFormData({ name: phone.name, brand: phone.brand, price: phone.price, battery: phone.battery, condition: phone.condition, image: phone.image || '' });
        setShowModal(true);
    };

    const handleAdd = () => {
        setEditingPhone(null);
        setFormData({ name: '', brand: '', price: '', battery: '95%', condition: 'Like New', image: '' });
        setShowModal(true);
    };

    const handleSave = async () => {
        setSaving(true);
        const phoneData = {
            name: formData.name,
            brand: formData.brand,
            price: Number(formData.price),
            original_price: Math.round(Number(formData.price) * 1.4),
            battery: formData.battery,
            condition: formData.condition,
            image: formData.image || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600'
        };

        if (editingPhone) {
            await supabase.from('pre_owned').update(phoneData).eq('id', editingPhone.id);
        } else {
            await supabase.from('pre_owned').insert([phoneData]);
        }
        setSaving(false);
        setShowModal(false);
        fetchPhones();
    };

    const handleDelete = async (id) => {
        if (confirm('Delete this phone?')) {
            await supabase.from('pre_owned').delete().eq('id', id);
            fetchPhones();
        }
    };

    const getConditionColor = (condition) => {
        switch (condition) {
            case 'Like New': return 'bg-green-500/10 text-green-400';
            case 'Excellent': return 'bg-blue-500/10 text-blue-400';
            case 'Pristine': return 'bg-purple-500/10 text-purple-400';
            case 'Good': return 'bg-yellow-500/10 text-yellow-400';
            default: return 'bg-gray-500/10 text-gray-400';
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-brand-green" size={32} /></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Pre-Owned Phones</h1>
                    <p className="text-gray-400">{phones.length} pre-owned phones</p>
                </div>
                <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2.5 bg-brand-green text-black font-semibold rounded-xl">
                    <Plus size={20} /> Add Pre-Owned
                </button>
            </div>

            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800/50 border border-white/10 text-white" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPhones.map((phone) => (
                    <motion.div key={phone.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-800/50 rounded-2xl p-5 border border-white/5">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <p className="text-xs text-brand-green font-medium">{phone.brand}</p>
                                <h3 className="text-lg font-semibold text-white">{phone.name}</h3>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getConditionColor(phone.condition)}`}>{phone.condition}</span>
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-2 text-gray-400">
                                <Battery size={16} className="text-brand-green" />
                                <span className="text-sm">{phone.battery}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <Shield size={16} className="text-brand-green" />
                                <span className="text-sm">6M Warranty</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-white">₹{phone.price?.toLocaleString()}</span>
                            <div className="flex items-center gap-2">
                                <button onClick={() => handleEdit(phone)} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"><Edit2 size={18} /></button>
                                <button onClick={() => handleDelete(phone.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400"><Trash2 size={18} /></button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-white/10">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">{editingPhone ? 'Edit' : 'Add'} Pre-Owned</h2>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white/5 rounded-lg"><X size={20} className="text-gray-400" /></button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Phone Name</label>
                                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-white/10 text-white" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Brand</label>
                                <select value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-white/10 text-white">
                                    <option value="">Select</option>
                                    <option value="Apple">Apple</option>
                                    <option value="Samsung">Samsung</option>
                                    <option value="OnePlus">OnePlus</option>
                                    <option value="Vivo">Vivo</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Price (₹)</label>
                                    <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-white/10 text-white" />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Battery</label>
                                    <input type="text" value={formData.battery} onChange={(e) => setFormData({ ...formData, battery: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-white/10 text-white" placeholder="95%" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Condition</label>
                                <select value={formData.condition} onChange={(e) => setFormData({ ...formData, condition: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-white/10 text-white">
                                    {conditions.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
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

export default ManagePreOwned;
