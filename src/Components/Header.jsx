import React, { useContext, useState } from 'react';
import Logo from '../shared/WebLogo/Logo';
import { AuthContext } from '../context/AuthContext';
import { NavLink } from 'react-router'; 
import useRole from '../hooks/useRole';
import { MdModeNight } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

const Header = ({ onToggleTheme, theme }) => {
  const { user, logOut } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { role } = useRole();

  const handleLogOut = () => {
    logOut()
      .then(() => console.log('Logout successful'))
      .catch((error) => console.log(error));
  };

  return (
  
    <header className="fixed top-0 left-0 right-0 z-20 bg-[#456882]
   text-[#F9F3EF] 
    shadow">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
        
          <NavLink to="/" className="flex text-[#F5ECE0] items-center space-x-1">
            <Logo />
          </NavLink>

      
          <div className="hidden md:flex flex-1 justify-center">
            <ul className="flex space-x-8 text-white font-medium">
              <li><NavLink to="/" className="hover:text-blue-200">Home</NavLink></li>
              <li><NavLink to="/allPolicies" className="hover:text-blue-200">All Policy</NavLink></li>
              <li><NavLink to="/blogs" className="hover:text-blue-200">Blogs</NavLink></li>
              <li><NavLink to="/faq" className="hover:text-blue-200">FAQs</NavLink></li>
             {user && <li><NavLink to="/dashboard" className="hover:text-blue-200">Dashboard</NavLink></li>
             }
              {role === 'customer' && (
                <li><NavLink to="/beAgent" className="hover:text-blue-200">Be A Agent</NavLink></li>
              )}
            </ul>
          </div>

        
          <div className="relative flex items-center space-x-3">
                <button onClick={onToggleTheme} className='button-primary ml-0 pl-0  lg:ml-2'> 
       {theme === "light" ? <MdModeNight size={30} /> : 
       <MdOutlineLightMode size={30} />}
      </button>
            {user ? (
              <>
          
                <button
                  type="button"
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src={user?.photoURL || 'https://i.ibb.co/RSC4xRf/user.png'}
                    alt="User"
                  />
                </button>

                
                {dropdownOpen && (
                  <div className="absolute top-12 right-0 z-50 mt-2 w-48 text-base bg-white divide-y divide-gray-100 rounded-lg shadow">
                    <div className="px-4 py-3">
                      <span className="block text-sm text-gray-900">
                        {user?.displayName}
                      </span>
                      <span className="block text-sm text-gray-500 truncate">
                        {user?.email}
                      </span>
                    </div>
                    <ul className="py-2">
                      {/* <li>
                        <NavLink
                          to="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Profile
                        </NavLink>
                      </li> */}
                      <li>
                        <button
                          onClick={() => {
                            handleLogOut();
                            setDropdownOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Sign out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <NavLink
                to="/login"
                className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Login
              </NavLink>
            )}

          
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        </nav>
      </div>

      
      {menuOpen && (
        <div className="md:hidden w-full bg-sky-700 text-white">
          <div className="px-4 py-3 space-y-2">
            <ul className="flex flex-col font-medium space-y-2">
              <li><NavLink to="/" className="block py-2" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
              <li><NavLink to="/allPolicies" className="block py-2" onClick={() => setMenuOpen(false)}>All Policy</NavLink></li>
              <li><NavLink to="/blogs" className="block py-2" onClick={() => setMenuOpen(false)}>Blogs</NavLink></li>
              <li><NavLink to="/faq" className="block py-2" onClick={() => setMenuOpen(false)}>FAQs</NavLink></li>
              <li><NavLink to="/dashboard" className="block py-2" onClick={() => setMenuOpen(false)}>Dashboard</NavLink></li>
              {role === 'customer' && (
                <li><NavLink to="/beAgent" className="block py-2" onClick={() => setMenuOpen(false)}>Be A Agent</NavLink></li>
              )}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
