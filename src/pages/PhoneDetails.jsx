import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Star, Heart, Share2, Shield, Truck, RefreshCcw, MessageCircle, ChevronDown, ChevronUp, Calculator, Battery } from 'lucide-react';

// All phones database - includes both new and pre-owned
const allPhones = [
    // New Phones (IDs 1-12)
    {
        id: 1, name: 'iPhone 16 Pro Max', brand: 'Apple', price: 144900, originalPrice: 159900, rating: 4.9, reviews: 256, type: 'new',
        images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800', 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800', 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800'],
        colors: ['Black', 'White', 'Natural Titanium', 'Desert Titanium'], storage: ['128GB', '256GB', '512GB', '1TB'],
        specs: { display: '6.9" Super Retina XDR OLED, 120Hz', processor: 'A18 Pro Bionic', camera: '48MP + 12MP + 12MP', battery: '4685 mAh', os: 'iOS 18', connectivity: '5G, Wi-Fi 6E' },
        highlights: ['48MP camera system', 'Titanium design', 'Action button', 'All-day battery', 'Emergency SOS via satellite']
    },
    {
        id: 2, name: 'iPhone 16 Pro', brand: 'Apple', price: 119900, originalPrice: 134900, rating: 4.8, reviews: 189, type: 'new',
        images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800', 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800'],
        colors: ['Black', 'White', 'Natural Titanium'], storage: ['128GB', '256GB', '512GB'],
        specs: { display: '6.3" Super Retina XDR OLED', processor: 'A18 Pro Bionic', camera: '48MP + 12MP + 12MP', battery: '4323 mAh', os: 'iOS 18', connectivity: '5G' },
        highlights: ['48MP camera', 'ProMotion display', 'Titanium design', 'Action button']
    },
    {
        id: 3, name: 'Samsung S24 Ultra', brand: 'Samsung', price: 129999, originalPrice: 149999, rating: 4.8, reviews: 342, type: 'new',
        images: ['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800', 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800'],
        colors: ['Phantom Black', 'Titanium Gray', 'Violet'], storage: ['256GB', '512GB', '1TB'],
        specs: { display: '6.8" Dynamic AMOLED 2X', processor: 'Snapdragon 8 Gen 3', camera: '200MP + 12MP + 50MP + 10MP', battery: '5000 mAh', os: 'Android 14', connectivity: '5G' },
        highlights: ['200MP camera', 'S Pen included', 'AI features', 'Titanium frame']
    },
    {
        id: 4, name: 'Samsung S24+', brand: 'Samsung', price: 99999, originalPrice: 114999, rating: 4.7, reviews: 198, type: 'new',
        images: ['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800'],
        colors: ['Phantom Black', 'Marble Gray'], storage: ['256GB', '512GB'],
        specs: { display: '6.7" Dynamic AMOLED 2X', processor: 'Exynos 2400', camera: '50MP + 12MP + 10MP', battery: '4900 mAh', os: 'Android 14', connectivity: '5G' },
        highlights: ['50MP camera', 'AI features', '120Hz display']
    },
    {
        id: 5, name: 'OnePlus 12', brand: 'OnePlus', price: 64999, originalPrice: 69999, rating: 4.6, reviews: 421, type: 'new',
        images: ['https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800'],
        colors: ['Flowy Emerald', 'Silky Black'], storage: ['256GB', '512GB'],
        specs: { display: '6.82" LTPO AMOLED', processor: 'Snapdragon 8 Gen 3', camera: '50MP + 48MP + 64MP', battery: '5400 mAh', os: 'Android 14', connectivity: '5G' },
        highlights: ['Hasselblad camera', '100W fast charging', '2K display']
    },
    {
        id: 6, name: 'OnePlus 12R', brand: 'OnePlus', price: 42999, originalPrice: 45999, rating: 4.5, reviews: 356, type: 'new',
        images: ['https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800'],
        colors: ['Iron Gray', 'Cool Blue'], storage: ['128GB', '256GB'],
        specs: { display: '6.78" LTPO AMOLED', processor: 'Snapdragon 8 Gen 2', camera: '50MP + 8MP + 2MP', battery: '5500 mAh', os: 'Android 14', connectivity: '5G' },
        highlights: ['100W fast charging', 'Gaming performance', 'Large battery']
    },
    {
        id: 7, name: 'Vivo X100 Pro', brand: 'Vivo', price: 89999, originalPrice: 99999, rating: 4.5, reviews: 167, type: 'new',
        images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600'],
        colors: ['Asteroid Black', 'Stardust Blue'], storage: ['256GB', '512GB'],
        specs: { display: '6.78" LTPO AMOLED', processor: 'Dimensity 9300', camera: '50MP + 50MP + 50MP', battery: '5400 mAh', os: 'Android 14', connectivity: '5G' },
        highlights: ['Zeiss optics', 'Professional camera', '100W charging']
    },

    // Pre-Owned Phones (IDs 101-108)
    {
        id: 101, name: 'iPhone 15 Pro', brand: 'Apple', price: 84900, originalPrice: 134900, rating: 4.9, reviews: 45, type: 'pre-owned',
        battery: '98%', condition: 'Like New', color: 'Natural Titanium', storageSize: '128GB',
        images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800', 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800'],
        colors: ['Natural Titanium'], storage: ['128GB'],
        specs: { display: '6.1" Super Retina XDR', processor: 'A17 Pro Bionic', camera: '48MP + 12MP + 12MP', batteryHealth: '98%', os: 'iOS 17', warranty: '6 months' },
        highlights: ['Like new condition', '98% battery health', '52-point certified', '6 month warranty', 'Complete accessories']
    },
    {
        id: 102, name: 'Samsung Galaxy S23 Ultra', brand: 'Samsung', price: 74900, originalPrice: 124900, rating: 4.8, reviews: 32, type: 'pre-owned',
        battery: '95%', condition: 'Excellent', color: 'Phantom Black', storageSize: '256GB',
        images: ['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800'],
        colors: ['Phantom Black'], storage: ['256GB'],
        specs: { display: '6.8" Dynamic AMOLED 2X', processor: 'Snapdragon 8 Gen 2', camera: '200MP + 12MP + 10MP + 10MP', batteryHealth: '95%', os: 'Android 14', warranty: '6 months' },
        highlights: ['Excellent condition', '95% battery health', 'S Pen included', '6 month warranty']
    },
    {
        id: 103, name: 'iPhone 14 Plus', brand: 'Apple', price: 52900, originalPrice: 89900, rating: 4.7, reviews: 28, type: 'pre-owned',
        battery: '92%', condition: 'Pristine', color: 'Blue', storageSize: '128GB',
        images: ['https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800'],
        colors: ['Blue'], storage: ['128GB'],
        specs: { display: '6.7" Super Retina XDR', processor: 'A15 Bionic', camera: '12MP + 12MP', batteryHealth: '92%', os: 'iOS 17', warranty: '6 months' },
        highlights: ['Pristine condition', '92% battery health', 'Large display', '6 month warranty']
    },
    {
        id: 104, name: 'OnePlus 11 5G', brand: 'OnePlus', price: 38900, originalPrice: 61999, rating: 4.6, reviews: 41, type: 'pre-owned',
        battery: '100%', condition: 'Superb', color: 'Eternal Green', storageSize: '256GB',
        images: ['https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800'],
        colors: ['Eternal Green'], storage: ['256GB'],
        specs: { display: '6.7" LTPO3 AMOLED', processor: 'Snapdragon 8 Gen 2', camera: '50MP + 48MP + 32MP', batteryHealth: '100%', os: 'Android 14', warranty: '6 months' },
        highlights: ['Superb condition', '100% battery health', 'Hasselblad camera', '6 month warranty']
    },
    {
        id: 105, name: 'iPhone 14 Pro Max', brand: 'Apple', price: 89900, originalPrice: 149900, rating: 4.9, reviews: 52, type: 'pre-owned',
        battery: '94%', condition: 'Excellent', color: 'Deep Purple', storageSize: '256GB',
        images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800'],
        colors: ['Deep Purple'], storage: ['256GB'],
        specs: { display: '6.7" Super Retina XDR', processor: 'A16 Bionic', camera: '48MP + 12MP + 12MP', batteryHealth: '94%', os: 'iOS 17', warranty: '6 months' },
        highlights: ['Excellent condition', '94% battery health', 'Dynamic Island', '6 month warranty']
    },
    {
        id: 106, name: 'Samsung Galaxy S22', brand: 'Samsung', price: 34900, originalPrice: 72999, rating: 4.5, reviews: 38, type: 'pre-owned',
        battery: '90%', condition: 'Good', color: 'Green', storageSize: '128GB',
        images: ['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800'],
        colors: ['Green'], storage: ['128GB'],
        specs: { display: '6.1" Dynamic AMOLED 2X', processor: 'Exynos 2200', camera: '50MP + 12MP + 10MP', batteryHealth: '90%', os: 'Android 14', warranty: '6 months' },
        highlights: ['Good condition', '90% battery health', 'Compact flagship', '6 month warranty']
    },
    {
        id: 107, name: 'Vivo X80 Pro', brand: 'Vivo', price: 42900, originalPrice: 79999, rating: 4.6, reviews: 25, type: 'pre-owned',
        battery: '96%', condition: 'Like New', color: 'Cosmic Black', storageSize: '256GB',
        images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800'],
        colors: ['Cosmic Black'], storage: ['256GB'],
        specs: { display: '6.78" LTPO AMOLED', processor: 'Snapdragon 8 Gen 1', camera: '50MP + 48MP + 12MP + 8MP', batteryHealth: '96%', os: 'Android 13', warranty: '6 months' },
        highlights: ['Like new condition', '96% battery health', 'Zeiss camera', '6 month warranty']
    },
    {
        id: 108, name: 'OnePlus 10 Pro', brand: 'OnePlus', price: 32900, originalPrice: 66999, rating: 4.5, reviews: 33, type: 'pre-owned',
        battery: '91%', condition: 'Excellent', color: 'Emerald Forest', storageSize: '128GB',
        images: ['https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800'],
        colors: ['Emerald Forest'], storage: ['128GB'],
        specs: { display: '6.7" LTPO2 AMOLED', processor: 'Snapdragon 8 Gen 1', camera: '48MP + 50MP + 8MP', batteryHealth: '91%', os: 'Android 14', warranty: '6 months' },
        highlights: ['Excellent condition', '91% battery health', 'Hasselblad camera', '6 month warranty']
    },
];

const PhoneDetails = () => {
    const { id } = useParams();
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedStorage, setSelectedStorage] = useState('');
    const [showEMI, setShowEMI] = useState(false);
    const [emiMonths, setEmiMonths] = useState(12);

    // Find phone by ID
    const phone = allPhones.find(p => p.id === parseInt(id)) || allPhones[0];

    // Set defaults on phone change
    useEffect(() => {
        if (phone) {
            setSelectedColor(phone.colors[0]);
            setSelectedStorage(phone.storage[0]);
            setSelectedImage(0);
        }
    }, [id]);

    const calculateEMI = (principal, months) => {
        return Math.round(principal / months);
    };

    const emi = calculateEMI(phone.price, emiMonths);

    const handleWhatsAppEnquiry = () => {
        const typeText = phone.type === 'pre-owned' ? 'pre-owned ' : '';
        const message = `Hi! I'm interested in the ${typeText}${phone.name} (${selectedColor}, ${selectedStorage}). Price: ₹${phone.price.toLocaleString()}. Please share more details.`;
        window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank');
    };

    const backLink = phone.type === 'pre-owned' ? '/pre-owned' : '/phones';
    const backText = phone.type === 'pre-owned' ? 'Back to Pre-Owned' : 'Back to All Phones';

    return (
        <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-brand-black transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <Link to={backLink} className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-brand-green mb-8 transition-colors">
                    <ChevronLeft size={20} />
                    {backText}
                </Link>

                {/* Pre-owned badge */}
                {phone.type === 'pre-owned' && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 text-brand-green mb-6 ml-4">
                        <Shield size={16} />
                        <span className="font-semibold text-sm">52-Point Certified Pre-Owned</span>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                        <div className="aspect-square rounded-3xl bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 p-8 border border-black/10 dark:border-white/10 relative">
                            {phone.type === 'pre-owned' && phone.condition && (
                                <div className="absolute top-4 left-4 bg-brand-green text-black text-xs font-bold px-3 py-1 rounded-full z-10">
                                    {phone.condition}
                                </div>
                            )}
                            <img src={phone.images[selectedImage]} alt={phone.name} className="w-full h-full object-cover rounded-2xl" />
                        </div>
                        <div className="flex gap-3 overflow-x-auto pb-2">
                            {phone.images.map((img, index) => (
                                <button key={index} onClick={() => setSelectedImage(index)}
                                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === index ? 'border-brand-green' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Product Info */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                        <div>
                            <p className="text-brand-green font-medium mb-2">{phone.brand}</p>
                            <h1 className="text-3xl md:text-4xl font-bold text-brand-black dark:text-white mb-3">{phone.name}</h1>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                    <Star size={18} className="text-yellow-400 fill-yellow-400" />
                                    <span className="font-semibold text-brand-black dark:text-white">{phone.rating}</span>
                                    <span className="text-gray-500">({phone.reviews} reviews)</span>
                                </div>
                                <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-gray-500"><Heart size={20} /></button>
                                <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-gray-500"><Share2 size={20} /></button>
                            </div>
                        </div>

                        {/* Pre-owned specific info */}
                        {phone.type === 'pre-owned' && (
                            <div className="flex items-center gap-4 p-4 bg-brand-green/5 rounded-xl border border-brand-green/20">
                                <div className="flex items-center gap-2">
                                    <Battery className="text-brand-green" size={20} />
                                    <span className="text-brand-black dark:text-white font-medium">{phone.battery} Battery</span>
                                </div>
                                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
                                <div className="flex items-center gap-2">
                                    <Shield className="text-brand-green" size={20} />
                                    <span className="text-brand-black dark:text-white font-medium">6 Month Warranty</span>
                                </div>
                            </div>
                        )}

                        {/* Price */}
                        <div className="py-4 border-y border-black/10 dark:border-white/10">
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl font-bold text-brand-black dark:text-white">₹{phone.price.toLocaleString()}</span>
                                <span className="text-xl text-gray-500 line-through">₹{phone.originalPrice.toLocaleString()}</span>
                                <span className="text-brand-green font-semibold">{Math.round((1 - phone.price / phone.originalPrice) * 100)}% off</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>
                        </div>

                        {/* Color Selection */}
                        <div>
                            <p className="font-medium text-brand-black dark:text-white mb-3">Color: <span className="text-gray-500">{selectedColor}</span></p>
                            <div className="flex flex-wrap gap-3">
                                {phone.colors.map((color) => (
                                    <button key={color} onClick={() => setSelectedColor(color)}
                                        className={`px-4 py-2 rounded-lg border transition-all ${selectedColor === color ? 'border-brand-green bg-brand-green/10 text-brand-green' : 'border-black/10 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:border-brand-green/50'}`}>
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Storage Selection */}
                        <div>
                            <p className="font-medium text-brand-black dark:text-white mb-3">Storage: <span className="text-gray-500">{selectedStorage}</span></p>
                            <div className="flex flex-wrap gap-3">
                                {phone.storage.map((storage) => (
                                    <button key={storage} onClick={() => setSelectedStorage(storage)}
                                        className={`px-5 py-2.5 rounded-lg border font-medium transition-all ${selectedStorage === storage ? 'border-brand-green bg-brand-green/10 text-brand-green' : 'border-black/10 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:border-brand-green/50'}`}>
                                        {storage}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* EMI Calculator */}
                        <div className="bg-black/5 dark:bg-white/5 rounded-2xl p-5 border border-black/10 dark:border-white/10">
                            <button onClick={() => setShowEMI(!showEMI)} className="w-full flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Calculator className="text-brand-green" size={24} />
                                    <div className="text-left">
                                        <p className="font-semibold text-brand-black dark:text-white">0% EMI Available</p>
                                        <p className="text-sm text-gray-500">Starting from ₹{calculateEMI(phone.price, 24).toLocaleString()}/month</p>
                                    </div>
                                </div>
                                {showEMI ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                            </button>
                            {showEMI && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 pt-4 border-t border-black/10 dark:border-white/10">
                                    <p className="text-sm text-gray-500 mb-3">Select EMI tenure:</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {[3, 6, 9, 12, 18, 24].map((months) => (
                                            <button key={months} onClick={() => setEmiMonths(months)}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${emiMonths === months ? 'bg-brand-green text-black' : 'bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300'}`}>
                                                {months}M
                                            </button>
                                        ))}
                                    </div>
                                    <div className="bg-brand-green/10 rounded-xl p-4 text-center">
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Your monthly EMI</p>
                                        <p className="text-2xl font-bold text-brand-green">₹{emi.toLocaleString()}<span className="text-sm font-normal">/month</span></p>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button onClick={handleWhatsAppEnquiry} className="flex-1 flex items-center justify-center gap-2 bg-brand-green text-black font-bold py-4 rounded-xl hover:shadow-[0_0_30px_rgba(57,255,20,0.3)] transition-all">
                                <MessageCircle size={20} />
                                Enquire on WhatsApp
                            </button>
                            <button className="flex-1 py-4 rounded-xl border-2 border-brand-black dark:border-white text-brand-black dark:text-white font-bold hover:bg-brand-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                                Add to Cart
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-4 pt-4">
                            <div className="flex flex-col items-center text-center p-3">
                                <Shield className="text-brand-green mb-2" size={24} />
                                <span className="text-xs text-gray-600 dark:text-gray-400">{phone.type === 'pre-owned' ? '6 Month Warranty' : '1 Year Warranty'}</span>
                            </div>
                            <div className="flex flex-col items-center text-center p-3">
                                <Truck className="text-brand-green mb-2" size={24} />
                                <span className="text-xs text-gray-600 dark:text-gray-400">Free Delivery</span>
                            </div>
                            <div className="flex flex-col items-center text-center p-3">
                                <RefreshCcw className="text-brand-green mb-2" size={24} />
                                <span className="text-xs text-gray-600 dark:text-gray-400">7 Day Return</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Specifications */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16">
                    <h2 className="text-2xl font-bold text-brand-black dark:text-white mb-6">Specifications</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(phone.specs).map(([key, value]) => (
                            <div key={key} className="flex justify-between p-4 bg-black/5 dark:bg-white/5 rounded-xl">
                                <span className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                <span className="text-brand-black dark:text-white font-medium text-right max-w-[60%]">{value}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Highlights */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12">
                    <h2 className="text-2xl font-bold text-brand-black dark:text-white mb-6">Highlights</h2>
                    <ul className="space-y-3">
                        {phone.highlights.map((highlight, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-brand-green mt-2 flex-shrink-0" />
                                <span className="text-gray-600 dark:text-gray-400">{highlight}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </div>
    );
};

export default PhoneDetails;
