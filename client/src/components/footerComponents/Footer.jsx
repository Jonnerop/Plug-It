import { useState } from 'react';
import AboutLinks from './AboutLinks';
import ContactsLinks from './ContactsLinks';
import LegalLinks from './LegalLinks';
import SocialLinks from './SocialLinks';
import logo from '../../assets/images/logo_footer.png';
import footerText from './footerText';
import appStore from '../../assets/images/app_store.png';
import playStore from '../../assets/images/google_play.png';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <div className="relative flex flex-col md:flex-row justify-between px-12 py-6 pb-4 md:pb-2 bg-gradient-to-b from-darkerBlue to-darkBlue">
        {/* Logo and links */}
        <div className="flex md:flex-row flex-1 justify-start space-x-8">
          {/* Logo and description */}
          <div className="flex flex-col items-start">
            <img
              src={logo}
              alt="Plug It company logo"
              className="h-10 w-auto"
            />
            <p className="text-white text-xs mt-2 w-48 font-Roboto hidden md:block">
              {footerText}
            </p>
          </div>

          {/* About links section */}
          <div className="flex-col items-start mt-4 md:mt-0 hidden custom:block">
              <h4 className="text-white text-base mb-2 font-Orbitron whitespace-nowrap">
                About Us
              </h4>
            <AboutLinks itemClass="text-white text-sm hover:text-gray-300 transition duration-300 font-Roboto whitespace-nowrap" />
          </div>

          {/* Contacts links section */}
          <div className="flex-col items-start mt-4 md:mt-0 hidden custom:block">
            <h4 className="text-white text-base mb-2 font-Orbitron">Contact</h4>
            <ContactsLinks itemClass="text-white text-sm hover:text-gray-300 transition duration-300 font-Roboto whitespace-nowrap" />
          </div>
        </div>

        {/* Dropdown menu for small screens */}
        <div className="md:hidden mt-4">
          <button
            className="text-white text-sm font-Orbitron hover:underline"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Menu
          </button>
          {isDropdownOpen && (
            <div className="bg-customBlue text-white mt-2 rounded shadow-lg p-4 space-y-4">
              <div>
                <h4 className="text-base mb-2 font-Orbitron">About Us</h4>
                <AboutLinks itemClass="text-sm hover:text-gray-300 transition duration-300 font-Roboto" />
              </div>
              <div>
                <h4 className="text-base mb-2 font-Orbitron">Contact</h4>
                <ContactsLinks itemClass="text-sm hover:text-gray-300 transition duration-300 font-Roboto" />
              </div>
              <div>
                <h4 className="text-base mb-2 font-Orbitron">Legal</h4>
                <LegalLinks itemClass="text-sm hover:text-gray-300 transition duration-300 font-Roboto" />
              </div>
            </div>
          )}
        </div>

        {/* Newsletter and socials */}
        <div className="flex flex-col items-center flex-1 mt-8 md:mt-0">
          <div className="w-full text-left ml-0 md:ml-24">
            <h4 className="text-white text-base mb-2 font-Orbitron text-center md:text-left">
              Order our newsletter
            </h4>
          </div>
          <form className="flex w-50% max-w-sm nav-phone:w-full">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 px-4 py-2 rounded-l bg-gray-200 text-black focus:outline-none font-Roboto"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-eGreen text-black rounded-r hover:bg-darkGreen hover:text-white transition duration-500 font-Roboto font-bold"
            >
              Submit
            </button>
          </form>

          {/* Social links section */}
          <div className="flex space-x-4 my-4 mt-6">
            <SocialLinks
              parentClass="flex space-x-3 footer-tiny:space-x-6"
              itemClass="w-8 h-8 hover:opacity-80 transition duration-300"
            />
          </div>

          {/* Copyright text */}
          <div className="text-white text-center text-sm font-Roboto pb-2 hidden md:block">
            &copy; {new Date().getFullYear()} Plug It. All rights reserved.
          </div>
        </div>

        <div className="flex flex-col items-center md:flex-row flex-1 space-y-8 md:space-y-0 md:space-x-8 justify-start md:items-start">
          {/* Legal links */}
          <div className="flex-col items-center md:items-start hidden custom:block">
            <h4 className="text-white text-base mb-2 font-Orbitron">Legal</h4>
            <LegalLinks itemClass="text-white text-sm hover:text-gray-300 transition duration-300 font-Roboto whitespace-nowrap" />
          </div>

          {/* Download our app section */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-white text-base mb-2 font-Orbitron whitespace-nowrap">
              Download Our App
            </h4>
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
              <a
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={appStore}
                  alt="Download on the App Store"
                  href="https://www.apple.com/app-store/"
                  className="h-10"
                />
              </a>
              <a
                href="https://play.google.com/store/games?hl=en"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={playStore}
                  alt="Get it on Google Play"
                  className="h-10"
                />
              </a>
            </div>
          </div>

          {/* Copyright text for small screens */}
          <div className="text-white text-center text-sm font-Roboto mt-4 md:mt-0 block md:hidden">
            &copy; {new Date().getFullYear()} Plug It. All rights reserved.
          </div>
        </div>
      </div>
    </>
  );
}
