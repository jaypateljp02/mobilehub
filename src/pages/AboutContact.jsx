import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageCircle, Star, ChevronLeft, ChevronRight, Quote, Users, Award, Heart } from 'lucide-react';

const AboutContact = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

    const testimonials = [
        {
            name: 'Rahul Patil',
            location: 'Ratnagiri',
            rating: 5,
            text: 'Best mobile shop in Ratnagiri! Got my iPhone 16 Pro at a great price with excellent after-sales support. Highly recommended!',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        },
        {
            name: 'Priya Deshmukh',
            location: 'Ratnagiri',
            rating: 5,
            text: 'Amazing service! They helped me transfer all my data from my old phone seamlessly. The staff is very knowledgeable and friendly.',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        },
        {
            name: 'Amit Sawant',
            location: 'Chiplun',
            rating: 5,
            text: 'Fixed my Samsung screen in just 2 hours with genuine parts. Fair pricing and honest service. Will definitely come back!',
            avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
        },
        {
            name: 'Sneha Kulkarni',
            location: 'Ratnagiri',
            rating: 5,
            text: 'Got the best exchange value for my old phone. The 0% EMI option made upgrading to a new phone so easy!',
            avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
        },
    ];

    const teamMembers = [
        { name: 'Rajesh Kumar', role: 'Founder & CEO', image: 'https://randomuser.me/api/portraits/men/75.jpg' },
        { name: 'Suresh Patil', role: 'Sales Manager', image: 'https://randomuser.me/api/portraits/men/52.jpg' },
        { name: 'Anita Sharma', role: 'Customer Support', image: 'https://randomuser.me/api/portraits/women/65.jpg' },
    ];

    const stats = [
        { icon: Users, value: '10,000+', label: 'Happy Customers' },
        { icon: Award, value: '8+', label: 'Years Experience' },
        { icon: Heart, value: '4.8', label: 'Google Rating' },
        { icon: Phone, value: '500+', label: 'Phones Sold Monthly' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        const message = `Name: ${formData.name}%0APhone: ${formData.phone}%0AMessage: ${formData.message}`;
        window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
    };

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-brand-black transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-brand-black dark:text-white mb-4">
                        About <span className="text-brand-green">Mobile Hub</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                        Your trusted mobile partner in Ratnagiri since 2016. Premium smartphones, genuine accessories, and expert repair services.
                    </p>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
                >
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center p-6 bg-black/5 dark:bg-white/5 rounded-2xl border border-black/10 dark:border-white/10">
                            <stat.icon className="mx-auto text-brand-green mb-3" size={32} />
                            <p className="text-3xl font-bold text-brand-black dark:text-white">{stat.value}</p>
                            <p className="text-gray-500 text-sm">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Our Story */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-brand-black dark:text-white mb-6">Our Story</h2>
                            <div className="space-y-4 text-gray-600 dark:text-gray-400">
                                <p>
                                    Mobile Hub was founded in 2016 with a simple mission: to bring the latest technology to Ratnagiri with unmatched service and value.
                                </p>
                                <p>
                                    What started as a small shop has grown into the region's most trusted destination for smartphones, with authorized dealerships from Apple, Samsung, OnePlus, Vivo, and more.
                                </p>
                                <p>
                                    We pride ourselves on our knowledgeable team, genuine products, transparent pricing, and after-sales support that goes beyond the ordinary.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-video rounded-2xl overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800"
                                    alt="Mobile Hub Store"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-brand-green text-black p-6 rounded-2xl font-bold text-xl">
                                Since 2016
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Team */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-bold text-brand-black dark:text-white text-center mb-10">Meet Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center group"
                            >
                                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-brand-green/20 group-hover:ring-brand-green/50 transition-all">
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="text-xl font-bold text-brand-black dark:text-white">{member.name}</h3>
                                <p className="text-gray-500">{member.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Testimonials */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 bg-black/5 dark:bg-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden"
                >
                    <Quote className="absolute top-8 left-8 text-brand-green/20" size={80} />
                    <h2 className="text-3xl font-bold text-brand-black dark:text-white text-center mb-10">What Our Customers Say</h2>

                    <div className="relative max-w-3xl mx-auto">
                        <motion.div
                            key={currentTestimonial}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-center"
                        >
                            <img
                                src={testimonials[currentTestimonial].avatar}
                                alt={testimonials[currentTestimonial].name}
                                className="w-20 h-20 rounded-full mx-auto mb-4 ring-4 ring-brand-green/30"
                            />
                            <div className="flex justify-center gap-1 mb-4">
                                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                                    <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 italic">
                                "{testimonials[currentTestimonial].text}"
                            </p>
                            <p className="font-bold text-brand-black dark:text-white">{testimonials[currentTestimonial].name}</p>
                            <p className="text-gray-500 text-sm">{testimonials[currentTestimonial].location}</p>
                        </motion.div>

                        {/* Navigation */}
                        <div className="flex justify-center gap-4 mt-8">
                            <button
                                onClick={prevTestimonial}
                                className="p-3 rounded-full bg-black/5 dark:bg-white/10 hover:bg-brand-green hover:text-black transition-all"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={nextTestimonial}
                                className="p-3 rounded-full bg-black/5 dark:bg-white/10 hover:bg-brand-green hover:text-black transition-all"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>

                        {/* Dots */}
                        <div className="flex justify-center gap-2 mt-4">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentTestimonial(index)}
                                    className={`w-2 h-2 rounded-full transition-all ${currentTestimonial === index ? 'bg-brand-green w-6' : 'bg-gray-400'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Contact Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12"
                >
                    {/* Contact Info & Map */}
                    <div>
                        <h2 className="text-3xl font-bold text-brand-black dark:text-white mb-6">Visit Our Store</h2>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-brand-green/10">
                                    <MapPin className="text-brand-green" size={24} />
                                </div>
                                <div>
                                    <p className="font-semibold text-brand-black dark:text-white">Address</p>
                                    <p className="text-gray-600 dark:text-gray-400">Shop No. 5, Near Bus Stand, Main Road, Ratnagiri, Maharashtra 415612</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-brand-green/10">
                                    <Phone className="text-brand-green" size={24} />
                                </div>
                                <div>
                                    <p className="font-semibold text-brand-black dark:text-white">Phone</p>
                                    <p className="text-gray-600 dark:text-gray-400">+91 98765 43210</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-brand-green/10">
                                    <Mail className="text-brand-green" size={24} />
                                </div>
                                <div>
                                    <p className="font-semibold text-brand-black dark:text-white">Email</p>
                                    <p className="text-gray-600 dark:text-gray-400">info@mobilehub.in</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-brand-green/10">
                                    <Clock className="text-brand-green" size={24} />
                                </div>
                                <div>
                                    <p className="font-semibold text-brand-black dark:text-white">Working Hours</p>
                                    <p className="text-gray-600 dark:text-gray-400">Mon - Sat: 10:00 AM - 9:00 PM</p>
                                    <p className="text-gray-600 dark:text-gray-400">Sunday: 11:00 AM - 6:00 PM</p>
                                </div>
                            </div>
                        </div>

                        {/* Google Map */}
                        <div className="rounded-2xl overflow-hidden border border-black/10 dark:border-white/10">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.0!2d73.3!3d16.99!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDU5JzI0LjAiTiA3M8KwMTgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                                width="100%"
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Mobile Hub Location"
                            />
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <h2 className="text-3xl font-bold text-brand-black dark:text-white mb-6">Send Us a Message</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Your Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-brand-black dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-green/50"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-brand-black dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-green/50"
                                    placeholder="Enter your phone number"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Message</label>
                                <textarea
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-brand-black dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-green/50 resize-none"
                                    placeholder="How can we help you?"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 bg-brand-green text-black font-bold py-4 rounded-xl hover:shadow-[0_0_30px_rgba(57,255,20,0.3)] transition-all"
                            >
                                <MessageCircle size={20} />
                                Send via WhatsApp
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AboutContact;
