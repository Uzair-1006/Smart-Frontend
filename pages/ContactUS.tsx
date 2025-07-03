import React from 'react';
import Head from 'next/head';
import "../app/globals.css";
import Footer from '@/Components/Footer';

const Contact: React.FC = () => {
  return (
    <>
      <Head>
        <title>Contact Us</title>
        <meta name="description" content="Contact us for more information." />
      </Head>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-gray-700 mb-6">Feel free to reach out to us through the following methods:</p>
          <div className="flex items-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 10h3v11H3V10zM18 10h3v11h-3V10zM8 6h8v2H8V6z"
              />
            </svg>
            <div>
              <p className="text-gray-900 font-semibold">Email:</p>
              <a href={`mailto:shaikuzair57@gmail.com`} className="text-blue-600 hover:underline">shaikuzair57@gmail.com</a>
            </div>
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 3v14a1 1 0 001 1h12a1 1 0 001-1V3a1 1 0 00-1-1H6a1 1 0 00-1 1z"
              />
            </svg>
            <div>
              <p className="text-gray-900 font-semibold">Mobile:</p>
              <a href={`tel:+7842448944`} className="text-blue-600 hover:underline">+7842448944</a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
