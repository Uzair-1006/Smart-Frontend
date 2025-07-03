import React from 'react';
import Head from 'next/head';
import "../app/globals.css";
import Footer from '@/Components/Footer';
const Support: React.FC = () => {
  return (
    <>
      <Head>
        <title>Support - Smart Agencies</title>
        <meta name="description" content="Get support and assistance for Smart Agencies services." />
      </Head>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Support Center</h1>
          <p className="text-gray-700 mb-6">
            At Smart Agencies, we are here to assist you. Whether you have a question, need help with a service, or have feedback, we are here to help.
          </p>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Support</h2>
            <p className="text-gray-700 mb-2">For immediate assistance, please reach out to us through the following methods:</p>
            <ul className="list-disc pl-5">
              <li className="mb-2">
                <strong>Email:</strong> 
                <a href={`mailto:shaikuzair57@gmail.com`} className="text-blue-600 hover:underline">shaikuzair57@gmail.com</a>
              </li>
              <li>
                <strong>Phone:</strong> 
                <a href={`tel:+1234567890`} className="text-blue-600 hover:underline">78424-48944</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <ul className="list-disc pl-5">
              <li className="mb-2">
                <strong>How can I reset my password?</strong> 
                <p className="text-gray-700">To reset your password, go to the <a href="/password-reset" className="text-blue-600 hover:underline">Password Reset</a> page and follow the instructions.</p>
              </li>
              <li className="mb-2">
                <strong>Where can I find more information about your services?</strong> 
                <p className="text-gray-700">You can learn more about our services on the <a href="/services" className="text-blue-600 hover:underline">Services</a> page.</p>
              </li>
              <li>
                <strong>How can I provide feedback?</strong> 
                <p className="text-gray-700">We value your feedback. Please fill out the form on our <a href="/feedback" className="text-blue-600 hover:underline">Feedback</a> page.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Support;
