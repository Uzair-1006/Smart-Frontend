"use client";
import React from "react";
import { motion } from "framer-motion";
import "../app/globals.css";
import Image from "next/image";
import { Quotes } from "@/constants";
import Footer from "@/Components/Footer";
import Link from "next/link";
import Head from "next/head";

const BinduProducts = () => {
  return (
    <>
      <Head>
        <title>Smart Agencies - Bindu Info</title>
        <meta name="description" content="Get support and assistance for Smart Agencies services." />
      </Head>

      <section id="products" className="bg-gradient-to-r from-[#7AB143] to-[#4A7A20] min-h-screen py-10">
        <div className="max-w-7xl mx-auto text-center">
          {/* Animated Title */}
          <motion.h1
            className="text-3xl font-extrabold text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Bindu Products
          </motion.h1>

          <div className="flex flex-col items-center">
            {/* Animated Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="overflow-hidden rounded-lg shadow-lg"
            >
              <Image
                src="/Bindu.png"
                width={300}
                height={300}
                alt="Bindu Logo"
                className="pb-2 pl-2 object-cover"
                style={{ objectFit: "cover", maxWidth: "100%", height: "auto" }}
              />
            </motion.div>

            {/* Animated Text */}
            <motion.div
              className="mt-6 px-6 text-white text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            >
              {Quotes[3]?.fullBinContent?.map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              )) || <p>No content available.</p>}
            </motion.div>

            {/* Buy Button with Hover Effect */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <Link href="/bindushopping">
                <button className="px-6 py-3 bg-white text-green-600 font-semibold rounded-lg shadow-md hover:bg-green-100 transition duration-300">
                  Buy Bindu
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default BinduProducts;
