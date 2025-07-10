import React from 'react';
import Banner from './Banner';
import PopularPolicy from './PopularPolicy';
import Benefits from './Benefits';
import NewsLetter from './NewsLetter';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularPolicy></PopularPolicy>
            <Benefits></Benefits>
            <NewsLetter></NewsLetter>
        </div>
    );
};

export default Home;