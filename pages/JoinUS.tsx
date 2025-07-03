import React from "react";
import "../app/globals.css";
import Footer from "@/Components/Footer";
const JoinUs = () => {
  return (
    <>
    <section className="w-full h-screen bg-gradient-to-r from-green-200 to-green-800 p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-white mb-6">Join Smart Agencies</h1>
        <p className="text-lg text-white mb-4">
          At Smart Agencies, we are dedicated to delivering top-quality beverages that refresh and delight our customers. 
          Our success is driven by the passion, innovation, and dedication of our team. We believe in fostering a collaborative 
          and dynamic work environment where everyone has the opportunity to contribute to our mission.
        </p>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Why Smart Agencies?</h2>
          <ul className="text-left text-lg mb-6 list-disc list-inside">
            <li>Collaborative and innovative work culture.</li>
            <li>Commitment to quality and customer satisfaction.</li>
            <li>Focus on personal growth and career development.</li>
            <li>Part of a rapidly growing industry.</li>
          </ul>

          <p className="text-lg font-bold">
            We are proud of our team and always open to connecting with talented individuals who share our vision. 
            Together, we can continue to elevate the beverage experience for our customers.
          </p>
        </div>
        
      </div>
      
    </section>
    <Footer/>
    </>
  );
};

export default JoinUs;
