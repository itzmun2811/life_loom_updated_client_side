import React from 'react';
import logoimg from '../../assets/logo2.webp'

const Logo = () => {
    return (
 <div className="flex items-center justify-center space-x-3">
  <img
    className="w-16 h-16 my-2 object-contain"
    src={logoimg}
    alt="LifeLoom Logo"
  />
  <h1 className="lg:text-2xl md:text-xl text-lg font-bold text-white">Life_Loom</h1>
</div>
    );
};

export default Logo;