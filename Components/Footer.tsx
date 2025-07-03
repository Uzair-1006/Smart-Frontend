import React from "react";
import "../app/globals.css";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 animate-fadeIn">
      <div className="container mx-auto px-6">
        {/* Footer Content */}
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Products Section */}
          <div className="w-full md:w-1/4">
            <h2 className="text-lg font-bold mb-3 ml-4">Our Products</h2>
            <ul className="ml-5 space-y-2">
              {[
                { name: "Bindu Products", link: "/binduproducts" },
                { name: "Sipon Products", link: "/siponproducts" },
                { name: "Water Products", link: "/AvailableSoon" },
              ].map((item, index) => (
                <li key={index} className="group transition duration-300">
                  <Link href={item.link} className="hover:underline flex items-center space-x-2">
                    <span className="group-hover:translate-x-2 transition-transform duration-300">➤</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shopping Section */}
          <div className="w-full md:w-1/4">
            <h2 className="text-lg font-bold mb-3 ml-4">Shopping</h2>
            <ul className="ml-5 space-y-2">
              {[
                { name: "Bindu Shopping", link: "/bindushopping" },
                { name: "Sipon Shopping", link: "/siponshopping" },
                { name : "Shop all products" , link : "/smart-shopping"}
              ].map((item, index) => (
                <li key={index} className="group transition duration-300">
                  <Link href={item.link} className="hover:underline flex items-center space-x-2">
                    <span className="group-hover:translate-x-2 transition-transform duration-300">➤</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Us Section */}
          <div className="w-full md:w-1/4">
            <h2 className="text-lg font-bold mb-3">About Us</h2>
            <ul className="space-y-2">
              {[
                { name: "Our Story", link: "/AboutUS" },
                { name: "Join Us", link: "/JoinUS" },
              ].map((item, index) => (
                <li key={index} className="group transition duration-300">
                  <Link href={item.link} className="hover:underline flex items-center space-x-2">
                    <span className="group-hover:translate-x-2 transition-transform duration-300">➤</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="w-full md:w-1/4">
            <h2 className="text-lg font-bold mb-3">Contact</h2>
            <ul className="space-y-2">
              {[
                { name: "Contact Us", link: "/ContactUS" },
                { name: "Support", link: "/Support" },
              ].map((item, index) => (
                <li key={index} className="group transition duration-300">
                  <Link href={item.link} className="hover:underline flex items-center space-x-2">
                    <span className="group-hover:translate-x-2 transition-transform duration-300">➤</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="mb-2">
            <Link href="/" className="text-lg font-bold hover:underline transition-transform duration-300 hover:scale-105">
              Back to Home
            </Link>
          </p>
          <p>© 2025 Smart Agencies. All rights reserved.</p>
          <p>
            <Link href="/privacy" className="hover:underline transition-opacity duration-300 hover:opacity-80">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;