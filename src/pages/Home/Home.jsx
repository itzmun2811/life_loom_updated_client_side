import React from 'react';
import Banner from './Banner';
import PopularPolicy from './PopularPolicy';
import Benefits from './Benefits';
import NewsLetter from './NewsLetter';
import OurAgents from './OurAgents';
import LatestBlogs from './LatestBlogs';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
           <PopularPolicy></PopularPolicy>
           <LatestBlogs></LatestBlogs>
            <OurAgents></OurAgents>
            <Benefits></Benefits>
            <NewsLetter></NewsLetter>
        </div>
    );
};

export default Home;