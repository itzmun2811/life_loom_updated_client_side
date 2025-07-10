import React, { use } from 'react';
import Logo from '../shared/WebLogo/Logo';
import { AuthContext } from '../context/AuthContext';
import 'flowbite';
import { NavLink } from 'react-router';

const Header = () => {
  const { user, logOut } = use(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log('logout successful');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <nav className="bg-gradient-to-tl from-[#29819c] to-[#6e82b9] border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Logo */}
          <a className="flex items-center space-x-3 rtl:space-x-reverse">
            <Logo />
          </a>

          {/* Right side user button or logout */}
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {user ? (
              <>
                {/* Profile Image with Dropdown */}
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  id="user-menu-button"
                  aria-expanded="false"
                  data-dropdown-toggle="user-dropdown"
                  data-dropdown-placement="bottom"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src={user?.photoURL }
                    alt="user"
                  />
                </button>

                {/* Dropdown */}
                <div
                  className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600"
                  id="user-dropdown"
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">
                      {user?.displayName || 'User'}
                    </span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                      {user?.email}
                    </span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600">
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600">
                        Settings
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600">
                        Earnings
                      </a>
                    </li>
                    <li>
                      <button
                        onClick={handleLogOut}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <button
               
                className="focus:outline-none text-white bg-white-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                <NavLink to='/login'>
                
                 Login
                </NavLink>
              
              </button>
            )}

            {/* Always visible hamburger menu for small devices */}
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-user"
              aria-expanded="false"
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

          {/* Navigation Links (Responsive) */}
    <div
  className="items-center justify-between hidden w-full 
  md:flex md:w-auto md:order-1 text-white"
  id="navbar-user"
>
  <ul
    className="flex flex-col font-medium p-2 space-y-1 mt-1
     border border-gray-200 rounded-md bg-white text-black
     md:flex-row md:space-x-6 md:p-0 md:mt-0 md:border-0 md:bg-transparent
     dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700"
  >
    <li>
      <NavLink to="/"
        className="block py-2 px-3 rounded 
    hover:text-blue-500 text-white
   "
      >
        Home
      </NavLink>
    </li>
    <li>
      <NavLink to='/allPolicies'
        href="#"
        className="block py-2 px-3 rounded 
    hover:text-blue-500 text-white
   "
      >
   All Policy
      </NavLink>
    </li>
    <li>
      <a
        href="#"
        className="block py-2 px-3 rounded 
    hover:text-blue-500 text-white
   "
      >
      Agents
      </a>
    </li>
    <li>
      <NavLink to='/faq'
        className="block py-2 px-3 rounded 
    hover:text-blue-500 text-white
   "
      >
     FAQS
      </NavLink>
    </li>
    <li>
      <a
        href="#"
        className="block py-2 px-3 rounded 
    hover:text-blue-500 text-white
   "
      >
     Dashboard
      </a>
    </li>
  
   
   
    
   
    
  </ul>
</div>

        </div>
      </nav>
    </>
  );
};

export default Header;
