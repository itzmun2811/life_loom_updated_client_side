import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const MainLayOut = () => {


  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };



    return (
        




        
        <div className="">
            
            <Header onToggleTheme={toggleTheme} theme={theme}></Header>
<div className='mt-10 pt-2 max-w-7xl mx-auto'>
 <Outlet></Outlet>
</div>
           
<div className='w-full'>
            <Footer></Footer>
            </div>
        </div>
    );
};

export default MainLayOut;