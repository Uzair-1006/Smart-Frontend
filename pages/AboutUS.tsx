import Head from 'next/head';
import React from 'react';
import "../app/globals.css";
import Footer from '@/Components/Footer';

export default function AboutUs() {
  return (
    <>
      <Head>
        <title>About Us - Smart Agencies</title>
        <meta
          name="description"
          content="Learn more about Smart Agencies, your trusted beverage distributor since 2008."
        />
      </Head>
      <section className="bg-gradient-to-r from-yellow-400 via-orange-300 to-yellow-400 py-16 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto bg-white shadow-lg rounded-lg p-8 md:p-16">
          <h2 className="text-5xl font-extrabold text-center text-gray-800 mb-10">About Us</h2>
          <div className="text-lg text-gray-700 leading-relaxed">
            <p className="mb-8 text-center">
              Welcome to <span className="text-yellow-600 font-semibold">Smart Agencies</span>, your trusted partner in beverage distribution. Established in <span className="font-semibold">2008</span>, we have grown into one of the leading beverage agencies, serving a wide range of clients across <span className="font-semibold">Madanpalli</span>. With a commitment to excellence, we bring the finest beverages from renowned brands to your doorstep, ensuring quality and satisfaction in every sip.
            </p>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h3>
            <p className="mb-8">
              Our mission is to deliver the highest quality beverages to our customers with unmatched service and reliability. We strive to be the preferred distributor by offering a diverse selection of products, from refreshing sodas to premium juices, catering to the needs of all our clients, whether they are small businesses, large retailers, or hospitality establishments.
            </p>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">What We Do</h3>
            <p className="mb-8">
              At <span className="text-yellow-600 font-semibold">Smart Agencies</span>, we specialize in the distribution of a wide range of beverages, including soft drinks, juices, energy drinks, and more. We work closely with leading manufacturers to ensure that our clients have access to the latest products at competitive prices. Our state-of-the-art logistics and distribution network allows us to provide timely deliveries, maintaining the freshness and quality of every product we handle.
            </p>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Us</h3>
            <ul className="list-disc list-inside mb-8 pl-6">
              <li><span className="font-semibold">Wide Selection:</span> We offer an extensive portfolio of beverages from top brands, ensuring that you can find the perfect products to meet your customers' preferences.</li>
              <li><span className="font-semibold">Reliable Service:</span> Our experienced team is dedicated to providing reliable and efficient distribution services, ensuring that your orders are delivered on time, every time.</li>
              <li><span className="font-semibold">Customer-Centric Approach:</span> We prioritize our clients' needs, offering personalized service and flexible solutions to help your business thrive.</li>
              <li><span className="font-semibold">Sustainability Commitment:</span> We are committed to sustainable practices, working with partners who share our values in reducing environmental impact.</li>
            </ul>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Team</h3>
            <p className="mb-8">
              Our success is driven by our passionate and knowledgeable team, who work tirelessly to ensure that every aspect of our business runs smoothly. From our sales professionals to our logistics experts, every member of the <span className="text-yellow-600 font-semibold">Smart Agencies</span> team is dedicated to providing exceptional service and support.
            </p>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h3>
            <p>
              We are here to help you find the best beverage solutions for your business. Whether you’re looking to stock up on your favorite drinks or explore new products, our team is ready to assist you. Get in touch with us today and discover why <span className="text-yellow-600 font-semibold">Smart Agencies</span> is the preferred choice for beverage distribution.
            </p>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}
