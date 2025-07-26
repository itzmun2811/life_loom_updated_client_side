import React, { useContext, useState } from 'react';
import Logo from '../shared/WebLogo/Logo';
import { AuthContext } from '../context/AuthContext';
import { NavLink } from 'react-router';

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log('Logout successful');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {/* Navbar - fixed height */}
      <nav className="bg-gradient-to-tl from-[#29819c] to-[#6e82b9] border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-3">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Logo />
          </NavLink>

          {/* User and mobile menu button */}
          <div className="relative flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {user ? (
              <>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src={user?.photoURL || 'https://i.ibb.co/RSC4xRf/user.png'}
                    alt="User"
                  />
                </button>

                {/* User Dropdown */}
                {dropdownOpen && (
                  <div className="absolute top-14 right-0 z-50 mt-2 w-48 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600">
                    <div className="px-4 py-3">
                      <span className="block text-sm text-gray-900 dark:text-white">
                        {user?.displayName}
                      </span>
                      <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                        {user?.email}
                      </span>
                    </div>
                    <ul className="py-2">
                      <li>
                        <NavLink
                          to="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                        >
                          Profile
                        </NavLink>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            handleLogOut();
                            setDropdownOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
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
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                Login
              </NavLink>
            )}

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
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

          {/* Desktop Menu */}
          <div className="hidden md:flex md:w-auto md:order-1 text-white">
            <ul className="flex flex-row font-medium space-x-6">
              <li><NavLink to="/" className="hover:text-blue-300">Home</NavLink></li>
              <li><NavLink to="/allPolicies" className="hover:text-blue-300">All Policy</NavLink></li>
              <li><NavLink to="/blogs" className="hover:text-blue-300">Blogs</NavLink></li>
              <li><NavLink to="/faq" className="hover:text-blue-300">FAQs</NavLink></li>
              <li><NavLink to="/dashboard" 
              className="hover:text-blue-300">Dashboard</NavLink></li>
              <li><NavLink to="/beAgent" className="hover:text-blue-300">Be A Agent</NavLink></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Menu (outside nav tag) */}
      {menuOpen && (
        <div className="w-full bg-sky-700 text-white md:hidden transition-all">
          <ul className="flex flex-col font-medium space-y-1 p-4">
            <li><NavLink to="/" className="block py-2" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
            <li><NavLink to="/allPolicies" className="block py-2" onClick={() => setMenuOpen(false)}>All Policy</NavLink></li>
            <li><NavLink to="/blogs" className="block py-2" onClick={() => setMenuOpen(false)}>Blogs</NavLink></li>
            <li><NavLink to="/faq" className="block py-2" onClick={() => setMenuOpen(false)}>FAQs</NavLink></li>
            <li><NavLink to="/dashboard" className="block py-2" onClick={() => setMenuOpen(false)}>Dashboard</NavLink></li>
            <li><NavLink to="/beAgent" className="block py-2" onClick={() => setMenuOpen(false)}>Be A Agent</NavLink></li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;
