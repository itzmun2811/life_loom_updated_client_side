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
        




        
        <div className="flex flex-col min-h-screen">
            
            <Header onToggleTheme={toggleTheme} theme={theme}></Header>

            <Outlet></Outlet>

            <Footer></Footer>
        </div>
    );
};

export default MainLayOut;