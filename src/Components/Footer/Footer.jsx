import React from "react";
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import logo from "/logo.png"; 
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className=" bg-gradient-to-br from-green-50 to-green-100 mt-12">
      <div className="max-w-full  mx-auto px-16 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and About */}

        <div className="space-y-3">
          <img src={logo} alt="WorkSync Logo" className="h-12" />
          <h4 className="  text-lg md:text-3xl py-1 font-bold  bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            <span className="">Work</span>Sync
          </h4>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-xl text-green-600 mb-3">Quick Links</h4>
          <ul className="space-y-2 text-lg">
            <li>
              <a href="/" className="hover:text-green-600">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-green-600">
                About
              </a>
            </li>
            <li>
              <a href="/features" className="hover:text-green-600">
                Features
              </a>
            </li>
            <li>
              <a href="/pricing" className="hover:text-green-600">
                Pricing
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-bold text-xl text-green-600 mb-3">Support</h4>
          <ul className="space-y-2 text-lg">
            <li>
              <a href="/faq" className="hover:text-green-600">
                FAQs
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-green-600">
                Contact
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-green-600">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-green-600">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h4 className="font-bold text-xl text-green-600 mb-3">
            Connect with Us
          </h4>
          <div className="flex space-x-4 mb-3">
            <Link
            to={"https://facebook.com/hasan6t7"}
            //   href="https://facebook.com/hasan6t7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookSquare size={35} />
            </Link>
            <Link
            to={"https://linkedin.com/in/md-hasanujjaman-in"}
            //   href="https://linkedin.com/in/md-hasanujjaman-in"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={35} />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaSquareXTwitter size={35}/>
            </Link>
          </div>
          <p className="text-lg pt-3">Email: support@worksync.com</p>
          <p className="text-lg">Phone: +880 1234 567890</p>
        </div>
      </div>

      <div className="border-t border-green-200 text-center py-4 text-lg">
        © coppyright {new Date().getFullYear()} WorkSync. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
