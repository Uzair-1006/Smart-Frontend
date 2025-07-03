"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '@/Components/Header'
import Products from '@/Components/Products'
import Price from '@/Components/Sipon_Display'
import BinduDisplay from '@/Components/Bindu_Display'
import Footer from '@/Components/Footer'
import Offer from '@/Components/Offer'


 
const Page = () => {
  
  return (
    <div className="container">
      <title>Smart Agencies</title>
      <Header />
      <main>
        <Products />
        <section className="display-section">
          <Price />
          <BinduDisplay />
        </section>
        <Offer />
      </main>
      <Footer />
    </div>
  );
};

export default Page;