import React from 'react';
import Banner from './Banner';
import PopularPolicy from './PopularPolicy';
import Benefits from './Benefits';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularPolicy></PopularPolicy>
            <Benefits></Benefits>
        </div>
    );
};

export default Home;