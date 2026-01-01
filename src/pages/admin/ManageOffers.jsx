import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, X, Save, Tag, Calendar, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const ManageOffers = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingOffer, setEditingOffer] = useState(null);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({ title: '', discount: '', category: '', valid_till: '' });

    const categories = ['Featured', 'Exchange', 'Bank Offers', 'Festive'];

    useEffect(() => { fetchOffers(); }, []);

    const fetchOffers = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('offers').select('*').order('created_at', { ascending: false });
        if (!error) setOffers(data || []);
        setLoading(false);
    };

    const filteredOffers = offers.filter(offer => offer.title.toLowerCase().includes(searchQuery.toLowerCase()));

    const handleEdit = (offer) => {
        setEditingOffer(offer);
        setFormData({ title: offer.title, discount: offer.discount, category: offer.category, valid_till: offer.valid_till || '' });
        setShowModal(true);
    };

    const handleAdd = () => {
        setEditingOffer(null);
        setFormData({ title: '', discount: '', category: 'Featured', valid_till: '' });
        setShowModal(true);
    };

    const handleSave = async () => {
        setSaving(true);
        const offerData = { title: formData.title, discount: formData.discount, category: formData.category, valid_till: formData.valid_till, active: true };

        if (editingOffer) {
            await supabase.from('offers').update(offerData).eq('id', editingOffer.id);
        } else {
            await supabase.from('offers').insert([offerData]);
        }
        setSaving(false);
        setShowModal(false);
        fetchOffers();
    };

    const handleDelete = async (id) => {
        if (confirm('Delete this offer?')) {
            await supabase.from('offers').delete().eq('id', id);
            fetchOffers();
        }
    };

    const toggleActive = async (id, currentActive) => {
        await supabase.from('offers').update({ active: !currentActive }).eq('id', id);
        fetchOffers();
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case 'Featured': return 'bg-brand-green/10 text-brand-green';
            case 'Exchange': return 'bg-blue-500/10 text-blue-400';
            case 'Bank Offers': return 'bg-purple-500/10 text-purple-400';
            default: return 'bg-orange-500/10 text-orange-400';
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-brand-green" size={32} /></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Manage Offers</h1>
                    <p className="text-gray-400">{offers.length} offers</p>
                </div>
                <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2.5 bg-brand-green text-black font-semibold rounded-xl">
                    <Plus size={20} /> Create Offer
                </button>
            </div>

            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input type="text" placeholder="Search offers..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800/50 border border-white/10 text-white" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredOffers.map((offer) => (
                    <motion.div key={offer.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`bg-gray-800/50 rounded-2xl p-5 border ${offer.active ? 'border-brand-green/30' : 'border-white/5 opacity-60'}`}>
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${getCategoryColor(offer.category)}`}>{offer.category}</span>
                                <h3 className="text-lg font-semibold text-white">{offer.title}</h3>
                            </div>
                            <button onClick={() => toggleActive(offer.id, offer.active)} className={`px-3 py-1 rounded-full text-xs font-medium ${offer.active ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                {offer.active ? 'Active' : 'Inactive'}
                            </button>
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-2 text-brand-green"><Tag size={16} /><span className="font-semibold">{offer.discount}</span></div>
                            {offer.valid_till && <div className="flex items-center gap-2 text-gray-400"><Calendar size={16} /><span className="text-sm">{offer.valid_till}</span></div>}
                        </div>
                        <div className="flex items-center justify-end gap-2">
                            <button onClick={() => handleEdit(offer)} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"><Edit2 size={18} /></button>
                            <button onClick={() => handleDelete(offer.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400"><Trash2 size={18} /></button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-white/10">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">{editingOffer ? 'Edit Offer' : 'Create Offer'}</h2>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white/5 rounded-lg"><X size={20} className="text-gray-400" /></button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Offer Title</label>
                                <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-white/10 text-white" placeholder="iPhone 16 Launch Offer" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Discount</label>
                                <input type="text" value={formData.discount} onChange={(e) => setFormData({ ...formData, discount: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-white/10 text-white" placeholder="₹15,000 OFF" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Category</label>
                                    <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-white/10 text-white">
                                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Valid Till</label>
                                    <input type="date" value={formData.valid_till} onChange={(e) => setFormData({ ...formData, valid_till: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-white/10 text-white" />
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

export default ManageOffers;
