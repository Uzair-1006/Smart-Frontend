"use client";
import React, { useState, useEffect } from "react";
import "../app/globals.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Quotes } from "@/constants";
import Link from "next/link";
import Head from "next/head";
import Footer from "@/Components/Footer";

const Products = () => {
  const [showFullBinContent, setShowFullBinContent] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const handleToggleBinContent = () => {
    setShowFullBinContent(!showFullBinContent);
  };

  useEffect(() => {
    // Trigger animations after component mounts
    setIsVisible(true);
  }, []);

  return (
    <>
      <Head>
        <title>About Us - Smart Agencies</title>
        <meta
          name="description"
          content="Learn more about Smart Agencies, your trusted beverage distributor since 2008."
        />
      </Head>
      <div className="bg-gradient-to-b from-blue-50 to-cyan-100 min-h-screen">
        <section className="py-16 px-6 md:px-12 lg:px-24 relative">
          <div className="absolute inset-0 bg-blue-500 opacity-5 pattern-bubbles pattern-blue-500 pattern-size-6 pattern-opacity-10"></div>
          <div
            className={`container mx-auto backdrop-blur-sm bg-white/70 shadow-lg rounded-lg p-8 md:p-16 border-l-4 border-blue-500 transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2
              className={`text-5xl font-extrabold text-center text-blue-600 mb-10 transition-all duration-700 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              About Us
            </h2>
            <div
              className={`text-lg text-gray-700 leading-relaxed transition-all duration-700 delay-500 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <p className="mb-8 text-center">
                Welcome to{" "}
                <span className="text-blue-600 font-semibold">
                  Smart Agencies
                </span>
                , your trusted partner in beverage distribution. Established in{" "}
                <span className="font-semibold">2008</span>, we have grown into
                one of the leading beverage agencies, serving a wide range of
                clients across <span className="font-semibold">Madanpalli</span>
                . With a commitment to excellence, we bring the finest beverages
                from renowned brands to your doorstep, ensuring quality and
                satisfaction in every sip.
              </p>
            </div>
          </div>
        </section>

        <section
          id="products"
          className="py-16 px-6 md:px-12 lg:px-24 relative"
        >
          <div className="absolute inset-0 bg-teal-500 opacity-5 pattern-dots pattern-teal-500 pattern-size-4 pattern-opacity-10"></div>
          <div className="container mx-auto">
            <div className="text-center mb-8">
              <h1
                className={`text-3xl font-bold text-blue-600 bg-white/80 inline-block px-8 py-2 rounded-full shadow-md transition-all duration-700 delay-700 ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              >
                Our Products
              </h1>
            </div>

            {/* Product Container */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Sipon Products */}
              <div
                className={`p-6 flex flex-col items-center w-full bg-gradient-to-br from-blue-600 to-indigo-800 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-102 relative overflow-hidden ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
                style={{ transitionDelay: "900ms" }}
              >
                <div className="absolute -right-12 -top-12 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                <div
                  className="absolute -left-12 -bottom-12 w-40 h-40 bg-blue-400/20 rounded-full blur-xl animate-pulse"
                  style={{ animationDuration: "4s" }}
                ></div>
                <h3 className="font-semibold text-xl text-white mb-4 relative z-10">
                  Sipon Products
                </h3>
                <div className="bg-white/10 rounded-lg p-4 mb-4 transition-transform duration-700 hover:scale-105">
                  <Image
                    src="/Sipon.png"
                    width={300}
                    height={300}
                    alt="Sipon Logo"
                    className="object-cover"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <p className="text-white mt-4 relative z-10">
                  {Quotes[0].limitedSipContent}
                </p>
                <Link href="/siponproducts">
                  <span className="mt-6 px-8 py-3 bg-white text-blue-700 rounded-full font-semibold hover:bg-blue-100 transition-all duration-300 shadow-lg hover:shadow-xl relative z-10 group inline-block">
                    Explore Products
                  </span>
                </Link>
              </div>

              {/* Bindu Products */}
              <div
                className={`p-6 flex flex-col items-center w-full bg-gradient-to-br from-teal-600 to-cyan-800 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-102 relative overflow-hidden ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
                style={{ transitionDelay: "1100ms" }}
              >
                <div
                  className="absolute -right-16 -bottom-16 w-48 h-48 bg-teal-300/20 rounded-full blur-xl animate-pulse"
                  style={{ animationDuration: "5s" }}
                ></div>
                <div
                  className="absolute -left-10 -top-10 w-36 h-36 bg-white/10 rounded-full blur-xl animate-pulse"
                  style={{ animationDuration: "3s" }}
                ></div>
                <h3 className="font-semibold text-xl text-white mb-4 relative z-10">
                  Bindu Products
                </h3>
                <div className="bg-white/10 rounded-lg p-4 mb-4 transition-transform duration-700 hover:scale-105">
                  <Image
                    src="/Bindu.png"
                    width={300}
                    height={300}
                    alt="Bindu Logo"
                    className="object-cover"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <p className="text-white mt-4 relative z-10">
                  {Quotes[2].limitedBinContent}
                </p>
                <Link href="/binduproducts">
                  <span className="mt-6 px-8 py-3 bg-white text-teal-700 rounded-full font-semibold hover:bg-teal-100 transition-all duration-300 shadow-lg hover:shadow-xl relative z-10 group inline-block">
                    Explore Products
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Products;
