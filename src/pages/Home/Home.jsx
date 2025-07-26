import React from 'react';
import Banner from './Banner';
import PopularPolicy from './PopularPolicy';
import Benefits from './Benefits';
import NewsLetter from './NewsLetter';
import OurAgents from './OurAgents';
import LatestBlogs from './LatestBlogs';
import CustomerReview from './CustomerReview';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
             <Helmet>
        <title>Home </title>
        <meta name="description" content="Welcome to our insurance platform. Discover popular policies, agents, and customer reviews." />
      </Helmet>
            <Banner></Banner>
           <PopularPolicy></PopularPolicy>
           <LatestBlogs></LatestBlogs>
            <OurAgents></OurAgents>
            <Benefits></Benefits>
            <CustomerReview></CustomerReview>
            <NewsLetter></NewsLetter>
        </div>
    );
};

export default Home;