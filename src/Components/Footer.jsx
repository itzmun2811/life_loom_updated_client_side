import React from 'react';
import Logo from '../shared/WebLogo/Logo';

const Footer = () => {
  return (
    <footer className="w-full border border-blue-200 bg-[#5F99AE] text-white dark:bg-gray-900 dark:text-gray-100">
      {/* Top Section */}
      <div className=" px-6 py-10
      w-full border border-blue-200
      flex flex-col lg:flex-row justify-between items-center lg:items-start 
      space-y-8 lg:space-y-0 mx-auto">
        
        {/* Logo + About */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 lg:w-1/3">
          <a href="/" className="flex justify-center lg:justify-start">
            <Logo />
          </a>
          <p className="text-sm max-w-sm dark:text-gray-300">
            LifeLoom helps you secure your future with trusted life insurance 
            policies tailored for you and your family.
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-8 text-sm lg:w-2/3">
          {/* Policies */}
          <div className="space-y-3">
            <h3 className="uppercase font-semibold">Policies</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-gray-200">Term Life Insurance</a></li>
              <li><a href="#" className="hover:text-gray-200">Whole Life Coverage</a></li>
              <li><a href="#" className="hover:text-gray-200">Critical Illness Plan</a></li>
              <li><a href="#" className="hover:text-gray-200">Family Protection</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h3 className="uppercase font-semibold">Company</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-gray-200">About Us</a></li>
              <li><a href="#" className="hover:text-gray-200">Careers</a></li>
              <li><a href="#" className="hover:text-gray-200">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-200">Terms of Service</a></li>
            </ul>
          </div>

          {/* Help */}
          <div className="space-y-3">
            <h3 className="uppercase font-semibold">Help & Support</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-gray-200">Claims Center</a></li>
              <li><a href="#" className="hover:text-gray-200">Support Docs</a></li>
              <li><a href="#" className="hover:text-gray-200">Live Chat</a></li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <h3 className="uppercase font-semibold">Social Media</h3>
            <div className="flex space-x-4">
              {/* Facebook */}
              <a href="#" className="hover:text-[#EAEFEF]" title="Facebook">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12a10 10 0 10-11.6 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.2V12h2.2l-.4 3h-1.8v7A10 10 0 0022 12z" />
                </svg>
              </a>
              {/* Twitter */}
              <a href="#" className="hover:text-[#EAEFEF]" title="Twitter">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.59-2.46.7a4.18 4.18 0 001.85-2.3c-.8.5-1.7.9-2.65 1.1a4.15 4.15 0 00-7.1 3.8A11.77 11.77 0 013 4.8a4.14 4.14 0 001.28 5.53c-.66-.02-1.28-.2-1.82-.5v.05a4.15 4.15 0 003.32 4.07c-.6.17-1.2.2-1.8.07a4.16 4.16 0 003.9 2.9A8.33 8.33 0 012 19.6a11.76 11.76 0 006.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.35-.01-.53A8.36 8.36 0 0022.46 6z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="hover:text-[#EAEFEF]" title="Instagram">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3.2A5.8 5.8 0 1017.8 12 5.8 5.8 0 0012 7.2zm0 2A3.8 3.8 0 1112 14a3.8 3.8 0 010-7.8zm4.5-.9a1.3 1.3 0 11-2.6 0 1.3 1.3 0 012.6 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full py-6 text-sm text-center bg-[#568F87] dark:bg-gray-800 dark:text-gray-300">
        © {new Date().getFullYear()} LifeLoom Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
