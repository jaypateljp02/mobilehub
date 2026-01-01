import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, X, Save, Wrench, Clock, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const ManageServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({ name: '', price: '', time: '', category: '' });

    const categories = ['Repair', 'Software', 'Insurance', 'Accessories'];

    useEffect(() => { fetchServices(); }, []);

    const fetchServices = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: false });
        if (!error) setServices(data || []);
        setLoading(false);
    };

    const filteredServices = services.filter(service => service.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const handleEdit = (service) => {
        setEditingService(service);
        setFormData({ name: service.name, price: service.price, time: service.time, category: service.category });
        setShowModal(true);
    };

    const handleAdd = () => {
        setEditingService(null);
        setFormData({ name: '', price: '', time: '', category: 'Repair' });
        setShowModal(true);
    };

    const handleSave = async () => {
        setSaving(true);
        const serviceData = { name: formData.name, price: formData.price, time: formData.time, category: formData.category, active: true };

        if (editingService) {
            await supabase.from('services').update(serviceData).eq('id', editingService.id);
        } else {
            await supabase.from('services').insert([serviceData]);
        }
        setSaving(false);
        setShowModal(false);
        fetchServices();
    };

    const handleDelete = async (id) => {
        if (confirm('Delete this service?')) {
            await supabase.from('services').delete().eq('id', id);
            fetchServices();
        }
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case 'Repair': return 'bg-orange-500/10 text-orange-400';
            case 'Software': return 'bg-blue-500/10 text-blue-400';
            case 'Insurance': return 'bg-green-500/10 text-green-400';
            default: return 'bg-purple-500/10 text-purple-400';
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-brand-green" size={32} /></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Manage Services</h1>
                    <p className="text-gray-400">{services.length} services</p>
                </div>
                <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2.5 bg-brand-green text-black font-semibold rounded-xl">
                    <Plus size={20} /> Add Service
                </button>
            </div>

            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input type="text" placeholder="Search services..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800/50 border border-white/10 text-white" />
            </div>

            <div className="bg-gray-800/50 rounded-2xl border border-white/5 overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="text-left py-4 px-6 text-gray-400 font-medium">Service</th>
                            <th className="text-left py-4 px-6 text-gray-400 font-medium">Category</th>
                            <th className="text-left py-4 px-6 text-gray-400 font-medium">Price</th>
                            <th className="text-left py-4 px-6 text-gray-400 font-medium">Time</th>
                            <th className="text-right py-4 px-6 text-gray-400 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredServices.map((service) => (
                            <tr key={service.id} className="border-b border-white/5 hover:bg-white/5">
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-brand-green/10"><Wrench size={18} className="text-brand-green" /></div>
                                        <span className="text-white font-medium">{service.name}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6"><span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(service.category)}`}>{service.category}</span></td>
                                <td className="py-4 px-6 text-white">{service.price}</td>
                                <td className="py-4 px-6"><div className="flex items-center gap-2 text-gray-300"><Clock size={14} />{service.time}</div></td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center justify-end gap-2">
                                        <button onClick={() => handleEdit(service)} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"><Edit2 size={18} /></button>
                                        <button onClick={() => handleDelete(service.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400"><Trash2 size={18} /></button>
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
                            <h2 className="text-xl font-bold text-white">{editingService ? 'Edit Service' : 'Add Service'}</h2>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white/5 rounded-lg"><X size={20} className="text-gray-400" /></button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Service Name</label>
                                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-white/10 text-white" placeholder="Screen Replacement" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Category</label>
                                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-white/10 text-white">
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Price</label>
                                    <input type="text" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-white/10 text-white" placeholder="From ₹2,999" />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Est. Time</label>
                                    <input type="text" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-white/10 text-white" placeholder="2-3 hours" />
                                </div>
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

export default ManageServices;
