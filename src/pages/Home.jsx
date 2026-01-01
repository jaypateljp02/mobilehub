import React from 'react';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import Accessories from '../components/home/Accessories';
import PreOwned from '../components/home/PreOwned';

const Home = () => {
    return (
        <>
            <Hero />
            <Features />
            <Accessories />
            <PreOwned />
        </>
    );
};

export default Home;
