import React from 'react';
import Banner from './Banner';
import PopularPolicy from './PopularPolicy';
import Benefits from './Benefits';
import NewsLetter from './NewsLetter';
import OurAgents from './OurAgents';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
           <PopularPolicy></PopularPolicy>
            <OurAgents></OurAgents>
            <Benefits></Benefits>
            <NewsLetter></NewsLetter>
        </div>
    );
};

export default Home;